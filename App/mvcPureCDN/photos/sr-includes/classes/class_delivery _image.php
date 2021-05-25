<?php
     namespace class_images_handle;    


     class delivery_image{
            public function __construct($file){
        
        $this->file = $file;
        $this->info = getimagesize($file);
    }

     public function SliderResizeImage($width,$height){
 $ext=self::ImageExt($this->file);
      if ($ext == "gif"){ 
      $img = imagecreatefromgif($this->file);
    } else if($ext =="png"){ 
      $img = imagecreatefrompng($this->file);
    } else { 
      $img = imagecreatefromjpeg($this->file);
    }
    if($img==FALSE){
   
        $this->file =SITEURL.'/de-photos/dpholder400x400.jpeg';
        $this->info = getimagesize($this->file);
     $img = imagecreatefromjpeg(SITEURL.'/de-photos/dpholder400x400.jpeg');

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
     imagealphablending( $src, false );
     imagesavealpha( $src, true );
      $transparentindex = imagecolorallocatealpha($src, 255, 255, 255, 127);
     imagefill($src, 0, 0, $transparentindex);
        imagecopyresampled($src, $img, 0, 0, 0, 0, $w, $h, $w_orig, $h_orig);

imagecopymerge($dest,  $src, $dst_x,  $dst_y, $src_x,$src_y, $src_w, $src_h, 100);


    return $dest;


         }

public function ResizeImage($width,$height){
 $ext=self::ImageExt($this->file);
      if ($ext == "gif"){ 
      $img = imagecreatefromgif($this->file);
    } else if($ext =="png"){ 
      $img = imagecreatefrompng($this->file);
    } else { 
      $img = imagecreatefromjpeg($this->file);
    }
    if($img==FALSE){
   
        $this->file =SITEURL.'/de-photos/dpholder400x400.jpeg';
        $this->info = getimagesize($this->file);
     $img = imagecreatefromjpeg(SITEURL.'/de-photos/dpholder400x400.jpeg');

 }
         $w =$trg_w=$width;
         $h=$trg_h=$height;
 list($w_orig, $h_orig) = $this->info ;
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
    $dst_img = imagecreatetruecolor($w, $h);
    imagealphablending( $dst_img, false );
     imagesavealpha( $dst_img, true );
          $transparentindex = imagecolorallocatealpha( $dst_img, 255, 255, 255, 127);
     imagefill( $dst_img, 0, 0, $transparentindex);

     imagecopyresampled($dst_img, $img, 0, 0, 0, 0, $w, $h, $w_orig, $h_orig);
     return $dst_img;




   

    


         }
 public function ImageExt($file_path){
    
   $size =$this->info ;
if($size==FALSE){
   $er=''; 

}else{
  $ext=explode("/", $size['mime']);
    $er=$ext[1]; 
}
return $er;
}

     }


    
?>