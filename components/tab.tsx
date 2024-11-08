"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { use } from "react";
import type { Category } from "@/lib/db";

interface TabButtonProps {
	slug: string;
	label: string;
	isActive: boolean;
}

function TabButton({ slug, label, isActive }: TabButtonProps) {
	return (
		<Link
			href={`/${slug}`}
			className={cn(
				"flex flex-row border rounded-full py-2 px-6 items-center gap-2",
				isActive ? "border-ring" : "border-border hover:border-card",
			)}
		>
			<span
				className={cn(
					"text-sm font-medium",
					isActive ? "text-ring" : "text-muted-foreground",
				)}
			>
				{label}
			</span>
		</Link>
	);
}

export function Tab({ promise }: { promise: Promise<Category[]> }) {
	const tabs = use(promise);
	const filter = useParams().filter ?? "all";
	return (
		<>
			<h1 className="text-balance text-[42px] font-medium tracking-tighter font-sans">
				{tabs.find((category) => category.slug === filter)?.title}
			</h1>
			<div className="flex flex-row gap-2">
				{tabs.map((category) => (
					<TabButton
						key={category.id}
						label={category.name}
						slug={category.slug}
						isActive={filter === category.slug}
					/>
				))}
			</div>
		</>
	);
}
