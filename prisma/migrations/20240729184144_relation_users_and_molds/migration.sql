/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `molds` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `molds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "molds" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "molds_userId_key" ON "molds"("userId");

-- AddForeignKey
ALTER TABLE "molds" ADD CONSTRAINT "molds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
