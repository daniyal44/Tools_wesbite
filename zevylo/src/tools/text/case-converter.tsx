'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

type CaseType = 'UPPERCASE' | 'lowercase' | 'Title Case' | 'Sentence case' | 'camelCase' | 'PascalCase' | 'snake_case' | 'kebab-case' | 'CONSTANT_CASE' | 'aLtErNaTiNg cAsE';

export default function CaseConverter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
  };

  const toTitleCase = (str: string) => {
    return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  };

  const toCamelCase = (str: string) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  };

  const toPascalCase = (str: string) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase()).replace(/\s+/g, '');
  };

  const toSnakeCase = (str: string) => {
    return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || '';
  };

  const toKebabCase = (str: string) => {
    return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || '';
  };

  const toConstantCase = (str: string) => {
    return toSnakeCase(str).toUpperCase();
  };

  const toAlternatingCase = (str: string) => {
    return str.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
  };

  const handleConvert = (type: CaseType) => {
    if (!text) return;
    let result = text;
    switch(type) {
      case 'UPPERCASE': result = text.toUpperCase(); break;
      case 'lowercase': result = text.toLowerCase(); break;
      case 'Title Case': result = toTitleCase(text); break;
      case 'Sentence case': result = toSentenceCase(text); break;
      case 'camelCase': result = toCamelCase(text); break;
      case 'PascalCase': result = toPascalCase(text); break;
      case 'snake_case': result = toSnakeCase(text); break;
      case 'kebab-case': result = toKebabCase(text); break;
      case 'CONSTANT_CASE': result = toConstantCase(text); break;
      case 'aLtErNaTiNg cAsE': result = toAlternatingCase(text); break;
    }
    setText(result);
  };

  const handleCopy = async () => {
    const res = await copyToClipboard(text);
    if (res) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const buttons: CaseType[] = [
    'UPPERCASE', 'lowercase', 'Title Case', 'Sentence case',
    'camelCase', 'PascalCase', 'snake_case', 'kebab-case',
    'CONSTANT_CASE', 'aLtErNaTiNg cAsE'
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Case Converter</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">Processed locally in your browser</span>
      </div>

      <textarea
        className="w-full h-64 p-4 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex flex-wrap gap-2">
        {buttons.map(btn => (
          <button
            key={btn}
            onClick={() => handleConvert(btn)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm font-medium dark:text-white transition-colors"
          >
            {btn}
          </button>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setText('')}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
        >
          Clear
        </button>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Results'}
        </button>
      </div>
    </div>
  );
}
