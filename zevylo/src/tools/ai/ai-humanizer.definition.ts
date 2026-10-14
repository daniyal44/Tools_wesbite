import { ToolDefinition } from '@/lib/tools/types';

export const aiHumanizerDefinition: ToolDefinition = {
  id: 'ai-humanizer',
  slug: 'ai-humanizer',
  name: 'AI Text Humanizer & Bypass Rewriter',
  shortDescription: 'Transform robotic, repetitive AI text into natural, bypass-ready human prose.',
  longDescription: 'Eliminate robotic AI jargon, clichés, uniform sentence structures, and predictable vocabulary. Rewrites ChatGPT and Claude outputs into authentic human tone with natural cadence, conversational rhythm, and improved readability.',
  category: 'ai',
  icon: 'user-check',
  keywords: ['ai text humanizer', 'bypass ai detector', 'humanize ai text', 'undetectable ai text', 'remove ai tone'],
  searchableText: 'ai text humanizer bypass ai detector humanize ai writing chatgpt claude robotic words delve tapestry natural cadence readability client side',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'AI Text Humanizer & Bypass Rewriter — 100% Free & Private | Zevylo',
    description: 'Humanize AI text directly in your browser. Remove typical AI tropes like "delve", "testament", and "tapestry" to create authentic, conversational human prose.',
    keywords: ['ai text humanizer free', 'humanize ai content', 'bypass gptzero originality', 'natural text converter'],
  },
  faq: [
    {
      question: 'How does the client-side humanizer work?',
      answer: 'It replaces over 80+ notorious AI dead-weight phrases, introduces sentence-length variance (burstiness), adjusts passive voice into active storytelling, and preserves your factual core meaning.',
    },
    {
      question: 'Are my essays or articles uploaded to any server?',
      answer: 'Never. All transformation algorithms run locally within your web browser with 100% client-side privacy.',
    },
  ],
  relatedTools: ['ai-content-detector', 'ai-article-writer', 'readability-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'ai-humanizer',
};
