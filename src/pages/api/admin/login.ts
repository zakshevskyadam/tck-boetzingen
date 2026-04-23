import type { APIRoute } from 'astro';
import { verifyPassword, createSessionToken, getSessionCookieName } from '../../../lib/adminAuth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const password = formData.get('password')?.toString() || '';

  if (!verifyPassword(password)) {
    return redirect('/admin?error=invalid');
  }

  const token = createSessionToken();
  cookies.set(getSessionCookieName(), token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });

  return redirect('/admin');
};
