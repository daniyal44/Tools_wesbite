'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Check, Copy, Info, AlertTriangle } from 'lucide-react';

export default function ROICalculator() {
  const [initial, setInitial] = useState('');
  const [final, setFinal] = useState('');
  const [years, setYears] = useState('');
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const init = parseFloat(initial);
    const fin = parseFloat(final);
    const y = parseFloat(years) || 0;

    if (isNaN(init) || isNaN(fin) || init === 0) return null;

    const netProfit = fin - init;
    const roi = (netProfit / init) * 100;
    
    let annualized = null;
    if (y > 0) {
      annualized = (Math.pow(fin / init, 1 / y) - 1) * 100;
    }

    return { netProfit, roi, annualized };
  };

  const result = calculate();

  const handleCopy = async () => {
    if (result) {
      const text = `ROI: ${result.roi.toFixed(2)}%\nNet Profit: ${result.netProfit.toFixed(2)}${result.annualized ? `\nAnnualized ROI: ${result.annualized.toFixed(2)}%` : ''}`;
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Initial Investment ($)</label>
          <input type="number" value={initial} onChange={e => setInitial(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700" placeholder="e.g. 1000" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Final Value ($)</label>
          <input type="number" value={final} onChange={e => setFinal(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700" placeholder="e.g. 1500" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Investment Length (Years - Optional)</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700" placeholder="e.g. 2.5" />
        </div>
      </div>

      {result && (
        <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 relative">
          <button onClick={handleCopy} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Return on Investment (ROI)</p>
              <div className={`text-3xl font-bold ${result.roi >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {result.roi.toFixed(2)}%
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Net Profit/Loss</p>
              <div className={`text-3xl font-bold ${result.netProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                ${Math.abs(result.netProfit).toFixed(2)} {result.netProfit < 0 ? 'Loss' : ''}
              </div>
            </div>
            {result.annualized !== null && (
              <div className="md:col-span-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Annualized ROI</p>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {result.annualized.toFixed(2)}%
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 text-sm text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg mt-8">
        <AlertTriangle className="w-5 h-5 shrink-0" />
        <p><strong>Disclaimer:</strong> This tool is for informational purposes only and does not constitute financial advice. Please consult a qualified financial advisor before making any investment decisions.</p>
      </div>
    </div>
  );
}
