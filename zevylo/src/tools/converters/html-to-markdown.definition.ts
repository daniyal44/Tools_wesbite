import { ToolDefinition } from '@/lib/tools/types';

export const htmlToMarkdownDefinition: ToolDefinition = {
  id: 'html-to-markdown',
  slug: 'html-to-markdown',
  name: 'HTML to Markdown Converter',
  shortDescription: 'Convert HTML code into clean, well-formatted Markdown in real time.',
  longDescription: 'Fast, client-side HTML to Markdown converter supporting headings, lists, tables, links, code blocks, images, and blockquotes. Clean up messy web markup into readable GitHub-flavored Markdown instantly.',
  category: 'converters',
  icon: 'file-text',
  keywords: ['html to markdown', 'convert html to md', 'html markdown converter', 'web to markdown', 'gfm markdown table'],
  searchableText: 'html to markdown converter html2md gfm github flavored markdown table code block client side free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'HTML to Markdown Converter — 100% Free & In-Browser | Zevylo',
    description: 'Convert messy HTML into clean GitHub Flavored Markdown (GFM) instantly. Supports tables, lists, code snippets, and blockquotes. 100% private and in-browser.',
    keywords: ['html to markdown converter free', 'html to md converter online', 'convert web page to markdown', 'html to gfm'],
  },
  faq: [
    {
      question: 'Does this converter preserve HTML tables and lists?',
      answer: 'Yes! HTML <table>, <thead>, <tbody>, <tr>, and <td> elements are automatically converted into clean GitHub-flavored Markdown table pipes (| Col 1 | Col 2 |).',
    },
    {
      question: 'Is my HTML uploaded to any external server?',
      answer: 'No. The parsing and transformation logic executes 100% locally inside your web browser with complete client-side privacy.',
    },
  ],
  relatedTools: ['markdown-previewer', 'markdown-table-generator', 'text-extractor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 12,
  component: 'html-to-markdown',
};
