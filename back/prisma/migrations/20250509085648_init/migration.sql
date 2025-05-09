/*
  Warnings:

  - You are about to drop the column `apellidos` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nombres` on the `users` table. All the data in the column will be lost.
  - Added the required column `name` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `apellidos`,
    DROP COLUMN `nombres`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
