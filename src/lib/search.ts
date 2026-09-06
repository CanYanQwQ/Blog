import { getCollection } from 'astro:content';

export interface SearchItem {
  title: string;
  description: string;
  url: string;
  type: string;
  keywords?: string;
}

/** Build the full search index across blog, projects, and notes collections. */
export async function buildSearchIndex(): Promise<SearchItem[]> {
  const posts = (await getCollection('blog')).filter((p) => !p.data.draft);
  const projects = await getCollection('projects');
  const notes = await getCollection('notes');

  return [
    ...posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      url: `/blog/${p.id}`,
      type: '文章',
      keywords: (p.data.tags || []).join(' '),
    })),
    ...projects.map((p) => {
      const repoName =
        p.data.repo?.match(/github\.com\/([^/]+)\/([^/]+?)(?:\/|$)/)?.[2]?.replace(/\.git$/, '') ||
        p.data.repo ||
        '项目';
      return {
        title: repoName,
        description: 'GitHub 项目',
        url: `/projects`,
        type: '项目',
        keywords: '',
      };
    }),
    ...notes.map((n) => ({
      title: n.body?.substring(0, 60).replace(/[#*`!\[\]]/g, '') || '说说',
      description: n.body?.substring(0, 120).replace(/[#*`!\[\]]/g, '') || '',
      url: `/notes`,
      type: '说说',
      keywords: '',
    })),
  ];
}

/** Filter the index down to one content type. */
export function filterByScope(items: SearchItem[], scope: string): SearchItem[] {
  if (scope === 'all') return items;
  if (scope === 'blog' || scope === 'archive') return items.filter((i) => i.type === '文章');
  if (scope === 'projects') return items.filter((i) => i.type === '项目');
  if (scope === 'notes') return items.filter((i) => i.type === '说说');
  return items;
}
