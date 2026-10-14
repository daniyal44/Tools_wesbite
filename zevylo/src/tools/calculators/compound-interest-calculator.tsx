'use client';

import React, { useState, useMemo } from 'react';
import { TrendingUp, Copy, Check, Table, Calculator } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function CompoundInterestCalculator() {
  const [initialPrincipal, setInitialPrincipal] = useState('10000');
  const [monthlyDeposit, setMonthlyDeposit] = useState('500');
  const [interestRate, setInterestRate] = useState('8');
  const [years, setYears] = useState('20');
  const [frequency, setFrequency] = useState<'12' | '4' | '1' | '365'>('12'); // Monthly, Quarterly, Annually, Daily
  const [currency, setCurrency] = useState('$');
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const P = parseFloat(initialPrincipal);
    const PMT = parseFloat(monthlyDeposit) || 0;
    const r = parseFloat(interestRate) / 100;
    const t = parseFloat(years);
    const n = parseInt(frequency, 10);

    if (isNaN(P) || P < 0 || isNaN(r) || r < 0 || isNaN(t) || t <= 0) {
      return null;
    }

    const schedule: Array<{
      year: number;
      deposits: number;
      interestEarned: number;
      balance: number;
    }> = [];

    let currentBalance = P;
    let totalDeposits = P;

    // Monthly effective rate based on compounding frequency n
    const monthlyRate = Math.pow(1 + r / n, n / 12) - 1;

    for (let yr = 1; yr <= Math.ceil(t); yr++) {
      // Simulate 12 months in the year
      for (let m = 1; m <= 12; m++) {
        currentBalance += PMT;
        totalDeposits += PMT;
        currentBalance += currentBalance * monthlyRate;
      }

      schedule.push({
        year: yr,
        deposits: totalDeposits,
        interestEarned: currentBalance - totalDeposits,
        balance: currentBalance,
      });
    }

    const totalInterest = currentBalance - totalDeposits;

    return {
      futureValue: currentBalance,
      totalDeposits,
      totalInterest,
      schedule,
    };
  }, [initialPrincipal, monthlyDeposit, interestRate, years, frequency]);

  const handleCopy = async () => {
    if (!results) return;
    const text = `Initial Investment: ${currency}${parseFloat(initialPrincipal).toLocaleString()}\nFuture Balance (${years} yrs): ${currency}${results.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}\nTotal Deposits: ${currency}${results.totalDeposits.toLocaleString(undefined, { maximumFractionDigits: 0 })}\nTotal Interest Earned: ${currency}${results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Parameter Inputs & Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-5 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
            <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              Investment Plan
            </h2>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="h-8 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs px-2 font-bold"
            >
              <option value="$">USD ($)</option>
              <option value="€">EUR (€)</option>
              <option value="£">GBP (£)</option>
              <option value="₹">INR (₹)</option>
              <option value="C$">CAD (C$)</option>
            </select>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Initial Investment ({currency})
              </label>
              <input
                type="number"
                min="0"
                value={initialPrincipal}
                onChange={(e) => setInitialPrincipal(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold font-mono outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Monthly Contribution ({currency})
              </label>
              <input
                type="number"
                min="0"
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold font-mono outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                <span>Estimated Annual Return Rate</span>
                <span className="text-blue-600 font-mono">{interestRate}%</span>
              </div>
              <input
                type="number"
                step="0.1"
                min="0"
                max="50"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold font-mono outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                <span>Time Horizon</span>
                <span className="text-blue-600 font-mono">{years} Years</span>
              </div>
              <input
                type="number"
                min="1"
                max="60"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold font-mono outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Compounding Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as '12' | '4' | '1' | '365')}
                className="w-full h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 font-medium"
              >
                <option value="12">Monthly (Standard)</option>
                <option value="4">Quarterly</option>
                <option value="1">Annually</option>
                <option value="365">Daily</option>
              </select>
            </div>
          </div>
        </div>

        {/* Future Value Banner */}
        <div className="lg:col-span-7 space-y-6">
          {results ? (
            <div className="rounded-3xl border border-green-200 dark:border-green-900 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-green-950/40 p-8 shadow-sm space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400">
                    Projected Future Balance
                  </span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 font-mono mt-1">
                    {currency}{Math.round(results.futureValue).toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  className="p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 text-gray-700 dark:text-gray-200 transition-colors shadow-sm"
                  title="Copy Breakdown"
                >
                  {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>

              {/* Comparison Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-green-200 dark:border-green-900/60">
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-green-100 dark:border-gray-800">
                  <span className="text-xs font-semibold text-gray-500 block mb-1">Your Total Deposits</span>
                  <span className="text-xl font-bold font-mono text-gray-900 dark:text-gray-100">
                    {currency}{Math.round(results.totalDeposits).toLocaleString()}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-green-100 dark:border-gray-800">
                  <span className="text-xs font-semibold text-gray-500 block mb-1">Total Interest Earned</span>
                  <span className="text-xl font-bold font-mono text-green-600 dark:text-green-400">
                    +{currency}{Math.round(results.totalInterest).toLocaleString()}
                  </span>
                </div>

                <div className="col-span-2 p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-green-100 dark:border-gray-800 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 block">Growth Multiplier</span>
                    <span className="text-xl font-extrabold font-mono text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-5 h-5" />
                      {(results.futureValue / results.totalDeposits).toFixed(2)}x Principal
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-400">Interest Ratio</span>
                    <span className="text-base font-bold text-gray-800 dark:text-gray-200 block">
                      {((results.totalInterest / results.futureValue) * 100).toFixed(1)}% of total
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl border border-dashed border-gray-300 dark:border-gray-800 text-center text-gray-400">
              Enter investment details to calculate compound growth
            </div>
          )}
        </div>
      </div>

      {/* Year-by-Year Growth Table */}
      {results && results.schedule.length > 0 && (
        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Table className="w-5 h-5 text-blue-600" />
              Annual Portfolio Accumulation Schedule
            </h3>
            <span className="text-xs text-gray-400">{results.schedule.length} Years Growth</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-right text-sm font-mono">
              <thead className="bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-xs text-gray-500 font-sans">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Year</th>
                  <th className="px-4 py-3 font-bold">Total Deposited</th>
                  <th className="px-4 py-3 font-bold text-green-600">Total Interest Earned</th>
                  <th className="px-4 py-3 font-bold">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {results.schedule.map((row) => (
                  <tr key={row.year} className="hover:bg-green-50/20 dark:hover:bg-green-950/20">
                    <td className="px-4 py-3 text-left font-sans font-bold text-gray-900 dark:text-gray-100">Year {row.year}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{currency}{Math.round(row.deposits).toLocaleString()}</td>
                    <td className="px-4 py-3 text-green-600 font-bold">+{currency}{Math.round(row.interestEarned).toLocaleString()}</td>
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-gray-100">{currency}{Math.round(row.balance).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
