<?php

/**
* @description=>this class has all ragistration mathod.
* @param  =>
* @return =>
*/
class Registration{


 /**
* @description=>this class has all ragistration mathod.
* @param  =>
* @return =>
*/
public function SignUp($args){
 $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
 $arr = array('state' =>500,'response' =>'','mistake' =>array('heading'=>'','message'=>array()));
    //check identity type
   $identity_type=email_or_phone($args['login_identity']);
    $arr['response']=$identity_type;

   if($identity_type!=''){
   //--converting emial in htmlentities
       $login_identity_HTML_entities=validate_word('HTML_entities',$args['login_identity']);
           //checking is $identity_name available or not
  $is_unique= is_unique('account_login_identity','login_identity',$login_identity_HTML_entities);

  if($is_unique){

 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('AccountPrivate');


   //--inserting account table
  $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
   $date=zonedate($zone);
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));
   $hash_password=md5($args['password']);
   $ajax_password=$ActorEntityData['visit_data']['wd'];

      //--setting account options
 $activation_key=generate_random_string( 6,true ,false ,false, false, false );

   $private_data=True_array_merge($defaultPrivate,array(
   'activation_key' => $activation_key,
	'visitId' =>$ActorEntityData['visit_data']['wd'],
	'verification_attempt' =>5
    ));


  //creating blank account row


    $accounts_DATA=array(
    'entity_id'=>  0
    );

     $account_id=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'accounts',array_keys($accounts_DATA) , array_values($accounts_DATA) );



    $account_login_identity_data=array(
'login_identity'=>$login_identity_HTML_entities,
"identity_type"=>$identity_type,
"authentication_provider"=>'wowrol',
'verified'=>0,
'account_id'=>$account_id,
"ip_address"=>$ip,
"registration_time"=>$date,
'private_data'=>Makejson($private_data)

    );


    $login_identity_id=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'account_login_identity',array_keys($account_login_identity_data) , array_values($account_login_identity_data) );
    //-- inserting in account table






     //--inserting login table
    $actual_input_length=strlen($args['login_identity'].$args['password']);


   $login_DATA=array(
    'account_id'=>  $account_id,
    'password'=> $hash_password,
    'actual_input_length'=> $actual_input_length
    );

     $login_id=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'login',array_keys($login_DATA) , array_values($login_DATA) );

     // updateing login id in accounts


$update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'accounts',array('login_id'),array($login_id),array('account_id'),array($account_id));








     //-->>
     //--sending account activation code
    $GLOBALS['Var_ExternalNotification']-> SendActivationCode(array('identity_type'=>$identity_type,
 'login_identity'=>$args['login_identity'],
 'account_activation_key'=>$activation_key
 ));

     //-->>

      //--return data


      $arr['state']=200;
      $arr['response']='ok';
     //-->>


  }else{

 $arr['mistake']['message'][]=( $identity_type=="email")?"Email is not available for use.":"Phone is not available for use.";
  }





   }else{
    $arr['mistake']['message'][]='Valid email address or phone number required.';
   }


return  $arr;
}



 /**
* @description=>Ragister a store entity.
* @param  =>
* @return =>
*/
public function Store($args){
   $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'Store','message'=>array()));


 //--url uniqueness check

  $slug=$GLOBALS['Var_PageSlug']->Unique_Slug($args['store_url_address'],'store',$args['store_url_address'],FALSE);
  if($slug['status']==200){

    $args['store_url_address'] =  $slug['content_slug'];
//--


 //default
 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');

 //-- location info
   $location_info=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'all_location', array('location_id'),array($args['location_id']));

 //--
    $Store_Public=array(
    'entity_id' => '',
	'Name' => $args['Name'],
	'Url' => array('Store'=>$args['store_url_address'],
                   'cart'=>'',
                   'checkout' => '',
                    'offers' => ''
                   ),
    'StoreCategory'=> $args['storecategory'],
    'address'=> $args['address'],
    'location_id'=>$args['location_id'],
    'phone'=> $args['phone']
);


    $StorePrivate=array(
	'notification_checktime' =>time(),
    'memberSince'=>$GLOBALS['Var_Utility']->TimezoneDate()
);

$Store_Public=True_array_merge($Store_Public,$location_info);
$Result_Store_Public_Data=True_array_merge($defaultPublic, $Store_Public);
$Result_Store_Private_Data=True_array_merge($defaultPrivate,  $StorePrivate);
//--

// JSON decode Check
$Makejson_Public_Data =Makejson_0($Result_Store_Public_Data);
$Makejson_Private_Data =Makejson_0($Result_Store_Private_Data);
if($Makejson_Public_Data['state']!=500&&$Makejson_Private_Data['state']!=500){


 //--store_id


$Result_Store_Public_Data['entity_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'entity',array('account_id','type','public_data','private_data'),array($ActorEntityData['LoginData']['account_id'],1,Makejson($Result_Store_Public_Data),Makejson($Result_Store_Private_Data)));

//--updateing store id page slug table

$GLOBALS['Var_PageSlug']->Update_object_id($args['store_url_address'],$Result_Store_Public_Data['entity_id']);










// saving options



$arr['state'] =200;
$arr['response']=$Result_Store_Public_Data;



}else{

  $arr['mistake']['message'][]='Wowrol unable to process your data.';
}
  }else{
      $arr['mistake']['message'][]='your store url address is used. Try another.';
  }
 return  $arr;
}
 /**
* @description=>Ragister a store entity.
* @param  =>
* @return =>
*/

public function StoreStep_1($args){
   $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'Store','message'=>array()));

  //--url uniqueness check

 $slug=$GLOBALS['Var_PageSlug']->Unique_Slug($args['store_url_address'],'store',$args['store_url_address'],FALSE);
if($slug['status']==200){

    $args['store_url_address'] =  $slug['content_slug'];


 //default
 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');

$Store_Public=array(
    'slug' =>  $args['store_url_address'],
	'Name' => SafeTextEncode($args['Name'])
);

 $StorePrivate=array(
	'notification_checktime' =>time(),
    'memberSince'=>$GLOBALS['Var_Utility']->TimezoneDate()
);


$Result_Store_Public_Data=True_array_merge($defaultPublic, $Store_Public);
$Result_Store_Private_Data=True_array_merge($defaultPrivate,  $StorePrivate);
//--

$Search_Data=$GLOBALS['Var_Utility']->CreateSerachData(array('entity_id' => 0,
	'account_id' => 0,
	'type' => 1,
	'device_in_use' => 0,
	'last_login' => '2016-04-20 06:46:59',
	'public_data' => $Result_Store_Public_Data,
	'private_data' =>$Result_Store_Private_Data ));



// JSON decode Check
$Makejson_Public_Data =Makejson_0($Result_Store_Public_Data);
$Makejson_Private_Data =Makejson_0($Result_Store_Private_Data);
if($Makejson_Public_Data['state']!=500&&$Makejson_Private_Data['state']!=500){


 //--store_id


$Result_Store_Public_Data['entity_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'entity',array('account_id','type','public_data','private_data','search_data'),array($ActorEntityData['LoginData']['account_id'],1,Makejson($Result_Store_Public_Data),Makejson($Result_Store_Private_Data),$Search_Data));

//--updateing store id page slug table

$GLOBALS['Var_PageSlug']->Update_object_id($args['store_url_address'],$Result_Store_Public_Data['entity_id']);


$new_entity_id=$Result_Store_Public_Data['entity_id'];

//--
 $EntityInformation= new EntityInformation($new_entity_id,$new_entity_id);

 $EntityRow=$EntityInformation->frontuser_EntityRow;





//
$newSetting_data=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);


$arr['state'] =200;
$arr['response']=array('entity_id'=>$new_entity_id,
            'store_collection'=>$newSetting_data['store_collection']);



}else{

  $arr['mistake']['message'][]='Wowrol unable to process your data.';
}

  }else{
      $arr['mistake']['message'][]='your store url address is used. Try another.';
  }

 return     $arr ;
}


 /**
* @description=>Ragister a buyer entity.
* @param  =>
* @return =>
*/
public function Buyer($args){
    $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'Store','message'=>array()));

  //--url uniqueness check

    $slug=$GLOBALS['Var_PageSlug']->Unique_Slug($args['user_name'],'buyer',$args['user_name'],FALSE);
  if($slug['status']==200){

  $args['user_name'] =  $slug['content_slug'];
   //--


    //default
 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPrivate');



//--
 $BuyerPublic=array(   'Name'=>SafeTextEncode($args['FirstName'].' '.$args['LastName']),
    'FirstName' =>SafeTextEncode($args['FirstName']),
    'LastName' => SafeTextEncode($args['LastName']),
    'slug' => $slug['content_slug'],
    'birthday' => ''.$args['birthday_Month'].','.$args['birthday_Day'].','.$args['birthday_Year'].'',
    'sex'=> $args['sex']
);

 $BuyerPrivate=array(

    'memberSince'=>time(),
    'countryinfo_id'=> $args['countryinfo_id']
);


$Result__Public_Data=True_array_merge($defaultPublic, $BuyerPublic);
$Result__Private_Data=True_array_merge($defaultPrivate,  $BuyerPrivate);
//--



$Search_Data=$GLOBALS['Var_Utility']->CreateSerachData(array('entity_id' => 0,
	'account_id' => 0,
	'type' => 0,
	'device_in_use' => 0,
	'last_login' => '2016-04-20 06:46:59',
	'public_data' => $Result__Public_Data,
	'private_data' =>$Result__Private_Data ));

 //--store_id


$Result__Public_Data['entity_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'entity',array('account_id','type','public_data','private_data','search_data'),array($ActorEntityData['LoginData']['account_id'],0,Makejson($Result__Public_Data),Makejson($Result__Private_Data),$Search_Data));

//--updateing store id page slug table

$GLOBALS['Var_PageSlug']->Update_object_id($args['user_name'],$Result__Public_Data['entity_id']);
$new_entity_id=$Result__Public_Data['entity_id'];


///$new_entity_id=12;

$arr['state'] =200;
$arr['response']=array('entity_id'=>$new_entity_id);

//$arr['mistake']['message'][]=$Result__Private_Data;
//$arr['mistake']['message'][]=$BuyerPrivate;
  }else{
    $arr['mistake']['message'][]='your UserName address is used. Try another.';
  }
 return  $arr;
}

 /**
* @description=>Ragister a buyer entity.
* @param  =>
* @return =>
*/

