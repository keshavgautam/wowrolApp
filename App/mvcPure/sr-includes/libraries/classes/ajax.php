<?php
 
class Ajax{
    
/**
* @description=>handle request from ajax methode.
* @param  => 
* @return => 
*/
public function AjaxOutput($Mode=''){
  
    if(isset($_POST['data'])){
  $_POST['data']= Base64DecodeInChunk($_POST['data']);
  
      if(  $_POST['data']!=NULL|| $_POST['data']!=FALSE){
        //--Level-0
     
        switch($Mode){
           case 'pulic':
        
   /* $arr = $this->PublicSanitizeForm();*/
           
           break; 
           default:
    
  $arr = $this->SanitizeForm();

        }

   


       //--Level-0
    }else{
    $arr = array('state' =>500,'response' => '','mistake' =>array('heading'=>'','message'=>''));  
    }   


    }else{
    $arr = array('state' =>500,'response' =>'' ,'mistake' =>array('heading'=>'','message'=>''));  
    }



 
  


    return  OutPutJSONencodeAjax($arr);

}
/**
* @description=>handle request from iframe methode.
* @param  => 
* @return => 
*/
public function IframeOutput($Mode=''){
  
    if(isset($_POST['data'])){
  $_POST['data']= Base64DecodeForIframe($_POST['data']);

      if(  $_POST['data']!=NULL|| $_POST['data']!=FALSE){
        //--Level-0
     
        switch($Mode){
           case 'pulic':
        
   /* $arr = $this->PublicSanitizeForm();*/
           
           break; 
           default:
   
  $arr = $this->SanitizeForm();

        }

   


       //--Level-0
    }else{
    $arr = array('state' =>500,'response' => '','mistake' =>array('heading'=>'','message'=>''));  
    }   


    }else{
    $arr = array('state' =>500,'response' =>'' ,'mistake' =>array('heading'=>'','message'=>''));  
    }





 
  


    return OutPutJSONencodeAjax($arr);

}


/**
* @description=>sanitizefrom data.
* @param  => 
* @return => 
*/

private function SanitizeForm(){
    //Default
 $arr = array('state' =>500,'error' =>0,'response' => $_POST['data'],'mistake' =>array('heading'=>'','message'=>array())); 
 $error=0;   
 if(isset($_POST['data']['form'])){
     
 
 switch($_POST['data']['form']){
   case 'Signup':
  $args=array();
$args['login_identity']=post_vars(array('f_value'=>array('email_or_phone'=>'')),$_POST['data'],'');
$args['password']=post_vars(array('f_value'=>array('password'=>'')),$_POST['data'],'');
$args['confirm_password']=post_vars(array('f_value'=>array('confirm_password'=>'')),$_POST['data'],'');
   //--Error chack
      $error=2; 
   
 if($args['login_identity']==''){ $arr['mistake']['message'][]='email_or_phone is required.';}else{$error--;}
 if($args['password']==''){ $arr['mistake']['message'][]='password is required.';}else{$error--;}

    //--
    if($error==0){
  $arr =  $GLOBALS['Var_Registration']->SignUp($args);

    }

   break;


   case 'login_form':
     $args=array();
$args['login_identity']=post_vars(array('f_value'=>array('login_email_or_phone'=>'')),$_POST['data'],'');
$args['password']=post_vars(array('f_value'=>array('login_password'=>'')),$_POST['data'],'');
$args['Remember_me']=post_vars(array('f_value'=>array('remember_me'=>'off')),$_POST['data'],'');
 //--Error chack
      $error=2; 
   
 if($args['login_identity']==''){ $arr['mistake']['message'][]='email_or_phone is required.';}else{$error--;}
 if($args['password']==''){ $arr['mistake']['message'][]='password is required.';}else{$error--;}

    //--
    if($error==0){
  $arr =  $GLOBALS['Var_ProcessData']->Login($args);

    }
   break;
   //--
     case 'storestafflogin':
     $args=array();
$args['store_url_address']=post_vars(array('f_value'=>array('store_url_address'=>'')),$_POST['data'],'url_chars');
$args['storestaffhash']=post_vars(array('f_value'=>array('storestaffhash'=>'')),$_POST['data'],'');
 $args['username']=post_vars(array('f_value'=>array('username'=>'')),$_POST['data'],'alphanumeric');   

$args['password']=post_vars(array('f_value'=>array('password'=>'')),$_POST['data'],'');

$args['Remember_me']=post_vars(array('f_value'=>array('remember_me'=>'off')),$_POST['data'],'');
 //--Error chack
      $error=4; 
   
 if($args['store_url_address']==''){ $arr['mistake']['message'][]='store_url_address is required.';}else{$error--;}
 if($args['storestaffhash']==''){ $arr['mistake']['message'][]='storestaffhash is required.';}else{$error--;}
  if($args['username']==''){ $arr['mistake']['message'][]='username is required.';}else{$error--;}
 if($args['password']==''){ $arr['mistake']['message'][]='password is required.';}else{$error--;}



    //--
    if($error==0){
  $arr =  $GLOBALS['Var_ProcessData']->StoreStaffLogin($args);

    }
   break;
   //--




   case 'Resend_verification_code':
     $args=array();
 
     $arr =  $GLOBALS['Var_ProcessData']->Resend_verification_code($args);

     break;
   //--



    case 'AccountVerification':
     $args=array();
    $args['verification_code']=post_vars(array('f_value'=>array('verification_code'=>'')),$_POST['data'],'');
     //--Error chack
      $error=1; 
   
 if($args['verification_code']==''){ $arr['mistake']['message'][]='verification_code is required.';}else{$error--;}


    //--
    if($error==0){
         $arr =  $GLOBALS['Var_ProcessData']->AccountVerification($args);
    }
    

     break;
   //--
   case 'suggestion':
       $args=array();
    $args['inputval']=post_vars(array('f_value'=>array('inputval'=>'')),$_POST['data'],'url_chars');
     $args['selected']=(isset($_POST['data']['f_value']['selected']))?Walk_Ways_each($_POST['data']['f_value']['selected'],'url_chars'):array();
     
     $args['suggest']=post_vars(array('f_value'=>array('suggest'=>'')),$_POST['data'],'url_chars');
     //--Error chack
      $error=2; 
   
 if($args['inputval']==''){ $arr['mistake']['message'][]='input is required.';}else{$error--;}
  if($args['suggest']==''){ $arr['mistake']['message'][]='suggestion name is required.';}else{$error--;}

    //--
    if($error==0){
      $arr =  $GLOBALS['Var_ProcessData']->Suggestion($args);
    }
    


    break;
   //--




   //--
  case 'Ragister_Store':


         $args=array();
    $args['Name']=post_vars(array('f_value'=>array('store_name'=>'')),$_POST['data'],'HTML_entities');
    
     $args['store_url_address']=post_vars(array('f_value'=>array('store_url_address'=>'')),$_POST['data'],'url_chars');

     $args['storecategory']=(isset($_POST['data']['f_value']['storecategory']))?Walk_Ways_each($_POST['data']['f_value']['storecategory'],'HTML_entities'):array();

        $args['address']=post_vars(array('f_value'=>array('address'=>'')),$_POST['data'],'HTML_entities');
        $args['location_id']=post_vars(array('f_value'=>array('pincode'=>'')),$_POST['data'],'numericID');
   $args['phone']=post_vars(array('f_value'=>array('phone'=>'')),$_POST['data'],'numericID');
     //--Error chack
      $error=6; 
   
 if($args['Name']==''){ $arr['mistake']['message'][]='store name is required.';}else{$error--;}
  if($args['store_url_address']==''){ $arr['mistake']['message'][]='store url address is required.';}else{$error--;}
    if($args['address']==''){ $arr['mistake']['message'][]='address is required.';}else{$error--;}
   if($args['location_id']==''){ $arr['mistake']['message'][]='pincode is required.';}else{$error--;}
    if($args['phone']==''){ $arr['mistake']['message'][]='phone is required.';}else{$error--;}
    if(is_exist('all_location','location_id',$args['location_id'])!=TRUE){ $arr['mistake']['message'][]='valid pincode is required.';}else{$error--;}
    //--
    if($error==0){
       
   $arr =  $GLOBALS['Var_Registration']->Store($args);
    }
    






    break;
   //--






      //--
  case 'ragisterbuyer':
  $args=array();
      $args['Name']=post_vars(array('f_value'=>array('full_name'=>'')),$_POST['data'],'HTML_entities');
      $args['user_name']=post_vars(array('f_value'=>array('user_name'=>'')),$_POST['data'],'url_chars');   
    $args['sex']=post_vars(array('f_value'=>array('sex'=>'')),$_POST['data'],'alphanumeric'); 
   $args['birthday_Day']=post_vars(array('f_value'=>array('birthday_Day'=>'')),$_POST['data'],'numericID'); 
    $args['birthday_Month']=post_vars(array('f_value'=>array('birthday_Month'=>'')),$_POST['data'],'alphanumeric'); 
   $args['birthday_Year']=post_vars(array('f_value'=>array('birthday_Year'=>'')),$_POST['data'],'numericID'); 

    //--Error chack
      $error=6; 
   
 if( $args['Name']==''){ $arr['mistake']['message'][]='full name is required.';}else{$error--;}
  if($args['user_name']==''){ $arr['mistake']['message'][]='user name is required.';}else{$error--;}
    if($args['sex']==''){ $arr['mistake']['message'][]='sex is required.';}else{$error--;}
   if($args['birthday_Day']==''){ $arr['mistake']['message'][]='Birthday Day is required.';}else{$error--;}
    if($args['birthday_Month']==''){ $arr['mistake']['message'][]='Birthday Month is required.';}else{$error--;}
    if($args['birthday_Year']==''){ $arr['mistake']['message'][]='Birthday Year is required.';}else{$error--;}
    //--
    if($error==0){
 $arr =  $GLOBALS['Var_Registration']->Buyer($args);
    }
    

       break;
   //--




 //-------===setting====------------
   case 'store_setting_0':// setting
 
         $args=array();
  $args['Name']=post_vars(array('f_value'=>array('store_name'=>'')),$_POST['data'],'HTML_entities');
    
  $args['StoreCategory']=(isset($_POST['data']['f_value']['storecategory']))?Walk_Ways_each($_POST['data']['f_value']['storecategory'],'HTML_entities'):array();

        $args['address']=post_vars(array('f_value'=>array('address'=>'')),$_POST['data'],'HTML_entities');
        $args['location_id']=post_vars(array('f_value'=>array('pincode'=>'')),$_POST['data'],'numericID');
   $args['phone']=post_vars(array('f_value'=>array('phone'=>'')),$_POST['data'],'numericID');
     //--Error chack
      $error=5; 
   
 if($args['Name']==''){ $arr['mistake']['message'][]='store name is required.';}else{$error--;}

    if($args['address']==''){ $arr['mistake']['message'][]='address is required.';}else{$error--;}
   if($args['location_id']==''){ $arr['mistake']['message'][]='pincode is required.';}else{$error--;}
    if($args['phone']==''){ $arr['mistake']['message'][]='phone is required.';}else{$error--;}
    if(is_exist('all_location','location_id',$args['location_id'])!=TRUE){ $arr['mistake']['message'][]='valid pincode is required.';}else{$error--;}
    //--
    if($error==0){
       
   $arr = $GLOBALS['Var_Update']->Entity_Setting('store_setting_0',$args);
    }
    


   break;
      case 'store_setting_1':// setting
 
         $args=array();
  $args['currency']=post_vars(array('f_value'=>array('currency'=>'')),$_POST['data'],'alphanumeric');
    $args['unitsystem']=post_vars(array('f_value'=>array('unitsystem'=>'')),$_POST['data'],'alphanumeric');
        $args['weightunit']=post_vars(array('f_value'=>array('weightunit'=>'')),$_POST['data'],'alphanumeric');
 
     //--Error chack
      $error=3; 
   
 if($args['currency']==''){ $arr['mistake']['message'][]='currency is required.';}else{$error--;}

    if($args['unitsystem']==''){ $arr['mistake']['message'][]='unitsystem is required.';}else{$error--;}
   if($args['weightunit']==''){ $arr['mistake']['message'][]='weightunit is required.';}else{$error--;}
  
  
    //--
    if($error==0){
       
   $arr = $GLOBALS['Var_Update']->Entity_Setting('store_setting_1',$args);
    }
    


   break;
       case 'store_setting_2':// setting
 
         $args=array();
  $args['storeterms']=post_vars(array('f_value'=>array('store_term'=>'')),$_POST['data'],'HTML_entities');

 
     //--Error chack
      $error=1; 
   
 if($args['storeterms']==''){ $arr['mistake']['message'][]='Store Term is required.';}else{$error--;}

  
  
  
    //--
    if($error==0){
       
   $arr = $GLOBALS['Var_Update']->Entity_Setting('store_setting_2',$args);
    }
    


   break;
    case 'store_setting_3':// Notification
 
         $args=array();
 $args['value']=post_vars(array('f_value'=>array('value'=>'')),$_POST['data'],'numericID');
 $code = array("nss0", "nss1", "nss2", "nss3", "ns0", "ns1", "ns2");
 $nsvalue = array(0, 1);
 $args['code']=post_vars(array('f_value'=>array('code'=>'')),$_POST['data'],'alphanumeric');
 
     //--Error chack
      $error=2; 
   

 if(in_array($args['code'], $code)){ $arr['mistake']['message'][]='some error.';}else{$error--;}
if(in_array($args['value'], $nsvalue)){ $arr['mistake']['message'][]='some error.';}else{$error--;}  
  
    //--
    if($error==0){
       
   $arr = $GLOBALS['Var_Update']->Entity_Setting('store_setting_3',array($args['code']=>$args['value']));
    }
    


   break;

   case 'store_setting_5':// setting
 
     $args=array();
  $args['staffHash']='';

 
     //--Error chack
      $error=0; 
   


  
  
  
    //--
    if($error==0){
       
   $arr = $GLOBALS['Var_Update']->Entity_Setting('store_setting_5',$args);
    }
    


   break;
   case 'theme':// setting
 
     $args=array();
  $args['theme']=(isset($_POST['data']['f_value']['theme']))?Walk_Ways_each($_POST['data']['f_value']['theme'],'numericID'):array('','');

 
     //--Error chack
      $error=1; 
   


  
   if(count($args['theme'])<0){ $arr['mistake']['message'][]='theme data is required.';}else{$error--;}
  
    //--
    if($error==0){
       
   $arr = $GLOBALS['Var_Update']->Entity_Setting('theme',$args);
    }
    


   break;

  case 'buyersetting_0'://
    $args=array();
 $args['Name']=post_vars(array('f_value'=>array('full_name'=>'')),$_POST['data'],'HTML_entities');
 $args['sex']=post_vars(array('f_value'=>array('sex'=>'')),$_POST['data'],'numericID');
 $birthday_Day=post_vars(array('f_value'=>array('birthday_Day'=>'')),$_POST['data'],'numericID');
 $birthday_Month=post_vars(array('f_value'=>array('birthday_Month'=>'')),$_POST['data'],'alphanumeric');
$birthday_Year=post_vars(array('f_value'=>array('birthday_Year'=>'')),$_POST['data'],'numericID');

   //--Error chack
      $error=5; 

 if($args['Name']==''){ $arr['mistake']['message'][]='full name is required.';}else{$error--;}
  if($args['sex']==''){ $arr['mistake']['message'][]='sex is required.';}else{$error--;}
 if($birthday_Day==''){ $arr['mistake']['message'][]='birthday_Day is required.';}else{$error--;}
 if($birthday_Month==''){ $arr['mistake']['message'][]='birthday_Month is required.';}else{$error--;}
  if($birthday_Year==''){ $arr['mistake']['message'][]='birthday_Year is required.';}else{$error--;}

    if($error==0){
       
$args['birthday']=$birthday_Month.','.$birthday_Day.','.$birthday_Year;

   $arr = $GLOBALS['Var_Update']->Entity_Setting('buyersetting_0',$args);
    }
   break;

case 'buyersetting_1'://
    $args=array();

        $args['address']=post_vars(array('f_value'=>array('address'=>'')),$_POST['data'],'HTML_entities');
        $args['location_id']=post_vars(array('f_value'=>array('pincode'=>'')),$_POST['data'],'numericID');
   $args['phone']=post_vars(array('f_value'=>array('phone'=>'')),$_POST['data'],'numericID');

   //--Error chack
      $error=4; 
  if($args['address']==''){ $arr['mistake']['message'][]='address is required.';}else{$error--;}
   if($args['location_id']==''){ $arr['mistake']['message'][]='pincode is required.';}else{$error--;}
    if($args['phone']==''){ $arr['mistake']['message'][]='phone is required.';}else{$error--;}
    if(is_exist('all_location','location_id',$args['location_id'])!=TRUE){ $arr['mistake']['message'][]='valid pincode is required.';}else{$error--;}

    if($error==0){
       
   $arr = $GLOBALS['Var_Update']->Entity_Setting('buyersetting_1',$args);
    }
   break;
case 'buyersetting_2'://
    $args=array();

        $args['address']=post_vars(array('f_value'=>array('address'=>'')),$_POST['data'],'HTML_entities');
        $args['location_id']=post_vars(array('f_value'=>array('pincode'=>'')),$_POST['data'],'numericID');
   $args['phone']=post_vars(array('f_value'=>array('phone'=>'')),$_POST['data'],'numericID');

   //--Error chack
      $error=4; 
  if($args['address']==''){ $arr['mistake']['message'][]='address is required.';}else{$error--;}
   if($args['location_id']==''){ $arr['mistake']['message'][]='pincode is required.';}else{$error--;}
    if($args['phone']==''){ $arr['mistake']['message'][]='phone is required.';}else{$error--;}
    if(is_exist('all_location','location_id',$args['location_id'])!=TRUE){ $arr['mistake']['message'][]='valid pincode is required.';}else{$error--;}

    if($error==0){
       
   $arr = $GLOBALS['Var_Update']->Entity_Setting('buyersetting_2',$args);
    }
   break;


//-------===setting====------------


//-------===spread====------------
  case 'spreadform':// Notification
 
         $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['spread_text']=post_vars(array('f_value'=>array('spread_text'=>'')),$_POST['data'],'HTML_entities');
  $args['fromreaction']=post_vars(array('f_value'=>array('fromreaction:0'=>'')),$_POST['data'],'numericID');
   $args['privacy']=post_vars(array('f_value'=>array('spreadfromprivacy:0'=>'')),$_POST['data'],'numericID');
   $args['spread_id']=post_vars(array('f_value'=>array('sid'=>0)),$_POST['data'],'numericID');
  $friendTag=(isset($_POST['data']['f_value']['friendTag']))?Walk_Ways_each($_POST['data']['f_value']['friendTag'],'numericID'):array();

  $promoteproduct=(isset($_POST['data']['f_value']['promoteproduct']))?Walk_Ways_each($_POST['data']['f_value']['promoteproduct'],'numericID'):array();
 


     //--Error chack
      $error=4; 
   

 if($args['spread_text']==''){ $arr['mistake']['message'][]='Spread Text is required.';}else{$error--;}
  if($args['fromreaction']==''){ $arr['mistake']['message'][]=' reaction value is required.';}else{$error--;}
   if($args['privacy']==''){ $arr['mistake']['message'][]=' privacy value is required.';}else{$error--;}

 //valid check
 $args['taged_entity']=array();
 foreach(  $friendTag  as $key => $value ){
    
if($GLOBALS['Var_UtilityCheck']->IsValidEntity($value )==TRUE){ 
$args['taged_entity'][]= $value;
}

}
//valid check
$args['attached_object']=array();
 foreach( $promoteproduct  as $key => $value ){
    
if($GLOBALS['Var_UtilityCheck']->IsValidProduct($value, $args['ActorEntityData']['EntityData']['entity_id'] )==TRUE){ 
$args['attached_object'][]= $value;
}

}



// Checking content json processable


 $Makejson_spread_content=   Makejson_0(array('content'=>$args['spread_text']));

 if( $Makejson_spread_content['state']!=200){ $arr['mistake']['message'][]='content unprocessable';}else{$error--;}


 // ckeck ing  valid spread if it is not 0
 if($args['spread_id']!=0&&$args['spread_id']!=''){$error++;
     $spread_row=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(
  array('type'=>'validspreadowner_id',
 'spread_id'=>$args['spread_id'],
  'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'])
   );
  if($spread_row!=NULL){ 
      $error--;
      $args['spread_row']=$spread_row;

          }


 }else{
      $args['spread_row']=NULL;
 }

 
    //--
    if($error==0){
    
   $arr=$GLOBALS['Var_Registration']->EntitySpread($args);

    }
    


   break;



  case  (preg_match('/commentform:*/', $_POST['data']['form']) ? true : false)://commentform
   $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
  $args['comment_text']=post_vars(array('f_value'=>array('commenttext'=>'')),$_POST['data'],'HTML_entities');
  $args['spread_id']=post_vars(array('f_value'=>array('sid'=>'')),$_POST['data'],'numericID');
  $args['comment_id']=post_vars(array('f_value'=>array('cid'=>'')),$_POST['data'],'numericID');
  $args['spread_perpose']=post_vars(array('f_value'=>array('prpo'=>'')),$_POST['data'],'alphanumeric');
    $args['rating_value']=post_vars(array('f_value'=>array('ratingpoint'=>'')),$_POST['data'],'numericID');
 //--Error chack
      $error=5; 
   

 if($args['comment_text']==''){ $arr['mistake']['message'][]='comment text is required.';}else{$error--;}
 if($args['spread_id']==''){ $arr['mistake']['message'][]='Spread id is required.';}else{$error--;}
 if($args['comment_id']==''){ $arr['mistake']['message'][]='comment id is required.';}else{$error--;}

 // Checking content json processable


 $Makejson_comment_content=   Makejson_0(array(array('content'=>$args['comment_text'],'data'=>'')));

  if( $Makejson_comment_content['state']==500){ $arr['mistake']['message'][]='content unprocessable';}else{$error--;}
  //valid spread row
    $args['spread_row']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(
  array('type'=>'validspread_id',
 'spread_id'=>$args['spread_id']
   ));

   if( $args['spread_row']!=null){$error--;}
  //valid comment owner
  if($args['comment_id']!=''&&$args['comment_id']!=0){
      $error++;
       $args['comment_row']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(
  array('type'=>'validownercomment_id',
 'spread_id'=>$args['spread_id'],
 'entity_id'=> $args['ActorEntityData']['EntityData']['entity_id'],
 'comment_id'=>$args['comment_id']
   ));

      if( $args['comment_row']!=null){$error--;}
  }else{
      $args['comment_row']=null;
  }
   



if($error==0){

     $arr=$GLOBALS['Var_Registration']->SpreadComment($args);


 }

  break;

case 'commentdelete':
   $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['action']=post_vars(array('f_value'=>array('action'=>'')),$_POST['data'],'alphanumeric');
 $args['spread_id']=post_vars(array('f_value'=>array('sid'=>'')),$_POST['data'],'numericID');
 $args['comment_id']=post_vars(array('f_value'=>array('cid'=>'')),$_POST['data'],'numericID');

  //--Error chack
      $error=2; 
   


 if($args['spread_id']==''){ $arr['mistake']['message'][]='Spread id is required.';}else{$error--;}
 if($args['comment_id']==''){ $arr['mistake']['message'][]='comment id is required.';}else{$error--;}
       // ckeck ing  valid spread if it is not 0
 if($args['spread_id']!=0&&$args['spread_id']!=''){$error++;
     $spread_row=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(
  array('type'=>'validspread_id',
 'spread_id'=>$args['spread_id']
   ));
  if($spread_row!=NULL){ 
      $error--;
 $args['spread_row']=$spread_row;

          }


 }else{
      $args['spread_row']=NULL;
 }
   //valid comment owner
  if($args['comment_id']!=''&&$args['comment_id']!=0){
      $error++;
   if($args['action']=='r'){
   $args['comment_row']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(
  array('type'=>'validcomment_id',
 'spread_id'=>$args['spread_id'],
 'comment_id'=>$args['comment_id']
   ));
   }
       if($args['action']=='d'){
              $args['comment_row']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(
  array('type'=>'validownercomment_id',
 'spread_id'=>$args['spread_id'],
 'entity_id'=> $args['ActorEntityData']['EntityData']['entity_id'],
 'comment_id'=>$args['comment_id']
   ));
       }
    

      if( $args['comment_row']!=null){$error--;}
  }else{
      $args['comment_row']=null;
  }

 
if($error==0){

     $arr=$GLOBALS['Var_Spread']->ProcessCommentDelete($args);


 }
  $arr['response']= $args;
break;


case 'spreadreaction':
  $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['self']=post_vars(array('f_value'=>array('self'=>'')),$_POST['data'],'numericID');
 $args['spread_id']=post_vars(array('f_value'=>array('sid'=>'')),$_POST['data'],'numericID');
   //--Error chack
      $error=3; 
 if($args['self']==''){ $arr['mistake']['message'][]='action is required.';}else{$error--;}
 if($args['spread_id']==''){ $arr['mistake']['message'][]='spread_id is required.';}else{$error--;}
 if(($args['self']==0||$args['self']==1)){$error--;}

 if($error==0){
 $arr=$GLOBALS['Var_Spread']->ReactionRagister($args);
}

break;


case 'spreaddelete':
  $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['spread_id']=post_vars(array('f_value'=>array('sid'=>'')),$_POST['data'],'numericID');
  $action=post_vars(array('f_value'=>array('action'=>'')),$_POST['data'],'');
  $args['action']= Valided_ENUM($action,array('r','d'),'');
    //--Error chack
   $error=2; 
 if( $args['spread_id']==''){ $arr['mistake']['message'][]='spread_id is required.';}else{$error--;}
 if($args['action']==''){ $arr['mistake']['message'][]='action is required.';}else{$error--;}

 if($args['action']=='d'){
      // ckeck ing  valid spread if it is not 0
 if($args['spread_id']!=0&&$args['spread_id']!=''){$error++;
     $spread_row=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(
  array('type'=>'validspreadowner_id',
 'spread_id'=>$args['spread_id'],
  'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'])
   );
  if($spread_row!=NULL){ 
      $error--;
 $args['spread_row']=$spread_row;

          }


 }else{
      $args['spread_row']=NULL;
 }
 }


 if($error==0){
 $arr=$GLOBALS['Var_Spread']->ProcessSpreadDelete($args);
 
    }


break;

case 'spreadloadbyID':
  $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['spread_id']=post_vars(array('f_value'=>array('sid'=>'')),$_POST['data'],'numericID');
    //--Error chack
   $error=1; 
 if( $args['spread_id']==''){ $arr['mistake']['message'][]='spread_id is required.';}else{$error--;}
  if($error==0){
  $arr['response']=$GLOBALS['Var_Spread']->ParseSpreadContent($GLOBALS['Var_Spread']->RetriveById(array('table'=>'spread','spread_id'=> $args['spread_id'],'entity_id'=> $args['ActorEntityData']['EntityData']['entity_id'])));
  $arr['state']=200;
 
    }

break;




//-------===spread====------------



//-------===relation ====------------

case 'ralation':
 $args['action']=post_vars(array('f_value'=>array('action'=>'')),$_POST['data'],'numericID');
 $args['r']=post_vars(array('f_value'=>array('r'=>'')),$_POST['data'],'alphanumeric');
 $args['aeid']=post_vars(array('f_value'=>array('aeid'=>'')),$_POST['data'],'numericID');
 $args['feid']=post_vars(array('f_value'=>array('feid'=>'')),$_POST['data'],'numericID');
$args['af']=post_vars(array('f_value'=>array('af'=>'')),$_POST['data'],'alphanumeric');
    //--Error chack
      $error=5; 
 if($args['action']==''){ $arr['mistake']['message'][]='action is required.';}else{$error--;}
 if($args['r']==''){ $arr['mistake']['message'][]='r is required.';}else{$error--;}
 if($args['aeid']==''){ $arr['mistake']['message'][]='aeid is required.';}else{
     if(!$GLOBALS['Var_UtilityCheck']->IsValidEntity($args['aeid'])){
          $arr['mistake']['message'][]='valid aeid is required.';
     }else{
       $error--;   
     }
     
    }
 if($args['feid']==''){ $arr['mistake']['message'][]='feid is required.';}else{ 
      if(!$GLOBALS['Var_UtilityCheck']->IsValidEntity($args['aeid'])){
          $arr['mistake']['message'][]='valid feid is required.';
     }else{
       $error--;   
     }
     }
  if($args['af']==''){ $arr['mistake']['message'][]='af is required.';}else{$error--;}

    //--
    if($error==0){
       
  $arr=$GLOBALS['Var_ProcessData']->updateRelation($args);
 

    }

break;

//-------===relation====------------

//-------===paging====------------
case 'paging':
 $args['name']=post_vars(array('f_value'=>array('name'=>'')),$_POST['data'],'alphanumeric');
  $args['search_str']=post_vars(array('f_value'=>array('sstr'=>'')),$_POST['data'],'alphanumeric');
 $args['pagesize']=post_vars(array('f_value'=>array('ps'=>0)),$_POST['data'],'numericID');
 $args['totalpage']=post_vars(array('f_value'=>array('tp'=>0)),$_POST['data'],'numericID');
$args['paged']=post_vars(array('f_value'=>array('pgd'=>0)),$_POST['data'],'numericID');

$args['info']=(isset($_POST['data']['f_value']['ifo']))?$_POST['data']['f_value']['ifo']:array();
if(is_array($args['info'])){
  $args['info']=  Walk_Ways_each($args['info'],'alphanumeric');
}else{
    $args['info']= JsonTrueDecode( $args['info'],array());
    $args['info']=  Walk_Ways_each($args['info'],'alphanumeric');   
}


  //--Error chack
      $error=1; 
 if($args['name']==''){ $arr['mistake']['message'][]='name is required.';}else{$error--;}
//--
    if($error==0){
       
  $arr=$GLOBALS['Var_ProcessData']->paging($args);
 

    }


break;


//-------===paging====------------





//-------==store dashboard====------------
case'addstorestaff':
   $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
  if( $args['ActorEntityData']['IsOwner']){
   $args['username']=post_vars(array('f_value'=>array('staff_username'=>'')),$_POST['data'],'alphanumeric');    
   $args['password']=post_vars(array('f_value'=>array('password'=>'')),$_POST['data'],'');    
   $args['store_staff_id']=post_vars(array('f_value'=>array('staffid'=>'numericID')),$_POST['data'],''); 
  //--Error chack
      $error=3; 
 if($args['username']==''){ $arr['mistake']['message'][]='username is required.';}else{$error--;}
  if($args['password']==''){ $arr['mistake']['message'][]='password is required.';}else{$error--;}
 if($args['store_staff_id']==''){ $arr['mistake']['message'][]='staff id is required.';}else{$error--;}
  if( $error==0){
        $arr=$GLOBALS['Var_Registration']->addNewStoreStaff($args);
  }


  }else{
      $arr['mistake']['message']=array('Store owner  only able to add staff.');
  }


  break;
case'addstorecategory':
   $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['name']=post_vars(array('f_value'=>array('category_name'=>'')),$_POST['data'],'HTML_entities');
 $args['cid']=post_vars(array('f_value'=>array('cid'=>0)),$_POST['data'],'numericID');
 $args['sid']=post_vars(array('f_value'=>array('sid'=>0)),$_POST['data'],'numericID');
$args['parent']=post_vars(array('f_value'=>array('parent'=>0)),$_POST['data'],'numericID');
$args['description']=post_vars(array('f_value'=>array('description'=>'')),$_POST['data'],'HTML_entities');



  //--Error chack
      $error=1; 
 if($args['name']==''){ $arr['mistake']['message'][]='name is required.';}else{$error--;}
 if($args['cid']!=0){
      // check for owner category id

 if(!$GLOBALS['Var_UtilityCheck']->IsOwnerCategory($args['cid'],$args['ActorEntityData']['EntityData']['entity_id'])){
    $arr['mistake']['message'][]='Invalid edit';$error++;
 }else{$error--;}


 }
  if($args['parent']!=0){
         // check for owner category id

 if(!$GLOBALS['Var_UtilityCheck']->IsOwnerCategory($args['parent'],$args['ActorEntityData']['EntityData']['entity_id'])){
    $arr['mistake']['message'][]='Invalid edit';$error++;
 }else{$error--;}
  }

//--
    if($error<=0){
       
  $arr=$GLOBALS['Var_Registration']->addNewCategory($args);
 

    }
       
break;
case'product_one':
   $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['name']=post_vars(array('f_value'=>array('product_name'=>'')),$_POST['data'],'HTML_entities');
 $args['pid']=post_vars(array('f_value'=>array('pid'=>0)),$_POST['data'],'numericID');
 $args['sid']=post_vars(array('f_value'=>array('sid'=>0)),$_POST['data'],'numericID');
$args['has_varient']=post_vars(array('f_value'=>array('has_varient'=>0)),$_POST['data'],'numericID');
$args['description']=post_vars(array('f_value'=>array('description'=>'')),$_POST['data'],'HTML_entities');
$args['keyfeature_0']=post_vars(array('f_value'=>array('keyfeature_0'=>'')),$_POST['data'],'HTML_entities');
$args['keyfeature_1']=post_vars(array('f_value'=>array('keyfeature_1'=>'')),$_POST['data'],'HTML_entities');
$args['keyfeature_2']=post_vars(array('f_value'=>array('keyfeature_2'=>'')),$_POST['data'],'HTML_entities');
$args['keyfeature_3']=post_vars(array('f_value'=>array('keyfeature_3'=>'')),$_POST['data'],'HTML_entities');
$args['varient_1']=post_vars(array('f_value'=>array('varient_1'=>'')),$_POST['data'],'HTML_entities');
$args['varient_2']=post_vars(array('f_value'=>array('varient_2'=>'')),$_POST['data'],'HTML_entities');
$args['varient_3']=post_vars(array('f_value'=>array('varient_3'=>'')),$_POST['data'],'HTML_entities');

$args['searchword']=(isset($_POST['data']['f_value']['searchword']))?Walk_Ways_each($_POST['data']['f_value']['searchword'],'HTML_entities'):array();

$args['category']=(isset($_POST['data']['f_value']['category']))?Walk_Ways_each($_POST['data']['f_value']['category'],'numericID'):array();

  //--Error chack
      $error=2; 
 if($args['name']==''){ $arr['mistake']['message'][]='name is required.';}else{$error--;}
 if($args['pid']!=0){
      // check for owner category id

 if(!$GLOBALS['Var_UtilityCheck']->IsOwnerProduct($args['pid'],$args['ActorEntityData']['EntityData']['entity_id'])){
    $arr['mistake']['message'][]='Invalid edit';$error++;
 }else{$error--;}


 }

 if($args['has_varient']==1&&($args['varient_1']==''&&$args['varient_2']==''&&$args['varient_3']=='')){
         $arr['mistake']['message'][]='Chose a varient  name.';$error++;
 }


 if(count($args['category'])<=0){  $arr['mistake']['message'][]='Select a category.';}else{$error--;}
//--
    if($error<=0){
       
  $arr=$GLOBALS['Var_Registration']->addNewProduct($args);
 
   
    }
      
break;
case 'AddSpecifications':
   $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
   $args['pid']=post_vars(array('pid'=>0),$_POST['data'],'numericID');
   $args['spf']=JsonTrueDecode($_POST['data']['spf'],$GLOBALS['Var_BundlePrototype']->DefaultValue('productspecification'));
  $args['spf']=  Walk_Ways_each($args['spf'],'HTML_entities');
    //--Error chack
      $error=1; 
    // check for owner category id

 if(!$GLOBALS['Var_UtilityCheck']->IsOwnerProduct($args['pid'],$args['ActorEntityData']['EntityData']['entity_id'])){
    $arr['mistake']['message'][]='Invalid edit';$error++;
 }else{$error--;}


   if($error<=0){
       
  $arr=$GLOBALS['Var_Registration']->productspecification($args);
 
   
    }
  
     
break;

case 'addprodctinventory':
   $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['pid']=post_vars(array('f_value'=>array('pid'=>0)),$_POST['data'],'numericID');
 $args['vid']=post_vars(array('f_value'=>array('vid'=>0)),$_POST['data'],'numericID');
 $args['act']=post_vars(array('f_value'=>array('act'=>0)),$_POST['data'],'alphanumeric');
  $args['currency']=post_vars(array('f_value'=>array('currency'=>0)),$_POST['data'],'alphanumeric');
 $args['unitsystem']=post_vars(array('f_value'=>array('unitsystem'=>0)),$_POST['data'],'alphanumeric');
  $args['sellingPrice']=post_vars(array('f_value'=>array('sell_price'=>0)),$_POST['data'],'numeric');
 $args['compairePrice']=post_vars(array('f_value'=>array('compare_price'=>0)),$_POST['data'],'numeric');
  $args['sku']=post_vars(array('f_value'=>array('sku'=>0)),$_POST['data'],'numericID');
 $args['Stock']=post_vars(array('f_value'=>array('stock'=>0)),$_POST['data'],'numeric');
 $args['shippable']=post_vars(array('f_value'=>array('shippable'=>0)),$_POST['data'],'numeric');
  $args['shipping_method']=post_vars(array('f_value'=>array('shipping_method'=>0)),$_POST['data'],'numeric');

 $args['weight']=post_vars(array('f_value'=>array('weight'=>0)),$_POST['data'],'numeric');

 $args['weightunit']=post_vars(array('f_value'=>array('weightunit'=>0)),$_POST['data'],'alphanumeric');
 $args['variant_0']=post_vars(array('f_value'=>array('variant_0'=>0)),$_POST['data'],'HTML_entities');
 $args['variant_1']=post_vars(array('f_value'=>array('variant_1'=>0)),$_POST['data'],'HTML_entities');
 $args['variant_2']=post_vars(array('f_value'=>array('variant_2'=>0)),$_POST['data'],'HTML_entities');
 $args['varient_name']=(isset($_POST['data']['f_value']['pvN']))?Walk_Ways_each($_POST['data']['f_value']['pvN'],'HTML_entities'):array('','','');
 $args['has_varient']=post_vars(array('f_value'=>array('Hvrt'=>0)),$_POST['data'],'HTML_entities');
  $args['mainimages']=(isset($_POST['data']['f_value']['mainimages']))?Walk_Ways_each($_POST['data']['f_value']['mainimages'],'HTML_entities'):array();

  $args['webimages']=(isset($_POST['data']['f_value']['webimages']))?Walk_Ways_each($_POST['data']['f_value']['webimages'],'HTML_entities'):array();

  $error=2;
  if($args['pid']==''){ $arr['mistake']['message'][]='pid is required.';}else{$error--;}
 if($args['vid']==''){ $arr['mistake']['message'][]='vid is required.';}else{$error--;}

 if(!$GLOBALS['Var_UtilityCheck']->IsOwnerProduct($args['pid'],$args['ActorEntityData']['EntityData']['entity_id'])){
    $arr['mistake']['message'][]='Invalid edit';$error++;
 }

 if($args['vid']!=0){
     if(!$GLOBALS['Var_UtilityCheck']->IsValidVarients($args['vid'],$args['pid'])){
    $arr['mistake']['message'][]='Invalid Varients';$error++;
 } 
 }


  if( $args['act']=="new"|| $args['act']=="edit"){
       //--Error chack
      $error=$error+7; 
    // check for owner category id
  

  if($args['sellingPrice']==''){ $arr['mistake']['message'][]='selling Price is required.';}else{$error--;}
  if($args['compairePrice']==''){ $arr['mistake']['message'][]='compaire Price is required.';}else{$error--;}
  if($args['currency']==''){ $arr['mistake']['message'][]='currency is required.';}else{$error--;}
  if($args['unitsystem']==''){ $arr['mistake']['message'][]='unitsystem is required.';}else{$error--;}
  if($args['sku']==''){ $arr['mistake']['message'][]='sku is required.';}else{$error--;}
  if($args['Stock']==''){ $arr['mistake']['message'][]='stock is required.';}else{$error--;}


  if(intval($args['shippable'])==1){
      $error=$error+3;
  if($args['shipping_method']==''){ $arr['mistake']['message'][]='shipping method is required.';}else{$error--;}

   if($args['weight']==''){ $arr['mistake']['message'][]='weight is required.';}else{$error--;}

  if($args['weightunit']==''){ $arr['mistake']['message'][]='weightunit is required.';}else{$error--;} 
  }

  

  if((count($args['mainimages'])+count($args['webimages']))<1){ $arr['mistake']['message'][]='Images are required.';}else{$error--;}
  }

    if( $args['act']=="delete"){
     

    }

   if($error==0){
       
 $arr=$GLOBALS['Var_Registration']->prodctinventory($args);
 
   
    }
  
     
break;
case 'AddFilter':
  $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
   $args['pid']=post_vars(array('f_value'=>array('pid'=>0)),$_POST['data'],'numericID');
   $args['fiatr']=JsonTrueDecode($_POST['data']['f_value']['fiatr'],array());
  $args['fiatr']=  Walk_Ways_each($args['fiatr'],'alphanumericHTML_entities');
    //--Error chack
      $error=2; 
    // check for owner category id

     $args['productRow']=$GLOBALS['Var_UtilityCheck']->IsOwnerProduct_M($args['pid'],$args['ActorEntityData']['EntityData']['entity_id']);

 if($args['productRow']==NULL){
    $arr['mistake']['message'][]='Invalid edit';$error++;
 }else{$error--;}
if( count( $args['fiatr'])<=0){$arr['mistake']['message'][]='Invalid Filters';}else{$error--;}

   if($error<=0){
       
  $arr=$GLOBALS['Var_Registration']->productFilter($args);
 
   
    }

break;

case 'addstoreshipping':
  $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
  $args['spgid']=post_vars(array('f_value'=>array('spgid'=>0)),$_POST['data'],'numericID');
  $args['shipping_name']=post_vars(array('f_value'=>array('shipping_name'=>'')),$_POST['data'],'HTML_entities');
  $args['description']=post_vars(array('f_value'=>array('description'=>'')),$_POST['data'],'HTML_entities');
 $args['type']=post_vars(array('f_value'=>array('type'=>'')),$_POST['data'],'numericID');
 $args['srng']=JsonTrueDecode($_POST['data']['f_value']['srng'],array());
 $args['srng']=  Walk_Ways_each($args['srng'],'numeric');

 $args['stcg']=JsonTrueDecode($_POST['data']['f_value']['stcg'],array());
 $args['lif']=  JsonTrueDecode($_POST['data']['f_value']['lif'],array());
 $lif=array(); $locationsIds=array();
 foreach( $args['lif'] as  $key=>$value){
     if(count($value)==3){
         $row=array();
       $locationsIds[]= $row[0]=validate_word('numericID',$value[0]);
        $row[1]=validate_word('numeric',$value[1]);
        $lif[]=$row;
     }
     
 }
 

 $args['lif']=$lif;//storeing sanetized data
 $args['locationsIds']=$locationsIds;


 $args['store_shipping_row']=$GLOBALS['Var_UtilityCheck']->IsOwnerShipping_M($args['spgid'],$args['ActorEntityData']['EntityData']['entity_id']);
 

  $args['stcg']=JsonTrueDecode($_POST['data']['f_value']['stcg'],array());
     //--Error chack
      $error=3; 
 if($args['shipping_name']==''){ $arr['mistake']['message'][]='shipping name is required.';}else{$error--;}


  if($args['type']==''){ $arr['mistake']['message'][]='shipping type is required.';}else{$error--;}



 if(count($args['lif'])<=0){  $arr['mistake']['message'][]='Location is required.';}else{$error--;}

  if($error<=0){
       
  $arr=$GLOBALS['Var_Registration']->StoreShipping($args);
 
   
    }

 
break;


case 'AddStoreMenu':

  $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
  $args['RawMenu']=JsonTrueDecode($_POST['data']['f_value']['menu'],array());
  $args['menu']=$GLOBALS['Var_UtilityCheck']->ValidateStoreMenu($args['RawMenu']);
  $error=1;
 if(count($args['menu'])<=0){  $arr['mistake']['message'][]='Store Menu is required.';}else{$error--;}
    if($error<=0){
       
  $arr=$GLOBALS['Var_Update']->StoreMenu($args);
 
   
    }
break;
case 'addcategorybox':
$args=array();
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['cid']=post_vars(array('f_value'=>array('cid'=>0)),$_POST['data'],'numericID');
$args['sort']=post_vars(array('f_value'=>array('sort:0'=>0)),$_POST['data'],'numericID');
$args['action']=post_vars(array('f_value'=>array('action'=>0)),$_POST['data'],'numericID');
$args['sort']=Valided_ENUM($args['sort'],array(0,1,2),0);
$args['action']=Valided_ENUM($args['action'],array(0,1),0);
  //--Error chack
   $error=2;
 if($args['cid']==''||$args['cid']==0){ $arr['mistake']['message'][]='Category id  is required.';}else{$error--;}
  if($args['sort']==''){ $arr['mistake']['message'][]='Category id  is required.';}else{$error--;}


if($args['cid']!=0){
      // check for owner category id

 if(!$GLOBALS['Var_UtilityCheck']->IsOwnerCategory($args['cid'],$args['ActorEntityData']['EntityData']['entity_id'])){
    $arr['mistake']['message'][]='Invalid edit';$error++;
 }else{$error--;}


 }


    if($error<=0){
       
  $arr=$GLOBALS['Var_Update']->StoreCategoryBox($args);
 
   
    }

break;

//-------===store dashboard====------------
case 'glRail':
  $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
  $args['Rawdata']=JsonTrueDecode($_POST['data']['f_value'],array());

  if(count($args['Rawdata'])>0){
      
  $arr=$GLOBALS['Var_ProcessData']->GLrail($args);



  }


break;






//-------===checkin====------------
case 'checkinchattext':

  $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
  $args['message']=post_vars(array('f_value'=>array('message'=>'')),$_POST['data'],'HTML_entities');
  $args['checkin']=post_vars(array('f_value'=>array('checkin'=>'')),$_POST['data'],'numericID');
  $error=2;
   if($args['message']==''){ $arr['mistake']['message'][]='message is required.';}else{$error--;}


  if($args['checkin']==''){ $arr['mistake']['message'][]='checkin id is required.';}else{$error--;}

  if($args['checkin']!=''){$error++;
     $args['checkIn_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validcheckin_id','checkIn_id'=>$args['checkin']));
     if( $args['checkIn_row']!=NULL){$error--;}
  }

