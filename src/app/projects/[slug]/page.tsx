import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProjectDetailClient from './project-detail-client';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/data/projects';

export const revalidate = 3600;
export const dynamicParams = true;

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await getAllProjectSlugs();
  
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Creative Layout',
    };
  }

  const images = JSON.parse(project.images) as string[];
  
  return {
    title: `${project.title} | Creative Layout`,
    description: project.description.substring(0, 160),
    openGraph: {
      images: images[0] ? [images[0]] : [],
    },
  };
}

// Project detail page - Server Component
export default async function ProjectDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  // Fetch project with category
  const project = await getProjectBySlug(slug);

  // Handle project not found
  if (!project) {
    notFound();
  }

  // Parse images JSON array
  const images = JSON.parse(project.images) as string[];

  // Serialize for client component
  const serializedProject = {
    id: project.id,
    title: project.title,
    slug: project.slug,
    description: project.description,
    location: project.location,
    direction: project.direction,
    vastuNotes: project.vastuNotes,
    images,
    category: {
      name: project.category.name,
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <ProjectDetailClient project={serializedProject} />
    </main>
  );
}
