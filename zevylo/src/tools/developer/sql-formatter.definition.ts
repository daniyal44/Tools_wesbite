import { ToolDefinition } from '@/lib/tools/types';

export const sqlFormatterDefinition: ToolDefinition = {
  id: 'sql-formatter',
  slug: 'sql-formatter',
  name: 'SQL Formatter & Beautifier',
  shortDescription: 'Format, indent, and beautify messy SQL queries with uppercase keyword styling.',
  longDescription: 'Turn disorganized, single-line SQL queries into clean, beautifully indented, readable SQL code. Automatically standardizes keywords (SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY, INSERT, UPDATE, DELETE) to uppercase and aligns clauses.',
  category: 'developer',
  icon: 'database',
  keywords: ['sql formatter', 'sql beautifier', 'format sql online', 'sql query prettifier', 'sql indent', 'it-tools alternative'],
  searchableText: 'sql formatter beautify indent format sql query select from where join group by order by',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'SQL Formatter & Beautifier — Format SQL Queries Online | Zevylo',
    description: 'Format, beautify, and indent SQL queries online. Uppercase keywords and clean clause indentation. 100% free and client-side.',
  },
  faq: [
    {
      question: 'Which SQL dialects are supported by this formatter?',
      answer: 'Standard ANSI SQL syntax is supported, making it fully compatible with MySQL, PostgreSQL, SQLite, Microsoft SQL Server, and Oracle queries.',
    },
    {
      question: 'Is my SQL database schema or query data sent to any server?',
      answer: 'No. Formatting runs 100% locally inside your browser. No query data or sensitive schema names are ever transmitted.',
    },
  ],
  relatedTools: ['json-formatter', 'code-minifier', 'json-to-typescript'],
  status: 'active',
  visibility: 'public',
  sortOrder: 26,
  component: 'sql-formatter',
};
