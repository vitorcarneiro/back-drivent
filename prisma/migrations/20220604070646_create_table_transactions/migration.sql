-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "hotelPrice" INTEGER,
    "hotelSelected" TEXT,
    "modalityPrice" INTEGER NOT NULL,
    "modalitySelected" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "reservationId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
