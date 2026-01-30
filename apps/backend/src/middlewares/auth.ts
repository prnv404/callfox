import type { Context, Next } from "hono";
import { auth } from "../config/auth";

export interface AuthContext {
    user: {
        id: string;
        email: string;
        name: string;
        emailVerified: boolean;
        image?: string;
    } | null;
    session: {
        id: string;
        userId: string;
        expiresAt: Date;
    } | null;
}

/**
 * Middleware to check if the user is authenticated
 * Adds user and session to context if authenticated
 */
export async function requireAuth(c: Context, next: Next) {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session || !session.user) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    // Attach user and session to context
    c.set("user", session.user);
    c.set("session", session.session);

    await next();
}

/**
 * Middleware to optionally check authentication
 * Adds user and session to context if authenticated, but doesn't block if not
 */
export async function optionalAuth(c: Context, next: Next) {
    try {
        const session = await auth.api.getSession({ headers: c.req.raw.headers });

        if (session && session.user) {
            c.set("user", session.user);
            c.set("session", session.session);
        }
    } catch (error) {
        // Ignore errors for optional auth
    }

    await next();
}

/**
 * Helper function to get current user from context
 */
export function getCurrentUser(c: Context): AuthContext["user"] {
    return c.get("user") || null;
}

/**
 * Helper function to get current session from context
 */
export function getCurrentSession(c: Context): AuthContext["session"] {
    return c.get("session") || null;
}
