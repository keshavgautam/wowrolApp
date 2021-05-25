-- phpMyAdmin SQL Dump
-- version 4.0.10.14
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Mar 23, 2017 at 02:55 AM
-- Server version: 5.6.33-cll-lve
-- PHP Version: 5.6.20

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
  `account_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `login_identity` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `identity_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `verified` tinyint(4) NOT NULL DEFAULT '0',
  `login_id` bigint(20) NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  `ip_address` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `registration_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ajax_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `private_data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=15 ;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `login_identity`, `identity_type`, `password`, `verified`, `login_id`, `entity_id`, `ip_address`, `registration_time`, `ajax_password`, `private_data`) VALUES
(1, 'keshavayana&commat;gmail&period;com', 'email', 'c293c0dc7a009692e015d279aec6bc0d', 1, 2, 0, '106.215.182.74', '2017-01-19 22:15:39', '', '{"activation_key":"882306","visitId":"a13058a87765ee729","verification_attempt":4,"recovery_code":"609141","recovery_access":"kwh9fy6j6hwuaejq831l","recovery_time":1487700640}'),
(2, 'erindu&period;sharma05&commat;gmail&period;com', 'email', '4dcb53decba9defe02cceab3412e3a1d', 1, 3, 0, '8.37.230.226', '2017-01-22 23:29:43', '', '{"activation_key":"33vbd0","visitId":"","verification_attempt":3,"recovery_code":"45$%^&","recovery_access":"","recovery_time":""}'),
(3, 'kirteshkumar21&commat;gmail&period;com', 'email', '18064cd411af330b9e1090d60a24dda1', 0, 4, 0, '168.235.206.134', '2017-01-25 20:12:12', '', '{"activation_key":"mjp7hi","visitId":"a8058919c335e6af","verification_attempt":5,"recovery_code":"45$%^&","recovery_access":"","recovery_time":""}'),
(5, 'rohit&period;divine&commat;hotmail&period;com', 'email', '25f9e794323b453885f5181f1b624d0b', 0, 7, 0, '42.106.97.9', '2017-02-17 09:54:37', '', '{"activation_key":"0","visitId":"","verification_attempt":4,"recovery_code":"45$%^&","recovery_access":"","recovery_time":""}'),
(6, 'Rohit&period;gautam&period;rk&commat;gmail&period;com', 'email', '25f9e794323b453885f5181f1b624d0b', 1, 8, 0, '47.9.134.182', '2017-02-17 17:22:15', '', '{"activation_key":"127201","visitId":"a15058a8fa3bc4ebd","verification_attempt":4,"recovery_code":"45$%^&","recovery_access":"","recovery_time":""}'),
(7, 'Amitgautam5195&commat;gmail&period;com', 'email', '25f9e794323b453885f5181f1b624d0b', 0, 9, 0, '47.9.134.30', '2017-02-17 22:58:16', '', '{"activation_key":"0","visitId":"","verification_attempt":4,"recovery_code":"45$%^&","recovery_access":"","recovery_time":""}'),
(8, 'Chetanhada007&commat;gmail&period;com', 'email', 'cdf447ff6b0194450e7d07b8b8f4b26e', 0, 10, 0, '47.9.131.212', '2017-02-17 23:38:18', '', '{"activation_key":"4igbl5","visitId":"a11058a73c47ed27a","verification_attempt":5,"recovery_code":"45$%^&","recovery_access":"","recovery_time":""}'),
(9, 'Er&period;vaibhavgautam&commat;gmail&period;com', 'email', '59bbc3aa72484d22253a14554646e318', 0, 11, 0, '107.167.105.133', '2017-02-18 11:07:48', '', '{"activation_key":"0","visitId":"","verification_attempt":4,"recovery_code":"45$%^&","recovery_access":"","recovery_time":""}'),
(10, 'piyushpachhar&commat;gmail&period;com', 'email', '3aba069d7d9b8ec24e7fe0ad5b35f87d', 1, 13, 0, '47.9.130.76', '2017-02-21 23:22:51', '', '{"activation_key":"312455","visitId":"a24058ac84ff59ece","verification_attempt":4,"recovery_code":"45$%^&","recovery_access":"","recovery_time":""}'),
(11, 'cybercomptech&commat;gmail&period;com', 'email', '3418bbd86be28c77b3c7615c69a743f9', 1, 14, 0, '47.9.134.202', '2017-02-24 16:59:11', '', '{"activation_key":"890698","visitId":"","verification_attempt":4,"recovery_code":"45$%^&","recovery_access":"","recovery_time":""}'),
(12, 'bhuvneshgautam2093&commat;gmail&period;com', 'email', 'ffed584b5ff48837e2adb727459a4b7a', 0, 15, 0, '47.9.134.114', '2017-02-26 20:19:04', '', '{"activation_key":"631092","visitId":"a1058b2eb2114601","verification_attempt":5,"recovery_code":"45$%^&","recovery_access":"","recovery_time":""}'),
(13, 'pawan&period;k&period;malav&commat;mylogics&period;com', 'email', 'ebe5011d4966e71138e51edac4587a79', 1, 16, 0, '47.9.129.39', '2017-02-27 13:26:39', '', '{"activation_key":"029842","visitId":"","verification_attempt":4,"recovery_code":"45$%^&","recovery_access":"","recovery_time":""}'),
(14, 'Abhaygoyal40196&commat;gmail&period;com', 'email', '1066187a62e815dc400a51d1b2e6513b', 0, 17, 0, '47.9.134.78', '2017-03-11 18:37:16', '', '{"activation_key":"083507","visitId":"","verification_attempt":5,"recovery_code":"45$%^&","recovery_access":"","recovery_time":""}');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `login_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) NOT NULL,
  `login_identity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_remember` tinyint(4) DEFAULT '0',
  `actual_input_length` int(11) NOT NULL,
  `attempt` tinyint(7) NOT NULL DEFAULT '5',
  `login_block_time` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT '0000-00-00',
  UNIQUE KEY `login_id` (`login_id`),
  KEY `login_identity` (`login_identity`(191))
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=18 ;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`login_id`, `account_id`, `login_identity`, `password`, `is_remember`, `actual_input_length`, `attempt`, `login_block_time`) VALUES
(1, 1, 'keshavayana&commat;gmail&period;com', 'd3517d1e458710cef61db0dba9fe11ed', 0, 31, 0, '1484906742'),
(2, 1, 'keshavayana&commat;gmail&period;com', 'c293c0dc7a009692e015d279aec6bc0d', 0, 31, 5, '1489991658'),
(3, 2, 'erindu&period;sharma05&commat;gmail&period;com', '4dcb53decba9defe02cceab3412e3a1d', 0, 35, 5, '1488908218'),
(4, 3, 'kirteshkumar21&commat;gmail&period;com', '18064cd411af330b9e1090d60a24dda1', 0, 38, 5, '1485937715'),
(7, 5, 'rohit&period;divine&commat;hotmail&period;com', '25f9e794323b453885f5181f1b624d0b', 0, 33, 5, '1487469068'),
(8, 6, 'Rohit&period;gautam&period;rk&commat;gmail&period;com', '25f9e794323b453885f5181f1b624d0b', 0, 34, 5, '1487469115'),
(9, 7, 'Amitgautam5195&commat;gmail&period;com', '25f9e794323b453885f5181f1b624d0b', 0, 33, 5, '1487352873'),
(10, 8, 'Chetanhada007&commat;gmail&period;com', 'cdf447ff6b0194450e7d07b8b8f4b26e', 0, 33, 5, '1487354951'),
(11, 9, 'Er&period;vaibhavgautam&commat;gmail&period;com', '59bbc3aa72484d22253a14554646e318', 0, 35, 5, '1488876332'),
(12, 10, 'piyushpachhar&commat;gmail&period;com', '44a403898057e05ac5f5cac143731e4f', 0, 34, 5, '0000-00-00'),
(13, 10, 'piyushpachhar&commat;gmail&period;com', '3aba069d7d9b8ec24e7fe0ad5b35f87d', 0, 33, 5, '1487701247'),
(14, 11, 'cybercomptech&commat;gmail&period;com', '3418bbd86be28c77b3c7615c69a743f9', 0, 32, 5, '1487936310'),
(15, 12, 'bhuvneshgautam2093&commat;gmail&period;com', 'ffed584b5ff48837e2adb727459a4b7a', 0, 38, 5, '1488120608'),
(16, 13, 'pawan&period;k&period;malav&commat;mylogics&period;com', 'ebe5011d4966e71138e51edac4587a79', 0, 35, 5, '1488182242'),
(17, 14, 'Abhaygoyal40196&commat;gmail&period;com', '1066187a62e815dc400a51d1b2e6513b', 0, 37, 5, '1489237659');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
