import Link from 'next/link';
import { BRAND_INFO, NAV_LINKS } from '@/lib/config';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { Logo } from './logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-surface-primary border-t border-border-line relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />

      {/* Main Footer */}
      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-12 py-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <Logo color="auto" />
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-sm">
              {BRAND_INFO.description}
            </p>
            <div className="flex gap-4">
               {/* Social placeholders could go here */}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-sm uppercase tracking-widest text-heading mb-6 border-b border-border-accent pb-2 inline-block">Navigation</h4>
            <nav className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-text-secondary hover:text-heading transition-colors duration-300 font-medium"
                >
                  <ArrowUpRight className="w-3 h-3 text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-sm uppercase tracking-widest text-heading mb-6 border-b border-border-accent pb-2 inline-block">Contact</h4>
            <div className="flex flex-col space-y-4 text-sm text-text-secondary">
              <div className="flex items-start gap-3 group">
                <MapPin size={16} className="text-accent-blue mt-1 shrink-0 group-hover:text-heading transition-colors" />
                <span className="group-hover:text-text-primary transition-colors">{BRAND_INFO.contact.address.full}</span>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone size={16} className="text-accent-blue shrink-0 group-hover:text-heading transition-colors" />
                <a
                  href={`tel:${BRAND_INFO.contact.phone}`}
                  className="transition-colors hover:text-heading"
                >
                  {BRAND_INFO.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail size={16} className="text-accent-blue shrink-0 group-hover:text-heading transition-colors" />
                <a
                  href={`mailto:${BRAND_INFO.contact.email}`}
                  className="transition-colors hover:text-heading"
                >
                  {BRAND_INFO.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border-line relative z-10" style={{ backgroundColor: 'var(--surface-elevated)' }}>
        <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
            <p className="uppercase tracking-wider">
              © {currentYear} {BRAND_INFO.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
