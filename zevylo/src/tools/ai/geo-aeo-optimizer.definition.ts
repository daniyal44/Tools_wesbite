import { ToolDefinition } from '@/lib/tools/types';

export const geoAeoOptimizerDefinition: ToolDefinition = {
  id: 'geo-aeo-optimizer',
  slug: 'geo-aeo-optimizer',
  name: 'GEO & AEO Optimizer (AI Search Visibility)',
  shortDescription: 'Audit and optimize articles and content for ChatGPT Search, Perplexity AI, Claude, and Google AI Overviews.',
  longDescription: 'Prepare your content for the era of generative AI search. Evaluates your writing for Direct Answer Clarity, Citation Density, Entity Recognition, and Structured Lists to ensure high probability of citation by LLMs and Answer Engines.',
  category: 'ai',
  icon: 'bot',
  keywords: ['geo optimizer', 'aeo optimizer', 'generative engine optimization', 'answer engine optimization', 'chatgpt search seo', 'perplexity optimization'],
  searchableText: 'geo aeo optimizer generative engine answer engine optimization chatgpt perplexity google ai overviews citations schema',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Free GEO & AEO Optimizer — Generative Engine SEO Audit | Zevylo',
    description: 'Score your content for ChatGPT Search, Perplexity, and Google AI Overviews. Get actionable recommendations to earn generative AI citations.',
    keywords: ['geo optimizer', 'aeo tool', 'generative engine optimization online', 'ai search optimization'],
  },
  faq: [
    {
      question: 'What is GEO (Generative Engine Optimization)?',
      answer: 'GEO is the practice of optimizing content so generative AI models like ChatGPT, Perplexity, and Gemini cite and feature your brand when answering user questions.',
    },
    {
      question: 'What is AEO (Answer Engine Optimization)?',
      answer: 'AEO focuses on structuring information so voice assistants and answer engines can immediately extract single concise answers from the first paragraph.',
    },
  ],
  relatedTools: ['ai-article-writer', 'prompt-enhancer', 'keyword-density-analyzer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 3,
  component: 'geo-aeo-optimizer',
};
