<?php
/*----==Defineing constant==----*/ //DEVELOPMENT|PRODUCTION
  if($_SERVER['HTTP_HOST']=="cdnf.wowrol.com")
  {
      define('SERVER_MODE', 'PRODUCTION');
      define( 'WOWROL', 'http://www.wowrol.com' );
      define( 'SITEURL',"http://".$_SERVER['HTTP_HOST'].'/' );
  }else{
     define('SERVER_MODE', 'DEVELOPMENT');
     define( 'WOWROL', 'http://localhost:1235' );
      define( 'SITEURL','http://localhost:1235/' );
  }


 /*----====----*/

 /*----====----*/
define( 'DOCUMENT_ROOT', $_SERVER['DOCUMENT_ROOT'].'/' );
define( 'ROOT', DOCUMENT_ROOT);
define( 'INC', DOCUMENT_ROOT.'pr-includes' );
define( 'ASSETS', 'assets' );
define( 'DOC', DOCUMENT_ROOT.'DOC' );
define( 'ASSETS_JSON_DATA', ROOT.'assets/data/' );
define( 'ASSETS_MINIFED', ROOT.'assets_min/' );

define( 'MATERIAL', DOCUMENT_ROOT.'material' );
define( 'MATERIAL_TEMPLATE', DOCUMENT_ROOT.'material/template' );




define( 'CookieDomainName', 'wowrol' );
define( 'CookieDomain', '.wowrol.com' );
define( 'ORIGIN',"http://".$_SERVER['HTTP_HOST']);
define( 'SRCOOKIESPATH', $_SERVER['HTTP_HOST'].'/' );
define( 'LastModifiedTime', 14869658 );
//----
require(  dirname( __FILE__ ) . '/sr-load.php' );
?>
