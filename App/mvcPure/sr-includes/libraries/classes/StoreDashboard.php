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
      $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_products', array('product_name','product_public_data','product_private_data','product_categories','edit_history'),array($args['product_name'],$args['product_public_data'],$args['product_private_data'],$args['category'],$AutherInfo),array('product_id'),array($args['product_id']));
           
     

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
$args['product_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'store_products', array('product_name','spread_id','entity_id','product_public_data','product_private_data','product_categories','edit_history'),array($args['product_name'],$args['spread_id'],$args['entity_id'],$args['product_public_data'],$args['product_private_data'],$args['category'],$AutherInfo));

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
   $id=GetPropertyInArray('id',$args['spf'],'');
    $act=GetPropertyInArray('act',$args['spf'],1);//act ==1 ==>edit |new
    $count=count($specifications);
    if($act==1){
        
if($id==''){
     $id=$count;  
   }

    $specifications[$id]=$args['spf'];

 $specifications=  array_values($specifications);

    $SafeEncode=Makejson_0($specifications);
  
   


    }else{

   if($id>$count){
     $id=$count;  
       }
unset($specifications[$id]);//deleteing key
 $specifications=  array_values($specifications);

    $SafeEncode=Makejson_0($specifications);

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

     $GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_shipping', array('shipping_name','entity_id','type','range_data','location_data','locations','timed_charge','description','edit_history'),array($args['shipping_name'],$args['entity_id'],$args['type'],$args['range_data'],$args['location_data'],$args['locations'],$args['timed_charge'],$args['description'],$AutherInfo),array('shipping_id'),array($args['shipping_id']));



    }else{//insert
  $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(0,$args['ActorEntityData'],array());
    //inserting
$args['shipping_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'store_shipping', array('shipping_name','entity_id','type','range_data','location_data','locations','timed_charge','description','edit_history'),array($args['shipping_name'],$args['entity_id'],$args['type'],$args['range_data'],$args['location_data'],$args['locations'],$args['timed_charge'],$args['description'],$AutherInfo));
      
        }

return $args['shipping_id'];
}

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
 LIMIT 1
 ';

break;    
case'store_categories':


$selectsql='SELECT * FROM '.DB_NAME.'.store_categories a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.entity_id='.$args['entity_id'].'
  AND  a.deleted =0
 AND  a.category_id ='.$args['category_id'].'
 AND  CAST(b.object_id As SIGNED) =a.category_id 
  AND  b.object_type ="category"
  AND c.spread_id=a.spread_id
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
case'store_productsByIdArray':


if(is_array($args['product_id'])){
  $args['product_id']='"'.implode('","',$args['product_id']).'"';
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
$selectsql='SELECT * FROM '.DB_NAME.'.all_location a 
 WHERE a.location_id IN ('.$args['location_id'].')
 ';


break;
case'store_productsByVarientIdArray':

if(is_array($args['varient_id'])){
  $args['product_id']='"'.implode('","',$args['varient_id']).'"';
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
  AND  a.entity_id='.$args['entity_id'].'
  AND  CAST(b.object_id As SIGNED) =a.product_id 
  AND  b.object_type ="product"
  AND c.spread_id=a.spread_id
 ';


break;

case 'product_ratting':
 $total_sql=array();
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

$total_sql[]='(SELECT COUNT(activity_ref_id	) as total
      FROM '.DB_NAME.'.activity_ref f 
 WHERE f.object_id	= '.$args['product_id'].'
  AND	f.activity_code= "702"
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
case 'store_shipping':
$numsql='SELECT COUNT(*) FROM '.DB_NAME.'.store_shipping a
 WHERE a.entity_id='.$args['entity_id'].'
 AND  a.deleted =0 ';



$selectsql='SELECT * FROM '.DB_NAME.'.store_shipping a
 WHERE a.entity_id='.$args['entity_id'].'
 AND  a.deleted =0
 ';

  
  if($args['search_str']!=''){
$serachquery=' AND (a.shipping_name	 LIKE "%'.$args['search_str'].'%"||a.shipping_name	 LIKE "%'.$args['search_str'].'")';

$numsql.=$serachquery;
  $selectsql.=$serachquery;
 }

 $selectsql.=' ORDER BY a.shipping_name	 ASC ';
break;


case 'store_products':
$numsql='SELECT COUNT(*) FROM '.DB_NAME.'.store_products a
 WHERE a.entity_id='.$args['entity_id'].'
 AND  a.deleted =0
';



$selectsql='SELECT * FROM '.DB_NAME.'.store_products a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.entity_id='.$args['entity_id'].'
  AND  a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.product_id 
  AND  b.object_type ="product"
  AND c.spread_id=a.spread_id';

 
  if($args['search_str']!=''){
$serachquery=' AND (a.product_name	 LIKE "%'.$args['search_str'].'%"||a.product_name	 LIKE "%'.$args['search_str'].'")';

$numsql.=$serachquery;
  $selectsql.=$serachquery;
 }

$selectsql.=' ORDER BY a.product_name	 ASC ';
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

    return array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$result,
          'totalpage'=>$paging_data['total_page'],
          'searchstr'=>$args['search_str'],
          'selectedid'=>$args['selected_id']
             );

}
/**
* @description=>OrderRetrive.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/
public function OrderRetrive($args=array()){
$activeStatus= GetPropertyInArray('status',$args['ActiveFilter'],array());
$activetype= GetPropertyInArray('type',$args['ActiveFilter'],array());  

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


 $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);




//linit sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';
 $selectsql.=$limit;


   $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;

  return array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$result,
          'totalpage'=>$paging_data['total_page'],
          'totalresult'=>$total_result,
          'searchstr'=>$args['search_str'],
          'selectedid'=>$args['selected_id'] ,
          'ActiveFilter'=>$args['ActiveFilter'],
          'mainFilter'=>$this->GetOrderMainFilter(array('ActiveFilter'=>$args['ActiveFilter'],'store_id'=>$args['entity_id']))
             );
}
/**
* @description=>GetOrderMainFilter.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/

public  function GetOrderMainFilter($args=array()){
 $Filter=array();
 $total_sql=array();
 $activeStatus= GetPropertyInArray('status',$args['ActiveFilter'],array());
 $activetype= GetPropertyInArray('type',$args['ActiveFilter'],array());


 $total_sql[]='SELECT a.order_type as value ,"type" as name, COUNT(a.order_id) as count
FROM '.DB_NAME.'.orders a
WHERE a.store_entity_id = '.$args['store_id'].'
AND a.order_type NOT IN ("'.implode('","',$activetype).'")
GROUP BY a.order_type
';

 $total_sql[]='SELECT  b.order_status as value ,"status" as name, COUNT(b.order_id) as count
FROM '.DB_NAME.'.orders b
WHERE b.store_entity_id = '.$args['store_id'].'
AND b.order_status NOT IN ("'.implode('","',$activeStatus).'")
GROUP BY b.order_status
';







 $search_sql= implode('UNION ALL ',$total_sql);

 
 $result=$GLOBALS['Var_DBMysqli']->query($search_sql);


 //Grouping
   
     $k=0; $p=0;
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





 $Filter['fromDate']=array('28','Jun','2016');
 $Filter['toDate']=array('','','');
return  $Filter;
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

   if(isset($args['parseLevel'])){
        $ret[$i]['eH']=JsonTrueDecode($Fields[$i]['edit_history'],$GLOBALS['Var_BundlePrototype']->DefaultValue('AutherInfo'));    //edithistory
   }
     
   

      $spread_content=$GLOBALS['Var_ViewParse']->SpreadContent($Fields[$i]['spread_content'],'spread_content');    //spread_id
      $ret[$i]['description']=$spread_content[0]['content'];
      //getting parrent infomation
   if($ret[$i]['pa_id']!=''&&intval($ret[$i]['pa_id'])!=0&&!isset($args['parseLevel'])){
            $pa_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'store_categories', array('entity_id','category_id'),array(intval($Fields[$i]['entity_id']),intval($ret[$i]['pa_id']))); 

$ret[$i]['pa']=$this->ParseCategory($this->RetriveById(array('table'=>'categoriesParentTree','category_id'=>$Fields[$i]['parent_id']))) ;
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
    
    $range_data=JsonTrueDecode($Fields[$i]['range_data'],array());
    //--locationdata array
    $location_data=array();
  $LocationRawData=JsonTrueDecode($Fields[$i]['location_data'],array());
 
   
  $location_info=$this->RetriveById(array('table'=>'LocationByIdArray','location_id'=>$Fields[$i]['locations']));

  if(count($LocationRawData)==count($location_info)){
      foreach($LocationRawData as $key=>$value){
          $row=array();
          $row[0]=$value[0];
          $row[1]=$value[1];

          $locName='';
       for($p=0;$p<count($location_info);$p++){
              if($location_info[$p]['location_id']==$value[0]){
               $locName=''.$location_info[$p]['pincode'].'-'.$location_info[$p]['location_name'].' '.$location_info[$p]['Districtname'].' '. strtolower($location_info[$p]['Statename']).' '.$location_info[$p]['Country'].'';      
              }
          }


          $row[2]= $locName;

         $location_data[]=$row;
      }
  }


    //-->>locationdata


    $ret[$i]['srng']=$range_data;    
    $ret[$i]['lif']=$location_data;       
    $ret[$i]['stcg']=array();    

   

     }
       return  $ret;
}

public function ParseProducts($Fields,$args=array()){
         $ret=array(); 
           for($i=0;$i<count($Fields);$i++){
    $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('Product_basic');  
    $ret[$i]['id']=$Fields[$i]['product_id'];    
    $ret[$i]['pid']=$Fields[$i]['product_id'];     //shipping_id
    $ret[$i]['sid']=$Fields[$i]['spread_id'];    //spread_id
    $ret[$i]['pN']=$Fields[$i]['product_name']; 
    $ret[$i]['slug']=$Fields[$i]['content_slug'];   //category_NAme
    $spread_content=$GLOBALS['Var_ViewParse']->SpreadContent($Fields[$i]['spread_content'],'spread_content');
    $ret[$i]['des']= $spread_content[0]['content'];
   
  $publicdata=JsonTrueDecode($Fields[$i]['product_public_data'],array('keyfeature'=>$ret[$i]['kf'],
                                     'SearchWord'=>$ret[$i]['sW']));

  $privatedata=JsonTrueDecode($Fields[$i]['product_private_data'],array('has_varient'=>$ret[$i]['Hvrt'],
                                     'varient_name'=>$ret[$i]['pvN']));
  $categories=JsonTrueDecode($Fields[$i]['product_categories'],array());
  //--specifications
  $specifications=JsonTrueDecode($Fields[$i]['specifications'],array(array('heading'=>'demo','specifications'=>array(array('name','value')))));

foreach($specifications as $key=>$value){
    if(is_null($value) || $value == '')
        unset($specifications[$key]);
}
 $specifications=  array_values($specifications);
//removeing null value
  //-->>specifications

    $ret[$i]['pC']=$this->ParseCategory($this->RetriveById(array('table'=>'categoriesParentTree','category_id'=>$Fields[$i]['product_categories'])),array()) ;

//ratting                       
$ratting=$this->RetriveById(array('table'=>'product_ratting','spread_id'=>$Fields[$i]['spread_id'],'product_id'=>$Fields[$i]['product_id']));
$ret[$i]['rf']['Total']=array(
		'5star' =>intval($ratting[0]['total']),
		'4star' =>intval($ratting[1]['total']),
		'3star' => intval($ratting[2]['total']),
		'2star' => intval($ratting[3]['total']),
		'1star' =>intval($ratting[4]['total']),
	);

//ratting

//--in viewd and in cart
$ret[$i]['pvs']=intval($ratting[5]['total']);
$ret[$i]['pic']=intval($ratting[6]['total']);
//-->>


  $ret[$i]['pvN']=$privatedata['varient_name'];

 $varientQuerySql='SELECT * FROM '.DB_NAME.'.product_varients a 
 WHERE a.product_id='.$Fields[$i]['product_id'].'
 AND  a.deleted =0
 ';



    $ret[$i]['Hvrt']=$privatedata['has_varient'];
    $ret[$i]['pvDD']['pid']=$ret[$i]['pid'];
    $ret[$i]['pvDD']['Hvrt']=$ret[$i]['Hvrt'];
    $ret[$i]['pvDD']['pvN']=$ret[$i]['pvN'];

        $ret[$i]['pvL']=$this->ParseProductVarients($GLOBALS['Var_DBMysqli']->query($varientQuerySql),array('varient_name'=>$ret[$i]['pvN'],'has_varient'=>$ret[$i]['Hvrt'])); 
        if(count($ret[$i]['pvL'])<=0){//incomplete inventry
           $ret[$i]['pvL'] =array($ret[$i]['pvDD']);
        }
       

    $ret[$i]['sW']= $publicdata['SearchWord'];
    $ret[$i]['kf']= $publicdata['keyfeature'];
    $ret[$i]['spfl']= $specifications;


    $ret[$i]['fiatr']= $this->RetriveById(array('table'=>'filter_attributesByIdArray','product_id'=>$Fields[$i]['product_id']));

    if(!isset($args['parseLevel'])){
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
 $ret[$i]['pvN']= $args['varient_name'];
 $ret[$i]['Hvrt']= $args['has_varient'];
 $ret[$i]['pvV']= $privatedata['varient_value'];
 $ret[$i]['mainimages']= Walk_Ways_each($privatedata['mainimages'],'reverse_HTML_entities');
 $ret[$i]['webimages']=Walk_Ways_each($privatedata['webimages'],'reverse_HTML_entities');
 $ret[$i]['bodrs']= $privatedata['Backorders'];
 $ret[$i]['Issh']=$privatedata['isShippable'];
 $ret[$i]['shMe']=$privatedata['Shipping_method'];
 $ret[$i]['W']=$privatedata['weight'];
 $ret[$i]['Wu']=$privatedata['weightunit'];
 $ret[$i]['currency']=$privatedata['currency'];
 $ret[$i]['unitsystem']=$privatedata['unitsystem'];

 

           }

            return  $ret;
}

public function ParseOrders($Fields,$args=array()){
     $ret=array();
           for($i=0;$i<count($Fields);$i++){
    $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('orderview'); 
  $EntityInformation= new EntityInformation($Fields[$i]['buyer_entity_id'],$Fields[$i]['store_entity_id']);   
    
$ret[$i]['bESd']= $GLOBALS['Var_ViewParse']->EntityStripdata($EntityInformation->frontuser_EntityRow);
$ret[$i]['sESd']= $GLOBALS['Var_ViewParse']->EntityStripdata($EntityInformation->actoruser_EntityRow); 
 $order_data=JsonTrueDecode($Fields[$i]['order_data'],array( 'sub_total'=>0.00,
    'tax'=>0.00,
    'sur_charge'=>0.00,
    'discount'=>0.00,
    'currency'=>0.00,
    'total_weight'=>0.00,
    'total'=>0.00));    
 $address=JsonTrueDecode($Fields[$i]['shipping_address'],array());  
 $itemsData=JsonTrueDecode($Fields[$i]['cartVarient_data'],array()); 

$ret[$i]['oid']=$Fields[$i]['order_id'];
$ret[$i]['type']=$Fields[$i]['order_type'];
$ret[$i]['status']=$Fields[$i]['order_status'];
$ret[$i]['date']=$Fields[$i]['order_time'];
$ret[$i]['currency']=$order_data['currency'];
$ret[$i]['total']=$order_data['total']; 
$ret[$i]['sub_total']=$order_data['sub_total']; 
$ret[$i]['address']=$address; 
$ret[$i]['total_weight']=$order_data['total_weight']; 
$ret[$i]['shipping_charge']=$order_data['shipping_charge']; 
$ret[$i]['discount']=$order_data['discount']; 
$ret[$i]['sur_charge']=$order_data['sur_charge'];
$ret[$i]['itemsData']=$itemsData;
           }

            return  $ret; 
}

public function GetCategoryBox($args=array()){
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');
$EntityRow=$args['EntityData'];

  $parse=array();
 if($EntityRow['type']==1){


 $categoryBox=$EntityRow['private_data']['categoryBox'];

  foreach($categoryBox as $q=>$value ){
   
     $cid=GetPropertyInArray('cid',$value,'');
     $sort=GetPropertyInArray('sort',$value,0);
     if($cid!=0||$cid!=''){
         
$row=$GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_categories','entity_id'=>$EntityRow['entity_id'],'category_id'=>$value['cid']));

   $ParseCategory=$GLOBALS['Var_StoreDashboard']->ParseCategory($row,array('parseLevel'=>0))[0];

 $parse[]=array('cid'=>$ParseCategory['cid'],'cN'=>$ParseCategory['cN'],'slug'=>$ParseCategory['slug'],'sort'=>$sort);
     }

       
 }
 }
 return $parse;

}

public function GetStoreMenu(){
$ActorEntityData= $GLOBALS['Var_ActorEntityData'];

 $storemenu=array('menu'=>array(),'eh'=>array());
 $args['entity_id']=$ActorEntityData['EntityData']['entity_id'];


$get_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'store_menu',array('entity_id'),array($args['entity_id']));
    if($get_row!=NULL){

  $storemenu['menu'] =JsonTrueDecode($get_row['menu'],array());
  $storemenu['eh'] =JsonTrueDecode($get_row['edit_history'],array());
    }



return  $storemenu;
}






//-------===delete====------------

public function Deleting($args){
      $arr=array('state' =>500,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array())); 

switch($args['AppId']){
           
case 'dashboard_categories':
if($GLOBALS['Var_UtilityCheck']->IsOwnerCategory($args['id'],$args['ActorEntityData']['entity_id'])){
  $categoryData=$this->RetriveById(array('table'=>'store_categories','category_id'=>$args['id'],'entity_id'=>$args['ActorEntityData']['entity_id']));

  // delete category row

$GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_categories',array('deleted'),array(1),array('category_id'),array($args['id']));
  $GLOBALS['Var_Spread']->DeleteSpread( $categoryData[0]['spread_id']);

   $arr['state']=200;

}else{
  $arr['mistake']['message'][]='Invalid delete';

    }


break;
case 'product_varient':
$GLOBALS['Var_DBMysqli']->update(DB_NAME,'product_varients',array('deleted'),array(1),array('varient_id'),array($args['varient_id']));
$arr['state']=200;

break;




       }



  return $arr;
}



}



$GLOBALS['Var_StoreDashboard'] =new StoreDashboard();






?>