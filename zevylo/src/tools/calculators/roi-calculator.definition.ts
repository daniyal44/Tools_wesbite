import { ToolDefinition } from '@/lib/tools/types';

export const roiCalculatorDefinition: ToolDefinition = {
  id: 'roi-calculator',
  slug: 'roi-calculator',
  name: 'ROI Calculator',
  shortDescription: 'Calculate Return on Investment, net profit, and annualized ROI.',
  longDescription: 'Easily calculate your Return on Investment (ROI). Input your initial investment and final value to see your net profit, ROI percentage, and annualized return. Essential tool for investors and business owners.',
  category: 'calculators',
  icon: 'trending-up',
  keywords: ['roi', 'calculator', 'investment', 'return', 'profit', 'finance', 'annualized'],
  searchableText: 'roi calculator return on investment profit loss finance annualized',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'ROI Calculator | Zevylo Tools',
    description: 'Calculate Return on Investment, net profit, and annualized ROI.',
  },
  faq: [
    { question: 'What is ROI?', answer: 'Return on Investment (ROI) is a performance measure used to evaluate the efficiency of an investment.' }
  ],
  relatedTools: ['profit-margin-calculator', 'percentage-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'roi-calculator',
};
