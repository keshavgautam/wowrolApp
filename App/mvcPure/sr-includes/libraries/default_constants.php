<?php
    //ini-set
  ini_set('session.cookie_domain', CookieDomain );
  ini_set('output_handler', 'Off' );
  //ini_set('zlib.output_compression', 'On' );
  //ini_set('zlib.output_handler', "ob_gzhandler");
  ini_set("memory_limit","350M");


    //--header
    header('Access-Control-Allow-Origin: '.WOWROL);
    header('Access-Control-Allow-Headers: Origin, X-Requested-With');
    header('Access-Control-Allow-Methods: GET, POST');
   header('Cache-Control: no-cache, no-store;');




    header('Pragma:no-cache');
    header('Expires: ' . gmdate( "D, d M Y H:i:s", time() ) . ' GMT');



  if($GLOBALS['Var_BrowserName']!='Edge'&&$GLOBALS['Var_BrowserName']!='Internet Explorer'&&$GLOBALS['Var_BrowserName']!='Internet Explorer Mobile'){
 //header('Content-Encoding:gzip');
   header('Vary:Accept-Encoding');
     header("content-security-policy:default-src 'self' 'unsafe-inline' ".cspCDNSTATIC." ".URLParseURL."   ".CDNUPLOAD."  ".docHELPURL."  ".implode('  ', $GLOBALS['Var_UpdaterServerURL'] ) ." https://*.google.com https://api.cloudinary.com http://staticxx.facebook.com https://www.facebook.com https://graph.facebook.com https://*.doubleclick.net http://*.googlesyndication.com ;  img-src * 'self' data:; script-src 'unsafe-inline' ".cspCDNSTATIC." ".CDNUPLOAD." https://*.google.com https://www.gstatic.com  https://www.google-analytics.com http://connect.facebook.net https://graph.facebook.com http://*.googlesyndication.com ;  style-src  'unsafe-inline' https://fonts.googleapis.com  ".cspCDNSTATIC." ; font-src  https://fonts.gstatic.com   ;" );

    }



    header('X-FRAME-OPTIONS:SAMEORIGIN');



    $_SERVER['HTTP_ORIGIN']=CookieDomain;
  //  header('Origin :'.CookieDomain);
    //--
  	// Constants for expressing human-readable intervals
	// in their respective number of seconds.
   date_default_timezone_set('UTC');



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
    'staffId'=>'wj',
    'Authenticater'=>'wk'
    );
   $GLOBALS['Var_Cookies_name']=$cookies_names;
   // device in use
   define( 'DEVISE_IN_USE',$deviceType_code );

  define( 'SSL_USE',FALSE );
    //  DefaultAppSetting


    $GLOBALS['Var_AppSetting']=array('UseBase64'=>FALSE);
     //  DefaultAppSetting
    // image cdns
     function images_cdn($x){
         $images_cdn=array(
    'rci'=>'http://localhost:7891/abimg/',
    'inp'=>'http://localhost:7891/acimage/'
    );
    return $images_cdn[$x];
     }

     //active cdn

 define('SENDCDN',images_cdn('rci'));
    define('ACTIVECDN','rci');


   //site url
   $site_url=(DeviceType==0)?"http://".$_SERVER['HTTP_HOST']:"http://".$_SERVER['HTTP_HOST'];

    define( 'Responsive_SITEURL', $site_url);

//-- collection editer

 //--
    if(SERVER_MODE=="DEVELOPMENT"){    define( 'CollectionEditer_id', 1);  }else{    define( 'CollectionEditer_id', 3);  }

    //---------SMTP CONSTANT---------

     define( 'SMTP_Host', 'localhost');
     define( 'SMTP_Username', 'root');
     define( 'SMTP_Password', '');
   //---------email Address--------

   define( 'setFrom_Email', 'noreply@wowrol.com');
   define( 'ReplyTo_Email', 'noreply@wowrol.com');
   //==
   /*  */

   //==



     //-- promotion  agent id
    if(SERVER_MODE=="DEVELOPMENT"){
     $GLOBALS['Var_promotion_agent']=array(0=>2);
    }else{
     $GLOBALS['Var_promotion_agent']=array();
    }


?>
