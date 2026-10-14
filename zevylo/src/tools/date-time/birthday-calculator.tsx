'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Cake, Copy, Check, Heart, Sparkles, Calendar, Hourglass } from 'lucide-react';

export default function BirthdayCalculator() {
  const [eventDate, setEventDate] = useState<string>('2000-01-15');
  const [eventType, setEventType] = useState<'birthday' | 'anniversary'>('birthday');
  const [copied, setCopied] = useState<boolean>(false);
  const [now, setNow] = useState<Date | null>(null);

  // Update current time tick
  useEffect(() => {
    const timeout = setTimeout(() => setNow(new Date()), 0);
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const calculations = useMemo(() => {
    if (!eventDate || !now) return null;
    const birth = new Date(eventDate + 'T00:00:00');
    if (isNaN(birth.getTime())) return null;

    const diffMs = now.getTime() - birth.getTime();
    if (diffMs < 0) return null;

    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalWeeks = Math.floor(totalDays / 7);

    // Exact years, months, days
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

    // Next Birthday Countdown
    let nextEventYear = now.getFullYear();
    const thisYearEvent = new Date(nextEventYear, birth.getMonth(), birth.getDate());
    if (now > thisYearEvent) {
      nextEventYear += 1;
    }
    const nextEvent = new Date(nextEventYear, birth.getMonth(), birth.getDate());
    const msUntilNext = nextEvent.getTime() - now.getTime();

    const cdDays = Math.floor(msUntilNext / (1000 * 60 * 60 * 24));
    const cdHours = Math.floor((msUntilNext / (1000 * 60 * 60)) % 24);
    const cdMinutes = Math.floor((msUntilNext / (1000 * 60)) % 60);
    const cdSeconds = Math.floor((msUntilNext / 1000) % 60);

    // Day of the week born
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const bornDayName = weekdays[birth.getDay()];

    // Zodiac sign
    const m = birth.getMonth() + 1;
    const d = birth.getDate();
    let zodiac = 'Capricorn';
    if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) zodiac = 'Aquarius';
    else if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) zodiac = 'Pisces';
    else if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) zodiac = 'Aries';
    else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) zodiac = 'Taurus';
    else if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) zodiac = 'Gemini';
    else if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) zodiac = 'Cancer';
    else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) zodiac = 'Leo';
    else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) zodiac = 'Virgo';
    else if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) zodiac = 'Libra';
    else if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) zodiac = 'Scorpio';
    else if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) zodiac = 'Sagittarius';

    // Fun bio metrics
    const approxHeartbeats = Math.floor(totalMinutes * 80);
    const approxBreaths = Math.floor(totalMinutes * 16);

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      totalSeconds,
      cdDays,
      cdHours,
      cdMinutes,
      cdSeconds,
      bornDayName,
      zodiac,
      approxHeartbeats,
      approxBreaths,
      nextAge: years + 1,
    };
  }, [eventDate, now]);

  const summaryText = useMemo(() => {
    if (!calculations) return '';
    return `🎂 ${eventType === 'birthday' ? 'Birthday' : 'Anniversary'} Summary for ${eventDate}:
• Age / Milestone: ${calculations.years} years, ${calculations.months} months, and ${calculations.days} days
• Next Celebration: In ${calculations.cdDays} days, ${calculations.cdHours} hours, ${calculations.cdMinutes} minutes
• Total Days Lived: ${calculations.totalDays.toLocaleString()} days
• Total Seconds Lived: ${calculations.totalSeconds.toLocaleString()} seconds
• Zodiac Sign: ${calculations.zodiac}
• Born on a: ${calculations.bornDayName}`;
  }, [calculations, eventType, eventDate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Date Input Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 items-end">
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
            Celebration Type
          </label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value as 'birthday' | 'anniversary')}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50"
          >
            <option value="birthday">Birthday Celebration</option>
            <option value="anniversary">Marriage / Wedding Anniversary</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
            {eventType === 'birthday' ? 'Date of Birth' : 'Wedding / Anniversary Date'}
          </label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50"
          />
        </div>

        <div>
          <button
            onClick={handleCopy}
            disabled={!calculations}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors disabled:opacity-30"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            Copy Milestones
          </button>
        </div>
      </div>

      {calculations && (
        <div className="space-y-6">
          {/* Main Age Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-white/5 to-transparent border border-amber-500/20 text-center space-y-4">
            <div className="flex justify-center">
              {eventType === 'birthday' ? (
                <Cake className="w-10 h-10 text-amber-400" />
              ) : (
                <Heart className="w-10 h-10 text-red-400" />
              )}
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
              {calculations.years} <span className="text-xl sm:text-2xl text-gray-500 dark:text-zinc-400 font-normal">years</span>{' '}
              {calculations.months} <span className="text-xl sm:text-2xl text-gray-500 dark:text-zinc-400 font-normal">months</span>{' '}
              {calculations.days} <span className="text-xl sm:text-2xl text-gray-500 dark:text-zinc-400 font-normal">days</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              Born on a <strong className="text-amber-400">{calculations.bornDayName}</strong> • Zodiac Sign:{' '}
              <strong className="text-sky-400">{calculations.zodiac}</strong>
            </p>
          </div>

          {/* Next Birthday Live Countdown */}
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <div className="flex items-center gap-2">
              <Hourglass className="w-5 h-5 text-sky-400 animate-spin" />
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Countdown to Next {eventType === 'birthday' ? `Birthday (Turning ${calculations.nextAge})` : 'Anniversary'}
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
                <div className="text-3xl font-mono font-bold text-gray-900 dark:text-white">{calculations.cdDays}</div>
                <div className="text-[11px] text-gray-500 dark:text-zinc-400 uppercase mt-1">Days</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
                <div className="text-3xl font-mono font-bold text-amber-400">{calculations.cdHours}</div>
                <div className="text-[11px] text-gray-500 dark:text-zinc-400 uppercase mt-1">Hours</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
                <div className="text-3xl font-mono font-bold text-sky-400">{calculations.cdMinutes}</div>
                <div className="text-[11px] text-gray-500 dark:text-zinc-400 uppercase mt-1">Minutes</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
                <div className="text-3xl font-mono font-bold text-emerald-400">{calculations.cdSeconds}</div>
                <div className="text-[11px] text-gray-500 dark:text-zinc-400 uppercase mt-1">Seconds</div>
              </div>
            </div>
          </div>

          {/* Life In Numbers (Seconds, Days, Heartbeats) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Lifespan in Units</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
                <span className="text-xs text-gray-500 dark:text-zinc-400">Total Days</span>
                <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white mt-1">
                  {calculations.totalDays.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
                <span className="text-xs text-gray-500 dark:text-zinc-400">Total Weeks</span>
                <div className="text-2xl font-mono font-bold text-amber-400 mt-1">
                  {calculations.totalWeeks.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
                <span className="text-xs text-gray-500 dark:text-zinc-400">Total Hours</span>
                <div className="text-2xl font-mono font-bold text-sky-400 mt-1">
                  {calculations.totalHours.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
                <span className="text-xs text-gray-500 dark:text-zinc-400">Total Minutes</span>
                <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">
                  {calculations.totalMinutes.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 md:col-span-2">
                <span className="text-xs text-gray-500 dark:text-zinc-400">Total Seconds (Live Ticking)</span>
                <div className="text-2xl font-mono font-bold text-amber-300 mt-1">
                  {calculations.totalSeconds.toLocaleString()} s
                </div>
              </div>
            </div>
          </div>

          {/* Biological Estimates */}
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 flex items-center gap-4">
              <Heart className="w-8 h-8 text-rose-400 shrink-0" />
              <div>
                <div className="text-xs text-gray-500 dark:text-zinc-400">Approximate Heartbeats</div>
                <div className="text-xl font-mono font-bold text-gray-900 dark:text-white">
                  ~{calculations.approxHeartbeats.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 flex items-center gap-4">
              <Calendar className="w-8 h-8 text-sky-400 shrink-0" />
              <div>
                <div className="text-xs text-gray-500 dark:text-zinc-400">Approximate Breaths Taken</div>
                <div className="text-xl font-mono font-bold text-gray-900 dark:text-white">
                  ~{calculations.approxBreaths.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
