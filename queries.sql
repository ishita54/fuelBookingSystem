

CREATE TABLE `tb_users`(
    `user_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `profile_pic` VARCHAR(200) NOT NULL,
    `is_deleted` TINYINT(1) NOT NULL DEFAULT '0',
    `is_blocked` TINYINT(1) NOT NULL DEFAULT '0',
    `user_name` VARCHAR(200) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `phone_no` MEDIUMTEXT NOT NULL,
    `access_token` MEDIUMTEXT NOT NULL,
    `creation_datetime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updation_datetime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(`user_id`),
    UNIQUE `email_phone`(`email`, `phone_no`)
) ENGINE = InnoDB;


CREATE TABLE `tb_booking`(
    `task_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `pump_id` BIGINT(20) NOT NULL,
    `task_datetime` DATETIME NOT NULL,
    `task_status` SMALLINT NOT NULL,
    `fuel_type` VARCHAR(200) NOT NULL,
    `user_id` BIGINT(20) NOT NULL,
    `creation_datetime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(`task_id`),
    INDEX `user_id`(`user_id`) USING BTREE
) ENGINE = InnoDB;


CREATE TABLE `tb_service_stations`(
    `pump_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `file_url` VARCHAR(200) NOT NULL,
    `is_deleted` TINYINT(1) NOT NULL DEFAULT '0',
    `fuel_type` JSON NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `address` VARCHAR(200) NOT NULL,
    `creation_datetime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(`pump_id`)
) ENGINE = InnoDB;