    if($error<=0){
       
  $arr=$GLOBALS['Var_Registration']->SendCheckinTextMessage($args);
 
   
    }

break;


case'checkincartedit':
 $args=array();
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
  $args['checkin']=post_vars(array('f_value'=>array('checkin'=>'')),$_POST['data'],'numericID');
  $args['vid']=post_vars(array('f_value'=>array('vid'=>'')),$_POST['data'],'numericID');
  $args['pid']=post_vars(array('f_value'=>array('pid'=>'')),$_POST['data'],'numericID');
  $args['Quentity']=post_vars(array('f_value'=>array('q'=>1)),$_POST['data'],'numericID');

    $error=4;
 if($args['pid']==''){ $arr['mistake']['message'][]='pid is required.';}else{$error--;}
 if($args['vid']==''){ $arr['mistake']['message'][]='vid is required.';}else{$error--;}

 if($args['checkin']==''){ $arr['mistake']['message'][]='checkin id is required.';}else{$error--;}
 if($args['Quentity']==''){ $arr['mistake']['message'][]='Quentity is required.';}else{$error--;}
   if($args['checkin']!=''){$error++;
     $args['checkIn_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validcheckin_id','checkIn_id'=>$args['checkin']));
     if( $args['checkIn_row']!=NULL){$error--;
     //check store has owner of product
  $args['Product_row']=$GLOBALS['Var_UtilityCheck']->IsOwnerProduct_M($args['pid'],$args['checkIn_row']['store_id']);
  $error++;//$args['Product_row']
if($args['Product_row']!=NULL){
  $error--;
 }else{  $arr['mistake']['message'][]='Invalid edit';$error++;}
     
     }
  }

   if($error<=0){
       
  $arr=$GLOBALS['Var_Registration']->CheckInCartEdit($args);
 
   
    }