public function Company($args){
 $ActorEntityData=$args['ActorEntityData'];
 $arr = $GLOBALS['Var_BundlePrototype']->DefaultValue('ajax_output');

 $slug=$GLOBALS['Var_PageSlug']->Unique_Slug($args['company_name'],'company',$args['company_name']);

  //default
 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('CompanyPublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('CompanyPrivate');


 //--
 $CompanyPublic=array(   'Name'=> SafeTextEncode($args['company_name']),
    'company_industry_category' =>SafeTextEncode($args['company_industry_category']),
     'slug' => $slug['content_slug']
);

 $CompanyPrivate=array(
);

$Result__Public_Data=True_array_merge($defaultPublic, $CompanyPublic);
$Result__Private_Data=True_array_merge($defaultPrivate,  $CompanyPrivate);

$Search_Data=$GLOBALS['Var_Utility']->CreateSerachData(array('entity_id' => 0,
	'account_id' => 0,
	'type' => 4,
	'device_in_use' => 0,
	'last_login' => '2016-04-20 06:46:59',
	'public_data' => $Result__Public_Data,
	'private_data' =>$Result__Private_Data ));


$Result__Public_Data['entity_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'entity',array('account_id','type','public_data','private_data','search_data'),array($ActorEntityData['LoginData']['account_id'],4,Makejson($Result__Public_Data),Makejson($Result__Private_Data),$Search_Data));

//--updateing store id page slug table

$GLOBALS['Var_PageSlug']->Update_object_id($slug['content_slug'],$Result__Public_Data['entity_id']);

$GLOBALS['Var_Update']->EntityFilterJunction_Update(array('company_industry_category'=>$args['company_industry_category']),$Result__Public_Data['entity_id']);



$new_entity_id=$Result__Public_Data['entity_id'];



///$new_entity_id=12;

$arr['state'] =200;
$arr['response']=array('entity_id'=>$new_entity_id);



  return  $arr;
}


 /**
* @description=>Ragister a spread from buyer and store  home page spread form
* @param  =>
* @return =>
*/
public function EntitySpread($args = array()){
   $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));

 //--
 $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
 $date_gmt=zonedate("UTC");
 $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));
 $spread_perpose=( $ActorEntityData['EntityData']['type']==0)?'00':'01';
 $args['attached_object_Str']='"'.implode('","',$args['attached_object']).'"';
 $args['taged_entity_Str']='"'.implode('","',$args['taged_entity']).'"';
 $args['images_Str']=Makejson($args['images']);

    $spreadargs = array(
		'spread_id' =>  $args['spread_id'],
		'entity_id' =>$ActorEntityData['EntityData']['entity_id'],
		'owner_entity_id' => $ActorEntityData['EntityData']['entity_id'],
		'spread_content' => $args['spread_text'],
		'quick_action_type'=>$args['fromreaction'],
        'spread_perpose'=>  $spread_perpose,
        'comment_status'=>1,
        'suspended'=> 0,
		'privacy_id' =>$args['privacy'],
		'spread_rank' => hackerHot(500, $date_gmt),
		'spread_score' => hackerHot(500, $date_gmt),
		'spread_date_gmt' => $date_gmt,
         'ip'=> $ip,
        'images_Str' => $args['images_Str'],
		'taged_entity_Str' => $args['taged_entity_Str'],
        'taged_entity' => $args['taged_entity'],
		'attached_object_Str' => $args['attached_object_Str']
	);

  $spread_id= $GLOBALS['Var_Spread']->register_spread($spreadargs);


  $arr['response']=$GLOBALS['Var_Spread']->ParseSpreadContent($GLOBALS['Var_Spread']->RetriveById(array('table'=>'spread','spread_id'=>$spread_id,'entity_id'=> $spreadargs['entity_id'])));
  $arr['state']=200;

 return  $arr ;
}
 /**
* @description=>Ragister a comment onspread
* @param  =>
* @return =>
*/
public function SpreadComment($args = array()){
       $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));
 $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
   $date=zonedate($zone); $date_gmt=zonedate("UTC");
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));

   $Comment_arg = array(
  'spread_id'                 =>  $args['spread_id'],
  'comment_id'                 => $args['comment_id'],
  'entity_id'                 =>  $args['ActorEntityData']['EntityData']['entity_id'],
  'comment_text'              =>  $args['comment_text'],
  'ip'=> $ip,
  'date'=>  $date,
  'date_gmt'=> $date_gmt,
  'comment_rank' => hackerHot(500, zonedate("UTC")),
  'comment_score' => hackerHot(500, zonedate("UTC")),
  'rating_value' => $args['rating_value'],
  'comment_row' => $args['comment_row'],
  'spread_row' => $args['spread_row'],
  'ActorEntityData'=> $ActorEntityData

);
if($args['spread_row']['spread_perpose']=='11'||$args['spread_row']['spread_perpose']=='12'){
    if( $args['comment_row']==NULL){
        $Comment_arg['comment_row'] = $GLOBALS['Var_UtilityCheck']->IsValidObject_M(
  array('type'=>'getlastReviewRow',
 'spread_id'=>$args['spread_id'],
 'entity_id'=> $args['ActorEntityData']['EntityData']['entity_id']
   ));
    }

  $args['comment_id']= $GLOBALS['Var_Spread']->ragister_reviewcomment($Comment_arg);
}else{
    $args['comment_id']= $GLOBALS['Var_Spread']->register_comment($Comment_arg);
}



  $arr['response']=$GLOBALS['Var_Spread']->ParseComment($GLOBALS['Var_Spread']->RetriveById(array('table'=>'spread_comments','comment_id'=>$args['comment_id'])));
  $arr['state']=200;

 return  $arr ;
}


//-------==store dashboard====------------
 /**
* @description=> Ragister edit new store staff
* @param  =>
* @return =>
*/

public function addNewStoreStaff($args=array()){
$ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));

   //- StaffName
 $StaffCount=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'store_staff',array('store_id'),array($ActorEntityData['EntityData']['entity_id']));
  if($StaffCount<5||$args['store_staff_id']!=0){


  //- UniqueName
 $isUniqueName=$GLOBALS['Var_UtilityCheck']->IsUnique('store_staff',array('store_id','username'),array($ActorEntityData['EntityData']['entity_id'],$args['username']));


 if($isUniqueName){
      //--
   $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
   $date=zonedate($zone);
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));
   $RagisterStaff=array(
    'store_id' => $ActorEntityData['EntityData']['entity_id'],
	'username' =>$args['username'],
	'password' => $args['password'],
	'store_staff_id' => $args['store_staff_id'],
    'date' =>$date,
    'StaffCount' =>$StaffCount,
    'ip' =>  $ip,
	'ActorEntityData' => $args['ActorEntityData']
    );


   $store_staff_id= $GLOBALS['Var_StoreDashboard']->RagisterStaff($RagisterStaff);


  $arr['response']=$GLOBALS['Var_StoreDashboard']-> ParseStaff($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_staff','store_staff_id'=>$store_staff_id)));



  $arr['state']=200;
 }else{

      $arr['mistake']['message'][]='This user name  is used . Try another.';
 }

  }else{
        $arr['mistake']['message'][]='Maximun 5 staff members are allowed.';
  }


 return $arr;
}


 /**
* @description=> Ragister edit new category
* @param  =>
* @return =>
*/
public function addNewCollection($args=array()){
     $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));
 //- num query
 $isUniqueName=$GLOBALS['Var_UtilityCheck']->IsUnique('store_collections',array('collection_name','parent_id'),array($args['name'],$args['parent']));

 if($isUniqueName||$args['cid']!=0){
      //--

   $date_gmt=date_in_timezone("UTC");
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));
   $collectionargs=array(
    'collection_id' => $args['cid'],
	'collection_name' => $args['name'],
	'parent_id' => $args['parent'],
    'use_type' => $args['use_type'],
    'icon_svg' => $args['icon_svg'],
    'country_id' => $args['country_id'],
    'description' => $args['description'],
    'date_gmt' =>$date_gmt,
    'ip' =>  $ip,
	'ActorEntityData' => $args['ActorEntityData']
    );


