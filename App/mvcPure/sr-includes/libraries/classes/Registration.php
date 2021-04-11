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
  $is_unique= is_unique('accounts','login_identity',$login_identity_HTML_entities);

  if($is_unique){

 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('AccountPrivate');


   //--inserting account table
  $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
   $date=zonedate($zone);
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR')); 
   $hash_password=md5($args['password']); 
   $ajax_password=$ActorEntityData['visit_data']['wd'];

      //--setting account options
 $activation_key=generate_random_string( 6,true ,true ,false, false, false );

   $private_data=True_array_merge($defaultPrivate,array(
   'activation_key' => $activation_key,
	'visitId' =>$ActorEntityData['visit_data']['wd'],
	'verification_attempt' =>5 
    ));


   $a =array( 'login_identity',"password","ip_address","registration_time","identity_type",'ajax_password','private_data');
    $b =array($login_identity_HTML_entities,$hash_password,$ip,$date,$identity_type,$ajax_password,Makejson($private_data));

    $accounts_id=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'accounts',$a , $b );
     //--inserting login table
    $actual_input_length=strlen($args['login_identity'].$args['password']);
     $a =array('account_id','login_identity',"password","actual_input_length");
     $b =array($accounts_id,$login_identity_HTML_entities,$hash_password,$actual_input_length);
     $login_id=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'login',$a,$b);

     // updateing login id in accounts


$update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'accounts',array('login_id'),array($login_id),array('account_id'),array($accounts_id));
  


    
    



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
    'memberSience'=>$GLOBALS['Var_Utility']->TimezoneDate()  
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
 $BuyerPublic=array(
    'entity_id' => '',
	'Name' => $args['Name'],
	'UserName' => $args['user_name'],
    'sex'=> $args['sex']     
);

 $BuyerPrivate=array(
	'birthday' => ''.$args['birthday_Month'].','.$args['birthday_Day'].','.$args['birthday_Year'].'',
    'memberSience'=>$GLOBALS['Var_Utility']->TimezoneDate()
);


$Result__Public_Data=array_merge($defaultPublic, $BuyerPublic);
$Result__Private_Data=array_merge($defaultPrivate,  $BuyerPrivate);
//--

 //--store_id
 

