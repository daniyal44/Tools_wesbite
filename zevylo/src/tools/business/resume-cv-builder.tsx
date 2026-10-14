'use client';

import React, { useState } from 'react';
import { User, Printer, Download, Plus, Trash2, Briefcase, GraduationCap } from 'lucide-react';

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export default function ResumeCvBuilder() {
  const [fullName, setFullName] = useState<string>('Alex Morgan');
  const [title, setTitle] = useState<string>('Senior Full-Stack Software Engineer');
  const [email, setEmail] = useState<string>('alex.morgan@example.com');
  const [phone, setPhone] = useState<string>('+1 (555) 234-5678');
  const [location, setLocation] = useState<string>('San Francisco, CA');
  const [website, setWebsite] = useState<string>('https://alexmorgan.dev');
  const [summary, setSummary] = useState<string>(
    'Results-driven Software Engineer with 7+ years of experience architecting high-scale distributed systems, Next.js web applications, and resilient cloud infrastructure. Passionate about developer productivity, clean code, and user privacy.'
  );
  const [skills, setSkills] = useState<string>('TypeScript, React, Next.js, Node.js, Python, PostgreSQL, Docker, AWS, Tailwind CSS, Git');

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      role: 'Lead Frontend Architect',
      company: 'Nova Cloud Systems',
      period: '2023 - Present',
      description: '• Architected zero-latency client-side workspace serving 500k+ active users.\n• Reduced Core Web Vitals LCP by 62% using edge pre-rendering and code-splitting.\n• Mentored a team of 8 engineers and standardized design token component library.',
    },
    {
      id: '2',
      role: 'Full-Stack Developer',
      company: 'Apex Digital Labs',
      period: '2020 - 2023',
      description: '• Built end-to-end payment processing pipelines handling $12M+ monthly transaction volume.\n• Implemented automated CI/CD workflows and automated regression test suites.',
    },
  ]);

  const [educations, setEducations] = useState<Education[]>([
    {
      id: '1',
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      year: '2016 - 2020',
    },
  ]);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now().toString(),
        role: 'Job Title',
        company: 'Company Name',
        period: '2022 - 2024',
        description: '• Key achievement or responsibility...',
      },
    ]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(
      experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        id: Date.now().toString(),
        degree: 'Degree / Certificate',
        institution: 'University / Institute',
        year: 'Graduation Year',
      },
    ]);
  };

  const removeEducation = (id: string) => {
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducations(
      educations.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleDownloadDocxHtml = () => {
    const resumeHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${fullName} - Resume</title>
<style>
  body { font-family: Arial, sans-serif; line-height: 1.5; color: #111; max-width: 800px; margin: 40px auto; padding: 20px; }
  h1 { font-size: 26px; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px; }
  h2 { font-size: 14px; color: #555; margin-top: 0; font-weight: normal; }
  h3 { font-size: 16px; border-bottom: 2px solid #222; padding-bottom: 4px; margin-top: 24px; text-transform: uppercase; }
  .contact { font-size: 12px; color: #666; margin-bottom: 20px; }
  .job-header { display: flex; justify-content: space-between; font-weight: bold; }
  .job-sub { color: #666; font-style: italic; margin-bottom: 6px; }
  ul { margin-top: 4px; padding-left: 20px; }
</style>
</head>
<body>
  <h1>${fullName}</h1>
  <h2>${title}</h2>
  <div class="contact">${email} | ${phone} | ${location} | ${website}</div>
  
  <h3>Professional Summary</h3>
  <p>${summary}</p>

  <h3>Skills</h3>
  <p>${skills}</p>

  <h3>Experience</h3>
  ${experiences
    .map(
      (exp) => `
    <div>
      <div class="job-header"><span>${exp.role}</span><span>${exp.period}</span></div>
      <div class="job-sub">${exp.company}</div>
      <p style="white-space: pre-line;">${exp.description}</p>
    </div>`
    )
    .join('')}

  <h3>Education</h3>
  ${educations
    .map(
      (edu) => `
    <div>
      <div class="job-header"><span>${edu.degree}</span><span>${edu.year}</span></div>
      <div class="job-sub">${edu.institution}</div>
    </div>`
    )
    .join('')}
</body>
</html>`;

    const blob = new Blob([resumeHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fullName.replace(/\s+/g, '_')}_Resume.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Action Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-gray-900 dark:text-white">Live Resume & CV Builder</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadDocxHtml}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-gray-900 dark:text-white text-xs font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Word / DOC
          </button>
          <button
            onClick={handlePrintPdf}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors shadow-lg shadow-amber-500/20"
          >
            <Printer className="w-4 h-4" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {/* Editor Form Columns */}
        <div className="space-y-6">
          {/* Personal Info */}
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider text-amber-400">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 dark:text-zinc-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-zinc-400 mb-1">Target Job Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-zinc-400 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-zinc-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-zinc-400 mb-1">City, State / Country</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-zinc-400 mb-1">Website / LinkedIn</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 dark:text-zinc-400 mb-1">Professional Summary</label>
              <textarea
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 dark:text-zinc-400 mb-1">Core Skills (Comma-separated)</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Work Experience */}
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider text-sky-400">
                  Work Experience
                </h3>
              </div>
              <button
                onClick={addExperience}
                className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" /> Add Job
              </button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 space-y-3 relative">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Role / Title"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Period (e.g. 2021 - Present)"
                      value={exp.period}
                      onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Bullet points and achievements..."
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs leading-relaxed"
                  />
                  {experiences.length > 1 && (
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 mt-1"
                    >
                      <Trash2 className="w-3 h-3" /> Remove Position
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider text-emerald-400">
                  Education & Certifications
                </h3>
              </div>
              <button
                onClick={addEducation}
                className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" /> Add Degree
              </button>
            </div>

            <div className="space-y-3">
              {educations.map((edu) => (
                <div key={edu.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Degree / Major"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder="School / University"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Years"
                      value={edu.year}
                      onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs"
                    />
                  </div>
                  {educations.length > 1 && (
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Remove Degree
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Resume Sheet Preview (Clean Paper Styling) */}
        <div className="sticky top-6 p-8 sm:p-12 rounded-2xl bg-white text-zinc-900 shadow-2xl space-y-6 min-h-[750px] font-sans print:shadow-none print:m-0 print:p-6">
          {/* Header */}
          <div className="border-b-2 border-zinc-900 pb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-zinc-900">
              {fullName || 'Your Name'}
            </h1>
            <h2 className="text-sm font-semibold text-zinc-600 mt-1 uppercase tracking-wider">
              {title || 'Job Title'}
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 dark:text-zinc-500 mt-3 font-medium">
              {email && <span>{email}</span>}
              {phone && <span>• {phone}</span>}
              {location && <span>• {location}</span>}
              {website && <span>• {website}</span>}
            </div>
          </div>

          {/* Summary */}
          {summary && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                Executive Summary
              </h3>
              <p className="text-xs leading-relaxed text-zinc-700">{summary}</p>
            </div>
          )}

          {/* Skills */}
          {skills && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                Core Competencies & Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.split(',').map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 text-[11px] font-medium border border-zinc-200"
                  >
                    {s.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-3">
                Professional Experience
              </h3>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-bold text-zinc-900">{exp.role}</span>
                      <span className="text-gray-400 dark:text-zinc-500 font-mono text-[11px]">{exp.period}</span>
                    </div>
                    <div className="text-xs text-zinc-600 italic font-medium">{exp.company}</div>
                    <p className="text-xs text-zinc-700 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {educations.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                Education
              </h3>
              <div className="space-y-2">
                {educations.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline text-xs">
                    <div>
                      <span className="font-bold text-zinc-900">{edu.degree}</span>
                      <span className="text-zinc-600"> — {edu.institution}</span>
                    </div>
                    <span className="text-gray-400 dark:text-zinc-500 font-mono text-[11px]">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
