import React, { useState } from 'react';
import { Edit3, X, Check } from 'lucide-react';

interface ReportNoteModalProps {
  initialNote: string;
  onSave: (note: string) => void;
  onCancel: () => void;
}

export function ReportNoteModal({ initialNote, onSave, onCancel }: ReportNoteModalProps) {
  const [note, setNote] = useState(initialNote || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#020403] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
        <button onClick={onCancel} className="absolute top-4 right-4 text-white/40 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        
        <h3 className="text-lg font-serif mb-6 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-[#8CFF3F]" />
          Edit Note
        </h3>
        
        <div className="mb-6">
          <textarea 
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your analysis notes here..."
            className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-[#8CFF3F]/50 transition-colors text-white resize-none"
            maxLength={1000}
          />
          <div className="text-right mt-1 text-[10px] text-white/40 font-mono tracking-widest uppercase">
            {note.length}/1000
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-white/50 hover:text-white">Cancel</button>
          <button 
            onClick={() => onSave(note.trim())}
            className="flex items-center gap-2 px-4 py-2 bg-[#8CFF3F] text-black rounded-xl text-sm font-medium hover:bg-[#7AE636] transition-colors"
          >
            <Check className="w-4 h-4" /> Save Note
          </button>
        </div>
      </div>
    </div>
  );
}
