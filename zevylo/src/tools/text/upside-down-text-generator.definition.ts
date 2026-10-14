import { ToolDefinition } from '@/lib/tools/types';

export const upsideDownTextGeneratorDefinition: ToolDefinition = {
  id: 'upside-down-text-generator',
  slug: 'upside-down-text-generator',
  name: 'Upside Down & Reverse Text Generator',
  shortDescription: 'Flip your text upside down (˙ʇxǝʇ uʍop ǝpᴉsdn) or backwards in real-time.',
  longDescription: 'Turn words, letters, and sentences upside down and backwards using special Unicode characters. Features multiple styles including classic inverted flip, backwards order, and mirror reflections for Instagram bios, TikTok captions, Discord handles, and fun messaging.',
  category: 'text',
  icon: 'arrow-down-az',
  keywords: ['upside down text generator', 'flip text online', 'reverse text', 'backwards text', 'upside down font', 'mirror text converter'],
  searchableText: 'upside down text generator flip text backwards reverse mirror reflection unicode upside down letters font flipper social media',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Upside Down Text Generator (Flip Text ˙ʇxǝʇ uʍop ǝpᴉsdn) | Zevylo',
    description: 'Flip words, letters, and sentences upside down and backwards with our free Unicode text generator. Copy & paste anywhere on Instagram, TikTok, and Twitter.',
    keywords: ['upside down text generator', 'flip text generator', 'upside down letters', 'backwards text converter'],
  },
  faq: [
    {
      question: 'Where can I paste the upside down text?',
      answer: 'Anywhere that supports Unicode! This includes Instagram bios, TikTok captions, Discord usernames, Twitter posts, Reddit comments, and WhatsApp chats.',
    },
    {
      question: 'Does this install custom fonts on my device?',
      answer: 'No. The generated text uses standard Unicode glyphs already built into iOS, Android, macOS, and Windows devices.',
    },
  ],
  relatedTools: ['stylish-text-generator', 'case-converter', 'zalgo-glitch-text-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 17,
  component: 'upside-down-text-generator',
};
