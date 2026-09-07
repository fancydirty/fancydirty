// scripts/lib/fetch-stats.mjs
export async function fetchRepoStats(fullName, { fetchImpl = fetch, token } = {}) {
  const headers = { accept: 'application/vnd.github+json' };
  if (token) headers.authorization = `Bearer ${token}`;
  const res = await fetchImpl(`https://api.github.com/repos/${fullName}`, { headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${fullName}`);
  const j = await res.json();
  return {
    stars: j.stargazers_count,
    forks: j.forks_count,
    language: j.language ?? '',
    license: j.license?.spdx_id ?? '',
  };
}

export function formatCount(n) {
  return n.toLocaleString('en-US');
}
