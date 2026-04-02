// Creative Layout - Brand Configuration
// This file contains all brand-related constants and configuration

// ========================================
// Logo Configuration
// ========================================
export const LOGO_CONFIG = {
  // Can be 'image' or 'text' or 'composite'
  type: 'composite' as const,
  
  // Image logo URLs
  darkImageUrl: 'https://i.ibb.co/B2ZqTBbG/Light-Logo1.png',
  lightImageUrl: 'https://i.ibb.co/v63LMdvK/New-Logo200.png',
  
  // Text details
  text: {
    primary: 'Creative Layout',
    secondary: 'Architecture & Construction',
  },
};

// ========================================
// Brand Information
// ========================================
export const BRAND_INFO = {
  name: 'Creative Layout',
  tagline: 'Architecture & Construction',
  description: 'Premium architecture and construction services in Chhattisgarh, India.',
  
  // Director/Head Architect
  director: {
    name: 'Prashant Ambilkar',
    title: 'Head Architect & Director',
  },
  
  // Contact Information
  contact: {
    phone: '+91 9479131777',
    email: 'ar.prashant01@gmail.com',
    maps: 'https://maps.app.goo.gl/4aFd7bfWPWyfhhgb9',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1896.4280099399514!2d81.58554130315328!3d21.23201109168969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28df688eca04c9%3A0x2baca434d6208100!2sCREATIVE%20LAYOUT!5e1!3m2!1sen!2sus!4v1771081142335!5m2!1sen!2sus',
    address: {
      line1: 'Shop no. Gb-08, Shopping center',
      line2: 'Indraprastha Phase-2, Raipura',
      city: 'Raipur',
      state: 'Chhattisgarh',
      country: 'India',
      full: 'Shop no. Gb-08, Shopping center, Indraprastha Phase-2, Raipura, Raipur, Chhattisgarh',
    },
  },
  
  // Social Links (add if needed)
  social: {
    instagram: '',
    facebook: '',
    linkedin: '',
  },
};

// ========================================
// Navigation
// ========================================
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Our Projects', href: '/projects' },
  { label: 'Our Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
];

// ========================================
// Process Steps
// ========================================
export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We begin with an in-depth consultation to understand your vision, requirements, and budget. This initial meeting sets the foundation for the entire project.',
    icon: 'MessageCircle',
  },
  {
    number: '02',
    title: 'Planning & Design',
    description: 'Our team creates detailed architectural plans and 3D visualizations. We refine the design until it perfectly captures your vision while adhering to vastu principles.',
    icon: 'PenTool',
  },
  {
    number: '03',
    title: 'Municipal Approval',
    description: 'Ensuring your project is approved by the municipal authorities with all the necessary documentation.',
    icon: 'FileText',
  },
  {
    number: '04',
    title: 'Construction',
    description: 'With meticulous attention to detail, we bring your design to life. Our experienced team ensures quality craftsmanship with quality material at every stage of construction.',
    icon: 'Hammer',
  },
  {
    number: '05',
    title: 'Handover',
    description: 'The final walkthrough ensures everything meets our exacting standards. We hand over the keys to your dream space, complete with all documentation.',
    icon: 'Key',
  },
];

// ========================================
// Categories
// ========================================
export const PROJECT_CATEGORIES = [
  'Residential',
  'Commercial',
  'Industrial',
];

// ========================================
// SEO Configuration
// ========================================
export const SEO_CONFIG = {
  title: 'Creative Layout | Architecture & Construction',
  description: 'Premium architecture and construction services in Chhattisgarh, India. We design spaces that inspire and endure. Specializing in residential, commercial, and vastu-compliant designs.',
  keywords: [
    'architecture',
    'construction',
    'Raipur',
    'Chhattisgarh',
    'vastu',
    'residential',
    'commercial',
    'Creative Layout',
    'Prashant Ambilkar',
  ],
  url: 'https://creativelayout.in',
};

// ========================================
// Theme Configuration
// ========================================
export const THEME_CONFIG = {
  colors: {
    navy: '#102a43',
    gold: '#d4a017',
    cream: '#faf9f7',
  },
};
