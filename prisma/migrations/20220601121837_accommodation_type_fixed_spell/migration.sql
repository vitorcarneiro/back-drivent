/*
  Warnings:

  - You are about to drop the `AcommodationType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AccommodationTypeRoomToRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AccommodationTypeRoomToRoom" DROP CONSTRAINT "_AccommodationTypeRoomToRoom_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccommodationTypeRoomToRoom" DROP CONSTRAINT "_AccommodationTypeRoomToRoom_B_fkey";

-- DropTable
DROP TABLE "AcommodationType";

-- DropTable
DROP TABLE "_AccommodationTypeRoomToRoom";

-- CreateTable
CREATE TABLE "AccommodationType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "AccommodationType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccommodationType_name_key" ON "AccommodationType"("name");

-- AddForeignKey
ALTER TABLE "AccommodationTypeRoom" ADD CONSTRAINT "AccommodationTypeRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
