<?php
    
 class StoreOutput  extends StoreCheckIn{
 public $Store_id;


   function __construct($Store_id) {
               $this->Store_id=$Store_id;

                 parent::__construct($Store_id);
             }  

/**
* @description=> return StoreMenu.
* @param  => 
* @return => 
*/
public function GetStoreMenu(){


 $storemenu=array();



$get_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'store_menu',array('entity_id'),array($this->Store_id));
    if($get_row!=NULL){

  $storemenu =JsonTrueDecode($get_row['menu'],array());

    }



return  $storemenu;
}

/**
* @description=> return the  storebrowsing data.
* @param  => 
* @return => 
*/ 
public function GetStoreBrowsingData(){
 $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
    $ret=$GLOBALS['Var_BundlePrototype']->DefaultValue('storebrowsingData');
    $SelfStore=($ActorEntityData['EntityData']['entity_id']==$this->Store_id);

  if($GLOBALS['Var_LoginStatus']&&(!$SelfStore)&&$ActorEntityData['EntityData']['type']==0){
   $checkINData=$this->GetCheckInInfo();
   $ret=$this->ParseCheckInData($checkINData,array('Pbank'=>1));
  

  }else{

       if($ActorEntityData['EntityData']['type']!=0){
         $ret['mode']=4;  //other visting
      }
      if($SelfStore){
         $ret['mode']=2;  //self store visting
      }
     
       
        if(!$GLOBALS['Var_LoginStatus']){
         $ret['mode']=3;  //Logout visting
      }
  }



    return $ret;
}


/**
* @description=> return the  storebrowsing data fro check in
* @param  => 
* @return => 
*/
public function GetCheckInBrowsingData($Fields){
     $ret=array();


      
   $ret=$this->ParseCheckInData($Fields,array('Pbank'=>1));
   $ret['mode']=1; //

   return  $ret;
}


/**
* @description=> Generate the category Listing result with updated sorting col
* @param  => array('pagesize'=>$pagesize,'paged'=>$paged,'selected_id'=>'','search_str'=>$args['search_str'],'sort'=>'store_categories','ActiveFilter'=>array(),'CustomSorting'=>array(),'MainSorting'=>array());
* @return => 
*/ 

public function GetCategoryListing($args=array()){
  $ActiveFilter=array();  
  $customFilter=array();  $ActiveCustomFilterValue=array(); //use in geting filter value
  $mainFilter=array();
 
  $productsql='SELECT DISTINCT a.product_id FROM '.DB_NAME.'.store_products  a 
 WHERE a.product_categories	LIKE "%'.$args['cid'].'%"
  AND  a.deleted =0
 AND  a.entity_id ='.$args['entity_id'].'
 ';





    if(count($args['ActiveFilter'])>0){
/* e=> filter_attributes
   f=> filter_attributes_junction
 *  g=> product_varients
 *
 */
 $customFilterSql='';
 $priceFilterSql=''; 

 $obn=array();$obv=array();$custom_fil=0;$price_fil=0;
 foreach( $args['ActiveFilter'] as $key=>$value){
       if($key!='price'){
        
         if(is_array($value)){
 foreach( $value as $subValue){
           $obn[]=$key; 
            $obv[]=$subValue; 
 } 
         }
          
         $custom_fil++;
     }
 }
 if($custom_fil>0){
 $customFilterSql.='e.name IN ("'.implode('","',$obn).'")';
 $customFilterSql.=' AND e.value IN ("'.implode('","',$obv).'")';
 $ActiveCustomFilterValue=$obv;
 }
  
foreach( $args['ActiveFilter'] as $key=>$value){
$comma=($price_fil>0)?' AND ':'';// OR :AND
       if($key=='price'){
 if(is_array($value)){
 foreach( $value as $subValue){
         
 $priceFilterSql.=$comma.' ( CAST(g.sellingPrice AS SIGNED) <= '.floatval($subValue['max']).' AND CAST(g.sellingPrice AS SIGNED) >= '. floatval
  ($subValue['min']).' )'; 
       $price_fil++; 
 } 
         }


     }
 }
    //-->>
 //--FROM
  $FROM='';$INNERJOIN='';  $FilterWHERE ='';
  $FROM=''.DB_NAME.'.store_products  a';

   if(strlen($customFilterSql)>1){
   $FROM.=','.DB_NAME.'.filter_attributes_junction f  
            ,'.DB_NAME.'. filter_attributes e';
   
 }
 if(strlen($priceFilterSql)>1){
   $FROM.=','.DB_NAME.'.product_varients g';  
 } 
if(strlen($customFilterSql)>1){
 
  $FilterWHERE.='a.product_id = f.product_id
                  AND f.filter_attributes_id=e.filter_attributes_id
                  ';
    $FilterWHERE.='AND '.$customFilterSql;
 }  
  //--puting or
 if(strlen($customFilterSql)>1&&strlen($priceFilterSql)>1){
   $FilterWHERE.=' AND '; // OR :AND

 }
 //-->>
 if(strlen($priceFilterSql)>1){
$FilterWHERE.='a.product_id = g.product_id ';
   $FilterWHERE.='AND '.$priceFilterSql;
 }      
   $productsql='SELECT DISTINCT a.product_id FROM '. $FROM.'
 WHERE a.product_categories	LIKE "%'.$args['cid'].'%"
  AND  a.deleted =0
 AND  a.entity_id ='.$args['entity_id'].'
 AND '.$FilterWHERE.'
 ';   
          
    }





 $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.store_products a 
 WHERE  a.product_id IN('.$productsql.')
  AND  a.deleted =0
   AND  a.entity_id ='.$args['entity_id'].'
 ';
  $selectsql='SELECT * FROM '.DB_NAME.'.store_products  a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.product_id IN('.$productsql.')
  AND  a.deleted =0
 AND  a.entity_id ='.$args['entity_id'].'
  AND  CAST(b.object_id As SIGNED) =a.product_id 
  AND  b.object_type ="product"
  AND c.spread_id=a.spread_id
  ORDER BY c.spread_date_gmt DESC
 ';





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
          'Sort'=>$args['Sort'],
          'ActiveFilter'=>$args['ActiveFilter'],
          'customFilter'=>$this->GetCustomFilter($productsql,$ActiveCustomFilterValue),
          'mainFilter'=>array('price'=>$this->GetMainFilter($productsql,'price'),
                             'discount'=>$this->GetMainFilter($productsql,'discount'))
             );
}

