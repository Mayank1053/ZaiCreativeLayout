import { db } from '@/lib/db';
import {
  HeroSection,
  AboutSection,
  FeaturedProjects,
  ServicesSection,
  CTASection,
} from '@/components/home';

// Main Page Component
export default async function HomePage() {
  // Fetch featured projects on the server
  const projects = await db.project.findMany({
    where: { featured: true },
    include: { category: true },
    take: 3,
  });

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
      <ServicesSection />
      <FeaturedProjects projects={serializedProjects} />
      <CTASection />
    </main>
  );
}
