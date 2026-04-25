// Content loaders using Vite's import.meta.glob (no Node.js fs needed)
// Files are bundled at build time, works in any runtime including Cloudflare Workers.

interface EventData { title: string; date: string; description: string; }
interface NewsData { title: string; date: string; excerpt: string; }
interface BoardMember { name: string; role: string; email: string; responsibilities: string; sortOrder: number; }
interface TeamData { name: string; league: string; season: string; trainingDay?: string; }
interface FaqData { question: string; answer: string; category: string; sortOrder: number; }
interface DownloadData { title: string; description: string; category: string; }
interface ClubInfo { memberCount: number; courtCount: number; hallCount: number; teamCount: number; }

function valuesOf<T>(modules: Record<string, T>): T[] {
  return Object.values(modules).filter((v): v is T => v != null);
}

export function getEvents(): EventData[] {
  const modules = import.meta.glob('../content/events/*/index.yaml', { eager: true, import: 'default' }) as Record<string, EventData>;
  return valuesOf(modules);
}

export function getNews(): NewsData[] {
  const modules = import.meta.glob('../content/news/*/index.yaml', { eager: true, import: 'default' }) as Record<string, NewsData>;
  return valuesOf(modules);
}

export function getBoardMembers(): BoardMember[] {
  const modules = import.meta.glob('../content/board-members/*/index.yaml', { eager: true, import: 'default' }) as Record<string, BoardMember>;
  return valuesOf(modules).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export function getTeams(): TeamData[] {
  const modules = import.meta.glob('../content/teams/*/index.yaml', { eager: true, import: 'default' }) as Record<string, TeamData>;
  return valuesOf(modules);
}

export function getFaq(): FaqData[] {
  const modules = import.meta.glob('../content/faq/*/index.yaml', { eager: true, import: 'default' }) as Record<string, FaqData>;
  return valuesOf(modules).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export function getDownloads(): Array<DownloadData & { file: string }> {
  const modules = import.meta.glob('../content/downloads/*/index.yaml', { eager: true, import: 'default' }) as Record<string, DownloadData>;
  // Map of available PDF files (also via import.meta.glob)
  const pdfs = import.meta.glob('/public/downloads/*.pdf', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

  return Object.entries(modules)
    .filter(([, v]) => v != null)
    .map(([path, data]) => {
      const slug = path.split('/').slice(-2, -1)[0];
      const pdfPath = `/downloads/${slug}.pdf`;
      const exists = Object.keys(pdfs).some((p) => p.endsWith(`${slug}.pdf`));
      return { ...data, file: exists ? pdfPath : '' };
    });
}

export function getClubInfo(): ClubInfo {
  const modules = import.meta.glob('../content/club-info/index.yaml', { eager: true, import: 'default' }) as Record<string, ClubInfo>;
  const first = Object.values(modules)[0];
  return first ?? { memberCount: 185, courtCount: 6, hallCount: 2, teamCount: 17 };
}
