'use client';

import React, { useState, useMemo } from 'react';
import { Cake, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('1998-05-20');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    if (!birthDate) return null;
    // Parse as a LOCAL date (new Date('YYYY-MM-DD') would parse as UTC midnight,
    // shifting the day back in western timezones and skewing day-of-week/zodiac).
    const [by, bm, bd] = birthDate.split('-').map(Number);
    const birth = new Date(by, (bm || 1) - 1, bd || 1);
    const now = new Date();

    if (isNaN(birth.getTime()) || birth > now) return null;

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total units
    const diffMs = now.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

    // Next birthday countdown
    let nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < now) {
      nextBday = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilNext = Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    // Day of the week born on
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const bornDay = daysOfWeek[birth.getDay()];

    // Zodiac
    const m = birth.getMonth() + 1;
    const d = birth.getDate();
    let zodiac = 'Aries';
    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) zodiac = 'Aries ♈';
    else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) zodiac = 'Taurus ♉';
    else if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) zodiac = 'Gemini ♊';
    else if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) zodiac = 'Cancer ♋';
    else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) zodiac = 'Leo ♌';
    else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) zodiac = 'Virgo ♍';
    else if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) zodiac = 'Libra ♎';
    else if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) zodiac = 'Scorpio ♏';
    else if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) zodiac = 'Sagittarius ♐';
    else if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) zodiac = 'Capricorn ♑';
    else if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) zodiac = 'Aquarius ♒';
    else zodiac = 'Pisces ♓';

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      daysUntilNext,
      bornDay,
      zodiac,
    };
  }, [birthDate]);

  const handleCopy = async () => {
    if (!stats) return;
    const text = `Age: ${stats.years} years, ${stats.months} months, ${stats.days} days\nDays Lived: ${stats.totalDays.toLocaleString()}\nBorn on: ${stats.bornDay}\nNext Birthday: In ${stats.daysUntilNext} days`;
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Birthday Input */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Cake className="w-5 h-5 text-pink-500" />
            Enter Date of Birth
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Birth Date
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Age Breakdown
            </h2>
            {stats && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-gray-600 dark:text-gray-300"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>

          {stats ? (
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border border-pink-200 dark:border-pink-900/40">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400">
                  Exact Chronological Age
                </span>
                <div className="text-3xl font-black text-gray-900 dark:text-gray-100 mt-1">
                  {stats.years} <span className="text-lg font-bold text-gray-500">Years</span> {stats.months} <span className="text-lg font-bold text-gray-500">Months</span> {stats.days} <span className="text-lg font-bold text-gray-500">Days</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/30">
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300 block mb-0.5">
                    Next Birthday
                  </span>
                  <span className="text-xl font-black text-purple-600 dark:text-purple-400">
                    In {stats.daysUntilNext} Days
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30">
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-300 block mb-0.5">
                    Zodiac Sign
                  </span>
                  <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                    {stats.zodiac}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                  <span className="text-gray-400 block">Total Days Lived</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{stats.totalDays.toLocaleString()} days</span>
                </div>
                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                  <span className="text-gray-400 block">Born on Day</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{stats.bornDay}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-sm text-gray-400">
              Select your date of birth.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
