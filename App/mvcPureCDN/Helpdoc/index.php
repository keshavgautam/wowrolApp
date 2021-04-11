<?php
 
 require($_SERVER['DOCUMENT_ROOT']. '/pr-includes/sr-config.php' );


header('Content-Type: text/html; charset=UTF-8');

$lang=post_vars(array('wg'=>''),$_POST['data'],'alphanumeric');
$rawAppId=post_vars(array('AppId'=>''),$_POST['data'],'alphanumeric');

$AppId=$rawAppId.'.php';

$files = dirToArray(ROOT.'/Helpdoc/doc') ;
$hasfiles=0;

foreach( $files as $langkey=>$AppDoc){
    if($lang==$langkey){
        //innner
        foreach( $AppDoc as  $AppDocId){
            if($AppId==$AppDocId){
               $hasfiles=1; 
            }


        }
        //innner
    }


}


if($hasfiles==1){
     require(ROOT.'/Helpdoc/doc/'.$lang.'/'.$AppId );
}



?> 
