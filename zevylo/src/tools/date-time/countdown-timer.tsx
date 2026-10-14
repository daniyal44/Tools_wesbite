'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { CalendarClock, PartyPopper } from 'lucide-react';

function toLocalInput(d: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function CountdownTimer() {
  const [title, setTitle] = useState('New Year');
  const [target, setTarget] = useState(() => toLocalInput(new Date(new Date().getFullYear() + 1, 0, 1, 0, 0)));
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const state = useMemo(() => {
    if (now === null || !target) return null;
    const t = new Date(target).getTime();
    if (isNaN(t)) return null;
    const diff = t - now;
    const past = diff <= 0;
    const abs = Math.abs(diff);
    const days = Math.floor(abs / 86400000);
    const hours = Math.floor((abs % 86400000) / 3600000);
    const minutes = Math.floor((abs % 3600000) / 60000);
    const seconds = Math.floor((abs % 60000) / 1000);
    return { past, days, hours, minutes, seconds };
  }, [now, target]);

  const presets: { label: string; make: () => Date }[] = [
    { label: 'New Year', make: () => new Date(new Date().getFullYear() + 1, 0, 1, 0, 0) },
    { label: '+1 hour', make: () => new Date(Date.now() + 3600000) },
    { label: '+1 day', make: () => new Date(Date.now() + 86400000) },
    { label: '+1 week', make: () => new Date(Date.now() + 7 * 86400000) },
  ];

  const tiles: [number, string][] = state
    ? [
        [state.days, 'Days'],
        [state.hours, 'Hours'],
        [state.minutes, 'Minutes'],
        [state.seconds, 'Seconds'],
      ]
    : [];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Config */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cd-title" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Event name</label>
            <input
              id="cd-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Product launch"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label htmlFor="cd-target" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Target date &amp; time</label>
            <input
              id="cd-target"
              type="datetime-local"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => setTarget(toLocalInput(p.make()))}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Countdown */}
      {state ? (
        state.past && state.days === 0 && state.hours === 0 && state.minutes === 0 && state.seconds === 0 ? null : (
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950/40 p-6 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-4 text-sm font-bold text-gray-700 dark:text-gray-300">
              {state.past ? <PartyPopper className="h-5 w-5 text-amber-500" /> : <CalendarClock className="h-5 w-5 text-blue-600" />}
              <span>
                {state.past ? `${title || 'The event'} happened` : `Counting down to ${title || 'your event'}`}
                {state.past ? ' — time since:' : ''}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {tiles.map(([val, label]) => (
                <div key={label} className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 sm:p-5 text-center">
                  <div className="text-3xl sm:text-5xl font-black font-mono text-gray-900 dark:text-white tabular-nums">
                    {val.toString().padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-8 text-center text-sm text-gray-400">
          Pick a target date and time to start the countdown.
        </div>
      )}
    </div>
  );
}
