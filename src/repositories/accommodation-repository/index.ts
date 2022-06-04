import { prisma } from "@/config";
import { Transaction } from "@prisma/client";
import { CreateOrUpdateBooking, ReservationData } from "@/services";

export type CreateTransactionData = Omit<Transaction, "id">;

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

const accommodationRepository = {
  findRoomsByHotels,
  createUserReservation,
  createUserTransaction,
  findEventUserReservations,
  getReservationById,
};

export default accommodationRepository;
