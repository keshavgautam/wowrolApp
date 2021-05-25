<?php
    

  
/**
* @description=>collection of Utility function .
* @param  => 
* @return => 
*/    
class Utility{
    



/*
@call  $GLOBALS['Var_Utility']->getTypingData();
*/
function getTypingData($TypingData,$eid){
    $newTypingData=array();
    $is_already_there=FALSE;


    if(is_array($TypingData)){
        foreach($TypingData as $key=>$row){
            $newSet=FALSE;
            

            //
            if(isset($row['eid'])){
              if($row['eid']==$eid){
                 $row['time']=time(); 
                  $is_already_there=TRUE;
                  $newSet=TRUE;
                 }  
            }

            //remoing old entries 
            if(isset($row['time'])&&(!$newSet)){
                if(intval($row['time'])<(time()-30)){
                  unset($TypingData[$key]);
                }
          
             }
        }
        $newTypingData=$TypingData;
    }

    if(!$is_already_there){

    $newTypingData[]= array('eid'=>$eid,'time'=>(time()-60)); 
    }

    return $newTypingData;
}

/*
@call  $GLOBALS['Var_Utility']->getTypingIds();
*/
function getTypingIds($TypingData){
    $TypingIds=array();
      if(is_array($TypingData)){
         foreach($TypingData as $key=>$row){
              if(isset($row['eid'])){
            $TypingIds[]=$row['eid'];
            }   
         }   
      }

    return   $TypingIds;
}

/*
@call  $GLOBALS['Var_Utility']->IsActiveConversation();
*/
function IsActiveConversation($event){
    $isActive=FALSE;
    
    for($i=0;$i<count($event);$i++){
                $event_type=   GetPropertyInArray('type',$event[$i],'',''); 
              
                if($event_type=='isactive'){
                       $isActive=TRUE; 
                }

    }
    return $isActive;

}

/*
@des check if clone object decodeable ,If Not delete the row
@call $GLOBALS['Var_Utility']->RepaireUpdateMeasureRow($clone_object,$object_id,$object_type);

*/
function RepaireUpdateMeasureRow($clone_object,$object_id,$object_type){
    $deCode=json_decode($clone_object,TRUE);

    if($deCode==NULL){
    //    $GLOBALS['Var_DBMysqli']->delete(DB_NAME_UPDATE_0,'update_measure',array('object_id','object_Type'),array($object_id,$object_type));
    }

}

}







$GLOBALS['Var_Utility'] =new Utility();





?>