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
public function GetStoreMenu($StoreEntityRow){


 $storemenu=array();
    $TableCode=0;
  if(isset($StoreEntityRow['EntityData']['private_data']['store_menu_table_code'])){
        $TableCode=$StoreEntityRow['EntityData']['private_data']['store_menu_table_code'];
  }
  $TableName='store_menu_'.$TableCode;



   $result=$GLOBALS['Var_DBMysqli']->query('SELECT * FROM '.DB_NAME_UTILITY_0.'.'. $TableName.'  a
   WHERE a.store_id = '.$this->Store_id.'
    ');
   if(count($result)>0){
 
        for($i=0;$i<count($result);$i++){
    unset($result[$i]['store_menu_row_id']);
 if( $result[$i]['parent']==''){
     $result[$i]['parent']=NULL;

 }
  $storemenu[]= $result[$i];


        }
 
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
 $ret['currencydata']= $GLOBALS['Var_Utility'] ->GetCurrencyData($ret['currency']);


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
   $ret['currencydata']= $GLOBALS['Var_Utility'] ->GetCurrencyData($ret['currency']);
   
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
 WHERE ( a.product_categories	LIKE "%'.$args['cid'].'%" 
 OR 
 a.product_categories	IN (SELECT t1.parent_id  FROM '.DB_NAME.'.store_categories AS t1  
 WHERE t1.category_id  = '.$args['cid'].')
 )
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
$discoutFilterSql='';
// check_response($args['ActiveFilter']);
 $obn=array();$obv=array();$custom_fil=0;$price_fil=0;$discount_fil=0;
 foreach( $args['ActiveFilter'] as $key=>$value){
      
  
     //for custom filters
      if(is_array($value)){
      
                 if(count($value)==1){
           $filtertype= GetPropertyInArray('t',$value[0],'M');
           if( $filtertype=='C'){
// prevent to mix with main filter if someone play with post request
               if($key!='price'&&$key!='discount'){
                   $obn[]=$key; 
            $obv[]= GetPropertyInArray('v',$value[0],'');  

             $custom_fil++;  
               }
          
           }

 }
         }
          
        
 }
   
 if($custom_fil>0){
 $customFilterSql.='e.name IN ("'.implode('","',$obn).'")';
 $customFilterSql.=' AND e.value IN ("'.implode('","',$obv).'")';
 $ActiveCustomFilterValue=$obv;
 }

foreach( $args['ActiveFilter'] as $key=>$value){


       if($key=='price'){
 if(is_array($value)){
        if(count($value)==1){
 $priceValue= GetPropertyInArray('v',$value[0],array('min'=>0,'max'=>0));  
    if(count( $priceValue)==2){
 $priceFilterSql.=' ( CAST(g.sellingPrice AS SIGNED) <= '.floatval($priceValue['max']).' AND CAST(g.sellingPrice AS SIGNED) >= '. floatval
  ($priceValue['min']).' )'; 
     
    }
     }
         }


     }
     if($key=='discount'){
 if(is_array($value)){

      foreach( $value as $subValue){
$discountcomma=($discount_fil>0)?' AND ':'';// OR :AND

 $discountValue= GetPropertyInArray('v',$subValue,0,'getnumeric');  
$discoutFilterSql.=$discountcomma.' ( CAST( 
                        (-(100*((g.sellingPrice/g.compairePrice-1))))
                         AS SIGNED) <= '.floatval($discountValue).') '; 
     $discount_fil++; 
    }
$discoutFilterSql.='AND  ( CAST( 
                        (-(100*((g.sellingPrice/g.compairePrice-1))))
                         AS SIGNED) > 0 ) '; 

         }


     }
 }
    //-->>
 //--FROM
  $FROM='';$INNERJOIN='';  $FilterWHERE =' ';
  $FROM=''.DB_NAME.'.store_products  a';

   if(strlen($customFilterSql)>1){
   $FROM.=','.DB_NAME.'.filter_attributes_junction f  
            ,'.DB_NAME.'. filter_attributes e';
   
 }
 if(strlen($priceFilterSql)>1||strlen($discoutFilterSql)>1){
   $FROM.=','.DB_NAME.'.product_varients g';  
 } 
if(strlen($customFilterSql)>1){
 
  $FilterWHERE.='AND  a.product_id = f.product_id
                  AND f.filter_attributes_id=e.filter_attributes_id
                  ';
    $FilterWHERE.='AND '.$customFilterSql;
 }  
 

 if(strlen($priceFilterSql)>1||strlen($discoutFilterSql)>1){
 $FilterWHERE.='AND a.product_id = g.product_id ';

  if(strlen($priceFilterSql)>1){

   $FilterWHERE.='AND '.$priceFilterSql;
 }  

  if(strlen($discoutFilterSql)>1){

   $FilterWHERE.='AND '.$discoutFilterSql;
 }

 } 


 

 
 
           
   $productsql='SELECT DISTINCT a.product_id FROM '. $FROM.'
 WHERE a.product_categories	LIKE "%'.$args['cid'].'%"
  AND  a.deleted =0
 AND  a.entity_id ='.$args['entity_id'].'
 '.$FilterWHERE.'
 ';   
          
    }

 
