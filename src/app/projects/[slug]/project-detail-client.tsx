'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, MapPin, Compass, ArrowRight } from 'lucide-react';
import { PageContainer } from '@/components/shared';
import { ProjectGallery } from '@/components/projects/project-gallery';
import { useRef } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as any } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  direction: string | null;
  vastuNotes: string | null;
  images: string[];
  category: {
    name: string;
  };
}

interface ProjectDetailClientProps {
  project: Project;
}

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
      <section ref={containerRef} className="relative h-[80vh] w-full overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={project.images[0] || '/placeholder.jpg'}
            alt={project.title}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
        </motion.div>

        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-12 md:pb-20">
          <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24 w-full">
            <motion.div
              style={{ opacity }}
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-4xl"
            >
              <motion.div variants={fadeInUp} className="mb-8 md:mb-10">
                 <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-white hover:text-blue-400 transition-all uppercase tracking-[0.2em] text-[10px] sm:text-xs font-medium bg-white/5 hover:bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 hover:border-blue-500/50"
                >
                  <ArrowLeft size={14} />
                  Back to Projects
                </Link>
              </motion.div>
              
              <motion.p
                variants={fadeInUp}
                className="text-blue-400 text-[10px] sm:text-sm tracking-[0.2em] uppercase font-medium mb-4"
              >
                {project.category.name}
              </motion.p>
              
              <motion.h1
                variants={fadeInUp}
                className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-[1.1] sm:leading-none"
              >
                {project.title}
              </motion.h1>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-6 sm:gap-8 text-white/80 font-light text-base sm:text-lg"
              >
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-blue-500" />
                  <span>{project.location}</span>
                </div>
                {project.direction && (
                  <div className="flex items-center gap-2">
                    <Compass size={18} className="text-blue-500" />
                    <span>{project.direction}</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Details Content */}
      <section className="relative py-20 bg-[#0F172A] text-slate-300">
         {/* Blueprint Grid Background Pattern */}
         <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid-content" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500/30" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-content)" />
          </svg>
        </div>

        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">
            
            {/* Main Description - 7 Columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <h2 className="font-serif text-3xl mb-8 border-b border-slate-800 pb-4 text-white">
                The Narrative
              </h2>
              <div className="prose prose-lg max-w-none text-slate-400 font-light leading-relaxed prose-invert">
                {project.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Sidebar Details - 5 Columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 space-y-12"
            >
              {/* Project Info Table */}
               <div>
                <h3 className="font-serif text-xl mb-6 text-white">Specifications</h3>
                <dl className="space-y-4 text-sm">
                   <div className="flex justify-between py-3 border-b border-slate-800">
                    <dt className="text-slate-500 uppercase tracking-widest">Type</dt>
                    <dd className="font-medium text-slate-200">{project.category.name}</dd>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-800">
                    <dt className="text-slate-500 uppercase tracking-widest">Location</dt>
                    <dd className="font-medium text-slate-200">{project.location}</dd>
                  </div>
                   {project.direction && (
                    <div className="flex justify-between py-3 border-b border-slate-800">
                      <dt className="text-slate-500 uppercase tracking-widest">Orientation</dt>
                      <dd className="font-medium text-slate-200">{project.direction}</dd>
                    </div>
                  )}
                  {project.vastuNotes && (
                      <div className="py-3 border-b border-slate-800">
                        <dt className="text-slate-500 uppercase tracking-widest mb-2">Vastu Notes</dt>
                        <dd className="text-slate-300 leading-relaxed font-light italic opacity-80">{project.vastuNotes}</dd>
                      </div>
                  )}
                </dl>
              </div>
            </motion.div>

          </div>
        </PageContainer>
      </section>

      {/* Project Gallery */}
      <section className="py-20 bg-[#0F172A] border-t border-slate-800 text-white relative">
         <div className="absolute inset-0 bg-linear-to-b from-[#0F172A] to-slate-950 pointer-events-none" />
        <PageContainer>
          <div className="mb-12 relative z-10 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-4xl mb-4">Visual Journey</h2>
              <p className="text-slate-400 font-light">Explore the detailed aesthetics of {project.title}.</p>
            </div>
          </div>
          <div className="relative z-10">
            <ProjectGallery images={project.images} title={project.title} />
          </div>
        </PageContainer>
      </section>
    </>
  );
}
