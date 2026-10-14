'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function SalaryCalculator() {
  const [payRate, setPayRate] = useState('35');
  const [rateType, setRateType] = useState<'hourly' | 'annual'>('hourly');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [weeksPerYear, setWeeksPerYear] = useState('52');
  const [taxRate, setTaxRate] = useState('22');
  const [currency, setCurrency] = useState('$');
  const [copied, setCopied] = useState(false);

  const calculations = useMemo(() => {
    const rate = parseFloat(payRate);
    const hours = parseFloat(hoursPerWeek);
    const weeks = parseFloat(weeksPerYear);
    const tax = parseFloat(taxRate) || 0;

    if (isNaN(rate) || rate < 0 || isNaN(hours) || hours <= 0 || isNaN(weeks) || weeks <= 0) {
      return null;
    }

    const totalHoursPerYear = hours * weeks;
    let annualGross = 0;
    let hourlyGross = 0;

    if (rateType === 'hourly') {
      hourlyGross = rate;
      annualGross = rate * totalHoursPerYear;
    } else {
      annualGross = rate;
      hourlyGross = annualGross / totalHoursPerYear;
    }

    const monthlyGross = annualGross / 12;
    const biWeeklyGross = annualGross / 26;
    const weeklyGross = annualGross / weeks;
    const dailyGross = weeklyGross / (hours / 8);

    const taxMultiplier = Math.max(0, 1 - tax / 100);
    const annualNet = annualGross * taxMultiplier;
    const monthlyNet = monthlyGross * taxMultiplier;
    const biWeeklyNet = biWeeklyGross * taxMultiplier;
    const weeklyNet = weeklyGross * taxMultiplier;
    const hourlyNet = hourlyGross * taxMultiplier;

    return {
      annualGross,
      monthlyGross,
      biWeeklyGross,
      weeklyGross,
      dailyGross,
      hourlyGross,
      annualNet,
      monthlyNet,
      biWeeklyNet,
      weeklyNet,
      hourlyNet,
      taxDeductionAnnual: annualGross - annualNet,
    };
  }, [payRate, rateType, hoursPerWeek, weeksPerYear, taxRate]);

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `Salary Summary:\nAnnual: ${currency}${calculations.annualGross.toLocaleString(undefined, { maximumFractionDigits: 0 })} Gross | ${currency}${calculations.annualNet.toLocaleString(undefined, { maximumFractionDigits: 0 })} Net\nMonthly: ${currency}${calculations.monthlyGross.toLocaleString(undefined, { maximumFractionDigits: 0 })} Gross | ${currency}${calculations.monthlyNet.toLocaleString(undefined, { maximumFractionDigits: 0 })} Net\nHourly: ${currency}${calculations.hourlyGross.toFixed(2)} Gross`;
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Parameter Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <button
              onClick={() => setRateType('hourly')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                rateType === 'hourly'
                  ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Hourly Rate
            </button>
            <button
              onClick={() => setRateType('annual')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                rateType === 'annual'
                  ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Annual Salary
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                {rateType === 'hourly' ? 'Hourly Wage' : 'Annual Base Salary'}
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
                  value={payRate}
                  onChange={(e) => setPayRate(e.target.value)}
                  className="flex-1 h-11 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-base font-semibold"
                  placeholder={rateType === 'hourly' ? '35' : '75000'}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Hours / Week
                </label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Weeks / Year
                </label>
                <input
                  type="number"
                  value={weeksPerYear}
                  onChange={(e) => setWeeksPerYear(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-semibold"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Estimated Tax Withholding (%)
                </label>
                <span className="text-xs font-mono font-bold text-blue-600">{taxRate}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Results Overview */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Annual Take-Home (Net Pay)
                </span>
                <div className="text-3xl font-black text-green-600 dark:text-green-400 mt-1">
                  {currency}
                  {calculations?.annualNet.toLocaleString(undefined, { maximumFractionDigits: 0 }) || '0'}
                </div>
              </div>
              {calculations && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>

            {/* Paycheck Period Table */}
            {calculations && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800 text-xs text-gray-500">
                      <th className="py-2.5 font-bold">Pay Period</th>
                      <th className="py-2.5 font-bold text-right">Gross Pay</th>
                      <th className="py-2.5 font-bold text-right text-green-600">Net Pay</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
                    <tr>
                      <td className="py-3 text-gray-900 dark:text-gray-200">Yearly (Annual)</td>
                      <td className="py-3 text-right text-gray-700 dark:text-gray-300">
                        {currency}{calculations.annualGross.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-3 text-right font-bold text-green-600">
                        {currency}{calculations.annualNet.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-900 dark:text-gray-200">Monthly</td>
                      <td className="py-3 text-right text-gray-700 dark:text-gray-300">
                        {currency}{calculations.monthlyGross.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-3 text-right font-bold text-green-600">
                        {currency}{calculations.monthlyNet.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-900 dark:text-gray-200">Bi-Weekly (Every 2 Wks)</td>
                      <td className="py-3 text-right text-gray-700 dark:text-gray-300">
                        {currency}{calculations.biWeeklyGross.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-3 text-right font-bold text-green-600">
                        {currency}{calculations.biWeeklyNet.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-900 dark:text-gray-200">Weekly</td>
                      <td className="py-3 text-right text-gray-700 dark:text-gray-300">
                        {currency}{calculations.weeklyGross.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-3 text-right font-bold text-green-600">
                        {currency}{calculations.weeklyNet.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-900 dark:text-gray-200">Hourly</td>
                      <td className="py-3 text-right text-gray-700 dark:text-gray-300">
                        {currency}{calculations.hourlyGross.toFixed(2)}
                      </td>
                      <td className="py-3 text-right font-bold text-green-600">
                        {currency}{calculations.hourlyNet.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
