import { ToolDefinition } from '@/lib/tools/types';

export const scientificCalculatorDefinition: ToolDefinition = {
  id: 'scientific-calculator',
  slug: 'scientific-calculator',
  name: 'Scientific Calculator Online',
  shortDescription: 'Free online scientific calculator with trigonometric, logarithmic, and exponential functions.',
  longDescription: 'Perform advanced mathematical operations right in your browser. Includes trigonometry (sin, cos, tan), logarithms (log10, natural log ln), square roots, exponents, parentheses, factorials, constants (π, e), and degree/radian toggles.',
  category: 'calculators',
  icon: 'calculator',
  keywords: ['scientific calculator', 'online calculator', 'trig calculator', 'log calculator', 'math calculator free', 'calcprotool alternative'],
  searchableText: 'scientific calculator calculate online trigonometric sin cos tan logarithm sqrt exponent math',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Scientific Calculator Online — Free Advanced Math & Trig Calculator | Zevylo',
    description: 'Free scientific calculator online with trigonometry, logarithms, square roots, and degree/radian mode. 100% private in your browser.',
  },
  faq: [
    {
      question: 'Does this scientific calculator support both radians and degrees?',
      answer: 'Yes! Toggle the DEG/RAD switch to easily compute trigonometric functions in either degrees or radians.',
    },
    {
      question: 'Is my calculation history saved?',
      answer: 'Your session calculation history is stored locally in your browser so you can reference previous answers anytime.',
    },
  ],
  relatedTools: ['percentage-calculator', 'dice-roller'],
  status: 'active',
  visibility: 'public',
  sortOrder: 16,
  component: 'scientific-calculator',
};
