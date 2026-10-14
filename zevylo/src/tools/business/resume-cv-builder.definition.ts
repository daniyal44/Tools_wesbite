import { ToolDefinition } from '@/lib/tools/types';

export const resumeCvBuilderDefinition: ToolDefinition = {
  id: 'resume-cv-builder',
  slug: 'resume-cv-builder',
  name: 'Free Resume & CV Builder (Print to PDF & Word DOC)',
  shortDescription: 'Build professional ATS-friendly resumes and CVs with instant Letter/A4 live preview and PDF/DOC export.',
  longDescription: 'Design job-winning resumes and curriculum vitae in minutes. Features clean ATS-compliant typography, itemized experience timelines, education credentials, skill pills, 1-click browser Print/PDF export, and Microsoft Word .doc file downloads with 100% private client-side processing.',
  category: 'business',
  icon: 'user',
  keywords: ['resume builder', 'cv maker', 'free resume to pdf', 'resume builder docx', 'ats resume creator', 'curriculum vitae builder'],
  searchableText: 'resume builder cv maker curriculum vitae pdf doc word ats friendly experience education job application free private',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Free Resume & CV Builder — Create & Download PDF / Word | Zevylo',
    description: 'Build modern, ATS-friendly resumes and CVs online for free. Export to PDF and Microsoft Word instantly with zero watermarks or signup.',
    keywords: ['free resume builder', 'cv maker online', 'resume to pdf', 'ats cv creator free'],
  },
  faq: [
    {
      question: 'How do I download my resume as a PDF?',
      answer: 'Click "Print / Save as PDF". In your browser print dialog, choose "Save as PDF" as the destination, select Margins: None (or Default), and click Save.',
    },
    {
      question: 'Is my personal data saved or stored online?',
      answer: 'No. Everything runs 100% client-side in your web browser. No names, phone numbers, or work experience are ever sent to any remote server.',
    },
  ],
  relatedTools: ['invoice-generator', 'bulk-email-generator', 'profit-loss-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 1,
  component: 'resume-cv-builder',
};
