'use client';

import React, { useState, useMemo } from 'react';
import { DollarSign, Percent, Calendar, TrendingDown, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function InflationCalculator() {
  const [initialAmount, setInitialAmount] = useState<number>(1000);
  const [inflationRate, setInflationRate] = useState<number>(3.5);
  const [years, setYears] = useState<number>(10);

  const results = useMemo(() => {
    if (initialAmount <= 0 || years <= 0) {
      return {
        futureCost: initialAmount,
        futurePurchasingPower: initialAmount,
        cumulativeInflation: 0,
        purchasingPowerLostPercent: 0,
        yearlyBreakdown: [],
      };
    }

    const r = inflationRate / 100;
    const compoundFactor = Math.pow(1 + r, years);
    const futureCost = initialAmount * compoundFactor;
    const futurePurchasingPower = initialAmount / compoundFactor;
    const cumulativeInflation = (compoundFactor - 1) * 100;
    const purchasingPowerLostPercent = ((initialAmount - futurePurchasingPower) / initialAmount) * 100;

    const breakdown: Array<{
      year: number;
      futureCost: number;
      purchasingPower: number;
      cumulativeRate: number;
    }> = [];

    const step = years <= 15 ? 1 : Math.ceil(years / 10);
    for (let y = 1; y <= years; y++) {
      if (y % step === 0 || y === years) {
        const factor = Math.pow(1 + r, y);
        breakdown.push({
          year: y,
          futureCost: initialAmount * factor,
          purchasingPower: initialAmount / factor,
          cumulativeRate: (factor - 1) * 100,
        });
      }
    }

    return {
      futureCost,
      futurePurchasingPower,
      cumulativeInflation,
      purchasingPowerLostPercent,
      yearlyBreakdown: breakdown,
    };
  }, [initialAmount, inflationRate, years]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Rate Presets */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Preset Rates:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setInflationRate(2.0)}
            className="px-3 py-1 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition"
          >
            Central Bank Target (2.0%)
          </button>
          <button
            onClick={() => setInflationRate(3.2)}
            className="px-3 py-1 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition"
          >
            Historical US Average (3.2%)
          </button>
          <button
            onClick={() => setInflationRate(6.0)}
            className="px-3 py-1 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition"
          >
            High Inflation (6.0%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Input Parameters */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 pb-2">
            Inflation Parameters
          </h3>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Initial Amount ($ USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400 font-mono text-sm">$</span>
              <input
                type="number"
                min="1"
                step="any"
                value={initialAmount || ''}
                onChange={(e) => setInitialAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full pl-8 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              <span>Annual Inflation Rate (%)</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                {inflationRate}%
              </span>
            </div>
            <input
              type="number"
              min="0"
              max="50"
              step="0.1"
              value={inflationRate}
              onChange={(e) => setInflationRate(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              <span>Time Horizon (Years)</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                {years} {years === 1 ? 'Year' : 'Years'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        {/* Right Card: Impact Summary */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 pb-2">
            Impact in {years} Years
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800">
              <span className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 block uppercase">
                Equivalent Cost Needed
              </span>
              <span className="text-2xl font-bold font-mono text-indigo-900 dark:text-indigo-100">
                ${results.futureCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-[11px] text-indigo-600 dark:text-indigo-400 block mt-1">
                To buy what ${initialAmount} buys today
              </span>
            </div>

            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800">
              <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-300 block uppercase">
                Future Value of ${initialAmount}
              </span>
              <span className="text-2xl font-bold font-mono text-rose-900 dark:text-rose-100">
                ${results.futurePurchasingPower.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-[11px] text-rose-600 dark:text-rose-400 block mt-1">
                Loss of {results.purchasingPowerLostPercent.toFixed(1)}% power
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400">
              <span>Cumulative Inflation Over Period</span>
              <span className="font-mono font-semibold text-gray-900 dark:text-gray-100">
                +{results.cumulativeInflation.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400">
              <span>Purchasing Power Erosion</span>
              <span className="font-mono text-rose-600 dark:text-rose-400 font-semibold">
                -{results.purchasingPowerLostPercent.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Yearly Timeline Table */}
      {results.yearlyBreakdown.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
            Compounding Inflation Timeline
          </span>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                  <th className="py-2 px-3 font-semibold">Year</th>
                  <th className="py-2 px-3 font-semibold">Equivalent Future Cost</th>
                  <th className="py-2 px-3 font-semibold">Today&apos;s ${initialAmount} Real Worth</th>
                  <th className="py-2 px-3 font-semibold">Cumulative Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-750 font-mono">
                {results.yearlyBreakdown.map((row) => (
                  <tr key={row.year} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="py-2 px-3 text-gray-800 dark:text-gray-200 font-sans font-medium">
                      Year {row.year}
                    </td>
                    <td className="py-2 px-3 text-indigo-600 dark:text-indigo-400 font-semibold">
                      ${row.futureCost.toFixed(2)}
                    </td>
                    <td className="py-2 px-3 text-rose-600 dark:text-rose-400">
                      ${row.purchasingPower.toFixed(2)}
                    </td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                      +{row.cumulativeRate.toFixed(1)}%
                    </td>
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
