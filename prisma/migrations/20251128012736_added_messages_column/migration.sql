/*
  Warnings:

  - You are about to drop the `JobMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JobMessage" DROP CONSTRAINT "JobMessage_userId_fkey";

-- DropTable
DROP TABLE "JobMessage";

-- CreateTable
CREATE TABLE "BookingMessage" (
    "id" SERIAL NOT NULL,
    "bookingUuid" TEXT NOT NULL,
    "bookingDescription" TEXT NOT NULL,
    "bookingStatus" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookingMessage" ADD CONSTRAINT "BookingMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
