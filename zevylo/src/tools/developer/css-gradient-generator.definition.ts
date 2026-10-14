import { ToolDefinition } from '@/lib/tools/types';

export const cssGradientGeneratorDefinition: ToolDefinition = {
  id: 'css-gradient-generator',
  slug: 'css-gradient-generator',
  name: 'CSS Gradient Generator',
  shortDescription: 'Generate beautiful CSS linear and radial gradients with customizable color stops and angle controls.',
  longDescription: 'Design smooth background gradients visually. Adjust gradient angle, add unlimited color stops, customize color stops with hex/rgba pickers, toggle between linear and radial styles, and copy production-ready CSS background code in one click.',
  category: 'developer',
  icon: 'palette',
  keywords: ['css gradient generator', 'linear gradient', 'radial gradient', 'css background generator', 'color gradient', 'it-tools alternative'],
  searchableText: 'css gradient generator create linear radial color stops angle background css',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'CSS Gradient Generator — Create Beautiful Linear & Radial Gradients | Zevylo',
    description: 'Create linear and radial CSS gradients visually with color stops and angle controls. Copy CSS code instantly. Free and client-side.',
  },
  faq: [
    {
      question: 'How do you apply a CSS gradient to a webpage background?',
      answer: 'Copy the generated CSS snippet (e.g. background: linear-gradient(135deg, #4f46e5, #06b6d4);) and paste it into your CSS stylesheet or Tailwind arbitrary value.',
    },
    {
      question: 'What is the difference between linear and radial gradients?',
      answer: 'Linear gradients transition colors along a straight directional line (defined by angles), whereas radial gradients radiate outward from a central point.',
    },
  ],
  relatedTools: ['css-box-shadow-generator', 'css-glassmorphism-generator', 'code-to-image'],
  status: 'active',
  visibility: 'public',
  sortOrder: 23,
  component: 'css-gradient-generator',
};
