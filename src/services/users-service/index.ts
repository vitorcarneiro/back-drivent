import { cannotEnrollBeforeStartDateError } from "@/errors";
import userRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import eventsService from "../events-service";
import { duplicatedEmailError } from "./errors";

export async function createUser({
  email,
  password,
}: CreateUserParams): Promise<User> {
  await canEnrollOrFail();
  
  const user = await validateUniqueEmailOrFail(email);
  
  const hashedPassword = await bcrypt.hash(password, 12);
  
  if (user?.githubId) {
    return userRepository.updateUserData({
      email: user.email,
      password: hashedPassword,
    });
  } else {
    return userRepository.create({
      email,
      password: hashedPassword,
    });
  }
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  
  if (userWithSameEmail && !userWithSameEmail.githubId) {
    throw duplicatedEmailError();
  }
  return userWithSameEmail;
}

async function canEnrollOrFail() {
  const canEnroll = await eventsService.isCurrentEventActive();
  if (!canEnroll) {
    throw cannotEnrollBeforeStartDateError();
  }
}

export type CreateUserParams = Pick<User, "email" | "password">;

const userService = {
  createUser,
};

export * from "./errors";
export default userService;
