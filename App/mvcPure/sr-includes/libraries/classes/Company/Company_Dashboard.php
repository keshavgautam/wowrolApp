<?php
    


/**
* @description=>process the given data .
* @param  => 
* @return => 
*/
class Company_Dashboard{
    

/**/
public function  RagisterCategory($args){
     //In Order to save one sql query We use getrow instead of numrow
      $get_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'company_categories', array('entity_id','category_id'),array($args['entity_id'],$args['category_id']));
   
     
         if($get_row!=NULL){
           //update
        $edit_history=   JsonTrueDecode($get_row['edit_history'],$GLOBALS['Var_BundlePrototype']->DefaultValue('AutherInfo')); 
           $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(1,$args['ActorEntityData'],$edit_history);
           //prevent to be self parent
           $args['parent_id']=($args['parent_id']==$args['category_id'])?'':$args['parent_id'];


            $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'company_categories', array('category_name','parent_id','edit_history'),array($args['category_name'],$args['parent_id'],$AutherInfo),array('category_id'),array($args['category_id']));

      
      //updating spread text
    $args['attached_object_Str']=implode(",",array($args['category_id']));  
           $spreadargs = array(
		'spread_id' => intval($get_row['spread_id']),
		'entity_id' =>$args['ActorEntityData']['EntityData']['entity_id'],
		'owner_entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
		'spread_content' => $args['description'],
		'quick_action_type'=>0,
        'spread_perpose'=>  21,
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
        'spread_perpose'=>  21,
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
$args['category_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'company_categories', array('category_name','spread_id','entity_id','parent_id','edit_history'),array($args['category_name'],$args['spread_id'],$args['entity_id'],$args['parent_id'],$AutherInfo));

//updateing the attached object
//updateing the attached object
 $args['attached_object_Str']=implode(",",array($args['category_id']));
  $GLOBALS['Var_DBMysqli']->update(DB_NAME,'spread',array('attached_object'),array($args['attached_object_Str']),array('spread_id'),array($args['spread_id']));  


//getting slug

 $slug=$GLOBALS['Var_PageSlug']->Unique_Slug($args['category_name'],'company-category',$args['category_id']);


         }


   return  $args['category_id'];

}


/*


*/

public function RagisterBrand($args){
  //In Order to save one sql query We use getrow instead of numrow
      $get_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'company_brand', array('entity_id','brand_id'),array($args['entity_id'],$args['brand_id']));
   
     
         if($get_row!=NULL){
           //update
              $edit_history=   JsonTrueDecode($get_row['edit_history'],$GLOBALS['Var_BundlePrototype']->DefaultValue('AutherInfo')); 

 $args['attached_object_Str']=implode(",",array($args['brand_id']));
 //updating spread text

           $spreadargs = array(
		'spread_id' => intval($get_row['spread_id']),
		'entity_id' =>$args['ActorEntityData']['EntityData']['entity_id'],
		'owner_entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
		'spread_content' => $args['description'],
		'quick_action_type'=>0,
        'spread_perpose'=>  22,
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
      $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'company_brand', array('product_name','product_public_data','product_private_data','product_categories','search_data','edit_history'),array($args['product_name'],$args['product_public_data'],$args['product_private_data'],$args['category'],$args['search_data'],$AutherInfo),array('brand_id'),array($args['brand_id']));
           
     

            }else{
             //insert
 $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(0,$args['ActorEntityData'],array());
   $spreadargs = array(
		'spread_id' =>  0,
		'entity_id' =>$args['ActorEntityData']['EntityData']['entity_id'],
		'owner_entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
		'spread_content' => $args['description'],
		'quick_action_type'=>0,
        'spread_perpose'=>  22,
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
$args['brand_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'company_brand', array('product_name','spread_id','entity_id','product_public_data','product_private_data','product_categories','search_data','edit_history','countryinfo_id'),array($args['product_name'],$args['spread_id'],$args['entity_id'],$args['product_public_data'],$args['product_private_data'],$args['category'],$args['search_data'],$AutherInfo,$args['ActorEntityData']['EntityData']['private_data']['countryinfo_id']));

//updateing the attached object
 $args['attached_object_Str']=implode(",",array($args['brand_id']));
  $GLOBALS['Var_DBMysqli']->update(DB_NAME,'spread',array('attached_object'),array($args['attached_object_Str']),array('spread_id'),array($args['spread_id']));  

//getting slug

 $slug=$GLOBALS['Var_PageSlug']->Unique_Slug($args['product_name'],'brand',$args['brand_id']);


            }


   return  $args['brand_id'];


    
}
/**
* @description=>retrive the table data.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/  


public function RagisterBrandVarient($args){
   

    $get_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'company_brand_varient', array('brand_varient_id'),array($args['brand_varient_id']));

   
 


      if($get_row!=NULL){
 //updateing
   $edit_history=   JsonTrueDecode($get_row['edit_history'],$GLOBALS['Var_BundlePrototype']->DefaultValue('AutherInfo'));
      $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(1,$args['ActorEntityData'],$edit_history);

$GLOBALS['Var_DBMysqli']->update(DB_NAME,'company_brand_varient', array('brand_id','sellingPrice','unique_identity','private_data','edit_history'),array($args['brand_id'],$args['sellingPrice'],$args['unique_identity'],$args['private_data'],$AutherInfo),array('brand_varient_id'),array($args['brand_varient_id']));      

      }else{//insert
 $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(1,$args['ActorEntityData'],array());
 //inserting
$args['brand_varient_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'company_brand_varient', array('brand_id','sellingPrice','unique_identity','private_data','edit_history'),array($args['brand_id'],$args['sellingPrice'],$args['unique_identity'],$args['private_data'],$AutherInfo));
      
      }


 return $args['brand_varient_id'];
}

/**
* @description=>ragister a Product specification.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/  
public function RagisterBrandSpecification($args=array()){
    $get_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'company_brand', array('entity_id','brand_id'),array($args['entity_id'],$args['brand_id']));

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
      $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'company_brand', array('specifications'),array($SafeEncode['encode']),array('brand_id'),array($args['brand_id']));
      
     return TRUE;   
    }else{
        return FALSE;  
    }
  


}



/**/


/**
* @description=>ragister a RagisterProductFilter.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/ 
public function RagisterBrandFilter($args=array()){

     $edit_history=   JsonTrueDecode($args['productRow']['edit_history'],$GLOBALS['Var_BundlePrototype']->DefaultValue('AutherInfo')); 
        $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(1,$args['ActorEntityData'],$edit_history);
    $filter_attribute_id=implode(",",$args['FilterAttributesId']);
  /*   $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_products', array('filter_attribute_id','edit_history'),array($filter_attribute_id,$AutherInfo),array('product_id'),array($args['product_id']));*/
  // deleteing in junction table
$delete=$GLOBALS['Var_DBMysqli']->delete(DB_NAME,'filter_attributes_brand_junction',array('brand_id'),array($args['brand_id']));

//insertation

$formatted_fields=array();
     foreach($args['FilterAttributesId'] as $FilterAttributesId){
   $formatted_fields[]=array($FilterAttributesId,$args['brand_id']); 
     }


  $bulk_insert=$GLOBALS['Var_DBMysqli']->bulk_insert(DB_NAME,'filter_attributes_brand_junction',array('filter_attributes_id','brand_id'),$formatted_fields);

        return TRUE;
}
/**
* @description=>retrive the table data.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/  
public function RetriveById($args=array()){
   $row=array(); 
    $selectsql='';
       switch($args['table']){
     case 'company_categories':
     $selectsql=' SELECT * FROM '.DB_NAME.'.company_categories a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.entity_id='.$args['entity_id'].'
  AND  a.deleted =0
 AND  a.category_id ='.$args['category_id'].'
 AND  CAST(b.object_id As SIGNED) =a.category_id 
  AND  b.object_type ="company-category"
  AND c.spread_id=a.spread_id ';
     break;   
        
     case 'company_brand':

$selectsql='SELECT * FROM '.DB_NAME.'.company_brand a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.entity_id='.$args['entity_id'].'
  AND  a.deleted =0
 AND  a.brand_id ='.$args['brand_id'].'
 AND  CAST(b.object_id As SIGNED) =a.brand_id 
  AND  b.object_type ="brand"
  AND c.spread_id=a.spread_id
 ';

     break;
          case 'brand':

$selectsql='SELECT * FROM '.DB_NAME.'.company_brand a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE  a.deleted =0
 AND  a.brand_id ='.$args['brand_id'].'
 AND  CAST(b.object_id As SIGNED) =a.brand_id 
  AND  b.object_type ="brand"
  AND c.spread_id=a.spread_id
 ';

     break;
case'filter_attributesByIdArray':




$selectsql='SELECT * FROM '.DB_NAME.'.filter_attributes a ,'.DB_NAME.'.filter_attributes_brand_junction b 
 WHERE a.filter_attributes_id=b.filter_attributes_id
AND  b.brand_id = '.$args['brand_id'].'
 ';
 
break;

case'categoriesParentTree': //getting category for parent tree
if(is_array($args['category_id'])){
  $args['category_id']='"'.implode('","',$args['category_id']).'"';
}else{
   if($args['category_id']==''){
       $args['category_id']='""';
   }

}
$selectsql='SELECT * FROM '.DB_NAME.'.company_categories a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.category_id IN ('.$args['category_id'].')
  AND  a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.category_id 
  AND  b.object_type ="company-category"
  AND c.spread_id=a.spread_id
 ';
break;

case'brand_varients':

$selectsql='SELECT * FROM '.DB_NAME.'.company_brand_varient a 
 WHERE a.brand_varient_id='.$args['brand_varient_id'].'
  AND  a.deleted =0 
 ';
break;


       }


 $row=$GLOBALS['Var_DBMysqli']->query($selectsql); 

 return $row;
}

/** $GLOBALS['Var_Utility'] ->GetTheCategoryTree($PostalCode,$country_id,$fl_admin_id);
* @description=>
* @param  => 
* @return => 
*/
public function GetTheCategoryTree($category_id,$type='parent'){
$ParentCategory_id='""';
 $Tree=array();

 switch($type){
     case 'parent':
     
$parentTreeSql='SELECT t1.category_id	 AS L1, t2.category_id	 as L2, t3.category_id	 as L3, t4.category_id	 as L4
FROM `company_categories` AS t1
LEFT JOIN `company_categories` AS t2 ON t2.category_id = t1.parent_id
LEFT JOIN`company_categories` AS t3 ON t3.category_id = t2.parent_id
LEFT JOIN `company_categories` AS t4 ON t4.category_id = t3.parent_id
WHERE t1.category_id = '.$category_id.'
 ';
 $parentTree= $GLOBALS['Var_DBMysqli']->query($parentTreeSql);
 $parentTree=(count($parentTree)>0)?$parentTree[0]:array();
 $parentTree=array_values($parentTree);
 $Tree=$parentTree;

if(is_array($parentTree)){
$ParentCategory_id='"'.implode('","',$parentTree).'"';
}else{
   if($parentTree==''){
$ParentCategory_id='""';
   }

}

 
     break;

          case 'child':
     
$parentTreeSql='SELECT t1.category_id	 AS L2, t2.category_id	 as L3, t3.category_id	 as L4, t4.category_id	 as L5
FROM `company_categories` AS t1
LEFT JOIN `company_categories` AS t2 ON t2.category_id = t1.parent_id
LEFT JOIN`company_categories` AS t3 ON t3.category_id = t2.parent_id
LEFT JOIN `company_categories` AS t4 ON t4.category_id = t3.parent_id
WHERE t1.category_id = '.$category_id.'
 ';
 $parentTree= $GLOBALS['Var_DBMysqli']->query($parentTreeSql);
  //check_response( $parentTree);
  $parentTree=$this->ParseCategoryChild( $parentTree);
  //check_response( $parentTree);

 $parentTree=array_values($parentTree);

 $Tree=$parentTree;

if(is_array($parentTree)){
//$ParentCategory_id='"'.implode('","',$parentTree).'"';
}else{
   if($parentTree==''){
$ParentCategory_id='""';
   }

}

 
     break;


 }
 
 
 $selectsql='SELECT DISTINCT p.category_id as cid, p.category_name as cN,q.content_slug as slug 
FROM '.DB_NAME.'.company_categories p,'.DB_NAME.'.page_slug q
WHERE  p.category_id IN ('.$ParentCategory_id.')
 AND  CAST(q.object_id As SIGNED) =p.entity_id
 AND q.object_type="company-category"';

 $result= $GLOBALS['Var_DBMysqli']->query($selectsql);
 

 return array('Tree'=> $Tree,'result'=> $result);
}  


/**
* @description=>retrive the table data.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/
public function TableRetrive($args=array()){
    $result=array();

    switch($args['table']){
        
case'store_categories':

$numsql='SELECT COUNT(*) FROM '.DB_NAME.'.company_categories a
 WHERE a.entity_id='.$args['entity_id'].'
 AND  a.deleted =0 ';



$selectsql='SELECT * FROM '.DB_NAME.'.company_categories a,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.entity_id='.$args['entity_id'].'
 AND  a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.category_id 
 AND  b.object_type ="company-category"
 AND c.spread_id=a.spread_id
 ';

  
  if($args['search_str']!=''){
$serachquery=' AND (a.category_name LIKE "%'.$args['search_str'].'%"||a.category_name LIKE "%'.$args['search_str'].'")';

$numsql.=$serachquery;
  $selectsql.=$serachquery;
 }

 $selectsql.=' ORDER BY a.category_name ASC ';

break;
case'company_brand':

$SQL_StoreProdcutTable=$GLOBALS['Var_Company_Utility']->SQL_CompanyBrandTable($args);
$numsql=$SQL_StoreProdcutTable['numsql'];
$selectsql=$SQL_StoreProdcutTable['selectsql'];


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
          'selectedid'=>$args['selected_id']
             )) ;

}



/**/
public function ParseCategory($Fields,$args=array()){
      $ret=array();
 
      if(!isset($args['ActorEntityData'])){
       $args['ActorEntityData']=$GLOBALS['Var_ActorEntityData'];   
      }

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
     
   

       //spread_id
      $ret[$i]['description']=$Fields[$i]['spread_content'];
      //getting parrent infomation
   if($ret[$i]['pa_id']!=''&&intval($ret[$i]['pa_id'])!=0&&!isset($args['parseLevel'])){
            $pa_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'store_categories', array('entity_id','category_id'),array(intval($Fields[$i]['entity_id']),intval($ret[$i]['pa_id']))); 

$pa_detail=$this->ParseCategory($this->RetriveById(array('table'=>'categoriesParentTree','category_id'=>$Fields[$i]['parent_id'])),array('parseLevel'=>1),array('store_EntityData'=>$args['ActorEntityData'])) ;




if(count($pa_detail)>0){
    $ret[$i]['pa']=$pa_detail[0];
}
      }



      
     }
     return  $ret;
}


