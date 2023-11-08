/*
  Warnings:

  - The values [inprogress] on the enum `keyword_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "keyword_status_new" AS ENUM ('in-progress', 'done');
ALTER TABLE "search_results" ALTER COLUMN "keyword_status" TYPE "keyword_status_new" USING ("keyword_status"::text::"keyword_status_new");
ALTER TYPE "keyword_status" RENAME TO "keyword_status_old";
ALTER TYPE "keyword_status_new" RENAME TO "keyword_status";
DROP TYPE "keyword_status_old";
COMMIT;

-- AlterTable
ALTER TABLE "search_results" ALTER COLUMN "keyword_status" SET DEFAULT 'in-progress';
