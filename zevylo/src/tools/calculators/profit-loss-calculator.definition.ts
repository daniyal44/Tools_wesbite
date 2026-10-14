import { ToolDefinition } from '@/lib/tools/types';

export const profitLossCalculatorDefinition: ToolDefinition = {
  id: 'profit-loss-calculator',
  slug: 'profit-loss-calculator',
  name: 'Profit and Loss (P&L) & Break-Even Calculator',
  shortDescription: 'Calculate net profit margin, operating profit, and break-even sales unit volume for businesses.',
  longDescription: 'Comprehensive business financial planning calculator. Computes gross profit, operating margin, EBITDA, net profit, and break-even unit threshold with interactive waterfall revenue allocation breakdowns.',
  category: 'business',
  icon: 'calculator',
  keywords: ['profit and loss calculator', 'p&l calculator', 'break even calculator', 'net profit margin', 'operating margin', 'business profit calculator'],
  searchableText: 'profit and loss calculator pnl break even analysis cogs operating expenses ebitda net profit margin revenue business financials',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Free Profit & Loss Calculator — P&L & Break-Even Analysis | Zevylo',
    description: 'Calculate net income, gross margin, operating costs, and break-even sales volume with visual revenue waterfall breakdown.',
    keywords: ['profit and loss calculator', 'break even calculator', 'net margin calculator', 'business p&l'],
  },
  faq: [
    {
      question: 'What is the break-even formula?',
      answer: 'Break-Even Units = Total Fixed Costs / (Price per Unit - Variable Cost per Unit). It shows how many items must be sold to cover all expenses.',
    },
    {
      question: 'What is the difference between Gross Margin and Net Margin?',
      answer: 'Gross margin only accounts for direct cost of goods sold (COGS), while Net margin subtracts all overhead, payroll, marketing, and taxes.',
    },
  ],
  relatedTools: ['profit-margin-calculator', 'roi-calculator', 'sales-tax-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 19,
  component: 'profit-loss-calculator',
};
