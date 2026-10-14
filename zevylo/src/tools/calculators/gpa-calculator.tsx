'use client';

import React, { useState, useMemo } from 'react';
import { Plus, Trash2, GraduationCap, Copy, Check, RotateCcw } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0,
};

export default function GpaCalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Mathematics / Calculus', grade: 'A', credits: 4 },
    { id: '2', name: 'Computer Science', grade: 'A-', credits: 3 },
    { id: '3', name: 'Physics Mechanics', grade: 'B+', credits: 4 },
    { id: '4', name: 'English Composition', grade: 'A', credits: 3 },
  ]);
  const [copied, setCopied] = useState(false);

  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      { id: Date.now().toString(), name: `Course ${prev.length + 1}`, grade: 'A', credits: 3 },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, val: string | number) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: val } : c))
    );
  };

  const resetCourses = () => {
    setCourses([
      { id: '1', name: 'Course 1', grade: 'A', credits: 3 },
      { id: '2', name: 'Course 2', grade: 'B+', credits: 3 },
      { id: '3', name: 'Course 3', grade: 'A-', credits: 3 },
    ]);
  };

  const stats = useMemo(() => {
    let totalCredits = 0;
    let totalQualityPoints = 0;

    courses.forEach((c) => {
      const pts = GRADE_POINTS[c.grade] ?? 0;
      const cr = Number(c.credits) || 0;
      totalCredits += cr;
      totalQualityPoints += pts * cr;
    });

    const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;
    return {
      totalCredits,
      totalQualityPoints,
      gpa: Math.min(4.0, gpa),
    };
  }, [courses]);

  const handleCopy = async () => {
    const text = `GPA Calculation Result:\nCumulative GPA: ${stats.gpa.toFixed(2)} / 4.0\nTotal Credits: ${stats.totalCredits}\nQuality Points: ${stats.totalQualityPoints.toFixed(1)}`;
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top GPA Banner */}
      <div className="rounded-2xl border border-blue-200 dark:border-blue-900 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/30 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-blue-600 dark:text-blue-400">
              Cumulative GPA (4.0 Scale)
            </span>
            <div className="text-4xl font-black text-gray-900 dark:text-gray-100">
              {stats.gpa.toFixed(2)}
              <span className="text-lg text-gray-400 font-semibold"> / 4.0</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-xs text-gray-500 block">Total Credits</span>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">{stats.totalCredits}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500 block">Quality Points</span>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">{stats.totalQualityPoints.toFixed(1)}</span>
          </div>
          <button
            onClick={handleCopy}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 text-gray-700 dark:text-gray-300"
            title="Copy GPA Summary"
          >
            {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Courses List */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
            Course Grades & Credits
          </h2>
          <div className="flex gap-2">
            <button
              onClick={resetCourses}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              onClick={addCourse}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Course
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {courses.map((course, idx) => (
            <div
              key={course.id}
              className="flex flex-col sm:flex-row items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
            >
              <div className="w-8 text-center text-xs font-bold text-gray-400">#{idx + 1}</div>
              <input
                type="text"
                value={course.name}
                onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                placeholder="Course Name"
                className="flex-1 h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium"
              />
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-24">
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full h-10 px-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-bold"
                  >
                    {Object.keys(GRADE_POINTS).map((g) => (
                      <option key={g} value={g}>
                        {g} ({GRADE_POINTS[g].toFixed(1)})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-20">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value, 10) || 1)}
                    className="w-full h-10 px-2 text-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-bold"
                    title="Credits"
                  />
                </div>
                <button
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length <= 1}
                  className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-30"
                  title="Remove Course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
