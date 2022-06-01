import accommodationRepository from '@/repositories/accommodation-repository';

async function getRoomsByHotel() {
    const hotelsRooms = await accommodationRepository.findRoomsByHotel();

    return hotelsRooms;
}

const accommodationService = {
  getRoomsByHotel,
};

export default accommodationService;