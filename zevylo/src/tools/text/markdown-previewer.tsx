'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

const SAMPLE = `# Markdown Previewer

Type **Markdown** on the left and see the _rendered_ result instantly.

## Features
- Headings, **bold**, _italic_, \`inline code\`
- [Links](https://example.com)
- Lists and blockquotes

> Everything runs in your browser. Nothing is uploaded.

1. First
2. Second

\`\`\`
code block
\`\`\`
`;

// Escape HTML first so raw tags in the source cannot inject markup (XSS-safe).
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inline(s: string): string {
  // Operates on already-escaped text.
  return s
    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-sm font-mono">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer nofollow" class="text-blue-600 dark:text-blue-400 underline">$1</a>');
}

function markdownToHtml(md: string): string {
  const escaped = escapeHtml(md);
  const lines = escaped.split('\n');
  const html: string[] = [];
  let inList: 'ul' | 'ol' | null = null;
  let inCode = false;
  const codeBuf: string[] = [];

  const closeList = () => { if (inList) { html.push(`</${inList}>`); inList = null; } };

  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      if (inCode) {
        html.push(`<pre class="my-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-950 overflow-x-auto"><code class="font-mono text-sm">${codeBuf.join('\n')}</code></pre>`);
        codeBuf.length = 0;
        inCode = false;
      } else {
        closeList();
        inCode = true;
      }
      continue;
    }
    if (inCode) { codeBuf.push(line); continue; }

    if (/^\s*$/.test(line)) { closeList(); continue; }

    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      closeList();
      const level = h[1].length;
      const sizes = ['text-3xl', 'text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm'];
      html.push(`<h${level} class="font-bold text-gray-900 dark:text-white mt-4 mb-2 ${sizes[level - 1]}">${inline(h[2])}</h${level}>`);
      continue;
    }
    if (/^\s*&gt;\s?/.test(line)) {
      closeList();
      html.push(`<blockquote class="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-2 text-gray-600 dark:text-gray-400 italic">${inline(line.replace(/^\s*&gt;\s?/, ''))}</blockquote>`);
      continue;
    }
    if (/^\s*([-*+])\s+/.test(line)) {
      if (inList !== 'ul') { closeList(); html.push('<ul class="list-disc pl-6 my-2 space-y-1">'); inList = 'ul'; }
      html.push(`<li>${inline(line.replace(/^\s*[-*+]\s+/, ''))}</li>`);
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      if (inList !== 'ol') { closeList(); html.push('<ol class="list-decimal pl-6 my-2 space-y-1">'); inList = 'ol'; }
      html.push(`<li>${inline(line.replace(/^\s*\d+\.\s+/, ''))}</li>`);
      continue;
    }
    if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) {
      closeList();
      html.push('<hr class="my-4 border-gray-200 dark:border-gray-800" />');
      continue;
    }
    closeList();
    html.push(`<p class="my-2 leading-relaxed text-gray-800 dark:text-gray-200">${inline(line)}</p>`);
  }
  if (inCode) {
    html.push(`<pre class="my-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-950 overflow-x-auto"><code class="font-mono text-sm">${codeBuf.join('\n')}</code></pre>`);
  }
  closeList();
  return html.join('\n');
}

export default function MarkdownPreviewer() {
  const [input, setInput] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);
  const rendered = useMemo(() => markdownToHtml(input), [input]);

  const handleCopyHtml = async () => {
    if (await copyToClipboard(rendered)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-3">
      <div className="flex justify-end">
        <button
          onClick={handleCopyHtml}
          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied HTML' : 'Copy HTML'}
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Markdown</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={22}
            spellCheck={false}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 font-mono text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Preview</label>
          <div
            className="prose-sm w-full min-h-[33rem] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: rendered }}
          />
        </div>
      </div>
    </div>
  );
}
