<?php
  
  
/**
* @description=>collection of Utility function .
* @param  => 
* @return => 
*/    
class Utility{

/**
* @description=>set a account option or update it.
* @param  => 
* @return => key-value paire Account option
*/ 
public function SetAccountOptions($login_identity_id,$SavedOptions,$option_name,$option_value){

   $defaultPrivate=$SavedOptions;

    $private_data=True_array_merge($defaultPrivate,array($option_name=>$option_value));
   
 $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'account_login_identity',array('private_data'),array(Makejson($private_data)),array('login_identity_id'),array($login_identity_id));

}

public function SetAccountOptionsbyArray($login_identity_id,$SavedOptions,$option_Arr){

   $defaultPrivate=$SavedOptions;

    $private_data=True_array_merge($defaultPrivate,$option_Arr);
   
 $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'account_login_identity',array('private_data'),array(Makejson($private_data)),array('login_identity_id'),array($login_identity_id));

}




/**
* @description=>Get the entity list of account
* @param  => 
* @return => 
*/

public function AccountEnetityData(){
  $ActorEntityData=$GLOBALS['Var_ActorEntityData'];   
  $EnetityData=array();

//--retriving from the  data base

$sql='
SELECT  *  FROM '.DB_NAME.'.entity a
WHERE a.account_id = '.$ActorEntityData['LoginData']['account_id'].'

';

  //-- result query

  $Entity_List=$GLOBALS['Var_DBMysqli']->query($sql);  

   //-->>result query
   
   for($i=0;$i<count($Entity_List);$i++){
      $EnetityData[$i]['entity_id']=$Entity_List[$i]['entity_id'];
      $EnetityData[$i]['type']=$Entity_List[$i]['type'];
      if($Entity_List[$i]['type']==0){
         $EnetityData[$i]['publicInfo']=JsonTrueDecode($Entity_List[$i]['public_data'],$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPublic'));  
      }
       if($Entity_List[$i]['type']==1){
         $EnetityData[$i]['publicInfo']=JsonTrueDecode($Entity_List[$i]['public_data'],$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic'));  
      }
           if($Entity_List[$i]['type']==3){
         $EnetityData[$i]['publicInfo']=JsonTrueDecode($Entity_List[$i]['public_data'],$GLOBALS['Var_BundlePrototype']->DefaultValue('LocationManagerPublic'));  
      }
     if($Entity_List[$i]['type']==4){
         $EnetityData[$i]['publicInfo']=JsonTrueDecode($Entity_List[$i]['public_data'],$GLOBALS['Var_BundlePrototype']->DefaultValue('CompanyPublic'));  
      }
   }


   return $EnetityData;
}


/**$GLOBALS['Var_Utility']->TimezoneDate();
* @description=>Get the entity list of account
* @param  => 
* @return => 
*/
public function TimezoneDate(){
     $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
$zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
  
   return zonedate($zone);
}
/** $GLOBALS['Var_Utility']->AutherInfo()
* @description=>Get the auther from the entity row
* @param  => 
* @return => {auther =>'',
              type=>0|1; 0=>owner,1 =>staff
              time=>''
              action=>0|1; 0=>created,1 =>edited
              }
*/
public function AutherInfo($action,$ActorEntityData,$AutherInfo){
   $info=array('author'=>'',
                'type'=>0,
                'time'=>0,
                'action'=>$action
                );
if(intval($ActorEntityData['visit_data']['wj'])!=0){
    $info['type']=1;
    $info['author']=$ActorEntityData['staffData']['username'];
}

 $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
   $date=zonedate($zone);
 $info['time']=$date;

$AutherInfo[]=   $info;
return Makejson($AutherInfo);
}

/**$GLOBALS['Var_Utility']->GetFilterAttributesId($FilterArray);
* @description=>Get the entity list of account
* @param  => 
* @return => 
*/
public function GetFilterAttributesId($FilterArray){
    $Ids=array();
    $Filters=array();
    foreach($FilterArray as $key=>$value ){
        if($value['name']!=''&&$value['value']!=''){
            
 $get_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'filter_attributes',array('name','value'),array($value['name'],$value['value']));

      if($get_row!=NULL){
      $Ids[]= $get_row['filter_attributes_id'];
     $value['filter_attributes_id']= $get_row['filter_attributes_id'];

      }else{
      $filter_attributes_id= $GLOBALS['Var_DBMysqli']->insert(DB_NAME,'filter_attributes',array('name','value'),array($value['name'],$value['value']));     
      $Ids[]= $value['filter_attributes_id']= $filter_attributes_id;
      }

       $Filters[]=$value;
        }
  

    }

    return  array('id'=>$Ids,'Filters'=>$Filters);
}
/**$GLOBALS['Var_Utility']->GetNextOrderStatus($spreadOwner,$spreadViwer);
* @description=>Next order status
* @param  => 
* @return => 
*/
public function GetNextOrderStatus($orderType,$orderStatus,$buyer_entity_id,$store_entity_id){
    $NextStatus=[];//var Type= ['home delivery', 'self collect', 'inquiry', 'booking'];
    $ActorEntityData= $GLOBALS['Var_ActorEntityData'];
    $EnetityId=$ActorEntityData['EntityData']['entity_id'];
    $Whom=($EnetityId==$buyer_entity_id)?1:0;



    if($Whom==0){
    switch($orderStatus){
     case 0://processing
     if($orderType==0){
        $NextStatus=[1,2,5];    
     }
   if($orderType==1){
        $NextStatus=[3,2,5];    
     }
     break;
    case 1://dispatched
   $NextStatus=[6,7];  
    break;
   case 3://Ready to Collect
   $NextStatus=[6,7];  
    break;
    case 2://Pending
   $NextStatus=[1,3,4];  
    break;
   case 8://To be return 
   $NextStatus=[10,11];  
    break;
 case 9://To be replace 
   $NextStatus=[10,12];    
    break;

    }
    }else{
   switch($orderStatus){
      case 0://processing
   $NextStatus=[4];  
     break;  
     case 6://delivered
   $NextStatus=[8,9,13,14];  
     break;

        }
    }

    return   $NextStatus;
}
/**$GLOBALS['Var_Utility']->GetStatusName($orderStatus);
* @description=>Next order status
* @param  => 
* @return => 
*/
public function GetStatusName($orderStatus){
    $Status= array('Processing', 'Dispatched', 'Pending', 'Ready to Collect','Cancelled by buyer','Cancelled by store','Delivered','Failed','To be returned','To be replaced','Cancelled return/replacement',' returned',' replaced','Completed with Good shopping experience','Completed with Bad shopping experience');
    $name='';
    if(array_key_exists($orderStatus,$Status)){
        $name=$Status[$orderStatus]; 
    }

    return $name;
}

/**$GLOBALS['Var_Utility']->GetImageURL($orderStatus);
* @description=>Next order status
* @param  => 
* @return => 
*/
public function GetImageURL($x){

    $x=True_array_merge(array('file'=> '',
        'width'=> 400,
        'height'=>400,
        'type'=> 'resize'),$x);

    return ProcessCDN.base64_encode(json_encode($x)).'.jpg';
}
/**$GLOBALS['Var_Utility']->GetImageOfProduct($orderStatus);
* @description=>Next order status
* @param  => 
* @return => 
*/
public function GetImageOfProduct($x){
 
   $TheImage=(isset($x['featureimage']['url']))?$x['featureimage']['url']:'';

   if($TheImage==''){
      $TheImage=(isset($x['mainimages']['url']))?$x['mainimages']['url']:'';
      
      if($TheImage==''){
      $TheImage=(isset($x['webimages']['url']))?$x['webimages']['url']:'';
      
      
         
   }
         
   }

   return $TheImage;
}

/**
* @description=>$GLOBALS['Var_Utility'] ->GetCountryList($args);
* @param  => 
* @return => 
*/
public function GetCountryList($args=array()){
  $selectIt=' * ';
  
  if(count($args)>0){
      
      $selectIt=implode(',',$args);

  }



    $selectsql='SELECT '.$selectIt.' FROM '.DB_NAME.'.countryinfo  ';
    

     $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;


     return $result;
}


/**
* @description=>$GLOBALS['Var_Utility'] ->GetCountryList($args);
* @param  => 
* @return => 
*/
public function GetCountryInfo(){
    
}

/** $GLOBALS['Var_Utility'] ->GetPostalCodeId($PostalCode,$country_id);
* @description=>
* @param  => 
* @return => 
*/

public function GetPostalCodeId($PostalCode,$country_id=0){
    $PostalCodeId=0;

    if($country_id!=0){
         $row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'location_postalcode', array('postalCode','country_id'),array($PostalCode,$country_id)); 

       if($row==NULL){
           //inserting
   $PostalCodeId=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'location_postalcode', array('postalCode','country_id'),array($PostalCode,$country_id)); 
   
   
       }else{
           $PostalCodeId=$row['postalCode_id'];    
       }
    }else{
        
          $row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'location_postalcode', array('postalCode'),array($PostalCode)); 
           if($row!=NULL){
             $PostalCodeId=$row['postalCode_id'];  
           }
    }

   return  $PostalCodeId;
}
/** $GLOBALS['Var_Utility'] ->GetCityId($PostalCode,$country_id,$fl_admin_id);
* @description=>
* @param  => 
* @return => 
*/

