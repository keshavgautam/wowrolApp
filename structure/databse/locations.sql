--
-- Table structure for table `address`
--

CREATE TABLE IF NOT EXISTS `address` (
  `address_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `location_id` bigint(20) NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `landmark` text COLLATE utf8mb4_unicode_ci,
  `phone` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `varifed` tinyint(7) NOT NULL DEFAULT '0',
  `phone_varified` tinyint(4) NOT NULL DEFAULT '0',
  `type` tinyint(7) DEFAULT '0',
   PRIMARY KEY (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------
--
-- Table structure for table `all_location`
--

CREATE TABLE IF NOT EXISTS `locations` (
  `location_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci  NULL,
  `postalCode_id`  int(11) NOT NULL ,
  `country_id` int(11) NOT NULL ,
  `fl_admin_id`  int(11) NOT NULL ,
  `city_id` int(11) NOT NULL,
  `verified` tinyint(4) NOT NULL DEFAULT '0',
  `creater_id` bigint(20) NOT NULL,
  `create_time_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8  ;

-- --------------------------------------------------------
--
-- Table structure for table `location_postalCode`
-- FL_admin
--

CREATE TABLE IF NOT EXISTS `location_postalCode` (
  `postalCode_id` int(11) NOT NULL AUTO_INCREMENT,
  `postalCode` varchar(100) NOT NULL,
  `fl_admin_id`  int(11) NOT NULL ,
  `country_id` int(11) NOT NULL ,
  PRIMARY KEY (`postalCode_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8  ;

--
-- Table structure for table `first_level_administrative_in_country`
-- FL_admin
--

CREATE TABLE IF NOT EXISTS `location_fl_admin` (
  `fl_admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `fl_admin` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_id` int(11) NOT NULL ,
  PRIMARY KEY (`FL_admin_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8  ;


CREATE TABLE IF NOT EXISTS `location_cities` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_id` int(11) NOT NULL ,
  `fl_admin_id`  int(11) NOT NULL ,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8  ;

-- --------------------------------------------------------

