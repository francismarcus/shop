import { Suspense } from "react";
import { Tab } from "./tab";
import { Skeleton } from "./ui/skeleton";
import type { Category } from "@/lib/db/schema";

export function TabContainer({ promise }: { promise: Promise<Category[]> }) {
	return (
		<Suspense
			fallback={
				<>
					<h1 className="text-balance text-[42px] font-medium tracking-tighter font-sans text-transparent">
						All Products
					</h1>
					<Skeleton className="flex flex-row border rounded-full py-2 px-6 items-center gap-2 max-w-24 border-background">
						<span className="text-sm text-background font-medium">
							Placeholder
						</span>
					</Skeleton>
				</>
			}
		>
			<Tab promise={promise} />
		</Suspense>
	);
}
