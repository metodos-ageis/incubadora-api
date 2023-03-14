-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "cnpj" INTEGER,
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

-- CreateIndex
CREATE UNIQUE INDEX "companies_title_key" ON "companies"("title");
