<?php
/*----==ROOT DOCUMENT==----*/   
 require($_SERVER['DOCUMENT_ROOT']. '/pr-includes/sr-config.php' );  


   /*----====----*/    

  /*----====----*/  
    /*----====----*/  
$script_out='';

header('Content-Type: text/css; charset=UTF-8');
header('Expires: ' . gmdate( "D, d M Y H:i:s", time() + 31536000 ) . ' GMT');
header("Cache-Control: public, max-age=31536000");
header("Timing-Allow-Origin: *");
 if($GLOBALS['Var_BrowserName']!='Edge'&&$GLOBALS['Var_BrowserName']!='Internet Explorer'&&$GLOBALS['Var_BrowserName']!='Internet Explorer Mobile'){
   header('Content-Encoding:gzip');
   header('Vary:Accept-Encoding');  
    }
 /*----====----*/  


 /*----====----*/  
$resInfo=resInfo();
 /*----====----*/  
   $Flaver=$resInfo['wf'];
     $assets='assets/mob/';
    switch($Flaver){
       case 'web':
    $assets='assets/web/';
       break;
    }
      $assets.='css';
 /*----====----*/  



 $res=$resInfo['res'];
 switch($res){
case 'maincss':

$script_out.= get_file(ROOT . $assets . '/crude/main.css');
$script_out.= get_file(ROOT. $assets. '/crude/custom.css');
$script_out.= get_file(ROOT . $assets . '/vendor/bootstrap.css');

$script_out.= get_file(ROOT. $assets . '/vendor/jquery-ui.css');
$script_out.= get_file(ROOT . $assets . '/vendor/lightslider.css');
$script_out.= get_file(ROOT . $assets . '/crude/sprite.css');

	break;
    case 'MaterialIcons':
$script_out.= get_file(ROOT . $assets . '/vendor/material-icons.css');


	break;
}
   /*----====----*/  
 header("ETag:".'"'.(md5(time()).'"'));
 header('Last-Modified: ' .md5(time()) . ' ');

 echo $script_out;
 // $minifier = new Minify\CSS($script_out);
 //echo $minifier->minify();
?>