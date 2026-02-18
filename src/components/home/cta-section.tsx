'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-40 bg-[#0F172A] text-white flex items-center justify-center min-h-[60vh] relative overflow-hidden">
      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid-cta" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-cta)" />
        </svg>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 text-center relative z-10">
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Decorative lines */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-24 bg-linear-to-b from-transparent to-blue-500/50" />
          
          <h2 className="font-serif text-5xl md:text-7xl lg:text-9xl mb-16 leading-none tracking-tight">
            Let&apos;s build the <br /> 
            <span className="italic text-blue-400">extraordinary.</span>
          </h2>
          
          <Link 
            href="/contact" 
            className="group relative inline-flex items-center gap-6 text-xl sm:text-2xl tracking-widest uppercase font-light border border-white/10 px-10 py-5 hover:bg-white/5 hover:border-blue-500/50 transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10">Start a Conversation</span>
            <ArrowRight className="w-6 h-6 relative z-10 transform group-hover:translate-x-2 transition-transform duration-500 text-blue-500" />
            
            {/* Hover fill effect */}
            <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
          
          <div className="mt-16 text-slate-500 font-mono text-xs uppercase tracking-[0.5em] opacity-50">
            Available for collaborations
          </div>
        </m.div>
      </div>
    </section>
  );
}
