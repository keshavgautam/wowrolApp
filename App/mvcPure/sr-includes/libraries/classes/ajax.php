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
 $arr = array('state' =>500,'error' =>0,'response' => array(),'mistake' =>array('heading'=>'','message'=>array()));
 $error=0;   $args=array();
 if(isset($_POST['data']['form'])){


 switch($_POST['data']['form']){
   case 'Signup':
  $args=array();
$args['login_identity']=post_vars(array('f_value'=>array('email_or_phone'=>'')),$_POST['data'],'');
$args['password']=post_vars(array('f_value'=>array('password'=>'')),$_POST['data'],'');
$args['confirm_password']=post_vars(array('f_value'=>array('confirm_password'=>'')),$_POST['data'],'');
   //--Error chack
      $error=2;

 if($args['login_identity']==''){ $arr['mistake']['message'][]='ajax_0';}else{$error--;}
 if($args['password']==''){ $arr['mistake']['message'][]='ajax_1';}else{$error--;}

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

 if($args['login_identity']==''){ $arr['mistake']['message'][]='ajax_2';}else{$error--;}
 if($args['password']==''){ $arr['mistake']['message'][]='ajax_3';}else{$error--;}

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

 if($args['verification_code']==''){ $arr['mistake']['message'][]='ajax_5';}else{$error--;}


    //--
    if($error==0){
         $arr =  $GLOBALS['Var_ProcessData']->AccountVerification($args);
    }


     break;
   //--
   case 'suggestion':
       $args=array();
       if(is_array($_POST['data']['f_value'])){
    $args['inputval']=post_vars(array('f_value'=>array('inputval'=>'')),$_POST['data'],'url_chars');
     $args['selected']=(isset($_POST['data']['f_value']['selected']))?Walk_Ways_each($_POST['data']['f_value']['selected'],'url_chars'):array();
      $args['selected']=(isset($_POST['data']['f_value']['selected']))?Walk_Ways_each($_POST['data']['f_value']['selected'],'url_chars'):array();
$_POST['data']['f_value']['ifo']=(isset($_POST['data']['f_value']['ifo']))?$_POST['data']['f_value']['ifo']:'';
  $args['info']=JsonTrueDecode($_POST['data']['f_value']['ifo'],array());
  $args['info']=  Walk_Ways_each($args['info'],'alphanumericHTML_entities');


     $args['suggest']=post_vars(array('f_value'=>array('suggest'=>'')),$_POST['data'],'url_chars');
     //--Error chack
      $error=2;

 if($args['inputval']==''){ $arr['mistake']['message'][]='ajax_6';}else{$error--;}
  if($args['suggest']==''){ $arr['mistake']['message'][]='ajax_7';}else{$error--;}

    //--
    if($error==0){
      $arr =  $GLOBALS['Var_ProcessData']->Suggestion($args);
    }


    }//is_array
    break;
   //--

      //--
   case 'selectbox':
       $args=array();
         $f_value=JsonTrueDecode($_POST['data']['f_value'],array());
    $f_value=True_array_merge( array('suggest'=>'','selected'=>array(),'ps'=>0,'tp'=>0,'pgd'=>0,'sstr'=>'','ifo'=>array()), $f_value);

    $args['inputval']=post_vars(array('sstr'=>''), $f_value,'url_chars');

$args['selected']=Walk_Ways_each($f_value['selected'],'url_chars');


  $args['info']=  Walk_Ways_each($f_value['ifo'],'alphanumericHTML_entities');


     $args['suggest']=post_vars(array('suggest'=>''),$f_value,'url_chars');
     //--Error chack
      $error=2;

 if($args['inputval']==''){ $arr['mistake']['message'][]='ajax_6';}else{$error--;}
  if($args['suggest']==''){ $arr['mistake']['message'][]='ajax_7';}else{$error--;}

    //--
    if($error==0){
     $arr =  $GLOBALS['Var_ProcessData']->SelectBox($args);
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
  case 'Ragister_Store_Step_1':


         $args=array();
    $args['Name']=post_vars(array('f_value'=>array('store_name'=>'')),$_POST['data'],'HTML_entities');

     $args['store_url_address']=post_vars(array('f_value'=>array('store_url_address'=>'')),$_POST['data'],'url_chars');


     //--Error chack
      $error=2;

 if($args['Name']==''){ $arr['mistake']['message'][]='ajax_8';}else{$error--;}
 if($args['store_url_address']==''){ $arr['mistake']['message'][]='ajax_9';}else{$error--;}

    //--
    if($error==0){

   $arr =  $GLOBALS['Var_Registration']->StoreStep_1($args);

    }







    break;



      //--
  case 'ragisterbuyer':
  $args=array();
      $args['FirstName']=post_vars(array('f_value'=>array('first_name'=>'')),$_POST['data'],'HTML_entities');
      $args['LastName']=post_vars(array('f_value'=>array('last_name'=>'')),$_POST['data'],'HTML_entities');
      $args['user_name']=post_vars(array('f_value'=>array('user_name'=>'')),$_POST['data'],'url_chars');
    $args['sex']=post_vars(array('f_value'=>array('sex:0'=>'')),$_POST['data'],'numericID');
   $args['birthday_Day']=post_vars(array('f_value'=>array('birthday_Day'=>'')),$_POST['data'],'numericID');
    $args['birthday_Month']=post_vars(array('f_value'=>array('birthday_Month'=>'')),$_POST['data'],'alphanumeric');
   $args['birthday_Year']=post_vars(array('f_value'=>array('birthday_Year'=>'')),$_POST['data'],'numericID');
    $args['countryinfo_id']=post_vars(array('f_value'=>array('country'=>'')),$_POST['data'],'numericID');
    //--Error chack
      $error=8;
    if( $args['FirstName']==''){ $arr['mistake']['message'][]='ajax_10';}else{$error--;}
    if( $args['LastName']==''){ $arr['mistake']['message'][]='ajax_11';}else{$error--;}
    if($args['user_name']==''){ $arr['mistake']['message'][]='ajax_12';}else{$error--;}
    if($args['sex']==''){ $arr['mistake']['message'][]='ajax_13';}else{$error--;}
    if($args['birthday_Day']==''){ $arr['mistake']['message'][]='ajax_14';}else{$error--;}
    if($args['birthday_Month']==''){ $arr['mistake']['message'][]='ajax_15';}else{$error--;}
    if($args['birthday_Year']==''){ $arr['mistake']['message'][]='ajax_16';}else{$error--;}
    if($args['countryinfo_id']==''){ $arr['mistake']['message'][]='ajax_17';}else{$error--;}
    //--
    if($error==0){
 $arr =  $GLOBALS['Var_Registration']->Buyer($args);
    }


       break;

    case  'registerlocationmanager':
   $args=array();
  $args['ActorEntityData']=$GLOBALS['Var_ActorEntityData'];
   $args['country_id']=post_vars(array('f_value'=>array('country'=>'')),$_POST['data'],'numericID');
   $args['postalCode_id']=post_vars(array('f_value'=>array('postalCode'=>'')),$_POST['data'],'numericID');
   $args['entity_id']=post_vars(array('f_value'=>array('entity_id'=>'')),$_POST['data'],'numericID');
      //--Error chack
      $error=4;



     $args['countryInfo']=NULL;$args['postalCodeinfo']=NULL;$args['entity_row']=NULL;
 if($args['country_id']!=''){

   $args['countryInfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validCountryInfo','countryinfo_id'=> $args['country_id']));

    }

if($args['postalCode_id']!=''){
    $args['postalCodeinfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_postalcode_id','postalCode_id'=>$args['postalCode_id']));

 if( $args['postalCodeinfo']['manager_entity_id']!=0 ){$arr['mistake']['message'][]='ajax_49';}else{$error--; }

}

if($args['entity_id']!=''){
    $args['entity_row']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validentity_id','entity_id'=>$args['entity_id']));

}

    if( $args['countryInfo']==NULL){ $arr['mistake']['message'][]='ajax_46';}else{$error--;}
    if( $args['postalCodeinfo']==NULL){ $arr['mistake']['message'][]='ajax_47';}else{$error--;}
    if( $args['entity_row']==NULL){ $arr['mistake']['message'][]='ajax_48';}else{$error--;}

   if($error==0){
 $arr =  $GLOBALS['Var_LocationManager']->RegisterLocationManager($args);
    }
       break;



case 'registercompany':
   $args=array();
   $args['ActorEntityData']=$GLOBALS['Var_ActorEntityData'];
   $args['company_name']=post_vars(array('f_value'=>array('company_name'=>'')),$_POST['data'],'HTML_entities');
   $args['company_industry_category']=post_vars(array('f_value'=>array('company_industry_category'=>'')),$_POST['data'],'alphanumeric');
       //--Error chack
      $error=2;

  if($args['company_name']==''){ $arr['mistake']['message'][]='ajax_58';}else{$error--;}
  if( $args['company_industry_category']==''){ $arr['mistake']['message'][]='ajax_59';}else{$error--;}

     if($error==0){
 $arr =  $GLOBALS['Var_Registration']->Company($args);
    }

break;


   //--




 //-------===setting====------------
   case 'store_setting_0':// setting

         $args=array();
  $args['Name']=post_vars(array('f_value'=>array('store_name'=>'')),$_POST['data'],'HTML_entities');
  $args['website']=post_vars(array('f_value'=>array('website'=>'')),$_POST['data'],'HTML_entities');

     //--Error chack
      $error=1;

 if($args['Name']==''){ $arr['mistake']['message'][]='ajax_8';}else{$error--;}

    //if($args['website']==''){ $arr['mistake']['message'][]='website is required.';}else{$error--;}

    //--
    if($error==0){

   $arr = $GLOBALS['Var_Update']->Entity_Setting('store_setting_0',$args);
    }



   break;

     case 'store_setting_1':// setting

         $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
  $args['address_id']=post_vars(array('f_value'=>array('address_id'=>0)),$_POST['data'],'numericID');
  $args['address']=post_vars(array('f_value'=>array('address'=>'')),$_POST['data'],'HTML_entities');
  $args['landmark']=post_vars(array('f_value'=>array('landmark'=>'')),$_POST['data'],'HTML_entities');
  $args['phone']=post_vars(array('f_value'=>array('phone'=>'')),$_POST['data'],'numericID');
  $args['country_id']=post_vars(array('f_value'=>array('country'=>'')),$_POST['data'],'numericID');
  $args['state_id']=post_vars(array('f_value'=>array('state'=>'')),$_POST['data'],'numericID');
  $args['city_id']=post_vars(array('f_value'=>array('citybystate'=>'')),$_POST['data'],'numericID');
  $args['town_id']=post_vars(array('f_value'=>array('townbycity'=>'')),$_POST['data'],'numericID');



     //--Error chack
      $error=5;

 if($args['address']==''){ $arr['mistake']['message'][]='ajax_18';}else{$error--;}
 if($args['phone']==''){ $arr['mistake']['message'][]='ajax_19';}else{$error--;}
 //if($args['country_id']==''){ $arr['mistake']['message'][]='ajax_20';}else{$error--;}
 //if($args['state_id']==''){ $arr['mistake']['message'][]='ajax_21';}else{$error--;}
 //if($args['city_id']==''){ $arr['mistake']['message'][]='ajax_22';}else{$error--;}
 //if($args['town_id']==''){ $arr['mistake']['message'][]='ajax_23';}else{$error--;}

 //---
  $args['countryInfo']=NULL; $args['stateInfo']=NULL; $args['cityInfo']=NULL;$args['towninfo']=NULL;$args['locationinfo']=NULL;$args['postalCodeinfo']=NULL;
 if($args['country_id']!=''){

   $args['countryInfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validCountryInfo','countryinfo_id'=> $args['country_id']));

    }


