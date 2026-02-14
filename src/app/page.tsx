import { getFeaturedProjects } from '@/lib/data/projects';
import {
  HeroSection,
  AboutSection,
  FeaturedProjects,
  ServicesSection,
  CTASection,
} from '@/components/home';

// Main Page Component
export default async function HomePage() {
  // Fetch featured projects using cached data function
  const projects = await getFeaturedProjects();

  // Serialize projects for client component
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

  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <FeaturedProjects projects={serializedProjects} />
      <ServicesSection />
      <CTASection />
    </main>
  );
}
