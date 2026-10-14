import { ToolDefinition } from '@/lib/tools/types';

export const aiPromptGeneratorDefinition: ToolDefinition = {
  id: 'ai-prompt-generator',
  slug: 'ai-prompt-generator',
  name: 'AI Prompt Crafter & Midjourney Styler',
  shortDescription: 'Engineer photorealistic prompts for Midjourney v6, DALL-E 3, Stable Diffusion, Flux, and ChatGPT.',
  longDescription: 'Craft studio-grade generative prompts with instant artistic styles, lighting models, camera lens presets, aspect ratios, and render parameters. Perfect for Midjourney, Flux.1, DALL-E 3, and Stable Diffusion.',
  category: 'ai',
  icon: 'sparkles',
  keywords: ['ai prompt generator', 'midjourney prompt builder', 'flux prompt maker', 'dall e 3 prompt generator', 'stable diffusion prompt generator'],
  searchableText: 'ai prompt generator midjourney styler prompt engineering photorealistic flux dall-e 3 camera lens lighting aspect ratio render engine',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'AI Prompt Crafter & Midjourney Styler — Free Tool | Zevylo',
    description: 'Build high-converting prompts for Midjourney v6, Flux.1, and DALL-E 3. Choose camera angles, lighting conditions, artistic styles, and aspect ratios.',
    keywords: ['ai prompt generator', 'midjourney prompt crafter', 'flux prompt generator', 'prompt builder online'],
  },
  faq: [
    {
      question: 'Does this generate commands for Midjourney v6?',
      answer: 'Yes! It automatically formats prompt modifiers such as --ar 16:9, --v 6.0, --stylize, and --style raw based on your selections.',
    },
    {
      question: 'Is it compatible with Flux and DALL-E 3?',
      answer: 'Yes, it provides both command-style tags for Midjourney and rich natural descriptive paragraphs optimized for DALL-E 3 and Flux.1.',
    },
  ],
  relatedTools: ['ai-article-writer', 'ai-humanizer', 'ai-content-detector'],
  status: 'active',
  visibility: 'public',
  sortOrder: 1,
  component: 'ai-prompt-generator',
};
