'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Download, Check, Code2, AlertCircle } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

function capitalize(str: string): string {
  if (!str) return 'Item';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateTypeScript(
  jsonObj: unknown,
  rootName: string = 'RootObject',
  useTypeAlias: boolean = false,
  makeReadonly: boolean = false
): string {
  const interfaces: string[] = [];
  const generatedNames = new Set<string>();

  function parseObject(obj: unknown, interfaceName: string): string {
    if (obj === null) return 'null';
    if (typeof obj !== 'object') return typeof obj;

    if (Array.isArray(obj)) {
      if (obj.length === 0) return 'any[]';
      const sampleItem = obj[0];
      const itemType = parseObject(sampleItem, `${interfaceName}Item`);
      return `${itemType}[]`;
    }

    // It's a key-value object
    const fields: string[] = [];
    const record = obj as Record<string, unknown>;
    const keys = Object.keys(record);

    for (const key of keys) {
      const val = record[key];
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
      const readonlyPrefix = makeReadonly ? 'readonly ' : '';

      if (val === null) {
        fields.push(`  ${readonlyPrefix}${safeKey}: any;`);
      } else if (Array.isArray(val)) {
        if (val.length === 0) {
          fields.push(`  ${readonlyPrefix}${safeKey}: any[];`);
        } else if (typeof val[0] === 'object' && val[0] !== null) {
          let nestedName = capitalize(key);
          if (nestedName.endsWith('s')) nestedName = nestedName.slice(0, -1);
          if (!nestedName) nestedName = 'Item';
          const childType = parseObject(val[0], nestedName);
          fields.push(`  ${readonlyPrefix}${safeKey}: ${childType}[];`);
        } else {
          const primitiveType = typeof val[0];
          fields.push(`  ${readonlyPrefix}${safeKey}: ${primitiveType}[];`);
        }
      } else if (typeof val === 'object') {
        const nestedName = capitalize(key);
        const childType = parseObject(val, nestedName);
        fields.push(`  ${readonlyPrefix}${safeKey}: ${childType};`);
      } else {
        fields.push(`  ${readonlyPrefix}${safeKey}: ${typeof val};`);
      }
    }

    // Register interface if not already done
    let finalName = interfaceName;
    let counter = 1;
    while (generatedNames.has(finalName)) {
      finalName = `${interfaceName}_${counter++}`;
    }
    generatedNames.add(finalName);

    const decl = useTypeAlias
      ? `export type ${finalName} = {\n${fields.join('\n')}\n};`
      : `export interface ${finalName} {\n${fields.join('\n')}\n}`;

    interfaces.push(decl);
    return finalName;
  }

  parseObject(jsonObj, rootName);

  return interfaces.reverse().join('\n\n');
}

const DEFAULT_JSON = `{
  "id": 101,
  "name": "Zevylo Platform",
  "isLive": true,
  "stats": {
    "totalTools": 32,
    "speedMs": 1.2
  },
  "tags": ["tools", "privacy", "fast"],
  "maintainers": [
    {
      "name": "Deepmind Engineer",
      "email": "dev@zevylo.com"
    }
  ]
}`;

export default function JsonToTypeScript() {
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);
  const [rootName, setRootName] = useState('ApiResponse');
  const [useTypeAlias, setUseTypeAlias] = useState(false);
  const [makeReadonly, setMakeReadonly] = useState(false);
  const [copied, setCopied] = useState(false);

  const { tsOutput, error } = useMemo(() => {
    if (!jsonInput.trim()) {
      return { tsOutput: '', error: null };
    }
    try {
      const parsed = JSON.parse(jsonInput);
      const code = generateTypeScript(parsed, rootName || 'RootObject', useTypeAlias, makeReadonly);
      return { tsOutput: code, error: null };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Invalid JSON format';
      return { tsOutput: '', error: msg };
    }
  }, [jsonInput, rootName, useTypeAlias, makeReadonly]);

  const handleCopy = async () => {
    if (!tsOutput) return;
    await copyToClipboard(tsOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!tsOutput) return;
    const blob = new Blob([tsOutput], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${rootName.toLowerCase() || 'types'}.d.ts`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Configuration Bar */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-gray-100">TypeScript Generator Options</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Auto-detects nested models, arrays, and primitives</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={!tsOutput}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Types!' : 'Copy TypeScript'}</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={!tsOutput}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download .d.ts</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
              Root Interface Name
            </label>
            <input
              type="text"
              value={rootName}
              onChange={(e) => setRootName(e.target.value.replace(/[^a-zA-Z0-9_$]/g, ''))}
              placeholder="RootObject"
              className="w-full h-9 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs px-3 font-mono font-medium"
            />
          </div>

          <div className="flex items-center gap-4 sm:col-span-2 pt-5">
            <label className="inline-flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={useTypeAlias}
                onChange={(e) => setUseTypeAlias(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Generate `type` aliases instead of `interface`</span>
            </label>
            <label className="inline-flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={makeReadonly}
                onChange={(e) => setMakeReadonly(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Add `readonly` to fields</span>
            </label>
          </div>
        </div>
      </div>

      {/* Editor & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* JSON Input */}
        <div className="space-y-2 flex flex-col">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
            <span>Input JSON Payload</span>
            <button
              onClick={() => {
                try {
                  const p = JSON.parse(jsonInput);
                  setJsonInput(JSON.stringify(p, null, 2));
                } catch {}
              }}
              className="text-blue-600 hover:underline"
            >
              Beautify JSON
            </button>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={18}
            className="w-full flex-1 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 p-4 font-mono text-xs leading-relaxed outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
            placeholder="Paste raw JSON here..."
          />
        </div>

        {/* TypeScript Output */}
        <div className="space-y-2 flex flex-col">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
            <span>Generated TypeScript Output</span>
            <span className="text-gray-400">Pure Client-side</span>
          </div>

          {error ? (
            <div className="flex-1 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 p-6 flex flex-col items-center justify-center text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <p className="font-bold text-red-700 dark:text-red-400 text-sm">JSON Syntax Error</p>
              <p className="text-xs text-red-600 dark:text-red-300 font-mono">{error}</p>
            </div>
          ) : (
            <div className="flex-1 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-900 p-4 font-mono text-xs text-blue-300 overflow-auto leading-relaxed shadow-inner">
              <pre className="whitespace-pre">{tsOutput || '// Paste JSON on the left to see TypeScript interfaces'}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
