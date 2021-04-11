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
 public function Login($args){
     $arr = array('state' =>500,'response' =>'Login false','mistake' =>array('heading'=>'','message'=>array()));   

      // check post 2 => login_identity -check validatation
       $identity_type=email_or_phone($args['login_identity']);
       //--converting emial in htmlentities
       $login_identity_HTML_entities=validate_word('HTML_entities',$args['login_identity']);
      
       if($identity_type!=''){
           
   //checking is $identity_name available or not
  $is_unique= is_unique('accounts','login_identity',$login_identity_HTML_entities);
  
     // check post 3 => login_identity - check avaliablty
   if($is_unique==FALSE){
       //--bussiness code
       $sql='SELECT DISTINCT *
FROM '.DB_NAME.'.accounts a,'.DB_NAME.'.login b
WHERE (a.login_identity ="'.$login_identity_HTML_entities.'" 
       AND
       b.login_identity ="'.$login_identity_HTML_entities.'" 
       )
AND a.login_id=b.login_id
AND a.account_id=b.account_id
LIMIT 1
';

  //-- result query
  $LoginData=$GLOBALS['Var_BundlePrototype']->DefaultValue('LoginData');
  $query = mysqli_query($GLOBALS['Var_conn'],$sql); 
  if( $query ){


  while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC)) {
  $LoginData=$row;
   
}   
  }else{
        var_dump(mysqli_error ($GLOBALS['Var_conn'])  );
  } 
  

   //-->>result query
 
      // check post 4 =>first we  check user is not blocked.
      $currentAttempt= intval($LoginData['attempt']);
      $currentAttempt=( $currentAttempt>0)?($currentAttempt-1):0;
      $is_login_block=TRUE;
      $INTERVAL=1;
     
      //--checking $is_login_block
      if($currentAttempt>0){
          $is_login_block=FALSE;
      }else{
     //-- therre is no any login attept. 
     //-- check for is 5 minute has been passed
       $time_passed=(time()-$LoginData['login_block_time']);
      $NEXT_UNLOCK=(( $INTERVAL*60)-$time_passed);
      if($time_passed>( $INTERVAL*60)){//   5 minutes
          $setAttempt=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'login',array('attempt'),array(5),array('login_id'),array($LoginData['login_id']));
  $is_login_block=FALSE;
      }  
      }
   
     
      //--$is_login_block

      if($is_login_block==FALSE){
       //--set login attemp

$setAttempt=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'login',array('attempt','login_block_time'),array($currentAttempt,time()),array('login_id'),array($LoginData['login_id']));

    $actual_input_length=strlen($args['login_identity'].$args['password']);
      //--check post 5
      if($actual_input_length==$LoginData['actual_input_length']){
    // call to phpass
   
    $hasher = new PasswordHash(9, FALSE);
$hash = $hasher->HashPassword($LoginData['password']);
//--check post 6 
if ($hasher->CheckPassword(md5($args['password']), $hash)) {
    //--now logined--//
$setAttempt=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'login',array('attempt'),array(5),array('login_id'),array($LoginData['login_id']));




 $arr['response']=array('wb'=>$LoginData['account_id'],
                        'wc'=>sha1($LoginData['password']).'0'.md5($LoginData['ajax_password']),
                        'wd'=>$LoginData['ajax_password']
                  );

   $arr['state']=200;
      
   //--now logined--//
}else{
       $arr['mistake']['message'][]='<li>Email or phone or password are not valid.</li>'; 
        $arr['response']='check post 6';   
}



      }else{
         $arr['mistake']['message'][]='<li>Email or phone or password are not valid.</li>';      $arr['response']='check post 5'; 

      }


      }else{
  $arr['mistake']['message'][]='<li>Login is locked. Try again after '. $NEXT_UNLOCK.' seconds.</li><li>You will get only 1 attempt after each '. $INTERVAL.' minutes interval. </li><li>Login will unlocked  after '. $NEXT_UNLOCK.' seconds. </li>'
  ;
   $arr['response']='check post 4';    
      }

       //--bussiness code
   }else{
       $arr['mistake']['message'][]='<li>Email or phone or password are not valid.</li>'; 
      $arr['response']='check post 3';  
   }

       }else{
    $arr['mistake']['message'][]='<li>Valid email address or phone number required.</li>';
    $arr['response']='check post 2'; 
   }


    return $arr; 
 }
 /**
* @description=>Resend_verification_code .
* @param  => 
* @return => 
*/ 
public function Resend_verification_code($args=array()){
 $ActorEntityData= $GLOBALS['Var_ActorEntityData'];

 if( $ActorEntityData['LoginStatus']){
   
 
 //--setting verification_attempt
 
  $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('AccountPrivate');


 //-- removeing html entitys
 $login_identity= validate_word('reverse_HTML_entities',$ActorEntityData['LoginData']['login_identity']);

 // new activation key
 $activation_key=generate_random_string( 6,true ,true ,false, false, false );


  $private_data=True_array_merge($defaultPrivate,array(
   'activation_key' => $activation_key,
	'visitId' =>$ActorEntityData['visit_data']['wd'],
	'verification_attempt' =>5 
    ));
   
 $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'accounts',array('private_data'),array(Makejson($private_data)),array('account_id'),array($ActorEntityData['LoginData']['account_id']));
 
   //--sending account activation code
    $GLOBALS['Var_ExternalNotification']->ResendVerificationCode(array('identity_type'=>$ActorEntityData['LoginData']['identity_type'],
 'login_identity'=>$login_identity,
 'account_activation_key'=>$activation_key
 ));
    
 }

   return array('state' =>200,'response' =>'','mistake' =>array('heading'=>'','message'=>array()));  
   
}
 /**
* @description=>Resend_verification_code .
* @param  => 
* @return => 
*/ 
public function AccountVerification($args=array()){
  $ActorEntityData = $GLOBALS['Var_ActorEntityData'];
    $arr=array('state' =>500,'response' =>'','mistake' =>array('heading'=>'','message'=>array()));  


  $AccountOptions = $ActorEntityData['LoginData']['private_data'];

  $verification_attempt=(intval($AccountOptions['verification_attempt'])>0)?intval($AccountOptions['verification_attempt']):0;

$SetAccountOptions = $GLOBALS['Var_Utility']->SetAccountOptions($ActorEntityData['LoginData']['account_id'],$AccountOptions,'verification_attempt',($verification_attempt-1));

  //check post 1 
  if(  $verification_attempt>0){
       //check post 2
  if($AccountOptions['activation_key']==$args['verification_code']){
      
       $updateOption=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'accounts',array('verified'),array(1),array('account_id'),array($ActorEntityData['LoginData']['account_id']));

$arr['state']=200;

  }else{
      


$arr['mistake']['message'][]='Verification code is not matched.';
  }
  }else{
      //-- sending the new one
      $this->Resend_verification_code();

    $arr['mistake']['message'][]='<li>Current Verification code expired.</li><li>We have sent you new verification code . please use new verification code.</li>';  
  }

  
    
      return   $arr;   
}

