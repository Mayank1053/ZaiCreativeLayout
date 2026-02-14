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
            className="flex gap-4 group"
          >
            <div className="w-12 h-12 bg-slate-800/50 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-blue-500/50 transition-colors">
              <IconComponent className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1 tracking-wider uppercase font-mono">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-white font-medium hover:text-blue-400 transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-white font-medium">{item.value}</p>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Business Hours */}
      <motion.div variants={fadeInUp} className="flex gap-4 group">
        <div className="w-12 h-12 bg-slate-800/50 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-blue-500/50 transition-colors">
          <Clock className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <p className="text-sm text-slate-500 mb-1 tracking-wider uppercase font-mono">Business Hours</p>
          <p className="text-white font-medium">Mon - Sat: 10:00 AM - 7:00 PM</p>
          <p className="text-sm text-slate-500 mt-1">Sunday: Closed</p>
        </div>
      </motion.div>

      {/* Director Info */}
      <motion.div
        variants={fadeInUp}
        className="mt-8 pt-8 border-t border-white/10"
      >
        <p className="text-sm text-slate-500 mb-2 uppercase tracking-widest font-mono">Led by</p>
        <p className="font-serif text-2xl text-white">{BRAND_INFO.director.name}</p>
        <p className="text-blue-400 text-sm tracking-wide">{BRAND_INFO.director.title}</p>
      </motion.div>
    </motion.div>
  );
}