$collection_id= $GLOBALS['Var_StoreDashboard']->RagisterCollection($collectionargs);


  $arr['response']=$GLOBALS['Var_StoreDashboard']->ParseCollection($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_collection','entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'],'collection_id'=>$collection_id)));



  $arr['state']=200;
 }else{

     $arr['mistake']['message'][]='ajax_28';
 }







 return  $arr;

}

 /**
* @description=> Ragister edit new category
* @param  =>
* @return =>
*/

public function addNewCategory($args = array()){
   $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));
 //- num query
 $isUniqueName=$GLOBALS['Var_UtilityCheck']->IsUnique('store_categories',array('category_name','entity_id','parent_id'),array($args['name'],$args['ActorEntityData']['EntityData']['entity_id'],$args['parent']));

 if($isUniqueName||$args['cid']!=0){
      //--

   $date_gmt=date_in_timezone("UTC");
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));
   $categoryargs=array(
    'category_id' => $args['cid'],
	'category_name' => $args['name'],
	'spread_id' => $args['sid'],
	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
	'parent_id' => $args['parent'],
    'description' => $args['description'],
    'date_gmt' =>$date_gmt,
    'ip' =>  $ip,
	'ActorEntityData' => $args['ActorEntityData']
    );


$category_id= $GLOBALS['Var_StoreDashboard']->RagisterCategory($categoryargs);


  $arr['response']=$GLOBALS['Var_StoreDashboard']->ParseCategory($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_categories','entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'],'category_id'=>$category_id)),array('store_EntityData'=>$ActorEntityData));

  //updateing if this set to default
  if($args['is_default']==1){

      $ActorEntityData['EntityData']['private_data']['default_category']  = array('cN'=> $arr['response'][0]['cN'],
                    'pa'=>array('cid'=> $arr['response'][0]['pa']['cid'], 'cN'=> $arr['response'][0]['pa']['cN'] ),
                    'description'=>'',
                    'cid'=> $arr['response'][0]['cid'],
                    'sid'=> $arr['response'][0]['sid']);

    $GLOBALS['Var_Update']->UpdateEntityData($ActorEntityData['EntityData'],$ActorEntityData['visit_data']['wd']);
  }




  $arr['state']=200;
 }else{

      $arr['mistake']['message'][]='ajax_27';
 }







 return  $arr;
}

 /**
* @description=> Ragister edit new product
* @param  =>
* @return =>
*/
public function addNewProduct($args = array()){
   $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));
 //- num query
 $isUniqueName=$GLOBALS['Var_UtilityCheck']->IsUnique('store_products',array('product_name','entity_id'),array($args['name'],$args['ActorEntityData']['EntityData']['entity_id']));


 if($isUniqueName||$args['pid']!=0){
   $date_gmt=date_in_timezone("UTC");
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));


$keyfeature=array($args['keyfeature_0'],$args['keyfeature_1'],$args['keyfeature_2'],$args['keyfeature_3']);
$SearchWord=$args['searchword'];
$VarientName=array($args['varient_1'],$args['varient_2'],$args['varient_3']);

$product_public_data=Makejson(SafeArrayEncode(array('keyfeature'=>$keyfeature)));
$product_private_data=Makejson(array('has_varient'=>$args['has_varient'],
                                     'varient_name'=>$VarientName));;

$search_data=create_search_data(array($args['name'],$keyfeature,$SearchWord));

   $productargs=array(
    'product_id' => $args['pid'],
	'product_name' => $args['name'],
	'spread_id' => $args['sid'],
	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
    'brand_id' => 0,
    'description' => $args['description'],
    'has_varient' => $args['has_varient'],
    'product_public_data' => $product_public_data,
    'product_private_data' => $product_private_data,
    'search_data' => '"'.implode('","',$search_data).'"',
    'category' =>'"'.implode('","',$args['category']).'"',
    'date_gmt' => $date_gmt,
    'ip' =>  $ip,
	'ActorEntityData' => $args['ActorEntityData']
    );


   $product_id	= $GLOBALS['Var_StoreDashboard']->RagisterProduct($productargs);

   if( $product_id){
       $arr['response']=$GLOBALS['Var_StoreDashboard']->ParseProducts($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_products','entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'],'product_id'=>$product_id)));



  $arr['state']=200;
   }else{
     $arr['mistake']['message'][]='Something went wrong';
   }

 }else{

      $arr['mistake']['message'][]='This Product name  is used . Try another.';
 }


 return  $arr;
}
 /**
* @description=> Ragister copy product
* @param  =>
* @return =>
*/
public  function CopyProduct($args = array()){
  $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form

   if($args['pid']!=0){

    $product_data=$GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_products','entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'],'product_id'=>$args['pid']))[0];
   // check_response( $product_data);
    $Parse_product_data=$GLOBALS['Var_StoreDashboard']->ParseProducts(array($product_data))[0];




///description
$args['description']=$Parse_product_data['des'];

$args['has_varient']=$Parse_product_data['Hvrt'];

   $date_gmt=date_in_timezone("UTC");
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));


$keyfeature=SafeArrayDecode($Parse_product_data['kf']);
$SearchWord=explode('","', $product_data['search_data']);
$VarientName=$Parse_product_data['pvN'];

$product_public_data=Makejson(SafeArrayEncode(array('keyfeature'=>$keyfeature)));
$product_private_data=Makejson(array('has_varient'=>$args['has_varient'],
                                     'varient_name'=>$VarientName));;

$search_data=create_search_data(array($args['name'],$keyfeature,$SearchWord));

   $productargs=array(
    'product_id' => 0,
	'product_name' => $args['name'],
	'spread_id' => 0,
	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
    'brand_id' => 0,
    'description' => $args['description'],
    'has_varient' => $args['has_varient'],
    'product_public_data' => $product_public_data,
    'product_private_data' => $product_private_data,
    'search_data' => '"'.implode('","',$search_data).'"',
    'category' =>'',
    'date_gmt' => $date_gmt,
    'ip' =>  $ip,
	'ActorEntityData' => $args['ActorEntityData']
    );


   $product_id	= $GLOBALS['Var_StoreDashboard']->RagisterProduct($productargs);


   //saving specification ,up_sell,cross_sell,filter_attribute_id
   $GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_products', array('specifications','	up_sell','cross_sell','filter_attribute_id','product_categories'),array( $product_data['specifications'],$product_data['up_sell'],$product_data['cross_sell'],$product_data['filter_attribute_id'],$product_data['product_categories']),array('product_id'),array($product_id));

   //--saving vareint data
//vareint
  $varientQuerySql='SELECT * FROM '.DB_NAME.'.product_varients a
 WHERE a.product_id='.$args['pid'].'
 AND  a.deleted =0
 ';
$varientdata= $GLOBALS['Var_DBMysqli']->query($varientQuerySql);
if(count($varientdata)>0){
  $OptionName=array('product_id','sellingPrice','compairePrice','Stock','sku','private_data','edit_history');
  $OptionValue=array();
  for($i=0;$i<count($varientdata);$i++){
 $OptionValue=array( $product_id,
                    $varientdata[$i]['sellingPrice'],
                    $varientdata[$i]['compairePrice'],
                    $varientdata[$i]['Stock'],
                    $varientdata[$i]['sku'],
                    $varientdata[$i]['private_data'],
                    $varientdata[$i]['edit_history']

 );
  $GLOBALS['Var_DBMysqli']->insert(DB_NAME,'product_varients', $OptionName, $OptionValue);
  }



}

  $arr['response']=$GLOBALS['Var_StoreDashboard']->ParseProducts($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_products','entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'],'product_id'=>$product_id)));



  $arr['state']=200;


  return  $arr;

   }


}
/**
* @description=> Ragister copy product
* @call =>     $GLOBALS['Var_Registration']->RagisterProductFromBrandCopy($args = array())
* @param  =>
* @return =>
*/
public function RagisterProductFromBrandCopy($args = array()){
  $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));


   // check_response( $product_data);
    $Parse_product_data=$GLOBALS['Var_Company_Dashboard']->ParseBrand(array($args['brand_row']))[0];

