import { notFoundError } from "@/errors";
import accommodationRepository from "@/repositories/accommodation-repository";
import { exclude } from "@/utils/prisma-utils";
import { Reservation, Transaction } from "@prisma/client";

async function getHotelsStatus() {
  const hotelsRooms = await accommodationRepository.findRoomsByHotels();
  if (hotelsRooms.length === 0) return hotelsRooms;

  const reservationsAvailable = hotelsRooms.map((hotel) => ({
    id: hotel.id,
    name: hotel.name,
    rooms: hotel.Room.length,
    capacity:
      hotel.Room.length > 0
        ? hotel.Room.map(
            (room) => room.AccommodationTypeRoom[0].AccommodationType.capacity
          ).reduce((prev, curr) => prev + curr)
        : 0,
    reservations:
      hotel.Room.length > 0
        ? hotel.Room.map((room) => room.Reservation.length).reduce(
            (prev, curr) => prev + curr
          )
        : 0,
  }));

  return reservationsAvailable;
}

async function createOrUpdateBooking(bookingData: BookingData) {
  const reservationData: ReservationData = {
    roomId: bookingData.roomId,
    userId: bookingData.userId,
    eventId: bookingData.eventId,
  };

  const reservation = await accommodationRepository.createUserReservation(
    reservationData
  );

  const transactionData: Omit<Transaction, "id"> = {
    hotelPrice: bookingData.hotelPrice,
    hotelSelected: bookingData.hotelSelected,
    modalityPrice: bookingData.modalityPrice,
    modalitySelected: bookingData.modalitySelected,
    total: bookingData.total,
    reservationId: reservation.id,
  };

  await accommodationRepository.createUserTransaction(transactionData);
}

async function getReservationById(userId: number) {
  const reservation = await accommodationRepository.getReservationById(userId);

  return reservation;
}

export interface ReservationData {
  roomId: number | null;
  userId: number;
  eventId: number;
}

export interface BookingData {
  roomId: number | null;
  hotelPrice: number | null;
  hotelSelected: "Sem Hotel" | "Com Hotel";
  modalityPrice: number;
  modalitySelected: "Presencial" | "Online";
  total: number;
  eventId: number;
  userId: number;
}

export type CreateBooking = Omit<Reservation, "id" | "userId">;
export type CreateOrUpdateBooking = Omit<Reservation, "id" | "roomId">;

const accommodationService = {
  getHotelsStatus,
  createOrUpdateBooking,
  getReservationById,
};

export default accommodationService;
