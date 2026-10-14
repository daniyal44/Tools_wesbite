import { ToolDefinition } from '@/lib/tools/types';

export const pdfToTextDefinition: ToolDefinition = {
  id: 'pdf-to-text',
  slug: 'pdf-to-text',
  name: 'PDF to Text Extractor',
  shortDescription: 'Extract plain text, words, and content from PDF documents directly in browser.',
  longDescription: 'Fast, secure client-side PDF text extractor. Pull text, paragraphs, and content out of PDF files without uploading them to any cloud or third-party server. Includes live text search, word and character counters, clean text formatting, one-click clipboard copy, and instant .txt file export. Direct private Stirling-PDF and TinyWow alternative.',
  category: 'pdf',
  icon: 'file-text',
  keywords: ['pdf to text', 'extract text from pdf', 'pdf text extractor', 'convert pdf to txt', 'stirling pdf alternative', 'tinywow pdf to text', 'read pdf text online'],
  searchableText: 'pdf to text extract text from pdf convert pdf txt word counter search stirling pdf tinywow client side',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: true,
  supportsCopy: true,
  seo: {
    title: 'PDF to Text Extractor - Free Client-Side PDF to TXT Converter',
    description: 'Extract text from PDF documents instantly in your browser. Complete privacy with zero server uploads, live word count, and one-click TXT download.',
    keywords: ['pdf to text', 'extract text from pdf', 'pdf to txt online', 'free pdf text extractor'],
  },
  faq: [
    {
      question: 'Is my PDF text private?',
      answer: 'Yes! 100% of the extraction logic runs in your browser. No files or extracted strings are transmitted to any server.',
    },
    {
      question: 'Can I search inside the extracted text?',
      answer: 'Yes, the tool features real-time keyword highlighting and filtering within the extracted text.',
    },
  ],
  relatedTools: ['pdf-merge-split', 'pdf-rotator', 'pdf-watermark', 'word-counter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 3,
  component: 'src/tools/pdf/pdf-to-text',
};
