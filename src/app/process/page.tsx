import { Metadata } from 'next';
import { PageContainer } from '@/components/shared';
import { PROCESS_STEPS } from '@/lib/config';
import ProcessSteps from './process-steps';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Our Process | Creative Layout',
  description: 'Discover our streamlined architecture and construction process. From consultation to handover, we guide you through every step of your project.',
};

// Process page - Server Component
export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-surface-primary pt-20 md:pt-28 pb-12 relative">
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
      
      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid-process" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" style={{ color: 'var(--border-accent)' }} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-process)" />
        </svg>
      </div>
      <PageContainer>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16 relative z-10">
          <p className="text-accent-blue text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium mb-3 md:mb-4">
            How We Work
          </p>
          <h1 className="font-serif text-3xl md:text-6xl mb-4 md:mb-6 text-heading">
            The Methodology
          </h1>
          <p className="text-text-secondary font-light text-base md:text-lg max-w-2xl leading-relaxed">
            From the first sketch to the final stone, our process is built on 
            transparency, precision, and unwavering dedication to your vision.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-32">
          <ProcessSteps steps={PROCESS_STEPS} />
        </div>

        {/* CTA */}
        <div className="relative backdrop-blur-sm border text-heading p-12 md:p-24 text-center rounded-sm overflow-hidden group transition-all duration-500 border-border-line hover:border-border-accent" style={{ backgroundColor: 'var(--surface-overlay)' }}>
          <div className="absolute inset-0 opacity-50" style={{ background: 'linear-gradient(to bottom, var(--accent-blue-muted), transparent)' }} />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-heading">
              Ready to begin journey?
            </h2>
            <p className="text-text-secondary font-light text-lg mb-10">
              Let&apos;s turn your architectural dreams into tangible reality. 
              Schedule a consultation with our experts today.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-4 text-xl tracking-wide border-b pb-2 transition-all duration-300 text-heading border-border-accent hover:border-accent-blue hover:text-accent-blue">
              Start Your Project
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
          
          {/* Decorative background accent */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle,var(--accent-blue-muted)_0%,transparent_50%)]" />
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
