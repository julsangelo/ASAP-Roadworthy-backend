/*
  Warnings:

  - A unique constraint covering the columns `[sm8Uuid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sm8Uuid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_sm8Uuid_key" ON "User"("sm8Uuid");
