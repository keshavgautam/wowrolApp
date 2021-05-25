<?php
    
 /*----====----*/  
  if($_SERVER['HTTP_HOST']=="img.wowrol.com")
  {
define( 'SITEURL','http://img.wowrol.com' );
  define('SERVER_MODE', 'PRODUCTION'); 
define('DB_NAME', 'wowrol_app');
define('DB_USER', 'LLiMmm5dgkZ4vZ');
define('DB_PASSWORD', 'yxs6Dga.TzVl');
define('DB_HOST', 'localhost');
  error_reporting(E_ALL);
   }else{ 
define( 'SITEURL','http://localhost:7891/acimg' );
 define('SERVER_MODE', 'DEVELOPMENT');
define('DB_NAME', 'b5fa5428aa');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');
  error_reporting(E_ALL);
  } 


define( 'ROOT', DOCUMENT_ROOT);  
define( 'INC', DOCUMENT_ROOT.'sr-includes' );


   //--
    if(SERVER_MODE=="DEVELOPMENT"){
        error_reporting(E_ALL);
    }else{
        error_reporting(0);
    }
//----
require(  dirname( __FILE__ ) . '/sr-load.php' );
?>