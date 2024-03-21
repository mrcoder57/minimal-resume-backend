/*
  Warnings:

  - Made the column `education` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `overview` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "education" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "overview" SET NOT NULL;
