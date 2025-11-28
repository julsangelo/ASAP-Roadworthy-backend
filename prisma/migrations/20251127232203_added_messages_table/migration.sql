-- CreateTable
CREATE TABLE "JobMessage" (
    "id" SERIAL NOT NULL,
    "jobUuid" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobMessage" ADD CONSTRAINT "JobMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
