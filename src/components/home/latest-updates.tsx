'use client';

import Link from 'next/link';
import Image from 'next/image';
import { m } from 'framer-motion';
import { ArrowRight, Sparkles, Calendar, PartyPopper, HardHat, Compass, Megaphone } from 'lucide-react';

interface UpdatePreview {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string | Date;
}

interface LatestUpdatesProps {
  updates: UpdatePreview[];
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Project & Site Work': HardHat,
  'Design & Layout': Compass,
  'Celebrations & Greetings': PartyPopper,
  'Studio News': Megaphone,
};

export function LatestUpdates({ updates }: LatestUpdatesProps) {
  if (!updates || updates.length === 0) return null;

  return (
    <section className="py-20 bg-surface-primary relative border-t border-border-line">
      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid-latest-updates" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                style={{ color: 'var(--border-accent)' }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-latest-updates)" />
        </svg>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-4 h-4 text-accent-blue" />
              <span className="text-accent-blue text-xs uppercase tracking-[0.2em] font-medium">
                Live Studio Journal
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-heading">
              Latest Studio Updates
            </h2>
          </div>

          <Link
            href="/updates"
            className="group flex items-center gap-2 text-xs uppercase tracking-widest text-text-secondary hover:text-accent-blue transition-colors font-medium font-mono"
          >
            <span>View All Updates</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {updates.slice(0, 3).map((item, index) => {
            const isCelebration = item.category === 'Celebrations & Greetings';
            const Icon = CATEGORY_ICONS[item.category] || Sparkles;

            return (
              <m.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group flex flex-col rounded-2xl overflow-hidden bg-surface-elevated border transition-all duration-300 hover:-translate-y-1 ${
                  isCelebration
                    ? 'border-amber-500/30 hover:border-amber-500/60 shadow-lg shadow-amber-500/5'
                    : 'border-border-line hover:border-accent-blue/50'
                }`}
              >
                <Link
                  href={`/updates/${item.slug}`}
                  className="relative aspect-[16/10] overflow-hidden bg-muted block"
                >
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium backdrop-blur-md shadow-sm ${
                        isCelebration
                          ? 'bg-amber-500 text-black font-semibold'
                          : 'bg-black/60 text-white'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{item.category}</span>
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-[11px] text-text-secondary font-mono flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-accent-blue" />
                      <span>
                        {new Date(item.publishedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-heading line-clamp-2 group-hover:text-accent-blue transition-colors duration-300">
                      <Link href={`/updates/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>

                    <p className="text-text-secondary text-xs leading-relaxed line-clamp-2 font-light">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border-line">
                    <Link
                      href={`/updates/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs text-accent-blue group-hover:translate-x-1 transition-transform duration-300 font-medium"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
