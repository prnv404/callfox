import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { env } from "./config";
import authRoutes from "./routes/auth";

const app = new Hono();

app.use("*", logger());
app.use("*", prettyJSON());
app.use(
    "*",
    cors({
        origin: env.FRONTEND_URL,
        credentials: true,
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    })
);


app.get("/", (c) => {
    return c.json({
        name: "Callvox API",
        version: "1.0.0",
        status: "healthy",
    });
});

app.get("/health", (c) => {
    return c.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        environment: env.NODE_ENV,
    });
});

// Auth routes
app.route("/api/auth", authRoutes);

app.notFound((c) => {
    return c.json({ success: false, error: "Not Found" }, 404);
});

app.onError((err, c) => {
    console.error(`[ERROR] ${err.message}`, err.stack);
    return c.json(
        {
            success: false,
            error: "Internal Server Error",
            message: env.NODE_ENV === "development" ? err.message : undefined,
        },
        500
    );
});

export { app };
