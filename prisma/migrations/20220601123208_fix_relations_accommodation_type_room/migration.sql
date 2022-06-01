/*
  Warnings:

  - You are about to drop the column `AccommodationTypeId` on the `AccommodationTypeRoom` table. All the data in the column will be lost.
  - Added the required column `accommodationTypeId` to the `AccommodationTypeRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccommodationTypeRoom" DROP COLUMN "AccommodationTypeId",
ADD COLUMN     "accommodationTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AccommodationTypeRoom" ADD CONSTRAINT "AccommodationTypeRoom_accommodationTypeId_fkey" FOREIGN KEY ("accommodationTypeId") REFERENCES "AccommodationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