break;
case'checkinshortListedit':
 $args=array();
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
  $args['checkin']=post_vars(array('f_value'=>array('checkin'=>'')),$_POST['data'],'numericID');
  $args['pid']=post_vars(array('f_value'=>array('pid'=>'')),$_POST['data'],'numericID');
    $args['Quentity']=post_vars(array('f_value'=>array('q'=>1)),$_POST['data'],'numericID');
    $error=3;

 if($args['pid']==''){ $arr['mistake']['message'][]='pid is required.';}else{$error--;}

 if($args['checkin']==''){ $arr['mistake']['message'][]='checkin id is required.';}else{$error--;}
 if($args['Quentity']==''){ $arr['mistake']['message'][]='Quentity is required.';}else{$error--;}

   if($args['checkin']!=''){$error++;
     $args['checkIn_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validcheckin_id','checkIn_id'=>$args['checkin']));
     if( $args['checkIn_row']!=NULL){$error--;
     //check store has owner of product
  $args['Product_row']=$GLOBALS['Var_UtilityCheck']->IsOwnerProduct_M($args['pid'],$args['checkIn_row']['store_id']);
    $error++;//$args['Product_row']
if($args['Product_row']!=NULL){
  $error--;
 }else{  $arr['mistake']['message'][]='Invalid edit';$error++;}
     
     }
  }

   if($error<=0){
       
  $arr=$GLOBALS['Var_Registration']->CheckInShortListEdit($args);
 
   
    }
