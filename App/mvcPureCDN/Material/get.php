<?php
/*----==ROOT DOCUMENT==----*/   
 require($_SERVER['DOCUMENT_ROOT']. '/pr-includes/sr-config.php' );  
$data=$_POST['data']['f_value'];
 require(ROOT.'/Material/template/'.$data['folder'].'/'.$data['file'] );


?>