/**
* @description=>process the given data .
* @param  => 
* @return => 
*/

public function Suggestion($args=array()){
       $ActorEntityData= $GLOBALS['Var_ActorEntityData'];// stored from sanetize form
    $arr=array('state' =>200,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array()));  
       $word_result=array();
       $selected=$args['selected'];
     
 $args['inputval']=validateSearchWord($args['inputval']);

 if(($args['inputval']!='')&&(strlen($args['inputval'])>=3)){
  
    switch($args['suggest']){
       case 'storecategory':
       
     $sql='
       SELECT DISTINCT option_value
FROM '.DB_NAME.'.wowrol_admin_option
WHERE  option_name = "store_category"
AND 
 ( option_value LIKE "%'.$args['inputval'].'%" ||option_value LIKE "%'.$args['inputval'].'"||option_value LIKE "'.$args['inputval'].'%" )

LIMIT 10
 
      ';

  $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;
 
   for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]['option_value'])){
                    $same=1;
              }
              }
      if($same==0){
           $arr['response'][]=array('li_data'=>array('id'=>$word_result[$i]["option_value"]
                                                         ),
                                      'name'=>$word_result[$i]["option_value"]);
         
      }



}
       break; 
          case 'pincode':
       
  $sql='
       SELECT DISTINCT *
FROM '.DB_NAME.'.all_location
WHERE  
( MATCH (location_name,pincode,Districtname)
    AGAINST ("'.$args['inputval'].'" WITH QUERY EXPANSION))

LIMIT 50
 
      ';

 
 $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;


   for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]["location_id"])){
                    $same=1;
              }
              }
      if($same==0){
            $resut_text=''.$word_result[$i]['pincode'].'-'.$word_result[$i]['location_name'].' '.$word_result[$i]['Districtname'].' '.strtolower($word_result[$i]['Statename']).'';
           $arr['response'][]=array('li_data'=>array('id'=>$word_result[$i]["location_id"]
                                                         ),
                                      'name'=> $resut_text);
         
      }



}
       break; 


