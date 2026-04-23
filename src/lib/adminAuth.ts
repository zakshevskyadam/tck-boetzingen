import crypto from 'node:crypto';

const SESSION_COOKIE = 'tck_admin_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret(): string {
  return process.env.SESSION_SECRET || 'dev-secret-change-in-production';
}

function sign(data: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(data).digest('base64url');
}

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `${expires}`;
  const sig = sign(payload, getSecret());
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = sign(payload, getSecret());
  if (sig !== expected) return false;
  const expires = Number(payload);
  if (!expires || Date.now() > expires) return false;
  return true;
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}

export function verifyPassword(input: string): boolean {
  const stored = process.env.ADMIN_PASSWORD;
  if (!stored) return false;
  // Constant-time comparison
  const a = Buffer.from(input);
  const b = Buffer.from(stored);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
