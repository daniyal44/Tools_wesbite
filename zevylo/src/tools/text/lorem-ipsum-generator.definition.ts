import { ToolDefinition } from '@/lib/tools/types';

export const loremIpsumGeneratorDefinition: ToolDefinition = {
  id: 'lorem-ipsum-generator',
  slug: 'lorem-ipsum-generator',
  name: 'Lorem Ipsum Dummy Text Generator',
  shortDescription: 'Generate placeholder dummy text by paragraphs, sentences, words, or HTML lists.',
  longDescription: 'Generate mock filler copy for web designs, layouts, and typography testing. Customize number of paragraphs, sentences, or words, toggle "Lorem ipsum dolor sit amet..." starting phrase, and wrap in HTML tags (<p>, <li>) with one-click copy.',
  category: 'text',
  icon: 'file-text',
  keywords: ['lorem ipsum generator', 'dummy text', 'placeholder text', 'filler text', 'mock text', 'it-tools alternative'],
  searchableText: 'lorem ipsum generator dummy text placeholder filler copy paragraphs sentences words html',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Lorem Ipsum Generator — Custom Placeholder Dummy Text | Zevylo',
    description: 'Generate custom Lorem Ipsum placeholder text by paragraphs, sentences, or words with HTML tags. 100% free and client-side.',
  },
  faq: [
    {
      question: 'What is Lorem Ipsum?',
      answer: 'Lorem Ipsum is standard dummy placeholder text derived from Cicero\'s 45 BC philosophical treatise "De Finibus Bonorum et Malorum", used by printers and designers since the 1500s.',
    },
    {
      question: 'Can I generate HTML markup directly?',
      answer: 'Yes! Toggle the HTML Tags option to automatically wrap each paragraph in <p> tags or generate an unordered <ul> list.',
    },
  ],
  relatedTools: ['word-counter', 'case-converter', 'markdown-table-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 31,
  component: 'lorem-ipsum-generator',
};
