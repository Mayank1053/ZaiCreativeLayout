'use client';

import { LOGO_CONFIG } from '@/lib/config';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'white' | 'black' | 'auto';
  showText?: boolean;
}

export function Logo({ className = '', size = 'md', color = 'default' }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // When 'auto': dark theme → white, light theme → black
  const resolvedColor = color === 'auto'
    ? (mounted && resolvedTheme === 'light' ? 'black' : 'white')
    : color;

  const sizeClasses = {
    sm: 'h-10',
    md: 'h-12',
    lg: 'h-16',
  };

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  const subTextSizeClasses = {
    sm: 'text-[0.45rem]',
    md: 'text-[0.55rem]',
    lg: 'text-[0.65rem]',
  };

  const textColor: Record<string, string> = {
    default: 'text-foreground',
    white: 'text-white',
    black: 'text-slate-900',
    auto: mounted && resolvedTheme === 'light' ? 'text-slate-900' : 'text-white',
  };

  const subTextColor: Record<string, string> = {
    default: 'text-muted-foreground',
    white: 'text-white/80',
    black: 'text-slate-900/70',
    auto: mounted && resolvedTheme === 'light' ? 'text-slate-700' : 'text-white/80',
  };

  return (
    <Link href="/" className={cn("flex items-center gap-2 sm:gap-3 group select-none", className)}>
      {/* Icon/Image Part */}
      <div className={cn("relative w-auto aspect-square shrink-0", sizeClasses[size])}>
        <Image
          src={mounted && resolvedTheme === 'light' ? LOGO_CONFIG.lightImageUrl : LOGO_CONFIG.darkImageUrl}
          alt="Creative Layout"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 40px, (max-width: 1200px) 48px, 64px"
          priority
        />
      </div>

      {/* Text Part */}
      <div className="flex flex-col justify-center">
        <span className={cn(
          "font-serif font-bold leading-none tracking-tight whitespace-nowrap",
          textColor[resolvedColor] || textColor[color],
          textSizeClasses[size]
        )}>
          {LOGO_CONFIG.text.primary}
        </span>
        <span className={cn(
          "font-sans uppercase tracking-[0.15em] leading-tight mt-0.5",
          subTextColor[resolvedColor] || subTextColor[color],
          subTextSizeClasses[size]
        )}>
          {LOGO_CONFIG.text.secondary}
        </span>
      </div>
    </Link>
  );
}
