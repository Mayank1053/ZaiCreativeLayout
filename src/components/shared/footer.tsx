import Link from 'next/link';
import { BRAND_INFO, NAV_LINKS } from '@/lib/config';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { Logo } from './logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#0F172A] border-t border-blue-500/20 relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />

      {/* Main Footer */}
      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <Logo color="white" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              {BRAND_INFO.description}
            </p>
            <div className="flex gap-4">
               {/* Social placeholders could go here */}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white mb-6 border-b border-blue-500/30 pb-2 inline-block">Navigation</h4>
            <nav className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-300 font-medium"
                >
                  <ArrowUpRight className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white mb-6 border-b border-blue-500/30 pb-2 inline-block">Contact</h4>
            <div className="flex flex-col space-y-4 text-sm text-slate-400">
              <div className="flex items-start gap-3 group">
                <MapPin size={16} className="text-blue-500 mt-1 shrink-0 group-hover:text-white transition-colors" />
                <span className="group-hover:text-slate-300 transition-colors">{BRAND_INFO.contact.address.full}</span>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone size={16} className="text-blue-500 shrink-0 group-hover:text-white transition-colors" />
                <a
                  href={`tel:${BRAND_INFO.contact.phone}`}
                  className="transition-colors hover:text-white"
                >
                  {BRAND_INFO.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail size={16} className="text-blue-500 shrink-0 group-hover:text-white transition-colors" />
                <a
                  href={`mailto:${BRAND_INFO.contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {BRAND_INFO.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-500/10 bg-[#0B1221] relative z-10">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <p className="uppercase tracking-wider">
              © {currentYear} {BRAND_INFO.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
