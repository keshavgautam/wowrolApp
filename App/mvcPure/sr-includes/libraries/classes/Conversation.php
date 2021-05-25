<?php

/**
* @description=>process the Conversation .
* @param  =>
* @return =>
*/

class Conversation{
 /**
* @description=>Createconversation .
* @param  =>
* @return =>
*/


public function Createconversation($args){
 $ret=  array(
     'state'=>500,
    'conversation'=> array(),
    'All_EntityRow'=>array()
     );

 $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
  //getting allowed recipient row
  $Allowed_EntityRow=$this->HasAllowConversation( $ActorEntityData,$args['AllRecipient_EntityRow']);


  if(count( $Allowed_EntityRow)>1){
      // getting conversation
  $conversation = $this->Getconversation($Allowed_EntityRow);









// $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;
//$total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
$ret=  array(
     'state'=>200,
    'conversation'=> $conversation,
    'All_EntityRow'=>$Allowed_EntityRow
     );

  }

     return $ret;
}


 /**
 *
 * @param
 *
 * @return array()
 */
 public function Getconversation ($Allowed_EntityRow ,$conversation_type=0){
 $TableCode=ConversationMessagesTableCode();
 $AllConversationMember=array();$last_login=array();

 foreach($Allowed_EntityRow as $row){
   $AllConversationMember[]=$row['entity_id'];
   $last_login[]=$row['last_login'];
    }



 //--------
$result= $GLOBALS['Var_BundlePrototype']->DefaultValue('Conversation_Row');

$result['conversation_type']= $conversation_type;
$result['table_code']=  $TableCode;
$result['Instant_Updater_code']=  $GLOBALS['Var_Instant_Updater']->Get_Instant_Updater_code();
$result['Instant_Updater_hash']=   generate_random_string( 25,true ,true ,false, false, false );






//----
     asort($AllConversationMember);

$result['members']='"'.implode('","',$AllConversationMember).'"';

$data= $GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'conversation', array('members','conversation_type'),array($result['members'],$conversation_type));

if($data==NULL){
      //Now creating conversation group
    $history_cleared_till=$is_delete=$last_check_time=array();
       foreach(   $last_login as $time){
       $history_cleared_till[]=strtotime( $time);
       $last_check_time[]=strtotime( $time);

    }

$result['last_check_time']=  Makejson($last_check_time);
$result['history_cleared_till']= Makejson($history_cleared_till);
$result['table_code']= $TableCode;


$result['conversation_id'] =$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'conversation', array('members','conversation_type','last_check_time','history_cleared_till','table_code','lastactivity_time','Instant_Updater_code','Instant_Updater_hash'),array($result['members'],$result['conversation_type'], $result['last_check_time'],$result['history_cleared_till'],$TableCode,time(),$result['Instant_Updater_code'],$result['Instant_Updater_hash']));



}else{
    $result=$data;
}


