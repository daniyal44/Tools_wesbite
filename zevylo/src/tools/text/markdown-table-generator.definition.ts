import { ToolDefinition } from '@/lib/tools/types';

export const markdownTableGeneratorDefinition: ToolDefinition = {
  id: 'markdown-table-generator',
  slug: 'markdown-table-generator',
  name: 'Markdown Table Generator',
  shortDescription: 'Interactive visual spreadsheet editor to generate clean Markdown and HTML tables.',
  longDescription: 'Design Markdown tables without worrying about tedious pipe syntax and spacing. Add, remove, and reorder rows and columns, configure text alignment (left, center, right), edit cell contents directly, and copy production-ready Markdown and HTML table code.',
  category: 'text',
  icon: 'table',
  keywords: ['markdown table generator', 'md table', 'github markdown table', 'table to markdown', 'it-tools alternative'],
  searchableText: 'markdown table generator visual spreadsheet rows columns align pipes html table export',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Markdown Table Generator — Visual Table Editor for GitHub & Docs | Zevylo',
    description: 'Build Markdown tables visually. Set column alignments and export clean Markdown and HTML tables. 100% free and client-side.',
  },
  faq: [
    {
      question: 'How do you align columns in Markdown tables?',
      answer: 'Markdown uses colons in the header divider row: :--- for left alignment, :---: for center alignment, and ---: for right alignment.',
    },
    {
      question: 'Can I export the table to HTML format?',
      answer: 'Yes! Toggle the HTML Tab to copy semantic <table>, <thead>, and <tbody> markup directly into your CMS or web page.',
    },
  ],
  relatedTools: ['case-converter', 'word-counter', 'lorem-ipsum-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 34,
  component: 'markdown-table-generator',
};
