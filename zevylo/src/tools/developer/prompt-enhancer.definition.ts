import { ToolDefinition } from '@/lib/tools/types';

export const promptEnhancerDefinition: ToolDefinition = {
  id: 'prompt-enhancer',
  slug: 'prompt-enhancer',
  name: 'AI Prompt Optimizer & Studio (ChatGPT & Midjourney)',
  shortDescription: 'Engineer elite prompts for ChatGPT, Claude, Midjourney, and DALL-E with personas and constraints.',
  longDescription: 'Turn vague, basic ideas into structured, high-performing prompts for LLMs and AI image generators. Automatically injects expert personas, step-by-step chain-of-thought instructions, anti-fluff negative constraints, and photographic render parameters.',
  category: 'ai',
  icon: 'sparkles',
  keywords: ['prompt generator', 'prompt enhancer', 'chatgpt prompt optimizer', 'midjourney prompt builder', 'ai prompt engineering'],
  searchableText: 'prompt generator prompt enhancer prompt engineering chatgpt gpt-4o claude midjourney dalle persona instructions negative constraints',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'AI Prompt Enhancer & Generator — ChatGPT & Midjourney | Zevylo',
    description: 'Optimize prompts for ChatGPT, Claude, and Midjourney. Add expert personas, chain-of-thought logic, and photorealistic camera modifiers.',
    keywords: ['prompt enhancer', 'ai prompt generator', 'chatgpt prompt builder', 'midjourney prompt generator'],
  },
  faq: [
    {
      question: 'Why should I optimize prompts?',
      answer: 'Structured prompts with defined expert roles, output constraints, and chain-of-thought reasoning significantly reduce hallucinations and improve AI response precision.',
    },
    {
      question: 'Does this work for image generation like Midjourney and DALL-E?',
      answer: 'Yes! Selecting Midjourney or DALL-E appends aspect ratios, render engines, lighting parameters, and camera lens specifications.',
    },
  ],
  relatedTools: ['developer-json-formatter', 'developer-base64', 'code-to-image'],
  status: 'active',
  visibility: 'public',
  sortOrder: 19,
  component: 'prompt-enhancer',
};
