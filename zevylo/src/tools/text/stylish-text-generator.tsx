'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, Smartphone, Search } from 'lucide-react';

interface FontTransformer {
  name: string;
  category: string;
  transform: (text: string) => string;
}

// Unicode mappings for alphabets
const FONT_MAPS: Record<string, [string, string]> = {
  fraktur: [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷',
  ],
  boldFraktur: [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟',
  ],
  script: [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    '𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏',
  ],
  boldScript: [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔩',
  ],
  doubleStruck: [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡',
  ],
  boldSans: [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵',
  ],
  italicSans: [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻',
  ],
  boldItalic: [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    '𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯',
  ],
  monospace: [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿',
  ],
  circled: [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨',
  ],
  squared: [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉',
  ],
  smallCaps: [
    'abcdefghijklmnopqrstuvwxyz',
    'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ',
  ],
};

function mapChars(text: string, from: string, to: string): string {
  // Use Array.from to correctly handle astral surrogate pairs
  const toChars = Array.from(to);
  const fromMap = new Map<string, string>();
  for (let i = 0; i < from.length; i++) {
    if (i < toChars.length) fromMap.set(from[i], toChars[i]);
  }
  return Array.from(text)
    .map((c) => fromMap.get(c) || c)
    .join('');
}

const UPSIDE_DOWN_MAP: Record<string, string> = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ',
  k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ',
  u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
  A: '∀', B: '𐐒', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I', J: 'ſ',
  K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ', S: 'S', T: '⊥',
  U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
  '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0',
  '?': '¿', '!': '¡', '.': '˙', ',': '\'',
};

const TRANSFORMERS: FontTransformer[] = [
  {
    name: 'Bold Sans',
    category: 'Modern',
    transform: (t) => mapChars(t, FONT_MAPS.boldSans[0], FONT_MAPS.boldSans[1]),
  },
  {
    name: 'Cursive / Script',
    category: 'Elegant',
    transform: (t) => mapChars(t, FONT_MAPS.script[0], FONT_MAPS.script[1]),
  },
  {
    name: 'Bold Cursive',
    category: 'Elegant',
    transform: (t) => mapChars(t, FONT_MAPS.boldScript[0], FONT_MAPS.boldScript[1]),
  },
  {
    name: 'Fraktur / Gothic',
    category: 'Vintage',
    transform: (t) => mapChars(t, FONT_MAPS.fraktur[0], FONT_MAPS.fraktur[1]),
  },
  {
    name: 'Bold Gothic',
    category: 'Vintage',
    transform: (t) => mapChars(t, FONT_MAPS.boldFraktur[0], FONT_MAPS.boldFraktur[1]),
  },
  {
    name: 'Double Struck (Blackboard)',
    category: 'Fancy',
    transform: (t) => mapChars(t, FONT_MAPS.doubleStruck[0], FONT_MAPS.doubleStruck[1]),
  },
  {
    name: 'Italic Serif',
    category: 'Clean',
    transform: (t) => mapChars(t, FONT_MAPS.italicSans[0], FONT_MAPS.italicSans[1]),
  },
  {
    name: 'Bold Italic',
    category: 'Modern',
    transform: (t) => mapChars(t, FONT_MAPS.boldItalic[0], FONT_MAPS.boldItalic[1]),
  },
  {
    name: 'Monospace / Code',
    category: 'Clean',
    transform: (t) => mapChars(t, FONT_MAPS.monospace[0], FONT_MAPS.monospace[1]),
  },
  {
    name: 'Circled / Bubble',
    category: 'Aesthetic',
    transform: (t) => mapChars(t, FONT_MAPS.circled[0], FONT_MAPS.circled[1]),
  },
  {
    name: 'Squared Box',
    category: 'Aesthetic',
    transform: (t) => mapChars(t, FONT_MAPS.squared[0], FONT_MAPS.squared[1]),
  },
  {
    name: 'Small Caps',
    category: 'Clean',
    transform: (t) => mapChars(t.toLowerCase(), FONT_MAPS.smallCaps[0], FONT_MAPS.smallCaps[1]),
  },
  {
    name: 'Upside Down',
    category: 'Fun',
    transform: (t) =>
      Array.from(t)
        .reverse()
        .map((c) => UPSIDE_DOWN_MAP[c] || c)
        .join(''),
  },
  {
    name: 'Strikethrough',
    category: 'Fun',
    transform: (t) => Array.from(t).map((c) => c + '\u0336').join(''),
  },
  {
    name: 'Underline',
    category: 'Fun',
    transform: (t) => Array.from(t).map((c) => c + '\u0332').join(''),
  },
  {
    name: 'Vaporwave / Wide',
    category: 'Aesthetic',
    transform: (t) => Array.from(t).join(' '),
  },
  {
    name: 'Sparkles Aesthetic',
    category: 'Aesthetic',
    transform: (t) => `✨ ${t} ✨`,
  },
  {
    name: 'Heart Aura',
    category: 'Aesthetic',
    transform: (t) => `💖 ${t} 💖`,
  },
];

