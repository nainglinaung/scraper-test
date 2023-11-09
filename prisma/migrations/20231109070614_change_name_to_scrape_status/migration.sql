/*
  Warnings:

  - You are about to drop the column `keyword_status` on the `search_results` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "scraping_status" AS ENUM ('in-progress', 'failed', 'done');

-- AlterTable
ALTER TABLE "search_results" DROP COLUMN "keyword_status",
ADD COLUMN     "scraping_status" "scraping_status" NOT NULL DEFAULT 'in-progress';

-- DropEnum
DROP TYPE "keyword_status";
