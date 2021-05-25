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

    $num=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'product_varients', $a,$b);
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
    $VMenu=array();$i=0;

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
          $VMenu[$i]=array();
 $VMenu[$i]['id']=validate_word('alphanumeric',$value['id']);
 $VMenu[$i]['item_sid']=validate_word('numericID',$value['item_sid']);
 $VMenu[$i]['label']=validate_word('HTML_entities',$value['label']);
 //$VMenu[$i]['label']=validate_word('whitespace', $VMenu[$i]['label']);

 $VMenu[$i]['parent']=(isset($value['parent']))?validate_word('alphanumeric',$value['parent']):NULL;
$VMenu[$i]['parent_sid']=validate_word('numericID',$value['parent_sid']);
$VMenu[$i]['slug']=validate_word('url_chars',$value['slug']);
$VMenu[$i]['term']=validate_word('HTML_entities',$value['term']);

 $VMenu[$i]['type']=validate_word('alphanumeric',$value['type']);
// check_response('reporing from ValidateStoreMenu($Menu) $VMenu $Row is');
  // check_response( $VMenu[$i]);




   $i++;

            } else{
  check_response('reporing from ValidateStoreMenu($Menu)');
  check_response( $value);
            }
//  check_response('reporing from ValidateStoreMenu($Menu) $VMenu is');
 //  check_response(  $VMenu);

        }


    }else{
          check_response('reporing from ValidateStoreMenu($Menu) please give us a array');
    }


    return  $VMenu;
}

