<?php

/**
* @description=>this class has all ragistration mathod.
* @param  =>
* @return =>
*/
class Update{


/**
* @call   $GLOBALS['Var_Update']->UpdateEntityData();
* @description=>update the entity data
* @param  =>
* @return =>
*/

public function UpdateEntityData($EntityRow,$Session_id){
  $Makejson_Public_Data =Makejson_0($EntityRow['public_data']);
$Makejson_Private_Data =Makejson_0($EntityRow['private_data']);
$Search_Data=$GLOBALS['Var_Utility']->CreateSerachData($EntityRow);
$ret=500;
$EntityRow =$GLOBALS['Var_Update']->UpdateProfileCompleteCheck($EntityRow);

if($Makejson_Public_Data['state']==200&& $Makejson_Private_Data['state']==200){

    $Result_update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'entity',array('public_data','private_data','search_data'),array(Makejson($EntityRow['public_data']),Makejson($EntityRow['private_data']),$Search_Data),array('entity_id'),array($EntityRow['entity_id']));

$GLOBALS['Var_Enter']->UpdateSessionData($Session_id,$EntityRow,'EntityData');

$ret=($Result_update=="updated")?200:500;
}

return $ret;
}
/**
* @description=>update the address in
* @param  =>
* @return =>
*/

public function UpdateAddressInAdressTable($args){

 $defaultAddress=$GLOBALS['Var_BundlePrototype']->DefaultValue('address');

 $address=True_array_merge($defaultAddress,$args);//rest args

   $getrow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'address', array('address_id','entity_id','type'),array($address['address_id'],$address['entity_id'],$address['type']));
   if($getrow==NULL){
       //insert
     $address['address_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'address', array('entity_id','location_id','address','landmark','phone','type'),array($address['entity_id'],$address['location_id'],$address['address'],$address['landmark'],$address['phone'],$address['type']));


   }else{

    $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'address', array('location_id','address','landmark','phone'),array($address['location_id'],$address['address'],$address['landmark'],$address['phone']), array('address_id'),array($address['address_id']));

    $address['address_id']=$getrow['address_id'];

   }




 return  $address;

}
/**
* @description=>update the entity setting.
* @param  =>
* @return =>
*/
public function Entity_Setting($type,$args){
    $ActorEntityData= $GLOBALS['Var_ActorEntityData'];
   $arr=array('state' =>500,'response' =>'','mistake' =>array('heading'=>'','message'=>array()));

     //store
    if($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1){
 $EntityInformation= new EntityInformation($ActorEntityData['EntityData']['entity_id'],$ActorEntityData['EntityData']['entity_id']);

 $EntityRow=$EntityInformation->frontuser_EntityRow;


     switch($type){
   case 'store_setting_0':

 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');

  $EntityRow['public_data']['Name']=SafeTextEncode($args['Name']);
  $EntityRow['public_data']['website']=SafeTextEncode($args['website']);
 $EntityRow['public_data']['slug']=$ActorEntityData['EntityData']['public_data']['slug'];




  $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);
    if($update==200){
        $arr['state']=200;
    $arr['response']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);;

      }
   break;


   case 'store_setting_1':
 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');


 $AddressSavedInAddressTable=$this->UpdateAddressInAdressTable(array(
     'address_id'=>$args['address_id'],
     'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'],
     'location_id'=>$args['locationinfo']['location_id'],
     'address'=>$args['address'],
     'landmark'=>$args['landmark'],
     'phone'=> $args['phone'],
     'type'=>1,// 0 for user addres home delivery main | 1 for store address
     'postalCode_id'=>$args['locationinfo']['postalCode_id'],
     'location'=>$args['locationinfo']['location'],
     'country_id'=>$args['locationinfo']['country_id'],
     'fl_admin_id'=>$args['locationinfo']['fl_admin_id'],
     'city_id'=>$args['cityInfo']['location_id'],
     'city'=>$args['cityInfo']['location'],
     'fl_admin'=>$args['stateInfo']['fl_admin'],
     'country'=>$args['countryInfo']['country']   ,
     'type'=>1
       ));

