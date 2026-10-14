'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Copy, Check, Globe, Code } from 'lucide-react';

interface HreflangRow {
  id: string;
  langCode: string;
  url: string;
}

const INITIAL_ROWS: HreflangRow[] = [
  { id: '1', langCode: 'en-US', url: 'https://example.com/en-us/' },
  { id: '2', langCode: 'en-GB', url: 'https://example.com/en-gb/' },
  { id: '3', langCode: 'es-ES', url: 'https://example.com/es/' },
  { id: '4', langCode: 'fr-FR', url: 'https://example.com/fr/' },
  { id: '5', langCode: 'de-DE', url: 'https://example.com/de/' },
  { id: '6', langCode: 'x-default', url: 'https://example.com/' },
];

export default function HreflangGenerator() {
  const [rows, setRows] = useState<HreflangRow[]>(INITIAL_ROWS);
  const [exportFormat, setExportFormat] = useState<'html' | 'xml'>('html');
  const [copied, setCopied] = useState<boolean>(false);

  const addRow = () => {
    setRows(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        langCode: 'en',
        url: 'https://example.com/',
      },
    ]);
  };

  const removeRow = (id: string) => {
    setRows(prev => prev.filter(r => r.id !== id));
  };

  const updateRow = (id: string, field: 'langCode' | 'url', val: string) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: val } : r));
  };

  const generateHtmlTags = (): string => {
    return rows
      .map(r => `<link rel="alternate" hreflang="${r.langCode.toLowerCase()}" href="${r.url}" />`)
      .join('\n');
  };

  const generateXmlSitemap = (): string => {
    return rows
      .map(r => `  <xhtml:link rel="alternate" hreflang="${r.langCode.toLowerCase()}" href="${r.url}" />`)
      .join('\n');
  };

  const outputCode = exportFormat === 'html' ? generateHtmlTags() : generateXmlSitemap();

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              International SEO Hreflang Tags
            </h3>
            <p className="text-xs text-gray-400">
              {rows.length} regional locales configured | Compliant with Google Search guidelines
            </p>
          </div>
        </div>

        <button
          onClick={addRow}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
        >
          <Plus className="h-4 w-4" /> Add Locale
        </button>
      </div>

      {/* Locales List */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-3">
        <div className="grid grid-cols-12 gap-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 px-1">
          <div className="col-span-4 sm:col-span-3">Language / Region</div>
          <div className="col-span-7 sm:col-span-8">Target URL</div>
          <div className="col-span-1 text-right">Del</div>
        </div>

        <div className="space-y-2">
          {rows.map((row) => (
            <div key={row.id} className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-4 sm:col-span-3">
                <input
                  type="text"
                  value={row.langCode}
                  onChange={(e) => updateRow(row.id, 'langCode', e.target.value)}
                  placeholder="en-US, es, x-default"
                  className="w-full text-xs font-mono font-semibold rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="col-span-7 sm:col-span-8">
                <input
                  type="text"
                  value={row.url}
                  onChange={(e) => updateRow(row.id, 'url', e.target.value)}
                  placeholder="https://example.com/path"
                  className="w-full text-xs font-mono rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="col-span-1 text-right">
                <button
                  onClick={() => removeRow(row.id)}
                  className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Generation Output */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExportFormat('html')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                exportFormat === 'html'
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              HTML &lt;head&gt; Format
            </button>
            <button
              onClick={() => setExportFormat('xml')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                exportFormat === 'xml'
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              XML Sitemap Format
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied Code!' : 'Copy Code Snippet'}
          </button>
        </div>

        <div className="relative">
          <pre className="w-full h-48 rounded-xl bg-gray-950 p-4 text-xs font-mono text-blue-300 overflow-auto whitespace-pre leading-relaxed select-all">
            {outputCode}
          </pre>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <Code className="h-3.5 w-3.5 text-blue-500" />
          <span>
            Include these tags in the &lt;head&gt; of all alternate language pages to enable bidirectional reciprocal linking required by Google Search.
          </span>
        </div>
      </div>
    </div>
  );
}
