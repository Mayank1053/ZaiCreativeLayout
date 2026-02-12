'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    slug: string;
    location: string;
    images: string;
    category: {
      name: string;
    };
  };
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function ProjectCard({ project }: ProjectCardProps) {
  const images = JSON.parse(project.images) as string[];
  // Use first image, fallbacks handled by Next.js Image if src is valid, or custom placeholder
  const coverImage = images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800';

  return (
    <motion.div
      variants={fadeInUp}
      className="group break-inside-avoid mb-12"
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative overflow-hidden mb-4 bg-muted">
          <Image
            src={coverImage}
            alt={project.title}
            width={800}
            height={600}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 text-black" />
          </div>
        </div>
        
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="font-serif text-2xl text-foreground group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              {project.category.name}
            </span>
          </div>
          <p className="text-sm text-foreground/60 font-light">
            {project.location}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
