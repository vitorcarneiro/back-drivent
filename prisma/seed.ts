import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  let hotels = await prisma.hotel.findMany();
  let hotel: { id: number; name: string; imageUrl: string; };
  if (hotels.length === 0) {
    hotel = await prisma.hotel.create({
      data: {
        name: 'Hotel Seed',
        imageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
      },
    });
  
  } else {
    hotel = hotels[0];
  } 

  console.log({ event, hotel });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