$AddressSavedInAddressTable['address']=SafeTextEncode($args['address']);
$AddressSavedInAddressTable['landmark']=SafeTextEncode($args['landmark']);
$AddressSavedInAddressTable['postalCode_id']= $args['postalCodeinfo']['postalCode_id'];
$AddressSavedInAddressTable['postalCode']= $args['postalCodeinfo']['postalCode'];
$AddressSavedInAddressTable['city']=SafeTextEncode($AddressSavedInAddressTable['city']);
$AddressSavedInAddressTable['town']=SafeTextEncode($args['towninfo']['location']);
$AddressSavedInAddressTable['town_id']=$args['towninfo']['location_id'];
$AddressSavedInAddressTable['location']=SafeTextEncode($AddressSavedInAddressTable['location']);
$AddressSavedInAddressTable['country']=SafeTextEncode($AddressSavedInAddressTable['country']);
$AddressSavedInAddressTable['fl_admin']=SafeTextEncode($AddressSavedInAddressTable['fl_admin']);


 $EntityRow['public_data']['addressdata']= $AddressSavedInAddressTable;



   $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);

   // updateing junction
 $this->CollectionJunctionByLocation($EntityRow['public_data']['collection'],$EntityRow['entity_id'],$args['locationinfo']['location_id']);


      if($update==200){
        $arr['state']=200;
    $arr['response']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);;

      }

   break;
   case 'store_setting_456'://store Policy
    $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
    $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');

 $EntityRow['public_data']['store_policy']=SafeTextEncode($args['store_policy']);
 $EntityRow['private_data']['return_policy']=$args['return_policy'];

   $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);




      if($update==200){
        $arr['state']=200;
    $arr['response']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);;

      }
   break;

   case 'store_setting_457'://about store
    $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
    $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');

 $EntityRow['public_data']['about_store']=SafeTextEncode($args['about_store']);

   $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);




      if($update==200){
        $arr['state']=200;
    $arr['response']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);;

      }
   break;



   case 'setting_store_collection':// setting_store_collection
     $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
    $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');
    //these all value are in array
 $EntityRow['public_data']['collection']=$args['collection_id'];
 $EntityRow['public_data']['collection_data']=$args['collection_data'];
    //updateing store collection by juntion
    if($EntityRow['public_data']['addressdata']['location_id']!=''){
       $this->CollectionJunctionByCollection($args['collection_id'],$EntityRow['entity_id'],$EntityRow['public_data']['addressdata']['location_id']);
    }




   $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);




      if($update==200){
        $arr['state']=200;
    $arr['response']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);;

      }
   break;

      case 'store_setting_3':
 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');

 $EntityRow['private_data']['notification_setting']=$args;//belive on ajax sened data

  $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);
    if($update==200){
        $arr['state']=200;
    $arr['response']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);;

      }
   break;
 case 'store_setting_5':
 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');

 $EntityRow['private_data']['staffHash']=generate_random_string( 20,true ,true ,true, false, false );

 $Makejson_Public_Data =Makejson_0($EntityRow['private_data']);
if($Makejson_Public_Data['state']!=500){

    $Result_update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'entity',array('private_data'),array(Makejson($EntityRow['private_data'])),array('entity_id'),array($EntityRow['entity_id']));
    $arr['state']=200;
    $arr['response']=$EntityRow['private_data']['staffHash'];
}
   break;

    case 'theme':
 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');

$EntityRow['public_data']['theme']=$args['theme'];



  $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);
    if($update==200){
    $arr['state']=200;
    $arr['response']=$EntityRow['public_data']['theme'];

      }

   break;
       case 'setting_profilepic':
 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');


$EntityRow['public_data']['profilepicData']=array('mainimages'=>$args['mainimages'],'webimages'=>  $args['webimages'],'featureimage'=>$args['featureimage']);
$EntityRow['public_data']['avatar']=$GLOBALS['Var_Utility']->GetImageOfProduct($EntityRow['public_data']['profilepicData']);



  $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);
    if($update==200){
    $arr['state']=200;
    $arr['response']=$EntityRow['public_data']['profilepicData'];

      }

   break;




    }

    }
     //buyer

  if($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==0){
 $EntityInformation= new EntityInformation($ActorEntityData['EntityData']['entity_id'],$ActorEntityData['EntityData']['entity_id']);

 $EntityRow=$EntityInformation->frontuser_EntityRow;
    switch($type){

 case 'buyerchangepincode':
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPrivate');

 $location_info=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'all_location', array('location_id'),array($args['location_id']));
 $EntityRow['private_data']['AddressHome']=True_array_merge($EntityRow['private_data']['AddressHome'],$location_info);//location
 $Makejson_Public_Data =Makejson_0($EntityRow['private_data']);

if($Makejson_Public_Data['state']!=500){

    $Result_update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'entity',array('private_data'),array(Makejson($EntityRow['private_data'])),array('entity_id'),array($EntityRow['entity_id']));
    $arr['state']=200;
 $arr['response']=$EntityRow['private_data']['AddressHome'];
}


 break;
 case 'buyersetting_0':

$defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPublic');
$defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPrivate');