public function GetCityId($city,$country_id=0,$fl_admin_id=0){
    $CityId=0;

    if($country_id!=0&&$fl_admin_id!=0){
        $is_new=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'location_cities', array('city','country_id','fl_admin_id'),array($city,$country_id,$fl_admin_id)); 

         if( $is_new==0){
           //inserting
 $CityId=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'location_cities', array('city','country_id','fl_admin_id'),array($city,$country_id,$fl_admin_id)); 
   
   
                   }
    }else{
        
          $row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'location_cities', array('city'),array($city)); 
           if($row!=NULL){
          $CityId=$row['city_id'];  
           }
    }

   return     $CityId;
}

/** $GLOBALS['Var_Utility'] ->GetCurrencyData($PostalCode,$country_id,$fl_admin_id);
* @description=>
* @param  => 
* @return => 
*/
public function GetCurrencyData($code){
    return   $mainUserLocationId=  GetPropertyInArray($code,$GLOBALS['Var_Currency'], array (
    'symbol' => '$',
    'name' => 'US Dollar',
    'symbol_native' => '$',
    'decimal_digits' => 2,
    'rounding' => 0,
    'code' => 'USD',
    'name_plural' => 'US dollars',
  ));
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
FROM `store_categories` AS t1
LEFT JOIN `store_categories` AS t2 ON t2.category_id = t1.parent_id
LEFT JOIN`store_categories` AS t3 ON t3.category_id = t2.parent_id
LEFT JOIN `store_categories` AS t4 ON t4.category_id = t3.parent_id
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
FROM  '.DB_NAME.'.`store_categories` AS t1
LEFT JOIN  '.DB_NAME.'. `store_categories` AS t2 ON t2.parent_id = t1.category_id
LEFT JOIN '.DB_NAME.'. `store_categories` AS t3 ON t3.parent_id = t2.category_id
LEFT JOIN '.DB_NAME.'. `store_categories` AS t4 ON t4.parent_id = t3.category_id
LEFT JOIN '.DB_NAME.'. `store_categories` AS t5 ON t5.parent_id = t4.category_id
WHERE t1.category_id = '.$category_id.'
 ';
 $parentTree= $GLOBALS['Var_DBMysqli']->query($parentTreeSql);
  check_response( $parentTree);
  $parentTree=$this->ParseCategoryChild( $parentTree);
  check_response( $parentTree);

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
FROM '.DB_NAME.'.store_categories p,'.DB_NAME.'.page_slug q
WHERE  p.category_id IN ('.$ParentCategory_id.')
 AND  CAST(q.object_id As SIGNED) =p.entity_id
 AND q.object_type="category"';

 $result= $GLOBALS['Var_DBMysqli']->query($selectsql);
 

 return array('Tree'=> $Tree,'result'=> $result);
}
/**$GLOBALS['Var_Utility']->ParseCategoryChild($spreadOwner,$spreadViwer);
* @description=>sql query for privacy id
* @param  => 
* @return => 
*/
function ParseCategoryChild($result,$leval=0){
   $ret=array();
   switch($leval){
   case 0:
   foreach($result as $value){
       if($value['L2']!=NULL){
   if(!isset($ret[$value['L2']])){
   $ret[$value['L2']]=array();
   }

   }
   }
   break;    
   }
   
   return $ret; 
}

