<?php
    

/**
* @description=>check_response.
* @param  => 
* @return => 
*/
function check_response($arg){
    
     $dir = ROOT.'/';
     $txt=date("F j, Y, g:i a").' '.json_encode($arg, JSON_UNESCAPED_UNICODE)."\r\n";
       file_put_contents($dir."response.txt",$txt, FILE_APPEND);
    
}
    /**
* @description=>Validate words according to given type.
* @param  => [string($type)],[string($row_word)]
* @return => [string($row_word)]
*/
function  validate_word($type,$row_word){
    if(is_array($row_word)){
      check_response($row_word);  
    }
    
  $row_word=  trim($row_word);
 $goodword=$row_word;
    switch($type){
        case'url_chars':
      //allowed => .-
           $bedword = array("[", "]","{", "}", "<", ">",'~',"&#","`","+","=",'"',",",";",":","/","?","|","'","@","#","&","%","^","*","(",")","$");


$goodword = str_replace($bedword, "", $row_word);

        break;
          case'res_chars':
      
           $bedword = array("[", "]","{", "}", "<", ">",'~',"&#","`","+","=",'"',",",";",":","/","?","|","'","@","#","&","%","^","*","(",")","$");


$goodword = str_replace($bedword, "", $row_word);

        break;
          case'alphanumeric':
      
         $goodword =preg_replace('#[^a-z0-9_.]#i', '', $row_word);

        break;

    }
    return $goodword;
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
/**
* @description=>Validate words according to given type.
* @param  => [string($type)],[string($row_word)]
* @return => [string($row_word)]
*/ 
  function post_vars($required=array(),$main_array,$validate_type){
     $query_vars='';
   if(is_array($required)){
     foreach($required as $required_key=>$required_value){
         if(isset($main_array[$required_key])){
             
             if(is_array($main_array[$required_key])){
                 $query_vars=post_vars($required_value,$main_array[$required_key],$validate_type);   
             }else{
                 $query_vars=validate_word($validate_type,$main_array[$required_key]);
             }

         }

     }
    }

     return  $query_vars;
 }
/**
* @description=>get_file($path).
* @param  => [string($type)],[string($row_word)]
* @return => [string($row_word)]
*/

function get_file($path) {

    $file='';
    if(is_readable($path)){
   $file=file_get_contents($path);  
   
    }else{
         $file='console.log(\'Res Not  Found ==>"'.$path.'" \');';

    }
	return $file;
}

/**
* @description=>Create the res path from the res lib row.
* @param  => [string($reslib row)]
* @return => [string(file_get_contents)]
*/
function Create_res_path($flaver="mob"){
    $url=CDNSTATIC;
    $assets='assets/mob';
    switch($flaver){
       case 'web':
    $assets='assets/web';
       break;
    }


  $url.=$assets;
    return $url;
}

/**
* @description=>dirToArray.
* @param  => [string(Path to dir)]
* @return => [array()]
*/
 function dirToArray($dir) { 
   
   $result = array(); 

   $cdir = scandir($dir); 
   foreach ($cdir as $key => $value) 
   { 
      if (!in_array($value,array(".",".."))) 
      { 
         if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) 
         { 
            $result[$value] = dirToArray($dir . DIRECTORY_SEPARATOR . $value); 
         } 
         else 
         { 
            $result[] = $value; 
         } 
      } 
   } 
   
   return $result; 
} 
 /**
* @description=>get resId from the  path .
* @param  => [string($path)]
* @return => [string(resId)]
*/
function resInfo(){
 $path = GET_QueryVars('path','res_chars'); 
$pieces = explode(".",  $path);

$Info=array('res'=>$pieces[0],
             'hash'=>'',
             'wf'=>'mob',//Flaver
             'wg'=>'en'//lang
              );
if(isset($pieces[1])){
    $basedecode=base64_decode($pieces[1]);
  
    if($basedecode!=FALSE){
    $json_decode=json_decode($basedecode,true);
    if($json_decode!=FALSE&&$json_decode!=NULL){
      $Info['hash']=GetPropertyInArray('hash',$json_decode,'');
      $Info['wf']=GetPropertyInArray('wf',$json_decode,'mob');
     $Info['wg']=GetPropertyInArray('wg',$json_decode,'en');    
    } 
    }
  
}


return $Info;
}

/**
* @description=>GetPropertyInArray.
* @param  => [string($property)],[array($array)],[*($default)]
* @return => [string($property)]
*/
function GetPropertyInArray($property,$array,$default=''){
    if (array_key_exists($property,$array)) {
 $default=$array[$property];
}
return $default;
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
* @description=>array merge.
* @param  => [array($array2)=>default,array($array1)=>Saved in databse]
* @return => [array()]
*/
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




?>