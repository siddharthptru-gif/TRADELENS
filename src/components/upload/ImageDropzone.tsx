import React, { useCallback } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  onFileSelect: (file: File) => void;
  disabled: boolean;
}

export function ImageDropzone({ onFileSelect, disabled }: Props) {
  const [isDragActive, setIsDragActive] = React.useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [disabled, onFileSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handlePaste = useCallback((e: ClipboardEvent) => {
    if (disabled) return;
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            onFileSelect(file);
            break;
          }
        }
      }
    }
  }, [disabled, onFileSelect]);

  React.useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  return (
    <div
      className={cn(
        "relative rounded-2xl border-2 border-dashed p-12 transition-all flex flex-col items-center justify-center text-center cursor-pointer min-h-[300px]",
        disabled ? "opacity-50 cursor-not-allowed border-white/5 bg-white/[0.02]" : "hover:bg-white/[0.04]",
        isDragActive ? "border-[#8CFF3F] bg-[#8CFF3F]/5" : "border-white/10"
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => !disabled && document.getElementById('chart-upload-input')?.click()}
    >
      <input
        id="chart-upload-input"
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
      />
      <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors", isDragActive ? "bg-[#8CFF3F]/10 text-[#8CFF3F]" : "bg-white/5 text-white/50")}>
        {isDragActive ? <UploadCloud className="w-8 h-8" /> : <ImageIcon className="w-8 h-8" />}
      </div>
      <h3 className={cn("text-xl font-serif mb-2 transition-colors", isDragActive && "text-[#8CFF3F]")}>
        {isDragActive ? "Drop image here" : "Drag & drop your chart"}
      </h3>
      <p className="text-sm text-muted max-w-[250px] mb-6">
        Supports PNG, JPG, or WEBP up to 8MB. Standard resolution is minimum 600x400. You can also paste from clipboard.
      </p>
      <div className="px-6 py-2 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors">
        Browse Files
      </div>
    </div>
  );
}
