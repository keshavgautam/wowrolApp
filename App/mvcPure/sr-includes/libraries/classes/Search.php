<?php
    

/**
* @description=>
* @param  => 
* @return => 
*/
class Search {
    
/**
* @description=>
* @param  => 
* @return => 
*/
public function DoSearch($args){
      $result=array();


 
 if($args['search_str']!=''){ 
 //--
 $serachquery=''; 
 switch($args['tab']){
      
  case 'product':
        $pieces_sql=''; $pieces = explode(" ", $args['search_str']);
//--
 if($pieces!=FALSE){ foreach($pieces as $word){ if($word!=''){ $pieces_sql.='|| p.search_data LIKE "%'.$word.'%" ';$pieces_sql.='|| p.product_name LIKE "%'.$word.'%" ';   }  } }  
  $Brand_IN=' SELECT p.brand_id  FROM '.DB_NAME.'.company_brand p
 WHERE  (p.product_name	 LIKE "%'.$args['search_str'].'" '. $pieces_sql.') ';
 //---
    
          $pieces_sql='';
          if($pieces!=FALSE){ foreach($pieces as $word){ if($word!=''){ $pieces_sql.='|| a.search_data LIKE "%'.$word.'%" ';$pieces_sql.='|| a.product_name LIKE "%'.$word.'%" ';   }  } }    

$serachquery='( (a.product_name	 LIKE "%'.$args['search_str'].'" '. $pieces_sql.')';


$serachquery.='|| (a.brand_id IN  ('.$Brand_IN.' )) )';

   break;  
     case 'brand':
     $pieces = explode(" ", $args['search_str']);
          $pieces_sql='';
          if($pieces!=FALSE){ foreach($pieces as $word){ if($word!=''){ $pieces_sql.='|| a.search_data LIKE "%'.$word.'%" ';$pieces_sql.='|| a.product_name LIKE "%'.$word.'%" ';   }  } }    

$serachquery='(a.product_name	 LIKE "%'.$args['search_str'].'" '. $pieces_sql.')';
   break; 
   
    case 'category':
     $pieces = explode(" ", $args['search_str']);
          $pieces_sql='';
          if($pieces!=FALSE){ foreach($pieces as $word){ if($word!=''){ $pieces_sql.='|| a.category_name LIKE "%'.$word.'%" ';   }  } }    

$serachquery='(a.category_name	 LIKE "%'.$args['search_str'].'" '. $pieces_sql.')';
   break;
    
  case 'market':

  case 'people':
       $pieces = explode(" ", $args['search_str']);
          $pieces_sql='';
          if($pieces!=FALSE){ foreach($pieces as $word){ if($word!=''){ $pieces_sql.='|| p.search_data LIKE "%'.$word.'%" ';   }  } }    
$serachquery='(p.search_data LIKE "%'.$args['search_str'].'%"'. $pieces_sql.')';
   break; 
  case 'selltagstore':

   break; 
  case 'sellfavstore':

   break; 
  case 'incurrentstore':
      $pieces = explode(" ", $args['search_str']);
          $pieces_sql='';
          if($pieces!=FALSE){ foreach($pieces as $word){ if($word!=''){ $pieces_sql.='|| a.search_data LIKE "%'.$word.'%" ';$pieces_sql.='|| a.product_name LIKE "%'.$word.'%" ';   }  } }    

$serachquery='(a.product_name	 LIKE "%'.$args['search_str'].'" '. $pieces_sql.')';
  break; 
  default://store
     $pieces = explode(" ", $args['search_str']);
          $pieces_sql='';
          if($pieces!=FALSE){ foreach($pieces as $word){ if($word!=''){ $pieces_sql.='|| p.search_data LIKE "%'.$word.'%" ';   }  } }    
$serachquery='(p.search_data LIKE "%'.$args['search_str'].'%"'. $pieces_sql.')';

     break;
 }

 //--select sql
 switch($args['tab']){
      
 case 'product':

 $WHERE=$serachquery;

 if($args['store_entity_id']!=0){
     $WHERE .=' AND a.entity_id='.$args['store_entity_id'].'';
     
 }




$numsql='SELECT COUNT(*) FROM '.DB_NAME.'.store_products a
 WHERE '. $WHERE.'
 AND  a.is_live =1
 AND  a.deleted =0
';



$selectsql='SELECT * FROM '.DB_NAME.'.store_products a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE '. $WHERE.'
   AND  a.is_live =1
  AND  a.deleted =0
  AND  CAST(b.object_id As SIGNED) =a.product_id 
  AND  b.object_type ="product"
  AND c.spread_id=a.spread_id';

   break; 
   case 'category':

 $WHERE=$serachquery;

 if($args['store_entity_id']!=0){
     $WHERE .=' AND a.entity_id='.$args['store_entity_id'].'';
     
 }

$numsql='SELECT COUNT(*) FROM '.DB_NAME.'.store_categories a
 WHERE '. $WHERE.'
 AND  a.deleted =0
';



$selectsql='SELECT * FROM '.DB_NAME.'.store_categories a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE '. $WHERE.'
  AND  a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.category_id 
  AND  b.object_type ="category"
  AND c.spread_id=a.spread_id';

   break;   
  case 'market':


$query=' FROM '.DB_NAME.'.locations  a,'.DB_NAME.'.location_cities b ,'.DB_NAME.'.location_postalcode c ,'.DB_NAME.'.location_fl_admin d ,'.DB_NAME.'.countryinfo e 
 
   WHERE  a.location  LIKE "%'.$args['search_str'].'%"
   AND  a.city_id =b.city_id
   AND  a.postalCode_id =c.postalCode_id
   AND  a.fl_admin_id =d.fl_admin_id
   AND  a.country_id =e.countryinfo_id';


$numsql='SELECT COUNT(*) '.$query.' ';



$selectsql='SELECT * '.$query.' ';
   break; 
  case 'people':


  
$WHERE=$serachquery;

    //-------
  if($args['location_id']!=0){
   $location_filter=' AND p.entity_id IN (
   SELECT p.entity_id  FROM  address p  WHERE  
   	p.location_id  = '.$args['location_id'].'

   
   ) ' ;  
  }

 if($args['fl_admin_id']!=0){
   $fl_admin_filter=' AND p.entity_id IN (
   SELECT p.entity_id  FROM  address p, locations q  WHERE  
   	q.fl_admin_id  = '.$args['fl_admin_id'].'
    AND p.location_id  = q.location_id
) ' ;  
  }
 if($args['country_id']!=0){
   $country_filter='   AND p.entity_id IN (
   SELECT p.entity_id  FROM  address p, locations q  WHERE  
   	q.country_id  = '.$args['country_id'].'
    AND p.location_id  = q.location_id
) ' ;  
  }
  //--appliying
   if($args['location_id']!=0){
         $WHERE.=  $location_filter;
   }else if($args['fl_admin_id']!=0){
         $WHERE.=  $fl_admin_filter;  
   }else if($args['country_id']!=0){
         $WHERE.= $country_filter;  
   }

