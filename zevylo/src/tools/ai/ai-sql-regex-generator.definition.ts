import { ToolDefinition } from '@/lib/tools/types';

export const aiSqlRegexGeneratorDefinition: ToolDefinition = {
  id: 'ai-sql-regex-generator',
  slug: 'ai-sql-regex-generator',
  name: 'AI Plain English to SQL & Regex Builder',
  shortDescription: 'Convert plain English requirements into production SQL queries and regular expression patterns.',
  longDescription: 'Turn plain natural language instructions into optimized SQL queries (PostgreSQL, MySQL, SQLite) with JOINs, aggregations, and window functions, or generate regex expressions with syntax explanations and matching flags.',
  category: 'ai',
  icon: 'database',
  keywords: ['ai sql generator', 'text to sql', 'regex ai generator', 'plain english to sql', 'regex builder'],
  searchableText: 'ai sql regex generator text to sql natural language postgresql mysql sqlite regular expressions flags tokens client side',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'AI Plain English to SQL & Regex Builder — Free Developer Tool | Zevylo',
    description: 'Transform plain text into production-ready SQL queries and Regex patterns with instant breakdown and explanations.',
    keywords: ['text to sql online free', 'ai regex generator', 'convert natural language to sql', 'sql query builder'],
  },
  faq: [
    {
      question: 'Can I generate queries for specific SQL dialects?',
      answer: 'Yes, it provides tailored queries for PostgreSQL, MySQL, and SQLite syntax.',
    },
    {
      question: 'Does the Regex generator explain what each symbol does?',
      answer: 'Yes, each generated regex comes with token-by-token explanations and recommended flags (g, i, m).',
    },
  ],
  relatedTools: ['ai-code-assistant', 'sql-formatter', 'regex-tester'],
  status: 'active',
  visibility: 'public',
  sortOrder: 5,
  component: 'ai-sql-regex-generator',
};
