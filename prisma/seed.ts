import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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
  }

  let eventPlaces = await prisma.eventPlace.findMany();
  if (!eventPlaces.length) {
    eventPlaces = [
      { id: 1, name: "Auditório Principal" },
      { id: 2, name: "Auditório Lateral" },
      { id: 3, name: "Sala de Workshop" },
    ];

    await prisma.eventPlace.createMany({
      data: eventPlaces,
    });

    eventPlaces = await prisma.eventPlace.findMany();
  }

  let activities = await prisma.activity.findMany();
  if (!activities.length) {
    activities = [
      {
        id: 1,
        name: "Minecraft: montando o PC ideal",
        capacity: 27,
        startTime: new Date("2022-10-22 09:00"),
        duration: 60,
        eventPlaceId: 1,
      },
      {
        id: 2,
        name: "LoL: montando o PC ideal",
        capacity: 0,
        startTime: new Date("2022-10-22 10:00"),
        duration: 60,
        eventPlaceId: 1,
      },
      {
        id: 3,
        name: "Palestra x",
        capacity: 27,
        startTime: new Date("2022-10-22 09:00"),
        duration: 120,
        eventPlaceId: 2,
      },
      {
        id: 4,
        name: "Palestra y",
        capacity: 27,
        startTime: new Date("2022-10-22 09:00"),
        duration: 60,
        eventPlaceId: 3,
      },
      {
        id: 5,
        name: "Palestra z",
        capacity: 1,
        startTime: new Date("2022-10-22 10:00"),
        duration: 60,
        eventPlaceId: 3,
      },
      {
        id: 6,
        name: "Palestra do Rui",
        capacity: 5000,
        startTime: new Date("2022-10-23 09:00"),
        duration: 180,
        eventPlaceId: 1,
      },
      {
        id: 7,
        name: "Palestra do Augusto",
        capacity: 100,
        startTime: new Date("2022-10-23 09:00"),
        duration: 60,
        eventPlaceId: 2,
      },
      {
        id: 8,
        name: "Palestra do Ventura",
        capacity: 100,
        startTime: new Date("2022-10-23 10:00"),
        duration: 60,
        eventPlaceId: 2,
      },
      {
        id: 9,
        name: "Palestra do Vitor",
        capacity: 100,
        startTime: new Date("2022-10-23 11:00"),
        duration: 60,
        eventPlaceId: 2,
      },
      {
        id: 10,
        name: "Dina falando bananinha por 2 horas",
        capacity: 42,
        startTime: new Date("2022-10-23 14:00"),
        duration: 120,
        eventPlaceId: 3,
      },
      {
        id: 11,
        name: "Pirulito Pop e seus dilemas",
        capacity: 990,
        startTime: new Date("2022-10-24 15:00"),
        duration: 120,
        eventPlaceId: 1,
      },
      {
        id: 12,
        name: "Como fazer um deploy sem se estressar",
        capacity: 0,
        startTime: new Date("2022-10-24 09:00"),
        duration: 120,
        eventPlaceId: 2,
      },
      {
        id: 13,
        name: "As tranças dos carecas: O filme",
        capacity: 14,
        startTime: new Date("2022-10-24 09:00"),
        duration: 180,
        eventPlaceId: 3,
      },
    ];

    await prisma.activity.createMany({
      data: activities,
    });

    activities = await prisma.activity.findMany();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