case 'category':
   $pieces = explode(" ", $args['inputval']);
          $pieces_sql='';
          if($pieces!=FALSE){
              foreach($pieces as $word){
 if($word!=''){
           $pieces_sql.='|| a.category_name LIKE "%'.$word.'%" ';   
                  }
           

              }
          
        
          }    
  $sql='
       SELECT DISTINCT *
FROM '.DB_NAME.'.store_categories a ,'.DB_NAME.'.page_slug b  
WHERE  
a.entity_id = '. $ActorEntityData['EntityData']['entity_id'].' 
AND (a.category_name LIKE "%'.$args['inputval'].'%"'. $pieces_sql.')
AND  a.deleted =0
AND  CAST(b.object_id As SIGNED) =a.category_id 
 AND  b.object_type ="category"
LIMIT 25
 
      ';

 
 $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;

 for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]["category_id"])){
                    $same=1;
              }
              }
      if($same==0){
            $resut_text=$word_result[$i]['category_name'];
           $arr['response'][]=array('li_data'=>array('id'=>$word_result[$i]["category_id"],
                                      'slug'=>$word_result[$i]["content_slug"]
                                                         ),
                                      'name'=> $resut_text);
         
      }



}


break;
case 'productsuggestion':
      $pieces = explode(" ", $args['inputval']);
          $pieces_sql='';
          if($pieces!=FALSE){
              foreach($pieces as $word){
 if($word!=''){
           $pieces_sql.='|| a.product_name LIKE "%'.$word.'%" ';   
                  }
           

              }
          
        
          }    
  $sql='
       SELECT DISTINCT *
FROM '.DB_NAME.'.store_products a,'.DB_NAME.'.page_slug b  
WHERE  
a.entity_id = '. $ActorEntityData['EntityData']['entity_id'].' 
AND (a.product_name LIKE "%'.$args['inputval'].'%"'. $pieces_sql.')
AND  a.deleted =0
AND  CAST(b.object_id As SIGNED) =a.product_id
AND  b.object_type ="product" 
LIMIT 25
 
      ';

 
 $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;


   for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]["product_id"])){
                    $same=1;
              }
              }
      if($same==0){
            $resut_text=''.$word_result[$i]['product_name'].'';
           $arr['response'][]=array('li_data'=>array('id'=>$word_result[$i]["product_id"],
                                      'slug'=>$word_result[$i]["content_slug"]
                                                
                                                         ),
                                      'name'=> $resut_text);
         
      }



}
       break; 
     case 'shippinglocations':

  $SavedLocationSql='SELECT a.locations  FROM '.DB_NAME.'.store_shipping a 
 WHERE a.entity_id='.$ActorEntityData['EntityData']['entity_id'].'
  AND  a.deleted =0';     
  $SavedLocationArr=$GLOBALS['Var_DBMysqli']->query($SavedLocationSql); 
  $SavedLocation=array();
  foreach($SavedLocationArr as $value){
       $SavedLocation[]=$value['locations'];
  }
  $SavedLocationStr='"'.implode('","', $SavedLocation ).'"';
  $sql='
       SELECT DISTINCT *
FROM '.DB_NAME.'.all_location
WHERE  
( MATCH (location_name,pincode,Districtname)
    AGAINST ("'.$args['inputval'].'" WITH QUERY EXPANSION))
AND location_id NOT IN ('.  $SavedLocationStr.')
 
LIMIT 25
 
      ';
//check_response($sql);
// check_response($SavedLocationSql);
 
 $word_result=$GLOBALS['Var_DBMysqli']->query($sql);;


   for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]["location_id"])){
                    $same=1;
              }
              }
      if($same==0){
            $resut_text=''.$word_result[$i]['pincode'].'-'.$word_result[$i]['location_name'].' '.$word_result[$i]['Districtname'].' '.$word_result[$i]['Statename'].'';
           $arr['response'][]=array('li_data'=>array('id'=>$word_result[$i]["location_id"]
                                                         ),
                                      'name'=> $resut_text);
         
      }



}
       break; 
