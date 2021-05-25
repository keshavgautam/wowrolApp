<?php
    



 class SelectBox{
/**
* @description=> get defalult value
*  $GLOBALS['Var_SelectBox']->Suggestion();
* @param  => 
* @return => 
*/
public function Suggestion($args=array()){
       $ActorEntityData= $GLOBALS['Var_ActorEntityData'];// stored from sanetize form
  $arr=array('state' =>200,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array()));    
       $word_result=array();
       $selected=$args['selected'];
   $args['inputval']=validateSearchWord($args['inputval']);     
   if($args['inputval']!=''){
       
 switch($args['suggest']){
  case 'maincollection':

  $WHERE='AND 
 ( collection_name LIKE "%'.$args['inputval'].'%" ||collection_name LIKE "%'.$args['inputval'].'"||collection_name LIKE "'.$args['inputval'].'%" )
LIMIT 10';

if($args['inputval']=='000'){
    $WHERE='';
}


     $sql='
       SELECT  *
FROM '.DB_NAME.'.store_collections
WHERE
parent_id=0
'.$WHERE.'
 
      ';

  $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;
 
   for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]['collection_id'])){
                    $same=1;
              }
              }
      if($same==0){
           $arr['response'][]=array('id'=>$word_result[$i]["collection_id"],
                                      'name'=>$word_result[$i]["collection_name"]
                                       );
         
      }



}
  break;     
//---------------
  case 'allcollection':
     $sql='
       SELECT  *
FROM '.DB_NAME.'.store_collections
WHERE

 ( collection_name LIKE "%'.$args['inputval'].'%" ||collection_name LIKE "%'.$args['inputval'].'"||collection_name LIKE "'.$args['inputval'].'%" )


LIMIT 10
 
      ';

  $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;
 
   for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]['collection_id'])){
                    $same=1;
              }
              }
      if($same==0){
           $arr['response'][]=array('id'=>$word_result[$i]["collection_id"],
                                      'name'=>$word_result[$i]["collection_name"]
                                       );
         
      }



}
  break; 

  case 'country':
 //OR a.iso_alpha3	  = UPPER("'.$args['inputval'].'")
  $sql='
       SELECT DISTINCT *
FROM '.DB_NAME.'.countryinfo a
WHERE  
(
a.country LIKE "%'.$args['inputval'].'"
OR a.country LIKE "%'.$args['inputval'].'%"
OR a.iso_alpha2	 LIKE  "%'.$args['inputval'].'"

)
LIMIT 10
 
      ';
    
 
 $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;


   for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]["countryinfo_id"])){
                    $same=1;
              }
              }
      if($same==0){
            $resut_text=$word_result[$i]['country'];
             $arr['response'][]=array('id'=>$word_result[$i]["countryinfo_id"],
                                      'name'=>$resut_text
                                       );


         
      }



}


break;
case 'state':
$country_id=GetPropertyInArray('id',$args['info'],'0','numericID');
$WHERE='AND 
(
a.fl_admin LIKE "%'.$args['inputval'].'%"
)
LIMIT 10';

if($args['inputval']=='000'){
    $WHERE='';
}
  $sql='
       SELECT DISTINCT *
FROM '.DB_NAME.'.location_fl_admin a
WHERE 
a.country_id='.$country_id.'
'.$WHERE.'
 
      ';
    
 
 $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;
 

   for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]["fl_admin_id"])){
                    $same=1;
              }
              }
      if($same==0){
            $resut_text=$word_result[$i]['fl_admin'];
            $arr['response'][]=array('id'=>$word_result[$i]["fl_admin_id"],
                                      'name'=>$resut_text
                                       );
         
      }



}

break;


case 'citybystate':
$state_id=GetPropertyInArray('id',$args['info'],'0','numericID');
  $sql='
       SELECT DISTINCT *
FROM '.DB_NAME.'.locations a
LEFT JOIN '.DB_NAME.'.location_postalcode b
ON a.postalCode_id=b.postalCode_id
WHERE 
a.fl_admin_id='.$state_id.'
AND a.locationtype=0
AND 
(
a.location LIKE "%'.$args['inputval'].'%"


)


