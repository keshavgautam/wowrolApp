<?php
/*----==Defineing constant==----*/ //DEVELOPMENT|PRODUCTION
  if($_SERVER['HTTP_HOST']=="www.wowrol.com")
  {
      define('SERVER_MODE', 'PRODUCTION'); 
      define( 'WOWROL', 'http://wowrol.com' );
      define( 'SITEURL',"http://".$_SERVER['HTTP_HOST'].'/' );
  }else{
     define('SERVER_MODE', 'DEVELOPMENT');
     define( 'WOWROL', 'http://localhost:3325' );
      define( 'SITEURL','http://localhost:3325/' );
  }    


 /*----====----*/  

 /*----====----*/
define( 'DOCUMENT_ROOT', $_SERVER['DOCUMENT_ROOT'].'/' );  
define( 'ROOT', DOCUMENT_ROOT);  
define( 'INC', DOCUMENT_ROOT.'pr-includes' );
define( 'ASSETS', 'assets' );
define( 'DOC', DOCUMENT_ROOT.'DOC' );

define( 'MATERIAL', DOCUMENT_ROOT.'material' );
define( 'MATERIAL_TEMPLATE', DOCUMENT_ROOT.'material/template' );




define( 'CookieDomainName', 'wowrol' );
define( 'CookieDomain', '.wowrol.com' );
define( 'ORIGIN',"http://".$_SERVER['HTTP_HOST']);
define( 'SRCOOKIESPATH', $_SERVER['HTTP_HOST'].'/' );

//----
require(  dirname( __FILE__ ) . '/sr-load.php' );
?>