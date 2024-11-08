"use client";
import { useActionState, useEffect } from "react";
import { addToCart } from "@/lib/actions";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export function CartForm({ productSlug }: { productSlug: string }) {
	const [message, formAction, isPending] = useActionState(addToCart, null);

	return (
		<form className="flex flex-col gap-2 w-full" action={formAction}>
			<input type="hidden" name="productSlug" value={productSlug} />
			<Button variant="outline" className="w-full h-12 bg-card relative">
				{isPending && (
					<Loader2 className="w-4 h-4 animate-spin absolute right-4 text-muted-foreground" />
				)}
				<span className="text-base">Add to cart</span>
			</Button>
		</form>
	);
}
