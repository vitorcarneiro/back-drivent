import { singInPost, signInGithub, logOut } from "@/controllers";
import { validateBody } from "@/middlewares";
import { signInSchema } from "@/schemas";
import { oauthSchema } from "@/schemas/oauth-schema";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.post("/sign-in", validateBody(signInSchema), singInPost);
authenticationRouter.post(
  "/sign-in/oauth/github",
  validateBody(oauthSchema),
  signInGithub
);
authenticationRouter.delete("/log-out/:userId", logOut);
export { authenticationRouter };