  //-------


        $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.entity p
 WHERE '.$WHERE.'
  ';


 $selectsql='SELECT * FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
 WHERE '.$WHERE.'
 AND  CAST(q.object_id As SIGNED) =p.entity_id
 AND (q.object_type="buyer")
 ';
   break; 
  case 'brand':
  $FROM=''; 
  $WHERE=$serachquery;



  //-------
  if($args['location_id']!=0){
   $location_filter=' AND a.brand_id IN (
   SELECT p.brand_id  FROM store_products p , address q  WHERE  
   	q.location_id  = '.$args['location_id'].'
   AND p.entity_id = q.entity_id
   
   ) ' ;  
  }

 if($args['fl_admin_id']!=0){
   $fl_admin_filter=' AND a.brand_id IN (
   SELECT p.brand_id  FROM store_products p , address q , locations s  WHERE  
   	q.fl_admin_id  = '.$args['fl_admin_id'].'
   AND p.entity_id = q.entity_id
   AND q.location_id= s.location_id
   
   ) ' ;  
  }
 if($args['country_id']!=0){
   $country_filter=' AND a.brand_id IN (
 SELECT p.brand_id  FROM store_products p , address q , locations s  WHERE  
   	q.country_id  = '.$args['country_id'].'
   AND p.entity_id = q.entity_id
   AND q.location_id= s.location_id
   
   ) ' ;  
  }
  //--appliying
   if($args['location_id']!=0){
     $WHERE.=  $location_filter;
   }else if($args['fl_admin_id']!=0){
       $WHERE.=  $fl_admin_filter;  
   }else if($args['country_id']!=0){
         $WHERE.= $country_filter;  
   }

  //-------

  $FROM =' '.DB_NAME.'.company_brand a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c ';
 


  $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.company_brand a
 WHERE '.$WHERE.'
 AND  a.deleted =0
