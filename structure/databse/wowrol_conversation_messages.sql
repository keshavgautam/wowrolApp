-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2017 at 04:23 PM
-- Server version: 5.6.16
-- PHP Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `wowrol_conversation_messages`
--

-- --------------------------------------------------------

--
-- Table structure for table `conversation_messages`
--

CREATE TABLE IF NOT EXISTS `conversation_messages` (
  `messages_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `message` longtext NOT NULL,
  `conversation_id` bigint(20) NOT NULL,
  `recevers_id` text NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  `attachments_id` bigint(11) DEFAULT NULL,
  `attachments_type` tinyint(7) DEFAULT NULL,
  `time_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `receversDelete_id` text,
  `time_node` int(11) NOT NULL,
  UNIQUE KEY `messages_id` (`messages_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8  ;

-- --------------------------------------------------------

--
-- Table structure for table `conversation_messages_0`
--

CREATE TABLE IF NOT EXISTS `conversation_messages_0` (
  `messages_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `message` longtext NOT NULL,
  `conversation_id` bigint(20) NOT NULL,
  `recevers_id` text NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  `attachments_id` bigint(11) DEFAULT NULL,
  `attachments_type` tinyint(7) DEFAULT NULL,
  `time_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `receversDelete_id` text,
  `time_node` int(11) NOT NULL,
  UNIQUE KEY `messages_id` (`messages_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8  ;

-- --------------------------------------------------------

--
-- Table structure for table `conversation_messages_1`
--

CREATE TABLE IF NOT EXISTS `conversation_messages_1` (
  `messages_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `message` longtext NOT NULL,
  `conversation_id` bigint(20) NOT NULL,
  `recevers_id` text NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  `attachments_id` bigint(11) DEFAULT NULL,
  `attachments_type` tinyint(7) DEFAULT NULL,
  `time_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `receversDelete_id` text,
  `time_node` int(11) NOT NULL,
  UNIQUE KEY `messages_id` (`messages_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8  ;

-- --------------------------------------------------------

--
-- Table structure for table `conversation_messages_2`
--

CREATE TABLE IF NOT EXISTS `conversation_messages_2` (
  `messages_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `message` longtext NOT NULL,
  `conversation_id` bigint(20) NOT NULL,
  `recevers_id` text NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  `attachments_id` bigint(11) DEFAULT NULL,
  `attachments_type` tinyint(7) DEFAULT NULL,
  `time_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `receversDelete_id` text,
  `time_node` int(11) NOT NULL,
  UNIQUE KEY `messages_id` (`messages_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8  ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
