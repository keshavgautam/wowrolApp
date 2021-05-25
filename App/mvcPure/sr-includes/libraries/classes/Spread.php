<?php
    
class Spread{
    

/**
* @description=>this class has all ragistration mathod.
* @param  => // `wowrol_app`.`spread`
* @return => 
*/
 public function register_spread($args = array(),$image_attchments= array(),$video_attchments= array() ){

 $default = array(
		'spread_id' => 0,
		'entity_id' =>0,
		'owner_entity_id' => 0,
		'spread_content' => '',
		'quick_action_type'=> 0,//[0 => wow  | 1 => like | 2 => agree |3 => feel sad  ]
        'spread_perpose'=> 0,
        'suspended'=> 0,//[1 => suspended | 0 => not suspended]
		'privacy_id' =>0,
		'spread_rank' => hackerHot(500, date_in_timezone("UTC")),
		'spread_score' => hackerHot(500, date_in_timezone("UTC")),
		'spread_date' =>  date_in_timezone("UTC"),
        'ip'=> $GLOBALS['Var_ip'],
		'taged_entity' => array(),
        'images_Str' => '',
		'attached_object' => '',
        'attached_object_Str' => ''
	);

$args =  True_array_merge( $default,$args );
 /*

 */
        //--sql
  
       $is_new=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'spread', array('entity_id','spread_id'),array($args['entity_id'],$args['spread_id']));


     //--sql :ENDS


     //check spread content




     if($is_new>0){
           //update
      
          
         
      

        
         $GLOBALS['Var_DBMysqli']->update(DB_NAME,'spread',array('spread_content','privacy_id','taged_entity','attached_object','images'),array($args['spread_content'],$args['privacy_id'],$args['taged_entity_Str'],$args['attached_object_Str'],$args['images_Str']),array('spread_id'),array($args['spread_id']));  
           
     }else{
        
 

         //insert
$args['spread_id']= $GLOBALS['Var_DBMysqli']->insert(DB_NAME,'spread',
array('entity_id','owner_entity_id','spread_content','quick_action_type','comment_status','spread_perpose','privacy_id','ip','spread_rank','spread_score','spread_date_gmt','taged_entity','attached_object','images'),
array($args['entity_id'],$args['owner_entity_id'], $args['spread_content'] ,$args['quick_action_type'],$args['comment_status'],$args['spread_perpose'],$args['privacy_id'],$args['ip'],$args['spread_rank'],$args['spread_score'],$args['spread_date_gmt'],$args['taged_entity_Str'],$args['attached_object_Str'],$args['images_Str']));

//activity work
 $GLOBALS['Var_Activity']->CreateSpreadActivity(array('creater_id' => $args['entity_id'],'spread_id' => $args['spread_id'],'object_id' => $args['spread_id'],'activity_code' => '130','object_type' => '0'));










     }//End Inert

// taged entity notification work

if(count($args['taged_entity'])>0){
    foreach($args['taged_entity'] as $taged_entity_id){
       $GLOBALS['Var_Activity']->CreateSpreadActivity(array('creater_id' =>$args['entity_id'],'spread_id' => $args['spread_id'],'object_id' => $taged_entity_id,'activity_code' => '104','object_type' => '0'));    
    }

  
}



  



