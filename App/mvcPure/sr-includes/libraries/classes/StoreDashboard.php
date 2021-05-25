<?php
    


/**
* @description=>StoreDashboard handle dashborad opration.
* @param  => 
* @return => 
*/
class StoreDashboard{
   
   
//-------===registration====------------ 
/**
* @description=>ragister a category.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/   
public function RagisterCategory($args=array()){
    //In Order to save one sql query We use getrow instead of numrow
      $get_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'store_categories', array('entity_id','category_id'),array($args['entity_id'],$args['category_id']));
   
     
         if($get_row!=NULL){
           //update
        $edit_history=   JsonTrueDecode($get_row['edit_history'],$GLOBALS['Var_BundlePrototype']->DefaultValue('AutherInfo')); 
           $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(1,$args['ActorEntityData'],$edit_history);
           //prevent to be self parent
           $args['parent_id']=($args['parent_id']==$args['category_id'])?'':$args['parent_id'];


            $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_categories', array('category_name','parent_id','edit_history'),array($args['category_name'],$args['parent_id'],$AutherInfo),array('category_id'),array($args['category_id']));

      
      //updating spread text
    $args['attached_object_Str']=implode(",",array($args['category_id']));  
           $spreadargs = array(
		'spread_id' => intval($get_row['spread_id']),
		'entity_id' =>$args['ActorEntityData']['EntityData']['entity_id'],
		'owner_entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
		'spread_content' => $args['description'],
		'quick_action_type'=>0,
        'spread_perpose'=>  10,
        'comment_status'=>1,
        'suspended'=> 0,
		'privacy_id' =>0,
		'spread_rank' => hackerHot(500,  $args['date_gmt']),
		'spread_score' => hackerHot(500,  $args['date_gmt']),
		'spread_date_gmt' =>  $args['date_gmt'],
         'ip'=> $args['ip'],
		'taged_entity_Str' => '',
		'attached_object_Str' => $args['attached_object_Str']
	);
  //  check_response($args);
$args['spread_id']= $GLOBALS['Var_Spread']->register_spread($spreadargs);



         }else{
     //New Inserting

 $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(0,$args['ActorEntityData'],array());


        $spreadargs = array(
		'spread_id' =>  0,
		'entity_id' =>$args['ActorEntityData']['EntityData']['entity_id'],
		'owner_entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
		'spread_content' => $args['description'],
		'quick_action_type'=>0,
        'spread_perpose'=>  10,
        'comment_status'=>1,
        'suspended'=> 0,
		'privacy_id' =>0,
		'spread_rank' => hackerHot(500, date_in_timezone("UTC")),
		'spread_score' => hackerHot(500, date_in_timezone("UTC")),
		'spread_date_gmt' =>  $args['date_gmt'],
         'ip'=> $args['ip'],
		'taged_entity_Str' => '',
		'attached_object_Str' =>''
	);

$args['spread_id']= $GLOBALS['Var_Spread']->register_spread($spreadargs);

  //inserting
$args['category_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'store_categories', array('category_name','spread_id','entity_id','parent_id','edit_history'),array($args['category_name'],$args['spread_id'],$args['entity_id'],$args['parent_id'],$AutherInfo));

//updateing the attached object
//updateing the attached object
 $args['attached_object_Str']=implode(",",array($args['category_id']));
  $GLOBALS['Var_DBMysqli']->update(DB_NAME,'spread',array('attached_object'),array($args['attached_object_Str']),array('spread_id'),array($args['spread_id']));  


//getting slug

 $slug=$GLOBALS['Var_PageSlug']->Unique_Slug($args['category_name'],'category',$args['category_id']);


         }


   return  $args['category_id'];
}
/**
* @description=>ragister a category.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/ 
public function RagisterCollection($args=array()){
       //In Order to save one sql query We use getrow instead of numrow
      $get_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'store_collections', array('collection_id'),array($args['collection_id']));
      
      if($get_row!=NULL){
         


         $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_collections', array('collection_name','parent_id','country_id','use_type','icon_svg','description'),array($args['collection_name'],$args['parent_id'],$args['country_id'],$args['use_type'],$args['icon_svg'],$args['description']),array('collection_id'),array($args['collection_id']));



          
      }else{
            //inserting
$args['collection_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'store_collections', array('collection_name','parent_id','country_id','use_type','icon_svg','description'),array($args['collection_name'],$args['parent_id'],$args['country_id'],$args['use_type'],$args['icon_svg'],$args['description']));  

//getting slug

 $slug=$GLOBALS['Var_PageSlug']->Unique_Slug($args['collection_name'],'collection',$args['collection_id']);


      } 


return $args['collection_id'];

}

/**
* @description=>ragister a category.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/ 
public function RagisterStaff($args=array()){
     $is_new=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'store_staff', array('store_staff_id','store_id'),array($args['store_staff_id'],$args['store_id'])); 
       if($is_new>0){
           //update
            // public_data
    $defaultpublicdata=$GLOBALS['Var_BundlePrototype']->DefaultValue('storeStaff');
      $publicdata=True_array_merge($defaultpublicdata,array(
   'updatedate' => $args['date'],
	'visitId' =>uniqueID()
    ));

       //update
$GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_staff', array('store_id','username','password','public_data'),array($args['store_id'],$args['username'],md5($args['password']),Makejson($publicdata)),array('store_staff_id'),array($args['store_staff_id']));

   
       }else{//insert

      // public_data
    $defaultpublicdata=$GLOBALS['Var_BundlePrototype']->DefaultValue('storeStaff');
      $publicdata=True_array_merge($defaultpublicdata,array(
   'updatedate' => $args['date'],
	'visitId' =>uniqueID()
    ));

       //inserting
$args['store_staff_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'store_staff', array('store_id','username','password','public_data'),array($args['store_id'],$args['username'],md5($args['password']),Makejson($publicdata)));
           

       }

       return  $args['store_staff_id'];
}


/**
* @description=>ragister a Product.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/   
public function RagisterProduct($args=array()){
    //In Order to save one sql query We use getrow instead of numrow
      $get_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'store_products', array('entity_id','product_id'),array($args['entity_id'],$args['product_id']));
   
     $args['brand_id']=(isset($args['brand_id']))?$args['brand_id']:0;


         if($get_row!=NULL){
           //update
              $edit_history=   JsonTrueDecode($get_row['edit_history'],$GLOBALS['Var_BundlePrototype']->DefaultValue('AutherInfo')); 

 $args['attached_object_Str']=implode(",",array($args['product_id']));
 //updating spread text

           $spreadargs = array(
		'spread_id' => intval($get_row['spread_id']),
		'entity_id' =>$args['ActorEntityData']['EntityData']['entity_id'],
		'owner_entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
		'spread_content' => $args['description'],
		'quick_action_type'=>0,
        'spread_perpose'=>  10,
        'comment_status'=>1,
        'suspended'=> 0,
		'privacy_id' =>0,
		'spread_rank' => hackerHot(500, $args['date_gmt']),
		'spread_score' => hackerHot(500,  $args['date_gmt']),
		'spread_date_gmt' =>  $args['date_gmt'],
         'ip'=> $args['ip'],
		'taged_entity_Str' => '',
		'attached_object_Str' => $args['attached_object_Str']
	);
  
    $args['spread_id']= $GLOBALS['Var_Spread']->register_spread($spreadargs);



           $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(1,$args['ActorEntityData'],$edit_history);
      $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_products', array('product_name','product_public_data','product_private_data','product_categories','search_data','edit_history','brand_id'),array($args['product_name'],$args['product_public_data'],$args['product_private_data'],$args['category'],$args['search_data'],$AutherInfo,$args['brand_id']),array('product_id'),array($args['product_id']));
           
     

            }else{
             //insert
 $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(0,$args['ActorEntityData'],array());
   $spreadargs = array(
		'spread_id' =>  0,
		'entity_id' =>$args['ActorEntityData']['EntityData']['entity_id'],
		'owner_entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
		'spread_content' => $args['description'],
		'quick_action_type'=>0,
        'spread_perpose'=>  11,
        'comment_status'=>1,
        'suspended'=> 0,
		'privacy_id' =>0,
		'spread_rank' => hackerHot(500, $args['date_gmt']),
		'spread_score' => hackerHot(500, $args['date_gmt']),
		'spread_date' =>  $args['date_gmt'],
        'spread_date_gmt'=>$args['date_gmt'],
        'ip'=> $args['ip'],
		'taged_entity_Str' => '',
		'attached_object_Str' =>''
	);

$args['spread_id']= $GLOBALS['Var_Spread']->register_spread($spreadargs);




 //inserting
$args['product_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'store_products', array('product_name','spread_id','entity_id','product_public_data','product_private_data','product_categories','search_data','edit_history','brand_id'),array($args['product_name'],$args['spread_id'],$args['entity_id'],$args['product_public_data'],$args['product_private_data'],$args['category'],$args['search_data'],$AutherInfo,$args['brand_id']));

//updateing the attached object
 $args['attached_object_Str']=implode(",",array($args['product_id']));
  $GLOBALS['Var_DBMysqli']->update(DB_NAME,'spread',array('attached_object'),array($args['attached_object_Str']),array('spread_id'),array($args['spread_id']));  

//getting slug

 $slug=$GLOBALS['Var_PageSlug']->Unique_Slug($args['product_name'],'product',$args['product_id']);


            }


   return  $args['product_id'];
}
/**
* @description=>ragister a Product specification.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/  
public function RagisterProductSpecification($args=array()){
    $get_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'store_products', array('entity_id','product_id'),array($args['entity_id'],$args['product_id']));

  $specifications=JsonTrueDecode($get_row['specifications'],array($GLOBALS['Var_BundlePrototype']->DefaultValue('productspecification')));
  //check_response('---==before==--');
 // check_response($specifications);
 // check_response('---==after==--');
 $specifications=SafeArrayDecode($specifications);
//   check_response($specifications);


    $id=GetPropertyInArray('id',$args['spf'],'');
    $act=GetPropertyInArray('act',$args['spf'],1);//act ==1 ==>edit |new
    $count=count($specifications);
    if($act==1){
        
if($id==''){
     $id=$count;  
   }

    $specifications[$id]=$args['spf'];

 $specifications=  array_values($specifications);

    $SafeEncode=Makejson_0(SafeArrayEncode($specifications));
  
   


    }else{

   if($id>$count){
     $id=$count;  
       }
unset($specifications[$id]);//deleteing key
 $specifications=  array_values($specifications);

   $SafeEncode=Makejson_0(SafeArrayEncode($specifications));

    }
   
    

    if($SafeEncode['state']==200){
      $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_products', array('specifications'),array($SafeEncode['encode']),array('product_id'),array($args['product_id']));
      
     return TRUE;   
    }else{
        return FALSE;  
    }
  


}

/**
* @description=>ragister a RagisterProductVarient.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/  
public function RagisterProductVarient($args=array()){
   

    $get_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'product_varients', array('varient_id'),array($args['varient_id']));

   
 


      if($get_row!=NULL){
 //updateing
   $edit_history=   JsonTrueDecode($get_row['edit_history'],$GLOBALS['Var_BundlePrototype']->DefaultValue('AutherInfo'));
      $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(1,$args['ActorEntityData'],$edit_history);

$GLOBALS['Var_DBMysqli']->update(DB_NAME,'product_varients', array('	product_id','sellingPrice','compairePrice','Stock','sku','private_data','edit_history'),array($args['product_id'],$args['sellingPrice'],$args['compairePrice'],$args['Stock'],$args['sku'],$args['private_data'],$AutherInfo),array('varient_id'),array($args['varient_id']));      

      }else{//insert
 $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(1,$args['ActorEntityData'],array());
 //inserting
$args['varient_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'product_varients', array('product_id','sellingPrice','compairePrice','Stock','sku','private_data','edit_history'),array($args['product_id'],$args['sellingPrice'],$args['compairePrice'],$args['Stock'],$args['sku'],$args['private_data'],$AutherInfo));
      
      }


 return $args['varient_id'];
}
/**
* @description=>ragister a RagisterProductFilter.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/ 
public function RagisterProductFilter($args=array()){

     $edit_history=   JsonTrueDecode($args['productRow']['edit_history'],$GLOBALS['Var_BundlePrototype']->DefaultValue('AutherInfo')); 
        $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(1,$args['ActorEntityData'],$edit_history);
    $filter_attribute_id=implode(",",$args['FilterAttributesId']);
  /*   $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_products', array('filter_attribute_id','edit_history'),array($filter_attribute_id,$AutherInfo),array('product_id'),array($args['product_id']));*/
  // deleteing in junction table
$delete=$GLOBALS['Var_DBMysqli']->delete(DB_NAME,'filter_attributes_junction',array('product_id'),array($args['product_id']));

//insertation

$formatted_fields=array();
     foreach($args['FilterAttributesId'] as $FilterAttributesId){
   $formatted_fields[]=array($FilterAttributesId,$args['product_id']); 
     }


