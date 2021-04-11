<?php
    
/**
* @description=>generate_random_string.
* @param  => 
* @return => 
*/
 function generate_random_string( $length = 12,$numbers= true ,$letters= true ,$special_chars = true,$uppercase_letters= true , $extra_special_chars = false ) {
	$chars = '';
    if ( $numbers )
		$chars .= '0123456789';
    if ( $letters )
    $chars .= 'abcdefghijklmnopqrstuvwxyz';
    if ( $uppercase_letters )
    $chars .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	if ( $special_chars )
		$chars .= '!@#$%^&*()';
	if ( $extra_special_chars )
		$chars .= '-_ []{}<>~`+=,.;:/?|';

	$random_string = '';
      $charArray = str_split($chars);
	for ( $i = 0; $i < $length; $i++ ) {
         $randItem = array_rand($charArray);
   $random_string.= "".$charArray[$randItem];
	
	}

	
	return $random_string ;
}
/**
* @description=>Validate words according to given type.
* @param  => [string($type)],[string($row_word)]
* @return => [string($row_word)]
*/
function Makejson($x){
 
   return  json_encode($x, JSON_UNESCAPED_UNICODE);//do not use all  Constants

}
/**
* @description=>function encode json with check decodeble.
* @param  => 
* @return =>
*/
function Makejson_0($x){
    $return=array('state'=>500,
                  'encode'=>Makejson($x)
    );
 $json_decode=json_decode($return['encode'],TRUE);
  

 if($json_decode!=NULL&&$json_decode!=FALSE){
               $return['state']=200; 
                 
                    }
return $return;
}
/**
* @description=>Validate words according to given type.
* @param  => [string($type)],[string($row_word)]
* @return => [string($row_word)]
*/
function OutputMakejson($x){
    
   return  json_encode($x, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);

}
/**
* @description=>decode the json correctly.
* @param  => [string($type)],[string($row_word)]
* @return => [array($row_word)]
*/
function JsonTrueDecode($value,$Defaultargs){
    if(is_string($value)){
     $json_decode=json_decode($value,TRUE);
   
          if($json_decode!=NULL&&$json_decode!=FALSE){
              
$Defaultargs=$json_decode;

          

          }
}
     return $Defaultargs;
}
/**
* @description=>decode the base 64 string use in ajax.
* @param  => [string($encoded)]]
* @return => [array($decoded)]
*/
function Base64DecodeInChunk($encoded){
    $decoded = ""; 
 if($GLOBALS['Var_AppSetting']['UseBase64']&&is_string($encoded) ){  
for ($i=0; $i < ceil(strlen($encoded)/256); $i++) {

   $decoded = $decoded . base64_decode(substr($encoded,$i*256,256)); 

}
$decoded=json_decode( $decoded,true);
 }else{
     $decoded=$encoded;
 } 
   return $decoded;
}
/**
* @description=>decode the base 64 string use in ajax.
* @param  => [string($encoded)]]
* @return => [array($decoded)]
*/
function Base64DecodeForIframe($encoded){
    $decoded = ""; 
 if($GLOBALS['Var_AppSetting']['UseBase64']&&is_string($encoded) ){  
for ($i=0; $i < ceil(strlen($encoded)/256); $i++) {

   $decoded = $decoded . base64_decode(substr($encoded,$i*256,256)); 

}
$decoded=json_decode( $decoded,true);
 }else{
     if(is_string($encoded)){
  $decoded=json_decode( $encoded,true);
     }else{
      $decoded=$encoded;    
     }
    
 } 

   return $decoded;
}
/**
* @description=>decode the base 64 string use in ajax.
* @param  => [string($encoded)]]
* @return => [array($decoded)]
*/
function OutPutJSONencodeAjax($value){
    if($GLOBALS['Var_AppSetting']['UseBase64']){
       return  '"'.base64_encode(json_encode($value)).'"';

    }

    return json_encode($value);
}
/**
* @description=>array merge.
* @param  => [array($array2)=>default,array($array1)=>Saved in databse]
* @return => [array()]
*/
function True_array_merge1($array2,$array1){
     $collected_data=array();
    //filling with empty value
    
  

   if(!isset($array2[0])){
         foreach($array2 as $key=>$value){
        if(isset($array1[$key])){

        if(is_array( $value)){
            if(is_array($array1[$key])){//we  parse it again
   $collected_data[$key]= True_array_merge($value,$array1[$key]); 
       
            }else{
                
              
                 $collected_data[$key]= $value;     //we take default array

            }     
        }else{
      $collected_data[$key]= $array1[$key];  //collecting saved data   

        } 


        }else{
           $collected_data[$key]= $value;   //collecting default data  
        }  
        
        
         }
   }else{// for numaric index direct collect
         foreach($array1 as $key=>$value){
        $collected_data[$key]= $array1[$key];   
         }
   }




      
        

 
    
    return $collected_data;


}
function True_array_merge($array1,$array2){
    $arguments=array($array1,$array2);
    $target=$arguments[0];
    $i= 1;
    $length = count($arguments);	$deep =$copyIsArray= FALSE;
     $options=$src=$copy=$clone= array();
 
    
     for( ; $i<$length ; $i++  ){
        
    if ( ( $options = $arguments[ $i ] ) != NULL ) {
         
         foreach( $options as  $name=>$value){
            	$src = (isset($target[ $name ]))?$target[ $name ]:'';
				$copy =  (isset($options[ $name ]))?$options[ $name ]:'';
                // Prevent never-ending loop
				if ( $target === $copy ) {
					continue;
				}

	// Recurse if we're merging plain objects or arrays
				if ( $deep && $copy && (  is_array( $copy ) ||
					( $copyIsArray = is_array( $copy ) ) ) ) {

					if ( $copyIsArray ) {
						$copyIsArray = false;
						$clone = $src &&  is_array( $src ) ? $src : array();

					} else {
			$clone = $src &&  is_array( $src ) ? $src : array();
					}

					// Never move original objects, clone them
					$target[ $name ] =  True_array_merge(  $clone, $copy );

				// Don't bring in undefined values
				} else if ( isset($copy) ) {
					$target[ $name ] = $copy;
				}


         }
          

      }

    }


      
        

 
    
    return $target;


} 
/**
* @description=>paging_data.
* @param  =>
* @return => 
*/

function paging_data($total_result,$page_size,$paged){
    $paging_data=array();
    $paged=($paged==0)?1:$paged;
    $total_result=intval($total_result);
    $page_size=($page_size==0)?1:$page_size;
    $tp=ceil($total_result/$page_size);
     $total_page=($tp==0)?1:$tp;
    $paging_data['total_page']= ceil($total_result/$page_size);
   
    $paged=($paged>$total_page)?$total_page:$paged;
    $paging_data['next_page']= ($paged>$paging_data['total_page']) ? ($paging_data['total_page']) : ($paged+1); 
    $paging_data['loop_limit']= (($paged*$page_size)>$total_result)?$total_result:($paged*$page_size);
   
    $paging_data['loop_start']=(($paged*$page_size)-$page_size);
    return $paging_data;
}



?>