///description
$args['description']=$Parse_product_data['des'];

$args['has_varient']=$Parse_product_data['Hvrt'];

   $date_gmt=date_in_timezone("UTC");
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));


$keyfeature=SafeArrayDecode($Parse_product_data['kf']);
$SearchWord=explode('","', $args['brand_row']['search_data']);
$VarientName=$Parse_product_data['pvN'];

$product_public_data=Makejson(SafeArrayEncode(array('keyfeature'=>$keyfeature)));
$product_private_data=Makejson(array('has_varient'=>$args['has_varient'],
                                     'varient_name'=>$VarientName));;

$search_data=create_search_data(array($Parse_product_data['pN'],$keyfeature,$SearchWord));

   $productargs=array(
    'product_id' => 0,
	'product_name' => $Parse_product_data['pN'],
	'spread_id' => 0,
	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
    'brand_id' => $args['brand_id'],
    'description' => $args['description'],
    'has_varient' => $args['has_varient'],
    'product_public_data' => $product_public_data,
    'product_private_data' => $product_private_data,
    'search_data' => '"'.implode('","',$search_data).'"',
    'category' =>'',
    'date_gmt' => $date_gmt,
    'ip' =>  $ip,
	'ActorEntityData' => $args['ActorEntityData']
    );


   $product_id	= $GLOBALS['Var_StoreDashboard']->RagisterProduct($productargs);


   //saving specification ,up_sell,cross_sell,filter_attribute_id
   $GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_products', array('specifications','	up_sell','cross_sell','filter_attribute_id','product_categories'),array( $args['brand_row']['specifications'],$args['brand_row']['up_sell'],$args['brand_row']['cross_sell'],$args['brand_row']['filter_attribute_id'],$args['brand_row']['product_categories']),array('product_id'),array($product_id));

   //--saving vareint data
//vareint

$varientdata= $args['varient_row'];
if(count($varientdata)>0){
  $OptionName=array('product_id','sellingPrice','compairePrice','Stock','sku','private_data','edit_history');
  $OptionValue=array();
  for($i=0;$i<count($varientdata);$i++){
 $OptionValue=array( $product_id,
                    $varientdata[$i]['sellingPrice'],
                    $varientdata[$i]['sellingPrice'],
                    0,
                    $varientdata[$i]['unique_identity'],
                    $varientdata[$i]['private_data'],
                       ''

 );
  $GLOBALS['Var_DBMysqli']->insert(DB_NAME,'product_varients', $OptionName, $OptionValue);


  }



}

  $arr['response']=$GLOBALS['Var_StoreDashboard']->ParseProducts($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_products','entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'],'product_id'=>$product_id)));



  $arr['state']=200;


  return  $arr;
}

 /**
* @description=> Ragister shipping
* @param  =>
* @return =>
*/

public function QuickaddProduct ($args = array()){
      $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));

  //- num query
 $isUniqueName=$GLOBALS['Var_UtilityCheck']->IsUnique('store_products',array('product_name','entity_id'),array($args['name'],$args['ActorEntityData']['EntityData']['entity_id']));

 if($isUniqueName||$args['pid']!=0){


           //--
   $date_gmt=date_in_timezone("UTC");
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));



$VarientName=array('','','');

$product_public_data=Makejson(SafeArrayEncode(array('keyfeature'=>array('','','',''))));
$product_private_data=Makejson(array('has_varient'=>0,
                                     'varient_name'=>$VarientName));;

$search_data=create_search_data(array($args['name']));

   $productargs=array(
    'product_id' => $args['pid'],
	'product_name' => $args['name'],
	'spread_id' => $args['sid'],
	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
    'description' => $args['description'],
    'has_varient' => "new",
    'product_public_data' => $product_public_data,
    'product_private_data' => $product_private_data,
    'search_data' => '"'.implode('","',$search_data).'"',
    'category' =>'"'.implode('","',$args['category']).'"',
    'date_gmt' => $date_gmt,
    'ip' =>  $ip,
	'ActorEntityData' => $args['ActorEntityData']
    );


   $product_id	= $GLOBALS['Var_StoreDashboard']->RagisterProduct($productargs);

   //----------



    $private_data=Makejson(array('varient_value'=>array('','',''),
  'mainimages'=> $args['mainimages'],
  'webimages'=> $args['webimages'],
  'featureimage'=> $args['featureimage'],
  'Backorders'=>0,
  'isShippable'=> $args['shippable'],
  'Shipping_method'=>$args['shipping_method'],
  'weight'=>$args['weight'],
  'weightunit'=>$args['weightunit'],
  'currency'=>  $args['ActorEntityData']['EntityData']['private_data']['currency'],
  'unitsystem'=> $args['ActorEntityData']['EntityData']['private_data']['unitsystem']));

    $ragisterArgs=array(
     	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
        'product_id' =>   $product_id,
        'varient_id' => $args['vid'],
        'act' => 0,
        'sellingPrice' => $args['sellingPrice'],
        'compairePrice' => $args['compairePrice'],
        'Stock' => $args['Stock'],
        'sku' => $args['sku'],
        'private_data'=>$private_data,
        'ActorEntityData' => $args['ActorEntityData']
     );


         $varient_id= $GLOBALS['Var_StoreDashboard']->RagisterProductVarient($ragisterArgs);



   //------
  $arr['state']=200;
  $arr['response']=$GLOBALS['Var_StoreDashboard']->ParseProducts($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_products','entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'],'product_id'=>$product_id)));





 }else{

      $arr['mistake']['message'][]='This Product name  is used . Try another.';
 }
  return  $arr;
}




 /**
* @description=> Ragister edit  productspecification
* @param  =>
* @return =>
*/

public function productspecification($args = array()){
      $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));


     $ragisterArgs= array(
     	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
        'product_id' => $args['pid'],
        'spf'=> $args['spf'],
        'ActorEntityData' => $args['ActorEntityData']
     );



  $ret= $GLOBALS['Var_StoreDashboard']->RagisterProductSpecification($ragisterArgs);

  if($ret){
        $arr['state']=200;
  }else{
      $arr['mistake']['message'][]='Invalid Specification';
  }


 return  $arr;
}
 /**
* @description=> Ragister edit  productspecification
* @param  =>
* @return =>
*/
public function prodctinventory($args = array()){
 $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'asdsa','message'=>array()));

 $private_data=Makejson(array('varient_value'=>array( $args['variant_0'], $args['variant_1'], $args['variant_2']),
  'mainimages'=> $args['mainimages'],
  'webimages'=> $args['webimages'],
  'featureimage'=> $args['featureimage'],
  'Backorders'=>0,
  'isShippable'=> $args['shippable'],
  'Shipping_method'=>$args['shipping_method'],
  'weight'=>$args['weight'],
  'weightunit'=>$args['weightunit'],
  'currency'=>  $args['currency'],
  'unitsystem'=> $args['unitsystem']));

    $ragisterArgs=array(
     	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
        'product_id' => $args['pid'],
        'varient_id' => $args['vid'],
        'act' => $args['act'],
        'sellingPrice' => $args['sellingPrice'],
        'compairePrice' => $args['compairePrice'],
        'Stock' => $args['Stock'],
        'sku' => $args['sku'],
        'private_data'=>$private_data,
        'ActorEntityData' => $args['ActorEntityData']
     );
  if( $args['act']=="new"|| $args['act']=="edit"){
    $varient_id= $GLOBALS['Var_StoreDashboard']->RagisterProductVarient($ragisterArgs);

 $arr['response']=$GLOBALS['Var_StoreDashboard']->ParseProductVarients($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'product_varients','varient_id'=> $varient_id)),array('varient_name'=>$args['varient_name'],'has_varient'=>$args['has_varient']));
   $arr['state']=200;
  }
    if( $args['act']=="delete"){
  $ragisterArgs['AppId']='product_varient';
  $arr=$GLOBALS['Var_StoreDashboard']->Deleting( $ragisterArgs);


    }








  return  $arr;
}



 /**
* @description=> Ragister edit  productFilter
* @param  =>
* @return =>
*/