public function GetCustomFilter($productsql,$ActiveFilter){
    
    $selectsql='SELECT a.name ,a.value , COUNT(b.product_id) as productcount
FROM '.DB_NAME.'.filter_attributes a, '.DB_NAME.'.filter_attributes_junction b
WHERE b.product_id IN ('.$productsql.')
AND  a.filter_attributes_id = b.filter_attributes_id
AND a.value NOT IN ("'.implode('","',$ActiveFilter).'")
GROUP BY a.name,a.value
';

  $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;

  //Grouping
      $CustomFilter=array();
     $k=0; $p=0;
 for($i=0;$i<count($result);$i++){
      if($i==0){
           $CustomFilter[$k][$p]=$result[$i];
              $p++;
      }else{
           if($result[$i]['name']==$result[($i-1)]['name']){
         
       $CustomFilter[$k][$p]=$result[$i];
            $p++;

     }else{
        $k++;$p=0;
         $CustomFilter[$k][$p]=$result[$i];
               $p++;

     }  
      }  
 }


  return $CustomFilter;
}


public function GetMainFilter($productsql,$type){
    $Filter=array();


    switch($type){
      case'price':
 $selectsql='SELECT a.sellingPrice
FROM '.DB_NAME.'.product_varients a
WHERE a.product_id IN ('.$productsql.')
GROUP BY a.product_id
';

 $result_raw=$GLOBALS['Var_DBMysqli']->query($selectsql);;
 $result=array();
foreach( $result_raw as $val){
  $result[]= $val['sellingPrice']; 
}

 
  $range=array();
 if(count($result)>0){
  $range_max=floatval(max($result));
    
  $range_min=floatval(min($result));
  

 $range=array('min'=>$range_min,'max'=>$range_max);
     

 }else{
  $range_max=0;
  $range_min=0;$div=1;
  $range=array('min'=>$range_min,'max'=>$range_max);   
 }
 $Filter=$range;

       break; 
  case 'discount':
 $selectsql='SELECT (-(100*((a.sellingPrice/a.compairePrice-1)))) as discount , COUNT(a.product_id) as productcount
FROM '.DB_NAME.'.product_varients a
WHERE a.product_id IN ('.$productsql.')
AND (-(100*((a.sellingPrice/a.compairePrice-1)))) > 0
GROUP BY discount
';

 $result_raw=$GLOBALS['Var_DBMysqli']->query($selectsql);;

 $Filter= $result_raw;

       break;


    }


return  $Filter;
}

public function GetCategoryBox($args=array()){
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');
 $EntityRow=$args['EntityData'];

  $parse=array();
 if( $EntityRow['type']==1){

 $categoryBox=$EntityRow['private_data']['categoryBox'];

  foreach($categoryBox as $q=>$value ){
   
     $cid=GetPropertyInArray('cid',$value,'');
     $sort=GetPropertyInArray('sort',$value,0);
     if($cid!=0||$cid!=''){
         
 $Retrive= $this->GetCategoryListing(array('cid'=>$cid,'pagesize'=>5,'paged'=>1,'selected_id'=>'','search_str'=>'','Sort'=>$sort,'ActiveFilter'=>array(),'customFilter'=>array(),'mainFilter'=>array(),'entity_id'=>$EntityRow['entity_id']));  
     
  $parse[]= $this->ParseProductInfo($Retrive['result']);




     }

       
 }
 }



 return $parse;

}

 ///============ParseMethod=============//
 public function ParseCategoryInfo($Fields,$args=array()){
      $ret=array();
 
     for($i=0;$i<count($Fields);$i++){
     $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('category');  
      $ret[$i]['id']=$Fields[$i]['category_id'];     //category_id 
      $ret[$i]['cid']=$Fields[$i]['category_id'];     //category_id
      $ret[$i]['cN']=$Fields[$i]['category_name'];   //category_NAme
      $ret[$i]['slug']=$Fields[$i]['content_slug'];   //category_NAme
      $ret[$i]['pa_id']=$Fields[$i]['parent_id'];   //parent_id
      $ret[$i]['sid']=$Fields[$i]['spread_id'];    //spread_id




      $spread_content=$GLOBALS['Var_ViewParse']->SpreadContent($Fields[$i]['spread_content'],'spread_content');    //spread_id
      $ret[$i]['description']=$spread_content[0]['content'];
     



      
     }
     return  $ret; 
 }
 public function  ParseProductInfo($Fields,$args=array()){
       
          

 return $GLOBALS['Var_StoreDashboard']->ParseProducts($Fields,array('mode'=>'public'));
    
 }
 ///============ParseMethod=============//

 }

?>