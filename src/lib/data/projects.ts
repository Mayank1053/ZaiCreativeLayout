import { db } from '@/lib/db';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

// Cache revalidation time in seconds (1 hour)
const REVALIDATE_TIME = 3600;

export const getProjects = unstable_cache(
  async () => {
    return await db.project.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  },
  ['all-projects'],
  { revalidate: REVALIDATE_TIME, tags: ['projects'] }
);

export const getFeaturedProjects = unstable_cache(
  async () => {
    return await db.project.findMany({
      where: { featured: true },
      include: { category: true },
      take: 3,
      orderBy: { createdAt: 'desc' }, // Ensure consistent ordering
    });
  },
  ['featured-projects'],
  { revalidate: REVALIDATE_TIME, tags: ['projects', 'featured'] }
);

export const getProjectBySlug = cache(async (slug: string) => {
  const getCachedProject = unstable_cache(
    async (slug: string) => {
      return await db.project.findUnique({
        where: { slug },
        include: { category: true },
      });
    },
    [`project-${slug}`],
    { revalidate: REVALIDATE_TIME, tags: [`project-${slug}`, 'projects'] }
  );

  return getCachedProject(slug);
});

export const getAllProjectSlugs = unstable_cache(
  async () => {
    return await db.project.findMany({
      select: { slug: true },
    });
  },
  ['all-project-slugs'],
  { revalidate: REVALIDATE_TIME, tags: ['projects'] }
);

export const getCategories = unstable_cache(
  async () => {
    return await db.category.findMany({
      orderBy: { name: 'asc' },
    });
  },
  ['all-categories'],
  { revalidate: REVALIDATE_TIME, tags: ['categories'] }
);