public function productFilter($args = array()){
      $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));

 $FilterAttributes=$GLOBALS['Var_Utility']->GetFilterAttributesId( $args['fiatr']);
  $FilterAttributesId= $FilterAttributes['id'];
     $ragisterArgs=array(
     	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
        'product_id' => $args['pid'],
        'FilterAttributesId'=> $FilterAttributesId,
        'productRow' => $args['productRow'],
        'ActorEntityData' => $args['ActorEntityData']
     );

  $ret=$GLOBALS['Var_StoreDashboard']->RagisterProductFilter($ragisterArgs);

  if($ret){
        $arr['state']=200;
        $arr['response']=$FilterAttributes['Filters'];
  }else{
      $arr['mistake']['message'][]='Invalid Specification';
  }


 return  $arr;
}

 /**
* @description=> Ragister shipping
* @param  =>
* @return =>
*/
public function StoreShipping($args = array()){
 $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));

 $range_data=Makejson($args['srng']);
 $location_data=Makejson($args['lif']);
 $locations='"'.implode('","',$args['locationsIds']).'"';




  $ragisterArgs=array(
     	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
        'shipping_id' => $args['spgid'],
        'shipping_name' => $args['shipping_name'],
        'type' => $args['type'],
        'range_data' => $range_data,
        'location_data' => $location_data,
        'locations' =>  $locations,
        'timed_charge' => '',
        'processing_time' => $args['processing_time'],
        'shippingZonetype' => $ActorEntityData ['EntityData']['private_data']['shippingZonetype']  ,
        'description' => $args['description'],
        'store_shipping_row' => $args['store_shipping_row'],
        'ActorEntityData' => $args['ActorEntityData']
     );

  $shipping_id=$GLOBALS['Var_StoreDashboard']->RagisterShipping($ragisterArgs);

  $arr['response']=$GLOBALS['Var_StoreDashboard']->ParseShipping(
  $GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_shipping','entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'],'shipping_id'=>$shipping_id))
  ,array('ActorEntityData'=>$ActorEntityData)
  );

    $arr['state']=200;

 return  $arr;
}




 /**
* @description=> Ragister shipping
* @param  =>
* @return =>
*/

public function RagisterDiscount($args = array()){

 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));


 return  $arr;
}

 /**
* @description=> UploadCSVProdcutfile
* @param  =>
* @return =>
*/


public function UploadCSVProdcutfile($args = array()){
  $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));

 $ActorEntityData= $GLOBALS['Var_ActorEntityData'];

 $ProdcutDefault =  $GLOBALS['Var_BundlePrototype']->DefaultValue('CSVProdcutField');
 $VarientDefault =  $GLOBALS['Var_BundlePrototype']->DefaultValue('CSV_VarientField');
 $ValidProduct=array();

  $product=array();  $return=array();

 foreach($args['product_array'] as $product_raw_row ){
        $product_row=array();
        $product_row['name']=GetPropertyInArray('ProductName',$product_raw_row,'','HTML_entities' );
        $product_row['pid']=GetPropertyInArray('ProductId',$product_raw_row ,'','HTML_entities');
        $product_row['description']=GetPropertyInArray('Description',$product_raw_row ,'','HTML_entities');

        //--
        $has_varient=GetPropertyInArray('Has Varient',$product_raw_row ,'','HTML_entities');
        $product_row['has_varient']=($has_varient=='Yes')?1:0;
        //--
        $varient=explode(",", GetPropertyInArray('Varient Property Name',$product_raw_row,''));


        $product_row['varient_1']=GetPropertyInArray('0',$varient,'','HTML_entities');
        $product_row['varient_2']=GetPropertyInArray('1',$varient ,'','HTML_entities');
        $product_row['varient_3']=GetPropertyInArray('2',$varient,'','HTML_entities');

        $keyfeature=explode("|", GetPropertyInArray('KeyFeature',$product_raw_row,''));

        $product_row['keyfeature_0']=GetPropertyInArray('0',$keyfeature,'','HTML_entities');
        $product_row['keyfeature_1']=GetPropertyInArray('1',$keyfeature,'','HTML_entities');
        $product_row['keyfeature_2']=GetPropertyInArray('2',$keyfeature,'','HTML_entities');
        $product_row['keyfeature_3']=GetPropertyInArray('3',$keyfeature,'','HTML_entities');

        $product_row['searchword']=GetPropertyInArray('Searchword',$product_raw_row ,'','HTML_entities');
         //--
        $varient_list=explode(",", GetPropertyInArray('Varient',$product_raw_row,''));
         $varient_array=array();
         foreach( $varient_list as  $varient_raw_str){

        $varient_list_item_raw=explode("|", $varient_raw_str);
        $varient_raw=$GLOBALS['Var_BundlePrototype']->DefaultValue('VarientPrivateData');


        foreach($varient_list_item_raw as  $varient_property_str){

     $varient_property=explode(">", $varient_property_str);



          if(count( $varient_property)==2){

              switch($varient_property[0]){
        case 'varient id':
    $varient_raw['vid']=validate_word('numericID',$varient_property[1]);
        break;
        case 'Selling Price':
    $varient_raw['sellingPrice']=validate_word('numeric',$varient_property[1]);
        break;
        case 'Compaire Price':
    $varient_raw['compairePrice']=validate_word('numeric',$varient_property[1]);
        break;

        case 'SKU':
    $varient_raw['sku']=validate_word('numericID',$varient_property[1]);
        break;
        case 'Stock':
    $varient_raw['Stock']=validate_word('numericID',$varient_property[1]);
        break;
        case 'isShippable':
    $varient_raw['isShippable']=validate_word('numericID',$varient_property[1]);
        break;
        case 'Shipping Method':
    $shipping_method=validate_word('numericID',$varient_property[1]);
    $varient_raw['shipping_method']=( $shipping_method=='Home Dilivery')?1:0;

        break;
        case 'weight':
    $varient_raw['weight']=validate_word('numericID',$varient_property[1]);
        break;
     case 'weightunit':
    $varient_raw['weightunit']=validate_word('alphanumeric',$varient_property[1]);
        break;

  case 'varient Name':
  $varient_raw['varient_name']=array( $product_row['varient_1'], $product_row['varient_2'], $product_row['varient_3']);

    break;
     case 'Has Varient':
  $varient_raw['has_varient']=$product_row['has_varient'];


     break;


        case 'images':

       $images_str=  str_replace( array("'",'"'), "", $varient_property[1] );
        $images_array=explode("+",  $images_str);
        $varient_raw['webimages']=array();
        foreach( $images_array as  $images_url){
        $images=$GLOBALS['Var_BundlePrototype']->DefaultValue('mediaOut');
        $images_url=   validate_word('HTML_entities',$images_url);
         $images['url']= $images_url;
        $varient_raw['webimages'][]=    $images;
        }



        break;

        case   $product_row['varient_1']:
        $varient_raw['varient_value'][0]=   validate_word('alphanumeric',$varient_property[1]);
        break;
        case   $product_row['varient_2']:
     $varient_raw['varient_value'][1]=   validate_word('alphanumeric',$varient_property[1]);
        break ;
        case   $product_row['varient_3']:
        $varient_raw['varient_value'][2]=  validate_word('alphanumeric',$varient_property[1]);
        break ;
      default :




              }




          }





      }



        $varient_array[]= $varient_raw;

         }


         ///filter
       $product_row['Filter']=array();
       $Filter_str=GetPropertyInArray('Filter',$product_raw_row );
       $Filter_list=explode("|", $Filter_str);
         foreach( $Filter_list as  $Filter_list_str){

       $Filter_property=explode(">", $Filter_list_str);

         if(count(  $Filter_property)==2){


         $product_row['Filter'][]=array('name'=>validate_word('alphanumeric', $Filter_property[0]),'value'=>validate_word('alphanumeric', $Filter_property[1]));



          }


         }








       // $product_row[' $varient_list_item_raw']= $varient_list_item_raw;
       // $product_row['varient_list']= $varient_list;
        $product_row['Varient']= $varient_array;




        //category
       $product_row['category']=array();
      $category_str=GetPropertyInArray('Categories',$product_raw_row );
      $category_array=explode("|", $category_str);
      foreach( $category_array   as     $category ){

       $product_row['category'][]=validate_word('HTML_entities',$category );
      }

        $product[]= $product_row;
 }




 ///---------

 foreach($product as   $product_row){




   $date_gmt=date_in_timezone("UTC");
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));


$keyfeature=array($product_row['keyfeature_0'],$product_row['keyfeature_1'],$product_row['keyfeature_2'],$product_row['keyfeature_3']);
$SearchWord=$product_row['searchword'];
$VarientName=array($product_row['varient_1'],$product_row['varient_2'],$product_row['varient_3']);

$product_public_data=Makejson(SafeArrayEncode(array('keyfeature'=>$keyfeature)));
$product_private_data=Makejson(array('has_varient'=>$product_row['has_varient'],
                                     'varient_name'=>$VarientName));;

$search_data=create_search_data(array($product_row['name'],$keyfeature,$SearchWord));

   $productargs=array(
    'product_id' => 0,
	'product_name' => $product_row['name'],
	'spread_id' => 0,
	'entity_id' => $ActorEntityData['EntityData']['entity_id'],
    'brand_id' => 0,
    'description' => $product_row['description'],
    'has_varient' => $product_row['has_varient'],
    'product_public_data' => $product_public_data,
    'product_private_data' => $product_private_data,
    'search_data' => '"'.implode('","',$search_data).'"',
    'category' =>'"'.implode('","',$GLOBALS['Var_StoreDashboard']->RagisterCateroryforCSVUpload(array(
   'ActorEntityData'=> $ActorEntityData,
   'category'=>$product_row['category']
       ))).'"',
    'date_gmt' => $date_gmt,
    'ip' =>  $ip,
	'ActorEntityData' =>  $ActorEntityData
    );


 $product_id	= $GLOBALS['Var_StoreDashboard']->RagisterProduct($productargs);







