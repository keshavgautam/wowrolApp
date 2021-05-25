<?php
    



 class Advertisement{
/**
* @description=> get defalult value
* $GLOBALS['Var_Advertisement']->CreateAdvertise('LoginData');
* @param  => 
* @return => 
*/
public function CreateAdvertise($type,$args){

 $ret=0;


 switch($type){

  case 'advertisebasic':

  if($args['adid']==0){
           
           
           switch($args['ct']){
 case 0;              
case 1;
 $data_ad_insert=array(
   'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'],
   'status'=>0,
   'type'=>$args['ct'],
   'monthly_budget'=>0.00,
   'daily_budget'=>0.00,
   'remaining_budget_month'=>0.00,
   'remaining_budget_today'=>0.00,
   'currency'=>'',
   'start_timestamp'=>time()
   ); 

$args['advertisement_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME_ADVERTISING,'advertisement',array_keys( $data_ad_insert) ,array_values( $data_ad_insert));

     $data_textcontent_insert=array(
   'advertisement_id'=>$args['advertisement_id'],
   'heading_1'=>$args['heading_1'],
   'heading_2'=>$args['heading_2'],
   'url'=>$args['url'],
   'description'=>$args['description']
   ); 
 $GLOBALS['Var_DBMysqli']->insert(DB_NAME_ADVERTISING,'advertise_text_content',array_keys( $data_textcontent_insert) ,array_values( $data_textcontent_insert));
  $ret=$args['advertisement_id'];
break;
case 2 :


break;




           }
      
    
      
  }else{

       $data_textcontent_update=array(
   'heading_1'=>$args['heading_1'],
   'heading_2'=>$args['heading_2'],
   'url'=>$args['url'],
   'description'=>$args['description']
   ); 

     switch($args['ct']){
     case 0:
          $data_ad_update=array( 'status'=>0); 
     //filling  

$GLOBALS['Var_DBMysqli']->update(DB_NAME_ADVERTISING,'advertisement',array_keys( $data_ad_update) ,array_values($data_ad_update),array('advertisement_id'),array($args['adid']));
$GLOBALS['Var_DBMysqli']->update(DB_NAME_ADVERTISING,'advertise_text_content',array_keys($data_textcontent_update) ,array_values($data_textcontent_update),array('advertisement_id'),array($args['adid']));   

     break;
     case 1:
       $data_ad_update=array( 'status'=>0); 
     //filling  

$GLOBALS['Var_DBMysqli']->update(DB_NAME_ADVERTISING,'advertisement',array_keys( $data_ad_update) ,array_values($data_ad_update),array('advertisement_id'),array($args['adid']));
$GLOBALS['Var_DBMysqli']->update(DB_NAME_ADVERTISING,'advertise_text_content',array_keys($data_textcontent_update) ,array_values($data_textcontent_update),array('advertisement_id'),array($args['adid'])); 
     break;
     case 2:
       $data_ad_update=array( 'status'=>1,'varify_by_entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']); 
     //filling  

$GLOBALS['Var_DBMysqli']->update(DB_NAME_ADVERTISING,'advertisement',array_keys( $data_ad_update) ,array_values($data_ad_update),array('advertisement_id'),array($args['adid']));
$GLOBALS['Var_DBMysqli']->update(DB_NAME_ADVERTISING,'advertise_text_content',array_keys($data_textcontent_update) ,array_values($data_textcontent_update),array('advertisement_id'),array($args['adid'])); 
     break;
     } 

  $ret=$args['adid'];
  }


   break;  

case 'advertiselocationedit':

   //delete ing previous
$GLOBALS['Var_DBMysqli']->delete(DB_NAME_ADVERTISING,'advertise_location',array('advertisement_id'),array($args['adid']));
 $budget=0.00;

   $OptionName=array('advertisement_id','postalCode_id','remaining_budget');
     $OptionValue=array();

     foreach ($args['location_data']  as $key=>$value){
      $OptionValue[] = array($args['adid'],$value[0],$value[1]);
       $budget+=$value[1];
     }

    $GLOBALS['Var_DBMysqli']->bulk_insert(DB_NAME_ADVERTISING,'advertise_location', $OptionName, $OptionValue);


    $data_ad_update=array(
    'monthly_budget'=> $budget,
    'remaining_budget_month'=> $budget

    );

    $GLOBALS['Var_DBMysqli']->update(DB_NAME_ADVERTISING,'advertisement',array_keys($data_ad_update) ,array_values($data_ad_update),array('advertisement_id'),array($args['adid'])); 
      $ret=$args['adid'];
break;

 }





 return $ret;
}
/**
* @description=> get defalult value
* $GLOBALS['Var_Advertisement']->RagisterAdvertise('LoginData');
* @param  => 
* @return => 
*/

