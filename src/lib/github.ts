const GITHUB_API = 'https://api.github.com';

function getRepo(): string {
  return process.env.GITHUB_REPO || 'zakshevskyadam/tck-boetzingen';
}

function getToken(): string {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN env variable not set');
  return token;
}

interface CommitFileParams {
  path: string;
  content: string;
  message: string;
  branch?: string;
}

export async function commitFile({ path, content, message, branch = 'main' }: CommitFileParams): Promise<void> {
  const repo = getRepo();
  const token = getToken();
  const contentBase64 = Buffer.from(content, 'utf-8').toString('base64');

  const url = `${GITHUB_API}/repos/${repo}/contents/${path}`;

  // Check if file exists (to get SHA for update)
  let sha: string | undefined;
  const getRes = await fetch(`${url}?ref=${branch}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });
  if (getRes.ok) {
    const data = (await getRes.json()) as { sha: string };
    sha = data.sha;
  }

  const putRes = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!putRes.ok) {
    const errText = await putRes.text();
    throw new Error(`GitHub API error (${putRes.status}): ${errText}`);
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 60);
}
