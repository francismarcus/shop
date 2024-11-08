"use server";

import {
	db,
	categories,
	type Category,
	createCategorieSchema,
	createProductSchema,
} from "@/lib/db";
import { getCart, updateCart, clearCart } from "./cart";
import { unstable_after as after } from "next/server";
import { type Product, products, productsToCategories } from "./db/schema";
import { revalidateTag } from "next/cache";

export async function addToCart(prevState: unknown, formData: FormData) {
	const previousCart = await getCart();
	const productSlug = formData.get("productSlug");

	after(() => {
		console.log("User added", productSlug, "to cart");
	});

	if (typeof productSlug !== "string") {
		return;
	}

	const itemAlreadyExists = previousCart.find(
		(item) => item.productSlug === productSlug,
	);

	if (itemAlreadyExists) {
		const quantity = itemAlreadyExists.quantity + 1;
		const cart = previousCart.map((item) =>
			item.productSlug === productSlug ? { ...item, quantity } : item,
		);

		await updateCart(cart);
		return "Item quantity updated";
	}

	await updateCart([...previousCart, { productSlug, quantity: 1 }]);

	return "Item added to cart";
}

export async function checkout() {
	await clearCart();

	return "Thanks for your purchase!";
}

export async function createProduct(product: Product) {
	const parsed = createProductSchema.parse(product);
	await db.insert(products).values(parsed);
}

export async function createCategory(category: Category) {
	const parsed = createCategorieSchema.parse(category);
	await db.insert(categories).values(parsed);
	revalidateTag("categories");
}

export async function addProductToCategory(
	productId: number,
	categorySlug: string,
) {
	await db.insert(productsToCategories).values({ productId, categorySlug });
	// @ts-expect-error
	revalidateTag("products", categorySlug);
}
