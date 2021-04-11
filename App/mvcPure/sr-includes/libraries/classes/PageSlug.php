<?php

/**
* @description=>Create view from argument.
* @param  => 
* @return => 
*/
 class PageSlug{
/**
* @description=>Genrate the Unique_Slug.
*        $GLOBALS['Var_PageSlug']->Unique_Slug( 'keshavds','user','4')
* @param  => [string($slug)]
* @rule   => 1. One unique object in each type has only one slug row.
              
* @return => {"status":200,"content_slug":"test-mob-store-1","origenal_slug":"test-mob-store","error_msg":""}
*/
 public function  Unique_Slug($content_slug='',$content_type='',$content_ID='',$phrase_repeat=TRUE){
      
$content_slug=$this->sanitize_slug_with_dashes($content_slug);
$original_slug=$content_slug;    
  //--==
    $return=array('status'=>500,
                  'content_slug'=>$content_slug,
                  'origenal_slug'=>$original_slug,
                  'error_msg'=>'');
 //check for slug exits or not
    $check_slug=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'page_slug',array('content_slug'),array($content_slug));
      $base_slug='';
      switch($content_type){
       case 'buyer':
     $base_slug=$original_slug;

       break; 
      //---====---
       case 'store':
      $base_slug=$original_slug;
       break; 
       //---====---
       case 'admin_slug':
      $base_slug=$original_slug;
       break; 
       //---====---
      case 'product':
      $base_slug=$original_slug.'-product';
      $original_slug=$base_slug;
      $content_slug=$original_slug;
       break; 
       //---====---
      case 'category':
      $base_slug=$original_slug.'-category';
      $original_slug=$base_slug;
      $content_slug=$original_slug;
       break; 
         //---====---
      case 'tag':
      $base_slug=$original_slug.'-tag';
      $original_slug=$base_slug;
      $content_slug=$original_slug;
       break; 
         //---====---
      case 'cart':
        $base_slug=$original_slug.'-cart';
      $original_slug=$base_slug;
      $content_slug=$original_slug;
       break; 
          //---====---
      case 'checkout':
        $base_slug=$original_slug.'-checkout';
      $original_slug=$base_slug;
      $content_slug=$original_slug;
       break; 
         //---====---
      case 'offers':
        $base_slug=$original_slug.'-offers';
      $original_slug=$base_slug;
      $content_slug=$original_slug;
       break;
       default:
       $return['status']=500;
        $return['error_msg']='Content Type is not defined.';
    }
     //--== counting must done after $original_slug editing
      $count_original_slug=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'page_slug',array('original_slug'),array($original_slug));
    //--==
if($base_slug!=''){
    
  if($check_slug==0){//if unique
   
    
   $content_slug=  $this->Save_slug($content_ID,$content_type,$content_slug,$base_slug,$original_slug);
     $return['status']=200;
       $return['content_slug']=$content_slug;
    }else{
        if($phrase_repeat){//allow phrase repeat
     
    
    
     $content_slug=$base_slug.'-'.$count_original_slug;
     $content_slug=  $this->Save_slug($content_ID,$content_type,$content_slug,$base_slug,$original_slug);
       $return['status']=200;
       $return['content_slug']=$content_slug;
        }else{
        $return['status']=500;
        $return['error_msg']='slug_not_available'; 
        }

    }

}//base_slug!=''
    //--==
   

    return $return;
     
 }
 /**
* @description=>Save the given slug.
* @param  => [string($slug)]
* @return => 
*/
 public function Save_slug($object_id,$object_type,$content_slug,$base_slug,$original_slug,$loop=0){
    //check if object id is presented or not with $object_type
    $count_object_id=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'page_slug',array('object_id','object_type'),array($object_id,$object_type));
    if($count_object_id==0){
   //check for slug exits or not
    $count_content_slug=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'page_slug',array('content_slug'),array($content_slug));
      $count_original_slug=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'page_slug',array('original_slug'),array($original_slug));
    if($count_content_slug==0){
      
     //--==
       $slug_id=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'page_slug',array('object_id','object_type','content_slug','original_slug'),array($object_id,$object_type,$content_slug,$original_slug));   
         //--==
      
    }else{
       
       $content_slug=$base_slug.'-'.$count_original_slug;  
       if($loop>1){
        $content_slug=$base_slug.'-'.$count_original_slug.'-'.$loop;    
       }
       $loop++;
      return   $this->Save_slug($object_id,$object_type,$content_slug,$base_slug,$original_slug,$loop);


    }
    }else{//$count_object_id
       $row_object_id=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'page_slug',array('object_id','object_type'),array($object_id,$object_type));
      
      $content_slug=$row_object_id['content_slug'];   
    }
    return $content_slug;

 }