//-
$NormalToArray =$this->ParseConversationRowToNormal($result);
 $result['last_check_time']=$NormalToArray['last_check_time'];
 $result['history_cleared_till']= $NormalToArray['history_cleared_till'];
 $result['members']=$NormalToArray['members'];

      return $result;
 }

  /**
 *
 * @param
 *
 * @return array()
 */
 public function SendTextMessage( $args){
      $args['conversation_id']=$args['conversation_row']['conversation_id'];
     $args['sender_id']=$args['ActorEntityData']['EntityData']['entity_id'];
    $args['recevers_id']='"'.implode('","',$args['conversation_row']['members']).'"';
     $args['time_node']=time() ;
    $Table='conversation_messages_'.$args['conversation_row']['table_code'];

    $args['messages_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME_CONVERSATION, $Table,array('message','recevers_id','conversation_id','sender_id','time_gmt','time_node'),array($args['message'],$args['recevers_id'],$args['conversation_id'],$args['sender_id'],$args['dateGMT'],$args['time_node']));

    //--UPDATE ONE
      $GLOBALS['Var_Instant_Updater']->Conversation($args['conversation_row']);


    //UPDATE TWO

    $GLOBALS['Var_Instant_Updater']->ConversationTextMessage(array(
    'conversation_row'=>$args['conversation_row'],
    'message_row'=>array('messages_id'=>$args['messages_id'],
                         'message'=>$args['message'],
                         'recevers_id'=>$args['recevers_id'],
                         'conversation_id'=>$args['conversation_id'],
                         'sender_id'=>$args['sender_id'],
                         'time_gmt'=>$args['dateGMT'],
                         'time_node' =>$args['time_node']
                         )

    ));
    //-------------
  return  $args;
 }
   /**
 *
 * @param
 * @call      $GLOBALS['Var_Conversation']->SendCheckinAttechmentMessage($args);
 * @return array()
 */
 public function  SendCheckinAttechmentMessage($args){



      $args['conversation_id']=$args['conversation_row']['conversation_id'];
     $args['sender_id']=$args['ActorEntityData']['EntityData']['entity_id'];
    $args['recevers_id']=implode(',',$args['conversation_row']['members']);
       $args['time_node']=time() ;
    $Table='conversation_messages_'.$args['conversation_row']['table_code'];


       //deleteing if any same type
  //  $GLOBALS['Var_DBMysqli']->delete(DB_NAME_CONVERSATION, $Table,array('conversation_id','attachments_id','attachments_type'),array($args['conversation_id'],$args['attachments_id'],$args['attachments_type']));

  $Message=(isset( $args['message']))?$args['message']:'';//by default
      $args['message']= $Message;
    $args['message_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME_CONVERSATION, $Table,array('message','recevers_id','conversation_id','sender_id','attachments_id','attachments_type','time_gmt','time_node'),array($args['message'],$args['recevers_id'],$args['conversation_id'],$args['sender_id'],$args['attachments_id'],$args['attachments_type'],$args['dateGMT'],time()));


        //UPDATE TWO

    $GLOBALS['Var_Instant_Updater']->CheckinTextMessage(array(
    'conversation_row'=>$args['conversation_row'],//should be same as checkin row / belived to be same
    'message_row'=>array('messages_id'=>$args['message_id'],
                         'message'=>$args['message'],
                         'recevers_id'=>$args['recevers_id'],
                         'attachments_id'=>$args['attachments_id'],
                         'attachments_type'=>$args['attachments_type'],
                         'conversation_id'=>$args['conversation_id'],
                         'sender_id'=>$args['sender_id'],
                         'time_gmt'=>$args['dateGMT'],
                         'time_node' =>$args['time_node']
                         )

    ));
    //-------------

  return  $args;


 }

   /**
 *
 * @param
 * @call      $GLOBALS['Var_Conversation']->MemberEdit($args);
 * @return array()
 */
 public function  MemberEdit($args){
    $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form



   // we have  to maintane last check time and history clear time
$REfArray=array(); $members=array();$last_check_time=array();$history_cleared_till=array();
 foreach( $args['checkIn_row']['members'] as $q=>$p){

     if(intval($p)!=0){
  $members[$q]=intval($p);
        if(isset($args['checkIn_row']['last_check_time'][$q])){
     $REfArray[$p]=array('last_check_time'=>$args['checkIn_row']['last_check_time'][$q],'history_cleared_till'=>$args['checkIn_row']['history_cleared_till'][$q]);
     }else{
     $REfArray[$p]=array('last_check_time'=>time(),'history_cleared_till'=>time());
     }
     }

       }


 asort($members); // maintain correlation
$members= array_unique($members);

     foreach($members as $q=>$p){
  $last_check_time[$q]=  $REfArray[$p]['last_check_time'];
  $history_cleared_till[$q]=  $REfArray[$p]['history_cleared_till'];
       }




      //sorting array
if(  ( count($members)>0)    ){
    $data_To_Save=array(
    'members'=>'"'.implode('","',$members ).'"',
    'last_check_time'=>json_encode(  $last_check_time),
    'history_cleared_till'=>json_encode( $history_cleared_till)
    );



  $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'conversation',array_keys( $data_To_Save),array_values($data_To_Save),array('conversation_id'),array($args['checkIn_row']['conversation_id']));

   if($update=="updated"&&$args['CreateChatMsg']){//sending message
         $args['conversation_row']=$args['checkIn_row'];
   $GLOBALS['Var_Conversation']->SendCheckinAttechmentMessage($args);
  }
}else{
  $update="ok";
}

 return $update;
 }



 /*
 @ param   $args['how'] = `BY_CONVERSATION_ROW`
 @call   $GLOBALS['Var_Conversation']-> RepaireConversation($data,$args=array())
 */
 public function RepaireConversation($data,$args=array()){
         $how =(isset($args['how']))?$args['how']:'BY_CONVERSATION_ROW';
      $conversation_id=0;
$IS_ConversationTable_update=FALSE;$IS_repaire=FALSE;

   switch( $how){
        case 'BY_CONVERSATION_ROW':    $conversation_id=$data['conversation_id'];
        break;

     }
 ////------
   switch( $how){
        case 'BY_CONVERSATION_ROW':
         $conversation_row=$data;
           $IS_repaire=TRUE;
        break;
     }
 ////------
     $Options_conversation=array( );
 ////------
     if(isset( $conversation_row)){
         // repaire= 1
// we have  to maintane last check time and history clear time
$REfArray=array();
 foreach( $conversation_row['members'] as $q=>$p){
     if(isset(  $conversation_row['last_check_time'][$q])){
     $REfArray[$p]=array('last_check_time'=> $conversation_row['last_check_time'][$q],'history_cleared_till'=> $conversation_row['history_cleared_till'][$q]);
     }else{
     $REfArray[$p]=array('last_check_time'=>time(),'history_cleared_till'=>time());
     }
       }


       $AllRecipient_EntityRow =   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'EntityRowByArray','entity_id_Array'=> $conversation_row['members']));
 $Options_conversation['members']=array();
 if(is_array($AllRecipient_EntityRow)){
         foreach($AllRecipient_EntityRow as $EntityRow){
   $Options_conversation['members'][]=$EntityRow['entity_id'];
       }
 if(count( $conversation_row['members'])!=count($Options_conversation['members'])){


     $IS_ConversationTable_update =TRUE;

    foreach($Options_conversation['members'] as $q=>$p){
           if(isset($REfArray[$p])){
 $Options_conversation['last_check_time'][$q]=  $REfArray[$p]['last_check_time'];
  $Options_conversation['history_cleared_till'][$q]=  $REfArray[$p]['history_cleared_till'];
           }else{
     $Options_conversation['last_check_time'][$q]= time();
  $Options_conversation['history_cleared_till'][$q]=   time();
           }
       }

$Options_conversation['members']='"'.implode('","',$Options_conversation['members']).'"';
$Options_conversation['last_check_time'] =      json_encode($Options_conversation['last_check_time']);
$Options_conversation['history_cleared_till'] = json_encode($Options_conversation['history_cleared_till']);
 }

 }


     }



     if($IS_ConversationTable_update){
             $GLOBALS['Var_DBMysqli']->update(DB_NAME,'conversation',array_keys($Options_conversation),array_values($Options_conversation),array('conversation_id'),array($conversation_id));
     }



 }

 //----------------UTILITY--------------------
 /**
* @description=> get the LastchatcheckTime
* @param  =>
* @return =>
* @call => $GLOBALS['Var_Conversation']-> LastchatcheckTime($Fields)
*/
public function LastchatcheckTime($Fields){
    $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
 $entity_id=  $ActorEntityData['EntityData']['entity_id'];

      $Index=$this->IndexOfMember($Fields, $entity_id);
    $last_check_time=$Fields['last_check_time'];
    $ret=time()-8000;
  if(isset($last_check_time[$Index])){
   $ret= $last_check_time[$Index];

   }

   return $ret;
}

