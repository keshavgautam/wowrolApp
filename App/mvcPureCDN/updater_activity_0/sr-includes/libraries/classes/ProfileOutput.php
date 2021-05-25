<?php
    


class ProfileOutput{
   
    
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


    break;    
  case 'new_checkin_msg':
  

    break; 
  case 'new_chat_msg':
 
    break; 
  case 'orderalert':

    break; 

  case 'new_friend_request':

    break; 

    
    }

    return $count;
}

}


$GLOBALS['Var_ProfileOutput'] =new ProfileOutput();

?>