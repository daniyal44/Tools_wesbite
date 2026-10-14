'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Download,
  Trash2,
  FileCode,
  ArrowRight,
  Eye,
  Layers,
} from 'lucide-react';

// Client-side HTML to Markdown parser
function convertHtmlToMarkdown(html: string): string {
  if (!html.trim()) return '';

  // Use DOMParser in the browser
  if (typeof window === 'undefined') return '';

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Remove script and style tags
    const scripts = doc.querySelectorAll('script, style');
    scripts.forEach((s) => s.remove());

    function processNode(node: Node): string {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent || '';
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return '';

      const el = node as HTMLElement;
      const tag = el.tagName.toLowerCase();

      let childText = '';
      el.childNodes.forEach((child) => {
        childText += processNode(child);
      });

      switch (tag) {
        case 'h1':
          return `\n# ${childText.trim()}\n\n`;
        case 'h2':
          return `\n## ${childText.trim()}\n\n`;
        case 'h3':
          return `\n### ${childText.trim()}\n\n`;
        case 'h4':
          return `\n#### ${childText.trim()}\n\n`;
        case 'h5':
          return `\n##### ${childText.trim()}\n\n`;
        case 'h6':
          return `\n###### ${childText.trim()}\n\n`;
        case 'p':
          return `${childText.trim()}\n\n`;
        case 'br':
          return '\n';
        case 'hr':
          return '\n---\n\n';
        case 'strong':
        case 'b':
          return `**${childText}**`;
        case 'em':
        case 'i':
          return `*${childText}*`;
        case 'del':
        case 's':
        case 'strike':
          return `~~${childText}~~`;
        case 'code':
          if (el.parentElement?.tagName.toLowerCase() === 'pre') {
            return childText;
          }
          return `\`${childText}\``;
        case 'pre':
          const lang = el.querySelector('code')?.className.replace('language-', '') || '';
          return `\n\`\`\`${lang}\n${el.textContent?.trim() || ''}\n\`\`\`\n\n`;
        case 'blockquote':
          return `\n> ${childText.trim().replace(/\n/g, '\n> ')}\n\n`;
        case 'a':
          const href = el.getAttribute('href') || '#';
          return `[${childText.trim() || href}](${href})`;
        case 'img':
          const src = el.getAttribute('src') || '';
          const alt = el.getAttribute('alt') || 'image';
          return `![${alt}](${src})`;
        case 'ul':
          let ulText = '\n';
          el.querySelectorAll(':scope > li').forEach((li) => {
            let liContent = '';
            li.childNodes.forEach((c) => {
              liContent += processNode(c);
            });
            ulText += `- ${liContent.trim()}\n`;
          });
          return ulText + '\n';
        case 'ol':
          let olText = '\n';
          let idx = 1;
          el.querySelectorAll(':scope > li').forEach((li) => {
            let liContent = '';
            li.childNodes.forEach((c) => {
              liContent += processNode(c);
            });
            olText += `${idx}. ${liContent.trim()}\n`;
            idx++;
          });
          return olText + '\n';
        case 'table':
          const rows = Array.from(el.querySelectorAll('tr'));
          if (rows.length === 0) return '';
          let tableMd = '\n';
          let hasHeader = false;

          rows.forEach((tr, rIdx) => {
            const ths = Array.from(tr.querySelectorAll('th'));
            const tds = Array.from(tr.querySelectorAll('td'));
            const cells = ths.length > 0 ? ths : tds;

            const rowContent = cells.map((cell) => cell.textContent?.trim() || '').join(' | ');
            tableMd += `| ${rowContent} |\n`;

            if (ths.length > 0 || (rIdx === 0 && !hasHeader)) {
              hasHeader = true;
              const divider = cells.map(() => '---').join(' | ');
              tableMd += `| ${divider} |\n`;
            }
          });
          return tableMd + '\n';
        default:
          return childText;
      }
    }

    let result = '';
    doc.body.childNodes.forEach((child) => {
      result += processNode(child);
    });

    // Clean up excessive blank lines
    return result.replace(/\n{3,}/g, '\n\n').trim();
  } catch {
    return html;
  }
}

export default function HtmlToMarkdown() {
  const [htmlInput, setHtmlInput] = useState(`<h1>Getting Started with AI</h1>
<p>Modern artificial intelligence is transforming <strong>software development</strong> and content creation.</p>
<h2>Key Capabilities</h2>
<ul>
  <li>Instant code generation in <em>TypeScript</em></li>
  <li>Automatic summarization of lengthy documents</li>
  <li>Natural language database queries</li>
</ul>
<h3>Performance Comparison</h3>
<table>
  <thead>
    <tr>
      <th>Tool</th>
      <th>Speed</th>
      <th>Accuracy</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Claude 3.5 Sonnet</td>
      <td>Fast</td>
      <td>98%</td>
    </tr>
    <tr>
      <td>GPT-4o</td>
      <td>Very Fast</td>
      <td>97%</td>
    </tr>
  </tbody>
</table>
<blockquote>"The best way to predict the future is to build it."</blockquote>
<p>Learn more at <a href="https://zevylo.netlify.app">Zevylo Tools</a>.</p>`);

  const [markdownOutput, setMarkdownOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMarkdownOutput(convertHtmlToMarkdown(htmlInput));
  }, [htmlInput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownOutput], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const presets = [
    {
      label: '📝 Blog Article HTML',
      html: `<h1>10 Tips for Remote Work</h1>
<p>Working from home offers unprecedented <strong>freedom</strong>, but also requires disciplined boundaries.</p>
<h2>Rule 1: Set a Dedicated Workspace</h2>
<p>Avoid working from your bed or living couch. Create a designated desk space that signals focus.</p>
<h2>Rule 2: Take Structured Breaks</h2>
<ul>
  <li>Use the <em>Pomodoro Technique</em> (25 min focus, 5 min break)</li>
  <li>Step outside for natural sunlight</li>
  <li>Stay hydrated throughout the day</li>
</ul>`,
    },
    {
      label: '📊 Data Table HTML',
      html: `<h2>Quarterly Revenue Report</h2>
<table>
  <thead>
    <tr>
      <th>Region</th>
      <th>Q1 Revenue</th>
      <th>Q2 Revenue</th>
      <th>Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>North America</td>
      <td>$1.2M</td>
      <td>$1.5M</td>
      <td>+25%</td>
    </tr>
    <tr>
      <td>Europe</td>
      <td>$850K</td>
      <td>$980K</td>
      <td>+15%</td>
    </tr>
    <tr>
      <td>Asia Pacific</td>
      <td>$620K</td>
      <td>$810K</td>
      <td>+30%</td>
    </tr>
  </tbody>
</table>`,
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Preset Pills */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Sample HTML Templates:
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setHtmlInput(p.html)}
              className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-xs"
            >
              {p.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setHtmlInput('')}
            className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            Clear Input
          </button>
        </div>
      </div>

      {/* Dual Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Raw HTML Input */}
        <div className="p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-orange-500" />
                <span>HTML Code Input</span>
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {htmlInput.length} chars
              </span>
            </div>
            <textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="Paste raw HTML here (e.g. <h1>Title</h1><p>Text...</p>)"
              rows={16}
              className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-xs text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Right: Markdown Output */}
        <div className="p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>Clean Markdown Output</span>
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {markdownOutput.length} chars
              </span>
            </div>
            <textarea
              readOnly
              value={markdownOutput}
              placeholder="Clean Markdown will appear here..."
              rows={16}
              className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-xs text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handleCopy}
              disabled={!markdownOutput}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-xs disabled:opacity-50"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Markdown' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={!markdownOutput}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors shadow-sm disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
