'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { m, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  images: string; // JSON string
  category: {
    name: string;
  };
}

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className="py-32 bg-surface-primary relative">
      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid-featured" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" style={{ color: 'var(--border-accent)' }} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-featured)" />
        </svg>
      </div>
      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <div>
            <div className="flex items-center gap-4 mb-4">
               <span className="w-8 h-px bg-accent-blue"></span>
               <p className="text-accent-blue text-xs tracking-[0.2em] uppercase font-mono font-medium">
                Project Portfolio
              </p>
            </div>
            <h2 className="font-sans font-light text-4xl md:text-5xl lg:text-6xl text-heading">
              Completed Works
            </h2>
          </div>
          <Link href="/projects" className="hidden md:flex items-center gap-2 group text-text-secondary hover:text-accent-blue transition-colors font-mono text-sm uppercase tracking-wide">
            View Project Archive
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project, index) => {
            const images = JSON.parse(project.images) as string[];
            const isEven = index % 2 === 0;

            return (
              <ProjectCard 
                key={project.id} 
                project={project} 
                image={images[0]} 
                isEven={isEven} 
              />
            );
          })}
        </div>

        <div className="mt-24 flex justify-center md:hidden">
          <Link href="/projects" className="btn-luxury inline-flex items-center gap-2">
            View All Projects
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}

function ProjectCard({ project, image, isEven }: { project: Project; image: string; isEven: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={containerRef} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
      
      {/* Image */}
      <div className="w-full lg:w-3/5 relative aspect-4/3 overflow-hidden group">
        <m.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
           <Image
            src={image || '/placeholder.jpg'}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </m.div>

        <div className="absolute inset-0 bg-surface-primary/20 group-hover:bg-transparent transition-colors duration-500" />
        <div className="absolute inset-0 border border-border-subtle group-hover:border-border-accent transition-colors duration-500 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center">
        <span className="text-accent-blue text-xs tracking-[0.2em] uppercase font-medium mb-4 block">
          {project.category.name}
        </span>
        <h3 className="font-serif text-3xl md:text-4xl text-heading mb-6">
          {project.title}
        </h3>
        <p className="text-text-secondary font-light mb-8 text-lg">
          {project.location}
        </p>
        <div className="flex items-center gap-4">
           <Link href={`/projects/${project.slug}`} className="group inline-flex items-center gap-2 text-heading border-b border-border-line hover:border-accent-blue hover:text-accent-blue pb-1 transition-colors">
            Explore Project
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

    </div>
  );
}