public function RagisterAdvertise($type,$args){
    $arr=$GLOBALS['Var_BundlePrototype']->DefaultValue('ajax_output');
    switch($type){

  case 'advertisebasic':
    $advertisement_id= $GLOBALS['Var_Advertisement']->CreateAdvertise($type,$args);



 $arr['response']= $GLOBALS['Var_Advertisement']->ParseAdvertise( $GLOBALS['Var_Advertisement']->RetriveById(array('table'=>'advertise','advertisement_id'=>$advertisement_id)));
 $arr['state']=200;
  break;
  case 'advertiselocationedit':
    $advertisement_id= $GLOBALS['Var_Advertisement']->CreateAdvertise($type,$args);

$arr['response']= $GLOBALS['Var_Advertisement']->ParseAdvertise( $GLOBALS['Var_Advertisement']->RetriveById(array('table'=>'advertise','advertisement_id'=>$advertisement_id)));
$arr['state']=200;
  break;

    }



   return $arr;
}


    
/*
* @description=> get defalult value
* $GLOBALS['Var_Advertisement']->RetriveById(array('table'=>''));
* @param  => 
* @return => 
*/
public function RetriveById($args=array()){
$row=array(); 
    $selectsql='';
  switch($args['table']){
   case 'advertise':
   $selectsql=' SELECT * FROM '.DB_NAME_ADVERTISING.'.advertisement a ,'.DB_NAME_ADVERTISING.'.advertise_text_content b
 WHERE a.advertisement_id='.$args['advertisement_id'].' 
 AND b.advertisement_id=a.advertisement_id
 ';

   break;   

  }

     $row=$GLOBALS['Var_DBMysqli']->query($selectsql); 

 return $row;
}

/*
* @description=> get defalult value
* $GLOBALS['Var_Advertisement']->TableRetrive(array('table'=>''));
* @param  => 
* @return => 
*/
public function TableRetrive($args=array()){
      $result=array();
$numsql=$selectsql='';
         switch($args['table']){
        case 'Advertisement':
$FROM=' '.DB_NAME_ADVERTISING.'.advertisement a ,'.DB_NAME_ADVERTISING.'.advertise_text_content b ';

$WHERE=' a.entity_id='.$args['ActorEntityData']['EntityData']['entity_id'].' 
 AND b.advertisement_id=a.advertisement_id ';

$numsql='SELECT COUNT(*) FROM '.$FROM.'
 WHERE '.$WHERE.'

 ';
 $selectsql='SELECT * FROM '.$FROM.'
 WHERE '.$WHERE.'
 ';
break;      


         }

 $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);




//linit sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';
 $selectsql.=$limit;
//--
//check_response( $total_result);
//check_response($paging_data);
//check_response($selectsql);

   $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;

    return PagingOutPut(array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$result,
          'totalpage'=>$paging_data['total_page'],
          'totalresult'=>$total_result,
          'searchstr'=>$args['search_str'],
          'selectedid'=>$args['selected_id']
             )) ;

}

/*
* @description=> get defalult value
* $GLOBALS['Var_Advertisement']->ParseAdvertise();
* @param  => 
* @return => 
*/
public function ParseAdvertise($Fields,$args=array()){
      $ret=array();

           for($i=0;$i<count($Fields);$i++){
     $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('advertise_text_view');  
     $ret[$i]['adid']=$Fields[$i]['advertisement_id'];
     $ret[$i]['id']=$Fields[$i]['advertisement_id'];
     $ret[$i]['h1']=$Fields[$i]['heading_1'];
     $ret[$i]['h2']=$Fields[$i]['heading_2'];    
     $ret[$i]['url']=$Fields[$i]['url'];  
     $ret[$i]['des']=$Fields[$i]['description'];     
     $ret[$i]['l']=array(array("2",23,"325214"));     
          
     }

     return  $ret;
}




 }

 $GLOBALS['Var_Advertisement'] =new Advertisement();



?>