  $bulk_insert=$GLOBALS['Var_DBMysqli']->bulk_insert(DB_NAME,'filter_attributes_junction',array('filter_attributes_id','product_id'),$formatted_fields);

        return TRUE;
}
/**
* @description=>ragister a RagisterProductFilter.
* @param  => 
* @return => 
*/ 
public function RagisterShipping($args=array()){
    
    if($args['store_shipping_row']!=NULL){//update

    $edit_history=   JsonTrueDecode( $args['store_shipping_row']['edit_history'],$GLOBALS['Var_BundlePrototype']->DefaultValue('AutherInfo')); 
     $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(1,$args['ActorEntityData'],$edit_history);    

     $GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_shipping', array('shipping_name','entity_id','type','range_data','location_data','locations','timed_charge','description','edit_history','shippingZonetype','processing_time'),array($args['shipping_name'],$args['entity_id'],$args['type'],$args['range_data'],$args['location_data'],$args['locations'],$args['timed_charge'],$args['description'],$AutherInfo,$args['shippingZonetype'],$args['processing_time']),array('shipping_id'),array($args['shipping_id']));



    }else{//insert
  $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(0,$args['ActorEntityData'],array());
    //inserting
$args['shipping_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'store_shipping', array('shipping_name','entity_id','type','range_data','location_data','locations','timed_charge','description','edit_history','shippingZonetype','processing_time'),array($args['shipping_name'],$args['entity_id'],$args['type'],$args['range_data'],$args['location_data'],$args['locations'],$args['timed_charge'],$args['description'],$AutherInfo,$args['shippingZonetype'],$args['processing_time']));
      
        }

return $args['shipping_id'];
}
/**  $GLOBALS['Var_StoreDashboard']->RagisterDiscount()
* @description=>ragister a RagisterProductFilter.
* @param  => 
* @return => 
*/ 
public  function RagisterDiscount($args=array()){
    
    $get_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'store_discount', array('entity_id','discount_id'),array($args['entity_id'],$args['discount_id']));
 
     
         if($get_row!=NULL){
             

         }else{
             

  //inserting
$args['discount_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'store_discount', array('discount','discount_code','discount_type','begin_date','expire_date','apply_type','date_range_type','uses_type','entity_id','minimum_spend','validity'),array($args['discount'],$args['discount_code'],$args['discount_type'],$args['begin_date'],$args['date_range_type'],$args['uses_type'],$args['entity_id'],$args['minimum_spend'],$args['validity']));
         }


}
/**  $GLOBALS['Var_StoreDashboard']->RagisterDiscount()
* @description=>ragister a RagisterProductFilter.
* @param  => 
* @return => 
*/ 



//-------===Retrive====------------ 
/**
* @description=>retrive the table data.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/  
public function RetriveById($args=array()){
   $row=array(); 
    $selectsql='';
       switch($args['table']){
case 'store_staff':
$selectsql='SELECT * FROM '.DB_NAME.'.store_staff a 
 WHERE a.store_staff_id	='.$args['store_staff_id'].'
 LIMIT 1';

break;    
case'store_categories':


$selectsql=' SELECT * FROM '.DB_NAME.'.store_categories a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.entity_id='.$args['entity_id'].'
  AND  a.deleted =0
 AND  a.category_id ='.$args['category_id'].'
 AND  CAST(b.object_id As SIGNED) =a.category_id 
  AND  b.object_type ="category"
  AND c.spread_id=a.spread_id ';

break;
case'store_collection':


$selectsql='SELECT * FROM '.DB_NAME.'.store_collections a ,'.DB_NAME.'.page_slug b
 WHERE  a.collection_id ='.$args['collection_id'].'
 AND  a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.collection_id
  AND  b.object_type ="collection"
 ';

break;
case'categoriesPage': //use for store output

$selectsql='SELECT * FROM '.DB_NAME.'.store_categories a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.category_id ='.$args['category_id'].'
  AND  a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.category_id 
  AND  b.object_type ="category"
  AND c.spread_id=a.spread_id
 ';
break;
//
case'categoriesParentTree': //getting category for parent tree
if(is_array($args['category_id'])){
  $args['category_id']='"'.implode('","',$args['category_id']).'"';
}else{
   if($args['category_id']==''){
       $args['category_id']='""';
   }

}
$selectsql='SELECT * FROM '.DB_NAME.'.store_categories a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.category_id IN ('.$args['category_id'].')
  AND  a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.category_id 
  AND  b.object_type ="category"
  AND c.spread_id=a.spread_id
 ';
break;
case 'collectionParentTree':
if(is_array($args['collection_id'])){
  $args['collection_id']='"'.implode('","',$args['collection_id']).'"';
}else{
   if($args['collection_id']==''){
       $args['collection_id']='""';
   }

}
$selectsql='SELECT * FROM '.DB_NAME.'.store_collections a ,'.DB_NAME.'.page_slug b
 WHERE a.collection_id IN ('.$args['collection_id'].')
  AND  a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.collection_id 
  AND  b.object_type ="collection"
 
 ';
break;
case'store_products':


$selectsql='SELECT * FROM '.DB_NAME.'.store_products a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.entity_id='.$args['entity_id'].'
  AND  a.deleted =0
 AND  a.product_id ='.$args['product_id'].'
 AND  CAST(b.object_id As SIGNED) =a.product_id 
  AND  b.object_type ="product"
  AND c.spread_id=a.spread_id
 ';
break;
case'productPage'://use for store output


$selectsql='SELECT * FROM '.DB_NAME.'.store_products a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.product_id ='.$args['product_id'].'
  AND  a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.product_id 
  AND  b.object_type ="product"
  AND c.spread_id=a.spread_id
 ';
break;
case'store_productsByIdArray'://entity id is imporant


if(is_array($args['product_id'])){
  $args['product_id']='"'.implode('","',create_int_array($args['product_id'])).'"';
}else{
   if($args['product_id']==''){
       $args['product_id']='""';
   }

}


$selectsql='SELECT * FROM '.DB_NAME.'.store_products a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c 
 WHERE a.product_id IN ('.$args['product_id'].')
  AND  a.deleted =0
  AND  a.entity_id='.$args['entity_id'].'
  AND  CAST(b.object_id As SIGNED) =a.product_id 
  AND  b.object_type ="product"
  AND c.spread_id=a.spread_id
 ';








break;
case'product_varients':

$selectsql='SELECT * FROM '.DB_NAME.'.product_varients a 
 WHERE a.varient_id='.$args['varient_id'].'
  AND  a.deleted =0 
 ';
break;
case'store_shipping':

$selectsql='SELECT * FROM '.DB_NAME.'.store_shipping a 
 WHERE a.shipping_id='.$args['shipping_id'].'
  AND  a.deleted =0 
 ';
break;
case'filter_attributesByIdArray':




$selectsql='SELECT * FROM '.DB_NAME.'.filter_attributes a ,'.DB_NAME.'.filter_attributes_junction b 
 WHERE a.filter_attributes_id=b.filter_attributes_id
AND  b.product_id = '.$args['product_id'].'
 ';
 
break;
case'LocationByIdArray':
if(is_array($args['location_id'])){
  $args['location_id']='"'.implode('","',$args['location_id']).'"';
}else{
   if($args['location_id']==''){
       $args['location_id']='""';
   }

}
$selectsql=' SELECT DISTINCT *
FROM '.DB_NAME.'.locations a ,'.DB_NAME.'.location_postalcode b,'.DB_NAME.'.location_fl_admin c,'.DB_NAME.'.location_cities d 
 WHERE a.location_id IN ('.$args['location_id'].')
 AND  a.postalCode_id=b.postalCode_id
AND a.fl_admin_id=c.fl_admin_id
AND a.city_id=d.city_id
 ';


break;
case'StateLocationByIdArray':
if(is_array($args['location_id'])){
  $args['location_id']='"'.implode('","',$args['location_id']).'"';
}else{
   if($args['location_id']==''){
       $args['location_id']='""';
   }

}
$selectsql='SELECT * FROM '.DB_NAME.'.location_fl_admin a 
 WHERE a.fl_admin_id	 IN ('.$args['location_id'].')
 ';

break;


case'store_productsByVarientIdArray':

if(is_array($args['varient_id'])){
  $args['varient_id']='"'.implode('","',create_int_array($args['varient_id'])).'"';
}else{
   if($args['varient_id']==''){
       $args['varient_id']='""';
   }

}
$product_sql='SELECT p.product_id FROM '.DB_NAME.'.product_varients p
 WHERE p.varient_id IN ('.$args['varient_id'].')';


$selectsql='SELECT * FROM '.DB_NAME.'.store_products a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c 
 WHERE a.product_id IN ('.$product_sql.')
  AND  a.deleted =0
  AND  CAST(b.object_id As SIGNED) =a.product_id 
  AND  b.object_type ="product"
  AND c.spread_id=a.spread_id
 ';


break;
case 'orderitemView':
if(is_array($args['varient_id'])){
  $args['varient_id']='"'.implode('","',$args['varient_id']).'"';
}else{
   if($args['varient_id']==''){
       $args['varient_id']='""';
   }

}

$LeftJoin='SELECT * FROM '.DB_NAME.'.store_products a ,'.DB_NAME.'.page_slug b
 WHERE  a.deleted = 0
  AND  CAST(b.object_id As SIGNED) =a.product_id 
  AND  b.object_type ="product"
';

$selectsql='SELECT * FROM '.DB_NAME.'.product_varients v 
LEFT JOIN ('.$LeftJoin.') as p ON (p.product_id=v.product_id)
 WHERE  v.varient_id IN ('.$args['varient_id'].')
';

break;


case'OrderTracking':

$selectsql='SELECT * FROM '.DB_NAME.'.order_tracking a 
 WHERE a.order_id='.$args['order_id'].'
 ';
break;
case'Orders':

$selectsql='SELECT * FROM '.DB_NAME.'.orders a 
 WHERE a.order_id	='.$args['order_id'].'
 ';
break;




case 'store_ratting':
 $total_sql=array();
// $args['product_id']=($args['product_id']=='')?0:$args['product_id'];//errror detected due to empty id
$total_sql[]='(SELECT COUNT(spread_comment_id) as total
      FROM '.DB_NAME.'.spread_comments a 
 WHERE a.spread_id	= '.$args['spread_id'].'
 AND	a.rating_value= 5
       )';
$total_sql[]='(SELECT COUNT(spread_comment_id) as total
   FROM '.DB_NAME.'.spread_comments b 
   WHERE b.spread_id	= '.$args['spread_id'].'
 AND   b.rating_value= 4
       )';
$total_sql[]='(SELECT COUNT(spread_comment_id) as total
      FROM '.DB_NAME.'.spread_comments c 
 WHERE c.spread_id	= '.$args['spread_id'].'
 AND c.rating_value= 3
       )';
$total_sql[]='(SELECT COUNT(spread_comment_id) as total
      FROM '.DB_NAME.'.spread_comments d 
 WHERE d.spread_id	= '.$args['spread_id'].'
  AND	d.rating_value= 2
       )';
$total_sql[]='(SELECT COUNT(spread_comment_id) as total
      FROM '.DB_NAME.'.spread_comments e 
 WHERE e.spread_id	= '.$args['spread_id'].'
  AND	e.rating_value= 1
       )';

$total_sql[]='(SELECT COUNT(activity_ref_id	) as total
      FROM '.DB_NAME.'.activity_ref f 
 WHERE f.object_id	= '.$args['entity_id'].'
  AND	f.activity_code= "704"
       )';

$total_sql[]='( SELECT COUNT( activity_ref_id	) as total
      FROM '.DB_NAME.'.activity_ref g 
 WHERE g.object_id	= '.$args['entity_id'].'
  AND	g.activity_code= "702"
       )';

 $selectsql= implode(' UNION ALL ',$total_sql);

break;
case 'product_ratting':
 $total_sql=array();
// $args['product_id']=($args['product_id']=='')?0:$args['product_id'];//errror detected due to empty id
$total_sql[]='(SELECT COUNT(spread_comment_id) as total
      FROM '.DB_NAME.'.spread_comments a 
 WHERE a.spread_id	= '.$args['spread_id'].'
 AND	a.rating_value= 5
       )';
$total_sql[]='(SELECT COUNT(spread_comment_id) as total
   FROM '.DB_NAME.'.spread_comments b 
   WHERE b.spread_id	= '.$args['spread_id'].'
 AND   b.rating_value= 4
       )';
$total_sql[]='(SELECT COUNT(spread_comment_id) as total
      FROM '.DB_NAME.'.spread_comments c 
 WHERE c.spread_id	= '.$args['spread_id'].'
 AND c.rating_value= 3
       )';
$total_sql[]='(SELECT COUNT(spread_comment_id) as total
      FROM '.DB_NAME.'.spread_comments d 
 WHERE d.spread_id	= '.$args['spread_id'].'
  AND	d.rating_value= 2
       )';
$total_sql[]='(SELECT COUNT(spread_comment_id) as total
      FROM '.DB_NAME.'.spread_comments e 
 WHERE e.spread_id	= '.$args['spread_id'].'
  AND	e.rating_value= 1
       )';

$total_sql[]='(SELECT COUNT(activity_ref_id	) as total
      FROM '.DB_NAME.'.activity_ref f 
 WHERE f.object_id	= '.$args['product_id'].'
  AND	f.activity_code= "704"
       )';

$total_sql[]='( SELECT COUNT( activity_ref_id	) as total
      FROM '.DB_NAME.'.activity_ref g 
 WHERE g.object_id	= '.$args['product_id'].'
  AND	g.activity_code= "702"
       )';

 $selectsql= implode(' UNION ALL ',$total_sql);

break;

    }


 $row=$GLOBALS['Var_DBMysqli']->query($selectsql); 

 return $row;
}

  
/**
* @description=>retrive the table data.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/
public function TableRetrive($args=array()){
    $result=array();
     $New_ifo=array('Afiatr'=>$args['ActiveFilter'],'Cfiatr'=>array(),'Mfiatr'=>array());

    switch($args['table']){
case 'store_staff':
$numsql='SELECT COUNT(*) FROM '.DB_NAME.'.store_staff a 
 WHERE a.store_id	='.$args['entity_id'].'

 ';
 $selectsql='SELECT * FROM '.DB_NAME.'.store_staff a 
 WHERE a.store_id	='.$args['entity_id'].'
 ';
break;        
case'store_categories':
$numsql='SELECT COUNT(*) FROM '.DB_NAME.'.store_categories a
 WHERE a.entity_id='.$args['entity_id'].'
 AND  a.deleted =0 ';



$selectsql='SELECT * FROM '.DB_NAME.'.store_categories a,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.entity_id='.$args['entity_id'].'
 AND  a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.category_id 
 AND  b.object_type ="category"
 AND c.spread_id=a.spread_id
 ';

  
  if($args['search_str']!=''){
$serachquery=' AND (a.category_name LIKE "%'.$args['search_str'].'%"||a.category_name LIKE "%'.$args['search_str'].'")';

$numsql.=$serachquery;
  $selectsql.=$serachquery;
 }

 $selectsql.=' ORDER BY a.category_name ASC ';

break;
case'store_collections':
$numsql='SELECT COUNT(*) FROM '.DB_NAME.'.store_collections a
 WHERE   a.deleted =0 ';



$selectsql='SELECT * FROM '.DB_NAME.'.store_collections a,'.DB_NAME.'.page_slug b
 WHERE   a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.collection_id 
 AND  b.object_type ="collection"
 ';

  
  if($args['search_str']!=''){
$serachquery=' AND (a.collection_name LIKE "%'.$args['search_str'].'%"||a.collection_name LIKE "%'.$args['search_str'].'")';

$numsql.=$serachquery;
  $selectsql.=$serachquery;
 }

 $selectsql.=' ORDER BY a.collection_name ASC ';

break;


case 'store_shipping':

$numsql='SELECT COUNT(*) FROM '.DB_NAME.'.store_shipping a
 WHERE a.entity_id='.$args['entity_id'].'
 AND  a.deleted =0
 AND  a.shippingZonetype='.$args['shippingZonetype'].'
  ';



$selectsql='SELECT * FROM '.DB_NAME.'.store_shipping a
 WHERE a.entity_id='.$args['entity_id'].'
 AND  a.deleted =0
 AND  a.shippingZonetype='.$args['shippingZonetype'].'
 ';

  
  if($args['search_str']!=''){
$serachquery=' AND (a.shipping_name	 LIKE "%'.$args['search_str'].'%"||a.shipping_name	 LIKE "%'.$args['search_str'].'")';

$numsql.=$serachquery;
  $selectsql.=$serachquery;
 }

 $selectsql.=' ORDER BY a.shipping_name	 ASC ';
break;


case 'store_products':

$SQL_StoreProdcutTable=$GLOBALS['Var_Utility']->SQL_StoreProdcutTable($args);
$numsql=$SQL_StoreProdcutTable['numsql'];
$selectsql=$SQL_StoreProdcutTable['selectsql'];
 $New_ifo['Mfiatr']=$GLOBALS['Var_Utility']->StoreProdcutTable_MainFilter(array('ActiveFilter'=>$args['ActiveFilter'],'store_id'=>$args['entity_id']));

break;
case 'store_discounts':
$numsql='SELECT COUNT(*) FROM '.DB_NAME.'.store_discount a
 WHERE a.entity_id='.$args['entity_id'].'

';



$selectsql='SELECT * FROM '.DB_NAME.'.store_discount a 
 WHERE a.entity_id='.$args['entity_id'].'
';

 
  if($args['search_str']!=''){
$serachquery=' AND (a.discount_code	 LIKE "%'.$args['search_str'].'%"||a.discount_code	 LIKE "%'.$args['search_str'].'")';

$numsql.=$serachquery;
  $selectsql.=$serachquery;
 }

$selectsql.=' ORDER BY a.discount_id	 ASC ';
break;
//---
case 'nearmarket':

$postalCodeSql ='SELECT v.postalCode_id as postalCode_id FROM '.DB_NAME.'.locations  v 
WHERE   v.location_id  = '.$args['location_id'].' ';

$query=' FROM '.DB_NAME.'.locations  a,'.DB_NAME.'.location_cities b ,'.DB_NAME.'.location_postalcode c ,'.DB_NAME.'.location_fl_admin d ,'.DB_NAME.'.countryinfo e 
 
   WHERE  a.postalCode_id  IN ('.$postalCodeSql.')
   AND  a.location_id  != '.$args['location_id'].'
   AND  a.city_id =b.city_id
   AND  a.postalCode_id =c.postalCode_id
   AND  a.fl_admin_id =d.fl_admin_id
   AND  a.country_id =e.countryinfo_id';


$numsql='SELECT COUNT(*) '.$query.' ';



$selectsql='SELECT * '.$query.' ';

 


//$selectsql.=' ORDER BY a.discount_id	 ASC ';

break;
case 'mymedia':

$query='FROM '.DB_NAME_UTILITY_0.'.images_0  a 
  WHERE  a.entity_id   = '.$args['ActorEntityData']['EntityData']['entity_id'].'';


$numsql='SELECT COUNT(*) '.$query.' ';



$selectsql='SELECT * '.$query.' ';
$selectsql.=' ORDER BY a.time_node	 DESC ';
break;


case 'all_categories':
$SEARCH_STR=(strlen($args['search_str'])>1)?'AND ( a.category_name LIKE "%'.$args['search_str'].'")  ':'';

$query=' FROM '.DB_NAME.'.store_categories a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.entity_id='.$args['entity_id'].'
  AND  a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.category_id 
  AND  b.object_type ="category"
  AND c.spread_id=a.spread_id
    '.$SEARCH_STR.' ';








$numsql='SELECT COUNT(*) '.$query.' ';
$selectsql='SELECT * '.$query.' ';
$selectsql.=' ORDER BY c.spread_date_gmt	 DESC ';
break;

case 'all_products':
$SEARCH_STR=(strlen($args['search_str'])>1)?'AND (a.search_data LIKE "%'.$args['search_str'].'%" || a.product_name LIKE "%'.$args['search_str'].'")  ':'';


$query=' FROM '.DB_NAME.'.store_products  a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.entity_id='.$args['entity_id'].'
  AND  a.deleted =0
  AND  CAST(b.object_id As SIGNED) =a.product_id 
  AND  b.object_type ="product"
  AND c.spread_id=a.spread_id
  '.$SEARCH_STR.'';

  






$numsql='SELECT COUNT(*) '.$query.' ';
$selectsql='SELECT * '.$query.' ';
$selectsql.=' ORDER BY c.spread_date_gmt	 DESC ';
break;

  }

 $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);




//linit sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';
 $selectsql.=$limit;
//--
//check_response( $total_result);
//check_response($paging_data);
//check_response($selectsql);

   $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;




    return PagingOutPut(array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$result,
          'totalpage'=>$paging_data['total_page'],
          'totalresult'=>$total_result,
          'searchstr'=>$args['search_str'],
          'selectedid'=>$args['selected_id'] ,
          'ifo'=>$New_ifo 
             )) ;

}
/**
* @description=>OrderRetrive.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/
public function OrderRetrive($args=array()){
$activeStatus_str= GetPropertyInArray('status',$args['ActiveFilter'],array());
$activetype_str= GetPropertyInArray('type',$args['ActiveFilter'],array());  
$activeStatus= array();
$activetype= array() ;
foreach($activeStatus_str as $value){ if(isset($value['v'])){$activeStatus[]=$value['v'];}  }
foreach($activetype_str as $value){ if(isset($value['v'])){$activetype[]=$value['v'];}  }



$numsql='SELECT COUNT(*) FROM '.DB_NAME.'.orders a 
 WHERE a.store_entity_id	='.$args['entity_id'].'

 ';
 $selectsql='SELECT * FROM '.DB_NAME.'.orders a 
 WHERE a.store_entity_id	='.$args['entity_id'].'
 ';
 
    if(count($activeStatus)>0){
       
 $FilterSql='';   
 
 $FilterSql='AND a.order_status  IN ("'.implode('","',$activeStatus).'") '; 

$numsql=$numsql.$FilterSql;
$selectsql=$selectsql.$FilterSql;



    }
    if(count($activetype)>0){
       
 $FilterSql='';   
 
 $FilterSql='AND a.order_type  IN ("'.implode('","',$activetype).'")'; 

$numsql=$numsql.$FilterSql;
$selectsql=$selectsql.$FilterSql;



    }


 $selectsql.=' ORDER BY  a.timestamp DESC ';



 $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);




//linit sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';
 $selectsql.=$limit;


   $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;

$New_ifo=array('Afiatr'=>$args['ActiveFilter'],
               'Cfiatr'=>$this->GetOrderCustomFilter(array('ActiveFilter'=>$args['ActiveFilter'],'store_id'=>$args['entity_id'])),
               'Mfiatr'=>$this->GetOrderMainFilter(array('ActiveFilter'=>$args['ActiveFilter'],'store_id'=>$args['entity_id']))
               );

   return PagingOutPut(array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$result,
          'totalpage'=>$paging_data['total_page'],
          'totalresult'=>$total_result,
          'searchstr'=>$args['search_str'],
          'selectedid'=>$args['selected_id'] ,
          'ifo'=>$New_ifo 
             ));
}
/**
* @description=>GetOrderMainFilter.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/

public  function GetOrderMainFilter($args=array()){
 $Filter=array();
 $total_sql=array();

 
$activeStatus_str= GetPropertyInArray('status',$args['ActiveFilter'],array());
$activetype_str= GetPropertyInArray('type',$args['ActiveFilter'],array());  
$activeStatus= array();
$activetype= array() ;
foreach($activeStatus_str as $value){ if(isset($value['v'])){$activeStatus[]=$value['v'];}  }
foreach($activetype_str as $value){ if(isset($value['v'])){$activetype[]=$value['v'];}  }

 $ORDER_TYPE_NOT_IN=(count( $activetype)>0)?'AND b.order_type NOT IN ("'.implode('","',$activetype).'")':'';
 $ORDER_STATUS_NOT_IN=(count( $activeStatus)>0)?'AND b.order_status NOT IN  ("'.implode('","', $activeStatus).'")':'';
 $TIME_NOT_IN= $ORDER_TYPE_NOT_IN .' '.$ORDER_STATUS_NOT_IN ;



 $total_sql[]='(SELECT b.order_type as value ,"type" as name, COUNT(b.order_id) as count
FROM '.DB_NAME.'.orders b
WHERE b.store_entity_id = '.$args['store_id'].'
'. $ORDER_TYPE_NOT_IN.'
GROUP BY b.order_type)
';
 
 $total_sql[]='(SELECT  b.order_status as value ,"status" as name, COUNT(b.order_id) as count
FROM '.DB_NAME.'.orders b
WHERE b.store_entity_id = '.$args['store_id'].'
'. $ORDER_STATUS_NOT_IN.'
GROUP BY b.order_status)
';
/*
 $total_sql[]='(SELECT  min(b.order_time) as value ,"fromDate" as name, 0 as count
FROM '.DB_NAME.'.orders b
WHERE b.store_entity_id = '.$args['store_id'].'
'.  $TIME_NOT_IN.'
LIMIT 1)
';

 $total_sql[]='(SELECT max(b.order_time) as value ,"toDate" as name, 0 as count
FROM '.DB_NAME.'.orders b
WHERE b.store_entity_id = '.$args['store_id'].'
'.  $TIME_NOT_IN.'
LIMIT 1)
';*/




 $search_sql= implode('UNION ALL ',$total_sql);

 
$Filter=$GLOBALS['Var_DBMysqli']->query($search_sql);


 //Grouping
   
     $k=0; $p=0;
     /*
 for($i=0;$i<count($result);$i++){
      if($i==0){
            $Filter[$k][$p]=$result[$i];
              $p++;
      }else{
           if($result[$i]['name']==$result[($i-1)]['name']){
         
       $Filter[$k][$p]=$result[$i];
            $p++;

     }else{
        $k++;$p=0;
         $Filter[$k][$p]=$result[$i];
               $p++;

     }  
      }  
 }

 */





//$Filter['fromDate']=array('28','Jun','2016');
// $Filter['toDate']=array('','','');
return  $Filter;
}

