<?php
    


class Conversation{
   
/*
@description 
@call $GLOBALS['Var_Conversation']->SaveUpdate();
*/
public function SaveUpdate($args=array()){

 
    $row=$GLOBALS['Var_DBMysqli']->update(DB_NAME_UPDATE_0,'update_measure',array('event_details','time_node'),array(Makejson($args['event_details']),time()),array('object_id','object_Type'),array($args['object_id'],$args['object_Type']));


}   
/*
@description 
@call $GLOBALS['Var_Conversation']->SaveUpdate();
*/
public function ProcessUpdate($args=array()){

  $row=$args['update_row'];

   $row['event_details'] = JsonTrueDecode($row['event_details'],array());
   $row['event_details'] = True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('conversationEvent'),$row['event_details']) ;
    
 for($i=0;$i<count($args['event']);$i++){
        $event_type=   GetPropertyInArray('type',$args['event'][$i],'',''); 
        
      switch( $event_type){
       

     case 'sentmessage':
   $row['event_details']['typing']=$GLOBALS['Var_Utility']->getTypingIds($row['event_details']['typingData']);
   //  check_response('sentmessage  = in  convarstion_id ' .$args['convarstion_id']);

       $this->SaveUpdate(array('event_details'=>$row['event_details'],
                               'object_id'=>$args['convarstion_id'],
                               'object_Type'=>0
                               
                               ));

$GLOBALS['Var_Comet']->Update($args['convarstion_id'],0, $args['time_node']);
       break; 

       default:
       
        //  check_response('typing  = in  convarstion_id ' .$args['convarstion_id']);
         $eid=   GetPropertyInArray('eid',$args['event'][$i],'','numericID'); 
       $row['event_details']['typingData']=$GLOBALS['Var_Utility']->getTypingData($row['event_details']['typingData'],$eid);
       $row['event_details']['typing']=$GLOBALS['Var_Utility']->getTypingIds($row['event_details']['typingData']);
    

       $this->SaveUpdate(array('event_details'=>$row['event_details'],
                               'object_id'=>$args['convarstion_id'],
                               'object_Type'=>0
                               
                               ));
$GLOBALS['Var_Comet']->Update($args['convarstion_id'],0, $args['time_node']);
    
           }
        
         
     }



 
}       
/*
@description 
@call $GLOBALS['Var_Conversation']->GetUpdate();
*/
public function GetUpdate($args=array()){
    $ret=$GLOBALS['Var_BundlePrototype']->DefaultValue('conversationupdate');
  $row=$args['update_row'];
   $IsActive=FALSE;
      if(isset($args['IsActiveConversation'])){
          if($args['IsActiveConversation']){
        $IsActive=TRUE;
          }
   }
  //--
 //check_response('JSON decode');  check_response(json_decode($row['clone_object'],TRUE));
  //    check_response('clone_object');  check_response($row['clone_object']);
  $row['clone_object']=JsonTrueDecode($row['clone_object'],array());
  $args['conversation_row']= True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('Conversation_row'),  $row['clone_object']) ; 
 //   check_response( 'conversation_row');     check_response( $args['conversation_row']);
   // check_response( $args['conversation_row']);
  //---
   $row['event_details'] = JsonTrueDecode($row['event_details'],array());
   $row['event_details'] = True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('conversationEvent'),$row['event_details']) ; 
   
      $ret['typing']=$row['event_details']['typingData'];
   /// update last check time
   if( $IsActive){
     
      $this->UpdateLastchatcheckTime($args['conversation_row'], $args['entity_id']);   
   }




    
   $Retrive=PagingOutPut(array());

   if($args['IsLoadMessage']){
       
  
     $Retrive=$GLOBALS['Var_Conversation']->RetriveConvarstionMessage(array('pagesize'=>10,'paged'=>10,'point_time'=>$args['time_node'],'mode'=>1,'selected_id'=>'','search_str'=>'','conversation_id'=>$args['conversation_row']['conversation_id'],'conversation_row'=>$args['conversation_row'],'entity_id'=>$args['entity_id'])); 

      
 $Retrive['result']= $GLOBALS['Var_Conversation']->ParseConversationMessage($Retrive['result'],array('conversation_row'=>$args['conversation_row'],'entity_id'=>$args['entity_id'],'point_time'=>$args['time_node']));
  }
