'use client';

import React, { useState, useMemo } from 'react';
import { Footprints, Flame, Timer, Compass, Award } from 'lucide-react';

export default function StepsToDistanceCalculator() {
  const [steps, setSteps] = useState<number>(10000);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('imperial');
  const [heightCm, setHeightCm] = useState<number>(175);
  const [heightInches, setHeightInches] = useState<number>(69); // 5 ft 9 in
  const [weightKg, setWeightKg] = useState<number>(70);
  const [weightLbs, setWeightLbs] = useState<number>(154);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [pace, setPace] = useState<'slow' | 'moderate' | 'brisk' | 'running'>('moderate');

  // Stride length calculation
  // Male stride factor: 0.415 * height
  // Female stride factor: 0.413 * height
  const strideLengthMeters = useMemo(() => {
    const factor = gender === 'male' ? 0.415 : 0.413;
    const h = unitSystem === 'metric' ? heightCm : heightInches * 2.54;
    return (h * factor) / 100;
  }, [gender, unitSystem, heightCm, heightInches]);

  // Total distance
  const distanceMeters = useMemo(() => steps * strideLengthMeters, [steps, strideLengthMeters]);
  const distanceKm = useMemo(() => distanceMeters / 1000, [distanceMeters]);
  const distanceMiles = useMemo(() => distanceMeters / 1609.344, [distanceMeters]);

  // Pace speed and METs
  // Slow: 2.0 mph (3.2 km/h), MET: 2.5
  // Moderate: 3.0 mph (4.8 km/h), MET: 3.5
  // Brisk: 3.8 mph (6.1 km/h), MET: 4.5
  // Running: 5.5 mph (8.8 km/h), MET: 8.0
  const paceInfo = useMemo(() => {
    switch (pace) {
      case 'slow':
        return { speedMph: 2.0, speedKmh: 3.2, met: 2.5, label: 'Casual / Slow Walk' };
      case 'moderate':
        return { speedMph: 3.0, speedKmh: 4.8, met: 3.5, label: 'Moderate Walk' };
      case 'brisk':
        return { speedMph: 3.8, speedKmh: 6.1, met: 4.5, label: 'Brisk Walk' };
      case 'running':
        return { speedMph: 5.5, speedKmh: 8.8, met: 8.0, label: 'Jogging / Running' };
    }
  }, [pace]);

  // Estimated walking time (minutes)
  const durationHours = useMemo(() => {
    return distanceMiles / paceInfo.speedMph;
  }, [distanceMiles, paceInfo]);

  const durationMinutes = Math.round(durationHours * 60);

  // Calories burned = MET * weight (kg) * duration (hours)
  const caloriesBurned = useMemo(() => {
    const wKg = unitSystem === 'metric' ? weightKg : weightLbs * 0.453592;
    return Math.round(paceInfo.met * wKg * durationHours);
  }, [unitSystem, weightKg, weightLbs, paceInfo, durationHours]);

  const presets = [2500, 5000, 7500, 10000, 15000, 20000];

  return (
    <div className="space-y-8">
      {/* Primary Conversion Display */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20 p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-2">
            <Compass className="h-4 w-4" /> Distance (Miles)
          </div>
          <div className="text-3xl font-black text-blue-950 dark:text-blue-100 font-mono">
            {distanceMiles.toFixed(2)} <span className="text-sm font-semibold text-blue-600">mi</span>
          </div>
          <div className="text-xs text-blue-600/80 dark:text-blue-400 mt-1">
            ≈ {Math.round(distanceMiles * 5280).toLocaleString()} feet
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mb-2">
            <Footprints className="h-4 w-4" /> Distance (Kilometers)
          </div>
          <div className="text-3xl font-black text-emerald-950 dark:text-emerald-100 font-mono">
            {distanceKm.toFixed(2)} <span className="text-sm font-semibold text-emerald-600">km</span>
          </div>
          <div className="text-xs text-emerald-600/80 dark:text-emerald-400 mt-1">
            ≈ {Math.round(distanceMeters).toLocaleString()} meters
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-2">
            <Flame className="h-4 w-4" /> Calories Burned
          </div>
          <div className="text-3xl font-black text-amber-950 dark:text-amber-100 font-mono">
            {caloriesBurned.toLocaleString()} <span className="text-sm font-semibold text-amber-600">kcal</span>
          </div>
          <div className="text-xs text-amber-600/80 dark:text-amber-400 mt-1">
            Based on {paceInfo.label.toLowerCase()}
          </div>
        </div>

        <div className="rounded-2xl border border-purple-200 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-950/20 p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider mb-2">
            <Timer className="h-4 w-4" /> Walking Time
          </div>
          <div className="text-3xl font-black text-purple-950 dark:text-purple-100 font-mono">
            {Math.floor(durationMinutes / 60)}h {durationMinutes % 60}m
          </div>
          <div className="text-xs text-purple-600/80 dark:text-purple-400 mt-1">
            At {paceInfo.speedMph} mph average pace
          </div>
        </div>
      </div>

      {/* Input controls */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Steps & Activity Settings</h3>

        {/* Steps input & presets */}
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="step-count-input" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Number of Steps
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="step-count-input"
                type="number"
                min="0"
                step="100"
                value={Number.isNaN(steps) ? '' : steps}
                onChange={(e) => setSteps(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-full sm:w-1/2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-xl font-black text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <div className="flex flex-wrap gap-2 items-center">
                {presets.map((p) => (
                  <button
                    key={p}
                    onClick={() => setSteps(p)}
                    className={`rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                      steps === p
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500'
                    }`}
                  >
                    {p.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Goal progress indicator */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40 p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-amber-500" /> Daily 10,000 Step Goal Progress
              </span>
              <span>{Math.round((steps / 10000) * 100)}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  steps >= 10000 ? 'bg-emerald-500' : 'bg-blue-600'
                }`}
                style={{ width: `${Math.min(100, (steps / 10000) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Body Customization Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div>
            <label htmlFor="unit-system-select" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Unit System</label>
            <select
              id="unit-system-select"
              value={unitSystem}
              onChange={(e) => setUnitSystem(e.target.value as 'metric' | 'imperial')}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs font-semibold text-gray-900 dark:text-white"
            >
              <option value="imperial">Imperial (Inches, lbs, Miles)</option>
              <option value="metric">Metric (cm, kg, Kilometers)</option>
            </select>
          </div>

          <div>
            <label htmlFor="gender-select" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Gender</label>
            <select
              id="gender-select"
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female')}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs font-semibold text-gray-900 dark:text-white"
            >
              <option value="male">Male (Stride factor 0.415)</option>
              <option value="female">Female (Stride factor 0.413)</option>
            </select>
          </div>

          <div>
            <label htmlFor="height-input" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Height ({unitSystem === 'metric' ? 'cm' : 'inches'})
            </label>
            {unitSystem === 'metric' ? (
              <input
                id="height-input"
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(parseInt(e.target.value, 10) || 170)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs font-semibold text-gray-900 dark:text-white"
              />
            ) : (
              <input
                id="height-input"
                type="number"
                value={heightInches}
                onChange={(e) => setHeightInches(parseInt(e.target.value, 10) || 68)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs font-semibold text-gray-900 dark:text-white"
              />
            )}
          </div>

          <div>
            <label htmlFor="weight-input" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
            </label>
            {unitSystem === 'metric' ? (
              <input
                id="weight-input"
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(parseInt(e.target.value, 10) || 70)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs font-semibold text-gray-900 dark:text-white"
              />
            ) : (
              <input
                id="weight-input"
                type="number"
                value={weightLbs}
                onChange={(e) => setWeightLbs(parseInt(e.target.value, 10) || 154)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs font-semibold text-gray-900 dark:text-white"
              />
            )}
          </div>

          <div>
            <label htmlFor="walking-pace-select" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Walking Pace</label>
            <select
              id="walking-pace-select"
              value={pace}
              onChange={(e) => setPace(e.target.value as 'slow' | 'moderate' | 'brisk' | 'running')}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs font-semibold text-gray-900 dark:text-white"
            >
              <option value="slow">Slow Walk (2.0 mph)</option>
              <option value="moderate">Moderate Walk (3.0 mph)</option>
              <option value="brisk">Brisk Walk (3.8 mph)</option>
              <option value="running">Running / Jogging (5.5 mph)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
