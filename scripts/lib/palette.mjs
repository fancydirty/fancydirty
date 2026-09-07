// scripts/lib/palette.mjs
// 色值实测提取:mediary-scout docs/brand/hero.svg 与 subtitle-scout mascot.webp
export const PALETTE = {
  accent: '#1ED760',      // mediary 霓虹绿
  accentDeep: '#0B3B1E',  // mediary 深绿,深模式承托
  accentAlt: '#ADDE3C',   // subtitle 吉祥物黄绿
  altCool: '#425875',     // subtitle 蓝灰
  ink: '#0E1116',         // mediary 深底
  paper: '#F5F7FA',       // mediary 纸色
  grey: '#9BA3AE',        // mediary 灰
};

const THEMES = {
  light: {
    bg: PALETTE.paper,
    fg: PALETTE.ink,
    muted: '#5B6470',
    accent: '#12A64A',
    accentAlt: '#6E9612',
    line: '#DCE1E8',
  },
  dark: {
    bg: PALETTE.ink,
    fg: PALETTE.paper,
    muted: PALETTE.grey,
    accent: PALETTE.accent,
    accentAlt: PALETTE.accentAlt,
    line: '#232830',
  },
};

export function themeOf(mode) {
  const t = THEMES[mode];
  if (!t) throw new Error(`unknown theme: ${mode}`);
  return t;
}
