import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });



export default defineConfig({
	schema: "./lib/db/schema.ts",
	out: "./lib/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: 'postgresql://neondb_owner:e0T7hsaEbrkd@ep-snowy-mud-a2b5vzne.eu-central-1.aws.neon.tech/neondb?sslmode=require',
	},
});
