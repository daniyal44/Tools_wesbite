'use client';

import React, { useMemo, useState } from 'react';
import { Type, Copy, Download, Sparkles, ShieldCheck, Trash2 } from 'lucide-react';

type CaseMode =
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'kebab'
  | 'constant';

const CASE_OPTIONS: { label: string; val: CaseMode; example: string }[] = [
  { label: 'UPPERCASE', val: 'upper', example: 'HELLO WORLD' },
  { label: 'lowercase', val: 'lower', example: 'hello world' },
  { label: 'Title Case', val: 'title', example: 'Hello World' },
  { label: 'Sentence case', val: 'sentence', example: 'Hello world' },
  { label: 'camelCase', val: 'camel', example: 'helloWorld' },
  { label: 'PascalCase', val: 'pascal', example: 'HelloWorld' },
  { label: 'snake_case', val: 'snake', example: 'hello_world' },
  { label: 'kebab-case', val: 'kebab', example: 'hello-world' },
  { label: 'CONSTANT_CASE', val: 'constant', example: 'HELLO_WORLD' },
];

function wordsOf(line: string): string[] {
  return line
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[\s_\-.]+/)
    .filter((word) => word.length > 0);
}

function convertLine(line: string, mode: CaseMode): string {
  switch (mode) {
    case 'upper':
      return line.toUpperCase();
    case 'lower':
      return line.toLowerCase();
    case 'title':
      return line
        .toLowerCase()
        .replace(/(^|[\s\-_/])([a-z0-9])/g, (_match, prefix: string, char: string) => prefix + char.toUpperCase());
    case 'sentence':
      return line.length === 0 ? line : line.charAt(0).toUpperCase() + line.slice(1).toLowerCase();
    case 'camel': {
      const words = wordsOf(line).map((word) => word.toLowerCase());
      return words.map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))).join('');
    }
    case 'pascal':
      return wordsOf(line)
        .map((word) => word.toLowerCase())
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
    case 'snake':
      return wordsOf(line)
        .map((word) => word.toLowerCase())
        .join('_');
    case 'kebab':
      return wordsOf(line)
        .map((word) => word.toLowerCase())
        .join('-');
    case 'constant':
      return wordsOf(line)
        .map((word) => word.toUpperCase())
        .join('_');
    default:
      return line;
  }
}

export default function BulkTextCaseConverter() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<CaseMode>('title');
  const [trimLines, setTrimLines] = useState(true);
  const [dedupe, setDedupe] = useState(false);
  const [sortLines, setSortLines] = useState(false);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    let lines = input.split('\n');
    if (trimLines) lines = lines.map((line) => line.trim());
    lines = lines.filter((line) => line.length > 0);
    lines = lines.map((line) => convertLine(line, mode));
    if (dedupe) lines = Array.from(new Set(lines));
    if (sortLines) lines = [...lines].sort((a, b) => a.localeCompare(b));
    return lines.join('\n');
  }, [input, mode, trimLines, dedupe, sortLines]);

  const inputCount = input.split('\n').filter((line) => line.trim().length > 0).length;
  const outputCount = output.split('\n').filter((line) => line.length > 0).length;

  const copyOutput = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be blocked by the browser
    }
  };

  const downloadOutput = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk-case-converted.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400">
            <Type className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Bulk Text Case Converter</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Paste any number of lines and convert every line to the case you need.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {CASE_OPTIONS.map((option) => (
            <button
              key={option.val}
              type="button"
              onClick={() => setMode(option.val)}
              title={option.example}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                mode === option.val
                  ? 'bg-sky-500 text-black'
                  : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-white/20'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-600 dark:text-gray-300">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={trimLines} onChange={(e) => setTrimLines(e.target.checked)} className="accent-sky-500" />
            Trim whitespace
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={dedupe} onChange={(e) => setDedupe(e.target.checked)} className="accent-sky-500" />
            Remove duplicates
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={sortLines} onChange={(e) => setSortLines(e.target.checked)} className="accent-sky-500" />
            Sort A → Z
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Input</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{inputCount} lines</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={14}
            placeholder={'hello world\nGoogle Analytics\nmy product name'}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-sm font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Converted Output</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{outputCount} lines</span>
          </div>
          <textarea
            value={output}
            readOnly
            rows={14}
            placeholder="Converted lines appear here"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-sky-50/50 dark:bg-gray-950 text-sm font-mono text-gray-900 dark:text-white focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          100% local conversion · Your text never leaves the browser
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setInput('')}
            className="px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-xs text-gray-600 dark:text-gray-300 font-bold flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
          <button
            type="button"
            onClick={copyOutput}
            disabled={!output}
            className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-black text-xs font-bold flex items-center gap-1"
          >
            {copied ? <Sparkles className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Output'}
          </button>
          <button
            type="button"
            onClick={downloadOutput}
            disabled={!output}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black text-xs font-bold flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" /> Download .txt
          </button>
        </div>
      </div>
    </div>
  );
}
