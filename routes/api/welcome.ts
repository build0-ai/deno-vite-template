import { Router } from "@oak/oak";

export const welcomeRouter = new Router();

welcomeRouter.get("/", (ctx) => {
  ctx.response.body = {
    message: "Welcome to Build0!",
  };
});