/**
* @description=> update Last chat check time
* @param  =>
* @return =>
*/
public function UpdateLastchatcheckTime($Fields){
        $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
 $entity_id=  $ActorEntityData['EntityData']['entity_id'];

      $Index=$this->IndexOfMember($Fields, $entity_id);
    $last_check_time=$Fields['last_check_time'];
 // check_response('$Index '.$Index);
   if(isset($last_check_time[$Index])){
   $last_check_time[$Index]=time();
    $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'conversation',array('last_check_time','lastactivity_time'),array(Makejson($last_check_time),time()),array('conversation_id'),array($Fields['conversation_id']));
   }

}
/**
* @description=> $GLOBALS['Var_Conversation']  clear history
* @param  =>
* @return =>
*/
public function ClearHistory($Fields){
        $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
 $entity_id=  $ActorEntityData['EntityData']['entity_id'];
 $ret=FALSE;
      $Index=$this->IndexOfMember($Fields, $entity_id);
    $history_cleared_till=$Fields['history_cleared_till'];

   if(isset($history_cleared_till[$Index])){
   $history_cleared_till[$Index]=time();
    $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'conversation',array('history_cleared_till'),array(Makejson($history_cleared_till)),array('conversation_id'),array($Fields['conversation_id']));
        $ret=TRUE;
   }


   return $ret;
}

