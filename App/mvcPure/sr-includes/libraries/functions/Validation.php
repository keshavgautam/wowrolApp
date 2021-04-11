<?php
    
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
       case'strip_tags':
   $goodword= validate_word('reverse_HTML_entities',$row_word);
    $goodword=strip_tags($goodword);
   
        break;
        case'extra_special_chars':
      
           $bedword = array("-", "_", "[", "]","{", "}", "<", ">",'~',"&#","`","+","=",'"',",",".",";",":","/","?","|","'");


$goodword = str_replace($bedword, "", $row_word);

        break;
          case'alphanumericHTML_entities':
      
   $row_word= validate_word('url_chars',$row_word);
   $row_word= validate_word('whitespace',$row_word);
 $goodword= validate_word('HTML_entities',$row_word);
        break;
           case'url_chars':
      //allowed => .-
           $bedword = array("[", "]","{", "}", "<", ">",'~',"&#","`","+","=",'"',",",";",":","/","?","|","'","@","#","&","%","^","*","(",")","$");


$goodword = str_replace($bedword, "", $row_word);

        break;
          case'res_chars':
      
           $bedword = array("[", "]","{", "}", "<", ">",'~',"&#","`","+","=",'"',",",";",":","/","?","|","'","@","#","&","%","^","*","(",")","$");


$goodword = str_replace($bedword, "", $row_word);

        break;
         case'sort_spf'://SOrting Specification
      
           $bedword = array("[", "]","{", "}", "<", ">",'~',"&#","`","+","=",'"',",",".",";",":","/","?","|","'","@","#","&","%","^","*","(",")","$","_","-",".");


$goodword = str_replace($bedword, "", $row_word);

        break;
            case'website_chars':
  
           $bedword = array("[", "]","{", "}", "<", ">",'~',"&#","`","+",'"',",",";","|","'","@","%","^","*","(",")","$");


$goodword = str_replace($bedword, "", $row_word);

        break;
       
        case'alphanumeric':
      
         $goodword =preg_replace('#[^a-z0-9_.]#i', '', $row_word);

        break;
        case'json':
      
         $goodword =preg_replace('#[^a-z0-9_.-]#i', '', $row_word);

        break;
     
        case'safeJSON':

              $bedword = array('{"','":','","','":"','"}','",[','","','"],["');


$goodword = str_replace($bedword, "", $row_word);
         

        break;
        case'alphanumericspace':
       
          $row_word=  validate_word('url_chars',$row_word);
             $row_word = preg_replace('/\s+/', ' ', $row_word);
         $goodword =$row_word;

        break;
         case'account_str':
       
             $bedword = array("-", "_", "[", "]","{", "}", "<", ">",'~',"&#","`","+","=",'"',",",";",":","/","?","|","'");


$goodword = str_replace($bedword, "", $row_word);

        break;
         case'search_word':
    
          $row_word=  validate_word('extra_special_chars',$row_word);
          $row_word=  validate_word('url_chars',$row_word);
        
         $row_word = strtolower($row_word);
       
          $row_word= preg_replace(array('(address_line1)', '(address_line2)','(address_line3)','(pincode_id)','(pincode)','(city)','(district)','(state)','(country)','(address)','(Address)','(phone)'), array("", "", "", "", "", "", "", "", "","","",""), $row_word);
            
        
         $row_word = preg_replace('/\s+/', ' ', $row_word);
     
          $goodword =$row_word;
        break;
        case'numeric':
      
         $goodword =preg_replace('#[^0-9.]#i', '', $row_word);

        break;
        case'numericID':
      
         $goodword =preg_replace('#[^0-9]#i', '', $row_word);

        break;
         case'whitespace':

         $goodword = preg_replace('/\s+/', '', $row_word);
         

        break;
          case'HTML_entities':

$row_word= validate_word('reverse_HTML_entities',$row_word);

          /*
      Target= ;&<>"?~`!@#$%^*()_+{}|:-/=[]\',.´×

     */

  $bedword = array("(\;)","(\&)","(\<)","(\>)",'(\")','(\?)',"(\~)","(\`)","(\!)","(\@)","(\#)","(\%)","(\^)","(\*)","(\()","(\))","(\_)","(\+)","(\{)",'(\})',"(\|)","(\:)","(\-)","(\/)","(\=)","(\[)","(\])","(\\\)","(\')","(\,)","(\.)","(´)","(×)","( )","(\n)");
  
         $replce=array(";","&amp;","&lt;","&gt;","&quot;","&quest;","~",'&grave; ',"&excl;","&commat;","&num;","&percnt;","&Hat;","&ast;","&lpar;","&rpar;","&lowbar;","&plus;","&lcub;","&rcub;","&verbar;",'&colon;',"-","&sol;","&equals;","&lsqb;","&rsqb;","&bsol;","&apos;","&comma;","&period;","&acute;","&times;","&nbsp;","<br>");




$row_word= preg_replace($bedword, $replce,$row_word);
 $search = array("[","]","<br><p>    </p>",'<br><br>');
$replace = array('&lsqb;','&rsqb;','');
$goodword = str_replace($search,$replace, $row_word);

