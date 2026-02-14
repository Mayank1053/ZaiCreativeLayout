'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Ruler, CheckCircle2 } from 'lucide-react';

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} className="py-32 bg-[#0F172A] relative overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-blueprint opacity-[0.03] pointer-events-none" />
        
        {/* Blueprint Grid Background Pattern */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid-about" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500/30" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-about)" />
          </svg>
        </div>

      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text Content - Spans 6 columns */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative z-10">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="w-12 h-px bg-blue-500"></span>
              <span className="text-blue-400 text-xs tracking-[0.2em] uppercase font-mono font-medium">
                The Firm
              </span>
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-sans font-light text-4xl md:text-5xl lg:text-6xl text-white mb-10 leading-[1.1]"
            >
              We bridge the gap between <span className="font-serif italic text-blue-400">structural logic</span> and <span className="font-serif italic text-blue-400">livable art</span>.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6 text-lg text-slate-400 font-light leading-relaxed mb-8"
            >
              <p>
                At Creative Layout, our focus is grounded in the reality of construction. We specialize in 
                <strong className="text-white font-medium"> comprehensive floor planning</strong> and 
                <strong className="text-white font-medium"> layout optimization</strong> that respects both modern engineering and ancient Vastu principles.
              </p>
              <p>
                Led by Architect Prashant Ambilkar, we ensure that every line drawn on paper translates 
                flawlessly to the construction site. No ambiguity, just precise execution.
              </p>
            </motion.div>

             <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
            >
                {["Vastu Shastra Compliant","Municipal Approved", "Structural Stability", "Cost-Effective Planning", "Site Supervision"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 font-mono text-sm">
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        {item}
                    </li>
                ))}
            </motion.ul>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/process" className="group inline-flex items-center gap-2 text-white font-mono text-sm uppercase tracking-wide border-b border-white/20 pb-1 hover:border-blue-500 hover:text-blue-400 transition-colors">
                Our Workflow
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Image Composition - Spans 6 columns */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative min-h-[600px] flex items-center justify-center lg:justify-end">
            
            {/* Main Image - Blueprint / Plan */}
            <motion.div 
              style={{ y: y1 }}
              className="relative w-full max-w-[500px] aspect-4/5 z-10 shadow-2xl border-4 border-white bg-white"
            >
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
                alt="Architectural Blueprint"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Overlay lines */}
                <div className="absolute inset-0 border border-white/20 m-4 pointer-events-none" />
                <div className="absolute bottom-6 right-6 font-mono text-xs text-blue-200 bg-slate-900/80 backdrop-blur-sm border border-blue-500/30 px-3 py-1">
                    PROJECT: RES-44
                </div>
            </motion.div>

            <motion.div 
              style={{ y: y2 }}
              className="absolute -bottom-4 -left-4 sm:-bottom-10 sm:-left-10 w-36 sm:w-56 md:w-[260px] aspect-square z-20 shadow-xl bg-slate-900/90 backdrop-blur-md border border-white/10 p-4 sm:p-6 flex flex-col justify-between text-white shadow-blue-900/20"
            >
              <Ruler className="w-5 h-5 sm:w-8 sm:h-8 text-blue-500" />
              <div>
                  <div className="text-2xl sm:text-4xl font-mono font-bold mb-1">100%</div>
                  <div className="text-[10px] sm:text-sm font-mono opacity-80 uppercase tracking-wider leading-tight">Precision in<br/>Measurement</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
