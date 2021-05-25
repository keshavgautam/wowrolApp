-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2017 at 04:21 PM
-- Server version: 5.6.16
-- PHP Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `wowrol_utility_0`
--

-- --------------------------------------------------------

--
-- Table structure for table `images_0`
--

CREATE TABLE IF NOT EXISTS `images_0` (
  `image_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `entity_id` bigint(20) NOT NULL DEFAULT '0',
  `is_in_use` tinyint(4) NOT NULL DEFAULT '0',
  `storage_info` tinyint(7) NOT NULL DEFAULT '0',
  `update_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ObjectURL` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_node` int(11) NOT NULL,
  `filesize` int(11) NOT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=98 ;

--
-- Dumping data for table `images_0`
--

INSERT INTO `images_0` (`image_id`, `entity_id`, `is_in_use`, `storage_info`, `update_hash`, `ObjectURL`, `time_node`, `filesize`) VALUES
(2, 0, 0, 0, 'kw', '', 0, 0),
(3, 0, 0, 0, 'k4', '', 0, 0),
(4, 0, 0, 0, 'jm', '', 0, 0),
(5, 0, 0, 0, 't5', '', 0, 0),
(6, 0, 0, 0, 'ts', '', 0, 0),
(7, 0, 0, 0, 'z8', '', 0, 0),
(8, 0, 0, 0, '6c', '', 0, 0),
(9, 0, 0, 0, 'i6', '', 0, 0),
(10, 0, 0, 0, 'eh', '', 0, 0),
(11, 0, 0, 0, '2r', '', 0, 0),
(12, 0, 0, 0, 'tu', '', 0, 0),
(13, 0, 0, 0, '4w', '', 0, 0),
(14, 0, 0, 0, 'q0', '', 0, 0),
(15, 0, 0, 0, 'l6', '', 0, 0),
(16, 0, 0, 0, 'a0', '', 0, 0),
(17, 0, 0, 0, 'wx', '', 0, 0),
(18, 0, 0, 0, '3q', '', 0, 0),
(19, 0, 0, 0, '5d', '', 0, 0),
(20, 0, 0, 0, 'pp', '', 0, 0),
(21, 0, 0, 0, 'mp', '', 0, 0),
(22, 0, 0, 0, '3l', '', 0, 0),
(23, 0, 0, 0, '0y', '', 0, 0),
(24, 0, 0, 0, 'ak', '', 0, 0),
(25, 0, 0, 0, 'io', '', 0, 0),
(26, 0, 0, 0, '30', '', 0, 0),
(27, 0, 0, 0, 't6', '', 0, 0),
(28, 0, 0, 0, 'wf', '', 0, 0),
(29, 0, 0, 0, 'ja', '', 0, 0),
(30, 0, 0, 0, 'jv', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_30.png', 0, 0),
(31, 0, 0, 0, 'zo', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_31.png', 0, 0),
(32, 0, 0, 0, 'bc', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_32.png', 0, 0),
(33, 0, 0, 0, 's2', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_33.png', 0, 0),
(34, 0, 0, 0, 'f8', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_34.png', 0, 0),
(35, 0, 0, 0, 'al', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_35.jpeg', 0, 0),
(36, 0, 0, 0, 'q0', '', 0, 0),
(37, 0, 0, 0, '3m', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_37.png', 0, 0),
(38, 0, 0, 0, '8o', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_38.jpeg', 0, 0),
(39, 0, 0, 0, 't4', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_39.png', 0, 0),
(40, 0, 0, 0, '4shf81tj14', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_40.jpeg', 0, 0),
(41, 0, 0, 0, '4scczhi7pj', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_41.png', 0, 0),
(42, 0, 0, 0, '2jmohvr2uz', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_42.png', 0, 0),
(43, 0, 0, 0, 'mwi5ohu70n', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_43.png', 0, 0),
(44, 0, 0, 0, 'p0tybmetxm', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_44.png', 0, 0),
(45, 0, 0, 0, 'fpe7idkub2', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_45.jpeg', 0, 0),
(46, 0, 0, 0, 'w2l32b8061', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_46.jpeg', 0, 0),
(47, 0, 0, 0, '9uux9spk4i', '', 0, 0),
(48, 0, 0, 0, '601r49ngzo', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_48.jpg', 0, 0),
(49, 0, 0, 0, 'xu6uet2lqm', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_49.jpg', 0, 0),
(50, 0, 0, 0, '4nhb8wyq1n', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_50.jpg', 0, 0),
(51, 0, 0, 0, '3s3gzjraqo', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_51.jpg', 0, 0),
(52, 0, 0, 0, '0bod1m1nmp', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_52.jpg', 0, 0),
(53, 0, 0, 0, 'wmdvdc6ity', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_53.jpg', 0, 0),
(54, 0, 0, 0, '8awzt87g87', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_54.jpg', 0, 0),
(55, 0, 0, 0, 'zbjtazgviq', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_55.jpg', 0, 0),
(56, 0, 0, 0, 'gsvah5207y', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_56.jpg', 0, 0),
(57, 0, 0, 0, 'lcyhl7j16s', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_57.jpg', 0, 0),
(58, 0, 0, 0, 'w5msr3s5cl', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_58.jpg', 0, 0),
(59, 0, 0, 0, 'h36mc9s6he', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_59.jpg', 0, 0),
(60, 0, 0, 0, 'v8nlq4nwla', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_60.jpg', 0, 0),
(61, 0, 0, 0, '0oov3k2xnn', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_61.jpg', 0, 0),
(62, 0, 0, 0, 't1yetrmk07', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_62.jpg', 0, 0),
(63, 0, 0, 0, '010kax79pi', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_63.jpg', 0, 0),
(64, 0, 0, 0, 'g3i3jbzzyt', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_64.jpg', 0, 0),
(65, 0, 0, 0, '7wj9j0ppmv', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_65.jpg', 0, 0),
(66, 0, 0, 0, 'k5vdc6ity8', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_66.jpg', 0, 0),
(67, 0, 0, 0, 'tijajoaieg', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_67.jpg', 0, 0),
(68, 0, 0, 0, 'wqaj3s8xca', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_68.jpg', 0, 0),
(69, 0, 0, 0, '9l32b8061v', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_69.jpg', 0, 0),
(70, 0, 0, 0, '86cchb2g06', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_70.jpg', 0, 0),
(71, 0, 0, 0, 'vch9obpgv6', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_71.jpg', 0, 0),
(72, 0, 0, 0, '06rfn4tboz', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_72.jpg', 0, 0),
(73, 0, 0, 0, 'jx29nkkrxy', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_73.jpg', 0, 0),
(74, 0, 0, 0, 'gcwzo8rnm4', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_74.png', 0, 0),
(75, 0, 0, 0, 'cwqlqxsfxq', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_75.png', 0, 0),
(76, 1, 0, 0, 'up3l0yakio', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_76.png', 0, 2995),
(77, 1, 0, 0, '522d9n8txq', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_77.jpeg', 1479381680, 90372),
(78, 1, 0, 0, '1qyebkhp2x', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_78.jpeg', 1479381725, 44232),
(79, 1, 0, 0, 'icwzo8rnm4', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_79.png', 1479458722, 2995),
(80, 1, 0, 0, '465gcqkmy9', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_80.png', 1479460926, 2995),
(81, 1, 0, 0, 'tkh36e33fi', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_81.png', 1479462120, 2995),
(82, 1, 0, 0, '3r575datdo', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_82.png', 1479462173, 2995),
(83, 1, 0, 0, '9xgwi5ohu7', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_83.jpeg', 1479462199, 65559),
(84, 1, 0, 0, 'pacyewcl32', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_84.png', 1479462343, 3708),
(85, 1, 0, 0, 'd6huw8kstn', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_85.jpeg', 1479486535, 29632),
(86, 1, 0, 0, '3a5sbrybeo', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_86.png', 1479493673, 912710),
(87, 1, 0, 0, 'm79uux9spk', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_87.jpeg', 1479537241, 80958),
(88, 1, 0, 0, 'f4mldqhlrg', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_88.jpeg', 1479538936, 7114),
(89, 1, 0, 0, '06r575datd', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_89.jpeg', 1479541379, 78577),
(90, 1, 0, 0, 'ccayydm4mj', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_90.png', 1479541767, 392682),
(91, 2, 0, 0, '9ax79pi96r', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_91.jpeg', 1479710105, 19361),
(92, 2, 0, 0, 'lpuet2lqmp', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_92.jpeg', 1479710977, 57967),
(93, 10, 0, 0, 'n5idbdw49d', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_93.jpeg', 1479726705, 25778),
(94, 2, 0, 0, 'v7i11h6zxy', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_94.jpeg', 1479744197, 80648),
(95, 2, 0, 0, 'pa0wx3q5dp', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_95.jpeg', 1479744623, 55727),
(96, 4, 0, 0, 's19mf0zoor', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_96.jpeg', 1480216724, 57967),
(97, 2, 0, 0, 'rwk4jmt5lb', 'https://s3-ap-south-1.amazonaws.com/wowrol/0_97.jpeg', 1480916831, 104004);

-- --------------------------------------------------------

--
-- Table structure for table `store_menu_0`
--

CREATE TABLE IF NOT EXISTS `store_menu_0` (
  `store_menu_row_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_sid` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_sid` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `term` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_id` bigint(20) NOT NULL,
  PRIMARY KEY (`store_menu_row_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=915 ;

--
-- Dumping data for table `store_menu_0`
--

INSERT INTO `store_menu_0` (`store_menu_row_id`, `id`, `item_sid`, `label`, `parent`, `parent_sid`, `slug`, `term`, `type`, `store_id`) VALUES
(1, '1475209473Vr6vh6', '35', 'industrial?supply', '', '', 'industrial-supply-category', 'industrial&nbsp;supply', 'category', 4),
(2, '1475209393zXmVk6', '32', 'daily?needs', '', '', 'daily-needs-category', 'daily&nbsp;needs', 'category', 4),
(872, '14774996631c3Cf293', '4', 'Screen Guards', '', '', 'screen-guards-category', 'Screen&nbsp;Guards', 'category', 1),
(873, '147749966348t4R294', '3', 'Power Banks', '14774996631c3Cf293', '4', 'power-banks-category', 'Power&nbsp;Banks', 'category', 1),
(874, '1479837389nuibh15', '43', 'house hold items', '14774996631c3Cf293', '4', 'house-hold-items-category', 'house&nbsp;hold&nbsp;items', 'category', 1),
(875, '14774996633QID1296', '5', 'Mobile Accessories', '14774996631c3Cf293', '4', 'mobile-accessories-category', 'Mobile Accessories', 'category', 1),
(876, '1475237379D09Cd114', '18', 'Clothing', '', '', 'clothing-category', 'Clothing', 'category', 1),
(877, '14774996637t8xF301', '10', 'Air Conditioners', '1475237379D09Cd114', '18', 'air-conditioners-category', 'Air Conditioners', 'category', 1),
(878, '1477499109Fw0zy14', '10', 'Air Conditioners', '1475237379D09Cd114', '18', 'air-conditioners-category', 'Air Conditioners', 'category', 1),
(879, '1477499663Atbk2297', '6', 'Wearable &amp; Smartwatches', '1477499109Fw0zy14', '10', 'wearable-smartwatches-category', 'Wearable&nbsp;&amp;&nbsp;Smartwatches', 'category', 1),
(880, '1477499663ONn4n302', '11', 'Electronics', '1477499109Fw0zy14', '10', 'electronics-category', 'Electronics', 'category', 1),
(881, '14774996634pHiv300', '9', 'Appliances', '1477499109Fw0zy14', '10', 'appliances-category', 'Appliances', 'category', 1),
(882, '1477499663rcK6x291', '21', 'Men&apos;s Fragrances', '1477499109Fw0zy14', '10', 'mens-fragrances-category', 'Men&apos;s Fragrances', 'category', 1),
(883, '1477499663w6By0295', '1', 'Mobile Phones', '1477499109Fw0zy14', '10', 'mobile-phones-category', 'Mobile&nbsp;Phones', 'category', 1),
(884, '147749941903SsL50', '14', 'Kitchen Appliances', '1477499109Fw0zy14', '10', 'kitchen-appliances-category', 'Kitchen Appliances', 'category', 1),
(885, '1477499663xkglg304', '14', 'Kitchen Appliances', '1477499109Fw0zy14', '10', 'kitchen-appliances-category', 'Kitchen Appliances', 'category', 1),
(886, '1477499238jKCba26', '31', 'cold drinks', '1477499109Fw0zy14', '10', 'cold-drinks-category', 'cold&nbsp;drinks', 'category', 1),
(887, '14774996634SDc5299', '8', 'Mobile Insurance &amp; Warranty', '1477499109Fw0zy14', '10', 'mobile-insurance-warranty-category', 'Mobile Insurance &amp; Warranty', 'category', 1),
(888, '1477499419THbGG48', '19', 'Footwear', '1477499109Fw0zy14', '10', 'footwear-category', 'Footwear', 'category', 1),
(889, '14774994199C6qW49', '9', 'Appliances', '1477499109Fw0zy14', '10', 'appliances-category', 'Appliances', 'category', 1),
(890, '147749966380eK8298', '7', 'Tablet Accessories', '1477499109Fw0zy14', '10', 'tablet-accessories-category', 'Tablet&nbsp;Accessories', 'category', 1),
(891, '1477499419yQkeX47', '24', 'Eyewear', '1477499109Fw0zy14', '10', 'eyewear-category', 'Eyewear', 'category', 1),
(892, '147749941923wQF46', '11', 'Electronics', '1477499109Fw0zy14', '10', 'electronics-category', 'Electronics', 'category', 1),
(893, '1477499261dYOtr35', '16', 'DSLRs', '1477499109Fw0zy14', '10', 'dslrs-category', 'DSLRs', 'category', 1),
(894, '1477499238h9IsG27', '10', 'Air Conditioners', '1477499109Fw0zy14', '10', 'air-conditioners-category', 'Air Conditioners', 'category', 1),
(895, '1477499238FcYSA28', '12', 'Air Coolerss', '1477499109Fw0zy14', '10', 'air-coolers-category', 'Air Coolerss', 'category', 1),
(896, '14774990970LQ8L6', '5', 'Chennai Super Kings T Shirtss', '1477499109Fw0zy14', '10', 'chennai-super-kings-t-shirt-product', 'Chennai Super Kings T Shirtss', 'product', 1),
(897, '1477499109AoCp215', '12', 'Air Coolerss', '1477499109Fw0zy14', '10', 'air-coolers-category', 'Air Coolerss', 'category', 1),
(898, '1477499663giDI8303', '12', 'Air Coolerss', '1477499109Fw0zy14', '10', 'air-coolers-category', 'Air Coolerss', 'category', 1),
(899, '1475237363fROzg106', '12', 'DESIGN WILLA Printed Bollywood Silk Cotton Blend Sari  &lpar;Multicolor&rpar;', '1475237379D09Cd114', '18', 'design-willa-printed-bollywood-silk-cotton-blend-sari-multicolor-product', 'DESIGN&nbsp;WILLA&nbsp;Printed&nbsp;Bollywood&nbsp;Silk&nbsp;Cotton&nbsp;Blend&nbsp;Sari&nbsp;&nbsp;&lpar;Multicolor&rpar;', 'product', 1),
(900, '147523736385Gko107', '8', 'Sukuma Designer 2pc Saree Combo', '1475237363fROzg106', '12', 'sukuma-designer-2pc-saree-combo-product', 'Sukuma Designer 2pc Saree Combo', 'product', 1),
(901, '1475237363HIo1G108', '7', 'Datsun Redi-GO', '1475237363fROzg106', '12', 'datsun-redi-go-product', 'Datsun Redi-GO', 'product', 1),
(902, '1475237098Sudhh105', '4', 'Bossini Blue Printed Round Neck T-Shirt', '1475237363fROzg106', '12', 'bossini-blue-printed-round-neck-t-shirt-product', 'Bossini Blue Printed Round Neck T-Shirt', 'product', 1),
(903, '1475229258An9lb24', '8', 'Sukuma Designer 2pc Saree Combo', '1475237363fROzg106', '12', 'sukuma-designer-2pc-saree-combo-product', 'Sukuma Designer 2pc Saree Combo', 'product', 1),
(904, '14774862905HO6p61', '22', 'Men', '1475237379D09Cd114', '18', 'men-category', 'Men', 'category', 1),
(905, '14774862902d8yq62', '17', 'Stationery &amp; Office Equipment', '14774862905HO6p61', '22', 'stationery-office-equipment-category', 'Stationery&nbsp;&amp;&nbsp;Office&nbsp;Equipment', 'category', 1),
(906, '1477486290Fo2sF63', '29', 'default name', '14774862905HO6p61', '22', 'default-name-category-1', 'default&nbsp;name', 'category', 1),
(907, '1477486290x7C0K64', '15', 'Cameras &amp; Accessories', '14774862905HO6p61', '22', 'cameras-accessories-category', 'Cameras &amp; Accessories', 'category', 1),
(908, '1477483220rhjds10', '4', 'Bossini Blue Printed Round Neck T-Shirt', '14774862905HO6p61', '22', 'bossini-blue-printed-round-neck-t-shirt-product', 'Bossini Blue Printed Round Neck T-Shirt', 'product', 1),
(909, '14774996634R7oe292', '2', 'Tablets', '1475237379D09Cd114', '18', 'tablets-category', 'Tablets', 'category', 1),
(910, '14765391028dGni85', '15', 'Cameras &amp; Accessories', '', '', 'cameras-accessories-category', 'Cameras &amp; Accessories', 'category', 1),
(911, '1475237103qHxw1121', '21', 'fdgdgdg', '', '', 'mens-fragrances-category', 'Men&apos;s Fragrances', 'category', 1),
(912, '1475229274ZVtCb51', '21', 'Men&apos;s Fragrances', '', '', 'mens-fragrances-category', 'Men&apos;s Fragrances', 'category', 1),
(913, '1475229274aSycg52', '22', 'Men', '', '', 'men-category', 'Men', 'category', 1),
(914, '1475237057pH1Wr96', '40', 'men&grave;&nbsp;              s and', '', '', 'men-s-and-category', 'men&grave;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;s&nbsp;and', 'category', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
