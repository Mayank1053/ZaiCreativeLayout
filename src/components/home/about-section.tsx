'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={containerRef} className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text Content - Spans 5 columns */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative z-10">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-accent text-xs tracking-[0.2em] uppercase font-medium mb-8 flex items-center gap-4"
            >
              <span className="w-8 h-[1px] bg-accent"></span>
              The Studio
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-10 leading-[1.1]"
            >
              We craft narratives in <span className="italic text-muted-foreground">space</span> and <span className="italic text-muted-foreground">materiality</span>.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6 text-lg text-muted-foreground/80 font-light leading-relaxed"
            >
              <p>
                At Creative Layout, we believe architecture is an intellectual and artistic pursuit. 
                Led by Architect Prashant Ambilkar, our studio operates at the intersection of 
                tradition and avant-garde design.
              </p>
              <p>
                We do not just build structures; we sculpt environments that elevate the human experience. 
                Our approach blends the timeless wisdom of Vastu with contemporary aesthetics, ensuring 
                every project resonates with balance and purpose.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <Link href="/process" className="group inline-flex items-center gap-2 text-foreground font-medium hover:text-accent transition-colors">
                Our Process
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Image Composition - Spans 7 columns */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative min-h-[600px] flex items-center justify-center lg:justify-end">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-3/4 h-full bg-muted/30 -z-10" />

            {/* Main Image */}
            <motion.div 
              style={{ y: y1 }}
              className="relative w-[300px] sm:w-[400px] aspect-[3/4] z-10 shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
                alt="Interior Design Detail"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Overlapping Image */}
            <motion.div 
              style={{ y: y2 }}
              className="absolute -bottom-12 left-0 sm:left-12 lg:-left-12 w-[240px] sm:w-[300px] aspect-square z-20 shadow-xl border-8 border-background"
            >
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600"
                alt="Architectural Detail"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
