// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import type { Metadata } from "next";
import { Caudex } from "next/font/google";
import { Fraunces } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
	title: "Scrum Sage",
	description: "A daily dose of wisdom for your Scrum team",
};

const fontHeading = Caudex({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-heading",
	weight: "700",
});

const fontBody = Fraunces({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-body",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
	return (
		<html lang="en">
			<body
				className={`w-screen ${cn("antialiased", fontHeading.variable, fontBody.variable)}`}
			>
				{children}
			</body>
		</html>
	);
}
