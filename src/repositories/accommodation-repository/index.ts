import { prisma } from '@/config';
import { CreateOrUpdateBooking } from '@/services';

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
  
async function findEventUserReservations(reservationData: CreateOrUpdateBooking) {
  return prisma.reservation.findMany({
    where: {
      userId: reservationData.userId,
      eventId: reservationData.eventId,
    }
  })

}

const accommodationRepository = {
  findRoomsByHotels,
  findEventUserReservations,
};

export default accommodationRepository;
