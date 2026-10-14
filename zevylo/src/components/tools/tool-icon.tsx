import React from 'react';
import {
  Activity,
  AlarmClock,
  AppWindow,
  ArrowDownAZ,
  ArrowLeftRight,
  AudioWaveform,
  BadgeDollarSign,
  BadgePercent,
  Banknote,
  Barcode,
  BarChart2,
  BarChart3,
  Binary,
  BookOpen,
  BookOpenCheck,
  Bot,
  Box,
  Braces,
  Briefcase,
  Cake,
  Calculator,
  CalendarClock,
  CalendarDays,
  Camera,
  CheckCircle2,
  CircleDollarSign,
  CirclePlay,
  Clock,
  Code,
  Code2,
  Columns,
  Cpu,
  Crop,
  Database,
  Dices,
  Eraser,
  Eye,
  EyeOff,
  FastForward,
  FileArchive,
  FileCode,
  FileImage,
  FileJson,
  FileSearch,
  FileSpreadsheet,
  FileStack,
  FileText,
  FileUp,
  Film,
  Filter,
  Fingerprint,
  Flame,
  FolderEdit,
  Footprints,
  Fuel,
  Gauge,
  GitCompare,
  GitPullRequest,
  Globe,
  GraduationCap,
  HardDrive,
  Hash,
  Headphones,
  HelpCircle,
  Image as ImageIcon,
  Info,
  Kanban,
  Keyboard,
  KeyRound,
  Landmark,
  Languages,
  Layers,
  LineChart,
  Link as LinkIcon,
  Link2,
  Lock,
  Mail,
  Maximize2,
  Mic,
  Minimize2,
  Monitor,
  MonitorPlay,
  Music,
  Network,
  Palette,
  PenLine,
  PenTool,
  Percent,
  PieChart,
  Pipette,
  PlaySquare,
  Presentation,
  QrCode,
  Radio,
  Receipt,
  Replace,
  RotateCcw,
  RotateCw,
  Ruler,
  Scissors,
  Search,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  SlidersHorizontal,
  Smartphone,
  Smile,
  Sparkles,
  Stamp,
  Subtitles,
  Table,
  Tags,
  Terminal,
  Timer,
  TrendingDown,
  TrendingUp,
  Type,
  User,
  UserCheck,
  UtensilsCrossed,
  Video,
  Volume2,
  VolumeX,
  Wand2,
  Zap,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

// Exact Slug to Icon Mapping for 100% matched context
const SLUG_ICON_MAP: Record<string, LucideIcon> = {
  // --- PDF Tools ---
  'crop-pdf': Scissors,
  'pdf-merge-split': FileStack,
  'pdf-rotator': RotateCw,
  'pdf-to-image': ImageIcon,
  'pdf-to-text': FileSearch,
  'pdf-watermark': Stamp,
  'pdf-page-numberer': FileText,
  'protect-pdf': Lock,
  'pdf-metadata-editor': FileSearch,

  // --- Video Tools ---
  'crop-video': Crop,
  'cut-video': Scissors,
  'video-trimmer': Scissors,
  'gif-to-mp4': Film,
  'mp4-to-mp3': Headphones,
  'mute-video': VolumeX,
  'reverse-video': RotateCcw,
  'rotate-video': RotateCw,
  'screen-recorder': MonitorPlay,
  'video-compressor': Minimize2,
  'video-quality-checker': Sliders,
  'video-speed-changer': FastForward,
  'video-to-frames': Layers,
  'video-to-gif': PlaySquare,
  'video-to-jpg': Camera,
  'video-to-mp4': Video,
  'video-to-png': Layers,

  // --- Image Tools ---
  'ascii-art-generator': Terminal,
  'aspect-ratio-calculator': Maximize2,
  'avif-to-jpg': ArrowLeftRight,
  'bmp-to-png': FileImage,
  'bulk-image-converter': Layers,
  'exif-remover': EyeOff,
  'favicon-generator': Globe,
  'gif-maker': Film,
  'heic-to-jpg': Smartphone,
  'image-background-remover': Wand2,
  'image-combiner': Columns,
  'image-comparator': SlidersHorizontal,
  'image-compressor': Minimize2,
  'image-cropper': Crop,
  'image-filters': Sliders,
  'image-resizer': Maximize2,
  'image-size-checker': Ruler,
  'image-to-datauri': Binary,
  'image-to-pdf': FileUp,
  'jpg-to-ico': AppWindow,
  'jpg-to-pdf': FileText,
  'jpg-to-png': ArrowLeftRight,
  'jpg-to-webp': Zap,
  'lottie-to-gif': Sparkles,
  'meme-generator': Smile,
  'png-to-ico': AppWindow,
  'png-to-jpg': ArrowLeftRight,
  'png-to-webp': Zap,
  'sketch-canvas': PenTool,
  'svg-to-png': Code2,
  'view-metadata': Info,
  'webp-to-ico': AppWindow,
  'webp-to-jpg': ArrowLeftRight,
  'webp-to-png': ArrowLeftRight,

  // --- Developer Tools ---
  'base64': Binary,
  'number-base-converter': Binary,
  'csv-json-converter': ArrowLeftRight,
  'chmod-calculator': Terminal,
  'code-minifier': Minimize2,
  'code-to-image': Camera,
  'cron-generator': CalendarClock,
  'css-box-shadow-generator': Box,
  'css-glassmorphism-generator': Sparkles,
  'css-clamp-generator': Type,
  'css-gradient-generator': Palette,
  'hash-generator': Lock,
  'html-entity-encoder': Code,
  'json-formatter': Braces,
  'json-to-typescript': FileCode,
  'jwt-decoder': KeyRound,
  'keycode-inspector': Keyboard,
  'regex-tester': Search,
  'sql-formatter': Database,
  'url-encoder': Link2,
  'yaml-json-converter': ArrowLeftRight,
  'xml-formatter': FileCode,
  'subnet-calculator': Network,
  'curl-to-fetch-converter': Terminal,
  'css-neumorphism-generator': Layers,
  'css-border-radius-generator': Box,
  'css-flexbox-playground': Columns,

  // --- Calculators ---
  'age-calculator': Cake,
  'bmi-calculator': Activity,
  'compound-interest-calculator': TrendingUp,
  'dice-roller': Dices,
  'discount-calculator': BadgePercent,
  'fuel-cost-calculator': Fuel,
  'loan-emi-calculator': Landmark,
  'percentage-calculator': Percent,
  'profit-margin-calculator': PieChart,
  'roi-calculator': LineChart,
  'salary-calculator': Banknote,
  'sales-tax-calculator': Receipt,
  'scientific-calculator': Calculator,
  'steps-to-distance': Footprints,
  'tdee-calculator': Flame,
  'tip-calculator': UtensilsCrossed,
  'average-calculator': BarChart3,
  'crypto-profit-calculator': TrendingUp,
  'inflation-calculator': TrendingDown,


  // --- Converters ---
  'binary-text-converter': Binary,
  'currency-converter': ArrowLeftRight,
  'data-size-converter': HardDrive,
  'morse-code-translator': Radio,
  'rot13-encoder': ShieldAlert,
  'srt-to-vtt-converter': Subtitles,
  'unit-converter': Ruler,
  'roman-numeral-converter': Type,
  'number-to-words': Languages,

  // --- Generators ---
  'barcode-generator': Barcode,
  'password-generator': KeyRound,
  'qr-code-generator': QrCode,
  'uuid-generator': Fingerprint,
  'random-number-generator': Dices,

  // --- Security ---
  'password-strength': ShieldCheck,
  'hmac-generator': ShieldAlert,

  // --- Text Tools ---
  'case-converter': Type,
  'lorem-ipsum-generator': FileText,
  'markdown-table-generator': Table,
  'readability-calculator': BookOpen,
  'slug-generator': LinkIcon,
  'stylish-text-generator': Sparkles,
  'text-diff': GitCompare,
  'text-extractor': Filter,
  'remove-duplicate-lines': Filter,
  'find-replace': Replace,
  'text-sorter': ArrowDownAZ,
  'whitespace-cleaner': Eraser,
  'word-counter': FileText,
  'text-repeater': Replace,
  'markdown-previewer': FileCode,
  'bionic-reading-converter': BookOpen,
  'upside-down-text-generator': ArrowDownAZ,
  'zalgo-glitch-text-generator': Flame,

  // --- Audio Tools ---
  'metronome': Timer,
  'piano-chords': Music,
  'tap-bpm': Activity,
  'text-to-speech': Volume2,
  'tone-generator': AudioWaveform,
  'voice-to-text': Mic,
  'audio-trimmer': Scissors,
  'audio-speed-changer': FastForward,

  // --- Color Tools ---
  'color-converter': Pipette,
  'color-generator': Palette,
  'color-contrast-checker': Eye,
  'color-palette-extractor': Pipette,

  // --- Date & Time ---
  'date-difference-calculator': CalendarDays,
  'timestamp-converter': Clock,
  'timezone-converter': Globe,
  'alarm-clock-timer': AlarmClock,
  'countdown-timer': CalendarClock,
  'birthday-calculator': Cake,

  // --- Business ---
  'price-estimator': CircleDollarSign,
  'resume-cv-builder': UserCheck,
  'profit-loss-calculator': TrendingUp,
  'invoice-generator': Receipt,

  // --- Education ---
  'gpa-calculator': GraduationCap,
  'assignment-writing-helper': BookOpenCheck,
  'handwriting-generator': PenTool,

  // --- Productivity ---
  'bulk-rename': FolderEdit,
  'coin-flip': Dices,
  'signature-pad': PenLine,
  'sprint-retro-board': Kanban,
  'stl-viewer': Box,
  'pomodoro-timer': Timer,

  // --- AI ---
  'ai-article-writer': Bot,
  'geo-aeo-optimizer': Cpu,
  'youtube-summarizer': CirclePlay,
  'prompt-enhancer': Wand2,
  'ai-prompt-generator': Wand2,
  'ai-humanizer': UserCheck,
  'ai-content-detector': Search,
  'ai-code-assistant': Code2,
  'ai-sql-regex-generator': Database,
  'ai-social-hook-generator': Sparkles,
  'ai-story-generator': BookOpen,
  'ai-business-name-generator': Briefcase,
  'ai-presentation-generator': Presentation,
  'ai-email-subject-line-generator': Mail,
  'ai-bio-generator': User,
  'ai-excel-formula-generator': Table,
  'ai-faq-schema-generator': HelpCircle,
  'color-palette-generator': Palette,
  'html-to-markdown': FileText,
  'slug-to-title-converter': Type,

  // --- Marketing ---
  'utm-builder': LinkIcon,
  'bulk-email-generator': Mail,
  'social-video-downloader-helper': Video,
  'youtube-tag-generator': Tags,

  // --- SEO ---
  'hashtag-generator': Hash,
  'hreflang-generator': Languages,
  'keyword-density-analyzer': BarChart2,
  'meta-tag-generator': Tags,
  'og-generator': Share2,
  'robots-txt-generator': Bot,
  'serp-pixel-checker': Monitor,
  'serp-preview': Search,
  'sitemap-generator': Network,
  'twitter-card-preview': Share2,
  'url-cleaner': Eraser,
};

// Generic raw string map (handles kebab-case and aliases from tool definitions)
const RAW_ICON_MAP: Record<string, LucideIcon> = {
  'activity': Activity,
  'alarm-clock': AlarmClock,
  'arrow-right-left': ArrowLeftRight,
  'aspect-ratio': Maximize2,
  'audio-waveform': AudioWaveform,
  'banknote': Banknote,
  'bar-chart-2': BarChart2,
  'barcode': Barcode,
  'binary': Binary,
  'book-open': BookOpen,
  'bot': Bot,
  'box': Box,
  'braces': Braces,
  'cake': Cake,
  'calculator': Calculator,
  'calendar': CalendarDays,
  'camera': Camera,
  'circle-dot': Dices,
  'clock': Clock,
  'code': Code,
  'code-2': Code2,
  'columns': Columns,
  'crop': Crop,
  'database': Database,
  'dices': Dices,
  'dollar-sign': CircleDollarSign,
  'edit-3': PenTool,
  'file-code': FileCode,
  'file-image': FileImage,
  'file-text': FileText,
  'film': Film,
  'filter': Filter,
  'flame': Flame,
  'fuel': Fuel,
  'gauge': Gauge,
  'globe': Globe,
  'graduation-cap': GraduationCap,
  'hard-drive': HardDrive,
  'hash': Hash,
  'history': RotateCcw,
  'image': ImageIcon,
  'info': Info,
  'keyboard': Keyboard,
  'layers': Layers,
  'link': LinkIcon,
  'link-2': Link2,
  'lock': Lock,
  'mail': Mail,
  'mic': Mic,
  'monitor': Monitor,
  'monitor-play': MonitorPlay,
  'music': Music,
  'network': Network,
  'palette': Palette,
  'pen-tool': PenTool,
  'percent': Percent,
  'pie-chart': PieChart,
  'help-circle': HelpCircle,
  'presentation': Presentation,
  'radio': Radio,
  'receipt': Receipt,
  'rotate-cw': RotateCw,
  'ruler': Ruler,
  'scissors': Scissors,
  'share-2': Share2,
  'shield': Shield,
  'shield-alert': ShieldAlert,
  'shield-check': ShieldCheck,
  'sliders': Sliders,
  'smartphone': Smartphone,
  'smile': Smile,
  'sparkles': Sparkles,
  'stamp': Stamp,
  'subtitles': Subtitles,
  'table': Table,
  'tag': Tags,
  'tags': Tags,
  'terminal': Terminal,
  'trending-up': TrendingUp,
  'type': Type,
  'user': UserCheck,
  'utensils': UtensilsCrossed,
  'video': Video,
  'volume-x': VolumeX,
  'youtube': CirclePlay,
};

// Category fallback icon
const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  pdf: FileText,
  video: Film,
  audio: Music,
  image: ImageIcon,
  developer: Code2,
  converters: ArrowLeftRight,
  calculators: Calculator,
  generators: Sparkles,
  security: ShieldCheck,
  text: Type,
  seo: Search,
  marketing: Tags,
  color: Palette,
  'date-time': Clock,
  business: Briefcase,
  education: GraduationCap,
  productivity: Layers,
  ai: Bot,
};

