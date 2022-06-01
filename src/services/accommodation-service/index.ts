import accommodationRepository from '@/repositories/accommodation-repository';

async function getHotelsRooms() {
    const hotelsRooms = await accommodationRepository.findHotelsRooms();

    return hotelsRooms;
}

const accommodationService = {
  getHotelsRooms,
};

export default accommodationService;