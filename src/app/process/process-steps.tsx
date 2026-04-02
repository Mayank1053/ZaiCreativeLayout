'use client';

import { m, Variants } from 'framer-motion';
import { MessageCircle, PenTool, Hammer, Key } from 'lucide-react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  MessageCircle,
  PenTool,
  Hammer,
  Key,
};

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
}

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        className="relative"
      >
        {/* Vertical Line */}
        <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-px bg-border-line md:-translate-x-1/2" />

        {steps.map((step, index) => {
          const IconComponent = iconMap[step.icon] || MessageCircle;
          const isEven = index % 2 === 0;
          
          return (
            <m.div
              key={step.number}
              variants={fadeInUp}
              className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-start mb-20 last:mb-0 ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Content Side */}
              <div className="w-full md:w-1/2 pl-20 md:px-12 pt-2">
                <div className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end md:text-right'}`}>
                   <span className="text-accent-blue text-sm tracking-widest font-bold mb-2 block md:hidden">
                    STEP {step.number}
                  </span>
                  <h3 className="font-serif text-3xl mb-4 text-heading">{step.title}</h3>
                  <p className="text-text-secondary font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Center Icon/Marker */}
              <div className="absolute left-0 md:left-1/2 translate-x-0 md:-translate-x-1/2 flex items-center justify-center z-10 w-14 h-14 rounded-full border" style={{ backgroundColor: 'var(--surface-primary)', borderColor: 'var(--border-line)', boxShadow: 'var(--shadow-card)' }}>
                 <IconComponent className="w-6 h-6 text-accent-blue" strokeWidth={1.5} />
              </div>

              {/* Empty Side (for balance) */}
              <div className="hidden md:block w-1/2 md:px-12 pt-2">
                <div className={`flex flex-col ${!isEven ? 'items-start' : 'items-end'}`}>
                  <span className="text-6xl font-serif font-light -translate-y-4 select-none text-border-line">
                    {step.number}
                  </span>
                </div>
              </div>

            </m.div>
          );
        })}
      </m.div>
    </div>
  );
}