/**$GLOBALS['Var_Utility']->ParseOrderAddress($spreadOwner,$spreadViwer);
* @description=>sql query for privacy id
* @param  => 
* @return => 
*/
function ParseOrderAddress($Address,$task){
    switch($task){
     case 'encode':
  
    //check_response($Address);
  $Address['address']=SafeTextEncode( $Address['address']);
  $Address['landmark']=SafeTextEncode( $Address['landmark']);
  $Address['location']=array('id'=>$Address['location']['id'],'name'=> SafeTextEncode($Address['location']['name']));
  $Address['postalCode']=array('id'=>$Address['postalCode']['id'],'name'=>$Address['postalCode']['name']);
  $Address['town']=array('id'=>$Address['town']['id'],'name'=> SafeTextEncode($Address['town']['name']));
  $Address['city']=array('id'=>$Address['city']['id'],'name'=>SafeTextEncode($Address['city']['name']));
  $Address['state']=array('id'=>$Address['state']['id'],'name'=>SafeTextEncode($Address['state']['name']));
  $Address['country']=array('id'=>$Address['country']['id'],'name'=>SafeTextEncode($Address['country']['name']));
$Address=Makejson($Address); 
     break; 
     case 'decode':
      
$Address=JsonTrueDecode($Address,$GLOBALS['Var_BundlePrototype']->DefaultValue('addressOut')); 
//check_response($Address);
  $Address['address']=SafeTextDecode( $Address['address']);
  $Address['landmark']=SafeTextDecode( $Address['landmark']);
  $Address['location']=array('id'=>$Address['location']['id'],'name'=> SafeTextDecode($Address['location']['name']));
  $Address['postalCode']=array('id'=>$Address['postalCode']['id'],'name'=>$Address['postalCode']['name']);
  $Address['town']=array('id'=>$Address['town']['id'],'name'=> SafeTextDecode($Address['town']['name']));
  $Address['city']=array('id'=>$Address['city']['id'],'name'=>SafeTextDecode($Address['city']['name']));
  $Address['state']=array('id'=>$Address['state']['id'],'name'=>SafeTextDecode($Address['state']['name']));
  $Address['country']=array('id'=>$Address['country']['id'],'name'=>SafeTextDecode($Address['country']['name']));
     break;    
     
    
    }

     return  $Address;
}

