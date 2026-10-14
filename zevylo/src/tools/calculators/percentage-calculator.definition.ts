import { ToolDefinition } from '@/lib/tools/types';

export const percentageCalculatorDefinition: ToolDefinition = {
  id: 'percentage-calculator',
  slug: 'percentage-calculator',
  name: 'Percentage Calculator',
  shortDescription: 'Calculate percentages, percentage change, and percentage of a number.',
  longDescription: 'A versatile percentage calculator that helps you quickly calculate percentages in various ways. Calculate what percentage one number is of another, find a specific percentage of a number, or determine the percentage increase or decrease between two values.',
  category: 'calculators',
  icon: 'percent',
  keywords: ['percentage', 'calculator', 'percent', 'change', 'increase', 'decrease'],
  searchableText: 'percentage calculator calculate percent change increase decrease',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Percentage Calculator | Zevylo Tools',
    description: 'Calculate percentages, percentage change, and percentage of a number instantly.',
  },
  faq: [
    { question: 'How do I calculate what percentage X is of Y?', answer: 'Divide X by Y and multiply by 100.' },
    { question: 'How do I calculate percentage change?', answer: 'Subtract the old value from the new value, divide by the absolute value of the old value, and multiply by 100.' }
  ],
  relatedTools: ['roi-calculator', 'profit-margin-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 1,
  component: 'percentage-calculator',
};