if($args['state_id']!=''&$args['country_id']!=''){

  $args['stateInfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_fl_admin_id','fl_admin_id'=>$args['state_id'],'countryinfo_id'=>$args['country_id']));

    }

   if( $args['countryInfo']==NULL){$arr['mistake']['message'][]='ajax_20'; }else{ $error--;   }
   if($args['stateInfo']==NULL){$arr['mistake']['message'][]='ajax_21'; }else{ $error--;   }


 if($args['state_id']!=''&$args['country_id']!=''&&$args['city_id']!=''){

 $args['cityInfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_city_id_by_fl_admin_id','city_id'=> $args['city_id'],'fl_admin_id'=> $args['state_id']));


    }

 if($args['state_id']!=''&$args['country_id']!=''&&$args['city_id']!=''&&$args['town_id']!=''){

 $args['towninfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_town_id_by_city_id_by_fl_admin_id','town_id'=>$args['town_id'],'city_id'=> $args['city_id'],'fl_admin_id'=> $args['state_id']));

    }

 if($args['cityInfo']==NULL){$arr['mistake']['message'][]='ajax_22'; }else{ $error--;   }
// if($args['towninfo']==NULL){$arr['mistake']['message'][]='ajax_23'; }else{ $error--;   }

$args['locationinfo']=($args['towninfo']==NULL)?$args['cityInfo']:$args['towninfo'];
//we want to empty towm field for Null town value
if(($args['towninfo']==NULL)){
    $args['towninfo']=array('location_id'=>'','location'=>'');
}
    //--

if(($args['postalCodeinfo']==NULL)){
    $args['postalCodeinfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_postalcode_id','postalCode_id'=>$args['locationinfo']['postalCode_id']));

}


    if($error==0){

   $arr = $GLOBALS['Var_Update']->Entity_Setting('store_setting_1',$args);
    }



   break;

      case 'store_setting_456':// store _policy setting

         $args=array();
  $args['store_policy']=post_vars(array('f_value'=>array('store_policy'=>'')),$_POST['data'],'HTML_entities');
  $args['return_policy']=post_vars(array('f_value'=>array('return_policy:0'=>'')),$_POST['data'],'numericID');

     //--Error chack
      $error=2;

 if($args['store_policy']==''){ $arr['mistake']['message'][]='ajax_24';}else{$error--;}

 if($args['return_policy']==''){ $arr['mistake']['message'][]='ajax_25';}else{$error--;}


    //--
    if($error==0){

   $arr = $GLOBALS['Var_Update']->Entity_Setting('store_setting_456',$args);
    }



   break;

      case 'store_setting_457':// about store setting

         $args=array();
  $args['about_store']=post_vars(array('f_value'=>array('about_store'=>'')),$_POST['data'],'HTML_entities');

     //--Error chack
      $error=1;

 if($args['about_store']==''){ $arr['mistake']['message'][]='ajax_26';}else{$error--;}



    //--
    if($error==0){

   $arr = $GLOBALS['Var_Update']->Entity_Setting('store_setting_457',$args);
    }



   break;
       case 'setting_store_collection'://setting_store_collection

         $args=array();
  $args['collection_id']=GetPropertyInArray('f_value',$_POST['data'],array(),'numericID');


     //--Error chack
      $error=1;
   $CollectionRows=NULL;
 if(count($args['collection_id'])<=0){ $arr['mistake']['message'][]='Store Term is required.';}else{
  $CollectionRows=  $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_collection_id','collection_id'=>$args['collection_id']));
$args['CollectionRows']  =$CollectionRows;
 $args['collection_id']=array(); $args['collection_data']=array();
 foreach($CollectionRows as $value){
 $args['collection_id'][]=$value['collection_id'];
 $args['collection_data'][]=array('id'=>$value['collection_id'],'name'=>$value['collection_name'],'slug'=>$value['content_slug']);
}
  }


   if($CollectionRows==NULL){ $arr['mistake']['message'][]='ajax_29';}else{$error--;}
 $args['ActorEntityData'] = $GLOBALS['Var_ActorEntityData'];

    //--
    if($error==0){

   $arr = $GLOBALS['Var_Update']->Entity_Setting('setting_store_collection',$args);
    }



   break;
    case 'store_setting_3':// Notification

         $args=array();
$code=array('nss0','nss1','nss2','nss3',"ns0", "ns1", "ns2");
 $value=(isset($_POST['data']['f_value']))?Walk_Ways_each($_POST['data']['f_value'],''):array();

 foreach( $code as $v){
     if(isset($value[$v])){
    $args[$v]=Valided_ENUM(intval($value[$v]),array(0,1),0);
     }else{
       $args[$v]=0;

     }
 }



     //--Error chack
      $error=0;




    //--
    if($error==0){

   $arr = $GLOBALS['Var_Update']->Entity_Setting('store_setting_3',$args);
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
      case 'setting_profilepic':// setting

     $args=array();
 $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['mainimages']=(isset($_POST['data']['f_value']['mainimages']))?Walk_Ways_each($_POST['data']['f_value']['mainimages'],'HTML_entities'):array();

  $args['webimages']=(isset($_POST['data']['f_value']['webimages']))?Walk_Ways_each($_POST['data']['f_value']['webimages'],'HTML_entities'):array();
 $args['featureimage']=(isset($_POST['data']['f_value']['featureimage']))?Walk_Ways_each($_POST['data']['f_value']['featureimage'],'HTML_entities'):array();



     //--Error chack
      $error=1;


  if((count($args['mainimages'])+count($args['webimages']))<1){ $arr['mistake']['message'][]='Images are required.';}else{$error--;}



    //--
    if($error==0){

 $arr = $GLOBALS['Var_Update']->Entity_Setting('setting_profilepic',$args);

    }



   break;
         case 'setting_banner':// setting

     $args=array();
 $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['mainimages']=(isset($_POST['data']['f_value']['mainimages']))?Walk_Ways_each($_POST['data']['f_value']['mainimages'],'HTML_entities'):array();

  $args['webimages']=(isset($_POST['data']['f_value']['webimages']))?Walk_Ways_each($_POST['data']['f_value']['webimages'],'HTML_entities'):array();
 $args['featureimage']=(isset($_POST['data']['f_value']['featureimage']))?Walk_Ways_each($_POST['data']['f_value']['featureimage'],'HTML_entities'):array();



     //--Error chack
      $error=1;


  if((count($args['mainimages'])+count($args['webimages']))<1){ $arr['mistake']['message'][]='Images are required.';}else{$error--;}



    //--
    if($error==0){

 $arr = $GLOBALS['Var_Update']->Entity_Setting('setting_banner',$args);

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
 $args['FirstName']=post_vars(array('f_value'=>array('first_name'=>'')),$_POST['data'],'HTML_entities');
  $args['LastName']=post_vars(array('f_value'=>array('last_name'=>'')),$_POST['data'],'HTML_entities');
 $args['sex']=post_vars(array('f_value'=>array('sex:0'=>'')),$_POST['data'],'numericID');
 $birthday_Day=post_vars(array('f_value'=>array('birthday_Day'=>'')),$_POST['data'],'numericID');
 $birthday_Month=post_vars(array('f_value'=>array('birthday_Month'=>'')),$_POST['data'],'alphanumeric');
$birthday_Year=post_vars(array('f_value'=>array('birthday_Year'=>'')),$_POST['data'],'numericID');
  $args['countryinfo_id']=post_vars(array('f_value'=>array('country'=>'')),$_POST['data'],'numericID');
   //--Error chack
      $error=7;

  if( $args['FirstName']==''){ $arr['mistake']['message'][]='First Name is required.';}else{$error--;}
 if( $args['LastName']==''){ $arr['mistake']['message'][]='Last Name is required.';}else{$error--;}
  if($args['sex']==''){ $arr['mistake']['message'][]='sex is required.';}else{$error--;}
 if($birthday_Day==''){ $arr['mistake']['message'][]='birthday_Day is required.';}else{$error--;}
 if($birthday_Month==''){ $arr['mistake']['message'][]='birthday_Month is required.';}else{$error--;}
  if($birthday_Year==''){ $arr['mistake']['message'][]='birthday_Year is required.';}else{$error--;}
     if($args['countryinfo_id']==''){ $arr['mistake']['message'][]='Country is required.';}else{$error--;}
    if($error==0){

$args['birthday']=$birthday_Month.','.$birthday_Day.','.$birthday_Year;

   $arr = $GLOBALS['Var_Update']->Entity_Setting('buyersetting_0',$args);
    }
   break;

case 'buyer_setting_568'://

         $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
  $args['address_id']=post_vars(array('f_value'=>array('address_id'=>0)),$_POST['data'],'numericID');
  $args['address']=post_vars(array('f_value'=>array('address'=>'')),$_POST['data'],'HTML_entities');
  $args['landmark']=post_vars(array('f_value'=>array('landmark'=>'')),$_POST['data'],'HTML_entities');
  $args['phone']=post_vars(array('f_value'=>array('phone'=>'')),$_POST['data'],'numericID');
  $args['otheraddress']=post_vars(array('f_value'=>array('otheraddress'=>'')),$_POST['data'],'HTML_entities');
  $args['otherlandmark']=post_vars(array('f_value'=>array('otherlandmark'=>'')),$_POST['data'],'HTML_entities');
  $args['otherphone']=post_vars(array('f_value'=>array('otherphone'=>'')),$_POST['data'],'numericID');
  $args['country_id']=post_vars(array('f_value'=>array('country'=>'')),$_POST['data'],'numericID');
  $args['state_id']=post_vars(array('f_value'=>array('state'=>'')),$_POST['data'],'numericID');
  $args['city_id']=post_vars(array('f_value'=>array('citybystate'=>'')),$_POST['data'],'numericID');
  $args['town_id']=post_vars(array('f_value'=>array('townbycity'=>'')),$_POST['data'],'numericID');



     //--Error chack
      $error=5;

 if($args['address']==''){ $arr['mistake']['message'][]='ajax_18';}else{$error--;}
 if($args['phone']==''){ $arr['mistake']['message'][]='ajax_19';}else{$error--;}
 //if($args['country_id']==''){ $arr['mistake']['message'][]='ajax_20';}else{$error--;}
 //if($args['state_id']==''){ $arr['mistake']['message'][]='ajax_21';}else{$error--;}
 //if($args['city_id']==''){ $arr['mistake']['message'][]='ajax_22';}else{$error--;}
 //if($args['town_id']==''){ $arr['mistake']['message'][]='ajax_23';}else{$error--;}




  $args['countryInfo']=NULL; $args['stateInfo']=NULL; $args['cityInfo']=NULL;$args['towninfo']=NULL;$args['locationinfo']=NULL;$args['postalCodeinfo']=NULL;$args['AddressInfo']=NULL;


   //--

     if($args['address_id']!=0){  $args['AddressInfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_address_id','address_id'=>$args['address_id'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));  }else{ $args['address_id']=0;  }
     if($args['AddressInfo']==NULL){$args['address_id']=0; }

 //---



 if($args['country_id']!=''){

   $args['countryInfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validCountryInfo','countryinfo_id'=> $args['country_id']));

    }


if($args['state_id']!=''&$args['country_id']!=''){

  $args['stateInfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_fl_admin_id','fl_admin_id'=>$args['state_id'],'countryinfo_id'=>$args['country_id']));

    }

   if( $args['countryInfo']==NULL){$arr['mistake']['message'][]='ajax_20'; }else{ $error--;   }
   if($args['stateInfo']==NULL){$arr['mistake']['message'][]='ajax_21'; }else{ $error--;   }



 if($args['state_id']!=''&$args['country_id']!=''&&$args['city_id']!=''){

 $args['cityInfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_city_id_by_fl_admin_id','city_id'=> $args['city_id'],'fl_admin_id'=> $args['state_id']));


    }

 if($args['state_id']!=''&$args['country_id']!=''&&$args['city_id']!=''&&$args['town_id']!=''){

 $args['towninfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_town_id_by_city_id_by_fl_admin_id','town_id'=>$args['town_id'],'city_id'=> $args['city_id'],'fl_admin_id'=> $args['state_id']));

    }

 if($args['cityInfo']==NULL){$arr['mistake']['message'][]='ajax_22'; }else{ $error--;   }
// if($args['towninfo']==NULL){$arr['mistake']['message'][]='ajax_23'; }else{ $error--;   }

$args['locationinfo']=($args['towninfo']==NULL)?$args['cityInfo']:$args['towninfo'];
//we want to empty towm field for Null town value
if(($args['towninfo']==NULL)){
    $args['towninfo']=array('location_id'=>'','location'=>'');
}

