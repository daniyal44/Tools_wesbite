import { ToolDefinition } from '@/lib/tools/types';

export const priceEstimatorDefinition: ToolDefinition = {
  id: 'price-estimator',
  slug: 'price-estimator',
  name: 'Project Price Estimator & Quote Proposal Generator',
  shortDescription: 'Calculate project costs, freelance rates, profit margins, and generate tiered client price quotes.',
  longDescription: 'Take the guesswork out of pricing. Estimate labor costs, materials, overhead, and contingency risk buffers to compute economy, standard, and premium price tiers with a copy-ready client proposal.',
  category: 'business',
  icon: 'dollar-sign',
  keywords: ['price estimator', 'project cost calculator', 'freelance quote generator', 'price guess tool', 'pricing proposal generator'],
  searchableText: 'price estimator project cost calculator freelance rate pricing quotes proposals profit margin contingency client free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Project Price Estimator & Quote Generator — Free Pricing Tool | Zevylo',
    description: 'Calculate project pricing, freelance hourly rates, profit margins, and generate ready-to-send client proposals in seconds.',
    keywords: ['price estimator tool', 'freelance project calculator', 'pricing proposal generator free', 'client quote builder'],
  },
  faq: [
    {
      question: 'How is the recommended price calculated?',
      answer: 'It calculates total labor cost plus fixed tooling overhead, adds a risk contingency buffer, and multiplies by your chosen profit margin target.',
    },
    {
      question: 'What are the three pricing tiers?',
      answer: 'It provides an Economy baseline (cost recovery), Standard tier (healthy profit margin), and Premium package (for accelerated delivery and priority support).',
    },
  ],
  relatedTools: ['invoice-generator', 'profit-loss-calculator', 'resume-cv-builder'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'price-estimator',
};
