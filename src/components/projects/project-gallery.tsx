'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ImageLightbox, useLightbox } from '@/components/shared/image-lightbox';

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
  const { lightbox, open, close, navigate } = useLightbox();

  if (images.length === 0) {
    return (
      <div className="aspect-4/3 bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

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
            onClick={() => open(images, index, title)}
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

      {/* Shared Lightbox */}
      <ImageLightbox state={lightbox} onClose={close} onNavigate={navigate} />
    </>
  );
}
