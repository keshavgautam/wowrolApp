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
                  
 $StoreInfo[$i]['Name']=SafeTextDecode($args[$i]['publicInfo']['Name']) ;
  
    $StoreInfo[$i]['entity_id']= intval($args[$i]['entity_id']);
    $StoreInfo[$i]['type']= 0;
              }

              if($args[$i]['type']==1){
                  
    $StoreInfo[$i]['Name']=SafeTextDecode($args[$i]['publicInfo']['Name']) ;;

    $StoreInfo[$i]['entity_id']=intval($args[$i]['entity_id']);
    $StoreInfo[$i]['type']= 1;
              }
    if($args[$i]['type']==3){
                  
    $StoreInfo[$i]['Name']=SafeTextDecode($args[$i]['publicInfo']['Name']) ;;

    $StoreInfo[$i]['entity_id']=intval($args[$i]['entity_id']);
    $StoreInfo[$i]['type']= 3;
              }
  if($args[$i]['type']==4){
                  
    $StoreInfo[$i]['Name']=SafeTextDecode($args[$i]['publicInfo']['Name']) ;;

    $StoreInfo[$i]['entity_id']=intval($args[$i]['entity_id']);
    $StoreInfo[$i]['type']= 4;
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
     $viewData['PCC']=$GLOBALS['Var_UtilityCheck']->ProfileCompleteCheck($EntityRow);
    break;    
    case 'HomePageBuyer':

     $viewData['spread']=$GLOBALS['Var_ViewParse']->SpreadData($EntityRow);
     $viewData['PCC']=$GLOBALS['Var_UtilityCheck']->ProfileCompleteCheck($EntityRow);
    break; 
    case 'HomePageLocationManager':

     $viewData['spread']=$GLOBALS['Var_ViewParse']->SpreadData($EntityRow);
     $viewData['PCC']=$GLOBALS['Var_UtilityCheck']->ProfileCompleteCheck($EntityRow);
     $viewData['LM_Data']=$GLOBALS['Var_LocationManager']->LM_Data($EntityRow);
    break; 

       case 'HomePageCompany':

     $viewData['spread']=$GLOBALS['Var_ViewParse']->SpreadData($EntityRow);
     $viewData['PCC']=$GLOBALS['Var_UtilityCheck']->ProfileCompleteCheck($EntityRow);
   
    break; 

    case 'dashboard_advertise':

  
    break; 

    case 'store_settings':

     $viewData['setting']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);
    break; 
    case 'setting_buyer':
 
    $viewData['setting']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);
    $viewData['countryList']=$GLOBALS['Var_Utility'] ->GetCountryList(array('countryinfo_id','country'));
    break; 
    case 'company_settings':
   
    $viewData['setting']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);

    break; 
    
    }
    //defalut
 $viewData['EntityStripdata']=$GLOBALS['Var_ViewParse']->EntityStripdata($EntityRow);
 $viewData['theme']=$EntityRow['public_data']['theme'];
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
    case 'dashboard_products':

 $viewData['defaultcategory']=$EntityRow['private_data']['default_category'];

   break; 
    case 'storestaff':
 
    $viewData['StoreStaffHash']=$EntityRow['private_data']['staffHash'];
    break;
   case 'dashboard_menu':
 
 $viewData['store_menu']=$GLOBALS['Var_StoreDashboard']->GetStoreMenu();
   
    
    break;
   case 'dashboard_frontpage':
 
 $viewData['cBox']=$GLOBALS['Var_StoreDashboard']->GetCategoryBox(array('EntityData'=>$EntityInformation->frontuser_EntityRow));
 $viewData['sBox']=$GLOBALS['Var_StoreDashboard']->GetSliderBox(array('EntityData'=>$EntityInformation->frontuser_EntityRow)); 
    
    break;


  case 'dashboard_shipping':



 $viewData['shippingZone']= $GLOBALS['Var_ViewParse']->ParseProfileInfoData('StoreshippingZone',$EntityRow,1);;

   break; 
 case 'dashboard_reports':

 $viewData['reports']= $GLOBALS['Var_StoreDashboard']->RetriveStoreReport(array('entity_id'=>$ActorEntityData['EntityData']['entity_id']));

   break;   

 case 'dashboard_companymenu':

 $viewData['store_menu']=$GLOBALS['Var_Company_Dashboard']->GetStoreMenu();

   break; 

    }

