import accommodationRepository from '@/repositories/accommodation-repository';

async function getHotelsStatus() {
  const hotelsRooms = await accommodationRepository.findRoomsByHotels();
  const reservationsAvailable = hotelsRooms.map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    rooms: hotel.Room.length,
    capacity: hotel.Room
      .map(room => room.AccommodationTypeRoom[0].AccommodationType.capacity)
      .reduce((prev, curr) => prev + curr),
    reservations: hotel.Room
      .map(room => room.Reservation.length)
      .reduce((prev, curr) => prev + curr),    
  }));
  
  return reservationsAvailable;
}

const accommodationService = {
  getHotelsStatus,
};

export default accommodationService;