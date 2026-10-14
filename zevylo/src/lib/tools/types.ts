// Tool Registry Type System - Single Source of Truth
// Every tool must conform to ToolDefinition

export type ExecutionMode = 'client' | 'server' | 'hybrid' | 'external-api' | 'ai';
export type ToolStatus = 'active' | 'beta' | 'maintenance' | 'disabled';
export type ToolVisibility = 'public' | 'private' | 'premium';

export interface ToolSEO {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
}

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: ToolCategory;
  subcategory?: string;
  icon: string;
  keywords: string[];
  searchableText: string;
  version: string;

  executionMode: ExecutionMode;

  requiresAuth: boolean;
  requiresUpload: boolean;
  supportsBatch: boolean;
  supportsDownload: boolean;
  supportsShare: boolean;
  supportsCopy: boolean;

  seo: ToolSEO;
  faq?: ToolFAQ[];
  relatedTools: string[];

  status: ToolStatus;
  visibility: ToolVisibility;
  sortOrder: number;

  // Component path for dynamic loading
  component: string;
}

export type ToolCategory =
  | 'text'
  | 'developer'
  | 'seo'
  | 'image'
  | 'calculators'
  | 'converters'
  | 'generators'
  | 'security'
  | 'color'
  | 'pdf'
  | 'business'
  | 'education'
  | 'productivity'
  | 'audio'
  | 'video'
  | 'ai'
  | 'date-time'
  | 'marketing';

export interface CategoryDefinition {
  id: ToolCategory;
  name: string;
  slug: string;
  description: string;
  icon: string;
  sortOrder: number;
  color: string;
}

export interface ToolExecutionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  duration?: number;
}

export interface ToolInput {
  [key: string]: unknown;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: {
    code: string;
    message: string;
  } | null;
  requestId: string;
}
