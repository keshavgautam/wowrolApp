<?php
 
class Ajax{
    
/**
* @description=>handle request from ajax methode.
* @param  => 
* @return => 
*/
public function AjaxOutput($Mode=''){
  
 


 
  


   
  return  OutPutJSONencodeAjax($this->SanitizeForm());
}



/**
* @description=>sanitizefrom data.
* @param  => 
* @return => 
*/

private function SanitizeForm(){
    //Default
 $arr = array('state' =>500,'error' =>0,'response' => '','mistake' =>array('heading'=>'sd','message'=>array())); 
 $error=0;   
 if($GLOBALS['Var_LoginStatus']){
 if(isset($_POST['type'])){
     
 
 switch($_POST['type']){
   
 case 'file':
   $args=array();
   //--Error chack
      $error=1; 
     // var_dump($_FILES);

 if(!isset($_FILES['filename'])){ $arr['mistake']['message'][]='images are required.';}else{
      if(Is_image($_FILES['filename']['tmp_name'])){

   $ImageInfo=ImageInfo($_FILES['filename']['tmp_name']);
    $args['ImageExt']=$ImageInfo['ImageExt']; 
    $args['width']=$ImageInfo['width'];   
    $args['height']=$ImageInfo['height']; 
   $args['ContentType']=  $_FILES['filename']['type'];

  $args['filesize']=  $_FILES['filename']['size'];
   $args['Body']=   file_get_contents($_FILES['filename']['tmp_name']);
             $error--; 

         }
     
     
     
    }






   //--
    if($error==0){
  $arr =   $GLOBALS['Var_ImageUpload']->ImageUploadToS3($args);

    }
 break;
 case 'data':
    $args=array();
   //--Error chack
      $error=1; 
      if(isset($_POST['imageData'])){
     
   if(base64_decode($_POST['imageData'],TRUE)){//Returns the original data or FALSE on failure
   
    $args['ImageExt']= 'jpg';
    $args['ContentType']= 'image/jpg';
    $args['Body']=  base64_decode($_POST['imageData']);
    $args['filesize']=  450;

          $error--; 
     }

       }



    if($error==0){
  $arr =   $GLOBALS['Var_ImageUpload']->ImageUploadToS3($args);

    }
 break;



 }



 }

  $arr['error']=$error;

 }else{
       $arr['mistake']['message'][]='ajax_34';
 }
  if(SERVER_MODE=="DEVELOPMENT"){
       $arr['detailargs']=$GLOBALS['Var_ActorEntityData'];  
       
    }else{
      
  
    }

 return $arr;

}

}



$GLOBALS['Var_Ajax']=new Ajax();


?>