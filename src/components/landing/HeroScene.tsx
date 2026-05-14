import React, { useEffect, useRef } from 'react';
import { CandlestickChartMock } from './CandlestickChartMock';
import { FloatingLabel } from './FloatingLabel';
import { gsap } from 'gsap';

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartSceneRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup timeline for the pinned scroll scene
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1500', // 1500px scroll duration
          scrub: 1,
          pin: true,
        }
      });

      // Scale the 3D chart up
      tl.to(chartSceneRef.current, {
        scale: 1.35,
        x: -80,
        rotateY: 8,
        ease: 'none'
      }, 0);

      // Fade out the hero text slightly
      tl.to('.hero-text-content', {
        opacity: 0.25,
        y: -50,
        ease: 'none'
      }, 0);

      // Expand floating labels outward
      tl.to('.label-1', { x: -80, y: -60 }, 0);
      tl.to('.label-2', { x: 80, y: -40 }, 0);
      tl.to('.label-3', { x: 50, y: 80 }, 0);
      
      // Grow the AI orb
      tl.to('.hero-ai-orb', {
        scale: 1.4,
        opacity: 0.3,
        ease: 'none'
      }, 0);

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col justify-center perspective-scene overflow-hidden pt-20">
      
      {/* Background radial soft light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(28,95,36,0.15),transparent_60%)] pointer-events-none"></div>
      
      {/* Floor Grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none z-0 [transform:rotateX(60deg)_scale(2)_translateY(20%)] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left: Content */}
        <div className="hero-text-content z-20">
          <div className="inline-block px-3 py-1 mb-6 rounded-full border border-[#8CFF3F]/20 bg-[#8CFF3F]/5 text-[--color-tradelens-green] text-xs font-mono font-medium tracking-wide">
            AI-POWERED CHART ANALYSIS
          </div>
          <h1 className="text-6xl md:text-8xl font-serif leading-[1.05] tracking-tight mb-6">
            See the market <br />
            <span className="text-gradient-green italic">before it moves.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted font-light mb-8 max-w-lg leading-relaxed">
            Upload any candlestick chart screenshot. TradeLens AI reads market structure, patterns, support, resistance, and risk zones in seconds.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <button onClick={() => window.location.href='/signup'} className="bg-white text-black px-8 py-3 rounded-full font-medium text-sm hover:scale-105 transition-transform duration-300">
              Analyze Your Chart
            </button>
            <button className="px-8 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-colors duration-300">
              Watch Demo
            </button>
          </div>
          <p className="text-xs text-white/40 font-mono">
            Educational analysis only. Not financial advice.
          </p>
        </div>

        {/* Right: 3D Scene */}
        <div className="relative h-[400px] md:h-[600px] flex items-center justify-center pointer-events-none">
          <div ref={chartSceneRef} className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d] [transform:rotateY(-8deg)]">
            
            {/* Background glowing orb */}
            <div className="hero-ai-orb absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[--color-tradelens-green] rounded-full blur-[100px] md:blur-[140px] opacity-20 [transform:translateZ(-400px)]"></div>
            
            {/* Base platform */}
            <div className="absolute w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-to-t from-[#8CFF3F]/5 to-transparent border border-[#8CFF3F]/10 rounded-full [transform:rotateX(75deg)_translateZ(-100px)] blur-[1px]"></div>
            
            {/* Chart Container */}
            <div className="relative w-[340px] md:w-[500px] aspect-[4/3] glass-panel rounded-2xl p-4 [transform:translateZ(50px)] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-20"></div>
               <CandlestickChartMock />
            </div>

            {/* Floating Labels */}
            <FloatingLabel text="Bullish Breakout" className="label-1 top-[5%] left-[0%] md:left-[5%] [transform:translateZ(80px)]" lineDirection="bottom" />
            <FloatingLabel text="Strong Support" className="label-2 bottom-[15%] right-[-10%] md:right-[0%] [transform:translateZ(120px)]" lineDirection="top" />
            <FloatingLabel text="Smart Entry Zone" className="label-3 top-[35%] text-[#B8FF7A] -left-[10%] md:-left-[15%] [transform:translateZ(150px)]" lineDirection="right" />
            <FloatingLabel text="Pattern Detected" className="label-1 bottom-[35%] -right-[5%] md:-right-[10%] [transform:translateZ(200px)]" lineDirection="left" />
          </div>
        </div>

      </div>
    </section>
  );
}
