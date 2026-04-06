'use client';

import { useState, useEffect, useSyncExternalStore, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const slideIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

// ─── Types ───────────────────────────────────────────────────────────────────

export interface LightboxState {
  images: string[];
  currentIndex: number;
  title?: string;
}

export interface ImageLightboxProps {
  state: LightboxState | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

// ─── Standalone Lightbox Overlay ─────────────────────────────────────────────

export function ImageLightbox({ state, onClose, onNavigate }: ImageLightboxProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = state ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [state]);

  const prev = useCallback(() => {
    if (!state) return;
    onNavigate(state.currentIndex === 0 ? state.images.length - 1 : state.currentIndex - 1);
  }, [state, onNavigate]);

  const next = useCallback(() => {
    if (!state) return;
    onNavigate(state.currentIndex === state.images.length - 1 ? 0 : state.currentIndex + 1);
  }, [state, onNavigate]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') onClose();
  }, [prev, next, onClose]);

  const overlay = (
    <AnimatePresence>
      {state && (
        <m.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeIn}
          className="fixed inset-0 z-100 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Dedicated backdrop — clicking anywhere on it closes the lightbox */}
          <div
            className="absolute inset-0 bg-black/95 cursor-zoom-out"
            onMouseDown={onClose}
          />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-110"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Navigation */}
          {state.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-110"
                aria-label="Previous image"
              >
                <ChevronLeft size={48} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-110"
                aria-label="Next image"
              >
                <ChevronRight size={48} />
              </button>
            </>
          )}

          {/* Image — sits above the backdrop via z-index */}
          <m.div
            key={state.currentIndex}
            variants={slideIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-6xl h-[85vh] mx-4 z-105 pointer-events-none"
          >
            <Image
              src={state.images[state.currentIndex]}
              alt={state.title ? `${state.title} — ${state.currentIndex + 1}` : `Image ${state.currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </m.div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm z-110 font-mono tracking-wide">
            {state.title && <span className="mr-2 opacity-60">{state.title} &bull;</span>}
            {state.currentIndex + 1} / {state.images.length}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );

  return mounted ? createPortal(overlay, document.body) : null;
}

// ─── useLightbox hook ─────────────────────────────────────────────────────────

export function useLightbox() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const open = useCallback((images: string[], currentIndex: number, title?: string) => {
    setLightbox({ images, currentIndex, title });
  }, []);

  const close = useCallback(() => setLightbox(null), []);

  const navigate = useCallback((index: number) => {
    setLightbox(prev => prev ? { ...prev, currentIndex: index } : null);
  }, []);

  return { lightbox, open, close, navigate };
}
