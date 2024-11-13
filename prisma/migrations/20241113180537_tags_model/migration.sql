-- CreateTable
CREATE TABLE "url" (
    "id" INTEGER NOT NULL,
    "shortURL" TEXT NOT NULL,
    "longURL" TEXT NOT NULL,

    CONSTRAINT "url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "url_id_key" ON "url"("id");

-- CreateIndex
CREATE UNIQUE INDEX "url_shortURL_key" ON "url"("shortURL");
