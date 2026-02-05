import {
  Palette,
  Building2,
  Handshake,
  Target,
  Video,
  GraduationCap,
  Lightbulb,
  Music,
  Camera,
  PenTool,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export interface Audience {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: Palette,
    title: "Brand Development",
    description:
      "Build a distinctive brand identity that resonates with your audience and stands out in the market.",
    features: [
      "Logo design & visual identity",
      "Brand strategy & positioning",
      "Marketing materials",
      "Brand guidelines",
      "Digital presence setup",
    ],
  },
  {
    icon: Building2,
    title: "Business Formation",
    description:
      "Navigate the complexities of establishing your creative business with expert guidance.",
    features: [
      "LLC filing assistance",
      "Entity structure guidance",
      "Compliance support",
      "Contract templates",
      "Legal resource access",
    ],
  },
  {
    icon: Handshake,
    title: "Sales Representation",
    description:
      "Connect with the right buyers and opportunities through our network and advocacy.",
    features: [
      "Direct sales outreach",
      "Customer acquisition",
      "Deal negotiation",
      "Relationship management",
      "Pipeline development",
    ],
  },
  {
    icon: Target,
    title: "Marketing Strategy",
    description:
      "Develop targeted marketing plans that amplify your work without breaking the bank.",
    features: [
      "Market research",
      "Campaign planning",
      "Channel strategy",
      "Content calendars",
      "Performance tracking",
    ],
  },
  {
    icon: Video,
    title: "Content Creation",
    description:
      "Professional support for creating compelling content that tells your story.",
    features: [
      "Video production",
      "Photography",
      "Social media content",
      "Editing & post-production",
      "Content strategy",
    ],
  },
  {
    icon: GraduationCap,
    title: "Creator Education",
    description:
      "Learn the business skills you need to thrive as an independent creative.",
    features: [
      "Rights education",
      "Business fundamentals",
      "Contract review guidance",
      "Financial literacy",
      "Industry navigation",
    ],
  },
];

export const audiences: Audience[] = [
  {
    icon: Lightbulb,
    title: "Inventors",
    description:
      "Patent holders and product developers with working products that need sales, marketing, and business structure.",
  },
  {
    icon: Music,
    title: "Musicians",
    description:
      "Independent artists, producers, and bands who need management, marketing, touring support, and merchandise systems.",
  },
  {
    icon: Camera,
    title: "Visual Artists",
    description:
      "Painters, illustrators, photographers, and digital artists who need help selling work and building collector bases.",
  },
  {
    icon: PenTool,
    title: "Designers",
    description:
      "Industrial, fashion, and UX/UI designers with products and services that need market positioning and sales channels.",
  },
  {
    icon: GraduationCap,
    title: "Writers",
    description:
      "Authors, screenwriters, and content creators who need publishing support, platform building, and rights protection.",
  },
];