if(($args['postalCodeinfo']==NULL)){
    $args['postalCodeinfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_postalcode_id','postalCode_id'=>$args['locationinfo']['postalCode_id']));

}


    //--
    if($error==0){

   $arr = $GLOBALS['Var_Update']->Entity_Setting('buyer_setting_568',$args);
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
   case 'buyersetting_3':// Notification

         $args=array();
$code=array('nss0','nss1','nss2','nss3',"ns0", "ns1", "ns2");
 $value=(isset($_POST['data']['f_value']))?Walk_Ways_each($_POST['data']['f_value'],''):array();

 foreach( $code as $v){
     if(isset($value[$v])){
    $args[$v]=Valided_ENUM(intval($value[$v]),array(0,1),0);
     }else{
       $args[$v]=0;

     }
 }



     //--Error chack
      $error=0;




    //--
    if($error==0){

   $arr = $GLOBALS['Var_Update']->Entity_Setting('buyersetting_3',$args);
    }




   break;

   case 'buyersetting_5':// Notification

         $args=array();
$code=array('ip0','ip5','ip8','ip9','ip10','cp0','cp1','cp5','cp6');
 $value=(isset($_POST['data']['f_value']))?Walk_Ways_each($_POST['data']['f_value'],''):array();

 foreach( $code as $v){
     if(isset($value[$v])){
    $args[$v]=Valided_ENUM(intval($value[$v]),array(0,1,2,5),0);
     }else{
       $args[$v]=0;

     }
 }



     //--Error chack
      $error=0;




    //--
    if($error==0){

   $arr = $GLOBALS['Var_Update']->Entity_Setting('buyersetting_5',$args);
    }




   break;

case 'deactivation':
 $args=array();
 if($GLOBALS['Var_LoginStatus']){

   $arr = $GLOBALS['Var_Update']->Entity_Setting('deactivation',$args);


   $arr['state']=200;
 }
break;

case  'company_setting_0':
   $args=array();
  $args['company_name']=post_vars(array('f_value'=>array('company_name'=>'')),$_POST['data'],'HTML_entities');
  $args['company_industry_category']=post_vars(array('f_value'=>array('company_industry_category'=>'')),$_POST['data'],'HTML_entities');



    //--Error chack
      $error=2;

  if($args['company_name']==''){ $arr['mistake']['message'][]='ajax_58';}else{$error--;}
  if( $args['company_industry_category']==''){ $arr['mistake']['message'][]='ajax_59';}else{$error--;}



    //--
    if($error==0){

   $arr = $GLOBALS['Var_Update']->Entity_Setting('company_setting_0',$args);
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


 $mainimages=(isset($_POST['data']['f_value']['mainimages']))?Walk_Ways_each($_POST['data']['f_value']['mainimages'],'HTML_entities'):array();

  $webimages=(isset($_POST['data']['f_value']['webimages']))?Walk_Ways_each($_POST['data']['f_value']['webimages'],'HTML_entities'):array();



  $friendTag=(isset($_POST['data']['f_value']['tagfriend']))?Walk_Ways_each($_POST['data']['f_value']['tagfriend'],'numericID'):array();
  $args['friendTag']=$friendTag;
  $promoteproduct=(isset($_POST['data']['f_value']['promoteproduct']))?Walk_Ways_each($_POST['data']['f_value']['promoteproduct'],'numericID'):array();



     //--Error chack
      $error=4;


 if($args['spread_text']==''){ $arr['mistake']['message'][]='Spread Text is required.';}else{$error--;}
  if($args['fromreaction']==''){ $arr['mistake']['message'][]=' reaction value is required.';}else{$error--;}
   if($args['privacy']==''){ $arr['mistake']['message'][]=' privacy value is required.';}else{$error--;}

 //valid check
 $args['taged_entity']=array(); $args['taged_entity_row']=array();
$args['taged_entity_row']= $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'EntityRowByArray','entity_id_Array'=>$friendTag));

