'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Check, Copy, Info, AlertTriangle } from 'lucide-react';

export default function ProfitMarginCalculator() {
  const [cost, setCost] = useState('');
  const [revenue, setRevenue] = useState('');
  const [marginInput, setMarginInput] = useState('');
  const [mode, setMode] = useState<'price' | 'margin'>('price');
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const c = parseFloat(cost);
    if (isNaN(c) || c < 0) return null;

    if (mode === 'price') {
      const r = parseFloat(revenue);
      if (isNaN(r) || r <= 0) return null;
      
      const profit = r - c;
      const margin = (profit / r) * 100;
      const markup = (profit / c) * 100;
      
      return { cost: c, revenue: r, profit, margin, markup };
    } else {
      const m = parseFloat(marginInput);
      if (isNaN(m) || m >= 100) return null; // Margin can't be 100% or more unless cost is 0
      
      // Margin = (Revenue - Cost) / Revenue
      // Revenue * Margin = Revenue - Cost
      // Cost = Revenue - (Revenue * Margin)
      // Cost = Revenue * (1 - Margin)
      // Revenue = Cost / (1 - Margin)
      
      const marginDecimal = m / 100;
      const r = c === 0 ? 0 : c / (1 - marginDecimal);
      const profit = r - c;
      const markup = c === 0 ? 0 : (profit / c) * 100;
      
      return { cost: c, revenue: r, profit, margin: m, markup };
    }
  };

  const result = calculate();

  const handleCopy = async () => {
    if (result) {
      const text = `Cost: $${result.cost.toFixed(2)}\nRevenue: $${result.revenue.toFixed(2)}\nGross Profit: $${result.profit.toFixed(2)}\nGross Margin: ${result.margin.toFixed(2)}%\nMarkup: ${result.markup.toFixed(2)}%`;
      await copyToClipboard(text);
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

      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 pb-4">
        <button
          onClick={() => { setMode('price'); setMarginInput(''); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'price' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          Calculate from Price
        </button>
        <button
          onClick={() => { setMode('margin'); setRevenue(''); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'margin' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          Calculate from Target Margin
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Cost Price ($)</label>
          <input type="number" min="0" value={cost} onChange={e => setCost(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700" placeholder="e.g. 50" />
        </div>
        
        {mode === 'price' ? (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Selling Price / Revenue ($)</label>
            <input type="number" min="0" value={revenue} onChange={e => setRevenue(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700" placeholder="e.g. 100" />
          </div>
        ) : (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Target Gross Margin (%)</label>
            <input type="number" min="0" max="99.99" value={marginInput} onChange={e => setMarginInput(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700" placeholder="e.g. 50" />
          </div>
        )}
      </div>

      {result && (
        <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 relative">
          <button onClick={handleCopy} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Gross Profit</p>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">${result.profit.toFixed(2)}</div>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Gross Margin</p>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.margin.toFixed(2)}%</div>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Markup</p>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{result.markup.toFixed(2)}%</div>
            </div>
            {mode === 'margin' && (
              <div className="md:col-span-2 lg:col-span-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Required Selling Price</p>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">${result.revenue.toFixed(2)}</div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 space-y-4 text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 dark:text-white">Margin vs Markup Difference</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Margin</strong> is your profit as a percentage of your selling price (Revenue). It answers &quot;For every $1 of revenue, how much is profit?&quot;</li>
          <li><strong>Markup</strong> is your profit as a percentage of your cost. It answers &quot;How much extra do I add to my cost to get the selling price?&quot;</li>
        </ul>
      </div>

      <div className="flex items-start gap-2 text-sm text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
        <AlertTriangle className="w-5 h-5 shrink-0" />
        <p><strong>Disclaimer:</strong> This tool is for informational purposes only. Business decisions should be verified with a qualified accountant.</p>
      </div>
    </div>
  );
}