case 'buyerfriend':
 $EntityInformation= new EntityInformation($ActorEntityData['EntityData']['entity_id'],$ActorEntityData['EntityData']['entity_id']);

 
 $Retrive=$EntityInformation->FrontUserRelatives(array('type'=>'Freinds','pagesize'=>25,'paged'=>1,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>$args['inputval']));

  $word_result=$Retrive['result'];
   for($i=0;$i<count($word_result);$i++){
  
        $same=0;
            for($f=0;$f<count($selected);$f++){
                      


              if($selected[$f]==validate_word('url_chars',$word_result[$i]["entity_id"])){
                    $same=1;
              }
              }
      if($same==0){
 $EntityStripdata=$GLOBALS['Var_ViewParse']->EntityStripdata($word_result[$i]);
  $EntityStripdata['af']=$EntityInformation->afHashFormEntityRow($word_result[$i]);
            $resut_text=$EntityStripdata['entityName'];
           $arr['response'][]=array('li_data'=>$EntityStripdata,
                                      'name'=> $resut_text);
         
      }



}
break;
         




    }
    }

return $arr;
}

/**
* @description=>update the relation
* @param  => 
* @return => 
*/

public function updateRelation($args){
    $arr=array('state' =>500,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array()));  
 $ActorEntityData=$GLOBALS['Var_ActorEntityData'];    
 $EntityInformation = new EntityInformation($args['feid'],$ActorEntityData['EntityData']['entity_id']);

  $af= $EntityInformation->afHash();

 if($af==$args['af']){//af ==af
        $EntityInformation->updateRelation($args); 
        $arr['state']=200;
         $arr['response']=$EntityInformation->RelationData($args['r']);//r== type
 }


 return  $arr;
}

/**
* @description=>update the relation
* @param  => 
* @return => 
*/

public function paging($args){
       $arr=array('state' =>500,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array()));  
$ActorEntityData=$GLOBALS['Var_ActorEntityData'];  
  $pagesize=intval($args['pagesize']);
  $totalpage=intval($args['totalpage']);     
  $paged=intval($args['paged']);             
       

  switch($args['name']){
  case 'spread':
  $acm =GetPropertyInArray('acm',$args['info']);
  //--inner acessmode switch
  switch($acm){
  case 'hp'://home page
  //--inner acessmode switch
  if($GLOBALS['Var_LoginStatus']){

$RetriveSpread=  $GLOBALS['Var_Spread']->RetriveSpreadByActivity(array('acm'=>'hp','pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'spread_id'=>'','comment_id'=>''));  
//$RetriveSpread['result']= $GLOBALS['Var_Spread']->ParseSpreadContent($RetriveSpread['result']);



$arr['response']=$RetriveSpread;
$arr['state']=500;
  
 }

    

  // inner acess mode switch
  break;
  case 'pp':
$args['frontuser_entity_id']=GetPropertyInArray('eid',$args['info'],'','numericID');
 if($GLOBALS['Var_UtilityCheck']->IsValidEntity($args['frontuser_entity_id'])){
  $RetriveSpread=  $GLOBALS['Var_Spread']->RetriveSpread(array('acm'=>'pp','pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$args['frontuser_entity_id'],'spread_id'=>'','comment_id'=>''));  
$RetriveSpread['result']= $GLOBALS['Var_Spread']->ParseSpreadContent($RetriveSpread['result']);



$arr['response']=$RetriveSpread;
$arr['state']=200;
 }
  break;



   
      

  }
    
   
  // inner acess mode switch
  break;
 case 'spreadcomment':
   $spread_id =GetPropertyInArray('sid',$args['info'],'','numericID');
if($spread_id!=0&&$spread_id!=''){
     $spread_row=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(
  array('type'=>'validspread_id',
 'spread_id'=>$spread_id
   ));
  if($spread_row!=NULL){ 
    
 $args['spread_row']=$spread_row;

          }


 }else{
      $args['spread_row']=NULL;
 }
   if($GLOBALS['Var_LoginStatus']&&$args['spread_row']!=NULL){

$RetriveSpread=  $GLOBALS['Var_Spread']->RetriveComment(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'spread_id'=> $spread_id,'selected_id'=>'','spread_row'=>$args['spread_row']));  
$RetriveSpread['result']= $GLOBALS['Var_Spread']->ParseComment($RetriveSpread['result']);



$arr['response']=$RetriveSpread;
$arr['state']=200;
  
 }

 break;   
  case 'spreadViewReaction':
   $spread_id =GetPropertyInArray('sid',$args['info'],'','numericID');

   if($GLOBALS['Var_LoginStatus']){

$RetriveSpread=  $GLOBALS['Var_Spread']->ViewReactionAcotor(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'spread_id'=> $spread_id,'selected_id'=>''));  

$RetriveSpread['result']= $GLOBALS['Var_ViewParse']->EntityCardData($RetriveSpread['result']);



$arr['response']=$RetriveSpread;
$arr['state']=200;
  
 }

 break;  


  case 'dashboard':
 $AppId =GetPropertyInArray('AppId',$args['info']);
 // inner AppId  switch
 switch($AppId){

case 'dashboard_categories':

  if($GLOBALS['Var_LoginStatus']){
   $Retrive=  $GLOBALS['Var_StoreDashboard']->TableRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>$args['search_str'],'table'=>'store_categories'));  
     
 $Retrive['result']=$GLOBALS['Var_StoreDashboard']->ParseCategory($Retrive['result']);


$arr['response']=$Retrive;
$arr['state']=200;
  }


break;     
case 'storestaff':
if($GLOBALS['Var_LoginStatus']&&$ActorEntityData['IsOwner']){
     $Retrive=  $GLOBALS['Var_StoreDashboard']->TableRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>'','table'=>'store_staff'));  
     
 $Retrive['result']=$GLOBALS['Var_StoreDashboard']->ParseStaff($Retrive['result']);


$arr['response']=$Retrive;
$arr['state']=200; 



}

