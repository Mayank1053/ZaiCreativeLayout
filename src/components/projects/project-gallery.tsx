'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const slideIn = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
};

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex]);

  // Open lightbox
  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setCurrentIndex(index);
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  // Navigate to previous image
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Navigate to next image
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') closeLightbox();
  };

  if (images.length === 0) {
    return (
      <div className="aspect-4/3 bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  const lightbox = (
    <AnimatePresence>
      {selectedIndex !== null && (
        <m.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeIn}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-60"
            aria-label="Close gallery"
          >
            <X size={32} />
          </button>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-60"
                aria-label="Previous image"
              >
                <ChevronLeft size={48} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-60"
                aria-label="Next image"
              >
                <ChevronRight size={48} />
              </button>
            </>
          )}

          {/* Main image */}
          <m.div
            key={currentIndex}
            variants={slideIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-6xl h-[80vh] mx-4 z-55"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </m.div>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm z-60">
            {currentIndex + 1} / {images.length}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <m.div
            key={`${image}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative overflow-hidden cursor-pointer ${
              index === 0 ? 'col-span-2 row-span-2' : ''
            }`}
            onClick={() => openLightbox(index)}
          >
            <div className={`${index === 0 ? 'aspect-4/3' : 'aspect-square'} bg-muted`}>
              <Image
                src={image}
                alt={`${title} - Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes={index === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
              />
            </div>
          </m.div>
        ))}
      </div>

      {/* Lightbox Portal */}
      {mounted ? createPortal(lightbox, document.body) : null}
    </>
  );
}
