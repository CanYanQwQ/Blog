import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site, features } from '../config';

export async function GET(context) {
  const posts = (await getCollection('blog')).filter((p) => !p.data.draft);
  const sortedPosts = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>${site.lang.toLowerCase()}</language>`,
  });
}