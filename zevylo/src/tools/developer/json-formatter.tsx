'use client';

import React, { useState } from 'react';
import { copyToClipboard, downloadFile } from '@/lib/utils';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState(2);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const syntaxHighlight = (json: string) => {
    if (!json) return '';
    const formatted = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return formatted.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'text-blue-600 dark:text-blue-400'; // number
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'text-red-600 dark:text-red-400'; // key
            } else {
                cls = 'text-green-600 dark:text-green-400'; // string
            }
        } else if (/true|false/.test(match)) {
            cls = 'text-purple-600 dark:text-purple-400'; // boolean
        } else if (/null/.test(match)) {
            cls = 'text-gray-500 dark:text-gray-400'; // null
        }
        return `<span class="${cls}">${match}</span>`;
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">JSON Formatter</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">Processed locally in your browser</span>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <label className="font-semibold dark:text-white">Input JSON</label>
          <textarea
            className="w-full h-[500px] p-4 border rounded-lg resize-none font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
          />
        </div>
        
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="font-semibold dark:text-white">Output</label>
            <div className="flex gap-2">
              <select 
                value={indent} 
                onChange={(e) => setIndent(Number(e.target.value))}
                className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded px-2 text-sm dark:text-white"
              >
                <option value={2}>2 Spaces</option>
                <option value={4}>4 Spaces</option>
              </select>
            </div>
          </div>
          
          <div className="w-full h-[500px] p-4 border rounded-lg overflow-auto bg-gray-50 dark:bg-gray-900 dark:border-gray-700 relative">
            {error ? (
              <div className="text-red-600 dark:text-red-400 font-mono text-sm whitespace-pre-wrap">{error}</div>
            ) : (
              <pre 
                className="font-mono text-sm whitespace-pre-wrap break-words m-0 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: syntaxHighlight(output) }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        <button onClick={formatJSON} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">Format / Validate</button>
        <button onClick={minifyJSON} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md">Minify</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(null); }} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md">Clear</button>
        
        <div className="flex-1"></div>
        
        {output && !error && (
          <>
            <button onClick={() => copyToClipboard(output)} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">Copy Result</button>
            <button onClick={() => downloadFile(output, 'formatted.json', 'application/json')} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md">Download .json</button>
          </>
        )}
      </div>
    </div>
  );
}
