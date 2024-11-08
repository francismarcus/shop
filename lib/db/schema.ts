import {
	integer,
	pgTable,
	primaryKey,
	serial,
	text,
	index,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import { customAlphabet } from "nanoid";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

export const createId = (length = 14) => {
	return customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", length)();
};

export const categories = pgTable(
	"categories",
	{
		id: serial("id").primaryKey(),
		name: text("name").notNull(),
		slug: text("slug").notNull(),
		title: text("title").notNull(),
	},
	(t) => ({
		uniqueSlug: uniqueIndex("unique_slug").on(t.slug),
	}),
);

export type Category = typeof categories.$inferSelect;
export const createCategorieSchema = createInsertSchema(categories);
export const selectCategorieSchema = createSelectSchema(categories);

export const products = pgTable("products", {
	id: serial("id").primaryKey(),
	publicId: text("public_id")
		.notNull()
		.$defaultFn(() => createId(6)),
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	note: text("note"),
	brand: text("brand").notNull(),
	image: text("image").notNull(),
	price: integer("price").notNull(),
	discount: integer("discount").notNull().default(0),
	description: text("description").notNull(),
	details: text("details").notNull(),
});

export type Product = typeof products.$inferSelect;
export const createProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);

export const categoriesRelations = relations(categories, ({ many }) => ({
	productsToCategories: many(productsToCategories),
}));

export const productsRelations = relations(products, ({ many }) => ({
	productsToCategories: many(productsToCategories),
}));

export const productsToCategories = pgTable(
	"products_to_categories",
	{
		productId: integer("product_id")
			.notNull()
			.references(() => products.id),
		categorySlug: text("category_slug")
			.notNull()
			.references(() => categories.slug),
	},
	(t) => ({
		categorySlugIdx: index("category_slug_idx").on(t.categorySlug),
		pk: primaryKey({ columns: [t.productId, t.categorySlug] }),
	}),
);

export const productsToCategoriesRelations = relations(
	productsToCategories,
	({ one }) => ({
		product: one(products, {
			fields: [productsToCategories.productId],
			references: [products.id],
		}),
		category: one(categories, {
			fields: [productsToCategories.categorySlug],
			references: [categories.slug],
		}),
	}),
);