public function GetOrderCustomFilter($args=array()){
     $Filter=array();
 $total_sql=array();





return  $Filter;

}

public function RetriveCheckInList($args=array()){
 
     $WHERE='';    $ORDERBY='';
     
   $favoritersSql='SELECT r.from_id 
                           FROM '.DB_NAME.'.relation_one_way r
                           WHERE r.current_status=4
                            AND (r.wr_type= 2|| r.wr_type= 3)
                           AND r.to_id='.$args['entity_id'].''; 
      $TotalRespondedql=array();
    $TotalRespondedql_0='(SELECT p.conversation_id as conversation_id
FROM '.DB_NAME_CONVERSATION.'.conversation_messages_0 p
 WHERE p.sender_id='.$args['entity_id'].')';

  $TotalRespondedql_1='(SELECT q.conversation_id as conversation_id
FROM '.DB_NAME_CONVERSATION.'.conversation_messages_1 q
 WHERE q.sender_id='.$args['entity_id'].')';




switch($args['type']){
     case 0:
     $WHERE='a.store_id	='.$args['entity_id'].'';
     break;
     case 1:
     $WHERE=' a.store_id ='.$args['entity_id'].' ';
      $ORDERBY=' ORDER BY  b.lastactivity_time DESC';
     break;
     case 2:
     $WHERE=' a.store_id ='.$args['entity_id'].'
    AND a.buyer_id IN ('.$favoritersSql.')
       ';
      break;
      case 3:  
   $WHERE=' a.store_id 	='.$args['entity_id'].'
    AND a.buyer_id NOT IN ('.$favoritersSql.')
       ';
      break;
     case 4:  
   $WHERE=' a.store_id 	='.$args['entity_id'].'
    AND a.conversation_id NOT IN ('. $TotalRespondedql_0.')
    AND a.conversation_id NOT IN ('. $TotalRespondedql_1.')
       ';
      break;  
       
    }


   $WHERE.= ' AND b.conversation_id = a.conversation_id';
    /*
 $WHERE='
 b.store_id	='.$args['entity_id'].'
AND  a.members LIKE \'%"'.$args['entity_id'].'"%\' 
 AND  a.conversation_id  NOT IN ( SELECT b.conversation_id FROM  '.DB_NAME.'.conversation b
                                 WHERE   b.is_delete LIKE \'%"'.$args['entity_id'].'"%\' 
                                 )
 AND b.conversation_id = a.conversation_id
 ';
 */

 $FROM=' '.DB_NAME.'.checkins a ,'.DB_NAME.'.conversation b  ';




 $numsql='SELECT COUNT(*) FROM '.$FROM.'
 WHERE    '. $WHERE.' '. $ORDERBY.'


