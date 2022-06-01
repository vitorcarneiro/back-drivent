/*
  Warnings:

  - You are about to drop the column `AcommodationTypeId` on the `AccommodationTypeRoom` table. All the data in the column will be lost.
  - Added the required column `AccommodationTypeId` to the `AccommodationTypeRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccommodationTypeRoom" DROP COLUMN "AcommodationTypeId",
ADD COLUMN     "AccommodationTypeId" INTEGER NOT NULL;
