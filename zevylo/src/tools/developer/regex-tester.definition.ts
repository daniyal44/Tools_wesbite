import { ToolDefinition } from '@/lib/tools/types';

export const regexTesterDefinition: ToolDefinition = {
  id: 'developer-regex-tester',
  slug: 'regex-tester',
  name: 'Regex Tester',
  shortDescription: 'Test and debug regular expressions.',
  longDescription: 'Real-time regex matching, highlighting, and extraction. Test your patterns against text quickly.',
  category: 'developer',
  icon: 'Search',
  keywords: ['regex', 'regular expression', 'regex tester', 'regex match'],
  searchableText: 'regex tester regular expression matcher pattern',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Regex Tester & Matcher | Zevylo',
    description: 'Test your regular expressions in real-time with syntax highlighting and match extraction.',
  },
  relatedTools: ['text-diff'],
  status: 'active',
  visibility: 'public',
  sortOrder: 4,
  component: 'developer/regex-tester'
};
