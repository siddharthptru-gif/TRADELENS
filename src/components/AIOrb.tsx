import React from 'react';
import { cn } from '../lib/utils';

export default function AIOrb({ className, hideCore }: { className?: string, hideCore?: boolean }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className="absolute w-full h-full rounded-full border border-[--color-tradelens-green]/20 bg-[radial-gradient(ellipse_at_center,_rgba(140,255,63,0.15)_0%,_transparent_70%)] [box-shadow:inset_0_0_50px_rgba(140,255,63,0.1)]"></div>
      
      {/* Target/Symbol inside Orb */}
      {!hideCore && (
        <div className="absolute w-[30%] h-[30%] rounded-sm bg-[--color-tradelens-green] rotate-45 [box-shadow:0_0_30px_rgba(140,255,63,0.5)]"></div>
      )}
      
      {/* Rings */}
      <div className="absolute inset-[-20%] border border-[--color-tradelens-green]/30 rounded-full [animation:spin_15s_linear_infinite]"></div>
      <div className="absolute inset-[-40%] border border-white/5 rounded-full [animation:spin_25s_linear_infinite_reverse]"></div>
      
      {/* Particles */}
      {!hideCore && [...Array(6)].map((_, i) => (
        <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-[--color-tradelens-green] shadow-[0_0_10px_rgba(140,255,63,1)]"
             style={{
               top: '50%', left: '50%',
               transform: `rotate(${i * 60}deg) translateX(${100 + (i % 2) * 50}px)`,
               transformOrigin: `0 0`,
               animation: `spin ${10 + i * 2}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`
             }}>
        </div>
      ))}
    </div>
  );
}
