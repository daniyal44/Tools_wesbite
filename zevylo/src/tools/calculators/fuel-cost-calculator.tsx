'use client';

import React, { useState, useMemo } from 'react';
import { Fuel, Users, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState('250');
  const [unitSystem, setUnitSystem] = useState<'us' | 'metric'>('us'); // US (Miles, MPG, $/gal) vs Metric (KM, L/100km, $/L)
  const [efficiency, setEfficiency] = useState('28'); // MPG or L/100km
  const [pricePerUnit, setPricePerUnit] = useState('3.50');
  const [passengers, setPassengers] = useState(1);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [currency, setCurrency] = useState('$');
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    let dist = parseFloat(distance);
    const eff = parseFloat(efficiency);
    const price = parseFloat(pricePerUnit);

    if (isNaN(dist) || dist <= 0 || isNaN(eff) || eff <= 0 || isNaN(price) || price < 0) {
      return null;
    }

    if (isRoundTrip) dist *= 2;

    let fuelVolume = 0;
    if (unitSystem === 'us') {
      fuelVolume = dist / eff; // Gallons
    } else {
      fuelVolume = (dist / 100) * eff; // Liters
    }

    const totalCost = fuelVolume * price;
    const costPerPassenger = totalCost / (passengers || 1);
    const costPerDistanceUnit = totalCost / dist;

    return {
      totalDistance: dist,
      fuelVolume,
      totalCost,
      costPerPassenger,
      costPerDistanceUnit,
    };
  }, [distance, unitSystem, efficiency, pricePerUnit, passengers, isRoundTrip]);

  const handleCopy = async () => {
    if (!results) return;
    const volUnit = unitSystem === 'us' ? 'gallons' : 'liters';
    const distUnit = unitSystem === 'us' ? 'miles' : 'km';
    const text = `Trip Fuel Summary (${results.totalDistance} ${distUnit}):\nFuel Needed: ${results.fuelVolume.toFixed(2)} ${volUnit}\nTotal Trip Cost: ${currency}${results.totalCost.toFixed(2)}\nCost Per Person (${passengers} travelers): ${currency}${results.costPerPassenger.toFixed(2)}`;
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Unit System Toggle */}
      <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl max-w-xs mx-auto">
        <button
          onClick={() => {
            setUnitSystem('us');
            setEfficiency('28');
            setPricePerUnit('3.50');
          }}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            unitSystem === 'us'
              ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          US (Miles / MPG)
        </button>
        <button
          onClick={() => {
            setUnitSystem('metric');
            setEfficiency('8.5');
            setPricePerUnit('1.60');
          }}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            unitSystem === 'metric'
              ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Metric (KM / L/100km)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Controls */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Fuel className="w-5 h-5 text-amber-500" />
            Trip Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Trip Distance ({unitSystem === 'us' ? 'Miles' : 'Kilometers'})
              </label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-base font-semibold"
                placeholder="250"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="roundtrip"
                checked={isRoundTrip}
                onChange={(e) => setIsRoundTrip(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 accent-blue-600"
              />
              <label htmlFor="roundtrip" className="text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer">
                Round Trip (2x distance)
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  {unitSystem === 'us' ? 'MPG Economy' : 'L / 100km'}
                </label>
                <input
                  type="number"
                  step="any"
                  value={efficiency}
                  onChange={(e) => setEfficiency(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Gas Price / {unitSystem === 'us' ? 'Gal' : 'Liter'}
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-10 text-center rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold"
                  />
                  <input
                    type="number"
                    step="any"
                    value={pricePerUnit}
                    onChange={(e) => setPricePerUnit(e.target.value)}
                    className="flex-1 h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-semibold"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  Travelers / Passengers
                </label>
                <span className="text-xs font-bold text-blue-600">{passengers} {passengers === 1 ? 'Person' : 'People'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value, 10) || 1)}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Estimated Fuel Expense
            </h2>
            {results && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>

          {results ? (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Total Trip Fuel Cost
                </span>
                <div className="text-3xl font-black text-amber-600 dark:text-amber-300 mt-1">
                  {currency}{results.totalCost.toFixed(2)}
                </div>
              </div>

              {passengers > 1 && (
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-green-700 dark:text-green-300">Cost Per Traveler</span>
                    <span className="text-xs text-gray-500 block">Split evenly among {passengers}</span>
                  </div>
                  <span className="text-xl font-black text-green-600 dark:text-green-400">
                    {currency}{results.costPerPassenger.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500 block mb-0.5">Required Fuel Volume</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {results.fuelVolume.toFixed(2)} {unitSystem === 'us' ? 'Gallons' : 'Liters'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500 block mb-0.5">Cost Per {unitSystem === 'us' ? 'Mile' : 'KM'}</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {currency}{results.costPerDistanceUnit.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-sm text-gray-400">
              Enter trip distance to estimate gas cost.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
