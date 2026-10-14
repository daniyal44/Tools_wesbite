'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, AlertCircle, CheckCircle2 } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

// Tokenize XML into tags and text, then re-indent. Pure string processing — no DOMParser
// dependency for formatting, but we also run a lightweight validity check via DOMParser.
function formatXml(xml: string, indentUnit: string): string {
  const trimmed = xml.trim();
  if (!trimmed) return '';
  // Normalize: insert newlines between tags
  const withBreaks = trimmed.replace(/>\s*</g, '>\n<');
  const lines = withBreaks.split('\n');
  let indent = 0;
  const out: string[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    const isClosing = /^<\//.test(line);
    const isSelfClosing = /\/>$/.test(line) || /^<\?/.test(line) || /^<!/.test(line);
    const isOpening = /^<[^/!?]/.test(line) && !isSelfClosing;
    // An opening+closing on one line (e.g. <a>x</a>) does not change indent
    const openAndClose = isOpening && new RegExp(`</`).test(line);

    if (isClosing) indent = Math.max(0, indent - 1);
    out.push(indentUnit.repeat(indent) + line);
    if (isOpening && !openAndClose) indent++;
  }
  return out.join('\n');
}

function minifyXml(xml: string): string {
  return xml.trim().replace(/>\s+</g, '><').replace(/\s*\n\s*/g, '');
}

function validateXml(xml: string): { ok: boolean; error?: string } {
  if (!xml.trim()) return { ok: true };
  if (typeof window === 'undefined' || typeof window.DOMParser === 'undefined') {
    return { ok: true };
  }
  try {
    const doc = new window.DOMParser().parseFromString(xml, 'application/xml');
    const errNode = doc.querySelector('parsererror');
    if (errNode) {
      return { ok: false, error: errNode.textContent?.replace(/\s+/g, ' ').trim().slice(0, 240) || 'Invalid XML' };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Invalid XML' };
  }
}

export default function XmlFormatter() {
  const [input, setInput] = useState('<note><to>User</to><from>Zevylo</from><body>Hello world</body></note>');
  const [indentSize, setIndentSize] = useState(2);
  const [copied, setCopied] = useState(false);

  const indentUnit = useMemo(() => (indentSize === 0 ? '\t' : ' '.repeat(indentSize)), [indentSize]);
  const validation = useMemo(() => validateXml(input), [input]);
  const formatted = useMemo(() => formatXml(input, indentUnit), [input, indentUnit]);

  const [output, setOutput] = useState('');
  // Keep output in sync with the formatted view by default.
  const shownOutput = output || formatted;

  const handleCopy = async () => {
    if (shownOutput && (await copyToClipboard(shownOutput))) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const btn = 'px-3 py-1.5 rounded-lg text-xs font-semibold border bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors';

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 shadow-sm">
        <button className={btn} onClick={() => setOutput(formatXml(input, indentUnit))}>Beautify</button>
        <button className={btn} onClick={() => setOutput(minifyXml(input))}>Minify</button>
        <div className="flex items-center gap-1.5 ml-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">Indent:</span>
          {[2, 4, 0].map((s) => (
            <button
              key={s}
              onClick={() => { setIndentSize(s); setOutput(''); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                indentSize === s
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
              }`}
            >
              {s === 0 ? 'Tab' : `${s} sp`}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          {validation.ok ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> Well-formed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
              <AlertCircle className="h-4 w-4" /> Invalid XML
            </span>
          )}
        </div>
      </div>

      {!validation.ok && validation.error && (
        <div className="rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-700 dark:text-rose-300">
          {validation.error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Input XML</label>
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setOutput(''); }}
            rows={18}
            spellCheck={false}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 font-mono text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Output</label>
            <button
              onClick={handleCopy}
              disabled={!shownOutput}
              className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            value={shownOutput}
            readOnly
            rows={18}
            spellCheck={false}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-950 p-4 font-mono text-xs text-gray-900 dark:text-white focus:outline-none resize-y select-all"
          />
        </div>
      </div>
    </div>
  );
}
