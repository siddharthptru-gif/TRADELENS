import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientButton } from '../components/ui/GradientButton';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif mb-2">Upload Chart</h1>
      <p className="text-muted mb-8">Drop your chart screenshot here for AI analysis.</p>
      
      <GlassCard className="p-12 mb-8 border-dashed border-white/20 hover:border-white/40 transition-colors flex flex-col items-center justify-center text-center cursor-pointer min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <span className="text-2xl opacity-50">+</span>
        </div>
        <h3 className="text-xl font-serif mb-2">Drag & Drop</h3>
        <p className="text-sm text-white/40">or click to browse. Max 8MB (WebP/JPG/PNG).</p>
      </GlassCard>
      
      <div className="flex justify-end">
        <GradientButton onClick={() => navigate('/scan/new/loading')}>Analyze Chart</GradientButton>
      </div>
    </div>
  );
}
