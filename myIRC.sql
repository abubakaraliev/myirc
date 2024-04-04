CREATE DATABASE IF NOT EXISTS `myIRC`;

USE `myIRC`;

CREATE TABLE IF NOT EXISTS `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    CONSTRAINT UC_Users UNIQUE (`username`),
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Channels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `identifier` VARCHAR(45) NOT NULL,
    `creation_date` DATETIME NOT NULL,
    `type` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Messages`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `channel_id` INTEGER NOT NULL,
    `sender_id` INTEGER NOT NULL,
    `receiver_id` INTEGER,
    `text` TEXT NOT NULL,
    `date` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`channel_id`) REFERENCES `Channels`(`id`),
    FOREIGN KEY (`receiver_id`) REFERENCES `Users`(`id`),
    FOREIGN KEY (`sender_id`) REFERENCES `Users`(`id`)
);