';



$selectsql='SELECT * FROM '.$FROM.'
 WHERE '.$WHERE.'
  AND  a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.brand_id 
  AND  b.object_type ="brand"
  AND c.spread_id=a.spread_id';

   break;
  case 'selltagstore':

   break; 
  case 'sellfavstore':

   break; 
  case 'incurrentstore':
  $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.store_products a
 WHERE '.$serachquery.'
 AND  a.entity_id='.$args['store_entity_id'].' 
 AND  a.deleted =0
';



$selectsql='SELECT * FROM '.DB_NAME.'.store_products a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE '.$serachquery.'
  AND  a.entity_id='.$args['store_entity_id'].' 
  AND  a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.product_id 
  AND  b.object_type ="product"
  AND c.spread_id=a.spread_id';



  break; 
  default://store


$WHERE=$serachquery;

    //-------
  if($args['location_id']!=0){
   $location_filter=' AND p.entity_id IN (
   SELECT p.entity_id  FROM  address p  WHERE  
   	p.location_id  = '.$args['location_id'].'

   
   ) ' ;  
  }

 if($args['fl_admin_id']!=0){
   $fl_admin_filter=' AND p.entity_id IN (
   SELECT p.entity_id  FROM  address p, locations q  WHERE  
   	q.fl_admin_id  = '.$args['fl_admin_id'].'
    AND p.location_id  = q.location_id
) ' ;  
  }
 if($args['country_id']!=0){
   $country_filter='   AND p.entity_id IN (
   SELECT p.entity_id  FROM  address p, locations q  WHERE  
   	q.country_id  = '.$args['country_id'].'
    AND p.location_id  = q.location_id
) ' ;  
  }
  //--appliying
   if($args['location_id']!=0){
         $WHERE.=  $location_filter;
   }else if($args['fl_admin_id']!=0){
         $WHERE.=  $fl_admin_filter;  
   }else if($args['country_id']!=0){
         $WHERE.= $country_filter;  
   }

  //-------


     $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.entity p
 WHERE '.$WHERE.'
  ';


 $selectsql='SELECT * FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
 WHERE '.$WHERE.'
 AND  CAST(q.object_id As SIGNED) =p.entity_id
 AND (q.object_type="store")
 ';


     break;
 }




  $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);




//LIMIT sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';
 $selectsql.=$limit;
//--
//check_response($selectsql);
 $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;


 //saving search text

 if($total_result>0){
     $GLOBALS['Var_Search']->SaveSearchHistory(array('search_text'=>$args['search_str'],'entity_id'=>$args['entity_id']));
 }

   return PagingOutPut(array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$result,
          'totalpage'=>$paging_data['total_page'],
          'searchstr'=>$args['search_str'],
          'selectedid'=>$args['selected_id']
             ));
            
  }
    
    return PagingOutPut(array());  //default for empty string

}

