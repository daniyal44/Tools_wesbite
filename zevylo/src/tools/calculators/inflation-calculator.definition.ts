import { ToolDefinition } from '@/lib/tools/types';

export const inflationCalculatorDefinition: ToolDefinition = {
  id: 'inflation-calculator',
  slug: 'inflation-calculator',
  name: 'Inflation & Purchasing Power Calculator',
  shortDescription: 'Calculate how inflation erodes purchasing power over time with year-by-year breakdowns.',
  longDescription: 'Understand how annual inflation impacts your savings and purchasing power over time. Enter an initial amount, annual inflation rate, and time horizon in years to calculate future equivalent costs, loss of purchasing power, cumulative inflation, and year-by-year compounding projections.',
  category: 'calculators',
  icon: 'trending-down',
  keywords: ['inflation calculator', 'purchasing power calculator', 'future value of money', 'cpi calculator', 'cost of living inflation', 'compounding inflation'],
  searchableText: 'inflation calculator purchasing power future value money cpi cost of living erosion compounding annual rate year breakdown timeline finance',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Inflation & Purchasing Power Calculator | Zevylo',
    description: 'Calculate future price impact and loss of purchasing power with our free inflation calculator. See year-by-year breakdowns and cumulative inflation rates.',
    keywords: ['inflation calculator online', 'purchasing power loss calculator', 'future dollar value calculator', 'calculate inflation impact'],
  },
  faq: [
    {
      question: 'What is purchasing power loss?',
      answer: 'Purchasing power loss is the decrease in the amount of goods or services that money can buy over time due to rising prices caused by inflation.',
    },
    {
      question: 'How is cumulative inflation calculated?',
      answer: 'Cumulative inflation uses the compound formula (1 + r)^n - 1, which compounds annual inflation year-over-year rather than using simple addition.',
    },
  ],
  relatedTools: ['compound-interest-calculator', 'salary-calculator', 'crypto-profit-calculator', 'roi-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 23,
  component: 'inflation-calculator',
};
