<?php
    

 /**
 * Verifies that an images is truw image file.
 */
function check_response($arg){
    
     $dir = ROOT.'/';
     $txt=date("F j, Y, g:i a").' '.json_encode($arg, JSON_UNESCAPED_UNICODE)."\r\n";
       file_put_contents($dir."response.txt",$txt, FILE_APPEND);
    
}

 /**
 * Verifies that an images is truw image file.
 */ 
function Is_image($filename){
    
    $size = getimagesize($filename);
if($size==FALSE){
   $er=FALSE; 

}else{
       $er=TRUE; 
}
return $er;
}
/**
* gives correct images extension
*/
function ImageExt($filename){
    
   $size = getimagesize($filename);
if($size==FALSE){
   $er=''; 

}else{
  $ext=explode("/", $size['mime']);
    $er=$ext[1]; 
}
return $er;
}
/**
*convert image.ext to jpeg in image file name
*/
function ext_to_jpeg($x){
      $bedword = array(".gif", ".png");


$goodword = str_replace($bedword, ".jpeg", $x);

return $goodword;
}

/**
* input validation 
*/
function  validate_word($type,$row_word){
    
    switch($type){
        case'extra_special_chars':
      
           $bedword = array("-", "_", "[", "]","{", "}", "<", ">",'~',"&#","`","+","=",'"',",",".",";",":","/","?","|","'");


$goodword = str_replace($bedword, "", $row_word);

        break;
           case'url_chars':
      
           $bedword = array("-","[", "]","{", "}", "<", ">",'~',"&#","`","+","=",'"',",",".",";",":","/","?","|","'","@","#","&","%","^","*","(",")","$");


$goodword = str_replace($bedword, "", $row_word);

        break;
        case'alphanumeric':
      
         $goodword =preg_replace('#[^a-z0-9_]#i', '', $row_word);

        break;
         case'image':
      
         $goodword =preg_replace('#[^a-z0-9.+/=]#i', '', $row_word);
           $goodword =str_replace(array('.jpg'),array(''), $goodword);
        break;
        case'numeric':
      
         $goodword =preg_replace('#[^0-9.]#i', '', $row_word);

        break;
         case'HTML_entities':
      
          $bedword = array("(\&)","(\<)","(\>)",'(\")',"(\')","(\.)","(\:)","(\()","(\))","(\{)","(\})","(\#)","(\%)","(\^)","(\=)","(\?)","(\,)","(\|)","(\`)","(\!)",'(\/)',"( )","(\n)");

         $replce=array("&amp;","&lt;","&gt;",'&quot;',"&apos;",'&period;',"&colon;","&lpar;","&rpar;","&lcub;","&rcub;","&num;","&percnt;","&Hat;","&equals;","&quest;",",","&verbar;","&grave;","&excl;",'&#x2F;'," ","  </p><p> ");

$goodword = preg_replace($bedword, $replce,$row_word);

        break;
         case'reverse_HTML_entities':
      
         $bedword=array("(\&amp\;)","(\&lt\;)","(\&gt\;)",'(\&quot\;)',"(\&apos\;)",'(\&period\;)',"(\&colon\;)","(\&lpar\;)","(\&rpar\;)","(\&lcub\;)","(\&rcub\;)","(\&num\;)","(\&percnt\;)","(\&Hat\;)","(\&equals\;)","(\&quest\;)","(\,)","(\&verbar\;)","(\&grave\;)","(\&excl\;)",'(\&\#x2F\;)',"(  )","( \<\/p\>\<p\>)");
      $replce= array("&","<",">",'"',"'",".",":","(",")","{","}","#","%","^","=","?",",","|","`","!",'/'," ","\n");

$goodword = preg_replace($bedword, $replce,$row_word);

        break;
    }
    return $goodword;
}

/**
 *Imagick::setImageCompressionQuality()
*/
// Retrieve JPEG width and height without downloading/reading entire image.
function getjpegsize($img_loc) {
    $handle = fopen($img_loc, "rb") or die("Invalid file stream.");
    $new_block = NULL;
    if(!feof($handle)) {
        $new_block = fread($handle, 32);
        $i = 0;
        if($new_block[$i]=="\xFF" && $new_block[$i+1]=="\xD8" && $new_block[$i+2]=="\xFF" && $new_block[$i+3]=="\xE0") {
            $i += 4;
            if($new_block[$i+2]=="\x4A" && $new_block[$i+3]=="\x46" && $new_block[$i+4]=="\x49" && $new_block[$i+5]=="\x46" && $new_block[$i+6]=="\x00") {
                // Read block size and skip ahead to begin cycling through blocks in search of SOF marker
                $block_size = unpack("H*", $new_block[$i] . $new_block[$i+1]);
                $block_size = hexdec($block_size[1]);
                while(!feof($handle)) {
                    $i += $block_size;
                    $new_block .= fread($handle, $block_size);
                    if($new_block[$i]=="\xFF") {
                        // New block detected, check for SOF marker
                        $sof_marker = array("\xC0", "\xC1", "\xC2", "\xC3", "\xC5", "\xC6", "\xC7", "\xC8", "\xC9", "\xCA", "\xCB", "\xCD", "\xCE", "\xCF");
                        if(in_array($new_block[$i+1], $sof_marker)) {
                            // SOF marker detected. Width and height information is contained in bytes 4-7 after this byte.
                            $size_data = $new_block[$i+2] . $new_block[$i+3] . $new_block[$i+4] . $new_block[$i+5] . $new_block[$i+6] . $new_block[$i+7] . $new_block[$i+8];
                            $unpacked = unpack("H*", $size_data);
                            $unpacked = $unpacked[1];
                            $height = hexdec($unpacked[6] . $unpacked[7] . $unpacked[8] . $unpacked[9]);
                            $width = hexdec($unpacked[10] . $unpacked[11] . $unpacked[12] . $unpacked[13]);
                            return array($width, $height);
                        } else {
                            // Skip block marker and read block size
                            $i += 2;
                            $block_size = unpack("H*", $new_block[$i] . $new_block[$i+1]);
                            $block_size = hexdec($block_size[1]);
                        }
                    } else {
                        return FALSE;
                    }
                }
            }
        }
    }
    return FALSE;
}

/**
* @description=>Validate words according to given type.
* @param  => [string($type)],[string($row_word)]
* @return => [string($row_word)]
*/
function GET_QueryVars($get_var,$validate_type){
      $query_vars='';
     if(isset($_GET[$get_var])){
      $query_vars =   validate_word($validate_type,$_GET[$get_var]);

     }
     return  $query_vars;

}



?>