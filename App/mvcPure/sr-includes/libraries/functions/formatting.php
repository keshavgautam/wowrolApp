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
 
  // return  json_encode($x, JSON_UNESCAPED_UNICODE);//do not use all  Constants
  return my_json_encode($x);
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
    
 //  return  json_encode($x, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
   return my_json_encode($x);

}
/**
* @description=>decode the json correctly.
* @param  => [string($type)],[string($row_word)]
* @return => [array($row_word)]
*/
function JsonTrueDecode($value,$Defaultargs){
 
    if(is_string($value)){
     //  check_response($value);    
    $value = implode("&nbsp;", explode(" ", $value));
  

     $json_decode=json_decode($value,TRUE);
 
          if($json_decode!=NULL&&$json_decode!=FALSE){
              
$Defaultargs=$json_decode;

          

          }
}
     return $Defaultargs;
}
/**
* @description=>.
* @param  =>
* @return => 
*/
function is_numeric_index_array($array){
     $is=FALSE;
 $keys=array_keys($array);
 $allNumeric=TRUE;
foreach ( $keys as $element) {
    if (!is_numeric($element)) {
     $allNumeric=FALSE;
    }
}
   $is=($allNumeric)?TRUE:FALSE;
if(count($array)==0){
     $is=TRUE;
}


  return  $is;
}
/**
* @description=>.
* @param  =>
* @return => 
*/
function is_index_array($array){
     $is=FALSE;
 
    if (array_keys($array) === range(0, count($array) - 1)) {
   //it is a hash
    $is=TRUE;
}
if(count($array)==0){
     $is=TRUE;
}


  return  $is;
}
/**
* @description=>.
* @param  =>
* @return => 
*/
function my_json_encode($arr){
    $encode_str='{}';
    $is_index_array=is_index_array($arr);


   
    
    if(is_array($arr)){
         $encode_str='';
  $encode_str.=($is_index_array)?'[':'{';


$loop=0;
     foreach($arr as $q=>$p){
  $encode_str.=($loop!=0)?',':''; $loop++;  

  //check for indexed or associate array ???

 $encode_str.=( $is_index_array)?'':'"'.$q.'":';


   if(is_array($p)){
      $encode_str.=my_json_encode($p);   
   }elseif(is_string($p)){
  //$p =   htmlspecialchars($p, ENT_QUOTES);
  //   $p = addslashes($p);
  // $p = stripslashes(  $p);
  
    //  $p = implode("&nbsp;", explode(" ", $p));
 //   $encode_str.='"'.trim($p).'"';   
 $BETWenJSON=json_encode(trim($p),  JSON_UNESCAPED_UNICODE);
 
  if(!($BETWenJSON==''||$BETWenJSON==NULL)){
        preg_replace('/u0026/','&',$BETWenJSON);
  }

 $encode_str.= ($BETWenJSON==''||$BETWenJSON==NULL)?'""': $BETWenJSON;

   }elseif(is_null($p)){
      $encode_str.='null';     
   }elseif(is_bool($p)){
      $encode_str.=($p)?'true':'false';     
   }elseif(is_numeric($p)){
      $encode_str.=$p;     
   }elseif(is_float($p)){
      $encode_str.=$p;     
   }else{
       $encode_str.='""';     
   }




     }


  $encode_str.=( $is_index_array)?']':'}';
    }



    return $encode_str;
}