$goodword=removeEmoji($goodword);
$goodword=  validate_word('safeJSON',$goodword);
$goodword= validate_word('whitespace',$goodword);
        break;
         case'reverse_HTML_entities':
    
      
          $bedword=array("(\;)","(\&amp\;)","(\&lt\;)","(\&gt\;)","(\&quot\;)","(\&quest\;)","(\~)",'(\&grave\;) ',"(\&excl\;)","(\&commat\;)","(\&num\;)","(\&percnt\;)","(\&Hat\;)","(\&ast\;)","(\&lpar\;)","(\&rpar\;)","(\&lowbar\;)","(\&plus\;)","(\&lcub\;)","(\&rcub\;)","(\&verbar\;)",'(\&colon\;)',"(\-)","(\&sol\;)","(\&equals\;)","(\&lsqb\;)","(\&rsqb\;)","(\&bsol\;)","(\&apos\;)","(\&comma\;)","(\&period\;)","(\&acute\;)","(\&times\;)","(\&nbsp\;)","(\<br\>) ");

      $replce= array(";","&","<",">",'"','?',"~","`","!","@","#","%","^","*","(",")","_","+","{","}","|",":","-","/","=","[","]","\\","'",",",".","´","×"," ","\n");
       
     
     
$goodword= preg_replace($bedword, $replce,$row_word);

        break;
           case'make_website_link_entities':
  
        
             $find = 
array('`((?:https?|ftp)\&colon\;\&\#x2F\;\&\#x2F\;\S+[[:alnum:]]/?)`si', '`((?<!\&\#x2F\;\&\#x2F\;)(www\&period\;\S+[[:alnum:]]/?))`si'); 
  $replace = array('<a href="$1" target="_blank">$1</a>', '<a href="http://$1" target="_blank">$1</a>'); 



 $goodword =  preg_replace($find,$replace,$row_word);



        break;
           case'make_website_link':
  
        
        $find = 
  array('`((?:https?|ftp)://\S+[[:alnum:]]/?)`si', '`((?<!//)(www\.\S+[[:alnum:]]/?))`si'); 
  $replace = array('<a href="$1" target="_blank">$1</a>', '<a href="http://$1" target="_blank">$1</a>');



 $goodword =  preg_replace($find,$replace,$row_word);



        break;
        case'sanitize_title_with_dashes':
      $row_word = preg_replace('|%([a-fA-F0-9][a-fA-F0-9])|', '---$1---', $row_word);


         $goodword =	$row_word;

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
function COOKIES_QueryVars($get_var,$validate_type){
      $query_vars='';
     if(isset($_COOKIE[$get_var])){
      $query_vars =   validate_word($validate_type,$_COOKIE[$get_var]);

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
* @description=>Validate words according to given type.
* @param  => [string($type)],[string($row_word)]
* @return => [string($row_word)]
*/ 
 function Walk_Ways_each($user_array,$validation){
    
    $collected_data=array();
    //filling with empty value
    
    foreach($user_array as $key=>$value){
   
        if(is_array( $value)){
         $collected_data[$key]= Walk_Ways_each($value,$validation);

        }else{
           $collected_data[$key]=validate_word($validation,$value); 
        }
        

    }

    return $collected_data;
}


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
function Create_res_name($resrow,$entity_data=array()){
    if($resrow['resId']=="langjs"){
       
     $Info=array( 'hash'=>md5($resrow['Last-Modified']),
             'wf'=>$entity_data['visit_data']['wf'],//Flaver
             'wg'=>$entity_data['visit_data']['wg']//lang
              );
        
  return $resrow['res'].'.'.base64_encode(json_encode($Info));
    }



    return $resrow['res'].'.'.md5($resrow['Last-Modified']);
};
/**
* @description=>GetPropertyInArray.
* @param  => [string($property)],[array($array)],[*($default)]
* @return => [string($property)]
*/
function GetPropertyInArray($property,$array,$default='',$validation=''){
    if (array_key_exists($property,$array)) {
 $default=$array[$property];
  if(is_array( $default)){
      
$default=Walk_Ways_each($default,$validation);  
  }else{
    $default= validate_word($validation,$default);  
  }



}
return $default;
}
/**
* @description=>removeEmoji
* @param  => [string(Path to dir)]
* @return => [array()]
*/
function removeEmoji($text)
    {
        $cleanText = "";

        // Match Emoticons
        $regexEmoticons = '/[\x{1F600}-\x{1F64F}]/u';
        $cleanText = preg_replace($regexEmoticons, '', $text);

        // Match Miscellaneous Symbols and Pictographs
        $regexSymbols = '/[\x{1F300}-\x{1F5FF}]/u';
        $cleanText = preg_replace($regexSymbols, '', $cleanText);

        // Match Transport And Map Symbols
        $regexTransport = '/[\x{1F680}-\x{1F6FF}]/u';
        $cleanText = preg_replace($regexTransport, '', $cleanText);

        return $cleanText;
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
* @description=>Valided  serach word.
* @param  => 
* @return => 
*/

function validateSearchWord($row_word){
    
     $row_word=  validate_word('extra_special_chars',$row_word);
     $row_word=  validate_word('url_chars',$row_word);
     $row_word = strtolower($row_word);

     $remove=array('(location_name)', '(location_id)','(id)','(pincode)','(city)','(districtname)','(statename)','(country)','(address)','(phone)','(name)','(user)','(url)','(sex)','(birthday)','(storecategory)','(keyfeature)','(SearchWord)');
  
     $row_word= preg_replace($remove,'', $row_word); 
    $row_word = str_ireplace($remove,'', $row_word); 
     $row_word = preg_replace('/\s+/', ' ', $row_word);
     $goodword =$row_word;

     return  $goodword;
}
/** Valided_ENUM($args[''],array(0,1,2),0)
* @description=>Valided  serach word.
* @param  =>  [string(row_word)|array(ENUM)|string(default)]
* @return => 
*/
function Valided_ENUM($row_word,$ENUM,$default){
    foreach($ENUM as $value){
       if($row_word==$value){
        $default=$value;   
       } 
    }
    return $default;
}


?>