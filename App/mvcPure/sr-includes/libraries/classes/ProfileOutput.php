<?php
    

class ProfileOutput{
    


/**$GLOBALS['Var_ProfileOutput'] ->UpdateNotifictionCheckTime()
* @description=>buyerCheckInList.
* @param  =>
* @return => 
*/
public function UpdateNotifictionCheckTime( $Time){
    $ActorEntityData  =   $GLOBALS['Var_ActorEntityData'];
$EntityRow=  $ActorEntityData['EntityData'];

$EntityRow['private_data']['notification_checktime']= $Time;



   $update= $GLOBALS['Var_Update']->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);
}

/**$GLOBALS['Var_ProfileOutput'] ->UpdateCheckInCheckTime()
* @description=>buyerCheckInList.
* @param  =>
* @return => 
*/
public function UpdateCheckInCheckTime( $Time){
    $ActorEntityData  =   $GLOBALS['Var_ActorEntityData'];
$EntityRow=  $ActorEntityData['EntityData'];

$EntityRow['private_data']['checkin_msg_checktime']= $Time;



   $update= $GLOBALS['Var_Update']->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);
}
/**$GLOBALS['Var_ProfileOutput'] ->UpdateChatCheckTime()
* @description=>buyerCheckInList.
* @param  =>
* @return => 
*/
public function UpdateChatCheckTime( $Time){
    $ActorEntityData  =   $GLOBALS['Var_ActorEntityData'];
$EntityRow=  $ActorEntityData['EntityData'];

$EntityRow['private_data']['chat_msg_checktime']= $Time;



   $update= $GLOBALS['Var_Update']->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);
}
/**$GLOBALS['Var_ProfileOutput'] -> UpdateOrderCheckTime()
* @description=>buyerCheckInList.
* @param  =>
* @return => 
*/
public function UpdateOrderCheckTime( $Time){
    $ActorEntityData  =   $GLOBALS['Var_ActorEntityData'];
$EntityRow=  $ActorEntityData['EntityData'];

$EntityRow['private_data']['order_checktime']= $Time;



   $update= $GLOBALS['Var_Update']->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);
}


/**$GLOBALS['Var_ProfileOutput'] ->NumProfileData('')
* @description=>buyerCheckInList.
* @param  =>
* @return => 
*/
function NumProfileData($DataName){
    $count=5;
$ActorEntityData  =   $GLOBALS['Var_ActorEntityData'];
    switch($DataName){
    case 'new_notification':
   $notification_checktime= $ActorEntityData['EntityData']['private_data']['notification_checktime'];
   
$MainSql= $this->GetNotification_Sql(array('pagesize'=>10,'paged'=>1,'point_time'=>$notification_checktime,'mode'=>1,'selected_id'=>'','search_str'=> '','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'tab'=>'','ActorEntityData'=>$ActorEntityData));
//$MainSql= $total_sql[0];
//--
    $numsql='SELECT COUNT(*) FROM ('.$MainSql.') as data';

       $count=$GLOBALS['Var_DBMysqli']->numquery($numsql); 

    break;    
    case 'new_checkin_msg':
    $checkin_msg_checktime= $ActorEntityData['EntityData']['private_data']['checkin_msg_checktime'];
  // check_response(time().'-'.$checkin_msg_checktime.'='.(time()-$checkin_msg_checktime));
    //$checkin_msg_checktime= time();
     $checkin_sql='SELECT c.conversation_id as conversation_id  FROM '.DB_NAME.'.conversation c 
 WHERE  c.members LIKE  \'%"'.$ActorEntityData['EntityData']['entity_id'].'"%\' 
 AND c.conversation_type =1 ';
  $total_sql=array();

$total_sql[]='(SELECT COUNT(a.messages_id) as messages_id 
FROM '.DB_NAME_CONVERSATION.'.conversation_messages_0 a
 WHERE a.conversation_id IN ('. $checkin_sql.')
 AND a.time_node > '.$checkin_msg_checktime .' )';

$total_sql[]='(SELECT COUNT(b.messages_id) as messages_id 
FROM '.DB_NAME_CONVERSATION.'.conversation_messages_1 b
 WHERE b.conversation_id IN ('. $checkin_sql.')
 AND b.time_node > '.$checkin_msg_checktime .' )';

  $numsql= implode(' UNION  ',$total_sql);
    

  $count=$GLOBALS['Var_DBMysqli']->numquery($numsql);
 // check_response($count);  check_response($numsql);
    break; 
  case 'new_chat_msg':
    $checkin_msg_checktime= $ActorEntityData['EntityData']['private_data']['chat_msg_checktime'];
    //$checkin_msg_checktime= time();
     $checkin_sql='SELECT c.conversation_id as conversation_id  FROM '.DB_NAME.'.conversation c 
 WHERE  c.members LIKE   \'%"'.$ActorEntityData['EntityData']['entity_id'].'"%\' 
 AND c.conversation_type =0 ';
  $total_sql=array();

$total_sql[]='(SELECT COUNT(messages_id) as messages_id 
FROM '.DB_NAME_CONVERSATION.'.conversation_messages_0 a
 WHERE conversation_id IN ('. $checkin_sql.')
 AND time_node > '.$checkin_msg_checktime .' )';

$total_sql[]='(SELECT COUNT(messages_id) as messages_id 
FROM '.DB_NAME_CONVERSATION.'.conversation_messages_1 a
 WHERE conversation_id IN ('. $checkin_sql.')
 AND time_node > '.$checkin_msg_checktime .' )';

  $numsql= implode(' UNION  ',$total_sql);
    

  $count=$GLOBALS['Var_DBMysqli']->numquery($numsql);
 //check_response($count);  check_response($numsql);
    break; 
  case 'orderalert':
    $checktime= $ActorEntityData['EntityData']['private_data']['order_checktime'];
    // date_in_timezone($zone=,$date_time='',$timestamp='')

    //$checktime= time();
   $numsql='SELECT COUNT(c.order_id) as order_id  FROM '.DB_NAME.'.orders c 
 WHERE  c.store_entity_id = '.$ActorEntityData['EntityData']['entity_id'].'
  AND c.order_status =   0
 AND c.timestamp >  '.$checktime.' ';

    

  $count=$GLOBALS['Var_DBMysqli']->numquery($numsql);
 //check_response($count);  check_response($numsql);
    break; 