    return     $args['spread_id'];
 } 

 public function register_comment($args = array()){
    

      if( $args['comment_row'] !=NULL){//update
       
        
         $GLOBALS['Var_DBMysqli']->update(DB_NAME,'spread_comments',array('comment_content'),array($args['comment_text']),array('spread_comment_id'),array($args['comment_id']));   
      }else{
 
       
  $args['comment_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'spread_comments',array('spread_id','entity_id','comment_content','comment_date_gmt','comment_rank','comment_score'),array($args['spread_id'],$args['entity_id'],$args['comment_text'],$args['date_gmt'],$args['comment_rank'],$args['comment_score'])); 

//activity work
 $GLOBALS['Var_Activity']->CreateSpreadActivity(array('creater_id' => $args['entity_id'],'spread_id' => $args['spread_id'],'object_id' => $args['comment_id'],'activity_code' => '101','object_type' => '1'));




      }

return $args['comment_id'];
 }

 public function ragister_reviewcomment($args = array()){
    

      if( $args['comment_row'] !=NULL){//update
    
        
         $GLOBALS['Var_DBMysqli']->update(DB_NAME,'spread_comments',array('comment_content','rating_value'),array($args['comment_text'],$args['rating_value']),array('spread_comment_id'),array($args['comment_id']));   
      }else{

       
  $args['comment_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'spread_comments',array('spread_id','entity_id','comment_content','comment_date_gmt','rating_value','comment_rank','comment_score'),array($args['spread_id'],$args['entity_id'],$args['comment_text'],$args['date_gmt'],$args['rating_value'],$args['comment_rank'],$args['comment_score'])); 

  //activity work
 $GLOBALS['Var_Activity']->CreateSpreadActivity(array('creater_id' => $args['entity_id'],'spread_id' => $args['spread_id'],'object_id' => $args['comment_id'],'activity_code' => '102','object_type' => '1'));

      }

return $args['comment_id'];
 }

  ///============Retrive Method=============//
  /**
* @description=>RetriveSpreadById.
* @param  => 
* @return => 
*/
  public function RetriveSpreadById($args){

 $row=$GLOBALS['Var_DBMysqli']->query('SELECT *,
      (SELECT COUNT(*)
       FROM '.DB_NAME.'.quick_action_spread q
       WHERE q.spread_id=c.spread_id ) as reactioncount,
       (SELECT COUNT(*)
       FROM '.DB_NAME.'.quick_action_spread q
       WHERE q.spread_id=c.spread_id AND q.entity_id='.$args['entity_id'].' ) as selfreactioncount,
       (SELECT COUNT(*)
       FROM '.DB_NAME.'.spread_comments p
       WHERE p.spread_id=c.spread_id ) as commentcount   
  FROM  '.DB_NAME.'.spread 
  WHERE  spread_id= '.$args['spread_id'].'
  AND  deleted =0
                                    '); 

       return $row;
  }

/**
* @description=>retrive the table data.
* @param  => array('table'=>'','pagesize'=>'','paged'=>'','searchstr'=>'','selectedid'=>'')
* @return => 
*/  
public function RetriveById($args=array()){
   $row=array(); 
    $selectsql='';
       switch($args['table']){
case 'spread_comments':
$selectsql='SELECT * FROM '.DB_NAME.'.spread_comments a 
 WHERE a.spread_comment_id	='.$args['comment_id'].'
 LIMIT 1
 ';

break;    
case 'spread':
$selectsql='SELECT *,
      (SELECT COUNT(*)
       FROM '.DB_NAME.'.quick_action_spread q
       WHERE q.spread_id=c.spread_id ) as reactioncount,
       (SELECT COUNT(*)
       FROM '.DB_NAME.'.quick_action_spread q
       WHERE q.spread_id=c.spread_id AND q.entity_id='.$args['entity_id'].' ) as selfreactioncount,
       (SELECT COUNT(*)
       FROM '.DB_NAME.'.spread_comments p
       WHERE p.spread_id=c.spread_id ) as commentcount   
  FROM  '.DB_NAME.'.spread c
  WHERE  c.spread_id = '.$args['spread_id'].'
  AND  c.deleted =0
                                    ';

break; 
    case 'getlastReviewRow':

   $selectsql='SELECT * FROM '.DB_NAME.'.spread_comments a 
 WHERE a.spread_id ='.$args['spread_id'].'
 AND a.entity_id ='.$args['entity_id'].'
 LIMIT 1
 ';
  
  break;






    }


 $row=$GLOBALS['Var_DBMysqli']->query($selectsql); 

 return $row;
}

  /**
  @ depricated
* @description=>RetriveSpreadById.
* @code  => $acess_mode= [acess_mode =acm |  homepage = hp | profilepage = pp | homepage comment selected = hpc | homepage spread selected =hps| homepage latest spread  =hpl]
* @param  => 
* @return => 
*/
  public function RetriveSpread($args=array()){
   $spread_list=array();   

   //--relative sql
   $relativeSql='SELECT e.to_id as entity_id
                           FROM '.DB_NAME.'.relation_one_way e
                           WHERE (e.current_status=3||e.current_status=4)
                           AND (e.from_id='.$args['entity_id'].')';



   //--relative sql

   switch($args['acm']){
    case 'hp'://hp
 $WHERE_entity_id='(c.entity_id IN ('.$relativeSql.')||c.entity_id='.$args['entity_id'].')';
       break;   //
   case 'pp'://hp
$WHERE_entity_id='(c.entity_id='.$args['entity_id'].')';
       break;   //
  }    
 

      // num count
     $spread_count=0;
     $numsql='
       SELECT COUNT(*)
       FROM '.DB_NAME.'.spread c
       WHERE '. $WHERE_entity_id.'

     ;';
 $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
     // num count
   
 //--paging data
    $paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);
  //--sql for spread_list

   $limit='LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';


    $spread_list_sql='
     SELECT DISTINCT * ,((c.spread_score-1)/ power(((unix_timestamp(NOW())-unix_timestamp(c.spread_date_gmt))/60)/60,1)  ) as rank,
      (SELECT COUNT(*)
       FROM '.DB_NAME.'.quick_action_spread q
       WHERE q.spread_id=c.spread_id ) as reactioncount,
       (SELECT COUNT(*)
       FROM '.DB_NAME.'.quick_action_spread q
       WHERE q.spread_id=c.spread_id AND q.entity_id='.$args['entity_id'].' ) as selfreactioncount,
       (SELECT COUNT(*)
       FROM '.DB_NAME.'.spread_comments p
       WHERE p.spread_id=c.spread_id ) as commentcount     
FROM '.DB_NAME.'.spread c
WHERE '. $WHERE_entity_id.'
AND  c.suspended = 0
AND  c.deleted =0
AND  c.spread_id NOT IN (SELECT Rpo.object_id FROM '.DB_NAME.'.reports Rpo
                               WHERE Rpo.reporter_id = '.$args['entity_id'].')
GROUP BY c.spread_id
 ORDER BY rank  DESC 
  '.$limit.'
    ';



       // main query
     
 $spread_list =$GLOBALS['Var_DBMysqli'] ->query($spread_list_sql);

   // main query
  

  
  


    return PagingOutPut(array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$spread_list,
          'totalpage'=>$paging_data['total_page'],
          'totalresult'=>$total_result
             )) ;
   }// end  RetriveSpread
  /**
* @description=>RetriveSpreadById.
* @code  => $acess_mode= [acess_mode =acm |  homepage = hp | profilepage = pp | homepage comment selected = hpc | homepage spread selected =hps| homepage latest spread  =hpl]
* @param  => 
* @return => 
*/
public function RetriveSpreadByActivity($args=array()){
      $spread_list=array();  $WHERE='';$WHERE_creater_id=''; $ACTIVITYCODE='';
      $LEFTJOIN='';
      $spreadOwner=2;     $spreadViwer=2;
   //--relative sql
   $relativeSql='SELECT e.to_id as entity_id
                           FROM '.DB_NAME.'.relation_one_way e
                           WHERE (e.current_status=3||e.current_status=4)
                           AND (e.from_id='.$args['entity_id'].')';




//-->>

//--$WHERE_entity_id
   switch($args['acm']){
    case 'hp'://hp
 $WHERE_creater_id='(
                    (sa.creater_id IN ('.$relativeSql.')
                     AND (sa.activity_code="100"||sa.activity_code="101"||sa.activity_code="102"||sa.activity_code="130")
                     )
                     ||(sa.creater_id='.$args['entity_id'].' 
                     AND (sa.activity_code="130")
                     )
                     )';


 $WHERE_creater_id='(
 ( (sa.creater_id IN ('.$relativeSql.')||sa.creater_id='.$args['entity_id'].' ) AND (sa.activity_code="130"))
 ||
 ( (sa.creater_id IN ('.$relativeSql.')||sa.creater_id='.$args['entity_id'].' ) AND (sa.activity_code="100")  AND (sa.creater_id!=c.entity_id))

 )';

  
 
       break;   //
   case 'pp'://hp
$WHERE_creater_id='(sa.creater_id='.$args['entity_id'].' 
                     AND (sa.activity_code="130")
                     )';


       break;   //
  } 

