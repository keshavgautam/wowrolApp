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
  $is_unique= is_unique('account_login_identity','login_identity',$login_identity_HTML_entities);
  
     // check post 3 => login_identity - check avaliablty
   if($is_unique==FALSE){
       //--bussiness code
       $sql='SELECT DISTINCT *
FROM  '.DB_NAME.'.account_login_identity a ,'.DB_NAME.'.accounts b,'.DB_NAME.'.login c
WHERE a.login_identity ="'.$login_identity_HTML_entities.'" 
AND a.account_id=b.account_id
AND b.login_id=c.login_id
LIMIT 1
';

  //-- result query
  $LoginData=$GLOBALS['Var_BundlePrototype']->DefaultValue('LoginData');
 
$Login_row=   $GLOBALS['Var_DBMysqli']->query($sql);
if(count($Login_row)>0){  $LoginData=$Login_row[0];   }


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


    $Session_DATA =$GLOBALS['Var_Enter']->CreateLoginSession($LoginData);



 $arr['response']=array('wb'=>$LoginData['account_id'],
                        'wc'=> $Session_DATA['password'],
                        'wd'=>  $Session_DATA['session_id']
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
 $activation_key=generate_random_string( 6,true ,false ,false, false, false );


  $private_data=True_array_merge($defaultPrivate,array(
   'activation_key' => $activation_key,
	'visitId' =>$ActorEntityData['visit_data']['wd'],
	'verification_attempt' =>5 
    ));
   
 $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'account_login_identity',array('private_data'),array(Makejson($private_data)),array('login_identity_id'),array($ActorEntityData['LoginData']['login_identity_id']));
 
   //--sending account activation code
    $GLOBALS['Var_ExternalNotification']->ResendVerificationCode(array('identity_type'=>$ActorEntityData['LoginData']['identity_type'],
 'login_identity'=>$login_identity,
 'account_activation_key'=>$activation_key
 ));
    
  $GLOBALS['Var_Enter']->UpdateSessionData($ActorEntityData['visit_data']['wd'], $ActorEntityData,'LoginPrivateData');

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

$SetAccountOptions = $GLOBALS['Var_Utility']->SetAccountOptions($ActorEntityData['LoginData']['login_identity_id'],$AccountOptions,'verification_attempt',($verification_attempt-1));

  //check post 1 
  if(  $verification_attempt>0){
       //check post 2
  if($AccountOptions['activation_key']==$args['verification_code']){
      
       $updateOption=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'account_login_identity',array('verified'),array(1),array('login_identity_id'),array($ActorEntityData['LoginData']['login_identity_id']));
  $GLOBALS['Var_Enter']->UpdateSessionData($ActorEntityData['visit_data']['wd'], $ActorEntityData,'LoginPrivateData');


$arr['state']=200;

  }else{
      

      
//$arr['mistake']['message'][]=$AccountOptions['activation_key'].' =='.$args['verification_code'];
$arr['mistake']['message'][]='Verification code is not matched .';
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

 if(($args['inputval']!='')&&(strlen($args['inputval'])>=2)){
  
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
         



case 'conversationmember':
 $EntityInformation= new EntityInformation($ActorEntityData['EntityData']['entity_id'],$ActorEntityData['EntityData']['entity_id']);

 
 $Retrive=$EntityInformation->FrontUserRelatives(array('type'=>'ConversationMember','pagesize'=>25,'paged'=>1,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>$args['inputval']));

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

case 'SearchSuggestion':



    $arr['response']=  $GLOBALS['Var_Search']->GetSearchSuggestion(array('search_text'=>$args['inputval'],'entity_id'=>$ActorEntityData['EntityData']['entity_id']));
break;

    }
    }

return $arr;
}
/**
* @description=>process the given data .
* @param  => 
* @return => 
*/
public function SelectBox($args=array()){
    
           
     
  return $GLOBALS['Var_SelectBox']->Suggestion($args);   
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
      $GLOBALS['Var_Update']->UpdateEntityRowByProfileCompleteCheck( $EntityInformation->actoruser_EntityRow,$ActorEntityData['visit_data']['wd']);

        $arr['state']=200;
         $arr['response']=$EntityInformation->RelationData($args['r']);//r== type
 }else{
  $arr['mistake']['message'][]='Token mismatch'; 
  $arr['mistake']['message'][]=$af; 
    $arr['mistake']['message'][]=$args['af'];    
 }


 return  $arr;
}
/**
* @description=>update the relation
* @param  => 
* @return => 
*/
public function updateBlocking($args){
    $arr=array('state' =>500,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array()));  
 $ActorEntityData=$GLOBALS['Var_ActorEntityData'];    
 $EntityInformation = new EntityInformation($args['feid'],$ActorEntityData['EntityData']['entity_id']);

  $af= $EntityInformation->afHash();

 if($af==$args['af']){//af ==af

 if($args['action']==1){
     $EntityInformation->Ragister_Blocking(); 
  $GLOBALS['Var_Update']->  UpdateBlockedEntity( array('action'=>$args['action'],'blocked_entity_id'=>$args['feid'],'entity_row'=>$ActorEntityData['EntityData']));

        $arr['state']=200;
         $arr['response']=$EntityInformation->RelationData('owr');//r== type  
 }
     if($args['action']==0){
     $EntityInformation->Ragister_Unblocking(); 
 $GLOBALS['Var_Update']->  UpdateBlockedEntity( array('action'=>$args['action'],'blocked_entity_id'=>$args['feid'],'entity_row'=>$ActorEntityData['EntityData']));
        $arr['state']=200;
         $arr['response']=$EntityInformation->RelationData('owr');//r== type  
 }  
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
  $selected_id= $args['selected_id'];
  
 $mainFilter =GetPropertyInArray('Mfiatr',$args['info'],array(),'alphanumericHTML_entities');
 $customFilter =GetPropertyInArray('Cfiatr',$args['info'],array(),'alphanumericHTML_entities');
 $ActiveFilter =GetPropertyInArray('Afiatr',$args['info'],array(),'alphanumericHTML_entities');



  switch($args['name']){
  case 'spread':
  $acm =GetPropertyInArray('acm',$args['info']);
  //--inner acessmode switch
  switch($acm){
  case 'hp'://home page
  //--inner acessmode switch
  if($GLOBALS['Var_LoginStatus']){

$RetriveSpread=  $GLOBALS['Var_Spread']->RetriveSpreadByActivity(array('acm'=>'hp','pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'spread_id'=>'','comment_id'=>'','spreadViwer_entity_id'=>$ActorEntityData['EntityData']['entity_id']));  
$RetriveSpread['result']= $GLOBALS['Var_Spread']->ParseSpreadByActivity($RetriveSpread['result']);



$arr['response']=$RetriveSpread;
$arr['state']=200;
  
 }

    

  // inner acess mode switch
  break;
  case 'pp':
$args['frontuser_entity_id']=GetPropertyInArray('eid',$args['info'],'','numericID');
 if($GLOBALS['Var_UtilityCheck']->IsValidEntity($args['frontuser_entity_id'])){
  $RetriveSpread=  $GLOBALS['Var_Spread']->RetriveSpreadByActivity(array('acm'=>'pp','pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$args['frontuser_entity_id'],'spread_id'=>'','comment_id'=>'','spreadViwer_entity_id'=>$ActorEntityData['EntityData']['entity_id']));  
$RetriveSpread['result']= $GLOBALS['Var_Spread']->ParseSpreadByActivity($RetriveSpread['result']);



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

$RetriveSpread=  $GLOBALS['Var_Spread']->RetriveComment(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'spread_id'=> $spread_id,'selected_id'=> $selected_id,'spread_row'=>$args['spread_row']));  
$RetriveSpread['result']= $GLOBALS['Var_Spread']->ParseComment($RetriveSpread['result']);



$arr['response']=$RetriveSpread;
$arr['state']=200;
  
 }

 break;   
  case 'spreadViewReaction':
   $spread_id =GetPropertyInArray('sid',$args['info'],'','numericID');

   if($GLOBALS['Var_LoginStatus']){

$RetriveSpread=  $GLOBALS['Var_Spread']->ViewReactionAcotor(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'spread_id'=> $spread_id,'selected_id'=>$selected_id));  

$RetriveSpread['result']= $GLOBALS['Var_ViewParse']->EntityCardData($RetriveSpread['result']);



$arr['response']=$RetriveSpread;
$arr['state']=200;
  
 }

 break;  


  case 'dashboard':
 $AppId =GetPropertyInArray('AppId',$args['info']);

 // inner AppId  switch
 switch($AppId){
case 'dashboard_companycategories':

  if($GLOBALS['Var_LoginStatus']){
   $Retrive= $GLOBALS['Var_Company_Dashboard']->TableRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>$args['search_str'],'table'=>'store_categories','ActiveFilter'=>$ActiveFilter,'mainFilter'=>$mainFilter,'customFilter'=>$customFilter));  
     
 $Retrive['result']=$GLOBALS['Var_Company_Dashboard']->ParseCategory($Retrive['result'],array('store_EntityData'=>$ActorEntityData));


$arr['response']=$Retrive;
$arr['state']=200;
  }


break; 
case 'dashboard_categories':

  if($GLOBALS['Var_LoginStatus']){
   $Retrive=  $GLOBALS['Var_StoreDashboard']->TableRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>$args['search_str'],'table'=>'store_categories','ActiveFilter'=>$ActiveFilter,'mainFilter'=>$mainFilter,'customFilter'=>$customFilter));  
     
 $Retrive['result']=$GLOBALS['Var_StoreDashboard']->ParseCategory($Retrive['result'],array('store_EntityData'=>$ActorEntityData));


$arr['response']=$Retrive;
$arr['state']=200;
  }


break;     

case 'dashboard_collections':

  if($GLOBALS['Var_LoginStatus']){
   $Retrive=  $GLOBALS['Var_StoreDashboard']->TableRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>$args['search_str'],'table'=>'store_collections','ActiveFilter'=>$ActiveFilter,'mainFilter'=>$mainFilter,'customFilter'=>$customFilter));  
     
 $Retrive['result']=$GLOBALS['Var_StoreDashboard']->ParseCollection($Retrive['result']);


$arr['response']=$Retrive;
$arr['state']=200;
  }