';

     //-- retrive_mode
 
 

$selectsql='SELECT * FROM '.$FROM.'
 WHERE   '. $WHERE.' '. $ORDERBY.'
        
                       ' ;


 $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);
//linit sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';
 $selectsql.=$limit;
//check_response($args['type']);
//check_response($paging_data);
//check_response($selectsql);
//check_response($numsql);

   $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;




        return PagingOutPut(array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$result,
          'totalpage'=>$paging_data['total_page'],
          'totalresult'=>$total_result,
          'searchstr'=>$args['search_str'],
          'selectedid'=>$args['selected_id'] 
             ));


}

/**
* @description=>
@ object Code  =>   {0 =  salesby date | 1 = Sales by product |2 = Sales by category | 3 = Coupons by date |
      4 = new Customer List}



* @param  => {object }  code for the reported object 
   
  


* @return => 
*/
public function RetriveStoreReport($args=array()){
   $return =array(); 

    	$defaults = array(
		'start_time'=>(time()-(60*60*24*7)),
        'end_time'=>time(),
        'object'=>0,
        'entity_id'=>0

		);

$args =True_array_merge( $defaults,$args);
$start_time=date('Y-m-d', $args['start_time']);
$end_time=date('Y-m-d', $args['end_time']);
//------------

  
 switch($args['object']){
    
case 0://salesby date
$selectsql='SELECT SUM( b.total ) as total_sales,
SUM( b.shipping_charge ) as total_shipping_charge,
SUM( b.sur_charge ) as total_sur_charge,
SUM( b.discount ) as total_discount,
COUNT(b.order_id) as total_orders 
 FROM '.DB_NAME.'.orders a 

 LEFT JOIN  '.DB_NAME.'.order_statistics b ON b.order_id = a.order_id
 WHERE a.store_entity_id	='.$args['entity_id'].'

AND 	a.timestamp >=  '. $args['start_time'] .'
AND 	a.timestamp < '.$args['end_time'].'
 

  ';

$result=$GLOBALS['Var_DBMysqli']->query($selectsql);;
$result_0=(count($result)>0)?$result[0]: array();
 //----

 $selectsql='SELECT 
COUNT(c.varient_id) as total_product_sold
 FROM '.DB_NAME.'.orders a 

 LEFT JOIN  '.DB_NAME.'.order_items_ref c ON c.order_id = a.order_id
 WHERE a.store_entity_id	='.$args['entity_id'].'

AND 	a.timestamp >=  '. $args['start_time'] .'
AND 	a.timestamp < '.$args['end_time'].'
 

  ';


$result=$GLOBALS['Var_DBMysqli']->query( $selectsql);
$result_1=(count($result)>0)?$result[0]:array();

$return =True_array_merge($result_0, $result_1);
break;
case 1://Sales by product
/* GROUP BY YEAR(a.order_time), MONTH(a.order_time), DAY(a.order_time) 
 ORDER BY a.order_time ASC*/
break;


}
//----------------
 $default_return =array();
switch($args['object']){
    
case 0:
$default_return=array(
'object'=>0,
'total_sales'=>0,
'total_shipping_charge'=>0,
'total_sur_charge'=>0,
'total_discount'=>0,
'total_product_sold'=>0,
'total_orders'=>0
);
break;
case 1:
break;


}
 $default_return =True_array_merge( $args, $default_return);

return True_array_merge( $default_return, $return);;
}


