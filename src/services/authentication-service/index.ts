import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import { exclude } from "@/utils/prisma-utils";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { invalidCredentialsError } from "./errors";
import { CreateOauthData } from "@/schemas/oauth-schema";
import * as authUtils from "../../utils/auth-utils";

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, "password"),
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, {
    id: true,
    email: true,
    password: true,
  });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

async function createGitHub(createGitHubData: CreateOauthData) {
  const configuration = { expiresIn: 60 * 60 };

  const dataToken = await authUtils.loginGitHub(createGitHubData.code);

  const userDataGitHub = await authUtils.getUserDataGitHub(
    dataToken.access_token,
    dataToken.token_type
  );

  const userGitHub = await userRepository.findByGithubId(userDataGitHub.id);

  if (!userGitHub) {
    const user = await userRepository.upsertUserGithubData(
      userDataGitHub.email,
      userDataGitHub.id
    );

    delete user.password;

    const token = await createSession(user.id);

    return { token, user: { id: user.id, email: user.email } };
  }

  delete userGitHub.password;
  const token = await createSession(userGitHub.id);

  return { token, user: { id: userGitHub.id, email: userGitHub.email } };
}

export type SignInParams = Pick<User, "email" | "password">;

type SignInResult = {
  user: Pick<User, "id" | "email">;
  token: string;
};

type GetUserOrFailResult = Pick<User, "id" | "email" | "password">;

const authenticationService = {
  signIn,
  createGitHub,
};

export default authenticationService;
export * from "./errors";
