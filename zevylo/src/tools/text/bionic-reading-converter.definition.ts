import { ToolDefinition } from '@/lib/tools/types';

export const bionicReadingConverterDefinition: ToolDefinition = {
  id: 'bionic-reading-converter',
  slug: 'bionic-reading-converter',
  name: 'Bionic Reading Converter',
  shortDescription: 'Convert any text into high-focus Bionic Reading format to boost speed and comprehension.',
  longDescription: 'Transform standard articles, essays, and text into Bionic Reading format. Highlights the initial letters of each word to guide the eye through text, reducing cognitive strain and accelerating reading speed. Includes customizable fixation levels, font sizing, and markdown/HTML export.',
  category: 'text',
  icon: 'book-open',
  keywords: ['bionic reading converter', 'speed reading tool', 'adhd reader online', 'focus reading', 'text fixation', 'fast reading generator'],
  searchableText: 'bionic reading converter speed reading adhd focus eye fixation bold initial letters text comprehension markdown html reader mode',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Free Bionic Reading Converter Online | Zevylo',
    description: 'Convert articles, books, and text into Bionic Reading format instantly. Boost reading speed and focus with custom fixation strength and reader mode.',
    keywords: ['bionic reading converter', 'free bionic reading tool', 'speed reading converter', 'adhd friendly text reader'],
  },
  faq: [
    {
      question: 'How does Bionic Reading work?',
      answer: 'Bionic Reading bolds the first few letters of each word, allowing the brain to recognize words faster using contextual memory, significantly speeding up reading flow.',
    },
    {
      question: 'Can I export the converted text into Word or Notion?',
      answer: 'Yes! Use "Copy Markdown" or "Copy HTML" to paste the bolded formatting directly into Notion, Obsidian, Word, or Google Docs.',
    },
  ],
  relatedTools: ['readability-calculator', 'word-counter', 'case-converter', 'markdown-previewer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 16,
  component: 'bionic-reading-converter',
};
