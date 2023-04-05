/*
  Warnings:

  - Added the required column `company_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "companies_progress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company_id" TEXT NOT NULL,
    "canvas" TEXT,
    "pitch" TEXT,
    "development_state" TEXT,
    "solution_definition" TEXT,
    "ecosystem" TEXT,
    "definition_validation" TEXT,
    "clients" TEXT,
    "concurrency_analysis" TEXT,
    "market_size" TEXT,
    "incoming_method" TEXT,
    "mvp" TEXT,
    "feedback_cycle" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "deleted_at" DATETIME
);
