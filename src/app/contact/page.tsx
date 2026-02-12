import { Metadata } from 'next';
import { PageContainer } from '@/components/shared';
import { ContactForm } from '@/components/contact/contact-form';
import { BRAND_INFO } from '@/lib/config';
import ContactInfoClient from './contact-info-client';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Contact Us | Creative Layout',
  description: 'Get in touch with Creative Layout for architecture and construction services in Chhattisgarh, India.',
};

// Contact page - Server Component
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <p className="text-accent text-xs tracking-[0.2em] uppercase font-medium mb-6">
                Get in Touch
              </p>
              <h1 className="font-serif text-5xl md:text-6xl mb-6 leading-tight">
                Let&apos;s build your <br />
                <span className="italic text-muted-foreground">vision.</span>
              </h1>
              <p className="text-muted-foreground font-light text-lg leading-relaxed">
                Whether you have a specific project in mind or just want to explore possibilities, 
                we&apos;re here to listen and guide you.
              </p>
            </div>

            <div className="py-8 border-t border-b border-border">
              <ContactInfoClient />
            </div>

            <div>
              <p className="font-serif text-xl mb-4">Visit Our Studio</p>
              <div className="aspect-video w-full bg-muted grayscale hover:grayscale-0 transition-all duration-700 relative overflow-hidden">
                <iframe
                  src={BRAND_INFO.contact.mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Creative Layout Location"
                  className="opacity-80 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 lg:mt-12">
            <div className="bg-muted/20 p-8 md:p-12 border border-border">
              <h2 className="font-serif text-2xl mb-2">Send us a message</h2>
              <p className="text-muted-foreground text-sm mb-8">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>
          </div>

        </div>
      </PageContainer>
    </main>
  );
}
