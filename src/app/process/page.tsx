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
    <main className="min-h-screen bg-background pt-32 pb-20">
      <PageContainer>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <p className="text-accent text-xs tracking-[0.2em] uppercase font-medium mb-6">
            How We Work
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">
            The Methodology
          </h1>
          <p className="text-muted-foreground font-light text-lg max-w-2xl leading-relaxed">
            From the first sketch to the final stone, our process is built on 
            transparency, precision, and unwavering dedication to your vision.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-32">
          <ProcessSteps steps={PROCESS_STEPS} />
        </div>

        {/* CTA */}
        <div className="bg-zinc-900 text-white p-12 md:p-24 text-center rounded-sm relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Ready to begin journey?
            </h2>
            <p className="text-white/70 font-light text-lg mb-10">
              Let&apos;s turn your architectural dreams into tangible reality. 
              Schedule a consultation with our experts today.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-4 text-xl tracking-wide border-b border-white/30 pb-2 hover:border-accent hover:text-accent transition-all duration-300">
              Start Your Project
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
          
          {/* Decorative background accent */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
