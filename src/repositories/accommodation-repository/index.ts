import { prisma } from '@/config';

async function findHotelsRooms() {
    return prisma.hotel.findMany({
        include: {
            Room: true,
        }
  });
}

const accommodationRepository = {
  findHotelsRooms,
};

export default accommodationRepository;
