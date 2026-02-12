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
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
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
      <section ref={containerRef} className="relative h-[80vh] w-full overflow-hidden bg-zinc-900">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={project.images[0] || '/placeholder.jpg'}
            alt={project.title}
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </motion.div>

        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-20">
          <PageContainer>
            <motion.div
              style={{ opacity }}
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-4xl"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                 <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-medium"
                >
                  <ArrowLeft size={14} />
                  Back to Projects
                </Link>
              </motion.div>
              
              <motion.p
                variants={fadeInUp}
                className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4"
              >
                {project.category.name}
              </motion.p>
              
              <motion.h1
                variants={fadeInUp}
                className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-none"
              >
                {project.title}
              </motion.h1>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-8 text-white/80 font-light text-lg"
              >
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-accent" />
                  <span>{project.location}</span>
                </div>
                {project.direction && (
                  <div className="flex items-center gap-2">
                    <Compass size={18} className="text-accent" />
                    <span>{project.direction}</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </PageContainer>
        </div>
      </section>

      {/* Project Details Content */}
      <section className="py-20 bg-background">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Main Description - 7 Columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <h2 className="font-serif text-3xl mb-8 border-b border-border pb-4">
                The Narrative
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground font-light leading-relaxed">
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
                <h3 className="font-serif text-xl mb-6">Specifications</h3>
                <dl className="space-y-4 text-sm">
                   <div className="flex justify-between py-3 border-b border-border">
                    <dt className="text-muted-foreground uppercase tracking-widest">Type</dt>
                    <dd className="font-medium text-foreground">{project.category.name}</dd>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <dt className="text-muted-foreground uppercase tracking-widest">Location</dt>
                    <dd className="font-medium text-foreground">{project.location}</dd>
                  </div>
                   {project.direction && (
                    <div className="flex justify-between py-3 border-b border-border">
                      <dt className="text-muted-foreground uppercase tracking-widest">Orientation</dt>
                      <dd className="font-medium text-foreground">{project.direction}</dd>
                    </div>
                  )}
                  {project.vastuNotes && (
                      <div className="py-3 border-b border-border">
                        <dt className="text-muted-foreground uppercase tracking-widest mb-2">Vastu Notes</dt>
                        <dd className="text-foreground leading-relaxed">{project.vastuNotes}</dd>
                      </div>
                  )}
                </dl>
              </div>

              {/* Contact CTA */}
              <div className="bg-muted/30 p-8 border border-border">
                <h3 className="font-serif text-2xl mb-4">Inspired by this project?</h3>
                <p className="text-muted-foreground mb-6 font-light">
                  Let&apos;s discuss how we can bring similar elegance and functionality to your space.
                </p>
                <Link href="/contact" className="btn-luxury inline-flex items-center justify-center w-full gap-2">
                  Start Your Project
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

          </div>
        </PageContainer>
      </section>

      {/* Project Gallery */}
      <section className="py-20 border-t border-border">
        <PageContainer>
          <div className="mb-16">
            <h2 className="font-serif text-4xl mb-4">Visual Journey</h2>
            <p className="text-muted-foreground font-light">Explore the detailed aesthetics of {project.title}.</p>
          </div>
          <ProjectGallery images={project.images} title={project.title} />
        </PageContainer>
      </section>
    </>
  );
}
