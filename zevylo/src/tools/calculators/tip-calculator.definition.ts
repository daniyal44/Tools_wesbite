import { ToolDefinition } from '@/lib/tools/types';

export const tipCalculatorDefinition: ToolDefinition = {
  id: 'tip-calculator',
  slug: 'tip-calculator',
  name: 'Tip & Bill Split Calculator',
  shortDescription: 'Calculate restaurant tips and easily split bills evenly among friends.',
  longDescription: 'Easily calculate dining gratuity, total check amounts, and per-person split payments. Includes common tip percentage presets (15%, 18%, 20%, 25%), custom tip percentage sliders, and round-up options.',
  category: 'calculators',
  icon: 'utensils',
  keywords: ['tip calculator', 'split bill calculator', 'gratuity calculator', 'restaurant bill split', 'tip percentage', 'calcprotool alternative'],
  searchableText: 'tip calculator calculate gratuity restaurant bill split check per person tip percent',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Tip Calculator — Restaurant Gratuity & Bill Split | Zevylo',
    description: 'Calculate restaurant tips and split bills per person instantly. Free, fast, and completely client-side in your browser.',
  },
  faq: [
    {
      question: 'What is the standard tip percentage in restaurants?',
      answer: 'In the US and Canada, standard restaurant tipping is 15% to 20% for good service, with 18% being the most common default.',
    },
    {
      question: 'Can I split the tip and bill among multiple diners?',
      answer: 'Yes! Use the party size selector to instantly see the exact bill and tip owed per person.',
    },
  ],
  relatedTools: ['sales-tax-calculator', 'discount-calculator', 'percentage-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 20,
  component: 'tip-calculator',
};