// Pinterest-style category themes: soft tinted pastel background, refined border, rich icon text color
const CATEGORY_THEMES: Record<string, { bg: string; text: string; border: string }> = {
  pdf: {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-200/70 dark:border-rose-900/50',
  },
  video: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-200/70 dark:border-indigo-900/50',
  },
  audio: {
    bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/40',
    text: 'text-fuchsia-600 dark:text-fuchsia-400',
    border: 'border-fuchsia-200/70 dark:border-fuchsia-900/50',
  },
  image: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-200/70 dark:border-emerald-900/50',
  },
  developer: {
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    text: 'text-sky-600 dark:text-sky-400',
    border: 'border-sky-200/70 dark:border-sky-900/50',
  },
  generators: {
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    text: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-200/70 dark:border-violet-900/50',
  },
  security: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-200/70 dark:border-amber-900/50',
  },
  calculators: {
    bg: 'bg-teal-50 dark:bg-teal-950/40',
    text: 'text-teal-600 dark:text-teal-400',
    border: 'border-teal-200/70 dark:border-teal-900/50',
  },
  converters: {
    bg: 'bg-cyan-50 dark:bg-cyan-950/40',
    text: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-200/70 dark:border-cyan-900/50',
  },
  text: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200/70 dark:border-blue-900/50',
  },
  seo: {
    bg: 'bg-orange-50 dark:bg-orange-950/40',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200/70 dark:border-orange-900/50',
  },
  ai: {
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200/70 dark:border-purple-900/50',
  },
  color: {
    bg: 'bg-pink-50 dark:bg-pink-950/40',
    text: 'text-pink-600 dark:text-pink-400',
    border: 'border-pink-200/70 dark:border-pink-900/50',
  },
  'date-time': {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-200/70 dark:border-amber-900/50',
  },
  business: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-200/70 dark:border-emerald-900/50',
  },
  education: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200/70 dark:border-blue-900/50',
  },
  productivity: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-200/70 dark:border-indigo-900/50',
  },
  marketing: {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-200/70 dark:border-rose-900/50',
  },
};

