import { ToolDefinition } from '@/lib/tools/types';

export const coinFlipDefinition: ToolDefinition = {
  id: 'coin-flip',
  slug: 'coin-flip',
  name: 'Coin Flip Simulator (3D Heads or Tails)',
  shortDescription: 'Realistic 3D animated coin flipper with streak tracking, fair cryptographic RNG, and multi-coin batch mode.',
  longDescription: 'Make quick, unbiased random decisions with this 3D physics-inspired coin toss simulator. Includes streak counters, heads/tails probability statistics, and a batch simulator to flip up to 1,000 coins simultaneously.',
  category: 'productivity',
  icon: 'circle-dot',
  keywords: ['coin flip', 'flip a coin', 'heads or tails', 'coin toss online', 'random coin flipper', 'probability simulator'],
  searchableText: 'coin flip flip a coin heads or tails coin toss probability random decider 3d coin simulator batch coin flipper',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: true,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Flip a Coin — Free 3D Heads or Tails Simulator | Zevylo',
    description: 'Flip a coin online with 3D animation, streak counters, and true 50/50 cryptographic fairness. Flip 1 to 1,000 coins instantly.',
    keywords: ['flip a coin', 'heads or tails online', 'coin flip simulator', 'random coin toss'],
  },
  faq: [
    {
      question: 'Is this coin flip truly fair 50/50?',
      answer: 'Yes! We use the browser crypto.getRandomValues API, which is cryptographically secure and guarantees unbiased 50% probability distribution.',
    },
    {
      question: 'Can I flip multiple coins at once?',
      answer: 'Yes, use the batch simulator to flip 5, 10, 50, 100, 500, or 1,000 coins simultaneously to see exact statistical breakdowns.',
    },
  ],
  relatedTools: ['dice-roller', 'password-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 3,
  component: 'coin-flip',
};
