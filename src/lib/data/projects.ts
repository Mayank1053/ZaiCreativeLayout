
import { cache } from 'react';
import { db } from '@/lib/db';

export const getProjects = cache(async () => {
  return await db.project.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      location: true,
      images: true,
      category: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
});

export const getCategories = cache(async () => {
  return await db.category.findMany({
    orderBy: { name: 'asc' },
  });
});

export const getProjectBySlug = cache(async (slug: string) => {
  return await db.project.findUnique({
    where: { slug },
    include: { 
      category: true,
      phases: {
        orderBy: {
          order: 'asc'
        }
      }
    },
  });
});

export const getAllProjectSlugs = cache(async () => {
  return await db.project.findMany({
    select: { slug: true },
  });
});