/*
@des ragister category when upload product from them csv file uploader
@ $GLOBALS['Var_StoreDashboard']->RagisterCateroryforCSVUpload()
*/
public function  RagisterCateroryforCSVUpload($args=array()){
    $ret =array();
  $ActorEntityData  = $args['ActorEntityData'];
  $categoryArr=$args['category'];


    if(count($categoryArr)>0){

        foreach($categoryArr as  $category){

     //In Order to save one sql query We use getrow instead of numrow
    $get_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'store_categories', array('entity_id','category_name'),array($ActorEntityData['EntityData']['entity_id'],$category));
   
     
         if($get_row!=NULL){
         $ret[]=$get_row['category_id'];


         }else{
     //New Inserting

 $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(0,$args['ActorEntityData'],array());


        $spreadargs = array(
		'spread_id' =>  0,
		'entity_id' =>$args['ActorEntityData']['EntityData']['entity_id'],
		'owner_entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
		'spread_content' => '',
		'quick_action_type'=>0,
        'spread_perpose'=>  10,
        'comment_status'=>1,
        'suspended'=> 0,
		'privacy_id' =>0,
		'spread_rank' => hackerHot(500, date_in_timezone("UTC")),
		'spread_score' => hackerHot(500, date_in_timezone("UTC")),
		'spread_date_gmt' =>  date_in_timezone("UTC"),
         'ip'=> $GLOBALS['Var_ip'],
		'taged_entity_Str' => '',
		'attached_object_Str' =>''
	);

$spread_id= $GLOBALS['Var_Spread']->register_spread($spreadargs);

  //inserting
$category_id=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'store_categories', array('category_name','spread_id','entity_id','parent_id','edit_history'),array($category,$spread_id,$ActorEntityData['EntityData']['entity_id'],0,$AutherInfo));

//updateing the attached object
//updateing the attached object
 $attached_object_Str=implode(",",array($category_id));
  $GLOBALS['Var_DBMysqli']->update(DB_NAME,'spread',array('attached_object'),array( $attached_object_Str),array('spread_id'),array($spread_id));  


//getting slug

 $slug=$GLOBALS['Var_PageSlug']->Unique_Slug($category,'category',$category_id);



  $ret[]=$category_id;

         }
}
}


         return $ret;

}




 ///============ParseMethod=============//


