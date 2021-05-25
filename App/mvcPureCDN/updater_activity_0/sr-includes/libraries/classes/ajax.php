<?php
 
class Ajax{
    
/**
* @description=>handle request from ajax methode.
* @param  => 
* @return => 
*/
public function AjaxOutput($Mode=''){
  
 


 
  


   
  return  OutPutJSONencodeAjax($this->SanitizeForm());
}



/**
* @description=>sanitizefrom data.
* @param  => 
* @return => 
*/

private function SanitizeForm(){
    //Default
 $arr = array('state' =>500,'error' =>0,'response' => '','mistake' =>array('heading'=>'sd','message'=>array())); 
 $error=0;   
  if(isset($_POST['data'])){
 if(isset($_POST['data']['form'])){
     
 
 switch($_POST['data']['form']){
   
 case 'glRail':
   $args=array();

  $args['Rawdata']=JsonTrueDecode($_POST['data']['f_value'],array());

  if(count($args['Rawdata'])>0){

 $args['currentModif']=   $GLOBALS['Var_ProcessData']->PreProcessForComet($args);    

  $arr=$GLOBALS['Var_ProcessData']->GLrail($args);



  }
 break;



 }



 }
 }
  $arr['error']=$error;
  if(SERVER_MODE=="DEVELOPMENT"){
       $arr['detailargs']=$GLOBALS['Var_ActorEntityData'];  
       
    }

 return $arr;

}

}



$GLOBALS['Var_Ajax']=new Ajax();


?>