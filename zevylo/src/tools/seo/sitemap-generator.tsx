'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Download, Copy, Check, Network, FileCode } from 'lucide-react';

interface SitemapEntry {
  id: string;
  loc: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  lastmod: string;
}

const TODAY = new Date().toISOString().slice(0, 10);

const INITIAL_ENTRIES: SitemapEntry[] = [
  { id: '1', loc: 'https://zevylo.netlify.app/', changefreq: 'daily', priority: '1.0', lastmod: TODAY },
  { id: '2', loc: 'https://zevylo.netlify.app/tools', changefreq: 'daily', priority: '0.9', lastmod: TODAY },
  { id: '3', loc: 'https://zevylo.netlify.app/categories', changefreq: 'weekly', priority: '0.8', lastmod: TODAY },
  { id: '4', loc: 'https://zevylo.netlify.app/privacy', changefreq: 'monthly', priority: '0.3', lastmod: TODAY },
];

export default function SitemapGenerator() {
  const [entries, setEntries] = useState<SitemapEntry[]>(INITIAL_ENTRIES);
  const [newUrl, setNewUrl] = useState<string>('');
  const [bulkInput, setBulkInput] = useState<string>('');
  const [showBulk, setShowBulk] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const addSingleUrl = () => {
    if (!newUrl.trim()) return;
    let url = newUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }
    const newEntry: SitemapEntry = {
      id: Math.random().toString(36).substring(2, 9),
      loc: url,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: TODAY,
    };
    setEntries(prev => [...prev, newEntry]);
    setNewUrl('');
  };

  const addBulkUrls = () => {
    const lines = bulkInput.split('\n').map(l => l.trim()).filter(Boolean);
    const added: SitemapEntry[] = lines.map(line => {
      let url = line;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }
      return {
        id: Math.random().toString(36).substring(2, 9),
        loc: url,
        changefreq: 'weekly',
        priority: '0.8',
        lastmod: TODAY,
      };
    });
    setEntries(prev => [...prev, ...added]);
    setBulkInput('');
    setShowBulk(false);
  };

  const removeEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const updateEntry = (id: string, field: keyof SitemapEntry, value: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  // Generate XML string
  const generateXml = (): string => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    entries.forEach(item => {
      xml += '  <url>\n';
      xml += `    <loc>${item.loc.replace(/&/g, '&amp;')}</loc>\n`;
      xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
      xml += `    <priority>${item.priority}</priority>\n`;
      xml += '  </url>\n';
    });
    xml += '</urlset>';
    return xml;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateXml());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generateXml()], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
            <Network className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              XML Sitemap Builder
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {entries.length} URLs included | Fully compliant with sitemaps.org protocol
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBulk(!showBulk)}
            className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors shadow-sm"
          >
            {showBulk ? 'Hide Bulk' : 'Bulk Import'}
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors shadow-sm"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy XML'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            <Download className="h-3.5 w-3.5" /> Download sitemap.xml
          </button>
        </div>
      </div>

      {/* Bulk Import Drawer */}
      {showBulk && (
        <div className="p-4 rounded-2xl border border-orange-200 dark:border-orange-900/40 bg-orange-50/30 dark:bg-orange-950/20 space-y-3">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Paste Multiple URLs (one per line):
          </label>
          <textarea
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            placeholder="https://example.com/about&#10;https://example.com/contact&#10;https://example.com/blog"
            rows={4}
            className="w-full text-xs font-mono rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2.5 text-gray-900 dark:text-white outline-none focus:border-orange-500"
          />
          <button
            onClick={addBulkUrls}
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-sm"
          >
            Import URLs
          </button>
        </div>
      )}

      {/* Add Single URL Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="https://example.com/new-page"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addSingleUrl()}
          className="flex-1 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-gray-900 dark:text-white outline-none focus:border-orange-500"
        />
        <button
          onClick={addSingleUrl}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-sm shrink-0"
        >
          <Plus className="h-3.5 w-3.5" /> Add URL
        </button>
      </div>

      {/* URLs Table */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Webpage URL</th>
                <th className="py-3 px-3">Changefreq</th>
                <th className="py-3 px-3">Priority</th>
                <th className="py-3 px-3">Lastmod</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
                  <td className="py-2.5 px-4 font-mono text-gray-900 dark:text-white font-medium max-w-xs truncate">
                    {entry.loc}
                  </td>
                  <td className="py-2.5 px-3">
                    <select
                      value={entry.changefreq}
                      onChange={(e) => updateEntry(entry.id, 'changefreq', e.target.value)}
                      className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2 py-1 text-gray-900 dark:text-white outline-none text-xs"
                    >
                      {['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].map(cf => (
                        <option key={cf} value={cf}>{cf}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2.5 px-3">
                    <select
                      value={entry.priority}
                      onChange={(e) => updateEntry(entry.id, 'priority', e.target.value)}
                      className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2 py-1 text-gray-900 dark:text-white outline-none text-xs"
                    >
                      {['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1'].map(pr => (
                        <option key={pr} value={pr}>{pr}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="date"
                      value={entry.lastmod}
                      onChange={(e) => updateEntry(entry.id, 'lastmod', e.target.value)}
                      className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2 py-1 text-gray-900 dark:text-white outline-none text-xs"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => removeEntry(entry.id)}
                      className="p-1 text-gray-400 hover:text-rose-500 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* XML Code Preview */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <FileCode className="h-4 w-4 text-orange-500" /> Formatted sitemap.xml Output
          </span>
          <span className="text-xs text-gray-400">{entries.length} URLs mapped</span>
        </div>
        <pre className="w-full h-48 rounded-xl bg-gray-950 p-3.5 text-xs text-orange-300 font-mono overflow-auto whitespace-pre leading-relaxed select-all">
          {generateXml()}
        </pre>
      </div>
    </div>
  );
}
