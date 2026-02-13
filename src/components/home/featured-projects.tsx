'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    <section className="py-32 bg-background">
      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <div>
            <div className="flex items-center gap-4 mb-4">
               <span className="w-8 h-px bg-blue-500"></span>
               <p className="text-blue-600 text-xs tracking-[0.2em] uppercase font-mono font-medium">
                Project Portfolio
              </p>
            </div>
            <h2 className="font-sans font-light text-4xl md:text-5xl lg:text-6xl text-slate-900">
              Completed Works
            </h2>
          </div>
          <Link href="/projects" className="hidden md:flex items-center gap-2 group text-slate-500 hover:text-blue-600 transition-colors font-mono text-sm uppercase tracking-wide">
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
        <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
           <Image
            src={image || '/placeholder.jpg'}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center">
        <span className="text-accent text-xs tracking-[0.2em] uppercase font-medium mb-4 block">
          {project.category.name}
        </span>
        <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
          {project.title}
        </h3>
        <p className="text-muted-foreground font-light mb-8 text-lg">
          {project.location}
        </p>
        <div className="flex items-center gap-4">
           <Link href={`/projects/${project.slug}`} className="group inline-flex items-center gap-2 text-foreground border-b border-foreground/30 hover:border-accent pb-1 transition-colors">
            Explore Project
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

    </div>
  );
}
