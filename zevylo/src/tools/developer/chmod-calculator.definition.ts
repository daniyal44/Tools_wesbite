import { ToolDefinition } from '@/lib/tools/types';

export const chmodCalculatorDefinition: ToolDefinition = {
  id: 'chmod-calculator',
  slug: 'chmod-calculator',
  name: 'Chmod Permissions Calculator',
  shortDescription: 'Calculate Linux / Unix chmod file permissions in numeric (octal) and symbolic notation.',
  longDescription: 'Easily calculate and decode Linux file and directory permissions. Toggle Read (4), Write (2), and Execute (1) checkboxes for Owner, Group, and Public, or type an octal number (e.g. 755, 644) to instantly generate terminal chmod commands.',
  category: 'developer',
  icon: 'terminal',
  keywords: ['chmod calculator', 'linux permissions', 'octal permissions', 'chmod 755', 'chmod 644', 'it-tools alternative'],
  searchableText: 'chmod calculator calculate linux unix file permissions octal 755 644 symbolic read write execute',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Chmod Calculator — Linux File Permissions Generator (755, 644) | Zevylo',
    description: 'Calculate Linux chmod permissions visually. Convert between octal numbers and symbolic rwxr-xr-x notation. Free and client-side.',
  },
  faq: [
    {
      question: 'What do the numbers in chmod 755 mean?',
      answer: 'The first digit (7) is Owner permissions (r+w+x = 4+2+1). The second digit (5) is Group permissions (r+x = 4+1). The third digit (5) is Public/Others permissions (r+x = 4+1).',
    },
    {
      question: 'What are the most common Linux file permissions?',
      answer: 'Standard files are usually chmod 644 (owner can read/write, everyone else read-only). Web scripts and directories are usually chmod 755 (owner full access, others can read & execute).',
    },
  ],
  relatedTools: ['cron-generator', 'url-encoder', 'base64'],
  status: 'active',
  visibility: 'public',
  sortOrder: 28,
  component: 'chmod-calculator',
};
