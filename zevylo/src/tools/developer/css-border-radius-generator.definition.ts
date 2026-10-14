import { ToolDefinition } from '@/lib/tools/types';

export const cssBorderRadiusGeneratorDefinition: ToolDefinition = {
  id: 'css-border-radius-generator',
  slug: 'css-border-radius-generator',
  name: 'CSS Border Radius & Blob Generator',
  shortDescription: 'Design organic blob shapes and 8-point fancy border-radius curves with interactive sliders.',
  longDescription: 'Interactive 8-point CSS border-radius and blob shape generator. Adjust horizontal and vertical radius percentage axes, test morphing animations, pick gradients, and copy production-ready CSS border-radius properties.',
  category: 'developer',
  icon: 'box',
  keywords: ['css border radius', 'blob generator', '8 point border radius', 'css shape generator', 'organic shapes', 'fancy border radius'],
  searchableText: 'css border radius generator blob organic 8-point horizontal vertical morphing animation curve shape modern frontend',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'CSS Border Radius & 8-Point Blob Generator | Zevylo',
    description: 'Generate organic 8-point CSS border-radius blobs and rounded shapes interactively. Copy CSS code, toggle animation, and customize aspect ratios.',
    keywords: ['css blob generator', 'fancy border radius generator', '8 point border radius', 'organic css shape generator'],
  },
  faq: [
    {
      question: 'How does 8-point CSS border-radius work?',
      answer: 'Standard CSS border-radius accepts horizontal and vertical values separated by a slash (e.g., border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%), enabling asymmetrical, organic curves and blobs.',
    },
    {
      question: 'Is 8-point border-radius supported by all modern browsers?',
      answer: 'Yes! The slash syntax is fully supported by Chrome, Safari, Firefox, Edge, and mobile browsers without prefixes.',
    },
  ],
  relatedTools: ['css-box-shadow-generator', 'css-gradient-generator', 'css-neumorphism-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 27,
  component: 'css-border-radius-generator',
};