for($i=0;$i<count($args['taged_entity_row']);$i++ ){
       $args['taged_entity'][]=$args['taged_entity_row'][$i]['entity_id'];
    if($GLOBALS['Var_UtilityCheck']->IsAllowTagging($args['taged_entity_row'][$i],$args['ActorEntityData']['EntityData'])){

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





 //images
 $args['images']=array();
 if(count($mainimages)>0){
 $args['images']=   True_array_merge($args['images'],$mainimages);
 }
 if(count($webimages)>0){
  $args['images']=  True_array_merge($args['images'],$webimages);
 }



    //--
    if($error==0){
    // $GLOBALS['Var_Registration']->EntitySpread($args);
  //$arr=$GLOBALS['Var_Registration']->EntitySpread($args);

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
      $error=6;

 if(!$args['ActorEntityData']['LoginStatus']){ $arr['mistake']['message'][]='comment text is required.';}else{$error--;}
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
      if(!$GLOBALS['Var_UtilityCheck']->IsValidEntity($args['feid'])){
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

case 'block_user':
 $args['action']=post_vars(array('f_value'=>array('action'=>'')),$_POST['data'],'numericID');
 $args['feid']=post_vars(array('f_value'=>array('feid'=>'')),$_POST['data'],'numericID');
$args['af']=post_vars(array('f_value'=>array('af'=>'')),$_POST['data'],'alphanumeric');
    //--Error chack
      $error=3;
 if($args['action']==''){ $arr['mistake']['message'][]='action is required.';}else{$error--;}


 if($args['feid']==''){ $arr['mistake']['message'][]='feid is required.';}else{
      if(!$GLOBALS['Var_UtilityCheck']->IsValidEntity($args['feid'])){
          $arr['mistake']['message'][]='valid feid is required.';
     }else{
       $error--;
     }
     }
  if($args['af']==''){ $arr['mistake']['message'][]='af is required.';}else{$error--;}

    //--
    if($error==0){

  $arr=$GLOBALS['Var_ProcessData']->updateBlocking($args);


    }
break;

case 'report_buyer':
$args['feid']=post_vars(array('f_value'=>array('feid'=>'')),$_POST['data'],'numericID');
$args['af']=post_vars(array('f_value'=>array('af'=>'')),$_POST['data'],'alphanumeric');
$args['hate_speech']=post_vars(array('f_value'=>array('hate_speech'=>0)),$_POST['data'],'numericID');
$args['abusive']=post_vars(array('f_value'=>array('abusive'=>0)),$_POST['data'],'numericID');
$args['text_6']=post_vars(array('f_value'=>array('text_6'=>0)),$_POST['data'],'numericID');
$args['text_7']=post_vars(array('f_value'=>array('text_7'=>0)),$_POST['data'],'numericID');
   //--Error chack
      $error=0;
 $arr['state']=200;

break;
case 'report_store':
 $args=array();
$args['feid']=post_vars(array('f_value'=>array('feid'=>'')),$_POST['data'],'numericID');
$args['af']=post_vars(array('f_value'=>array('af'=>'')),$_POST['data'],'alphanumeric');
$args['hate_speech']=post_vars(array('f_value'=>array('hate_speech'=>0)),$_POST['data'],'numericID');
$args['abusive']=post_vars(array('f_value'=>array('abusive'=>0)),$_POST['data'],'numericID');
$args['text_6']=post_vars(array('f_value'=>array('text_6'=>0)),$_POST['data'],'numericID');
$args['text_7']=post_vars(array('f_value'=>array('text_7'=>0)),$_POST['data'],'numericID');
   //--Error chack
      $error=0;
 $arr['state']=200;

break;
case 'report_product':
 $args=array();
$args['pid']=post_vars(array('f_value'=>array('pid'=>'')),$_POST['data'],'numericID');
$args['hate_speech']=post_vars(array('f_value'=>array('hate_speech'=>0)),$_POST['data'],'numericID');
$args['abusive']=post_vars(array('f_value'=>array('abusive'=>0)),$_POST['data'],'numericID');
$args['text_6']=post_vars(array('f_value'=>array('text_6'=>0)),$_POST['data'],'numericID');
$args['text_7']=post_vars(array('f_value'=>array('text_7'=>0)),$_POST['data'],'numericID');
   //--Error chack
      $error=0;
 $arr['state']=200;

break;




//-------===relation====------------

//-------===paging====------------
case 'paging':
 $args['name']=post_vars(array('f_value'=>array('name'=>'')),$_POST['data'],'alphanumeric');
 $args['search_str']=post_vars(array('f_value'=>array('sstr'=>'')),$_POST['data'],'search_word');
 $args['selected_id']=post_vars(array('f_value'=>array('slid'=>'')),$_POST['data'],'numericID');
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
$args['is_default']=post_vars(array('f_value'=>array('is_default'=>0)),$_POST['data'],'numericID');
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

case 'addstorecollection':
   $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['name']=post_vars(array('f_value'=>array('collection_name'=>'')),$_POST['data'],'HTML_entities');
 $args['cid']=post_vars(array('f_value'=>array('cid'=>0)),$_POST['data'],'numericID');
 $args['icon_svg']=post_vars(array('f_value'=>array('svg_icon'=>0)),$_POST['data'],'HTML_entities');
 $args['country_id']=post_vars(array('f_value'=>array('z'=>0)),$_POST['data'],'numericID');
$args['parent']=post_vars(array('f_value'=>array('parent'=>0)),$_POST['data'],'numericID');
$args['description']=post_vars(array('f_value'=>array('description'=>'')),$_POST['data'],'HTML_entities');





  //--Error chack
      $error=2;
 if($args['name']==''){ $arr['mistake']['message'][]='name is required.';}else{$error--;}

if($args['ActorEntityData']['EntityData']['entity_id']!=CollectionEditer_id){ $arr['mistake']['message'][]='CollectionEditer required.';}else{$error--;}




    $args['use_type']=( $args['country_id']=='')?0:1;
//--
    if($error<=0){

  $arr=$GLOBALS['Var_Registration']->addNewCollection($args);


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

$args['category_raw']=(isset($_POST['data']['f_value']['category']))?Walk_Ways_each($_POST['data']['f_value']['category'],'numericID'):array();

  //--Error chack
      $error=2;
 if($args['name']==''){ $arr['mistake']['message'][]='name is required.';}else{$error--;}
 if($args['pid']!=0){
      // check for owner product id

 if(!$GLOBALS['Var_UtilityCheck']->IsOwnerProduct($args['pid'],$args['ActorEntityData']['EntityData']['entity_id'])){
    $arr['mistake']['message'][]='Invalid edit';$error++;
 }else{$error--;}


 }

 if($args['has_varient']==1&&($args['varient_1']==''&&$args['varient_2']==''&&$args['varient_3']=='')){
         $arr['mistake']['message'][]='Chose a varient  name.';$error++;
 }

 $args['category']=array();//empty by default
if(count($args['category_raw'])>=0){
 $args['category_rows'] =  $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validownerCategory_idByArray','category_id_Array'=>$args['category_raw'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
 if(is_array( $args['category_rows'])){
    foreach( $args['category_rows'] as $row){
     $args['category'][]=  $row['category_id'];

    }
 }
}





 if(count($args['category'])<=0){  $arr['mistake']['message'][]='Select a category.';}else{$error--;}
//--
    if($error<=0){

  $arr=$GLOBALS['Var_Registration']->addNewProduct($args);


    }

break;
case  'product_copy':
   $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['name']=post_vars(array('f_value'=>array('product_name'=>'')),$_POST['data'],'HTML_entities');
 $args['pid']=post_vars(array('f_value'=>array('pid'=>0)),$_POST['data'],'numericID');
 $args['sid']=post_vars(array('f_value'=>array('sid'=>0)),$_POST['data'],'numericID');


  //--Error chack
      $error=2;
 if($args['name']==''){ $arr['mistake']['message'][]='name is required.';}else{$error--;}
 if($args['pid']!=0){
      // check for owner category id

 if(!$GLOBALS['Var_UtilityCheck']->IsOwnerProduct($args['pid'],$args['ActorEntityData']['EntityData']['entity_id'])){
    $arr['mistake']['message'][]='Invalid edit';$error++;
 }else{$error--;}


 }

 //--
    if($error<=0){

  $arr=$GLOBALS['Var_Registration']->CopyProduct($args);


    }
break;


case 'AddSpecifications':
   $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
   $args['pid']=post_vars(array('pid'=>0),$_POST['data'],'numericID');
  $_POST['data']['spf']= GetPropertyInArray('spf',$_POST['data'],array());
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
case  'QuickaddProduct':
  $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['name']=post_vars(array('f_value'=>array('product_name'=>'')),$_POST['data'],'HTML_entities');
$args['pid']=0;
$args['sid']=0;
$args['vid']=0;
$args['description']=post_vars(array('f_value'=>array('description'=>'')),$_POST['data'],'HTML_entities');
$args['sellingPrice']=post_vars(array('f_value'=>array('sell_price'=>0)),$_POST['data'],'numeric');
$args['compairePrice']=post_vars(array('f_value'=>array('compare_price'=>0)),$_POST['data'],'numeric');
$args['sku']=post_vars(array('f_value'=>array('sku'=>0)),$_POST['data'],'alphanumeric');
$args['Stock']=post_vars(array('f_value'=>array('stock'=>0)),$_POST['data'],'numeric');
$args['shippable']=post_vars(array('f_value'=>array('shippable'=>0)),$_POST['data'],'numeric');
$args['shipping_method']=post_vars(array('f_value'=>array('shipping_method'=>0)),$_POST['data'],'numeric');

 $args['weight']=post_vars(array('f_value'=>array('weight'=>0)),$_POST['data'],'numeric');

 $args['weightunit']=post_vars(array('f_value'=>array('weightunit'=>0)),$_POST['data'],'alphanumeric');

 $args['mainimages']=(isset($_POST['data']['f_value']['mainimages']))?Walk_Ways_each($_POST['data']['f_value']['mainimages'],'HTML_entities'):array();

  $args['webimages']=(isset($_POST['data']['f_value']['webimages']))?Walk_Ways_each($_POST['data']['f_value']['webimages'],'HTML_entities'):array();
 $args['featureimage']=(isset($_POST['data']['f_value']['featureimage']))?Walk_Ways_each($_POST['data']['f_value']['featureimage'],'HTML_entities'):array();


$args['category_raw']=(isset($_POST['data']['f_value']['category']))?Walk_Ways_each($_POST['data']['f_value']['category'],'numericID'):array();
  //--Error chack
      $error=7;


 if($args['name']==''){ $arr['mistake']['message'][]='name is required.';}else{$error--;}


 if($args['sellingPrice']==''){ $arr['mistake']['message'][]='selling Price is required.';}else{$error--;}
  if($args['compairePrice']==''){ $arr['mistake']['message'][]='compaire Price is required.';}else{$error--;}
  if($args['sku']==''){ $arr['mistake']['message'][]='sku is required.';}else{$error--;}
  if($args['Stock']==''){ $arr['mistake']['message'][]='stock is required.';}else{$error--;}


  if(intval($args['shippable'])==1){
      $error=$error+3;
  if($args['shipping_method']==''){ $arr['mistake']['message'][]='shipping method is required.';}else{$error--;}

   if($args['weight']==''){ $arr['mistake']['message'][]='weight is required.';}else{$error--;}

  if($args['weightunit']==''){ $arr['mistake']['message'][]='weightunit is required.';}else{$error--;}
  }



  if((count($args['mainimages'])+count($args['webimages']))<1){ $arr['mistake']['message'][]='Images are required.';}else{$error--;}

 $args['category']=array();//empty by default
if(count($args['category_raw'])>=0){
 $args['category_rows'] =  $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validownerCategory_idByArray','category_id_Array'=>$args['category_raw'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
 if(is_array( $args['category_rows'])){
    foreach( $args['category_rows'] as $row){
     $args['category'][]=  $row['category_id'];

    }
 }
}





 if(count($args['category'])<=0){  $arr['mistake']['message'][]='Select a category.';}else{$error--;}





    if($error<=0){

  $arr=$GLOBALS['Var_Registration']->QuickaddProduct($args);


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
  $args['sku']=post_vars(array('f_value'=>array('sku'=>0)),$_POST['data'],'alphanumeric');
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
 $args['featureimage']=(isset($_POST['data']['f_value']['featureimage']))?Walk_Ways_each($_POST['data']['f_value']['featureimage'],'HTML_entities'):array();
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

  $_POST['data']['f_value']['fiatr']=GetPropertyInArray('fiatr',$_POST['data']['f_value'],'');
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
  $args['processing_time']=post_vars(array('f_value'=>array('processingtime'=>'')),$_POST['data'],'numericID');




 $_POST['data']['f_value']['srng']=GetPropertyInArray('srng',$_POST['data']['f_value'],array());

 $args['srng']=JsonTrueDecode($_POST['data']['f_value']['srng'],array());
 $args['srng']=  Walk_Ways_each($args['srng'],'numeric');

 $_POST['data']['f_value']['stcg']=GetPropertyInArray('stcg',$_POST['data']['f_value'],array());
 $args['stcg']=JsonTrueDecode($_POST['data']['f_value']['stcg'],array());
  $_POST['data']['f_value']['lif']=GetPropertyInArray('lif',$_POST['data']['f_value'],array());
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
      $error=4;
 if($args['shipping_name']==''){ $arr['mistake']['message'][]='shipping name is required.';}else{$error--;}


  if($args['type']==''){ $arr['mistake']['message'][]='shipping type is required.';}else{$error--;}

   if($args['processing_time']==''){ $arr['mistake']['message'][]='processing time is required.';}else{$error--;}

 if(count($args['lif'])<=0){  $arr['mistake']['message'][]='Location is required.';}else{$error--;}

  if($error<=0){

$arr=$GLOBALS['Var_Registration']->StoreShipping($args);


    }


break;

case 'AddStoreMenu':

  $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];

  $_POST['data']['f_value']['menu']=GetPropertyInArray('menu',$_POST['data']['f_value'],'');

  $args['RawMenu']=JsonTrueDecode($_POST['data']['f_value']['menu'],array());

  $args['menu']=$GLOBALS['Var_UtilityCheck']->ValidateStoreMenu($args['RawMenu']);

  $error=1;
 if(count($args['menu'])==0){  $arr['mistake']['message'][]='Store Menu is required.';}else{$error--;}
//check_response($args['RawMenu']);check_response( $args['menu']);



    if($error<=0){

$arr=$GLOBALS['Var_Update']->StoreMenu($args);


    }

break;
case 'addcategorybox':
$args=array();
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['cid']=post_vars(array('f_value'=>array('cid'=>0)),$_POST['data'],'numericID');
$args['index']=post_vars(array('f_value'=>array('id'=>0)),$_POST['data'],'numericID');
$args['sort']=post_vars(array('f_value'=>array('sort:0'=>0)),$_POST['data'],'numericID');
$args['action']=post_vars(array('f_value'=>array('action'=>0)),$_POST['data'],'numericID');
$args['sort']=Valided_ENUM($args['sort'],array(0,1,2),0);
$args['action']=Valided_ENUM($args['action'],array(0,1),0);
$args['index']=Valided_ENUM($args['index'],array(0,1,2,3),0);
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
case  'addslider':
$args=array();
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['index']=post_vars(array('f_value'=>array('i'=>0)),$_POST['data'],'numericID');
$args['action']=post_vars(array('f_value'=>array('action'=>0)),$_POST['data'],'numericID');

$args['action']=Valided_ENUM($args['action'],array(0,1,2),0);
$args['index']=Valided_ENUM($args['index'],array(0,1,2,3,4),0);

   $args['linkto']=(isset($_POST['data']['f_value']['linkto']))?Walk_Ways_each($_POST['data']['f_value']['linkto'],'HTML_entities'):array();

    $args['mainimages']=(isset($_POST['data']['f_value']['mainimages']))?Walk_Ways_each($_POST['data']['f_value']['mainimages'],'HTML_entities'):array();

  $args['webimages']=(isset($_POST['data']['f_value']['webimages']))?Walk_Ways_each($_POST['data']['f_value']['webimages'],'HTML_entities'):array();

  //--Error chack
   $error=1;

     if(count($args['linkto'])>0){
    if(isset($args['linkto']['id'])&&isset($args['linkto']['mid'])&&isset($args['linkto']['type'])&&isset($args['linkto']['name'])&&isset($args['linkto']['slug'])){
        $error--;
    }else{
        $arr['mistake']['message'][]='ajax_31';
    }


}



if($args['action']!=0){
      $error++;



  if((count($args['mainimages'])+count($args['webimages']))<1){ $arr['mistake']['message'][]='ajax_30';}else{$error--;}

  }

    if($error<=0){

$arr=$GLOBALS['Var_Update']->storeSlider($args);


    }

break;




case 'upsellproduct':
$args=array();
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];

$args['pid']=post_vars(array('f_value'=>array('pid'=>0)),$_POST['data'],'numericID');
$_POST['data']['f_value']['upsell']=GetPropertyInArray('upsell',$_POST['data']['f_value'],'[]');
$RawUpsell=JsonTrueDecode($_POST['data']['f_value']['upsell'],array());
$RawUpsell=  Walk_Ways_each($RawUpsell,'numericID');
$RawUpsellproductRow=array();

  //--Error chack
   $error=2;
     $args['productRow']=NULL;//defult
    if($args['pid']==''||$args['pid']==0){ $arr['mistake']['message'][]='pid  is required.';}else{$error--;


     $args['productRow']=$GLOBALS['Var_UtilityCheck']->IsOwnerProduct_M($args['pid'],$args['ActorEntityData']['EntityData']['entity_id']);


    }



 if($args['productRow']==NULL){
    $arr['mistake']['message'][]='Invalid Product';$error++;
 }else{$error--;}

     $upsellList=$GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_productsByIdArray','product_id'=>$RawUpsell,'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
$RawUpsellproductRow=$GLOBALS['Var_StoreDashboard']->ParseProducts($upsellList,array('parseLevel'=>1)) ;

// getting corent up sell ids
$RawUpsell=array();
 foreach($RawUpsellproductRow  as $value){
     $RawUpsell[]=$value['pid'];

 }



$args['upsell']=$RawUpsell;
$args['upsellproductRow']=$RawUpsellproductRow;


    if($error<=0){

  $arr=$GLOBALS['Var_Update']->UpdateProductUpsell($args);


    }


break;
case 'loadStoreProgressdata';
$args=array();

$args['start_time']=post_vars(array('f_value'=>array('start_time'=>time())),$_POST['data'],'numericID');
$args['end_time']=post_vars(array('f_value'=>array('end_time'=>time())),$_POST['data'],'numericID');
$args['entity_id']=$GLOBALS['Var_ActorEntityData']['EntityData']['entity_id'];
$args['object']=post_vars(array('f_value'=>array('object'=>0)),$_POST['data'],'numericID');

  if($error<=0){
  $arr['state'] =200;
  $arr['response']=$GLOBALS['Var_StoreDashboard']->RetriveStoreReport($args);


    }

break;

case 'product_brand_copy':
$args=array();
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];

$args['brand_id']=post_vars(array('f_value'=>array('brand_id'=>0)),$_POST['data'],'numericID');
$_POST['data']['f_value']['varient_id']=GetPropertyInArray('varient_id',$_POST['data']['f_value'],'[]');
$RawVarient_id=JsonTrueDecode($_POST['data']['f_value']['varient_id'],array());
$RawVarient_id=  Walk_Ways_each($RawVarient_id,'numericID');

$args['RawVarient_id']=$RawVarient_id;


$args['category_raw']=(isset($_POST['data']['f_value']['category']))?Walk_Ways_each($_POST['data']['f_value']['category'],'numericID'):array(1);




 //--Error chack
   $error=2;

   $args['brand_row']=NULL; $args['varient_row']=array();

   if($args['brand_id']!=''){
       $args['brand_row']= $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'isValidBrandForPublic','brand_id'=>$args['brand_id']));
   }

   if(count($RawVarient_id)>0){
     $args['varient_row']= $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'isValidBrandVarientIdArray','Varient_id_Array'=>$RawVarient_id,'brand_id'=>$args['brand_id']));
   }


   if(count(  $args['varient_row'])==0){ $arr['mistake']['message'][]='text_376';}else{$error--; }
   if($args['brand_row']==NULL){ $arr['mistake']['message'][]='text_377';}else{$error--; }



    $args['category']=array();//empty by default
