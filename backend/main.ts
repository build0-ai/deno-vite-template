import { Application, send } from "@oak/oak";
import { load } from "@std/dotenv";
import { router } from "./routes/index.ts";

await load({ export: true });

const app = new Application();
const port = Number(Deno.env.get("PORT")) || 3000;

// API routes
app.use(router.routes());
app.use(router.allowedMethods());

// Serve static files from frontend build output in production
const isProduction = Deno.env.get("NODE_ENV") === "production";
if (isProduction) {
  // Static file serving middleware
  app.use(async (ctx, next) => {
    const pathname = ctx.request.url.pathname;

    // Skip if it's an API route
    if (pathname.startsWith("/api")) {
      await next();
      return;
    }

    try {
      // Try to serve static files from frontend dist
      await send(ctx, pathname, {
        root: "../frontend/dist",
        index: "index.html",
      });
    } catch (error) {
      console.error("Error serving static file:", error);
      throw error;
    }
  });
}

console.log(`Server running on http://localhost:${port}`);
console.log(`Production mode: ${isProduction ? "enabled" : "disabled"}`);
if (isProduction) {
  console.log("Serving static files from ../frontend/dist");
}
await app.listen({ port });
