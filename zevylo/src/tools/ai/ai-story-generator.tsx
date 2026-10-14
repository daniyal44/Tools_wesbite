'use client';

import React, { useState, useMemo } from 'react';
import { BookOpen, Copy, Check, Sparkles, Feather, Bookmark, Compass } from 'lucide-react';

const GENRES = [
  { id: 'sci-fi', label: 'Hard Sci-Fi / Space Opera' },
  { id: 'fantasy', label: 'Dark / Epic Fantasy' },
  { id: 'thriller', label: 'Psychological Thriller' },
  { id: 'cyberpunk', label: 'Dystopian Cyberpunk' },
  { id: 'mystery', label: 'Noir Detective Mystery' },
];

export default function AiStoryGenerator() {
  const [premise, setPremise] = useState('An archivist discovers an unindexed memory chip inside an android that contains the last living memories of a forgotten civilization');
  const [selectedGenre, setSelectedGenre] = useState('cyberpunk');
  const [protagonistRole, setProtagonistRole] = useState('Disillusioned memory reconstructor');
  const [copied, setCopied] = useState(false);

  const story = useMemo(() => {
    const p = premise.trim() || 'A lone wanderer enters a sealed forbidden zone';
    const genreObj = GENRES.find((g) => g.id === selectedGenre) || GENRES[0];

    const title = `The Echo of Fractured Glass`;
    const protagonist = {
      name: 'Kaelen Vance',
      role: protagonistRole,
      internalFlaw: 'Haunted by a tragic mistake in the past, struggling with emotional detachment',
      externalGoal: 'Uncover the origin of the anomaly before the ruling syndicate erases all traces',
    };

    const acts = [
      {
        act: 'Act I: The Inciting Incident',
        summary: `Working late in the subterranean archives, Kaelen bypasses security protocols on a decommissioned unit. Instead of corrupt telemetry, the terminal floods with sensory data from a world that officially ceased to exist two centuries ago.`,
      },
      {
        act: 'Act II: The Rising Tension & Midpoint',
        summary: `Pursued by corporate clean-up enforcers, Kaelen must team up with an enigmatic outlaw broker. At the midpoint, they decode the central coordinate—only to realize the lost civilization was not destroyed by nature, but systematically liquidated by the very institution Kaelen serves.`,
      },
      {
        act: 'Act III: The Climax & Resolution',
        summary: `Backed into the central broadcast relay, Kaelen faces a moral crossroads: overwrite the broadcast to save their own life, or transmit the unfiltered truth to the planetary comm-grid, permanently destabilizing the metropolis.`,
      },
    ];

    const plotTwist = `The memory chip does not belong to a victim of the forgotten civilization—it contains Kaelen's own erased memories from before their forced cognitive reset.`;

    const openingScene = `The rain against the reinforced plasteel sounded like gravel thrown at a coffin. Down on Sub-Level 4, the air tasted of ozone and thirty years of damp insulation. Kaelen Vance peeled back the thermal shielding on the chassis, breath pluming in the chill. Most tech that ended up here was scrap—crushed servos, burnt neural combs, empty metal shells. But when the diagnostic probe clicked into socket seven, the terminal didn't pulse amber. It flashed a deep, blinding violet that hadn't been calibrated into any system since the Fall.`;

    return {
      title,
      genre: genreObj.label,
      protagonist,
      acts,
      plotTwist,
      openingScene,
    };
  }, [premise, selectedGenre, protagonistRole]);

  const fullMarkdown = useMemo(() => {
    return `# ${story.title}
**Genre:** ${story.genre}

### 👤 Protagonist
- **Name:** ${story.protagonist.name} (${story.protagonist.role})
- **Internal Conflict:** ${story.protagonist.internalFlaw}
- **Objective:** ${story.protagonist.externalGoal}

### 📖 Three-Act Structure
${story.acts.map((a) => `#### ${a.act}\n${a.summary}`).join('\n\n')}

### ⚡ The High-Stakes Plot Twist
> ${story.plotTwist}

### 🖋️ Opening Scene Prose
${story.openingScene}
`;
  }, [story]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <label className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-500" />
          Core Story Concept or What-If Premise
        </label>
        <textarea
          rows={3}
          value={premise}
          onChange={(e) => setPremise(e.target.value)}
          placeholder="e.g. A botanist on Mars finds a flower blooming inside an irradiated crater..."
          className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4 text-xs sm:text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1.5">Fiction Genre:</label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2 text-xs font-semibold text-gray-900 dark:text-gray-100 focus:outline-none"
            >
              {GENRES.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1.5">Protagonist Archetype / Role:</label>
            <input
              type="text"
              value={protagonistRole}
              onChange={(e) => setProtagonistRole(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2 text-xs font-semibold text-gray-900 dark:text-gray-100 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Generated Story Canvas */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {story.genre}
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
              {story.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Story!' : 'Copy Full Blueprint'}</span>
          </button>
        </div>

        {/* Character Card */}
        <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> Character Dossier: {story.protagonist.name}
          </h3>
          <p className="text-xs text-gray-700 dark:text-gray-300">
            <strong>Role:</strong> {story.protagonist.role} • <strong>Internal Conflict:</strong> {story.protagonist.internalFlaw}
          </p>
          <p className="text-xs text-gray-700 dark:text-gray-300">
            <strong>Mission Objective:</strong> {story.protagonist.externalGoal}
          </p>
        </div>

        {/* 3 Acts */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Three-Act Narrative Structure
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {story.acts.map((act, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 space-y-2">
                <span className="text-xs font-bold text-gray-900 dark:text-gray-100 block">
                  {act.act}
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {act.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Plot Twist */}
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 text-amber-700 dark:text-amber-300">
            ⚡ Climactic Plot Twist
          </span>
          <p className="text-xs sm:text-sm font-medium leading-relaxed">
            {story.plotTwist}
          </p>
        </div>

        {/* Opening Scene Prose */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <Feather className="w-3.5 h-3.5" /> Opening Scene Prose Sample
          </h3>
          <div className="p-5 rounded-xl bg-gray-950 text-gray-200 font-serif text-sm leading-relaxed border border-gray-800 select-all">
            {story.openingScene}
          </div>
        </div>
      </div>
    </div>
  );
}
