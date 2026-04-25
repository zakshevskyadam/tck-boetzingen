import {
  verifySessionToken,
  getSessionFromRequest,
  deleteFile,
  redirect,
  type Env,
} from '../../_shared';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const token = getSessionFromRequest(request);
  const isAuth = await verifySessionToken(token, env);
  if (!isAuth) return redirect('/admin?error=unauthorized');

  try {
    const formData = await request.formData();
    const slug = (formData.get('slug') as string) || '';
    const sha = (formData.get('sha') as string) || '';

    if (!slug || !sha) {
      return redirect('/admin?error=missing_fields');
    }

    await deleteFile({
      path: `src/content/events/${slug}/index.yaml`,
      sha,
      message: `content: delete event "${slug}"`,
      env,
    });

    return redirect('/admin?success=deleted');
  } catch (err) {
    console.error('[admin/delete] Error:', err);
    const msg = err instanceof Error ? err.message : 'unknown';
    return redirect(`/admin?error=${encodeURIComponent(msg)}`);
  }
};