if(count($args['category_raw'])>=0){
 $args['category_rows'] =  $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validownerCategory_idByArray','category_id_Array'=>$args['category_raw'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
 if(is_array( $args['category_rows'])){
    foreach( $args['category_rows'] as $row){
     $args['category'][]=  $row['category_id'];

    }
 }
}





     if($error<=0){
   $arr= $GLOBALS['Var_Registration']->RagisterProductFromBrandCopy($args);

    }

break;



case 'creatediscount':
$args=array();
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['discount_id']=post_vars(array('f_value'=>array('id'=>0)),$_POST['data'],'numericID');
$args['discount_code']=post_vars(array('f_value'=>array('dc'=>0)),$_POST['data'],'numericID');
$args['discount_type']=post_vars(array('f_value'=>array('dt'=>0)),$_POST['data'],'alphanumeric');
$args['numeric_discount']=post_vars(array('f_value'=>array('d'=>0)),$_POST['data'],'numericID');
$args['apply_type']=post_vars(array('f_value'=>array('at'=>0)),$_POST['data'],'numericID');
$args['minimum_spend']=post_vars(array('f_value'=>array('ms'=>0)),$_POST['data'],'numericID');
$args['uses_type']=post_vars(array('f_value'=>array('ut'=>0)),$_POST['data'],'numericID');
$args['validity']=post_vars(array('f_value'=>array('v'=>0)),$_POST['data'],'numericID');
$args['begin_date']=post_vars(array('f_value'=>array('bd'=>0)),$_POST['data'],'HTML_entities');
$args['expires_date']=post_vars(array('f_value'=>array('ed'=>0)),$_POST['data'],'HTML_entities');

 if($error<=0){
   $arr= $GLOBALS['Var_Registration']->RagisterDiscount($args);

    }

break;
case 'storeproductstatusupdate':
 $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['pid']=post_vars(array('f_value'=>array('pid'=>0)),$_POST['data'],'numericID');
 $args['is_live']=post_vars(array('f_value'=>array('s'=>0)),$_POST['data'],'numericID');


  //--Error chack
      $error=1;

 if($args['pid']!=0){
      // check for owner category id
      $args['product_row']=$GLOBALS['Var_UtilityCheck']->IsOwnerProduct_M($args['pid'],$args['ActorEntityData']['EntityData']['entity_id']);

 if($args['product_row']==NULL){
    $arr['mistake']['message'][]='Invalid edit';$error++;
 }else{$error--;

    $args['product_row']= $GLOBALS['Var_StoreDashboard']-> ParseProducts(array($args['product_row']));





 }


 }

 //--
    if($error<=0){

 $arr=$GLOBALS['Var_Update']->UpdateProductStatus($args);


    }

break;




//-------===store dashboard====------------
//-------===company dashboard====------------
case  'addcompanycategories':
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

 if(!$GLOBALS['Var_UtilityCheck']->IsOwnerCompanyCategory($args['cid'],$args['ActorEntityData']['EntityData']['entity_id'])){
    $arr['mistake']['message'][]='Invalid edit';$error++;
 }else{$error--;}


 }
  if($args['parent']!=0){
         // check for owner category id

 if(!$GLOBALS['Var_UtilityCheck']->IsOwnerCompanyCategory($args['parent'],$args['ActorEntityData']['EntityData']['entity_id'])){
    $arr['mistake']['message'][]='Invalid edit';$error++;
 }else{$error--;}
  }

//--
    if($error<=0){

  $arr=$GLOBALS['Var_Company_Ragisteration']->addNewCategory($args);


    }
break;

case'brand_one':
   $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['name']=post_vars(array('f_value'=>array('brand_name'=>'')),$_POST['data'],'HTML_entities');
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

$args['category_raw']=(isset($_POST['data']['f_value']['category']))?Walk_Ways_each($_POST['data']['f_value']['category'],'numericID'):array();

  //--Error chack
      $error=2;
 if($args['name']==''){ $arr['mistake']['message'][]='name is required.';}else{$error--;}
 if($args['pid']!=0){
      // check for owner product id

 if(!$GLOBALS['Var_UtilityCheck']->IsOwnerBrand($args['pid'],$args['ActorEntityData']['EntityData']['entity_id'])){
    $arr['mistake']['message'][]='Invalid edit';$error++;
 }else{$error--;}


 }

 if($args['has_varient']==1&&($args['varient_1']==''&&$args['varient_2']==''&&$args['varient_3']=='')){
         $arr['mistake']['message'][]='Chose a varient  name.';$error++;
 }

 $args['category']=array();//empty by default
if(count($args['category_raw'])>=0){
 $args['category_rows'] =  $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validownercompanyCategory_idByArray','category_id_Array'=>$args['category_raw'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
 if(is_array( $args['category_rows'])){
    foreach( $args['category_rows'] as $row){
     $args['category'][]=  $row['category_id'];

    }
 }
}


 if(count($args['category'])<=0){  $arr['mistake']['message'][]='Select a category.';}else{$error--;}
//--
    if($error<=0){

  $arr=$GLOBALS['Var_Company_Ragisteration']->AddNewBrand($args);


    }

break;


case 'addbrandinventory':
   $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['pid']=post_vars(array('f_value'=>array('pid'=>0)),$_POST['data'],'numericID');
 $args['vid']=post_vars(array('f_value'=>array('vid'=>0)),$_POST['data'],'numericID');
 $args['act']=post_vars(array('f_value'=>array('act'=>0)),$_POST['data'],'alphanumeric');
  $args['currency']=post_vars(array('f_value'=>array('currency'=>0)),$_POST['data'],'alphanumeric');
 $args['unitsystem']=post_vars(array('f_value'=>array('unitsystem'=>0)),$_POST['data'],'alphanumeric');
  $args['sellingPrice']=post_vars(array('f_value'=>array('sell_price'=>0)),$_POST['data'],'numeric');
 $args['compairePrice']=post_vars(array('f_value'=>array('compare_price'=>0)),$_POST['data'],'numeric');
  $args['unique_identity']=post_vars(array('f_value'=>array('unique_identity'=>0)),$_POST['data'],'alphanumeric');
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
 $args['featureimage']=(isset($_POST['data']['f_value']['featureimage']))?Walk_Ways_each($_POST['data']['f_value']['featureimage'],'HTML_entities'):array();
  $error=2;
  if($args['pid']==''){ $arr['mistake']['message'][]='pid is required.';}else{$error--;}
 if($args['vid']==''){ $arr['mistake']['message'][]='vid is required.';}else{$error--;}

 if(!$GLOBALS['Var_UtilityCheck']->IsOwnerBrand($args['pid'],$args['ActorEntityData']['EntityData']['entity_id'])){
    $arr['mistake']['message'][]='Invalid edit';$error++;
 }

 if($args['vid']!=0){
     if(!$GLOBALS['Var_UtilityCheck']->IsValidBrandVarients($args['vid'],$args['pid'])){
    $arr['mistake']['message'][]='Invalid Varients';$error++;
 }
 }


  if( $args['act']=="new"|| $args['act']=="edit"){
       //--Error chack
      $error=$error+6;
    // check for owner category id


  if($args['sellingPrice']==''){ $arr['mistake']['message'][]='selling Price is required.';}else{$error--;}
  if($args['compairePrice']==''){ $arr['mistake']['message'][]='compaire Price is required.';}else{$error--;}
  if($args['currency']==''){ $arr['mistake']['message'][]='currency is required.';}else{$error--;}
  if($args['unitsystem']==''){ $arr['mistake']['message'][]='unitsystem is required.';}else{$error--;}
  if($args['unique_identity']==''){ $arr['mistake']['message'][]='unique identity is required.';}else{$error--;}


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

 $arr=$GLOBALS['Var_Company_Ragisteration'] ->BrandInventory($args);


    }


break;


case  'AddbrandSpecifications':

$args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
   $args['pid']=post_vars(array('pid'=>0),$_POST['data'],'numericID');
  $_POST['data']['spf']= GetPropertyInArray('spf',$_POST['data'],array());
   $args['spf']=JsonTrueDecode($_POST['data']['spf'],$GLOBALS['Var_BundlePrototype']->DefaultValue('productspecification'));
   $args['spf']=  Walk_Ways_each($args['spf'],'HTML_entities');
    //--Error chack
      $error=1;
    // check for owner category id

 if(!$GLOBALS['Var_UtilityCheck']->IsOwnerBrand($args['pid'],$args['ActorEntityData']['EntityData']['entity_id'])){
    $arr['mistake']['message'][]='Invalid edit';$error++;
 }else{$error--;}


   if($error<=0){

  $arr=$GLOBALS['Var_Company_Ragisteration']->Brandspecification($args);


    }


break;

case 'AddbrandFilter':
  $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
   $args['pid']=post_vars(array('f_value'=>array('pid'=>0)),$_POST['data'],'numericID');

  $_POST['data']['f_value']['fiatr']=GetPropertyInArray('fiatr',$_POST['data']['f_value'],array());
   $args['fiatr']=JsonTrueDecode($_POST['data']['f_value']['fiatr'],array());
  $args['fiatr']=  Walk_Ways_each($args['fiatr'],'alphanumericHTML_entities');
    //--Error chack
      $error=2;
    // check for owner category id

     $args['productRow']= $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'isOwnerBrand','brand_id'=>$args['pid'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));

 if($args['productRow']==NULL){
    $arr['mistake']['message'][]='Invalid edit';$error++;
 }else{$error--;}
if( count( $args['fiatr'])<=0){$arr['mistake']['message'][]='Invalid Filters';}else{$error--;}

   if($error<=0){

  $arr=$GLOBALS['Var_Company_Ragisteration']->BrandFilter($args);


    }



break;



//-------===company dashboard====------------
case 'glRail':
  $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
  $args['Rawdata']=JsonTrueDecode($_POST['data']['f_value'],array());

  if(count($args['Rawdata'])>0){

  $arr=$GLOBALS['Var_ProcessData']->GLrail($args);



  }


break;



//-------===conversation====------------
case 'createconversation':
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['recipient_entity_id']=JsonTrueDecode($_POST['data']['f_value'],array());
 $args['recipient_entity_id']=  Walk_Ways_each($args['recipient_entity_id'],'numericID');
  $error=1;
 if(count($args['recipient_entity_id'])==0){ $arr['mistake']['message'][]='recipient is required.';}else{
    $args['recipient_entity_id'][]=$args['ActorEntityData']['EntityData']['entity_id'];


  $AllRecipient_EntityRow =   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'EntityRowByArray','entity_id_Array'=>$args['recipient_entity_id']));
  if( $AllRecipient_EntityRow!=NULL){
    $args['recipient_entity_id']=array();  $args['AllRecipient_EntityRow']=array();
    foreach($AllRecipient_EntityRow as $row){
      $args['recipient_entity_id'][]=$row['entity_id'];
      $args['AllRecipient_EntityRow'][]=$GLOBALS['Var_ViewParse']->ParseEntityRow($row);
    }
     $error--;
    }

 }



   if($error==0){
      $arr =   $GLOBALS['Var_Registration']->Createconversation($args);
   }

break;
case  (preg_match('/chatform:*/', $_POST['data']['form']) ? true : false)://commentform

