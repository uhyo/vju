-- CreateTable
CREATE TABLE `Group` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `isRoot` BOOLEAN NOT NULL DEFAULT false,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GroupTreePath` (
    `ancestorId` INT NOT NULL,
    `descendantId` INT NOT NULL,
    `pathLength` INT NOT NULL,
INDEX `GroupTreePath.pathLength_ancestorId_index`(`pathLength`, `ancestorId`),

    PRIMARY KEY (`descendantId`,`pathLength`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('ITEM') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GroupTreePath` ADD FOREIGN KEY (`ancestorId`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupTreePath` ADD FOREIGN KEY (`descendantId`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