LIMIT 10
 
      ';
    
 
 $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;


   for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]["location_id"])){
                    $same=1;
              }
              }
      if($same==0){
            $resut_text=$word_result[$i]['location'].' - '.$word_result[$i]['postalCode'];
            $arr['response'][]=array('id'=>$word_result[$i]["location_id"],
                                      'name'=>$resut_text
                                       );

         
      }



}

break;


case 'townbycity':
$city_id=GetPropertyInArray('id',$args['info'],'0','numericID');
  $sql='
       SELECT DISTINCT *
FROM '.DB_NAME.'.locations a
LEFT JOIN '.DB_NAME.'.location_postalcode b
ON a.postalCode_id=b.postalCode_id
WHERE 
a.city_id='.$city_id.'
AND a.locationtype=1
AND 
(
a.location LIKE "%'.$args['inputval'].'%"


)


LIMIT 10
 
      ';
    
 
 $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;


   for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]["location_id"])){
                    $same=1;
              }
              }
      if($same==0){
            $resut_text=$word_result[$i]['location'].' - '.$word_result[$i]['postalCode'];
            $arr['response'][]=array('id'=>$word_result[$i]["location_id"],
                                      'name'=>$resut_text
                                       );
         
      }



}

break;

case 'category_product':

   $pieces = explode(" ", $args['inputval']);
          $category_pieces_sql='';    $product_pieces_sql='';
          if($pieces!=FALSE){
              foreach($pieces as $word){
 if($word!=''){
          $category_pieces_sql.='|| a.category_name LIKE "%'.$word.'%" ';   
        $product_pieces_sql.='|| b.product_name LIKE "%'.$word.'%" ';   
                  }
           

              }
          
        
          }    





$total_sql=array();
$total_sql[]='(SELECT a.category_id as id , a.category_name as name ,p.content_slug	as slug , 0 as type
      FROM '.DB_NAME.'.store_categories a ,'.DB_NAME.'.page_slug p 
 WHERE a.entity_id = '. $ActorEntityData['EntityData']['entity_id'].' 
AND (a.category_name LIKE "%'.$args['inputval'].'%"'. $category_pieces_sql.')
 AND  CAST(p.object_id As SIGNED) =a.category_id 
 AND  p.object_type ="category"
       )';

$total_sql[]='(SELECT b.product_id as id , b.product_name as name , q.content_slug as slug  , 1 as type
      FROM '.DB_NAME.'.store_products b ,'.DB_NAME.'.page_slug q 
 WHERE b.entity_id = '. $ActorEntityData['EntityData']['entity_id'].' 
AND (b.product_name LIKE "%'.$args['inputval'].'%"'.  $product_pieces_sql.')
 AND  CAST(q.object_id As SIGNED) =b.product_id 
 AND  q.object_type ="product"

       )';

 $sql=implode(' UNION ALL ',$total_sql);
 
 $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;


   for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]["id"])){
                    $same=1;
              }
              }
      if($same==0){
      $resut_text=$word_result[$i]['name'];
             $arr['response'][]=array('id'=>$word_result[$i]["type"].'_'.$word_result[$i]["id"],
                                      'mid'=>$word_result[$i]["id"],
                                      'name'=>$resut_text,
                                      'slug'=> $word_result[$i]["slug"],
                                      'type'=> $word_result[$i]["type"]
                                       );
      }



}

break;
case 'locallocationbycountry':
$country_id=GetPropertyInArray('id',$args['info'],'0','numericID');
  $sql='
       SELECT DISTINCT *
FROM '.DB_NAME.'.locations a ,'.DB_NAME.'.location_postalcode b,'.DB_NAME.'.location_fl_admin c,'.DB_NAME.'.location_cities d 
WHERE 
a.country_id='.$country_id.'
AND a.postalCode_id=b.postalCode_id
AND a.fl_admin_id=c.fl_admin_id
AND a.city_id=d.city_id
AND 
(
a.location LIKE "%'.$args['inputval'].'%"


)


