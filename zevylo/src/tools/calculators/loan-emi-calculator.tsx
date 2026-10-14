'use client';

import React, { useState, useMemo } from 'react';
import { Table, Check, Copy, Calculator } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function LoanEmiCalculator() {
  const [loanAmount, setLoanAmount] = useState('250000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [tenureYears, setTenureYears] = useState('30');
  const [currency, setCurrency] = useState('$');
  const [copied, setCopied] = useState(false);

  const calculation = useMemo(() => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(tenureYears);

    if (isNaN(P) || P <= 0 || isNaN(annualRate) || annualRate < 0 || isNaN(years) || years <= 0) {
      return null;
    }

    const n = Math.round(years * 12); // total months
    const r = annualRate / 12 / 100; // monthly rate

    let monthlyEmi = 0;
    if (r === 0) {
      monthlyEmi = P / n;
    } else {
      monthlyEmi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPayment = monthlyEmi * n;
    const totalInterest = totalPayment - P;

    // Generate year-by-year amortization schedule
    const schedule: Array<{
      year: number;
      openingBalance: number;
      principalPaid: number;
      interestPaid: number;
      totalPaid: number;
      closingBalance: number;
    }> = [];

    let balance = P;
    for (let yr = 1; yr <= Math.ceil(years); yr++) {
      let yrPrincipal = 0;
      let yrInterest = 0;
      const opening = balance;

      for (let m = 1; m <= 12; m++) {
        if (balance <= 0) break;
        const interestMonth = balance * r;
        const principalMonth = Math.min(balance, monthlyEmi - interestMonth);
        yrInterest += interestMonth;
        yrPrincipal += principalMonth;
        balance -= principalMonth;
      }

      schedule.push({
        year: yr,
        openingBalance: opening,
        principalPaid: yrPrincipal,
        interestPaid: yrInterest,
        totalPaid: yrPrincipal + yrInterest,
        closingBalance: Math.max(0, balance),
      });

      if (balance <= 0) break;
    }

    return {
      monthlyEmi,
      totalPayment,
      totalInterest,
      principal: P,
      schedule,
    };
  }, [loanAmount, interestRate, tenureYears]);

  const handleCopy = async () => {
    if (!calculation) return;
    const text = `Loan Amount: ${currency}${calculation.principal.toLocaleString()}\nMonthly EMI: ${currency}${calculation.monthlyEmi.toFixed(2)}\nTotal Interest: ${currency}${calculation.totalInterest.toFixed(2)}\nTotal Payment: ${currency}${calculation.totalPayment.toFixed(2)}`;
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Controls & Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Loan Input Form */}
        <div className="lg:col-span-5 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-5">
          <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
            <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              Loan Parameters
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
              <option value="A$">AUD (A$)</option>
            </select>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Loan Principal Amount ({currency})
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400 font-bold">{currency}</span>
                <input
                  type="number"
                  min="1"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full h-11 pl-8 pr-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold font-mono outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                <span>Annual Interest Rate</span>
                <span className="text-blue-600 font-mono">{interestRate}%</span>
              </div>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="30"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold font-mono outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                <span>Loan Tenure</span>
                <span className="text-blue-600 font-mono">{tenureYears} Years</span>
              </div>
              <input
                type="number"
                min="1"
                max="50"
                value={tenureYears}
                onChange={(e) => setTenureYears(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold font-mono outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-7 space-y-6">
          {calculation ? (
            <div className="rounded-3xl border border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950/40 p-8 shadow-sm space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Monthly Payment (EMI)
                  </span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 font-mono mt-1">
                    {currency}{calculation.monthlyEmi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-200 dark:border-blue-900/60">
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-blue-100 dark:border-gray-800">
                  <span className="text-xs font-semibold text-gray-500 block mb-1">Total Principal</span>
                  <span className="text-xl font-bold font-mono text-gray-900 dark:text-gray-100">
                    {currency}{calculation.principal.toLocaleString()}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-blue-100 dark:border-gray-800">
                  <span className="text-xs font-semibold text-gray-500 block mb-1">Total Interest Payable</span>
                  <span className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400">
                    {currency}{calculation.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="col-span-2 p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-blue-100 dark:border-gray-800 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 block">Total Overall Cost (Principal + Interest)</span>
                    <span className="text-2xl font-extrabold font-mono text-gray-900 dark:text-gray-100">
                      {currency}{calculation.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-400">Interest / Principal</span>
                    <span className="text-base font-bold text-blue-600 block">
                      {((calculation.totalInterest / calculation.principal) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl border border-dashed border-gray-300 dark:border-gray-800 text-center text-gray-400">
              Enter loan details to view calculated EMI
            </div>
          )}
        </div>
      </div>

      {/* Year-by-Year Amortization Schedule */}
      {calculation && calculation.schedule.length > 0 && (
        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Table className="w-5 h-5 text-blue-600" />
              Annual Amortization Schedule
            </h3>
            <span className="text-xs text-gray-400">{calculation.schedule.length} Years Breakdown</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-right text-sm font-mono">
              <thead className="bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-xs text-gray-500 font-sans">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Year</th>
                  <th className="px-4 py-3 font-bold">Opening Balance</th>
                  <th className="px-4 py-3 font-bold text-green-600">Principal Paid</th>
                  <th className="px-4 py-3 font-bold text-amber-600">Interest Paid</th>
                  <th className="px-4 py-3 font-bold">Total Payment</th>
                  <th className="px-4 py-3 font-bold">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {calculation.schedule.map((row) => (
                  <tr key={row.year} className="hover:bg-blue-50/20 dark:hover:bg-blue-950/20">
                    <td className="px-4 py-3 text-left font-sans font-bold text-gray-900 dark:text-gray-100">Year {row.year}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{currency}{Math.round(row.openingBalance).toLocaleString()}</td>
                    <td className="px-4 py-3 text-green-600 font-bold">{currency}{Math.round(row.principalPaid).toLocaleString()}</td>
                    <td className="px-4 py-3 text-amber-600 font-bold">{currency}{Math.round(row.interestPaid).toLocaleString()}</td>
                    <td className="px-4 py-3 font-bold text-gray-800 dark:text-gray-200">{currency}{Math.round(row.totalPaid).toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{currency}{Math.round(row.closingBalance).toLocaleString()}</td>
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
