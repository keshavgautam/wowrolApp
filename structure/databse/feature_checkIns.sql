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

CREATE TABLE IF NOT EXISTS `checkIns` (
  `checkIn_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `buyers_id` text NOT NULL,
  `store_id` bigint(20)  NOT NULL,
 `shortlistedProducts_id` text NOT NULL,
 `cartProducts_id` text NOT NULL,
 `cartProducts_data` text NOT NULL,
 `buyersPrivate_data` text NOT NULL,
 `storestaff_id` bigint(20)  NOT NULL,
 `checkInTime_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  UNIQUE KEY `checkIn_id` (`checkIn_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

CREATE TABLE IF NOT EXISTS `checkInMessages` (
  `messages_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `checkIn_id` bigint(20) NOT NULL,
  `recevers_id` text NOT NULL,
  `sender_id` bigint(20)  NOT NULL,
  `attachments_id` text NULL,
  `attachments_type` text NULL,
  `Time_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  UNIQUE KEY `messages_id` (`messages_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
