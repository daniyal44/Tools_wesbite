'use client';

import React, { useState, useMemo } from 'react';
import { DollarSign, Percent, TrendingUp, TrendingDown, ArrowRight, RotateCcw, ShieldCheck } from 'lucide-react';

export default function CryptoProfitCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000);
  const [buyPrice, setBuyPrice] = useState<number>(60000);
  const [sellPrice, setSellPrice] = useState<number>(85000);
  const [buyFeePercent, setBuyFeePercent] = useState<number>(0.1);
  const [sellFeePercent, setSellFeePercent] = useState<number>(0.1);

  const stats = useMemo(() => {
    if (buyPrice <= 0 || investmentAmount <= 0) {
      return {
        coinUnits: 0,
        buyFeeAmount: 0,
        netInvestment: 0,
        grossExitValue: 0,
        sellFeeAmount: 0,
        netExitValue: 0,
        netProfit: 0,
        roiPercent: 0,
        breakevenPrice: 0,
      };
    }

    const buyFeeAmount = (investmentAmount * buyFeePercent) / 100;
    const netInvestedInCoin = investmentAmount - buyFeeAmount;
    const coinUnits = netInvestedInCoin / buyPrice;

    const grossExitValue = coinUnits * sellPrice;
    const sellFeeAmount = (grossExitValue * sellFeePercent) / 100;
    const netExitValue = grossExitValue - sellFeeAmount;

    const netProfit = netExitValue - investmentAmount;
    const roiPercent = (netProfit / investmentAmount) * 100;

    // Breakeven price: sell price where netExitValue == investmentAmount
    // netExitValue = coinUnits * P * (1 - sellFeePercent/100) = investmentAmount
    const feeFactor = 1 - sellFeePercent / 100;
    const breakevenPrice = feeFactor > 0 ? investmentAmount / (coinUnits * feeFactor) : buyPrice;

    return {
      coinUnits,
      buyFeeAmount,
      netInvestment: netInvestedInCoin,
      grossExitValue,
      sellFeeAmount,
      netExitValue,
      netProfit,
      roiPercent,
      breakevenPrice,
    };
  }, [investmentAmount, buyPrice, sellPrice, buyFeePercent, sellFeePercent]);

  const isProfit = stats.netProfit >= 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Presets Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Market Scenarios:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setInvestmentAmount(1000);
              setBuyPrice(62000);
              setSellPrice(90000);
            }}
            className="px-3 py-1 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition"
          >
            Bitcoin Bull ($62k → $90k)
          </button>
          <button
            onClick={() => {
              setInvestmentAmount(500);
              setBuyPrice(2500);
              setSellPrice(4200);
            }}
            className="px-3 py-1 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition"
          >
            Ethereum Surge ($2.5k → $4.2k)
          </button>
          <button
            onClick={() => {
              setInvestmentAmount(250);
              setBuyPrice(150);
              setSellPrice(240);
            }}
            className="px-3 py-1 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition"
          >
            Solana Run ($150 → $240)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Input Parameters */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 pb-2">
            Investment Parameters
          </h3>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Initial Investment ($ USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400 font-mono text-sm">$</span>
              <input
                type="number"
                min="0"
                step="any"
                value={investmentAmount || ''}
                onChange={(e) => setInvestmentAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full pl-8 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Buy Price ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400 font-mono text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={buyPrice || ''}
                  onChange={(e) => setBuyPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full pl-8 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Sell Price ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400 font-mono text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={sellPrice || ''}
                  onChange={(e) => setSellPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full pl-8 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Buy Fee (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.05"
                  value={buyFeePercent}
                  onChange={(e) => setBuyFeePercent(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full pr-7 pl-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="absolute right-3 top-2.5 text-gray-400 text-xs font-mono">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Sell Fee (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.05"
                  value={sellFeePercent}
                  onChange={(e) => setSellFeePercent(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full pr-7 pl-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="absolute right-3 top-2.5 text-gray-400 text-xs font-mono">%</span>
              </div>
            </div>
          </div>

          <div className="pt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
            <span>Purchased Coin Units:</span>
            <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">
              {stats.coinUnits.toFixed(6)}
            </span>
          </div>
        </div>

        {/* Right Card: Profit & Loss Output */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between space-y-5">
          <div>
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Net Profit / Loss Summary
            </div>

            {/* Profit/Loss Callout */}
            <div
              className={`p-5 rounded-xl border flex items-center justify-between ${
                isProfit
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'
              }`}
            >
              <div>
                <span className="text-xs font-semibold block uppercase tracking-wide">
                  {isProfit ? 'Net Profit' : 'Net Loss'}
                </span>
                <span className="text-3xl font-extrabold font-mono tracking-tight">
                  {isProfit ? '+' : ''}${stats.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold block uppercase tracking-wide">ROI</span>
                <span className="text-2xl font-bold font-mono">
                  {isProfit ? '+' : ''}{stats.roiPercent.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          {/* Detailed metrics table */}
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400">
              <span>Total Payout (Exit Value)</span>
              <span className="font-mono font-semibold text-gray-900 dark:text-gray-100">
                ${stats.netExitValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400">
              <span>Total Fees Paid (Buy + Sell)</span>
              <span className="font-mono text-gray-900 dark:text-gray-100">
                ${(stats.buyFeeAmount + stats.sellFeeAmount).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400">
              <span>Breakeven Sell Price</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                ${stats.breakevenPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-lg text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Pure client-side mathematical calculations. No financial tracking or wallet connection required.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
