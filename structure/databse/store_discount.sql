--
-- Table structure for table `address`
--

CREATE TABLE IF NOT EXISTS `store_discount` (
  `discount_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `discount` bigint(20) NOT NULL,
  `discount_code` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount_type` tinyint(7) DEFAULT '0',
  `begin_date` int(11) DEFAULT '0',
  `expire_date` int(11) DEFAULT '0',
  `apply_type` tinyint(7) DEFAULT '0',
  `uses_type` tinyint(7) DEFAULT '0',
  `entity_id` bigint(20) NOT NULL ,
  `prodcut_ids` text COLLATE utf8mb4_unicode_ci NULL,
   PRIMARY KEY (`discount_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1 ;


-- --------------------------------------------------------