/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_roomId_fkey";

-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "roomId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_userId_key" ON "Reservation"("userId");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
