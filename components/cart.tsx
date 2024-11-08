import { getCart, getCartFromDB } from "@/lib/cart";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { CheckoutForm } from "./checkout-form";
export default async function Cart() {
	const cart = await getCart();

	if (cart.length === 0) {
		return null;
	}

	const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);

	const products = await getCartFromDB(cart);

	return (
		<div>
			<div className="absolute -right-3 -top-1 rounded-full px-1 text-xs bg-ring text-background">
				{quantity}
			</div>
			<Sheet>
				<SheetTrigger asChild>
					<div className="absolute -right-3 -left-3 -top-1 -bottom-1" />
				</SheetTrigger>
				<SheetContent className="flex flex-col overflow-auto">
					<SheetHeader>
						<SheetTitle>Cart</SheetTitle>
						<SheetDescription>Buy now and pay later</SheetDescription>
						{products.map((product) => (
							<Card key={product.id} className="border-0">
								<CardHeader>
									<CardTitle>{product.name}</CardTitle>
									<CardDescription>{product.description}</CardDescription>
								</CardHeader>
							</Card>
						))}
					</SheetHeader>
					<SheetFooter className="mt-16">
						{quantity > 0 && <CheckoutForm />}
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
}
