import {
  createSessionToken,
  verifyPassword,
  setSessionCookie,
  redirect,
  type Env,
} from '../../_shared';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const formData = await request.formData();
  const password = (formData.get('password') as string) || '';

  if (!verifyPassword(password, env)) {
    return redirect('/admin?error=invalid');
  }

  const token = await createSessionToken(env);
  return redirect('/admin', { 'Set-Cookie': setSessionCookie(token) });
};
