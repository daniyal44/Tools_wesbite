import { ToolDefinition } from '@/lib/tools/types';

export const dateDifferenceCalculatorDefinition: ToolDefinition = {
  id: 'date-difference-calculator',
  slug: 'date-difference-calculator',
  name: 'Date Difference & Duration Calculator',
  shortDescription: 'Calculate exact days, weeks, months, and business days between any two dates.',
  longDescription: 'Find the exact span of time between two dates. Calculate total calendar days, working business days (excluding weekends), full weeks, months, and hours. Perfect for project deadlines, contract durations, and countdowns.',
  category: 'date-time',
  icon: 'calendar',
  keywords: ['date difference calculator', 'days between dates', 'business days calculator', 'work days calculator', 'time between dates', 'calcprotool alternative'],
  searchableText: 'date difference calculator calculate days between two dates business work days weeks duration',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Date Difference Calculator — Calculate Days & Business Days Between Dates | Zevylo',
    description: 'Calculate days, weeks, months, and business days between two dates. Instant, free, and completely client-side in your browser.',
  },
  faq: [
    {
      question: 'How are business days calculated?',
      answer: 'Business days count Monday through Friday between the two specified dates, excluding Saturdays and Sundays.',
    },
    {
      question: 'Can I include or exclude the end date?',
      answer: 'Yes! Toggle the "Include End Date" checkbox to add or exclude the boundary day from the total count.',
    },
  ],
  relatedTools: ['age-calculator', 'timestamp-converter', 'unit-converter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 14,
  component: 'date-difference-calculator',
};