case 'new_friend_request':
   $numsql='  SELECT COUNT(from_id) as from_id
       FROM '.DB_NAME.'.relation_two_way
       WHERE current_status="7"
       AND to_id="'.$ActorEntityData['EntityData']['entity_id'].'" ';
  $count=$GLOBALS['Var_DBMysqli']->numquery($numsql);
    break; 

    
    }

    return $count;
}


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
* @description=> get the checkin list at  all member
* @param  =>array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','checkin_id'=>$args['checkin_id'],'checkin_row'=>$args['checkin_row'],'selected_id'=>'','search_str'=>'')
* @return => 
*/


public function CheckInList($args=array()){
    
         
 $WHERE=' a.members LIKE \'%"'.$args['entity_id'].'"%\' 
 AND  a.conversation_id  NOT IN ( SELECT b.conversation_id FROM  '.DB_NAME.'.conversation b
                                 WHERE   b.is_delete LIKE \'%"'.$args['entity_id'].'"%\' 
                                 )
 AND b.conversation_id = a.conversation_id
 ';


 $FROM=''.DB_NAME.'.conversation a , '.DB_NAME.'.checkins b  ';




 $numsql='SELECT COUNT(*) FROM '.$FROM.'
 WHERE    '. $WHERE.'


';

     //-- retrive_mode
 
 

$selectsql='SELECT * FROM '.$FROM.'
 WHERE  '. $WHERE.'
ORDER BY a.lastactivity_time DESC          
                       ' ;


 $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);
