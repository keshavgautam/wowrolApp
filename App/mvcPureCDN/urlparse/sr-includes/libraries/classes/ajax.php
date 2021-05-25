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
   
 case 'parseurl':
   $args=array();
   $error=1;
 $args['url']=post_vars(array('f_value'=>array('url'=>'')),$_POST['data'],'');


  if($args['url']==''){ $arr['mistake']['message'][]='ajax_0';}else{$error--;}



  if( $error<=0){


      
  $arr=$GLOBALS['Var_ProcessData']->LoadSnoopyUrl($args);



  }

 break;
 case 'urlinfo':




 break;



 }



 }
 }
  $arr['error']=$error;
  if(SERVER_MODE=="DEVELOPMENT"){
       $arr['detailargs']=array();  
       
    }

 return $arr;

}

}



$GLOBALS['Var_Ajax']=new Ajax();


?>