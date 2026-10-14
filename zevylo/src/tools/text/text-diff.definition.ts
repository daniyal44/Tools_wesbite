import { ToolDefinition } from '@/lib/tools/types';

export const textDiffDefinition: ToolDefinition = {
  id: 'text-diff',
  slug: 'text-diff',
  name: 'Text Diff Checker',
  shortDescription: 'Compare two text snippets to find differences.',
  longDescription: 'A text comparison tool that highlights additions, deletions, and unchanged text. View diff side-by-side or inline.',
  category: 'text',
  icon: 'GitPullRequest',
  keywords: ['diff', 'compare text', 'text difference', 'diff checker'],
  searchableText: 'text diff checker compare text differences',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Text Diff Checker | Zevylo',
    description: 'Compare two texts side-by-side or inline to spot differences quickly.',
  },
  relatedTools: ['word-counter', 'case-converter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 3,
  component: 'text/text-diff'
};
