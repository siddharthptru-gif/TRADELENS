import React, { useState } from 'react';
import { EnrichedSavedReport } from '../../types/savedReport';
import { GlassCard } from '../ui/GlassCard';
import { cn } from '../../lib/utils';
import { Shield, Clock, TrendingUp, AlertTriangle, FileBarChart2, Tag as TagIcon, X, Maximize2, Trash2, Edit3, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BrokenImageFallback } from '../ui/BrokenImageFallback';

interface SavedReportCardProps {
  data: EnrichedSavedReport;
  onEditTags: () => void;
  onEditNote: () => void;
  onRemove: () => void;
}

export function SavedReportCard({ data, onEditTags, onEditNote, onRemove }: SavedReportCardProps) {
  const navigate = useNavigate();
  
  const savedData = data.savedData;
  const report = data.reportData;
  const scan = data.scanData;

  const symbol = scan?.symbol || "Unknown";
  const marketType = scan?.marketType || "unknown";
  const timeframe = scan?.timeframe || "unknown";
  const imageUrl = scan?.compressedImageUrl || scan?.imageUrl || scan?.originalImageUrl;
  
  const score = report?.tradeQualityScore || 0;
  const stance = report?.finalStance || "Unknown Stance";
  const risk = report?.riskLevel || "unknown";
  const trend = report?.trendDirection || "unknown";
  const summary = report?.quickSummary || "Original report not found.";
  
  const savedDate = new Date(savedData.savedAt).toLocaleDateString();

  return (
    <GlassCard className="flex flex-col overflow-hidden h-full group p-0 transition-all hover:shadow-[0_8px_30px_rgba(140,255,63,0.05)] hover:-translate-y-1">
      {/* Thumbnail Header */}
      <div className="relative h-48 w-full bg-black/50 border-b border-white/5 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt="thumbnail" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
        ) : (
          <BrokenImageFallback className="w-full h-full" iconSize="m" />
        )}
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-xs font-bold text-white uppercase tracking-wider">
            {symbol}
          </span>
          <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-xs text-white/70 uppercase">
            {marketType}
          </span>
        </div>
        
        {/* Score Dial */}
        <div className="absolute -bottom-6 right-4">
          <div className="w-14 h-14 rounded-full bg-[#020403] border-4 border-[#8CFF3F]/20 flex flex-col items-center justify-center shadow-xl">
            <span className="text-sm font-bold text-[#8CFF3F]">{score}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        
        <div className="flex items-center gap-2 mb-4 pr-12">
          <span className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 bg-white/5 rounded text-white/90 border border-white/10">
            <Clock className="w-3 h-3 text-[#8CFF3F]" />
            {timeframe}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 bg-white/5 rounded text-white/90 border border-white/10">
            <Shield className="w-3 h-3 text-[#FF5C7A]" />
            {stance}
          </span>
        </div>

        <p className="text-sm text-white/60 mb-6 line-clamp-3 leading-relaxed flex-1">
          {summary}
        </p>

        {/* Tags & Note */}
        <div className="space-y-3 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {(savedData.tags || []).map((t, idx) => (
              <span key={idx} className="flex items-center gap-1 text-[10px] uppercase font-mono px-2 py-0.5 bg-[#8CFF3F]/10 text-[#8CFF3F] border border-[#8CFF3F]/20 rounded">
                <TagIcon className="w-3 h-3" />
                {t}
              </span>
            ))}
            <button onClick={onEditTags} className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors border border-white/10">
              <PlusIcon />
            </button>
          </div>
          
          {savedData.userNote ? (
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg relative group/note">
              <p className="text-xs text-white/70 italic line-clamp-2">"{savedData.userNote}"</p>
              <button onClick={onEditNote} className="absolute top-2 right-2 p-1 text-white/30 hover:text-white opacity-0 group-hover/note:opacity-100 transition-all">
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button onClick={onEditNote} className="text-xs text-white/30 hover:text-white/70 flex items-center gap-1 transition-colors">
              <Edit3 className="w-3 h-3" /> Add note
            </button>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-[10px] text-white/40 uppercase tracking-widest flex flex-col">
            <span>Saved {savedDate}</span>
          </span>
          
          <div className="flex gap-2">
            <button 
              onClick={onRemove}
              className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/50 hover:text-[#FF5C7A] hover:border-[#FF5C7A]/30 transition-colors"
              title="Remove from saved"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate(`/report/${savedData.reportId}`)}
              className="px-4 py-2 bg-[#8CFF3F]/10 border border-[#8CFF3F]/20 text-[#8CFF3F] hover:bg-[#8CFF3F]/20 rounded-lg text-sm font-medium transition-colors"
            >
              Open Report
            </button>
          </div>
        </div>

      </div>
    </GlassCard>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
