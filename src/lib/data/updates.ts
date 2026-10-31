import { cache } from 'react';
import { db } from '@/lib/db';

export const getPublishedUpdates = cache(async (category?: string) => {
  return await db.update.findMany({
    where: {
      published: true,
      ...(category && category !== 'All' ? { category } : {}),
    },
    include: {
      project: {
        select: {
          id: true,
          title: true,
          slug: true,
          location: true,
        },
      },
    },
    orderBy: [
      { featured: 'desc' },
      { publishedAt: 'desc' },
    ],
  });
});

export const getUpdateBySlug = cache(async (slug: string) => {
  return await db.update.findUnique({
    where: { slug },
    include: {
      project: {
        select: {
          id: true,
          title: true,
          slug: true,
          location: true,
          images: true,
          projectType: true,
          area: true,
        },
      },
    },
  });
});

export const getAllUpdateSlugs = cache(async () => {
  return await db.update.findMany({
    where: { published: true },
    select: { slug: true },
  });
});

export const getUpdateCategories = cache(async () => {
  const updates = await db.update.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ['category'],
  });
  return updates.map((u) => u.category);
});