// include Selected spread_id 

if($args['spread_id']){
 $WHERE_creater_id='c.spread_id = '.$args['spread_id'].' ';   

}


//  check_response( $relationSql);
 $relationSql=$GLOBALS['Var_Utility']->SQL_privacyForSpread($args['spreadViwer_entity_id']); 
 $WHERE_creater_id.='AND  ('.$relationSql.')'; 


//$INNER_JOIN=' INNER JOIN   ('.$relationSql.') AS temp   ON c.privacy_id IN (temp ) ';
$INNER_JOIN=' ';

//--$WHERE
$WHERE=$WHERE_creater_id.'
AND sa.spread_id=c.spread_id
AND  c.suspended = 0
AND  c.deleted =0
AND  c.spread_id NOT IN (SELECT Rpo.object_id FROM '.DB_NAME.'.reports Rpo
                               WHERE Rpo.reporter_id = '.$args['entity_id'].')



';




    // num count
     $spread_count=0;
     $numsql='
       SELECT DISTINCT COUNT(c.spread_id)
       FROM '.DB_NAME.'.spread c,'.DB_NAME.'.spread_activity sa
    
      WHERE '.$WHERE.'

     ;';
     
 $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);

     // num count
 //--paging data
    $paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);
  //--sql for spread_list
 
   $limit='LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';



  $spread_list_sql='
     SELECT DISTINCT * ,((c.spread_score-1)/ power(((unix_timestamp(NOW())-unix_timestamp(c.spread_date_gmt))/60)/60,1)  ) as rank,
      (SELECT COUNT(*)
       FROM '.DB_NAME.'.quick_action_spread q
       WHERE q.spread_id=c.spread_id ) as reactioncount,
       (SELECT COUNT(*)
       FROM '.DB_NAME.'.quick_action_spread q
       WHERE q.spread_id=c.spread_id AND q.entity_id='.$args['entity_id'].' ) as selfreactioncount,
       (SELECT COUNT(*)
       FROM '.DB_NAME.'.spread_comments p
       WHERE p.spread_id=c.spread_id ) as commentcount   
FROM '.DB_NAME.'.spread c,'.DB_NAME.'.spread_activity sa

WHERE '. $WHERE.'
GROUP BY sa.object_id
ORDER BY rank  DESC 
  '.$limit.'
    ';


   
       // main query
   
//check_response($spread_list_sql);

 $spread_list =$GLOBALS['Var_DBMysqli'] ->query($spread_list_sql);
 
   // main query
  

  
  return PagingOutPut(array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$spread_list,
          'totalpage'=>$paging_data['total_page'],
          'totalresult'=>$total_result
             )) ;
}