/**
* @description=>Gives  Slug_information.
* @param  => [string($slug)]
* @return => 
*/
public function Slug_information($slug){
      
    $slug_information=array();
    $slug_information['status']=500;
    $slug_information['data']=array();
    // checking slug in availble or not
   $slug_information['data']=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'page_slug',array('content_slug'),array($slug));   


   if( $slug_information['data']!=NULL){
     
     $slug_information['status']=200;
    // detecting frontentityid
     switch($slug_information['data']['object_type']){
        case 'buyer':
       $slug_information['data']['entity_id']= $slug_information['data']['object_id'];
        break;
        case 'store':
    $slug_information['data']['entity_id']= $slug_information['data']['object_id'];
        break;
        case 'product':
      $product_information=$GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'productPage','product_id'=>$slug_information['data']['object_id'])); 

  $slug_information['data']['entity_id']=$product_information[0]['entity_id'];
 $slug_information['objectInfo']= $product_information;       
        break;
        case 'category':
       $product_information=$GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'categoriesPage','category_id'=>$slug_information['data']['object_id']));
    
  $slug_information['data']['entity_id']= $product_information[0]['entity_id'];
   $slug_information['objectInfo']= $product_information;    
        break;
        case 'checkins':
$checkin_id =GET_QueryVars('id','url_chars');
   if($checkin_id!=''){
  $checkin_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'checkins', array('checkIn_id'),array($checkin_id));
          
    if($checkin_row!=NULL){
     $slug_information['data']['entity_id']= $checkin_row['store_id']; 
     $slug_information['objectInfo']=  $checkin_row;           
    }else{
       $slug_information['data']  = $this->DummyErrorSlug();
    }
             
   }else{
     $slug_information['data']  =  $this->DummyErrorSlug(); 
   }


        break;
        case 'checkout':
   
        break;
        case 'admin_slug':
      $slug_information['data']['entity_id']= $GLOBALS['Var_ActorEntityData']['EntityData']['entity_id'];
        break;
    }



    }


    return $slug_information;
 }
 /**
* @description=>sanitize_slug_with_dashes.
* @param  => [string($slug)]
* @return => 
*/
 public function sanitize_slug_with_dashes($slug){
    
 $slug =validate_word('reverse_HTML_entities',$slug);
   $slug= removeEmoji($slug);
    $slug =validate_word('url_chars',$slug);
    
		if ($this->seems_utf8( $slug)) {
		if (function_exists('mb_strtolower')) {
			 $slug = mb_strtolower( $slug, 'UTF-8');
        }else{
             $slug = strtolower($slug);
        }
	}
  
    $slug = str_replace('.', '-', $slug);
    $slug = preg_replace('/\s+/', '-', $slug);
   
 $slug=mb_substr($slug, 0,80,'UTF-8');  
  
    return $slug;
 }
  /**
 * Checks to see if a string is utf8 encoded.
 *
 * NOTE: This function checks for 5-Byte sequences, UTF8
 *       has Bytes Sequences with a maximum length of 4.
 *
 * @author bmorel at ssi dot fr (modified)
 * @since 1.2.1
 *
 * @param string $str The string to be checked
 * @return bool True if $str fits a UTF-8 model, false otherwise.
 */
public function seems_utf8($str) {
	$length = strlen($str);
	for ($i=0; $i < $length; $i++) {
		$c = ord($str[$i]);
		if ($c < 0x80) $n = 0; # 0bbbbbbb
		elseif (($c & 0xE0) == 0xC0) $n=1; # 110bbbbb
		elseif (($c & 0xF0) == 0xE0) $n=2; # 1110bbbb
		elseif (($c & 0xF8) == 0xF0) $n=3; # 11110bbb
		elseif (($c & 0xFC) == 0xF8) $n=4; # 111110bb
		elseif (($c & 0xFE) == 0xFC) $n=5; # 1111110b
		else return false; # Does not match any model
		for ($j=0; $j<$n; $j++) { # n bytes matching 10bbbbbb follow ?
			if ((++$i == $length) || ((ord($str[$i]) & 0xC0) != 0x80))
				return false;
		}
	}
	return true;
}  

 
/**
* @description=>update slug id.
* @param  => [string($slug)]
* @return => 
*/
public function Update_object_id($content_slug,$object_id){
     $has=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'page_slug',array('content_slug'),array($content_slug));
     if($has>0){
  $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'page_slug',array('object_id'),array($object_id),array('content_slug'),array($content_slug));  
     }

}
/**
* @description=>Dummy Error slug .,Use for check in slug
* @param  => [string($slug)]
* @return => 
*/
public function DummyErrorSlug(){
    $Slug=array('slug_id' => '','object_id' => 'error','object_type' => 'admin_slug','content_slug' => 'error','original_slug' => 'error'); 
     $Slug['entity_id']= $GLOBALS['Var_ActorEntityData']['EntityData']['entity_id'];
   return   $Slug; 
}

 }
 $GLOBALS['Var_PageSlug'] =new PageSlug();


?>