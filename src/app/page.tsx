"use client";
import { Sage } from "@/components/Sage";
import { fetchPosts } from "./actions";
import { useCallback, useEffect, useState } from "react";

interface Anecdote {
	title: string;
	date: string;
	content: string;
}

export default function Home() {
	const [page, setPage] = useState(0);
	const [posts, setPosts] = useState<Set<Anecdote>>(new Set());
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

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

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [loadMorePosts]);

	return (
		<main>
			<Sage anecdotes={Array.from(posts)} />
			{loading && <p className="mx-auto">Loading...</p>}
		</main>
	);
}