break;
case'checkinsuggestedit':
 $args=array();
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
  $args['checkin']=post_vars(array('f_value'=>array('checkin'=>'')),$_POST['data'],'numericID');
 $args['pid']=post_vars(array('f_value'=>array('pid'=>'')),$_POST['data'],'numericID');
 $args['Quentity']=post_vars(array('f_value'=>array('q'=>1)),$_POST['data'],'numericID');
   $error=3;

 if($args['pid']==''){ $arr['mistake']['message'][]='pid is required.';}else{$error--;}

 if($args['checkin']==''){ $arr['mistake']['message'][]='checkin id is required.';}else{$error--;}
  if($args['Quentity']==''){ $arr['mistake']['message'][]='Quentity is required.';}else{$error--;}
   if($args['checkin']!=''){$error++;
     $args['checkIn_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validcheckin_id','checkIn_id'=>$args['checkin']));
     if( $args['checkIn_row']!=NULL){$error--;
     //check store has owner of product
  $args['Product_row']=$GLOBALS['Var_UtilityCheck']->IsOwnerProduct_M($args['pid'],$args['checkIn_row']['store_id']);
    $error++;//$args['Product_row']
if($args['Product_row']!=NULL){
  $error--;
 }else{  $arr['mistake']['message'][]='Invalid edit';$error++;}
     
     }
  }

   if($error<=0){
       
  $arr=$GLOBALS['Var_Registration']->CheckInSuggestEdit($args);
 
   
    }