public function ParseCategory($Fields,$args=array()){
      $ret=array();
 
     for($i=0;$i<count($Fields);$i++){
     $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('category');  
      $ret[$i]['id']=$Fields[$i]['category_id'];     //category_id 
      $ret[$i]['cid']=$Fields[$i]['category_id'];     //category_id
      $ret[$i]['cN']=$Fields[$i]['category_name'];   //category_NAme
      $ret[$i]['slug']=$Fields[$i]['content_slug'];   //category_NAme
      $ret[$i]['pa_id']=$Fields[$i]['parent_id'];   //parent_id
      $ret[$i]['sid']=$Fields[$i]['spread_id'];    //spread_id
      $ret[$i]['is_default']=0;


      if(isset($args['store_EntityData'])&&$GLOBALS['Var_LoginStatus']&&($args['store_EntityData']['EntityData']['type']==1)){
       
         if($args['store_EntityData']['EntityData']['private_data']['default_category']['cid']==$Fields[$i]['category_id']){
              $ret[$i]['is_default']=1;  
         } 
      }
    $ret[$i]['sid']=$Fields[$i]['spread_id'];    //spread_id

   if(isset($args['parseLevel'])){
        $ret[$i]['eH']=JsonTrueDecode($Fields[$i]['edit_history'],$GLOBALS['Var_BundlePrototype']->DefaultValue('AutherInfo'));    //edithistory
   }
     
   

       //spread_id
      $ret[$i]['description']=$Fields[$i]['spread_content'];
      //getting parrent infomation
   if($ret[$i]['pa_id']!=''&&intval($ret[$i]['pa_id'])!=0&&!isset($args['parseLevel'])){
            $pa_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'store_categories', array('entity_id','category_id'),array(intval($Fields[$i]['entity_id']),intval($ret[$i]['pa_id']))); 

$pa_detail=$this->ParseCategory($this->RetriveById(array('table'=>'categoriesParentTree','category_id'=>$Fields[$i]['parent_id'])),array('parseLevel'=>1,'store_EntityData'=>$args['store_EntityData'])) ;




if(count($pa_detail)>0){
    $ret[$i]['pa']=$pa_detail[0];
}
      }



      
     }
     return  $ret;
}
public function ParseCollection($Fields,$args=array()){
      $ret=array();
 
     for($i=0;$i<count($Fields);$i++){
     $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('collection');  
      $ret[$i]['id']=$Fields[$i]['collection_id'];     //category_id 
      $ret[$i]['cid']=$Fields[$i]['collection_id'];     //category_id
      $ret[$i]['cN']=$Fields[$i]['collection_name'];   //category_NAme
      $ret[$i]['slug']=$Fields[$i]['content_slug'];   //category_NAme
      $ret[$i]['pa_id']=$Fields[$i]['parent_id'];   //parent_id
      $country_id=$Fields[$i]['country_id'];    //country_id
      $ret[$i]['z']= $country_id;    // country_id
      $ret[$i]['is']=$Fields[$i]['icon_svg'];    //icon_svg
      $ret[$i]['des']=$Fields[$i]['description'];    //description

   
     
   

    
      //getting parrent infomation
   if($ret[$i]['pa_id']!=''&&intval($ret[$i]['pa_id'])!=0&&!isset($args['parseLevel'])){
            $pa_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'store_collections', array('collection_id'),array(intval($ret[$i]['pa_id']))); 

$pa_detail=$this->ParseCollection($this->RetriveById(array('table'=>'collectionParentTree','collection_id'=>$Fields[$i]['parent_id']))) ;


if(count($pa_detail)>0){
    $ret[$i]['pa']=$pa_detail[0];
}
      }



      
     }
     return  $ret;
}
public function ParseStaff($Fields,$args=array()){
      $ret=array();
 
     for($i=0;$i<count($Fields);$i++){
   $defaultpublicdata=$GLOBALS['Var_BundlePrototype']->DefaultValue('storeStaff');
      $ret[$i]['id']=$Fields[$i]['store_staff_id'];     //category_id 
      $ret[$i]['staffid']=$Fields[$i]['store_staff_id'];     //category_id
      $ret[$i]['un']=$Fields[$i]['username'];   //username
      
      $publicdata=JsonTrueDecode($Fields[$i]['public_data'],$defaultpublicdata);

   $ret[$i]['ud']=$publicdata['updatedate'];   //lastlogin
   $ret[$i]['pw']='';   //password
   $ret[$i]['ll']=$publicdata['lastlogin'];   //lastlogin
   $ret[$i]['visitId']=$publicdata['visitId'];    //spread_id


     }
     return  $ret;
}


public function ParseShipping($Fields,$args=array()){
         $ret=array();
           for($i=0;$i<count($Fields);$i++){
    $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('StoreShipping');  
    $ret[$i]['id']=$Fields[$i]['shipping_id'];    
    $ret[$i]['spgid']=$Fields[$i]['shipping_id'];     //shipping_id
    $ret[$i]['Name']=$Fields[$i]['shipping_name'];     //shipping_id
    $ret[$i]['type']=$Fields[$i]['type'];     
    $ret[$i]['des']=$Fields[$i]['description'];   
  
  
    $ret[$i]['sZt']=intval($Fields[$i]['shippingZonetype']);    
    $ret[$i]['z']=$args['ActorEntityData']['EntityData']['private_data']['shippingZonecountry'];   
    $ret[$i]['pt']=$Fields[$i]['processing_time'];   
    
    $range_data=JsonTrueDecode($Fields[$i]['range_data'],array());
    //--locationdata array
    $location_data=array();
  $LocationRawData=JsonTrueDecode($Fields[$i]['location_data'],array());
 
 if(  $ret[$i]['sZt']==0){ //national shipping
      //local shipping
  $location_info=$this->RetriveById(array('table'=>'StateLocationByIdArray','location_id'=>$Fields[$i]['locations']));
   
    if(count($LocationRawData)==count($location_info)){
     foreach($LocationRawData as $key=>$value){
                $row=array();
          $row[0]=$value[0];
          $row[1]=$value[1];

          $locName='';
       for($p=0;$p<count($location_info);$p++){
              if($location_info[$p]['fl_admin_id']==$value[0]){
              $locName=' '.$location_info[$p]['fl_admin'].'';    
       
             
                   
              }
          }


          $row[2]= $locName;

         $location_data[]=$row;
     }     
    }
 }else{
     //local shipping
  $location_info=$this->RetriveById(array('table'=>'LocationByIdArray','location_id'=>$Fields[$i]['locations']));

  if(count($LocationRawData)==count($location_info)){
      foreach($LocationRawData as $key=>$value){
          $row=array();
          $row[0]=$value[0];
          $row[1]=$value[1];

          $locName='';
       for($p=0;$p<count($location_info);$p++){
              if($location_info[$p]['location_id']==$value[0]){
             $locName=''.$location_info[$p]['postalCode'].'-'.$location_info[$p]['location'].' '.$location_info[$p]['city'].' '. strtolower($location_info[$p]['fl_admin']).' ';    
               
               
    
              }
          }


          $row[2]= $locName;

         $location_data[]=$row;
      }
  }

 } 

    //-->>locationdata


    $ret[$i]['srng']=$range_data;    
    $ret[$i]['lif']=$location_data;       
    $ret[$i]['stcg']=array();    
 
    //check_response($args['ActorEntityData']);
     }
       return  $ret;
}

