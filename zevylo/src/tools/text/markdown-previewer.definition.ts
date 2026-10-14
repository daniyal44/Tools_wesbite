import { ToolDefinition } from '@/lib/tools/types';

export const markdownPreviewerDefinition: ToolDefinition = {
  id: 'markdown-previewer',
  slug: 'markdown-previewer',
  name: 'Markdown Previewer',
  shortDescription: 'Write Markdown and see the rendered HTML live, side by side, in your browser.',
  longDescription:
    'A fast, private Markdown previewer. Type Markdown on the left and watch the formatted result update instantly on the right — headings, bold, italic, inline code, fenced code blocks, links, ordered and unordered lists, blockquotes, and horizontal rules. Raw HTML in your source is escaped, so the preview is safe to use with untrusted text. Copy the generated HTML with one click. Everything runs locally; your content is never uploaded.',
  category: 'text',
  icon: 'file-text',
  keywords: ['markdown previewer', 'markdown preview', 'markdown to html', 'md viewer', 'markdown editor', 'live markdown', 'markdown render'],
  searchableText: 'markdown previewer preview to html live editor viewer render md headings bold italic code lists',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Markdown Previewer — Live Markdown to HTML | Zevylo Tools',
    description: 'Free live Markdown previewer. Write Markdown and see rendered HTML side by side, then copy the HTML. Safe, private, and 100% client-side.',
  },
  faq: [
    { question: 'Which Markdown features are supported?', answer: 'Headings (#–######), bold, italic, inline code, fenced code blocks, links, ordered/unordered lists, blockquotes, and horizontal rules.' },
    { question: 'Is it safe to paste untrusted Markdown?', answer: 'Yes. Raw HTML in your input is escaped before rendering, so embedded tags and scripts are shown as text rather than executed.' },
    { question: 'Can I get the HTML out?', answer: 'Yes — click Copy HTML to copy the rendered markup to your clipboard.' },
  ],
  relatedTools: ['markdown-table-generator', 'case-converter', 'word-counter', 'slug-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 75,
  component: 'markdown-previewer',
};
