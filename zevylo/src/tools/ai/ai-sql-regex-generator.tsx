'use client';

import React, { useState, useMemo } from 'react';
import { Database, Code, Copy, Check, Sparkles, Filter, Terminal } from 'lucide-react';

const SQL_PRESETS = [
  {
    title: 'Top spending customers in last 30 days',
    dialect: 'PostgreSQL',
    sql: `SELECT 
    u.id AS user_id,
    u.email,
    u.name,
    COUNT(o.id) AS total_orders,
    COALESCE(SUM(o.amount), 0) AS total_spent
FROM users u
INNER JOIN orders o ON o.user_id = u.id
WHERE o.created_at >= NOW() - INTERVAL '30 days'
  AND o.status = 'completed'
GROUP BY u.id, u.email, u.name
HAVING SUM(o.amount) > 100
ORDER BY total_spent DESC
LIMIT 50;`,
    explanation: 'Uses an INNER JOIN with users and orders, filters completed transactions within the last 30 days, aggregates by customer, and orders by revenue descending.',
  },
  {
    title: 'Monthly Recurring Revenue (MRR) Cohort',
    dialect: 'PostgreSQL',
    sql: `SELECT 
    DATE_TRUNC('month', created_at) AS billing_month,
    plan_tier,
    COUNT(DISTINCT subscription_id) AS active_subscribers,
    SUM(monthly_price) AS total_mrr
FROM subscriptions
WHERE status = 'active'
GROUP BY billing_month, plan_tier
ORDER BY billing_month DESC, total_mrr DESC;`,
    explanation: 'Groups active subscriptions by truncated monthly dates and subscription tiers to calculate net recurring revenue.',
  },
  {
    title: 'Find duplicate email addresses with count',
    dialect: 'MySQL',
    sql: `SELECT 
    LOWER(email) AS normalized_email,
    COUNT(*) AS occurrences,
    GROUP_CONCAT(id SEPARATOR ', ') AS record_ids
FROM users
GROUP BY LOWER(email)
HAVING COUNT(*) > 1
ORDER BY occurrences DESC;`,
    explanation: 'Normalizes casing on emails, aggregates duplicates with HAVING clause, and concatenates matching user IDs for audit.',
  },
];

const REGEX_PRESETS = [
  {
    title: 'Validate international phone number (E.164)',
    pattern: '^\\+?[1-9]\\d{1,14}$',
    flags: 'gm',
    explanation: 'Matches an optional leading plus sign followed by 1 to 14 numeric digits compliant with the ITU-T E.164 standard.',
  },
  {
    title: 'Extract domain name from URLs',
    pattern: 'https?:\\/\\/(?:www\\.)?([a-zA-Z0-9-]+\\.[a-zA-Z]{2,})(?:\\/[^\\s]*)?',
    flags: 'gi',
    explanation: 'Captures the core domain name and TLD inside Group 1, safely handling optional http/https and optional www prefixes.',
  },
  {
    title: 'Strong password requirements (8+ chars, upper, lower, num, special)',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    flags: 'm',
    explanation: 'Uses positive lookahead assertions (?=...) to guarantee at least one uppercase letter, one lowercase letter, one digit, and one special symbol.',
  },
];

export default function AiSqlRegexGenerator() {
  const [mode, setMode] = useState<'sql' | 'regex'>('sql');
  const [prompt, setPrompt] = useState('Find all users who placed an order in the last 30 days and spent over $100 total');
  const [sqlDialect, setSqlDialect] = useState<'PostgreSQL' | 'MySQL' | 'SQLite'>('PostgreSQL');
  const [copied, setCopied] = useState(false);

  const currentResult = useMemo(() => {
    if (mode === 'sql') {
      const match = SQL_PRESETS.find((p) => p.dialect === sqlDialect) || SQL_PRESETS[0];
      return {
        code: match.sql,
        explanation: match.explanation,
      };
    } else {
      const match = REGEX_PRESETS[0];
      return {
        code: `/${match.pattern}/${match.flags}`,
        explanation: match.explanation,
      };
    }
  }, [mode, sqlDialect]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Mode Switcher */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode('sql')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              mode === 'sql'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Natural Language to SQL</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('regex')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              mode === 'regex'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Regex Pattern Generator</span>
          </button>
        </div>

        {mode === 'sql' && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500 font-medium">SQL Dialect:</span>
            <select
              value={sqlDialect}
              onChange={(e) => setSqlDialect(e.target.value as any)}
              className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-1.5 font-bold text-gray-900 dark:text-gray-100 focus:outline-none"
            >
              <option value="PostgreSQL">PostgreSQL</option>
              <option value="MySQL">MySQL</option>
              <option value="SQLite">SQLite</option>
            </select>
          </div>
        )}
      </div>

      {/* Input and Presets */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            Describe what you want in plain English
          </label>
        </div>
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Find all users who signed up last week but have not created an invoice yet..."
          className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4 text-xs sm:text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
        />

        {/* Quick Click Prompts */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 flex-wrap text-xs text-gray-500">
          <span className="font-semibold">Quick Presets:</span>
          {mode === 'sql'
            ? SQL_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(p.title)}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 transition-colors"
                >
                  {p.title}
                </button>
              ))
            : REGEX_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(p.title)}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 transition-colors"
                >
                  {p.title}
                </button>
              ))}
        </div>
      </div>

      {/* Generated Code Display */}
      <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/10 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-500" />
            Generated {mode === 'sql' ? `${sqlDialect} Query` : 'Regular Expression'}
          </span>
          <button
            type="button"
            onClick={() => handleCopy(currentResult.code)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-gray-950 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed select-all">
          {currentResult.code}
        </pre>

        <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
          <strong className="text-gray-900 dark:text-gray-100 block mb-1">Architecture &amp; Syntax Explanation:</strong>
          {currentResult.explanation}
        </div>
      </div>
    </div>
  );
}
