import { ToolDefinition } from '@/lib/tools/types';

export const readabilityCalculatorDefinition: ToolDefinition = {
  id: 'readability-calculator',
  slug: 'readability-calculator',
  name: 'Readability Score & Grade Level Calculator',
  shortDescription: 'Calculate Flesch Reading Ease, Flesch-Kincaid Grade Level, and reading metrics.',
  longDescription: 'Assess the clarity and reading level of your essays, articles, and copy. Calculates the Flesch Reading Ease score, Flesch-Kincaid Grade Level, average sentence length, syllable count, and estimated reading time.',
  category: 'text',
  icon: 'book-open',
  keywords: ['readability calculator', 'flesch kincaid score', 'reading grade level', 'readability test', 'content clarity', 'it-tools alternative'],
  searchableText: 'readability score calculator flesch kincaid grade level ease syllables sentences words reading time',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Readability Score Calculator — Flesch-Kincaid Grade Level | Zevylo',
    description: 'Calculate Flesch Reading Ease and Grade Level online for free. Improve clarity and sentence flow. 100% client-side.',
  },
  faq: [
    {
      question: 'What is a good Flesch Reading Ease score for web content?',
      answer: 'A score of 60 to 70 is ideal for general web audiences (plain English, easily understood by 8th graders). Higher scores (80-100) are very easy, while scores below 50 are dense academic text.',
    },
    {
      question: 'How does Flesch-Kincaid determine grade levels?',
      answer: 'It balances sentence length (words per sentence) with word complexity (syllables per word). Longer sentences and multi-syllable vocabulary increase the grade level requirement.',
    },
  ],
  relatedTools: ['word-counter', 'case-converter', 'slug-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 33,
  component: 'readability-calculator',
};