$EntityRow['public_data']['Name']=SafeTextEncode($args['FirstName'].' '.$args['LastName']);
$EntityRow['public_data']['sex']=$args['sex'];
$EntityRow['public_data']['birthday']=$args['birthday'];
$EntityRow['public_data']['FirstName']=SafeTextEncode($args['FirstName']);
$EntityRow['public_data']['LastName']=SafeTextEncode($args['LastName']);
$EntityRow['private_data']['countryinfo_id']=$args['countryinfo_id'];
 $EntityRow['public_data']['slug']=$ActorEntityData['EntityData']['public_data']['slug'];


  $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);
    if($update==200){
    $arr['state']=200;
    $arr['response']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);;

      }

  break;
    case 'buyer_setting_568':
$defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');


 $AddressSavedInAddressTable=$this->UpdateAddressInAdressTable(array(
     'address_id'=>$args['address_id'],
     'entity_id'=>$args['ActorEntityData']['EntityData']['entity_id'],
     'location_id'=>$args['locationinfo']['location_id'],
     'address'=>$args['address'],
     'landmark'=>$args['landmark'],
     'phone'=> $args['phone'],
     'type'=>1,// 0 for user addres home delivery main | 1 for store address
     'postalCode_id'=>$args['locationinfo']['postalCode_id'],
     'location'=>$args['locationinfo']['location'],
     'country_id'=>$args['locationinfo']['country_id'],
     'fl_admin_id'=>$args['locationinfo']['fl_admin_id'],
     'city_id'=>$args['cityInfo']['location_id'],
     'city'=>$args['cityInfo']['location'],
     'fl_admin'=>$args['stateInfo']['fl_admin'],
     'country'=>$args['countryInfo']['country']   ,
     'type'=>0
       ));
$AddressSavedInAddressTable['address']=SafeTextEncode($args['address']);
$AddressSavedInAddressTable['landmark']=SafeTextEncode($args['landmark']);
$AddressSavedInAddressTable['city']=SafeTextEncode($AddressSavedInAddressTable['city']);
$AddressSavedInAddressTable['otheraddress']=SafeTextEncode($args['otheraddress']);
$AddressSavedInAddressTable['otherlandmark']=SafeTextEncode($args['otherlandmark']);
$AddressSavedInAddressTable['otherphone']=$args['otherphone'];
$AddressSavedInAddressTable['postalCode_id']= $args['postalCodeinfo']['postalCode_id'];
$AddressSavedInAddressTable['postalCode']= $args['postalCodeinfo']['postalCode'];
$AddressSavedInAddressTable['town']=SafeTextEncode($args['towninfo']['location']);
$AddressSavedInAddressTable['town_id']=$args['towninfo']['location_id'];
$AddressSavedInAddressTable['location']=SafeTextEncode($AddressSavedInAddressTable['location']);
$AddressSavedInAddressTable['country']=SafeTextEncode($AddressSavedInAddressTable['country']);
$AddressSavedInAddressTable['fl_admin']=SafeTextEncode($AddressSavedInAddressTable['fl_admin']);

if(is_numeric_index_array($EntityRow['public_data']['addressdata'])){
  $EntityRow['public_data']['addressdata'][ $AddressSavedInAddressTable['address_id']]= $AddressSavedInAddressTable;
}else{
   $EntityRow['public_data']['addressdata']= array( $AddressSavedInAddressTable['address_id']=>$AddressSavedInAddressTable);
}




   $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);




      if($update==200){
        $arr['state']=200;
    $arr['response']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);;

      }



    break;


    case 'buyersetting_2':

$defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPublic');
$defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPrivate');
    //-- location info
 $location_info=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'all_location', array('location_id'),array($args['location_id']));

$EntityRow['private_data']['AddressWork']=True_array_merge($EntityRow['private_data']['AddressWork'],$location_info);//location

$EntityRow['private_data']['AddressWork']=True_array_merge($EntityRow['private_data']['AddressWork'],$args);//rest args



  $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);
    if($update==200){
    $arr['state']=200;
    $arr['response']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);;

      }


    break;
       case 'checkoutbuyeraddress':
$defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPublic');
$defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPrivate');

$EntityRow['private_data']['AddressHome']['address']=$args['address'];//rest args

$Makejson_Public_Data =Makejson_0($EntityRow['private_data']);
if($Makejson_Public_Data['state']!=500){

    $Result_update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'entity',array('private_data'),array(Makejson($EntityRow['private_data'])),array('entity_id'),array($EntityRow['entity_id']));
    $arr['state']=200;
    $arr['response']=$EntityRow['private_data']['AddressHome']['address'];
}


        break;
         case 'setting_profilepic':
 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');


