/*
  Warnings:

  - You are about to drop the column `apellido` on the `estudiante` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `estudiante` table. All the data in the column will be lost.
  - Added the required column `apellidos` to the `Estudiante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombres` to the `Estudiante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `estudiante` DROP COLUMN `apellido`,
    DROP COLUMN `nombre`,
    ADD COLUMN `apellidos` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombres` VARCHAR(191) NOT NULL;
