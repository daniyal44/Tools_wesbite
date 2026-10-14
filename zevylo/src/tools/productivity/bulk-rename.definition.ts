import { ToolDefinition } from '@/lib/tools/types';

export const bulkRenameDefinition: ToolDefinition = {
  id: 'bulk-rename',
  slug: 'bulk-rename',
  name: 'Bulk File Renamer (Ezgif Bulk Renamer)',
  shortDescription: 'Rename hundreds of files at once with prefixes, numbering, find & replace, and case conversions.',
  longDescription: 'Batch rename multiple files online for free. Add custom prefixes, suffixes, sequential zero-padded numbering (001, 002), find-and-replace strings, and letter-case adjustments with instant 1-click batch download.',
  category: 'productivity',
  icon: 'file-text',
  keywords: ['bulk file renamer', 'ezgif bulk rename', 'batch file renamer online', 'mass rename files', 'rename multiple files'],
  searchableText: 'bulk file renamer batch rename prefix suffix numbering replace case lowercase uppercase free ezgif',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Bulk File Renamer — Batch Rename Files Online Free | Zevylo',
    description: 'Rename multiple files simultaneously online for free. Sequential numbering, find and replace, prefix and suffix rules with zero server uploads.',
    keywords: ['bulk file renamer online', 'batch rename files', 'ezgif bulk rename', 'free file renamer'],
  },
  faq: [
    {
      question: 'How does bulk renaming work online?',
      answer: 'Select your files, choose your renaming rules (such as adding sequential numbers or replacing keywords), review the live preview, and click download.',
    },
    {
      question: 'Are my files uploaded to your server?',
      answer: 'No. The renaming happens entirely inside your local browser. The browser updates file headers locally and downloads the renamed files.',
    },
    {
      question: 'Can I change file extensions in bulk?',
      answer: 'Yes, you can specify custom extension changes or maintain original file types.',
    },
  ],
  relatedTools: ['bulk-image-converter', 'image-resizer', 'invoice-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 15,
  component: 'bulk-rename',
};
