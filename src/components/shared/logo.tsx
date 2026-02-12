'use client';

import { LOGO_CONFIG } from '@/lib/config';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showText = true, size = 'md', color = 'default' }: LogoProps & { color?: 'default' | 'white' | 'black' }) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const textColor = color === 'default' ? 'text-foreground' : color === 'white' ? 'text-white' : 'text-black';

  // Image Logo
  if (LOGO_CONFIG.type === 'image') {
    return (
      <Link href="/" className={`flex items-center ${className}`}>
        <div className={`relative ${sizeClasses[size]} w-auto`}>
          <Image
            src={LOGO_CONFIG.imageUrl}
            alt="Creative Layout"
            width={200}
            height={60}
            className="h-full w-auto object-contain"
            priority
          />
        </div>
      </Link>
    );
  }

  // Text Logo
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <span className={`font-serif font-medium tracking-wide ${textSizeClasses[size]}`}>
        <span className={textColor}>{LOGO_CONFIG.text.primary}</span>
        <span style={{ color: '#d4a017' }} className="ml-1">{LOGO_CONFIG.text.secondary}</span>
      </span>
    </Link>
  );
}
