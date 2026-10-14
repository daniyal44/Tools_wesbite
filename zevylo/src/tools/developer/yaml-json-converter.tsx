'use client';

import React, { useState, useMemo } from 'react';
import { ArrowRightLeft, Copy, Check, RotateCcw } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

// Simple recursive JSON to YAML serializer
const jsonToYaml = (obj: unknown, indent = 0): string => {
  const pad = '  '.repeat(indent);
  if (obj === null) return 'null';
  if (typeof obj === 'boolean' || typeof obj === 'number') return String(obj);
  if (typeof obj === 'string') {
    if (obj.includes('\n') || obj.includes(':') || obj.includes('#')) {
      return `"${obj.replace(/"/g, '\\"')}"`;
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    return obj
      .map((item) => {
        if (typeof item === 'object' && item !== null) {
          const nested = jsonToYaml(item, indent + 1).trim();
          return `${pad}- ${nested}`;
        }
        return `${pad}- ${jsonToYaml(item, indent)}`;
      })
      .join('\n');
  }
  if (typeof obj === 'object') {
    const keys = Object.keys(obj as Record<string, unknown>);
    if (keys.length === 0) return '{}';
    return keys
      .map((k) => {
        const val = (obj as Record<string, unknown>)[k];
        if (typeof val === 'object' && val !== null) {
          if (Array.isArray(val) && val.length === 0) return `${pad}${k}: []`;
          if (!Array.isArray(val) && Object.keys(val).length === 0) return `${pad}${k}: {}`;
          return `${pad}${k}:\n${jsonToYaml(val, indent + 1)}`;
        }
        return `${pad}${k}: ${jsonToYaml(val, indent)}`;
      })
      .join('\n');
  }
  return String(obj);
};

// Basic robust YAML line-by-line parser to JSON
const yamlToJson = (yamlStr: string): string => {
  const lines = yamlStr.split('\n');
  const root: Record<string, unknown> = {};
  const stack: Array<{ obj: Record<string, unknown> | unknown[]; indent: number; key?: string }> = [
    { obj: root, indent: -1 },
  ];

  for (const rawLine of lines) {
    if (!rawLine.trim() || rawLine.trim().startsWith('#')) continue;

    const indent = rawLine.search(/\S/);
    const line = rawLine.trim();

    // Pop stack until parent indent is lower
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].obj;

    // Handle array items
    if (line.startsWith('- ')) {
      const itemVal = line.slice(2).trim();
      let parsedVal: unknown = itemVal;
      if (itemVal === 'true') parsedVal = true;
      else if (itemVal === 'false') parsedVal = false;
      else if (itemVal === 'null') parsedVal = null;
      else if (!isNaN(Number(itemVal)) && itemVal !== '') parsedVal = Number(itemVal);

      if (Array.isArray(parent)) {
        parent.push(parsedVal);
      }
      continue;
    }

    // Handle key: value
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim().replace(/^['"]|['"]$/g, '');
      const valStr = line.slice(colonIdx + 1).trim();

      if (!valStr) {
        // Object or array follows
        const newObj: Record<string, unknown> = {};
        if (!Array.isArray(parent)) {
          parent[key] = newObj;
          stack.push({ obj: newObj, indent, key });
        }
      } else {
        let parsedVal: unknown = valStr;
        if (valStr === 'true') parsedVal = true;
        else if (valStr === 'false') parsedVal = false;
        else if (valStr === 'null') parsedVal = null;
        else if (valStr === '[]') parsedVal = [];
        else if (valStr === '{}') parsedVal = {};
        else if (!isNaN(Number(valStr)) && valStr !== '') parsedVal = Number(valStr);
        else if (valStr.startsWith('"') && valStr.endsWith('"')) parsedVal = valStr.slice(1, -1);

        if (!Array.isArray(parent)) {
          parent[key] = parsedVal;
        }
      }
    }
  }

  return JSON.stringify(root, null, 2);
};

export default function YamlJsonConverter() {
  const [direction, setDirection] = useState<'jsonToYaml' | 'yamlToJson'>('jsonToYaml');
  const [input, setInput] = useState(
    JSON.stringify(
      {
        name: 'my-service',
        version: '1.2.0',
        port: 8080,
        enabled: true,
        tags: ['web', 'api', 'production'],
        database: {
          host: 'postgres-db',
          maxConnections: 20,
        },
      },
      null,
      2
    )
  );
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: null };
    try {
      if (direction === 'jsonToYaml') {
        const parsed = JSON.parse(input);
        return { output: jsonToYaml(parsed), error: null };
      } else {
        return { output: yamlToJson(input), error: null };
      }
    } catch (err: unknown) {
      return { output: '', error: (err as Error).message || 'Invalid syntax' };
    }
  }, [input, direction]);

  const handleCopy = async () => {
    if (!output) return;
    await copyToClipboard(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const switchDirection = () => {
    if (output && !error) {
      setInput(output);
    }
    setDirection((prev) => (prev === 'jsonToYaml' ? 'yamlToJson' : 'jsonToYaml'));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          <button
            onClick={() => setDirection('jsonToYaml')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              direction === 'jsonToYaml'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            JSON → YAML
          </button>
          <button
            onClick={() => setDirection('yamlToJson')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              direction === 'yamlToJson'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            YAML → JSON
          </button>
        </div>

        <button
          onClick={switchDirection}
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-gray-700 dark:text-gray-300"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          Swap & Invert
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Input */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>{direction === 'jsonToYaml' ? 'Input JSON' : 'Input YAML'}</span>
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
            rows={14}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-xs leading-relaxed"
            placeholder={direction === 'jsonToYaml' ? '{\n  "key": "value"\n}' : 'key: value'}
          />
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-xs text-red-600">
              {error}
            </div>
          )}
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>{direction === 'jsonToYaml' ? 'Converted YAML' : 'Converted JSON'}</span>
            {output && (
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
            value={output}
            rows={14}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-xs text-blue-600 dark:text-blue-400 leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