$EntityRow['public_data']['profilepicData']=array('mainimages'=>$args['mainimages'],'webimages'=>  $args['webimages'],'featureimage'=>$args['featureimage']);
$EntityRow['public_data']['avatar']=$GLOBALS['Var_Utility']->GetImageOfProduct($EntityRow['public_data']['profilepicData']);



  $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);
    if($update==200){
    $arr['state']=200;
    $arr['response']=$EntityRow['public_data']['profilepicData'];

      }

   break;
            case 'setting_banner':
 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');


$EntityRow['public_data']['bannerData']=array('mainimages'=>$args['mainimages'],'webimages'=>  $args['webimages'],'featureimage'=>$args['featureimage']);
$EntityRow['public_data']['banner']=$GLOBALS['Var_Utility']->GetImageOfProduct($EntityRow['public_data']['bannerData']);



  $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);
    if($update==200){
    $arr['state']=200;
    $arr['response']=$EntityRow['public_data']['bannerData'];

      }

   break;

      case 'buyersetting_3':
 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');

 $EntityRow['private_data']['notification_setting']=$args;//belive on ajax sened data

  $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);
    if($update==200){
        $arr['state']=200;
    $arr['response']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);;

      }
   break;
        case 'buyersetting_5':
 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');

 $EntityRow['private_data']['privacy_setting']=$args;//belive on ajax sened data

  $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);
    if($update==200){
        $arr['state']=200;
    $arr['response']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);;

      }
   break;








    }


 }




  //buyer

  if($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==4){
 $EntityInformation= new EntityInformation($ActorEntityData['EntityData']['entity_id'],$ActorEntityData['EntityData']['entity_id']);

 $EntityRow=$EntityInformation->frontuser_EntityRow;
    switch($type){

   case 'company_setting_0':
 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('CompanyPublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('CompanyPrivate');

 $EntityRow['private_data']['privacy_setting']=$args;//belive on ajax sened data

  $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);
    if($update==200){
        $arr['state']=200;
    $arr['response']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);;

      }
   break;






    }


 }

   //special for both
 if($GLOBALS['Var_LoginStatus']&&$type=='deactivation'){
 $EntityInformation= new EntityInformation($ActorEntityData['EntityData']['entity_id'],$ActorEntityData['EntityData']['entity_id']);

 $EntityRow=$EntityInformation->frontuser_EntityRow;
 $EntityRow['private_data']['deactivate']=1;

     $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);

    if($update==200){
    $arr['state']=200;
    $arr['response']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);;

      }
 }


return $arr;

}

/**
* @description=>$GLOBALS['Var_Update']->StoreMenu($args);
* @param  =>
* @return =>
*/

public function StoreMenu($args){
   $ActorEntityData=$args['ActorEntityData'];
   $arr=array('state' =>500,'response' =>'','mistake' =>array('heading'=>'','message'=>array()));
  $args['entity_id']=$ActorEntityData['EntityData']['entity_id'];
  $TableCode=0;
  if(isset($ActorEntityData['EntityData']['private_data']['store_menu_table_code'])){
        $TableCode=$ActorEntityData['EntityData']['private_data']['store_menu_table_code'];
  }
  $TableName='store_menu_'.$TableCode;


  /// first delete preveous ly saved
 $GLOBALS['Var_DBMysqli']->delete(DB_NAME_UTILITY_0,$TableName,array('store_id'),array($args['entity_id']));

  $formatted_fields=array();

     foreach($args['menu'] as $value){
     $formatted_fields[] =  array('id' =>$value['id'],'item_sid' => $value['item_sid'],'label' =>$value['label'],'parent' => $value['parent'],'parent_sid' =>$value['parent_sid'],'slug' => $value['slug'],'term' =>$value['term'],'type' =>$value['type'],'store_id' =>$args['entity_id']);

     }
      //--bulk inserting
    if(count($formatted_fields)>0){
     $do_activity= $GLOBALS['Var_DBMysqli']->bulk_insert(DB_NAME_UTILITY_0,$TableName,array('id','item_sid','label','parent','parent_sid','slug','term','type','store_id'),$formatted_fields);
     }

    //--


   $arr['state']=200;

   return $arr;
}