//linit sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';
 $selectsql.=$limit;
 //check_response( $total_result);
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
* @description=>buyerCheckInList.
* @param  => array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>$args['search_str'],'type'=>0)
* @return => 
*/
public function GetNotification_Sql($args=array()){
  $ActorEntityData=  $args['ActorEntityData'];
  $NotifictionCheckTime=intval($ActorEntityData['EntityData']['private_data']['notification_checktime']);
  //$NotifictionCheckTime=time();
  //check_response(time()-$NotifictionCheckTime);

    $selectsql='';$numsql='';    $WHERE='';    $GROUPBY='GROUP BY activity_code,object_id';   
     $ORDERBY='  ORDER BY 	timestamp DESC ';
       $relativeSql='SELECT e.to_id as entity_id
                           FROM '.DB_NAME.'.relation_one_way e
                           WHERE (e.current_status=3||e.current_status=4)
                           AND (e.from_id='.$args['entity_id'].')';
    $MySpreadSql='SELECT spread_id
       FROM '.DB_NAME.'.spread s
       WHERE s.entity_id='.$args['entity_id'].'';

//--
    //--sqlnum count 
     $retrive_mode=array();
   if($args['point_time']==''){ $args['point_time']=time(); }

$retrive_mode[0]='(sa.timestamp < '.$args['point_time'].'  AND sa.timestamp > '.$NotifictionCheckTime.'  )';
   $retrive_mode[1]='(am.timestamp < '.$args['point_time'].'  AND am.timestamp > '.$NotifictionCheckTime.'  )';
   $retrive_mode[2]='(sa0.timestamp < '.$args['point_time'].'  AND sa0.timestamp > '.$NotifictionCheckTime.'  )'; 

   if($args['mode']==1){
   $retrive_mode[0]='(sa.timestamp > '.$args['point_time'].' AND sa.timestamp > '.$NotifictionCheckTime.' )';
   $retrive_mode[1]='(am.timestamp > '.$args['point_time'].' AND am.timestamp > '.$NotifictionCheckTime.' )';
   $retrive_mode[2]='(sa0.timestamp < '.$args['point_time'].'  AND sa0.timestamp > '.$NotifictionCheckTime.'  )'; 
   }




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
$total_sql[]='(SELECT  DISTINCT activity_code,creater_id,object_id,timestamp,spread_id,object_type
  FROM '.DB_NAME.'.spread_activity sa
 WHERE sa.spread_activity_id IN ('.$reationActivity.')
 AND '.$retrive_mode[0].'           
            
 GROUP BY sa.spread_id 
       ) ';

$total_sql[]='(SELECT  DISTINCT   activity_code,creater_id,object_id,timestamp,spread_id,object_type
  FROM '.DB_NAME.'.spread_activity sa0
 WHERE sa0.object_id = '.$args['entity_id'].'
 AND (sa0.activity_code="104" ||sa0.activity_code="110")
  AND '.$retrive_mode[2].'         
            
    GROUP BY sa0.spread_id 
       )
    
       
        ';

$total_sql[]='(SELECT  DISTINCT activity_code,creater_id,object_id,timestamp,null as spread_id,null as object_type
 FROM '.DB_NAME.'.activity_main am
 WHERE am.creater_id IN ('.$relativeSql.')
  AND '.$retrive_mode[1].'             
           

       ) ';

// --Main Sql

$MainSql= implode(' UNION ALL ',$total_sql);
return $MainSql;
}
public function GetNotification($args=array()){
  $ActorEntityData=  $args['ActorEntityData'];
  $NotifictionCheckTime=$ActorEntityData['EntityData']['private_data']['notification_checktime'];

    $selectsql='';$numsql='';    $GROUPBY='GROUP BY activity_code,object_id';   
     $ORDERBY='  ORDER BY 	timestamp DESC ';

$MainSql= $this->GetNotification_Sql($args);
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

$selectsql.=$limit;
   $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;
 // check_response($selectsql);

   return PagingOutPut(array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$result,
          'totalpage'=>$paging_data['total_page'],
          'totalresult'=>$total_result,
          'searchstr'=>$args['search_str'],
          'selectedid'=>$args['selected_id'] ,
          'Sort'=>'',
          'ifo'=>array() 
             ));
}


/**
* @description=>buyerCheckInList.
* @param  => array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>$args['search_str'],'type'=>0)
* @return => 
*/
public function GetFriendRequest($args=array()){
     $selectsql='';$numsql='';    $WHERE='';

  $freindsRequestSql='(p.entity_id IN(SELECT c.from_id
                           FROM '.DB_NAME.'.relation_two_way c
                           WHERE c.current_status=7
                           AND (c.to_id='.$args['entity_id'].'))
                           
                           )';

//--
     $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.entity p
 WHERE '.$freindsRequestSql.'
  ';


 $selectsql='SELECT * FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
 WHERE '.$freindsRequestSql.'
 AND  p.entity_id <>'.$args['entity_id'].'
 AND  CAST(q.object_id As SIGNED) =p.entity_id
 AND (q.object_type="buyer"||q.object_type="store")
 ';




    $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);


 

 //linit sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';

$selectsql.=$limit;
   $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;