LIMIT 10
 
      ';
    
 
 $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;


   for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]["location_id"])){
                    $same=1;
              }
              }
      if($same==0){
      $resut_text=$word_result[$i]['location'].' - '.$word_result[$i]['postalCode'].' - '.$word_result[$i]['fl_admin'];
             $arr['response'][]=array('id'=>$word_result[$i]["location_id"],
                                      'name'=>$resut_text
                                       );
      }



}

break;
case 'postalCodebycountry':


$country_id=GetPropertyInArray('id',$args['info'],'0','numericID');

  $sql='
       SELECT DISTINCT *
FROM '.DB_NAME.'.location_postalcode b
WHERE 
b.country_id='.$country_id.'
AND  b.postalCode LIKE "%'.$args['inputval'].'%"


LIMIT 10
 
      ';
    
 
 $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;


   for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]["postalCode_id"])){
                    $same=1;
              }
              }
      if($same==0){
     
             $arr['response'][]=array('id'=>$word_result[$i]["postalCode_id"],
                                      'name'=>$word_result[$i]['postalCode']
                                       );
      }



}


break;
case 'category':

if($args['inputval']=="most used"){
  
    $sql='
       SELECT DISTINCT *
FROM '.DB_NAME.'.store_categories a ,'.DB_NAME.'.page_slug b  
WHERE  
a.entity_id = '. $ActorEntityData['EntityData']['entity_id'].' 
AND (a.category_name LIKE "%'.$args['inputval'].'%"'. $pieces_sql.')
AND  a.deleted =0
AND  CAST(b.object_id As SIGNED) =a.category_id 
 AND  b.object_type ="category"
LIMIT 25
 
      ';
  
    
}else{
       $pieces = explode(" ", $args['inputval']);
          $pieces_sql='';
          if($pieces!=FALSE){
              foreach($pieces as $word){
 if($word!=''){
           $pieces_sql.='|| a.category_name LIKE "%'.$word.'%" ';   
                  }
           

              }
          
        
          }    
  $sql='
       SELECT DISTINCT *
FROM '.DB_NAME.'.store_categories a ,'.DB_NAME.'.page_slug b  
WHERE  
a.entity_id = '. $ActorEntityData['EntityData']['entity_id'].' 
AND (a.category_name LIKE "%'.$args['inputval'].'%"'. $pieces_sql.')
AND  a.deleted =0
AND  CAST(b.object_id As SIGNED) =a.category_id 
 AND  b.object_type ="category"
LIMIT 25
 
      ';
}


 
 $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;

 for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]["category_id"])){
                    $same=1;
              }
              }
      if($same==0){
            $resut_text=$word_result[$i]['category_name'];
           $arr['response'][]=array('id'=>$word_result[$i]["category_id"],
                                      'slug'=>$word_result[$i]["content_slug"],
                                      'name'=> $resut_text);
         
      }



}


break;


case 'UserName':
$type=GetPropertyInArray('type',$args['info'],'','numericID');

if($type==''){
  $sql='
       SELECT DISTINCT * 
FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
WHERE   CAST(q.object_id As SIGNED) =p.entity_id
 AND (q.object_type="buyer"||q.object_type="store")
 AND (q.content_slug LIKE  "%'.$args['inputval'].'" || q.content_slug LIKE  "%'.$args['inputval'].'%")
 
 ';   
 
  
}else{
     $sql='
       SELECT DISTINCT * 
FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
WHERE   CAST(q.object_id As SIGNED) =p.entity_id
 AND (q.object_type="buyer"||q.object_type="store")
 AND p.type='.$type.'
 AND (q.content_slug LIKE  "%'.$args['inputval'].'" || q.content_slug LIKE  "%'.$args['inputval'].'%")
 
 ';  
}
$word_result=$GLOBALS['Var_DBMysqli']->query($sql);;

  for($i=0;$i<count($word_result);$i++){
   $word_result[$i]=$GLOBALS['Var_ViewParse']->EntityStripdata($GLOBALS['Var_ViewParse']->ParseEntityRow($word_result[$i]));
 }


  for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]["eid"])){
                    $same=1;
              }
              }
      if($same==0){
           $resut_text=$word_result[$i]['entityName'].' @ '.$word_result[$i]["slug"];
           $arr['response'][]=array('id'=>$word_result[$i]["eid"],
                                      'slug'=>$word_result[$i]["slug"],
                                      'type'=>$word_result[$i]["type"],
                                      'name'=> $resut_text
                                                         );
         
      }



}