if( $product_id){





    //adding Varient
    foreach($product_row['Varient'] as   $Varient ){


        //add varient



 $private_data=Makejson(array('varient_value'=>$Varient['varient_value'],
  'mainimages'=> $Varient['mainimages'],
  'webimages'=> $Varient['webimages'],
  'featureimage'=> $Varient['featureimage'],
  'Backorders'=>0,
  'isShippable'=> $Varient['isShippable'],
  'Shipping_method'=>$Varient['shipping_method'],
  'weight'=>$Varient['weight'],
  'weightunit'=>$Varient['weightunit'],
  'currency'=>  $Varient['currency'],
  'unitsystem'=> $Varient['unitsystem']));

    $ragisterArgs=array(
     	'entity_id' => $ActorEntityData['EntityData']['entity_id'],
        'product_id' =>$product_id,
        'varient_id' => 0,
        'act' => 'new',
        'sellingPrice' => $Varient['sellingPrice'],
        'compairePrice' => $Varient['compairePrice'],
        'Stock' =>$Varient['Stock'],
        'sku' => $Varient['sku'],
        'private_data'=>$private_data,
        'ActorEntityData' => $ActorEntityData
     );

$varient_id= $GLOBALS['Var_StoreDashboard']->RagisterProductVarient($ragisterArgs);





//---filter
 $FilterAttributes=$GLOBALS['Var_Utility']->GetFilterAttributesId(   $product_row['Filter']);
  $FilterAttributesId= $FilterAttributes['id'];
     $ragisterArgs=array(
     	'entity_id' =>  $ActorEntityData['EntityData']['entity_id'],
        'product_id' => $product_id,
        'FilterAttributesId'=> $FilterAttributesId,
        'productRow' => array('edit_history'=>array()),
        'ActorEntityData' =>  $ActorEntityData
     );

 $GLOBALS['Var_StoreDashboard']->RagisterProductFilter($ragisterArgs);








    }




}






 }





 //-----

 $arr['response'] = $return;




 return  $arr;
}
//-------==store dashboard====------------

//-------===checkin====------------



/**
* @description=>checkincartedit
* @param  =>
* @return =>
*/

public function CheckInCartEdit($args){
        $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array()));

  $args['CareteChatMsg']=TRUE;
 //parse Prodcut row
$ParseProducts= $GLOBALS['Var_StoreDashboard']->ParseProducts(array($args['Product_row']))[0];
$validVarient=FALSE;
foreach($ParseProducts['pvL'] as $value){
    if($value['vid']==$args['vid']){
       $validVarient=TRUE;
       break;
    }
}
if( $validVarient){
    //--making cart array
 $cartVarient_id=array(); $cartVarient_data=array();
 $cartVarient_idRaw=$args['checkIn_row']['cartVarient_id'];
 if( $cartVarient_idRaw!=NULL){
   $cartVarient_id=explode(",",  $cartVarient_idRaw);
   $cartVarient_data=JsonTrueDecode($args['checkIn_row']['cartVarient_data'],array());
}
  //--checking array
  if($args['Quentity']!=0){
     array_push($cartVarient_id,$args['vid']);
    $cartVarient_id = array_unique($cartVarient_id);

 //onlyfirst time create chat message
$args['CareteChatMsg']=($args['Quentity']==1)?TRUE:FALSE;
 $args['attachments_type']=0;

  }else{
      foreach($cartVarient_id as $q=>$p){
          if($p==$args['vid']){
             unset($cartVarient_id[$q]);
             unset($cartVarient_data[$q]);

          }
      }
        $cartVarient_id = array_unique($cartVarient_id);
  $args['CareteChatMsg']=TRUE;
  $args['attachments_type']=18;//cart item remove
  }


//setting quantity
$cartVarient_data[$args['vid']]= array($args['Quentity'],$args['Product_row']['product_id']);
  //->>makinng str
$args['cartVarient_id_Str']=implode(",",$cartVarient_id);
$args['cartVarient_data_Json']=Makejson($cartVarient_data);

$zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
   $date=zonedate($zone);
   $dateGMT=zonedate($zone);
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));

    $args['date']=$date;
    $args['dateGMT']=$dateGMT;
    $args['ip']= $ip;

 $storeOutput=new StoreOutput($args['checkIn_row']['store_id']);
 $members= $storeOutput->GetCheckInMember($args['checkIn_row']);

 $args['role']=$storeOutput->GetEntityRole( $members);



  if( $args['role']!=='unvalid'&&$args['role']!=0){
$args['recevers_id']='"'.implode('","',$members).'"';

$args['attachments_id']=$args['vid'];

$args['creater_id']=$ActorEntityData['EntityData']['entity_id'];//for activity
$args['object_id']=$args['Product_row']['product_id'];//for activity


$ret= $storeOutput->CartEdit($args);
$arr['response']= $ParseProducts;
$arr['state']=200;
 }


}else{
   $arr['mistake']['message'][]='Invalid Product . V';
}


 return $arr ;
}

/**
* @description=>checkincartedit
* @param  =>
* @return =>
*/
public function CheckInShortListEdit($args){
        $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>'','mistake' =>array('heading'=>'','message'=>array()));
  $args['CareteChatMsg']=TRUE;
  //parse Prodcut row
$ParseProducts= $GLOBALS['Var_StoreDashboard']->ParseProducts(array($args['Product_row']))[0];
//--makinng array
$shortlistedProducts_id=array();
$shortlistedProducts_idRaw=$args['checkIn_row']['shortlistedProducts_id'];
if($shortlistedProducts_idRaw!=NULL){
  $shortlistedProducts_id=explode(",", $shortlistedProducts_idRaw);
}
//--checking array

  if($args['Quentity']!=0){
  array_push($shortlistedProducts_id, $args['Product_row']['product_id']);
  $shortlistedProducts_id = array_unique($shortlistedProducts_id);
   //onlyfirst time create chat message
$args['CareteChatMsg']=($args['Quentity']==1)?TRUE:FALSE;
  $args['attachments_type']=1;
  }else{
      foreach( $shortlistedProducts_id as $q=>$p){
          if($p==$args['pid']){
             unset( $shortlistedProducts_id[$q]);


          }
      }
  $shortlistedProducts_id = array_unique($shortlistedProducts_id);
         $args['CareteChatMsg']=TRUE;
  $args['attachments_type']=16;
  }


    //->>makinng str
$args['shortlistedProducts_id_Str']=implode(",",$shortlistedProducts_id);



 $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
   $date=zonedate($zone);
   $dateGMT=zonedate($zone);
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));

    $args['date']=$date;
    $args['dateGMT']=$dateGMT;
    $args['ip']= $ip;

 $storeOutput=new StoreOutput($args['checkIn_row']['store_id']);
 $members= $storeOutput->GetCheckInMember($args['checkIn_row']);
 $args['members']= $members;
 $args['role']=$storeOutput->GetEntityRole( $members);



  if( $args['role']!=='unvalid'&&$args['role']!=0){
     $args['recevers_id']='"'.implode('","',$members).'"';

    $args['attachments_id']=$args['Product_row']['product_id'];
 $ret= $storeOutput->ShortListEdit($args);
$arr['response']= $ParseProducts;
 $arr['state']=200;
 }






 return $arr ;
}

/**
* @description=>checkincartedit
* @param  =>
* @return =>
*/
public function CheckInSuggestEdit($args){
        $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>'','mistake' =>array('heading'=>'','message'=>array()));
   $args['CareteChatMsg']=TRUE;
   //parse Prodcut row
$ParseProducts= $GLOBALS['Var_StoreDashboard']->ParseProducts(array($args['Product_row']))[0];
 //--makinng array
$suggestedProducts_id=array();
$suggestedProducts_idRaw=$args['checkIn_row']['suggestedProducts_id'];
if($suggestedProducts_idRaw!=NULL){
  $suggestedProducts_id=explode(",", $suggestedProducts_idRaw);
}
//--checking array
//--checking array

  if($args['Quentity']!=0){
 array_push($suggestedProducts_id, $args['Product_row']['product_id']);
$suggestedProducts_id = array_unique($suggestedProducts_id);
 //onlyfirst time create chat message
$args['CareteChatMsg']=($args['Quentity']==1)?TRUE:FALSE;
   $args['CareteChatMsg']=TRUE;
    $args['attachments_type']=2;
  }else{
      foreach($suggestedProducts_id as $q=>$p){
          if($p==$args['pid']){
             unset($suggestedProducts_id[$q]);


          }
      }
$suggestedProducts_id = array_unique($suggestedProducts_id);
  $args['CareteChatMsg']=TRUE;
  $args['attachments_type']=17;//suggestion remove
  }

    //->>makinng str
