'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const SERVICES = [
  'Architecture',
  'Engineering',
  'Construction',
  'Consultation',
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  services: string[];
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    services: [],
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle service toggle
  const toggleService = (service: string) => {
    setFormData((prev) => {
      const services = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          services: [],
        });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Failed to submit form. Please try again later.');
    }
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Name Field */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-slate-300">
          Your Name <span className="text-blue-500">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Praveen ...."
          value={formData.name}
          onChange={handleChange}
          required
          disabled={status === 'submitting'}
          className="bg-card"
        />
      </motion.div>

      {/* Email Field */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-slate-300">
          Email Address <span className="text-blue-500">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="praveen@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={status === 'submitting'}
          className="bg-card"
        />
      </motion.div>

      {/* Phone Field */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-slate-300">
          Phone Number
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+91 ......."
          value={formData.phone}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className="bg-card"
        />
      </motion.div>

      {/* Services Selection */}
      <motion.div variants={fadeInUp} className="space-y-3">
        <Label className="text-sm font-medium text-slate-300">
          Interested Services
        </Label>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => toggleService(service)}
              disabled={status === 'submitting'}
              className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${
                formData.services.includes(service)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-800/50 text-slate-400 border-white/10 hover:border-blue-500/50 hover:text-white'
              }`}
            >
              {service}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Message Field */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium text-slate-300">
          Your Message <span className="text-blue-500">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your project..."
          value={formData.message}
          onChange={handleChange}
          required
          disabled={status === 'submitting'}
          rows={5}

          className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 resize-none"
        />
      </motion.div>

      {/* Error Message */}
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-md"
        >
          <AlertCircle size={18} />
          <p className="text-sm">{errorMessage}</p>
        </motion.div>
      )}

      {/* Success Message */}
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 bg-green-500/10 text-green-600 rounded-md"
        >
          <CheckCircle size={18} />
          <p className="text-sm">
            Thank you! Your enquiry has been submitted successfully. We&apos;ll get back to you soon.
          </p>
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.div variants={fadeInUp}>
        <Button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-luxury w-full h-12"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Enquiry
            </>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}
