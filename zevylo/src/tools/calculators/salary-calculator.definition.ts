import { ToolDefinition } from '@/lib/tools/types';

export const salaryCalculatorDefinition: ToolDefinition = {
  id: 'salary-calculator',
  slug: 'salary-calculator',
  name: 'Salary & Hourly Wage Calculator',
  shortDescription: 'Convert hourly wage to annual salary, monthly, bi-weekly, and take-home pay.',
  longDescription: 'Seamlessly convert between hourly pay and yearly salary. Factor in work hours per week, unpaid weeks off, and tax deduction estimates to view net take-home earnings across all pay periods.',
  category: 'calculators',
  icon: 'banknote',
  keywords: ['salary calculator', 'hourly to salary', 'wage calculator', 'take home pay calculator', 'annual income calculator', 'calcprotool alternative'],
  searchableText: 'salary calculator hourly to annual salary wage take home pay biweekly monthly income',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Salary & Hourly Wage Calculator — Convert Hourly to Annual Pay | Zevylo',
    description: 'Convert hourly pay to salary, weekly, and monthly income with tax deductions. Fast, free, and completely client-side.',
  },
  faq: [
    {
      question: 'How do you convert hourly wage to annual salary?',
      answer: 'Assuming a standard 40-hour work week and 52 weeks per year (2,080 working hours): Annual Salary = Hourly Wage × 40 × 52.',
    },
    {
      question: 'Can I calculate take-home pay after taxes?',
      answer: 'Yes! You can enter an estimated tax withholding percentage (e.g., 20% - 30%) to estimate your net take-home paycheck for every period.',
    },
  ],
  relatedTools: ['sales-tax-calculator', 'percentage-calculator', 'roi-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 11,
  component: 'salary-calculator',
};
