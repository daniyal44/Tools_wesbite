'use client';

import React, { useState, useMemo } from 'react';
import { Table, Copy, Check, Plus, Trash2, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

type Alignment = 'left' | 'center' | 'right';

export default function MarkdownTableGenerator() {
  const [headers, setHeaders] = useState<string[]>(['Feature', 'Plan Free', 'Plan Pro']);
  const [alignments, setAlignments] = useState<Alignment[]>(['left', 'center', 'right']);
  const [rows, setRows] = useState<string[][]>([
    ['Active Projects', '3', 'Unlimited'],
    ['Storage Space', '500 MB', '50 GB'],
    ['SSL Encryption', 'Yes', 'Yes'],
    ['Priority Support', 'No', '24/7 Live'],
  ]);
  const [viewMode, setViewMode] = useState<'markdown' | 'html'>('markdown');
  const [copied, setCopied] = useState(false);

  const addColumn = () => {
    if (headers.length >= 8) return;
    setHeaders((prev) => [...prev, `Column ${prev.length + 1}`]);
    setAlignments((prev) => [...prev, 'left']);
    setRows((prev) => prev.map((r) => [...r, 'Value']));
  };

  const removeColumn = (colIdx: number) => {
    if (headers.length <= 2) return;
    setHeaders((prev) => prev.filter((_, i) => i !== colIdx));
    setAlignments((prev) => prev.filter((_, i) => i !== colIdx));
    setRows((prev) => prev.map((r) => r.filter((_, i) => i !== colIdx)));
  };

  const addRow = () => {
    if (rows.length >= 20) return;
    const newRow = new Array(headers.length).fill('Cell');
    setRows((prev) => [...prev, newRow]);
  };

  const removeRow = (rowIdx: number) => {
    if (rows.length <= 1) return;
    setRows((prev) => prev.filter((_, i) => i !== rowIdx));
  };

  const toggleAlign = (colIdx: number) => {
    setAlignments((prev) =>
      prev.map((a, i) => {
        if (i !== colIdx) return a;
        if (a === 'left') return 'center';
        if (a === 'center') return 'right';
        return 'left';
      })
    );
  };

  const markdownOutput = useMemo(() => {
    // Header
    const headerRow = `| ${headers.join(' | ')} |`;

    // Separators
    const separatorRow = `| ${alignments
      .map((a) => {
        if (a === 'center') return ':---:';
        if (a === 'right') return '---:';
        return ':---';
      })
      .join(' | ')} |`;

    // Data rows
    const dataRows = rows.map((r) => `| ${r.join(' | ')} |`).join('\n');

    return `${headerRow}\n${separatorRow}\n${dataRows}`;
  }, [headers, alignments, rows]);

  const htmlOutput = useMemo(() => {
    const thead = `  <thead>\n    <tr>\n${headers.map((h, i) => `      <th style="text-align: ${alignments[i]}">${h}</th>`).join('\n')}\n    </tr>\n  </thead>`;
    const tbody = `  <tbody>\n${rows
      .map(
        (r) =>
          `    <tr>\n${r.map((cell, i) => `      <td style="text-align: ${alignments[i]}">${cell}</td>`).join('\n')}\n    </tr>`
      )
      .join('\n')}\n  </tbody>`;
    return `<table>\n${thead}\n${tbody}\n</table>`;
  }, [headers, alignments, rows]);

  const output = viewMode === 'markdown' ? markdownOutput : htmlOutput;

  const handleCopy = async () => {
    await copyToClipboard(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Visual Editor Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Table className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Interactive Table Grid ({rows.length} rows × {headers.length} cols)
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={addColumn}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 text-xs font-bold text-gray-700 dark:text-gray-300"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Column
            </button>
            <button
              onClick={addRow}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Row
            </button>
          </div>
        </div>

        {/* Grid Table */}
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/60 divide-x divide-gray-200 dark:divide-gray-800 border-b border-gray-200 dark:border-gray-800">
                {headers.map((h, colIdx) => (
                  <th key={colIdx} className="p-2 min-w-[140px]">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <button
                        onClick={() => toggleAlign(colIdx)}
                        className="p-1 rounded text-gray-400 hover:text-blue-600"
                        title={`Alignment: ${alignments[colIdx]}`}
                      >
                        {alignments[colIdx] === 'center' ? (
                          <AlignCenter className="w-3.5 h-3.5 text-blue-600" />
                        ) : alignments[colIdx] === 'right' ? (
                          <AlignRight className="w-3.5 h-3.5 text-blue-600" />
                        ) : (
                          <AlignLeft className="w-3.5 h-3.5 text-blue-600" />
                        )}
                      </button>
                      <input
                        type="text"
                        value={h}
                        onChange={(e) => {
                          const val = e.target.value;
                          setHeaders((prev) => prev.map((item, idx) => (idx === colIdx ? val : item)));
                        }}
                        className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs font-bold"
                      />
                      {headers.length > 2 && (
                        <button
                          onClick={() => removeColumn(colIdx)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
                <th className="w-10 p-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 font-medium">
              {rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="divide-x divide-gray-200 dark:divide-gray-800">
                  {row.map((cell, colIdx) => (
                    <td key={colIdx} className="p-2">
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => {
                          const val = e.target.value;
                          setRows((prev) =>
                            prev.map((r, rI) =>
                              rI === rowIdx ? r.map((c, cI) => (cI === colIdx ? val : c)) : r
                            )
                          );
                        }}
                        className="w-full bg-transparent px-2 py-1 text-xs border border-transparent hover:border-gray-300 dark:hover:border-gray-700 focus:border-blue-500 rounded"
                      />
                    </td>
                  ))}
                  <td className="p-2 text-center">
                    {rows.length > 1 && (
                      <button
                        onClick={() => removeRow(rowIdx)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Export Output */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('markdown')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'markdown'
                  ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Markdown Syntax
            </button>
            <button
              onClick={() => setViewMode('html')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'html'
                  ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              HTML Table
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : `Copy ${viewMode === 'markdown' ? 'Markdown' : 'HTML'}`}
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 font-mono text-xs text-gray-800 dark:text-gray-200 overflow-x-auto whitespace-pre">
          {output}
        </pre>
      </div>
    </div>
  );
}