break;
case 'productsuggestion':
      $pieces = explode(" ", $args['inputval']);
          $pieces_sql='';
          if($pieces!=FALSE){
              foreach($pieces as $word){
 if($word!=''){
           $pieces_sql.='|| a.product_name LIKE "%'.$word.'%" ';   
                  }
           

              }
          
        
          }    
  $sql='
       SELECT DISTINCT *
FROM '.DB_NAME.'.store_products a,'.DB_NAME.'.page_slug b  
WHERE  
a.entity_id = '. $ActorEntityData['EntityData']['entity_id'].' 
AND (a.product_name LIKE "%'.$args['inputval'].'%"'. $pieces_sql.')
AND  a.deleted =0
AND  CAST(b.object_id As SIGNED) =a.product_id
AND  b.object_type ="product" 
LIMIT 25
 
      ';

 
 $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;


   for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]["product_id"])){
                    $same=1;
              }
              }
      if($same==0){
            $resut_text=''.$word_result[$i]['product_name'].'';
           $arr['response'][]=array(
                                      'id'=>$word_result[$i]["product_id"],
                                      'slug'=>$word_result[$i]["content_slug"],
                                      'name'=> $resut_text
                                      );
         
      }



}
       break; 


case 'companycategory':

   $pieces = explode(" ", $args['inputval']);
          $pieces_sql='';
          if($pieces!=FALSE){
              foreach($pieces as $word){
 if($word!=''){
           $pieces_sql.='|| a.category_name LIKE "%'.$word.'%" ';   
                  }
           

              }
          
        
          }    
  $sql='
       SELECT DISTINCT *
FROM '.DB_NAME.'.company_categories a ,'.DB_NAME.'.page_slug b  
WHERE  
a.entity_id = '. $ActorEntityData['EntityData']['entity_id'].' 
AND (a.category_name LIKE "%'.$args['inputval'].'%"'. $pieces_sql.')
AND  a.deleted =0
AND  CAST(b.object_id As SIGNED) =a.category_id 
 AND  b.object_type ="company-category"
LIMIT 25
 
      ';

 
 $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;

 for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]["category_id"])){
                    $same=1;
              }
              }
      if($same==0){
            $resut_text=$word_result[$i]['category_name'];
           $arr['response'][]=array('id'=>$word_result[$i]["category_id"],
                                      'slug'=>$word_result[$i]["content_slug"],
                                      'name'=> $resut_text);
         
      }



}
break;


case 'choosebrand':
   $pieces = explode(" ", $args['inputval']);
          $pieces_sql='';
          if($pieces!=FALSE){
              foreach($pieces as $word){
 if($word!=''){
           $pieces_sql.='|| a.search_data LIKE "%'.$word.'" ';   
                  }
           

              }
          
        
          }    

  $sql='
       SELECT DISTINCT *
FROM '.DB_NAME.'.company_brand a ,'.DB_NAME.'.page_slug b  
WHERE  (a.product_name LIKE "%'.$args['inputval'].'%"'. $pieces_sql.' )
AND  a.deleted =0
AND a.countryinfo_id = '. $ActorEntityData['EntityData']['private_data']['countryinfo_id'].' 
AND  CAST(b.object_id As SIGNED) = a.brand_id
 AND  b.object_type ="brand"
LIMIT 25
 
      ';
     
 
 $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;

    $arr['response']=$GLOBALS['Var_Company_Dashboard']->ParseBrandForSuggestion($word_result,array('selected'=>$selected));




break;



 }


   }    
           
     
  return $arr;   



 
}




    




 }

 $GLOBALS['Var_SelectBox'] =new SelectBox();



?>
