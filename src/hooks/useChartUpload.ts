import { useState } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import { ref as dbRef, set } from 'firebase/database';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db } from '../lib/rtdb';
import { storage } from '../lib/firebase';
import { validateChartImage } from '../lib/uploadValidation';
import { getOriginalChartPath, getCompressedChartPath, getFileExtension } from '../lib/storagePaths';
import imageCompression from 'browser-image-compression';
import { v4 as uuidv4 } from 'uuid';
import { MarketType, Timeframe, TradingStyle, RiskProfile, ChartScan } from '../types/dashboard';
import { requestChartAnalysis } from '../lib/analysisApi';

export interface UploadMetadata {
  marketType: MarketType;
  timeframe: Timeframe;
  symbol: string;
  currentPrice: string;
  tradingStyle: TradingStyle;
  riskProfile: RiskProfile;
  notes: string;
  accountSize: string;
  riskPercent: string;
}

export type UploadStep = 
  | 'idle'
  | 'validating'
  | 'compressing'
  | 'uploading_original'
  | 'uploading_compressed'
  | 'writing_scan_record'
  | 'requesting_ai_analysis'
  | 'completed'
  | 'failed';

export function useChartUpload() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const [uploading, setUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState<UploadStep>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [scanId, setScanId] = useState<string | null>(null);

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setValidationError(null);
    setSubmitError(null);
    setUploadStep('idle');
  };

  const handleFileSelect = async (file: File) => {
    clearSelectedFile();
    setUploadStep('validating');
    console.log("[Upload] validating image");
    const validation = await validateChartImage(file);
    if (!validation.valid) {
      setValidationError(validation.error || "Invalid file");
      setUploadStep('failed');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setValidationError(null);
    setUploadStep('idle');
  };

  const submitScan = async (metadata: UploadMetadata) => {
    if (!user) {
      setSubmitError("Please sign in with Google before uploading a chart.");
      return;
    }
    if (!selectedFile) {
      setSubmitError("Please select a chart screenshot first.");
      return;
    }

    setUploading(true);
    setSubmitError(null);
    setUploadProgress(0);

    const newScanId = uuidv4();
    setScanId(newScanId);
    const uid = user.uid;

    const timeoutId = setTimeout(() => {
      console.warn("[Upload] timed out after 60 seconds");
      setUploading(false);
      setSubmitError("Upload timed out. Please try again or check your connection.");
      setUploadStep('failed');
    }, 60000);

    try {
      const ext = getFileExtension(selectedFile);
      const originalPath = getOriginalChartPath(uid, newScanId, ext);
      const compressedPath = getCompressedChartPath(uid, newScanId);

      // Compress image
      setUploadStep('compressing');
      console.log("[Upload] compressing image");
      let compressedFile: File | null = null;
      try {
        compressedFile = await imageCompression(selectedFile, {
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          initialQuality: 0.85,
          fileType: 'image/webp'
        });
      } catch (e) {
        console.warn("Image compression failed, using original", e);
      }

      // Upload original
      setUploadStep('uploading_original');
      console.log("[Upload] uploading original");
      const origRef = storageRef(storage, originalPath);
      const uploadTask = uploadBytesResumable(origRef, selectedFile);

      await new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress * 0.8);
          },
          (error) => reject(error),
          () => resolve(true)
        );
      });

      const originalImageUrl = await getDownloadURL(origRef);
      setUploadProgress(85);

      // Upload compressed if exists
      let compressedImageUrl: string | null = null;
      if (compressedFile) {
        setUploadStep('uploading_compressed');
        console.log("[Upload] uploading compressed");
        try {
          const compRef = storageRef(storage, compressedPath);
          await uploadBytesResumable(compRef, compressedFile);
          compressedImageUrl = await getDownloadURL(compRef);
        } catch (e) {
          console.warn("Failed to upload compressed image", e);
        }
      }

      setUploadProgress(95);

      // Write RTDB record
      setUploadStep('writing_scan_record');
      console.log("[Upload] creating scan record", newScanId);
      const scanData: ChartScan = {
        scanId: newScanId,
        id: newScanId, // backward compat
        ownerUid: uid,
        userId: uid, // backward compat
        imagePath: compressedFile ? compressedPath : originalPath,
        imageUrl: compressedImageUrl || originalImageUrl,
        originalImagePath: originalPath,
        originalImageUrl: originalImageUrl,
        compressedImagePath: compressedFile ? compressedPath : null,
        compressedImageUrl: compressedImageUrl,
        
        marketType: metadata.marketType,
        symbol: metadata.symbol || null,
        timeframe: metadata.timeframe,
        currentPrice: metadata.currentPrice ? parseFloat(metadata.currentPrice) : null,
        tradingStyle: metadata.tradingStyle,
        riskProfile: metadata.riskProfile,
        notes: metadata.notes || null,
        accountSize: metadata.accountSize ? parseFloat(metadata.accountSize) : null,
        riskPercent: metadata.riskPercent ? parseFloat(metadata.riskPercent) : null,
        
        status: "queued",
        errorCode: null,
        createdAt: Date.now(),
        startedAt: null,
        completedAt: null,
        reportId: null,
        promptVersion: null,
        modelUsed: null
      };

      const recordRef = dbRef(db, `chartScans/${uid}/${newScanId}`);
      await set(recordRef, scanData);
      
      setUploadProgress(100);
      setUploadStep('requesting_ai_analysis');
      console.log("[Upload] calling requestAnalysis", newScanId);
      
      clearTimeout(timeoutId);
      setUploading(false);
      setUploadStep('completed');
      navigate(`/scan/${newScanId}/loading`);

      // Fire and forget
      requestChartAnalysis(newScanId).then((result) => {
        console.log("[Upload] requestAnalysis result", result);
      }).catch((err) => {
        console.error("[Upload] Analysis request failed to start:", err);
      });

    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error("[Upload] Failed during upload pipeline:", error);
      if (error.code && error.code.includes('storage/')) {
        setSubmitError("Chart upload failed. Please check your connection and try again.");
      } else {
        setSubmitError("Chart uploaded, but scan record could not be created. Please try again.");
      }
      setUploading(false);
      setUploadStep('failed');
    }
  };

  return {
    selectedFile,
    previewUrl,
    validationError,
    uploading,
    uploadStep,
    uploadProgress,
    submitError,
    scanId,
    handleFileSelect,
    clearSelectedFile,
    submitScan
  };
}