/**$GLOBALS['Var_Utility']->CreateSerachData($spreadOwner,$spreadViwer);
* @description=> CalculateCart
* @param  =>
* @return => 
*/
public function  CreateSerachData($EntityRow){
    $SerachData='';$ParseData=array();

      switch($EntityRow['type']){
          case 0:
          $ParseData[]=SafeTextDecode($EntityRow['public_data']['Name']);
          $ParseData[]=SafeTextDecode($EntityRow['public_data']['FirstName']);
          $ParseData[]=SafeTextDecode($EntityRow['public_data']['LastName']);
          $ParseData[]=$EntityRow['public_data']['slug'];

          break;
          case 1:
          $ParseData[]=SafeTextDecode($EntityRow['public_data']['Name']);
          $ParseData[]=$EntityRow['public_data']['slug'];
          break;
      }


      $SerachData=implode(" ",$ParseData);

      $SerachData=   validate_word('alphanumericspace', $SerachData);


    return $SerachData;
}
/**
* @description=> CalculateCart
* @param  =>
* @return => 
*/
public function  CalculateDiscount($descount){
    
}


 /**
* @description=> Return the correct data on the basic of supplied path data..
* @call $GLOBALS['Var_Utility']->IsIndexOfBlocked($FrontEntityData,$entity_id);
* @param  => 
* @return => [array($AppData)]
*/
public function IsIndexOfBlocked($FrontEntityData,$entity_id){
    $ret=FALSE;
    $blocedEntity_id=$FrontEntityData['private_data']['blocked_entity'];
    if(is_array($blocedEntity_id)){
       if(in_array($entity_id,  $blocedEntity_id)){
               $ret=TRUE;
       } 
    }



    return $ret;
}






