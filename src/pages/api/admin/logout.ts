import type { APIRoute } from 'astro';
import { getSessionCookieName } from '../../../lib/adminAuth';

export const prerender = false;

export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete(getSessionCookieName(), { path: '/' });
  return redirect('/admin');
};
