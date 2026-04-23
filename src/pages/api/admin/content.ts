import type { APIRoute } from 'astro';
import { verifySessionToken, getSessionCookieName } from '../../../lib/adminAuth';
import { commitFile, slugify } from '../../../lib/github';

export const prerender = false;

function yamlEscape(s: string): string {
  // Escape special YAML characters, wrap in quotes
  return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
}

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const token = cookies.get(getSessionCookieName())?.value;
  if (!verifySessionToken(token)) {
    return redirect('/admin?error=unauthorized');
  }

  try {
    const formData = await request.formData();
    const type = formData.get('type')?.toString(); // 'event' or 'news'
    const title = formData.get('title')?.toString()?.trim() || '';
    const date = formData.get('date')?.toString() || '';
    const description = formData.get('description')?.toString()?.trim() || '';

    if (!type || !title || !date || !description) {
      return redirect('/admin?error=missing_fields');
    }

    if (type !== 'event' && type !== 'news') {
      return redirect('/admin?error=invalid_type');
    }

    const folder = type === 'event' ? 'events' : 'news';
    const slug = slugify(title) + '-' + Date.now();
    const filePath = `src/content/${folder}/${slug}/index.yaml`;

    const yaml = type === 'event'
      ? `title: ${yamlEscape(title)}\ndate: "${date}"\ndescription: ${yamlEscape(description)}\n`
      : `title: ${yamlEscape(title)}\ndate: "${date}"\nexcerpt: ${yamlEscape(description)}\n`;

    await commitFile({
      path: filePath,
      content: yaml,
      message: `content: add ${type} "${title}"`,
    });

    return redirect(`/admin?success=${type}`);
  } catch (err) {
    console.error('[admin/content] Error:', err);
    const msg = err instanceof Error ? err.message : 'unknown';
    return redirect(`/admin?error=${encodeURIComponent(msg)}`);
  }
};
