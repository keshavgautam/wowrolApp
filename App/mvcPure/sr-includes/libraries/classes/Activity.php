<?php
    



 class Activity{
     
/** $GLOBALS['Var_Activity']->RagisterMainActivity(array('creater_id' => '0','object_id' => '0','activity_code' => 'wwq')); 
* @description=>RagisterMainActivity.
* @param  => array('activity_main_id' => '1','creater_id' => '0','object_id' => '0','activity_code' => 'wwq','timestamp' => '2016-05-29 19:18:22')
);
* @return => 
*/

public function RagisterMainActivity($args=array()){
    
    $args['activity_main_id']= $GLOBALS['Var_DBMysqli']->insert(DB_NAME,'activity_main',
array('creater_id','object_id','activity_code'),
array($args['creater_id'],$args['object_id'],$args['activity_code']));
return  $args['activity_main_id'];

}


/** $GLOBALS['Var_Activity']->RagisterRefActivity(array('creater_id' => '0','object_id' => '0','activity_code' => 'wwq')); 
* @description=>
* @param  => 
);
* @return => 
*/

public function RagisterRefActivity($args=array()){
    
    $args['activity_ref_id']= $GLOBALS['Var_DBMysqli']->insert(DB_NAME,'activity_ref',
array('creater_id','object_id','activity_code'),
array($args['creater_id'],$args['object_id'],$args['activity_code']));

return   $args['activity_ref_id'];

}
  /**
 * .create_term()
 * @param 1=>$arags=array( 'object_id'=>'',
                            'report_code'=>'',
                            'reporter_id'=>''  );
 *   
 * 'report_code' =[ "report_0"=>'spread report ']       
                  [ "report_1"=>'comment report  ']
                  [ "report_2"=>'comment report by spread owner  ']   
                  [ "hate_speach"=>'hate_speach ']
                  [ "abusive"=>'abusive ']      
 * @return array()
 */

 public function report_content($args=array()){
         
 

  $num_row=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'reports',array('object_id','report_code','reporter_id'),array($args['object_id'],$args['report_code'],$args['reporter_id']));
  $report='ok';
  if($num_row==0){
       
 
$report_id= $report=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'reports',array('object_id','report_code','time','reporter_id'),array($args['object_id'],$args['report_code'],time(),$args['reporter_id']));
  }
 

      return  $report;


     
 }

 /**
* @description=>RagisterMainActivity.
* @param  => array('spread_activity_id'=>0,'creater_id' => '0','spread_id' => '0','object_id' => '0','activity_code' => 'wwq')
);
* @return => 
*/
public function CreateSpreadActivity($args=array()){
      $num_row=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'spread_activity',array('creater_id','object_id','activity_code'),array($args['creater_id'],$args['object_id'],$args['activity_code']));
 $args['spread_activity_id']=0;
  if($num_row==0){
       
$args['spread_activity_id']= $report=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'spread_activity',array('creater_id','spread_id','object_id','activity_code'),array($args['creater_id'],$args['spread_id'],$args['object_id'],$args['activity_code']));

  }

  return $args['spread_activity_id'];

}

public function RemoveSpreadActivity($args=array()){
    
      $GLOBALS['Var_DBMysqli']->delete(DB_NAME,'spread_activity',array('creater_id','spread_id','object_id','activity_code'),array($args['creater_id'],$args['spread_id'],$args['object_id'],$args['activity_code']));    

}



 }

 $GLOBALS['Var_Activity'] =new Activity();

?>