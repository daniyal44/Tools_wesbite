'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, Copy, Check, ArrowRightLeft } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function SalesTaxCalculator() {
  const [amount, setAmount] = useState('100');
  const [taxRate, setTaxRate] = useState('8.25');
  const [mode, setMode] = useState<'add' | 'extract'>('add'); // 'add' = Net to Gross, 'extract' = Gross to Net
  const [currency, setCurrency] = useState('$');
  const [copied, setCopied] = useState(false);

  const PRESETS = [0, 5, 8.25, 10, 15, 20];

  const results = useMemo(() => {
    const val = parseFloat(amount);
    const rate = parseFloat(taxRate);

    if (isNaN(val) || val < 0 || isNaN(rate) || rate < 0) return null;

    if (mode === 'add') {
      const net = val;
      const tax = (net * rate) / 100;
      const gross = net + tax;
      return { net, tax, gross };
    } else {
      const gross = val;
      const net = gross / (1 + rate / 100);
      const tax = gross - net;
      return { net, tax, gross };
    }
  }, [amount, taxRate, mode]);

  const handleCopy = async () => {
    if (!results) return;
    const text = `Sales Tax Calculation (${taxRate}%):\nNet Price: ${currency}${results.net.toFixed(2)}\nTax Amount: ${currency}${results.tax.toFixed(2)}\nGross Total: ${currency}${results.gross.toFixed(2)}`;
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Mode Switcher */}
      <div className="flex bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl max-w-md mx-auto">
        <button
          onClick={() => setMode('add')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
            mode === 'add'
              ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
          }`}
        >
          Add Tax (Net → Gross)
        </button>
        <button
          onClick={() => setMode('extract')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
            mode === 'extract'
              ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
          }`}
        >
          Extract Tax (Gross → Net)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Input Panel */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            Tax Parameters
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                {mode === 'add' ? 'Net Price (Before Tax)' : 'Gross Price (Total Including Tax)'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-16 h-11 text-center rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-bold"
                  title="Currency Symbol"
                />
                <input
                  type="number"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 h-11 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-base font-semibold"
                  placeholder="100.00"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Tax Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-base font-semibold"
                placeholder="8.25"
              />
            </div>

            {/* Quick Rate Presets */}
            <div>
              <span className="text-xs text-gray-500 font-medium block mb-2">Popular Tax Rates:</span>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setTaxRate(p.toString())}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      parseFloat(taxRate) === p
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                        : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:border-gray-300'
                    }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-green-600" />
              Tax Breakdown
            </h2>
            {results && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>

          {results ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Net Amount (Before Tax)</span>
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {currency}{results.net.toFixed(2)}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 flex justify-between items-center">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Tax Amount ({taxRate}%)
                </span>
                <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
                  +{currency}{results.tax.toFixed(2)}
                </span>
              </div>

              <div className="p-5 rounded-xl bg-green-50/80 dark:bg-green-950/30 border border-green-200 dark:border-green-900/40 flex justify-between items-center">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-green-700 dark:text-green-400 block">
                    Gross Total
                  </span>
                  <span className="text-2xl font-black text-green-700 dark:text-green-300">
                    {currency}{results.gross.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-sm text-gray-400">
              Enter valid numbers to compute sales tax.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
