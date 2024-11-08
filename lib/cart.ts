import { cookies } from "next/headers";
import { z } from "zod";
import { db } from "./db";
import { unstable_after as after } from "next/server";

export const CartItem = z.object({
	productSlug: z.string(),
	quantity: z.number(),
});

export const Cart = z.array(CartItem);

export type CartItem = z.infer<typeof CartItem>;
export type Cart = z.infer<typeof Cart>;

export async function getCart() {
	const cart = (await cookies()).get("cart");

	if (!cart) return [];

	try {
		const parsed = Cart.parse(JSON.parse(cart.value));

		return parsed;
	} catch {
		(await cookies()).delete("cart");
		return [];
	}
}

export async function clearCart() {
	return updateCart([]);
}

export async function updateCart(cart: Cart) {
	return (await cookies()).set("cart", JSON.stringify(cart), {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		maxAge: 60 * 60 * 24 * 7,
	});
}

export async function getCartFromDB(cart: Cart) {
	"use cache";

	const products = await db.query.products.findMany({
		where: (products, { inArray }) =>
			inArray(
				products.slug,
				cart.map((item) => item.productSlug),
			),
	});

	return products;
}
