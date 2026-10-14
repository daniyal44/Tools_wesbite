import { ToolDefinition } from '@/lib/tools/types';

export const cssGlassmorphismGeneratorDefinition: ToolDefinition = {
  id: 'css-glassmorphism-generator',
  slug: 'css-glassmorphism-generator',
  name: 'CSS Glassmorphism Generator',
  shortDescription: 'Generate modern frosted glass CSS UI effects with backdrop-blur and border transparency.',
  longDescription: 'Design trendy frosted glass UI elements. Adjust backdrop blur intensity, background transparency, saturation boost, and border highlights in real time against vibrant multi-colored gradient backgrounds. Copy pure CSS in one click.',
  category: 'developer',
  icon: 'sparkles',
  keywords: ['glassmorphism generator', 'frosted glass css', 'backdrop blur css', 'glass ui generator', 'it-tools alternative'],
  searchableText: 'css glassmorphism generator create frosted glass backdrop blur transparency border glass ui',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'CSS Glassmorphism Generator — Create Frosted Glass UI Online | Zevylo',
    description: 'Design modern frosted glass UI cards with backdrop-filter blur and transparency. Free, fast, and client-side.',
  },
  faq: [
    {
      question: 'What CSS property creates the frosted glass effect?',
      answer: 'The primary property is backdrop-filter: blur(Xpx), paired with a semi-transparent background color (e.g., rgba(255, 255, 255, 0.2)) and a subtle border.',
    },
    {
      question: 'Is backdrop-filter supported in all modern browsers?',
      answer: 'Yes! It is supported in modern Chrome, Edge, Safari (with -webkit-backdrop-filter prefix), and Firefox.',
    },
  ],
  relatedTools: ['css-gradient-generator', 'css-box-shadow-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 25,
  component: 'css-glassmorphism-generator',
};
