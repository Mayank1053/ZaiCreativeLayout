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
    <section className="py-32 bg-[#0B1221] text-white relative overflow-hidden">
       {/* Blueprint Grid Background */}
       <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />

      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24">
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 relative z-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-0"
          >
            <div className="flex items-center gap-4 mb-4">
               <span className="w-8 h-px bg-blue-500"></span>
               <p className="text-blue-400 text-xs tracking-[0.2em] uppercase font-mono font-medium">
                Our Expertise
              </p>
            </div>
           
            <h2 className="font-sans font-light text-4xl md:text-5xl lg:text-6xl text-white">
              Core Services
            </h2>
          </m.div>
          
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-md text-slate-400 font-mono text-sm leading-relaxed border-l border-slate-700 pl-6"
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
              className="group relative border-t border-slate-800 py-12 cursor-pointer transition-all duration-500 hover:bg-white/2"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* ID */}
                <div className="col-span-1 md:col-span-2 flex items-center gap-4">
                  <span className="text-sm font-light text-slate-600 font-mono group-hover:text-blue-500 transition-colors">
                    /{service.id}
                  </span>
                  <service.icon className="w-6 h-6 text-slate-500 group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 duration-300" />
                </div>

                {/* Title */}
                <div className="col-span-1 md:col-span-5">
                  <h3 className="text-2xl md:text-3xl font-sans font-light text-slate-200 group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-1 md:col-span-4">
                  <p className="text-slate-500 font-light font-mono text-sm group-hover:text-slate-300 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                {/* Arrow */}
                {/* <div className="col-span-1 flex justify-end">
                  <div className="w-10 h-10 rounded-none border border-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transform group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div> */}
              </div>
            </m.div>
          ))}
          {/* Bottom border for last item */}
          <div className="border-t border-slate-800" />
        </div>

      </div>
    </section>
  );
}
