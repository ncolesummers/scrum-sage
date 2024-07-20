'use server'

import { kv } from '@vercel/kv';

interface Anecdote {
  title: string;
  date: string;
  content: string;
}

const sanitizeTitle = (title: string) =>
  title.replaceAll(/[*#]/g, '').replace('Title: ', '');


export async function fetchPosts(page: number) : Promise<Anecdote[]> {
  // Generate 10 dates based on the page number
  const postDates = Array.from({ length: 10 }, (_, i) => {
    const daysAgo = page * 10 + i;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
  });
  // Retrieve 10 posts from Vercel KV based on the page number
  const posts: Promise<Anecdote[]> = await Promise.all(
    Array.from({ length: 10 }, (_, i) => {
      const key = `anecdote:${postDates[i]}`;
      return kv.get(key);
    })
  )
  .then((posts) => posts.map((post: string, i: number) => {
    if (post) {

      const [title, ...content] = post?.split('\n');
      return {
        key: post,
        date: postDates[i],
        title: sanitizeTitle(title) || 'Anecdote',
        content: content.join('\n'),
      };
    }
  })
  .filter((post: Anecdote) => (post !== null && post !== undefined))
  );
  console.log('server action fetchPosts', posts);
  return posts;
}