$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['message']=post_vars(array('f_value'=>array('messagetext'=>'')),$_POST['data'],'HTML_entities');
$args['conversation_id']=post_vars(array('f_value'=>array('cid'=>'')),$_POST['data'],'numericID');
 $error=2;
   if($args['message']==''){ $arr['mistake']['message'][]='message is required.';}else{$error--;}


  if($args['conversation_id']==''){ $arr['mistake']['message'][]='conversation id is required.';}else{$error--;}

  if($args['conversation_id']!=''){$error++;
     $args['conversation_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validconversation_id','conversation_id'=>$args['conversation_id'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
     if( $args['conversation_row']!=NULL){
           if($GLOBALS['Var_Conversation']->IsMemberInConversation($args['conversation_row'])){
         $error--;
     }
     }
  }

    if($error<=0){

  $arr=$GLOBALS['Var_Registration']->SendconversationTextMessage($args);


    }


 break;
 case 'clearhistory':
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['conversation_id']=post_vars(array('f_value'=>array('cid'=>'')),$_POST['data'],'numericID');
 $error=1;

  if($args['conversation_id']==''){ $arr['mistake']['message'][]='conversation id is required.';}else{$error--;}

  if($args['conversation_id']!=''){$error++;
     $args['conversation_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validconversation_id','conversation_id'=>$args['conversation_id'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
     if( $args['conversation_row']!=NULL){
     if($GLOBALS['Var_Conversation']->IsMemberInConversation($args['conversation_row'])){
         $error--;
     }
     }
  }

    if($error<=0){

 $ret= $GLOBALS['Var_Conversation']->ClearHistory($args['conversation_row']);
 $arr['state']=($ret)?200:500;
 $arr['response']='';
    }
 break;
 case 'sendaMessage':


$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['message']=post_vars(array('f_value'=>array('messagetext'=>'')),$_POST['data'],'HTML_entities');
$reid=post_vars(array('f_value'=>array('reid'=>'')),$_POST['data'],'');
 $args['recipient_entity_id']=JsonTrueDecode($reid,array());
 $args['recipient_entity_id']=  Walk_Ways_each($args['recipient_entity_id'],'numericID');

 $error=2;
   if($args['message']==''){ $arr['mistake']['message'][]='message is required.';}else{$error--;}


if(count($args['recipient_entity_id'])==0){ $arr['mistake']['message'][]='recipient is required.';}else{

    $args['recipient_entity_id'][]=intval($args['ActorEntityData']['EntityData']['entity_id']);


  $AllRecipient_EntityRow =   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'EntityRowByArray','entity_id_Array'=>$args['recipient_entity_id']));
  if( $AllRecipient_EntityRow!=NULL){
    $args['recipient_entity_id']=array();  $args['AllRecipient_EntityRow']=array();
    foreach($AllRecipient_EntityRow as $row){
      $args['recipient_entity_id'][]=$row['entity_id'];
      $args['AllRecipient_EntityRow'][]=$GLOBALS['Var_ViewParse']->ParseEntityRow($row);
    }
     $error--;
    }

 }

    if($error<=0){

  $arr=$GLOBALS['Var_Registration']->SendTextMessageToMembers($args);


    }

  break;

  case 'FORM_0001': //ChatFocusLossInformToMainServer
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['conversation_id']=post_vars(array('f_value'=>array('cid'=>'')),$_POST['data'],'numericID');
 $error=1;

  if($args['conversation_id']==''){ $arr['mistake']['message'][]='conversation id is required.';}else{$error--;}

  if($args['conversation_id']!=''){$error++;
     $args['conversation_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validconversation_id','conversation_id'=>$args['conversation_id'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
     if( $args['conversation_row']!=NULL){
     if($GLOBALS['Var_Conversation']->IsMemberInConversation($args['conversation_row'])){
         $error--;
     }
     }
  }

    if($error<=0){

 $ret= $GLOBALS['Var_Conversation']->UpdateLastchatcheckTime($args['conversation_row']);
 $arr['state']=200;
 $arr['response']='';
    }


  break;




//-------===conversation====------------
//-------===checkin====------------
case 'loadSBdata':
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['checkin']=post_vars(array('f_value'=>array('checkin_id'=>'')),$_POST['data'],'numericID');
 $error=1;
  if($args['checkin']==''){ $arr['mistake']['message'][]='checkin id is required.';}else{$error--;}


  if($args['checkin']!=''){$error++;
     $args['checkIn_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validcheckin_id','checkIn_id'=>$args['checkin'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
     if( $args['checkIn_row']!=NULL){$error--;}
  }

  if( $error==0){
  $storeOutput=new StoreOutput( $args['checkIn_row']['store_id']);
  $SBData= $storeOutput->GetCheckInBrowsingData( $args['checkIn_row']);
 $arr = array('state' =>200,'response' =>$SBData,'mistake' =>array('heading'=>'','message'=>array()));
  }

break;

case 'createcheckinbystore_id':
 $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['store_id']=post_vars(array('f_value'=>array('store_id'=>'')),$_POST['data'],'numericID');
  $error=1;
  if($args['store_id']==''){ $arr['mistake']['message'][]='store_id is required.';}else{$error--;}


  if($args['store_id']!=''){$error++;
     $args['entity_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validentity_id','entity_id'=> $args['store_id']));
  if( $args['entity_row']!=NULL){
      if($args['entity_row']['type']==1){//ensure it is store
         $error--;
      }

     }
  }



  if( $error==0){
  $storeOutput=new StoreOutput($args['entity_row']['entity_id']);
  $SBData= $storeOutput->GetStoreBrowsingData();
 $SBData['mode']=1;
 $arr = array('state' =>200,'response' =>$SBData,'mistake' =>array('heading'=>'','message'=>array()));
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
     $args['checkIn_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validcheckin_id','checkIn_id'=>$args['checkin'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
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
     $args['checkIn_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validcheckin_id','checkIn_id'=>$args['checkin'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
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
     $args['checkIn_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validcheckin_id','checkIn_id'=>$args['checkin'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
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
  case 'buyeraddressSelect'://buyerchangepincode from product page
   $args=array();
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
   $args['address_id']=post_vars(array('f_value'=>array('address_id'=>'')),$_POST['data'],'numericID');

 $args['checkin']=post_vars(array('f_value'=>array('checkin'=>'')),$_POST['data'],'url_chars');


 //--Error chack
  $error=2;
 if($args['address_id']==''){ $arr['mistake']['message'][]='address_id is required.';}else{$error--;}
 if($args['checkin']==''){ $arr['mistake']['message'][]='checkin is required.';}else{$error--;}

   if($args['checkin']!=''){$error++;
     $args['checkIn_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validcheckin_id','checkIn_id'=>$args['checkin'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
     if( $args['checkIn_row']!=NULL){$error--;}
  }


 if($error==0){

      $arr=$GLOBALS['Var_Update'] ->UpdateBuyerAddressIdInCheckin($args);


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
  $args['address_id']=post_vars(array('f_value'=>array('addr_id'=>'')),$_POST['data'],'numericID');
   //--Error chack
  $error=1;
 if($args['checkin']==''){ $arr['mistake']['message'][]='checkin id is required.';}else{$error--;}

   if($args['checkin']!=''){
       $error++;
    $args['checkIn_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validcheckin_id','checkIn_id'=>$args['checkin'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
if( $args['checkIn_row']!=NULL){
 $storeOutput=new StoreOutput( $args['checkIn_row']['store_id']);
 $members= $storeOutput->GetCheckInMember($args['checkIn_row']);
 $args['checkIn_parse']=$storeOutput->ParseCheckInData($args['checkIn_row'],array('Pbank'=>0));


    //address check
if($args['address_id']!=''){
    $storeAddress=$args['checkIn_parse']['addr'][0];
    $buyerAddress=$args['checkIn_parse']['addr'][1];
  $args['shippingAddress']=(isset($buyerAddress[$args['address_id']]))?$buyerAddress[$args['address_id']]:$storeAddress;
    $args['checkIn_parse']['addr_id']=$args['address_id'];

      $error--;
}





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
 $args['action']= Valided_ENUM( $args['action'],array(0,1),0);

 $args['feid']=post_vars(array('f_value'=>array('feid'=>'')),$_POST['data'],'numericID');
$args['af']=post_vars(array('f_value'=>array('af'=>'')),$_POST['data'],'alphanumeric');
    //--Error chack
      $error=4;
 if($args['checkin']==''){ $arr['mistake']['message'][]='checkin id is required.';}else{$error--;}

   if($args['checkin']!=''){
       $error++;
    $args['checkIn_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validcheckin_id','checkIn_id'=>$args['checkin'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
if( $args['checkIn_row']!=NULL){
  $error--;
  //repaire checkin
  $GLOBALS['Var_Utility']->RepaireCheckin($args['checkIn_row'],array('how'=>'BY_CHECKIN_ROW'));


 }else{  $arr['mistake']['message'][]='Invalid edit';$error++;}

      }

 if($args['action']===''){ $arr['mistake']['message'][]='action is required.';}else{$error--;}
  if($args['af']==''){ $arr['mistake']['message'][]='af is required.';}else{$error--;}

 if($args['feid']==''){ $arr['mistake']['message'][]='feid is required.';}else{
      if(!$GLOBALS['Var_UtilityCheck']->IsValidEntity($args['feid'])){
          $arr['mistake']['message'][]='valid feid is required.';
     }else{
         if($args['action']==1){//When we add in check in we check is it freind ??
         if($GLOBALS['Var_UtilityCheck']->IsFriend($args['ActorEntityData']['EntityData']['entity_id'],$args['feid'])){
              $error--;
         }
         }else{
              $error--;  //for removeing
         }

     }
     }


    //--
    if($error==0){

 $arr=$GLOBALS['Var_Registration']->CheckInMemberEdit($args);



    }
break;
case 'checkin_initwith_new_member':
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['store_id']=post_vars(array('f_value'=>array('store_id'=>'')),$_POST['data'],'numericID');
 $args['feid']=post_vars(array('f_value'=>array('entity_id'=>'')),$_POST['data'],'numericID');
  $error=2;
  if($args['store_id']==''){ $arr['mistake']['message'][]='store_id is required.';}else{$error--;}


  if($args['store_id']!=''){$error++;
     $args['store_entity_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validentity_id','entity_id'=> $args['store_id']));
  if( $args['store_entity_row']!=NULL){
      if($args['store_entity_row']['type']==1){//ensure it is store
         $error--;
      }

     }
  }



   if($args['feid']==''){ $arr['mistake']['message'][]='feid is required.';}else{
            $args['front_entity_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validentity_id','entity_id'=>$args['feid']));

      if($args['front_entity_row']==NULL){
          $arr['mistake']['message'][]='valid feid is required.';
     }else{
      $args['EntityInformation']     = new DirectEntityRelation($args['front_entity_row'],$args['ActorEntityData']['EntityData']);
          if( $args['EntityInformation']->IsAllowGoonShopping()){
              $error--;
          }else{
               $arr['mistake']['message'][]='shopping not allowed.';
          }

     }
     }


  if( $error==0){


  $arr=$GLOBALS['Var_Registration']->CheckinInitWithNewMember($args);
  }
break;

case 'LoadInPbank':
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['ids']=(isset($_POST['data']['f_value']['ids']))?Walk_Ways_each($_POST['data']['f_value']['ids'],'numericID'):array();
 $args['type']=post_vars(array('f_value'=>array('Idtype'=>'')),$_POST['data'],'numericID');
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

case 'LoadEntityCard':
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['ids']=(isset($_POST['data']['f_value']['ids']))?Walk_Ways_each($_POST['data']['f_value']['ids'],'numericID'):array();

   //--Error chack
      $error=1;


  if((count($args['ids'])>0)&&is_index_array($args['ids'])){
      $error--;
           }

   //--
  if($error==0){

  $arr=$GLOBALS['Var_ProcessData']->LoadEntities($args);


    }

break;

case 'nextorderstatus':
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];

 $args['nstatus']=post_vars(array('f_value'=>array('nextorderstatus:0'=>'')),$_POST['data'],'numericID');
$args['order_id']=post_vars(array('f_value'=>array('oid'=>'')),$_POST['data'],'numericID');
$args['status_note']=post_vars(array('f_value'=>array('status_note'=>'')),$_POST['data'],'HTML_entities');


 //--Error chack
      $error=2;
 if($args['order_id']==''){ $arr['mistake']['message'][]='order id is required.';}else{$error--;}
  if($args['nstatus']==''){ $arr['mistake']['message'][]='status is required.';}else{$error--;}

      if($args['order_id']!=''){$error++;
   $args['order_row']= $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validOrderOwnerStoreid','order_id'=>$args['order_id'],'store_entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
    if($args['order_row']==NULL){
// when buyer cahnge the order status // for order cancel
     $args['order_row']= $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validOrderOwnerbuyerid','order_id'=>$args['order_id'],'buyer_entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));

    }

         if($args['order_row']!=NULL){
    $args['checkIn_row']=   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validcheckin_id','checkIn_id'=>$args['order_row']['checkIn_id'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));

  if($args['checkIn_row']!=NULL){

$args['NextOrderStatus']=$GLOBALS['Var_Utility']->GetNextOrderStatus($args['order_row']['order_type'],$args['order_row']['order_status'],$args['order_row']['buyer_entity_id'],$args['order_row']['store_entity_id']);


if (in_array($args['nstatus'],$args['NextOrderStatus'])) {
  $error--;//for order row
}else{
$arr['mistake']['message'][]='valid status is required.';
}

}//check in row

         }


      }




   //--
  if($error==0){

  $arr=$GLOBALS['Var_Registration']->UpdateShippingOrderStatus($args);


    }
break;

//-------===checkin====------------



//-------===forget passworrd====------------


case 'forgetpasswordform0':
 $args['accountstr']=post_vars(array('f_value'=>array('accountstr'=>'')),$_POST['data'],'HTML_entities');
 $args['recaptcha']=post_vars(array('f_value'=>array('recaptcha'=>'')),$_POST['data'],'');

 //--Error chack
      $error=2;

 if($args['accountstr']==''){ $arr['mistake']['message'][]='search words are required.';}else{$error--;}
 if(!$GLOBALS['Var_UtilityCheck']->VerifyRecaptcha($args['recaptcha'])){ $arr['mistake']['message'][]='RecaptchaError'; }else{$error--;}




if( $error==0){
$args['form']=0;
 $arr=$GLOBALS['Var_ProcessData']->forgetpassword($args);
}

break;

case 'forgetpasswordform1':
 $args['login_identity_id']=post_vars(array('f_value'=>array('aid'=>'')),$_POST['data'],'numericID');

 //--Error chack
      $error=1;

 if($args['login_identity_id']==''){ $arr['mistake']['message'][]='account_id is required.';}else{$error--;}

  if($args['login_identity_id']!=''){$error++;
    $args['account_row']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'acccount_row','login_identity_id'=>$args['login_identity_id']));

    if( $args['account_row']!=NULL){
        $error--;
    }else{
        $arr['mistake']['message'][]='valid account_id is required.';
    }


  }




if( $error==0){
$args['form']=1;
 $arr=$GLOBALS['Var_ProcessData']->forgetpassword($args);
}

break;
case 'forgetpasswordconfirmation':
 $args['login_identity_id']=post_vars(array('f_value'=>array('aid'=>'')),$_POST['data'],'numericID');
$args['code']=post_vars(array('f_value'=>array('code'=>'')),$_POST['data'],'alphanumeric');
$args['accesskey']=post_vars(array('f_value'=>array('accesskey'=>'')),$_POST['data'],'alphanumeric');
 //--Error chack
      $error=2;

 if($args['login_identity_id']==''){ $arr['mistake']['message'][]='account_id is required.';}else{$error--;}
  if($args['code']==''){ $arr['mistake']['message'][]='code is required.';}else{$error--;}

    if($args['login_identity_id']!=''){$error++;
    $args['account_row']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'acccount_row','login_identity_id'=>$args['login_identity_id']));

    if( $args['account_row']!=NULL){
        $error--;
    }else{
        $arr['mistake']['message'][]='valid account_id is required.';
    }


  }



if( $error==0){
$args['form']=2;
 $arr=$GLOBALS['Var_ProcessData']->forgetpassword($args);
}

break;


case 'forgetpasswordform4':
$args['login_identity_id']=post_vars(array('f_value'=>array('aid'=>'')),$_POST['data'],'numericID');
 $args['token']=post_vars(array('f_value'=>array('token'=>'')),$_POST['data'],'alphanumeric');
 $args['password']=post_vars(array('f_value'=>array('password'=>'')),$_POST['data'],'alphanumeric');

 //--Error chack
      $error=2;

 if($args['login_identity_id']==''){ $arr['mistake']['message'][]='account_id is required.';}else{$error--;}
  if($args['password']==''){ $arr['mistake']['message'][]='password is required.';}else{$error--;}
  if($args['login_identity_id']!=''){$error++;
    $args['account_row']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'acccount_row','login_identity_id'=>$args['login_identity_id']));

    if( $args['account_row']!=NULL){
        $error--;
    }else{
        $arr['mistake']['message'][]='valid account_id is required.';
    }


  }




if( $error==0){
$args['form']=4;
 $arr=$GLOBALS['Var_ProcessData']->forgetpassword($args);
}

break;


//------===Update info==--
 case  (preg_match('/infoUpdate:*/', $_POST['data']['form']) ? true : false)://commentform
 $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $infoID=post_vars(array('f_value'=>array('infoID'=>'')),$_POST['data'],'alphanumeric');

 switch($infoID){
   case 'basicbuyer':
    $args['livingPlace']=post_vars(array('f_value'=>array('livingPlace'=>'')),$_POST['data'],'HTML_entities');
    $args['sex']=post_vars(array('f_value'=>array('sex:0'=>'')),$_POST['data'],'numeric');
    $args['website']=post_vars(array('f_value'=>array('website'=>'')),$_POST['data'],'HTML_entities');
          $error=0;

   break;
     case 'basicstore':

    $args['website']=post_vars(array('f_value'=>array('website'=>'')),$_POST['data'],'HTML_entities');
          $error=0;

   break;
    case 'aboutbuyer':
    $args['about']=post_vars(array('f_value'=>array('about'=>'')),$_POST['data'],'HTML_entities');
          $error=0;
   break;
    case 'aboutstore':
    $args['about_store']=post_vars(array('f_value'=>array('about_store'=>'')),$_POST['data'],'HTML_entities');
          $error=0;
   break;
     case 'storeaddress':



         $args=array();
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
  $args['address_id']=post_vars(array('f_value'=>array('address_id'=>0)),$_POST['data'],'numericID');
  $args['address']=post_vars(array('f_value'=>array('address'=>'')),$_POST['data'],'HTML_entities');
  $args['landmark']=post_vars(array('f_value'=>array('landmark'=>'')),$_POST['data'],'HTML_entities');
  $args['phone']=post_vars(array('f_value'=>array('phone'=>'')),$_POST['data'],'numericID');
  $args['country_id']=post_vars(array('f_value'=>array('country'=>'')),$_POST['data'],'numericID');
  $args['state_id']=post_vars(array('f_value'=>array('state'=>'')),$_POST['data'],'numericID');
  $args['city_id']=post_vars(array('f_value'=>array('citybystate'=>'')),$_POST['data'],'numericID');
  $args['town_id']=post_vars(array('f_value'=>array('townbycity'=>'')),$_POST['data'],'numericID');



     //--Error chack
      $error=5;

 if($args['address']==''){ $arr['mistake']['message'][]='ajax_18';}else{$error--;}
 if($args['phone']==''){ $arr['mistake']['message'][]='ajax_19';}else{$error--;}
 //if($args['country_id']==''){ $arr['mistake']['message'][]='ajax_20';}else{$error--;}
 //if($args['state_id']==''){ $arr['mistake']['message'][]='ajax_21';}else{$error--;}
 //if($args['city_id']==''){ $arr['mistake']['message'][]='ajax_22';}else{$error--;}
 //if($args['town_id']==''){ $arr['mistake']['message'][]='ajax_23';}else{$error--;}

 //---
  $args['countryInfo']=NULL; $args['stateInfo']=NULL; $args['cityInfo']=NULL;$args['towninfo']=NULL;$args['locationinfo']=NULL;$args['postalCodeinfo']=NULL;
 if($args['country_id']!=''){

   $args['countryInfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validCountryInfo','countryinfo_id'=> $args['country_id']));

    }


if($args['state_id']!=''&$args['country_id']!=''){

  $args['stateInfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_fl_admin_id','fl_admin_id'=>$args['state_id'],'countryinfo_id'=>$args['country_id']));

    }

   if( $args['countryInfo']==NULL){$arr['mistake']['message'][]='ajax_20'; }else{ $error--;   }
   if($args['stateInfo']==NULL){$arr['mistake']['message'][]='ajax_21'; }else{ $error--;   }


 if($args['state_id']!=''&$args['country_id']!=''&&$args['city_id']!=''){

 $args['cityInfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_city_id_by_fl_admin_id','city_id'=> $args['city_id'],'fl_admin_id'=> $args['state_id']));


    }

 if($args['state_id']!=''&$args['country_id']!=''&&$args['city_id']!=''&&$args['town_id']!=''){

 $args['towninfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_town_id_by_city_id_by_fl_admin_id','town_id'=>$args['town_id'],'city_id'=> $args['city_id'],'fl_admin_id'=> $args['state_id']));

    }

 if($args['cityInfo']==NULL){$arr['mistake']['message'][]='ajax_22'; }else{ $error--;   }
// if($args['towninfo']==NULL){$arr['mistake']['message'][]='ajax_23'; }else{ $error--;   }

$args['locationinfo']=($args['towninfo']==NULL)?$args['cityInfo']:$args['towninfo'];
//we want to empty towm field for Null town value
if(($args['towninfo']==NULL)){
    $args['towninfo']=array('location_id'=>'','location'=>'');
}
    //--

if(($args['postalCodeinfo']==NULL)){
    $args['postalCodeinfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_postalcode_id','postalCode_id'=>$args['locationinfo']['postalCode_id']));

}
//-----INTERNAL STORE ADDRESS
   break;
   case 'Storepolicy':
    $args['store_policy']=post_vars(array('f_value'=>array('store_policy'=>'')),$_POST['data'],'HTML_entities');
    $args['return_policy']=post_vars(array('f_value'=>array('return_policy:0'=>0)),$_POST['data'],'numeric');
          $error=0;
   break;
   case 'StoreshippingZone':
     $args['shippingZonecountry']=post_vars(array('f_value'=>array('country'=>'')),$_POST['data'],'numeric');
    $args['shippingZonetype']=post_vars(array('f_value'=>array('shippingZonetype:0'=>'')),$_POST['data'],'numeric');
     //--Error chack
      $error=2;
 if($args['shippingZonecountry']==''){ $arr['mistake']['message'][]='shippingZonecountry is required.';}else{

      $countryInfo=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validCountryInfo','countryinfo_id'=> $args['shippingZonecountry']));
      if( $countryInfo==NULL){
     $arr['mistake']['message'][]=' valid shippingZonecountry is required.';
      }else{
         $error--;
      }
    }
 if($args['shippingZonetype']==''){ $arr['mistake']['message'][]='shippingZonetype is required.';}else{$error--;}

   break;
   case 'price_range':
    $args['minimum_price']=post_vars(array('f_value'=>array('minimum_price'=>0)),$_POST['data'],'numeric');
    $args['maximum_price']=post_vars(array('f_value'=>array('maximum_price'=>0)),$_POST['data'],'numeric');
          $error=0;
   break;
   case 'minimum_order':
    $args['minimum_order']=post_vars(array('f_value'=>array('minimum_order'=>0)),$_POST['data'],'numeric');
          $error=0;
   break;
 }/// internal switch $infoID


 if( $error==0){

 $arr=$GLOBALS['Var_Update']->ProfileInfoUpdate($infoID,$args);
}

 break;

//-------===Update info====------------
//-------===Location====------------
case 'addlocation':
 $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['locationtype']=post_vars(array('f_value'=>array('locationtype'=>'')),$_POST['data'],'numericID');
 $args['locationtype']= Valided_ENUM( $args['locationtype'],array(0,1),0);

 $args['town']=post_vars(array('f_value'=>array('town'=>'')),$_POST['data'],'alphanumeric');
 if($args['locationtype']==0){
    $args['city']=post_vars(array('f_value'=>array('city'=>'')),$_POST['data'],'alphanumeric');
 }else{
    $args['city']=post_vars(array('f_value'=>array('city'=>'')),$_POST['data'],'numericID');
 }

 $args['postalCode']=post_vars(array('f_value'=>array('postalCode'=>'')),$_POST['data'],'alphanumeric');
 $args['state']=post_vars(array('f_value'=>array('state'=>0)),$_POST['data'],'numericID');
 $args['country']=post_vars(array('f_value'=>array('country'=>0)),$_POST['data'],'numericID');
   //--Error chack
      $error=($args['locationtype']==0)?4:5;

 $args['countryInfo']=NULL; $args['stateInfo']=NULL; $args['cityInfo']=NULL;
 if($args['country']!=''){

   $args['countryInfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validCountryInfo','countryinfo_id'=> $args['country']));

    }

 if($args['state']!=''&$args['country']!=''){

  $args['stateInfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_fl_admin_id','fl_admin_id'=> $args['state'],'countryinfo_id'=> $args['country']));

    }

        if( $args['countryInfo']==NULL){$arr['mistake']['message'][]=' valid country is required.'; }else{ $error--;   }
        if($args['stateInfo']==NULL){$arr['mistake']['message'][]=' valid state of selected country is required.'; }else{ $error--;   }
 if($args['locationtype']==1){

 if($args['state']!=''&$args['country']!=''&&$args['city']!=''){

 $args['cityInfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_city_id_by_fl_admin_id','city_id'=> $args['city'],'fl_admin_id'=> $args['state']));

    }

 if($args['cityInfo']==NULL){$arr['mistake']['message'][]=' valid city of selected state,country is required.'; }else{ $error--;   }
if( $args['town']==''){$arr['mistake']['message'][]=' valid town is required.'; }else{ $error--;   }

 }else{
   if( $args['city']==''){$arr['mistake']['message'][]=' valid city is required.'; }else{ $error--;   }
 }

//--------
 if( $args['countryInfo']!=NULL){
if(!$GLOBALS['Var_UtilityCheck']->ValidPincode( $args['countryInfo']['postalCodeFormat'],$args['countryInfo']['postalCodeRegex'],$args['postalCode'])){
    $arr['mistake']['message'][]=' valid postalCode is required.';
}else{
   $error--;
}
}

 if( $error==0){
 $arr=$GLOBALS['Var_Registration']->AddLocation($args);
  // $arr = array('state' =>200,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array()));
}

break;

//-------===Location====------------
//-------===Market====------------
case 'loadMdata':
 $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
  $args['location_id']=post_vars(array('f_value'=>array('market_id'=>'')),$_POST['data'],'numericID');
     //--Error chack
      $error=1;
       $args['locationInfo']=NULL;
$args['locationInfo']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_location_id','location_id'=> $args['location_id']));
 if( $args['locationInfo']==NULL){$arr['mistake']['message'][]='ajax_33';}else{$error--;}

  if( $error==0){
    $arr=$GLOBALS['Var_Registration']->AddLocation($args);

}
break;

//-------===Market====------------
//-------===analytics====------------
case 'analytics':
$args=array();
 $args['innerWidth']=post_vars(array('f_value'=>array('sr'=>array(0=>''))),$_POST['data'],'numericID');
 $args['innerHeight']=post_vars(array('f_value'=>array('sr'=>array(1=>''))),$_POST['data'],'numericID');
 $args['session_id']=post_vars(array('f_value'=>array('wd'=>'')),$_POST['data'],'alphanumeric');
 $args['entity_id']=post_vars(array('f_value'=>array('eid'=>'')),$_POST['data'],'numericID');
 $args['language']=post_vars(array('f_value'=>array('ul'=>'')),$_POST['data'],'alphanumeric');
 $args['location_id']=post_vars(array('f_value'=>array('lid'=>'')),$_POST['data'],'numericID');
 $args['entity_type']=post_vars(array('f_value'=>array('et'=>'')),$_POST['data'],'numericID');
 $args['slug']=post_vars(array('f_value'=>array('slug'=>'')),$_POST['data'],'url_chars');
 $args['AppId']=post_vars(array('f_value'=>array('AppId'=>'')),$_POST['data'],'alphanumeric');
 $args['title']=post_vars(array('f_value'=>array('t'=>'')),$_POST['data'],'url_chars');
 $args['url']=post_vars(array('f_value'=>array('u'=>'')),$_POST['data'],'website_chars');

  $args['buyer_entity_gender']=post_vars(array('f_value'=>array('beg'=>0)),$_POST['data'],'numericID');
  $args['buyer_entity_age']=post_vars(array('f_value'=>array('bea'=>0)),$_POST['data'],'numericID');


  $GLOBALS['Var_Update']->Analytics_Update($args);

break;
//-------===analytics====------------
//-------===Advertisements====------------
case 'advertisebasic':
$args=array();
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
$args['heading_1']=post_vars(array('f_value'=>array('heading_1'=>'')),$_POST['data'],'HTML_entities');
$args['heading_2']=post_vars(array('f_value'=>array('heading_2'=>'')),$_POST['data'],'HTML_entities');
$args['description']=post_vars(array('f_value'=>array('description'=>'')),$_POST['data'],'HTML_entities');
$args['url']=post_vars(array('f_value'=>array('url'=>'')),$_POST['data'],'website_chars');
$args['ct']=post_vars(array('f_value'=>array('ct'=>'')),$_POST['data'],'numericID');
$args['ct']= Valided_ENUM($args['ct'],array(0,1,2),0);
$args['adid']=post_vars(array('f_value'=>array('adid'=>0)),$_POST['data'],'numericID');


  //--Error chack
      $error=4;

 if($args['heading_1']==''){ $arr['mistake']['message'][]='ajax_50';}else{$error--;}
 if($args['heading_2']==''){ $arr['mistake']['message'][]='ajax_51';}else{$error--;}

 if($args['description']==''){ $arr['mistake']['message'][]='ajax_52';}else{$error--;}
 if($args['url']==''){ $arr['mistake']['message'][]='ajax_53';}else{$error--;}


 if($error==0 && $GLOBALS['Var_LoginStatus']){
    $arr= $GLOBALS['Var_Advertisement']->RagisterAdvertise('advertisebasic',$args);

 }


break;

case 'advertiselocationedit':
$args=array();
$args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];

$args['location_data']=JsonTrueDecode($_POST['data']['f_value']['l'],array());
$args['adid']=post_vars(array('f_value'=>array('adid'=>0)),$_POST['data'],'numericID');

 $lif=array(); $locationsIds=array();
 foreach( $args['location_data'] as  $key=>$value){
     if(count($value)==3){
         $row=array();
       $locationsIds[]= $row[0]=validate_word('numericID',$value[0]);
        $row[1]=validate_word('numeric',$value[1]);
        $lif[]=$row;
     }

 }


$args['location_data']=$lif;//storeing sanetized data
$args['locationsIds']=$locationsIds;
  //--Error chack
      $error=3;
 if($args['adid']!=''){


$args['advertise_row']=NULL;
$args['advertise_row']=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_advertise_id','advertisement_id'=> $args['adid'],'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id']));
 if( $args['advertise_row']==NULL){$arr['mistake']['message'][]='ajax_55';}else{$error--;}

  if( $args['advertise_row']!=NULL){
      if($args['advertise_row']['status']==0){$error--;}else{ $arr['mistake']['message'][]='ajax_55';}


  }


 }else{$arr['mistake']['message'][]='ajax_55';}

 if(count($args['location_data'])==0){ $arr['mistake']['message'][]='ajax_54';   }else{$error--;}


 if($error==0 && $GLOBALS['Var_LoginStatus']){
    $arr= $GLOBALS['Var_Advertisement']->RagisterAdvertise('advertiselocationedit',$args);

 }

break;

//-------===Advertisement====------------
//------ ===load bloack data==----
case 'loadblockdata':
$args=array();
 $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
 $args['id']=post_vars(array('f_value'=>array('id'=>'')),$_POST['data'],'numericID');
 $args['object']=post_vars(array('f_value'=>array('object'=>'')),$_POST['data'],'alphanumeric');
 $arr=$GLOBALS['Var_ProcessData']->LoadBlockData($args);

break;

//------ ===load bloack data==----
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

 $arr=$GLOBALS['Var_StoreDashboard']->Deleting($args);

}


