// tests/svg.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { esc, text, rect, svgDoc, FONT } from '../scripts/lib/svg.mjs';

test('esc 转义 XML 五个危险字符', () => {
  assert.equal(esc('a & b < c > d " e \' f'),
    'a &amp; b &lt; c &gt; d &quot; e &apos; f');
});

test('esc 处理中文原样保留', () => {
  assert.equal(esc('巡影'), '巡影');
});

test('text 输出带字体栈的 text 元素', () => {
  const out = text({ x: 10, y: 20, size: 14, weight: 600, fill: '#FFF', content: 'hi' });
  assert.match(out, /<text/);
  assert.match(out, /x="10"/);
  assert.match(out, /y="20"/);
  assert.match(out, /font-size="14"/);
  assert.match(out, /font-weight="600"/);
  assert.match(out, /fill="#FFF"/);
  assert.match(out, />hi<\/text>/);
  assert.ok(out.includes(FONT), '必须内嵌系统字体栈');
});

test('text 转义内容', () => {
  assert.match(text({ x: 0, y: 0, size: 1, weight: 400, fill: '#000', content: 'a & b' }),
    /a &amp; b/);
});

test('rect 支持圆角', () => {
  const out = rect({ x: 0, y: 0, w: 100, h: 50, r: 8, fill: '#123456' });
  assert.match(out, /rx="8"/);
  assert.match(out, /width="100"/);
  assert.match(out, /fill="#123456"/);
});

test('svgDoc 输出合法根元素与 viewBox', () => {
  const out = svgDoc({ w: 800, h: 200, body: '<g/>' });
  assert.match(out, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
  assert.match(out, /viewBox="0 0 800 200"/);
  assert.match(out, /<\/svg>$/);
  assert.ok(out.includes('<g/>'));
});

test('svgDoc 不含 script 元素', () => {
  assert.ok(!svgDoc({ w: 1, h: 1, body: '' }).includes('<script'));
});