break; 
case 'dashboard_shipping':
if($GLOBALS['Var_LoginStatus']&&$ActorEntityData['IsOwner']){
     $Retrive=  $GLOBALS['Var_StoreDashboard']->TableRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>'','table'=>'store_shipping'));  
     
$Retrive['result']=$GLOBALS['Var_StoreDashboard']->ParseShipping($Retrive['result']);


$arr['response']=$Retrive;
$arr['state']=200; 
  
 
   
 }




  
  break; 
  case 'dashboard_products':
if($GLOBALS['Var_LoginStatus']&&$ActorEntityData['IsOwner']){
     $Retrive=  $GLOBALS['Var_StoreDashboard']->TableRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>'','table'=>'store_products'));  
     
 $Retrive['result']=$GLOBALS['Var_StoreDashboard']->ParseProducts($Retrive['result']);


$arr['response']=$Retrive;
$arr['state']=200; 


}

break;     

case 'dashboard_orders':
 $mainFilter =GetPropertyInArray('Mfiatr',$args['info'],array(),'alphanumericHTML_entities');
   $ActiveFilter =GetPropertyInArray('Afiatr',$args['info'],array(),'alphanumericHTML_entities');

if($GLOBALS['Var_LoginStatus']&&$ActorEntityData['IsOwner']){

       $Retrive=  $GLOBALS['Var_StoreDashboard']->OrderRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>'','table'=>'dashboard_orders','ActiveFilter'=>$ActiveFilter,'mainFilter'=>$mainFilter));  
     
$Retrive['result']= $GLOBALS['Var_StoreDashboard']->ParseOrders($Retrive['result']);


