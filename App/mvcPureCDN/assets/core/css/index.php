<?php
/*----==ROOT DOCUMENT==----*/   
 require($_SERVER['DOCUMENT_ROOT']. '/pr-includes/sr-config.php' );  


   /*----====----*/    

  /*----====----*/  
    /*----====----*/  
$script_out='';

header('Content-Type: text/css; charset=UTF-8');
header('expires: ' . gmdate( "D, d M Y H:i:s", time() + 31536000 ) . ' GMT');
header("cache-control: public, max-age=31536000");
header_remove("connection"); 
header_remove("keep-alive"); 
 header('last-modified: ' .md5(LastModifiedTime) . ' ');
 /*----====----*/  


 /*----====----*/  
$resInfo=resInfo();
 /*----====----*/  
   $Flaver=$resInfo['wf'];
     $assets='assets/core/css';
   
 /*----====----*/  



 $res=$resInfo['res'];
 switch($res){
case 'maincss':
/*
$script_out.= get_file(ROOT . $assets . '/crude/main.css');
$script_out.= get_file(ROOT. $assets. '/crude/custom.css');
$script_out.= get_file(ROOT. $assets. '/crude/animate.css');
$script_out.= get_file(ROOT. $assets. '/crude/xender.css');
$script_out.= get_file(ROOT . $assets . '/vendor/bootstrap.css');

$script_out.= get_file(ROOT. $assets . '/vendor/jquery-ui.css');
$script_out.= get_file(ROOT . $assets . '/crude/sprite.css');
$script_out.= get_file(ROOT . $assets . '/crude/emoji.css');*/

$script_out=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('maincss');

if($Flaver=='web'){
  $script_out.= get_file(ROOT . 'assets/web/css/custom.css');  
  $script_out.= get_file(ROOT .$assets . '/vendor/addon_2_wowzoom.css');  
}
if($Flaver=='mob'){
$script_out.= get_file(ROOT . 'assets/mob/css/custom.css');
}


	break;

}
   /*----====----*/  
 //header("ETag:".'"'.(md5(LastModifiedTime).'"'));
 //header('Last-Modified: ' .md5(LastModifiedTime) . ' ');

 
ob_start();
ob_start("ob_gzhandler");
echo $script_out;
ob_end_flush();
header('Content-Length: '.ob_get_length());
ob_end_flush();
// $minifier = new Minify\CSS($script_out);
 //echo $minifier->minify();
?>