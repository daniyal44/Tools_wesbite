import { ToolDefinition } from '@/lib/tools/types';

export const aiCodeAssistantDefinition: ToolDefinition = {
  id: 'ai-code-assistant',
  slug: 'ai-code-assistant',
  name: 'AI Code Explainer & Multi-Language Converter',
  shortDescription: 'Explain logic, audit syntax vulnerabilities, estimate Big O complexity, and convert code between languages.',
  longDescription: 'Master unfamiliar algorithms and refactor code instantly. Deconstructs complex functions, audits common null-pointer and boundary errors, estimates Big-O time and space complexity, and translates snippets between TypeScript, Python, Go, Rust, and Java.',
  category: 'ai',
  icon: 'code-2',
  keywords: ['ai code assistant', 'code explainer', 'code converter', 'big o calculator', 'bug finder'],
  searchableText: 'ai code assistant code explainer multi language converter big o complexity bug detection python typescript rust go java client side',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'AI Code Explainer & Multi-Language Converter — Free Dev Tool | Zevylo',
    description: 'Deconstruct complex code, find syntax and logic bugs, analyze Big-O complexity, and convert snippets between languages.',
    keywords: ['ai code converter', 'explain code online', 'code bug checker', 'python to typescript converter'],
  },
  faq: [
    {
      question: 'Which programming languages are supported?',
      answer: 'JavaScript, TypeScript, Python, Go, Rust, Java, C++, and SQL.',
    },
    {
      question: 'Is my proprietary code kept private?',
      answer: 'Yes. 100% client-side privacy ensures your algorithms, tokens, and proprietary code never leave your browser.',
    },
  ],
  relatedTools: ['ai-prompt-generator', 'ai-sql-regex-generator', 'json-formatter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 4,
  component: 'ai-code-assistant',
};