//check_response($paging_data);


  for($i=0;$i<count($result);$i++){
     $result[$i]=$GLOBALS['Var_ViewParse']->ParseEntityRow($result[$i]);
 }



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
* @description=
* @param  => 
* @return => 
*/
public function GetMyOrders($args=array()){
     $selectsql='';$numsql='';    $WHERE=' a.buyer_entity_id	='.$args['entity_id'].'';

$numsql='SELECT COUNT(*) FROM '.DB_NAME.'.orders a 
 WHERE '.$WHERE.'

 ';
 $selectsql='SELECT * FROM '.DB_NAME.'.orders a 
 WHERE '.$WHERE.'
 ORDER BY a.order_time DESC
 ';




    $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);


 

 //linit sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';

$selectsql.=$limit;
   $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;
//check_response($paging_data);


 



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
* @description=
* @param  => $args['filter'] => ''|'location'|'friendoffriend'
* @param  =>$args['entity_id']=> 
* @return => 
*/
public function GetPeopleSuggestion($args=array()){
         $selectsql='';$numsql='';    $WHERE='';



 $actorDirectrelative_NOT_IN_sql='(   p.entity_id NOT IN (SELECT x.from_id
                           FROM '.DB_NAME.'.relation_two_way x
                           WHERE x.current_status=3
                           AND x.to_id='.$args['entity_id'].')
                           &&
                          p.entity_id NOT IN (SELECT y.to_id
                           FROM '.DB_NAME.'.relation_two_way y
                           WHERE y.current_status=3
                           AND y.from_id='.$args['entity_id'].')
                           &&
                          p.entity_id NOT IN(SELECT z.to_id
                           FROM '.DB_NAME.'.relation_one_way z
                           WHERE z.current_status=3
                           AND z.from_id='.$args['entity_id'].')
                            
                           )';

 $actorInDirectrelative_sql=' SELECT DISTINCT entity_id
  FROM '.DB_NAME.'.entity
   WHERE (  entity_id IN (SELECT c.from_id
                           FROM '.DB_NAME.'.relation_two_way c
                           WHERE c.current_status=3
                           AND c.to_id='.$args['entity_id'].')
                           ||
                         entity_id IN (SELECT d.to_id
                           FROM '.DB_NAME.'.relation_two_way d
                           WHERE d.current_status=3
                           AND d.from_id='.$args['entity_id'].')
                           ||
                         entity_id IN (SELECT e.to_id
                           FROM '.DB_NAME.'.relation_one_way e
                           WHERE e.current_status=3
                           AND e.from_id='.$args['entity_id'].')
                            
                           ) ';

   // relative of relative sql
    $relative_of_relative_sql='(   p.entity_id IN (SELECT c.from_id
                           FROM '.DB_NAME.'.relation_two_way c
                           WHERE c.current_status=3
                           AND c.to_id IN ('. $actorInDirectrelative_sql.'))
                           ||
                          p.entity_id IN (SELECT d.to_id
                           FROM '.DB_NAME.'.relation_two_way d
                           WHERE d.current_status=3
                           AND d.from_id IN ('. $actorInDirectrelative_sql.'))
                           ||
                          p.entity_id IN (SELECT e.to_id
                           FROM '.DB_NAME.'.relation_one_way e
                           WHERE e.current_status=3
                           AND e.from_id IN ('. $actorInDirectrelative_sql.'))
                            
                           )';



$WHERE_FriendofFriend ='('.$relative_of_relative_sql.'
       AND
      '.$actorDirectrelative_NOT_IN_sql.'
     
       )';

$WHERE_MemberFromLocation = ' (
                           ( p.entity_id IN (SELECT k.entity_id
                           FROM '.DB_NAME.'.address k
                           WHERE k.location_id IN  (SELECT l.location_id
                           FROM '.DB_NAME.'.address l
                           WHERE l.entity_id ='.$args['entity_id'].'
                           )
                           ))
                    AND
               '.$actorDirectrelative_NOT_IN_sql.'    
                           )';
//--


$WHERE ='('. $WHERE_FriendofFriend .'
||
'. $WHERE_MemberFromLocation .'
)';

$WHERE ='(
'. $WHERE_MemberFromLocation .'
)';


//--
     $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.entity p
 WHERE '.$WHERE.'
  ';


 $selectsql='SELECT DISTINCT * FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
 WHERE '.$WHERE.'
 AND  p.entity_id <>'.$args['entity_id'].'
 AND  CAST(q.object_id As SIGNED) =p.entity_id
 AND (q.object_type="buyer")
 ';




    $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);


 

 //linit sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';

