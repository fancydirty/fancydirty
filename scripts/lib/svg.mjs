// scripts/lib/svg.mjs

// README 无法加载 webfont,只能用系统字体栈
export const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

export function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function text({ x, y, size, weight, fill, content, anchor = 'start', spacing }) {
  const ls = spacing ? ` letter-spacing="${spacing}"` : '';
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" `
    + `font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${ls}>`
    + `${esc(content)}</text>`;
}

export function rect({ x, y, w, h, r = 0, fill, stroke }) {
  const s = stroke ? ` stroke="${stroke}" stroke-width="1"` : '';
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"${s}/>`;
}

export function svgDoc({ w, h, body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" `
    + `viewBox="0 0 ${w} ${h}" role="img">${body}</svg>`;
}
