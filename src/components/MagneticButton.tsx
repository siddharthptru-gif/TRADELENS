import React, { useRef, ReactNode } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';
import { cn } from '../lib/utils';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function MagneticButton({ children, strength = 0.2, className, ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useMagnetic(buttonRef, strength);

  return (
    <button
      ref={buttonRef}
      className={cn('relative inline-flex items-center justify-center font-bold transition-colors', className)}
      {...props}
    >
      {children}
    </button>
  );
}
