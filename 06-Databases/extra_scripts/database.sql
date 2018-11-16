-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/

-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-10-2018 a las 16:58:04
-- Versión del servidor: 10.1.36-MariaDB
-- Versión de PHP: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+03:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
-- ---
CREATE TABLE `users` (   
        
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8_spanish2_ci NOT NULL, 
 
  `register_date`     DATETIME DEFAULT CURRENT_TIMESTAMP,
  `modification_date` DATETIME ON UPDATE CURRENT_TIMESTAMP,
  `last_login` DATETIME DEFAULT CURRENT_TIMESTAMP,
    
  `birth_date` date NULL DEFAULT NULL,       
  `email` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `phone`  varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `city`  varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `country`  varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `address`  varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
    
 `type_user` enum('user','admin') COLLATE utf8_spanish2_ci NOT NULL,
  `activo` enum('true','false') COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- ---
-- Table 'payment_type'
-- ---

DROP TABLE IF EXISTS `payment_type`;
		
CREATE TABLE `payment_type` (
  `id`  int(11) NOT NULL AUTO_INCREMENT, 
  `name` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `mount` FLOAT(11,2) NULL DEFAULT NULL,
  `type` enum('limited','unlimited') COLLATE utf8_spanish2_ci NOT NULL,
  `period` enum('monthly','anual') COLLATE utf8_spanish2_ci NOT NULL,
  `quota` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


-- ---
-- Table 'payments'
-- ---

DROP TABLE IF EXISTS `payments`;
		
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `type` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `date_in` DATETIME NULL DEFAULT NULL,
  `date_out` DATETIME NULL DEFAULT NULL,
  `app_count` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ---
-- Foreign Keys 
-- ---
ALTER TABLE `users` AUTO_INCREMENT=1000;
ALTER TABLE `payments` ADD FOREIGN KEY (type) REFERENCES `payment_type` (`id`);
ALTER TABLE `payments` ADD FOREIGN KEY (user) REFERENCES `users` (`id`);


-- ---
-- Test Data
-- ---
INSERT INTO `users`(`id`, `username`, `password`, `name`, `lastname`, `register_date`, `modification_date`, `last_login`, `birth_date`, `email`, `phone`, `city`, `country`, `address`, `type_user`, `activo`) VALUES (NULL,'admin','$2a$10$Qq8blRFqUG2XAsuIBy.p.uYfuxHfOSaIzHCVGEw/4u1VF02I6ZD2K','Admin','User','2018-11-07 16:27:18',NULL,'2018-11-07 16:27:18','1994-04-08','info@laguna.com.ar','123456','Bahia Blanca','Argentina','Cabildo 500', 'admin',TRUE)


INSERT INTO `payment_type` (`id`, `name`, `mount`, `type`, `period`, `quota`) VALUES (NULL, 'Unlimited Annual', '999.99', 'unlimited', 'anual', '-1');
INSERT INTO `payment_type` (`id`, `name`, `mount`, `type`, `period`, `quota`) VALUES (NULL, 'Limited Annual', '499.99', 'limited', 'anual', '60');
INSERT INTO `payment_type` (`id`, `name`, `mount`, `type`, `period`, `quota`) VALUES (NULL, 'Unlimited Monthly', '49.99', 'unlimited', 'monthly', '-1');
INSERT INTO `payment_type` (`id`, `name`, `mount`, `type`, `period`, `quota`) VALUES (NULL, 'Limited Monthly', '29.99', 'limited', 'monthly', '5');

