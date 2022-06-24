import { prisma, redis } from "@/config";

async function find(activityId: number) {
  return await prisma.activity.findUnique({
    where: { id: activityId },
    include: {
      EventPlace: true,
      ActivityReservation: true,
    },
  });
}

async function findAllActivities() {
  return await prisma.activity.findMany({
    include: {
      EventPlace: true,
      ActivityReservation: true,
    },
  });
}

async function getUserReservations(userId: number, activityId?: number) {
  return await prisma.activityReservation.findMany({
    where: {
      userId,
      activityId,
    },
    include: {
      Activity: true,
    },
  });
}

async function book(userId: number, activityId: number) {
  return await prisma.activityReservation.create({
    data: { userId, activityId },
  });
}

async function unbook(userId: number, activityId: number) {
  return await prisma.activityReservation.deleteMany({
    where: { userId, activityId },
  });
}

const activityRepository = {
  find,
  getUserReservations,
  book,
  unbook,
  findAllActivities,
};

export default activityRepository;
