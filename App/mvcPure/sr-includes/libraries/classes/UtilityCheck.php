<?php
    

/**
* @description=>collection of UtilityCheck function .
* @param  => 
* @return => 
*/    
class UtilityCheck{
/**$GLOBALS['Var_UtilityCheck']->IsValidEntity($EntityId)
* @description=>collection of UtilityCheck function .
* @param  => 
* @return => 
*/ 
public function IsValidEntity($EntityId){
      $a=array('entity_id');
    $b=array($EntityId);
    
    $num=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'entity', $a,$b);
    if($num>0){
        $return=TRUE;

    }else{
         $return=FALSE; 
    }
    return $return;
} 
/**$GLOBALS['Var_UtilityCheck']->IsValidEntity($EntityId)
* @description=>collection of UtilityCheck function .
* @param  => 
* @return => 
*/ 
public function IsValidProduct($ProductId,$EntityId){
      $a=array('product_id','entity_id');
    $b=array($ProductId,$EntityId);
    
    $num=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'store_products', $a,$b);
    if($num>0){
        $return=TRUE;

    }else{
         $return=FALSE; 
    }
    return $return;
} 


/**$GLOBALS['Var_UtilityCheck']->IsValidEntity($EntityId)
* @description=>collection of UtilityCheck function .
* @param  => 
* @return => 
*/ 
public function IsValidVarients($varient_id,$product_id){
      $a=array('varient_id','product_id');
    $b=array($varient_id,$product_id);
    
    $num=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'product_varients', $a,$b);
    if($num>0){
        $return=TRUE;

    }else{
         $return=FALSE; 
    }
    return $return;
} 


/**$GLOBALS['Var_UtilityCheck']->IsOwnerSpread($SpreadId,$EntityId)
* @description=>collection of UtilityCheck function .
* @param  => 
* @return => 
*/ 
public function IsOwnerSpread($SpreadId,$EntityId){
      $a=array('spread_id','entity_id');
    $b=array($SpreadId,$EntityId);
    
    $num=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'spread', $a,$b);
    if($num>0){
        $return=TRUE;

    }else{
         $return=FALSE; 
    }
    return $return;
} 
/**$GLOBALS['Var_UtilityCheck']->IsOwnerSpread($SpreadId,$EntityId)
* @description=>collection of UtilityCheck function .
* @param  => 
* @return => 
*/
public function IsOwnerCategory($cid,$EntityId){
         $a=array('category_id','entity_id');
    $b=array($cid,$EntityId);
    
    $num=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'store_categories', $a,$b);
    if($num>0){
        $return=TRUE;

    }else{
         $return=FALSE; 
    }
    return $return; 

}
/**$GLOBALS['Var_UtilityCheck']->IsOwnerSpread($SpreadId,$EntityId)
* @description=>collection of UtilityCheck function .
* @param  => 
* @return => 
*/
public function IsOwnerProduct($pid,$EntityId){
         $a=array('product_id','entity_id');
    $b=array($pid,$EntityId);
    
    $num=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'store_products', $a,$b);
    if($num>0){
        $return=TRUE;

    }else{
         $return=FALSE; 
    }
    return $return; 

}
// ======= M For Modified Method . it get row instead of num row
/**$GLOBALS['Var_UtilityCheck']->IsOwnerProduct_M($SpreadId,$EntityId)
* @description=>collection of UtilityCheck function .
* @param  => 
* @return => 
*/
public function IsOwnerProduct_M($pid,$EntityId){
         $a=array('product_id','entity_id');
    $b=array($pid,$EntityId);
    
    $getrow= $GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_products','entity_id'=>$EntityId,'product_id'=>$pid));
    return  $getrow[0] ;

}
/**$GLOBALS['Var_UtilityCheck']->IsOwnerProduct_M($SpreadId,$EntityId)
* @description=>collection of UtilityCheck function .
* @param  => 
* @return => 
*/
public function IsOwnerShipping_M($spgid,$EntityId){
         $a=array('shipping_id','entity_id');
    $b=array($spgid,$EntityId);
    
    $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'store_shipping', $a,$b);
   
    return  $getrow ;

}


