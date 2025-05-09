-- CreateTable
CREATE TABLE `Asistencias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `hora` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deleteAt` DATETIME(3) NULL,
    `usersId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Asistencias` ADD CONSTRAINT `Asistencias_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