break; 


case 'storestaff':
if($GLOBALS['Var_LoginStatus']&&$ActorEntityData['IsOwner']){
     $Retrive=  $GLOBALS['Var_StoreDashboard']->TableRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>$args['search_str'],'table'=>'store_staff','ActiveFilter'=>$ActiveFilter,'mainFilter'=>$mainFilter,'customFilter'=>$customFilter));  
     
 $Retrive['result']=$GLOBALS['Var_StoreDashboard']->ParseStaff($Retrive['result']);


$arr['response']=$Retrive;
$arr['state']=200; 



}

break; 
case 'dashboard_shipping':
if($GLOBALS['Var_LoginStatus']&&$ActorEntityData['IsOwner']){
     $Retrive=  $GLOBALS['Var_StoreDashboard']->TableRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>$args['search_str'],'shippingZonetype'=>intval($ActorEntityData['EntityData']['private_data']['shippingZonetype']),'table'=>'store_shipping','ActiveFilter'=>$ActiveFilter,'mainFilter'=>$mainFilter,'customFilter'=>$customFilter));  
     
$Retrive['result']=$GLOBALS['Var_StoreDashboard']->ParseShipping($Retrive['result'],array('ActorEntityData'=>$ActorEntityData));


$arr['response']=$Retrive;
$arr['state']=200; 
  
 
   
 }




  
  break; 
  case 'dashboard_products':


