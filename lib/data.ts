import { revalidateTag } from "next/cache";
import { categories, db, products, productsToCategories } from "./db";
import type { Category, Product } from "./db/schema";

export const Categories: Category[] = [
	{
		id: 1,
		name: "All",
		slug: "all",
		title: "All Products",
	},
	{
		id: 2,
		name: "Best Sellers",
		slug: "best-sellers",
		title: "Best Sellers",
	},
	{
		id: 3,
		name: "Bundles",
		slug: "bundles",
		title: "Bundles",
	},
];

interface MockProduct extends Omit<Product, "publicId"> {
	categories: string[];
}

export const Products: MockProduct[] = [
	{
		id: 1,
		name: "Glycine",
		categories: ["all", "best-sellers"],
		slug: "thorne-glycine",
		brand: "Thorne",
		note: null,
		image: "/glycine.png",
		price: 29,
		discount: 0,
		description:
			"Amino acid that promotes relaxation, detoxification, and normal muscle function*",
		details:
			"Glycine is an inhibitory neurotransmitter that supports relaxation and healthy stress management. It also enhances detoxification by increasing glutathione production.",
	},
	{
		id: 2,
		name: "Copper",
		categories: ["all"],
		slug: "thorne-copper",
		brand: "Thorne",
		note: null,
		image: "/copper.png",
		price: 17,
		discount: 0,
		description:
			"A well-absorbed form of copper, which is essential for heart, blood vessel, nerve, collagen health*",
		details:
			"Copper Bisglycinate, an optimally absorbed Albion mineral chelate, supports bone, blood vessel, heart, nerve, and skin health.* Supplement it if you are supplementing significant amounts of zinc.*",
	},
	{
		id: 3,
		name: "Selenium",
		categories: ["all"],
		slug: "thorne-selenium",
		brand: "Thorne",
		note: "Low stock",
		image: "/selenium.png",
		price: 29,
		discount: 10,
		description:
			"Selenium is an essential mineral that supports heart health, thyroid function, and optimal immune function*",
		details:
			"As a mineral cofactor, Selenium supports the body’s natural antioxidant systems, which protects against oxidative damage and supports healthy aging for your body and mind.*",
	},
	{
		id: 4,
		name: "Stress Management",
		categories: ["all", "bundles"],
		slug: "thorne-stress-management",
		brand: "Thorne",
		note: "3 in 1",
		image: "/stress-management.png",
		price: 129,
		discount: 0,
		description: "A trio of supplements that help manage stress*",
		details:
			"Thorne’s Stress Management Bundle contains three nutritional supplements that can help with stress management, as well as providing support for healthy adrenal function — Stress B-Complex, PharmaGABA-250, and Stress Balance.*",
	},
	{
		id: 5,
		name: "Skin Health",
		categories: ["all", "bundles", "best-sellers"],
		slug: "thorne-skin-health",
		brand: "Thorne",
		note: null,
		image: "/skin-health.png",
		price: 129,
		discount: 0,
		description:
			"A bundle of supplements that support glowing skin, healthy hair, and reduce fine lines and wrinkles*",
		details:
			"Thorne’s Skin Health Bundle contains two best-selling products to support the health and vitality of skin, hair, and nails* - Collagen Plus and Biotin.",
	},
	{
		id: 6,
		name: "Healthy Lipids",
		categories: ["all", "bundles", "best-sellers"],
		slug: "thorne-healthy-lipids",
		brand: "Thorne",
		note: null,
		image: "/healthy-lipids.png",
		price: 129,
		discount: 0,
		description: "A trio of supplements that promote healthy lipid levels*",
		details:
			"Thorne’s Healthy Lipids Bundle contains three supplements that promote healthy lipid levels, including Choleast-900, Berberine, and Curcumin Phytosome.*",
	},
	{
		id: 7,
		name: "Athletes Sleep",
		categories: ["all", "bundles"],
		slug: "thorne-athletes-sleep",
		brand: "Thorne",
		image: "/sleep-bundle.png",
		price: 129,
		note: "NSF Certified®",
		discount: 0,
		description: "A trio of supplements that support healthy sleep*",
		details:
			"Thorne’s Sleep Bundle helps athletes recover from the day’s activities and be prepared for a new day of training or competition.* All three products are NSF Certified for Sport®.",
	},
	{
		id: 8,
		name: "Niacel 400",
		categories: ["all", "bundles"],
		slug: "thorne-niacel-400",
		brand: "Thorne",
		note: "NSF Certified®",
		image: "/nr.png",
		price: 29,
		discount: 0,
		description:
			"Support the vitality of your brain and body with the youthful power of Nicotinamide Riboside*",
		details:
			"NiaCel 400 helps keep you feeling younger by benefiting cellular energy production, athletic performance, lean body composition, and supporting how your body handles its chronological age.* NSF Certified for Sport®",
	},
];

export const createCategories = async () => {
	console.log("Creating categories");
	revalidateTag("categories");
	return await db.insert(categories).values(Categories);
};

export const createProducts = async () => {
	for (const product of Products) {
		const { categories, ...rest } = product;
		const productId = await db
			.insert(products)
			.values(rest)
			.returning({ id: products.id });
		await db.insert(productsToCategories).values(
			categories.map((category) => ({
				productId: productId[0].id,
				categorySlug: category,
			})),
		);
	}
};
