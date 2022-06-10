import { notFoundError } from "@/errors";
import accommodationRepository from "@/repositories/accommodation-repository";
import {
  AccommodationType,
  AccommodationTypeRoom,
  Prisma,
  Reservation,
  Room,
  Transaction,
} from "@prisma/client";

async function getHotels() {
  const hotelsRooms = await accommodationRepository.findRoomsByHotels();

  if (hotelsRooms.length === 0) return hotelsRooms;

  const hotels = hotelsRooms.map((hotel: { id: number; name: string; imageUrl?: string; Room: any[]; }) => ({
    id: hotel.id,
    name: hotel.name,
    imageUrl: hotel.imageUrl,
    accommodationTypes: accommodationTypes(hotel.Room),
    rooms: hotel.Room.length,
    capacity:
      hotel.Room.length > 0
        ? hotel.Room.reduce(
          (prev: any, curr: { AccommodationTypeRoom: { AccommodationType: { capacity: any; }; }[]; }) =>
            prev + curr.AccommodationTypeRoom[0].AccommodationType.capacity,
          0
        )
        : 0,
    reservations:
      hotel.Room.length > 0
        ? hotel.Room.map((room: { Reservation: string | any[]; }) => room.Reservation.length).reduce(
          (prev: any, curr: any) => prev + curr
        )
        : 0,
  }));

  return hotels;
}

async function getRooms(hotelId?: number) {
  const rooms = await accommodationRepository.findRooms(hotelId);

  const roomsMapped = rooms.map((room) => ({
    id: room.id,
    code: room.code,
    hotelId: room.hotelId,
    accommodationType: room.AccommodationTypeRoom[0].AccommodationType.name,
    capacity: room.AccommodationTypeRoom[0].AccommodationType.capacity,
    reservations: room.Reservation,
  }));

  return roomsMapped;
}

function accommodationTypes(hotelRooms: any[]): string[] {
  const types: string[] = [];

  const rooms = hotelRooms.map(
    (room) => room.AccommodationTypeRoom[0].AccommodationType.name
  );

  for (const room of rooms) {
    if (types.includes(room)) continue;
    types.push(room);
  }

  return types;
}

async function getTotalCapacity() {
  const rooms = await getRooms();

  const capacity = rooms.reduce((prev, curr) => prev + curr.capacity, 0);

  const reservations = (await accommodationRepository.transactionsWithHotel())
    ._count;

  return { capacity, reservations };
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

async function updateReservationByUserId(roomId: number, userId: number) {

  await accommodationRepository.updateReservationByUserId(roomId, userId);
}

async function getHotelReviewByUserId(userId?: number) {
  const roomId = await accommodationRepository.getHotelReviewByUserId(userId);


  return roomId;
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
  getHotels,
  getTotalCapacity,
  createOrUpdateBooking,
  getReservationById,
  getRooms,
  updateReservationByUserId,
  getHotelReviewByUserId,
};

export default accommodationService;