if($GLOBALS['Var_LoginStatus']&&$ActorEntityData['IsOwner']){
     $Retrive=  $GLOBALS['Var_StoreDashboard']->TableRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>$args['search_str'],'table'=>'store_products','ActiveFilter'=>$ActiveFilter,'mainFilter'=>$mainFilter,'customFilter'=>$customFilter));  
     
 $Retrive['result']=$GLOBALS['Var_StoreDashboard']->ParseProducts($Retrive['result']);


$arr['response']=$Retrive;
$arr['state']=200; 


}

break;     

case 'dashboard_orders':
 $mainFilter =GetPropertyInArray('Mfiatr',$args['info'],array(),'alphanumericHTML_entities');
 $customFilter =GetPropertyInArray('Cfiatr',$args['info'],array(),'alphanumericHTML_entities');
 $ActiveFilter =GetPropertyInArray('Afiatr',$args['info'],array(),'alphanumericHTML_entities');

if($GLOBALS['Var_LoginStatus']&&$ActorEntityData['IsOwner']){

       $Retrive=  $GLOBALS['Var_StoreDashboard']->OrderRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>$args['search_str'],'table'=>'dashboard_orders','ActiveFilter'=>$ActiveFilter,'mainFilter'=>$mainFilter,'customFilter'=>$customFilter));  
     
$Retrive['result']= $GLOBALS['Var_StoreDashboard']->ParseOrders($Retrive['result'],array('ActorEntityData'=>$ActorEntityData));


$arr['response']=$Retrive;
$arr['state']=200;   

}
break;

case 'dashboard_discounts':

if($GLOBALS['Var_LoginStatus']&&$ActorEntityData['IsOwner']){
     $Retrive=  $GLOBALS['Var_StoreDashboard']->TableRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>$args['search_str'],'table'=>'store_discounts','ActiveFilter'=>$ActiveFilter,'mainFilter'=>$mainFilter,'customFilter'=>$customFilter));  
     
 $Retrive['result']=$GLOBALS['Var_StoreDashboard']->ParseDiscount($Retrive['result'],array('ActorEntityData'=>$ActorEntityData));


$arr['response']=$Retrive;
$arr['state']=200; 


}



break;
case 'dashboard_checkins':
 $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];

 $args['type']=GetPropertyInArray('type',$args['info'],'','numericID');
 $args['type']= Valided_ENUM($args['type'],array(0,1,2,3,4),0);
   if($GLOBALS['Var_LoginStatus']){
       
$Retrive=  $GLOBALS['Var_StoreDashboard']->RetriveCheckInList(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>$args['search_str'],'entity_id'=>$ActorEntityData['EntityData']['entity_id'],'type'=> $args['type'],'ActiveFilter'=>$ActiveFilter,'mainFilter'=>$mainFilter,'customFilter'=>$customFilter)); 

 $Retrive['result']= $GLOBALS['Var_ViewParse']->ParseChecInForList($Retrive['result']);

 $arr['response']=$Retrive;
 $arr['state']=200;

   }



   break;

  case 'dashboard_brands':
   $mainFilter =GetPropertyInArray('Mfiatr',$args['info'],array(),'alphanumericHTML_entities');
 $customFilter =GetPropertyInArray('Cfiatr',$args['info'],array(),'alphanumericHTML_entities');
 $ActiveFilter =GetPropertyInArray('Afiatr',$args['info'],array(),'alphanumericHTML_entities');

if($GLOBALS['Var_LoginStatus']){
     $Retrive=  $GLOBALS['Var_Company_Dashboard']->TableRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>$args['search_str'],'table'=>'company_brand','ActiveFilter'=>$ActiveFilter,'mainFilter'=>$mainFilter,'customFilter'=>$customFilter));  
     
 $Retrive['result']=$GLOBALS['Var_Company_Dashboard']->ParseBrand($Retrive['result']);


$arr['response']=$Retrive;
$arr['state']=200; 


}

break; 

   //Advertizing
