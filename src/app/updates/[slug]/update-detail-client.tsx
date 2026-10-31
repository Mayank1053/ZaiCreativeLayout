'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ImageLightbox, LightboxState } from '@/components/shared/image-lightbox';
import { toast } from 'sonner';
import {
  Calendar,
  Share2,
  Copy,
  ArrowLeft,
  HardHat,
  Compass,
  PartyPopper,
  Megaphone,
  Sparkles,
  ExternalLink,
  Building2,
  MapPin,
  Maximize2,
  Check,
} from 'lucide-react';

interface ProjectLink {
  id: string;
  title: string;
  slug: string;
  location: string;
  images: string;
  projectType?: string | null;
  area?: string | null;
}

interface UpdateDetailClientProps {
  update: {
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    coverImage: string;
    gallery: string[];
    content: string;
    publishedAt: string | Date;
    project?: ProjectLink | null;
  };
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Project & Site Work': HardHat,
  'Design & Layout': Compass,
  'Celebrations & Greetings': PartyPopper,
  'Studio News': Megaphone,
};

export default function UpdateDetailClient({ update }: UpdateDetailClientProps) {
  const [lightboxState, setLightboxState] = useState<LightboxState | null>(null);
  const [copied, setCopied] = useState(false);

  const isCelebration = update.category === 'Celebrations & Greetings';
  const Icon = CATEGORY_ICONS[update.category] || Sparkles;

  // Build full photo list for lightbox (cover + gallery without duplicates)
  const allImages = Array.from(new Set([update.coverImage, ...(update.gallery || [])])).filter(Boolean);

  const openLightbox = (index: number) => {
    setLightboxState({
      images: allImages,
      currentIndex: index,
      title: update.title,
    });
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`*${update.title}*\n${update.excerpt}\n\nRead more here: `);
      window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
    }
  };

  const formatDate = (dateVal: string | Date) => {
    return new Date(dateVal).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Parse project thumbnail if present
  let projectCoverImage = '';
  if (update.project?.images) {
    try {
      const parsed = JSON.parse(update.project.images);
      if (Array.isArray(parsed) && parsed.length > 0) {
        projectCoverImage = parsed[0];
      }
    } catch {
      // fallback
    }
  }

  return (
    <article className="max-w-4xl mx-auto space-y-12">
      {/* 1. Breadcrumb & Back Button */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <Link
          href="/updates"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-text-secondary hover:text-accent-blue transition-colors group font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Updates</span>
        </Link>

        {/* Share buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="h-8 px-2.5 text-xs gap-1.5 border-border-line hover:border-accent-blue"
            title="Copy link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleWhatsAppShare}
            className="h-8 px-2.5 text-xs gap-1.5 border-border-line text-emerald-500 hover:text-emerald-400 hover:border-emerald-500/50"
            title="Share on WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </Button>
        </div>
      </div>

      {/* 2. Hero Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant="secondary"
            className={`text-xs px-3 py-1 gap-1.5 font-medium ${
              isCelebration
                ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                : 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{update.category}</span>
          </Badge>

          <span className="flex items-center gap-1.5 text-xs text-text-secondary font-mono">
            <Calendar className="w-3.5 h-3.5 text-accent-blue" />
            {formatDate(update.publishedAt)}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-heading leading-[1.15]">
          {update.title}
        </h1>

        {/* Excerpt Lead */}
        <div
          className={`p-5 rounded-xl border-l-4 bg-surface-elevated text-base sm:text-lg text-text-primary leading-relaxed font-light ${
            isCelebration
              ? 'border-l-amber-500 bg-amber-500/5'
              : 'border-l-accent-blue'
          }`}
        >
          {update.excerpt}
        </div>
      </header>

      {/* 3. Hero Cover Media */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-muted border border-border-line shadow-2xl group">
        <Image
          src={update.coverImage}
          alt={update.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1000px"
        />
        <button
          onClick={() => openLightbox(0)}
          className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 cursor-pointer"
          aria-label="View Fullscreen"
          title="Zoom image"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* 4. Markdown Story Content */}
      {update.content && (
        <section className="prose prose-lg dark:prose-invert max-w-none space-y-4">
          <div className="text-text-primary leading-relaxed font-light text-base md:text-lg space-y-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold text-heading pt-6 pb-2 border-b border-border-line">
                    {children}
                  </h2>
                ),
                h2: ({ children }) => (
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-heading pt-5 pb-1">
                    {children}
                  </h3>
                ),
                h3: ({ children }) => (
                  <h4 className="font-sans text-lg font-medium text-heading pt-4 pb-1">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="leading-relaxed text-text-primary/90 font-light text-base md:text-lg my-3">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 space-y-2 text-text-primary/90 font-light my-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 space-y-2 text-text-primary/90 font-light my-4">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className="pl-1">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-accent-blue pl-4 py-1 italic text-text-secondary bg-surface-elevated/40 rounded-r-lg my-4">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-blue underline hover:text-accent-blue/80 font-medium"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {update.content}
            </ReactMarkdown>
          </div>
        </section>
      )}

      {/* 5. Photo Gallery (if more than 1 image) */}
      {update.gallery && update.gallery.length > 0 && (
        <section className="pt-8 border-t border-border-line space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-heading">
                Photo &amp; Visual Gallery
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                Click any image to expand and view in high resolution.
              </p>
            </div>
            <span className="text-xs font-mono text-accent-blue">
              {update.gallery.length} visual{update.gallery.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {update.gallery.map((imgUrl, idx) => (
              <div
                key={imgUrl}
                onClick={() => openLightbox(allImages.indexOf(imgUrl) >= 0 ? allImages.indexOf(imgUrl) : 0)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-muted border border-border-line cursor-pointer hover:border-accent-blue transition-colors shadow-sm"
              >
                <Image
                  src={imgUrl}
                  alt={`Photo ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 rounded-full bg-black/60 text-white">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Linked Project Card */}
      {update.project && (
        <section className="p-6 rounded-2xl bg-surface-elevated border border-border-line space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-blue">
            <Building2 className="w-4 h-4" />
            <span>Associated Portfolio Project</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {projectCoverImage && (
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0 border border-border-line">
                  <Image
                    src={projectCoverImage}
                    alt={update.project.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              )}
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-semibold text-heading">
                  {update.project.title}
                </h4>
                <p className="text-xs text-text-secondary flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent-blue shrink-0" />
                  <span>{update.project.location}</span>
                  {update.project.projectType && (
                    <>
                      <span>•</span>
                      <span>{update.project.projectType}</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            <Link href={`/projects/${update.project.slug}`}>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white transition-colors"
              >
                <span>View Full Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* 7. Bottom Navigation & Call to Action */}
      <div className="pt-8 border-t border-border-line flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/updates">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Updates</span>
          </Button>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleWhatsAppShare}
            className="text-emerald-500 hover:text-emerald-400 border-border-line gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share via WhatsApp</span>
          </Button>
          <Link href="/contact">
            <Button size="sm" className="bg-accent-blue hover:bg-accent-blue/90 text-white">
              Start Your Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Standalone Lightbox */}
      <ImageLightbox
        state={lightboxState}
        onClose={() => setLightboxState(null)}
        onNavigate={(newIdx) =>
          setLightboxState((prev) => (prev ? { ...prev, currentIndex: newIdx } : null))
        }
      />
    </article>
  );
}
