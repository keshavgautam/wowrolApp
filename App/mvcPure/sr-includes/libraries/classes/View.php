<?php
    
/**
* @description=>Create view from argument.
* @param  => 
* @return => 
*/
 class Views{
     

/**
* @description=>Create view for store public info.
* @param  => 
* @return => 
*/

public function EntityInfo($type,$args){
   $StoreInfo=array(); 
   switch($type){
       case 'AccountEnetityData':
          for($i=0;$i<count($args);$i++){

   if($args[$i]['type']==0){
                  
 $StoreInfo[$i]['Name']= validate_word('reverse_HTML_entities',GetPropertyInArray('Name',$args[$i]['publicInfo']));
  
    $StoreInfo[$i]['entity_id']= intval($args[$i]['entity_id']);
    $StoreInfo[$i]['type']= 0;
              }

              if($args[$i]['type']==1){
                  
    $StoreInfo[$i]['Name']= validate_word('reverse_HTML_entities',GetPropertyInArray('Name',$args[$i]['publicInfo']));
    $StoreInfo[$i]['address']= validate_word('reverse_HTML_entities',GetPropertyInArray('address',$args[$i]['publicInfo']));
    $StoreInfo[$i]['pincode']= GetPropertyInArray('pincode',$args[$i]['publicInfo']);
    $StoreInfo[$i]['phone']= GetPropertyInArray('phone',$args[$i]['publicInfo']);
    $StoreInfo[$i]['entity_id']=intval($args[$i]['entity_id']);
    $StoreInfo[$i]['type']= 1;
              }



   }
       break;
       case 'EntityAddress':
   for($i=0;$i<count($args);$i++){
     if($args[$i]['type']==0){
       $Address= array();

   $Address['Home']=$args[$i]['private_data']['AddressHome'];
   $Address['Work']=$args[$i]['private_data']['AddressWork'];
  $StoreInfo[$i]['addr'] =$Address;  
     }    
  if($args[$i]['type']==1){

   $Address['Work']=array(
               'address'=>$args[$i]['public_data']['address'],
               'location_id'=>$args[$i]['public_data']['location_id'],
               'location_name'=>$args[$i]['public_data']['location_name'],
               'Districtname'=>$args[$i]['public_data']['Districtname'],
               'Statename'=>$args[$i]['public_data']['Statename'],
               'Country'=>$args[$i]['public_data']['Country'],
               'pincode'=>$args[$i]['public_data']['pincode'],
               'phone'=>$args[$i]['public_data']['phone']
                );
  $StoreInfo[$i]['addr'] =$Address;        
     } 

   }
       break;


     default: 
  
   }

   return  $StoreInfo;
}

/**
* @description=>view for hoe page store.
* @param  => 
* @return => 
*/

public function HomePageView($AppId,$args=array()){
    $viewData=array();
      $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
    

    $EntityInformation= new EntityInformation($ActorEntityData['EntityData']['entity_id'],$ActorEntityData['EntityData']['entity_id']);
    $EntityRow=$EntityInformation->frontuser_EntityRow;
   
    switch($AppId){
    case 'HomePageStore':

    $viewData['spread']=$GLOBALS['Var_ViewParse']->SpreadData($EntityRow);

    break;    
    case 'HomePageBuyer':

     $viewData['spread']=$GLOBALS['Var_ViewParse']->SpreadData($EntityRow);
    break; 
    case 'store_settings':

     $viewData['setting']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);
    break; 
    case 'setting_buyer':
 
    $viewData['setting']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);
    break; 
    case 'storestaff':
 
    $viewData['StoreStaffHash']=$EntityRow['private_data']['staffHash'];
    break;
   case 'dashboard_menu':
 
 $viewData['store_menu']=$GLOBALS['Var_StoreDashboard']->GetStoreMenu();
   
    
    break;
   case 'dashboard_frontpage':
 
 $viewData['cBox']=$GLOBALS['Var_StoreDashboard']->GetCategoryBox(array('EntityData'=>$EntityInformation->frontuser_EntityRow));
   
    
    break;
    
    }
    //defalut
 $viewData['EntityStripdata']=$GLOBALS['Var_ViewParse']->EntityStripdata($EntityRow);
 $viewData['theme']=$EntityRow['private_data']['theme'];
    return  $viewData; 

}

