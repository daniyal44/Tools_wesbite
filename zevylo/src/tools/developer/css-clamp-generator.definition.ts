import { ToolDefinition } from '@/lib/tools/types';

export const cssClampGeneratorDefinition: ToolDefinition = {
  id: 'css-clamp-generator',
  slug: 'css-clamp-generator',
  name: 'CSS Clamp & Fluid Typography Generator',
  shortDescription: 'Generate responsive CSS clamp() font sizes that scale smoothly with the viewport.',
  longDescription:
    'Create fluid, responsive typography without media queries. Set your minimum and maximum viewport widths and font sizes, and this tool generates the exact CSS clamp() value that scales linearly between them. Includes a live preview that resizes with your own browser window and shows the computed size at each breakpoint. Great for modern, maintainable responsive design — generated entirely in your browser.',
  category: 'developer',
  icon: 'type',
  keywords: ['css clamp generator', 'fluid typography', 'responsive font size', 'clamp calculator', 'fluid type scale', 'css vw font', 'responsive type'],
  searchableText: 'css clamp generator fluid typography responsive font size viewport vw rem calculator type scale',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'CSS Clamp() Generator — Fluid Responsive Typography | Zevylo Tools',
    description: 'Free CSS clamp() generator for fluid, responsive font sizes that scale with the viewport — no media queries. Live preview included. 100% client-side.',
  },
  faq: [
    { question: 'What does CSS clamp() do for typography?', answer: 'clamp(min, preferred, max) lets a font size grow smoothly between a minimum and maximum as the viewport changes, giving responsive type without multiple media-query breakpoints.' },
    { question: 'How is the preferred value calculated?', answer: 'It computes the straight line between your two viewport/size pairs, expressed as a rem offset plus a vw slope, then clamps it between your min and max sizes in rem.' },
    { question: 'Why rem and vw?', answer: 'rem keeps the min/max tied to the root font size (good for accessibility and zoom), while vw drives the smooth scaling with viewport width.' },
  ],
  relatedTools: ['css-gradient-generator', 'css-box-shadow-generator', 'css-glassmorphism-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 22,
  component: 'css-clamp-generator',
};
