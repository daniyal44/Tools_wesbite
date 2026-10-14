'use client';

import React, { useState, useMemo } from 'react';
import { Calendar, Copy, Check, Clock } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });
  const [includeEndDay, setIncludeEndDay] = useState(false);
  const [copied, setCopied] = useState(false);

  const diff = useMemo(() => {
    if (!startDate || !endDate) return null;

    // Parse as LOCAL dates so weekday (business-day) classification is correct;
    // new Date('YYYY-MM-DD') parses as UTC midnight and shifts the weekday back
    // in western timezones.
    const parseLocal = (s: string) => {
      const [y, m, d] = s.split('-').map(Number);
      return new Date(y, (m || 1) - 1, d || 1);
    };
    const d1 = parseLocal(startDate);
    const d2 = parseLocal(endDate);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;

    const start = d1 < d2 ? d1 : d2;
    const end = d1 < d2 ? d2 : d1;
    const isReversed = d1 > d2;

    const diffMs = end.getTime() - start.getTime();
    let totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (includeEndDay) totalDays += 1;

    // Calculate Business Days (Mon-Fri)
    let businessDays = 0;
    const cur = new Date(start);
    const endBoundary = new Date(end);
    if (includeEndDay) endBoundary.setDate(endBoundary.getDate() + 1);

    while (cur < endBoundary) {
      const dayOfWeek = cur.getDay(); // 0 = Sun, 6 = Sat
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }

    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    const hours = totalDays * 24;

    return {
      totalDays,
      businessDays,
      weekendDays: totalDays - businessDays,
      weeks,
      remainingDays,
      hours,
      isReversed,
    };
  }, [startDate, endDate, includeEndDay]);

  const handleCopy = async () => {
    if (!diff) return;
    const text = `Date Difference:\nTotal Days: ${diff.totalDays}\nBusiness Days: ${diff.businessDays}\nWeeks: ${diff.weeks} weeks and ${diff.remainingDays} days\nTotal Hours: ${diff.hours.toLocaleString()} hours`;
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setPreset = (daysToAdd: number) => {
    const d1 = new Date();
    const d2 = new Date();
    d2.setDate(d1.getDate() + daysToAdd);
    setStartDate(d1.toISOString().split('T')[0]);
    setEndDate(d2.toISOString().split('T')[0]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Date Inputs */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Select Date Range
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-semibold"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="includeEnd"
                checked={includeEndDay}
                onChange={(e) => setIncludeEndDay(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 accent-blue-600"
              />
              <label htmlFor="includeEnd" className="text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer">
                Include End Day (+1 Day)
              </label>
            </div>

            {/* Quick Presets */}
            <div className="pt-2">
              <span className="text-xs text-gray-500 font-medium block mb-2">Quick Presets:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setPreset(7)}
                  className="px-3 py-1 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  +1 Week
                </button>
                <button
                  onClick={() => setPreset(30)}
                  className="px-3 py-1 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  +30 Days
                </button>
                <button
                  onClick={() => setPreset(90)}
                  className="px-3 py-1 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  +90 Days
                </button>
                <button
                  onClick={() => setPreset(365)}
                  className="px-3 py-1 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  +1 Year
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              Duration Results
            </h2>
            {diff && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-gray-600 dark:text-gray-300"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>

          {diff ? (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                  Total Calendar Days
                </span>
                <div className="text-4xl font-black text-indigo-600 dark:text-indigo-300 mt-1">
                  {diff.totalDays} Days
                </div>
                <p className="text-xs text-indigo-700/80 dark:text-indigo-400/80 mt-1 font-medium">
                  Equal to {diff.weeks} weeks and {diff.remainingDays} days
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30">
                  <span className="text-xs font-bold text-green-700 dark:text-green-300 block mb-0.5">
                    Working Days
                  </span>
                  <span className="text-2xl font-black text-green-600 dark:text-green-400">
                    {diff.businessDays}
                  </span>
                  <span className="text-xs text-gray-400 block mt-0.5">Mon - Fri</span>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-0.5">
                    Weekend Days
                  </span>
                  <span className="text-2xl font-black text-gray-800 dark:text-gray-200">
                    {diff.weekendDays}
                  </span>
                  <span className="text-xs text-gray-400 block mt-0.5">Sat & Sun</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs">
                <span className="text-gray-500 font-medium">Total Duration in Hours</span>
                <span className="font-mono font-bold text-gray-900 dark:text-gray-100">
                  {diff.hours.toLocaleString()} hrs
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-sm text-gray-400">
              Pick two dates to calculate elapsed time.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
