import { notFoundError } from '@/errors';
import accommodationRepository from '@/repositories/accommodation-repository';
import { exclude } from '@/utils/prisma-utils';
import { Reservation } from '@prisma/client';

async function getHotelsStatus() {
  const hotelsRooms = await accommodationRepository.findRoomsByHotels();
  if (hotelsRooms.length === 0)
    return hotelsRooms;
  
  const reservationsAvailable = hotelsRooms.map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    rooms: hotel.Room.length,
    capacity: hotel.Room.length > 0 ? hotel.Room
      .map(room => room.AccommodationTypeRoom[0].AccommodationType.capacity)
      .reduce((prev, curr) => prev + curr) : 0,
    reservations: hotel.Room.length > 0 ? hotel.Room
      .map(room => room.Reservation.length)
      .reduce((prev, curr) => prev + curr) : 0,    
  }));
  
  return reservationsAvailable;
}

async function createOrUpdateBooking(bookingData: ReservationData) {
  console.log(bookingData);
  const { eventId, userId, roomId } = bookingData;
  const reservations = await accommodationRepository.findEventUserReservations({ userId, eventId });

  if (reservations.length === 0) throw notFoundError();

  return reservations;
}

export type ReservationData = Omit<Reservation, 'id'>
export type CreateBooking = Omit<Reservation, 'id' | 'userId'>
export type CreateOrUpdateBooking = Omit<Reservation, 'id' | 'roomId'>

const accommodationService = {
  getHotelsStatus,
  createOrUpdateBooking,
};

export default accommodationService;