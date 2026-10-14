import { ToolDefinition } from '@/lib/tools/types';

export const diceRollerDefinition: ToolDefinition = {
  id: 'dice-roller',
  slug: 'dice-roller',
  name: 'Dice Roller & Coin Flipper',
  shortDescription: 'Virtual polyhedral 3D dice roller (d4, d6, d8, d10, d12, d20, d100) and heads or tails coin flipper.',
  longDescription: 'Roll virtual polyhedral RPG dice for tabletop gaming (D&D, Pathfinder), board games, or make decisions with a random coin flipper. Supports multiple dice, custom modifiers (+/-), and stores a detailed roll history.',
  category: 'calculators',
  icon: 'dices',
  keywords: ['dice roller', 'dnd dice', 'd20 roller', 'coin flipper', 'random number generator', 'calcprotool alternative'],
  searchableText: 'dice roller roll d4 d6 d8 d10 d12 d20 d100 coin flipper random polyhedral tabletop',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Dice Roller & Coin Flipper — Polyhedral D&D D20 & Random Roller | Zevylo',
    description: 'Virtual polyhedral dice roller for D&D (d4, d6, d8, d10, d12, d20, d100) and fair coin flipper. 100% free and client-side.',
  },
  faq: [
    {
      question: 'Is this dice roller truly random?',
      answer: 'Yes! Zevylo uses the cryptographically secure browser window.crypto.getRandomValues API, ensuring fair, unbiased rolls.',
    },
    {
      question: 'Can I add modifiers to my dice rolls?',
      answer: 'Yes! Specify any positive or negative modifier (e.g. 2d20 + 5) to automatically add it to your total roll sum.',
    },
  ],
  relatedTools: ['scientific-calculator', 'uuid-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 17,
  component: 'dice-roller',
};
