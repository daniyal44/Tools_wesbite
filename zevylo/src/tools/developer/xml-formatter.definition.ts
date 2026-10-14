import { ToolDefinition } from '@/lib/tools/types';

export const xmlFormatterDefinition: ToolDefinition = {
  id: 'xml-formatter',
  slug: 'xml-formatter',
  name: 'XML Formatter & Validator',
  shortDescription: 'Beautify, minify, and validate XML with adjustable indentation — all in your browser.',
  longDescription:
    'Format messy or minified XML into clean, indented markup, or compress it down to a single line. Choose 2-space, 4-space, or tab indentation. A live well-formedness check uses the browser’s native parser to flag mismatched tags and malformed syntax, showing the parser error inline. Perfect for debugging API responses, config files, SVG, RSS, and sitemaps. Nothing is uploaded — all processing is client-side.',
  category: 'developer',
  icon: 'code',
  keywords: ['xml formatter', 'xml beautifier', 'xml validator', 'format xml', 'minify xml', 'xml pretty print', 'xml prettifier'],
  searchableText: 'xml formatter beautifier validator pretty print minify indent format well-formed parser svg rss sitemap',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'XML Formatter & Validator — Beautify and Minify XML | Zevylo Tools',
    description: 'Free XML formatter, beautifier, and validator. Pretty-print or minify XML with 2/4-space or tab indent and live well-formedness checks. 100% client-side.',
  },
  faq: [
    { question: 'Does it validate my XML?', answer: 'Yes. It runs your XML through the browser’s native parser and flags any well-formedness error (mismatched or unclosed tags, invalid characters) with the parser message.' },
    { question: 'Can it minify as well as beautify?', answer: 'Yes. Use Minify to strip whitespace between tags into a single compact line, or Beautify to re-indent with your chosen spacing.' },
    { question: 'Is my XML sent to a server?', answer: 'No. Formatting and validation happen entirely in your browser; your data never leaves your device.' },
  ],
  relatedTools: ['json-formatter', 'yaml-json-converter', 'sql-formatter', 'html-entity-encoder'],
  status: 'active',
  visibility: 'public',
  sortOrder: 74,
  component: 'xml-formatter',
};