/**/
public function ParseBrand($Fields,$args=array()){
    $ret=array(); 
   $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
 $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
     
           for($i=0;$i<count($Fields);$i++){

    $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('Product_basic');  
    $ret[$i]['id']=$Fields[$i]['brand_id'];    
    $ret[$i]['pid']=$Fields[$i]['brand_id'];     //shipping_id
    $ret[$i]['sid']=$Fields[$i]['spread_id'];    //spread_id
    $ret[$i]['pN']=$Fields[$i]['product_name']; 
    $ret[$i]['slug']=$Fields[$i]['content_slug'];   //category_NAme

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
    $ratting=$this->RetriveById(array('table'=>'product_ratting','spread_id'=>$Fields[$i]['spread_id'],'product_id'=>$Fields[$i]['brand_id']));
    if(count($ratting)>=6){
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
    
        
    }else{
  $ret[$i]['rf']['Total']=array(
		'5star' =>0,
		'4star' =>0,
		'3star' => 0,
		'2star' => 0,
		'1star' =>0
	);

//--in viewd and in cart
$ret[$i]['pvs']=0;
$ret[$i]['pic']=0;
//-->>         
    }
             


//ratting




  $ret[$i]['pvN']=($privatedata['varient_name']!=NULL)?$privatedata['varient_name']:array('','','');

 $varientQuerySql='SELECT * FROM '.DB_NAME.'.company_brand_varient a 
 WHERE a.brand_id='.$Fields[$i]['brand_id'].'
 AND  a.deleted =0
 ';



    $ret[$i]['Hvrt']=$privatedata['has_varient'];
    $ret[$i]['pvDD']['pid']=$ret[$i]['pid'];
    $ret[$i]['pvDD']['Hvrt']=$ret[$i]['Hvrt'];
    $ret[$i]['pvDD']['pvN']=$ret[$i]['pvN'];

    
       

    $ret[$i]['sW']= '';
    $ret[$i]['kf']= $publicdata['keyfeature'];
    $ret[$i]['spfl']= $specifications;


    $ret[$i]['fiatr']= $this->RetriveById(array('table'=>'filter_attributesByIdArray','brand_id'=>$Fields[$i]['brand_id']));

    $parseLevel=(isset($args['parseLevel']))?$args['parseLevel']:0;
    if( $parseLevel==0||$parseLevel==1){

            $ret[$i]['pvL']=$this->ParseBrandVarients($GLOBALS['Var_DBMysqli']->query($varientQuerySql),array('varient_name'=>$ret[$i]['pvN'],'has_varient'=>$ret[$i]['Hvrt'])); 
        if(count($ret[$i]['pvL'])<=0){//incomplete inventry
           $ret[$i]['pvL'] =array($ret[$i]['pvDD']);
        }
  }

   if( $parseLevel==0){
        //getting up sell
     $upsellList=$this->RetriveById(array('table'=>'store_productsByIdArray','product_id'=>$Fields[$i]['up_sell'],'entity_id'=>$Fields[$i]['entity_id'])); 
       $ret[$i]['upS']=$this->ParseBrand($upsellList,array('parseLevel'=>1)) ; 

      
       //-->>
    }
   

    
     }
       return  $ret;
}

