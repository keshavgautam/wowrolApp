-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2016 at 09:50 AM
-- Server version: 5.6.16
-- PHP Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `wowrol_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `page_slug`
--

CREATE TABLE IF NOT EXISTS `store_products` (
  `product_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `spread_id` bigint(20) NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  `product_public_data` longtext NOT NULL,
  `product_categories` varchar(255)  NOT NULL,
  `product_private_data` longtext NOT NULL,
  `is_live` tinyint(4) NOT NULL DEFAULT '0',
  `expire` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
   UNIQUE KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;

CREATE TABLE IF NOT EXISTS `product_varients` (
  `product_varient_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) NOT NULL,
  `sellingPrice` varchar(80)  NOT NULL,
  `compairePrice` varchar(80)  NOT NULL,
  `Stock` varchar(80)  NOT NULL,
  `sku` varchar(255)  NOT NULL,
  `discount` varchar(80)  NOT NULL,
  `varient_data` longtext NOT NULL,
   UNIQUE KEY (`product_varient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;

CREATE TABLE IF NOT EXISTS `product_specifications` (
  `product_spf_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) NOT NULL,
  `specifications` longtext NOT NULL,
   UNIQUE KEY (`product_spf_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
