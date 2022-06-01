-- CreateTable
CREATE TABLE "_AccommodationTypeRoomToRoom" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AccommodationTypeRoomToRoom_AB_unique" ON "_AccommodationTypeRoomToRoom"("A", "B");

-- CreateIndex
CREATE INDEX "_AccommodationTypeRoomToRoom_B_index" ON "_AccommodationTypeRoomToRoom"("B");

-- AddForeignKey
ALTER TABLE "_AccommodationTypeRoomToRoom" ADD CONSTRAINT "_AccommodationTypeRoomToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "AccommodationTypeRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccommodationTypeRoomToRoom" ADD CONSTRAINT "_AccommodationTypeRoomToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