/**
* @description=> clear history
* @param  =>
* @return =>
*/
public function GetHistoryStartTime($Fields){
        $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
 $entity_id=  $ActorEntityData['EntityData']['entity_id'];

      $Index=$this->IndexOfMember($Fields, $entity_id);
    $history_cleared_till=$Fields['history_cleared_till'];
     $ret=time();
   if(isset($history_cleared_till[$Index])){
  $ret=  $history_cleared_till[$Index];
               }

   return  $ret;
}
  /**
 *
 * @param
 *
 * @return array()
 */
 public function HasAllowConversation($ActorEntityData,$AllRecipient_EntityRow=array()){
     $Allowed_EntityRow=array();

    foreach($AllRecipient_EntityRow   as $Row) {

     $EntityInformation= new DirectEntityRelation($Row,$ActorEntityData['EntityData']);

        if($EntityInformation->IsAllowConversation()){
                 $Allowed_EntityRow[] =$Row;
        }
        if($Row['entity_id']==$ActorEntityData['EntityData']['entity_id']){
            //we need to include the sender
                 $Allowed_EntityRow[] =$Row;
        }

    }

    return $Allowed_EntityRow;
 }

   /**
 *
 * @param
 *          $GLOBALS['Var_Conversation']->IsMemberInConversation($Fields);
 * @return array()
 */
  public function IsMemberInConversation($Fields){
    $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
 $entity_id=  $ActorEntityData['EntityData']['entity_id'];
 $is=FALSE;
 $Member=$Fields['members'];
    foreach ($Member as $q =>$v){
       if($entity_id==$v){
           $is=TRUE;
       }
   }
 return $is;
  }
    /**
 *
 * @param
 *          $GLOBALS['Var_Conversation']->IndexOfMember($Fields);
 * @return array()
 */
 public function IndexOfMember($Fields,$entity_id){

 $Index=0;

    $Member=(is_array($Fields['members']))?$Fields['members']:Walk_Ways_each(explode(',',$Fields['members']),'numericID');;

  //check_response( $Member);
    foreach ($Member as $q =>$v){
 // check_response('$entity_id==$v '.($entity_id==$v).' '.$entity_id.'=='.$v);
       if(intval($entity_id)===intval($v)){
         $Index=$q;
         break;
       }
   }
 return $Index;

 }
    /**
 *
 * @param
 *          $GLOBALS['Var_Conversation']->GetMemberInConversation($Fields);
 * @return array()
 */
 public function GetMemberInConversation($Fields){

    $Member=(is_array($Fields['members']))?$Fields['members']:Walk_Ways_each(explode(',',$Fields['members']),'numericID');
/*
    // we first check that is it checkin conversation ??
 $checkin_Id=(isset($Fields['checkIn_id']))?$Fields['checkIn_id']:0;
 if( $checkin_Id!=0){

    $Member= $GLOBALS['Var_ViewParse']->GetCheckInMember($Fields);

 }*/
 $Member= create_int_array( $Member);

 return   $Member;
 }

 /**
 * @des
 * @param
 * @return
 */
 public function CountUnreadMessageInConversation(){

 }
 //---

  /**
 *
 * @param
 *
 * @return array()
 */
 public function RetriveConvarstionList($args=array()){

 $WHERE=' a.members LIKE \'%"'.$args['entity_id'].'"%\'
 AND  a.conversation_id  NOT IN ( SELECT b.conversation_id FROM  '.DB_NAME.'.conversation b
                                 WHERE   b.is_delete LIKE \'%"'.$args['entity_id'].'"%\'
                                 )
AND 	conversation_type=0
 ';


 $FROM=''.DB_NAME.'.conversation a   ';




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

   foreach( $result as $q=>$p){
   $result[$q] =$this->ParseConversationRowToNormal($result[$q]);

   }


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
 *
 * @param
 *
 * @return array()
 */
 public function RetriveConvarstionMessage($args=array()){
   $Table='conversation_messages_'.$args['conversation_row']['table_code'];
   //--

   $Index=$this->IndexOfMember($args['conversation_row'], $args['entity_id']);
   $history_cleared_till=$args['conversation_row']['history_cleared_till'];

$history_cleared_time=(isset($history_cleared_till[$Index]))?$history_cleared_till[$Index]:time();

        if($args['mode']==1){

    $retrive_mode='a.time_node >= '.$args['point_time'];
   }else{
      $retrive_mode='a.time_node >= '.$history_cleared_time;
   }
 //check_response($retrive_mode);
 $WHERE=' a.conversation_id='.$args['conversation_id'].'
 AND  a.messages_id NOT IN (SELECT b.messages_id FROM '.DB_NAME_CONVERSATION.'.'.$Table.' b
                      WHERE b.conversation_id='.$args['conversation_id'].'
                       AND b.receversDelete_id  LIKE  \'%"'.$args['entity_id'].'"%\'
                       )
 ';


 $FROM=''.DB_NAME_CONVERSATION.'.'.$Table.' a   ';



    $numsql='SELECT COUNT(*) FROM '.$FROM.'
 WHERE '.$WHERE.'
 AND '.$retrive_mode.'
';

     //-- retrive_mode



$selectsql='SELECT * FROM '.$FROM.'
 WHERE '.$WHERE.'
 AND '.$retrive_mode.'
 ORDER BY a.time_node DESC
                       ' ;


 $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);
//linit sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';

  if($args['mode']==0){
 $selectsql.=$limit;
  }
 //check_response( $total_result);
//check_response($paging_data);
//check_response($selectsql);
//check_response($numsql);

   $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;
  $this->UpdateLastchatcheckTime($args['conversation_row']);

 return PagingOutPut(array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>array_reverse($result),
          'totalpage'=>$paging_data['total_page'],
          'totalresult'=>$total_result,
          'searchstr'=>$args['search_str'],
          'selectedid'=>$args['selected_id']

             ));
  }

  /**
 *
 * @param
* @call     $GLOBALS['Var_Conversation']=>  RetriveLastMessageOfConversation($ConversationRowsArray,$entity_id)
 * @return array()
 */
 public function  RetriveLastMessageOfConversation($ConversationRowsArray,$entity_id){
     $total_sql=array();  $result=array();
     if(count($ConversationRowsArray)>0){
 for($i=0;$i<count($ConversationRowsArray);$i++){
   $Table='conversation_messages_'.$ConversationRowsArray[$i]['table_code'];
   $conversation_id=$ConversationRowsArray[$i]['conversation_id'];




 $total_sql[]='(SELECT * FROM  '.DB_NAME_CONVERSATION.'.'.$Table.'
 WHERE  conversation_id='.$conversation_id.'
 AND  messages_id NOT IN (SELECT messages_id FROM '.DB_NAME_CONVERSATION.'.'.$Table.'
                      WHERE conversation_id='.$conversation_id.'
                       AND receversDelete_id  LIKE  \'%"'.$entity_id.'"%\'
                       )
 ORDER BY time_node DESC
LIMIT 1
  )';



 }


 $MainSql= implode(' UNION ALL ',$total_sql);



  $result=$GLOBALS['Var_DBMysqli']->query( $MainSql);;
  }
  return  $result;
 }

 public function RetriveCoverstionListUpdate($args=array()){
   $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
   $Coverstion_ids= Walk_Ways_each($args['Coverstion_ids'],'numericID');

         $ConversationRows=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'ConverssationRowByArray','conversation_id_Array'=> $Coverstion_ids,'entity_id'=> $ActorEntityData['EntityData']['entity_id']));

