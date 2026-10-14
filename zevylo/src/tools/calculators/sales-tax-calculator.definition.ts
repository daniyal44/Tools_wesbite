import { ToolDefinition } from '@/lib/tools/types';

export const salesTaxCalculatorDefinition: ToolDefinition = {
  id: 'sales-tax-calculator',
  slug: 'sales-tax-calculator',
  name: 'Sales Tax & VAT Calculator',
  shortDescription: 'Calculate sales tax, VAT, gross price, and net price with customizable tax rates.',
  longDescription: 'Easily calculate sales tax and Value Added Tax (VAT) for consumer purchases or business invoices. Add tax to a net price or reverse-calculate tax from a gross total in seconds.',
  category: 'calculators',
  icon: 'receipt',
  keywords: ['sales tax calculator', 'vat calculator', 'reverse tax calculator', 'gross net calculator', 'tax rate calculator', 'calcprotool alternative'],
  searchableText: 'sales tax calculator calculate vat sales tax reverse gross net invoice tax',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Sales Tax & VAT Calculator — Calculate Gross, Net & Tax Rate | Zevylo',
    description: 'Calculate sales tax and VAT forward and backward. Find tax amount, net price, and gross total with custom rates. 100% free and client-side.',
  },
  faq: [
    {
      question: 'How do you calculate sales tax added to a price?',
      answer: 'To add sales tax: Multiply Net Price by (Tax Rate / 100) to find the tax amount. Add that amount to the net price for the Gross Total.',
    },
    {
      question: 'How do you reverse calculate VAT from a gross total?',
      answer: 'To extract VAT from a gross total: Net Price = Gross Total / (1 + Tax Rate / 100). The tax amount is Gross Total minus Net Price.',
    },
  ],
  relatedTools: ['discount-calculator', 'tip-calculator', 'percentage-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 10,
  component: 'sales-tax-calculator',
};
