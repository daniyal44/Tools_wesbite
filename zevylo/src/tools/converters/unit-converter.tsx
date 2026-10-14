'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Check, Copy, ArrowRightLeft, Info } from 'lucide-react';

const CATEGORIES = {
  Length: { mm: 0.001, cm: 0.01, m: 1, km: 1000, inch: 0.0254, foot: 0.3048, yard: 0.9144, mile: 1609.344, 'nautical mile': 1852 },
  Weight: { mg: 0.000001, g: 0.001, kg: 1, 'metric ton': 1000, oz: 0.028349523125, lb: 0.45359237, stone: 6.35029318, 'US ton': 907.18474 },
  Area: { 'mm²': 0.000001, 'cm²': 0.0001, 'm²': 1, 'km²': 1000000, 'inch²': 0.00064516, 'foot²': 0.09290304, 'yard²': 0.83612736, acre: 4046.8564224, hectare: 10000, 'mile²': 2589988.110336 },
  Volume: { mL: 0.001, L: 1, 'm³': 1000, tsp: 0.00492892159375, tbsp: 0.01478676478125, 'fl oz (US)': 0.0295735295625, 'cup (US)': 0.2365882365, 'pint (US)': 0.473176473, 'quart (US)': 0.946352946, 'gallon (US)': 3.785411784, 'fl oz (UK)': 0.0284130625, 'pint (UK)': 0.56826125, 'gallon (UK)': 4.54609 },
  Speed: { 'm/s': 1, 'km/h': 0.2777777777777778, mph: 0.44704, knots: 0.5144444444444445, 'ft/s': 0.3048 },
  Time: { ms: 0.001, seconds: 1, minutes: 60, hours: 3600, days: 86400, weeks: 604800, months: 2629948.8, years: 31557600 },
  Pressure: { Pa: 1, kPa: 1000, bar: 100000, psi: 6894.757293168, atm: 101325, mmHg: 133.322387415, inHg: 3386.3881578947 },
  Energy: { J: 1, kJ: 1000, cal: 4.184, kcal: 4184, Wh: 3600, kWh: 3600000, BTU: 1055.05585262, eV: 1.602176634e-19 },
  'Data Size': { bit: 1/8, byte: 1, KB: 1e3, MB: 1e6, GB: 1e9, TB: 1e12, PB: 1e15, KiB: 1024, MiB: 1048576, GiB: 1073741824, TiB: 1099511627776 },
};

export default function UnitConverter() {
  const categories = Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>;
  const [category, setCategory] = useState<string>('Length');
  const tempUnits = ['Celsius', 'Fahrenheit', 'Kelvin'];
  
  const allCategories = ['Temperature', ...categories];

  const getUnits = (cat: string) => cat === 'Temperature' ? tempUnits : Object.keys(CATEGORIES[cat as keyof typeof CATEGORIES] || {});

  const [fromUnit, setFromUnit] = useState(getUnits('Length')[0]);
  const [toUnit, setToUnit] = useState(getUnits('Length')[1]);
  const [value, setValue] = useState('1');
  const [copied, setCopied] = useState(false);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    const units = getUnits(cat);
    setFromUnit(units[0]);
    setToUnit(units[1]);
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const convertTemperature = (val: number, from: string, to: string) => {
    if (from === to) return val;
    let celsius = val;
    // to Celsius
    if (from === 'Fahrenheit') celsius = (val - 32) * 5/9;
    else if (from === 'Kelvin') celsius = val - 273.15;
    
    // from Celsius
    if (to === 'Fahrenheit') return (celsius * 9/5) + 32;
    if (to === 'Kelvin') return celsius + 273.15;
    return celsius;
  };

  const convert = () => {
    const num = parseFloat(value);
    if (isNaN(num)) return null;

    if (category === 'Temperature') {
      return convertTemperature(num, fromUnit, toUnit);
    }

    const rates = CATEGORIES[category as keyof typeof CATEGORIES] as Record<string, number>;
    const inBase = num * rates[fromUnit];
    return inBase / rates[toUnit];
  };

  const result = convert();

  const handleCopy = async () => {
    if (result !== null) {
      await copyToClipboard(String(result));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
        <Info className="w-4 h-4" />
        Processed locally in your browser
      </div>

      <div className="flex flex-wrap gap-2">
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              (category as string) === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              placeholder="0"
            />
          </div>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          >
            {getUnits(category as string).map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSwap}
          className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors mt-6"
          title="Swap units"
        >
          <ArrowRightLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
            <div className="w-full px-4 py-2 bg-white dark:bg-gray-900 border rounded-lg dark:border-gray-700 font-medium text-gray-900 dark:text-white flex justify-between items-center overflow-hidden">
              <span className="truncate">
                {result !== null ? (Number.isInteger(result) ? result : result.toPrecision(7).replace(/\.?0+e/, 'e').replace(/\.?0+$/, '')) : '-'}
              </span>
              <button onClick={handleCopy} className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          >
            {getUnits(category as string).map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
