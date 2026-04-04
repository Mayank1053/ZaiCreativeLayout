'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder to avoid layout shift
    return <div className="w-9 h-9" />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 overflow-hidden group"
      style={{
        borderColor: 'var(--border-line)',
        backgroundColor: 'var(--surface-elevated)',
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isDark ? (
          <m.div
            key="moon"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Moon className="w-4 h-4" style={{ color: 'var(--accent-blue)' }} />
          </m.div>
        ) : (
          <m.div
            key="sun"
            initial={{ y: -20, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Sun className="w-4 h-4" style={{ color: 'var(--accent-blue)' }} />
          </m.div>
        )}
      </AnimatePresence>

      {/* Subtle hover ring */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: '0 0 0 2px var(--accent-blue-muted)' }}
      />
    </button>
  );
}
