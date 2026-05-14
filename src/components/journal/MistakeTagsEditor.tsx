import React, { useState } from 'react';
import { Tag, X, Plus } from 'lucide-react';

interface MistakeTagsEditorProps {
  initialTags: string[];
  onSave: (tags: string[]) => void;
}

const SUGGESTED_TAGS = [
  'chased entry', 'entered near resistance', 'shorted into support',
  'ignored invalidation', 'no confirmation', 'poor risk reward',
  'revenge trade', 'fear of missing out', 'oversized position',
  'ignored higher timeframe', 'traded mid-range', 'unclear setup',
  'emotional entry', 'early exit', 'late exit', 'no journal before entry'
];

export function MistakeTagsEditor({ initialTags, onSave }: MistakeTagsEditorProps) {
  const [tags, setTags] = useState<string[]>(initialTags || []);
  const [input, setInput] = useState('');

  const addTag = (val: string) => {
    const t = val.trim().toLowerCase();
    if (t && !tags.includes(t) && tags.length < 15 && t.length <= 32) {
      const newTags = [...tags, t];
      setTags(newTags);
      onSave(newTags);
      setInput('');
    }
  };

  const removeTag = (t: string) => {
    const newTags = tags.filter(tag => tag !== t);
    setTags(newTags);
    onSave(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(input);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-white/5 border border-white/5 rounded-xl">
        {tags.map((t, idx) => (
          <span key={idx} className="flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 bg-[#FF5C7A]/10 text-[#FF5C7A] border border-[#FF5C7A]/20 rounded group">
            {t}
            <button onClick={() => removeTag(t)} className="ml-1 text-[#FF5C7A]/50 group-hover:text-[#FF5C7A]">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {tags.length === 0 && <span className="text-sm text-white/30 italic">No mistake tags</span>}
      </div>
      
      <div className="flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add custom mistake..."
          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#FF5C7A]/50 transition-colors text-white"
          maxLength={32}
        />
        <button 
          onClick={() => addTag(input)}
          disabled={!input.trim() || tags.length >= 15}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div>
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Suggested</p>
        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto no-scrollbar pb-2">
          {SUGGESTED_TAGS.map(t => {
            const isAdded = tags.includes(t);
            return (
              <button
                key={t}
                onClick={() => addTag(t)}
                disabled={isAdded || tags.length >= 15}
                className={`text-[9px] uppercase tracking-wider px-2 py-1 rounded border transition-colors ${
                  isAdded 
                    ? 'bg-[#FF5C7A]/20 text-[#FF5C7A] border-[#FF5C7A]/30 opacity-50 cursor-not-allowed' 
                    : 'bg-black border-white/10 text-white/50 hover:border-white/30'
                }`}
              >
                + {t}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
