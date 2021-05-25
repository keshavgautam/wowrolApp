--
-- Table structure for table `address`
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
   PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1 ;


-- --------------------------------------------------------



--
-- Table structure for table `product_varients`
--

CREATE TABLE IF NOT EXISTS `company_brand_varient` (
  `brand_varient_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `brand_id` bigint(20) NOT NULL,
  `sellingPrice` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `compairePrice` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Stock` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `private_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `edit_history` text COLLATE utf8mb4_unicode_ci,
  `deleted` tinyint(4) DEFAULT '0',
  UNIQUE KEY `brand_varient_id` (`brand_varient_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;