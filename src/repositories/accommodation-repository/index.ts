import { prisma } from '@/config';

async function findRoomsByHotels() {
  return prisma.hotel.findMany({
    include: {
      Room: {
        select: {
          id: true,
          code: true,
          Reservation: {
            select: {
              id: true,
              userId: true,
              eventId: true,
            }
          },
          AccommodationTypeRoom: {
            select: {
              AccommodationType: true,
            },
          },
        },
      },
    },
  });
}

const accommodationRepository = {
  findRoomsByHotels
};

export default accommodationRepository;
