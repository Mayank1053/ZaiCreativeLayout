'use client';

import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function PageContainer({ 
  children, 
  className = '',
  fullWidth = false 
}: PageContainerProps) {
  return (
    <main className={`grow ${className}`}>
      {fullWidth ? children : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      )}
    </main>
  );
}
