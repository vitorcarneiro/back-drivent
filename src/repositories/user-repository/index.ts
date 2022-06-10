import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

interface CreateUserData {
  email: string;
  password: string;
}

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

async function findByGithubId(githubId: number) {
  const userGitHub = await prisma.user.findUnique({
    where: {
      githubId,
    },
  });

  return userGitHub;
}

async function upsertUserGithubData(email: string, githubId: number) {
  const user = await prisma.user.upsert({
    where: {
      email,
    },
    update: {
      email,
      githubId,
    },
    create: {
      email,
      githubId,
    },
  });

  return user;
}

async function updateUserData(userData: CreateUserData) {
  return await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: userData.password,
    },
  });
}

const userRepository = {
  findByEmail,
  create,
  findByGithubId,
  upsertUserGithubData,
  updateUserData,
};

export default userRepository;
