'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Clock, Calendar, Sparkles } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface CronPreset {
  label: string;
  expression: string;
  description: string;
}

const PRESETS: CronPreset[] = [
  { label: 'Every minute', expression: '* * * * *', description: 'Runs every single minute' },
  { label: 'Every 5 minutes', expression: '*/5 * * * *', description: 'Runs every 5 minutes' },
  { label: 'Every 15 minutes', expression: '*/15 * * * *', description: 'Runs every 15 minutes' },
  { label: 'Every hour', expression: '0 * * * *', description: 'Runs at minute 0 of every hour' },
  { label: 'Every day at midnight', expression: '0 0 * * *', description: 'Runs daily at 00:00:00' },
  { label: 'Weekdays at 9:00 AM', expression: '0 9 * * 1-5', description: 'Runs Mon-Fri at 09:00 AM' },
  { label: 'Every Sunday at midnight', expression: '0 0 * * 0', description: 'Runs once a week on Sunday' },
  { label: '1st of every month', expression: '0 0 1 * *', description: 'Runs at 00:00 on day 1 of month' },
];

function explainCron(minute: string, hour: string, dom: string, month: string, dow: string): string {
  const parts: string[] = [];

  // Minute
  if (minute === '*') parts.push('Every minute');
  else if (minute.startsWith('*/')) parts.push(`Every ${minute.slice(2)} minutes`);
  else parts.push(`At minute ${minute}`);

  // Hour
  if (hour === '*') {
    // any hour
  } else if (hour.startsWith('*/')) parts.push(`of every ${hour.slice(2)} hours`);
  else parts.push(`past hour ${hour}:00`);

  // Day of Month
  if (dom !== '*') {
    parts.push(`on day-of-month ${dom}`);
  }

  // Month
  if (month !== '*') {
    const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    parts.push(`in month ${monthNames[Number(month)] || month}`);
  }

  // Day of Week
  if (dow === '*') {
    // any day
  } else if (dow === '1-5') {
    parts.push('on every weekday (Monday through Friday)');
  } else if (dow === '0,6' || dow === '6,0') {
    parts.push('on weekends (Saturday and Sunday)');
  } else {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[Number(dow)] || `day ${dow}`;
    parts.push(`on ${dayName}`);
  }

  return parts.join(' ') || 'Runs according to schedule';
}

export default function CronGenerator() {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dom, setDom] = useState('*');
  const [month, setMonth] = useState('*');
  const [dow, setDow] = useState('*');
  const [copied, setCopied] = useState(false);

  const cronExpression = `${minute} ${hour} ${dom} ${month} ${dow}`;

  const explanation = useMemo(() => {
    return explainCron(minute, hour, dom, month, dow);
  }, [minute, hour, dom, month, dow]);

  const applyPreset = (expr: string) => {
    const parts = expr.split(' ');
    if (parts.length === 5) {
      setMinute(parts[0]);
      setHour(parts[1]);
      setDom(parts[2]);
      setMonth(parts[3]);
      setDow(parts[4]);
    }
  };

  const handleCopy = async () => {
    await copyToClipboard(cronExpression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Visual Expression Display Banner */}
      <div className="rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950/40 p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Crontab Expression
            </span>
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-wide">
              {cronExpression}
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
          >
            {copied ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5" />}
            <span>{copied ? 'Copied Expression!' : 'Copy Expression'}</span>
          </button>
        </div>

        {/* Plain English Translation */}
        <div className="rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 p-4 flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Human Translation</span>
            <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
              “{explanation}”
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Builders Grid */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-6">
        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Interactive Schedule Builder
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Minute */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">1. Minute (0-59)</label>
            <select
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-full h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 font-mono font-medium"
            >
              <option value="*">* (Every minute)</option>
              <option value="*/5">*/5 (Every 5 mins)</option>
              <option value="*/10">*/10 (Every 10 mins)</option>
              <option value="*/15">*/15 (Every 15 mins)</option>
              <option value="*/30">*/30 (Every 30 mins)</option>
              <option value="0">0 (At minute 0)</option>
              <option value="30">30 (At minute 30)</option>
            </select>
          </div>

          {/* Hour */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">2. Hour (0-23)</label>
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-full h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 font-mono font-medium"
            >
              <option value="*">* (Every hour)</option>
              <option value="*/2">*/2 (Every 2 hours)</option>
              <option value="*/6">*/6 (Every 6 hours)</option>
              <option value="*/12">*/12 (Every 12 hours)</option>
              <option value="0">0 (Midnight / 00:00)</option>
              <option value="6">6 (06:00 AM)</option>
              <option value="9">9 (09:00 AM)</option>
              <option value="12">12 (Noon / 12:00 PM)</option>
              <option value="18">18 (06:00 PM)</option>
            </select>
          </div>

          {/* Day of Month */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">3. Day of Month (1-31)</label>
            <select
              value={dom}
              onChange={(e) => setDom(e.target.value)}
              className="w-full h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 font-mono font-medium"
            >
              <option value="*">* (Every day)</option>
              <option value="1">1 (1st of month)</option>
              <option value="15">15 (Mid-month)</option>
              <option value="L" disabled>31 (End of month)</option>
            </select>
          </div>

          {/* Month */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">4. Month (1-12)</label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 font-mono font-medium"
            >
              <option value="*">* (Every month)</option>
              <option value="1">1 (January)</option>
              <option value="3">3 (March)</option>
              <option value="6">6 (June)</option>
              <option value="9">9 (September)</option>
              <option value="12">12 (December)</option>
            </select>
          </div>

          {/* Day of Week */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">5. Day of Week (0-6)</label>
            <select
              value={dow}
              onChange={(e) => setDow(e.target.value)}
              className="w-full h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 font-mono font-medium"
            >
              <option value="*">* (Every day)</option>
              <option value="1-5">1-5 (Mon to Fri)</option>
              <option value="0,6">0,6 (Weekends)</option>
              <option value="1">1 (Monday)</option>
              <option value="5">5 (Friday)</option>
              <option value="0">0 (Sunday)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Common Presets Grid */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Common Schedule Presets
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => applyPreset(preset.expression)}
              className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 text-left transition-all group"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
                  {preset.label}
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  {preset.expression}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {preset.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
