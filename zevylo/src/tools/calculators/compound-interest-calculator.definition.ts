import { ToolDefinition } from '@/lib/tools/types';

export const compoundInterestCalculatorDefinition: ToolDefinition = {
  id: 'compound-interest-calculator',
  slug: 'compound-interest-calculator',
  name: 'Compound Interest Calculator',
  shortDescription: 'Calculate investment growth, future value, and compounding interest with monthly contributions.',
  longDescription: 'Forecast the exponential growth of your wealth and investment portfolio over time. See the power of compound interest with regular monthly deposits, adjustable compounding intervals, and annual accumulation schedules.',
  category: 'calculators',
  icon: 'trending-up',
  keywords: ['compound interest calculator', 'investment calculator', 'future value', 'wealth growth', 'daily compounding', 'calcprotool'],
  searchableText: 'compound interest calculator calculate investment growth future value monthly contribution wealth',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Compound Interest Calculator — Investment Growth Forecast | Zevylo',
    description: 'Calculate future investment portfolio value with compound interest and recurring deposits. Free, instant, and private.',
  },
  faq: [
    {
      question: 'What is compound interest?',
      answer: 'Compound interest is interest earned on both the initial principal deposit and the accumulated interest from prior compounding periods.',
    },
    {
      question: 'Can I include recurring monthly contributions?',
      answer: 'Yes, this calculator allows you to input monthly deposits to simulate regular dollar-cost averaging into your investments.',
    },
  ],
  relatedTools: ['loan-emi-calculator', 'roi-calculator', 'percentage-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 5,
  component: 'compound-interest-calculator',
};
