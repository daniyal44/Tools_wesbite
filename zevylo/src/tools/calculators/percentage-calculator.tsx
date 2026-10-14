'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Check, Copy, Info } from 'lucide-react';

export default function PercentageCalculator() {
  const [mode, setMode] = useState<'whatIs' | 'isWhat' | 'change'>('whatIs');
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [copied, setCopied] = useState(false);

  const calculateResult = () => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    
    if (isNaN(v1) || isNaN(v2)) return null;

    switch (mode) {
      case 'whatIs': // What is X% of Y?
        return {
          result: (v1 * v2) / 100,
          formula: `${v1}% × ${v2} = ${(v1 * v2) / 100}`
        };
      case 'isWhat': // X is what % of Y?
        if (v2 === 0) return { result: 'Infinity', formula: 'Division by zero' };
        return {
          result: (v1 / v2) * 100,
          formula: `(${v1} ÷ ${v2}) × 100 = ${(v1 / v2) * 100}%`
        };
      case 'change': // Percentage change from X to Y
        if (v1 === 0) return { result: 'Infinity', formula: 'Division by zero' };
        const change = ((v2 - v1) / Math.abs(v1)) * 100;
        return {
          result: change,
          formula: `((${v2} - ${v1}) ÷ |${v1}|) × 100 = ${change}%`
        };
    }
  };

  const resultData = calculateResult();

  const handleCopy = async () => {
    if (resultData?.result !== null && resultData?.result !== undefined) {
      await copyToClipboard(String(resultData.result));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
        <Info className="w-4 h-4" />
        Processed locally in your browser
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          {(['whatIs', 'isWhat', 'change'] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setVal1(''); setVal2(''); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === m
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {m === 'whatIs' ? 'What is X% of Y?' : m === 'isWhat' ? 'X is what % of Y?' : 'Percentage Change'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {mode === 'whatIs' ? 'Percentage (X%)' : mode === 'isWhat' ? 'Value (X)' : 'From Value (X)'}
            </label>
            <input
              type="number"
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {mode === 'whatIs' ? 'Value (Y)' : mode === 'isWhat' ? 'Total Value (Y)' : 'To Value (Y)'}
            </label>
            <input
              type="number"
              value={val2}
              onChange={(e) => setVal2(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              placeholder="0"
            />
          </div>
        </div>

        {resultData && (
          <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Result</p>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {typeof resultData.result === 'number' 
                    ? Number.isInteger(resultData.result) 
                      ? resultData.result 
                      : resultData.result.toFixed(4).replace(/\.?0+$/, '')
                    : resultData.result}
                  {(mode === 'isWhat' || mode === 'change') && typeof resultData.result === 'number' ? '%' : ''}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded inline-block">
                  Formula: {resultData.formula}
                </p>
              </div>
              <button
                onClick={handleCopy}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors"
                title="Copy result"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
