import { db } from '@/lib/db';
import { PageContainer } from '@/components/shared';
import { Metadata } from 'next';
import ProjectsGrid from './projects-grid';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Our Projects | Creative Layout',
  description: 'Explore our portfolio of architectural masterpieces. Residential, commercial projects in Chhattisgarh, India.',
};

// Page component - Server Component
export default async function ProjectsPage() {
  const projects = await db.project.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  const categories = await db.category.findMany({
    orderBy: { name: 'asc' },
  });

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
    <main className="min-h-screen bg-background pt-32 pb-20">
      <PageContainer>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <p className="text-accent text-xs tracking-[0.2em] uppercase font-medium mb-6">
            Our Portfolio
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">
            Selected Works
          </h1>
          <p className="text-muted-foreground font-light text-lg max-w-2xl leading-relaxed">
            A curation of our finest architectural projects, 
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