/**
* @description=>$GLOBALS['Var_Update']->StoreMenu($args);
* @param  =>
* @return =>
*/
public function StoreCategoryBox($args){
     $ActorEntityData=$args['ActorEntityData'];
   $arr=array('state' =>500,'response' =>'','mistake' =>array('heading'=>'','message'=>array()));
   //store
  if($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1){


 $EntityRow=$ActorEntityData['EntityData'];




 $categoryBox=$EntityRow['public_data']['categoryBox'];

  $NewcategoryBox=array();
 foreach($categoryBox as $q=>$value ){
      if($value['cid']==$args['cid']){

 if($args['action']==0){
      unset($categoryBox[$q]);

 }


      }else{
          if($q<5){

              $NewcategoryBox[] =$value;
          }

      }
      }

 if($args['action']==1){
     $NewcategoryBox[$args['index']]=array('cid'=>$args['cid'],'sort'=>$args['sort']);

 }



$ActorEntityData['EntityData']['public_data']['categoryBox']= $NewcategoryBox;
$EntityRow['public_data']=$ActorEntityData['EntityData']['public_data'];
$Makejson_Public_Data =Makejson_0($EntityRow['public_data']);
if($Makejson_Public_Data['state']!=500){


  $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);


    $arr['state']=200;
    $arr['response']=$GLOBALS['Var_StoreDashboard']->GetCategoryBox(array('EntityData'=>$ActorEntityData['EntityData']));


}




  }



return $arr;
}
/**
* @description=>$GLOBALS['Var_Update']->StoreMenu($args);
* @param  =>
* @return =>
*/
public function StoreSlider($args){
   $ActorEntityData=$args['ActorEntityData'];
   $arr=array('state' =>500,'response' =>'','mistake' =>array('heading'=>'','message'=>array()));
   //store
  if($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1){


 $EntityRow=$ActorEntityData['EntityData'];




 $slider=$EntityRow['public_data']['sliderBox'];

  $Newslider=array();$countslide=0;
  foreach($slider as $q=>$value ){
      $countslide++;

   /*
      if($value['linkto']['id']==$args['linkto']['id']&&$value['linkto']['type']==$args['linkto']['type']){




      }else{
          if($countslide<5){
           $Newslider[] =$value;
          }

      }
   */
       if($args['action']==0&&$args['index']==$q){
      unset($slider[$q]);

 }else{
       if($countslide<5){
           $Newslider[] =$value;
          }
 }

      }
 if($args['action']==1){

  //$args['index']
     $Newslider[$args['index']]=array('mainimages'=>$args['mainimages'],'webimages'=>$args['webimages'],'linkto'=>$args['linkto']);

 }

//check_response($args);
//check_response($Newslider);

$ActorEntityData['EntityData']['public_data']['sliderBox']= $Newslider;
$EntityRow['public_data']=$ActorEntityData['EntityData']['public_data'];



   $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);




   if($update==200){
    $arr['state']=200;
    $arr['response']=$GLOBALS['Var_StoreDashboard']->GetSliderBox(array('EntityData'=>$ActorEntityData['EntityData']));

      }

  }



return $arr;
}

/**
* @description=>$GLOBALS['Var_Update']->StoreMenu($args);
* @param  =>
* @return =>
*/
 public function UpdateProductUpsell($args){
     $ActorEntityData=$args['ActorEntityData'];
   $arr=array('state' =>500,'response' =>'','mistake' =>array('heading'=>'','message'=>array()));

  if($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1){
    $UpSells='"'.implode('","',$args['upsell']).'"';

     $Result_update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_products',array('up_sell'),array($UpSells),array('product_id'),array($args['pid']));

       $arr['state']=200;
       $arr['response']=$args['upsellproductRow'];
    }

    return $arr;
 }

 /**
* @description=>profile info update.
* @param  =>
* @return =>
*/
public function ProfileInfoUpdate($infoID,$args){
     $ActorEntityData= $GLOBALS['Var_ActorEntityData'];
   $arr=array('state' =>500,'response' =>'','mistake' =>array('heading'=>'df','message'=>array()));
    $EntityRow= $ActorEntityData['EntityData'];
      if($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==0){//

 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPrivate');


      switch($infoID){
     case 'basicbuyer';

  $EntityRow['public_data']=True_array_merge($EntityRow['public_data'],array('livingPalce'=>SafeTextEncode($args['livingPlace']),
                                                                                'website'=>SafeTextEncode($args['website']),
                                                                                'sex'=>$args['sex']));
      $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);

      if($update==200){
           $arr['state']=200;
        $infoData=$GLOBALS['Var_ViewParse']->ParseProfileInfoData('basicbuyer', $EntityRow,1);
           $arr['response']=$infoData;
      }



      break;
   case'aboutbuyer':
    $EntityRow['public_data']=True_array_merge($EntityRow['public_data'],array('about'=>SafeTextEncode($args['about']))
                                                                                );
      $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);

      if($update==200){
           $arr['state']=200;
        $infoData=$GLOBALS['Var_ViewParse']->ParseProfileInfoData('aboutbuyer', $EntityRow,1);
           $arr['response']=$infoData;
      }
   break;


      }





      }


           if($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1){//

 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPrivate');


      switch($infoID){

case 'StoreshippingZone':
   $EntityRow['private_data']=True_array_merge($EntityRow['private_data'],array('shippingZonecountry'=>$args['shippingZonecountry'],
                                                                                'shippingZonetype'=>$args['shippingZonetype']
                                                                                ));
      $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);

      if($update==200){
           $arr['state']=200;
        $infoData=$GLOBALS['Var_ViewParse']->ParseProfileInfoData('StoreshippingZone', $EntityRow,1);
           $arr['response']=$infoData;
      }
break;
   case 'basicstore':
     $EntityRow['public_data']=True_array_merge($EntityRow['public_data'],array(  'website'=>SafeTextEncode($args['website']))
                                                                                );
      $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);

      if($update==200){
           $arr['state']=200;
        $infoData=$GLOBALS['Var_ViewParse']->ParseProfileInfoData('basicstore', $EntityRow,1);
           $arr['response']=$infoData;
      }
   break;
     case 'storeaddress':
    $arr = $GLOBALS['Var_Update']->Entity_Setting('store_setting_1',$args);
            $arr['state']=200;
        $infoData=$GLOBALS['Var_ViewParse']->ParseProfileInfoData('storeaddress', $EntityRow,1);
        $infoData['data']=  $arr['response']['setting_1'];
         $arr['response']=$infoData;
   break;
   case'aboutstore':
    $EntityRow['public_data']=True_array_merge($EntityRow['public_data'],array('about_store'=>SafeTextEncode($args['about_store']))
                                                                                );
      $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);

      if($update==200){
           $arr['state']=200;
        $infoData=$GLOBALS['Var_ViewParse']->ParseProfileInfoData('aboutstore', $EntityRow,1);
           $arr['response']=$infoData;
      }
   break;
