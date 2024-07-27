import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Anecdote {
	title: string;
	date: string;
	content: string;
	key?: string;
}

export function Post({
	post,
	setSelected,
}: {
	post: Anecdote;
	setSelected: (post: Anecdote | null) => void;
}) {
	const formattedContent = post.content.split("\n").map((line) => (
		<>
			{line}
			<br key={crypto.randomUUID()} />
		</>
	));
	return (
		<div className="w-full max-w-6xl mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8">
			<div className="flex justify-end">
				<Button variant="ghost" size="icon" onClick={() => setSelected(null)}>
					<CloseIcon className="w-4 h-4" />
					<span className="sr-only">Close</span>
				</Button>
			</div>
			<Card key={post?.key ? post.key : crypto.randomUUID()} className="w-full">
				<CardHeader>
					<CardTitle>{post.title}</CardTitle>
					<CardDescription>{post.date}</CardDescription>
				</CardHeader>
				<CardContent>{formattedContent}</CardContent>
				<CardFooter className="flex justify-end">
					<Button variant="ghost" size="icon">
						<ShareIcon className="w-4 h-4" />
						<span className="sr-only">Share</span>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="18" y1="6" x2="6" y2="18" />
			<line x1="6" y1="6" x2="18" y2="18" />
		</svg>
	);
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
			<polyline points="16 6 12 2 8 6" />
			<line x1="12" x2="12" y1="2" y2="15" />
		</svg>
	);
}
