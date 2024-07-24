'use client';
import { Sage } from '@/components/Sage';
import { Post } from '@/components/Post';
import { fetchPosts } from './actions';
import { useCallback, useEffect, useState } from 'react';

interface Anecdote {
  title: string;
  date: string;
  content: string;
  key?: string;
}

export default function Home() {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<Set<Anecdote>>(new Set());
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selected, setSelected] = useState<Anecdote | null>(null);

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newPosts = await fetchPosts(page);

    if (newPosts.length === 0) {
      setHasMore(false);
    } else {
      const mergedPosts = posts.union(new Set(newPosts));
      setPosts(mergedPosts);
      setPage((prevPage: number) => prevPage + 1);
    }

    setLoading(false);
  }, [loading, hasMore, page, posts]);

  useEffect(() => {
    loadMorePosts();
  }, [loadMorePosts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePosts]);

  if (selected) {
    return (
      <main>
        <Post post={selected} setSelected={setSelected} />
      </main>
    );
  }

  return (
    <main>
      <Sage setSelected={setSelected} anecdotes={Array.from(posts)} />
      {loading && <p className='mx-auto'>Loading...</p>}
    </main>
  );
}
