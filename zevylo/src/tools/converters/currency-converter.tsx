'use client';

import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Search, TrendingUp, Copy, Check } from 'lucide-react';

interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  ratePerUSD: number; // Baseline exchange rate vs 1 USD
}

const CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', ratePerUSD: 1.0 },
  { code: 'EUR', name: 'Euro', symbol: '€', ratePerUSD: 0.92 },
  { code: 'GBP', name: 'British Pound', symbol: '£', ratePerUSD: 0.79 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', ratePerUSD: 154.5 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', ratePerUSD: 1.38 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', ratePerUSD: 1.53 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', ratePerUSD: 0.88 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', ratePerUSD: 7.24 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', ratePerUSD: 83.5 },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', ratePerUSD: 278.4 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', ratePerUSD: 3.67 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', ratePerUSD: 3.75 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', ratePerUSD: 1.35 },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', ratePerUSD: 7.82 },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', ratePerUSD: 1.66 },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', ratePerUSD: 5.65 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', ratePerUSD: 18.2 },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', ratePerUSD: 19.8 },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', ratePerUSD: 34.2 },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', ratePerUSD: 1380.0 },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', ratePerUSD: 10.6 },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', ratePerUSD: 10.9 },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', ratePerUSD: 6.88 },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', ratePerUSD: 3.98 },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', ratePerUSD: 36.6 },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', ratePerUSD: 16250.0 },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', ratePerUSD: 4.68 },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', ratePerUSD: 58.4 },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', ratePerUSD: 25400.0 },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'KD', ratePerUSD: 0.31 },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'QR', ratePerUSD: 3.64 },
  { code: 'OMR', name: 'Omani Rial', symbol: 'OMR', ratePerUSD: 0.385 },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(100);
  const [fromCode, setFromCode] = useState<string>('USD');
  const [toCode, setToCode] = useState<string>('EUR');
  const [search, setSearch] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const fromCurr = useMemo(() => CURRENCIES.find((c) => c.code === fromCode) || CURRENCIES[0], [fromCode]);
  const toCurr = useMemo(() => CURRENCIES.find((c) => c.code === toCode) || CURRENCIES[1], [toCode]);

  // Conversion rate: (toRate / fromRate)
  const exchangeRate = useMemo(() => {
    return toCurr.ratePerUSD / fromCurr.ratePerUSD;
  }, [fromCurr, toCurr]);

  const convertedValue = useMemo(() => {
    return amount * exchangeRate;
  }, [amount, exchangeRate]);

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  const handleCopy = () => {
    const text = `${amount} ${fromCurr.code} = ${convertedValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })} ${toCurr.code}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredCurrencies = useMemo(() => {
    if (!search.trim()) return CURRENCIES;
    const q = search.toLowerCase();
    return CURRENCIES.filter((c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="space-y-8">
      {/* Main Conversion Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm sm:p-8">
        <div className="grid gap-6 md:grid-cols-7 md:items-center">
          {/* Amount and From Currency */}
          <div className="md:col-span-3 space-y-4">
            <div>
              <label htmlFor="amount-input" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                  {fromCurr.symbol}
                </span>
                <input
                  id="amount-input"
                  type="number"
                  min="0"
                  step="any"
                  value={Number.isNaN(amount) ? '' : amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 pl-10 pr-4 py-3 text-lg font-bold text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="from-currency-select" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                From Currency
              </label>
              <select
                id="from-currency-select"
                value={fromCode}
                onChange={(e) => setFromCode(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} — {c.name} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center md:col-span-1">
            <button
              onClick={handleSwap}
              title="Swap currencies"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-sm transition-transform hover:scale-110 hover:border-blue-500 hover:text-blue-600 active:rotate-180"
            >
              <ArrowLeftRight className="h-5 w-5" />
            </button>
          </div>

          {/* Result and To Currency */}
          <div className="md:col-span-3 space-y-4">
            <div>
              <label htmlFor="converted-amount-display" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                Converted Amount
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                  {toCurr.symbol}
                </span>
                <input
                  id="converted-amount-display"
                  type="text"
                  readOnly
                  value={convertedValue.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4,
                  })}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/40 pl-10 pr-12 py-3 text-lg font-bold text-blue-600 dark:text-blue-400 focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  title="Copy result"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="to-currency-select" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                To Currency
              </label>
              <select
                id="to-currency-select"
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} — {c.name} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Live Exchange Rate Summary */}
        <div className="mt-8 rounded-xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/60 dark:bg-blue-950/20 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-medium">
              <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>
                1 {fromCurr.code} = {exchangeRate.toFixed(4)} {toCurr.code}
              </span>
              <span className="text-gray-400 dark:text-gray-500">|</span>
              <span>
                1 {toCurr.code} = {(1 / exchangeRate).toFixed(4)} {fromCurr.code}
              </span>
            </div>
            <span className="text-xs text-blue-700/80 dark:text-blue-400/80">
              Instant offline calculation • Zero server lag
            </span>
          </div>
        </div>
      </div>

      {/* Quick Comparison Grid */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              {amount} {fromCurr.code} across Global Currencies
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Live conversion matrix compared against major world currencies
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Filter currencies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-8 pr-3 py-1.5 text-xs text-gray-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredCurrencies.map((c) => {
            const val = amount * (c.ratePerUSD / fromCurr.ratePerUSD);
            const isSelected = c.code === toCode;
            return (
              <button
                key={c.code}
                onClick={() => setToCode(c.code)}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                    : 'border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-bold text-xs text-gray-900 dark:text-white">{c.code}</span>
                  <span className="text-[10px] text-gray-400">{c.symbol}</span>
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate w-full">
                  {val >= 1000 ? val.toLocaleString('en-US', { maximumFractionDigits: 0 }) : val.toFixed(2)}
                </div>
                <span className="text-[10px] text-gray-400 truncate w-full">{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
