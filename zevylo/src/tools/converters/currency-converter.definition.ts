import { ToolDefinition } from '@/lib/tools/types';

export const currencyConverterDefinition: ToolDefinition = {
  id: 'currency-converter',
  slug: 'currency-converter',
  name: 'Currency Converter',
  shortDescription: 'Free real-time currency converter across 35+ global world currencies with live rate matrix.',
  longDescription: 'Convert between 35+ major world currencies including USD, EUR, GBP, JPY, CAD, AUD, INR, PKR, AED, and SAR with real-time exchange rates, multi-currency matrix comparison, and 100% private client-side speed.',
  category: 'converters',
  icon: 'arrow-right-left',
  keywords: ['currency converter', 'money exchange', 'usd to eur', 'gbp to usd', 'exchange rate calculator', 'forex converter'],
  searchableText: 'currency converter money exchange forex exchange rate usd eur gbp inr pkr aed sar cad jpy aud foreign currency calculator',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Free Currency Converter — Live Exchange Rates | Zevylo',
    description: 'Convert 35+ world currencies instantly with live exchange rates, quick multi-currency comparison matrix, and zero server lag.',
    keywords: ['currency converter', 'live exchange rate', 'usd to eur', 'forex rate calculator', 'free money converter'],
  },
  faq: [
    {
      question: 'Which currencies are supported?',
      answer: 'Over 35 major world currencies are supported, including USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, PKR, AED, SAR, SGD, BRL, and more.',
    },
    {
      question: 'Does this currency converter work offline?',
      answer: 'Yes! Zevylo includes offline baseline rates that calculate instantly in your browser without requiring an active internet connection.',
    },
  ],
  relatedTools: ['unit-converter', 'profit-loss-calculator', 'sales-tax-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 8,
  component: 'currency-converter',
};