/**$GLOBALS['Var_Utility']->SQL_privacy($spreadOwner,$spreadViwer);
* @description=>sql query for privacy i
values: [0,1,2,5], valuesname: ['Public','Friends','Friends Of Friends','Onlyme']
* @param  => 
* @return => 
*/
public function SQL_privacyForSpread($spreadViwer){
 $TotalrelationSql=array();

     $freindsSql='SELECT   DISTINCT entity_id
 FROM
    ( (SELECT twrFa.to_id as entity_id
                           FROM '.DB_NAME.'.relation_two_way twrFa 
                           WHERE twrFa.current_status=3
                           AND (twrFa.from_id='.$spreadViwer.'))
           UNION ALL                
     (SELECT twrFb.from_id as entity_id
                           FROM '.DB_NAME.'.relation_two_way twrFb
                           WHERE twrFb.current_status=3
                           AND (twrFb.to_id='.$spreadViwer.')) ) as entity_id
              ';


$FreindOfFreindRelationSql_0='SELECT  DISTINCT twrFOF.to_id as  entity_id
                           FROM '.DB_NAME.'.relation_two_way twrFOF
                           WHERE twrFOF.current_status=3
                           AND   twrFOF.from_id IN ('.$freindsSql.') 
                          ';
$FreindOfFreindRelationSql_1='SELECT  DISTINCT twrFOF.from_id as  entity_id
                           FROM '.DB_NAME.'.relation_two_way twrFOF
                           WHERE twrFOF.current_status=3
                           AND   twrFOF.to_id IN ('.$freindsSql.')
                          ';

  $TotalrelationSql[] ='(c.entity_id = '.$spreadViwer.' AND (c.privacy_id = 0 ||c.privacy_id = 1 ||c.privacy_id = 2 ||c.privacy_id = 5 ) )';

 $TotalrelationSql[] ='(c.entity_id IN ('.$freindsSql.') AND (c.privacy_id = 0 || c.privacy_id = 1  || c.privacy_id = 2  ) )';
 
  $TotalrelationSql[] ='((c.entity_id IN ('.$FreindOfFreindRelationSql_0.') OR (c.entity_id IN ('.$FreindOfFreindRelationSql_1.') )) AND (c.privacy_id = 0 || c.privacy_id = 2  ) )';	

$TotalrelationSql[] ='(c.entity_id <> '.$spreadViwer.' AND (c.privacy_id = 0 ) )';
 

 $relationSql= implode(' OR ', $TotalrelationSql);

return  $relationSql;
}


/**$GLOBALS['Var_Utility']->SQL_StoreProdcutTable();
* @description=>
* @param  => 
* @return => 
* @reference => {a=> '',b=> '',c=> '',d=> '',p=> '',q=> '',}
*/

public function SQL_StoreProdcutTable($args){


 $FilterSql='';  



 //filter 1
 $stock=0;
  $stockValue =GetPropertyInArray('stock',$args['ActiveFilter'],array());
  foreach($stockValue as $value){ if(isset($value['v'])){ $stock=$value['v'];}  }
   if($stock==1){//instock
     $stockSQL='SELECT q.product_id as product_id  FROM  '.DB_NAME.'.product_varients q 
WHERE q.product_id = a.product_id
 AND  CAST(q.stock As SIGNED) > 0 ';  
 $FilterSql=' AND a.product_id IN ('.$stockSQL.') ';
   }else if($stock==2){ // out of stock
  $stockSQL='SELECT q.product_id as product_id  FROM  '.DB_NAME.'.product_varients q 
WHERE q.product_id = a.product_id
 AND  CAST(q.stock As SIGNED) = 0 ';  
 $FilterSql=' AND a.product_id IN ('.$stockSQL.') ';  
   }else{
        
   }
   //---------
   $Status=[];
   $activeStatus= GetPropertyInArray('status',$args['ActiveFilter'],array());
    foreach($activeStatus as $value){ if(isset($value['v'])){ $Status[]=$value['v'];}  }
   $FilterSql.= (count($Status)>0)?' AND a.is_live  IN  ("'.implode('","', $Status).'")':'';
    

    //---------

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
$skuSQL='SELECT p.product_id as product_id  FROM  '.DB_NAME.'.product_varients p 
WHERE p.product_id = a.product_id
 AND p.sku = "'.$args['search_str'].'" ';

$serachquery=' AND (a.product_name	 LIKE "%'.$args['search_str'].'%"||a.product_name	 LIKE "%'.$args['search_str'].'"||a.search_data	 LIKE "%'.$args['search_str'].'%" ||  a.product_id IN ('.$skuSQL.') )';

$numsql.=$serachquery;
  $selectsql.=$serachquery;
 }

 if($FilterSql!=''){
 $numsql.=$FilterSql;
  $selectsql.=$FilterSql; 
 }


