import { db } from '@/lib/db';
import {
  HeroSection,
  AboutSection,
  FeaturedProjects,
  ServicesSection,
  LatestUpdates,
  NotificationPopup,
  CTASection,
} from '@/components/home';

// Main Page Component
export default async function HomePage() {
  // Fetch featured projects & latest updates in parallel
  const [projects, updates] = await Promise.all([
    db.project.findMany({
      where: { featured: true },
      include: { category: true },
      take: 4,
    }),
    db.update.findMany({
      where: { published: true },
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' },
      ],
      take: 4,
    }),
  ]);

  // Serialize projects for client component
  const serializedProjects = projects.map((project) => ({
    id: project.id,
    title: project.title,
    slug: project.slug,
    location: project.location,
    images: project.images,
    projectType: project.projectType,
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
      <LatestUpdates updates={updates as any} />
      <CTASection />
      {/* Interactive notification popup panel */}
      <NotificationPopup updates={updates as any} projects={serializedProjects} />
    </main>
  );
}