/**$GLOBALS['Var_UtilityCheck']->IsUnique('',array(),array())
* @description=>collection of UtilityCheck function .
* @param  => 
* @return => 
*/
public function IsUnique($table,$a,$b){

 $check_unique=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,$table,$a,$b);
         $unique=($check_unique>0)? FALSE:TRUE; 

         return $unique;

} 


/**$GLOBALS['Var_UtilityCheck']->ValidateStoreMenu($Menu)
* @description=>validate store menu submission 
* @param  => 
* @return => 
*/
public function ValidateStoreMenu($Menu){
    $VMenu=array();
  
    if(is_array($Menu)){
        
        foreach($Menu as $value){
         if(
            isset($value['id'])   &&
            isset($value['item_sid'])   &&
            isset($value['label'])   &&
            isset($value['parent_sid'])   &&
            isset($value['slug'])   &&
            isset($value['term'])   &&
            isset($value['type'])
            ){
           $Row=array();  
$Row['id']=validate_word('alphanumeric',$value['id']);
$Row['item_sid']=validate_word('numericID',$value['item_sid']);
$Row['label']=validate_word('HTML_entities',$value['label']);
$Row['parent']=(isset($value['parent']))?validate_word('alphanumeric',$value['parent']):NULL;
$Row['parent_sid']=validate_word('numericID',$value['parent_sid']);
$Row['slug']=validate_word('url_chars',$value['slug']);
$Row['term']=validate_word('HTML_entities',$value['term']);
$Row['type']=validate_word('alphanumeric',$value['type']);

 $VMenu[]=$Row;


         } 



        }


    }


    return  $VMenu;
}

/**$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>''))
* @description=>
* @param  => 
* @return => 
*/
public function IsValidObject_M($args=array()){
    
    switch($args['type']){
        case 'validCategory':
    $a=array('category_id');
    $b=array($args['category_id']);
    
    $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'store_categories', $a,$b);
   
  
        break;
        case 'validCategoryAlldata':
  
    
    $RetriveById=$GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_categories','entity_id'=>$args['entity_id'],'category_id'=>$args['category_id']));
   if(count($RetriveById)>0){
     $getrow =$RetriveById[0] ;  
   }else{
          $getrow =NULL;   
   }

        break;
       case 'validcheckin_id':
    $a=array('checkIn_id');
    $b=array($args['checkIn_id']);
    
    $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'checkins', $a,$b);
   
  
        break;
           case 'validspread_id':
    $a=array('spread_id');
    $b=array($args['spread_id']);
    
    $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'spread', $a,$b);
   
  
        break;
           case 'validspreadowner_id':
    $a=array('spread_id','entity_id');
    $b=array($args['spread_id'],$args['entity_id']);
    
    $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'spread', $a,$b);
   
  
        break;
     case 'validownercomment_id':
    $a=array('spread_comment_id','spread_id','entity_id');
    $b=array($args['comment_id'],$args['spread_id'],$args['entity_id']);
    $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'spread_comments', $a,$b);
   
  
        break;
   case 'validcomment_id':
    $a=array('spread_comment_id','spread_id');
    $b=array($args['comment_id'],$args['spread_id']);
    $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'spread_comments', $a,$b);
   
  
        break;
       case 'getlastReviewRow':
    $a=array('spread_id','entity_id');
    $b=array($args['spread_id'],$args['entity_id']);
    $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'spread_comments', $a,$b);
   
  
        break;
       
    }
  return  $getrow ;
}

/**
* @description=>
* @param  => 
* @return => 
*/
public function IsFriend($enityId_1,$enityId_2){

    $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.relation_two_way a
                           WHERE a.current_status="3"
                           AND ((a.from_id="'.$enityId_1.'" && a.to_id="'.$enityId_2.'")||a.from_id="'.$enityId_2.'" && a.to_id="'.$enityId_1.'")
  ';
    $num=$GLOBALS['Var_DBMysqli']->numquery($numsql);
      if($num>0){
        $return=TRUE;

    }else{
         $return=FALSE; 
    }
    return $return; 
}



}


$GLOBALS['Var_UtilityCheck'] =new UtilityCheck();

?>