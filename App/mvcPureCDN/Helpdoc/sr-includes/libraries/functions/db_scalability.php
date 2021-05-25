<?php
    
/**
* @description=>
* @searial => 
* @param  => 
* @return => 
*/
function ConversationMessagesTable($conversation_id){
    $conversation_id=intval($conversation_id);
    $TOTAL_TABLE=3;
    $TableCode= remainder($conversation_id, $TOTAL_TABLE);
    //check 
  
    if( $TableCode> $TOTAL_TABLE){  $TableCode=$TOTAL_TABLE;  }
 //   if( $TableCode< 0){  $TableCode=0;  }

    return 'conversation_messages_'.$TableCode;
}
/**
* @description=>
* @searial => 
* @param  => 
* @return => 
*/
function ConversationMessagesTableCode(){

    $TOTAL_TABLE=3;
    $TableCode= 0;
    //check 
  
   // if( $TableCode> $TOTAL_TABLE){  $TableCode=$TOTAL_TABLE;  }
 //   if( $TableCode< 0){  $TableCode=0;  }

    return $TableCode;
}













?>