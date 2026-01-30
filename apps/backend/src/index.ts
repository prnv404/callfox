import { app } from "./app";
import { env, logger } from "./config";

// ============================================================================
// SERVER STARTUP
// ============================================================================

const server = Bun.serve({
    port: env.PORT,
    fetch: app.fetch,
});

logger.info(`🚀 Server is running`, {
    url: `http://localhost:${server.port}`,
    environment: env.NODE_ENV,
});

export default server;
