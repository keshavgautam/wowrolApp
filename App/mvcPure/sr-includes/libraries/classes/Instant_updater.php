<?php
    
/**
* @description=>
* @param  => 
* @return => 
*/
class Instant_Updater {

/**
* @call =>   $GLOBALS['Var_Instant_Updater']->Get_Instant_Updater_code();
* @description=>
* @param  => 
* @return => 
*/
public function Get_Instant_Updater_code(){
    return 0;
}

//---------chat Updater--------    
/**
* @call =>   $GLOBALS['Var_Instant_Updater']->UpdaterClientData();
* @description=>
* @param  => 
* @return => 
*/
public function UpdaterServerURL(){


   return $GLOBALS['Var_UpdaterServerURL'];
}



/**
* @call =>   $GLOBALS['Var_Instant_Updater']->UpdateServerDB_Data();
* @description=>
* @param  => 
* @return => 
*/
public function UpdateServerDB_Data($code){

    if(SERVER_MODE=="DEVELOPMENT"){
           $Data=array(
 array('DB_HOST'=>'localhost','DB_USER'=>'root','DB_PASSWORD'=>'','DB_NAME'=>'wowrol_update_0'),
  array('DB_HOST'=>'localhost','DB_USER'=>'root','DB_PASSWORD'=>'','DB_NAME'=>'wowrol_update_0'),
  array('DB_HOST'=>'localhost','DB_USER'=>'root','DB_PASSWORD'=>'','DB_NAME'=>'wowrol_update_0'),
  array('DB_HOST'=>'localhost','DB_USER'=>'root','DB_PASSWORD'=>'','DB_NAME'=>'wowrol_update_0')

   ); 
    }else{//production
      $Data=array(
 array('DB_HOST'=>'localhost','DB_USER'=>'LLiMmm5dgkZ4vZ','DB_PASSWORD'=>'yxs6Dga.TzVl','DB_NAME'=>'wowrol_update_0'),
  array('DB_HOST'=>'localhost','DB_USER'=>'LLiMmm5dgkZ4vZ','DB_PASSWORD'=>'yxs6Dga.TzVl','DB_NAME'=>'wowrol_update_0'),
  array('DB_HOST'=>'localhost','DB_USER'=>'LLiMmm5dgkZ4vZ','DB_PASSWORD'=>'yxs6Dga.TzVl','DB_NAME'=>'wowrol_update_0'),
  array('DB_HOST'=>'localhost','DB_USER'=>'LLiMmm5dgkZ4vZ','DB_PASSWORD'=>'yxs6Dga.TzVl','DB_NAME'=>'wowrol_update_0')

   ); 
   
        
    }
  


   return isset($Data[$code])?$Data[$code]:$Data[0];
}
/**
* @call =>   $GLOBALS['Var_Instant_Updater']->ConversationTextMessage();
* @description=>
* @param  => 
* @return => 
*/
public function ConversationTextMessage($args){
 $DB_Data= $this->UpdateServerDB_Data($args['conversation_row']['Instant_Updater_code']);

  $DB= new DBMysqli_im( $DB_Data['DB_HOST'],$DB_Data['DB_USER'],$DB_Data['DB_PASSWORD'],$DB_Data['DB_NAME']);  


   $DB->insert($DB_Data['DB_NAME'],'conversation_messages',
   array('messages_id','message','recevers_id','conversation_id','sender_id','time_gmt','time_node'),
   array($args['message_row']['messages_id'],$args['message_row']['message'],$args['message_row']['recevers_id'],$args['message_row']['conversation_id'],$args['message_row']['sender_id'],$args['message_row']['time_gmt'],$args['message_row']['time_node'])
   );


}

/**
* @call =>   $GLOBALS['Var_Instant_Updater']->Conversation();
* @description=>
* @param  => 
* @return => 
*/
public function Conversation($args){
     $DB_Data= $this->UpdateServerDB_Data($args['Instant_Updater_code']);

  $DB= new DBMysqli_im( $DB_Data['DB_HOST'],$DB_Data['DB_USER'],$DB_Data['DB_PASSWORD'],$DB_Data['DB_NAME']);  
  $row= $DB->getrow($DB_Data['DB_NAME'],'update_measure',array('object_id','object_Type'),array($args['conversation_id'],0));
   if($row==NULL){
         $DB->insert($DB_Data['DB_NAME'],'update_measure',array('object_id' ,'object_Type','event_details','time_node' ,'password','clone_object'),array($args['conversation_id'],0,'',time(),$args['Instant_Updater_hash'],Makejson($args))); 
   }else{
         $DB->update($DB_Data['DB_NAME'],'update_measure',array('password','clone_object'),array($args['Instant_Updater_hash'],Makejson($args)),array('object_id','object_Type'),array($args['conversation_id'],0)); 
   }

}
/**
* @call =>   $GLOBALS['Var_Instant_Updater']->Checkin();
* @description=>
* @param  => 
* @return => 
*/
public function Checkin($args){
         $DB_Data= $this->UpdateServerDB_Data($args['Instant_Updater_code']);

  $DB= new DBMysqli_im( $DB_Data['DB_HOST'],$DB_Data['DB_USER'],$DB_Data['DB_PASSWORD'],$DB_Data['DB_NAME']);  
  $row= $DB->getrow($DB_Data['DB_NAME'],'update_measure',array('object_id','object_Type'),array($args['checkIn_id'],1));
   if($row==NULL){
         $DB->insert($DB_Data['DB_NAME'],'update_measure',array('object_id' ,'object_Type','event_details','time_node' ,'password','clone_object'),array($args['checkIn_id'],1,'',time(),$args['Instant_Updater_hash'],Makejson($args))); 
   }else{
         $DB->update($DB_Data['DB_NAME'],'update_measure',array('password','clone_object'),array($args['Instant_Updater_hash'],Makejson($args)),array('object_id','object_Type'),array($args['checkIn_id'],1));
         
         
         } 



}
/**
* @call =>   $GLOBALS['Var_Instant_Updater']->CheckinTextMessage();
* @description=>
* @param  => 
* @return => 
*/
public function CheckinTextMessage($args){
 //   check_response($args);
 $DB_Data= $this->UpdateServerDB_Data($args['conversation_row']['Instant_Updater_code']);

  $DB= new DBMysqli_im( $DB_Data['DB_HOST'],$DB_Data['DB_USER'],$DB_Data['DB_PASSWORD'],$DB_Data['DB_NAME']);  


   $DB->insert($DB_Data['DB_NAME'],'conversation_messages',
   array('messages_id','message','recevers_id','conversation_id','sender_id','attachments_id','attachments_type','time_gmt','time_node'),
   array($args['message_row']['messages_id'],$args['message_row']['message'],$args['message_row']['recevers_id'],$args['message_row']['conversation_id'],$args['message_row']['sender_id'],$args['message_row']['attachments_id'],$args['message_row']['attachments_type'],$args['message_row']['time_gmt'],$args['message_row']['time_node'])
   );
  //----------
  $GLOBALS['Var_Instant_Updater']->Checkin($args['conversation_row']);
 
}
//---------chat Updater--------
//---------Activity Updater--------
/**
* @call =>   
* @description=>
* @param  => 
* @return => 
*/
public function ActivityUpdaterServerURL(){
    
       $Data=array(
   'http://localhost:1236/updater_activity_0/',
   'http://localhost:1236/updater_activity_0/',
   'http://localhost:1236/updater_activity_0/',
   'http://localhost:1236/updater_activity_0/'

   ); 


   return $Data;


}
/**
* @call =>   $GLOBALS['Var_Instant_Updater']->UpdateServerDB_Data();
* @description=>
* @param  => 
* @return => 
*/
public function ActivityUpdateServerDB_Data($code){

    if(SERVER_MODE=="DEVELOPMENT"){
           $Data=array(
 array('DB_HOST'=>'localhost','DB_USER'=>'root','DB_PASSWORD'=>'','DB_NAME'=>'wowrol_update_0'),
  array('DB_HOST'=>'localhost','DB_USER'=>'root','DB_PASSWORD'=>'','DB_NAME'=>'wowrol_update_0'),
  array('DB_HOST'=>'localhost','DB_USER'=>'root','DB_PASSWORD'=>'','DB_NAME'=>'wowrol_update_0'),
  array('DB_HOST'=>'localhost','DB_USER'=>'root','DB_PASSWORD'=>'','DB_NAME'=>'wowrol_update_0')

   ); 
    }else{//production
      $Data=array(
 array('DB_HOST'=>'localhost','DB_USER'=>'LLiMmm5dgkZ4vZ','DB_PASSWORD'=>'yxs6Dga.TzVl','DB_NAME'=>'wowrol_update_0'),
  array('DB_HOST'=>'localhost','DB_USER'=>'LLiMmm5dgkZ4vZ','DB_PASSWORD'=>'yxs6Dga.TzVl','DB_NAME'=>'wowrol_update_0'),
  array('DB_HOST'=>'localhost','DB_USER'=>'LLiMmm5dgkZ4vZ','DB_PASSWORD'=>'yxs6Dga.TzVl','DB_NAME'=>'wowrol_update_0'),
  array('DB_HOST'=>'localhost','DB_USER'=>'LLiMmm5dgkZ4vZ','DB_PASSWORD'=>'yxs6Dga.TzVl','DB_NAME'=>'wowrol_update_0')

   ); 
   
        
    }
  


   return isset($Data[$code])?$Data[$code]:$Data[0];
}

//---------Activity Updater--------

}


$GLOBALS['Var_Instant_Updater']=new Instant_Updater();

?>