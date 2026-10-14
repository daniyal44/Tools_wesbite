import { ToolDefinition } from '@/lib/tools/types';

export const stylishTextGeneratorDefinition: ToolDefinition = {
  id: 'stylish-text-generator',
  slug: 'stylish-text-generator',
  name: 'Stylish Text & Fancy Font Generator',
  shortDescription: 'Convert regular text into 18+ aesthetic Unicode fonts, cursive script, gothic fraktur, and cute bio styles.',
  longDescription: 'Create aesthetic fancy text for Instagram bios, TikTok profiles, Discord handles, Twitter/X tweets, and gaming tags. Features 18+ Unicode font converters including Cursive, Gothic Fraktur, Double Struck, Bubble, Small Caps, and Upside Down with instant 1-click copy.',
  category: 'text',
  icon: 'sparkles',
  keywords: ['stylish text generator', 'fancy font generator', 'instagram font generator', 'aesthetic text', 'cool fonts for bio', 'unicode font generator'],
  searchableText: 'stylish text generator fancy font instagram bio aesthetic fonts cursive script gothic fraktur double struck bubble small caps cute text copy paste',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Stylish Text Generator — Fancy Fonts for Instagram & Bio | Zevylo',
    description: 'Transform regular text into 18+ fancy aesthetic Unicode fonts, cursive script, and bold gothic styles with instant 1-click copy for bios and social posts.',
    keywords: ['stylish text generator', 'fancy font generator', 'instagram bio fonts', 'aesthetic unicode fonts', 'free font changer'],
  },
  faq: [
    {
      question: 'Will these fonts work on Instagram, TikTok, and Discord?',
      answer: 'Yes! These styles use official universal Unicode symbols that work seamlessly across Instagram bios, TikTok, Discord, WhatsApp, Twitter/X, and game profiles.',
    },
    {
      question: 'Do I need to install any font files?',
      answer: 'No installation is needed. Because they are native Unicode characters, you simply click copy and paste directly into any social media app or document.',
    },
  ],
  relatedTools: ['text-case-converter', 'word-counter', 'prompt-enhancer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 8,
  component: 'stylish-text-generator',
};
