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

 $args['search_str'] =validateSearchWord($args['search_str']);
 //--
 $serachquery='';
 switch($args['tab']){
      
  case 'product':
     $pieces = explode(" ", $args['search_str']);
          $pieces_sql='';
          if($pieces!=FALSE){ foreach($pieces as $word){ if($word!=''){ $pieces_sql.='|| a.product_public_data LIKE "%'.$word.'%" ';$pieces_sql.='|| a.product_name LIKE "%'.$word.'%" ';   }  } }    

$serachquery='(a.product_name	 LIKE "%'.$args['search_str'].'" '. $pieces_sql.')';
   break;  
  case 'location_store':
   $pieces = explode(" ", $args['search_str']);
    $pieces_sql='';
   if($pieces!=FALSE){ foreach($pieces as $word){ if($word!=''){ $pieces_sql.='|| p.public_data LIKE "%'.$word.'%" ';   }  } }    
$serachquery='(p.public_data LIKE "%'.$args['search_str'].'%"'. $pieces_sql.')';
   break; 
  case 'people':
       $pieces = explode(" ", $args['search_str']);
          $pieces_sql='';
          if($pieces!=FALSE){ foreach($pieces as $word){ if($word!=''){ $pieces_sql.='|| p.public_data LIKE "%'.$word.'%" ';   }  } }    
$serachquery='(p.public_data LIKE "%'.$args['search_str'].'%"'. $pieces_sql.')';
   break; 
  case 'selltagstore':

   break; 
  case 'sellfavstore':

   break; 
  case 'incurrentstore':

  break; 
  default://store
     $pieces = explode(" ", $args['search_str']);
          $pieces_sql='';
          if($pieces!=FALSE){ foreach($pieces as $word){ if($word!=''){ $pieces_sql.='|| p.public_data LIKE "%'.$word.'%" ';   }  } }    
$serachquery='(p.public_data LIKE "%'.$args['search_str'].'%"'. $pieces_sql.')';

     break;
 }

 //--select sql
 switch($args['tab']){
      
 case 'product':
$numsql='SELECT COUNT(*) FROM '.DB_NAME.'.store_products a
 WHERE '.$serachquery.'
 AND  a.deleted =0
';



$selectsql='SELECT * FROM '.DB_NAME.'.store_products a ,'.DB_NAME.'.page_slug b,'.DB_NAME.'.spread c
 WHERE '.$serachquery.'
  AND  a.deleted =0
 AND  CAST(b.object_id As SIGNED) =a.product_id 
  AND  b.object_type ="product"
  AND c.spread_id=a.spread_id';

   break;  
  case 'location_store':
        $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.entity p
 WHERE '.$serachquery.'
  ';


 $selectsql='SELECT * FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
 WHERE '.$serachquery.'
 AND  CAST(q.object_id As SIGNED) =p.entity_id
 AND (q.object_type="store")
 ';
   break; 
  case 'people':
        $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.entity p
 WHERE '.$serachquery.'
  ';


 $selectsql='SELECT * FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
 WHERE '.$serachquery.'
 AND  CAST(q.object_id As SIGNED) =p.entity_id
 AND (q.object_type="buyer")
 ';
   break; 
  case 'selltagstore':

   break; 
  case 'sellfavstore':

   break; 
  case 'incurrentstore':

  break; 
  default://store
     $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.entity p
 WHERE '.$serachquery.'
  ';


 $selectsql='SELECT * FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
 WHERE '.$serachquery.'
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
* @description=>
* @param  => 
* @return => 
*/
public function ParseSearchResult($Fields,$args){
      $ret=array();

   

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
  case 'location_store':
   $EntityInformation= new EntityInformation($args['ActorEntityData']['EntityData']['entity_id'],$args['ActorEntityData']['EntityData']['entity_id']); 
  for($i=0;$i<count($Fields);$i++){
    $Fields[$i]= $EntityInformation->ParseEntityRow($Fields[$i]);
 } 
    $ret=$GLOBALS['Var_ViewParse']->EntityCardDataByEntityRow($Fields,$EntityInformation->actoruser_EntityRow);
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

  break; 
      }


    return  $ret;
}




}



$GLOBALS['Var_Search']=new Search();

?>