/**$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>''))
* @description=>
* @param  =>
* @return =>
*/
public function IsValidObject_M($args=array()){
    $getrow =NULL;
    switch($args['type']){

     case 'acccount_row':
       $selectsql='
       SELECT DISTINCT *
FROM  '.DB_NAME.'.account_login_identity a ,'.DB_NAME.'.accounts b,'.DB_NAME.'.login c
WHERE a.login_identity_id ="'.$args['login_identity_id'].'"
AND b.account_id=a.account_id
AND c.login_id=b.login_id
LIMIT 1  ';

    $result= $GLOBALS['Var_DBMysqli']->query($selectsql);

    if(count($result)>0){
      $getrow= $result[0];
    }else{
       $getrow=NULL;
    }

     break;


   case 'validentity_id':

    $a=array('entity_id');
    $b=array($args['entity_id']);
    $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'entity', $a,$b);

 $getrow=$GLOBALS['Var_ViewParse']->ParseEntityRow($getrow);
        break;
   case 'EntityRowByArray':

   if(is_array($args['entity_id_Array'])&&is_index_array($args['entity_id_Array'])){
       $entity_id_Array=array();
       foreach($args['entity_id_Array'] as $row ){
           if($row!=''&&$row!=0&&$row!=NULL){
                  $entity_id_Array[]=$row;
           }
       }


       $entity_s=implode(",", $entity_id_Array);
       $entity_s=($entity_s=='')?'""':$entity_s;
  $selectsql='SELECT DISTINCT *
FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
WHERE  p.entity_id IN ('.$entity_s.')
 AND  CAST(q.object_id As SIGNED) =p.entity_id
 AND (q.object_type="buyer"||q.object_type="store"||q.object_type="LocationManager"||q.object_type="company")


  ';
    $getrow= $GLOBALS['Var_DBMysqli']->query($selectsql);

    if(count($getrow)>0){
        for($i=0;$i<count($getrow);$i++){
      $getrow[$i]=$GLOBALS['Var_ViewParse']->ParseEntityRow( $getrow[$i]);
        }
    }
  }
        break;
   case 'ConverssationRowByArray':

   if(is_array($args['conversation_id_Array'])&&is_index_array($args['conversation_id_Array'])){

  $selectsql='SELECT * , a.conversation_id as conversation_id FROM '.DB_NAME.'.conversation  a
   LEFT JOIN   '.DB_NAME.'.checkins  b
   ON ( a.conversation_type=1 AND  b.checkIn_id =a.checkIn_id)
   WHERE  a.conversation_id IN ('.implode(",",$args['conversation_id_Array']).')
   AND a.members LIKE \'%"'.$args['entity_id'].'"%\'
  ';
    $getrow= $GLOBALS['Var_DBMysqli']->query($selectsql);;

    if(count($getrow)>0){
        for($i=0;$i<count($getrow);$i++){

 $getrow[$i]=  $GLOBALS['Var_Conversation']->ParseConversationRowToNormal($getrow[$i]);
        }
    }
  }
        break;



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
       case 'validownerCategory_id':

     $a=array('category_id','entity_id');
    $b=array($args['category_id'],$args['entity_id']);
    $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'store_categories', $a,$b);


        break;
        case 'validownerCategory_idByArray':

 if(is_array($args['category_id_Array'])&&is_index_array($args['category_id_Array'])){
       $category_id_Array=array();
       foreach($args['category_id_Array'] as $row ){
           if($row!=''&&$row!=0&&$row!=NULL){
                  $category_id_Array[]=$row;
           }
       }


       $category_id_s=implode(",", $category_id_Array);
       $category_id_s=($category_id_s=='')?'""':$category_id_s;
  $selectsql='SELECT * FROM '.DB_NAME.'.store_categories a,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.entity_id='.$args['entity_id'].'
 AND  a.deleted =0
 AND a.category_id  IN ('.$category_id_s.')
 AND  CAST(b.object_id As SIGNED) =a.category_id
 AND  b.object_type ="category"
 AND c.spread_id=a.spread_id';

    $getrow= $GLOBALS['Var_DBMysqli']->query($selectsql);


  }


        break;
      case 'validownercompanyCategory_idByArray':

 if(is_array($args['category_id_Array'])&&is_index_array($args['category_id_Array'])){
       $category_id_Array=array();
       foreach($args['category_id_Array'] as $row ){
           if($row!=''&&$row!=0&&$row!=NULL){
                  $category_id_Array[]=$row;
           }
       }


       $category_id_s=implode(",", $category_id_Array);
       $category_id_s=($category_id_s=='')?'""':$category_id_s;
  $selectsql='SELECT * FROM '.DB_NAME.'.company_categories a,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.entity_id='.$args['entity_id'].'
 AND  a.deleted =0
 AND a.category_id  IN ('.$category_id_s.')
 AND  CAST(b.object_id As SIGNED) =a.category_id
 AND  b.object_type ="company-category"
 AND c.spread_id=a.spread_id';

    $getrow= $GLOBALS['Var_DBMysqli']->query($selectsql);


  }


        break;
       case 'validcheckin_id':




   $result=$GLOBALS['Var_DBMysqli']->query('SELECT * FROM '.DB_NAME.'.checkins  a , '.DB_NAME.'.conversation  b
   WHERE a.checkIn_id = '.$args['checkIn_id'].'
   AND  a.conversation_id = b.conversation_id
   AND b.members LIKE \'%"'.$args['entity_id'].'"%\'
    ');
    if(count( $result)>0){
         $getrow=$result[0];

$NormalToArray =$GLOBALS['Var_Conversation']->ParseConversationRowToNormal($getrow);
 $getrow['last_check_time']=$NormalToArray['last_check_time'];
 $getrow['history_cleared_till']= $NormalToArray['history_cleared_till'];
$getrow['members']=$NormalToArray['members'];

    }else{
           $getrow=NULL;
    }

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
     case 'validOrderOwnerStoreid':
    $a=array('order_id','store_entity_id');
    $b=array($args['order_id'],$args['store_entity_id']);

    $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'orders', $a,$b);


        break;
   case 'validOrderOwnerbuyerid':
    $a=array('order_id','buyer_entity_id');
    $b=array($args['order_id'],$args['buyer_entity_id']);

    $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'orders', $a,$b);


        break;
case 'validCountryInfo':
 $a=array('countryinfo_id');
 $b=array($args['countryinfo_id']);

    $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'countryinfo', $a,$b);
break;
case 'valid_fl_admin_id':
 $a=array('fl_admin_id','country_id');
 $b=array($args['fl_admin_id'],$args['countryinfo_id']);

    $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'location_fl_admin', $a,$b);
break;

