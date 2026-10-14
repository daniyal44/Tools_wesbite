'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Eraser } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function WhitespaceCleaner() {
  const [input, setInput] = useState('');
  const [trimLines, setTrimLines] = useState(true);
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [tabsToSpaces, setTabsToSpaces] = useState(false);
  const [collapseBlank, setCollapseBlank] = useState(true);
  const [removeAllBlank, setRemoveAllBlank] = useState(false);
  const [stripLineBreaks, setStripLineBreaks] = useState(false);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    let text = input;
    if (!text) return '';

    if (tabsToSpaces) text = text.replace(/\t/g, ' ');
    if (collapseSpaces) text = text.replace(/[^\S\r\n]{2,}/g, ' '); // collapse runs of spaces/tabs, keep newlines

    let lines = text.split(/\r?\n/);
    if (trimLines) lines = lines.map((l) => l.trim());
    if (removeAllBlank) {
      lines = lines.filter((l) => l.trim() !== '');
    } else if (collapseBlank) {
      const out: string[] = [];
      let prevBlank = false;
      for (const l of lines) {
        const blank = l.trim() === '';
        if (blank && prevBlank) continue;
        out.push(l);
        prevBlank = blank;
      }
      lines = out;
    }
    text = lines.join('\n');

    if (stripLineBreaks) text = text.replace(/\s*\r?\n\s*/g, ' ').trim();

    return text;
  }, [input, trimLines, collapseSpaces, tabsToSpaces, collapseBlank, removeAllBlank, stripLineBreaks]);

  const handleCopy = async () => {
    if (await copyToClipboard(output)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const toggleClass = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
      active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
    }`;

  const saved = input.length - output.length;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm flex flex-wrap gap-2">
        <button onClick={() => setTrimLines((v) => !v)} className={toggleClass(trimLines)}>Trim each line</button>
        <button onClick={() => setCollapseSpaces((v) => !v)} className={toggleClass(collapseSpaces)}>Collapse spaces</button>
        <button onClick={() => setTabsToSpaces((v) => !v)} className={toggleClass(tabsToSpaces)}>Tabs → space</button>
        <button onClick={() => setCollapseBlank((v) => !v)} className={toggleClass(collapseBlank)} disabled={removeAllBlank}>
          Collapse blank lines
        </button>
        <button onClick={() => setRemoveAllBlank((v) => !v)} className={toggleClass(removeAllBlank)}>Remove all blank lines</button>
        <button onClick={() => setStripLineBreaks((v) => !v)} className={toggleClass(stripLineBreaks)}>Join into one line</button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
            Input ({input.length.toLocaleString()} chars)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            spellCheck={false}
            placeholder="Paste messy text to clean up..."
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 font-mono text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Cleaned ({output.length.toLocaleString()} chars{saved > 0 ? `, −${saved.toLocaleString()}` : ''})
            </label>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            rows={16}
            spellCheck={false}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-950 p-4 font-mono text-xs text-gray-900 dark:text-white focus:outline-none resize-y select-all"
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500">
        <Eraser className="h-3.5 w-3.5" />
        Cleans whitespace entirely in your browser — nothing is uploaded.
      </div>
    </div>
  );
}
