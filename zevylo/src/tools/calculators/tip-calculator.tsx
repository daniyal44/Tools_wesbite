'use client';

import React, { useState, useMemo } from 'react';
import { Utensils, Users, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState('85');
  const [tipPercent, setTipPercent] = useState('18');
  const [people, setPeople] = useState(2);
  const [roundUp, setRoundUp] = useState(false);
  const [currency, setCurrency] = useState('$');
  const [copied, setCopied] = useState(false);

  const PRESETS = [10, 15, 18, 20, 25];

  const results = useMemo(() => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercent);

    if (isNaN(bill) || bill <= 0 || isNaN(tip) || tip < 0) return null;

    let tipAmount = (bill * tip) / 100;
    let total = bill + tipAmount;

    if (roundUp) {
      total = Math.ceil(total);
      tipAmount = total - bill;
    }

    const count = people || 1;
    const perPersonBill = bill / count;
    const perPersonTip = tipAmount / count;
    const perPersonTotal = total / count;

    return {
      bill,
      tipAmount,
      total,
      perPersonBill,
      perPersonTip,
      perPersonTotal,
    };
  }, [billAmount, tipPercent, people, roundUp]);

  const handleCopy = async () => {
    if (!results) return;
    const text = `Bill Split Summary (${people} people):\nTotal Bill: ${currency}${results.total.toFixed(2)} (Tip: ${currency}${results.tipAmount.toFixed(2)})\nPer Person Total: ${currency}${results.perPersonTotal.toFixed(2)}`;
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Input Panel */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-indigo-600" />
            Check & Gratuity
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Bill Subtotal
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-14 text-center rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold"
                />
                <input
                  type="number"
                  step="any"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  className="flex-1 h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-base font-semibold"
                  placeholder="85.00"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Tip Percentage
                </label>
                <span className="text-xs font-bold font-mono text-indigo-600">{tipPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={tipPercent}
                onChange={(e) => setTipPercent(e.target.value)}
                className="w-full accent-indigo-600 mb-2"
              />
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setTipPercent(p.toString())}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      parseFloat(tipPercent) === p
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                        : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  Split Among Diners
                </label>
                <span className="text-xs font-bold text-indigo-600">{people} {people === 1 ? 'Person' : 'People'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={people}
                onChange={(e) => setPeople(parseInt(e.target.value, 10) || 1)}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="round"
                checked={roundUp}
                onChange={(e) => setRoundUp(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 accent-indigo-600"
              />
              <label htmlFor="round" className="text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer">
                Round up total bill to whole dollar
              </label>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Split Breakdown
            </h2>
            {results && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-gray-600 dark:text-gray-300"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>

          {results ? (
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 border border-indigo-200 dark:border-indigo-900/40">
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                  Total Per Person
                </span>
                <div className="text-4xl font-black text-gray-900 dark:text-gray-100 mt-1">
                  {currency}{results.perPersonTotal.toFixed(2)}
                </div>
                {people > 1 && (
                  <span className="text-xs text-indigo-600/80 dark:text-indigo-400/80 font-medium">
                    Includes {currency}{results.perPersonTip.toFixed(2)} tip per person
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500 block mb-0.5">Total Tip</span>
                  <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    +{currency}{results.tipAmount.toFixed(2)}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500 block mb-0.5">Total Check</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {currency}{results.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-sm text-gray-400">
              Enter bill amount to split check.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
