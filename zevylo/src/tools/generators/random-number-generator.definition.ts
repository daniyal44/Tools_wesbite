import { ToolDefinition } from '@/lib/tools/types';

export const randomNumberGeneratorDefinition: ToolDefinition = {
  id: 'random-number-generator',
  slug: 'random-number-generator',
  name: 'Random Number Generator',
  shortDescription: 'Generate random numbers in any range — integers or decimals, unique or repeatable.',
  longDescription:
    'Generate truly random numbers within any range you choose. Pick a minimum and maximum, how many numbers you need (up to 10,000), and the number of decimal places, then optionally require all values to be unique or sort them ascending. Perfect for raffles, sampling, test data, and games. Numbers are produced with your browser’s cryptographically secure generator using bias-free rejection sampling.',
  category: 'generators',
  icon: 'dices',
  keywords: ['random number generator', 'random number', 'rng', 'number picker', 'random integer', 'raffle', 'random decimal', 'pick a number'],
  searchableText: 'random number generator rng integer decimal unique range raffle picker crypto secure',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Random Number Generator (Secure, Any Range) | Zevylo Tools',
    description: 'Free random number generator — pick any range, generate integers or decimals, require unique values, and copy results. Cryptographically secure and private.',
  },
  faq: [
    { question: 'Is this random number generator secure?', answer: 'Yes. It uses crypto.getRandomValues (your browser’s cryptographically secure RNG) with rejection sampling, so the numbers are unbiased and not predictable like Math.random.' },
    { question: 'Can I generate unique numbers with no repeats?', answer: 'Yes. Enable "No duplicates" to guarantee every generated integer is unique — ideal for raffles and lotteries. The count must fit within the chosen range.' },
    { question: 'Can it generate decimals?', answer: 'Yes. Set "Decimal places" to 1 or more to generate random decimal numbers instead of whole integers.' },
  ],
  relatedTools: ['dice-roller', 'coin-flip', 'password-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 16,
  component: 'random-number-generator',
};
