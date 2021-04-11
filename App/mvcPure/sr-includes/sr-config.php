<?php
 /*----====----*/  
function site_url(){
return  "http://".$_SERVER['HTTP_HOST'].'/';
}
define( 'SITEURL',site_url() );
 /*----====----*/
define( 'DOCUMENT_ROOT', $_SERVER['DOCUMENT_ROOT'].'/' );  
define( 'ROOT', DOCUMENT_ROOT);  
define( 'INC', DOCUMENT_ROOT.'sr-includes' );
define( 'ASSETS', 'assets' );
define( 'TEMPLATE', DOCUMENT_ROOT.'sr-template' );
define( 'MATERIAL', DOCUMENT_ROOT.'material' );
define( 'MATERIAL_TEMPLATE', DOCUMENT_ROOT.'material/template' );
define( 'JAVASCRIPT', ASSETS.'/javascript' );
define( 'CSS', ASSETS.'/css' );
define( 'CDNSTATIC', "http://localhost:3326/" );
define( 'cspCDNSTATIC', "http://localhost:3326/" );
define( 'CDN', "http://localhost:3326/" );
define( 'CookieDomainName', 'wowrol' );
define( 'CookieDomain', '.wowrol.com' );
define( 'WOWROL', 'http://wowrol.com' );
define( 'ORIGIN',"http://".$_SERVER['HTTP_HOST']);
define( 'SRCOOKIESPATH', $_SERVER['HTTP_HOST'].'/' );
 /*----====----*/     
/*----==Defineing constant==----*/ //DEVELOPMENT|PRODUCTION
  if($_SERVER['HTTP_HOST']=="www.wowrol.com")
  {
      define('SERVER_MODE', 'PRODUCTION'); 
  }else{
     define('SERVER_MODE', 'DEVELOPMENT');
  }


  /*----====----*/  
 /*----====----*/   
if(SERVER_MODE=="DEVELOPMENT"){

define('DB_NAME', 'wowrol_app');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');
 /*----====----*/   
    }else{
 //PRODUCTION
define('DB_NAME', 'wowrol');
define('DB_USER', 'LLiMmm5dgkZ4vZ');
define('DB_PASSWORD', 'yxs6Dga.TzVl');
define('DB_HOST', 'localhost');
    }





//----
require(  dirname( __FILE__ ) . '/sr-load.php' );
?>