const DEFAULT_THEME = {
  bg: 'bg-blue-50 dark:bg-blue-950/40',
  text: 'text-blue-600 dark:text-blue-400',
  border: 'border-blue-200/70 dark:border-blue-900/50',
};

export interface ToolIconProps {
  slug?: string;
  category?: string;
  icon?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withBackground?: boolean;
  className?: string;
  iconClassName?: string;
}

export function ToolIcon({
  slug = '',
  category = '',
  icon = '',
  name = '',
  size = 'md',
  withBackground = true,
  className = '',
  iconClassName = '',
}: ToolIconProps) {
  // 1. Try slug match
  const normalizedSlug = slug.toLowerCase().trim();
  let ResolvedIcon: LucideIcon | undefined = SLUG_ICON_MAP[normalizedSlug];

  // 2. Try raw icon name match (kebab or lowercase)
  if (!ResolvedIcon && icon) {
    const rawKey = icon.toLowerCase().replace(/[\s_]+/g, '-').trim();
    ResolvedIcon = RAW_ICON_MAP[rawKey];
  }

  // 3. Try name keyword hints
  if (!ResolvedIcon && (normalizedSlug || name)) {
    const combined = `${normalizedSlug} ${name.toLowerCase()}`;
    if (combined.includes('pdf')) ResolvedIcon = FileText;
    else if (combined.includes('video') || combined.includes('mp4')) ResolvedIcon = Film;
    else if (combined.includes('audio') || combined.includes('mp3') || combined.includes('sound')) ResolvedIcon = Headphones;
    else if (combined.includes('image') || combined.includes('photo') || combined.includes('jpg') || combined.includes('png')) ResolvedIcon = ImageIcon;
    else if (combined.includes('calc')) ResolvedIcon = Calculator;
    else if (combined.includes('convert')) ResolvedIcon = ArrowLeftRight;
    else if (combined.includes('code') || combined.includes('json') || combined.includes('dev')) ResolvedIcon = Code2;
    else if (combined.includes('pass') || combined.includes('secure') || combined.includes('shield')) ResolvedIcon = ShieldCheck;
    else if (combined.includes('text') || combined.includes('word')) ResolvedIcon = FileText;
  }

  // 4. Try category match
  if (!ResolvedIcon && category) {
    ResolvedIcon = CATEGORY_ICON_MAP[category.toLowerCase().trim()];
  }

  // 5. Final fallback
  if (!ResolvedIcon) {
    ResolvedIcon = Wrench;
  }

  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'w-8 h-8 rounded-lg',
      icon: 'w-4 h-4',
    },
    md: {
      container: 'w-11 h-11 rounded-xl',
      icon: 'w-5 h-5',
    },
    lg: {
      container: 'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl',
      icon: 'w-7 h-7 sm:w-8 sm:h-8',
    },
    xl: {
      container: 'w-20 h-20 rounded-3xl',
      icon: 'w-10 h-10',
    },
  }[size];

  const theme = CATEGORY_THEMES[category.toLowerCase().trim()] || DEFAULT_THEME;

  if (!withBackground) {
    return (
      <ResolvedIcon
        className={`${sizeConfig.icon} ${theme.text} ${iconClassName}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`shrink-0 flex items-center justify-center border shadow-xs transition-transform duration-200 group-hover:scale-105 ${sizeConfig.container} ${theme.bg} ${theme.text} ${theme.border} ${className}`}
      aria-hidden="true"
    >
      <ResolvedIcon className={`${sizeConfig.icon} ${iconClassName}`} />
    </div>
  );
}
export default ToolIcon;
