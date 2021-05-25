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
            //
            if(isset($row['eid'])){
              if($row['eid']==$eid){
                 $row['time']=time(); 
                  $is_already_there=TRUE;
                 }  
            }

            //remoing old entries 
            if(isset($row['time'])){
                if(intval($row['time'])>(time()-60)){
                    unset($TypingData[$key]);
                }
             
             }
        }
        $newTypingData=$TypingData;
    }

    if(!$is_already_there){

     $newTypingData[]= array('eid'=>$eid,'time'=>time()); 
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
@call  $GLOBALS['Var_Utility']->FlushMessage();
*/

}







$GLOBALS['Var_Utility'] =new Utility();





?>