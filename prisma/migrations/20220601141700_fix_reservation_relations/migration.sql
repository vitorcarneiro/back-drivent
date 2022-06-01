/*
  Warnings:

  - You are about to drop the column `capacity` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Reservation_name_key";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "capacity",
DROP COLUMN "name",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
