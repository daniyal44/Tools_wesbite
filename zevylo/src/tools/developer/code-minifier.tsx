'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import { copyToClipboard, formatBytes } from '@/lib/utils';

export default function CodeMinifier() {
  const [lang, setLang] = useState<'css' | 'html' | 'js' | 'json'>('css');
  const [code, setCode] = useState(`/* Global Card Style */
.card-container {
  display: flex;
  flex-direction: column;
  padding: 24px;
  margin: 16px auto;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Hover effect */
.card-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}`);
  const [copied, setCopied] = useState(false);

  const minified = useMemo(() => {
    if (!code.trim()) return '';

    if (lang === 'json') {
      try {
        return JSON.stringify(JSON.parse(code));
      } catch {
        return code;
      }
    } else if (lang === 'css') {
      return code
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Collapse multiple spaces
        .replace(/\s*([\{\}\:\;\,])\s*/g, '$1') // Remove spaces around delimiters
        .replace(/;}/g, '}') // Remove trailing semicolons
        .trim();
    } else if (lang === 'html') {
      return code
        .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
        .replace(/\s+/g, ' ') // Collapse spaces
        .replace(/> </g, '><') // Remove space between tags
        .trim();
    } else {
      // JavaScript (safe simple regex minifier)
      return code
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
        .replace(/\/\/[^\n]*/g, '') // Remove line comments
        .replace(/^\s+|\s+$/gm, '') // Trim each line
        .replace(/\n+/g, '\n') // Collapse blank lines
        .trim();
    }
  }, [code, lang]);

  const originalBytes = new Blob([code]).size;
  const minifiedBytes = new Blob([minified]).size;
  const savedBytes = originalBytes > minifiedBytes ? originalBytes - minifiedBytes : 0;
  const percentSaved = originalBytes > 0 ? Math.round((savedBytes / originalBytes) * 100) : 0;

  const handleCopy = async () => {
    await copyToClipboard(minified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Language Switcher & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          {(['css', 'html', 'js', 'json'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                lang === l
                  ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="text-gray-500">
            {formatBytes(originalBytes)} → {formatBytes(minifiedBytes)}
          </span>
          <span className={`px-2.5 py-1 rounded-lg font-bold ${percentSaved > 0 ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300' : 'bg-gray-100 text-gray-600'}`}>
            -{percentSaved}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Input */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>Original Code</span>
            <button
              onClick={() => setCode('')}
              className="flex items-center gap-1 hover:text-gray-700 text-gray-400"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={14}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-xs leading-relaxed"
            placeholder="Paste code to minify..."
          />
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>Minified Output</span>
            {minified && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-gray-600 dark:text-gray-300"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={minified}
            rows={14}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-xs text-blue-600 dark:text-blue-400 leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
