'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '@/components/projects/project-card';

// Animation variants
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  images: string;
  category: {
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProjectsGridProps {
  projects: Project[];
  categories: Category[];
}

export default function ProjectsGrid({ projects, categories }: ProjectsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category.name === selectedCategory)
    : projects;

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-20">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`relative text-sm tracking-[0.2em] uppercase transition-colors duration-300 ${
            selectedCategory === null
              ? 'text-white font-medium'
              : 'text-slate-500 hover:text-white'
          }`}
        >
          All
          {selectedCategory === null && (
            <motion.div
              layoutId="activeTab"
              className="absolute -bottom-2 left-0 right-0 h-px bg-blue-500"
            />
          )}
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`relative text-sm tracking-[0.2em] uppercase transition-colors duration-300 ${
              selectedCategory === category.name
                ? 'text-white font-medium'
                : 'text-slate-500 hover:text-white'
            }`}
          >
            {category.name}
            {selectedCategory === category.name && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-2 left-0 right-0 h-px bg-blue-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* Projects Masonry Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory || 'all'}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={stagger}
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-muted-foreground font-light text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
