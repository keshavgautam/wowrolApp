<?php
     namespace class_images_handle;   


class images_handle {
    
    public function __construct($id,$base_name,$file){
         $this->id = $id;
         $this->base_name = $base_name;
        $this->file = $file;
   
    }

  public function ImageExt(){
    
   $size = getimagesize($this->file);
if($size==FALSE){
   $er=''; 

}else{
  $ext=explode("/", $size['mime']);
    $er=$ext[1]; 
}
return $er;
}
   

public function draw_images($width,$height){
       $ext=$this->ImageExt();
      if ($ext == "gif"){ 
      $img = imagecreatefromgif($this->file);
    } else if($ext =="png"){ 
      $img = imagecreatefrompng($this->file);
    } else { 
      $img = imagecreatefromjpeg($this->file);
    }
     $w =$trg_w=$width;
         $h=$trg_h=$height;
 list($w_orig, $h_orig) = getimagesize($this->file);
    $scale_ratio = $w_orig / $h_orig;
    if (($w / $h) > $scale_ratio) {
           $w = $h * $scale_ratio;
    } else {
           $h = $w / $scale_ratio;
    }
    /*-----------------*/
    $dst_x=round(($trg_w-$w)/2);
    $dst_y=round(($trg_h-$h)/2);
    $src_x=0;
    $src_y=0;
    $src_w=$w;
    $src_h=$h;
   $dest=imagecreatetruecolor($trg_w, $trg_h);
            // sets background to red
$white = imagecolorallocate($dest, 255, 255, 255);
       imagefill($dest, 0, 0, $white);

        $src = imagecreatetruecolor($w, $h);
        imagecopyresampled($src, $img, 0, 0, 0, 0, $w, $h, $w_orig, $h_orig);

imagecopymerge($dest,  $src, $dst_x,  $dst_y, $src_x,$src_y, $src_w, $src_h, 100);


    return $dest;

}
public function draw_jpeg($source,$target){
 return   imagejpeg($source,$target,100);
}
public function resize_image($width,$height){
      $w =$trg_w=$width;
         $h=$trg_h=$height;

  list($w_orig, $h_orig) = getimagesize($this->file);
    $scale_ratio = $w_orig / $h_orig;
    if (($w / $h) > $scale_ratio) {
           $w = $h * $scale_ratio;
    } else {
           $h = $w / $scale_ratio;
    }
    $img = "";
      $ext=$this->ImageExt();
      if ($ext == "gif"){ 
      $img = imagecreatefromgif($this->file);
    } else if($ext =="png"){ 
      $img = imagecreatefrompng($this->file);
    } else { 
      $img = imagecreatefromjpeg($this->file);
    }
     $dst_img = imagecreatetruecolor($w, $h);
     imagecopyresampled($dst_img, $img, 0, 0, 0, 0, $w, $h, $w_orig, $h_orig);
     return $dst_img;
}
public function final_result($type){
    $final_result=array();
    switch($type){
       
       case "product":
       
 //--
       $productsizes=array(

'100x100'=>array('width'=>100,'height'=>100),
'200x200'=>array('width'=>200,'height'=>200),
'300x300'=>array('width'=>300,'height'=>300),
'400x400'=>array('width'=>400,'height'=>400),
'350x400'=>array('width'=>350,'height'=>400),
'600x690'=>array('width'=>600,'height'=>690),
'640x640'=>array('width'=>640,'height'=>640),
'original'=>array('width'=>'','height'=>'')
);
//--

foreach($productsizes as $name => $size){
    $real_name=$this->base_name.$name.'.jpeg';
    if($name=='350x400'||$name=='600x690'){
       $draw_image=$this->draw_images($size['width'],$size['height']);

    $this->draw_jpeg($draw_image, dir_PHOTOS.'/'.$real_name);  
    }
   if($name=='original'){
         list($w_orig, $h_orig) = getimagesize($this->file);
        $draw_image=$this->resize_image($w_orig,$h_orig);
        $this->draw_jpeg($draw_image, dir_PHOTOS.'/'.$real_name);  
   
    }
     if($name=='100x100'||$name=='200x200'||$name=='300x300'||$name=='400x400'||$name=='640x640'){
       $draw_image=$this->resize_image($size['width'],$size['height']);

    $this->draw_jpeg($draw_image, dir_PHOTOS.'/'.$real_name);  
    }
    $final_result[]=$real_name;
}

       
//--    

   break; 
   /*----------------------*/
       case "slider":
       
 //--
       $productsizes=array(
'200x150'=>array('width'=>200,'height'=>150),
'400x225'=>array('width'=>400,'height'=>225),
'640x640'=>array('width'=>640,'height'=>640),
'730x300'=>array('width'=>700,'height'=>300)
);
//--

foreach($productsizes as $name => $size){
    $real_name=$this->base_name.$name.'.jpeg';
    if($name=='730x300'||$name=='400x225'||$name=='640x640'){
       $draw_image=$this->draw_images($size['width'],$size['height']);

    $this->draw_jpeg($draw_image, dir_PHOTOS.'/'.$real_name);  
    }
   if($name=='original'){
         list($w_orig, $h_orig) = getimagesize($this->file);
        $draw_image=$this->resize_image($w_orig,$h_orig);
        $this->draw_jpeg($draw_image, dir_PHOTOS.'/'.$real_name);  
   
    }
     if($name=='200x150'){
       $draw_image=$this->resize_image($size['width'],$size['height']);

    $this->draw_jpeg($draw_image, dir_PHOTOS.'/'.$real_name);  
    }
    $final_result[]=$real_name;
}

       
//--    

   break; 

   case 'profile_pic':
    //--
       $productsizes=array(
'180'=>array('width'=>180,'height'=>180),
'100'=>array('width'=>100,'height'=>100),
'640x640'=>array('width'=>640,'height'=>640),
'original'=>array('width'=>'','height'=>'')
);
//--

foreach($productsizes as $name => $size){
    $real_name=$this->base_name.$name.'.jpeg';
    if($name=='180'||$name=='100'||$name=='640x640'){
       $draw_image=$this->draw_images($size['width'],$size['height']);

    $this->draw_jpeg($draw_image, dir_PHOTOS.'/'.$real_name);  
    }
  if($name=='original'){
         list($w_orig, $h_orig) = getimagesize($this->file);
        $draw_image=$this->resize_image($w_orig,$h_orig);
        $this->draw_jpeg($draw_image, dir_PHOTOS.'/'.$real_name);  
   
    }
    $final_result[]=$real_name;
}

       
//--   
   break;
      case 'banner_pic':
    //--
       $productsizes=array(
'1000'=>array('width'=>1000,'height'=>300),
'320'=>array('width'=>320,'height'=>157)
);
//--

foreach($productsizes as $name => $size){
    $real_name=$this->base_name.$name.'.jpeg';
    if($name=='1000'||$name=='320'){
       $draw_image=$this->resize_image($size['width'],$size['height']);

    $this->draw_jpeg($draw_image, dir_PHOTOS.'/'.$real_name);  
    }
 
    $final_result[]=$real_name;
}

       
//--   
   break;

    }

    $this->flush();

return array($this->id,$this->base_name,$final_result);
}
public function flush(){
      unlink(dir_TEMP.'/'.$this->base_name.'.'.$this->ImageExt());  
}
}

?>