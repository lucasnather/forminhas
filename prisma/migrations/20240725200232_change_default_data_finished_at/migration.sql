-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "finished_at" DROP NOT NULL,
ALTER COLUMN "finished_at" DROP DEFAULT;