/**
* @description=>decode the json correctly.
* @param  => [string($type)],[string($row_word)]
* @return => [array($row_word)]
*/
function SafeTextEncode($text){
    $ret='';
    if(is_string($text)){
       $ret=base64_encode($text);
    }else{
          $ret=base64_encode('');
         //check_response($text);
    }

    return $ret;
}
/**
* @description=>
* @param  =>
* @return => 
*/
function SafeArrayEncode($arr){
    $EncodedArr=array();
    if(is_array($arr)){
        foreach($arr as $q=>$value){
           if(is_array($value)){
            $EncodedArr[$q]=SafeArrayEncode($value);
           }elseif(is_string($value)){
               $EncodedArr[$q]=SafeTextEncode($value);        
                }else{
                 $EncodedArr[$q]='';   
           }
        }
    }



    return $EncodedArr;
}
/**
* @description=>decode the json correctly.
* @param  => [string($type)],[string($row_word)]
* @return => [array($row_word)]
*/
function SafeArrayDecode($arr){
       $DecodedArr=array();

  if(is_array($arr)){
        foreach($arr as $q=>$value){
           if(is_array($value)){
        $DecodedArr[$q]=SafeArrayDecode($value);
           }elseif(is_string($value)){
          $DecodedArr[$q]=SafeTextDecode($value);        
                }else{
             $DecodedArr[$q]='';   
           }
        }
    }


    return $DecodedArr;
}
/**
* @description=>decode the json correctly.
* @param  => [string($type)],[string($row_word)]
* @return => [array($row_word)]
*/
function SafeTextDecode($encoded){
       $decoded = ""; 
preg_match_all("/^([A-Za-z0-9+\/]{4})*([A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}==)$/", $encoded, $matches);
  // check_response($encoded);     check_response(count($matches)); 

 if(is_string($encoded)){  
    
     if(count($matches)>0){
  for ($i=0; $i < ceil(strlen($encoded)/256); $i++) {
   $Make=base64_decode(substr($encoded,$i*256,256));
    // $Make=base64_decode($encoded);

   //  $Make='asdasd';
      if($Make){
      $decoded = $decoded . $Make;      
      }
  

}
     }
 }

   return trim($decoded);
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
   /* if($GLOBALS['Var_AppSetting']['UseBase64']){
       return  '"'.base64_encode(my_json_encode($value)).'"';

    }

    return my_json_encode($value);*/

 if($GLOBALS['Var_AppSetting']['UseBase64']){
       return  '"'.base64_encode(Makejson($value)).'"';

    }

    return Makejson($value);

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
    $length = count($arguments);	$deep =$copyIsArray= TRUE;
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

/**
* @description=>extend the out put by default data.
* @param  =>
* @return => 
*/
function PagingOutPut($output){
   return True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('PagingOutPut'), $output); 
}

/**
* @description=>A function to handle integers of any length, including negatives. Returns remainder but also calculates division in the process (could be useful in some cases).
* @param  =>
* @return => 
*/
function remainder($dividend, $divisor) {
    if ($dividend == 0 || $divisor == 0) return 0;

    $dividend .= '';
    $remainder = 0;
    $division = '';
    
    // negative case
    while ($dividend < 0) {
        $dividend += $divisor;
        if ($dividend >= 0) return $dividend;
    }
    
    // positive case
    while (($remainder.$dividend)*1 > $divisor) {
        // get remainder big enough to divide
        while ($remainder*1 < $divisor) {
            $remainder .= $dividend[0];
            $remainder *= 1;
            $dividend = substr($dividend, 1);
        }
        
        // get highest multiplicator for remainder
        $mult = floor($remainder / $divisor);

        // add multiplicator to division
        $division .= $mult.'';

        // subtract from remainder
        $remainder -= $mult*$divisor;
    }
    
    // add remaining zeros if any, to division
    if (strlen($dividend) > 0 && $dividend*1 == 0) {
        $division .= $dividend;
    }
    
    return $remainder;
}
/**
* @description=>Cerate the single array for many array
*
* @param  =>
* @return => 
*/
function create_search_data($args,$data=array()){
  
    if(is_array($args)){
    foreach( $args as $value){
        if(is_array($value)){
         $data= create_search_data($value,$data);
        }else{
                 if(is_string($value)){
               if($value!=''){
                    $data[]=$value;   
                 }
                 }

          
        } 
    }
    }
    return $data;
}    
/**
* @description=>Cerate the single array for many array
*
* @param  =>
* @return => 
*/
function create_int_array($strings_array){
      $result_array = array();


  foreach ($strings_array as $each_number) {
     


$each_number = str_replace(array("'",'"'), "", $each_number);

      $result_array[] =  intval($each_number);
  }
  return $result_array;
}



?>