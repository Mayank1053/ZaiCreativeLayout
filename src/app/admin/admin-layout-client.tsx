'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminNav } from '@/components/admin';
import { Loader2, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

export default function AdminLayoutClient({
  children,
  isAuthenticated,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // If on login page, we don't need to redirect
    if (pathname === '/admin/login') {
      setIsChecking(false);
      return;
    }

    // If not authenticated and not on login page, redirect
    if (!isAuthenticated) {
      router.push('/admin/login');
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated, pathname, router]);

  // Show loading state while checking redirection
  if (isChecking && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  // Login page doesn't need sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Authenticated pages have sidebar
  if (!isAuthenticated && pathname !== '/admin/login') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <AdminNav />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center p-4 border-b border-border bg-card">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
            <AdminNav 
              className="w-full h-full border-none" 
              onLinkClick={() => setMobileMenuOpen(false)} 
            />
          </SheetContent>
        </Sheet>
        <h1 className="ml-4 font-serif text-lg font-semibold">Admin Panel</h1>
      </div>

      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
