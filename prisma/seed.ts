import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl:
          "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  let hotels = await prisma.hotel.findMany();
  if (hotels.length === 0) {
    await prisma.hotel.createMany({
      data: [
        {
          name: "Driven Resort",
          imageUrl:
            "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg",
        },
        {
          name: "Driven Palace",
          imageUrl: "https://www.ahstatic.com/photos/5451_ho_00_p_1024x768.jpg",
        },
        {
          name: "Driven World",
          imageUrl:
            "https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_450,q_auto,w_450/itemimages/96/95/96959_v6.jpeg",
        },
      ],
    });

    hotels = await prisma.hotel.findMany();
  }

  let accommodationTypes = await prisma.accommodationType.findMany();
  if (!accommodationTypes.length) {
    await prisma.accommodationType.createMany({
      data: [
        {
          name: "Single",
          capacity: 1,
        },
        {
          name: "Double",
          capacity: 2,
        },
        {
          name: "Triple",
          capacity: 3,
        },
      ],
    });

    accommodationTypes = await prisma.accommodationType.findMany();
  }

  let rooms = await prisma.room.findMany();
  if (!rooms.length) {
    for (let i = 0; i < hotels.length; i++) {
      const roomsData = [
        { code: "101", hotelId: hotels[i].id },
        { code: "102", hotelId: hotels[i].id },
        { code: "103", hotelId: hotels[i].id },
        { code: "104", hotelId: hotels[i].id },
        { code: "201", hotelId: hotels[i].id },
        { code: "202", hotelId: hotels[i].id },
        { code: "203", hotelId: hotels[i].id },
        { code: "204", hotelId: hotels[i].id },
        { code: "301", hotelId: hotels[i].id },
        { code: "302", hotelId: hotels[i].id },
        { code: "303", hotelId: hotels[i].id },
        { code: "304", hotelId: hotels[i].id },
      ];

      await prisma.room.createMany({
        data: roomsData,
      });
    }

    rooms = await prisma.room.findMany();
  }

  let index = 0;
  for (let i = 0; i < rooms.length; i++) {
    const accommodationTypeRoomData = {
      roomId: rooms[i].id,
      accommodationTypeId: accommodationTypes[index].id,
    };
    index++;

    await prisma.accommodationTypeRoom.create({
      data: accommodationTypeRoomData,
    });

    if (index === 3) {
      index = 0;
    }
  }

  console.log({ event, hotels });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
