// tests/palette.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PALETTE, themeOf } from '../scripts/lib/palette.mjs';

test('accent 用 mediary 实测霓虹绿', () => {
  assert.equal(PALETTE.accent, '#1ED760');
});

test('subtitle accent 用吉祥物黄绿', () => {
  assert.equal(PALETTE.accentAlt, '#ADDE3C');
});

test('纸色不是纯白,深底不是纯黑', () => {
  assert.notEqual(PALETTE.paper, '#FFFFFF');
  assert.notEqual(PALETTE.ink, '#000000');
});

test('themeOf 深浅两套都给齐 bg/fg/muted/accent', () => {
  for (const mode of ['light', 'dark']) {
    const t = themeOf(mode);
    for (const k of ['bg', 'fg', 'muted', 'accent', 'accentAlt', 'line']) {
      assert.match(t[k], /^#[0-9A-F]{6}$/i, `${mode}.${k} 应是 hex`);
    }
  }
});

test('深浅模式 bg 与 fg 不相同', () => {
  const l = themeOf('light'), d = themeOf('dark');
  assert.notEqual(l.bg, d.bg);
  assert.notEqual(l.fg, l.bg);
  assert.notEqual(d.fg, d.bg);
});

test('未知 mode 抛错而不是静默降级', () => {
  assert.throws(() => themeOf('sepia'), /unknown theme/i);
});
