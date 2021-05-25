<?php
 
require( __DIR__. '/sr-config.php' );

 //header('Content-Type: application/x-www-form-urlencoded');
 if(isset($_SERVER['HTTP_ORIGIN'])){
      if($_SERVER['HTTP_ORIGIN'] == ORIGIN){

 echo $GLOBALS['Var_Ajax']->AjaxOutput();

//var_dump($_FILES);


   }else{
     // echo $_SERVER['HTTP_ORIGIN'] ; 
   }  
 }



//print_r(get_defined_constants(true)['user']);



 

?> 

