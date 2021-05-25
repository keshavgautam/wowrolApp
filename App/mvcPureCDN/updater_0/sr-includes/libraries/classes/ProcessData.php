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

public function PreProcessForConversation($args=array()){
     $currentModif=time();
      $RawData= $args['Rawdata'];
      $convarstion_id_arr= array();$time_node_arr= array();$wait_all= array();

 for($i=0;$i<count($RawData);$i++){
       $channalName= GetPropertyInArray('name',$RawData[$i],'','alphanumeric');
 switch($channalName){
    case 'convarstionlist':  
   $convarstion_id= GetPropertyInArray('cid',$RawData[$i]['init'],'','numericID');
   $entity_id= GetPropertyInArray('eid',$RawData[$i]['init'],0,'numericID');
   $time_node= GetPropertyInArray('tn',$RawData[$i]['init'],time(),'numericID');
   $wait_all[]= GetPropertyInArray('wait',$RawData[$i]['init'],60,'numericID');
   $convarstion_id_arr[]=$convarstion_id;
   $time_node_arr[]=$time_node;
    break;  
 }

 }



 if(count($convarstion_id_arr)>0){
rsort($wait_all);
$wait=(count($wait_all)>0)?$wait_all[0]:60;


$currentModif= $GLOBALS['Var_Comet']->BulkSleep($convarstion_id_arr,0,$time_node_arr,$wait);










 }

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
  
  case 'convarstionlist':
   $convarstion_id= GetPropertyInArray('cid',$RawData[$i]['init'],'','numericID');
   $entity_id= GetPropertyInArray('eid',$RawData[$i]['init'],0,'numericID');
   $IS_Chat_active= GetPropertyInArray('isChatActive',$RawData[$i]['init'],0,'numericID');
   $time_node= $args['currentModif'];
 
   $event= GetPropertyInArray('event',$RawData[$i]['init'],array(),''); 
     $IsActiveConversation  =$GLOBALS['Var_Utility']->IsActiveConversation(  $event);
 //  $event=  Walk_Ways_each($event,'');

  $update_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME_UPDATE_0,'update_measure',array('object_id','object_Type'),array($convarstion_id,0));

$this->checkRow($update_row, $convarstion_id);
 if($update_row!=NULL){
 
 if($update_row['password']==$iu_hash){
   $GLOBALS['Var_Utility']->RepaireUpdateMeasureRow($update_row['clone_object'],$convarstion_id,0);      



        //save event

  $GLOBALS['Var_Conversation']->ProcessUpdate(array('convarstion_id'=>$convarstion_id,'event'=> $event,'password'=> $iu_hash,'time_node'=>  $time_node,'update_row'=>$update_row));

//--


// get the update 

 $result['response']=$GLOBALS['Var_Conversation']->GetUpdate(array('convarstion_id'=>$convarstion_id,'entity_id'=>  $entity_id,'time_node'=>  $time_node,'update_row'=>$update_row,'IsLoadMessage'=>TRUE, 'IsActiveConversation'=> $IsActiveConversation));


 $result['state']=200;

  } 
  
  
  
  
  }



  break;          
  ///event ----------------
  case 'convarstionlistevent':
     $convarstion_id= GetPropertyInArray('cid',$RawData[$i]['init'],'','numericID');
   $entity_id= GetPropertyInArray('eid',$RawData[$i]['init'],0,'numericID');
   $time_node= GetPropertyInArray('tn',$RawData[$i]['init'],time(),'numericID');
    $time_node=intval( $time_node)-5;
   $event= GetPropertyInArray('event',$RawData[$i]['init'],array(),''); 
 
 //  $event=  Walk_Ways_each($event,'');

  $update_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME_UPDATE_0,'update_measure',array('object_id','object_Type'),array($convarstion_id,0));
 if($update_row!=NULL){
     
 if($update_row['password']==$iu_hash){
     



        //save event

  $GLOBALS['Var_Conversation']->ProcessUpdate(array('convarstion_id'=>$convarstion_id,'event'=> $event,'password'=> $iu_hash,'time_node'=>  $time_node,'update_row'=>$update_row));

//--
// get the update 

 $result['response']=$GLOBALS['Var_Conversation']->GetUpdate(array('convarstion_id'=>$convarstion_id,'entity_id'=>  $entity_id,'time_node'=>  $time_node,'update_row'=>$update_row,'IsLoadMessage'=>FALSE));

 $result['state']=200;

  } 
  
  
  
  
  }

  break;



      }


$arr['response'][$i]=$result;
  }

$arr['state']=200;  
  
  return $arr;

}

/**
* @description=>update the glrail
* @param  => 
* @return => 
*/
public function checkRow($update_row, $convarstion_id){
    if($update_row==NULL){
    check_response('update row is null for  $convarstion_id ' . $convarstion_id );    
       
     
    }else{
      $JSON_DECODE=json_decode($update_row['clone_object'],TRUE);

       if($JSON_DECODE==NULL){
    check_response('clone_object is null for  $convarstion_id ' . $convarstion_id );  
     
       } 


    }


}





}













$GLOBALS['Var_ProcessData'] =new ProcessData();






?>