$args['suggestedProducts_id_Str']=implode(",",$suggestedProducts_id);
 $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
   $date=zonedate($zone);
   $dateGMT=zonedate($zone);
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));

    $args['date']=$date;
    $args['dateGMT']=$dateGMT;
    $args['ip']= $ip;

 $storeOutput=new StoreOutput($args['checkIn_row']['store_id']);
 $members= $storeOutput->GetCheckInMember($args['checkIn_row']);

 $args['role']=$storeOutput->GetEntityRole( $members);



  if( ($args['role']!=='unvalid'&&$args['role']==0)||($args['role']!=='unvalid'&&$args['role']==1&&$args['Quentity']==0)){
     $args['recevers_id']='"'.implode('","',$members).'"';

    $args['attachments_id']=$args['Product_row']['product_id'];
 $ret= $storeOutput->SuggestEdit($args);
$arr['response']= $ParseProducts;
 $arr['state']=200;
 }




  return $arr ;
}

   /**
 *
 * @param
 * @call      $GLOBALS['Var_Conversation']->CheckInMemberEdit($args);
 * @return array()
 */
 public function  CheckInMemberEdit($args){
     $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));
   $args['CreateChatMsg']=TRUE;
    //--makinng array
$args['members']= $GLOBALS['Var_Conversation']->GetMemberInConversation($args['checkIn_row']);
$args['Edindex']= $GLOBALS['Var_Conversation']->IndexOfMember($args['checkIn_row'],$ActorEntityData['EntityData']['entity_id']);


 if($args['action']==1){
// we have  to maintane last check time and history clear time
$REfArray=array(); $members=array();$last_check_time=array();$history_cleared_till=array();
 foreach($args['members'] as $q=>$p){

     if(intval($p)!=0){
  $members[$q]=intval($p);
        if(isset($args['checkIn_row']['last_check_time'][$q])){
     $REfArray[$p]=array('last_check_time'=>$args['checkIn_row']['last_check_time'][$q],'history_cleared_till'=>$args['checkIn_row']['history_cleared_till'][$q]);
     }else{
     $REfArray[$p]=array('last_check_time'=>time(),'history_cleared_till'=>time());
     }
     }

       }

// pusing in to member
  array_push(  $members,intval($args['feid']));
   asort($members); // maintain correlation
$members= array_unique($members);

     foreach($members as $q=>$p){
           if($p!=$args['feid']){
  $last_check_time[$q]=  $REfArray[$p]['last_check_time'];
  $history_cleared_till[$q]=  $REfArray[$p]['history_cleared_till'];
           }
       }

       foreach($members as $q=>$p){
           if($p==$args['feid']){
        $last_check_time[$q]=  time();
        $history_cleared_till[$q]=  time();
           }
       }

       if(count($members)>count($args['members'])){
 $args['checkIn_row']['members']= $members;
$args['checkIn_row']['last_check_time']=  $last_check_time;
$args['checkIn_row']['history_cleared_till']= $history_cleared_till;
 $args['attachments_type']=4;// adding the buyer friend by buyer

       }else{

$args['attachments_type']=8;//  8                         opration error message
$args['attachments_type']=8;
       }


 }else{
      foreach($args['members'] as $q=>$p){
          if($p==$args['feid']){
             unset($args['members'][$q]);
    if(isset($args['checkIn_row']['last_check_time'][$q])){   unset($args['checkIn_row']['last_check_time'][$q]); }
    if(isset($args['checkIn_row']['history_cleared_till'][$q])){ unset($args['checkIn_row']['history_cleared_till'][$q]); }


          }
      }
 $args['members'] = array_unique($args['members']);
 // $args['attachments_type']=5;// removing the buyer friend by buyer
 //  $args['attachments_type']=6;//  leaving the buyer friend by self friend
 $args['attachments_type']=($ActorEntityData['EntityData']['entity_id']==$args['feid'])?6:5;
  }

$zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
   $date=zonedate($zone);
   $dateGMT=zonedate($zone);
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));

    $args['date']=$date;
    $args['dateGMT']=$dateGMT;
    $args['ip']= $ip;



  $storeOutput=new StoreOutput($args['checkIn_row']['store_id']);
 $members= $storeOutput->GetCheckInMember($args['checkIn_row']);

 $args['role']=$storeOutput->GetEntityRole( $members);



  if( ($args['role']!=='unvalid')&&(($args['role']==1&&$args['action']==1)||($args['role']>=0&&$args['action']==0)&&(is_array($args['checkIn_row']['members'])))){





    $args['attachments_id']=$args['feid'];
 $ret= $GLOBALS['Var_Conversation']->MemberEdit($args);
 $args['checkIn_row']['members']=$args['members'];
$arr['response']= $storeOutput->ParseCheckInData($args['checkIn_row'],array('Pbank'=>0));
 $arr['state']=200;

  }





     return $arr ;
 }
  /**
 *
 * @param
 * @call       CheckinInitWithNewMember($args)
 * @return array()
 */
 public function CheckinInitWithNewMember($args){

        $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>array(),'mistake' =>array('heading'=>'','message'=>array()));

       $storeOutput=new StoreOutput($args['store_id']);
    $checkIn_row= $storeOutput->GetCheckinRow();



     $MemberEditData =array('action'=>1,'feid'=>$args['feid'],'af'=>'','checkIn_row'=> $checkIn_row,'ActorEntityData'=>$args['ActorEntityData']);






 $arr =    $GLOBALS['Var_Registration']->CheckInMemberEdit($MemberEditData);

 $arr['response']['mode']=1;

 return $arr;
 }

/**
* @description=>RagisterShippingOrder
* @param  =>
* @return =>
*/
 public function RagisterShippingOrder($args){
       $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));
    $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
   $date=zonedate($zone);
   $dateGMT=zonedate($zone);
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));

    $args['date']=$date;
    $args['dateGMT']=$dateGMT;
    $args['ip']= $ip;

  $storeOutput=new StoreOutput( $args['checkIn_row']['store_id']);




 $args['role']=$args['checkIn_parse']['role'];
 $args['GetVarientDataForOrder']=$storeOutput->GetVarientDataForOrder($args['checkIn_parse']['cvD'],$args['checkIn_parse']['cvPD']);

 $args['cartVarient_id']=Makejson($args['checkIn_parse']['cvD']);
 $args['cartVarient_data']=Makejson($args['GetVarientDataForOrder']);

 $args['item_ref_data']=array();
 foreach( $args['GetVarientDataForOrder']  as $u_variend_id =>$u_data ){
   $args['item_ref_data'][]=array('varient_id'=>$u_variend_id,'product_id'=>$u_data['pid']);
 }

 //---shipping address


 //---shipping address

 //order_type
 if($args['shippingAddress']['da']==1){//home delivery==shipable
   $args['order_type']=0;

 }else{
   $args['order_type']=1; //self collect==non shipable

 }
   $args['shipping_address']=$GLOBALS['Var_Utility']->ParseOrderAddress($args['shippingAddress'],'encode');
   //check_response(  $args['shipping_address']);
  //order_status
 $args['order_status']=0;//processing
 $args['buyer_entity_id']=intval($args['checkIn_parse']['Ed'][1]['eid']);
 $args['store_entity_id']=intval($args['checkIn_parse']['Ed'][0]['eid']);

 //CalculateCart
 $CalculateCart=$storeOutput->CalculateCart($args['GetVarientDataForOrder'],$args['checkIn_parse']);
  $args['order_data']=Makejson($CalculateCart);
   $args['order_statistics']=array(
   'order_id'=>0,
   'sub_total'=>$CalculateCart['sub_total'],
   'tax'=>$CalculateCart['tax'],
   'sur_charge'=>$CalculateCart['sur_charge'],
   'discount'=>$CalculateCart['discount'],
   'total_weight'=>$CalculateCart['total_weight'],
   'total'=>$CalculateCart['total'],
   'shipping_charge'=>$CalculateCart['shipping_charge']
   );



  if( $args['role']===1){//check post 1

  if(count($args['checkIn_parse']['cvD'])>0){//check post 2

  if($storeOutput->CheckUnfullfilledOrder($args['checkIn_row']['store_id'],$args['checkIn_row']['buyer_id'])){//check post 3





  ///-- email sending argument
 $storeEntityInformation= new EntityInformation($args['buyer_entity_id'],$args['store_entity_id']);
 $storeLoginData=$storeEntityInformation->GetLoginData($args['store_entity_id']);


 $Payment_Method=($args['order_type']==0)?'Cash on Delivery':'Cash on Collection';
 $Delivery_Method=($args['order_type']==0)?'Home Delivery':'Self Collect';
 $Total_Purchase=$CalculateCart['currency'].' '.$CalculateCart['total'];

 $args['email_data']=array(
 'identity_type'=>$storeLoginData['identity_type'],
 'login_identity'=>validate_word('reverse_HTML_entities',$storeLoginData['login_identity']),
 'shop_name'=>$args['checkIn_parse']['Ed'][0]['entityName'],
 'shop_slug'=>$args['checkIn_parse']['Ed'][0]['slug'],
 'order_name'=>'order_name',
 'customer_name'=>$args['checkIn_parse']['Ed'][1]['entityName'],
'Total_Purchase'=>$Total_Purchase,
'Payment_Method'=>$Payment_Method,
'Delivery_Method'=>$Delivery_Method,
'More_Information_link'=>'<a href="">More Information</a>',
 );


//-->>



$RagisterShippingOrder_id=$storeOutput->RagisterShippingOrder($args);
//check_response($RagisterShippingOrder);


 $arr['response']= array('SBdata'=>$storeOutput->GetCheckInBrowsingData($args['checkIn_row']),'order_id'=>$RagisterShippingOrder_id);
 $arr['state']=200;

  }else{

     $arr['mistake']['message']  ="unfulfilled_order";
  $arr['response']='ok';
 $arr['state']=500;
  }




  }else{
     $arr['mistake']['message']  ="empty_cart";
  $arr['response']='ok';
 $arr['state']=500;
  }



  }else{
    $arr['mistake']['message']  ="Not_allowed";
     $arr['response']='ok';
 $arr['state']=500;
  }



 return $arr;
 }
