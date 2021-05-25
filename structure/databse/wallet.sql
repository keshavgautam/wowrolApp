--
-- Table structure for table `wallet`
--

CREATE TABLE IF NOT EXISTS `wallet` (
  `wallet_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `entity_id` bigint(20) NOT NULL,
  `country_id` int(11) NOT NULL,
  `balance` float(10,2) NOT NULL DEFAULT '0.00',
   PRIMARY KEY (`wallet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1 ;


--
-- Table structure for table `wallet`
--

CREATE TABLE IF NOT EXISTS `wallet_transactions` (
  `transactions_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `wallet_id` bigint(20) NOT NULL,
  `reference` varchar (255) NOT NULL,
  `referenceType` tinyint(4) NOT NULL,
  `debit` float(10,2) NOT NULL,
  `credit` float(10,2) NOT NULL DEFAULT '0.00',
  `timestamp`  int(11) NOT NULL,
   PRIMARY KEY (`transactions_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1 ;