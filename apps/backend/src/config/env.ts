import { z } from "zod";

// Environment variables schema
const envSchema = z.object({
    // Database
    DATABASE_URL: z.string().url(),

    // Better Auth
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.string().url(),

    // Frontend
    FRONTEND_URL: z.string().url().default("http://localhost:3000"),

    // DodoPayments
    DODO_PAYMENTS_API_KEY: z.string().min(1),
    DODO_PAYMENTS_WEBHOOK_SECRET: z.string().min(1),
    DODO_PAYMENTS_ENVIRONMENT: z.enum(["test_mode", "live_mode"]).default("test_mode"),

    // Server
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().default(3001),
});

// Parse and validate environment variables
export const env = envSchema.parse(process.env);

// Export type for environment
export type Env = z.infer<typeof envSchema>;
