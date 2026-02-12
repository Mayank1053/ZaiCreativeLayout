'use client';

import { motion } from 'framer-motion';
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-6"
    >
      {contactItems.map((item) => {
        const IconComponent = item.icon;
        
        return (
          <motion.div
            key={item.label}
            variants={fadeInUp}
            className="flex gap-4"
          >
            <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0">
              <IconComponent className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="font-medium hover:text-accent transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="font-medium">{item.value}</p>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Business Hours */}
      <motion.div variants={fadeInUp} className="flex gap-4">
        <div className="w-12 h-12 bg-muted flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Business Hours</p>
          <p className="font-medium">Mon - Sat: 10:00 AM - 7:00 PM</p>
          <p className="text-sm text-muted-foreground mt-1">Sunday: Closed</p>
        </div>
      </motion.div>

      {/* Director Info */}
      <motion.div
        variants={fadeInUp}
        className="mt-8 pt-8 border-t border-border"
      >
        <p className="text-sm text-muted-foreground mb-2">Led by</p>
        <p className="font-serif text-xl">{BRAND_INFO.director.name}</p>
        <p className="text-accent text-sm">{BRAND_INFO.director.title}</p>
      </motion.div>
    </motion.div>
  );
}
