// ── Lucide Icon Map ──
// Maps string icon names (used in data files) to Lucide React components.
// When adding a new icon to any data file, add the mapping here.

import type { LucideIcon } from 'lucide-react';
import {
  Award,
  BookOpen,
  Bot,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Globe,
  HelpCircle,
  Headphones,
  Image,
  Instagram,
  Mail,
  Megaphone,
  MessageCircle,
  Package,
  Palette,
  Phone,
  Play,
  Shield,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Video,
  Youtube,
  Zap,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Award,
  BookOpen,
  Bot,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Globe,
  HelpCircle,
  HeadphonesIcon: Headphones,
  Image,
  Instagram,
  Mail,
  Megaphone,
  MessageCircle,
  Package,
  Palette,
  Phone,
  Play,
  Shield,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Video,
  Youtube,
  Zap,
};

/**
 * Resolve a string icon name to a Lucide component.
 * Falls back to `Zap` for unknown names.
 */
export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Zap;
}

export default iconMap;