case 'dashboard_advertise':
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];

 if($GLOBALS['Var_LoginStatus']){
$Retrive= $GLOBALS['Var_Advertisement']->TableRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','selected_id'=>'','search_str'=>$args['search_str'],'ActorEntityData'=>$args['ActorEntityData'],'table'=>'Advertisement','ActiveFilter'=>$ActiveFilter,'mainFilter'=>$mainFilter,'customFilter'=>$customFilter));  
     
$Retrive['result']=$GLOBALS['Var_Advertisement']->ParseAdvertise($Retrive['result']);



 $arr['response']=$Retrive;
 $arr['state']=200;
 }

break;
//Advertizing


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

 $Retrive= $storeOutput->GetCategoryListing(array('cid'=>$cid,'pagesize'=>$pagesize,'paged'=>$paged,'selected_id'=>'','search_str'=>$args['search_str'],'Sort'=>$Sort,'ActiveFilter'=>$ActiveFilter,'customFilter'=>$customFilter,'mainFilter'=>$mainFilter,'entity_id'=>$category_row['entity_id']));  
     
  $Retrive['result']= $storeOutput->ParseProductInfo($Retrive['result']);


$arr['response']=$Retrive;
$arr['state']=200;  
 }
 

  break;


   //--conversation
   case 'convarstionlist':
 $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
  if($GLOBALS['Var_LoginStatus']){
  $Retrive=$GLOBALS['Var_Conversation']->RetriveConvarstionList(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>$args['search_str'],'entity_id'=>$ActorEntityData['EntityData']['entity_id'])); 

      
  $Retrive['result']= $GLOBALS['Var_Conversation']->ParseConversation2($Retrive['result'],array('ActorEntityData'=>$ActorEntityData));


 $arr['response']=$Retrive;
 $arr['state']=200;
  }
   break;

   case 'message':
 $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['conversation_id']=GetPropertyInArray('cid',$args['info'],'','numericID');
 $error=1;

  if($args['conversation_id']!=''){
     $args['conversation_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validconversation_id','conversation_id'=>$args['conversation_id'],'entity_id'=>$ActorEntityData['EntityData']['entity_id']));
     if( $args['conversation_row']!=NULL){
     if($GLOBALS['Var_Conversation']->IsMemberInConversation($args['conversation_row'])){
         $error--;
     }
     
     }
  }




 if($GLOBALS['Var_LoginStatus']&&$error==0 ){
   $Retrive=$GLOBALS['Var_Conversation']->RetriveConvarstionMessage(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>$args['search_str'],'conversation_id'=> $args['conversation_id'],'conversation_row'=>$args['conversation_row'],'entity_id'=>$ActorEntityData['EntityData']['entity_id'])); 

      
 $Retrive['result']= $GLOBALS['Var_Conversation']->ParseConversationMessage($Retrive['result'],array('ActorEntityData'=>$ActorEntityData,'entity_id'=>$ActorEntityData['EntityData']['entity_id'],'conversation_row'=>$args['conversation_row']));


 $arr['response']=$Retrive;
 $arr['state']=200;
 }
   break;
 //--conversation
 //--checkin
  case 'storecheckinlist':
 $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['store_id']=GetPropertyInArray('store_id',$args['info'],'','numericID');
 
 if($GLOBALS['Var_UtilityCheck']->IsValidEntity($args['store_id'])){
   $storeOutput=new StoreOutput($args['store_id']);

         
 $Retrive= $storeOutput->GetActiveCheckinAtStore(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>$args['search_str'],'entity_id'=>$ActorEntityData['EntityData']['entity_id']));  

 $Retrive['result']= $GLOBALS['Var_ViewParse']->ParseChecInForList($Retrive['result']);

 $arr['response']=$Retrive;
 $arr['state']=200;
 }

   break;


   case 'buyerCheckInList':
 $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['type']=GetPropertyInArray('type',$args['info'],'','numericID');
 $args['type']= Valided_ENUM($args['type'],array(0,1,2),0);
   if($GLOBALS['Var_LoginStatus']){
       
$Retrive=  $GLOBALS['Var_ProfileOutput']->buyerCheckInList(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>$args['search_str'],'entity_id'=>$ActorEntityData['EntityData']['entity_id'],'type'=> $args['type'])); 

 $Retrive['result']= $GLOBALS['Var_ViewParse']->ParseChecInForList($Retrive['result']);

 $arr['response']=$Retrive;
 $arr['state']=200;

   }



   break;


   case 'goOnshoppingcheckinlist':
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];



   if($GLOBALS['Var_LoginStatus']){
    $Retrive=  $GLOBALS['Var_ProfileOutput']->CheckInList(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>$args['search_str'],'entity_id'=>$ActorEntityData['EntityData']['entity_id'])); 

 $Retrive['result']= $GLOBALS['Var_ViewParse']->ParseChecInForList($Retrive['result']);

 $arr['response']=$Retrive;
 $arr['state']=200;   
   }



   break;


   case 'checkInlist':
 $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];

   if($GLOBALS['Var_LoginStatus']){
       
$Retrive=  $GLOBALS['Var_ProfileOutput']->CheckInList(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>$args['search_str'],'entity_id'=>$ActorEntityData['EntityData']['entity_id'])); 

 $Retrive['result']= $GLOBALS['Var_ViewParse']->ParseChecInForList($Retrive['result']);

 $arr['response']=$Retrive;
 $arr['state']=200;

   }



   break;


 //--checkin
   case  (preg_match('/ProfieTab:*/', $args['name']) ? true : false)://commentform

