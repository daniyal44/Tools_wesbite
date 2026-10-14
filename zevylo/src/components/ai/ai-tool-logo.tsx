'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface AIToolLogoProps {
  name: string;
  slug: string;
  url: string;
  logoUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 rounded-xl text-xs',
  md: 'w-12 h-12 rounded-2xl text-base',
  lg: 'w-14 h-14 rounded-2xl text-lg',
  xl: 'w-20 h-20 rounded-3xl text-3xl',
};

const iconPixelSizes = {
  sm: 24,
  md: 32,
  lg: 40,
  xl: 56,
};

// Top Tier AI Brands with Official Vector SVGs
function renderOfficialSVG(rawSlug: string, pixelSize: number): React.ReactNode | null {
  const s = pixelSize;
  const slug = rawSlug.toLowerCase();

  // 1. Google Gemini (Official Curved Diamond Sparkle)
  if (slug.includes('gemini') || slug === 'google-gemini') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gemini-official-star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1BA1E3" />
            <stop offset="35%" stopColor="#5486FF" />
            <stop offset="70%" stopColor="#9E6CF5" />
            <stop offset="100%" stopColor="#DF6575" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="#F8FAFC" className="dark:fill-[#0F172A]" />
        <path
          d="M12 2C12 7.523 7.523 12 2 12C7.523 12 12 16.477 12 22C12 16.477 16.477 12 22 12C16.477 12 12 7.523 12 2Z"
          fill="url(#gemini-official-star-grad)"
        />
      </svg>
    );
  }

  // 2. OpenAI / ChatGPT / GPT-5 Orion / DALL-E / Sora (Official OpenAI Rosette)
  if (slug.includes('chatgpt') || slug.includes('openai') || slug.includes('gpt-5') || slug.includes('dall-e') || slug.includes('sora') || slug.includes('searchgpt')) {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#10A37F" />
        <path
          fill="#FFFFFF"
          d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.98 4.182a5.985 5.985 0 0 0-3.997 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.91 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.998-2.9 6.056 6.056 0 0 0-.748-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .393-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.495 4.494zm-9.66-4.125a4.471 4.471 0 0 1-.535-3.014l.142.085 4.783 2.758a.771.771 0 0 0 .78 0l5.843-3.368v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.499 4.499 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.7664.7664 0 0 0 .388.677l5.814 3.354-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.1 3.856L12.597 8.383l2.02-1.164a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.104v-5.677a.79.79 0 0 0-.403-.681zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.407 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.499 4.499 0 0 1 6.68 4.66zM8.307 12.863l-2.02-1.164a.08.08 0 0 1-.039-.057V6.074a4.499 4.499 0 0 1 7.376-3.454l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l3.102-1.8 3.102 1.8v3.59l-3.102 1.792-3.102-1.8z"
        />
      </svg>
    );
  }

  // 3. Anthropic Claude (Official Terracotta Badge)
  if (slug.includes('claude') || slug.includes('anthropic')) {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#D97757" />
        <path
          fill="#FFFFFF"
          d="M17.418 16.594l-.84-2.12a.49.49 0 0 0-.46-.32h-3.23a.49.49 0 0 0-.46.32l-.84 2.12a.49.49 0 0 0 .46.67h4.91a.49.49 0 0 0 .46-.67zM14.5 9.17l1.07 2.7h-2.14l1.07-2.7zm-2.07 9.87h3.14l1.32 3.32a.49.49 0 0 0 .46.32h1.61a.49.49 0 0 0 .46-.66L15.82 1.34a.49.49 0 0 0-.91 0L11.31 22a.49.49 0 0 0 .46.66h1.61a.49.49 0 0 0 .46-.32l.59-1.48z"
        />
      </svg>
    );
  }

  // 4. Midjourney
  if (slug.includes('midjourney')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#0E1117" />
        <path
          d="M24 10L36 34H12L24 10Z"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M24 10V34M12 34C16 38 32 38 36 34"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // 5. Perplexity
  if (slug.includes('perplexity')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#20B2AA" fillOpacity="0.15" />
        <path
          d="M24 8V40M13 13L35 35M8 24H40M13 35L35 13"
          stroke="#20B2AA"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="6" fill="#20B2AA" />
      </svg>
    );
  }

  // 6. DeepSeek
  if (slug.includes('deepseek')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#1E88E5" fillOpacity="0.12" />
        <path
          d="M10 26C12 18 20 12 32 12C38 12 40 14 40 16C40 22 36 32 26 34C18 36 12 34 8 28C12 28 16 30 20 28"
          stroke="#1E88E5"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M32 12L42 8C40 12 40 16 42 20L36 16"
          fill="#1E88E5"
        />
        <circle cx="20" cy="20" r="2.5" fill="#1E88E5" />
      </svg>
    );
  }

  // 7. Cursor
  if (slug.includes('cursor')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#000000" />
        <path
          d="M24 10L37 17.5V32.5L24 40L11 32.5V17.5L24 10Z"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M24 10V25M37 17.5L24 25M11 17.5L24 25"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 8. GitHub Copilot
  if (slug.includes('copilot')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#6E40C9" fillOpacity="0.15" />
        <path
          d="M12 20C12 15 17 12 24 12C31 12 36 15 36 20V28C36 33 31 36 24 36C17 36 12 33 12 28V20Z"
          stroke="#6E40C9"
          strokeWidth="3"
          fill="#FFFFFF"
        />
        <ellipse cx="19" cy="24" rx="2.5" ry="3.5" fill="#6E40C9" />
        <ellipse cx="29" cy="24" rx="2.5" ry="3.5" fill="#6E40C9" />
        <path d="M19 12V8M29 12V8" stroke="#6E40C9" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 9. Runway
  if (slug.includes('runway')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#111111" />
        <path
          d="M16 12H27C31.5 12 34 14.5 34 18.5C34 22.5 31.5 25 27 25H20V36H16V12ZM20 21.5H26.5C28.8 21.5 30 20.3 30 18.5C30 16.7 28.8 15.5 26.5 15.5H20V21.5ZM26 25L34 36H29L21.5 25.5L26 25Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 10. ElevenLabs
  if (slug.includes('elevenlabs') || slug.includes('eleven-labs')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#000000" />
        <rect x="18" y="12" width="4" height="24" rx="2" fill="#FFFFFF" />
        <rect x="26" y="12" width="4" height="24" rx="2" fill="#FFFFFF" />
      </svg>
    );
  }

  // 11. Grok (xAI)
  if (slug.includes('grok') || slug.includes('xai')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#000000" />
        <path d="M14 36L34 12" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
        <circle cx="16" cy="14" r="3" fill="#FFFFFF" />
        <circle cx="32" cy="34" r="3" fill="#FFFFFF" />
      </svg>
    );
  }

  // 12. Mistral
  if (slug.includes('mistral')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#FA521E" fillOpacity="0.12" />
        <rect x="12" y="12" width="7" height="7" fill="#FA521E" />
        <rect x="29" y="12" width="7" height="7" fill="#FA521E" />
        <rect x="12" y="19" width="7" height="7" fill="#FA521E" />
        <rect x="19" y="19" width="10" height="7" fill="#FF8400" />
        <rect x="29" y="19" width="7" height="7" fill="#FA521E" />
        <rect x="19" y="26" width="10" height="7" fill="#FA521E" />
        <rect x="19" y="33" width="10" height="7" fill="#FA521E" />
      </svg>
    );
  }

  // 13. Meta Llama
  if (slug.includes('llama') || slug.includes('meta-llama')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="meta-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0081FB" />
            <stop offset="100%" stopColor="#0064E0" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="14" fill="#0081FB" fillOpacity="0.12" />
        <path
          d="M33.5 18C30.5 18 28 20.5 25.5 23.5C23 20.5 20.5 18 17.5 18C12.5 18 9 22 9 27C9 32 12.5 36 17.5 36C20.5 36 23 33.5 25.5 30.5C28 33.5 30.5 36 33.5 36C38.5 36 42 32 42 27C42 22 38.5 18 33.5 18ZM17.5 32C14.5 32 12.5 29.5 12.5 27C12.5 24.5 14.5 22 17.5 22C19.5 22 21.5 23.5 23.5 26.5C22 29.5 20 32 17.5 32ZM33.5 32C31 32 29 29.5 27.5 26.5C29.5 23.5 31.5 22 33.5 22C36.5 22 38.5 24.5 38.5 27C38.5 29.5 36.5 32 33.5 32Z"
          fill="url(#meta-grad)"
        />
      </svg>
    );
  }

  // 14. Hugging Face
  if (slug.includes('hugging')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" fill="#FFD21E" />
        <circle cx="18" cy="21" r="2.5" fill="#000000" />
        <circle cx="30" cy="21" r="2.5" fill="#000000" />
        <ellipse cx="14" cy="25" rx="2.5" ry="1.5" fill="#FF8C00" opacity="0.6" />
        <ellipse cx="34" cy="25" rx="2.5" ry="1.5" fill="#FF8C00" opacity="0.6" />
        <path d="M19 27C21 30 27 30 29 27" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 26C10 24 14 28 16 30" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" />
        <path d="M40 26C38 24 34 28 32 30" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // 15. v0
  if (slug.includes('v0')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#000000" />
        <path d="M24 12L36 34H12L24 12Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 16. Bolt
  if (slug.includes('bolt')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#1C1917" />
        <path d="M26 8L12 26H24L20 40L36 22H24L26 8Z" fill="#FACC15" />
      </svg>
    );
  }

  // 17. Lovable
  if (slug.includes('lovable')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lovable-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="14" fill="url(#lovable-grad)" />
        <path
          d="M24 34L15 25C12 22 12 17 15 14C18 11 23 11 24 15C25 11 30 11 33 14C36 17 36 22 33 25L24 34Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 18. Suno
  if (slug.includes('suno')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#18181B" />
        <rect x="10" y="14" width="28" height="20" rx="3" stroke="#F43F5E" strokeWidth="2.5" />
        <circle cx="18" cy="24" r="3" fill="#F43F5E" />
        <circle cx="30" cy="24" r="3" fill="#F43F5E" />
        <path d="M18 24H30" stroke="#F43F5E" strokeWidth="2" />
      </svg>
    );
  }

  // 19. Udio
  if (slug.includes('udio')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#7C3AED" />
        <path
          d="M16 16V26C16 30 19 33 24 33C29 33 32 30 32 26V16"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="2" fill="#FFFFFF" />
      </svg>
    );
  }

  // 20. Notion AI
  if (slug.includes('notion')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#000000" />
        <path
          d="M15 14H20L30 28V14H34V34H29L19 20V34H15V14Z"
          fill="#FFFFFF"
        />
        <path d="M35 10L36 13L39 14L36 15L35 18L34 15L31 14L34 13L35 10Z" fill="#FBBF24" />
      </svg>
    );
  }

  // 21. Grammarly
  if (slug.includes('grammarly')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#15C39A" fillOpacity="0.15" />
        <circle cx="24" cy="24" r="14" stroke="#15C39A" strokeWidth="3" />
        <path d="M24 16C29 16 32 20 32 24C32 29 28 32 24 32C19 32 16 28 16 24" stroke="#15C39A" strokeWidth="3" strokeLinecap="round" />
        <path d="M26 24H32" stroke="#15C39A" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // 22. QuillBot
  if (slug.includes('quillbot')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#48A742" fillOpacity="0.15" />
        <path
          d="M34 12C28 12 18 18 14 28L18 30C22 24 28 20 34 18V12Z"
          fill="#48A742"
        />
        <path d="M14 28L12 36L20 34" stroke="#48A742" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 23. Canva
  if (slug.includes('canva')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#00C4CC" />
        <path
          d="M28 16C20 16 16 22 16 28C16 33 19 36 24 36C29 36 32 33 33 29"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // 24. Open-Claw (Official openclaw.ai Lobster Vector)
  if (slug.includes('open-claw') || slug.includes('openclaw') || slug === 'claw') {
    return (
      <svg width={s} height={s} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="28" fill="#0C0E14" />
        <defs>
          <linearGradient id="openclaw-official-lobster" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
        </defs>
        <path d="M60 10 C30 10 15 35 15 55 C15 75 30 95 45 100 L45 110 L55 110 L55 100 C55 100 60 102 65 100 L65 110 L75 110 L75 100 C90 95 105 75 105 55 C105 35 90 10 60 10Z" fill="url(#openclaw-official-lobster)" />
        <path d="M20 45 C5 40 0 50 5 60 C10 70 20 65 25 55 C28 48 25 45 20 45Z" fill="url(#openclaw-official-lobster)" />
        <path d="M100 45 C115 40 120 50 115 60 C110 70 100 65 95 55 C92 48 95 45 100 45Z" fill="url(#openclaw-official-lobster)" />
        <path d="M45 15 Q35 5 30 8" stroke="#ff4d4d" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M75 15 Q85 5 90 8" stroke="#ff4d4d" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="45" cy="35" r="6" fill="#050810" />
        <circle cx="75" cy="35" r="6" fill="#050810" />
        <circle cx="46" cy="34" r="2.5" fill="#00e5cc" />
        <circle cx="76" cy="34" r="2.5" fill="#00e5cc" />
      </svg>
    );
  }

  // 25. OpenAI Codex
  if (slug.includes('codex') || slug === 'openai-codex') {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#0D1117" />
        <path
          d="M18 16L10 24L18 32M30 16L38 24L30 32M26 12L22 36"
          stroke="#10A37F"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 26. Falcon AI (UAE / TII)
  if (slug.includes('falcon')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="falcon-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="14" fill="#0F172A" />
        <path
          d="M24 10L36 20L30 26L38 34L24 28L10 34L18 26L12 20L24 10Z"
          fill="url(#falcon-gold)"
        />
        <circle cx="24" cy="22" r="2.5" fill="#FFFFFF" />
      </svg>
    );
  }

  // 27. Sakana AI (Japan)
  if (slug.includes('sakana')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <path
          d="M12 24C16 16 28 14 36 24C28 34 16 32 12 24ZM36 24L40 18V30L36 24Z"
          fill="#E11D48"
        />
        <circle cx="20" cy="22" r="2" fill="#FFFFFF" />
      </svg>
    );
  }

  // 28. Qwen (Alibaba Cloud)
  if (slug.includes('qwen') || slug.includes('tongyi')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#6366F1" fillOpacity="0.12" />
        <path
          d="M24 8L38 16V32L24 40L10 32V16L24 8Z"
          stroke="#6366F1"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M24 16L31 20V28L24 32L17 28V20L24 16Z"
          fill="#6366F1"
        />
      </svg>
    );
  }

  // 29. Kimi Chat (Moonshot AI)
  if (slug.includes('kimi') || slug.includes('moonshot')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#0284C7" fillOpacity="0.12" />
        <circle cx="24" cy="24" r="14" stroke="#0284C7" strokeWidth="3" />
        <path d="M24 10V38M10 24H38" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="24" r="5" fill="#0284C7" />
      </svg>
    );
  }

  // 30. Synthesia (UK)
  if (slug.includes('synthesia')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="synthesia-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7928CA" />
            <stop offset="100%" stopColor="#FF0080" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="14" fill="url(#synthesia-grad)" />
        <circle cx="24" cy="24" r="12" stroke="#FFFFFF" strokeWidth="3" />
        <polygon points="21,18 29,24 21,30" fill="#FFFFFF" />
      </svg>
    );
  }

  // 31. DeepL (Germany)
  if (slug.includes('deepl')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#0F2B46" />
        <path
          d="M16 12V36H32M22 18L30 26M30 18L22 26"
          stroke="#0F8EAC"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 32. Apple Intelligence
  if (slug.includes('apple-intelligence') || slug === 'apple') {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="apple-siri" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="33%" stopColor="#9B51E0" />
            <stop offset="66%" stopColor="#2D9CDB" />
            <stop offset="100%" stopColor="#27AE60" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="14" fill="#000000" />
        <circle cx="24" cy="24" r="13" stroke="url(#apple-siri)" strokeWidth="4" />
        <circle cx="24" cy="24" r="6" fill="url(#apple-siri)" opacity="0.8" />
      </svg>
    );
  }

  // 33. FLUX.1 (Black Forest Labs)
  if (slug.includes('flux') || slug.includes('blackforest')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#000000" />
        <path
          d="M12 12H36V20H20V24H32V30H20V36H12V12Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 34. AlphaFold (DeepMind)
  if (slug.includes('alphafold')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#0284C7" />
        <circle cx="16" cy="16" r="4" fill="#FFFFFF" />
        <circle cx="32" cy="16" r="4" fill="#FFFFFF" />
        <circle cx="24" cy="24" r="5" fill="#38BDF8" />
        <circle cx="16" cy="32" r="4" fill="#FFFFFF" />
        <circle cx="32" cy="32" r="4" fill="#FFFFFF" />
        <path d="M16 16L24 24M32 16L24 24M16 32L24 24M32 32L24 24" stroke="#FFFFFF" strokeWidth="2.5" />
      </svg>
    );
  }

  // 35. Manus AI (Autonomous Agent)
  if (slug.includes('manus')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#090D16" />
        <path
          d="M14 34V18L24 28L34 18V34"
          stroke="#00F0FF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="14" r="3.5" fill="#10B981" />
      </svg>
    );
  }

  // 36. Trae AI (ByteDance Adaptive IDE)
  if (slug.includes('trae')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="trae-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E599" />
            <stop offset="100%" stopColor="#0099FF" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="14" fill="#0C1017" />
        <path
          d="M14 16H34M24 16V34M16 26L24 34L32 26"
          stroke="url(#trae-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 37. Google NotebookLM
  if (slug.includes('notebooklm')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#F0FDF4" stroke="#DCFCE7" strokeWidth="1" />
        <rect x="14" y="10" width="20" height="28" rx="4" fill="#0D9488" />
        <path d="M19 18H29M19 24H29M19 30H25" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="34" cy="14" r="4" fill="#3B82F6" />
      </svg>
    );
  }

  // 38. Ollama
  if (slug.includes('ollama')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#000000" />
        <path
          d="M20 12V20M28 12V20M17 20H31V28C31 32 28 35 24 35C20 35 17 32 17 28V20ZM14 26H17M31 26H34"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="21" cy="24" r="1.5" fill="#FFFFFF" />
        <circle cx="27" cy="24" r="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  // 39. Recraft AI
  if (slug.includes('recraft')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#FF4338" />
        <path
          d="M16 14H28C32 14 34 16.5 34 20C34 23.5 31.5 25.5 28 25.5H22V34H16V14ZM22 21H27C28.5 21 29.5 20.2 29.5 19C29.5 17.8 28.5 17 27 17H22V21Z"
          fill="#FFFFFF"
        />
        <path d="M26 25.5L34 34H28.5L22 25.5H26Z" fill="#FFFFFF" />
      </svg>
    );
  }

  return null;
}

