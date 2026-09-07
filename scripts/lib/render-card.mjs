// scripts/lib/render-card.mjs
import { themeOf } from './palette.mjs';
import { svgDoc, text, rect } from './svg.mjs';
import { formatCount } from './fetch-stats.mjs';

const SIZES = { large: 560, small: 300 };
const H = 200;

function wrap(s, max) {
  const words = s.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max) { lines.push(cur.trim()); cur = w; }
    else cur += ' ' + w;
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}

export function renderCard({ title, cjk, blurb, stats, mode, size, accentKey = 'accent' }) {
  const W = SIZES[size];
  if (!W) throw new Error(`unknown size: ${size}`);
  const t = themeOf(mode);
  const accent = t[accentKey];
  const charsPerLine = size === 'large' ? 62 : 32;

  const meta = [stats.language, stats.license].filter(Boolean).join('  ·  ');
  const parts = [
    rect({ x: 0, y: 0, w: W, h: H, r: 10, fill: t.bg, stroke: t.line }),
    rect({ x: 0, y: 0, w: 3, h: H, r: 0, fill: accent }),
    text({ x: 26, y: 42, size: size === 'large' ? 21 : 18, weight: 700, fill: t.fg, content: title }),
  ];

  if (cjk) {
    parts.push(text({ x: 26, y: 66, size: 13, weight: 400, fill: t.muted, content: cjk }));
  }

  wrap(blurb, charsPerLine).slice(0, 3).forEach((line, i) => {
    parts.push(text({ x: 26, y: 96 + i * 20, size: 13, weight: 400, fill: t.muted, content: line }));
  });

  parts.push(text({ x: 26, y: 168, size: 15, weight: 700, fill: accent,
    content: `★ ${formatCount(stats.stars)}` }));
  parts.push(text({ x: 26, y: 188, size: 12, weight: 400, fill: t.muted, content: meta }));

  return svgDoc({ w: W, h: H, body: parts.join('') });
}
