import { ToolDefinition } from '@/lib/tools/types';

export const cssBoxShadowGeneratorDefinition: ToolDefinition = {
  id: 'css-box-shadow-generator',
  slug: 'css-box-shadow-generator',
  name: 'CSS Box Shadow Generator',
  shortDescription: 'Visually create and customize soft, realistic CSS box-shadows with real-time controls.',
  longDescription: 'Craft smooth CSS box shadows with live visual feedback. Adjust horizontal and vertical offsets, blur radius, spread radius, shadow color, opacity, and inset toggle. Copy ready-to-use CSS snippets for modern UI design.',
  category: 'developer',
  icon: 'layers',
  keywords: ['css box shadow generator', 'box shadow css', 'drop shadow generator', 'elevation shadow', 'it-tools alternative'],
  searchableText: 'css box shadow generator create drop shadow blur spread offset inset css',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'CSS Box Shadow Generator — Create Smooth Drop Shadows Online | Zevylo',
    description: 'Design soft and modern CSS box shadows with interactive sliders and copy CSS code. 100% free and client-side.',
  },
  faq: [
    {
      question: 'How do you create soft modern box shadows in CSS?',
      answer: 'Use a larger blur radius (e.g. 25px - 50px) combined with low shadow opacity (e.g. 0.05 - 0.15) and a slight negative spread to create smooth, realistic depth.',
    },
    {
      question: 'What does the inset property do in box-shadow?',
      answer: 'The inset keyword reverses the shadow direction, drawing it inside the border of the element rather than outside.',
    },
  ],
  relatedTools: ['css-gradient-generator', 'css-glassmorphism-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 24,
  component: 'css-box-shadow-generator',
};
