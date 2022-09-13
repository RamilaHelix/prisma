-- CreateEnum
CREATE TYPE "State" AS ENUM ('Propose', 'Open', 'Closed');

-- CreateEnum
CREATE TYPE "Permit" AS ENUM ('Read', 'Create', 'Update', 'Delete');

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "state" "State" NOT NULL,
    "date" DATE,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Access" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "permit" "Permit" NOT NULL,

    CONSTRAINT "Access_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
--CREATE UNIQUE INDEX "Access_project_id_key" ON "Access"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "Access_project_id_user_id_permit_key" ON "Access"("project_id", "user_id", "permit");

-- AddForeignKey
ALTER TABLE "Access" ADD CONSTRAINT "Access_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO "Project"  (id, name, state, date) VALUES (1, 'Project A', 'Propose', '2022-01-01'),
        (2, 'Project B', 'Open', '2022-02-09'),
        (3, 'Project C', 'Open', '2022-04-13');

INSERT INTO "Access" (id, project_id, user_id, permit)
VALUES (1, 1, 1, 'Read'),
        (2, 1, 1,'Create'),
        (3, 1, 1,'Update'),
        (4, 1, 1,'Delete'),
        (5, 1, 2,'Read'),
        (6, 1, 2,'Create'),
        (7, 1, 3,'Read'),
        (8, 2, 1,'Read'),
        (9, 2, 1,'Create'),
        (10, 2, 1,'Update'),
        (11, 2, 1,'Delete'),
        (12, 2, 2,'Read'),
        (13, 2, 2,'Create'),
        (14, 2, 2, 'Update'),
        (15, 3, 1, 'Read'),
        (16, 3, 1, 'Create'),
        (17, 3, 1, 'Update'),
        (18, 3, 1, 'Delete'),
        (19, 3, 2, 'Read'),
        (20, 3, 3, 'Read'),
        (21, 3, 3, 'Create'),
        (22, 3, 3, 'Update'),
        (23, 3, 3, 'Delete');