case 'valid_city_id_by_fl_admin_id':
/*
 $a=array('location_id','city_id','fl_admin_id');
 $b=array($args['city_id'],$args['city_id'],$args['fl_admin_id']);

 @change on 28 -12- 2016

*/


 $a=array('location_id','fl_admin_id');
 $b=array($args['city_id'],$args['fl_admin_id']);

    $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'locations', $a,$b);
break;
case 'valid_town_id_by_city_id_by_fl_admin_id':
 $a=array('location_id','city_id','fl_admin_id','locationtype');
 $b=array($args['town_id'],$args['city_id'],$args['fl_admin_id'],1);
 $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'locations', $a,$b);
break;
case 'valid_postalcode_id':
 $a=array('postalCode_id');
 $b=array($args['postalCode_id']);

  $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'location_postalcode', $a,$b);
break;
case 'valid_address_id':
 $a=array('address_id','entity_id');
 $b=array($args['address_id'],$args['entity_id']);

  $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'address', $a,$b);
break;
case 'validconversation_id':
  //$getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'conversation',array('conversation_id'),array($args['conversation_id']));
     $result=$GLOBALS['Var_DBMysqli']->query('SELECT * FROM '.DB_NAME.'.conversation  a
   WHERE  a.conversation_id = '.$args['conversation_id'].'
   AND a.members LIKE \'%"'.$args['entity_id'].'"%\'
    ');
    if(count( $result)>0){
         $getrow=$result[0];
$getrow=  $GLOBALS['Var_Conversation']->ParseConversationRowToNormal($getrow);
    }
break;
      case 'validconversation_cum_checkin_id':




   $result=$GLOBALS['Var_DBMysqli']->query('SELECT * , a.conversation_id as Conversation_id FROM '.DB_NAME.'.conversation  a
   LEFT JOIN   '.DB_NAME.'.checkins  b
   ON ( a.conversation_type=1 AND  b.checkIn_id =a.checkIn_id)
   WHERE  a.conversation_id = '.$args['conversation_id'].'
   AND a.members LIKE \'%"'.$args['entity_id'].'"%\'
    ');
    if(count( $result)>0){
         $getrow=$result[0];

$NormalToArray =$GLOBALS['Var_Conversation']->ParseConversationRowToNormal($getrow);
 $getrow['last_check_time']=$NormalToArray['last_check_time'];
 $getrow['history_cleared_till']= $NormalToArray['history_cleared_till'];
$getrow['members']=$NormalToArray['members'];

    }else{
           $getrow=NULL;
    }

        break;
case 'valid_collection_id':

if(is_array($args['collection_id'])){
  $collection_id='"'.implode('","',$args['collection_id']).'"';
}else{
   if($args['collection_id']==''){
     $collection_id='""';
   }else{
        $collection_id=$args['collection_id'];
   }

}


   $result=$GLOBALS['Var_DBMysqli']->query('SELECT *  FROM '.DB_NAME.'.store_collections  a,'.DB_NAME.'.page_slug b

   WHERE  a.collection_id IN ('.$collection_id.')
   AND  a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.collection_id
 AND  b.object_type ="collection"
    ');


      if(count( $result)>0){

if(is_array($args['collection_id'])){
        $getrow=$result;
}else{
         $getrow=$result[0];
}


    }else{
           $getrow=array();  
    }



break;

case 'valid_location_id':
 $a=array('location_id');
 $b=array($args['location_id']);
 $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'locations', $a,$b);


 $result=$GLOBALS['Var_DBMysqli']->query('SELECT *  FROM '.DB_NAME.'.locations  a,'.DB_NAME.'.location_cities b ,'.DB_NAME.'.location_postalcode c ,'.DB_NAME.'.location_fl_admin d ,'.DB_NAME.'.countryinfo e

   WHERE  a.location_id  = '.$args['location_id'].'
   AND  a.city_id =b.city_id
   AND  a.postalCode_id =c.postalCode_id
   AND  a.fl_admin_id =d.fl_admin_id
   AND  a.country_id =e.countryinfo_id
   LIMIT 1
    ');


      if(count( $result)>0){

   $getrow=$result[0];


    }else{
           $getrow=NULL;
    }


break;

case 'valid_advertise_id':
 $result=$GLOBALS['Var_DBMysqli']->query(' SELECT * FROM '.DB_NAME_ADVERTISING.'.advertisement a ,'.DB_NAME_ADVERTISING.'.advertise_text_content b
 WHERE a.advertisement_id='.$args['advertisement_id'].'
 AND  a.entity_id='.$args['entity_id'].'
 AND b.advertisement_id=a.advertisement_id');

    if(count( $result)>0){

   $getrow=$result[0];


    }else{
           $getrow=NULL;
    }
break;

case 'validownercompanycategories_id':
     $a=array('category_id','entity_id');
    $b=array($args['category_id'],$args['entity_id']);
    $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'company_categories', $a,$b);


break;


case 'isOwnerBrand':
  $a=array('brand_id','entity_id');
    $b=array($args['brand_id'],$args['entity_id']);
    $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'company_brand', $a,$b);
break;

case 'isValidBrandForPublic':
 $result=$GLOBALS['Var_DBMysqli']->query(' SELECT * FROM '.DB_NAME.'.company_brand a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.brand_id = '.$args['brand_id'].'
  AND  a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.brand_id
  AND  b.object_type ="brand"
  AND c.spread_id=a.spread_id
  ');

    if(count( $result)>0){

   $getrow=$result[0];


    }else{
           $getrow=NULL;
    }



break;

case 'isValidBrandVarientIdArray':

   if(is_array($args['Varient_id_Array'])&&is_index_array($args['Varient_id_Array'])){
       $Varient_id_Array=array();
       foreach($args['Varient_id_Array'] as $row ){
           if($row!=''&&$row!=0&&$row!=NULL){
                  $Varient_id_Array[]=$row;
           }
       }


       $Varient_s=implode(",", $Varient_id_Array);
       $Varient_s=($Varient_s=='')?'""':$Varient_s;

  $selectsql='SELECT * FROM '.DB_NAME.'.company_brand_varient a
 WHERE a.brand_id='.$args['brand_id'].'
 AND a.brand_varient_id  IN ('.$Varient_s.')
 AND  a.deleted =0 ';

    $result= $GLOBALS['Var_DBMysqli']->query($selectsql);

       if(count( $result)>0){

   $getrow=$result;


    }else{
           $getrow=NULL;
    }
  }


break;

case 'Is_valid_product':

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

/*
* @description=>
* @call  => $GLOBALS['Var_UtilityCheck']->IsFriend_oF_Friend($enityId_1,$enityId_2);
* @param  =>
* @return =>
*/
public function  IsFriend_oF_Friend($enityId_1,$enityId_2){

      $freindsSql='SELECT   DISTINCT entity_id
 FROM
    ( (SELECT twrFa.to_id as entity_id
                           FROM '.DB_NAME.'.relation_two_way twrFa
                           WHERE twrFa.current_status=3
                           AND (twrFa.from_id='.$enityId_1.'))
           UNION ALL
     (SELECT twrFb.from_id as entity_id
                           FROM '.DB_NAME.'.relation_two_way twrFb
                           WHERE twrFb.current_status=3
                           AND (twrFb.to_id='.$enityId_1.')) ) as entity_id
              ';


$FreindOfFreindRelationSql_0='SELECT  DISTINCT twrFOF.to_id as  entity_id
                           FROM '.DB_NAME.'.relation_two_way twrFOF
                           WHERE twrFOF.current_status=3
                           AND   twrFOF.from_id IN ('.$freindsSql.')
                           AND   twrFOF.to_id = '.$enityId_2.'
                          ';
$FreindOfFreindRelationSql_1='SELECT  DISTINCT twrFOF.from_id as  entity_id
                           FROM '.DB_NAME.'.relation_two_way twrFOF
                           WHERE twrFOF.current_status=3
                           AND   twrFOF.to_id IN ('.$freindsSql.')
                           AND   twrFOF.from_id = '.$enityId_2.'
                          ';
$numsql='SELECT    COUNT(entity_id)  FROM
 ( ('.$FreindOfFreindRelationSql_0.')   UNION ALL ('.$FreindOfFreindRelationSql_1.')    ) as entity_id';


 $num=$GLOBALS['Var_DBMysqli']->numquery($numsql);
       if($num>0){
        $return=TRUE;

    }else{
         $return=FALSE;
    }
    return $return;
}


/*
*/
public function IsAllowGoOnShopping($enityId_1,$enityId_2){

    return TRUE;
}


/**GLOBALS['Var_UtilityCheck']->VerifyRecaptcha()
* @description=>
* @param  =>
* @return =>
*/

public function VerifyRecaptcha($response){
    $ret=FALSE;$curlresponseArr=array('success'=>FALSE);$curlresponse='';

    $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));

 if(SERVER_MODE=="DEVELOPMENT"){


       $curl = new Curl\Curl();
       if(SSL_USE==FALSE){
       $curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
       }

$curlresponse= $curl->post('https://www.google.com/recaptcha/api/siteverify', array(
    'secret' => '6LfgvyQTAAAAAJpD2ikxvDiKQZWI7qR1OrPMUspB',
    'response' => $response,
    'remoteip'=> $ip
));





    //  $ret=TRUE;
 }else{

          $curl = new Curl\Curl();
  if(SSL_USE==FALSE){
       $curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
       }
$curlresponse = $curl->post('https://www.google.com/recaptcha/api/siteverify', array(
    'secret' => '6LfgvyQTAAAAAJpD2ikxvDiKQZWI7qR1OrPMUspB',
    'response' => $response,
    'remoteip'=> $ip
));


 }
    $curlresponse=json_encode($curlresponse);



 // check_response($curlresponse);

$curlresponseArr= JsonTrueDecode($curlresponse,$curlresponseArr);
// check_response($curlresponseArr);
if(count($curlresponseArr)>0||($curlresponseArr!=FALSE)){
    $result= GetPropertyInArray('success',$curlresponseArr);
    if( $result=='false'){
      $ret=FALSE;
    }else{
        $ret=TRUE;
    }


}

 // $ret=FALSE;
    return $ret;

}

/**GLOBALS['Var_UtilityCheck']->ValidPincode($formate,$regx,$rawpincode)
* @description=>
* @param  =>
* @return =>
*/
public function ValidPincode($formate,$regx,$rawpincode){
  $ret=FALSE;
    if ( preg_match('/'.$regx.'/',$rawpincode, $matches)) {
      $ret=TRUE;
    }
    return $ret;
}


/**GLOBALS['Var_UtilityCheck']->IsAllowTagging()
* @description=>
* @param  =>
* @return =>
*/

 public function IsAllowTagging($frontuser_EntityRow,$actoruser_EntityRow){

    $EntityInformation= new DirectEntityRelation($frontuser_EntityRow,$actoruser_EntityRow);

    return $EntityInformation->IsAllowTagging();
 }

 /**GLOBALS['Var_UtilityCheck']->ProfileCompleteCheck()
* @description=>
* @param  =>
* @return =>
*/

 public function ProfileCompleteCheck($EntityRow){
     $parseData=array();
       switch($EntityRow['type']){
          case 0:
   $parseData=$EntityRow['private_data']['profile_complete'];
          break;
          case 1:
   $parseData=$EntityRow['private_data']['profile_complete'];
          break;
       }
     return   $parseData;
 }



 /**$GLOBALS['Var_UtilityCheck']->IsOwnerSpread($SpreadId,$EntityId)
* @description=>collection of UtilityCheck function .
* @param  =>
* @return =>
*/
public function IsOwnerCompanyCategory($cid,$EntityId){
         $a=array('category_id','entity_id');
    $b=array($cid,$EntityId);

    $num=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'company_categories', $a,$b);
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
public function IsOwnerBrand($pid,$EntityId){
         $a=array('brand_id','entity_id');
    $b=array($pid,$EntityId);

    $num=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'company_brand', $a,$b);
    if($num>0){
        $return=TRUE;

    }else{
         $return=FALSE;
    }
    return $return;

}



/**$GLOBALS['Var_UtilityCheck']->IsValidBrandVarients($EntityId)
* @description=>collection of UtilityCheck function .
* @param  =>
* @return =>
*/
public function IsValidBrandVarients($brand_varient_id,$brand_id){
      $a=array('brand_varient_id','brand_id');
    $b=array($brand_varient_id,$brand_id);

    $num=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'company_brand_varient', $a,$b);
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
