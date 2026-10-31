'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { m, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Search,
  Calendar,
  ArrowRight,
  HardHat,
  Compass,
  PartyPopper,
  Megaphone,
  Images,
  FolderKanban,
  Star,
} from 'lucide-react';

export interface PublicUpdateItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  coverImage: string;
  gallery: string[];
  featured: boolean;
  publishedAt: string | Date;
  project?: {
    id: string;
    title: string;
    slug: string;
    location: string;
  } | null;
}

interface UpdatesClientProps {
  updates: PublicUpdateItem[];
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Project & Site Work': HardHat,
  'Design & Layout': Compass,
  'Celebrations & Greetings': PartyPopper,
  'Studio News': Megaphone,
};

export default function UpdatesClient({ updates }: UpdatesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories
  const categories = useMemo(() => {
    const list = Array.from(new Set(updates.map((u) => u.category))).filter(Boolean);
    const standard = [
      'All',
      'Project & Site Work',
      'Design & Layout',
      'Celebrations & Greetings',
      'Studio News',
    ];
    // Merge standard categories with any custom ones present in data
    const all = Array.from(new Set([...standard, ...list]));
    return all;
  }, [updates]);

  // Filter updates
  const filteredUpdates = useMemo(() => {
    return updates.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [updates, selectedCategory, searchQuery]);

  const formatDate = (dateVal: string | Date) => {
    return new Date(dateVal).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-10 relative z-10">
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-2 border-b border-border-accent">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat];
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-accent-blue text-white shadow-md shadow-accent-blue/20'
                    : 'bg-surface-elevated text-text-secondary hover:text-heading hover:bg-surface-elevated/80 border border-border-line'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <Input
            placeholder="Search updates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs bg-surface-elevated border-border-line text-text-primary rounded-full focus-visible:ring-accent-blue"
          />
        </div>
      </div>

      {/* Grid of Updates */}
      {filteredUpdates.length === 0 ? (
        <div className="text-center py-24 bg-surface-elevated/40 rounded-2xl border border-dashed border-border-accent">
          <Sparkles className="w-8 h-8 text-accent-blue mx-auto mb-3 opacity-60" />
          <h3 className="font-serif text-lg text-heading mb-1">No updates found</h3>
          <p className="text-sm text-text-secondary max-w-sm mx-auto mb-4">
            No updates matched your search or category filter.
          </p>
          {(selectedCategory !== 'All' || searchQuery) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs"
            >
              Reset Filters
            </Button>
          )}
        </div>
      ) : (
        <m.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredUpdates.map((item, index) => {
              const isCelebration = item.category === 'Celebrations & Greetings';
              const Icon = CATEGORY_ICONS[item.category] || Sparkles;

              return (
                <m.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`group flex flex-col rounded-2xl overflow-hidden bg-surface-elevated border transition-all duration-500 hover:-translate-y-1 ${
                    isCelebration
                      ? 'border-amber-500/30 hover:border-amber-500/60 shadow-lg shadow-amber-500/5'
                      : 'border-border-line hover:border-accent-blue/50 shadow-md hover:shadow-xl'
                  }`}
                >
                  {/* Card Cover Media */}
                  <Link
                    href={`/updates/${item.slug}`}
                    className="relative block aspect-[16/10] overflow-hidden bg-muted"
                  >
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium backdrop-blur-md shadow-sm ${
                          isCelebration
                            ? 'bg-amber-500/90 text-black font-semibold'
                            : 'bg-black/60 text-white border border-white/10'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{item.category}</span>
                      </span>

                      {item.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-400 text-black shadow-sm">
                          <Star className="w-2.5 h-2.5 fill-current" /> Pinned
                        </span>
                      )}
                    </div>

                    {/* Gallery Count Pill */}
                    {item.gallery && item.gallery.length > 1 && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[11px] text-white/90 font-mono">
                        <Images className="w-3 h-3" />
                        <span>{item.gallery.length} photos</span>
                      </div>
                    )}
                  </Link>

                  {/* Card Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="space-y-3">
                      {/* Date & Linked Project */}
                      <div className="flex items-center justify-between text-xs text-text-secondary font-mono">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-accent-blue" />
                          {formatDate(item.publishedAt)}
                        </span>

                        {item.project && (
                          <span className="flex items-center gap-1 text-[11px] text-accent-blue truncate max-w-[140px]">
                            <FolderKanban className="w-3 h-3 shrink-0" />
                            <span className="truncate">{item.project.title}</span>
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg md:text-xl font-semibold text-heading line-clamp-2 group-hover:text-accent-blue transition-colors duration-300">
                        <Link href={`/updates/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-text-secondary text-xs md:text-sm leading-relaxed line-clamp-3 font-light">
                        {item.excerpt}
                      </p>
                    </div>

                    {/* Bottom Link */}
                    <div className="pt-5 mt-4 border-t border-border-line flex items-center justify-between text-xs font-medium">
                      <Link
                        href={`/updates/${item.slug}`}
                        className="inline-flex items-center gap-1.5 text-accent-blue group-hover:translate-x-1 transition-transform duration-300 font-medium"
                      >
                        <span>{isCelebration ? 'View Greetings' : 'Read Story & Photos'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {isCelebration && (
                        <span className="text-[10px] uppercase tracking-wider text-amber-500 font-medium">
                          Festive Greeting
                        </span>
                      )}
                    </div>
                  </div>
                </m.article>
              );
            })}
          </AnimatePresence>
        </m.div>
      )}
    </div>
  );
}