break;



//-------===delete====------------

case  'signUpFromFacebook':
   $args=array();
$args['login_identity']=post_vars(array('f_value'=>array('email'=>'')),$_POST['data'],'');
$args['first_name']=post_vars(array('f_value'=>array('first_name'=>'')),$_POST['data'],'');
$args['last_name']=post_vars(array('f_value'=>array('last_name'=>'')),$_POST['data'],'');
$args['gender']=post_vars(array('f_value'=>array('gender'=>'')),$_POST['data'],'');




  //--Error chack
      $error=2;
if($args['login_identity']==''){ $arr['mistake']['message'][]='id is required.';}else{$error--;}
if($args['first_name']==''){ $arr['mistake']['message'][]='AppId is required.';}else{$error--;}
if($args['last_name']==''){ $arr['mistake']['message'][]='AppId is required.';}else{$error--;}
if($args['gender']==''){ $arr['mistake']['message'][]='AppId is required.';}else{$error--;}


if( $error==0){

//$arr= $GLOBALS['Var_Facebook'] ->SignUp($args);

}
break;
case  'signUpFromGoogle':
   $args=array();
$args['login_identity']=post_vars(array('f_value'=>array('email'=>'')),$_POST['data'],'');
$args['first_name']=post_vars(array('f_value'=>array('first_name'=>'')),$_POST['data'],'HTML_entities');
$args['last_name']=post_vars(array('f_value'=>array('last_name'=>'')),$_POST['data'],'HTML_entities');
$args['gender']=post_vars(array('f_value'=>array('gender'=>'')),$_POST['data'],'HTML_entities');
$args['ImageUrl']=post_vars(array('f_value'=>array('ImageUrl'=>'')),$_POST['data'],'HTML_entities');
$args['access_token']=post_vars(array('f_value'=>array('access_token'=>'')),$_POST['data'],'');
$args['id_token']=post_vars(array('f_value'=>array('id_token'=>'')),$_POST['data'],'');


  //--Error chack
      $error=5;