//default
 $viewData['EntityStripdata']=$GLOBALS['Var_ViewParse']->EntityStripdata($EntityRow);
 $viewData['theme']=$EntityRow['public_data']['theme'];
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
      if(isset($GLOBALS['Var_Slug_information'])){
            $Slug_information = $GLOBALS['Var_Slug_information'] ;
  
    $EntityInformation= new EntityInformation($Slug_information['data']['entity_id'],$ActorEntityData['EntityData']['entity_id']);
    $EntityRow=$EntityInformation->frontuser_EntityRow;
  
  $IsIndexOfBlocked= $GLOBALS['Var_Utility']->IsIndexOfBlocked($EntityRow,$ActorEntityData['EntityData']['entity_id']); 
  $is_disabled=$EntityInformation->IsDisabledViewOnInternet(); 
      }else{
           $EntityInformation= new EntityInformation($ActorEntityData['EntityData']['entity_id'],$ActorEntityData['EntityData']['entity_id']);
    $EntityRow=$EntityInformation->frontuser_EntityRow;
  
  $IsIndexOfBlocked= $GLOBALS['Var_Utility']->IsIndexOfBlocked($EntityRow,$ActorEntityData['EntityData']['entity_id']); 
  $is_disabled=$EntityInformation->IsDisabledViewOnInternet();     
      }


    switch($AppId){
    case 'ProfilePageStore':
    $storeOutput=new StoreOutput($Slug_information['data']['entity_id']);
    $viewData=$GLOBALS['Var_BundlePrototype']->DefaultValue('ProfilePage');
    $viewData['twr']= $EntityInformation->RelationData('twr');
    $viewData['owr']= $EntityInformation->RelationData('owr');
    $viewData['mes']= $EntityInformation->RelationData('message');
    $viewData['shg']= $EntityInformation->RelationData('shopping');
    $viewData['pbd']= $EntityInformation->ProfileBannerData();
    $viewData['store_menu']=$storeOutput->GetStoreMenu($EntityRow);
    $viewData['slider']=$storeOutput->GetSliderBox(array('EntityData'=>$EntityRow));
    $viewData['SBData']= $storeOutput->GetStoreBrowsingData();
    
   $viewData['MetaData']= $GLOBALS['Var_ViewParse']->CreateMetaData('Profilepage',$EntityRow,'store');
   $viewData['SEOData']=   $GLOBALS['Var_ViewParse']-> CreateSEOtext(array('localbusiness'),$EntityRow,'store');

    break;    
    case 'ProfilePageBuyer':
    $viewData=$GLOBALS['Var_BundlePrototype']->DefaultValue('ProfilePage');
    $viewData['twr']= $EntityInformation->RelationData('twr');
    $viewData['owr']= $EntityInformation->RelationData('owr');
    $viewData['mes']= $EntityInformation->RelationData('message');
    $viewData['shg']= $EntityInformation->RelationData('shopping');
    $viewData['pbd']= $EntityInformation->ProfileBannerData();
   

    break;  
     case 'categoryPageStore':
     $storeOutput=new StoreOutput($Slug_information['data']['entity_id']);
    $viewData['store_menu']=$storeOutput->GetStoreMenu($EntityRow);
     $ParseCategoryInfo=$storeOutput->ParseCategoryInfo($Slug_information['objectInfo']);
     $viewData['CategoryInfo']=$ParseCategoryInfo[0];
   $viewData['SBData']= $storeOutput->GetStoreBrowsingData();
   $viewData['CategoryInfo']['categoryParentTree']= $GLOBALS['Var_Utility'] ->GetTheCategoryTree($ParseCategoryInfo[0]['cid'],'parent');
   // $viewData['CategoryInfo']['categoryChildTree']= $GLOBALS['Var_Utility'] ->GetTheCategoryTree($ParseCategoryInfo[0]['cid'],'child');
     //temporary getting and fill it in AppMetadata
   $viewData['MetaData']= $GLOBALS['Var_ViewParse']->CreateMetaData('Profilepage',$EntityRow,'category',$viewData['CategoryInfo']);

    $viewData['SEOData']=   $GLOBALS['Var_ViewParse']-> CreateSEOtext(array('localbusiness','Product','ItemList'),$EntityRow,'category',$viewData['CategoryInfo']);

    break; 
    case 'productPageStore':
   $storeOutput=new StoreOutput($Slug_information['data']['entity_id']);
   $viewData['store_menu']=$storeOutput->GetStoreMenu($EntityRow);
   $ParseProductInfo=$storeOutput->ParseProductInfo($Slug_information['objectInfo']);
   $viewData['ProductInfo']= $ParseProductInfo[0];
   $productCategory=(isset($ParseProductInfo[0]['pC'][0]))?$ParseProductInfo[0]['pC'][0]['cid']:NULL;
   $viewData['ProductInfo']['categoryParentTree']= $GLOBALS['Var_Utility'] ->GetTheCategoryTree($productCategory,'parent');
   $viewData['SBData']= $storeOutput->GetStoreBrowsingData();
    //temporary getting and fill it in AppMetadata
   $viewData['MetaData']= $GLOBALS['Var_ViewParse']->CreateMetaData('Profilepage',$EntityRow,'product',$viewData['ProductInfo']);

   $viewData['SEOData']=   $GLOBALS['Var_ViewParse']-> CreateSEOtext(array('localbusiness','Product','ItemList'),$EntityRow,'product',$viewData['ProductInfo']);


    break;  
        case 'brandPageCompany':
   $Output=new CompanyOutput($Slug_information['data']['entity_id']);
   $viewData['store_menu']=$Output->GetCompanyMenu($EntityRow);
   $ParseProductInfo=$Output->ParseBrandInfo($Slug_information['objectInfo']);
   $viewData['BrandInfo']= $ParseProductInfo[0];
   $productCategory=(isset($ParseProductInfo[0]['pC'][0]))?$ParseProductInfo[0]['pC'][0]['cid']:NULL;
   $viewData['BrandInfo']['categoryParentTree']= $GLOBALS['Var_Company_Dashboard'] ->GetTheCategoryTree($productCategory,'parent');
 
    //temporary getting and fill it in AppMetadata
   $viewData['MetaData']= $GLOBALS['Var_ViewParse']->CreateMetaData('Profilepage',$EntityRow,'brand',$viewData['BrandInfo']);

  


    break; 
    case 'spread':


 $viewData['SData']=  $GLOBALS['Var_Spread']->SpreadCommentTogether($Slug_information['objectInfo']);



    break; 
    
    case 'Welcomepage':


 $viewData['SEOData']=   $GLOBALS['Var_ViewParse']-> CreateSEOtext(array('wowrolOrganization','WebSite'),array(),'');



    break; 
 case 'mobile_enter':
    case 'enter':


 $viewData['SEOData']=   $GLOBALS['Var_ViewParse']-> CreateSEOtext(array('wowrolOrganization','WebSite'),array(),'');
     break; 


    }
    //default
    $viewData['EntityStripdata']=$GLOBALS['Var_ViewParse']->EntityStripdata($EntityRow);
    $viewData['theme']=$EntityRow['public_data']['theme'];
    $viewData['Blocked']= $IsIndexOfBlocked;
    $viewData['is_disabled']=  $is_disabled;
    
    return  $viewData; 

}

/**
* @description=>get page view by app id.
* @param  => 
* @return => 
*/


public function StaticPageView($AppId,$args=array()){
    $viewData=array();   
   switch($AppId){
   case 'ragisterbuyer':
   $viewData['countryList']=$GLOBALS['Var_Utility'] ->GetCountryList(array('countryinfo_id','country'));
   
   break;    
   case 'market':
  // $args['ActorEntityData']=
  $logoutData['marketData']=$GLOBALS['Var_BundlePrototype']->DefaultValue('marketOut');;
  $viewData['mylocation']=array();



   if($GLOBALS['Var_LoginStatus']){
      $homePageData= $this-> HomePageView($AppId);
     $viewData= True_array_merge(  $logoutData,$homePageData);
   
 $viewData['mylocation']=  $GLOBALS['Var_ViewParse']->UserLocationForMarket($args['ActorEntityData']['EntityData']);
   }

   break;  




   }
 $viewData['theme']=$GLOBALS['Var_ActorEntityData']['EntityData']['public_data']['theme'];
   return   $viewData;
}


 }
 $GLOBALS['Var_Views'] =new Views();
?>