/*
  Warnings:

  - You are about to drop the `url` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "url";

-- CreateTable
CREATE TABLE "Url" (
    "id" BIGSERIAL NOT NULL,
    "shortURL" TEXT NOT NULL,
    "longURL" TEXT NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_id_key" ON "Url"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortURL_key" ON "Url"("shortURL");
