<?php
/* Include files required for Mobile_Detect.*/

require( dirname( __FILE__ ) . '/Mobile_Detect.php' );
$detect = new Mobile_Detect();
$deviceType = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'computer');
$deviceType_code = ($detect->isMobile() ? ($detect->isTablet() ? 2 : 1) : 0);
 define( 'DeviceType', $deviceType_code );
$scriptVersion = $detect->getScriptVersion();
?>