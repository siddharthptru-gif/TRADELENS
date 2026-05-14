import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export default function AnimatedCounter({ end, duration = 2, prefix = '', suffix = '', className, decimals = 0 }: AnimatedCounterProps) {
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = countRef.current;
    if (!el || hasAnimated) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: end,
            duration: duration,
            ease: 'power2.out',
            snap: { innerText: Math.pow(10, -decimals) },
            onUpdate: function() {
              el.innerText = prefix + Number(this.targets()[0].innerText).toFixed(decimals) + suffix;
            }
          }
        );
        setHasAnimated(true);
      }
    });
  }, [end, duration, prefix, suffix, decimals, hasAnimated]);

  return <span ref={countRef} className={className}>{prefix}0{suffix}</span>;
}
