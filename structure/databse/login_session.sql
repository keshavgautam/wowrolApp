-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2017 at 07:55 PM
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
-- Table structure for table `login_session`
--

CREATE TABLE IF NOT EXISTS `login_session` (
  `session_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `login_id` bigint(20) NOT NULL,
  `account_id` bigint(20) NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  `staff_id` bigint(20) NOT NULL,
  `login_identity` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `identity_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `appFlaver_id` tinyint(4) NOT NULL DEFAULT '0',
  `loginTimestamp` int(11) NOT NULL,
  `lastloginTimestamp` int(11) NOT NULL,
  `ip_address` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `browserDetails` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `LoginData` text COLLATE utf8mb4_unicode_ci,
  `EntityData` text COLLATE utf8mb4_unicode_ci,
  `staffData` text COLLATE utf8mb4_unicode_ci,
  KEY `session_id` (`session_id`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
