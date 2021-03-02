/*
  Warnings:

  - You are about to drop the column `orginalTitle` on the `Movie` table. All the data in the column will be lost.
  - The `genres` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `originalTitle` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "orginalTitle",
ADD COLUMN     "originalTitle" TEXT NOT NULL,
DROP COLUMN "genres",
ADD COLUMN     "genres" TEXT[];
