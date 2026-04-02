'use client';

import { m } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { BRAND_INFO } from '@/lib/config';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// Contact info items
const contactItems = [
  {
    icon: Phone,
    label: 'Phone',
    value: BRAND_INFO.contact.phone,
    href: `tel:${BRAND_INFO.contact.phone.replace(/\s/g, '')}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: BRAND_INFO.contact.email,
    href: `mailto:${BRAND_INFO.contact.email}`,
  },
  {
    icon: MapPin,
    label: 'Address',
    value: BRAND_INFO.contact.address.full,
    href: BRAND_INFO.contact.maps,
  },
];

export default function ContactInfoClient() {
  return (
    <m.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-6"
    >
      {contactItems.map((item) => {
        const IconComponent = item.icon;
        
        return (
          <m.div
            key={item.label}
            variants={fadeInUp}
            className="flex gap-4 group"
          >
            <div className="w-12 h-12 border flex items-center justify-center shrink-0 transition-colors border-border-line group-hover:border-border-accent" style={{ backgroundColor: 'var(--surface-elevated)' }}>
              <IconComponent className="w-5 h-5 text-accent-blue" />
            </div>
            <div>
              <p className="text-sm text-text-muted mb-1 tracking-wider uppercase font-mono">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-heading font-medium hover:text-accent-blue transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-heading font-medium">{item.value}</p>
              )}
            </div>
          </m.div>
        );
      })}

      {/* Business Hours */}
      <m.div variants={fadeInUp} className="flex gap-4 group">
        <div className="w-12 h-12 border flex items-center justify-center shrink-0 transition-colors border-border-line group-hover:border-border-accent" style={{ backgroundColor: 'var(--surface-elevated)' }}>
          <Clock className="w-5 h-5 text-accent-blue" />
        </div>
        <div>
          <p className="text-sm text-text-muted mb-1 tracking-wider uppercase font-mono">Business Hours</p>
          <p className="text-heading font-medium">Mon - Sat: 10:00 AM - 7:00 PM</p>
          <p className="text-sm text-text-muted mt-1">Sunday: Closed</p>
        </div>
      </m.div>

      {/* Director Info */}
      <m.div
        variants={fadeInUp}
        className="mt-8 pt-8 border-t border-border-line"
      >
        <p className="text-sm text-text-muted mb-2 uppercase tracking-widest font-mono">Led by</p>
        <p className="font-serif text-2xl text-heading">{BRAND_INFO.director.name}</p>
        <p className="text-accent-blue text-sm tracking-wide">{BRAND_INFO.director.title}</p>
      </m.div>
    </m.div>
  );
}
