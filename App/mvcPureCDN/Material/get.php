<?php
/*----==ROOT DOCUMENT==----*/   
 require($_SERVER['DOCUMENT_ROOT']. '/pr-includes/sr-config.php' );  
$data=$_POST['data']['f_value'];

$TheFile=ROOT.'/Material/template/'.$data['folder'].'/'.$data['file'];

ob_start();
ob_start("ob_gzhandler");

if(file_exists($TheFile)){

  require( $TheFile );
}else{
    echo 'console.log("No found")';
}



ob_end_flush();
header('Content-Length: '.ob_get_length());
ob_end_flush();

?>