/**/
public function ParseBrandVarients($Fields,$args=array()){
        $ret=array();
           for($i=0;$i<count($Fields);$i++){
              $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('Product_Varient');     
 $ret[$i]['id']=$Fields[$i]['brand_varient_id'];
 $ret[$i]['vid']=$Fields[$i]['brand_varient_id'];
 $ret[$i]['pid']=$Fields[$i]['brand_id'];
 $ret[$i]['sP']=$Fields[$i]['sellingPrice'];

 $ret[$i]['sku']=$Fields[$i]['unique_identity'];

  
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
 $ret[$i]['Wu']=$privatedata['weightunit'];
 $ret[$i]['currency']=$privatedata['currency'];
 $ret[$i]['unitsystem']=$privatedata['unitsystem'];

 

           }

            return  $ret;
}

/*
*@Call $GLOBALS['Var_Company_Dashboard']->ParseBrandForSuggestion()
*/
public function ParseBrandForSuggestion($Fields,$args=array()){
       $ret=array();
$selected=$args['selected'];

      for($i=0,$j=0;$i<count($Fields);$i++){
 
          
               $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$Fields[$i]["product_name"])){
                    $same=1;
              }
              }
      if($same==0){

        $ret[$j]=$GLOBALS['Var_BundlePrototype']->DefaultValue('Product_basic');        
        $ret[$j]['id']= $Fields[$i]["brand_id"];
        $ret[$j]['name']= $Fields[$i]["product_name"];
        $ret[$j]['slug']= $Fields[$i]["content_slug"];

 $privatedata=JsonTrueDecode($Fields[$i]['product_private_data'],array('has_varient'=>$ret[$i]['Hvrt'],
                                     'varient_name'=>$ret[$i]['pvN']));
        
  $ret[$i]['pvN']=($privatedata['varient_name']!=NULL)?$privatedata['varient_name']:array('','','');

 $varientQuerySql='SELECT * FROM '.DB_NAME.'.company_brand_varient a 
 WHERE a.brand_id='.$Fields[$i]['brand_id'].'
 AND  a.deleted =0
 ';



    $ret[$i]['Hvrt']=$privatedata['has_varient'];
    $ret[$i]['pvDD']['pid']=$ret[$i]['pid'];
    $ret[$i]['pvDD']['Hvrt']=$ret[$i]['Hvrt'];
    $ret[$i]['pvDD']['pvN']=$ret[$i]['pvN'];

    $ret[$i]['pvL']=$this->ParseBrandVarients($GLOBALS['Var_DBMysqli']->query($varientQuerySql),array('varient_name'=>$ret[$i]['pvN'],'has_varient'=>$ret[$i]['Hvrt'])); 
        if(count($ret[$i]['pvL'])<=0){//incomplete inventry
           $ret[$i]['pvL'] =array($ret[$i]['pvDD']);
        }

        //-----------
         $j++;
      }
          
          
          
           
       }

        return  $ret;
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


//-----
/*
*/
public function Deleting($args){
      $arr=array('state' =>500,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array())); 

switch($args['AppId']){
           

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


case 'company_brand_varient':
$GLOBALS['Var_DBMysqli']->update(DB_NAME,'company_brand_varient',array('deleted'),array(1),array('brand_varient_id	'),array($args['brand_varient_id']));
$arr['state']=200;

break;


       }



  return $arr;
}


}




$GLOBALS['Var_Company_Dashboard'] =new Company_Dashboard();










?>