import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../model/schema";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
}

// Create a PostgreSQL connection
const connectionString = process.env.DATABASE_URL;

// For query purposes
const queryClient = postgres(connectionString);

// Create the Drizzle instance with schema
export const db = drizzle(queryClient, { schema });

// Export the query client for advanced usage
export { queryClient };

// Export schema for use in other files
export * from "../model/schema";
