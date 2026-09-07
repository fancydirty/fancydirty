// tests/render-card.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderCard } from '../scripts/lib/render-card.mjs';
import { themeOf } from '../scripts/lib/palette.mjs';

const mediary = {
  title: 'Mediary Scout',
  cjk: '巡影',
  blurb: 'You ask for a movie; the agent scouts your indexers.',
  stats: { stars: 1396, forks: 93, language: 'TypeScript', license: '0BSD' },
};

test('large 与 small 宽度不同,高度相同', () => {
  const l = renderCard({ ...mediary, mode: 'dark', size: 'large' });
  const s = renderCard({ ...mediary, mode: 'dark', size: 'small' });
  assert.match(l, /viewBox="0 0 560 200"/);
  assert.match(s, /viewBox="0 0 300 200"/);
});

test('星数带千位逗号写进 SVG', () => {
  const out = renderCard({ ...mediary, mode: 'dark', size: 'large' });
  assert.ok(out.includes('1,396'), '应含格式化后的 1,396');
});

test('渲染语言与协议', () => {
  const out = renderCard({ ...mediary, mode: 'dark', size: 'large' });
  assert.ok(out.includes('TypeScript'));
  assert.ok(out.includes('0BSD'));
});

test('中文名与英文名同时出现', () => {
  const out = renderCard({ ...mediary, mode: 'light', size: 'large' });
  assert.ok(out.includes('Mediary Scout'));
  assert.ok(out.includes('巡影'));
});

test('accentKey 可切到 subtitle 的黄绿', () => {
  const out = renderCard({ ...mediary, mode: 'dark', size: 'small', accentKey: 'accentAlt' });
  assert.ok(out.includes(themeOf('dark').accentAlt));
});

test('license 为空时不渲染分隔符残留', () => {
  const out = renderCard({
    ...mediary, mode: 'dark', size: 'large',
    stats: { stars: 5, forks: 0, language: 'Kotlin', license: '' },
  });
  assert.ok(!out.includes('· ·'), '空 license 不应留下双分隔符');
});

test('未知 size 抛错', () => {
  assert.throws(() => renderCard({ ...mediary, mode: 'dark', size: 'huge' }), /unknown size/i);
});
