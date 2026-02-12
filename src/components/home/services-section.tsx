'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Compass, Home as HomeIcon, Layers, ArrowUpRight } from 'lucide-react';

const services = [
  {
    id: '01',
    icon: HomeIcon,
    title: 'Residential Design',
    description: 'Bespoke living spaces that reflect your personality and lifestyle.',
  },
  {
    id: '02',
    icon: Building2,
    title: 'Commercial Architecture',
    description: 'Strategic design solutions that enhance brand identity and workflow.',
  },
  {
    id: '03',
    icon: Layers,
    title: 'Interior Spatial Design',
    description: 'Curated interiors focusing on materiality, light, and atmosphere.',
  },
  {
    id: '04',
    icon: Compass,
    title: 'Vastu Consultation',
    description: 'Harmonizing spaces with ancient principles for modern wellbeing.',
  },
];

export function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24">
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-0"
          >
            <p className="text-accent text-xs tracking-[0.2em] uppercase font-medium mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-accent"></span>
              Our Expertise
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white">
              Design Services
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-md text-white/60 font-light leading-relaxed"
          >
            We offer comprehensive architectural and design services, tailored to the unique 
            requirements of each project and client.
          </motion.p>
        </div>

        <div className="flex flex-col">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative border-t border-white/10 py-12 cursor-pointer transition-colors duration-500 hover:bg-white/5"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* ID */}
                <div className="col-span-1 md:col-span-2">
                  <span className="text-sm font-light text-white/40 font-mono">
                    /{service.id}
                  </span>
                </div>

                {/* Title */}
                <div className="col-span-1 md:col-span-5">
                  <h3 className="text-3xl md:text-4xl font-serif text-white group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-1 md:col-span-4">
                  <p className="text-white/60 font-light group-hover:text-white transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="col-span-1 flex justify-end">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white transform group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Bottom border for last item */}
          <div className="border-t border-white/10" />
        </div>

      </div>
    </section>
  );
}
