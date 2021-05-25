<?php
   /*----==ROOT DOCUMENT==----*/ 
  
  if($_SERVER['HTTP_HOST']=="img.wowrol.com")
  { $ROOT_FOLDER='img'; }else{ $ROOT_FOLDER='imgWowrol'; } 
   $SCRIPT_FILENAME=$_SERVER['SCRIPT_FILENAME'];   
  $PIECE=explode($ROOT_FOLDER,$SCRIPT_FILENAME, 2);     
   $ROOT= $PIECE[0].$ROOT_FOLDER.'/';
 define('DOCUMENT_ROOT',  $ROOT);
  
  /*----==ROOT DOCUMENT==----*/
require(DOCUMENT_ROOT. 'sr-includes/sr-config.php'); 









$file=GET_QueryVars('path','image');
 
 $file=json_decode(base64_decode($file),true);
 check_response($file);
 if($file==NULL){
     $file=array('file'=>SITEURL.'/de-photos/dpholder400x400.jpeg','width'=>400,'height'=>400,'type'=>'resize' );
 }else{
 
  if(!isset($file['file'])){ $file['file']= SITEURL.'/de-photos/dpholder400x400.jpeg'; }
  if(!isset($file['width'])){ $file['width']= 400;} 
  if(!isset($file['height'])){ $file['height']= 400;} 
 }
     $image_path=$file['file'];
      // Storing your resized image in a variable
  

ob_start(); // start a new output buffer
 $delivery_image= new\class_images_handle\delivery_image($image_path);
 switch($file['type']){
    case 'slider':
  $srcImage =  $delivery_image->SliderResizeImage($file['width'],$file['height'] );
    
    break;
    default:
     $srcImage =  $delivery_image->ResizeImage($file['width'],$file['height'] );

 }


  imagejpeg($srcImage, NULL, 100);
  $resizedJpegData = ob_get_contents();
ob_end_clean(); // stop this output buffer
header("Cache-Control: public, max-age=31536000");
header("Content-Type: image/jpg");
echo $resizedJpegData ;



?>

