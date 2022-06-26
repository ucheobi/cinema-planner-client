-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" TIMESTAMP(3) NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
