import { ToolDefinition } from '@/lib/tools/types';

export const aiArticleWriterDefinition: ToolDefinition = {
  id: 'ai-article-writer',
  slug: 'ai-article-writer',
  name: 'AI Article & Blog Outline Generator',
  shortDescription: 'Generate comprehensive blog post outlines, high-CTR headlines, and structured draft frameworks.',
  longDescription: 'Overcome writer block with this structured article outline studio. Generates 5 viral headline angles, hook introductions, semantic H2/H3 subheadings, actionable bullet takeaways, and conclusion summaries tailored to your target audience.',
  category: 'ai',
  icon: 'pen-tool',
  keywords: ['ai article writer', 'blog outline generator', 'article generator', 'content writing tool', 'free blog post creator'],
  searchableText: 'ai article writer blog outline generator content writing blog posts headlines headings markdown reading time client side',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'AI Article & Blog Outline Generator — Free Content Studio | Zevylo',
    description: 'Create high-ranking blog outlines and complete structured article blueprints. Generate headlines, intro hooks, and H2/H3 subheadings instantly.',
    keywords: ['ai article writer', 'blog post generator', 'article outline generator free', 'content writer tool online'],
  },
  faq: [
    {
      question: 'Can I export the article as Markdown?',
      answer: 'Yes! Click "Copy Markdown" to copy clean, formatted markdown ready to paste straight into WordPress, Ghost, Notion, or GitHub.',
    },
    {
      question: 'Is this content optimized for search engines?',
      answer: 'Yes, the outline follows proven SEO editorial structures: single H1, semantic H2/H3 hierarchies, bulleted takeaways, and concise summary paragraphs.',
    },
  ],
  relatedTools: ['prompt-enhancer', 'geo-aeo-optimizer', 'keyword-density-analyzer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'ai-article-writer',
};