$ConversationData= $this->ParseConversation3( $args['conversation_row'],array('entity_id'=>$args['entity_id'],'IsActive'=>$IsActive,'point_time'=>$args['time_node']));
// search HOW WE UPFATE SBDATA
 $SBdata= $this->GetSBdata($args['conversation_row']);
   $ret['messages']= array($Retrive['result'],$ConversationData, $SBdata, $args['time_node'],time());

     $ret['sleep']= array();


   //--------
    $GLOBALS['Var_Conversation']->FlushConversationmessage();
      /* $this->SaveUpdate(array('event_details'=>$row['event_details'],
                               'object_id'=>$args['convarstion_id'],
                               'object_Type'=>0
                               
                               ));*/
 return $ret;
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
       if($entity_id==$v){
         $Index=$q;
         break;
       }
   }
 //check_response( $Index .'  $entity_id =>'.$entity_id);
 return $Index;

 }



 /**
* @description=> update Last chat check time
* @param  =>
* @return => 
*/
public function UpdateLastchatcheckTime($Fields,$entity_id){
 


      $Index=$this->IndexOfMember($Fields, $entity_id); 

    $last_check_time=(is_array($Fields['last_check_time']))?$Fields['last_check_time']:Walk_Ways_each(explode(',',$Fields['last_check_time']),'numericID');

     if(is_array($last_check_time)){
      

 //check_response('$Index '.$Index);
   if(isset($last_check_time[$Index])){
   $last_check_time[$Index]=time();
    $Fields['last_check_time']=Makejson($last_check_time);
    $Fields['lastactivity_time']=time();


 $GLOBALS['Var_DBMysqli']->update(DB_NAME_UPDATE_0,'update_measure',array('clone_object'),array(Makejson($Fields)),array('object_id','object_Type'),array($Fields['conversation_id'],0));


   }
  /*  */
     
     }else{
        
          $Member=(is_array($Fields['members']))?$Fields['members']:Walk_Ways_each(explode(',',$Fields['members']),'numericID');;

         $Fields['last_check_time']=array_fill(0, count($Member), time());

          $GLOBALS['Var_DBMysqli']->update(DB_NAME_UPDATE_0,'update_measure',array('clone_object'),array(Makejson($Fields)),array('object_id','object_Type'),array($Fields['conversation_id'],0));
          
     }
}



