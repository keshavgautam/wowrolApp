<?php
/*----==ROOT DOCUMENT==----*/   
 require($_SERVER['DOCUMENT_ROOT']. '/pr-includes/sr-config.php' );      
 

 $script_out='var q78979877={};';
header('content-type: text/javascript');
//header('expires: ' . gmdate( "D, d M Y H:i:s", time() + 31536000 ) . ' GMT');
header('Accept-Ranges:bytes'); 
header("cache-control: max-age=31536000");
//header('Timing-Allow-Origin:*'); 
header('Connection: close');
//header('last-modified: ' .md5(LastModifiedTime) . ' ');
header('ETag: "71618ca9d1257df0fd9cfffecf3d6c35" ');
//header_remove('X-Powered-By:');
//header_remove('Keep-Alive:');  

/**
* @description=>get app  class for component by app id.
* @param  => [string(app id)]
* @return => [array()]
*/



 /*----====----*/  
$resInfo=resInfo();
 /*----====----*/  
 $assets='assets/core/javascript';
 $assetsWeb='assets/web/javascript';
 $assetsMob='assets/mob/javascript';
 /*----====----*/  

 $res=$resInfo['res'];





$resInfo=resInfo();
 /*----====----*/  
 $assets='assets/core/javascript';
 $assetsWeb='assets/web/javascript';
 $assetsMob='assets/mob/javascript';
 /*----====----*/  

 $res=$resInfo['res'];
 switch($res){
    case 'Material':
    ob_start();
include(ROOT .'/Material/index.php');
 $script_out.= ob_get_clean();
$script_out.= get_file(ROOT  .$assets. '/Controllers/backinit.js');
     
     break;
     case 'getmaterial':
       $script_out.=get_file(ROOT  .$assets.'/Components/C0_start.js') ;
     $script_out.=get_file(ROOT  .$assets.'/Components/C5_SearchDrawer.js') ; 
        $script_out.=get_file(ROOT  .$assets.'/Components/C2_card.js') ; 
        $script_out.=get_file(ROOT  .$assets.'/Modules/getmaterial.js') ;
        $script_out.= get_file(ROOT  .$assets. '/Controllers/backinit.js');
     break;
     
     case 'lang':
   $lang='lang_'.$resInfo['wg'];
   //$script_out.=get_file(ROOT  .'assets/core/javascript/localization/'.$lang.'.js') ;

   $script_out=$GLOBALS['Var_Minify']->GET_MINFIED_FILE( $lang);

       break;        
default:
$script_out=$GLOBALS['Var_Minify']->GET_MINFIED_FILE($res);
 }

  



   /*----====----*/  


 
ob_start();
ob_start("ob_gzhandler");
echo $script_out;
ob_end_flush();
header('Content-Length: '.ob_get_length());
ob_end_flush();
// $minifier = new Minify\JS($script_out);
// echo $minifier->minify();
?>