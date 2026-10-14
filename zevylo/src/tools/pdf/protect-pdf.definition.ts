import { ToolDefinition } from '@/lib/tools/types';

export const protectPdfDefinition: ToolDefinition = {
  id: 'protect-pdf',
  slug: 'protect-pdf',
  name: 'Protect PDF with Password',
  shortDescription: 'Encrypt and password-protect confidential PDF files directly in your browser.',
  longDescription: 'Secure confidential legal documents, bank statements, and sensitive business reports. Encrypts PDF files with standard password security so only authorized recipients with the correct password can open and view the content.',
  category: 'pdf',
  icon: 'lock',
  keywords: ['protect pdf', 'password protect pdf', 'encrypt pdf online', 'lock pdf free', 'secure pdf client side'],
  searchableText: 'protect pdf password protect pdf encrypt lock security confidential legal pdf-lib client side',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Password Protect PDF Online — 100% Free & Secure | Zevylo',
    description: 'Protect your PDF with a password. Encrypt sensitive documents in your browser with zero server uploads and 100% private processing.',
    keywords: ['password protect pdf free', 'encrypt pdf online', 'lock pdf password', 'secure pdf'],
  },
  faq: [
    {
      question: 'Will anyone be able to open my PDF without the password?',
      answer: 'No. The document is encrypted according to standard PDF security specifications; PDF readers will prompt for the password before rendering.',
    },
    {
      question: 'Is my password sent to your servers?',
      answer: 'Never. Encryption occurs 100% inside your web browser. Neither your file nor your password ever leave your device.',
    },
  ],
  relatedTools: ['pdf-page-numberer', 'pdf-merge-split', 'pdf-watermark'],
  status: 'active',
  visibility: 'public',
  sortOrder: 16,
  component: 'protect-pdf',
};
