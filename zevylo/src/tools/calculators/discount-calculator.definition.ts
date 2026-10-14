import { ToolDefinition } from '@/lib/tools/types';

export const discountCalculatorDefinition: ToolDefinition = {
  id: 'discount-calculator',
  slug: 'discount-calculator',
  name: 'Discount & Sale Price Calculator',
  shortDescription: 'Calculate sale savings, promo code discounts, and final price with tax.',
  longDescription: 'Find out exactly how much you save on clearance sales, Black Friday promos, and retail purchases. Enter original price, percentage off, extra promo coupons, and optional sales tax to see your total money saved and final price.',
  category: 'calculators',
  icon: 'tag',
  keywords: ['discount calculator', 'sale price calculator', 'percentage off calculator', 'promo code savings', 'markdown calculator', 'calcprotool alternative'],
  searchableText: 'discount calculator calculate sale price percentage off promo coupon savings markdown',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Discount & Sale Price Calculator — Percentage Off & Savings | Zevylo',
    description: 'Calculate discount price, amount saved, and double promo discounts instantly. Fast, free, and completely client-side in your browser.',
  },
  faq: [
    {
      question: 'How do you calculate a percentage discount?',
      answer: 'Discount Amount = Original Price × (Discount % / 100). The final price is Original Price minus Discount Amount.',
    },
    {
      question: 'How do stacked discounts work (e.g. 20% off plus extra 10% coupon)?',
      answer: 'Stacked discounts apply consecutively: The second discount is calculated on the already discounted price, not the original retail price.',
    },
  ],
  relatedTools: ['sales-tax-calculator', 'percentage-calculator', 'tip-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 19,
  component: 'discount-calculator',
};
