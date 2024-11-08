import { config } from "dotenv";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

config({ path: ".env" });


const sql = neon('postgresql://neondb_owner:e0T7hsaEbrkd@ep-snowy-mud-a2b5vzne.eu-central-1.aws.neon.tech/neondb?sslmode=require');
export const db = drizzle(sql, { schema });

export * from "./schema";
