import { ToolDefinition } from '@/lib/tools/types';

export const loanEmiCalculatorDefinition: ToolDefinition = {
  id: 'loan-emi-calculator',
  slug: 'loan-emi-calculator',
  name: 'Loan EMI Calculator',
  shortDescription: 'Calculate monthly loan EMI payments, total interest, and annual amortization schedule.',
  longDescription: 'Plan your home, car, or personal loan with precision. Calculate your exact monthly Equated Monthly Installment (EMI), compare total interest payable against the principal, and inspect a full year-by-year amortization breakdown.',
  category: 'calculators',
  icon: 'calculator',
  keywords: ['loan emi calculator', 'mortgage calculator', 'monthly payment', 'amortization schedule', 'interest calculator', 'calcprotool alternative'],
  searchableText: 'loan emi calculator calculate monthly mortgage payment total interest amortization schedule',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Loan EMI Calculator — Monthly Mortgage Amortization Schedule | Zevylo',
    description: 'Calculate monthly loan EMI, total interest, and annual amortization schedule instantly. 100% free and private in your browser.',
  },
  faq: [
    {
      question: 'How is monthly EMI calculated?',
      answer: 'Monthly EMI is calculated using the formula E = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is principal, r is the monthly interest rate, and n is the tenure in months.',
    },
    {
      question: 'Does this calculator include an amortization schedule?',
      answer: 'Yes! Zevylo displays a complete year-by-year amortization breakdown showing opening balances, principal repaid, interest paid, and closing balances.',
    },
    {
      question: 'Is my financial loan data stored on your servers?',
      answer: 'No. All calculations run 100% locally in your browser. Your numbers and personal financial calculations never leave your computer.',
    },
  ],
  relatedTools: ['compound-interest-calculator', 'percentage-calculator', 'roi-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 4,
  component: 'loan-emi-calculator',
};
