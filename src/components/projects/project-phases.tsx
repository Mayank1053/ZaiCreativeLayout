'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Phase {
  id: string;
  title: string;
  date: Date | null;
  description: string | null;
  images: string[];
  order: number;
}

interface ProjectPhasesProps {
  phases: Phase[];
  className?: string;
}

export function ProjectPhases({ phases, className }: ProjectPhasesProps) {
  if (!phases || phases.length === 0) return null;

  return (
    <section className={cn("py-24 relative overflow-hidden bg-[#0F172A] border-t border-white/5", className)}>
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-blueprint opacity-[0.03] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
         <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 flex items-center justify-center gap-4 text-white">
              <span className="w-8 md:w-16 h-px bg-accent/50 inline-block"></span>
              The Journey
              <span className="w-8 md:w-16 h-px bg-accent/50 inline-block"></span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-light leading-relaxed text-lg">
              Witness the evolution of the project from concept to reality.
            </p>
        </div>

        <div className="space-y-24">
          {phases.map((phase, index) => (
            <motion.div 
              key={phase.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              {/* Decoration Line */}
              <div className="absolute left-0 -top-12 w-px h-24 bg-linear-to-b from-transparent via-accent/30 to-transparent hidden md:block" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                
                {/* Content Side */}
                <div className={cn(
                  "lg:col-span-4 flex flex-col justify-center",
                  index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                )}>
                  <div className="flex items-center gap-4 mb-4">
                     <span className="font-mono text-accent text-sm tracking-widest uppercase">
                        Stage {String(index + 1).padStart(2, '0')}
                     </span>
                     <div className="h-px flex-1 bg-white/10" />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
                    {phase.title}
                  </h3>
                  
                  {phase.description && (
                    <p className="text-slate-400 leading-relaxed font-light mb-6 border-l-2 border-accent/20 pl-4">
                      {phase.description}
                    </p>
                  )}


                </div>

                {/* Visual Side */}
                <div className={cn(
                  "lg:col-span-8",
                  index % 2 === 1 && "lg:order-1"
                )}>
                  {phase.images && phase.images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Main Large Image */}
                      <div className="md:col-span-2 relative aspect-video overflow-hidden rounded-lg border border-white/10 group">
                        <Image
                          src={phase.images[0]}
                          alt={phase.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                      </div>

                      {/* Secondary Images (up to 2) */}
                      {phase.images.slice(1, 3).map((img, i) => (
                         <div key={i} className="relative aspect-4/3 overflow-hidden rounded-lg border border-white/10 group">
                          <Image
                            src={img}
                            alt={`${phase.title} detail ${i + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="aspect-video bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                       <p className="text-slate-600 font-mono text-sm">Visuals pending...</p>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