if($args['login_identity']==''){ $arr['mistake']['message'][]='email is required.';}else{$error--;}
if($args['first_name']==''){ $arr['mistake']['message'][]='AppId is required.';}else{$error--;}
if($args['last_name']==''){ $arr['mistake']['message'][]='AppId is required.';}else{$error--;}
if($args['access_token']==''){ $arr['mistake']['message'][]='access_token is required.';}else{$error--;}
if($args['id_token']==''){ $arr['mistake']['message'][]='id_token is required.';}else{$error--;}

if( $error==0){

$arr= $GLOBALS['Var_Google_Login']->check($args);

}
break;


 }
 }

  $arr['error']=$error;

  if(SERVER_MODE=="DEVELOPMENT"){
         if( $arr['state']==500){
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
          $arr['detailargs']=$args;

        }

    }else{

       if( $arr['state']==500){
           $arr['response']=array();
        }
    }

 return $arr;

}

/**
* @description=>sanitizefrom data.
* @param  =>
* @return =>
*/

public function SanitizeFileForm(){
       //Default
 $arr = array('state' =>500,'error' =>0,'response' => array(),'mistake' =>array('heading'=>'','message'=>array()));
 $error=0;   $args=array();

  if($GLOBALS['Var_LoginStatus']){
 if(isset($_POST['form'])){


 switch($_POST['form']){
   case 'ExcelUpload':

   //--Error chack
      $error=1;
     // var_dump($_FILES);

 if(!isset($_FILES['filename'])){ $arr['mistake']['message'][]='CSV file are required.';}else{


  if($GLOBALS['ExcelHandler']->validCheckFile($_FILES['filename']['tmp_name'],'CSV')){
      if($_FILES['filename']['size']<(1*(1024*1024))){

  $args['ContentType']=  $_FILES['filename']['type'];
  $args['filesize']=  $_FILES['filename']['size'];
 $args['product_array']=  $GLOBALS['ExcelHandler']->GetPHPArrayFromCSV($_FILES['filename'],'CSV');
    $error--;
    }else{
   $arr['mistake']['message'][]='text_420';
  }
  }else{
   $arr['mistake']['message'][]='Valid CSV file are required.';
  }





    }






   //--
  if($error==0){

 $arr =   $GLOBALS['Var_Registration']->UploadCSVProdcutfile($args);


    }

   break;



 }


 }
  }

  $arr['error']=$error;

  if(SERVER_MODE=="DEVELOPMENT"){
         if( $arr['state']==500){
  $args['ActorEntityData']  =   $GLOBALS['Var_ActorEntityData'];
          $arr['detailargs']=$args;

        }

    }else{

       if( $arr['state']==500){
           $arr['response']=array();
        }
    }

 return $arr;
}

}



$GLOBALS['Var_Ajax']=new Ajax();


?>
