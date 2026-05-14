import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGSAPAnimations() {
  useEffect(() => {
    // This allows re-triggering on route changes if needed
    ScrollTrigger.refresh();
  }, []);
}