case 'Storepolicy':
     $EntityRow['public_data']=True_array_merge($EntityRow['public_data'],array('store_policy'=>SafeTextEncode($args['store_policy']))
                                                                                );
    $EntityRow['private_data']=True_array_merge($EntityRow['private_data'],array('return_policy'=>$args['return_policy'])
                                                                                );


      $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);

      if($update==200){
           $arr['state']=200;
        $infoData=$GLOBALS['Var_ViewParse']->ParseProfileInfoData('Storepolicy', $EntityRow,1);
           $arr['response']=$infoData;
      }
break;
case 'price_range':

  $EntityRow['private_data']['price_range']=array('min'=> $args['minimum_price'],'max'=>$args['maximum_price']);
  $this->EntityFilterJunction_Update(array('max_price'=>$args['maximum_price'],'min_price'=>$args['minimum_price']),$EntityRow['entity_id']);

      $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);

      if($update==200){
           $arr['state']=200;
        $infoData=$GLOBALS['Var_ViewParse']->ParseProfileInfoData('price_range', $EntityRow,1);
           $arr['response']=$infoData;
      }
break;
case 'minimum_order':

  $EntityRow['private_data']['minimum_order']=$args['minimum_order'];


      $update= $this->UpdateEntityData($EntityRow,$ActorEntityData['visit_data']['wd']);

      if($update==200){
           $arr['state']=200;
        $infoData=$GLOBALS['Var_ViewParse']->ParseProfileInfoData('minimum_order', $EntityRow,1);
           $arr['response']=$infoData;
      }
break;



      }





      }
