<?php
    

/**
* @description=>process the given data .
* @param  => 
* @return => 
*/

class ProcessData{
    

/**
* @description=>process the given data .
* @param  => 
* @return => 
*/
 public function LoadSnoopyUrl($args){
     $arr = array('state' =>500,'response' =>'Login false','mistake' =>array('heading'=>'','message'=>array()));  

      $args['url'] = strtolower( $args['url']);
   

      $result=$GLOBALS['Var_Snoopy']->fetch($args['url']);




   $arr['response']=  $result;

     $arr['mistake']['message']=  array(
     'url'=>$args['url'],
     'parse'=> parse_url($args['url']));

    $arr['state']=200;
     return $arr ;

    }











}













$GLOBALS['Var_ProcessData'] =new ProcessData();






?>