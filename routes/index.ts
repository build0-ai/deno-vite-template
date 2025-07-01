import { Router } from "@oak/oak";
import { welcomeRouter } from "./api/welcome.ts";

export const router = new Router();

router.use(
  "/api/welcome",
  welcomeRouter.routes(),
  welcomeRouter.allowedMethods()
);