$selectsql.=' ORDER BY c.spread_date_gmt	 DESC ';

    return array('numsql'=>$numsql,'selectsql'=>$selectsql);
}

/**$GLOBALS['Var_Utility']->StoreProdcutTable_MainFilter();
* @description=>
* @param  => 
* @return => 
* @reference => {a=> '',b=> '',c=> '',d=> '',p=> '',q=> '',}
*/
public function StoreProdcutTable_MainFilter($args){
   $Filter=array();
 $total_sql=array();

$activeStatus_str= GetPropertyInArray('status',$args['ActiveFilter'],array());
$activestock_str= GetPropertyInArray('stock',$args['ActiveFilter'],array());  

$activeStatus= array();
$activestock= array() ;
foreach($activeStatus_str as $value){ if(isset($value['v'])){$activeStatus[]=$value['v'];}  }
foreach($activestock_str as $value){ if(isset($value['v'])){$activestock[]=$value['v'];}  }

 $STOCK_NOT_IN=(count( $activestock)>0)?'AND CAST(q.stock As SIGNED) NOT IN ("'.implode('","',$activestock).'")':'';
 $STATUS_NOT_IN=(count( $activeStatus)>0)?'AND b.is_live NOT IN  ("'.implode('","', $activeStatus).'")':'';


  $total_sql[]='(SELECT 2 as value ,"stock" as name, COUNT(b.product_id) as count
FROM '.DB_NAME.'.store_products b
LEFT JOIN  '.DB_NAME.'.product_varients q  ON q.product_id = b.product_id '. $STOCK_NOT_IN.' 
WHERE b.entity_id = '.$args['store_id'].'
AND CAST(q.stock as SIGNED) >= 1

GROUP BY (CAST(q.stock as SIGNED) >= 1))
';
  $total_sql[]='(SELECT 1 as value ,"stock" as name, COUNT(b.product_id) as count
FROM '.DB_NAME.'.store_products b
LEFT JOIN  '.DB_NAME.'.product_varients q  ON q.product_id = b.product_id '. $STOCK_NOT_IN.' 
WHERE b.entity_id = '.$args['store_id'].'
AND CAST(q.stock as SIGNED) <= 1

GROUP BY (CAST(q.stock as SIGNED) <= 1))
';
 
 $total_sql[]='(SELECT  b.is_live as value ,"status" as name, COUNT(b.product_id) as count
FROM '.DB_NAME.'.store_products b
WHERE b.entity_id = '.$args['store_id'].'
'. $STATUS_NOT_IN.'
GROUP BY b.is_live)
';

  $search_sql= implode('UNION ALL ',$total_sql);

 
$Filter=$GLOBALS['Var_DBMysqli']->query($search_sql);




    return  $Filter;
}


//-----------------------------------------



/**
* @description=> CalculateCart
* @param  =>  $how = `BY_CHECKIN_ID`|`BY_CHECKIN_ROW`|`BY_CHECKIN_DATA`
@ call    =>$GLOBALS['Var_Utility']->RepaireCheckin($data,$args=array())
* @return => 
*/

