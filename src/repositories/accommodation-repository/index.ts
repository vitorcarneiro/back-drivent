import { prisma } from '@/config';

async function findHotelsRooms() {
  return prisma.hotel.findMany();
}

const accommodationRepository = {
  findHotelsRooms,
};

export default accommodationRepository;
