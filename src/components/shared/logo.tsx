'use client';

import { LOGO_CONFIG } from '@/lib/config';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'white' | 'black';
  showText?: boolean; // Kept for backward compatibility but always true for this design
}

export function Logo({ className = '', size = 'md', color = 'default' }: LogoProps) {
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

  const textColor = {
    default: 'text-foreground',
    white: 'text-white',
    black: 'text-black',
  };

  const subTextColor = {
    default: 'text-muted-foreground',
    white: 'text-white/80',
    black: 'text-black/80',
  };

  return (
    <Link href="/" className={cn("flex items-center gap-2.5 sm:gap-3 group select-none", className)}>
      {/* Icon/Image Part */}
      <div className={cn("relative w-auto aspect-square shrink-0", sizeClasses[size])}>
        <Image
          src={LOGO_CONFIG.imageUrl}
          alt="Creative Layout Logo"
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
          textColor[color],
          textSizeClasses[size]
        )}>
          {LOGO_CONFIG.text.primary}
        </span>
        <span className={cn(
          "font-sans uppercase tracking-[0.15em] leading-tight mt-0.5 hidden sm:block",
          subTextColor[color],
          subTextSizeClasses[size]
        )}>
          {LOGO_CONFIG.text.secondary}
        </span>
      </div>
    </Link>
  );
}
