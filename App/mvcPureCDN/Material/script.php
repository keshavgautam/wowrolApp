<?php
/*----==ROOT DOCUMENT==----*/   
 require($_SERVER['DOCUMENT_ROOT']. '/pr-includes/sr-config.php' );  
$data=$_POST['data']['f_value'];

$datafile=preg_replace('[.php]','.js',$data['file']);

 require(ROOT.'/Material/scripts/'.$data['folder'].'/'.$datafile );


?>