$SEARCH_STR=(strlen($args['search_str'])>1)?'AND (a.search_data LIKE "%'.$args['search_str'].'%" || a.product_name LIKE "%'.$args['search_str'].'")  ':'';


$Main_FROM_WHERE='FROM '.DB_NAME.'.store_products  a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.product_id IN('.$productsql.')

  AND  CAST(b.object_id As SIGNED) =a.product_id 
  AND  b.object_type ="product"
  AND c.spread_id=a.spread_id
  '.$SEARCH_STR.'
 ';
$Main_GROUP_ORDER=' ORDER BY c.spread_date_gmt DESC';

 switch($args['Sort']){
     case 1://high to low price
$Main_FROM_WHERE='  FROM '.DB_NAME.'.store_products  a ,'.DB_NAME.'.product_varients v
 ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.product_id IN('.$productsql.')
  AND a.product_id=v.product_id
  AND  CAST(b.object_id As SIGNED) =a.product_id 
  AND  b.object_type ="product"
  AND c.spread_id=a.spread_id
    '.$SEARCH_STR.'

 ';
$Main_GROUP_ORDER=' GROUP BY a.product_id
  ORDER BY CAST(v.sellingPrice AS SIGNED) DESC	 ';
     break;
     case 2://low to high price
$Main_FROM_WHERE=' FROM '.DB_NAME.'.store_products  a ,'.DB_NAME.'.product_varients v
 ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE a.product_id IN('.$productsql.')
 AND a.product_id=v.product_id
  AND  CAST(b.object_id As SIGNED) =a.product_id 
  AND  b.object_type ="product"
  AND c.spread_id=a.spread_id
    '.$SEARCH_STR.'
 	
 ';
 $Main_GROUP_ORDER='  GROUP BY a.product_id
  ORDER BY CAST(v.sellingPrice AS SIGNED) ASC ';

     break;
     case 3://popularty
$Main_FROM_WHERE=' FROM '.DB_NAME.'.store_products  a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c,'.DB_NAME.'.activity_main v
 WHERE a.product_id IN('.$productsql.')
 
  AND  a.product_id= v.object_id 
  AND v.activity_code="704" 
  AND  CAST(b.object_id As SIGNED) =a.product_id 
  AND  b.object_type ="product"
  AND c.spread_id=a.spread_id
    '.$SEARCH_STR.'

	
 ';
  $Main_GROUP_ORDER='   GROUP BY v.object_id
  ORDER BY v.timestamp DESC	';
     break;
     case 4:
$Main_FROM_WHERE=' FROM '.DB_NAME.'.store_products  a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c,'.DB_NAME.'.activity_main v
 WHERE a.product_id IN('.$productsql.')

  AND  a.product_id = v.object_id 
  AND v.activity_code="703" 
  AND  CAST(b.object_id As SIGNED) =a.product_id 
  AND  b.object_type ="product"
  AND c.spread_id=a.spread_id
    '.$SEARCH_STR.'

	
 ';
   $Main_GROUP_ORDER=' GROUP BY a.product_id
  ORDER BY v.timestamp DESC	';

     break;
 }


// check_response($Main_FROM_WHERE);


 $numsql='SELECT DISTINCT COUNT(*) '.$Main_FROM_WHERE.'
 ';
  $selectsql='SELECT DISTINCT *  '.$Main_FROM_WHERE. $Main_GROUP_ORDER.'
 ';




  $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql); 
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);
//linit sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';
 $selectsql.=$limit;


    $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;


    $New_ifo=array('Afiatr'=>$args['ActiveFilter'],
               'Cfiatr'=>$this->GetCustomFilter($productsql,$ActiveCustomFilterValue),
               'Mfiatr'=>array_merge($this->GetMainFilter($productsql,'price'),
                             $this->GetMainFilter($productsql,'discount'))
               );

   return PagingOutPut(array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$result,
          'totalpage'=>$paging_data['total_page'],
          'totalresult'=>$total_result,
          'searchstr'=>$args['search_str'],
          'selectedid'=>$args['selected_id'] ,
          'Sort'=>$args['Sort'],
          'ifo'=>$New_ifo 
             ));
}

