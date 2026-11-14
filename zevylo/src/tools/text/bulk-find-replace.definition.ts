import { ToolDefinition } from '@/lib/tools/types';

export const bulkFindReplaceDefinition: ToolDefinition = {
  id: 'bulk-find-replace',
  slug: 'bulk-find-replace',
  name: 'Bulk Find & Replace',
  shortDescription: 'Replace one or many terms across large blocks of text at once, with case, whole-word and regex options.',
  longDescription:
    'Bulk find and replace across long documents, CSV exports, code files or lists in one pass. Add multiple find-and-replace pairs, enable case sensitivity, whole-word matching or regular expressions, then copy or download the result. Handy for renaming variables, cleaning data, swapping links and standardising copy. Processing is local, so pasted text never leaves your browser.',
  category: 'text',
  icon: 'text',
  keywords: [
    'bulk find and replace',
    'find and replace multiple words',
    'batch text replace online',
    'replace words in text free',
    'multiple find replace',
    'regex find replace online',
  ],
  searchableText:
    'bulk find and replace multiple words terms at once batch text replacer document csv list code case sensitive whole word regex regular expression free private browser',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Bulk Find & Replace — Replace Multiple Words in Text Free | Zevylo',
    description:
      'Find and replace multiple terms across long text in one pass. Supports case sensitivity, whole-word matching and regex, then copy or download the result for free.',
    keywords: [
      'bulk find and replace',
      'find and replace multiple words',
      'batch text replace',
      'regex find and replace',
    ],
  },
  faq: [
    {
      question: 'Can I replace several different words in one pass?',
      answer:
        'Yes. Add as many find-and-replace pairs as you need. Each rule runs in order over the text, so you can rename many terms at once.',
    },
    {
      question: 'Does it support regular expressions?',
      answer:
        'Yes. Enable regex mode to use patterns with capture groups and backreferences such as $1 in the replacement field.',
    },
    {
      question: 'What does whole-word matching do?',
      answer:
        'It only replaces standalone words, so replacing “cat” will not change “category”. Turn it off to replace inside longer words.',
    },
    {
      question: 'Is my text sent to a server?',
      answer:
        'No. All replacements run in JavaScript on your device. Your text never leaves the browser tab.',
    },
  ],
  relatedTools: ['find-replace', 'bulk-text-case-converter', 'remove-duplicate-lines'],
  status: 'active',
  visibility: 'public',
  sortOrder: 211,
  component: 'bulk-find-replace',
};
