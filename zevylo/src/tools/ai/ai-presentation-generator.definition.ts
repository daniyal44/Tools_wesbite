import { ToolDefinition } from '@/lib/tools/types';

export const aiPresentationGeneratorDefinition: ToolDefinition = {
  id: 'ai-presentation-generator',
  slug: 'ai-presentation-generator',
  name: 'AI Presentation & Pitch Deck Outliner',
  shortDescription: 'Generate comprehensive multi-slide presentation decks with talking points and speaker notes.',
  longDescription: 'Create professional presentation outlines, slide-by-slide bullet points, visual layout recommendations, and executive speaker notes instantly from any topic. Ideal for pitch decks, sales proposals, webinars, and educational lectures.',
  category: 'ai',
  icon: 'presentation',
  keywords: ['ai presentation generator', 'pitch deck outline', 'slide deck generator', 'powerpoint ai', 'google slides outliner'],
  searchableText: 'ai presentation generator pitch deck slide outliner powerpoint google slides speaker notes investor deck webinar sales lecture client side free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'AI Presentation & Pitch Deck Outliner — 100% Free & In-Browser | Zevylo',
    description: 'Generate polished multi-slide presentation decks, visual themes, bullet points, and speaker notes in seconds with zero sign-up or server uploads.',
    keywords: ['ai presentation outliner free', 'pitch deck outline generator', 'slide creator ai', 'presentation talking points'],
  },
  faq: [
    {
      question: 'How does the client-side presentation generator work?',
      answer: 'It uses structured narrative frameworks (Problem-Agitation-Solution, Hero’s Journey, Executive Brief) tailored to your chosen presentation objective to build structured slides and speaker notes in your browser.',
    },
    {
      question: 'Can I export the slides to PowerPoint or Google Slides?',
      answer: 'Yes, you can copy the generated outline in clean Markdown format or download it as a structured text file, which can be imported or pasted directly into PowerPoint, Google Slides, Gamma, or Notion.',
    },
  ],
  relatedTools: ['ai-article-writer', 'ai-business-name-generator', 'ai-story-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 12,
  component: 'ai-presentation-generator',
};
