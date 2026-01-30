import { Hono } from "hono";
import { auth } from "../config/auth";

const authRoutes = new Hono();

// Better Auth handler - handles all auth endpoints
// This will create endpoints like:
// POST /api/auth/sign-in
// POST /api/auth/sign-up
// POST /api/auth/sign-out
// GET /api/auth/session
// etc.
authRoutes.all("/*", (c) => {
    return auth.handler(c.req.raw);
});

export default authRoutes;
