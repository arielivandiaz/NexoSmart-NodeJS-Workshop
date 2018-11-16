

var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

 connection.query('CREATE DATABASE ' + dbconfig.database);


connection.query('\
    CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` int(11) NOT NULL AUTO_INCREMENT, \
    `username` varchar(255) COLLATE utf8_spanish2_ci NOT NULL, \
    `password` varchar(255) COLLATE utf8_spanish2_ci NOT NULL, \
    `name` varchar(255) COLLATE utf8_spanish2_ci NOT NULL, \
    `lastname` varchar(255) COLLATE utf8_spanish2_ci NOT NULL, \
    `register_date`     DATETIME DEFAULT CURRENT_TIMESTAMP, \
    `modification_date` DATETIME ON UPDATE CURRENT_TIMESTAMP, \
    `last_login` DATETIME DEFAULT CURRENT_TIMESTAMP, \
    `birth_date` date NULL DEFAULT NULL, \
    `email` varchar(255) COLLATE utf8_spanish2_ci NOT NULL, \
    `phone`  varchar(255) COLLATE utf8_spanish2_ci NOT NULL, \
    `city`  varchar(255) COLLATE utf8_spanish2_ci NOT NULL, \
    `country`  varchar(255) COLLATE utf8_spanish2_ci NOT NULL, \
    `address`  varchar(255) COLLATE utf8_spanish2_ci NOT NULL, \
    `type_user` enum("user", "admin") COLLATE utf8_spanish2_ci NOT NULL, \
    `activo` enum("true", "false") COLLATE utf8_spanish2_ci NOT NULL, \
    PRIMARY KEY(`id`) \
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish2_ci; \
');
console.log('Users Table Created');


connection.query('\
    CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.payment_type_table + '` ( \
        `id`  int(11) NOT NULL AUTO_INCREMENT, \
        `name` varchar(255) COLLATE utf8_spanish2_ci NOT NULL, \
        `mount` FLOAT(11,2) NULL DEFAULT NULL, \
        `type` enum("limited","unlimited") COLLATE utf8_spanish2_ci NOT NULL, \
        `period` enum("monthly","anual") COLLATE utf8_spanish2_ci NOT NULL, \
        `quota` int(11) NULL DEFAULT NULL, \
        PRIMARY KEY (`id`) \
    )ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci; \
');
console.log('Payment Type Created');

connection.query('\
    CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.payments_table + '` ( \
        `id` int(11) NOT NULL AUTO_INCREMENT, \
        `type` int(11) NOT NULL, \
        `user` int(11) NOT NULL, \
        `date_in` DATETIME NULL DEFAULT NULL, \
        `date_out` DATETIME NULL DEFAULT NULL, \
        `status` int(11) NULL DEFAULT 1, \
        PRIMARY KEY (`id`) \
        )ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci; \
 '); 
 console.log('Payment Created');

connection.query( 'ALTER TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` AUTO_INCREMENT=1000;' );
console.log('Users Table Modified');

connection.query('ALTER TABLE  `' + dbconfig.database + '`.`' + dbconfig.payments_table + '` ADD FOREIGN KEY (type) REFERENCES `payment_type` (`id`);')
console.log('Payments Table Modified');


connection.query('ALTER TABLE `' + dbconfig.database + '`.`' + dbconfig.payments_table + '` ADD FOREIGN KEY (user) REFERENCES `users` (`id`);')
console.log('Payments Table Modified');

connection.query('INSERT INTO `' + dbconfig.database + '`.`' + dbconfig.payment_type_table + '` (`id`, `name`, `mount`, `type`, `period`, `quota`) VALUES (NULL, "Unlimited Annual", "999.99", "unlimited", "anual", "-1");');
connection.query('INSERT INTO `' + dbconfig.database + '`.`' + dbconfig.payment_type_table + '` (`id`, `name`, `mount`, `type`, `period`, `quota`) VALUES (NULL, "Limited Annual", "499.99", "limited", "anual", "60");');
connection.query('INSERT INTO `' + dbconfig.database + '`.`' + dbconfig.payment_type_table + '` (`id`, `name`, `mount`, `type`, `period`, `quota`) VALUES (NULL, "Unlimited Monthly", "49.99", "unlimited", "monthly", "-1");');
connection.query('INSERT INTO `' + dbconfig.database + '`.`' + dbconfig.payment_type_table + '` (`id`, `name`, `mount`, `type`, `period`, `quota`) VALUES (NULL, "Limited Monthly", "29.99", "limited", "monthly", "5");');

console.log('Payments Type Table Uploaded');

console.log('Success: Database Created!');

connection.end();
