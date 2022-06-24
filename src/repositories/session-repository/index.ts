import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function create(data: Prisma.SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}

async function deleteSessions(userId: number) {
  return prisma.session.deleteMany({
    where: {
      userId
    },
  });
}

const sessionRepository = {
  create,
  deleteSessions
};

export default sessionRepository;
