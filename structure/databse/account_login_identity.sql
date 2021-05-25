


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
--
-- Table structure for table `accounts`
--

CREATE TABLE IF NOT EXISTS `account_login_identity` (
  `login_identity_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `login_identity` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `identity_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `authentication_provider` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `verified` tinyint(4) NOT NULL DEFAULT '0',
  `account_id` bigint(20) NOT NULL,
  `ip_address` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `registration_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `private_data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `login_identity_id` (`login_identity_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci  ;



CREATE TABLE IF NOT EXISTS `accounts` (
  `account_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `login_identity_id` bigint(20) NOT NULL,
  `login_id` bigint(20) NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  UNIQUE KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci  ;



--
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `login_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_remember` tinyint(4) DEFAULT '0',
  `actual_input_length` int(11) NOT NULL,
  `attempt` tinyint(7) NOT NULL DEFAULT '5',
  `login_block_time` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT '0000-00-00',
  UNIQUE KEY `login_id` (`login_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci  ;