/**
* @description=>RetriveSpreadById.

* @param  => 
* @return => 
*/
 public function RetriveComment($args=array()){




    
    $include_selected_comment_id='';
   $include_order_by=' ORDER BY rank DESC';
   if($args['selected_id']!=''){
   $include_selected_comment_id='AND a.spread_comment_id <="'.$args['selected_id'].'"';   
     $include_order_by=' ORDER BY a.spread_comment_id DESC'; 
   
   }


     
     $WHERE='a.spread_id	='.$args['spread_id'].'
 '.$include_selected_comment_id.'
 AND a.deleted= 0
AND  ((a.spread_comment_id NOT IN (SELECT Rpo.object_id FROM '.DB_NAME.'.reports Rpo
                               WHERE Rpo.reporter_id = '.$args['entity_id'].'
                               AND Rpo.report_code="report_1"))
                               &&
               (a.spread_comment_id NOT IN (SELECT Rpo.object_id FROM '.DB_NAME.'.reports Rpo
                               WHERE Rpo.reporter_id = "'.$args['spread_row']['entity_id'].'"
                               AND Rpo.report_code="report_2"))    
                               )

';


 $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.spread_comments a 
          WHERE '. $WHERE.'
      ';

 $selectsql='SELECT *,((a.comment_score-1)/ power(((unix_timestamp(NOW())-unix_timestamp(a.comment_date_gmt))/60)/60,1)  ) as rank   FROM '.DB_NAME.'.spread_comments a 
 WHERE '. $WHERE.'

 '.$include_order_by.'
 ';

$total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);

//linit sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';
 $selectsql.=$limit;

 
   $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;


  return PagingOutPut(array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$result,
          'totalpage'=>$paging_data['total_page'],
          'selectedid'=>$args['selected_id'],
          'totalresult'=>$total_result
             )) ;

 }
  
/**
* @description=>RetriveSpreadById.

* @param  => 
* @return => 
*/

 public function ViewReactionAcotor($args=array()){
       $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.quick_action_spread a 
          WHERE a.spread_id	='.$args['spread_id'].'
          

 ';
 $selectsql='SELECT a.entity_id   FROM '.DB_NAME.'.quick_action_spread a 
 WHERE a.spread_id	='.$args['spread_id'].'

 ORDER BY 	a.qa_date_gmt  DESC 
 ';

  $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);

//linit sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';
 $selectsql.=$limit;

 
   $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;
     $qc_who=array();
   foreach($result as $row){
     $qc_who[]=$row['entity_id'];   
   }
   

    return array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$qc_who,
          'totalpage'=>$paging_data['total_page'],
          'selectedid'=>$args['selected_id']
             );
    
    
     
 }

 /**
* @description=>RetriveSpreadById.

* @param  => 
* @return => 
*/


