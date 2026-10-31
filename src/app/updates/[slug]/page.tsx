import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PageContainer } from '@/components/shared';
import UpdateDetailClient from './update-detail-client';
import { getUpdateBySlug, getAllUpdateSlugs } from '@/lib/data/updates';

export const revalidate = 60;
export const dynamicParams = true;

// Generate static params
export async function generateStaticParams() {
  const updates = await getAllUpdateSlugs();
  return updates.map((u) => ({
    slug: u.slug,
  }));
}

// Generate dynamic metadata for SEO and social sharing (WhatsApp / Twitter / LinkedIn)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const update = await getUpdateBySlug(slug);

  if (!update || !update.published) {
    return {
      title: 'Update Not Found | Creative Layout',
    };
  }

  return {
    title: `${update.title} | Creative Layout Updates`,
    description: update.excerpt,
    openGraph: {
      title: update.title,
      description: update.excerpt,
      images: update.coverImage ? [{ url: update.coverImage }] : [],
      type: 'article',
      publishedTime: new Date(update.publishedAt).toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: update.title,
      description: update.excerpt,
      images: update.coverImage ? [update.coverImage] : [],
    },
  };
}

export default async function UpdateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const update = await getUpdateBySlug(slug);

  if (!update || !update.published) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-surface-primary pt-24 md:pt-32 pb-24 relative">
      <div className="absolute inset-0 bg-blueprint opacity-15 pointer-events-none" />

      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid-update-detail" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                style={{ color: 'var(--border-accent)' }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-update-detail)" />
        </svg>
      </div>

      <PageContainer>
        <UpdateDetailClient update={update as any} />
      </PageContainer>
    </main>
  );
}
