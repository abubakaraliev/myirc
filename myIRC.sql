CREATE DATABASE IF NOT EXISTS `myIRC`;

USE `myIRC`;

CREATE TABLE IF NOT EXISTS `users` (
    `username` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`username`)
);

CREATE TABLE IF NOT EXISTS `channels` (
    `identifier` VARCHAR(45) NOT NULL,
    `creation_date` DATETIME NOT NULL,
    `type` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`identifier`)
);

CREATE TABLE IF NOT EXISTS `messages`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `channel_id` VARCHAR(45) NOT NULL,
    `sender` VARCHAR(45) NOT NULL,
    `receiver` VARCHAR(45),
    `message` TEXT NOT NULL,
    `date` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`channel_id`) REFERENCES `channels`(`identifier`),
    FOREIGN KEY (`receiver`) REFERENCES `users`(`username`),
    FOREIGN KEY (`sender`) REFERENCES `users`(`username`)
);