<?php
 
require( __DIR__. '/sr-config.php' );

 

header('Content-Type: text/html; charset=UTF-8');

if(isset($_POST['data'])){
    

$lang=post_vars(array('wg'=>''),$_POST['data'],'alphanumeric');
$rawAppId=post_vars(array('AppId'=>''),$_POST['data'],'alphanumeric');



if(SERVER_MODE=="DEVELOPMENT"){
   $Help_doc_url=array(
'en'=>'http://wowrol.co/en_',
'hi'=>'http://wowrol.co/hi_'
);  
}else{
  $Help_doc_url=array(
'en'=>'http://wowrol.co/en_',
'hi'=>'http://wowrol.co/hi_'
);  
}


 $url=(isset($Help_doc_url[$lang]))?$Help_doc_url[$lang]:$Help_doc_url['en'];

 $arr=$GLOBALS['Var_ProcessData']->LoadSnoopyUrl(array('url'=> $url.$rawAppId.'/'));

 if($arr['response']['html']==''){
     check_response('Document required in category '.$lang.'  for  '.$rawAppId.' ');
     echo  '<div class="block">  document will be attached very soon.<div>';
 }else{
   echo  $arr['response']['html'];  
 }

// var_dump($arr);
// echo  '<div class="block"> Help documet will be attached very soon.<div>';
}



 

?> 