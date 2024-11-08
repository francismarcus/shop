import { getProductsByCategory } from "@/lib/queries";
import { Product } from "./product";

export async function ProductList({ params }: { params: Promise<{ filter: string }> }) {
	const filter = decodeURIComponent((await params).filter);
	const products = await getProductsByCategory(filter);

	return (
		<div className="w-full flex flex-col min-h-[700px] px-16 lg:px-32">
			<div className="flex flex-col md:flex-row gap-12 flex-wrap pt-8 justify-center">
				{products.map((product) => (
					<Product key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