/**
* @description=>view for hoe page store.
* @param  => 
* @return => 
*/
public function StoreDashboard($AppId,$args=array()){
     $viewData=array();
      $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
    

  $EntityInformation= new EntityInformation($ActorEntityData['EntityData']['entity_id'],$ActorEntityData['EntityData']['entity_id']);
    $EntityRow=$EntityInformation->frontuser_EntityRow;


   switch($AppId){
 case 'dashboard_categories':

 $viewData['defaultform']=array('form_0'=>$GLOBALS['Var_BundlePrototype']->DefaultValue('category'));

   break; 
 
    
    }

//default
 $viewData['EntityStripdata']=$GLOBALS['Var_ViewParse']->EntityStripdata($EntityRow);
   $viewData['theme']=$EntityRow['private_data']['theme'];
    return $viewData;
}

/**
* @description=>get page view by app id.
* @param  => 
* @return => 
*/

public function ProfilePageView($AppId,$args=array()){
    $viewData=array();
      $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
    $Slug_information = $GLOBALS['Var_Slug_information'] ;
  
    $EntityInformation= new EntityInformation($Slug_information['data']['entity_id'],$ActorEntityData['EntityData']['entity_id']);
    $EntityRow=$EntityInformation->frontuser_EntityRow;
  
    switch($AppId){
    case 'ProfilePageStore':
    $storeOutput=new StoreOutput($Slug_information['data']['entity_id']);
    $viewData=$GLOBALS['Var_BundlePrototype']->DefaultValue('ProfilePage');
    $viewData['twr']= $EntityInformation->RelationData('twr');
    $viewData['owr']= $EntityInformation->RelationData('owr');
    $viewData['owr']= $EntityInformation->RelationData('owr');
    $viewData['pbd']= $EntityInformation->ProfileBannerData();
    $viewData['store_menu']=$storeOutput->GetStoreMenu();
    $viewData['SBData']= $storeOutput->GetStoreBrowsingData();
    
   $viewData['MetaData']= $GLOBALS['Var_ViewParse']->CreateMetaData($EntityRow,'store');

    break;    
    case 'ProfilePageBuyer':
    $viewData=$GLOBALS['Var_BundlePrototype']->DefaultValue('ProfilePage');
    $viewData['twr']= $EntityInformation->RelationData('twr');
    $viewData['owr']= $EntityInformation->RelationData('owr');
    $viewData['pbd']= $EntityInformation->ProfileBannerData();
   

    break;  
     case 'categoryPageStore':
     $storeOutput=new StoreOutput($Slug_information['data']['entity_id']);
     $viewData['store_menu']=$storeOutput->GetStoreMenu();
     $ParseCategoryInfo=$storeOutput->ParseCategoryInfo($Slug_information['objectInfo']);
     $viewData['CategoryInfo']=$ParseCategoryInfo[0];
   $viewData['SBData']= $storeOutput->GetStoreBrowsingData();
     //temporary getting and fill it in AppMetadata
   $viewData['MetaData']= $GLOBALS['Var_ViewParse']->CreateMetaData($EntityRow,'category',$viewData['CategoryInfo']);
    break; 
    case 'productPageStore':
   $storeOutput=new StoreOutput($Slug_information['data']['entity_id']);
   $viewData['store_menu']=$storeOutput->GetStoreMenu();
   $ParseProductInfo=$storeOutput->ParseProductInfo($Slug_information['objectInfo']);
   $viewData['ProductInfo']= $ParseProductInfo[0];
   $viewData['SBData']= $storeOutput->GetStoreBrowsingData();
    //temporary getting and fill it in AppMetadata
   $viewData['MetaData']= $GLOBALS['Var_ViewParse']->CreateMetaData($EntityRow,'product',$viewData['ProductInfo']);

    break;  
    case 'checkins':
$storeOutput=new StoreOutput($Slug_information['data']['entity_id']);

 $viewData['SBData']= $storeOutput->GetCheckInBrowsingData($Slug_information['objectInfo']);



    break; 
    }
    //default
    $viewData['EntityStripdata']=$GLOBALS['Var_ViewParse']->EntityStripdata($EntityRow);
    $viewData['theme']=$EntityRow['private_data']['theme'];

    
    return  $viewData; 

}


 }
 $GLOBALS['Var_Views'] =new Views();
?>