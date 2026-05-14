import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, Check, Loader2, Trash2 } from 'lucide-react';

interface FollowUpUploadProps {
  currentUrl?: string;
  onUpload: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
  onRemove?: () => void;
}

export function FollowUpUpload({ currentUrl, onUpload, onRemove }: FollowUpUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      setError("File must be less than 8MB");
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError("Must be an image file");
      return;
    }

    setError(null);
    setUploading(true);
    const res = await onUpload(file);
    setUploading(false);
    
    if (!res.success) {
      setError(res.error || "Upload failed");
    }
  };

  return (
    <div className="space-y-3">
      {currentUrl ? (
        <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-black/50">
          <img src={currentUrl} alt="Follow up" className="w-full h-48 object-cover opacity-80" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button 
              onClick={() => window.open(currentUrl, '_blank')}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white backdrop-blur-sm transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            {onRemove && (
              <button 
                onClick={onRemove}
                className="p-2 bg-white/10 hover:bg-[#FF5C7A]/20 hover:text-[#FF5C7A] rounded-lg text-white backdrop-blur-sm transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`h-32 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
            uploading ? 'opacity-50 pointer-events-none' : 'hover:border-[#8CFF3F]/30 hover:bg-white/[0.02]'
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-6 h-6 text-[#8CFF3F] animate-spin mb-2" />
              <span className="text-xs text-white/50">Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-6 h-6 text-white/30 mb-2" />
              <span className="text-xs text-white/50">Upload follow-up screenshot (Images, max 8MB)</span>
            </>
          )}
        </div>
      )}
      
      {error && <p className="text-[10px] text-[#FF5C7A]">{error}</p>}

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFile} 
        className="hidden" 
        accept="image/png, image/jpeg, image/webp" 
      />
    </div>
  );
}
