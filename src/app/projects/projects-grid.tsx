'use client';

import { useState, useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ProjectCard, ProjectCardData } from '@/components/projects/project-card';
import { Sparkles, Palette, HardHat, LayoutGrid, X } from 'lucide-react';

// Animation variants
const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProjectsGridProps {
  projects: ProjectCardData[];
  categories: Category[];
}

export default function ProjectsGrid({ projects, categories }: ProjectsGridProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Derive unique service types available in the dataset
  const availableServices = useMemo(() => {
    const servicesSet = new Set<string>();
    projects.forEach((p) => {
      if (p.projectType) {
        servicesSet.add(p.projectType);
      }
    });

    // Ensure core disciplines are represented in order if they exist or as standard options
    const coreOrder = ['Exterior Design', 'Interior Design', 'Construction'];
    const sortedServices: string[] = [];

    coreOrder.forEach((core) => {
      const match = Array.from(servicesSet).find(
        (s) => s.toLowerCase() === core.toLowerCase()
      );
      if (match) {
        sortedServices.push(match);
        servicesSet.delete(match);
      }
    });

    // Add remaining custom services
    servicesSet.forEach((s) => sortedServices.push(s));
    return sortedServices;
  }, [projects]);

  // Counts for service filters
  const getServiceCount = (serviceName: string | null) => {
    if (!serviceName) return projects.length;
    return projects.filter(
      (p) => p.projectType?.toLowerCase() === serviceName.toLowerCase()
    ).length;
  };

  // Counts for category filters
  const getCategoryCount = (categoryName: string | null) => {
    if (!categoryName) return projects.length;
    return projects.filter((p) => p.category.name === categoryName).length;
  };

  // Filter projects by both discipline/service and category
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesService =
        !selectedService ||
        project.projectType?.toLowerCase() === selectedService.toLowerCase();
      const matchesCategory =
        !selectedCategory || project.category.name === selectedCategory;
      return matchesService && matchesCategory;
    });
  }, [projects, selectedService, selectedCategory]);

  const hasActiveFilters = selectedService !== null || selectedCategory !== null;

  const getServiceIcon = (service: string | null) => {
    if (!service) return LayoutGrid;
    const lower = service.toLowerCase();
    if (lower.includes('exterior')) return Sparkles;
    if (lower.includes('interior')) return Palette;
    if (lower.includes('construction') || lower.includes('turnkey')) return HardHat;
    return LayoutGrid;
  };

  return (
    <div>
      {/* Primary Filter: Service / Discipline Tabs */}
      <div className="flex flex-col items-center mb-8">
        <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-full border border-border-line bg-surface-elevated/80 backdrop-blur-md shadow-xs gap-1 max-w-full">
          {/* All Works Tab */}
          <button
            onClick={() => setSelectedService(null)}
            className={`relative px-4 py-2 rounded-full text-xs uppercase tracking-widest font-mono font-medium transition-all duration-300 flex items-center gap-2 ${
              selectedService === null
                ? 'text-white'
                : 'text-text-secondary hover:text-heading hover:bg-surface-sunken/60'
            }`}
          >
            {selectedService === null && (
              <m.div
                layoutId="activeServiceTab"
                className="absolute inset-0 bg-accent-blue rounded-full -z-10"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All Works</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedService === null
                  ? 'bg-white/20 text-white'
                  : 'bg-surface-sunken text-text-muted'
              }`}
            >
              {projects.length}
            </span>
          </button>

          {/* Service Specific Tabs (Exterior Design, Interior Design, Construction, etc.) */}
          {availableServices.map((service) => {
            const Icon = getServiceIcon(service);
            const isSelected = selectedService === service;
            const count = getServiceCount(service);

            return (
              <button
                key={service}
                onClick={() => setSelectedService(isSelected ? null : service)}
                className={`relative px-4 py-2 rounded-full text-xs uppercase tracking-widest font-mono font-medium transition-all duration-300 flex items-center gap-2 ${
                  isSelected
                    ? 'text-white'
                    : 'text-text-secondary hover:text-heading hover:bg-surface-sunken/60'
                }`}
              >
                {isSelected && (
                  <m.div
                    layoutId="activeServiceTab"
                    className="absolute inset-0 bg-accent-blue rounded-full -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5" />
                <span>{service}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-surface-sunken text-text-muted'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Filter: Property Typology (Residential / Commercial) */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <span className="text-xs uppercase font-mono tracking-widest text-text-muted mr-1">
          Typology:
        </span>
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 text-xs rounded-md border font-mono transition-all duration-200 ${
            selectedCategory === null
              ? 'border-accent-blue bg-accent-blue-soft/40 text-accent-blue font-medium'
              : 'border-border-line text-text-secondary hover:border-border-accent hover:text-heading bg-surface-elevated/40'
          }`}
        >
          All Typologies
        </button>
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name;
          const count = getCategoryCount(category.name);
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(isSelected ? null : category.name)}
              className={`px-3 py-1 text-xs rounded-md border font-mono transition-all duration-200 ${
                isSelected
                  ? 'border-accent-blue bg-accent-blue-soft/40 text-accent-blue font-medium'
                  : 'border-border-line text-text-secondary hover:border-border-accent hover:text-heading bg-surface-elevated/40'
              }`}
            >
              {category.name} ({count})
            </button>
          );
        })}

        {/* Clear filters button if any filter is active */}
        {hasActiveFilters && (
          <button
            onClick={() => {
              setSelectedService(null);
              setSelectedCategory(null);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-destructive hover:bg-destructive/10 rounded-md transition-colors"
            title="Clear all filters"
          >
            <X className="w-3 h-3" />
            Reset Filters
          </button>
        )}
      </div>

      {/* Projects Masonry Grid */}
      <AnimatePresence mode="wait">
        <m.div
          key={`${selectedService || 'all'}-${selectedCategory || 'all'}`}
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
            <div className="col-span-full text-center py-24 bg-surface-elevated/50 border border-border-line rounded-lg">
              <div className="inline-flex p-4 rounded-full bg-accent-blue-soft/50 text-accent-blue mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-heading mb-2">
                No matching projects found
              </h3>
              <p className="text-text-muted font-light text-sm max-w-md mx-auto mb-6">
                There are no projects matching both{' '}
                {selectedService ? `"${selectedService}"` : 'the selected discipline'}{' '}
                and {selectedCategory ? `"${selectedCategory}"` : 'typology'}.
              </p>
              <button
                onClick={() => {
                  setSelectedService(null);
                  setSelectedCategory(null);
                }}
                className="px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest bg-accent-blue text-white hover:bg-accent-blue-hover transition-colors"
              >
                Show All Projects
              </button>
            </div>
          )}
        </m.div>
      </AnimatePresence>
    </div>
  );
}
