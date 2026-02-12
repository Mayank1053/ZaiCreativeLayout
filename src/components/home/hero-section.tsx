'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden bg-zinc-900"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2400&q=80"
          alt="Luxury Architectural Design"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24 flex flex-col justify-end pb-32">
        <motion.div 
          style={{ opacity }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          <div className="overflow-hidden mb-4">
            <motion.p 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-accent tracking-[0.3em] uppercase text-sm font-medium pl-1"
            >
              Architecture & Construction Studio
            </motion.p>
          </div>

          <h1 className="text-white font-sans font-light leading-[0.9] tracking-tight mb-8">
            <span className="block text-[clamp(3.5rem,8vw,9rem)]">
              Designing
            </span>
            <span className="block text-[clamp(3.5rem,8vw,9rem)] font-serif italic text-white/90 ml-[10vw] sm:ml-[15vw]">
              Spaces That
            </span>
            <span className="block text-[clamp(3.5rem,8vw,9rem)] text-accent">
              Inspire.
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center mt-12 pl-1">
            <Link 
              href="/projects" 
              className="group flex items-center gap-4 text-white hover:text-accent transition-colors duration-300"
            >
              <span className="text-lg tracking-wide border-b border-white/30 pb-1 group-hover:border-accent">
                View Projects
              </span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            
            <Link 
              href="/contact" 
              className="group flex items-center gap-4 text-white/70 hover:text-white transition-colors duration-300"
            >
              <span className="text-lg tracking-wide border-b border-transparent pb-1 group-hover:border-white">
                Get in Touch
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 right-12 z-10 hidden sm:flex items-center gap-4 text-white/50 text-xs tracking-widest uppercase rotate-90 origin-right translate-x-8"
      >
        <span>Scroll to Explore</span>
        <div className="w-12 h-[1px] bg-white/30" />
      </motion.div>
    </section>
  );
}
