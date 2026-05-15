import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useChartUpload, UploadMetadata } from '../hooks/useChartUpload';
import { ImageDropzone } from '../components/upload/ImageDropzone';
import { ChartPreview } from '../components/upload/ChartPreview';
import { MetadataForm } from '../components/upload/MetadataForm';
import { UploadSafetyNote } from '../components/upload/UploadSafetyNote';
import { UploadProgress } from '../components/upload/UploadProgress';
import { GradientButton } from '../components/ui/GradientButton';
import { PageTransition } from '../components/ui/PageTransition';
import { PageHeader } from '../components/layout/PageHeader';

export default function Upload() {
  const { user } = useAuth();
  
  const {
    selectedFile,
    previewUrl,
    validationError,
    uploading,
    uploadStep,
    uploadProgress,
    submitError,
    handleFileSelect,
    clearSelectedFile,
    submitScan
  } = useChartUpload();

  const [metadata, setMetadata] = useState<UploadMetadata>({
    marketType: 'unknown',
    timeframe: 'unknown',
    symbol: '',
    currentPrice: '',
    tradingStyle: 'swing',
    riskProfile: 'medium',
    notes: '',
    accountSize: '',
    riskPercent: ''
  });

  const handleMetadataChange = (key: keyof UploadMetadata, value: any) => {
    setMetadata(prev => ({ ...prev, [key]: value }));
  };

  const handleAnalyze = () => {
    submitScan(metadata);
  };

  const getButtonText = () => {
    switch (uploadStep) {
      case 'validating': return 'Validating Image...';
      case 'compressing': return 'Compressing...';
      case 'uploading_original': return 'Uploading Original...';
      case 'uploading_compressed': return 'Uploading Optimized...';
      case 'writing_scan_record': return 'Saving Record...';
      case 'requesting_ai_analysis': return 'Starting Analysis...';
      case 'completed': return 'Navigating...';
      default: return uploading ? 'Uploading chart...' : 'Analyze Chart';
    }
  };

  return (
    <PageTransition>
      <PageHeader 
        title="Analyze a Chart" 
        subtitle="Upload a candlestick screenshot and add context so TradeLens AI can prepare a structured educational analysis."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 flex flex-col gap-6">
          {!selectedFile || !previewUrl ? (
            <ImageDropzone onFileSelect={handleFileSelect} disabled={uploading} />
          ) : (
            <ChartPreview 
              file={selectedFile} 
              previewUrl={previewUrl} 
              onClear={clearSelectedFile} 
              disabled={uploading} 
            />
          )}
          
          {validationError && (
            <div className="p-4 bg-[--color-tradelens-red]/10 border border-[--color-tradelens-red]/20 text-[--color-tradelens-red] text-sm rounded-xl">
              {validationError}
            </div>
          )}
          
          <UploadSafetyNote />
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <MetadataForm 
            metadata={metadata} 
            onChange={handleMetadataChange} 
            disabled={uploading} 
          />

          {submitError && (
            <div className="mt-4 p-4 bg-[--color-tradelens-red]/10 border border-[--color-tradelens-red]/20 text-[--color-tradelens-red] text-sm rounded-xl">
              {submitError}
            </div>
          )}

          <UploadProgress progress={uploadProgress} />

          <GradientButton 
            className="w-full mt-6 py-5 text-lg"
            disabled={!selectedFile || !!validationError || uploading}
            onClick={handleAnalyze}
          >
            {getButtonText()}
          </GradientButton>
          
          <p className="text-[10px] text-center text-muted mt-4 uppercase tracking-wider">
            Educational analysis only. Not financial advice.
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
