-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2017 at 04:19 PM
-- Server version: 5.6.16
-- PHP Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `wowrol_update_0`
--

-- --------------------------------------------------------

--
-- Table structure for table `conversation_messages`
--

CREATE TABLE IF NOT EXISTS `conversation_messages` (
  `messages_id` bigint(20) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `update_measure`
--

CREATE TABLE IF NOT EXISTS `update_measure` (
  `object_id` bigint(20) NOT NULL,
  `object_Type` tinyint(7) NOT NULL,
  `event_details` text NOT NULL,
  `time_node` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `clone_object` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