return $arr;
}
 /**
* @description=>profile info update.
* @param  =>
* @return =>
*/
public function CollectionJunctionByCollection($collectionId_array,$entity_id,$location_id){


  /// first delete preveous ly saved
 $GLOBALS['Var_DBMysqli']->delete(DB_NAME,'store_collection_junction',array('entity_id'),array($entity_id));

 $formatted_fields=array();

     foreach($collectionId_array as $value){
     $formatted_fields[] =  array('collection_id' =>$value,'entity_id' => $entity_id,'location_id' =>$location_id,'time' => time());

     }
      //--bulk inserting
    if(count($formatted_fields)>0){
     $do_activity= $GLOBALS['Var_DBMysqli']->bulk_insert(DB_NAME,'store_collection_junction',array('collection_id','entity_id','location_id','time'),$formatted_fields);
     }

    //--
}
 /**
* @description=>profile info update.
* @param  =>
* @return =>
*/
public function  CollectionJunctionByLocation($collectionId_array,$entity_id,$location_id){

    if(count($collectionId_array)){

    $numRow= $GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'store_collection_junction',array('entity_id'),array($entity_id));

    if($numRow>0){

      $GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_collection_junction',array('location_id'),array($location_id),array('entity_id'),array($entity_id));


    }


    }

}
 /**
* @description=>profile info update.
* @param  =>
* @return =>
*/
public function UpdateBuyerAddressIdInCheckin($args){
   $arr=array('state' =>500,'response' =>'','mistake' =>array('heading'=>'','message'=>array()));

   $buyersPrivate_data= JsonTrueDecode($args['checkIn_row']['buyersPrivate_data'],array()) ;
     $buyersPrivate_data['address_id']=$args['address_id'];
   $buyersPrivate_data= True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('checkinBuyerPrivateData'), $buyersPrivate_data);

  $args['checkIn_row']['buyersPrivate_data']=Makejson( $buyersPrivate_data);

      $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'checkins',array('buyersPrivate_data'),array($args['checkIn_row']['buyersPrivate_data']),array('checkIn_id'),array($args['checkIn_row']['checkIn_id']));


  $storeOutput=new StoreOutput( $args['checkIn_row']['store_id']);
  $SBData= $storeOutput->GetCheckInBrowsingData($args['checkIn_row']);



 $arr['state']=200;

$arr['response']=$SBData;
 return $arr;
}
 /**
* @description=>profile info update.
  @call    =>  $GLOBALS['Var_Update']->  UpdateBlockedEntity( array('action'=>0,'blocked_entity_id'=>0,'entity_row'=>array()))
* @param  => array('action'=>0,'blocked_entity_id'=>0,'entity_row'=>array());
* @return =>
*/
public function UpdateBlockedEntity($args=array()){



    if($args['action']==0){//unblock
      $pos = array_search($args['blocked_entity_id'], $args['entity_row']['private_data']['blocked_entity']);
      unset($args['entity_row']['private_data']['blocked_entity'][$pos]);
    }
     if($args['action']==1){//block
        $args['entity_row']['private_data']['blocked_entity'][]=$args['blocked_entity_id'];
    }

     $update= $this->UpdateEntityData($args['entity_row'],$ActorEntityData['visit_data']['wd']);
}


