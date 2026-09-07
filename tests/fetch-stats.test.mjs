// tests/fetch-stats.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fetchRepoStats, formatCount } from '../scripts/lib/fetch-stats.mjs';

const fakeOk = (body) => async () => ({
  ok: true, status: 200, json: async () => body,
});

test('归一化 API 响应', async () => {
  const stats = await fetchRepoStats('fancydirty/mediary-scout', {
    fetchImpl: fakeOk({
      stargazers_count: 1396, forks_count: 93,
      language: 'TypeScript', license: { spdx_id: '0BSD' },
    }),
  });
  assert.deepEqual(stats, {
    stars: 1396, forks: 93, language: 'TypeScript', license: '0BSD',
  });
});

test('license 为 null 时给空串而不是崩', async () => {
  const stats = await fetchRepoStats('a/b', {
    fetchImpl: fakeOk({
      stargazers_count: 1, forks_count: 0, language: 'Kotlin', license: null,
    }),
  });
  assert.equal(stats.license, '');
});

test('非 200 抛错,让 workflow 标红且保留旧 SVG', async () => {
  await assert.rejects(
    () => fetchRepoStats('a/b', {
      fetchImpl: async () => ({ ok: false, status: 404, json: async () => ({}) }),
    }),
    /404/,
  );
});

test('formatCount 千位加逗号', () => {
  assert.equal(formatCount(1396), '1,396');
  assert.equal(formatCount(83), '83');
  assert.equal(formatCount(0), '0');
});