$arr['response']=$Retrive;
$arr['state']=200;   

}
break;



  }// inner AppId  switch dashboard
  break;

  case 'categoryListing':
   $cid =GetPropertyInArray('cid',$args['info'],'','numericID');
 $category_row =  $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validCategory','category_id'=>$cid));
 if($category_row!=NULL){
       $storeOutput=new StoreOutput($category_row['entity_id']);

    $Sort =GetPropertyInArray('Sort',$args['info'],'','numericID');
  $ActiveFilter =GetPropertyInArray('Afiatr',$args['info'],array(),'alphanumericHTML_entities');
  $customFilter =GetPropertyInArray('Cfiatr',$args['info'],array(),'alphanumericHTML_entities');
  $mainFilter =GetPropertyInArray('Mfiatr',$args['info'],array(),'alphanumericHTML_entities');

 $Retrive= $storeOutput->GetCategoryListing(array('cid'=>$cid,'pagesize'=>$pagesize,'paged'=>$paged,'selected_id'=>'','search_str'=>$args['search_str'],'Sort'=>'store_categories','ActiveFilter'=>$ActiveFilter,'customFilter'=>$customFilter,'mainFilter'=>$mainFilter,'entity_id'=>$category_row['entity_id']));  
     
  $Retrive['result']= $storeOutput->ParseProductInfo($Retrive['result']);


$arr['response']=$Retrive;
$arr['state']=200;  
 }
 

  break;

  case 'checkInChat':
  
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['checkin_id']=GetPropertyInArray('checkIn_id',$args['info'],'','numericID');
  $args['checkIn_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validcheckin_id','checkIn_id'=>$args['checkin_id']));

   if($args['checkIn_row']!=NULL){
    
  $storeOutput=new StoreOutput( $args['checkIn_row']['store_id']);
 $members= $storeOutput->GetCheckInMember($args['checkIn_row']);

 $args['role']=$storeOutput->GetEntityRole( $members);     
   if( $args['role']!=='unvalid'){

      
 $Retrive= $storeOutput->RetriveCheckInChat(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'checkin_id'=>$args['checkin_id'],'checkin_row'=>$args['checkIn_row'],'selected_id'=>'','search_str'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id']));  

     
  $Retrive['result']= $storeOutput->ParseCheckInChat($Retrive['result'],array('checkIn_row'=>$args['checkIn_row'],
 'entity_id'=>$ActorEntityData['EntityData']['entity_id']));
 $arr['response']=$Retrive;
 $arr['state']=200;
 }  
       
   }


   break;

  case 'StoreCheckInList':
 $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['store_id']=GetPropertyInArray('store_id',$args['info'],'','numericID');
 
 if($GLOBALS['Var_UtilityCheck']->IsValidEntity($args['store_id'])){
   $storeOutput=new StoreOutput($args['store_id']);

         
 $Retrive= $storeOutput->GetActiveCheckinAtStore(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id']));  

   $Retrive['result']= $storeOutput->ParseActiveCheckinAtStore($Retrive['result']);

 $arr['response']=$Retrive;
 $arr['state']=200;
 }

   break;


   case 'buyerCheckInList':
 $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['type']=GetPropertyInArray('type',$args['info'],'','numericID');
 $args['type']= Valided_ENUM($args['type'],array(0,1,2),0);
   if($GLOBALS['Var_LoginStatus']){
       
$Retrive=  $GLOBALS['Var_ProfileOutput']->buyerCheckInList(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'type'=> $args['type'])); 

 $Retrive['result']= $GLOBALS['Var_ViewParse']->ParseChecInForList($Retrive['result']);

  $arr['response']=$Retrive;
 $arr['state']=200;

   }



   break;


   case 'ProfieTabViewer':
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['tab']=GetPropertyInArray('tab',$args['info']);
$args['frontuser_entity_id']=GetPropertyInArray('eid',$args['info'],'','numericID');
 if($GLOBALS['Var_UtilityCheck']->IsValidEntity($args['frontuser_entity_id'])){

    $EntityInformation= new EntityInformation($args['frontuser_entity_id'],$args['ActorEntityData']['EntityData']['entity_id']);
$Retrive=array();
switch($args['tab']){

case 'friends':
 $Retrive=$EntityInformation->FrontUserRelatives(array('type'=>'Freinds','pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>''));

break;   
case 'followers':
 $Retrive=$EntityInformation->FrontUserRelatives(array('type'=>'Followers','pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>''));

break;  
case 'followings':
 $Retrive=$EntityInformation->FrontUserRelatives(array('type'=>'Followers','pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>''));

break;  
case 'favoritestores':
 $Retrive=$EntityInformation->FrontUserRelatives(array('type'=>'Favoritestores','pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>''));

break;
case 'favoriters':
 $Retrive=$EntityInformation->FrontUserRelatives(array('type'=>'Favoriters','pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>''));

break; 
case 'store':

$storeOutput=new StoreOutput($args['frontuser_entity_id']);
$Retrive=array(
     'paged'=>1,
     'pagesize'=>1,
     'result'=>array(),
     'totalpage'=>1,
     'searchstr'=>'',
     'selectedid'=>''
);
$Retrive['result']['pdata']=  $storeOutput->GetCategoryBox(array('EntityData'=>$EntityInformation->frontuser_EntityRow));
$Retrive['result']['cdata']=$GLOBALS['Var_StoreDashboard']->GetCategoryBox(array('EntityData'=>$EntityInformation->frontuser_EntityRow));

break;     
}

if($args['tab']!='store'&&$args['tab']!='Store'){
  $Retrive['result']=$GLOBALS['Var_ViewParse']->EntityCardDataByEntityRow($Retrive['result'],$EntityInformation->actoruser_EntityRow);
}

  $arr['response']=$Retrive;
 $arr['state']=200;

 }


   break;

case 'search':
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['IsSearch']=GetPropertyInArray('tab',$args['info'],'','numericID');
$args['store_entity_id']=GetPropertyInArray('seid',$args['info'],'','numericID');
$args['tab']=GetPropertyInArray('tab',$args['info']);
$args['tab']=Valided_ENUM($args['tab'],array('store','product','location_store','people','selltagstore','sellfavstore','incurrentstore'),'store');

$Retrive=  $GLOBALS['Var_Search']->DoSearch(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=> $args['search_str'],'store_entity_id'=>$args['store_entity_id'],'tab'=>$args['tab'],'IsSearch'=>$args['IsSearch'])); 

 $Retrive['result']=$GLOBALS['Var_Search']->ParseSearchResult($Retrive['result'],$args); 


 $arr['response']=$Retrive;
 $arr['state']=200;

break;

case 'getNotification':
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['tab']=GetPropertyInArray('tab',$args['info']);
$args['tab']=Valided_ENUM($args['tab'],array(0,1),0);

$Retrive=  $GLOBALS['Var_ProfileOutput']->GetNotification(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=> '','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'tab'=>$args['tab'])); 

 $Retrive['result']= $GLOBALS['Var_ProfileOutput']->ParseNotification($Retrive['result'],array());
 

 $arr['response']=$Retrive;
 $arr['state']=200;
break;





}



return  $arr;
}
/**
* @description=>update the relation
* @param  => 
* @return => 
*/
public function StoreStaffLogin($args=array()){
     $arr = array('state' =>500,'response' =>'Login false','mistake' =>array('heading'=>'','message'=>array())); 
    $ActorEntityData=$GLOBALS['Var_ActorEntityData'];  
    $Slug_information = $GLOBALS['Var_PageSlug']->Slug_information($args['store_url_address']) ;
     
    if($Slug_information['status']==200&&(!$GLOBALS['Var_LoginStatus'])){
      
      $EntityInformation= new EntityInformation($Slug_information['data']['entity_id'],$ActorEntityData['EntityData']['entity_id']);
      $EntityRow=$EntityInformation->frontuser_EntityRow;   

      //checkPost 1
 
if( $EntityRow['private_data']['staffHash']==$args['storestaffhash']){
    
    //check post2
 $isAvaible= $GLOBALS['Var_DBMysqli']->numquery('SELECT COUNT(*) FROM '.DB_NAME.'.store_staff  WHERE store_id='.$EntityRow['entity_id'].' 
 AND username="'.$args['username'].'"
 
 ');
 if($isAvaible>0){
 $staffrow=  $GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'store_staff',array('store_id','username'),array($EntityRow['entity_id'],$args['username']));

  $defaultpublicdata=$GLOBALS['Var_BundlePrototype']->DefaultValue('storeStaff');
 $staffrow['public_data']=JsonTrueDecode($staffrow['public_data'],$defaultpublicdata);
 //check post 3
  $currentAttempt= intval($staffrow['public_data']['loginattemp']);
  $currentAttempt=( $currentAttempt>0)?($currentAttempt-1):0;
    $is_login_block=TRUE;
      $INTERVAL=1;

   //--checking $is_login_block
      if($currentAttempt>0){
          $is_login_block=FALSE;
      }else{
     //-- therre is no any login attept. 
     //-- check for is 5 minute has been passed
       $time_passed=(time()-$staffrow['public_data']['login_block_time']);
      $NEXT_UNLOCK=(( $INTERVAL*60)-$time_passed);
      if($time_passed>( $INTERVAL*60)){//   5 minutes
        $currentAttempt=5;
  $is_login_block=FALSE;
      }  
      }

 //--$is_login_block

      if($is_login_block==FALSE){
 // call to phpass
   
    $hasher = new PasswordHash(9, FALSE);
$hash = $hasher->HashPassword($staffrow['password']);
//--check post 4 
if ($hasher->CheckPassword(md5($args['password']), $hash)) {
    //--now logined--//

     $arr['response']=array('wa'=>$EntityRow['entity_id'],
                            'wb'=>$EntityRow['account_id'],
                        'wc'=>'0'.sha1($staffrow['password']).'0'.md5($EntityRow['private_data']['staffHash']),
                        'wd'=>$staffrow['public_data']['visitId'],
                        'wj'=>$staffrow['store_staff_id']
                  );

   $arr['state']=200;

}else{//is_login_block==FALSE
    $arr['mistake']['message'][]='<li>Valid credential  required.</li>';
    $arr['response']='check post 4'; 
   }


      }else{//is_login_block==FALSE
    $arr['mistake']['message'][]='<li>Valid credential  required.</li>';
    $arr['response']='check post 3'; 
   }

 }else{
    $arr['mistake']['message'][]='<li>Valid credential  required.</li>';
    $arr['response']='check post 2'; 
   }







    }else{
    $arr['mistake']['message'][]='<li>Valid credential  required.</li>';
    $arr['response']='check post 1'; 
   }
     

    }else{
    $arr['mistake']['message'][]='<li>Valid credential  required.</li>';
    $arr['response']='check post 0'; 
   }




  
    return $arr;
}
//-------===glRail====------------
/**
* @description=>update the glrail
* @param  => 
* @return => 
*/
public function GLrail($args=array()){
     $arr = array('state' =>500,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array()));  $result=array('state' =>500,'response' =>"");
    $ActorEntityData=$GLOBALS['Var_ActorEntityData'];    
   $RawData= $args['Rawdata'];

    for($i=0;$i<count($RawData);$i++){
$channalName= GetPropertyInArray('name',$RawData[$i],'','alphanumeric');

switch($channalName){
case 'checkinchat':
$checin_id= GetPropertyInArray('checin_id',$RawData[$i]['init'],'','numericID');
 if($checin_id!=''){
  $checkIn_row=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validcheckin_id','checkIn_id'=>$checin_id));  
  if( $checkIn_row!=NULL){
     $storeOutput=new StoreOutput( $checkIn_row['store_id']);
 $members= $storeOutput->GetCheckInMember($checkIn_row);  
  $role=$storeOutput->GetEntityRole($members);

  if($role!=='unvalid'){
      $pointTime=$storeOutput->LastchatcheckTime($checkIn_row);

       $Retrive= $storeOutput->RetriveCheckInChat(array('pagesize'=>20,'paged'=>1,'point_time'=>$pointTime,'mode'=>1,'checkin_id'=>$checkIn_row['checkIn_id'],'checkin_row'=>$checkIn_row,'selected_id'=>'','search_str'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id']));  

     
  $Retrive['result']= $storeOutput->ParseCheckInChat($Retrive['result'],array('checkIn_row'=>$checkIn_row,'entity_id'=>$ActorEntityData['EntityData']['entity_id']));


 $result['state']=200;

$result['response']=$Retrive;

  }



  }





 }



break;     
     
     
        
    }   



$arr['response'][$i]=$result;
     }
   
$arr['state']=200;

    return $arr;
}

//-------===checkin====------------
/**
* @description=>buyercheckdelivery
* @param  => 
* @return => 
*/
 public function buyercheckdelivery($args=array()){
        $arr = array('state' =>500,'response' =>'Login false','mistake' =>array('heading'=>'','message'=>array())); 
    $ActorEntityData=$GLOBALS['Var_ActorEntityData']; 
 if($GLOBALS['Var_LoginStatus']){
 $GLOBALS['Var_Update']->Entity_Setting('buyerchangepincode',array('location_id'=>$args['location_id']));

$storeOutput=new StoreOutput($args['storeslugdata']['entity_id']);
   $arr['response']= $storeOutput->GetStoreBrowsingData();
 $arr['state']=200;
 
 }
 return $arr;
 }
/**
* @description=>buyercheckdelivery
* @param  => 
* @return => 
*/
public function LoadCheckInProducts($args=array()){
       $arr = array('state' =>500,'response' =>array(),'mistake' =>array('heading'=>'','message'=>$args)); 
      
      switch($args['type']){
     case 0:
  $arr['response'] =$GLOBALS['Var_StoreDashboard']->ParseProducts($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_productsByIdArray','product_id'=>$args['ids'],'entity_id'=>$args['Store_id'])));
  $arr['state']=200;
     break;
    case 1:
      $arr['response'] =$GLOBALS['Var_StoreDashboard']->ParseProducts($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_productsByVarientIdArray','varient_id'=>$args['ids'],'entity_id'=>$args['Store_id'])));
  $arr['state']=200;
     break;      
      } 
       
       
       
return   $arr;
}


//-------===checkin====------------
//-------===delete====------------
/**
* @description=>update the relation
* @param  => 
* @return => 
*/
public function deleteing($args){
       $arr=array('state' =>500,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array())); 

       switch($args['AppId']){
           
case 'dashboard_categories':
 $arr=  $GLOBALS['Var_StoreDashboard']->Deleting($args);
break;

       }







       return $arr;
}


//-------===delete====------------


}

$GLOBALS['Var_ProcessData'] =new ProcessData();


?>