$Result__Public_Data['entity_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'entity',array('account_id','type','public_data','private_data'),array($ActorEntityData['LoginData']['account_id'],0,Makejson($Result__Public_Data),Makejson($Result__Private_Data)));

//--updateing store id page slug table

$GLOBALS['Var_PageSlug']->Update_object_id($args['user_name'],$Result__Public_Data['entity_id']);





$arr['state'] =200;
$arr['response']=$Result__Public_Data;



  }else{
    $arr['mistake']['message'][]='your UserName address is used. Try another.'; 
  }
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
 $args['attached_object_Str']=implode(",",$args['attached_object']);
 $args['taged_entity_Str']=implode(",",$args['taged_entity']);
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
		'taged_entity_Str' => $args['taged_entity_Str'],
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
if($args['spread_row']['spread_perpose']=='11'){
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


  $arr['response']=$GLOBALS['Var_StoreDashboard']->ParseCategory($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_categories','entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'],'category_id'=>$category_id)));



  $arr['state']=200;
 }else{
     
      $arr['mistake']['message'][]='This category name  is used for this parent. Try another.'; 
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
      //--
   $date_gmt=date_in_timezone("UTC");
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR')); 


$keyfeature=array($args['keyfeature_0'],$args['keyfeature_1'],$args['keyfeature_2'],$args['keyfeature_3']);
$SearchWord=$args['searchword'];
$VarientName=array($args['varient_1'],$args['varient_2'],$args['varient_3']);

$product_public_data=Makejson(array('keyfeature'=>$keyfeature,
                                     'SearchWord'=>$SearchWord));
$product_private_data=Makejson(array('has_varient'=>$args['has_varient'],
                                     'varient_name'=>$VarientName));;

   $productargs=array(
    'product_id' => $args['pid'],
	'product_name' => $args['name'],
	'spread_id' => $args['sid'],
	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
    'description' => $args['description'],
    'has_varient' => $args['has_varient'],
    'product_public_data' => $product_public_data,
    'product_private_data' => $product_private_data,
    'category' =>'"'.implode('","',$args['category']).'"',
    'date_gmt' => $date_gmt,
    'ip' =>  $ip,
	'ActorEntityData' => $args['ActorEntityData']
    );

   
   $product_id	= $GLOBALS['Var_StoreDashboard']->RagisterProduct($productargs);


  $arr['response']=$GLOBALS['Var_StoreDashboard']->ParseProducts($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_products','entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'],'product_id'=>$product_id)));



  $arr['state']=200;
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
 

     $ragisterArgs=array(
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
 $locations=implode(",",$args['locationsIds']);





  $ragisterArgs=array(
     	'entity_id' => $args['ActorEntityData']['EntityData']['entity_id'],
        'shipping_id' => $args['spgid'],
        'shipping_name' => $args['shipping_name'],
        'type' => $args['type'],
        'range_data' => $range_data,
        'location_data' => $location_data,
        'locations' =>  $locations,
        'timed_charge' => '',
        'description' => $args['description'],
        'store_shipping_row' => $args['store_shipping_row'],
        'ActorEntityData' => $args['ActorEntityData']
     );
 
  $shipping_id=$GLOBALS['Var_StoreDashboard']->RagisterShipping($ragisterArgs);

  $arr['response']=$GLOBALS['Var_StoreDashboard']->ParseShipping($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_shipping','entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'],'shipping_id'=>$shipping_id)));

    $arr['state']=200;

 return  $arr;
}



//-------==store dashboard====------------

//-------===checkin====------------
/**
* @description=>SendCheckinTextMessage
* @param  => 
* @return => 
*/
public function SendCheckinTextMessage($args = array()){
      $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>'','mistake' =>array('heading'=>'','message'=>array()));   

    $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
   $date=zonedate($zone);
   $dateGMT=zonedate($zone);
   $ip = preg_replace('#[^0-9.]#', '', getenv('REMOTE_ADDR')); 

    $args['date']=$date;
    $args['dateGMT']=$dateGMT;
    $args['ip']= $ip;

 $storeOutput=new StoreOutput( $args['checkIn_row']['store_id']);
 $members= $storeOutput->GetCheckInMember($args['checkIn_row']);

 $args['role']=$storeOutput->GetEntityRole( $members);  

   
  $arr['response']= $args;
 if( $args['role']!=='unvalid'){
     $args['recevers_id']='"'.implode('","',$members).'"';

 $ret= $storeOutput->SendCheckinTextMessage($args);  
 $arr['response']='ok';
 $arr['state']=200;
 }




 return  $arr;
}


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
    
      
  }else{
      foreach($cartVarient_id as $q=>$p){
          if($p==$args['vid']){
             unset($cartVarient_id[$q]);
             unset($cartVarient_data[$q]);
             
          }
      }
        $cartVarient_id = array_unique($cartVarient_id);   
         $args['CareteChatMsg']=FALSE; 
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
$args['attachments_type']=0;
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
  }else{
      foreach( $shortlistedProducts_id as $q=>$p){
          if($p==$args['pid']){
             unset( $shortlistedProducts_id[$q]);
          
             
          }
      }
  $shortlistedProducts_id = array_unique($shortlistedProducts_id);    
         $args['CareteChatMsg']=FALSE; 
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

 $args['role']=$storeOutput->GetEntityRole( $members);
   
 

  if( $args['role']!=='unvalid'&&$args['role']!=0){
     $args['recevers_id']='"'.implode('","',$members).'"';
    $args['attachments_type']=1;
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

  }else{
      foreach($suggestedProducts_id as $q=>$p){
          if($p==$args['pid']){
             unset($suggestedProducts_id[$q]);
          
             
          }
      }
$suggestedProducts_id = array_unique($suggestedProducts_id); 
         $args['CareteChatMsg']=FALSE; 
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
    $args['attachments_type']=2;
    $args['attachments_id']=$args['Product_row']['product_id'];
 $ret= $storeOutput->SuggestEdit($args);
$arr['response']= $ParseProducts; 
 $arr['state']=200;
 }




  return $arr ;  
}
/**
* @description=>checkinmemberedit
* @param  => 
* @return => 
*/
public function CkeckInMemberEdit($args){
    $ActorEntityData= $args['ActorEntityData'] ;// stored from sanetize form
 $arr = array('state' =>500,'response' =>$args,'mistake' =>array('heading'=>'','message'=>array()));    
   $args['CareteChatMsg']=TRUE;  
 //--makinng array
 $buyers_id=array();
$buyers_idRaw=$args['checkIn_row']['buyers_id'];
if($buyers_idRaw!=NULL){
  $buyers_id=explode(",", $buyers_idRaw);  
}
//--checking array


  if($args['action']==1){
 array_push($buyers_id,$args['feid']);
$buyers_id = array_unique($buyers_id);  
 $args['attachments_type']=4;// adding the buyer friend by buyer

  }else{
      foreach($buyers_id as $q=>$p){
          if($p==$args['feid']){
             unset($buyers_id[$q]);
          
             
          }
      }
  $buyers_id = array_unique($buyers_id);  
  $args['attachments_type']=5;// removing the buyer friend by buyer
  }


   //->>makinng str   
$args['buyers_id_Str']=implode(",",$buyers_id);
$args['checkIn_row']['buyers_id']=$args['buyers_id_Str'];
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
   
 

  if( ($args['role']!=='unvalid'&&$args['role']==1)){
    
    if($args['action']==1){
           array_push($members,$args['feid']);
    }
    
     $args['recevers_id']='"'.implode('","',$members).'"';
  
    $args['attachments_id']=$args['feid'];
 $ret= $storeOutput->MembersEdit($args);
$arr['response']= $storeOutput->ParseCheckInData($args['checkIn_row'],array('Pbank'=>0)); 
 $arr['state']=200;

 }




  return $arr ;  
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
 $members= $storeOutput->GetCheckInMember($args['checkIn_row']);


 $args['checkIn_parse']=$storeOutput->ParseCheckInData($args['checkIn_row'],array('Pbank'=>0));
 $args['role']=$storeOutput->GetEntityRole( $members);  
 $args['GetVarientDataForOrder']=$storeOutput->GetVarientDataForOrder($args['checkIn_parse']['cvD'],$args['checkIn_parse']['cvPD']);

 $args['cartVarient_id']=Makejson($args['checkIn_parse']['cvD']);
 $args['cartVarient_data']=Makejson($args['GetVarientDataForOrder']);

 $args['shipping_address']=$args['checkIn_parse']['addr'][1];
 //order_type
 if($args['checkIn_parse']['da']==1){//home delivery==shipable
   $args['order_type']=0;
    $args['shipping_address']=Makejson($args['checkIn_parse']['addr'][1]); 
 }else{
   $args['order_type']=1; //self collect==non shipable 
   $args['shipping_address']=Makejson($args['checkIn_parse']['addr'][0]);
 }
  //order_status 
 $args['order_status']=0;//processing
 $args['buyer_entity_id']=intval($args['checkIn_parse']['Ed'][1]['eid']);
 $args['store_entity_id']=intval($args['checkIn_parse']['Ed'][0]['eid']);

 //CalculateCart
 $CalculateCart=$storeOutput->CalculateCart($args['GetVarientDataForOrder'],$args['checkIn_parse']);
  $args['order_data']=Makejson($CalculateCart);


 

  if( $args['role']===156){//check post 1

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



 $RagisterShippingOrder=$storeOutput->RagisterShippingOrder($args);      

 $arr['response']='ok';
 $arr['state']=200;  

  }else{
     $arr['mistake']['message']  ="unfulfilled_order";  

  }


  

  }else{
     $arr['mistake']['message']  ="empty_cart";  

  }



  }else{
    $arr['mistake']['message']  ="Not_allowed";
     $arr['response']='ok';
 $arr['state']=200;  
  }



 return $arr;
 }




//-------===checkin====------------

//-------===Delete====------------



}



$GLOBALS['Var_Registration'] =new Registration();






?>