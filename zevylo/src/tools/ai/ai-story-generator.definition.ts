import { ToolDefinition } from '@/lib/tools/types';

export const aiStoryGeneratorDefinition: ToolDefinition = {
  id: 'ai-story-generator',
  slug: 'ai-story-generator',
  name: 'AI Story & Creative Narrative Generator',
  shortDescription: 'Generate original story outlines, multi-layered characters, plot twists, and opening chapters.',
  longDescription: 'Banish writer’s block with this creative storytelling studio. Generates high-stakes character motivations, 3-act story structures, unexpected plot twists, immersive sensory world-building, and vivid opening scene prose across fantasy, sci-fi, thriller, and mystery genres.',
  category: 'ai',
  icon: 'book-open',
  keywords: ['ai story generator', 'novel outline generator', 'plot twist generator', 'creative writing ai', 'fiction character builder'],
  searchableText: 'ai story generator creative narrative novel outline plot twist characters protagonist fantasy sci fi thriller world building client side',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'AI Story & Creative Narrative Generator — Free Fiction Tool | Zevylo',
    description: 'Create compelling story arcs, 3-act narrative blueprints, plot twists, and opening chapters for novels and screenplays.',
    keywords: ['ai story generator free', 'fiction plot generator', 'creative writing assistant', 'novel outline tool'],
  },
  faq: [
    {
      question: 'Can I export the full narrative blueprint?',
      answer: 'Yes! Click "Copy Story Blueprint" to copy the entire plot breakdown, character motivations, and opening scene text directly to your clipboard.',
    },
    {
      question: 'Which genres are supported?',
      answer: 'Sci-Fi, Epic Fantasy, Psychological Thriller, Cyberpunk, Mystery & Noir, and Dystopian Adventure.',
    },
  ],
  relatedTools: ['ai-article-writer', 'ai-prompt-generator', 'ai-humanizer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 7,
  component: 'ai-story-generator',
};