public function SpreadCommentTogether($args=array()){
    $ret=array();$ActorEntityData=$GLOBALS['Var_ActorEntityData'];  
$spread_row=$args['spread_row'];
$rtw=$args['rtw'];
$comment_id=$args['comment_id'];
$spread_id=$spread_row['spread_id'];


$RetriveSpread=  $GLOBALS['Var_Spread']->RetriveSpreadByActivity(array('acm'=>'pp','pagesize'=>1,'paged'=>1,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'spread_id'=>$spread_id,'comment_id'=>'','spreadViwer_entity_id'=>$ActorEntityData['EntityData']['entity_id']));  

$RetriveSpread= $GLOBALS['Var_Spread']->ParseSpreadByActivity($RetriveSpread['result']);

$RetriveComment=  $GLOBALS['Var_Spread']->RetriveComment(array('pagesize'=>10,'paged'=>1,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'spread_id'=> $spread_id,'selected_id'=>$comment_id,'spread_row'=>$spread_row));  
$RetriveComment['result']= $GLOBALS['Var_Spread']->ParseComment($RetriveComment['result']);




$ret['comment']=$RetriveComment;
$ret['spread']=$RetriveSpread;

    return $ret;
}


 ///============Retrive Method=============//



 ///============ParseMethod=============//
 /**
* @description=>this class has all ragistration mathod.
* @param  => // `wowrol_app`.`spread`
* @return => 
*/
public function ParseSpreadContent($spreadFields,$args=array()){
    $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
    $ret=array();
     $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
        for($i=0;$i<count($spreadFields);$i++){
$ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('SpreadViewFields');  

    $EntityInformation= new EntityInformation($spreadFields[$i]['entity_id'],$ActorEntityData['EntityData']['entity_id']);
    $EntityRow=$EntityInformation->frontuser_EntityRow;   
    $IsAllowSpreadOpration = $EntityInformation->IsAllowSpreadOpration();

    $ret[$i]['ESd']=$GLOBALS['Var_ViewParse']->EntityStripdata($EntityRow);
    $ret[$i]['sid']=$spreadFields[$i]['spread_id'];
    $ret[$i]['id']=$spreadFields[$i]['spread_id'];
    $ret[$i]['eid']=$spreadFields[$i]['entity_id'];
    $ret[$i]['oeid']=$spreadFields[$i]['owner_entity_id'];
    $ret[$i]['veid']=$ActorEntityData['EntityData']['entity_id'];
    $ret[$i]['pyi']=$spreadFields[$i]['privacy_id'];

    $ret[$i]['cmts']=$spreadFields[$i]['comment_status'];
   $ret[$i]['cp']=array('r'=>$IsAllowSpreadOpration['spread_comment_read'],'w'=>$IsAllowSpreadOpration['spread_comment_write']);
    $ret[$i]['qat']=$spreadFields[$i]['quick_action_type'];
    $ret[$i]['prpo']=$spreadFields[$i]['spread_perpose'];
    $ret[$i]['date']=date_in_timezone( $zone,$spreadFields[$i]['spread_date_gmt']);
    $ret[$i]['date_gmt']=$spreadFields[$i]['spread_date_gmt'];

    $ret[$i]['ctt']=$spreadFields[$i]['spread_content'];
    $ret[$i]['tey']=$GLOBALS['Var_ViewParse']->SpreadContent($spreadFields[$i],'taged_entity');
    $ret[$i]['aoj']=$GLOBALS['Var_ViewParse']->SpreadContent($spreadFields[$i],'attached_object');
  
    $ret[$i]['hdg']=$GLOBALS['Var_ViewParse']->SpreadContent($spreadFields[$i],'spread_heading');
    $ret[$i]['sdes']=$GLOBALS['Var_ViewParse']->SpreadContent($spreadFields[$i],'short_description');
     //--reaction count && comment
     $ret[$i]['qati']['total']=$spreadFields[$i]['reactioncount'];
     $ret[$i]['qati']['self']=$spreadFields[$i]['selfreactioncount'];
     $ret[$i]['cmti']['total']=$spreadFields[$i]['commentcount'];

     /*-- spread_perpose  [ '00 entity spread ','01 entity spread ' | '11 product spread' | '10 category spread' | '3 wellcome spread'| '4 shere spread'| '5 profile update' |'6 shopping spread       'profile update type=>'-|'50 bio update'|-
                         -|'51 about me update'|-
                     |]*/
   switch( $ret[$i]['prpo']){
      case '01':
      if($spreadFields[$i]['attached_object']!=NULL&&$spreadFields[$i]['attached_object']!=''){
      $attached_object=explode(",",$spreadFields[$i]['attached_object']);  
       $ret[$i]['aoj'] = $GLOBALS['Var_StoreDashboard']->ParseProducts($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_productsByIdArray','product_id'=> $attached_object,'entity_id'=>$spreadFields[$i]['owner_entity_id']))); 
         
              
      }
 

      break;
   case '11':
 
    if($spreadFields[$i]['attached_object']!=NULL&&$spreadFields[$i]['attached_object']!=''){
      $attached_object=explode(",",$spreadFields[$i]['attached_object']);  
       $ret[$i]['aoj'] = $GLOBALS['Var_StoreDashboard']->ParseProducts($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_productsByIdArray','product_id'=> $attached_object,'entity_id'=>$spreadFields[$i]['owner_entity_id']))); 

  $ret[$i]['rfinfo']=$GLOBALS['Var_BundlePrototype']->DefaultValue('SpreadcommentViewFields');  

  $comment_row= $this->RetriveById(
  array('table'=>'getlastReviewRow',
 'spread_id'=>$spreadFields[$i]['spread_id'],
 'entity_id'=>$ActorEntityData['EntityData']['entity_id']
   ));  
   if( $comment_row!=NULL){
   $ret[$i]['rfinfo']=$GLOBALS['Var_Spread']->ParseComment($comment_row)[0];
      }
      
     
      }
     break;
  case '12':
 if($spreadFields[$i]['attached_object']!=NULL&&$spreadFields[$i]['attached_object']!=''){
      $attached_object=explode(",",$spreadFields[$i]['attached_object']);  
       $ret[$i]['aoj'] =array(); 

  $ret[$i]['rfinfo']=$GLOBALS['Var_BundlePrototype']->DefaultValue('SpreadcommentViewFields');  

  $comment_row= $this->RetriveById(
  array('table'=>'getlastReviewRow',
 'spread_id'=>$spreadFields[$i]['spread_id'],
 'entity_id'=>$ActorEntityData['EntityData']['entity_id']
   ));  
   if( $comment_row!=NULL){
   $ret[$i]['rfinfo']=$GLOBALS['Var_Spread']->ParseComment($comment_row)[0];
      }
      
     
      }
     break;
    case '10':
    if($spreadFields[$i]['attached_object']!=NULL&&$spreadFields[$i]['attached_object']!=''){
      $attached_object=explode(",",$spreadFields[$i]['attached_object']);  
      if(count( $attached_object)>0){
  $category_row =  $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validCategoryAlldata','category_id'=>$attached_object[0],'entity_id'=>$spreadFields[$i]['owner_entity_id']));
 
   if($category_row!=NULL){
   $storeOutput=new StoreOutput($category_row['entity_id']);

        $Retrive= $storeOutput->GetCategoryListing(array('cid'=>$attached_object[0],'pagesize'=>6,'paged'=>1,'selected_id'=>'','search_str'=>'','Sort'=>'store_categories','ActiveFilter'=>array(),'customFilter'=>array(),'mainFilter'=>array(),'entity_id'=>$category_row['entity_id']));  
     
 $ret[$i]['aoj']= $storeOutput->ParseProductInfo($Retrive['result']);
$ret[$i]['aojinfo']= array('cN'=>$category_row['category_name'],'slug'=>$category_row['content_slug']);
  } 

        } 
              
      }
     break;
     case '13':

        if($spreadFields[$i]['attached_object']!=NULL&&$spreadFields[$i]['attached_object']!=''){
            
    $attached_object=explode(",",$spreadFields[$i]['attached_object']);  
      if(count( $attached_object)>0){
          




      }


        }

      break;
     
     
     
       
   }




        }

return  $ret;
 
}

public function ParseSpreadByActivity($spreadFields,$args=array()){
    $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
    $ret=array();
     $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
        for($i=0;$i<count($spreadFields);$i++){
$ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('SpreadViewFields');  

    $EntityInformation= new EntityInformation($spreadFields[$i]['entity_id'],$ActorEntityData['EntityData']['entity_id']);
    $EntityRow=$EntityInformation->frontuser_EntityRow;   
      $IsAllowSpreadOpration = $EntityInformation->IsAllowSpreadOpration();
    
     
    $ret[$i]['ESd']=$GLOBALS['Var_ViewParse']->EntityStripdata($EntityRow);
    $ret[$i]['sid']=$spreadFields[$i]['spread_id'];
    $ret[$i]['id']=$spreadFields[$i]['spread_id'];
    $ret[$i]['eid']=$spreadFields[$i]['entity_id'];
    $ret[$i]['oeid']=$spreadFields[$i]['owner_entity_id'];
    $ret[$i]['veid']=$ActorEntityData['EntityData']['entity_id'];

      $ret[$i]['cp']=array('r'=>$IsAllowSpreadOpration['spread_comment_read'],'w'=>$IsAllowSpreadOpration['spread_comment_write']);
    // --activity work
     $ret[$i]['atyc']=$activitycode=$spreadFields[$i]['activity_code'];
   

if($activitycode=='100'||$activitycode=='101'||$activitycode=='102'){
  $CreaterInformation= new EntityInformation($spreadFields[$i]['creater_id'],$ActorEntityData['EntityData']['entity_id']);
     $CreaterEntityRow=$CreaterInformation->frontuser_EntityRow;  
 $ret[$i]['ceid']=$spreadFields[$i]['creater_id'];
 $ret[$i]['cESd']=$GLOBALS['Var_ViewParse']->EntityStripdata($CreaterEntityRow);

}



    // -->>

    $ret[$i]['pyi']=$spreadFields[$i]['privacy_id'];

    $ret[$i]['cmts']=$spreadFields[$i]['comment_status'];
    $ret[$i]['qat']=$spreadFields[$i]['quick_action_type'];
    $ret[$i]['prpo']=$spreadFields[$i]['spread_perpose'];
    $ret[$i]['date']=date_in_timezone( $zone,$spreadFields[$i]['spread_date_gmt']);
    $ret[$i]['date_gmt']=$spreadFields[$i]['spread_date_gmt'];

    $ret[$i]['ctt']=$GLOBALS['Var_ViewParse']->SpreadContent($spreadFields[$i]['spread_content'],'spread_content');
    $ret[$i]['tey']=$GLOBALS['Var_ViewParse']->SpreadContent($spreadFields[$i],'taged_entity');
    $ret[$i]['aoj']=$GLOBALS['Var_ViewParse']->SpreadContent($spreadFields[$i],'attached_object');
  
   $ret[$i]['hdg']=$GLOBALS['Var_ViewParse']->SpreadContent($spreadFields[$i],'spread_heading');
   $ret[$i]['sdes']=$GLOBALS['Var_ViewParse']->SpreadContent($spreadFields[$i],'short_description');
     //--reaction count && comment
     $ret[$i]['qati']['total']=$spreadFields[$i]['reactioncount'];
     $ret[$i]['qati']['self']=$spreadFields[$i]['selfreactioncount'];
     $ret[$i]['cmti']['total']=$spreadFields[$i]['commentcount'];

     /*-- spread_perpose  [ '00 entity spread ','01 entity spread ' | '11 product spread' | '10 category spread' | '3 wellcome spread'| '4 shere spread'| '5 profile update' |'6 shopping spread       'profile update type=>'-|'50 bio update'|-
                         -|'51 about me update'|-
                     |]*/
   switch( $ret[$i]['prpo']){
      case '01':
      if($spreadFields[$i]['attached_object']!=NULL&&$spreadFields[$i]['attached_object']!=''){
      $attached_object=explode(',',$spreadFields[$i]['attached_object']);  
       $ret[$i]['aoj'] = $GLOBALS['Var_StoreDashboard']->ParseProducts($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_productsByIdArray','product_id'=> $attached_object,'entity_id'=>$spreadFields[$i]['owner_entity_id']))); 
         
              
      }
 

      break;
   case '11':
    if($spreadFields[$i]['attached_object']!=NULL&&$spreadFields[$i]['attached_object']!=''){
      $attached_object=explode(',',$spreadFields[$i]['attached_object']);  
       $ret[$i]['aoj'] = $GLOBALS['Var_StoreDashboard']->ParseProducts($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_productsByIdArray','product_id'=> $attached_object,'entity_id'=>$spreadFields[$i]['owner_entity_id']))); 
  $ret[$i]['rfinfo']=$GLOBALS['Var_BundlePrototype']->DefaultValue('SpreadcommentViewFields');  

  $comment_row= $this->RetriveById(
  array('table'=>'getlastReviewRow',
 'spread_id'=>$spreadFields[$i]['spread_id'],
 'entity_id'=>$ActorEntityData['EntityData']['entity_id']
   ));  
   if( $comment_row!=NULL){
   $ret[$i]['rfinfo']=$GLOBALS['Var_Spread']->ParseComment($comment_row)[0];
      }
      
     
      }
     break;
  case '12':
 if($spreadFields[$i]['attached_object']!=NULL&&$spreadFields[$i]['attached_object']!=''){
      $attached_object=explode(',',$spreadFields[$i]['attached_object']);  
       $ret[$i]['aoj'] =array(); 
//ratting   
    $ratting=$GLOBALS['Var_StoreDashboard'] ->RetriveById(array('table'=>'store_ratting','spread_id'=>$spreadFields[$i]['spread_id'],'entity_id'=>$spreadFields[$i]['entity_id']));
 $ret[$i]['aoj']['rf']['Total']=array(
		'5star' =>intval($ratting[0]['total']),
		'4star' =>intval($ratting[1]['total']),
		'3star' => intval($ratting[2]['total']),
		'2star' => intval($ratting[3]['total']),
		'1star' =>intval($ratting[4]['total']),
	);
 $ret[$i]['aoj']['pvs']=intval($ratting[5]['total']);//
 $ret[$i]['aoj']['pic']=intval($ratting[6]['total']);//


  $ret[$i]['rfinfo']=$GLOBALS['Var_BundlePrototype']->DefaultValue('SpreadcommentViewFields');  

  $comment_row= $this->RetriveById(
  array('table'=>'getlastReviewRow',
 'spread_id'=>$spreadFields[$i]['spread_id'],
 'entity_id'=>$ActorEntityData['EntityData']['entity_id']
   ));  
   if( $comment_row!=NULL){
   $ret[$i]['rfinfo']=$GLOBALS['Var_Spread']->ParseComment($comment_row)[0];
      }
      
     
      }
     break;
    case '10':
    if($spreadFields[$i]['attached_object']!=NULL&&$spreadFields[$i]['attached_object']!=''){
      $attached_object=explode(',',$spreadFields[$i]['attached_object']);  
      if(count( $attached_object)>0){
  $category_row =  $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validCategoryAlldata','category_id'=>$attached_object[0],'entity_id'=>$spreadFields[$i]['owner_entity_id']));
 
   if($category_row!=NULL){
   $storeOutput=new StoreOutput($category_row['entity_id']);

        $Retrive= $storeOutput->GetCategoryListing(array('cid'=>$attached_object[0],'pagesize'=>6,'paged'=>1,'selected_id'=>'','search_str'=>'','Sort'=>'store_categories','ActiveFilter'=>array(),'customFilter'=>array(),'mainFilter'=>array(),'entity_id'=>$category_row['entity_id']));  
     
 $ret[$i]['aoj']= $storeOutput->ParseProductInfo($Retrive['result']);
$ret[$i]['aojinfo']= array('cN'=>$category_row['category_name'],'slug'=>$category_row['content_slug']);
  } 

        } 
              
      }
     break;
    case '13'://friend ship spread

        if($spreadFields[$i]['attached_object']!=NULL&&$spreadFields[$i]['attached_object']!=''){
            
    $attached_object=explode(',',$spreadFields[$i]['attached_object']);  
      if(count( $attached_object)>0){
 // we get friend id from tagged entity 
        $friend_id = intval( preg_replace('/"/i','',$spreadFields[$i]['taged_entity']));  
         
     
 $friend_EntityInformation= new EntityInformation($friend_id,$spreadFields[$i]['entity_id']);

  



   $ret[$i]['aoj'] = array(
   'a'=>$GLOBALS['Var_ViewParse']->EntityStripdata($friend_EntityInformation->actoruser_EntityRow),
   'f'=> $GLOBALS['Var_ViewParse']->EntityStripdata($friend_EntityInformation->frontuser_EntityRow)
   );




      }


        }

      break;  
   }



   //images
     if($spreadFields[$i]['images']!=NULL){
           $images=JsonTrueDecode($spreadFields[$i]['images'],array());
         if(count($images)>0){
              $ret[$i]['img'] =  $images;  
         }

            
      }




        }

return  $ret;
 
}
 /**
* @description=>
* @param  => 
* @return => 
*/
public function ParseComment($Fields,$args=array()){
       $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
 
   $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
      $ret=array();
   for($i=0;$i<count($Fields);$i++){

$ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('SpreadcommentViewFields');  
$EntityInformation= new EntityInformation($Fields[$i]['entity_id'],$ActorEntityData['EntityData']['entity_id']);
  $EntityRow=$EntityInformation->frontuser_EntityRow;    
  $ret[$i]['ESd']=$GLOBALS['Var_ViewParse']->EntityStripdata($EntityRow);
  $ret[$i]['sid']=$Fields[$i]['spread_id'];
  $ret[$i]['cid']=$Fields[$i]['spread_comment_id'];
  $ret[$i]['id']=$Fields[$i]['spread_comment_id'];  
  $ret[$i]['eid']=$Fields[$i]['entity_id'];
  $ret[$i]['veid']=$ActorEntityData['EntityData']['entity_id'];
  $ret[$i]['ctt']=$Fields[$i]['comment_content'];
  $ret[$i]['date']=date_in_timezone( $zone,$Fields[$i]['comment_date_gmt']);
  $ret[$i]['date_gmt']=$Fields[$i]['comment_date_gmt'];

 if($Fields[$i]['rating_value'] !=null){
 $ret[$i]['rf']=array('show'=>1,'value'=>$Fields[$i]['rating_value']);
 }

       }

return $ret;
}

//-------===Reaction direct submit====------------

public function ReactionRagister($args){
     $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array())); 
  $num=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'quick_action_spread',array('spread_id','entity_id'),array($args['spread_id'],$args['ActorEntityData']['EntityData']['entity_id']));
    switch($args['self']){
       case 0:
       if($num>0){
      $GLOBALS['Var_DBMysqli']->delete(DB_NAME,'quick_action_spread',array('spread_id','entity_id'),array($args['spread_id'],$args['ActorEntityData']['EntityData']['entity_id'])); 
      //activity work
 $GLOBALS['Var_Activity']->RemoveSpreadActivity(array('creater_id' => $args['ActorEntityData']['EntityData']['entity_id'],'spread_id' => $args['spread_id'],'object_id' => $args['spread_id'],'activity_code' => '100','object_type' => '0'));       
       }
       break; 
       case 1:
         if($num==0){

   $dateGMT=zonedate("UTC");
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR')); 

 $args['pread_quick_action_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'quick_action_spread',array('spread_id','entity_id','qa_date_gmt','ip'),array($args['spread_id'],$args['ActorEntityData']['EntityData']['entity_id'],$dateGMT,$ip));  
      
      
   //activity work
 $GLOBALS['Var_Activity']->CreateSpreadActivity(array('creater_id' => $args['ActorEntityData']['EntityData']['entity_id'],'spread_id' => $args['spread_id'],'object_id' => $args['spread_id'],'activity_code' => '100','object_type' => '0'));     
         
       }
       break; 
    }
  
     $arr['state']=200; 
    return $arr;
}


//-------===delete====------------

public function DeleteSpread($spread_id){
    
  //deleteing spread
  $GLOBALS['Var_DBMysqli']->update(DB_NAME,'spread',array('deleted'),array(1),array('spread_id'),array($spread_id));

}

public function ProcessCommentDelete($args){
      $arr=array('state' =>500,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array()));  
    switch($args['action']){
case 'r':
   $entity_id=$args['ActorEntityData']['EntityData']['entity_id'];
   $report_code="report_1";

   if($entity_id== $args['spread_row']['entity_id']){
      $report_code="report_2";   
   }

$GLOBALS['Var_Activity']->report_content(array('object_id'=>$args['comment_id'],'report_code'=>$report_code,'reporter_id'=> $entity_id));
$arr['state']=200;
break;
case 'd':
 
  $GLOBALS['Var_DBMysqli']->update(DB_NAME,'spread_comments',array('deleted'),array(1),array('spread_comment_id'),array($args['comment_id']));
  $arr['state']=200;
break;
        
    }

  return $arr;
}

public function ProcessSpreadDelete($args){
      $arr=array('state' =>500,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array()));  
       $arr['response']=$args;
    switch($args['action']){
case 'r':

$GLOBALS['Var_Activity']->report_content(array('object_id'=>$args['spread_id'],'report_code'=>'report_0','reporter_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
  $arr['state']=200;
break;
case 'd':
 
  //deleteing spread
  $GLOBALS['Var_DBMysqli']->update(DB_NAME,'spread',array('deleted'),array(1),array('spread_id'),array($args['spread_id']));
  $arr['state']=200;
break;
        
    }

  return $arr;


 }


//-------===delete====------------
}
 ///============ParseMethod=============//
$GLOBALS['Var_Spread'] =new Spread();

?>