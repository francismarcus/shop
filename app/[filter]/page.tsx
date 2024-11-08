import { ProductList } from "@/components/product-list";
import { Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ filter: string }> }) {

	return (
		<Suspense fallback={<div className="h-[700px]" />}>
			<ProductList  params={params} />
		</Suspense>
	);
}
