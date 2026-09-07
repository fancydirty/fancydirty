// scripts/lib/render-banner.mjs
import { themeOf } from './palette.mjs';
import { svgDoc, text, rect } from './svg.mjs';

const W = 880, H = 150;

export function renderBanner(mode) {
  const t = themeOf(mode);
  const body = [
    rect({ x: 0, y: 0, w: W, h: H, fill: t.bg }),
    rect({ x: 0, y: 0, w: 3, h: H, fill: t.accent }),
    text({ x: 36, y: 58, size: 30, weight: 700, fill: t.fg, content: 'fancydirty', spacing: '-0.5' }),
    text({ x: 36, y: 92, size: 15, weight: 400, fill: t.muted,
      content: 'I write agents for things that annoy me. Two of them stuck.' }),
    text({ x: 36, y: 118, size: 14, weight: 400, fill: t.muted,
      content: '给自己的麻烦写 agent。有两个后来别人也在用。' }),
  ].join('');
  return svgDoc({ w: W, h: H, body });
}
