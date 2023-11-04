/*
  Warnings:

  - You are about to drop the column `published` on the `search_results` table. All the data in the column will be lost.
  - The `link_count` column on the `search_results` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `adswords_count` on the `search_results` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "search_results" DROP COLUMN "published",
DROP COLUMN "adswords_count",
ADD COLUMN     "adswords_count" INTEGER NOT NULL,
DROP COLUMN "link_count",
ADD COLUMN     "link_count" INTEGER;
