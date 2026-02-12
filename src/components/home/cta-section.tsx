'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-32 bg-zinc-950 text-white flex items-center justify-center min-h-[50vh]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-12 leading-none">
            Let&apos;s build the <br /> 
            <span className="italic text-accent">extraordinary.</span>
          </h2>
          
          <Link 
            href="/contact" 
            className="group inline-flex items-center gap-4 text-xl tracking-wide border-b border-white/30 pb-2 hover:border-accent hover:text-accent transition-all duration-300"
          >
            Start a Conversation
            <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