/**
* @description=>UpdateShippingOrderStatus
* @param  =>
* @return =>
*/
public function UpdateShippingOrderStatus($args){
        $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));        $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
   $date=zonedate($zone);
   $dateGMT=zonedate("UTC");
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));

    $args['date']=$date;
    $args['dateGMT']=$dateGMT;
    $args['ip']= $ip;
 $args['orderTrackUrl']=SITEURL.'ordertracking?oid='.$args['order_id'];

 $storeOutput=new StoreOutput( $args['checkIn_row']['store_id']);
 $args['members']= $storeOutput->GetCheckInMember($args['checkIn_row']);
 $args['checkIn_parse']=$storeOutput->ParseCheckInData($args['checkIn_row'],array('Pbank'=>0));
 //-- Email  data
  $buyerEntityInformation= new EntityInformation($args['order_row']['store_entity_id'],$args['order_row']['buyer_entity_id']);
 $buyerLoginData=$buyerEntityInformation->GetLoginData($args['order_row']['buyer_entity_id']);
  $args['email_data']=array(
 'identity_type'=>$buyerLoginData['identity_type'],
 'login_identity'=>validate_word('reverse_HTML_entities',$buyerLoginData['login_identity']),
 'buyer_name'=>$args['checkIn_parse']['Ed'][1]['entityName'],
 'buyer_slug'=>$args['checkIn_parse']['Ed'][1]['slug'],
 'order_name'=>'order id  '.$args['order_id'] ,
 'store_name'=>$args['checkIn_parse']['Ed'][0]['entityName'],
 'store_url'=>$args['checkIn_parse']['Ed'][0]['entityName'],
 'store_slug'=>$args['checkIn_parse']['Ed'][0]['slug'],
 'status_name'=>$GLOBALS['Var_Utility']->GetStatusName($args['nstatus']),
'status_note'=>$args['status_note'],
'More_Information_link'=>'<a href="'.$args['orderTrackUrl'].'">Track Order</a>',
 );
  //-->> Email  data




$updateordeStatus=$storeOutput->UpdateShippingOrderStatus($args);
  //

  $args['order_row']['order_status']=$args['nstatus'];

 $arr['response']=$GLOBALS['Var_StoreDashboard']->ParseOrders( array($args['order_row']),array('ActorEntityData'=>$ActorEntityData));

 $arr['state']=200;


  return $arr;
}

/**
* @description=>location addd
* @param  =>
* @return =>
*/
public function AddLocation($args){
  $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));
       $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
   $date=zonedate($zone);
   $dateGMT=zonedate("UTC");
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));
 $PostalCodeId=  $GLOBALS['Var_Utility'] ->GetPostalCodeId($args['postalCode'],$args['country']);

   //@info
   // - we ensure location name for every postalCode,city,state,coutry should be unique

   if( $args['locationtype']==0){//cities

  $args['city_id']=$GLOBALS['Var_Utility'] ->GetCityId($args['city'],$args['country'],$args['state']) ;
 $args['location']=$args['city'];
   }

   if( $args['locationtype']==1){//towns

   $args['city_id']=$args['city'];
   $args['location']=$args['town'];
   }


   $Names=array('location','postalCode_id','fl_admin_id','country_id','city_id','locationtype');
   $Values=array($args['location'], $PostalCodeId ,$args['state'],$args['country'],$args['city_id'],$args['locationtype']);

    $is_new=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'locations',$Names,$Values);

  if( $is_new==0){

   $Names=array('location','postalCode_id','fl_admin_id','country_id','city_id','creater_id','create_time_gmt','locationtype');
   $Values=array($args['location'], $PostalCodeId ,$args['state'],$args['country'],$args['city_id'],$ActorEntityData['EntityData']['entity_id'],$dateGMT,$args['locationtype']);

    $args['location_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'locations', $Names,$Values);
  }
$arr['state']=200;
   return $arr;
}

//-------===checkin====------------
//-------===conversation====------------
/**
* @description=>SendconversationTextMessage
* @param  => array('ActorEntityData'=>``,'AllRecipient_EntityRow'=``,)
* @return => array(
    'conversation'=> `conversation row`,
    'All_EntityRow'=>`member entity_id row`
     )
*/

public  function Createconversation($args){
 $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));

$conversation_data =   $GLOBALS['Var_Conversation']->Createconversation($args);
  if($conversation_data['state']==200){
       $arr['response'] = $GLOBALS['Var_Conversation']->ParseConversation($conversation_data['conversation'],
                       array(
                         'ActorEntityData'=> $ActorEntityData,
                         'All_EntityRow'=>$conversation_data['All_EntityRow']
                       )

                       );
 $arr['state']=200;
  }else{

  }




 return $arr;
}

/**
* @description=>SendconversationTextMessage
* @param  =>
* @return =>
*/
public function SendconversationTextMessage($args = array()){
      $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));

    $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
   $date=zonedate($zone);
   $dateGMT=zonedate($zone);
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR'));

    $args['date']=$date;
    $args['dateGMT']=$dateGMT;
    $args['ip']= $ip;

    if(  $GLOBALS['Var_Conversation']->IsMemberInConversation($args['conversation_row'])  ){


     $args=  $GLOBALS['Var_Conversation']->SendTextMessage( $args);



  $Result=array(
	'messages_id' => $args['messages_id'],
	'message' => $args['message'],
	'conversation_id' =>   $args['conversation_id'],
	'recevers_id' => $args['recevers_id'],
	'sender_id' => $args['sender_id'],
	'attachments_id' => NULL,
	'attachments_type' => NULL,
	'time_gmt' =>  $args['dateGMT'],
	'receversDelete_id' => NULL,
	'time_node' => time()
) ;


       $arr['response']= $GLOBALS['Var_Conversation']->ParseConversationMessage(array($Result),array('ActorEntityData'=>$ActorEntityData,'entity_id'=>$ActorEntityData['EntityData']['entity_id'],'conversation_row'=>$args['conversation_row']));

       $arr['state']=200;
    }








 return  $arr;
}



/**
* @description=> direst send text messge to list of mmeber with out knowing converstion id
* @param  =>
* @return =>
*/
public function SendTextMessageToMembers($args = array()){
  $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
   $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));

$conversation_data =   $GLOBALS['Var_Conversation']->Createconversation(array('ActorEntityData'=> $ActorEntityData,'AllRecipient_EntityRow'=> $args['AllRecipient_EntityRow']));

  if($conversation_data['state']==200){

  $GLOBALS['Var_Registration']->SendconversationTextMessage(array(
  'ActorEntityData'=> $ActorEntityData,
  'message'=>$args['message'],
  'conversation_id'=>$conversation_data['conversation']['conversation_id'],
  'conversation_row'=>$conversation_data['conversation']



  ));

   $arr['state']=200;
   $arr['response']= $GLOBALS['Var_Conversation']->ParseConversation($conversation_data['conversation'],
                       array(
                         'ActorEntityData'=> $ActorEntityData,
                         'All_EntityRow'=>$conversation_data['All_EntityRow']
                       )

                       );;

  }else{
        $arr['response']= $conversation_data;
  }

 return $arr;
}

//-------===conversation====------------
//-------===Delete====------------



}



$GLOBALS['Var_Registration'] =new Registration();






?>
