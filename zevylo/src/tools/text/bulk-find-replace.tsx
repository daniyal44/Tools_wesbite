'use client';

import React, { useMemo, useState } from 'react';
import { Replace, Plus, Trash2, Copy, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface Rule {
  id: string;
  find: string;
  replace: string;
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default function BulkFindReplace() {
  const [input, setInput] = useState('');
  const [rules, setRules] = useState<Rule[]>([
    { id: 'rule-1', find: '', replace: '' },
  ]);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateRule = (id: string, field: 'find' | 'replace', value: string) => {
    setRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, [field]: value } : rule)));
  };

  const addRule = () => {
    setRules((prev) => [...prev, { id: `rule-${Date.now()}`, find: '', replace: '' }]);
  };

  const removeRule = (id: string) => {
    setRules((prev) => (prev.length === 1 ? prev : prev.filter((rule) => rule.id !== id)));
  };

  const { output, totalReplacements, error } = useMemo(() => {
    let text = input;
    let total = 0;
    const flags = caseSensitive ? 'g' : 'gi';

    try {
      for (const rule of rules) {
        if (!rule.find) continue;

        if (useRegex) {
          const regex = new RegExp(rule.find, flags);
          const matches = text.match(regex);
          if (matches) total += matches.length;
          text = text.replace(regex, rule.replace);
        } else {
          const pattern = wholeWord ? `\\b${escapeRegExp(rule.find)}\\b` : escapeRegExp(rule.find);
          const regex = new RegExp(pattern, flags);
          const matches = text.match(regex);
          if (matches) total += matches.length;
          text = text.replace(regex, () => rule.replace);
        }
      }
    } catch {
      return { output: input, totalReplacements: 0, error: 'Invalid regular expression. Check your find patterns.' };
    }

    return { output: text, totalReplacements: total, error: '' };
  }, [input, rules, caseSensitive, wholeWord, useRegex]);

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard permission denied
    }
  };

  const downloadResult = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk-find-replace-result.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-3">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400">
            <Replace className="w-8 h-8" />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Bulk Find &amp; Replace</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Replace many different terms in one pass. Add a rule for each word or pattern, then copy or download the result.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Replacement Rules
              </h3>
              <button
                type="button"
                onClick={addRule}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Rule
              </button>
            </div>

            <div className="space-y-2">
              {rules.map((rule, idx) => (
                <div key={rule.id} className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-400 w-4 shrink-0">{idx + 1}</span>
                  <input
                    type="text"
                    value={rule.find}
                    onChange={(e) => updateRule(rule.id, 'find', e.target.value)}
                    placeholder={useRegex ? 'Pattern (e.g. \\d{3})' : 'Find text'}
                    className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                  <span className="text-gray-400 text-xs shrink-0">→</span>
                  <input
                    type="text"
                    value={rule.replace}
                    onChange={(e) => updateRule(rule.id, 'replace', e.target.value)}
                    placeholder={useRegex ? 'Replace ($1 ok)' : 'Replace with'}
                    className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => removeRule(rule.id)}
                    disabled={rules.length === 1}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-400 disabled:opacity-30 shrink-0"
                    title="Remove rule"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={caseSensitive}
                  onChange={(e) => setCaseSensitive(e.target.checked)}
                  className="accent-blue-500"
                />
                Case sensitive
              </label>
              <label className={`flex items-center gap-1.5 cursor-pointer ${useRegex ? 'opacity-40' : ''}`}>
                <input
                  type="checkbox"
                  checked={wholeWord}
                  disabled={useRegex}
                  onChange={(e) => setWholeWord(e.target.checked)}
                  className="accent-blue-500"
                />
                Whole word only
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useRegex}
                  onChange={(e) => setUseRegex(e.target.checked)}
                  className="accent-blue-500"
                />
                Regex mode
              </label>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
              Input Text
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              placeholder="Paste your text, CSV, code or list here..."
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y font-mono"
            />
            <div className="flex items-center justify-between text-[11px] text-gray-400">
              <span>{input.length.toLocaleString()} characters · {input.split('\n').length.toLocaleString()} lines</span>
              {input && (
                <button type="button" onClick={() => setInput('')} className="hover:text-red-400 font-semibold">
                  Clear input
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
              Result
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyResult}
                disabled={!output}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 disabled:opacity-40 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button
                type="button"
                onClick={downloadResult}
                disabled={!output}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-xs font-bold text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>

          <textarea
            readOnly
            value={output}
            rows={15}
            placeholder="The replaced text appears here..."
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none resize-y font-mono"
          />

          <div className="flex items-center justify-between flex-wrap gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 font-bold">
              {totalReplacements.toLocaleString()} replacement{totalReplacements === 1 ? '' : 's'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              100% client-side · your text never leaves the browser
            </span>
          </div>

          {error && (
            <p className="text-xs text-red-500 font-semibold px-1">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
