/*
  Warnings:

  - You are about to drop the `ClientMoldOnOrders` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[clientId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClientMoldOnOrders" DROP CONSTRAINT "ClientMoldOnOrders_clientId_fkey";

-- DropForeignKey
ALTER TABLE "ClientMoldOnOrders" DROP CONSTRAINT "ClientMoldOnOrders_moldId_fkey";

-- DropForeignKey
ALTER TABLE "ClientMoldOnOrders" DROP CONSTRAINT "ClientMoldOnOrders_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "clientId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ClientMoldOnOrders";

-- CreateTable
CREATE TABLE "_MoldsToOrders" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MoldsToOrders_AB_unique" ON "_MoldsToOrders"("A", "B");

-- CreateIndex
CREATE INDEX "_MoldsToOrders_B_index" ON "_MoldsToOrders"("B");

-- CreateIndex
CREATE UNIQUE INDEX "orders_clientId_key" ON "orders"("clientId");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoldsToOrders" ADD CONSTRAINT "_MoldsToOrders_A_fkey" FOREIGN KEY ("A") REFERENCES "molds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoldsToOrders" ADD CONSTRAINT "_MoldsToOrders_B_fkey" FOREIGN KEY ("B") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
