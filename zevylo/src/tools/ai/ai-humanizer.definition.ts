import { ToolDefinition } from '@/lib/tools/types';

export const aiHumanizerDefinition: ToolDefinition = {
  id: 'ai-humanizer',
  slug: 'ai-humanizer',
  name: 'AI Writing Clarity Editor',
  shortDescription:
    'Rewrite repetitive, cliché-heavy drafting into clearer, more varied prose — entirely in your browser.',
  longDescription:
    'A writing revision aid for drafts produced by AI assistants or by you. It replaces overused phrases, varies sentence length, and adjusts tone so the text reads more naturally. It is an editing assistant, not a detector-bypass service: it does not guarantee any result from AI-detection tools, plagiarism checkers, or academic review.',
  category: 'ai',
  icon: 'user-check',
  keywords: [
    'ai writing editor',
    'clarity editor',
    'rewrite ai text',
    'reduce repetition',
    'improve readability',
    'natural sentence flow',
  ],
  searchableText:
    'ai writing clarity editor rewrite repetitive draft replace cliches vary sentence length tone readability grammar browser local text editing',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'AI Writing Clarity Editor — Improve Draft Clarity & Flow | Zevylo',
    description:
      'Revise AI-assisted or first-draft text for clarity, repetition, and rhythm in your browser. No upload, no account, no detector-bypass promises.',
    keywords: [
      'ai writing clarity editor',
      'rewrite repetitive text',
      'improve sentence variety',
      'free writing editor online',
    ],
  },
  faq: [
    {
      question: 'How does the editor change my text?',
      answer:
        'It replaces a built-in list of overused phrases, varies sentence length, and applies a selected tone. It does not add facts, verify claims, or rewrite an entire argument. Review the output before using it.',
    },
    {
      question: 'Will this make text undetectable by AI detectors?',
      answer:
        'No. The tool does not claim to defeat AI detectors, and detector results are unreliable in both directions. Use it to improve clarity and repetition, and follow your institution or publisher\'s disclosure rules.',
    },
    {
      question: 'Are my drafts uploaded anywhere?',
      answer:
        'No. The rewriting runs locally in this browser tab. Your text is not sent to a server, and it is not saved after you close or reload the page.',
    },
  ],
  relatedTools: ['ai-content-detector', 'ai-article-writer', 'readability-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'ai-humanizer',
};