/**
@call ->  $GLOBALS['Var_Search']->SaveSearchHistory(array('search_text'=>'','entity_id'=>''));
* @description=> 
* @param  => array('search_text'=>'','entity_id'=>'');
* @return => 
*/
public function SaveSearchHistory($args){
    if($args['entity_id']!=0&&$args['entity_id']!=''&&strlen($args['search_text'])>2){

    $GLOBALS['Var_DBMysqli']->insert(DB_NAME,'search_history',array('search_text','entity_id','time_node'),array($args['search_text'],$args['entity_id'],time()));

    }

}
/**
@call ->  $GLOBALS['Var_Search']->GetSearchSuggestion(array('search_text'=>'','entity_id'=>''));
* @description=> 
* @param  => array('search_text'=>'','entity_id'=>'');
* @return => 
*/
public function GetSearchSuggestion($args){
     $result=array();
    
      if($args['entity_id']!=0&&$args['entity_id']!=''&&strlen($args['search_text'])>0){
      $pieces = explode(" ", $args['search_text']);
          $pieces_sql='';
          if($pieces!=FALSE){
              foreach($pieces as $word){
 if($word!=''){
           $pieces_sql.='|| search_text LIKE  "%'.$word.'%" ';   
                  }
           

              }
          
        
          }    


               $sql='
       SELECT DISTINCT search_text
FROM '.DB_NAME.'.search_history
WHERE  
entity_id = '.$args['entity_id'].'
AND (search_text LIKE "%'.$args['search_text'].'"  ||  search_text LIKE "'.$args['search_text'].'%"  '. $pieces_sql.'  )
ORDER BY time_node DESC
LIMIT 10
 
      ';


 $word_result=$GLOBALS['Var_DBMysqli']->query($sql);; 


    for($i=0;$i<count($word_result);$i++){
            $resut_text=''.$word_result[$i]['search_text'].'';
       $result[]=array('li_data'=>array('id'=>$word_result[$i]["search_text"],
                                        'name'=> $resut_text      
                                                         ),
                                      'name'=> $resut_text);
    }


      }


 return  $result;
}

/**
* @description=>
* @param  => 
* @return => 
*/
public function ParseSearchResult($Fields,$args){
      $ret=array();

   if(is_array($Fields)){

      switch($args['tab']){
     case 'store':
 $EntityInformation= new EntityInformation($args['ActorEntityData']['EntityData']['entity_id'],$args['ActorEntityData']['EntityData']['entity_id']); 
  for($i=0;$i<count($Fields);$i++){
    $Fields[$i]= $EntityInformation->ParseEntityRow($Fields[$i]);
 } 
    $ret=$GLOBALS['Var_ViewParse']->EntityCardDataByEntityRow($Fields,$EntityInformation->actoruser_EntityRow);
   break;   
  case 'product':
  $ret= $GLOBALS['Var_StoreDashboard']->ParseProducts($Fields,array('mode'=>'public'));
   break; 
  case 'category':
  $ret= $GLOBALS['Var_StoreDashboard']->ParseCategory($Fields,array('parseLevel'=>0));
   break; 
     case 'brand':
  $ret= $GLOBALS['Var_Company_Dashboard']->ParseBrand($Fields,array('mode'=>'public'));
   break; 
  case 'market':

     $ret= $GLOBALS['Var_ViewParse']->ParselocationForMarketData($Fields);
   break; 
  case 'people':
   $EntityInformation= new EntityInformation($args['ActorEntityData']['EntityData']['entity_id'],$args['ActorEntityData']['EntityData']['entity_id']); 
  for($i=0;$i<count($Fields);$i++){
    $Fields[$i]= $EntityInformation->ParseEntityRow($Fields[$i]);
 } 
    $ret=$GLOBALS['Var_ViewParse']->EntityCardDataByEntityRow($Fields,$EntityInformation->actoruser_EntityRow);
   break; 
  case 'selltagstore':

   break; 
  case 'sellfavstore':

   break; 
  case 'incurrentstore':
    $ret= $GLOBALS['Var_StoreDashboard']->ParseProducts($Fields,array('mode'=>'public'));
  break; 
      }

      }
    return  $ret;
}

