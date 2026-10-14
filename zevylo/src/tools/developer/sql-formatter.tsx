'use client';

import React, { useState } from 'react';
import { Database, Copy, Check, RotateCcw, Sparkles } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function SqlFormatter() {
  const [sql, setSql] = useState(
    'select u.id, u.username, u.email, count(o.id) as total_orders from users u left join orders o on u.id = o.user_id where u.status = "active" and u.created_at >= "2024-01-01" group by u.id, u.username, u.email having count(o.id) > 5 order by total_orders desc limit 50;'
  );
  const [copied, setCopied] = useState(false);

  const formatSql = (raw: string) => {
    if (!raw.trim()) return '';

    const KEYWORDS = [
      'SELECT',
      'FROM',
      'WHERE',
      'AND',
      'OR',
      'LEFT JOIN',
      'RIGHT JOIN',
      'INNER JOIN',
      'OUTER JOIN',
      'CROSS JOIN',
      'JOIN',
      'ON',
      'GROUP BY',
      'HAVING',
      'ORDER BY',
      'LIMIT',
      'OFFSET',
      'UNION ALL',
      'UNION',
      'INSERT INTO',
      'VALUES',
      'UPDATE',
      'SET',
      'DELETE FROM',
      'CREATE TABLE',
      'ALTER TABLE',
      'DROP TABLE',
      'AS',
      'IN',
      'BETWEEN',
      'LIKE',
      'IS NULL',
      'IS NOT NULL',
      'EXISTS',
      'CASE',
      'WHEN',
      'THEN',
      'ELSE',
      'END',
    ];

    let formatted = raw.replace(/\s+/g, ' ').trim();

    // Uppercase all recognized keywords
    KEYWORDS.forEach((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      formatted = formatted.replace(regex, kw);
    });

    // Indent and add line breaks before major query clauses
    const CLAUSES = [
      'SELECT',
      'FROM',
      'WHERE',
      'LEFT JOIN',
      'RIGHT JOIN',
      'INNER JOIN',
      'OUTER JOIN',
      'JOIN',
      'GROUP BY',
      'HAVING',
      'ORDER BY',
      'LIMIT',
      'OFFSET',
      'INSERT INTO',
      'VALUES',
      'UPDATE',
      'SET',
      'DELETE FROM',
    ];

    CLAUSES.forEach((clause) => {
      const regex = new RegExp(`\\s*(${clause})\\s*`, 'gi');
      formatted = formatted.replace(regex, `\n$1 `);
    });

    // Sub-clauses indentation
    formatted = formatted.replace(/\s*(AND|OR|ON)\s+/gi, '\n  $1 ');

    return formatted.trim();
  };

  const output = formatSql(sql);

  const handleCopy = async () => {
    await copyToClipboard(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          SQL Query Formatter
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSql('')}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Formatted'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Input */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>Messy / Unformatted SQL</span>
            <span className="font-mono">{sql.length} chars</span>
          </div>
          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            rows={12}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-xs leading-relaxed"
            placeholder="Paste your raw SQL query here..."
          />
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span className="flex items-center gap-1 text-green-600">
              <Sparkles className="w-3.5 h-3.5" />
              Beautified SQL
            </span>
            <span className="font-mono">{output.split('\n').length} lines</span>
          </div>
          <textarea
            readOnly
            value={output}
            rows={12}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-xs text-blue-600 dark:text-blue-400 leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
