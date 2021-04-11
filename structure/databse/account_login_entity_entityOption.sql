-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2016 at 08:09 PM
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
-- Table structure for table `accounts`
--

CREATE TABLE IF NOT EXISTS `accounts` (
  `account_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login_identity` varchar(100) DEFAULT NULL,
  `identity_type` tinyint(4) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `verified` tinyint(4) NOT NULL DEFAULT '0',
  `login_id` varchar(255) DEFAULT NULL,
  `ip_address` varchar(100) DEFAULT NULL,
  `active_entity_id` varchar(255) DEFAULT NULL,
  `registration_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
   UNIQUE KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8  ;

-- --------------------------------------------------------

--
-- Table structure for table `entity`
--

CREATE TABLE IF NOT EXISTS `entity` (
  `entity_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) NOT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `is_online` tinyint(4) DEFAULT NULL,
  `device_in_use` tinyint(4) DEFAULT NULL,
  `ajax_nounce` varchar(100) NOT NULL,
  `last_login` datetime NOT NULL,
  UNIQUE KEY `entity_id` (`entity_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

-- --------------------------------------------------------

--
-- Table structure for table `entity_options`
--

CREATE TABLE IF NOT EXISTS `entity_options` (
  `entity_option_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `entity_id` bigint(20) NOT NULL,
  `option_name` varchar(255) NOT NULL,
  `option_value` longtext NOT NULL,
  `privacy_id` varchar(255) NOT NULL DEFAULT '1',
  UNIQUE KEY `entity_option_id` (`entity_option_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8  ;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `login_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) NOT NULL,
  `login_identity` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_remember` tinyint(4) DEFAULT '0',
  `actual_input_length` int(11) NOT NULL,
  `attempt` tinyint(7) NOT NULL DEFAULT '5',
  `login_block_time` varchar(50) NOT NULL DEFAULT '0000-00-00',
  UNIQUE KEY `login_id` (`login_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
