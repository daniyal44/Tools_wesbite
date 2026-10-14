import { ToolDefinition } from '@/lib/tools/types';

export const pdfMetadataEditorDefinition: ToolDefinition = {
  id: 'pdf-metadata-editor',
  slug: 'pdf-metadata-editor',
  name: 'PDF Metadata Editor & Inspector',
  shortDescription: 'View, edit, or remove Title, Author, Subject, and Keywords metadata from PDF files.',
  longDescription: 'Inspect and edit embedded PDF document metadata properties including Document Title, Author, Subject, Keywords, Creator, and Producer. Cleanse sensitive author history or optimize document metadata for search indexing with 100% in-browser privacy.',
  category: 'pdf',
  icon: 'file-cog',
  keywords: ['pdf metadata editor', 'edit pdf author title', 'remove pdf metadata', 'pdf properties editor', 'change pdf info online'],
  searchableText: 'pdf metadata editor inspector change title author subject keywords producer creator pdf-lib client side',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Edit PDF Metadata Online — Free PDF Properties Editor | Zevylo',
    description: 'Inspect and change PDF document metadata (Title, Author, Subject, Keywords) online. Remove sensitive author traces with zero server uploads.',
    keywords: ['pdf metadata editor free', 'edit pdf properties online', 'change pdf author', 'remove pdf metadata'],
  },
  faq: [
    {
      question: 'Why should I edit or clean PDF metadata?',
      answer: 'PDFs often contain hidden metadata including previous author usernames, corporate software versions, and internal file paths. Cleaning metadata protects your privacy before sharing documents publicly.',
    },
    {
      question: 'Can I add SEO keywords to my PDF?',
      answer: 'Yes, search engines like Google index PDF document titles and keywords, helping your documents rank higher in search results.',
    },
  ],
  relatedTools: ['pdf-page-numberer', 'protect-pdf', 'pdf-to-text'],
  status: 'active',
  visibility: 'public',
  sortOrder: 17,
  component: 'pdf-metadata-editor',
};