/**
* @description=>
* @param  => 
* @return => 
*/

public function FindAccount($args){
       $result=array();

 $args['search_str_trim'] =validateSearchWord($args['search_str']);

 


   //-- by  only login identity

 $Accountresult=$GLOBALS['Var_DBMysqli']->query('SELECT DISTINCT *    FROM '.DB_NAME.'.account_login_identity a
 WHERE (a.login_identity = "'.$args['search_str'].'" ) LIMIT 1 ');

     //-- total  sql
 


  //--==
  if(count( $Accountresult)>0){
      for($i=0;$i<count($Accountresult);$i++){
   $result[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('forgetpasswordacccount');  
 $result[$i]['aid']=$Accountresult[$i]['login_identity_id'];
 $result[$i]['type']='account';
 $result[$i]['identity']=validate_word('reverse_HTML_entities',$Accountresult[$i]['login_identity']);
 $result[$i]['identitytype']=$Accountresult[$i]['identity_type'];     
      }




  }else{
      


  }
  



   return  $result;
}
/**
* @description=>
* @param  => 
* @return => 
*/

public function LoadMarketStors($args){
 //-- filter   
  $active_pricerange_str= GetPropertyInArray('pricerange',$args['ActiveFilter'],array());
  $active_collection_str= GetPropertyInArray('collection',$args['ActiveFilter'],array());
$ActiveCollection=array();
$MAX_PriceRange='';$MIN_PriceRange='';
foreach($active_collection_str as $value){ if(isset($value['v'])){$ActiveCollection[]=$value['v'];}  }

foreach($active_pricerange_str as $value){ if(isset($value['v'])){
    if(isset($value['v']['min'])){$MIN_PriceRange =$value['v']['min'];} 
    if(isset($value['v']['max'])){$MAX_PriceRange =$value['v']['max'];} 

}  }

  $ActiveCollection_NOT_IN=(count( $ActiveCollection)>0)?' AND  p.entity_id  IN( SELECT b.entity_id 
FROM '.DB_NAME.'.store_collection_junction b  WHERE  b.collection_id IN ('.implode(",",$ActiveCollection).') )':'';

  $ActivePriceRange_NOT_IN=(($MAX_PriceRange!='')&&($MAX_PriceRange!=''))?' AND  p.entity_id IN ( SELECT  c.entity_id
FROM '.DB_NAME.'.entity_filter_junction c , '.DB_NAME.'.address d
WHERE d.location_id= '.$args['location_id'].'
AND  c.entity_id=d.entity_id
AND (c.property_name	="max_price" || c.property_name	="min_price")
AND ( CAST(c.property_value as SIGNED )  < '.$MAX_PriceRange.' || CAST(c.property_value as SIGNED )  > '.$MIN_PriceRange.'   ) 
) ':'';



//--Search
     $args['search_str'] =validateSearchWord($args['search_str']);

    $serachquery='p.entity_id IN(SELECT a.entity_id as entity_id 
                                 FROM  '.DB_NAME.'.address a
                                 WHERE  a.location_id= '.$args['location_id'].' )';

     if(  $args['search_str']!=''){
      $serachquery .=' AND (p.search_data LIKE "%'.$args['search_str'].'%" 
                         OR p.search_data LIKE "%'.$args['search_str'].'"  ) ';    

   
     }
      


    $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.entity p
 WHERE '.$serachquery.'
  ';


 $selectsql='SELECT * FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
 WHERE '.$serachquery.' '.$ActiveCollection_NOT_IN.' '.$ActivePriceRange_NOT_IN.'
 AND  CAST(q.object_id As SIGNED) =p.entity_id
 AND (q.object_type="store")
 ';


