'use client';

import React, { useState, useMemo } from 'react';
import { Flame, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

const ACTIVITY_MULTIPLIERS: Record<string, { label: string; desc: string; mult: number }> = {
  sedentary: { label: 'Sedentary', desc: 'Desk job, little to no exercise', mult: 1.2 },
  light: { label: 'Light Exercise', desc: '1-3 days per week light workouts', mult: 1.375 },
  moderate: { label: 'Moderate Exercise', desc: '3-5 days per week moderate workouts', mult: 1.55 },
  heavy: { label: 'Heavy Exercise', desc: '6-7 days per week intense training', mult: 1.725 },
  athlete: { label: 'Athlete / Physical Job', desc: 'Twice per day workouts or intense labor', mult: 1.9 },
};

export default function TdeeCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('28');
  const [weightKg, setWeightKg] = useState('75');
  const [heightCm, setHeightCm] = useState('178');
  const [activity, setActivity] = useState<string>('moderate');
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const a = parseFloat(age);
    const w = parseFloat(weightKg);
    const h = parseFloat(heightCm);

    if (isNaN(a) || a <= 0 || isNaN(w) || w <= 0 || isNaN(h) || h <= 0) return null;

    // Mifflin-St Jeor Equation
    // Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5
    // Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161
    const base = 10 * w + 6.25 * h - 5 * a;
    const bmr = gender === 'male' ? base + 5 : base - 161;

    const mult = ACTIVITY_MULTIPLIERS[activity]?.mult || 1.2;
    const tdee = Math.round(bmr * mult);
    const cut = Math.round(tdee - 500);
    const bulk = Math.round(tdee + 300);

    return {
      bmr: Math.round(bmr),
      tdee,
      cut,
      bulk,
    };
  }, [gender, age, weightKg, heightCm, activity]);

  const handleCopy = async () => {
    if (!results) return;
    const text = `TDEE Summary:\nBMR: ${results.bmr} kcal/day\nMaintenance TDEE: ${results.tdee} kcal/day\nFat Loss (Cut): ${results.cut} kcal/day\nMuscle Gain (Bulk): ${results.bulk} kcal/day`;
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Controls */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Body & Activity Profile
          </h2>

          <div className="space-y-4">
            {/* Gender Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
              <button
                onClick={() => setGender('male')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  gender === 'male'
                    ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setGender('female')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  gender === 'female'
                    ? 'bg-white dark:bg-gray-900 text-pink-600 dark:text-pink-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Female
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full h-11 px-3 text-center rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full h-11 px-3 text-center rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full h-11 px-3 text-center rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Activity Level
              </label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-semibold"
              >
                {Object.entries(ACTIVITY_MULTIPLIERS).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.label} — {item.desc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Calorie Burn Targets
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
              <div className="p-5 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-400">
                  Maintenance Calories (TDEE)
                </span>
                <div className="text-4xl font-black text-orange-600 dark:text-orange-300 mt-1">
                  {results.tdee.toLocaleString()} <span className="text-base font-semibold text-gray-500">kcal / day</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30">
                  <span className="text-xs font-bold text-green-700 dark:text-green-300 block mb-0.5">
                    Fat Loss (Cutting)
                  </span>
                  <span className="text-2xl font-black text-green-600 dark:text-green-400">
                    {results.cut.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 block mt-0.5">-500 kcal deficit</span>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30">
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-300 block mb-0.5">
                    Muscle Gain (Bulking)
                  </span>
                  <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                    {results.bulk.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 block mt-0.5">+300 kcal surplus</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs">
                <span className="text-gray-500 font-medium">Basal Metabolic Rate (BMR)</span>
                <span className="font-mono font-bold text-gray-900 dark:text-gray-100">
                  {results.bmr.toLocaleString()} kcal/day
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-sm text-gray-400">
              Enter your stats to calculate daily calories.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
