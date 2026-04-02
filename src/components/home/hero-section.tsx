'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { m, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Ruler, Compass, PenTool } from 'lucide-react';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-dvh w-full overflow-hidden bg-surface-primary text-heading flex flex-col"
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
      
      {/* Animated Construction Lines Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <svg className="w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" style={{ color: 'var(--border-accent)' }} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Animated Paths */}
          <m.path
            d="M 100,500 L 900,500"
            fill="none"
            stroke="var(--accent-blue)"
            strokeWidth="1"
            strokeDasharray="10 10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <m.path
            d="M 500,100 L 500,900"
            fill="none"
            stroke="var(--accent-blue)"
            strokeWidth="1"
            strokeDasharray="10 10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 4, delay: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24 flex flex-col justify-center pt-24 pb-32 sm:pb-20">
        <m.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="max-w-5xl"
        >
          {/* Taglines */}
          <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-4">
             <m.span 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="px-3 py-1 border font-mono text-[10px] sm:text-xs uppercase tracking-widest backdrop-blur-sm bg-tag-bg border-tag-border text-tag-text"
             >
              Vastu Compliant
            </m.span>
             <m.span 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.3 }}
               className="px-3 py-1 border font-mono text-[10px] sm:text-xs uppercase tracking-widest backdrop-blur-sm bg-tag-bg border-tag-border text-tag-text"
             >
              Structural Layouts
            </m.span>
             <m.span 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.4 }}
               className="px-3 py-1 border font-mono text-[10px] sm:text-xs uppercase tracking-widest backdrop-blur-sm bg-tag-bg border-tag-border text-tag-text"
             >
              Municipal Approval
            </m.span>
             <m.span 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.4 }}
               className="px-3 py-1 border font-mono text-[10px] sm:text-xs uppercase tracking-widest backdrop-blur-sm bg-tag-bg border-tag-border text-tag-text"
             >
              Construction
            </m.span>
          </div>

          {/* Heading */}
          <h1 className="font-sans font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl tracking-tight leading-[1.1] sm:leading-[0.95] mb-6 sm:mb-6 mt-4 sm:mt-8 text-heading">
            <span className="block">Precision in</span>
            <span className="block font-serif italic text-accent-blue ml-[5vw]">Planning.</span>
            <span className="block">Perfection in</span>
            <span className="block font-serif italic text-accent-blue ml-[10vw]">Construction.</span>
          </h1>

          {/* Description */}
          <p className="max-w-xl text-sm sm:text-lg text-text-secondary mb-8 sm:mb-12 border-l-2 border-accent-blue pl-4 sm:pl-6 leading-relaxed">
            We don't just design; we engineer your dream. From Vastu-compliant floor analysis to the final concrete pour, we master the entire construction lifecycle.
          </p>

        </m.div>

        <m.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }}
          className="mt-8 md:mt-auto flex justify-start md:justify-end w-full"
        >
          <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-4 sm:gap-6">
            <Link 
              href="/projects" 
              className="group relative overflow-hidden flex items-center justify-center sm:justify-between px-8 py-4 text-white transition-all w-full sm:w-auto"
              style={{ backgroundColor: 'var(--btn-primary-bg)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)'}
            >
              <span className="uppercase tracking-widest text-sm mr-0 sm:mr-8 relative z-10 font-medium">View Our Projects</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform ml-4 sm:ml-0" />
            </Link>
            <Link 
              href="/contact" 
              className="group flex items-center justify-center sm:justify-between px-8 py-4 border transition-colors backdrop-blur-sm w-full sm:w-auto border-border-line text-text-secondary hover:border-accent-blue hover:text-heading"
            >
              <span className="uppercase tracking-widest text-sm mr-0 sm:mr-8 font-medium">Start Your Project</span>
              <PenTool className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform ml-4 sm:ml-0" />
            </Link>
          </div>
        </m.div>
      </div>
      
       {/* Technical Stats / Footer of Hero */}
       <div className="absolute bottom-0 left-0 w-full border-t py-4 z-20 backdrop-blur-md" style={{ backgroundColor: 'var(--surface-overlay-heavy)', borderColor: 'var(--border-line)' }}>
         <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24 flex justify-between items-center text-[10px] sm:text-xs font-mono text-text-muted uppercase tracking-widest">
           <div className="hidden md:flex items-center gap-12">
             <div className="flex items-center gap-2 text-text-secondary"><Ruler className="w-3 h-3 text-accent-blue" /> Area Analysis</div>
             <div className="flex items-center gap-2 text-text-secondary"><Compass className="w-3 h-3 text-accent-blue" /> Orientation Check</div>
           </div>
           <div className="flex items-center gap-2">
            Scroll to Explore
            <div className="w-8 h-px bg-text-muted" />
           </div>
         </div>
       </div>

    </section>
  );
}
