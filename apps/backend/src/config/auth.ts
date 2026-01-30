import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
    dodopayments,
    checkout,
    portal,
    webhooks,
    usage
} from "@dodopayments/better-auth";
import DodoPayments from "dodopayments";
import { db } from "./db";
import { env } from "./env";
import * as schema from "../model/schema";

if (!env.BETTER_AUTH_SECRET) {
    throw new Error("BETTER_AUTH_SECRET environment variable is not set");
}

if (!env.BETTER_AUTH_URL) {
    throw new Error("BETTER_AUTH_URL environment variable is not set");
}

// Create DodoPayments client
export const dodoPayments = new DodoPayments({
    bearerToken: env.DODO_PAYMENTS_API_KEY,
    environment: env.DODO_PAYMENTS_ENVIRONMENT as "test_mode" | "live_mode",
});

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: schema.users,
            session: schema.sessions,
            account: schema.accounts,
            verification: schema.verifications,
        },
    }),

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false, // Set to true if you want email verification
    },

    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day (session will be updated if it's older than this)
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // 5 minutes
        },
    },

    socialProviders: {
        // Add your social providers here
        // Example:
        // google: {
        //   clientId: process.env.GOOGLE_CLIENT_ID!,
        //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        // },
        // github: {
        //   clientId: process.env.GITHUB_CLIENT_ID!,
        //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        // },
    },

    trustedOrigins: [
        env.FRONTEND_URL,
    ],

    advanced: {
        generateId: false, // We're using cuid2 in the schema
        useSecureCookies: env.NODE_ENV === "production",
        cookieSameSite: "lax",
    },

    // DodoPayments Plugin Integration
    plugins: [
        dodopayments({
            client: dodoPayments,
            createCustomerOnSignUp: true, // Auto-create customers on signup
            use: [
                // Checkout Plugin - Enable secure payment processing
                checkout({
                    products: [
                        // Add your products here
                        // Example:
                        // {
                        //   productId: "pdt_xxxxxxxxxxxxxxxxxxxxx",
                        //   slug: "premium-plan",
                        // },
                    ],
                    successUrl: "/dashboard/success",
                    authenticatedUsersOnly: true,
                }),

                // Portal Plugin - Customer self-service portal
                portal(),

                // Usage Plugin - Track metered events for usage-based billing
                usage(),

                // Webhooks Plugin - Handle real-time payment events
                webhooks({
                    webhookKey: env.DODO_PAYMENTS_WEBHOOK_SECRET,
                    // Generic handler for all webhook events
                    onPayload: async (payload) => {
                        console.log("Received webhook:", payload.type);
                    },
                    // Payment event handlers
                    onPaymentSucceeded: async (payload) => {
                        console.log("Payment succeeded:", payload);
                        // TODO: Grant user access to purchased features
                    },
                    onPaymentFailed: async (payload) => {
                        console.log("Payment failed:", payload);
                        // TODO: Notify user of payment failure
                    },
                    // Subscription event handlers
                    onSubscriptionActive: async (payload) => {
                        console.log("Subscription active:", payload);
                        // TODO: Activate subscription features for user
                    },
                    onSubscriptionCancelled: async (payload) => {
                        console.log("Subscription cancelled:", payload);
                        // TODO: Revoke subscription features
                    },
                    onSubscriptionExpired: async (payload) => {
                        console.log("Subscription expired:", payload);
                        // TODO: Handle expired subscription
                    },
                    // Refund event handlers
                    onRefundSucceeded: async (payload) => {
                        console.log("Refund succeeded:", payload);
                        // TODO: Handle successful refund
                    },
                }),
            ],
        }),
    ],
});

// Export types
export type AuthSession = typeof auth.$Infer.Session.session;
export type AuthUser = typeof auth.$Infer.Session.user;
