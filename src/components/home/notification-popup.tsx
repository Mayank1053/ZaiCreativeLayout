'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { m, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  ArrowRight,
  HardHat,
  Compass,
  PartyPopper,
  Megaphone,
  Building2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export interface NotificationUpdate {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string | Date;
}

export interface NotificationProject {
  id: string;
  title: string;
  slug: string;
  location: string;
  images: string;
  projectType?: string | null;
  category?: {
    name: string;
  };
}

interface NotificationPopupProps {
  updates: NotificationUpdate[];
  projects: NotificationProject[];
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Project & Site Work': HardHat,
  'Design & Layout': Compass,
  'Celebrations & Greetings': PartyPopper,
  'Studio News': Megaphone,
};

export function NotificationPopup({ updates = [], projects = [] }: NotificationPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'updates' | 'projects'>('updates');
  const [hasMounted, setHasMounted] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);

  // Check if the latest update is a celebratory greeting
  const latestUpdate = updates[0];
  const isCelebratory = latestUpdate?.category === 'Celebrations & Greetings';

  useEffect(() => {
    setHasMounted(true);

    const isDismissed = sessionStorage.getItem('cl_home_notification_dismissed');

    if (!isDismissed) {
      // Smooth delayed appearance (1.8s) after page loads
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Click outside to close back to the pill
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (panelRef.current && !panelRef.current.contains(target)) {
        setIsOpen(false);
        sessionStorage.setItem('cl_home_notification_dismissed', 'true');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        sessionStorage.setItem('cl_home_notification_dismissed', 'true');
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }, 150);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('cl_home_notification_dismissed', 'true');
  };

  const getProjectImage = (imagesVal: string) => {
    try {
      if (Array.isArray(imagesVal)) return imagesVal[0] || '';
      const parsed = JSON.parse(imagesVal);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
    } catch {
      if (typeof imagesVal === 'string' && imagesVal.startsWith('http')) return imagesVal;
    }
    return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80';
  };

  if (!hasMounted) return null;
  if (updates.length === 0 && projects.length === 0) return null;

  return (
    <aside aria-label="Studio Feed" className="fixed bottom-5 left-5 z-50">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* 1. Minimized Floating Trigger Button */
          <m.button
            key="minimized-pill"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={() => setIsOpen(true)}
            className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-2xl transition-all duration-300 border-2 hover:scale-105 cursor-pointer ${
              isCelebratory
                ? 'bg-amber-100 text-amber-950 border-amber-400 shadow-amber-500/20 hover:bg-amber-200 dark:bg-amber-950 dark:border-amber-500 dark:text-amber-200'
                : 'bg-white text-slate-900 border-slate-300 shadow-slate-900/15 hover:border-blue-600 hover:text-blue-600 dark:bg-slate-900 dark:border-slate-700 dark:text-white'
            }`}
            aria-label="Open studio updates feed"
          >
            {isCelebratory ? (
              <>
                <span className="relative flex items-center justify-center w-5 h-5 text-amber-600 dark:text-amber-400">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                  <Sparkles className="w-4 h-4 fill-amber-500 stroke-amber-700 dark:stroke-amber-200" />
                </span>
                <span className="text-xs font-bold tracking-wide text-amber-950 dark:text-amber-200 truncate max-w-[240px]">
                  ✨ {latestUpdate?.title || 'Festive Greetings & Updates'}
                </span>
              </>
            ) : (
              <>
                <span className="relative flex items-center justify-center w-5 h-5 text-blue-600">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
                </span>
                <span className="text-xs font-bold tracking-wide text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  Studio Feed ({updates.length + projects.length})
                </span>
              </>
            )}
          </m.button>
        ) : (
          /* 2. Full Popup Panel (Solid Opaque, No Ugly Scrollbar, Single Close Button) */
          <m.div
            key="popup-panel"
            ref={panelRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={`w-[calc(100vw-2.5rem)] sm:w-[380px] rounded-2xl overflow-hidden shadow-2xl border-2 flex flex-col bg-white dark:bg-slate-900 ${
              isCelebratory
                ? 'border-amber-400 dark:border-amber-500 shadow-amber-500/15'
                : 'border-slate-300 dark:border-slate-700 shadow-slate-900/20'
            }`}
          >
            {/* Top Header Banner */}
            {isCelebratory ? (
              <div className="bg-amber-100 dark:bg-amber-950/70 px-4 py-2.5 border-b border-amber-300 dark:border-amber-700 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <span className="text-base shrink-0">✨</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/80 dark:text-amber-300/80">
                      Studio Celebration
                    </span>
                    <span className="text-xs font-bold text-amber-950 dark:text-amber-100 truncate">
                      {latestUpdate?.title || 'Festive Wishes from Studio'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-full text-amber-900 hover:text-amber-950 hover:bg-amber-200/80 dark:text-amber-300 dark:hover:text-white dark:hover:bg-amber-800 transition-colors cursor-pointer shrink-0"
                  title="Close"
                  aria-label="Close notification panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
                <div className="flex items-center gap-2">
                  <span className="relative flex items-center justify-center w-4 h-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
                  </span>
                  <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-white tracking-wide">
                    Studio Live Feed
                  </h4>
                </div>

                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-200 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Close"
                  aria-label="Close notification panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="px-4 pt-2.5 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900">
              <button
                onClick={() => setActiveTab('updates')}
                className={`pb-2 text-xs font-bold tracking-wide transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'updates'
                    ? isCelebratory
                      ? 'border-amber-600 text-amber-950 dark:border-amber-400 dark:text-amber-300'
                      : 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 font-medium'
                }`}
              >
                {isCelebratory ? (
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                ) : (
                  <Megaphone className="w-3.5 h-3.5" />
                )}
                <span>Updates ({updates.length})</span>
                {isCelebratory && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-amber-500 text-black font-extrabold">
                    NEW
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`pb-2 text-xs font-bold tracking-wide transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'projects'
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 font-medium'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Projects ({projects.length})</span>
              </button>
            </div>

            {/* List Body (Scrollbar Hidden completely with CSS) */}
            <div className="p-3 max-h-[260px] overflow-y-auto space-y-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {activeTab === 'updates' ? (
                updates.length === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-6">
                    No recent updates at this moment.
                  </p>
                ) : (
                  updates.slice(0, 3).map((item) => {
                    const itemIsCelebration = item.category === 'Celebrations & Greetings';
                    const Icon = CATEGORY_ICONS[item.category] || Sparkles;

                    return (
                      <Link
                        key={item.id}
                        href={`/updates/${item.slug}`}
                        onClick={handleClose}
                        className={`group block p-2.5 rounded-xl transition-all duration-200 border ${
                          itemIsCelebration
                            ? 'bg-amber-50 hover:bg-amber-100/90 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800 dark:hover:bg-amber-950/70'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 dark:bg-slate-800/80 dark:border-slate-700 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Thumbnail */}
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-700 border border-slate-200 dark:border-slate-700">
                            <Image
                              src={item.coverImage}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="56px"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 space-y-0.5">
                            <div className="flex items-center justify-between gap-1">
                              <span
                                className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded font-bold ${
                                  itemIsCelebration
                                    ? 'bg-amber-200 text-amber-950 dark:bg-amber-900/60 dark:text-amber-200'
                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                                }`}
                              >
                                <Icon className="w-2.5 h-2.5" />
                                <span className="truncate max-w-[110px]">{item.category}</span>
                              </span>

                              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                                {new Date(item.publishedAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                })}
                              </span>
                            </div>

                            <h5
                              className={`text-xs font-bold line-clamp-1 leading-snug transition-colors ${
                                itemIsCelebration
                                  ? 'text-amber-950 group-hover:text-amber-800 dark:text-amber-100 dark:group-hover:text-amber-300'
                                  : 'text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400'
                              }`}
                            >
                              {item.title}
                            </h5>

                            <p className="text-[11px] text-slate-700 dark:text-slate-300 line-clamp-1 font-normal">
                              {item.excerpt}
                            </p>
                          </div>

                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors shrink-0 mt-2.5" />
                        </div>
                      </Link>
                    );
                  })
                )
              ) : (
                projects.length === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-6">
                    No featured projects to show.
                  </p>
                ) : (
                  projects.slice(0, 3).map((proj) => {
                    const cover = getProjectImage(proj.images);
                    return (
                      <Link
                        key={proj.id}
                        href={`/projects/${proj.slug}`}
                        onClick={handleClose}
                        className="group block p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700 dark:hover:bg-slate-800 transition-all duration-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-700 border border-slate-200 dark:border-slate-700">
                            <Image
                              src={cover}
                              alt={proj.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="56px"
                            />
                          </div>

                          <div className="flex-1 min-w-0 space-y-0.5">
                            <div className="flex items-center justify-between gap-1">
                              <span className="inline-flex items-center text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200 font-semibold">
                                {proj.category?.name || proj.projectType || 'Architecture'}
                              </span>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate max-w-[100px]">
                                {proj.location}
                              </span>
                            </div>

                            <h5 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 line-clamp-1 leading-snug transition-colors">
                              {proj.title}
                            </h5>
                          </div>

                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors shrink-0 mt-2.5" />
                        </div>
                      </Link>
                    );
                  })
                )
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
              <Link
                href="/updates"
                onClick={handleClose}
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
              >
                <span>View All Updates</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              <Link
                href="/projects"
                onClick={handleClose}
                className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <span>All Projects</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