/*
  @call    =>  $GLOBALS['Var_Update']->UpdateProfileCompleteCheck();
*/
public function UpdateProfileCompleteCheck($EntityRow){
        $parseData=array();
       switch($EntityRow['type']){
          case 0:
 $parseData= $EntityRow['private_data']['profile_complete'];
 if($EntityRow['public_data']['avatar']!=''){ $parseData['profile_pic']=1;}else{ $parseData['profile_pic']=0; }
 if($EntityRow['public_data']['banner']!=''){ $parseData['profile_banner']=1;}else{ $parseData['profile_banner']=0; }
 if(count($EntityRow['public_data']['addressdata'])>1){ $parseData['address']=1;}else{ $parseData['address']=0; }

$parseData['favoritestore_count']=   $GLOBALS['Var_DBMysqli']->numquery(' SELECT COUNT(*) as total
      FROM '.DB_NAME.'.relation_one_way e
       WHERE e.current_status= 4
       AND (e.wr_type= 2|| e.wr_type= 3)
       AND e.from_id='.$EntityRow['entity_id'].' ');




          break;
          case 1:
  $parseData=$EntityRow['private_data']['profile_complete'];
check_response($EntityRow['public_data']['addressdata']);
 if($EntityRow['public_data']['avatar']!=''){ $parseData['profile_pic']=1;}else{ $parseData['profile_pic']=0; }
 if(count($EntityRow['public_data']['sliderBox'])>1){ $parseData['slider']=1;}else{ $parseData['slider']=0; }
 if(count($EntityRow['public_data']['collection'])>=1){ $parseData['collection']=1;}else{ $parseData['collection']=0; }
 if($EntityRow['public_data']['addressdata']['address_id']>0){ $parseData['address']=1;}else{ $parseData['address']=0; }

 //if(count($EntityRow['public_data']['menu_set'])>1){ $parseData['menu_set']=1;}else{ $parseData['menu_set']=0; }



if($parseData['favoriter_count']<10){

     $parseData['favoriter_count']=   $GLOBALS['Var_DBMysqli']->numquery(' SELECT COUNT(*) as total
      FROM '.DB_NAME.'.relation_one_way e
       WHERE e.current_status= 4
       AND (e.wr_type= 2|| e.wr_type= 3)
       AND e.to_id="'.$EntityRow['entity_id'].'" ');

}

if($parseData['category_count']<10){
    $parseData['category_count']=   $GLOBALS['Var_DBMysqli']->numquery(' SELECT COUNT(a.category_id)  FROM '.DB_NAME.'.store_categories a WHERE a.entity_id = '.$EntityRow['entity_id'].'  ');
}
if($parseData['product_count']<10){
    $parseData['product_count'] =   $GLOBALS['Var_DBMysqli']->numquery(' SELECT COUNT(a.product_id)  FROM '.DB_NAME.'.store_products a WHERE a.entity_id = '.$EntityRow['entity_id'].'  ');
}
if($parseData['menu_set']==0){
      $TableCode=0;
  if(isset($EntityRow['private_data']['store_menu_table_code'])){
        $TableCode=$EntityRow['private_data']['store_menu_table_code'];
  }
  $TableName='store_menu_'.$TableCode;

  $menu_result=$GLOBALS['Var_DBMysqli']->numquery('SELECT * FROM '.DB_NAME_UTILITY_0.'.'. $TableName.'  a
   WHERE a.store_id = '.$EntityRow['entity_id'].' ');

   if(  $menu_result>0){$parseData['menu_set']=1;}else{$parseData['menu_set']=0;}
}



          break;
       }
    $EntityRow['private_data']['profile_complete']= $parseData;
    return $EntityRow;
}
/*
  @des     =>
  @call    =>  $GLOBALS['Var_Update']->UpdateEntityRowByProfileCompleteCheck();
*/
public function UpdateEntityRowByProfileCompleteCheck($EntityRow,$Session_id){
      $is_update=FALSE;
       switch($EntityRow['type']){
          case 0:
 $parseData= $EntityRow['private_data']['profile_complete'];
if($parseData['favoritestore_count']<10){
   $is_update=TRUE;
}




          break;
          case 1:
  $parseData=$EntityRow['private_data']['profile_complete'];

  if($parseData['favoriter_count']<10){
    $is_update=TRUE;
}
  if($parseData['category_count']<10){
  $is_update=TRUE;
}
if($parseData['product_count']<10){
  $is_update=TRUE;
}

if($parseData['menu_set']==0){
  $is_update=TRUE;
}

          break;
       }

       if($is_update){
          $this-> UpdateEntityData($EntityRow,$Session_id);
       }
}
/*
  @call    =>  $GLOBALS['Var_Update']->Analytics_Update();
*/

public function Analytics_Update($args){



  $data=array('session_id' => $args['session_id'],
  'entity_id' =>$args['entity_id'],
  'entity_type' =>  $args['entity_type'],
  'entity_slug' =>  $args['slug'],
  'buyer_entity_gender' => $args['buyer_entity_gender'],
  'buyer_entity_age' => $args['buyer_entity_age'],
  'language' => $args['language'],
  'location_id' =>  $args['location_id'],
  'browser_name' =>  $GLOBALS['Var_Browser']->getName(),
  'browser_version' =>   $GLOBALS['Var_Browser']->getVersion(),
  'platform_family' =>  $GLOBALS['Var_Browser']->getPlatform(),
  'Platform_version' =>  $GLOBALS['Var_Browser']->getPlatformVersion(),
  'Screen_Resolution' => $args['innerWidth'].'x'.$args['innerHeight'],
  'isp_name' => '',
  'is_mobile' => ($GLOBALS['Var_Browser']->isMobile())?1:0,
  'is_wowrolApp' => 0,
  'ip_address' => $GLOBALS['Var_ip'],
  'Timestamp' => time(),
  'page_title' =>  $args['title'],
  'page_url' => $args['url']
  );

   $accounts_id=$GLOBALS['Var_DBMysqli']->insert(DB_NAME_ADVERTISING,'analytics',array_keys($data), array_values($data) );

}

/*
  @call    =>  $GLOBALS['Var_Update']->EntityFilterJunction_Updatee($data,$entity_id);
*/

public function EntityFilterJunction_Update($data,$entity_id){

    foreach($data as $key=>$value ){
  $GLOBALS['Var_DBMysqli']->delete(DB_NAME,'entity_filter_junction',array('entity_id','property_name'), array($entity_id,$key) );

  $GLOBALS['Var_DBMysqli']->insert(DB_NAME,'entity_filter_junction',array('entity_id','property_name','property_value'), array($entity_id,$key,$value) );

    }

}






/**/
public function UpdateProductStatus($args){
       $ActorEntityData= $GLOBALS['Var_ActorEntityData'];
   $arr=array('state' =>200,'response' =>'','mistake' =>array('heading'=>'','message'=>array()));





    $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_products', array('is_live'),array($args['is_live']), array('product_id'),array($args['pid']));



    return $arr;
}


}



$GLOBALS['Var_Update'] =new Update();






?>