//-- filter sql attching





//-------------

  $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);




//LIMIT sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';
 $selectsql.=$limit;
//--

 $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;

 $New_ifo=array('Afiatr'=>$args['ActiveFilter'],
               'Cfiatr'=>array(),
               'Mfiatr'=>$this->GetMarketStorsFilter(array('location_id'=>$args['location_id'],'ActiveFilter'=>$args['ActiveFilter']))
               );

$er=PagingOutPut(array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$result,
          'totalpage'=>$paging_data['total_page'],
          'searchstr'=>$args['search_str'],
          'selectedid'=>$args['selected_id']
             ));
//due to bug in we write seprate it.
          $er['ifo'] =$New_ifo;  
   return $er;

}


/*
*@description 
*/
public function  GetMarketStorsFilter($args){
  $Filter=array();
   $total_sql=array();
  $active_pricerange_str= GetPropertyInArray('pricerange',$args['ActiveFilter'],array());
  $active_collection_str= GetPropertyInArray('collection',$args['ActiveFilter'],array());
$ActiveCollection=array();
$MAX_PriceRange='';$MIN_PriceRange='';
foreach($active_collection_str as $value){ if(isset($value['v'])){$ActiveCollection[]=$value['v'];}  }

foreach($active_pricerange_str as $value){ if(isset($value['v'])){
    if(isset($value['v']['min'])){$MIN_PriceRange =$value['v']['min'];} 
    if(isset($value['v']['max'])){$MAX_PriceRange =$value['v']['max'];} 

}  }


  $ActiveCollection_NOT_IN=(count( $ActiveCollection)>0)?'AND b.collection_id NOT IN ("'.implode('","',$ActiveCollection).'")':'';
  $ActivePriceRange_NOT_IN=(($MAX_PriceRange!='')&&($MAX_PriceRange!=''))?'AND  ( CAST(a.property_value as SIGNED )  < '.$MAX_PriceRange.' || CAST(a.property_value as SIGNED )  > '.$MIN_PriceRange.' ) ':'';

  //-------
  $PriceSql='SELECT  MAX(a.property_value) AS max , MIN(a.property_value) AS min
FROM '.DB_NAME.'.entity_filter_junction a , '.DB_NAME.'.address b
WHERE b.location_id= '.$args['location_id'].'
AND  a.entity_id=b.entity_id
AND (a.property_name	="max_price" || a.property_name	="min_price")
'. $ActivePriceRange_NOT_IN.'
';

$Price_result_raw=$GLOBALS['Var_DBMysqli']->query($PriceSql);;



  $ColectionSql='SELECT b.collection_id as value ,"collection" as name, COUNT(b.collection_id) as count, c.collection_name as lable
FROM '.DB_NAME.'.store_collection_junction b , '.DB_NAME.'.store_collections c
WHERE b.location_id = '.$args['location_id'].'
AND b.collection_id=c.collection_id
'.$ActiveCollection_NOT_IN.'
GROUP BY b.collection_id
';

  $Filter=$GLOBALS['Var_DBMysqli']->query($ColectionSql);


  //-------





//checkin g and adding it
if(count($Price_result_raw)>0){
  if(isset($Price_result_raw[0]['max'])&&isset($Price_result_raw[0]['min'])){
    if($Price_result_raw[0]['max']!=NULL&&$Price_result_raw[0]['min']!=NULL){

   $Filter[]=array('value'=>array('max'=>intval($Price_result_raw[0]['max']),'min'=>intval($Price_result_raw[0]['min'])),'name'=>'pricerange','count'=>0); 
}
  
}
  } 



return  $Filter;
}



}



$GLOBALS['Var_Search']=new Search();

?>