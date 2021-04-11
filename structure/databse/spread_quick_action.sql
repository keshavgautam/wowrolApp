-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2016 at 11:45 PM
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
-- Table structure for table `spread_comments`
--

CREATE TABLE IF NOT EXISTS `quick_action_spread` (
  `spread_quick_action_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `spread_id` bigint(20) NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  `qa_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ip` varchar(50)  NOT NULL,
  UNIQUE KEY `spread_quick_action_id` (`spread_quick_action_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci  ;

CREATE TABLE IF NOT EXISTS `quick_action_comment` (
  `comment_quick_action_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comment_id` bigint(20) NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  `qa_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ip` varchar(50)  NOT NULL,
  UNIQUE KEY `comment_quick_action_id` (`comment_quick_action_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci  ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
