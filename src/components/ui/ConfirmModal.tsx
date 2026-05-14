import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  onConfirm,
  onCancel
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onCancel}
        />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative bg-[#020403] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl z-10"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-white/5 ${danger ? 'text-[#FF5C7A]' : 'text-blue-400'}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <button onClick={onCancel} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <h3 className="text-xl font-serif text-white mb-2">{title}</h3>
          <p className="text-sm text-white/60 mb-6 leading-relaxed">
            {message}
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 text-sm font-bold text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-colors text-[#020403] ${
                danger ? 'bg-[#FF5C7A] hover:bg-[#ff7a93]' : 'bg-[#8CFF3F] hover:bg-[#9dff5c]'
              }`}
            >
              {confirmLabel}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
