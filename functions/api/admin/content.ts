import {
  verifySessionToken,
  getSessionFromRequest,
  commitFile,
  slugify,
  yamlEscape,
  redirect,
  type Env,
} from '../../_shared';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const token = getSessionFromRequest(request);
  const isAuth = await verifySessionToken(token, env);
  if (!isAuth) return redirect('/admin?error=unauthorized');

  try {
    const formData = await request.formData();
    const title = ((formData.get('title') as string) || '').trim();
    const date = (formData.get('date') as string) || '';
    const description = ((formData.get('description') as string) || '').trim();

    if (!title || !date || !description) {
      return redirect('/admin?error=missing_fields');
    }

    const slug = slugify(title) + '-' + Date.now();
    const filePath = `src/content/events/${slug}/index.yaml`;

    const yaml = `title: ${yamlEscape(title)}\ndate: "${date}"\ndescription: ${yamlEscape(description)}\n`;

    await commitFile({
      path: filePath,
      content: yaml,
      message: `content: add event "${title}"`,
      env,
    });

    return redirect('/admin?success=created');
  } catch (err) {
    console.error('[admin/content] Error:', err);
    const msg = err instanceof Error ? err.message : 'unknown';
    return redirect(`/admin?error=${encodeURIComponent(msg)}`);
  }
};
