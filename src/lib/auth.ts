import bcrypt from 'bcryptjs';

const SESSION_COOKIE = 'tck_session';

export interface Member {
  email: string;
  name: string;
  passwordHash: string;
  membershipType: 'aktiv' | 'passiv';
  memberSince: string;
  workHours: number;
  workHoursRequired: number;
}

// Simple in-memory session store (for demo; in production use a proper store)
const sessions = new Map<string, { email: string; expires: number }>();

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function createSession(email: string): string {
  const id = crypto.randomUUID();
  sessions.set(id, { email, expires: Date.now() + 7 * 24 * 60 * 60 * 1000 }); // 7 days
  return id;
}

export function getSession(sessionId: string): { email: string } | null {
  const session = sessions.get(sessionId);
  if (!session) return null;
  if (Date.now() > session.expires) {
    sessions.delete(sessionId);
    return null;
  }
  return { email: session.email };
}

export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId);
}

export function getSessionFromCookies(cookies: any): { email: string } | null {
  const sessionId = cookies.get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;
  return getSession(sessionId);
}

export { SESSION_COOKIE };
