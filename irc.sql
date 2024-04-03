USE myIRC;
CREATE TABLE IF NOT EXISTS `users` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`user_id`)
);

CREATE TABLE IF NOT EXISTS `message` (
    `message_id` INT NOT NULL AUTO_INCREMENT,
    `receiver_id` INT NOT NULL,
    `expeditor_id` INT NOT NULL,
    `content` VARCHAR(5000) NOT NULL,
    PRIMARY KEY (`message_id`),
    FOREIGN KEY (`receiver_id`) REFERENCES `users`(`user_id`),
    FOREIGN KEY (`expeditor_id`) REFERENCES `users`(`user_id`)
);

CREATE TABLE IF NOT EXISTS `channels` (
    `channel_id` INT NOT NULL AUTO_INCREMENT,
    `message_id` INT NOT NULL,
    PRIMARY KEY(`channel_id`),
    FOREIGN KEY(`message_id`) REFERENCES `message`(`message_id`)
);


INSERT INTO `users`(username,password) VALUES ("username" , "1234");
