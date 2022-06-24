import authenticationService, {
  SignInParams,
} from "@/services/authentication-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { CreateOauthData } from "@/schemas/oauth-schema";

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  const result = await authenticationService.signIn({ email, password });

  res.status(httpStatus.OK).send(result);
}

export async function signInGithub(req: Request, res: Response) {
  const loginGitHubData: CreateOauthData = req.body;

  const session = await authenticationService.createGitHub(loginGitHubData);

  res.status(httpStatus.OK).send(session);
}

export async function logOut(req: Request, res: Response) {
  const { userId } = req.params
  try {
    if (userId) {
      await authenticationService.logOut(parseInt(userId));
    }
  } catch (error) {
    console.log(error)
  }
  res.status(httpStatus.OK).send("Deleted");
}