/*

@call  $this->GetSBdata($Fields);
*/
public function GetSBdata($Fields){
    $SBdata=array();
    $checkin_id=(isset($Fields['checkIn_id']))?$Fields['checkIn_id']:0;;
  
    if( $checkin_id>0){
      $update_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME_UPDATE_0,'update_measure',array('object_id','object_Type'),array($checkin_id,1));   
      
 
        if($update_row!=NULL){
             $checkin_row=json_decode($update_row['clone_object'],TRUE);

       if($checkin_row!=NULL){
      $SBdata= $this->ParseCheckInData($checkin_row);
     
        }else{
                check_response('clone_object is null for  $checkin_id ' . $Fields['checkIn_id'] ); 
                  
        }
        }else{
                check_response('checkin data null for  $convarstion_id ' . $convarstion_id );  
        }


    }


    
    return $SBdata;
}
 /**
 * @des 
 * @call  $this-> CountUnreadMessageInConversation($Conversation);
 * @param 
 * @return 
 */
 public function CountUnreadMessageInConversation($conversation_id,$lastCheck_Time,$entity_id){
    
  

     $numsql='SELECT COUNT(a.messages_id) as messages_id 
FROM '.DB_NAME_UPDATE_0.'.conversation_messages a
 WHERE a.conversation_id='.$conversation_id.'
  AND a.sender_id  <> '.$entity_id.'
 AND a.time_node > '.$lastCheck_Time .' ';

 return $GLOBALS['Var_DBMysqli']->numquery($numsql);
 }
 /**
 * 
 * @param 
 *             
 * @return array()
 */
 public function RetriveConvarstionMessage($args=array()){
  
   //--
   $args['point_time'] =($args['point_time']=='')?time():$args['point_time'];
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
 AND  a.messages_id NOT IN (SELECT b.messages_id FROM '.DB_NAME_UPDATE_0.'.conversation_messages b
                      WHERE b.conversation_id='.$args['conversation_id'].'
                       AND b.receversDelete_id  LIKE  \'%"'.$args['entity_id'].'"%\' 
                       )
 ';


 $FROM=''.DB_NAME_UPDATE_0.'.conversation_messages a   ';



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
 * @des Parse coversation for update
 * @param 
 *             
 * @return array()
 */
 public function ParseConversation3($Fields,$args=array()){
      $ret=array();
     $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
 $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
   // check_response('ParseConversation3');  check_response( $Fields);
    $ret=$GLOBALS['Var_BundlePrototype']->DefaultValue('Conversation');   

    if(count($Fields)==0){
          //  check_response('count 0');  check_response( $args);
           
     return $ret;
    }

      if($Fields['conversation_id']==0){
                    return $ret;
             }


     $IsActive=0;
      if(isset($args['IsActive'])){
          if($args['IsActive']){
        $IsActive=1;
          }
   }



      $ret['id']=$Fields['conversation_id'];
      if(is_array($Fields['last_check_time'])){
           $ret['LChT']=$Fields['last_check_time'];
      }else{
          $ret['LChT']=JsonTrueDecode($Fields['last_check_time'],array()); 
      }
    
  
      $ret['Edindex']=$this->IndexOfMember($Fields,$args['entity_id']);
      //for unread count 
    $lastCheck_Time= $args['point_time'];//time()-10;   
    if($IsActive==0){ $lastCheck_Time= $ret['LChT'][$ret['Edindex']];}
      //  $lastCheck_Time= $ret['LChT'][$ret['Edindex']];   
 //  check_response(  ($IsActive) .'   '.(time()-$lastCheck_Time));
   // $lastCheck_Time= time()-10;   
    $ret['ucount']=  $this-> CountUnreadMessageInConversation($Fields['conversation_id'],$lastCheck_Time,$args['entity_id']);
  



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
 public function ParseConversationMessage($Fields,$args=array()){
       $ret=array();$group_date = '';
 $CheckInCheckTime='';$ChatCheckTime='';
   for($i=0,$j=0;$j<count($Fields);$j++){
  $row_type=0; 
   $message_date=DateChatGrouping($Fields[$j]['time_gmt']);
            if( $group_date!=$message_date){
                $row_type=1;
                $group_date=$message_date;
            }
                //--row_type ==1 for date grouped message
    if($row_type==1){
       
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
    
   
    }
     if( $CheckInCheckTime!=''){
  

    }

       


     return $ret; 
 }



 /**
* @description=>parse  the retrive checins table row to browsing data
* @param  => 
* @return => 
*/

public function ParseCheckInData($Fields,$args=array()){
     $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
    $parseData=$GLOBALS['Var_BundlePrototype']->DefaultValue('storebrowsingData');

  

    



   //-->>
    //    check_response($mainUserLocationId);  
  //check_response($CheckDelivery); check_response($members[0]);
  //-->>suggestedProducts_id
  $cartVarient_id=array();
$cartVarient_idRaw=$Fields['cartVarient_id'];
if($cartVarient_idRaw!=NULL){
$parseData['cvD']=explode(",", $cartVarient_idRaw);  
$parseData['cvPD']=JsonTrueDecode($Fields['cartVarient_data'],$parseData['cvD']);  
}
//-->>

  //-->>shortlistedProducts_id
  $shortlistedProducts_id=array();
$shortlistedProducts_idRaw=$Fields['shortlistedProducts_id'];
  if($shortlistedProducts_idRaw!=NULL){
$parseData['slPD']=explode(",", $shortlistedProducts_idRaw);  
}
//-->>
  //-->>suggestedProducts_id
  $suggestedProducts_id=array();
$suggestedProducts_idRaw=$Fields['suggestedProducts_id'];
  if($suggestedProducts_idRaw!=NULL){
$parseData['suPD']=explode(",", $suggestedProducts_idRaw);  
}
//-->>
// filling pbank with product info
$cartProdcutid=array();
foreach($parseData['cvPD'] as $value ){
    $cartProdcutid[]=$value[1];
}

$Pbank =True_array_merge($cartProdcutid,$parseData['slPD'],$parseData['suPD']);
$parseData['Pbank']=[];




    return  $parseData;


}

/*
@call  $GLOBALS['Var_Conversation']->FlushConversationmessage();
*/
public function FlushConversationmessage($args=array()){
      $conn=$GLOBALS['Var_DBMysqli']->conn();


 $sql='DELETE FROM '.DB_NAME_UPDATE_0.'.conversation_messages 
  WHERE time_node < '.(time()-(60*30)).' ';

 // $query = mysqli_query($conn,$sql);
 
 

}


}


$GLOBALS['Var_Conversation'] =new Conversation();








/*
@HELP HOW WE UPFATE SBDATA
 
we check converasation for checkin id if it is found their than
we search for checkin row and send it; 

*/

?>