<?php
    

class ProfileOutput{
    

/**
* @description=>buyerCheckInList.
* @param  => array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>$args['search_str'],'type'=>0)
* @return => 
*/

public function buyerCheckInList($args=array()){
    $WHERE='';    $ORDERBY='';

    switch($args['type']){
     case 0:
     $WHERE='a.buyer_id	='.$args['entity_id'].'';
     break;
     case 1:
     $WHERE=' a.buyers_id	LIKE "%'.$args['entity_id'].'%"  ';
     break;
     case 2:
      $WHERE=' (  a.buyer_id	='.$args['entity_id'].'
         OR a.buyers_id	LIKE "%'.$args['entity_id'].'%"  
        ) ';
     break;    
    }



    $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.checkins a 
 WHERE '.$WHERE.'';

    $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);


 $selectsql='SELECT * FROM '.DB_NAME.'.checkins a 
 WHERE '.$WHERE.'

'.$ORDERBY.'

 ';
 

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
* @description=>buyerCheckInList.
* @param  => array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>$args['search_str'],'type'=>0)
* @return => 
*/
public function GetNotification($args=array()){
    $selectsql='';$numsql='';    $WHERE='';    $GROUPBY='GROUP BY activity_code,object_id';   
     $ORDERBY='  ORDER BY 	timestamp DESC ';
       $relativeSql='SELECT e.to_id as entity_id
                           FROM '.DB_NAME.'.relation_one_way e
                           WHERE (e.current_status=3||e.current_status=4)
                           AND (e.from_id='.$args['entity_id'].')';
    $MySpreadSql='SELECT spread_id
       FROM '.DB_NAME.'.spread s
       WHERE s.entity_id='.$args['entity_id'].'';

// AND (a.activity_code="100"||a.activity_code="101"||a.activity_code="102")
//--Notification form reaction/comment reaaction on self spread
$reationActivity='SELECT ra.spread_activity_id
       FROM '.DB_NAME.'.spread_activity ra
       WHERE ra.spread_id IN('.$MySpreadSql.')
       AND (ra.activity_code="100"||ra.activity_code="101"||ra.activity_code="102")
       AND (ra.activity_code !="130" )
       AND (ra.creater_id !="'.$args['entity_id'].'" )';


    
//-->>ref ['ra']


//--
$total_sql=array();
$total_sql[]='(SELECT  activity_code,creater_id,object_id,timestamp
  FROM '.DB_NAME.'.spread_activity sa
 WHERE (sa.spread_activity_id IN ('.$reationActivity.')
            
            )

       ) ';

$total_sql[]='(SELECT activity_code,creater_id,object_id,timestamp
 FROM '.DB_NAME.'.activity_main am
 WHERE (am.creater_id IN ('.$relativeSql.')
            
            )

       ) ';

// --Main Sql

$MainSql= implode(' UNION ALL ',$total_sql);
//$MainSql= $total_sql[0];
//--
    $numsql='SELECT COUNT(*) FROM ('.$MainSql.') as data';

    $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);


 $selectsql=$MainSql;
 // ORDERBY;
  $selectsql.=$ORDERBY;

 //linit sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';

//$selectsql.=$limit;
   $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;
 // check_response($selectsql);
    return array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$result,
          'totalpage'=>$paging_data['total_page'],
          'searchstr'=>$args['search_str'],
          'selectedid'=>$args['selected_id']
             );
}

public function ParseNotification($Fields,$args=array()){
      $ret=array();    $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
    $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
     for($i=0;$i<count($Fields);$i++){
   $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('NotificationView'); 
 $EntityInformation= new EntityInformation($Fields[$i]['creater_id'],$ActorEntityData['EntityData']['entity_id']);
   $EntityRow=$EntityInformation->frontuser_EntityRow; 
   $ret[$i]['ESd']=$GLOBALS['Var_ViewParse']->EntityStripdata($EntityRow); 
   $ret[$i]['type']=$Fields[$i]['activity_code'];
   $ret[$i]['time']=date_in_timezone( $zone,$Fields[$i]['timestamp']);;  
   
   
   
      
   switch($Fields[$i]['activity_code']){
     case '100':
// $ret[$i]['link']='';
  $ret[$i]['msg']='reacted on';    
     break;
    case '101':
 //$ret[$i]['link']='';
 $ret[$i]['msg']='comment ed on';   
     break;
    case '102':
 //$ret[$i]['link']='';
 $ret[$i]['msg']='reviewed on';   
     break;    
   }
   

     }
     return  $ret;
}

}







$GLOBALS['Var_ProfileOutput'] =new ProfileOutput();


?>