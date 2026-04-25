// Shared helpers for Cloudflare Pages Functions

export interface Env {
  ADMIN_PASSWORD: string;
  SESSION_SECRET: string;
  GITHUB_TOKEN: string;
  GITHUB_REPO: string;
}

const SESSION_COOKIE = 'tck_admin_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function base64urlEncode(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let s = '';
  for (let i = 0; i < bytes.byteLength; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

async function sign(data: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return base64urlEncode(sig);
}

export async function createSessionToken(env: Env): Promise<string> {
  const expires = Date.now() + SESSION_TTL_MS;
  const sig = await sign(`${expires}`, env.SESSION_SECRET || 'dev-secret');
  return `${expires}.${sig}`;
}

export async function verifySessionToken(token: string | undefined, env: Env): Promise<boolean> {
  if (!token) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = await sign(payload, env.SESSION_SECRET || 'dev-secret');
  if (sig !== expected) return false;
  const expires = Number(payload);
  if (!expires || Date.now() > expires) return false;
  return true;
}

export function verifyPassword(input: string, env: Env): boolean {
  const stored = env.ADMIN_PASSWORD;
  if (!stored || input.length !== stored.length) return false;
  let mismatch = 0;
  for (let i = 0; i < input.length; i++) mismatch |= input.charCodeAt(i) ^ stored.charCodeAt(i);
  return mismatch === 0;
}

export { SESSION_COOKIE };

export function getSessionFromRequest(request: Request): string | undefined {
  const cookieHeader = request.headers.get('Cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const [k, ...v] = c.trim().split('=');
      return [k, v.join('=')];
    }),
  );
  return cookies[SESSION_COOKIE];
}

export function setSessionCookie(token: string): string {
  const maxAge = 7 * 24 * 60 * 60;
  return `${SESSION_COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`;
}

export function clearSessionCookie(): string {
  return `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

export function redirect(location: string, headers: Record<string, string> = {}): Response {
  return new Response(null, { status: 302, headers: { Location: location, ...headers } });
}

// GitHub helpers
export async function commitFile(opts: {
  path: string;
  content: string;
  message: string;
  env: Env;
  branch?: string;
}): Promise<void> {
  const { path, content, message, env, branch = 'main' } = opts;
  const repo = env.GITHUB_REPO || 'zakshevskyadam/tck-boetzingen';
  const token = env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN env variable not set');

  const utf8 = new TextEncoder().encode(content);
  let bin = '';
  for (let i = 0; i < utf8.length; i++) bin += String.fromCharCode(utf8[i]);
  const contentBase64 = btoa(bin);

  const url = `https://api.github.com/repos/${repo}/contents/${path}`;

  let sha: string | undefined;
  const getRes = await fetch(`${url}?ref=${branch}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'tck-boetzingen-admin',
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
      'User-Agent': 'tck-boetzingen-admin',
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

export function yamlEscape(s: string): string {
  return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
}
