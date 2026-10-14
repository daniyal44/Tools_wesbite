'use client';

import React, { useState, useMemo } from 'react';
import { Tag, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState('120');
  const [discountPercent, setDiscountPercent] = useState('25');
  const [extraDiscount, setExtraDiscount] = useState('0'); // stacked discount %
  const [salesTax, setSalesTax] = useState('0');
  const [currency, setCurrency] = useState('$');
  const [copied, setCopied] = useState(false);

  const PRESETS = [10, 15, 20, 25, 30, 40, 50, 70];

  const results = useMemo(() => {
    const orig = parseFloat(originalPrice);
    const d1 = parseFloat(discountPercent);
    const d2 = parseFloat(extraDiscount) || 0;
    const taxRate = parseFloat(salesTax) || 0;

    if (isNaN(orig) || orig <= 0 || isNaN(d1) || d1 < 0) return null;

    // First discount
    const firstDiscountAmount = (orig * d1) / 100;
    const priceAfterFirst = orig - firstDiscountAmount;

    // Stacked second discount
    const secondDiscountAmount = (priceAfterFirst * d2) / 100;
    const priceAfterDiscounts = priceAfterFirst - secondDiscountAmount;

    // Sales Tax
    const taxAmount = (priceAfterDiscounts * taxRate) / 100;
    const finalTotal = priceAfterDiscounts + taxAmount;

    const totalSaved = orig - priceAfterDiscounts;
    const effectiveDiscountPercent = (totalSaved / orig) * 100;

    return {
      originalPrice: orig,
      totalSaved,
      priceAfterDiscounts,
      taxAmount,
      finalTotal,
      effectiveDiscountPercent,
    };
  }, [originalPrice, discountPercent, extraDiscount, salesTax]);

  const handleCopy = async () => {
    if (!results) return;
    const text = `Discount Summary:\nOriginal Price: ${currency}${results.originalPrice.toFixed(2)}\nTotal Savings: ${currency}${results.totalSaved.toFixed(2)} (${results.effectiveDiscountPercent.toFixed(1)}% OFF)\nFinal Price: ${currency}${results.finalTotal.toFixed(2)}`;
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
            <Tag className="w-5 h-5 text-emerald-600" />
            Price & Discounts
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Original Retail Price
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-14 text-center rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold"
                />
                <input
                  type="number"
                  step="any"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="flex-1 h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-base font-semibold"
                  placeholder="120.00"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                step="any"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-semibold"
                placeholder="25"
              />
            </div>

            {/* Quick Discount Presets */}
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => setDiscountPercent(p.toString())}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    parseFloat(discountPercent) === p
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                      : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {p}%
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Extra Coupon (%)
                </label>
                <input
                  type="number"
                  value={extraDiscount}
                  onChange={(e) => setExtraDiscount(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-semibold"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Sales Tax (%)
                </label>
                <input
                  type="number"
                  value={salesTax}
                  onChange={(e) => setSalesTax(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-semibold"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Savings & Final Price
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
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-1">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Final Sale Price
                </span>
                <div className="text-4xl font-black text-gray-900 dark:text-gray-100">
                  {currency}{results.finalTotal.toFixed(2)}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-green-700 dark:text-green-300 block">You Save</span>
                  <span className="text-xs text-gray-500 font-medium">
                    {results.effectiveDiscountPercent.toFixed(1)}% total discount
                  </span>
                </div>
                <span className="text-2xl font-black text-green-600 dark:text-green-400">
                  -{currency}{results.totalSaved.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2 text-xs font-medium divide-y divide-gray-100 dark:divide-gray-800">
                <div className="flex justify-between pt-2">
                  <span className="text-gray-500">Original Retail Price</span>
                  <span className="line-through text-gray-400 font-bold">{currency}{results.originalPrice.toFixed(2)}</span>
                </div>
                {results.taxAmount > 0 && (
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-500">Estimated Sales Tax</span>
                    <span className="text-gray-700 dark:text-gray-300 font-bold">+{currency}{results.taxAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-sm text-gray-400">
              Enter price and discount percentage.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
