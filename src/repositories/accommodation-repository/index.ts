import { prisma } from '@/config';

async function findRoomsByHotel() {
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
  findRoomsByHotel,
};

export default accommodationRepository;
