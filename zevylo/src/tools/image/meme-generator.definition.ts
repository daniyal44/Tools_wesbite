import { ToolDefinition } from '@/lib/tools/types';

export const memeGeneratorDefinition: ToolDefinition = {
  id: 'meme-generator',
  slug: 'meme-generator',
  name: 'Meme Generator Online',
  shortDescription: 'Create funny memes online with custom top and bottom text, font styles, and templates.',
  longDescription: 'Design viral memes in seconds. Upload any photo or start with preset blank meme templates. Add customized Top and Bottom captions with classic bold Impact typography, white fill, black stroke borders, and download high-resolution meme images without watermarks.',
  category: 'image',
  icon: 'smile',
  keywords: ['meme generator', 'make meme', 'meme creator', 'caption generator', 'impact font meme', 'craiyon alternative', 'bored humans alternative'],
  searchableText: 'meme generator create memes custom top bottom text impact font template funny photo download',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Meme Generator Online — Free Viral Meme Creator No Watermarks | Zevylo',
    description: 'Create funny memes with custom top & bottom text captions. No watermarks, instant high-quality PNG export. 100% free and client-side.',
  },
  faq: [
    {
      question: 'Does this meme generator add watermarks?',
      answer: 'No! Zevylo produces clean, high-resolution meme images with zero watermarks or branding.',
    },
    {
      question: 'Are my uploaded meme photos saved online?',
      answer: 'Never. All meme text rendering and canvas compositing occur completely in your web browser.',
    },
  ],
  relatedTools: ['image-cropper', 'image-filters', 'code-to-image'],
  status: 'active',
  visibility: 'public',
  sortOrder: 42,
  component: 'meme-generator',
};