break;
  case 'buyercheckdelivery'://buyerchangepincode from product page
   $args=array();
   $args['location_id']=post_vars(array('f_value'=>array('location_id'=>'')),$_POST['data'],'numericID');

 $args['storeslug']=post_vars(array('f_value'=>array('storeslug'=>'')),$_POST['data'],'url_chars');
 

 //--Error chack
  $error=2; 
 if($args['location_id']==''){ $arr['mistake']['message'][]='location_id is required.';}else{$error--;}
  if($args['storeslug']==''){ $arr['mistake']['message'][]='storeslug  is required.';}else{$error--;}
  
  if($args['storeslug']!=''){$error++;
   $slug_information =$GLOBALS['Var_PageSlug']->Slug_information($args['storeslug']);  
     if( $slug_information['status']==200){
         $error--;
    $args['storeslugdata']=   $slug_information['data'];

     }

  }


 if($error==0){
       
      $arr=$GLOBALS['Var_ProcessData']->buyercheckdelivery($args);


    }

  break;
  case 'checkoutbuyeraddress':
     $args=array();
  $args['address']=post_vars(array('f_value'=>array('address'=>'')),$_POST['data'],'HTML_entities');
 //--Error chack
  $error=1; 
   if($args['address']==''){ $arr['mistake']['message'][]='address is required.';}else{$error--;}
   if($error==0){
       
   
  $arr = $GLOBALS['Var_Update']->Entity_Setting('checkoutbuyeraddress',$args);

    }
  break;

  case 'RagisterShippingOrder':
 $args=array();
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];

  $args['checkin']=post_vars(array('f_value'=>array('checkin'=>'')),$_POST['data'],'numericID');
   //--Error chack
  $error=1; 
 if($args['checkin']==''){ $arr['mistake']['message'][]='checkin id is required.';}else{$error--;}

   if($args['checkin']!=''){
       $error++;
    $args['checkIn_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validcheckin_id','checkIn_id'=>$args['checkin']));
