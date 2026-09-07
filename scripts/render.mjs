// scripts/render.mjs
import { writeFile, mkdir } from 'node:fs/promises';
import { fetchRepoStats } from './lib/fetch-stats.mjs';
import { renderBanner } from './lib/render-banner.mjs';
import { renderCard } from './lib/render-card.mjs';

const PROJECTS = [
  {
    slug: 'mediary', repo: 'fancydirty/mediary-scout', size: 'large', accentKey: 'accent',
    title: 'Mediary Scout', cjk: '巡影',
    blurb: 'You ask for a movie; the agent scouts your indexers, transfers the best match into your own cloud drive, and verifies what landed.',
  },
  {
    slug: 'subtitle', repo: 'fancydirty/subtitle-scout', size: 'small', accentKey: 'accentAlt',
    title: 'Subtitle Scout', cjk: '',
    blurb: 'Finds subtitles for your library, judges whether each candidate belongs to the exact episode, and installs the one that fits.',
  },
];

async function main() {
  const token = process.env.GITHUB_TOKEN;
  await mkdir('assets', { recursive: true });

  // 先全部拉取。任一失败即抛错,不写任何文件,旧 SVG 原样保留。
  const resolved = [];
  for (const p of PROJECTS) {
    resolved.push({ ...p, stats: await fetchRepoStats(p.repo, { token }) });
  }

  const writes = [];
  for (const mode of ['light', 'dark']) {
    writes.push(['assets/banner-' + mode + '.svg', renderBanner(mode)]);
    for (const p of resolved) {
      writes.push([
        `assets/card-${p.slug}-${mode}.svg`,
        renderCard({ ...p, mode }),
      ]);
    }
  }

  for (const [path, content] of writes) {
    await writeFile(path, content + '\n', 'utf8');
    console.log('wrote', path);
  }
  console.log(`done: ${writes.length} files`);
}

main().catch((e) => { console.error('render failed:', e.message); process.exit(1); });