public function RepaireCheckin($data,$args=array()){
    $how =(isset($args['how']))?$args['how']:'BY_CHECKIN_ID';
    $checkIn_id=0;

    $IS_update=FALSE;$IS_repaire=FALSE; $IS_ConversationTable_update=FALSE;

     switch( $how){
        case 'BY_CHECKIN_ID':  $checkIn_id=$data;
          break;
        case 'BY_CHECKIN_ROW':    $checkIn_id=$data['checkIn_id'];
        break;  
     }

     ////------

    switch( $how){
        case 'BY_CHECKIN_ID':
   $result=$GLOBALS['Var_DBMysqli']->query('SELECT * FROM '.DB_NAME.'.checkins  a , '.DB_NAME.'.conversation  b
   WHERE a.checkIn_id = '.$data.' 
   AND  a.conversation_id = b.conversation_id 
    '); 
    if(count($result)>0){
  $IS_repaire=TRUE;
     $CheckIn=$result[0];
 $NormalToArray =$GLOBALS['Var_Conversation']->ParseConversationRowToNormal($CheckIn);
 $CheckIn['last_check_time']=$NormalToArray['last_check_time']; 
 $CheckIn['history_cleared_till']= $NormalToArray['history_cleared_till'];  
$CheckIn['members']=$NormalToArray['members'];   
    }


        break;
        case 'BY_CHECKIN_ROW':
          $IS_repaire=TRUE;
        $CheckIn=$data;
        break;
    }
       ////------
  $Options=array( );$Options_conversation=array( );
     ////------
if($IS_repaire){



     // repaire= 1
      $cartVarient_id=array(); $cartVarient_data=array();
 $cartVarient_idRaw=$CheckIn['cartVarient_id'];
 if( $cartVarient_idRaw!=NULL){
   $cartVarient_id=explode(",",  $cartVarient_idRaw); 
   $cartVarient_data=JsonTrueDecode($CheckIn['cartVarient_data'],array());
}
 if(count( $cartVarient_id)!=count($cartVarient_data)){ $IS_update =TRUE;}

   foreach($cartVarient_id as $q=>$p){
        if(!isset($cartVarient_data[$p])){
            unset($cartVarient_data[$p]);
        }
      }

 $Options['cartVarient_id']=Makejson( $cartVarient_id);
 $Options['cartVarient_data']=Makejson( $cartVarient_data);

}


     ////------

    if(  $IS_update&&count( $Options)>0){

     $GLOBALS['Var_DBMysqli']->update(DB_NAME,'checkins',array_keys($Options),array_values($Options),array('checkIn_id'),array($checkIn_id)); 
     
 
     
       
    }
  //updating conversation
   $GLOBALS['Var_Conversation']-> RepaireConversation($data,array('how'=>'BY_CONVERSATION_ROW'));   
        


}



/**
* @description=>$GLOBALS['Var_Utility']->GetEntityRow()
* @param  => 
* @return => 
*/
public function GetEntityRow($EntityId){

    $EntityRow=$GLOBALS['Var_BundlePrototype']->DefaultValue('EntityData');
    $EntityRow['public_data']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic'),$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPublic'));
    $EntityRow['private_data']= True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate'),$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPrivate'));

    if($EntityId!=0){
           $sql='SELECT DISTINCT *
FROM '.DB_NAME.'.entity a,'.DB_NAME.'.page_slug b
WHERE a.entity_id='.$EntityId.'
AND  CAST(b.object_id As SIGNED) =a.entity_id
 AND (b.object_type="buyer"||b.object_type="store"||b.object_type="LocationManager"||b.object_type="company")
LIMIT 1
';
//-- result query
 

  
   $DATA=  $GLOBALS['Var_DBMysqli']->query($sql );
   if(count( $DATA)>0){
    $EntityRow=$DATA[0];
 //-->>result query
 /*
 //buyer
 if($EntityRow['type']==0){
  $EntityRow['public_data']= JsonTrueDecode($EntityRow['public_data'],array()) ; 
  $EntityRow['public_data']=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPublic'), $EntityRow['public_data']);

  $EntityRow['private_data']= JsonTrueDecode($EntityRow['private_data'],array()) ; 
  $EntityRow['private_data']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPrivate'), $EntityRow['private_data']);
 }
 //store
  if($EntityRow['type']==1){
  $EntityRow['public_data']= JsonTrueDecode($EntityRow['public_data'],array()) ; 

  $EntityRow['public_data']=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic'),$EntityRow['public_data']);

  $EntityRow['private_data']= JsonTrueDecode($EntityRow['private_data'],array()) ; 

  $EntityRow['private_data']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate'), $EntityRow['private_data']);

 }
 */

 }

$EntityRow=$GLOBALS['Var_ViewParse']->ParseEntityRow($EntityRow);



    }//EntityId!=0
      

 



 return $EntityRow;
}

}


$GLOBALS['Var_Utility'] =new Utility();
?>