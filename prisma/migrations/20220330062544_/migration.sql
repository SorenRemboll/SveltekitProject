-- CreateTable
CREATE TABLE `users` (
    `id` SMALLINT NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(50) NULL,
    `user_password` VARCHAR(100) NULL,
    `user_fName` VARCHAR(50) NULL,
    `user_lName` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` SMALLINT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
