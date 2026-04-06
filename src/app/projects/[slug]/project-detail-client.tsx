'use client';

import { ProjectPhases } from '@/components/projects/project-phases';
import { ProjectGallery } from '@/components/projects/project-gallery';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { m, useScroll, useTransform, Variants } from 'framer-motion';
import { ArrowLeft, Compass, MapPin } from 'lucide-react';
import { PageContainer } from '@/components/shared';

interface ProjectPhase {
  id: string;
  title: string;
  date: Date | null;
  description: string | null;
  images: string[];
  order: number;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  direction: string | null;
  floors: string | null;
  area: string | null;
  images: string[];
  category: {
    name: string;
  };
  phases?: ProjectPhase[];
}

interface ProjectDetailClientProps {
  project: Project;
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { 
    y: 30, 
    opacity: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] as const }
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99] as const
    }
  }
};

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      {/* Immersive Hero Section */}
      <section ref={containerRef} className="relative h-[80vh] w-full overflow-hidden bg-surface-primary">
        <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
        <m.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={project.images[0] || '/placeholder.jpg'}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--hero-gradient-from), var(--hero-gradient-via), var(--hero-gradient-to))' }} />
        </m.div>

        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-12 md:pb-20">
          <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24 w-full">
            <m.div
              style={{ opacity }}
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-4xl"
            >
              <m.div variants={fadeInUp} className="mb-8 md:mb-10">
                 <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 hover:text-accent-blue transition-all uppercase tracking-[0.2em] text-[10px] sm:text-xs font-medium backdrop-blur-md px-6 py-3 rounded-full border text-heading"
                  style={{ backgroundColor: 'var(--surface-overlay)', borderColor: 'var(--border-line)' }}
                >
                  <ArrowLeft size={14} />
                  Back to Projects
                </Link>
              </m.div>
              
              <m.p
                variants={fadeInUp}
                className="text-accent-blue text-[10px] sm:text-sm tracking-[0.2em] uppercase font-medium mb-4"
              >
                {project.category.name}
              </m.p>
              
              <m.h1
                variants={fadeInUp}
                className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-heading mb-6 leading-[1.1] sm:leading-none"
              >
                {project.title}
              </m.h1>

              <m.div
                variants={fadeInUp}
                className="flex flex-wrap gap-6 sm:gap-8 text-text-secondary font-light text-base sm:text-lg"
              >
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-accent-blue" />
                  <span>{project.location}</span>
                </div>
                {project.direction && (
                  <div className="flex items-center gap-2">
                    <Compass size={18} className="text-accent-blue" />
                    <span>{project.direction}</span>
                  </div>
                )}
              </m.div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Project Details Content */}
      <section className="relative pt-10 bg-surface-primary text-text-secondary">
         {/* Blueprint Grid Background Pattern */}
         <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid-content" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" style={{ color: 'var(--border-accent)' }} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-content)" />
          </svg>
        </div>

        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">
            
            {/* Main Description - 7 Columns */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <h2 className="font-serif text-3xl mb-8 border-b pb-4 text-heading border-border-line">
                The Narrative
              </h2>
              <div className="prose prose-lg max-w-none text-text-secondary font-light leading-relaxed">
                {project.description.split('\n').map((paragraph, index) => (
                  <p key={paragraph.substring(0, 10) + index} className="mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </m.div>

            {/* Sidebar Details - 5 Columns */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 space-y-12"
            >
              {/* Project Info Table */}
               <div>
                <h3 className="font-serif text-xl mb-6 text-heading">Specifications</h3>
                <dl className="space-y-4 text-sm">
                   <div className="flex justify-between py-3 border-b border-border-line">
                    <dt className="text-text-muted uppercase tracking-widest">Type</dt>
                    <dd className="font-medium text-text-primary">{project.category.name}</dd>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border-line">
                    <dt className="text-text-muted uppercase tracking-widest">Location</dt>
                    <dd className="font-medium text-text-primary">{project.location}</dd>
                  </div>
                   {project.direction && (
                    <div className="flex justify-between py-3 border-b border-border-line">
                      <dt className="text-text-muted uppercase tracking-widest">Orientation</dt>
                      <dd className="font-medium text-text-primary">{project.direction}</dd>
                    </div>
                  )}
                  {project.floors && (
                    <div className="flex justify-between py-3 border-b border-border-line">
                      <dt className="text-text-muted uppercase tracking-widest">Floors</dt>
                      <dd className="font-medium text-text-primary">{project.floors}</dd>
                    </div>
                  )}
                  {project.area && (
                    <div className="flex justify-between py-3 border-b border-border-line">
                      <dt className="text-text-muted uppercase tracking-widest">Construction Area</dt>
                      <dd className="font-medium text-text-primary">{project.area}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </m.div>

          </div>
        </PageContainer>
      </section>

      {/* Project Phases Timeline */}
      {project.phases && project.phases.length > 0 && (
        <ProjectPhases phases={project.phases} />
      )}

      {/* Project Gallery */}
      <section className="py-10 bg-surface-primary border-t border-border-line text-heading relative">
         <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, var(--surface-primary), var(--surface-elevated))' }} />
        <PageContainer>
          <div className="mb-12 relative z-10 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-4xl mb-4 text-heading">Project Gallery</h2>
              <p className="text-text-secondary font-light">Explore the detailed aesthetics of {project.title}.</p>
            </div>
          </div>
          <div className="relative z-10">
            <ProjectGallery images={project.images} title={project.title} />
          </div>
        </PageContainer>
      </section>


      {/* Contact CTA */}
      <section className="py-12 border-t border-border-subtle relative overflow-hidden" style={{ backgroundColor: 'var(--surface-elevated)' }}>
         <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--accent-blue-muted), transparent)' }} />
         
         <PageContainer>
            <div className="max-w-3xl mx-auto text-center relative z-10">
               <h2 className="font-serif text-3xl md:text-5xl text-heading mb-6">
                  Ready to Build Your Vision?
               </h2>
               <p className="text-text-secondary text-lg mb-10 font-light leading-relaxed">
                  Every great structure starts with a conversation. Let's discuss how we can bring your architectural dreams to reality.
               </p>
               
               <Link 
                  href="/contact"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium tracking-wide overflow-hidden transition-all"
                  style={{ backgroundColor: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)'}
               >
                  <span className="relative z-10">Let's Talk</span>
                  <ArrowLeft className="w-4 h-4 rotate-135 transition-transform group-hover:rotate-180 relative z-10" />
                  
                  {/* Hover Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/40 to-transparent z-0" />
               </Link>
            </div>
         </PageContainer>
         
         {/* Background Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: 'var(--accent-blue-muted)' }} />
      </section>
    </>
  );
}