export default function StylishTextGenerator() {
  const [input, setInput] = useState<string>('Zevylo Aesthetic Studio');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const categories = useMemo(() => {
    return ['All', 'Modern', 'Elegant', 'Vintage', 'Fancy', 'Aesthetic', 'Clean', 'Fun'];
  }, []);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filteredTransformers = useMemo(() => {
    return TRANSFORMERS.filter((t) => {
      const matchCat = filterCategory === 'All' || t.category === filterCategory;
      const matchSearch =
        !search.trim() ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [filterCategory, search]);

  return (
    <div className="space-y-8">
      {/* Input Text Box */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <label htmlFor="stylish-text-input" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-pink-500" /> Enter Text to Stylize
        </label>
        <textarea
          id="stylish-text-input"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text here (e.g., your name, bio, gaming tag, quote)..."
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 text-lg font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/20"
        />

        {/* Category Pills & Search */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                  filterCategory === cat
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-pink-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-48">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search styles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-8 pr-3 py-1 text-xs text-gray-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Styled Font Cards List */}
      <div className="grid gap-3 sm:grid-cols-2">
        {filteredTransformers.map((t, idx) => {
          const styledResult = t.transform(input || 'Sample');
          const isCopied = copiedIndex === idx;

          return (
            <div
              key={t.name}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-pink-300 dark:hover:border-pink-800 transition-all shadow-xs"
            >
              <div className="min-w-0 pr-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{t.name}</span>
                  <span className="rounded-md bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-[9px] font-medium text-gray-500">
                    {t.category}
                  </span>
                </div>
                <div className="text-base text-gray-900 dark:text-white break-words select-all font-normal">
                  {styledResult}
                </div>
              </div>

              <button
                onClick={() => handleCopy(styledResult, idx)}
                title="Copy styled text"
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                  isCopied
                    ? 'bg-emerald-600 text-white'
                    : 'border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-pink-500 hover:text-pink-600'
                }`}
              >
                {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {isCopied ? 'Copied' : 'Copy'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Instagram / TikTok Bio Preview Simulation */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-pink-500" /> Social Bio Preview (Simulated Profile Card)
        </h3>
        <div className="max-w-md mx-auto rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5">
              <div className="h-full w-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center font-black text-pink-500 text-sm">
                ZV
              </div>
            </div>
            <div>
              <div className="font-bold text-sm text-gray-900 dark:text-white">your_username</div>
              <div className="text-xs text-gray-400">Creator • Online Tools</div>
            </div>
          </div>
          <div className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-medium">
            {TRANSFORMERS[1].transform(input || 'Zevylo Studio')}
            {'\n'}
            {TRANSFORMERS[5].transform('Creative Engineer & Digital Maker')}
            {'\n'}
            ✨ Free & Private Web Tools ✨
          </div>
        </div>
      </div>
    </div>
  );
}
