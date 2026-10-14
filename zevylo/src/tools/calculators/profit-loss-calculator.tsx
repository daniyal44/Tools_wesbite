'use client';

import React, { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Percent, Scale, PieChart } from 'lucide-react';

export default function ProfitLossCalculator() {
  const [revenue, setRevenue] = useState<number>(50000);
  const [cogs, setCogs] = useState<number>(20000); // Cost of Goods Sold
  const [operatingExpenses, setOperatingExpenses] = useState<number>(15000); // OPEX (payroll, rent, marketing)
  const [taxes, setTaxes] = useState<number>(3000);
  const [unitPrice, setUnitPrice] = useState<number>(50);
  const [unitCost, setUnitCost] = useState<number>(20);

  // Financial calculations
  const grossProfit = useMemo(() => revenue - cogs, [revenue, cogs]);
  const grossMargin = useMemo(() => (revenue > 0 ? (grossProfit / revenue) * 100 : 0), [grossProfit, revenue]);

  const operatingProfit = useMemo(() => grossProfit - operatingExpenses, [grossProfit, operatingExpenses]);
  const operatingMargin = useMemo(
    () => (revenue > 0 ? (operatingProfit / revenue) * 100 : 0),
    [operatingProfit, revenue]
  );

  const netProfit = useMemo(() => operatingProfit - taxes, [operatingProfit, taxes]);
  const netMargin = useMemo(() => (revenue > 0 ? (netProfit / revenue) * 100 : 0), [netProfit, revenue]);

  // Break-even calculations
  // Fixed costs = operatingExpenses + taxes
  // Contribution margin per unit = unitPrice - unitCost
  const contributionMarginPerUnit = useMemo(() => unitPrice - unitCost, [unitPrice, unitCost]);
  const breakEvenUnits = useMemo(() => {
    if (contributionMarginPerUnit <= 0) return 0;
    return Math.ceil((operatingExpenses + taxes) / contributionMarginPerUnit);
  }, [operatingExpenses, taxes, contributionMarginPerUnit]);

  const breakEvenRevenue = useMemo(() => breakEvenUnits * unitPrice, [breakEvenUnits, unitPrice]);

  const isProfitable = netProfit >= 0;

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          className={`rounded-2xl border p-5 ${
            isProfitable
              ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2">
            <span
              className={
                isProfitable
                  ? 'text-emerald-700 dark:text-emerald-300'
                  : 'text-red-700 dark:text-red-300'
              }
            >
              Net Profit / Loss
            </span>
            {isProfitable ? (
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </div>
          <div
            className={`text-3xl font-black font-mono ${
              isProfitable
                ? 'text-emerald-950 dark:text-emerald-100'
                : 'text-red-950 dark:text-red-100'
            }`}
          >
            {isProfitable ? '+' : '-'}${Math.abs(netProfit).toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Net Margin: <span className="font-bold">{netMargin.toFixed(1)}%</span>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20 p-5">
          <div className="flex items-center justify-between text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-2">
            <span>Gross Profit</span>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-blue-950 dark:text-blue-100 font-mono">
            ${grossProfit.toLocaleString()}
          </div>
          <div className="text-xs text-blue-600/80 dark:text-blue-400 mt-1">
            Gross Margin: <span className="font-bold">{grossMargin.toFixed(1)}%</span>
          </div>
        </div>

        <div className="rounded-2xl border border-purple-200 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-950/20 p-5">
          <div className="flex items-center justify-between text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider mb-2">
            <span>Operating Profit (EBIT)</span>
            <Percent className="h-4 w-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-purple-950 dark:text-purple-100 font-mono">
            ${operatingProfit.toLocaleString()}
          </div>
          <div className="text-xs text-purple-600/80 dark:text-purple-400 mt-1">
            Operating Margin: <span className="font-bold">{operatingMargin.toFixed(1)}%</span>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 p-5">
          <div className="flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-2">
            <span>Break-Even Volume</span>
            <Scale className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-950 dark:text-amber-100 font-mono">
            {breakEvenUnits.toLocaleString()} <span className="text-sm font-semibold text-amber-600">units</span>
          </div>
          <div className="text-xs text-amber-600/80 dark:text-amber-400 mt-1">
            Break-even sales: ${breakEvenRevenue.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Revenue Breakdown Waterfall Bar */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <PieChart className="h-4 w-4 text-blue-600" /> Revenue Allocation Breakdown
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Visual proportion of your total revenue allocated to cost, expenses, taxes, and profit
        </p>

        {revenue > 0 ? (
          <div className="space-y-3">
            <div className="h-4 w-full rounded-full overflow-hidden flex bg-gray-200 dark:bg-gray-700">
              <div
                title={`COGS: $${cogs}`}
                className="bg-red-400 hover:opacity-90 transition-all"
                style={{ width: `${Math.min(100, Math.max(0, (cogs / revenue) * 100))}%` }}
              />
              <div
                title={`Operating Expenses: $${operatingExpenses}`}
                className="bg-amber-400 hover:opacity-90 transition-all"
                style={{ width: `${Math.min(100, Math.max(0, (operatingExpenses / revenue) * 100))}%` }}
              />
              <div
                title={`Taxes: $${taxes}`}
                className="bg-purple-400 hover:opacity-90 transition-all"
                style={{ width: `${Math.min(100, Math.max(0, (taxes / revenue) * 100))}%` }}
              />
              {netProfit > 0 && (
                <div
                  title={`Net Profit: $${netProfit}`}
                  className="bg-emerald-500 hover:opacity-90 transition-all"
                  style={{ width: `${Math.min(100, (netProfit / revenue) * 100)}%` }}
                />
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs gap-3">
              <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                <span className="h-3 w-3 rounded-full bg-red-400" /> COGS ({((cogs / revenue) * 100).toFixed(1)}%)
              </span>
              <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                <span className="h-3 w-3 rounded-full bg-amber-400" /> OPEX ({((operatingExpenses / revenue) * 100).toFixed(1)}%)
              </span>
              <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                <span className="h-3 w-3 rounded-full bg-purple-400" /> Taxes ({((taxes / revenue) * 100).toFixed(1)}%)
              </span>
              <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                <span className="h-3 w-3 rounded-full bg-emerald-500" /> Net Profit ({netMargin.toFixed(1)}%)
              </span>
            </div>
          </div>
        ) : (
          <div className="text-xs text-gray-400">Enter a revenue greater than zero to view allocation.</div>
        )}
      </div>

      {/* Input Data Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Income & Expense Inputs */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Income Statement Figures
          </h4>

          <div>
            <label htmlFor="total-revenue-input" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Total Revenue / Gross Sales ($)
            </label>
            <input
              id="total-revenue-input"
              type="number"
              min="0"
              value={Number.isNaN(revenue) ? '' : revenue}
              onChange={(e) => setRevenue(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-base font-bold text-gray-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="cogs-input" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Cost of Goods Sold (COGS) ($)
            </label>
            <input
              id="cogs-input"
              type="number"
              min="0"
              value={Number.isNaN(cogs) ? '' : cogs}
              onChange={(e) => setCogs(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-base font-bold text-gray-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="operating-expenses-input" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Operating Expenses (Rent, Payroll, Marketing) ($)
            </label>
            <input
              id="operating-expenses-input"
              type="number"
              min="0"
              value={Number.isNaN(operatingExpenses) ? '' : operatingExpenses}
              onChange={(e) => setOperatingExpenses(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-base font-bold text-gray-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="taxes-interest-input" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Taxes & Interest ($)
            </label>
            <input
              id="taxes-interest-input"
              type="number"
              min="0"
              value={Number.isNaN(taxes) ? '' : taxes}
              onChange={(e) => setTaxes(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-base font-bold text-gray-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Unit Economics for Break-Even */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Per-Unit Pricing & Break-Even
          </h4>

          <div>
            <label htmlFor="sale-price-unit-input" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Sale Price per Unit ($)
            </label>
            <input
              id="sale-price-unit-input"
              type="number"
              min="0"
              value={Number.isNaN(unitPrice) ? '' : unitPrice}
              onChange={(e) => setUnitPrice(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-base font-bold text-gray-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="variable-cost-unit-input" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Variable Production Cost per Unit ($)
            </label>
            <input
              id="variable-cost-unit-input"
              type="number"
              min="0"
              value={Number.isNaN(unitCost) ? '' : unitCost}
              onChange={(e) => setUnitCost(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-base font-bold text-gray-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="mt-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/50 p-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Contribution Margin per Unit:</span>
              <span className="font-bold text-gray-900 dark:text-white">${contributionMarginPerUnit.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Contribution Margin Ratio:</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {unitPrice > 0 ? ((contributionMarginPerUnit / unitPrice) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div className="flex justify-between text-xs pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="font-bold text-gray-700 dark:text-gray-300">Break-Even Units Required:</span>
              <span className="font-black text-blue-600 dark:text-blue-400">{breakEvenUnits.toLocaleString()} units</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
