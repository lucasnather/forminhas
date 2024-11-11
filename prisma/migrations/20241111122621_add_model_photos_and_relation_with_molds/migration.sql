-- CreateTable
CREATE TABLE "PhotosMolds" (
    "id" BIGSERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "moldsId" INTEGER NOT NULL,

    CONSTRAINT "PhotosMolds_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PhotosMolds" ADD CONSTRAINT "PhotosMolds_moldsId_fkey" FOREIGN KEY ("moldsId") REFERENCES "molds"("id") ON DELETE CASCADE ON UPDATE CASCADE;