$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['tab']=GetPropertyInArray('tab',$args['info']);
$args['frontuser_entity_id']=GetPropertyInArray('eid',$args['info'],'','numericID');
 if($GLOBALS['Var_UtilityCheck']->IsValidEntity($args['frontuser_entity_id'])){

    $EntityInformation= new EntityInformation($args['frontuser_entity_id'],$args['ActorEntityData']['EntityData']['entity_id']);
 


$Retrive=array();
switch($args['tab']){

case 'friends':
 $Retrive=$EntityInformation->FrontUserRelatives(array('type'=>'Freinds','pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>$args['search_str']));

break;   
case 'followers':
 $Retrive=$EntityInformation->FrontUserRelatives(array('type'=>'Followers','pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>$args['search_str']));

break;  
case 'followings':
 
 $Retrive=$EntityInformation->FrontUserRelatives(array('type'=>'Followings','pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>$args['search_str']));

break;  
case 'favoritestores':
 $Retrive=$EntityInformation->FrontUserRelatives(array('type'=>'Favoritestores','pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>$args['search_str']));

break;
case 'favoriters':
 $Retrive=$EntityInformation->FrontUserRelatives(array('type'=>'Favoriters','pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>$args['search_str']));

break; 
case 'feedback':
$storeOutput=new StoreOutput($args['frontuser_entity_id']);
$Retrive=array(
     'paged'=>1,
     'pagesize'=>1,
     'result'=>array(),
     'totalpage'=>0,
     'searchstr'=>'',
     'selectedid'=>''
);



$Retrive['result']=array(array('id'=>0,'data'=>$storeOutput->GetFeedBackSpread(array('EntityData'=>$EntityInformation->frontuser_EntityRow))));


break;


case 'Store':
case 'store':

$storeOutput=new StoreOutput($args['frontuser_entity_id']);
$Retrive=array(
     'paged'=>1,
     'pagesize'=>1,
     'result'=>array(),
     'totalpage'=>0,
     'searchstr'=>'',
     'selectedid'=>''
);
/*
$Retrive['result']['pdata']=  $storeOutput->GetCategoryBox(array('EntityData'=>$EntityInformation->frontuser_EntityRow));*/
$Retrive['result']=$GLOBALS['Var_StoreDashboard']->GetCategoryBox(array('EntityData'=>$EntityInformation->frontuser_EntityRow));

break;   

case 'info0':

$Retrive=array(
     'paged'=>1,
     'pagesize'=>1,
     'result'=>$EntityInformation->GetProfileInfoData(),
     'totalpage'=>0,
     'searchstr'=>'',
     'selectedid'=>''
);

break; 
case 'info1':

$Retrive=array(
     'paged'=>1,
     'pagesize'=>1,
     'result'=>$EntityInformation->GetProfileInfoData(),
     'totalpage'=>0,
     'searchstr'=>'',
     'selectedid'=>''
);

break; 

case 'all_categories':

 $Retrive= $GLOBALS['Var_StoreDashboard']->TableRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$args['frontuser_entity_id'],'selected_id'=>'','search_str'=>$args['search_str'],'table'=>'all_categories','ActiveFilter'=>$ActiveFilter,'mainFilter'=>$mainFilter,'customFilter'=>$customFilter));  



 $Retrive['result']=$GLOBALS['Var_StoreDashboard']->ParseCategory($Retrive['result'],array('store_EntityData'=>$ActorEntityData));
break;

case 'all_products':

 $Retrive= $GLOBALS['Var_StoreDashboard']->TableRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$args['frontuser_entity_id'],'selected_id'=>'','search_str'=>$args['search_str'],'table'=>'all_products','ActiveFilter'=>$ActiveFilter,'mainFilter'=>$mainFilter,'customFilter'=>$customFilter));  



 $Retrive['result']=$GLOBALS['Var_StoreDashboard']->ParseProducts($Retrive['result'],array('mode'=>'public'));
break;



}

if(in_array($args['tab'], array('friends','followers','followings','favoritestores','favoriters'))){
      $Retrive['result']=$GLOBALS['Var_ViewParse']->EntityCardDataByEntityRow($Retrive['result'],$EntityInformation->actoruser_EntityRow);
}

  $arr['response']=$Retrive;
 $arr['state']=200;

 }


   break;

case  'getblockuserlist':

 if($GLOBALS['Var_LoginStatus']){
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];

 $EntityInformation= new EntityInformation($args['ActorEntityData']['EntityData']['entity_id'],$args['ActorEntityData']['EntityData']['entity_id']);

 $Retrive=$EntityInformation->FrontUserRelatives(array('type'=>'blockedfrontUser','pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>$args['search_str']));
   $Retrive['result']=$GLOBALS['Var_ViewParse']->EntityCardDataByEntityRow($Retrive['result'],$EntityInformation->actoruser_EntityRow);

   $arr['response']=$Retrive;
 $arr['state']=200;
 }
break;

case 'notification':
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['tab']=GetPropertyInArray('tab',$args['info']);
$args['tab']=Valided_ENUM($args['tab'],array(0,1),0);

$Retrive=  $GLOBALS['Var_ProfileOutput']->GetNotification(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=> '','entity_id'=>$args['ActorEntityData'] ['EntityData']['entity_id'],'tab'=>$args['tab'],'ActorEntityData'=>$args['ActorEntityData'])); 

 $Retrive['result']= $GLOBALS['Var_ProfileOutput']->ParseNotification($Retrive['result'],array());
 

 $arr['response']=$Retrive;
 $arr['state']=200;
break;


case 'friendrequest':


  if($GLOBALS['Var_LoginStatus']){
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$Retrive=  $GLOBALS['Var_ProfileOutput']->GetFriendRequest(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=> '','entity_id'=>$ActorEntityData['EntityData']['entity_id'])); 

 $Retrive['result']=$GLOBALS['Var_ViewParse']->EntityCardDataByEntityRow($Retrive['result'],$ActorEntityData['EntityData']);

$arr['response']=$Retrive;
 $arr['state']=200;
  }
break;
case  'suggestfriend':


  if($GLOBALS['Var_LoginStatus']){
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$Retrive=  $GLOBALS['Var_ProfileOutput']->GetPeopleSuggestion(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=> '','entity_id'=>$ActorEntityData['EntityData']['entity_id'])); 

 $Retrive['result']=$GLOBALS['Var_ViewParse']->EntityCardDataByEntityRow($Retrive['result'],$ActorEntityData['EntityData']);

$arr['response']=$Retrive;
 $arr['state']=200;
  }
break;
case  'donefriend':


  if($GLOBALS['Var_LoginStatus']){
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$Retrive=  $GLOBALS['Var_ProfileOutput']->DoneFriendship(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=> '','entity_id'=>$ActorEntityData['EntityData']['entity_id'])); 

 $Retrive['result']=$GLOBALS['Var_ViewParse']->EntityCardDataByEntityRow($Retrive['result'],$ActorEntityData['EntityData']);

$arr['response']=$Retrive;
 $arr['state']=200;
  }
break;



case 'myorders':
if($GLOBALS['Var_LoginStatus']){
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];


$Retrive=  $GLOBALS['Var_ProfileOutput']->GetMyOrders(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=> '','entity_id'=>$ActorEntityData['EntityData']['entity_id'])); 

 $Retrive['result']= $GLOBALS['Var_StoreDashboard']->ParseOrders($Retrive['result'],array('ActorEntityData'=>$ActorEntityData));

$arr['response']=$Retrive;
 $arr['state']=200;
}
break;
case 'myshops':
if($GLOBALS['Var_LoginStatus']){
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];


    $EntityInformation= new EntityInformation($args['ActorEntityData']['EntityData']['entity_id'],$args['ActorEntityData']['EntityData']['entity_id']);
      $Retrive=$EntityInformation->FrontUserRelatives(array('type'=>'Favoritestores','pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=>$args['search_str']));
        $Retrive['result']=$GLOBALS['Var_ViewParse']->EntityCardDataByEntityRow($Retrive['result'],$EntityInformation->actoruser_EntityRow);

$arr['response']=$Retrive;
 $arr['state']=200;
 }
break;
//serach--

case ($args['name']=='searchpagingstore'||$args['name']=='searchpagingproduct'||$args['name']=='searchpagingbrand'||$args['name']=='searchpagingmarket'||$args['name']=='searchpagingpeople'||$args['name']=='searchpagingincurrentstore'||$args['name']=='searchpagingcategory'):
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['IsSearch']=GetPropertyInArray('search',$args['info'],'','numericID');
$args['store_entity_id']=GetPropertyInArray('seid',$args['info'],'','numericID');
$args['location_id']=GetPropertyInArray('lid',$args['info'],0,'numericID');
$args['fl_admin_id']=GetPropertyInArray('fl_id',$args['info'],0,'numericID');
$args['country_id']=GetPropertyInArray('cid',$args['info'],0,'numericID');

$args['tab']=GetPropertyInArray('tab',$args['info']);
$args['tab']=Valided_ENUM($args['tab'],array('store','product','brand','location_store','market','people','selltagstore','sellfavstore','incurrentstore','category'),'store');

  if($args['IsSearch']){
$Retrive=  $GLOBALS['Var_Search']->DoSearch(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=> $args['search_str'],'store_entity_id'=>$args['store_entity_id'],'location_id'=>$args['location_id'],'fl_admin_id'=>$args['fl_admin_id'],'country_id'=>$args['country_id'],'tab'=>$args['tab'],'IsSearch'=>$args['IsSearch'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'])); 

 $Retrive['result']=$GLOBALS['Var_Search']->ParseSearchResult($Retrive['result'],$args); 


 $arr['response']=$Retrive;
 $arr['state']=200;
   }else{
 $arr['response']=PagingOutPut(array());
 $arr['state']=500;  
  }
break;

//search--
//market --
case 'market':
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['location_id']=GetPropertyInArray('market_id',$args['info'],'','numericID');
 $mainFilter =GetPropertyInArray('Mfiatr',$args['info'],array(),'alphanumericHTML_entities');
 $customFilter =GetPropertyInArray('Cfiatr',$args['info'],array(),'alphanumericHTML_entities');
 $ActiveFilter =GetPropertyInArray('Afiatr',$args['info'],array(),'alphanumericHTML_entities');

 
 $error=1; 
  $args['locationInfo']=NULL;
  if($args['location_id']!=''){
  $args['locationInfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_location_id','location_id'=> $args['location_id']));    
  }

 if( $args['locationInfo']==NULL){}else{$error--;}

  if( $error==0){
   $Retrive['marketData']=array();

   
$Retrive=  $GLOBALS['Var_Search']->LoadMarketStors(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>0,'selected_id'=>'','search_str'=> $args['search_str'],'location_id'=>$args['location_id'] ,'ActiveFilter'=>$ActiveFilter,'mainFilter'=>$mainFilter,'customFilter'=>$customFilter)); 

 $Retrive['result']=$GLOBALS['Var_Search']->ParseSearchResult($Retrive['result'],array('tab'=>'store','ActorEntityData'=>$args['ActorEntityData'] )); 
 
//to carry location data
if($Retrive['paged']==2){
    $Retrive['ifo']['marketData']=$GLOBALS['Var_ViewParse']->ParselocationForMarketData(  $args['locationInfo']); 
}

 $arr['response']=$Retrive;
 $arr['state']=200;

  }else{
 $arr['response']=PagingOutPut(array());
 $arr['state']=500;  
  }
  
break;
case 'nearmarket':
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['location_id']=GetPropertyInArray('market_id',$args['info'],'','numericID');
$args['search_str']=GetPropertyInArray('search_str',$args['info'],'','');

$error=1; 
  $args['locationInfo']=NULL;
  if($args['location_id']!=''){
  $args['locationInfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_location_id','location_id'=> $args['location_id']));    
  }

 if( $args['locationInfo']==NULL){}else{$error--;}

  if( $error==0){
   $Retrive['marketData']=array();


$Retrive=  $GLOBALS['Var_StoreDashboard']->TableRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','selected_id'=>'','search_str'=>$args['search_str'],'location_id'=> $args['location_id'],'table'=>'nearmarket','ActiveFilter'=>$ActiveFilter,'mainFilter'=>$mainFilter,'customFilter'=>$customFilter));  
     
$Retrive['result']=$GLOBALS['Var_ViewParse']->ParselocationForMarketData($Retrive['result']);



 $arr['response']=$Retrive;
 $arr['state']=200;

  }else{
 $arr['response']=PagingOutPut(array());
 $arr['state']=500;  
  }
break;


// market --
// my media --
case 'mymedia':
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['type']=GetPropertyInArray('type',$args['info']);
$args['type']=Valided_ENUM($args['type'],array(0),0);
 if($GLOBALS['Var_LoginStatus']){
$Retrive=  $GLOBALS['Var_StoreDashboard']->TableRetrive(array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','selected_id'=>'','search_str'=>$args['search_str'],'ActorEntityData'=>$args['ActorEntityData'],'table'=>'mymedia','ActiveFilter'=>$ActiveFilter,'mainFilter'=>$mainFilter,'customFilter'=>$customFilter));  
     
$Retrive['result']=$GLOBALS['Var_ViewParse']->ParseMadia($Retrive['result']);



 $arr['response']=$Retrive;
 $arr['state']=200;
 }
break;
// my media --





} //End of Main paging switch



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
     $arr = array('state' =>500,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array())); 
      $result=array('state' =>500,'response' =>"");
    $ActorEntityData=$GLOBALS['Var_ActorEntityData'];    
   $RawData= $args['Rawdata'];
 
    for($i=0;$i<count($RawData);$i++){
$channalName= GetPropertyInArray('name',$RawData[$i],'','alphanumeric');

switch($channalName){
   
case 'SBdata':
$checin_id= GetPropertyInArray('cid',$RawData[$i]['init'],'','numericID');
 if($checin_id!=''){
      $checkIn_row=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validcheckin_id','checkIn_id'=>$checin_id,'entity_id'=>$ActorEntityData['EntityData']['entity_id']));  
  if( $checkIn_row!=NULL){
   $storeOutput=new StoreOutput(  $checkIn_row['store_id']);
  $SBData= $storeOutput->GetCheckInBrowsingData( $checkIn_row);

   

 $result['state']=200;

$result['response']=$SBData;

 }

 }
break;     
case 'ActionBarAlert':
 
$result['state']=200;
$result['response']=0;   
break;
case 'notialert':
 
$result['state']=200;
$result['response']=$GLOBALS['Var_ProfileOutput'] ->NumProfileData('new_notification');   
break;

case 'checkinalert':
$result['state']=200;
$result['response']=$GLOBALS['Var_ProfileOutput'] ->NumProfileData('new_checkin_msg');    
break;
case 'msgalert':
$result['state']=200;
$result['response']=$GLOBALS['Var_ProfileOutput'] ->NumProfileData('new_chat_msg');    
break;
case 'orderalert':
$result['state']=200;
$result['response']=$GLOBALS['Var_ProfileOutput'] ->NumProfileData('orderalert');    
break;
case 'reqalert':
$result['state']=200;
$result['response']=$GLOBALS['Var_ProfileOutput'] ->NumProfileData('new_friend_request');    
break;
case 'message':

 $conversation_id=GetPropertyInArray('cid',$RawData[$i]['init'],'','numericID');
 $error=1;

  if($conversation_id!=''){
$conversation_row=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validconversation_cum_checkin_id','conversation_id'=>$conversation_id,'entity_id'=>$ActorEntityData['EntityData']['entity_id']));
    $checkIn_row=  $conversation_row;
 //check_response( $conversation_row);
     if( $conversation_row!=NULL){
//
$conversation_row['conversation_id']=$conversation_row['Conversation_id'];

     if($GLOBALS['Var_Conversation']->IsMemberInConversation($conversation_row)&&$conversation_row['conversation_id']!=NULL){
         $error--;
     }
     
     }



  }




 if($GLOBALS['Var_LoginStatus']&&$error==0 ){
  $pointTime= $GLOBALS['Var_Conversation']-> LastchatcheckTime($conversation_row);
   $Retrive=$GLOBALS['Var_Conversation']->RetriveConvarstionMessage(array('pagesize'=>10,'paged'=>1,'point_time'=> $pointTime,'mode'=>1,'selected_id'=>'','search_str'=>$args['search_str'],'conversation_id'=> $conversation_id,'conversation_row'=>$conversation_row,'entity_id'=>$ActorEntityData['EntityData']['entity_id'])); 

      
 $Retrive['result']= $GLOBALS['Var_Conversation']->ParseConversationMessage($Retrive['result'],array('ActorEntityData'=>$ActorEntityData,'entity_id'=>$ActorEntityData['EntityData']['entity_id'],'conversation_row'=>$conversation_row));


 //--conversation data

$ConversationData= $GLOBALS['Var_Conversation']->ParseConversation3($conversation_row,array('ActorEntityData'=>$ActorEntityData));





 //--
 $SBdata=array();
 if( $conversation_row['conversation_type']==1&&$checkIn_row['checkIn_id']!=NULL){
//---Sbdata
  $storeOutput=new StoreOutput( $checkIn_row['store_id']); 
   $SBdata= $storeOutput->GetCheckInBrowsingData($checkIn_row);
 }




$result['response']= array($Retrive['result'],$ConversationData, $SBdata);
$result['state']=200;
 }
break;
case 'CoverstionListUpdate':
 $Coverstion_ids= Walk_Ways_each($RawData[$i]['init'],'numericID');
 if(count( $Coverstion_ids)>0){
   
 $result['response']=  $GLOBALS['Var_Conversation']->RetriveCoverstionListUpdate(array('Coverstion_ids'=> $Coverstion_ids));;
$result['state']=200;


 }


break;


  default: //for not matchig channals
     
   $result['state']=500;

$result['response']=array();      
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

/**
* @description=>buyercheckdelivery
* @param  => 
* @return => 
*/
public function LoadEntities($args=array()){
    $arr = array('state' =>200,'response' =>array(),'mistake' =>array('heading'=>'','message'=>$args)); 

 

 $arr['response'] =$GLOBALS['Var_ViewParse']->EntityCardData($args['ids']);



    return $arr;
}
/**
* @description=>buyercheckdelivery
* @param  => 
* @return => 
*/
public function LoadBlockData($args=array()){
     $arr = array('state' =>200,'response' =>array(),'mistake' =>array('heading'=>'','message'=>$args)); 



      switch($args['object']){
          

      }

      return $arr;
}


//-------===checkin====------------
//-------===delete====------------



//-------===delete====------------

//-------===forgetpassword====------------

public function forgetpassword($args){
     $arr=array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));  
switch($args['form']){
    case 0;

    $result=$GLOBALS['Var_Search']->FindAccount(array('search_str'=> $args['accountstr']));

    $arr['response']=$result;
      $arr['state']=200;


    break;
    case 1:
  $SetUpAccountRecovery=$GLOBALS['Var_Enter']->SetUpAccountRecovery($args['account_row']);
    $arr['state']=200;
    $arr['response']=$SetUpAccountRecovery['recovery_access'];
    break;

   case 2:
  $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('AccountPrivate');
 $accountPrivate=JsonTrueDecode($args['account_row']['private_data'], $defaultPrivate) ; 
 //time
 $allowInterval=(intval($accountPrivate['recovery_time'])+(1000*60)>time());
  $matchcode=(md5($accountPrivate['recovery_code'].$accountPrivate['recovery_access'])==md5($args['code'].$args['accesskey']));
  $newToken=md5($accountPrivate['recovery_code'].$accountPrivate['recovery_access'].$accountPrivate['recovery_time']);

 if($allowInterval){
     if($matchcode){
      $arr['state']=200;
    $arr['response']=$newToken;//$SetUpAccountRecovery['recovery_access'];
 }else{
     $arr['mistake']['message'][]='Comfirmation code Not Matched.';
 }
 }else{
     $arr['mistake']['message'][]='Comfirmation code expired.';
 }

 


   
    break;
    case 4:
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('AccountPrivate');
 $accountPrivate=JsonTrueDecode($args['account_row']['private_data'], $defaultPrivate) ; 

 $matchToken=(md5($accountPrivate['recovery_code'].$accountPrivate['recovery_access'].$accountPrivate['recovery_time'])==$args['token']);
$is_new_pass_unique=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'login',array('account_id','password'),array($args['account_row']['account_id'],md5($args['password'])));

if($is_new_pass_unique==0){
 if($matchToken){
     
 $change_password=$GLOBALS['Var_Enter']->ChangePassword($args['account_row'],$args['password']);

 if($change_password){
       $arr['state']=200;  $arr['response']=$args['password'];
 }else{
     $arr['mistake']['message'][]='Unknow error! password not changed.';
 }


 }else{
     $arr['mistake']['message'][]='Token Not matched.';
 }

 }else{$arr['mistake']['message'][]='Password is used. try another';}

 
    break;
}


return $arr;
}



//-------===forgetpassword====------------
}

$GLOBALS['Var_ProcessData'] =new ProcessData();


?>