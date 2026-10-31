import { PageContainer } from '@/components/shared';
import { Metadata } from 'next';
import UpdatesClient from './updates-client';
import { getPublishedUpdates } from '@/lib/data/updates';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Studio Updates & Stories | Creative Layout',
  description:
    'Discover our latest architectural project progress, new floor plan layout releases, festive wishes, and construction logs in Chhattisgarh, India.',
};

export default async function UpdatesPage() {
  const updates = await getPublishedUpdates();

  return (
    <main className="min-h-screen bg-surface-primary pt-20 md:pt-28 pb-20 relative">
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />

      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid-updates" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                style={{ color: 'var(--border-accent)' }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-updates)" />
        </svg>
      </div>

      <PageContainer>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 relative z-10">
          <p className="text-accent-blue text-[10px] md:text-xs tracking-[0.25em] uppercase font-medium mb-2 md:mb-3">
            Studio Journal &amp; Feed
          </p>
          <h1 className="font-serif text-3xl md:text-6xl mb-3 md:mb-5 text-heading font-normal">
            Studio Updates
          </h1>
          <p className="text-text-secondary font-light text-sm md:text-base max-w-2xl leading-relaxed">
            Real-time on-site milestones, layout concepts, architectural insights, and festive celebrations directly from our studio.
          </p>
        </div>

        {/* Client updates feed */}
        <UpdatesClient updates={updates as any} />
      </PageContainer>
    </main>
  );
}
