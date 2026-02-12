import Link from 'next/link';
import { BRAND_INFO, NAV_LINKS } from '@/lib/config';
import { MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto" style={{ backgroundColor: '#102a43', color: '#d9e2ec' }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="font-serif text-2xl font-medium">
                <span className="text-white">Creative</span>
                <span style={{ color: '#edc85a' }} className="ml-1">Layout</span>
              </span>
            </div>
            <p style={{ color: '#9fb3c8' }} className="text-sm leading-relaxed">
              {BRAND_INFO.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors duration-300 hover:text-accent"
                  style={{ color: '#9fb3c8' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">Services</h4>
            <ul style={{ color: '#9fb3c8' }} className="flex flex-col space-y-2 text-sm">
              <li>Architectural Design</li>
              <li>Construction</li>
              <li>Interior Design</li>
              <li>Vastu Consultation</li>
              <li>Renovation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">Contact</h4>
            <div style={{ color: '#9fb3c8' }} className="flex flex-col space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} style={{ color: '#edc85a' }} className="flex-shrink-0 mt-0.5" />
                <span>{BRAND_INFO.contact.address.full}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} style={{ color: '#edc85a' }} className="flex-shrink-0" />
                <a
                  href={`tel:${BRAND_INFO.contact.phone}`}
                  className="transition-colors hover:text-accent"
                >
                  {BRAND_INFO.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} style={{ color: '#edc85a' }} className="flex-shrink-0" />
                <a
                  href={`mailto:${BRAND_INFO.contact.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {BRAND_INFO.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t" style={{ borderColor: '#243b53' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div style={{ color: '#829ab1' }} className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>
              © {currentYear} {BRAND_INFO.name}. All rights reserved.
            </p>
            <p>
              Designed with passion for architecture
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
