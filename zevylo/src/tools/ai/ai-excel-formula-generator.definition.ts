import { ToolDefinition } from '@/lib/tools/types';

export const aiExcelFormulaGeneratorDefinition: ToolDefinition = {
  id: 'ai-excel-formula-generator',
  slug: 'ai-excel-formula-generator',
  name: 'AI Plain English to Excel & Sheets Formula Copilot',
  shortDescription: 'Convert plain English instructions into Excel and Google Sheets formulas with explanations.',
  longDescription: 'Translate natural language requests into complex Excel and Google Sheets formulas (XLOOKUP, INDEX-MATCH, SUMIFS, REGEXEXTRACT, nested IF). Includes reverse mode: paste any confusing formula to receive an instant plain English step-by-step logic breakdown.',
  category: 'ai',
  icon: 'table',
  keywords: ['ai excel formula generator', 'google sheets formula ai', 'plain english to excel', 'excel formula explainer', 'xlookup generator'],
  searchableText: 'ai excel formula generator google sheets copilot vlookup xlookup index match sumifs nested if formula explainer data analysis client side free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'AI Excel & Google Sheets Formula Copilot — 100% Free | Zevylo',
    description: 'Transform plain English into Excel and Google Sheets formulas instantly. Deconstruct complex nested formulas into human explanations. 100% free and in-browser.',
    keywords: ['excel formula generator free', 'google sheets formula ai', 'natural language to excel', 'excel formula solver'],
  },
  faq: [
    {
      question: 'Does this support both Microsoft Excel and Google Sheets?',
      answer: 'Yes! You can toggle between Microsoft Excel (XLOOKUP, LET, LAMBDA) and Google Sheets (QUERY, REGEXEXTRACT, ARRAYFORMULA, FILTER).',
    },
    {
      question: 'Can it explain existing complex formulas I don’t understand?',
      answer: 'Yes, switch to the "Explain Formula" mode and paste any nested formula to see a plain English explanation of each parameter and execution step.',
    },
  ],
  relatedTools: ['ai-sql-regex-generator', 'ai-code-assistant', 'unit-converter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 15,
  component: 'ai-excel-formula-generator',
};