$result= $GLOBALS['Var_Conversation']->RetriveLastMessageOfConversation(   $ConversationRows,$ActorEntityData['EntityData']['entity_id']);

$response=array();
      for($k=0; $k<count($result);$k++){

          if(isset(  $ConversationRows[$k])){

$parseMessage= $GLOBALS['Var_Conversation']->ParseConversationMessage(array($result[$k]),array('ActorEntityData'=>$ActorEntityData,'entity_id'=>$ActorEntityData['EntityData']['entity_id'],'conversation_row'=>  $ConversationRows[$k]));

$response[$k]=array('cid'=>$ConversationRows[$k]['conversation_id'],
                   'm'=>$parseMessage
                  );
           }
      }

return $response;
 }




 //----------------------
 /**
 *
 * @param
 *
 * @return array()
 */
 public function ParseConversation($Fields,$args=array()){
      $ret=array();
     $ActorEntityData=$args['ActorEntityData'];
 $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);

    $ret=$GLOBALS['Var_BundlePrototype']->DefaultValue('Conversation');
      $ret['id']=$Fields['conversation_id'];
     $ret['LChT']=$Fields['last_check_time'];
     for($i=0;$i<count($args['All_EntityRow']);$i++){
  $ret['Ed'][]=$GLOBALS['Var_ViewParse']->EntityStripdata($args['All_EntityRow'][$i]);


            }
      $ret['Edindex']=$this->IndexOfMember($Fields, $ActorEntityData['EntityData']['entity_id']);;


   $ret['iuc']=$Fields['Instant_Updater_code'];
   $ret['iu_hash']=$Fields['Instant_Updater_hash'];


   return $ret;
 }
  /**
 * @des use when all member entity row is not known
 * @param
 *
 * @return array()
 */
 public function ParseConversation2($Fields,$args=array()){
      $ret=array();
     $ActorEntityData=$args['ActorEntityData'];
 $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);

 $LastMessage= $this->RetriveLastMessageOfConversation($Fields,$ActorEntityData['EntityData']['entity_id']);


     for($i=0;$i<count($Fields);$i++){
   $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('Conversation');
       $ret[$i]['id']=$Fields[$i]['conversation_id'];
     $ret[$i]['LChT']=$Fields[$i]['last_check_time'];
     $members=$Fields[$i]['members'];

    for($j=0;$j<count($members);$j++){
   $EntityInformation= new EntityInformation($members[$j],$ActorEntityData['EntityData']['entity_id']);
    $EntityRow=$EntityInformation->frontuser_EntityRow;
  $ret[$i]['Ed'][]=$EntityInformation->EntityStripdata($EntityRow);

   }

     $Fields[$i]['members']= $members;
      $ret[$i]['Edindex']=$this->IndexOfMember($Fields[$i], $ActorEntityData['EntityData']['entity_id']);

      //----
      if($Fields[$i]['conversation_type']==1){



      }

      // last message of conversation
      if(isset( $LastMessage[$i])){
      $ret[$i]['lmi']= $GLOBALS['Var_Conversation']->ParseConversationMessage(array($LastMessage[$i]),array('ActorEntityData'=>$ActorEntityData,'entity_id'=>$ActorEntityData['EntityData']['entity_id'],'conversation_row'=> $Fields[$i],'facet'=>FALSE));
      }else{
         $ret[$i]['lmi']=array();
      }


    $ret[$i]['iuc']=$Fields[$i]['Instant_Updater_code'];
    $ret[$i]['iu_hash']=$Fields[$i]['Instant_Updater_hash'];

   }
   return $ret;
 }

 /**
 * @des Parse coversation for update
 * @param
 *
 * @return array()
 */
 public function ParseConversation3($Fields,$args=array()){
      $ret=array();
     $ActorEntityData=$args['ActorEntityData'];
 $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);

    $ret=$GLOBALS['Var_BundlePrototype']->DefaultValue('Conversation');
      $ret['id']=$Fields['conversation_id'];
     $ret['LChT']=$Fields['last_check_time'];

      $ret['Edindex']=$this->IndexOfMember($Fields, $ActorEntityData['EntityData']['entity_id']);;


    $ret['iuc']=$Fields['Instant_Updater_code'];
   $ret['iu_hash']=$Fields['Instant_Updater_hash'];


   return $ret;
 }
 /**
 * @des use when entity member row information not required and basic string fields value is required in array
 * @param
 *
 * @return array()
 */
 public function ParseConversationRowToNormal($Fields){
      $ret=array();

     $ret['conversation_id']=$Fields['conversation_id'];
    $ret['conversation_type']=$Fields['conversation_type'];
 $ret['table_code']=$Fields['table_code'];
 $ret['lastactivity_time']=$Fields['lastactivity_time'];
 if(!is_array($Fields['members'])){
       $ret['members']=Walk_Ways_each(explode('","',$Fields['members']),'numericID');
 }else{
      $ret['members']=$Fields['members'];
 }


if(!is_array($Fields['last_check_time'])){
       $ret['last_check_time']=JsonTrueDecode($Fields['last_check_time'],array());
 }else{
      $ret['last_check_time']=$Fields['last_check_time'];
 }


  if(!is_array($Fields['history_cleared_till'])){
       $ret['history_cleared_till']=JsonTrueDecode($Fields['history_cleared_till'],array());
 }else{
      $ret['history_cleared_till']=$Fields['history_cleared_till'];
 }


// repaire
 $ret['members']= create_int_array( $ret['members']);

 //repaire
 //check_response($ret);
 if(count( $ret['members'])!=count($ret['last_check_time'])){
       foreach($ret['members'] as $q=>$p){
           if(!isset($ret['last_check_time'][$q])){
$ret['last_check_time'][$q]=time();
           }
       }
 }

  if(count( $ret['members'])!=count($ret['history_cleared_till'])){
       foreach($ret['members'] as $q=>$p){
           if(!isset($ret['history_cleared_till'][$q])){
$ret['history_cleared_till'][$q]=time();
           }
       }
 }


 $ret['checkIn_id']=GetPropertyInArray('checkIn_id',$Fields,0,'');

  $ret['Instant_Updater_code']=GetPropertyInArray('Instant_Updater_code',$Fields,0,'');
  $ret['Instant_Updater_hash']=GetPropertyInArray('Instant_Updater_hash',$Fields,'','');

  if($ret['Instant_Updater_hash']==""){
     $ret['Instant_Updater_hash']=generate_random_string( 25,true ,true ,false, false, false );

   $GLOBALS['Var_DBMysqli']->update(DB_NAME,'conversation',array('Instant_Updater_hash'),array($ret['Instant_Updater_hash']),array('conversation_id'),array($ret['conversation_id']));

    $GLOBALS['Var_Instant_Updater']->Conversation($ret);
  }


   return $ret;
 }
   /**
 * @des use when all member entity row is not known
 * @param
 *
 * @return array()
 */
 public function ParseConversationMessage($Fields,$args=array()){
       $ret=array();$group_date = '';
 $entity_id= $args['ActorEntityData']['EntityData']['entity_id'];
 $CheckInCheckTime='';$ChatCheckTime='';
 $facet=(isset($args['facet']))?FALSE:TRUE;


   for($i=0,$j=0;$j<count($Fields);$j++){
  $row_type=0;
   $message_date=DateChatGrouping($Fields[$j]['time_gmt']);
            if( $group_date!=$message_date){
                $row_type=1;
                $group_date=$message_date;
            }
                //--row_type ==1 for date grouped message
    if($row_type==1&&$facet){

$ret[$i]['id']=$group_date;
      $ret[$i]['type']=3;
      $ret[$i]['message']=DateChatGrouping($Fields[$j]['time_gmt']);
$ret[$i]['cid']=$args['conversation_row']['conversation_id'];
      $ret[$i]['facet']=1;
      $ret[$i]['date']= $group_date;
        $i++;
    }


   $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('CheckInMessage');
$ret[$i]['id']=$Fields[$j]['messages_id'];
$ret[$i]['mid']=$Fields[$j]['messages_id'];
$ret[$i]['cid']=$args['conversation_row']['conversation_id'];
$ret[$i]['msg']=$Fields[$j]['message'];
$ret[$i]['date']=$Fields[$j]['time_gmt'];
$ret[$i]['dateday']=date_dayformat($Fields[$j]['time_gmt']);
$ret[$i]['tn']=$Fields[$j]['time_node'];
$ret[$i]['sid']=$Fields[$j]['sender_id'];
$ret[$i]['sidi']=$this->IndexOfMember($args['conversation_row'],$Fields[$j]['sender_id']);
$ret[$i]['type']=($Fields[$j]['sender_id']===$args['entity_id'])?0:1;
$ret[$i]['facet']=1;
// check attackment
if($Fields[$j]['attachments_id']!=NULL){
   $attachments_info=array();
   switch($Fields[$j]['attachments_type']){
case 0:
$attachments_info=$GLOBALS['Var_BundlePrototype']->DefaultValue('Product_basic');

break;
case 1:
$attachments_info=$GLOBALS['Var_BundlePrototype']->DefaultValue('Product_basic');
break;
case 2:
$attachments_info=$GLOBALS['Var_BundlePrototype']->DefaultValue('Product_basic');
break;
case 3:
$attachments_info=$GLOBALS['Var_BundlePrototype']->DefaultValue('Product_basic');
break;

   }


$ret[$i]['attmt']= array('has'=>1,
                        'type'=>$Fields[$j]['attachments_type'],
                        'id'=>$Fields[$j]['attachments_id'],
                        'info'=> $attachments_info
                      );
}




    if($args['conversation_row']['conversation_type']==0){
      $ChatCheckTime=$Fields[$j]['time_node'];
    }
     if($args['conversation_row']['conversation_type']==1){
     $CheckInCheckTime=$Fields[$j]['time_node'];
    }
        $i++;

          }


   if($ChatCheckTime!=''){

     $GLOBALS['Var_ProfileOutput'] ->UpdateChatCheckTime(time());
    }
     if( $CheckInCheckTime!=''){
   $GLOBALS['Var_ProfileOutput'] ->UpdateCheckInCheckTime(time());

    }




     return $ret;
 }



}



$GLOBALS['Var_Conversation'] =new Conversation();







?>
