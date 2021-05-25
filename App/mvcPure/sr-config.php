<?php
 /*----====----*/
function site_url(){
return  "http://".$_SERVER['HTTP_HOST'].'/';
}
define( 'SITEURL',site_url() );
 /*----====----*/
define( 'DOCUMENT_ROOT', __DIR__.'/' );
define( 'ROOT', DOCUMENT_ROOT);
define( 'INC', DOCUMENT_ROOT.'sr-includes' );
define( 'ASSETS', 'assets' );
define( 'TEMPLATE', DOCUMENT_ROOT.'sr-template' );
define( 'MATERIAL', DOCUMENT_ROOT.'material' );
define( 'MATERIAL_TEMPLATE', DOCUMENT_ROOT.'material/template' );
define( 'JAVASCRIPT', ASSETS.'/javascript' );
define( 'CSS', ASSETS.'/css' );

define( 'CookieDomainName', 'wowrol' );
define( 'CookieDomain', '.wowrol.com' );
define( 'WOWROL', 'http://wowrol.com' );
define( 'ORIGIN',"http://".$_SERVER['HTTP_HOST']);
define( 'SRCOOKIESPATH', $_SERVER['HTTP_HOST'].'/' );
 /*----====----*/
/*----==Defineing constant==----*/ //DEVELOPMENT|PRODUCTION
  if($_SERVER['HTTP_HOST']=="www.wowrol.com"||$_SERVER['HTTP_HOST']=="wowrol.com")
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

define('DB_NAME_CONVERSATION', 'wowrol_conversation_messages');
define('DB_NAME_UTILITY_0', 'wowrol_utility_0');
define('DB_NAME_ADVERTISING', 'wowrol_advertising');

define( 'CDNSTATIC', "http://localhost:1236/" );
define( 'cspCDNSTATIC', "http://localhost:1236/" );
define( 'CDN', "http://localhost:1236/" );
define( 'CDNUPLOAD', "http://localhost:1236/abimg/" );
define('ProcessCDN','http://localhost:1236/photos/');
define('URLParseURL','http://localhost:1236/urlparse/');
define('docHELPURL',CDNSTATIC.'Helpdoc/');



$GLOBALS['Var_UpdaterServerURL']=array(
   'http://localhost:1236/updater_0/',
   'http://localhost:1236/updater_0/',
   'http://localhost:1236/updater_0/',
   'http://localhost:1236/updater_0/'

   ); ;

 /*----====----*/
    }else{
 //PRODUCTION
define('DB_NAME', 'wowrol_app');
define('DB_USER', 'LLiMmm5dgkZ4vZ');
define('DB_PASSWORD', 'yxs6Dga.TzVl');
define('DB_HOST', 'localhost');

define('DB_NAME_CONVERSATION', 'wowrol_conversation_messages');
define('DB_NAME_UTILITY_0', 'wowrol_utility_0');
define('DB_NAME_ADVERTISING', 'wowrol_advertising');


define( 'CDNSTATIC', "http://cdnf.wowrol.com/" );
define( 'cspCDNSTATIC', "http://cdnf.wowrol.com/" );
define( 'CDN', "http://cdnf.wowrol.com/" );
define( 'CDNUPLOAD', "http://abimg.wowrol.com/" );
define('ProcessCDN','http://img.wowrol.com/photos/');
define('URLParseURL','http://urlparse.wowrol.com/');
define('docHELPURL','http://helpdoc.wowrol.com/');

$GLOBALS['Var_UpdaterServerURL']=array(
   'http://chatupdater0.wowrol.com/',
   'http://chatupdater0.wowrol.com/',
   'http://chatupdater0.wowrol.com/',
   'http://chatupdater0.wowrol.com/'

   ); ;

    }




define('TIME_assetedit',1485791117);
define('IS_USE_localstorage','false');//true|false

   //--
    if(SERVER_MODE=="DEVELOPMENT"){
      //  error_reporting(E_ALL);
    }else{
         error_reporting(E_ALL);
    }
//----
require( INC . '/sr-load.php' );
?>
