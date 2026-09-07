// tests/render-banner.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderBanner } from '../scripts/lib/render-banner.mjs';
import { themeOf } from '../scripts/lib/palette.mjs';

test('两种主题都输出合法 SVG', () => {
  for (const mode of ['light', 'dark']) {
    const out = renderBanner(mode);
    assert.match(out, /^<svg /);
    assert.match(out, /<\/svg>$/);
    assert.match(out, /viewBox="0 0 880 150"/);
  }
});

test('含用户名与英文定位句', () => {
  const out = renderBanner('dark');
  assert.ok(out.includes('fancydirty'));
  assert.ok(out.includes('I write agents for things that annoy me'));
});

// 背景矩形是首个满宽 rect。取它的 fill 而非整篇子串匹配:
// 两套主题互补,light.fg 与 dark.bg 同值,子串匹配必然误判。
const bgFillOf = (svg) => svg.match(/<rect [^>]*width="880"[^>]*fill="(#[0-9A-F]{6})"/i)[1];

test('深浅模式底色各自正确且不相同', () => {
  assert.equal(bgFillOf(renderBanner('light')), themeOf('light').bg);
  assert.equal(bgFillOf(renderBanner('dark')), themeOf('dark').bg);
  assert.notEqual(bgFillOf(renderBanner('light')), bgFillOf(renderBanner('dark')));
});

test('不含渐变元素', () => {
  const out = renderBanner('dark');
  assert.ok(!out.includes('linearGradient'));
  assert.ok(!out.includes('radialGradient'));
});

test('accent 用量克制:出现次数不超过 3', () => {
  const out = renderBanner('dark');
  const hits = out.split(themeOf('dark').accent).length - 1;
  assert.ok(hits <= 3, `accent 出现 ${hits} 次,应 <= 3`);
});