public function ParseProducts($Fields,$args=array()){
    $ret=array(); 
   $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
 $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
     
           for($i=0;$i<count($Fields);$i++){

    $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('Product_basic');  
    $ret[$i]['id']=$Fields[$i]['product_id'];    
    $ret[$i]['pid']=$Fields[$i]['product_id'];     //shipping_id
    $ret[$i]['sid']=$Fields[$i]['spread_id'];    //spread_id
    $ret[$i]['pN']=$Fields[$i]['product_name']; 
    $ret[$i]['slug']=$Fields[$i]['content_slug'];   //category_NAme
    $ret[$i]['iL']=$Fields[$i]['is_live'];
    $ret[$i]['des']=$Fields[$i]['spread_content'];
    $ret[$i]['date']=date_in_timezone( $zone,$Fields[$i]['spread_date_gmt']);
    $ret[$i]['date_gmt']=$Fields[$i]['spread_date_gmt'];
   
  $publicdata=JsonTrueDecode($Fields[$i]['product_public_data'],array('keyfeature'=>$ret[$i]['kf'],
                                     'SearchWord'=>$ret[$i]['sW']));
 

  $privatedata=JsonTrueDecode($Fields[$i]['product_private_data'],array('has_varient'=>$ret[$i]['Hvrt'],
                                     'varient_name'=>$ret[$i]['pvN']));
  $categories=JsonTrueDecode($Fields[$i]['product_categories'],array());
  //--specifications
  $defaultSpecification=  SafeArrayEncode(array('heading'=>'demo','specifications'=>array(array('name','value'))));
  $specifications=JsonTrueDecode($Fields[$i]['specifications'],array());


foreach($specifications as $key=>$value){
    if(is_null($value) || $value == '')
        unset($specifications[$key]);
}
 $specifications=  array_values($specifications);
//removeing null value
  //-->>specifications

    $ret[$i]['pC']=$this->ParseCategory($this->RetriveById(array('table'=>'categoriesParentTree','category_id'=>$Fields[$i]['product_categories'])),array('store_EntityData'=>$ActorEntityData)) ;

//ratting   
    $ratting=$this->RetriveById(array('table'=>'product_ratting','spread_id'=>$Fields[$i]['spread_id'],'product_id'=>$Fields[$i]['product_id']));
$ret[$i]['rf']['Total']=array(
		'5star' =>intval($ratting[0]['total']),
		'4star' =>intval($ratting[1]['total']),
		'3star' => intval($ratting[2]['total']),
		'2star' => intval($ratting[3]['total']),
		'1star' =>intval($ratting[4]['total']),
	);

//--in viewd and in cart
$ret[$i]['pvs']=intval($ratting[5]['total']);
$ret[$i]['pic']=intval($ratting[6]['total']);
//-->>                  


//ratting




  $ret[$i]['pvN']=($privatedata['varient_name']!=NULL)?$privatedata['varient_name']:array('','','');

 $varientQuerySql='SELECT * FROM '.DB_NAME.'.product_varients a 
 WHERE a.product_id='.$Fields[$i]['product_id'].'
 AND  a.deleted =0
 ';



    $ret[$i]['Hvrt']=$privatedata['has_varient'];
    $ret[$i]['pvDD']['pid']=$ret[$i]['pid'];
    $ret[$i]['pvDD']['Hvrt']=$ret[$i]['Hvrt'];
    $ret[$i]['pvDD']['pvN']=$ret[$i]['pvN'];

    
       

    $ret[$i]['sW']= '';
    $ret[$i]['kf']= $publicdata['keyfeature'];
    $ret[$i]['spfl']= $specifications;


    $ret[$i]['fiatr']= $this->RetriveById(array('table'=>'filter_attributesByIdArray','product_id'=>$Fields[$i]['product_id']));

    $parseLevel=(isset($args['parseLevel']))?$args['parseLevel']:0;
    if( $parseLevel==0||$parseLevel==1){

            $ret[$i]['pvL']=$this->ParseProductVarients($GLOBALS['Var_DBMysqli']->query($varientQuerySql),array('varient_name'=>$ret[$i]['pvN'],'has_varient'=>$ret[$i]['Hvrt'])); 
        if(count($ret[$i]['pvL'])<=0){//incomplete inventry
           $ret[$i]['pvL'] =array($ret[$i]['pvDD']);
        }
  }

   if( $parseLevel==0){
        //getting up sell
     $upsellList=$this->RetriveById(array('table'=>'store_productsByIdArray','product_id'=>$Fields[$i]['up_sell'],'entity_id'=>$Fields[$i]['entity_id'])); 
       $ret[$i]['upS']=$this->ParseProducts($upsellList,array('parseLevel'=>1)) ; 

      
       //-->>
    }
   

    
     }
       return  $ret;
}

public function ParseProductVarients($Fields,$args=array()){
        $ret=array();
           for($i=0;$i<count($Fields);$i++){
              $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('Product_Varient');     
 $ret[$i]['id']=$Fields[$i]['varient_id'];
 $ret[$i]['vid']=$Fields[$i]['varient_id'];
 $ret[$i]['pid']=$Fields[$i]['product_id'];
 $ret[$i]['sP']=$Fields[$i]['sellingPrice'];
 $ret[$i]['cP']=$Fields[$i]['compairePrice'];
 $ret[$i]['sku']=$Fields[$i]['sku'];
 $ret[$i]['stk']=$Fields[$i]['Stock'];
  
 $privatedata=JsonTrueDecode($Fields[$i]['private_data'],$GLOBALS['Var_BundlePrototype']->DefaultValue('VarientPrivateData'));
 $privatedata=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('VarientPrivateData'),  $privatedata);

 $ret[$i]['pvN']= $args['varient_name'];
 $ret[$i]['Hvrt']= $args['has_varient'];
 $ret[$i]['pvV']= $privatedata['varient_value'];
 $ret[$i]['mainimages']= Walk_Ways_each($privatedata['mainimages'],'reverse_HTML_entities');
 $ret[$i]['webimages']=Walk_Ways_each($privatedata['webimages'],'reverse_HTML_entities');
 $ret[$i]['featureimage']=Walk_Ways_each($privatedata['featureimage'],'reverse_HTML_entities');
 $ret[$i]['bodrs']= $privatedata['Backorders'];
 $ret[$i]['Issh']=$privatedata['isShippable'];
 $ret[$i]['shMe']=$privatedata['Shipping_method'];
 $ret[$i]['W']=$privatedata['weight'];
 $ret[$i]['currency']=($privatedata['currency']=='')?'INR':$privatedata['currency'];
 $ret[$i]['unitsystem']=($privatedata['unitsystem']=='')?'metric':$privatedata['unitsystem'];
 $ret[$i]['Wu']=($privatedata['weightunit']=='')?'kg':$privatedata['weightunit'];

 

           }

            return  $ret;
}

public function ParseOrders($Fields,$args=array()){
     $ret=array();
     $ActorEntityData=$args['ActorEntityData'];
 $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
           for($i=0;$i<count($Fields);$i++){
    $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('orderview'); 
  $EntityInformation= new EntityInformation($Fields[$i]['buyer_entity_id'],$Fields[$i]['store_entity_id']);   
    



$ret[$i]['bESd']= $GLOBALS['Var_ViewParse']->EntityStripdata($EntityInformation->frontuser_EntityRow);
$ret[$i]['sESd']= $GLOBALS['Var_ViewParse']->EntityStripdata($EntityInformation->actoruser_EntityRow); 
 $order_data=JsonTrueDecode($Fields[$i]['order_data'],array( 
    'sub_total'=>0.00,
    'tax'=>0.00,
    'totalshipping'=>0.00,
    'sur_charge'=>0.00,
    'discount'=>0.00,
    'currency'=>0.00,
    'total_weight'=>0.00,
    'total'=>0.00
    ));    
 $address=$GLOBALS['Var_Utility']->ParseOrderAddress($Fields[$i]['shipping_address'],'decode'); 
 $itemsData=JsonTrueDecode($Fields[$i]['cartVarient_data'],array()); 
$ret[$i]['id']=$Fields[$i]['order_id'];
$ret[$i]['oid']=$Fields[$i]['order_id'];
$ret[$i]['type']=$Fields[$i]['order_type'];
$ret[$i]['status']=$Fields[$i]['order_status'];
$ret[$i]['date']=date_in_timezone( $zone,$Fields[$i]['order_time']);
$ret[$i]['currency']=$order_data['currency'];
$ret[$i]['total']=$order_data['total']; 
$ret[$i]['sub_total']=$order_data['sub_total']; 
$ret[$i]['address']=$address; 
$ret[$i]['total_weight']=$order_data['total_weight']; 
$ret[$i]['shipping_charge']=$order_data['shipping_charge']; 
$ret[$i]['totalshipping']=($order_data['shipping_charge']+$order_data['sur_charge']); 
$ret[$i]['discount']=$order_data['discount']; 
$ret[$i]['sur_charge']=$order_data['sur_charge'];
$ret[$i]['itemsData']=$itemsData;
$track= $this->RetriveById(array('table'=>'OrderTracking','order_id'=>$Fields[$i]['order_id']));
$ret[$i]['track']=$this->ParseOrderTracking($track,array('ActorEntityData'=>$ActorEntityData,'itemsData'=>$itemsData));

$ret[$i]['nstatus']=$GLOBALS['Var_Utility']->GetNextOrderStatus($Fields[$i]['order_type'],$Fields[$i]['order_status'],$Fields[$i]['buyer_entity_id'],$Fields[$i]['store_entity_id']);


if(isset($args['items'])){
    
$varient_id=JsonTrueDecode($Fields[$i]['cartVarient_id'],array());

$items=$this->RetriveById(array('table'=>'orderitemView','varient_id'=>$varient_id,'entity_id'=>$ActorEntityData['EntityData']['entity_id']));
 $ret[$i]['itemsvid']=$varient_id ; 
 $ret[$i]['items']=$this->ParseOrderItem($items,array('ActorEntityData'=>$ActorEntityData,'itemsData'=>$itemsData)) ; 
}



           }

            return  $ret; 
}

public function ParseOrderItem($Fields,$args=array()){
      $ret=array();
     $ActorEntityData=$args['ActorEntityData'];
 $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']); 
           for($i=0;$i<count($Fields);$i++){
 $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('orderitemViewdata');           

  $ret[$i]['id']=$Fields[$i]['varient_id'];
 $ret[$i]['vid']=$Fields[$i]['varient_id'];
 $ret[$i]['pid']=$Fields[$i]['product_id'];
 $ret[$i]['pN']=$Fields[$i]['product_name']; 
 $ret[$i]['slug']=$Fields[$i]['content_slug'];

 $ret[$i]['vid']=$Fields[$i]['varient_id'];
 $ret[$i]['sP']=$args['itemsData'][$Fields[$i]['varient_id']]['sP']; 
 $ret[$i]['q']=$args['itemsData'][$Fields[$i]['varient_id']]['q'];    
 $ret[$i]['sku']=$Fields[$i]['sku'];
 $ret[$i]['stk']=$Fields[$i]['Stock'];
  $privatedata=JsonTrueDecode($Fields[$i]['private_data'],$GLOBALS['Var_BundlePrototype']->DefaultValue('VarientPrivateData'));
 $ret[$i]['mainimages']= Walk_Ways_each($privatedata['mainimages'],'reverse_HTML_entities');
 $ret[$i]['webimages']=Walk_Ways_each($privatedata['webimages'],'reverse_HTML_entities');
 $ImageFile=$GLOBALS['Var_Utility']->GetImageOfProduct($ret[$i]);
 $ret[$i]['images']=$GLOBALS['Var_Utility']->GetImageURL(array('file'=> $ImageFile,
        'width'=> 400,
        'height'=>400,
        'type'=> 'resize'));

 //--
 //$names=$privatedata['varient_name'];
  $product_private_data=JsonTrueDecode($Fields[$i]['product_private_data'],array('has_varient'=>0,
                                     'varient_name'=>array('','','')));
 $namevalueList=''; $names= $product_private_data['varient_name'];
 if($product_private_data['has_varient']==1){

 foreach($privatedata['varient_value'] as $n=> $v){
  $namevalueList.='<span class="span">'.$names[$n].'</span><span class="span">'.$v.'</span>'; 
 }


 }


 $ret[$i]['pvNVl']=$namevalueList;
  $ret[$i]['privatedata']=$privatedata;



           }
   return  $ret; 
}


