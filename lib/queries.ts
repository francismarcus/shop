"use server";
import { db } from "./db";
import { unstable_cacheTag as cacheTag } from "next/cache";

export async function getCategories() {
	"use cache";
	cacheTag("categories");

	
	return await db.query.categories.findMany();
}

export async function getProductsByCategory(slug: string) {
	"use cache";
	cacheTag("products", slug);

	if (slug === "all") {
		return await db.query.products.findMany();
	}

	const products = await db.query.productsToCategories.findMany({
		where: (productsToCategories, { eq }) =>
			eq(productsToCategories.categorySlug, slug),
		with: {
			product: true,
		},
	});

	return products.map(({ product }) => product);
}

export async function getProducts() {
	"use cache";

	return await db.query.products.findMany();
}
