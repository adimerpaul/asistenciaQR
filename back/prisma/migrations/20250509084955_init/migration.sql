/*
  Warnings:

  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `delete_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `estudiante` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `apellidos` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombres` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `created_at`,
    DROP COLUMN `delete_at`,
    DROP COLUMN `name`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `apellidos` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleteAt` DATETIME(3) NULL,
    ADD COLUMN `direccion` VARCHAR(191) NULL,
    ADD COLUMN `fecha_nac` DATETIME(3) NULL,
    ADD COLUMN `nombres` VARCHAR(191) NOT NULL,
    ADD COLUMN `telefono` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL,
    MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'Estudiante';

-- DropTable
DROP TABLE `estudiante`;
