/*
  Warnings:

  - Added the required column `keyword_status` to the `search_results` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "keyword_status" AS ENUM ('inprogress', 'done');

-- AlterTable
ALTER TABLE "search_results" ADD COLUMN     "keyword_status" "keyword_status" NOT NULL;
