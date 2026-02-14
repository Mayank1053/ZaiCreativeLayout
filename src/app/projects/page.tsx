import { PageContainer } from '@/components/shared';
import { Metadata } from 'next';
import ProjectsGrid from './projects-grid';
import { getProjects, getCategories } from '@/lib/data/projects';

export const dynamic = 'force-dynamic';

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

  const serializedProjects = projects.map((project) => ({
    id: project.id,
    title: project.title,
    slug: project.slug,
    location: project.location,
    images: project.images,
    category: {
      name: project.category.name,
    },
  }));

  const serializedCategories = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
  }));

  return (
    <main className="min-h-screen bg-[#0F172A] pt-32 pb-20 relative">
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
      
      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid-projects" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-projects)" />
        </svg>
      </div>
      <PageContainer>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24 relative z-10">
          <p className="text-blue-400 text-xs tracking-[0.2em] uppercase font-medium mb-6">
            Our Portfolio
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-8 text-white">
            Selected Works
          </h1>
          <p className="text-slate-400 font-light text-lg max-w-2xl leading-relaxed">
            A curation of our finest architectural and interior design projects, 
            where vision meets precision.
          </p>
        </div>

        {/* Grid */}
        <ProjectsGrid 
          projects={serializedProjects} 
          categories={serializedCategories} 
        />
      </PageContainer>
    </main>
  );
}