public function ParseOrderTracking($Fields,$args=array()){
         $ret=array();$group_date = '';
 $ActorEntityData=$args['ActorEntityData'];
 $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);

  for($i=0,$j=0;$j<count($Fields);$j++){
   
$ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('ordertrackingview'); 
$DataTime=date_in_timezone( $zone,$Fields[$j]['update_date_gmt']);

  $row_type=0; 
   $message_date=DateChatGrouping($DataTime);
            if( $group_date!=$message_date){
                $row_type=1;
                $group_date=$message_date;
            }
                //--row_type ==1 for date grouped message
    if($row_type==1){
       

      $ret[$i]['rowtype']=1;
      $ret[$i]['msg']=DateChatGrouping($DataTime);
      $ret[$i]['date']= $group_date;
        $i++;
    }
 
$ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('ordertrackingview'); 
$ret[$i]['tid']=$Fields[$j]['order_tracking_id'];

$ret[$i]['type']=$Fields[$j]['tracking_type'];
$ret[$i]['status']=$Fields[$j]['to_status'];
if($Fields[$j]['tracking_type']==1){
   $Fields[$j]['tracking_msg']=' Status Changed to <i class="fw-b">'.$GLOBALS['Var_Utility']->GetStatusName($Fields[$j]['to_status']).' </i> </br>' . $Fields[$j]['tracking_msg']; 

}


$ret[$i]['msg']=$Fields[$j]['tracking_msg'];
$ret[$i]['date']=date_dayformat($DataTime);
  $ret[$i]['rowtype']=0;
   $i++;
           }

return  $ret;
}

public function ParseDiscount($Fields,$args=array()){
          $ret=array();$group_date = '';
 $ActorEntityData=$args['ActorEntityData'];
 $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);

  for($i=0,$j=0;$j<count($Fields);$j++){
   
$ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('discount'); 



$ret[$i]['id']=$Fields[$j]['discount_id'];
$ret[$i]['d']=$Fields[$j]['discount'];
$ret[$i]['dc']=$Fields[$j]['discount_code'];
$ret[$i]['dt']=$Fields[$j]['discount_type'];
$ret[$i]['bd']=$Fields[$j]['begin_date'];
$ret[$i]['ed']=$Fields[$j]['expire_date'];
$ret[$i]['at']=$Fields[$j]['apply_type'];
$ret[$i]['drt']=$Fields[$j]['date_range_type'];
$ret[$i]['ut']=$Fields[$j]['uses_type'];
$ret[$i]['v']=$Fields[$j]['validity'];
$ret[$i]['eid']=$Fields[$j]['entity_id'];
$ret[$i]['ms']=$Fields[$j]['minimum_spend'];


   $i++;
           }

return  $ret;   



}


/**
* @description=>$GLOBALS['Var_Update']->StoreMenu($args);
* @param  => 
* @return => 
*/
public function GetCategoryBox($args=array()){
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
$EntityRow=$args['EntityData'];

  $parse=array();
 if($EntityRow['type']==1){


 $categoryBox=$EntityRow['public_data']['categoryBox'];
 if(is_array( $categoryBox)){
  

  foreach($categoryBox as $q=>$value ){
   
     $cid=GetPropertyInArray('cid',$value,'');
     $sort=GetPropertyInArray('sort',$value,0);
     if($cid!=0||$cid!=''){
         
$row=$GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_categories','entity_id'=>$EntityRow['entity_id'],'category_id'=>$value['cid']));

   $ParseCategory=$GLOBALS['Var_StoreDashboard']->ParseCategory($row,array('parseLevel'=>0))[0];

 $parse[]=array('id'=>$ParseCategory['cid'],'cid'=>$ParseCategory['cid'],'cN'=>$ParseCategory['cN'],'slug'=>$ParseCategory['slug'],'sort'=>$sort);
     }

       
 }
 }

 }
 return $parse;

}
/**
* @description=>$GLOBALS['Var_Update']->GetSliderBox($args);
* @param  => 
* @return => 
*/
public function GetSliderBox($args=array()){
    $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
$EntityRow=$args['EntityData'];

  $parse=array();
 if($EntityRow['type']==1){






 $parse=$EntityRow['public_data']['sliderBox'];
 if(!is_numeric_index_array($parse)){
   foreach($parse as $q =>$v){
       if(!is_numeric($q)){
           unset($parse[$q]);
       }
   } 
 }
 

 foreach($parse as $q =>$v){
  
  $v=   True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('sliderBox'), $v);
     foreach($v['mainimages'] as $a=>$b){
         if(isset($b['url'])){
           $parse[$q]['mainimages'][$a]['url']=validate_word('reverse_HTML_entities',$b['url']);
         }

     }

   foreach($v['webimages'] as $c=>$d){
         if(isset($d['url'])){
           $parse[$q]['webimages'][$c]['url']=validate_word('reverse_HTML_entities',$d['url']);
         }

     }

 }

 

 }
 return $parse; 



}

/**
* @description=>$GLOBALS['Var_Update']->StoreMenu($args);
* @param  => 
* @return => 
*/
public function GetStoreMenu(){
$ActorEntityData= $GLOBALS['Var_ActorEntityData'];

 $storemenu=array('menu'=>array(),'eh'=>array());
 $args['entity_id']=$ActorEntityData['EntityData']['entity_id'];
   $TableCode=0;
  if(isset($ActorEntityData['EntityData']['private_data']['store_menu_table_code'])){
        $TableCode=$ActorEntityData['EntityData']['private_data']['store_menu_table_code'];
  }
  $TableName='store_menu_'.$TableCode;


   $result=$GLOBALS['Var_DBMysqli']->query('SELECT * FROM '.DB_NAME_UTILITY_0.'.'. $TableName.'  a
   WHERE a.store_id = '.$args['entity_id'].'
    ');



    if(count($result)>0){
 $storemenu['menu'] =  array();
        for($i=0;$i<count($result);$i++){
 if( $result[$i]['parent']==''){
     $result[$i]['parent']=NULL;

 }
  $storemenu['menu'][]= $result[$i];


        }
 
    }



return  $storemenu;
}






//-------===delete====------------

public function Deleting($args){
      $arr=array('state' =>500,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array())); 

switch($args['AppId']){
           
case 'dashboard_categories':
$ROW=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validownerCategory_id','category_id'=>$args['id'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));

if($ROW!=NULL){
    $categoryData=$this->RetriveById(array('table'=>'store_categories','category_id'=>$args['id'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));  
     // delete category row

$GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_categories',array('deleted'),array(1),array('category_id'),array($args['id']));
  $GLOBALS['Var_Spread']->DeleteSpread( $categoryData[0]['spread_id']);

   $arr['state']=200;

}else{
  $arr['mistake']['message'][]='Invalid delete';

    }


break;

case 'dashboard_products':
 $Data=$this->RetriveById(array('table'=>'store_products','product_id'=>$args['id'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));  

if(count( $Data)>0){
   
     // delete category row

$GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_products',array('deleted'),array(1),array('product_id'),array($args['id']));
  $GLOBALS['Var_Spread']->DeleteSpread(  $Data[0]['spread_id']);

   $arr['state']=200;

}else{
  $arr['mistake']['message'][]='Invalid delete';

    }


break;


case 'product_varient':
$GLOBALS['Var_DBMysqli']->update(DB_NAME,'product_varients',array('deleted'),array(1),array('varient_id'),array($args['varient_id']));
$arr['state']=200;

break;

case 'dashboard_shipping':
 $Data=$this->RetriveById(array('table'=>'store_shipping','shipping_id'=>$args['id'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));  

if(count( $Data)>0){
   
     // delete category row

$GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_shipping',array('deleted'),array(1),array('shipping_id'),array($args['id']));
 

   $arr['state']=200;

}else{
  $arr['mistake']['message'][]='Invalid delete';

    }


break;
case 'dashboard_companycategories':
$ROW=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validownercompanycategories_id','category_id'=>$args['id'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));

if($ROW!=NULL){
    $categoryData=$GLOBALS['Var_Company_Dashboard'] ->RetriveById(array('table'=>'company_categories','category_id'=>$args['id'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));  
     // delete category row

$GLOBALS['Var_DBMysqli']->update(DB_NAME,'company_categories',array('deleted'),array(1),array('category_id'),array($args['id']));
  $GLOBALS['Var_Spread']->DeleteSpread( $categoryData[0]['spread_id']);

   $arr['state']=200;

}else{
  $arr['mistake']['message'][]='Invalid delete';

    }


break;

       }



  return $arr;
}



}



$GLOBALS['Var_StoreDashboard'] =new StoreDashboard();






?>