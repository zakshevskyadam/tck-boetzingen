import { clearSessionCookie, redirect, type Env } from '../../_shared';

export const onRequestPost: PagesFunction<Env> = async () => {
  return redirect('/admin', { 'Set-Cookie': clearSessionCookie() });
};
