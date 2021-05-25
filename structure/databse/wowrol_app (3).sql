-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 21, 2019 at 09:30 PM
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
  `account_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `login_id` bigint(20) NOT NULL DEFAULT '0',
  `entity_id` bigint(20) NOT NULL DEFAULT '0',
  UNIQUE KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=8 ;

-- --------------------------------------------------------

--
-- Table structure for table `account_login_identity`
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=8 ;

-- --------------------------------------------------------

--
-- Table structure for table `activity_main`
--

CREATE TABLE IF NOT EXISTS `activity_main` (
  `activity_main_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `creater_id` bigint(20) NOT NULL,
  `object_id` bigint(20) NOT NULL,
  `activity_code` varchar(50) NOT NULL,
  `timestamp` int(11) DEFAULT NULL,
  UNIQUE KEY `activity_main_id` (`activity_main_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=75 ;

-- --------------------------------------------------------

--
-- Table structure for table `activity_ref`
--

CREATE TABLE IF NOT EXISTS `activity_ref` (
  `activity_ref_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `creater_id` bigint(20) NOT NULL,
  `object_id` bigint(20) NOT NULL,
  `activity_code` varchar(50) NOT NULL,
  `timestamp` int(11) DEFAULT NULL,
  UNIQUE KEY `activity_main_id` (`activity_ref_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1688 ;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE IF NOT EXISTS `address` (
  `address_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` bigint(20) NOT NULL,
  `location_id` bigint(20) NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `landmark` text COLLATE utf8mb4_unicode_ci,
  `phone` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `varifed` tinyint(7) NOT NULL DEFAULT '0',
  `phone_varified` tinyint(4) NOT NULL DEFAULT '0',
  `type` tinyint(7) DEFAULT '0',
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=64 ;

-- --------------------------------------------------------

--
-- Table structure for table `all_location`
--

CREATE TABLE IF NOT EXISTS `all_location` (
  `location_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `location_name` varchar(100) NOT NULL,
  `pincode` varchar(100) NOT NULL,
  `Districtname` varchar(100) NOT NULL,
  `Statename` varchar(100) NOT NULL,
  `Country` varchar(100) NOT NULL,
  PRIMARY KEY (`location_id`),
  FULLTEXT KEY `location_name` (`location_name`,`pincode`,`Districtname`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=154965 ;

-- --------------------------------------------------------

--
-- Table structure for table `checkins`
--

CREATE TABLE IF NOT EXISTS `checkins` (
  `checkIn_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `buyer_id` bigint(20) NOT NULL,
  `conversation_id` bigint(20) DEFAULT NULL,
  `store_id` bigint(20) NOT NULL,
  `shortlistedProducts_id` text,
  `suggestedProducts_id` text,
  `cartVarient_id` text,
  `cartVarient_data` text,
  `buyersPrivate_data` text,
  `storestaff_id` bigint(20) DEFAULT NULL,
  `checkInTime_gmt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `order_id` bigint(20) DEFAULT NULL,
  `discount_applied` text,
  `discount_data` text,
  UNIQUE KEY `checkIn_id` (`checkIn_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Table structure for table `company_brand`
--

CREATE TABLE IF NOT EXISTS `company_brand` (
  `brand_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `spread_id` bigint(20) NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_public_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_categories` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_private_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_live` tinyint(4) NOT NULL DEFAULT '0',
  `expire` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `edit_history` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  `cross_sell` text COLLATE utf8mb4_unicode_ci,
  `up_sell` text COLLATE utf8mb4_unicode_ci,
  `specifications` text COLLATE utf8mb4_unicode_ci,
  `filter_attribute_id` text COLLATE utf8mb4_unicode_ci,
  `search_data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` tinyint(7) NOT NULL DEFAULT '0',
  `countryinfo_id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=13 ;

-- --------------------------------------------------------

--
-- Table structure for table `company_brand_varient`
--

CREATE TABLE IF NOT EXISTS `company_brand_varient` (
  `brand_varient_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `brand_id` bigint(20) NOT NULL,
  `sellingPrice` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unique_identity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `private_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `edit_history` text COLLATE utf8mb4_unicode_ci,
  `deleted` tinyint(4) DEFAULT '0',
  UNIQUE KEY `brand_varient_id` (`brand_varient_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=11 ;

-- --------------------------------------------------------

--
-- Table structure for table `company_categories`
--

CREATE TABLE IF NOT EXISTS `company_categories` (
  `category_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `spread_id` bigint(20) NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  `parent_id` bigint(20) NOT NULL,
  `deleted` tinyint(4) DEFAULT '0',
  `edit_history` text COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `category_id` (`category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Table structure for table `conversation`
--

CREATE TABLE IF NOT EXISTS `conversation` (
  `conversation_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `members` text,
  `conversation_type` tinyint(4) NOT NULL,
  `last_check_time` text NOT NULL,
  `is_delete` text,
  `history_cleared_till` text,
  `table_code` smallint(5) NOT NULL,
  `lastactivity_time` int(11) NOT NULL,
  `checkIn_id` bigint(20) DEFAULT NULL,
  `admin_members` text,
  `Instant_Updater_code` int(10) NOT NULL DEFAULT '0',
  `Instant_Updater_hash` varchar(255) NOT NULL,
  UNIQUE KEY `conversation_id` (`conversation_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `countryinfo`
--

CREATE TABLE IF NOT EXISTS `countryinfo` (
  `countryinfo_id` int(11) NOT NULL AUTO_INCREMENT,
  `iso_alpha2` varchar(2) DEFAULT NULL,
  `iso_alpha3` varchar(3) DEFAULT NULL,
  `iso_numeric` int(11) DEFAULT NULL,
  `fips_code` varchar(3) DEFAULT NULL,
  `country` varchar(200) DEFAULT NULL,
  `capital` varchar(200) DEFAULT NULL,
  `areainsqkm` double DEFAULT NULL,
  `population` int(11) DEFAULT NULL,
  `continent` varchar(2) DEFAULT NULL,
  `tld` varchar(3) DEFAULT NULL,
  `currency` varchar(3) DEFAULT NULL,
  `currencyName` varchar(20) DEFAULT NULL,
  `Phone` varchar(10) DEFAULT NULL,
  `postalCodeFormat` varchar(20) DEFAULT NULL,
  `postalCodeRegex` varchar(255) DEFAULT NULL,
  `geonameId` int(11) DEFAULT NULL,
  `languages` varchar(200) DEFAULT NULL,
  `neighbours` varchar(20) DEFAULT NULL,
  `equivalentFipsCode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`countryinfo_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=253 ;

-- --------------------------------------------------------

--
-- Table structure for table `entity`
--

CREATE TABLE IF NOT EXISTS `entity` (
  `entity_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) NOT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `device_in_use` tinyint(4) DEFAULT NULL,
  `last_login` datetime NOT NULL,
  `public_data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `private_data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `entity_id` (`entity_id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=39 ;

-- --------------------------------------------------------

--
-- Table structure for table `entity_filter_junction`
--

CREATE TABLE IF NOT EXISTS `entity_filter_junction` (
  `entity_id` bigint(20) NOT NULL,
  `property_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `property_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `filter_attributes`
--

CREATE TABLE IF NOT EXISTS `filter_attributes` (
  `filter_attributes_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `entity_id` (`filter_attributes_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=68 ;

-- --------------------------------------------------------

--
-- Table structure for table `filter_attributes_brand_junction`
--

CREATE TABLE IF NOT EXISTS `filter_attributes_brand_junction` (
  `filter_attributes_id` bigint(20) NOT NULL,
  `brand_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `filter_attributes_junction`
--

CREATE TABLE IF NOT EXISTS `filter_attributes_junction` (
  `filter_attributes_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE IF NOT EXISTS `locations` (
  `location_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postalCode_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `fl_admin_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `verified` tinyint(4) NOT NULL DEFAULT '0',
  `creater_id` bigint(20) NOT NULL,
  `create_time_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `locationtype` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

-- --------------------------------------------------------

--
-- Table structure for table `location_cities`
--

CREATE TABLE IF NOT EXISTS `location_cities` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_id` int(11) NOT NULL,
  `fl_admin_id` int(11) NOT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- Table structure for table `location_fl_admin`
--

CREATE TABLE IF NOT EXISTS `location_fl_admin` (
  `fl_admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `fl_admin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_id` int(11) NOT NULL,
  PRIMARY KEY (`fl_admin_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=88 ;

-- --------------------------------------------------------

--
-- Table structure for table `location_postalcode`
--

CREATE TABLE IF NOT EXISTS `location_postalcode` (
  `postalCode_id` int(11) NOT NULL AUTO_INCREMENT,
  `postalCode` varchar(100) NOT NULL,
  `country_id` int(11) NOT NULL,
  `manager_entity_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`postalCode_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=16 ;

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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `session_id` (`session_id`(191))
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=30 ;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `buyer_entity_id` bigint(20) NOT NULL,
  `store_entity_id` bigint(20) NOT NULL,
  `order_type` tinyint(4) NOT NULL DEFAULT '0',
  `order_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_status` tinyint(7) NOT NULL DEFAULT '0',
  `order_time` datetime NOT NULL,
  `cartVarient_id` text COLLATE utf8mb4_unicode_ci,
  `cartVarient_data` text COLLATE utf8mb4_unicode_ci,
  `shipping_address` text COLLATE utf8mb4_unicode_ci,
  `checkIn_id` bigint(20) NOT NULL,
  `timestamp` int(11) NOT NULL DEFAULT '0',
  UNIQUE KEY `order_id` (`order_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Table structure for table `order_items_ref`
--

CREATE TABLE IF NOT EXISTS `order_items_ref` (
  `order_id` bigint(20) NOT NULL,
  `varient_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_statistics`
--

CREATE TABLE IF NOT EXISTS `order_statistics` (
  `order_id` bigint(20) NOT NULL,
  `sub_total` int(11) NOT NULL,
  `tax` int(11) NOT NULL,
  `sur_charge` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `total_weight` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `shipping_charge` int(11) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_tracking`
--

CREATE TABLE IF NOT EXISTS `order_tracking` (
  `order_tracking_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) NOT NULL,
  `tracking_msg` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `tracking_type` tinyint(4) NOT NULL DEFAULT '0',
  `to_status` tinyint(7) DEFAULT NULL,
  `update_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  UNIQUE KEY `order_traking_id` (`order_tracking_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Table structure for table `page_slug`
--

CREATE TABLE IF NOT EXISTS `page_slug` (
  `slug_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `object_id` varchar(255) CHARACTER SET utf8 NOT NULL,
  `object_type` varchar(50) CHARACTER SET utf8 NOT NULL,
  `content_slug` longtext CHARACTER SET utf8 NOT NULL,
  `original_slug` text CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`slug_id`),
  UNIQUE KEY `slug_id` (`slug_id`),
  FULLTEXT KEY `content_slug` (`content_slug`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=2336 ;

-- --------------------------------------------------------

--
-- Table structure for table `privacy_lists`
--

CREATE TABLE IF NOT EXISTS `privacy_lists` (
  `privacy_lists_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `entity_id` bigint(20) DEFAULT NULL,
  `lists_name` varchar(255) NOT NULL,
  `lists_type` tinyint(4) NOT NULL,
  `list_members` text NOT NULL,
  UNIQUE KEY `privacy_lists_id` (`privacy_lists_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Table structure for table `product_specifications`
--

CREATE TABLE IF NOT EXISTS `product_specifications` (
  `product_spf_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) NOT NULL,
  `specifications` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `product_spf_id` (`product_spf_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `product_varients`
--

CREATE TABLE IF NOT EXISTS `product_varients` (
  `varient_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) NOT NULL,
  `sellingPrice` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `compairePrice` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Stock` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `private_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `edit_history` text COLLATE utf8mb4_unicode_ci,
  `deleted` tinyint(4) DEFAULT '0',
  UNIQUE KEY `product_varient_id` (`varient_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=176 ;

-- --------------------------------------------------------

--
-- Table structure for table `quick_action_comment`
--

CREATE TABLE IF NOT EXISTS `quick_action_comment` (
  `comment_quick_action_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comment_id` bigint(20) NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  `qa_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ip` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `comment_quick_action_id` (`comment_quick_action_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `quick_action_spread`
--

CREATE TABLE IF NOT EXISTS `quick_action_spread` (
  `spread_quick_action_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `spread_id` bigint(20) NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  `qa_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ip` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `spread_quick_action_id` (`spread_quick_action_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=211 ;

-- --------------------------------------------------------

--
-- Table structure for table `relation`
--

CREATE TABLE IF NOT EXISTS `relation` (
  `entity_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `friends` longtext,
  `request_sent` longtext,
  `request_receved` longtext,
  `follower` longtext,
  `following` longtext,
  `alert` longtext,
  UNIQUE KEY `entity_id` (`entity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `relation_one_way`
--

CREATE TABLE IF NOT EXISTS `relation_one_way` (
  `one_wr_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `from_id` bigint(20) NOT NULL,
  `to_id` bigint(20) NOT NULL,
  `current_status` tinyint(4) DEFAULT NULL,
  `wr_type` tinyint(4) NOT NULL,
  UNIQUE KEY `one_wr_id` (`one_wr_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=56 ;

-- --------------------------------------------------------

--
-- Table structure for table `relation_two_way`
--

CREATE TABLE IF NOT EXISTS `relation_two_way` (
  `two_wr_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `from_id` bigint(20) NOT NULL,
  `to_id` bigint(20) NOT NULL,
  `current_status` tinyint(4) DEFAULT NULL,
  `from_action` tinyint(4) NOT NULL,
  `to_action` tinyint(4) NOT NULL,
  UNIQUE KEY `two_wr_id` (`two_wr_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=46 ;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE IF NOT EXISTS `reports` (
  `report_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `object_id` varchar(255) CHARACTER SET utf8 NOT NULL,
  `report_code` varchar(255) CHARACTER SET utf8 NOT NULL,
  `time` int(10) NOT NULL,
  `reporter_id` bigint(20) NOT NULL,
  UNIQUE KEY `report_id` (`report_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=9 ;

-- --------------------------------------------------------

--
-- Table structure for table `search_history`
--

CREATE TABLE IF NOT EXISTS `search_history` (
  `search_history_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `search_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  `time_node` int(11) NOT NULL,
  PRIMARY KEY (`search_history_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=189 ;

-- --------------------------------------------------------

--
-- Table structure for table `spread`
--

CREATE TABLE IF NOT EXISTS `spread` (
  `spread_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` bigint(20) NOT NULL,
  `owner_entity_id` bigint(20) NOT NULL,
  `spread_content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `quick_action_type` tinyint(4) NOT NULL DEFAULT '0',
  `comment_status` tinyint(4) NOT NULL DEFAULT '0',
  `spread_perpose` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `suspended` tinyint(4) NOT NULL DEFAULT '0',
  `privacy_id` bigint(20) NOT NULL,
  `spread_rank` int(11) NOT NULL,
  `spread_score` int(11) NOT NULL,
  `spread_date_gmt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `taged_entity` text COLLATE utf8mb4_unicode_ci,
  `attached_object` text COLLATE utf8mb4_unicode_ci,
  `ip` int(11) NOT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  `images` text COLLATE utf8mb4_unicode_ci,
  UNIQUE KEY `spread_id` (`spread_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=346 ;

-- --------------------------------------------------------

--
-- Table structure for table `spread_activity`
--

CREATE TABLE IF NOT EXISTS `spread_activity` (
  `spread_activity_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `creater_id` bigint(20) NOT NULL,
  `spread_id` bigint(20) NOT NULL,
  `object_id` bigint(20) NOT NULL,
  `activity_code` varchar(80) NOT NULL,
  `timestamp` int(11) DEFAULT NULL,
  `object_type` varchar(50) DEFAULT NULL,
  UNIQUE KEY `spread_activity_id` (`spread_activity_id`),
  KEY `spread_id` (`spread_id`),
  KEY `activity_code` (`activity_code`),
  KEY `creater_id` (`creater_id`),
  KEY `activity_code_2` (`activity_code`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=805 ;

-- --------------------------------------------------------

--
-- Table structure for table `spread_comments`
--

CREATE TABLE IF NOT EXISTS `spread_comments` (
  `spread_comment_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `spread_id` bigint(20) NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  `comment_content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_date_gmt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rating_value` int(11) DEFAULT NULL,
  `comment_rank` int(11) NOT NULL,
  `comment_score` int(11) NOT NULL,
  `deleted` tinyint(4) NOT NULL,
  UNIQUE KEY `spread_comment_id` (`spread_comment_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=449 ;

-- --------------------------------------------------------

--
-- Table structure for table `store_categories`
--

CREATE TABLE IF NOT EXISTS `store_categories` (
  `category_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `spread_id` bigint(20) NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  `parent_id` bigint(20) NOT NULL,
  `deleted` tinyint(4) DEFAULT '0',
  `edit_history` text COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `category_id` (`category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=71 ;

-- --------------------------------------------------------

--
-- Table structure for table `store_collections`
--

CREATE TABLE IF NOT EXISTS `store_collections` (
  `collection_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `collection_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` bigint(20) NOT NULL,
  `country_id` int(11) DEFAULT NULL,
  `use_type` tinyint(7) NOT NULL,
  `icon_svg` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted` tinyint(7) DEFAULT '0',
  PRIMARY KEY (`collection_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- Table structure for table `store_collection_junction`
--

CREATE TABLE IF NOT EXISTS `store_collection_junction` (
  `collection_id` bigint(20) NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  `location_id` bigint(20) NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `store_discount`
--

CREATE TABLE IF NOT EXISTS `store_discount` (
  `discount_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `discount` bigint(20) NOT NULL,
  `discount_code` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount_type` tinyint(7) DEFAULT '0',
  `begin_date` int(11) DEFAULT '0',
  `expire_date` int(11) DEFAULT '0',
  `apply_type` tinyint(7) DEFAULT '0',
  `date_range_type` tinyint(7) NOT NULL DEFAULT '0',
  `uses_type` tinyint(7) DEFAULT '0',
  `entity_id` bigint(20) NOT NULL,
  `prodcut_ids` text COLLATE utf8mb4_unicode_ci,
  `minimum_spend` int(11) DEFAULT '0',
  `validity` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`discount_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Table structure for table `store_discount_use_junction`
--

CREATE TABLE IF NOT EXISTS `store_discount_use_junction` (
  `discount_id` bigint(20) NOT NULL,
  `entity_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `store_menu`
--

CREATE TABLE IF NOT EXISTS `store_menu` (
  `store_menu_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `menu` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  `edit_history` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `store_menu_id` (`store_menu_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `store_products`
--

CREATE TABLE IF NOT EXISTS `store_products` (
  `product_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `brand_id` bigint(20) NOT NULL DEFAULT '0',
  `spread_id` bigint(20) NOT NULL,
  `entity_id` bigint(20) NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_public_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_categories` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_private_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_live` tinyint(4) NOT NULL DEFAULT '0',
  `expire` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `edit_history` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  `cross_sell` text COLLATE utf8mb4_unicode_ci,
  `up_sell` text COLLATE utf8mb4_unicode_ci,
  `specifications` text COLLATE utf8mb4_unicode_ci,
  `filter_attribute_id` text COLLATE utf8mb4_unicode_ci,
  `search_data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` tinyint(7) NOT NULL DEFAULT '0',
  UNIQUE KEY `product_id` (`product_id`),
  FULLTEXT KEY `product_categories` (`product_categories`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=99 ;

-- --------------------------------------------------------

--
-- Table structure for table `store_shipping`
--

CREATE TABLE IF NOT EXISTS `store_shipping` (
  `shipping_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `entity_id` bigint(20) NOT NULL,
  `shipping_name` varchar(255) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `range_data` longtext NOT NULL,
  `location_data` longtext NOT NULL,
  `locations` text NOT NULL,
  `timed_charge` text NOT NULL,
  `description` text NOT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  `edit_history` text NOT NULL,
  `shippingZonetype` tinyint(4) NOT NULL DEFAULT '1',
  `processing_time` tinyint(4) NOT NULL DEFAULT '3',
  UNIQUE KEY `shipping_id` (`shipping_id`),
  KEY `entity_id` (`entity_id`),
  FULLTEXT KEY `locations` (`locations`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Table structure for table `store_staff`
--

CREATE TABLE IF NOT EXISTS `store_staff` (
  `store_staff_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `store_id` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `public_data` longtext,
  `role` tinyint(4) NOT NULL,
  PRIMARY KEY (`store_staff_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Table structure for table `uniqid`
--

CREATE TABLE IF NOT EXISTS `uniqid` (
  `autoid` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `random` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  UNIQUE KEY `autoid` (`autoid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Table structure for table `wowrol_admin_option`
--

CREATE TABLE IF NOT EXISTS `wowrol_admin_option` (
  `wowrol_admin_option_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `option_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `option_value` varchar(255) CHARACTER SET utf8 NOT NULL,
  `option_type` varchar(255) CHARACTER SET utf8 NOT NULL,
  UNIQUE KEY `wowrol_admin_option_id` (`wowrol_admin_option_id`),
  FULLTEXT KEY `option_value` (`option_value`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=686 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
