'use client';

import { usePathname } from 'next/navigation';
import { Header, Footer } from '@/components/shared';
import { Toaster } from "@/components/ui/toaster";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith('/admin');

  if (isAdminPath) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Header key={pathname} />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
      <Toaster />
    </>
  );
}
