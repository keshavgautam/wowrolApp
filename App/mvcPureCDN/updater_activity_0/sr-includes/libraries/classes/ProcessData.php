<?php
    

/**
* @description=>process the given data .
* @param  => 
* @return => 
*/

class ProcessData{
    



/**
* @description=> pre process the conversation list
* @param  => 
* @return => 
*/

public function PreProcessForComet($args=array()){
  $currentModif=time();
  $RawData= $args['Rawdata'];


   for($i=0;$i<count($RawData);$i++){
         $channalName= GetPropertyInArray('name',$RawData[$i],'','alphanumeric');
 switch($channalName){
    default :
   $entity_id= GetPropertyInArray('eid',$RawData[$i]['init'],0,'numericID');
   $time_node= GetPropertyInArray('tn',$RawData[$i]['init'],time(),'numericID');
   $wait= GetPropertyInArray('wait',$RawData[$i]['init'],60,'numericID');
 }
   }

$currentModif= $GLOBALS['Var_Comet']->BulkSleep(array($entity_id),0,array($time_node),$wait);


  return $currentModif;
}


/**
* @description=>update the glrail
* @param  => 
* @return => 
*/
public function GLrail($args=array()){
  $arr = array('state' =>500,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array())); 
   
  $RawData= $args['Rawdata'];

  for($i=0;$i<count($RawData);$i++){
   $result=array('state' =>500,'response' =>"");
      $channalName= GetPropertyInArray('name',$RawData[$i],'','alphanumeric');
      $iu_hash= GetPropertyInArray('iu_hash',$RawData[$i]['init'],'','alphanumeric'); 
   //--------------------
 switch($channalName){
  
case 'notialert':
 
$result['state']=200;
$result['response']=$GLOBALS['Var_ProfileOutput'] ->NumProfileData('new_notification');   
break;

case 'checkinalert':
$result['state']=200;
$result['response']=$GLOBALS['Var_ProfileOutput'] ->NumProfileData('new_checkin_msg');    
break;
case 'msgalert':
$result['state']=200;
$result['response']=$GLOBALS['Var_ProfileOutput'] ->NumProfileData('new_chat_msg');    
break;
case 'orderalert':
$result['state']=200;
$result['response']=$GLOBALS['Var_ProfileOutput'] ->NumProfileData('new_chat_msg');    
break;
case 'reqalert':
$result['state']=200;
$result['response']=$GLOBALS['Var_ProfileOutput'] ->NumProfileData('new_friend_request');    
break;




      }


$arr['response'][$i]=$result;
  }

$arr['state']=200;  
  
  return $arr;

}








}













$GLOBALS['Var_ProcessData'] =new ProcessData();






?>