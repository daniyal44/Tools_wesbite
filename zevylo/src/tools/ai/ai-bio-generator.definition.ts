import { ToolDefinition } from '@/lib/tools/types';

export const aiBioGeneratorDefinition: ToolDefinition = {
  id: 'ai-bio-generator',
  slug: 'ai-bio-generator',
  name: 'AI Profile Bio Generator (LinkedIn, X, GitHub)',
  shortDescription: 'Generate high-impact personal bios tailored to platform character limits.',
  longDescription: 'Craft polished, memorable social media and professional bios for Twitter/X (160 chars), LinkedIn headline & summary, GitHub developer profiles, and Instagram. Supports authority, minimalist, creative, and casual tones with character count verification.',
  category: 'ai',
  icon: 'user',
  keywords: ['ai bio generator', 'linkedin bio generator', 'twitter bio generator', 'github profile bio', 'social media bio creator'],
  searchableText: 'ai bio generator linkedin headline twitter bio x bio github profile bio instagram bio character limit personal branding client side free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'AI Profile Bio Generator — LinkedIn, Twitter/X & GitHub | Zevylo',
    description: 'Create compelling personal bios for Twitter/X, LinkedIn, GitHub, and Instagram with platform-specific character counters and tone controls. 100% free.',
    keywords: ['ai bio generator free', 'linkedin headline generator', 'twitter x bio creator', 'github bio generator'],
  },
  faq: [
    {
      question: 'What are the character limits for each platform bio?',
      answer: 'Twitter/X allows 160 characters. Instagram allows 150 characters. LinkedIn headlines allow 220 characters. GitHub short bios allow 120 characters. Our generator automatically enforces these limits.',
    },
    {
      question: 'Can I include emojis in my generated bio?',
      answer: 'Yes! Depending on your chosen tone (e.g. Creative vs Professional Authority), the generator selectively includes appropriate emojis or clean plain text.',
    },
  ],
  relatedTools: ['ai-social-hook-generator', 'ai-humanizer', 'ai-article-writer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 14,
  component: 'ai-bio-generator',
};
