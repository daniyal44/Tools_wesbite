import { ToolDefinition } from '@/lib/tools/types';

export const profitMarginCalculatorDefinition: ToolDefinition = {
  id: 'profit-margin-calculator',
  slug: 'profit-margin-calculator',
  name: 'Profit Margin Calculator',
  shortDescription: 'Calculate gross margin, markup, and profit amount.',
  longDescription: 'Easily calculate your business profit margins. Input your cost and selling price to find your gross margin percentage, markup percentage, and total profit amount. Crucial for pricing products correctly.',
  category: 'calculators',
  icon: 'pie-chart',
  keywords: ['profit', 'margin', 'markup', 'calculator', 'business', 'pricing', 'gross', 'revenue'],
  searchableText: 'profit margin markup calculator business pricing gross revenue cost selling price',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Profit Margin & Markup Calculator | Zevylo Tools',
    description: 'Calculate gross margin, markup percentage, and profit amount based on cost and selling price.',
  },
  faq: [
    { question: 'What is the difference between margin and markup?', answer: 'Margin is profit expressed as a percentage of revenue (selling price). Markup is profit expressed as a percentage of cost.' }
  ],
  relatedTools: ['roi-calculator', 'percentage-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 3,
  component: 'profit-margin-calculator',
};
