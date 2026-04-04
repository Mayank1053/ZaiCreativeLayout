import { PageContainer } from '@/components/shared';
import { Metadata } from 'next';
import ProjectsGrid from './projects-grid';
import { getProjects, getCategories } from '@/lib/data/projects';

// Revalidate cached page every 60 seconds (ISR)
export const revalidate = 60;

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Our Projects | Creative Layout',
  description: 'Explore our portfolio of architectural masterpieces. Residential, commercial projects in Chhattisgarh, India.',
};

// Page component - Server Component
export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    getProjects(),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-surface-primary pt-20 md:pt-28 pb-12 relative">
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
      
      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid-projects" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" style={{ color: 'var(--border-accent)' }} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-projects)" />
        </svg>
      </div>
      <PageContainer>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 relative z-10">
          <p className="text-accent-blue text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium mb-2 md:mb-4">
            Our Portfolio
          </p>
          <h1 className="font-serif text-3xl md:text-6xl mb-3 md:mb-6 text-heading">
            Selected Works
          </h1>
          <p className="text-text-secondary font-light text-sm md:text-lg max-w-2xl leading-relaxed">
            A curation of our finest architectural projects, 
            where vision meets precision.
          </p>
        </div>

        {/* Grid */}
        <ProjectsGrid 
          projects={projects} 
          categories={categories} 
        />
      </PageContainer>
    </main>
  );
}
