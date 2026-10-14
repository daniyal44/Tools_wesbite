import { ToolDefinition } from '@/lib/tools/types';

export const aiSocialHookGeneratorDefinition: ToolDefinition = {
  id: 'ai-social-hook-generator',
  slug: 'ai-social-hook-generator',
  name: 'AI Viral Hook & Social Post Crafter',
  shortDescription: 'Generate high-CTR hooks, Twitter/X threads, LinkedIn thought-leadership, and TikTok intros.',
  longDescription: 'Capture audience attention in the first 2 seconds. Generates 6 proven psychological hook variations (Curiosity Gap, Contrarian, Step-by-Step, Story-Driven, Pain-Point, Stat-Shock), full post bodies, and virality potential ratings.',
  category: 'ai',
  icon: 'megaphone',
  keywords: ['ai social hook generator', 'viral hook generator', 'twitter hook maker', 'linkedin post generator', 'tiktok hook generator'],
  searchableText: 'ai social hook generator viral hooks twitter x threads linkedin posts curiosity gap contrarian high ctr social media marketing client side',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'AI Viral Hook & Social Post Crafter — Free Social Tool | Zevylo',
    description: 'Create viral hooks for Twitter/X, LinkedIn, and TikTok. Unlock curiosity gaps, contrarian angles, and engagement-boosting structures.',
    keywords: ['viral hook generator', 'social media hook maker free', 'twitter thread generator', 'linkedin post creator'],
  },
  faq: [
    {
      question: 'Which social platforms are supported?',
      answer: 'Twitter/X, LinkedIn, Threads, Instagram Captions, and TikTok script hooks.',
    },
    {
      question: 'How do the psychological hooks increase CTR?',
      answer: 'They apply proven copywriting frameworks like curiosity gaps, pattern interrupts, and contrarian perspectives that stop users from scrolling.',
    },
  ],
  relatedTools: ['ai-article-writer', 'youtube-summarizer', 'slug-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 6,
  component: 'ai-social-hook-generator',
};