// Extract domain cleanly from URL
function getCleanDomain(rawUrl: string): string {
  try {
    const parsed = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

export function AIToolLogo({
  name,
  slug,
  url,
  logoUrl,
  size = 'md',
  className = '',
}: AIToolLogoProps) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const pixelSize = iconPixelSizes[size];
  const sizeClass = sizeClasses[size];

  // 1. Check if official high-fidelity vector SVG exists
  const officialSVG = renderOfficialSVG(slug, pixelSize);
  if (officialSVG) {
    return (
      <div
        className={`flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${sizeClass} ${className}`}
      >
        {officialSVG}
      </div>
    );
  }

  // 2. High-resolution domain icon from verified multi-tier sources
  const domain = getCleanDomain(url);
  const sources: string[] = [];
  if (logoUrl) sources.push(logoUrl);
  if (domain) {
    sources.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
    sources.push(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
  }

  const currentSrc = sources[sourceIndex];

  if (currentSrc && sourceIndex < sources.length) {
    return (
      <div
        className={`relative flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm shrink-0 overflow-hidden transition-transform group-hover:scale-105 p-1.5 ${sizeClass} ${className}`}
      >
        <Image
          src={currentSrc}
          alt={`${name} Official Logo`}
          width={pixelSize}
          height={pixelSize}
          className="w-full h-full object-contain rounded-lg"
          onError={() => setSourceIndex((prev) => prev + 1)}
          unoptimized
        />
      </div>
    );
  }

  // 3. Graceful Fallback: Polished brand gradient monogram
  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      className={`bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-105 ${sizeClass} ${className}`}
    >
      {initial}
    </div>
  );
}
