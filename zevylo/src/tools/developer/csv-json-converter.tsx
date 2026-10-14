'use client';

import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Copy, Check, Download, AlertCircle } from 'lucide-react';
import { copyToClipboard, downloadFile } from '@/lib/utils';

type Mode = 'csv2json' | 'json2csv';

const DELIMS: { label: string; value: string }[] = [
  { label: 'Comma (,)', value: ',' },
  { label: 'Semicolon (;)', value: ';' },
  { label: 'Tab', value: '\t' },
  { label: 'Pipe (|)', value: '|' },
];

// RFC-4180-style CSV parser: handles quoted fields, escaped quotes (""), and
// delimiters/newlines inside quotes.
function parseCSV(text: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      field += c; i++; continue;
    }
    if (c === '"') { inQuotes = true; i++; continue; }
    if (c === delimiter) { row.push(field); field = ''; i++; continue; }
    if (c === '\r') { i++; continue; }
    if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
    field += c; i++;
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

function csvToJson(text: string, delimiter: string, hasHeader: boolean): string {
  const rows = parseCSV(text, delimiter).filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ''));
  if (rows.length === 0) return '[]';
  if (!hasHeader) return JSON.stringify(rows, null, 2);
  const headers = rows[0];
  const out = rows.slice(1).map((r) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => { obj[h] = r[idx] ?? ''; });
    return obj;
  });
  return JSON.stringify(out, null, 2);
}

function jsonToCsv(text: string, delimiter: string): string {
  const data = JSON.parse(text);
  const arr = Array.isArray(data) ? data : [data];
  if (arr.length === 0) return '';

  const esc = (v: unknown): string => {
    const s = v == null ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v);
    const needsQuote = s.includes(delimiter) || /["\n\r]/.test(s) || /^\s|\s$/.test(s);
    return needsQuote ? '"' + s.replace(/"/g, '""') + '"' : s;
  };

  // Array of objects → keyed columns; array of arrays/primitives → raw rows.
  if (arr.every((x) => x && typeof x === 'object' && !Array.isArray(x))) {
    const keys = Array.from(new Set(arr.flatMap((o) => Object.keys(o as object))));
    const lines = [keys.map(esc).join(delimiter)];
    for (const o of arr) lines.push(keys.map((k) => esc((o as Record<string, unknown>)[k])).join(delimiter));
    return lines.join('\n');
  }
  return arr.map((r) => (Array.isArray(r) ? r.map(esc).join(delimiter) : esc(r))).join('\n');
}

export default function CsvJsonConverter() {
  const [mode, setMode] = useState<Mode>('csv2json');
  const [delimiter, setDelimiter] = useState<string>(',');
  const [hasHeader, setHasHeader] = useState<boolean>(true);
  const [input, setInput] = useState<string>('name,age,city\nAlice,30,London\nBob,25,"Paris, FR"');
  const [copied, setCopied] = useState<boolean>(false);

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: null as string | null };
    try {
      return {
        output: mode === 'csv2json' ? csvToJson(input, delimiter, hasHeader) : jsonToCsv(input, delimiter),
        error: null,
      };
    } catch (e) {
      return { output: '', error: e instanceof Error ? e.message : 'Invalid input.' };
    }
  }, [input, mode, delimiter, hasHeader]);

  const swap = () => {
    setMode((m) => (m === 'csv2json' ? 'json2csv' : 'csv2json'));
    if (output) setInput(output);
  };

  const handleCopy = async () => {
    if (await copyToClipboard(output)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleDownload = () => {
    if (mode === 'csv2json') downloadFile(output, 'data.json', 'application/json');
    else downloadFile(output, 'data.csv', 'text/csv');
  };

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      {/* Controls */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <button
            onClick={() => setMode('csv2json')}
            className={`px-4 py-2 text-xs font-bold transition-colors ${mode === 'csv2json' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            CSV → JSON
          </button>
          <button
            onClick={() => setMode('json2csv')}
            className={`px-4 py-2 text-xs font-bold transition-colors ${mode === 'json2csv' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            JSON → CSV
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Delimiter</label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-1.5 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
          >
            {DELIMS.map((d) => (
              <option key={d.label} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        {mode === 'csv2json' && (
          <label className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
            <input type="checkbox" checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500" />
            First row is header
          </label>
        )}

        <button
          onClick={swap}
          className="ml-auto inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          title="Swap input/output"
        >
          <ArrowLeftRight className="h-3.5 w-3.5" /> Swap
        </button>
      </div>

      {/* Editors */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
            {mode === 'csv2json' ? 'CSV Input' : 'JSON Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={14}
            spellCheck={false}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 font-mono text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y"
            placeholder={mode === 'csv2json' ? 'Paste CSV here...' : 'Paste JSON array here...'}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {mode === 'csv2json' ? 'JSON Output' : 'CSV Output'}
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!output}
                className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button
                onClick={handleDownload}
                disabled={!output}
                className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30"
              >
                <Download className="h-3.5 w-3.5" /> Download
              </button>
            </div>
          </div>
          {error ? (
            <div className="w-full h-[calc(14*1.25rem+2rem)] rounded-xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 p-4 flex items-start gap-2 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span className="font-mono">{error}</span>
            </div>
          ) : (
            <textarea
              value={output}
              readOnly
              rows={14}
              spellCheck={false}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-950 p-4 font-mono text-xs text-gray-900 dark:text-white focus:outline-none resize-y select-all"
            />
          )}
        </div>
      </div>
    </div>
  );
}
