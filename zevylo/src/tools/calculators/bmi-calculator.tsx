'use client';

import React, { useState, useMemo } from 'react';
import { Activity, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function BmiCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weightKg, setWeightKg] = useState('70');
  const [heightCm, setHeightCm] = useState('175');
  const [weightLbs, setWeightLbs] = useState('155');
  const [heightFeet, setHeightFeet] = useState('5');
  const [heightInches, setHeightInches] = useState('9');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    let w = 0; // kg
    let h = 0; // m

    if (unit === 'metric') {
      const kg = parseFloat(weightKg);
      const cm = parseFloat(heightCm);
      if (isNaN(kg) || kg <= 0 || isNaN(cm) || cm <= 0) return null;
      w = kg;
      h = cm / 100;
    } else {
      const lbs = parseFloat(weightLbs);
      const ft = parseFloat(heightFeet) || 0;
      const inch = parseFloat(heightInches) || 0;
      const totalInches = ft * 12 + inch;
      if (isNaN(lbs) || lbs <= 0 || totalInches <= 0) return null;
      w = lbs * 0.45359237;
      h = totalInches * 0.0254;
    }

    const bmi = w / (h * h);

    // Categories
    let category = 'Normal weight';
    let color = 'text-green-600 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900';
    let advice = 'You have a healthy body weight. Maintain balanced nutrition and exercise.';

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900';
      advice = 'You are below standard weight. Consider nutrient-rich foods and resistance training.';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      color = 'text-orange-600 bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900';
      advice = 'Slightly above normal range. Modest cardio and caloric awareness are recommended.';
    } else if (bmi >= 30) {
      category = 'Obesity';
      color = 'text-red-600 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900';
      advice = 'Consulting a healthcare provider for personalized guidance is recommended.';
    }

    // Healthy weight bounds (BMI 18.5 - 24.9)
    const minHealthyKg = 18.5 * (h * h);
    const maxHealthyKg = 24.9 * (h * h);

    return {
      bmi: parseFloat(bmi.toFixed(1)),
      category,
      color,
      advice,
      minHealthyKg: minHealthyKg.toFixed(1),
      maxHealthyKg: maxHealthyKg.toFixed(1),
      minHealthyLbs: (minHealthyKg * 2.20462).toFixed(1),
      maxHealthyLbs: (maxHealthyKg * 2.20462).toFixed(1),
    };
  }, [unit, weightKg, heightCm, weightLbs, heightFeet, heightInches]);

  const handleCopy = async () => {
    if (!stats) return;
    const text = `BMI: ${stats.bmi} (${stats.category})\nHealthy Weight Range: ${unit === 'metric' ? `${stats.minHealthyKg}kg - ${stats.maxHealthyKg}kg` : `${stats.minHealthyLbs}lbs - ${stats.maxHealthyLbs}lbs`}`;
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Unit Toggle */}
      <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl max-w-xs mx-auto">
        <button
          onClick={() => setUnit('metric')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            unit === 'metric'
              ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Metric (kg / cm)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            unit === 'imperial'
              ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Imperial (lbs / ft)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Controls */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Body Measurements
          </h2>

          <div className="space-y-4">
            {unit === 'metric' ? (
              <>
                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-base font-semibold"
                    placeholder="70"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-base font-semibold"
                    placeholder="175"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-base font-semibold"
                    placeholder="155"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      Height (Feet)
                    </label>
                    <input
                      type="number"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-base font-semibold"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      Inches
                    </label>
                    <input
                      type="number"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-base font-semibold"
                      placeholder="9"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
              BMI Result
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
              <div className={`p-6 rounded-2xl border text-center space-y-2 ${stats.color}`}>
                <span className="text-xs font-extrabold uppercase tracking-widest block">
                  {stats.category}
                </span>
                <div className="text-5xl font-black">
                  {stats.bmi}
                </div>
                <p className="text-xs font-medium max-w-xs mx-auto">
                  {stats.advice}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 text-xs space-y-2">
                <span className="font-bold text-gray-700 dark:text-gray-300 block">
                  Recommended Healthy Weight Range:
                </span>
                <div className="text-sm font-black text-green-600 dark:text-green-400">
                  {unit === 'metric'
                    ? `${stats.minHealthyKg} kg — ${stats.maxHealthyKg} kg`
                    : `${stats.minHealthyLbs} lbs — ${stats.maxHealthyLbs} lbs`}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-sm text-gray-400">
              Enter height and weight.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
