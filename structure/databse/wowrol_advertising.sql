-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2017 at 07:08 PM
-- Server version: 5.6.16
-- PHP Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `wowrol_advertising`
--

-- --------------------------------------------------------

--
-- Table structure for table `advertisement`
--

CREATE TABLE IF NOT EXISTS `advertisement` (
  `advertisement_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `entity_id` bigint(20) NOT NULL,
  `varify_by_entity_id` bigint(20) NOT  NULL  DEFAULT '0',
  `status` tinyint(7) NOT NULL DEFAULT '0',
  `type` tinyint(7) NOT NULL DEFAULT '0',
  `monthly_budget` float(10,2) NOT NULL,
  `daily_budget` float(10,2) NOT NULL,
  `remaining_budget` float(10,2) NOT NULL,
  `currency` varchar(3) DEFAULT NULL,
  `start_timestamp`  int(11) NOT NULL,
  `end_timestamp`  int(11) NOT NULL,
    PRIMARY KEY (`advertisement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


--
-- Table structure for table `advertisement`
--

CREATE TABLE IF NOT EXISTS `advertise_text_content` (
  `advertisement_id` bigint(20) NOT NULL,
  `heading_1` varchar(255) COLLATE utf8mb4_unicode_ci  NULL,
  `heading_2` varchar(255) COLLATE utf8mb4_unicode_ci  NULL,
  `url` text COLLATE utf8mb4_unicode_ci  NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `advertisement`
--

CREATE TABLE IF NOT EXISTS `advertise_location` (
  `advertisement_id` bigint(20) NOT NULL,
  `postalCode_id` bigint(20) NOT NULL,
  `remaining_budget` float(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `advertisement`
--

CREATE TABLE IF NOT EXISTS `advertise_view` (
  `advertisement_id` bigint(20) NOT NULL,
  `postalCode_id` bigint(20) NOT NULL,
  `location_id` bigint(20) NOT NULL,
  `start_timestamp`  int(11) NOT NULL,
  `end_timestamp`  int(11) NULL,
  `entity_id` bigint(20) NOT NULL  DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
