 <head>
  <meta http-equiv="Content-type" content="text/html;charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">

 <?php echo $AppData['AppMetaData'];  unset($AppData['AppMetaData']);  ?>
 <?php echo $AppData['AppSEOData']['head'];  ?>

  <title> <?php echo $AppData['AppTitle']; ?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="google-signin-scope" content="profile email">
    <meta name="google-signin-client_id" content="554278223037-utpchdr9bghsev87q0jcdvkmkdo8fm70.apps.googleusercontent.com">

<link rel="canonical" href="<?php echo SITEURL; ?>directory">
 <link rel="icon" type="image/icon" href="<?php echo SITEURL; ?>assets/imgs/pic/favicon.ico">
<!--<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">-->
  <script id="loaderjs"  type="text/javascript" src="<?php 
 $res=$GLOBALS['Var_AppProtoType']->reslib('loader');
 
 echo GetResUrl().GetResPath($res,$GLOBALS['Var_ActorEntityData']).GetResName($res,$GLOBALS['Var_ActorEntityData']).'.js'; ?>" ></script>
        
  

      <script>
          <?php
              
echo ';(function(W) {
 "use strict";

W.C.Setting = {
     ausc:0,
     ProcessCDN:'.'"'.ProcessCDN.'"'.',
    CDNUPLOAD:'.'"'.CDNUPLOAD.'"'.',
     staticHTML:'.'"'.CDNSTATIC.'"'.',
     docHELP: '.'"'.docHELPURL.'"'.',
     UserPath : '.OutputMakejson(array_values($GLOBALS['Var_Cookies_name'])).',
     UseBase64:'.'"'.$GLOBALS['Var_AppSetting']['UseBase64'].'"'.',
     SERVER_MODE:'.'"'.SERVER_MODE.'"'.',
     SITEURL:'.'"'.SITEURL.'"'.',
     URLParseURL:'.'"'.URLParseURL.'"'.',
     UpdaterURL :'.OutputMakejson($GLOBALS['Var_Instant_Updater']->UpdaterServerURL()).',
     ActivityUpdaterURL :'.OutputMakejson($GLOBALS['Var_Instant_Updater']->ActivityUpdaterServerURL()).',
     Is_USE_ls:'.''.IS_USE_localstorage.''.',
     feature:'.OutputMakejson(array('relation'=>TRUE, 'entitySpread'=>TRUE)).'};
     }(wowrol));';


          ?>
      </script>


<style>html,body,div,span,applet,object,iframe,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,sub,sup,tt,var,b,u,i,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,menu,input,textarea{margin:0;padding:0;border:0;vertical-align:baseline;font:inherit;font-size:100%} html{font-family: 'Open Sans',Roboto,Helvetica,Arial,sans-serif; font-size: 12px; font-weight: 400; color: #292f33; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;   -webkit-font-smoothing: subpixel-antialiased; -moz-osx-font-smoothing: auto}  h1, h2, h3, h4, h5, h6{margin:0;padding:0;border:0;vertical-align:baseline;line-height: 1;}table{border-collapse:collapse;border-spacing:0;table-layout:fixed}a{color: #1274c0; cursor: pointer; text-decoration: none;}a:focus{outline: 0;}a:active,a:hover{outline: 0; text-decoration: underline;}a:active{color: #2250a5;}*{-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;}.block{min-height: 1px; width: 100%;display: block;}.block:before,.block:after{content: " ";display: table; clear: both;}.hide{display: node;}*, *:before, *:after{-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;}
 .lodder { border-top-color: #3498db!important; }                                                                                                                                            @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}                                                                  
                                                                                                                                                                                                                   </style> 
  <style type="text/css" id="themecss" data-res="themecss"></style>       
    </head>