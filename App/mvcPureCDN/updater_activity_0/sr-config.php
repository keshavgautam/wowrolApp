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
define( 'COMET_DIR', DOCUMENT_ROOT.'us-comet' );






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
define( 'WOWROL', 'http://localhost:3325/' );
define( 'ORIGIN','http://localhost:3325' );
define( 'CookieDomainName', 'localhost' );
define( 'CookieDomain', 'localhost' );



define('DB_NAME', 'wowrol_app');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');


define('DB_NAME_CONVERSATION', 'wowrol_conversation_messages');
define('DB_NAME_UTILITY_0', 'wowrol_utility_0');
define('DB_NAME_UPDATE_0', 'wowrol_update_0');


define( 'CDNSTATIC', "http://localhost:1236/" );
define( 'cspCDNSTATIC', "http://localhost:1236/" );
define( 'CDN', "http://localhost:1236/" );
define( 'CDNUPLOAD', "http://localhost:1236/abimg/" );

 /*----====----*/   
    }else{
 //PRODUCTION
define( 'WOWROL', 'http://wowrol.com' );
define( 'ORIGIN','http://wowrol.com' );
define( 'CookieDomainName', 'wowrol' );
define( 'CookieDomain', '.wowrol.com' );


define('DB_NAME', 'wowrol');
define('DB_USER', 'LLiMmm5dgkZ4vZ');
define('DB_PASSWORD', 'yxs6Dga.TzVl');
define('DB_HOST', 'localhost');

define('DB_NAME_CONVERSATION', 'wowrol_conversation_messages');
define('DB_NAME_UTILITY_0', 'wowrol_utility_0');
define('DB_NAME_UPDATE_0', 'wowrol_update_0');


define( 'CDNSTATIC', "http://localhost:1236/" );
define( 'cspCDNSTATIC', "http://localhost:1236/" );
define( 'CDN', "http://localhost:1236/" );
define( 'CDNUPLOAD', "http://localhost:1236/abimg/" );


    }





//----
require( INC . '/sr-load.php' );
?>