if( $args['checkIn_row']!=NULL){
  $error--;
 }else{  $arr['mistake']['message'][]='Invalid edit';$error++;}

      }

   if($error==0){
 $arr=$GLOBALS['Var_Registration']->RagisterShippingOrder($args);

    }
  break;


case 'checkinmemberedit':
 $args=array();
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
  $args['checkin']=post_vars(array('f_value'=>array('checkin'=>'')),$_POST['data'],'numericID');
 $args['action']=post_vars(array('f_value'=>array('action'=>'')),$_POST['data'],'numericID');
 $args['feid']=post_vars(array('f_value'=>array('feid'=>'')),$_POST['data'],'numericID');
$args['af']=post_vars(array('f_value'=>array('af'=>'')),$_POST['data'],'alphanumeric');
    //--Error chack
      $error=4; 
 if($args['checkin']==''){ $arr['mistake']['message'][]='checkin id is required.';}else{$error--;}

   if($args['checkin']!=''){
       $error++;
    $args['checkIn_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validcheckin_id','checkIn_id'=>$args['checkin']));
if( $args['checkIn_row']!=NULL){
  $error--;
 }else{  $arr['mistake']['message'][]='Invalid edit';$error++;}

      }

 if($args['action']==''){ $arr['mistake']['message'][]='action is required.';}else{$error--;}
  if($args['af']==''){ $arr['mistake']['message'][]='af is required.';}else{$error--;}

 if($args['feid']==''){ $arr['mistake']['message'][]='feid is required.';}else{ 
      if(!$GLOBALS['Var_UtilityCheck']->IsValidEntity($args['feid'])){
          $arr['mistake']['message'][]='valid feid is required.';
     }else{

         if($GLOBALS['Var_UtilityCheck']->IsFriend($args['ActorEntityData']['EntityData']['entity_id'],$args['feid'])){
              $error--;      
         }

   
     }
     }
 

    //--
    if($error==0){
       
  $arr=$GLOBALS['Var_Registration']->CkeckInMemberEdit($args);
 

    }