public function GetCustomFilter($productsql,$ActiveFilter){
    
    $selectsql='SELECT a.name ,a.value , COUNT(b.product_id) as count
FROM '.DB_NAME.'.filter_attributes a, '.DB_NAME.'.filter_attributes_junction b
WHERE b.product_id IN ('.$productsql.')
AND  a.filter_attributes_id = b.filter_attributes_id
AND a.value NOT IN ("'.implode('","',$ActiveFilter).'")
GROUP BY a.name,a.value
';

  $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;

  //Grouping
      $CustomFilter=array();
 /*      $k=0; $p=0;
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
 */

  return $result;
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
 $Filter=array(
 array('value'=>$range,'count'=>0,'name'=>'price')
 );

       break; 
  case 'discount':
 $selectsql='SELECT (-(100*((a.sellingPrice/a.compairePrice-1)))) as value , "discount" as name, COUNT(a.product_id) as count
FROM '.DB_NAME.'.product_varients a
WHERE a.product_id IN ('.$productsql.')
AND (-(100*((a.sellingPrice/a.compairePrice-1)))) > 0
GROUP BY value
';

 $result_raw=$GLOBALS['Var_DBMysqli']->query($selectsql);;

 $Filter= $result_raw;

 foreach($Filter as $q=>$row){
   $Filter[$q]['value']=  round( $Filter[$q]['value']);
 }

       break;


    }


return  $Filter;
}

public function GetCategoryBox($args=array()){
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');
 $EntityRow=$args['EntityData'];

  $parse=array();
 if( $EntityRow['type']==1){

 $categoryBox=$EntityRow['public_data']['categoryBox'];

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

  $parse=(is_array( $parse))? $parse:JsonTrueDecode($parse,array('mainimages'=>array(),'webimages'=>array())) ; 
   if(!is_numeric_index_array($parse)){
   foreach($parse as $q =>$v){
       if(!is_numeric($q)){
           unset($parse[$q]);
       }
   } 
 }

 foreach($parse as $q =>$v){
     if(isset($v['mainimages'])){
     foreach($v['mainimages'] as $a=>$b){
         if(isset($b['url'])){
           $parse[$q]['mainimages'][$a]['url']=validate_word('reverse_HTML_entities',$b['url']);
         }

     }
     }else{
          $parse[$q]['mainimages']=array();  
     }
       if(isset($v['webimages'])){
   foreach($v['webimages'] as $c=>$d){
         if(isset($d['url'])){
           $parse[$q]['webimages'][$c]['url']=validate_word('reverse_HTML_entities',$d['url']);
         }

     }
       }else{
          $parse[$q]['webimages']=array();  
     }
 }

 }
 return $parse; 



}

/*

*/

public function GetFeedBackSpread($args=array()){
    $return =array();

    $EntityRow=$args['EntityData'];
     $args['date_gmt']=zonedate("UTC");
     $args['ip'] = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR')); 
     $args['attached_object_Str']=implode(",",array($args['EntityData']['entity_id']));

    if($EntityRow['private_data']['feedback_spreadId']==0){
          $spreadargs = array(
		'spread_id' =>  0,
		'entity_id' =>$args['EntityData']['entity_id'],
		'owner_entity_id' => $args['EntityData']['entity_id'],
		'spread_content' => '',
		'quick_action_type'=>0,
        'spread_perpose'=>  12,
        'comment_status'=>1,
        'suspended'=> 0,
		'privacy_id' =>0,
		'spread_rank' => hackerHot(500, date_in_timezone("UTC")),
		'spread_score' => hackerHot(500, date_in_timezone("UTC")),
		'spread_date_gmt' =>  $args['date_gmt'],
         'ip'=> $args['ip'],
		'taged_entity_Str' => '',
        'taged_entity' => array(),
		'attached_object_Str' => $args['attached_object_Str']
	);

$spread_id = $GLOBALS['Var_Spread']->register_spread($spreadargs);

$EntityRow['private_data']['feedback_spreadId']= $spread_id;
   $update= $GLOBALS['Var_Update']->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);

    }
     if($EntityRow['private_data']['feedback_spreadId']!=0){
          $spread_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'spread', array('spread_id'),array($EntityRow['private_data']['feedback_spreadId']));   
            if($spread_row!=NULL){
              $data=   array('spread_row'=> $spread_row,'rtw'=>'','comment_id'=>'');   
              
          $return=  $GLOBALS['Var_Spread']->SpreadCommentTogether($data);       
            }
     }

     return   $return ;
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




       //spread_id
      $ret[$i]['description']=$Fields[$i]['spread_content'];
     



      
     }
     return  $ret; 
 }
 public function  ParseProductInfo($Fields,$args=array()){
       
          

 return $GLOBALS['Var_StoreDashboard']->ParseProducts($Fields,array('mode'=>'public'));
    
 }
 ///============ParseMethod=============//

 }

?>