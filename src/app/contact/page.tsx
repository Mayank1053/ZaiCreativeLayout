import { Metadata } from 'next';
import { PageContainer } from '@/components/shared';
import { ContactForm } from '@/components/contact/contact-form';
import { BRAND_INFO } from '@/lib/config';
import ContactInfoClient from './contact-info-client';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Contact Us | Creative Layout',
  description: 'Get in touch with Creative Layout for architecture and construction services in Raipur, Chhattisgarh, India.',
  keywords: [
    'architecture',
    'construction',
    'Raipur',
    'Chhattisgarh',
    'Creative Layout',
  ],
};

// Contact page - Server Component
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-surface-primary pt-20 md:pt-28 pb-12 relative">
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
      
      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid-contact" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" style={{ color: 'var(--border-accent)' }} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-contact)" />
        </svg>
      </div>
      <PageContainer>
        {/* Header Section */}
        <div className="mb-8 relative z-10">
          <p className="text-accent-blue text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium mb-3 md:mb-4">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl md:text-6xl mb-4 md:mb-6 leading-tight text-heading max-w-4xl">
            Let&apos;s build your <br />
            <span className="italic text-text-secondary">vision.</span>
          </h1>
          <p className="text-text-secondary font-light text-base md:text-lg max-w-2xl leading-relaxed">
            Whether you have a specific project in mind or just want to explore possibilities, 
            we&apos;re here to listen and help shape your architectural future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Form Column - Now comes first on mobile or stays prominent */}
          <div className="lg:col-span-7 lg:order-2">
            <div className="backdrop-blur-sm p-8 md:p-8 border border-border-line" style={{ backgroundColor: 'var(--surface-overlay)', boxShadow: 'var(--shadow-elevated)' }}>
              <h2 className="font-serif text-2xl mb-2 text-heading">Send us a message</h2>
              <p className="text-text-secondary text-sm mb-8">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>
          </div>
          
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-12 lg:order-1">
            <div className="py-8 border-t border-b border-border-line">
              <ContactInfoClient />
            </div>

            <div>
              <p className="font-serif text-xl mb-4 text-heading">Visit Our Studio</p>
              <div className="aspect-video w-full border border-border-subtle transition-all duration-700 relative overflow-hidden group" style={{ backgroundColor: 'var(--surface-elevated)' }}>
                <iframe
                  src={BRAND_INFO.contact.mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Creative Layout Location"
                  className="opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
