import { prisma, redis } from "@/config";
import { Transaction } from "@prisma/client";
import { CreateOrUpdateBooking, ReservationData } from "@/services";

export type CreateTransactionData = Omit<Transaction, "id">;

async function findRoomsByHotels() {
  const cachedHotels = await redis.get("hotels");

  if (!cachedHotels) {
    const hotels = await prisma.hotel.findMany({
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
              },
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

    await redis.set("hotels", JSON.stringify(hotels));

    return hotels;
  }

  return JSON.parse(cachedHotels);
}

async function findRooms(hotelId?: number) {
  return prisma.room.findMany({
    where: { hotelId },
    select: {
      id: true,
      code: true,
      hotelId: true,
      Reservation: true,
      AccommodationTypeRoom: {
        select: {
          AccommodationType: true,
        },
      },
    },
  });
}

async function transactionsWithHotel() {
  return prisma.transaction.aggregate({
    where: {
      hotelSelected: "Com Hotel",
    },
    _count: true,
  });
}

async function createUserReservation(bookingData: ReservationData) {
  return prisma.reservation.create({ data: { ...bookingData } });
}

async function createUserTransaction(transactionData: CreateTransactionData) {
  return prisma.transaction.create({ data: { ...transactionData } });
}

async function getReservationById(userId: number) {
  return prisma.reservation.findFirst({
    include: {
      Transaction: true,
    },
    where: {
      userId,
    },
  });
}

async function findEventUserReservations(
  reservationData: CreateOrUpdateBooking
) {
  return prisma.reservation.findMany({
    where: {
      userId: reservationData.userId,
      eventId: reservationData.eventId,
    },
  });
}

async function updateReservationByUserId(roomId: number, userId: number) {
  await prisma.reservation.update({
    where: {
      userId,
    },
    data: {
      roomId,
    },
  });

  const hotels = await prisma.hotel.findMany({
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
            },
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

  await redis.set("hotels", JSON.stringify(hotels));
}

async function getHotelReviewByUserId(userId?: number) {
  return prisma.reservation.findMany({
    where: { userId },
    select: {
      Room: {
        select: {
          id: true,
          code: true,
          Reservation: true,
          Hotel: true,
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

async function getRoomById(roomId: number) {
  return prisma.room.findFirst({
    where: { id: roomId },
    select: {
      id: true,
      code: true,
      hotelId: true,
      AccommodationTypeRoom: {
        select: {
          AccommodationType: true,
        },
      },
      Reservation: true,
    },
  });
}

const accommodationRepository = {
  findRoomsByHotels,
  findRooms,
  createUserReservation,
  createUserTransaction,
  findEventUserReservations,
  getReservationById,
  transactionsWithHotel,
  updateReservationByUserId,
  getHotelReviewByUserId,
  getRoomById,
};

export default accommodationRepository;
