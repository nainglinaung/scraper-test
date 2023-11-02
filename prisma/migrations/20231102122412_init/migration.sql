-- CreateTable
CREATE TABLE "search_results" (
    "id" SERIAL NOT NULL,
    "adswords_count" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "link_count" TEXT,
    "total_search_result_for_keyword" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "raw_html" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "search_results_pkey" PRIMARY KEY ("id")
);
