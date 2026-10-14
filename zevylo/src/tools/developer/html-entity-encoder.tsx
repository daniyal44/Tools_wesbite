'use client';

import React, { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function HtmlEntityEncoder() {
  const [input, setInput] = useState('<div class="example">Hello & Welcome!</div>');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [entityType, setEntityType] = useState<'named' | 'decimal' | 'hex'>('named');
  const [copied, setCopied] = useState(false);

  const encodeHtml = (str: string, type: 'named' | 'decimal' | 'hex') => {
    if (type === 'named') {
      const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };
      return str.replace(/[&<>"']/g, (m) => map[m]);
    } else if (type === 'decimal') {
      return str
        .split('')
        .map((c) => (/[a-zA-Z0-9 ]/.test(c) ? c : `&#${c.charCodeAt(0)};`))
        .join('');
    } else {
      return str
        .split('')
        .map((c) => (/[a-zA-Z0-9 ]/.test(c) ? c : `&#x${c.charCodeAt(0).toString(16).toUpperCase()};`))
        .join('');
    }
  };

  const decodeHtml = (str: string) => {
    if (typeof window === 'undefined') return str;
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.documentElement.textContent || '';
  };

  const output = mode === 'encode' ? encodeHtml(input, entityType) : decodeHtml(input);

  const handleCopy = async () => {
    await copyToClipboard(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setMode('encode')}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'encode'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Encode to Entities
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'decode'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Decode Entities
          </button>
        </div>

        {mode === 'encode' && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Format:</span>
            <select
              value={entityType}
              onChange={(e) => setEntityType(e.target.value as 'named' | 'decimal' | 'hex')}
              className="h-9 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-semibold"
            >
              <option value="named">Named (&amp;lt; &amp;gt;)</option>
              <option value="decimal">Decimal (&amp;#60;)</option>
              <option value="hex">Hexadecimal (&amp;#x3C;)</option>
            </select>
          </div>
        )}
      </div>

      {/* Editor Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Input */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>{mode === 'encode' ? 'Raw Text / HTML' : 'Encoded Entities'}</span>
            <button
              onClick={() => setInput('')}
              className="flex items-center gap-1 hover:text-gray-700 text-gray-400"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-sm leading-relaxed"
            placeholder="Type or paste text here..."
          />
          <div className="text-xs text-gray-400 font-mono">
            {input.length} characters
          </div>
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>{mode === 'encode' ? 'HTML Entities Output' : 'Decoded Text'}</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-gray-600 dark:text-gray-300"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={10}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-sm leading-relaxed"
          />
          <div className="text-xs text-gray-400 font-mono">
            {output.length} characters
          </div>
        </div>
      </div>
    </div>
  );
}
