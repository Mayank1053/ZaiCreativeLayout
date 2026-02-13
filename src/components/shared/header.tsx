'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Logo } from './logo';
import { NAV_LINKS } from '@/lib/config';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  
  // Header is transparent and text is white on Home page OR Project Details pages when NOT scrolled
  const isProjectDetail = pathname.startsWith('/projects/') && pathname !== '/projects';
  const isTransparent = (isHome || isProjectDetail) && !isScrolled;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        !isTransparent
          ? 'bg-[#0F172A]/90 backdrop-blur-md border-blue-500/20 shadow-lg shadow-blue-900/5'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo color={isTransparent ? 'white' : 'white'} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-xs tracking-[0.15em] uppercase transition-colors duration-300 font-mono ${
                  isActive(link.href)
                    ? 'text-blue-400'
                    : isTransparent 
                      ? 'text-slate-300 hover:text-white' 
                      : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="mr-1 opacity-50 text-blue-500">//</span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isTransparent ? 'text-white hover:text-blue-400' : 'text-slate-200 hover:text-blue-400'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden bg-[#0F172A] border-b border-blue-500/20 overflow-hidden"
          >
             {/* Blueprint Grid Background for Mobile Menu */}
             <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />
             
            <nav className="relative z-10 flex flex-col py-6 px-6 space-y-2">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-3 px-4 text-sm tracking-widest uppercase font-mono border-l-2 transition-all duration-300 ${
                      isActive(link.href)
                        ? 'text-white border-blue-500 bg-blue-500/10'
                        : 'text-slate-400 border-transparent hover:text-white hover:border-slate-600 hover:bg-white/5'
                    }`}
                  >
                     <span className="mr-2 text-blue-500 opacity-70">0{index + 1}.</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
