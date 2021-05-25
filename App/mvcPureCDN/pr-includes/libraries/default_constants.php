<?php
    //ini-set
     ini_set('session.cookie_domain', CookieDomain );
     ini_set('output_handler', 'Off' );
 // ini_set('zlib.output_compression', 'On' );
  //ini_set('zlib.output_handler', "ob_gzhandler");
   ini_set("memory_limit","350M");

   

    //--header
  header('Access-Control-Allow-Origin: '.WOWROL);
  header('Access-Control-Allow-Headers: Origin, X-Requested-With');
  header('Access-Control-Allow-Methods: GET, POST');
 //  header('Cache-Control: no-cache, no-store');
  /* do not use   header(' Content-Type:text/html;charset=utf-8');
  create  IE bugs */
   
   
  //  header('Pragma:no-cache');
    //header('Expires: ' . gmdate( "D, d M Y H:i:s", time() ) . ' GMT');
   
  if($GLOBALS['Var_BrowserName']!='Edge'&&$GLOBALS['Var_BrowserName']!='Internet Explorer'&&$GLOBALS['Var_BrowserName']!='Internet Explorer Mobile'){
header('Content-Encoding:gzip');
  header('Vary:Accept-Encoding');  
 
    }



  //  header('X-FRAME-OPTIONS:SAMEORIGIN');
   

 
    $_SERVER['HTTP_ORIGIN']=CookieDomain;
  //  header('Origin :'.CookieDomain);
    //--
  	// Constants for expressing human-readable intervals
	// in their respective number of seconds.
   date_default_timezone_set('UTC');

    //--
    if(SERVER_MODE=="DEVELOPMENT"){
        error_reporting(E_ALL);
    }else{
        error_reporting(0);
    }

    // Cookies name Array
    $cookies_names=array(
    'EntityId'=>'wa',
    'accountId'=>'wb',
    'AuthPassword'=>'wc',
    'visitId'=>'wd',
    'Isremember'=>'we',
    'Flaver'=>'wf',
    'lang'=>'wg',
    'Time_Offset'=>'wh',
    'Time_dst'=>'wi',
    'staffId'=>'wj'
    );
   $GLOBALS['Var_Cookies_name']=$cookies_names;
   // device in use
   define( 'DEVISE_IN_USE',$deviceType_code );
    //  DefaultAppSetting
  
    
    $GLOBALS['Var_AppSetting']=array('UseBase64'=>FALSE);
     //  DefaultAppSetting
     // image cdns
     function images_cdn(){
         $images_cdn=array(
    'rci'=>'http://localhost:7891/abimg/',
    'inp'=>'http://localhost:7891/acimage/'
    ); 
    return $images_cdn;
     }
   
     //active cdn
    define('SENDCDN',images_cdn()['rci']);
    define('ACTIVECDN','rci');
    define('ProcessCDN','http://img.wowrol.net/photos/');

   //site url
   $site_url=(DeviceType==0)?"http://".$_SERVER['HTTP_HOST']:"http://".$_SERVER['HTTP_HOST'];
   
    define( 'Responsive_SITEURL', $site_url);

    //---------SMTP CONSTANT---------

     define( 'SMTP_Host', 'localhost');
     define( 'SMTP_Username', 'root');
     define( 'SMTP_Password', '');
   //---------email Address--------
   
   define( 'setFrom_Email', 'postmaster@localhost');
   define( 'ReplyTo_Email', 'postmaster@localhost');
   //==

   //==


?>