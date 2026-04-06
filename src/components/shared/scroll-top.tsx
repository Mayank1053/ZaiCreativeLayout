'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if the current page is Home or Project detail page
    const allowedPages = ['/', '/projects/']; // project detail starts with /projects/ and is not exactly /projects
    const isAllowed = pathname === '/' || (pathname.startsWith('/projects/') && pathname !== '/projects');

    if (!isAllowed) {
      setIsVisible(false);
      return;
    }

    const toggleVisibility = () => {
      // Calculate halfway point
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollableHeight = scrollHeight - clientHeight;
      const halfWay = scrollableHeight / 2;

      if (window.scrollY > halfWay && window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-5 z-40 p-2.5 rounded-full bg-surface-elevated border border-border shadow-md transition-all duration-300 hover:scale-110 active:scale-95",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5 text-text-primary" />
    </button>
  );
}