break;
case 'LoadInPbank':
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['ids']=(isset($_POST['data']['f_value']['ids']))?Walk_Ways_each($_POST['data']['f_value']['ids'],'numericID'):array();
 $args['type']=post_vars(array('f_value'=>array('type'=>'')),$_POST['data'],'numericID');
 $args['type']= Valided_ENUM( $args['type'],array(0,1),0);
 $args['Store_id']=post_vars(array('f_value'=>array('eid'=>'')),$_POST['data'],'numericID');
   //--Error chack
      $error=1; 


  if($GLOBALS['Var_UtilityCheck']->IsValidEntity($args['Store_id'])){
      $error--;
           }

   //--
  if($error==0){
     
  $arr=$GLOBALS['Var_ProcessData']->LoadCheckInProducts($args);
 

    }

break;



//-------===checkin====------------

//-------===delete====------------
case'deshboardtabletrdelete':
   $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['id']=post_vars(array('f_value'=>array('id'=>0)),$_POST['data'],'numericID');
  $args['AppId']=post_vars(array('f_value'=>array('AppId'=>'')),$_POST['data'],'url_chars');

  //--Error chack
      $error=2; 
if($args['id']==''){ $arr['mistake']['message'][]='id is required.';}else{$error--;}
if($args['AppId']==''){ $arr['mistake']['message'][]='AppId is required.';}else{$error--;}

if( $error==0){

 $arr=$GLOBALS['Var_ProcessData']->deleteing($args); 
}


break;



//-------===delete====------------


 }
 }

  $arr['error']=$error;
 return $arr;

}

}



$GLOBALS['Var_Ajax']=new Ajax();


?>