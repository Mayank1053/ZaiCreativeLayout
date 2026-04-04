'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, X } from 'lucide-react';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { NAV_LINKS } from '@/lib/config';
import { m, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const isHome = pathname === '/';
  
  const isProjectDetail = pathname.startsWith('/projects/') && pathname !== '/projects';
  const isTransparent = (isHome || isProjectDetail) && !isScrolled;
  const isDark = mounted && resolvedTheme === 'dark';

  // When transparent on hero: dark mode uses white text, light mode uses dark text
  const heroTextLight = isTransparent && !isDark;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Determine nav link colors based on transparency + theme
  const getNavLinkColor = (active: boolean) => {
    if (active) return 'text-accent-blue';
    if (isTransparent && isDark) return 'text-white/80 hover:text-white';
    if (isTransparent && !isDark) return 'text-text-primary hover:text-heading';
    return 'text-text-secondary hover:text-heading';
  };

  // Logo color
  const logoColor = isTransparent ? (isDark ? 'white' : 'black') : 'auto';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        !isTransparent
          ? 'backdrop-blur-md shadow-lg border-border-accent'
          : 'bg-transparent border-transparent'
      }`}
      style={{
        backgroundColor: !isTransparent ? 'var(--surface-overlay-heavy)' : 'transparent',
      }}
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-12 lg:px-24">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo color={logoColor} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-xs tracking-[0.15em] uppercase transition-colors duration-300 font-medium ${getNavLinkColor(isActive(link.href))}`}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile: Toggle + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors ${
                isTransparent && isDark
                  ? 'text-white hover:text-accent-blue'
                  : 'text-heading hover:text-accent-blue'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden border-b overflow-hidden"
            style={{
              backgroundColor: 'var(--surface-primary)',
              borderColor: 'var(--border-accent)',
            }}
          >
             {/* Blueprint Grid Background for Mobile Menu */}
             <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />
             
            <nav className="relative z-10 flex flex-col py-6 px-6 space-y-2">
              {NAV_LINKS.map((link, index) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-3 px-4 text-sm tracking-widest uppercase font-medium border-l-2 transition-all duration-300 ${
                      isActive(link.href)
                        ? 'text-heading border-accent-blue bg-accent-blue-soft'
                        : 'text-text-secondary border-transparent hover:text-heading hover:border-border-line hover:bg-border-subtle'
                    }`}
                  >
                     <span className="mr-2 text-accent-blue opacity-70">0{index + 1}.</span>
                    {link.label}
                  </Link>
                </m.div>
              ))}
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
