import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, ScanLine, ShieldAlert, BarChart3, Activity } from 'lucide-react';
import { CHART_LABELS } from '../data/mockData';
import FloatingLabel from './FloatingLabel';
import MagneticButton from './MagneticButton';
import CandlestickChartMock from './CandlestickChartMock';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSceneRef = useRef<HTMLDivElement>(null);
  const chartSceneRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Intro animation
      gsap.from('.hero-headline span', {
        y: 100, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2
      });
      gsap.from('.hero-sub', { y: 20, opacity: 0, duration: 1, delay: 0.8 });
      gsap.from('.hero-cta', { y: 20, opacity: 0, duration: 1, delay: 1, stagger: 0.1 });
      gsap.from('.floating-items', { opacity: 0, scale: 0.9, y: 50, duration: 1.5, delay: 0.8, ease: 'power3.out' });

      // Pinned Scroll Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1,
          pin: true,
        }
      });

      tl.to(scrollSceneRef.current, {
        scale: 1.4,
        x: -50,
        rotateY: 10,
        z: 50,
        ease: "power1.inOut"
      }, 0);

      tl.to('.hero-headline', { opacity: 0, y: -100, ease: "power1.inOut" }, 0);
      tl.to('.hero-sub', { opacity: 0, y: -50, ease: "power1.inOut" }, 0);
      tl.to('.hero-cta', { opacity: 0, y: -20, ease: "power1.inOut" }, 0);
      
      tl.to('.scroll-anim-label', {
        x: (i) => (i % 2 === 0 ? 100 : -100),
        y: (i) => (i % 2 === 0 ? -80 : 80),
        opacity: 0,
        ease: "power1.inOut"
      }, 0);

    }, heroRef);

    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!chartSceneRef.current) return;
      
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      
      gsap.to(chartSceneRef.current, {
        x: x * 40,
        y: y * 40,
        rotateY: x * 10 - 8, // base rotation is -8
        rotateX: -y * 10,
        duration: 1.5,
        ease: 'power2.out',
      });
      
      gsap.to('.hero-floating-label', {
        x: x * 60,
        y: y * 60,
        duration: 2,
        ease: 'power2.out',
        stagger: 0.05
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen pt-20 flex flex-col justify-center perspective-scene overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[--color-tradelens-green]/10 via-[#020403] to-[#020403] opacity-60"></div>
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 flex-1 w-full mt-10">
        
        {/* Left Content */}
        <div ref={scrollWrapperRef} className="max-w-xl z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-[--color-tradelens-green] mb-8 font-mono">
            <span className="w-1.5 h-1.5 bg-[--color-tradelens-green] rounded-full animate-pulse"></span>
            AI-Powered Chart Analysis
          </div>

          <h1 className="text-[12vw] lg:text-[6.5rem] leading-[0.85] font-serif mb-8 text-white tracking-[-0.03em] hero-headline flex flex-wrap gap-x-4">
            <span className="block overflow-hidden"><span className="inline-block">See</span></span>
            <span className="block overflow-hidden"><span className="inline-block">the</span></span>
            <span className="block overflow-hidden"><span className="inline-block">market</span></span>
            <span className="block w-full">
              <span className="inline-block text-gradient-green italic">
                before it moves.
              </span>
            </span>
          </h1>

          <p className="text-lg text-white/50 mb-10 hero-sub max-w-md font-sans">
            Upload any candlestick chart screenshot. TradeLens AI reads market structure, patterns, support, resistance, and risk zones in seconds.
          </p>

          <div className="flex flex-wrap items-center gap-4 hero-cta relative z-30">
            <MagneticButton className="bg-white text-black px-8 py-4 rounded-2xl font-bold transition-all hover:bg-[--color-tradelens-green] flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <Activity className="w-5 h-5" />
              Analyze Your Chart
            </MagneticButton>
            <MagneticButton className="px-8 py-4 rounded-2xl font-bold text-white transition-all glass-panel flex items-center gap-2 hover:bg-white/5">
              Watch Demo
            </MagneticButton>
          </div>
          
          <p className="mt-4 text-xs text-white/30 font-mono hero-cta">
            Educational analysis only. Not financial advice.
          </p>
        </div>

        {/* Right 3D Visuals */}
        <div className="relative h-[400px] md:h-[500px] lg:h-full min-h-[500px] flex items-center justify-center pointer-events-none floating-items">
          <div ref={scrollSceneRef} className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]">
            <div ref={chartSceneRef} className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d] [transform:rotateY(-8deg)]">
              
              {/* Background glowing orb */}
              <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-[--color-tradelens-green] rounded-full blur-[100px] md:blur-[120px] opacity-10 [transform:translateZ(-200px)]"></div>
              
              {/* Base platform */}
              <div className="absolute w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-gradient-to-t from-[--color-tradelens-green]/5 to-transparent border border-[--color-tradelens-green]/10 rounded-full [transform:rotateX(70deg)_translateZ(-50px)] blur-[1px]"></div>
              
              {/* Chart Container */}
              <div className="relative w-[300px] md:w-[450px] aspect-video glass-panel rounded-2xl p-4 [transform:translateZ(50px)] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                 <CandlestickChartMock />
              </div>

              {/* Floating Labels */}
              <div className="absolute inset-0 scroll-anim-label flex items-center justify-center [transform-style:preserve-3d] pointer-events-none">
                <FloatingLabel text="Bullish Breakout" className="hero-floating-label top-[10%] left-[0%] md:left-[10%] [transform:translateZ(80px)]" lineDirection="bottom" />
              </div>
              <div className="absolute inset-0 scroll-anim-label flex items-center justify-center [transform-style:preserve-3d] pointer-events-none">
                <FloatingLabel text="Strong Support" className="hero-floating-label bottom-[20%] right-[-5%] md:right-[5%] [transform:translateZ(120px)]" lineDirection="top" />
              </div>
              <div className="absolute inset-0 scroll-anim-label flex items-center justify-center [transform-style:preserve-3d] pointer-events-none">
                <FloatingLabel text="Smart Entry Zone" className="hero-floating-label top-[40%] text-[--color-tradelens-green-light] -left-[15%] md:-left-[10%] [transform:translateZ(150px)]" lineDirection="right" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