$selectsql.=$limit;
   $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;
//check_response( $selectsql);


  for($i=0;$i<count($result);$i++){
     $result[$i]=$GLOBALS['Var_ViewParse']->ParseEntityRow($result[$i]);
 }



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
* @description=
* @param  => $args['filter'] => ''|'location'|'friendoffriend'
* @param  =>$args['entity_id']=> 
* @return => 
*/
public  function DoneFriendship($args=array()){
         $selectsql='';$numsql='';    $WHERE='';




  $freindsRequestSql='(p.entity_id IN(SELECT  d.to_id
                           FROM '.DB_NAME.'.spread_activity c , relation_two_way d
                           WHERE d.from_id='.$args['entity_id'].'
                           AND c.object_id =d.two_wr_id 
                           AND  c.activity_code="110"
                          
                         
                           )
                         
                           )';

//--
     $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.entity p
 WHERE '.$freindsRequestSql.'
  ';


 $selectsql='SELECT * FROM '.DB_NAME.'.entity p,'.DB_NAME.'.page_slug q
 WHERE '.$freindsRequestSql.'
 AND  p.entity_id <>'.$args['entity_id'].'
 AND  CAST(q.object_id As SIGNED) =p.entity_id
 AND (q.object_type="buyer")

 ';




    $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);


 

 //linit sql
 //$limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';
 $limit=' LIMIT 10';
$selectsql.=$limit;
   $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;



  for($i=0;$i<count($result);$i++){
     $result[$i]=$GLOBALS['Var_ViewParse']->ParseEntityRow($result[$i]);
 }
//check_response( $numsql);


    return array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$result,
          'totalpage'=>$paging_data['total_page'],
          'searchstr'=>$args['search_str'],
          'selectedid'=>$args['selected_id']
             );
}


//--parse 
public function ParseNotification($Fields,$args=array()){
      $ret=array();    $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
    $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
    $NotifictionCheckTime=time();
     for($i=0;$i<count($Fields);$i++){
   $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('NotificationView'); 
 $EntityInformation= new EntityInformation($Fields[$i]['creater_id'],$ActorEntityData['EntityData']['entity_id']);
   $EntityRow=$EntityInformation->frontuser_EntityRow; 
   $ret[$i]['id']= $Fields[$i]['creater_id'].'_'.$Fields[$i]['object_id'];
   $ret[$i]['ESd']=$GLOBALS['Var_ViewParse']->EntityStripdata($EntityRow); 
   $ret[$i]['type']=$Fields[$i]['activity_code'];
   $datetime=date_in_timezone( $zone,'',$Fields[$i]['timestamp']);;  
   $ret[$i]['time']= $datetime;  
   $ret[$i]['daydate']= $datetime;  
     $NotifictionCheckTime=$Fields[$i]['timestamp'];// setting point  at last delivered notification
   
      
   switch($Fields[$i]['activity_code']){
     case '100':
 $ret[$i]['link']=SITEURL.'spread&id='.$Fields[$i]['object_id'].'&rtw=ra';
  $ret[$i]['msg']='reacted on spread';    
     break;
    case '101':
 $ret[$i]['link']=SITEURL.'spread&id='.$Fields[$i]['spread_id'].'&rtw=cmt&cmt='.$Fields[$i]['object_id'];
 $ret[$i]['msg']='commented on  spread';   
     break;
    case '102':
 $ret[$i]['link']=SITEURL.'spread&id='.$Fields[$i]['spread_id'].'&rtw=cmt&cmt='.$Fields[$i]['object_id'];
 $ret[$i]['msg']='reviewed on product';   
     break;  
    case '104':
 $ret[$i]['link']=SITEURL.'spread&id='.$Fields[$i]['spread_id'].'';
 $ret[$i]['msg']='tagged you in a spread';   
     break;  
    case '801':
 $ret[$i]['link']=SITEURL.'ordertracking?id='.$Fields[$i]['object_id'];
 $ret[$i]['msg']='Order Status updated of Order Id '.$Fields[$i]['object_id'];   
     break;   
      case '110':
 $ret[$i]['link']=SITEURL.'spread&id='.$Fields[$i]['spread_id'].'';
 $ret[$i]['msg']='text_199';   
     break;  
        
   }
   

     }


      $this ->UpdateNotifictionCheckTime($NotifictionCheckTime);

     return  $ret;
}

}







$GLOBALS['Var_ProfileOutput'] =new ProfileOutput();


?>