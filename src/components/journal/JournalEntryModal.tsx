import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { EnrichedJournalEntry, JournalEntry, UserDecision, EmotionalState } from '../../types/journal';
import { OutcomeEditor } from './OutcomeEditor';
import { MistakeTagsEditor } from './MistakeTagsEditor';
import { FollowUpUpload } from './FollowUpUpload';

interface JournalEntryModalProps {
  data: EnrichedJournalEntry;
  onSave: (updates: Partial<JournalEntry>) => void;
  onUploadFollowUp: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
  onClose: () => void;
}

export function JournalEntryModal({ data, onSave, onUploadFollowUp, onClose }: JournalEntryModalProps) {
  const j = data.journal;
  
  const [setupType, setSetupType] = useState(j.setupType || '');
  const [userDecision, setUserDecision] = useState<UserDecision | ''>(j.userDecision || '');
  const [emotionalState, setEmotionalState] = useState<EmotionalState | ''>(j.emotionalState || '');
  const [mistakeNotes, setMistakeNotes] = useState(j.mistakeNotes || '');
  const [followUpNotes, setFollowUpNotes] = useState(j.followUpNotes || '');
  const [lessonsLearned, setLessonsLearned] = useState(j.lessonsLearned || '');
  
  const handleSaveAll = () => {
    onSave({
      setupType,
      userDecision: userDecision || undefined,
      emotionalState: emotionalState || undefined,
      mistakeNotes,
      followUpNotes,
      lessonsLearned
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm sm:items-stretch sm:justify-end">
      {/* Drawer Style on Mobile/Desktop */}
      <div className="w-full max-w-2xl bg-[#020403] border-l border-white/10 shadow-2xl relative flex flex-col h-full rounded-2xl sm:rounded-none sm:h-auto overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
          <div>
            <h2 className="text-xl font-serif text-white">Edit Journal Entry</h2>
            <p className="text-sm text-white/50">{j.symbol} • {new Date(j.createdAt).toLocaleDateString()}</p>
          </div>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white bg-white/5 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
          
          {/* Section: Trade Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white/90 uppercase tracking-widest border-b border-white/10 pb-2">Trade Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Setup Type</label>
                <input 
                  type="text" 
                  value={setupType}
                  onChange={(e) => setSetupType(e.target.value)}
                  placeholder="e.g. Breakout, Pullback..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#8CFF3F]/50 transition-colors text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">User Decision</label>
                <select 
                  value={userDecision}
                  onChange={(e) => setUserDecision(e.target.value as UserDecision)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#8CFF3F]/50 transition-colors text-white/90"
                >
                  <option value="">Select...</option>
                  <option value="entered">Entered</option>
                  <option value="skipped">Skipped</option>
                  <option value="watchlist">Watchlist</option>
                  <option value="paper_trade">Paper Trade</option>
                  <option value="avoided">Avoided</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Outcome & Execution */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white/90 uppercase tracking-widest border-b border-white/10 pb-2">Outcome</h3>
            <OutcomeEditor 
              initialResult={j.result}
              initialRMultiple={j.rMultiple}
              initialEntry={j.entryPrice}
              initialExit={j.exitPrice}
              onSave={(result, rMultiple, entryPrice, exitPrice) => {
                onSave({ result: result as any, rMultiple, entryPrice, exitPrice });
              }}
            />
          </div>

          {/* Section: Psychology */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white/90 uppercase tracking-widest border-b border-white/10 pb-2">Psychology</h3>
             <div>
                <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-2">Emotional State</label>
                <div className="flex flex-wrap gap-2">
                  {['calm', 'confident', 'fearful', 'greedy', 'rushed', 'frustrated', 'neutral'].map(es => (
                    <button
                      key={es}
                      onClick={() => setEmotionalState(es as EmotionalState)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize border transition-colors ${
                        emotionalState === es 
                          ? 'bg-[#8CFF3F]/20 border-[#8CFF3F]/40 text-[#8CFF3F]' 
                          : 'bg-black border-white/10 text-white/50 hover:border-white/30'
                      }`}
                    >
                      {es}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1 mt-4">Mistake Tags (Losses & Errors)</label>
                <MistakeTagsEditor 
                  initialTags={j.mistakeTags || []}
                  onSave={(tags) => onSave({ mistakeTags: tags })}
                />
              </div>

              <div>
                <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1 mt-4">Mistake Notes</label>
                <textarea 
                  value={mistakeNotes}
                  onChange={(e) => setMistakeNotes(e.target.value)}
                  placeholder="What went wrong? execution error? emotional tilt?"
                  className="w-full h-24 bg-black/40 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-[#FF5C7A]/50 transition-colors text-white resize-none"
                />
              </div>
          </div>

           {/* Section: Follow Up & Lessons */}
           <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#8CFF3F] uppercase tracking-widest border-b border-[#8CFF3F]/20 pb-2">Review & Growth</h3>
            
            <div>
              <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1">Follow-Up Screenshot</label>
              <FollowUpUpload 
                currentUrl={j.followUpImageUrl}
                onUpload={onUploadFollowUp}
                onRemove={j.followUpImageUrl ? () => onSave({ followUpImagePath: '', followUpImageUrl: '' }) : undefined}
              />
            </div>

            <div>
              <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1 mt-4">Follow-Up Notes</label>
              <textarea 
                value={followUpNotes}
                onChange={(e) => setFollowUpNotes(e.target.value)}
                placeholder="What happened after the entry? Did it hit target?"
                className="w-full h-24 bg-black/40 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-[#8CFF3F]/50 transition-colors text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1 mt-4">Lessons Learned</label>
              <textarea 
                value={lessonsLearned}
                onChange={(e) => setLessonsLearned(e.target.value)}
                placeholder="Key takeaway to improve next time..."
                className="w-full h-24 bg-black/40 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-[#8CFF3F]/50 transition-colors text-white resize-none"
              />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/40 flex justify-end gap-3 mt-auto">
          <button onClick={onClose} className="px-6 py-2 rounded-xl text-sm font-bold text-white/50 hover:text-white transition-colors">
            Close
          </button>
          <button 
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-6 py-2 bg-[#8CFF3F] text-black rounded-xl text-sm font-bold hover:bg-[#7AE636] transition-colors"
          >
            <Check className="w-4 h-4" /> Save Details
          </button>
        </div>

      </div>
    </div>
  );
}
