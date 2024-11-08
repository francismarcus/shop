import { CartForm } from "@/components/cart-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Product as TProduct } from "@/lib/db";
import Image from "next/image";

export function Product({ product }: { product: TProduct }) {
	return (
		<Card className="relative flex flex-col flex-1 border-0 bg-card min-w-[300px] max-w-[300px] items-center justify-center overflow-hidden">
			<div className=" bg-card overflow-hidden">
				{product.note ? (
					<>
						<Image
							src={product.image}
							alt="Lab test"
							width={150}
							height={150}
							className="hover:scale-110 transition-all duration-300"
						/>
						<div className="absolute top-3 left-3 bg-background rounded-full py-1 px-4">
							<span className="text-xs font-medium text-primary">
								{product.note}
							</span>
						</div>
					</>
				) : (
					<Image
						src={product.image}
						alt="Lab test"
						width={150}
						height={150}
						className="hover:scale-110 transition-all duration-300"
					/>
				)}
			</div>
			<CardHeader className="w-full">
				<CardDescription>{product.brand}</CardDescription>
				<CardTitle className="text-lg">{product.name}</CardTitle>

				{product.discount ? (
					<div className="flex flex-row gap-2">
						<CardTitle className="text-red-400">-{product.discount}%</CardTitle>
						<CardTitle>
							${(product.price * (1 - product.discount / 100)).toFixed(0)}
						</CardTitle>
						<span className="text-xs text-muted-foreground line-through">
							${product.price}
						</span>
					</div>
				) : (
					<CardTitle>${product.price}</CardTitle>
				)}
			</CardHeader>
			<CardContent></CardContent>
			<CardFooter className="w-full">
				<CartForm productSlug={product.slug} />
			</CardFooter>
		</Card>
	);
}
