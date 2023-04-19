/*
  Warnings:

  - Added the required column `company_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies_progress" ADD COLUMN "canvas_score" INTEGER;
ALTER TABLE "companies_progress" ADD COLUMN "clients_score" INTEGER;
ALTER TABLE "companies_progress" ADD COLUMN "concurrency_analysis_score" INTEGER;
ALTER TABLE "companies_progress" ADD COLUMN "definition_validation_score" INTEGER;
ALTER TABLE "companies_progress" ADD COLUMN "development_state_score" INTEGER;
ALTER TABLE "companies_progress" ADD COLUMN "ecosystem_score" INTEGER;
ALTER TABLE "companies_progress" ADD COLUMN "feedback_cycle_score" INTEGER;
ALTER TABLE "companies_progress" ADD COLUMN "incoming_method_score" INTEGER;
ALTER TABLE "companies_progress" ADD COLUMN "market_size_score" INTEGER;
ALTER TABLE "companies_progress" ADD COLUMN "mvp_score" INTEGER;
ALTER TABLE "companies_progress" ADD COLUMN "pitch_score" INTEGER;
ALTER TABLE "companies_progress" ADD COLUMN "solution_definition_score" INTEGER;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_companies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "cnpj" TEXT,
    "project_time" INTEGER,
    "challenges" TEXT,
    "team_size" INTEGER,
    "project_started" TEXT,
    "website" TEXT,
    "ip" BOOLEAN DEFAULT false,
    "resources" TEXT,
    "resources_needed" TEXT,
    "mvp" BOOLEAN DEFAULT false,
    "incoming_model" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "deleted_at" DATETIME
);
INSERT INTO "new_companies" ("challenges", "cnpj", "created_at", "deleted_at", "description", "goal", "id", "incoming_model", "ip", "mvp", "project_started", "project_time", "resources", "resources_needed", "sector", "team_size", "title", "updated_at", "website") SELECT "challenges", "cnpj", "created_at", "deleted_at", "description", "goal", "id", "incoming_model", "ip", "mvp", "project_started", "project_time", "resources", "resources_needed", "sector", "team_size", "title", "updated_at", "website" FROM "companies";
DROP TABLE "companies";
ALTER TABLE "new_companies" RENAME TO "companies";
CREATE UNIQUE INDEX "companies_title_key" ON "companies"("title");
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL
);
INSERT INTO "new_users" ("cpf_cnpj", "email", "id", "is_active", "name", "password", "phone", "role") SELECT "cpf_cnpj", "email", "id", "is_active", "name", "password", "phone", "role" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_company_id_key" ON "users"("company_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
