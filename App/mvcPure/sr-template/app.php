<?php

$AppData=$GLOBALS['Var_AppProtoType']->appData();
$AppData['IsPage']=TRUE;
?>
 <?php if(!isset($_GET['g'])):?> 
<!-- jay shree ram-->

<!DOCTYPE html>
<html lang="en">
    <head>
  <meta http-equiv="Content-type" content="text/html;charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">

 <?php echo $AppData['AppMetaData'];  unset($AppData['AppMetaData']);  ?>
  <title> <?php echo $AppData['AppTitle']; ?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">


 <link rel="icon" type="image/icon" href="<?php echo SITEURL; ?>assets/imgs/pic/favicon.ico">
  <script id="loaderjs"  type="text/javascript" src="<?php echo Create_res_path($GLOBALS['Var_AppProtoType']->reslib('loader'),$GLOBALS['Var_ActorEntityData']['visit_data']['wf']).'/javascript/'.Create_res_name($GLOBALS['Var_AppProtoType']->reslib('loader')).'.js'; ?>" ></script>
      <script>
          <?php
              
echo ';(function(W) {
 "use strict";

W.C.Setting = {
     ProcessCDN:'.'"'.ProcessCDN.'"'.',
     staticHTML:'.'"'.CDNSTATIC.'"'.',
     docHELP:'.'"'.CDNSTATIC.'Helpdoc/"'.',
     UserPath : '.OutputMakejson(array_values($GLOBALS['Var_Cookies_name'])).',
     UseBase64:'.'"'.$GLOBALS['Var_AppSetting']['UseBase64'].'"'.',
     SERVER_MODE:'.'"'.SERVER_MODE.'"'.',
     SITEURL:'.'"'.SITEURL.'"'.',
     feature:'.OutputMakejson(array('relation'=>TRUE,
                                    'entitySpread'=>TRUE)).'

 };

 





}(wowrol));';


          ?>
      </script>
      <style>html,body,div,span,applet,object,iframe,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,sub,sup,tt,var,b,u,i,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,menu,input,textarea{margin:0;padding:0;border:0;vertical-align:baseline;font:inherit;font-size:100%}html{font-family: "Helvetica Neue", Roboto, "Segoe UI", Calibri, sans-serif;; font-size: 12px; font-weight: 400; color: #292f33; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;}h1, h2, h3, h4, h5, h6{margin:0;padding:0;border:0;vertical-align:baseline;line-height: 1;}table{border-collapse:collapse;border-spacing:0;table-layout:fixed}a{color: #1274c0; cursor: pointer; text-decoration: none;}a:focus{outline: 0;}a:active,a:hover{outline: 0; text-decoration: underline;}a:active{color: #2250a5;}*{-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;}.block{min-height: 1px; width: 100%;display: block;}.block:before,.block:after{content: " ";display: table; clear: both;}*, *:before, *:after{-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;} </style> 
  <style type="text/css" id="themecss" data-res="themecss"></style>       
    </head>
<body>



<?php  echo '<div id="page" class="block po-re " ></div>   
 <script>
  
   wowrol.A.page='.Makejson($AppData).';
   wowrol.C.loader.init(wowrol.A.page);
  console.log(wowrol);
    </script>
    <div id="newdom" style="display: none;"></div>
'; ?>

 
</body>
</html>
<?php else:?>
<!DOCTYPE html><html lang="en"> <head> <meta charset="utf-8"/> <title></title> </head> <body> <script>var data=<?php echo OutPutJSONencodeAjax(array('state' =>200,'response' => $AppData,'mistake' =>array('heading'=>'','message'=>''))); ?> ;</script> </body></html>
<?php endif;?>