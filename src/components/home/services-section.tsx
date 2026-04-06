'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { Compass, LayoutTemplate, Hammer, HardHat, FileText, DraftingCompass } from 'lucide-react';

const services = [
  {
    id: '01',
    icon: LayoutTemplate,
    title: 'Architectural Planning',
    description: 'Precision floor plans and site layouts optimized for space and functionality.',
  },
  {
    id: '02',
    icon: FileText,
    title: 'Municipal Approval',
    description: 'Ensuring your project is approved by the municipal authorities with all the necessary documentation.',
  },
  {
    id: '03',
    icon: Compass,
    title: 'Vastu Shastra',
    description: 'Harmonizing construction with ancient directional sciences for prosperity.',
  },
  {
    id: '04',
    icon: HardHat,
    title: 'Construction',
    description: 'End-to-end supervision from foundation laying to final structural completion.',
  },
  {
    id: '05',
    icon: DraftingCompass,
    title: 'Structural Design',
    description: 'Engineering resilient frameworks that stand the test of time and nature.',
  },
  {
    id: '06',
    icon: Hammer,
    title: 'Turnkey Construction',
    description: 'From Floor Planning to Finishing touches, we handle every aspect of construction including all the raw materials.',
  }
];

export function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-16 text-heading relative overflow-hidden" style={{ backgroundColor: 'var(--surface-elevated)' }}>
       {/* Blueprint Grid Background */}
       <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />

      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24">
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 relative z-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-0"
          >
            <div className="flex items-center gap-4 mb-4">
               <span className="w-8 h-px bg-accent-blue"></span>
               <p className="text-accent-blue text-xs tracking-[0.2em] uppercase font-mono font-medium">
                Our Expertise
              </p>
            </div>
           
            <h2 className="font-sans font-light text-4xl md:text-5xl lg:text-6xl text-heading">
              Core Services
            </h2>
          </m.div>
          
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-md text-text-secondary font-mono text-sm leading-relaxed border-l border-border-line pl-6"
          >
            We focus on the backbone of your project. From the first sketch to the final brick, our expertise lies in the structural and planning phases.
          </m.p>
        </div>

        <div className="flex flex-col relative z-10">
          {services.map((service, index) => (
            <m.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative border-t border-border-line py-12 cursor-pointer transition-all duration-500 hover:bg-accent-blue-soft"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* ID */}
                <div className="col-span-1 md:col-span-2 flex items-center gap-4">
                  <span className="text-sm font-light text-text-muted font-mono group-hover:text-accent-blue transition-colors">
                    /{service.id}
                  </span>
                  <service.icon className="w-6 h-6 text-text-muted group-hover:text-accent-blue transition-colors opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 duration-300" />
                </div>

                {/* Title */}
                <div className="col-span-1 md:col-span-5">
                  <h3 className="text-2xl md:text-3xl font-sans font-light text-text-primary group-hover:text-heading transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-1 md:col-span-4">
                  <p className="text-text-muted font-light font-mono text-sm group-hover:text-text-secondary transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              </div>
            </m.div>
          ))}
          {/* Bottom border for last item */}
          <div className="border-t border-border-line" />
        </div>

      </div>
    </section>
  );
}
