-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "tconst" TEXT NOT NULL,
    "titleType" TEXT NOT NULL,
    "primaryTitle" TEXT NOT NULL,
    "originalTitle" TEXT NOT NULL,
    "isAdult" BOOLEAN NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "runtimeMinutes" INTEGER,
    "genres" TEXT[],

    PRIMARY KEY ("id")
);
