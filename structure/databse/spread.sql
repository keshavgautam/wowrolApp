-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2016 at 11:28 PM
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
-- Table structure for table `spread`
--

CREATE TABLE IF NOT EXISTS `spread` (
  `spread_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` bigint(20)  NOT NULL,
  `owner_entity_id` bigint(20)  NOT NULL,
  `spread_content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `quick_action_type` tinyint(4) NOT NULL DEFAULT '0',
  `comment_status` tinyint(4) NOT NULL DEFAULT '0',
  `spread_perpose` varchar(50)  NOT NULL,
  `suspended` tinyint(4) NOT NULL DEFAULT '0',
  `privacy_id` bigint(20)  NOT NULL,
  `spread_rank` int(11) NOT NULL,
  `spread_score` int(11) NOT NULL,
  `spread_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY (`spread_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
