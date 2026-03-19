// ── Contact Data ──
// Contact methods and service-type options for the Contact page.

export interface ContactMethod {
  icon: string; // Lucide icon name
  title: string;
  description: string;
  /** Config key from siteConfig used to derive the display value at render time. */
  configKey: 'whatsapp' | 'email' | 'phone';
  actionLabel: string;
  color: string;
}

export const contactMethods: ContactMethod[] = [
  {
    icon: 'MessageCircle',
    title: 'WhatsApp',
    description: 'Quick responses, usually within minutes',
    configKey: 'whatsapp',
    actionLabel: 'Chat Now',
    color: 'bg-green-500/20 text-green-500',
  },
  {
    icon: 'Mail',
    title: 'Email',
    description: 'For detailed inquiries and proposals',
    configKey: 'email',
    actionLabel: 'Send Email',
    color: 'bg-nova-purple/20 text-nova-purple',
  },
  {
    icon: 'Phone',
    title: 'Phone',
    description: 'Available during business hours',
    configKey: 'phone',
    actionLabel: 'Call Now',
    color: 'bg-electric-blue/20 text-electric-blue',
  },
];

export const serviceTypes = [
  'Video Editing',
  'Social Media Management',
  'AI Automation',
  'Graphic Design',
  'Content Creation',
  'Other',
];
