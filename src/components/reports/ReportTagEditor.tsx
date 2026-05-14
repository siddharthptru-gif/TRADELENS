import React, { useState, useEffect } from 'react';
import { Tag, X, Check } from 'lucide-react';

interface ReportTagEditorProps {
  initialTags: string[];
  onSave: (tags: string[]) => void;
  onCancel: () => void;
}

export function ReportTagEditor({ initialTags, onSave, onCancel }: ReportTagEditorProps) {
  const [tags, setTags] = useState<string[]>(initialTags || []);
  const [input, setInput] = useState('');

  const addTag = () => {
    const val = input.trim().toLowerCase();
    if (val && !tags.includes(val) && tags.length < 10 && val.length <= 24) {
      setTags([...tags, val]);
      setInput('');
    }
  };

  const removeTag = (t: string) => {
    setTags(tags.filter(tag => tag !== t));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#020403] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
        <button onClick={onCancel} className="absolute top-4 right-4 text-white/40 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        
        <h3 className="text-lg font-serif mb-6 flex items-center gap-2">
          <Tag className="w-5 h-5 text-[#8CFF3F]" />
          Edit Tags
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-4 min-h-[40px] p-3 bg-white/5 border border-white/5 rounded-xl">
          {tags.map((t, idx) => (
            <span key={idx} className="flex items-center gap-1 text-xs px-2 py-1 bg-[#8CFF3F]/10 text-[#8CFF3F] border border-[#8CFF3F]/20 rounded group">
              {t}
              <button onClick={() => removeTag(t)} className="ml-1 text-[#8CFF3F]/50 group-hover:text-[#8CFF3F]">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {tags.length === 0 && <span className="text-sm text-white/30 italic">No tags added</span>}
        </div>
        
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a tag..."
            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#8CFF3F]/50 transition-colors text-white"
            maxLength={24}
            disabled={tags.length >= 10}
          />
          <button 
            onClick={addTag}
            disabled={tags.length >= 10 || !input.trim()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-white/50 hover:text-white">Cancel</button>
          <button 
            onClick={() => onSave(tags)}
            className="flex items-center gap-2 px-4 py-2 bg-[#8CFF3F] text-black rounded-xl text-sm font-medium hover:bg-[#7AE636] transition-colors"
          >
            <Check className="w-4 h-4" /> Save Tags
          </button>
        </div>
      </div>
    </div>
  );
}
