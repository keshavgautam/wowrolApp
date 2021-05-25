<?php
/*----==ROOT DOCUMENT==----*/   
 require($_SERVER['DOCUMENT_ROOT']. '/pr-includes/sr-config.php' );      
 

 $script_out='';
header('content-type: text/javascript');
header('expires: ' . gmdate( "D, d M Y H:i:s", time() + 31536000 ) . ' GMT');
header("cache-control: public, max-age=31536000");
header_remove("connection"); 
header_remove("keep-alive"); 
 header('last-modified: ' .md5(LastModifiedTime) . ' ');
 /*----====----*/  
/**
* @description=>get app  class for component by app id.
* @param  => [string(app id)]
* @return => [array()]
*/
function get_app_class($AppId){
    $AppClass='';
    if($AppId=="HomePageStore"||$AppId=="store_settings"||$AppId=="dashboard_categories"||$AppId=="dashboard_collections"||$AppId=="dashboard_products"||$AppId=="dashboard_frontpage"||$AppId=="dashboard_menu"||$AppId=="dashboard_orders"||$AppId=="dashboard_shipping"||$AppId=="dashboard_discounts"||$AppId=="storestaff"||$AppId=="storestafflogin"||$AppId=="dashboard_checkins"||$AppId=="dashboard_reports"){
    $AppClass='HomePageStore'; 
  
    }
    if($AppId=="ProfilePageStore"||$AppId=="categoryPageStore"||$AppId=="productPageStore"){
    $AppClass='ProfilePageStore'; 

    }

   if($AppId=="dashboard_advertise"){
    $AppClass='advertise'; 

    }

    if($AppId=="HomePageBuyer"||$AppId==="setting_buyer"||$AppId==="mycheckins"||$AppId=="requests"||$AppId=="myorders"||$AppId=="messages"||$AppId=="myshops"||$AppId=="browsinghistory"){
    $AppClass='HomePageBuyer'; 

    }

    if($AppId=="HomePageLocationManager"){
    $AppClass='HomePageLocationManager'; 

    }
      if($AppId=="HomePageCompany"||$AppId==="dashboard_companycategories"||$AppId==="dashboard_companymenu"||$AppId==="dashboard_brands"||$AppId==="company_settings"){
    $AppClass='HomePageCompany'; 

    }


    if($AppId=="ProfilePageBuyer"||$AppId=="spread"){
    $AppClass='ProfilePageBuyer'; 

    }

        if($AppId=="brandPageCompany"){
    $AppClass='ProfilePageCompany'; 

    }

       if($AppId=="checkins"){
    $AppClass='checkins'; 

    }


    return $AppClass;

}


 /*----====----*/  
$resInfo=resInfo();
 /*----====----*/  
   $Flaver=$resInfo['wf'];
   $assets='assets/mob/javascript';
 $assetsWeb='assets/web/javascript';
$assetsCore='assets/core/javascript';
 /*----====----*/  

 $res=$resInfo['res'];
 switch($res){
     case 'loader':
  
    $script_out.=get_file(ROOT . $assets.'/Controllers/Utility_1.js') ;
    $script_out.=get_file(ROOT . $assets.'/Controllers/Utility_2.js') ;

    $script_out.=get_file(ROOT . $assets.'/Modules/Loading.js') ;
    $script_out.=get_file(ROOT . $assets.'/Controllers/loader.js') ;

     break;
     case 'vendor':
   $script_out.=get_file(ROOT . $assets.'/vendor/jquery/jquery-2.1.4.min.js') ;

     break;
      case 'vendorold':
   $script_out.=get_file(ROOT . $assets.'/vendor/jquery/jquery-1.12.4.min.js') ;

     break;
      case 'bootstrap':

 //$script_out.=get_file(ROOT  .$assets.'/vendor/bootstrap.js') ;

 

 








 
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_Landing.js') ;
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_Landing.js') ;

$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_PagePart.js') ;






       break;
 
      case 'lang':
  $lang=$resInfo['wg'];
     $script_out.=get_file(ROOT  .$assets.'/localization/'.$lang.'.js') ;



       break;

  case 'main':
  
 


       break;
  
   case 'lang':

  $lang=$resInfo['wg'];
     $script_out.=get_file(ROOT  .$assets.'/localization/'.$lang.'.js') ;

     break;
 case 'ragisterbuyer':

  $lang=$resInfo['wg'];
   $script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_RagisterBuyer.js') ;
     $script_out.=get_file(ROOT  .$assets.'/Modules/ragisterbuyer.js') ;
     $script_out.=get_file(ROOT  .$assetsCore.'/vendor/date_fill.js') ;
 break;
  case 'setting_buyer':

 
    $script_out.=get_file(ROOT  . $assetsCore.'/common/'.$res.'.js') ;  
 $script_out.=get_file(ROOT  . $assetsCore.'/Templates/Tem_setting_buyer.js') ;  
     $script_out.=get_file(ROOT  .$assetsCore.'/vendor/date_fill.js') ;
 break;
  
   case 'company_settings':

 
     $script_out.=get_file(ROOT  . $assetsCore.'/common/'.$res.'.js') ;  
     $script_out.=get_file(ROOT  . $assetsCore.'/Templates/Tem_company_settings.js') ;  
  
 break;
   case 'store_settings':

 
    $script_out.=get_file(ROOT  . $assetsCore.'/common/'.$res.'.js') ;  
 $script_out.=get_file(ROOT  . $assetsCore.'/Templates/Tem_store_settings.js') ;  

 break;
   case 'categoryPageStore':


$script_out.=get_file(ROOT . $assetsCore.'/vendor/jquery/jquery-ui.js') ;
$script_out.=get_file(ROOT . $assetsCore.'/vendor/jquery/jquery.ui.touch-punch.js') ;

$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_CategoryListing.js') ;
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_CategoryListing.js') ;
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_filter.js') ;
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_filter.js') ;
$script_out.=get_file(ROOT  .$assets.'/Modules/categoryPageStore.js') ;
 break;
    case 'productPageStore':




$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_ZoomMobile.js') ;
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_spread.js') ;

$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_ProdcutListing.js') ;
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_ProdcutListing.js') ;
$script_out.=get_file(ROOT  .$assets.'/Modules/productPageStore.js') ;
 break;

 case 'checkins':


$script_out.=get_file(ROOT . $assetsCore.'/vendor/jquery/jquery-ui.js') ;
$script_out.=get_file(ROOT . $assetsCore.'/vendor/jquery/jquery.ui.touch-punch.js') ;




$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_CategoryListing.js') ;
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_CategoryListing.js') ;
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_filter.js') ;
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_filter.js') ;

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_CheckInMembers.js');
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_CheckInMembers.js');  

$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_ZoomMobile.js') ;
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_spread.js') ;

$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_ProdcutListing.js') ;
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_ProdcutListing.js') ;

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_CheckInStoreBrowser.js') ;
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_CheckInStoreBrowser.js') ;



$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_checkins.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_checkins.js') ; 

$script_out.=get_file(ROOT  .$assets.'/Modules/checkins.js') ;

 break;
 case'HomePageBuyer':
 


   $script_out=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('mob_HomePageBuyer');
 break;
 case'HomePageStore':
   $script_out=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('mob_HomePageStore');

 break;

 case'ProfilePageStore':

  $script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_DataPanal.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_spread.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_spread.js') ;  
 $script_out.=get_file(ROOT  .$assets.'/Modules/ProfilePageStore.js') ;
 break;
  case'ProfilePageBuyer':
 $script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_DataPanal.js') ;  
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_spread.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_spread.js') ;  
 $script_out.=get_file(ROOT  .$assets.'/Modules/ProfilePageBuyer.js') ;
 break;
  case'mycheckins':
 $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_mycheckins.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_mycheckins.js') ;   
 $script_out.=get_file(ROOT  .$assets.'/Modules/mycheckins.js') ;
 break;
  case'myorders':
 $script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_myorders.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_myorders.js') ;   
 $script_out.=get_file(ROOT  .$assetsCore.'/common/myorders.js') ;
 break;
  case'myshops':
 $script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_myshops.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_myshops.js') ;   
 $script_out.=get_file(ROOT  .$assetsCore.'/common/myshops.js') ;
 break;
  case'requests':

$script_out.=get_file(ROOT  .$assetsCore.'/Components/C0_start.js') ;
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C3_storehomeheader.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C3_buyerhomeheader.js') ; 

 $script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_FreindRequest.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_FreindRequest.js') ;   
 $script_out.=get_file(ROOT  .$assetsCore.'/common/requests.js') ;
 $script_out.= get_file(ROOT  .$assets. '/Controllers/backinit.js');
 break;
   case'notifications':
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C0_start.js') ;
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C3_storehomeheader.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C3_buyerhomeheader.js') ; 

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_Notification.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_Notification.js') ;   
 $script_out.=get_file(ROOT  .$assetsCore.'/common/notifications.js');
 $script_out.=get_file(ROOT  .$assetsCore.'/Components/C5_SearchDrawer.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C2_card.js') ; 
 $script_out.= get_file(ROOT  .$assets. '/Controllers/backinit.js');
 break;
 case'dashboard_orders1':
$script_out.=get_file(ROOT  .$assets.'/vendor/date_fill.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_OrdeDashBoard.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_OrdeDashBoard.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_OrderStatusUpdate.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_OrderStatusUpdate.js') ; 

 
$script_out.=get_file(ROOT  .$assets.'/Modules/dashboard_orders.js') ;
 break;
 case'dashboard_frontpage':

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_dashboard_frontpage.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_dashboard_frontpage.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Modules/dashboard_frontpage.js') ;
 break;
  case'dashboard_shipping':
  $script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_DataPanal.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_dashboard_shipping.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_dashboard_shipping.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Modules/dashboard_shipping.js') ;
 break;
  case'dashboard_checkins':

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_dashboard_checkins.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_dashboard_checkins.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Modules/dashboard_checkins.js') ;
 break;
   case 'dashboard_products':

$script_out.=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('dashboard_products');
$script_out.=get_file(ROOT  .$assets.'/Modules/dashboard_products.js') ;
break;
   case 'dashboard_collections':

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_dashboard_collections.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_dashboard_collections.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Modules/dashboard_collections.js') ;


break;
   case 'dashboard_categories':
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_dashboard_categories.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_dashboard_categories.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Modules/dashboard_categories.js') ;


break;
   case 'dashboard_discounts':
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_dashboard_discounts.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_dashboard_discounts.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Modules/dashboard_discounts.js') ;


break;

  case 'dashboard_menu':
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_dashboard_menu.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_dashboard_menu.js') ; 

$script_out.=get_file(ROOT  .$assets.'/Modules/dashboard_menu.js') ;

$script_out.=get_file(ROOT . $assetsCore.'/vendor/jquery/jquery-ui.js') ;
$script_out.=get_file(ROOT . $assetsCore.'/vendor/jquery/jquery.ui.touch-punch.js') ;
$script_out.=get_file(ROOT . $assetsCore.'/vendor/jquery/jquery.mjs.nestedSortable.js') ;


 break;
  case 'dashboard_orders':

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_dashboard_orders.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_dashboard_orders.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_filter.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_filter.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_OrderStatusUpdate.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_OrderStatusUpdate.js') ; 

$script_out.=get_file(ROOT  .$assets.'/Modules/dashboard_orders.js') ;
 break;
 case 'dashboard_reports':
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_dashboard_reports.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_dashboard_reports.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_filter.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_filter.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Modules/dashboard_reports.js') ;


break;

case'forget_password':

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_forget_password.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_forget_password.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/common/forget_password.js') ;
break;

case'spread':

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_spread.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_spread.js') ;  
$script_out.=get_file(ROOT  .$assets.'/Modules/spread.js') ;
break;
case'enter':

$script_out.=get_file(ROOT  . $assetsCore.'/Controllers/Utility_SignInGoogle.js') ;
$script_out.=get_file(ROOT  .$assetsCore.'/common/enter.js') ;
$script_out.=get_file(ROOT  .$assets.'/Modules/enter.js') ;
break;
case'mobile_enter':
$script_out=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('mobile_enter');

break;

case'messages':


$script_out.=get_file(ROOT  .$assets.'/Modules/messages.js') ;
break;

case'ragisterstore':

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_RagisterStore.js') ;
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_RagisterStore.js') ;
$script_out.=get_file(ROOT  .$assets.'/Modules/ragisterstore.js') ;
break;

case'market':




$script_out=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('market');

break;


case 'browsinghistory':

$script_out=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('browsinghistory');

break;
case 'registerlocationmanager':

$script_out=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('registerlocationmanager');

break;
case 'HomePageLocationManager':

$script_out=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('HomePageLocationManager');

break;
case 'dashboard_advertise':
    $script_out.=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('dashboard_advertise');  
break;
case 'registercompany':
    $script_out.=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('registercompany');  
break;

case 'dashboard_companycategories':
    $script_out.=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('dashboard_companycategories');  
break;
case 'dashboard_brands':
    $script_out.=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('dashboard_brands');  
break;
case 'dashboard_companymenu':
    $script_out.=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('dashboard_companymenu');  
break;
case 'storestaff':
    $script_out.=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('storestaff');  
break;


case 'Ragister':
    $script_out.=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('Ragister');  
break;

case 'Welcomepage':
    $script_out.=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('Welcomepage');  
break;

case 'brandPageCompany':
  $script_out.=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('brandPageCompany');  
break;

   default:
 //getiing any common file exits if 
if (file_exists(ROOT  . $assetsCore.'/common/'.$res.'.js')) {
     $script_out.=get_file(ROOT  . $assetsCore.'/common/'.$res.'.js') ;  
}else{
$script_out.=get_file(ROOT  .$assets.'/Modules/'.$res.'.js') ;  
    
}

  
 }






 $resList=array('loader','vendor','vendorold','bootstrap','main','polyfill','ServiceWorker','lang','notifications','market');

     if (!in_array($res, $resList)) {
      //inner class switch

     // getting app  class for component

   $script_out.=get_file(ROOT  .$assetsCore.'/Components/C0_start.js') ;
    switch(get_app_class($res)){
   case'HomePageBuyer':

 $script_out.=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('mob_class_HomePageBuyer');


  break; 
  case'HomePageStore':
 $script_out.=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('mob_class_HomePageStore');  
 
  break; 
   case 'HomePageLocationManager':
   $script_out.=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('mob_class_HomePageLocationManager');
  break;
   case 'HomePageCompany':
   $script_out.=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('mob_class_HomePageCompany');
  break;
    case'ProfilePageStore':
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_ProfilePage.js');
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_ProfileTabViewer.js');
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_ProfieTabViewer.js');  

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_CheckInCart.js');
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_CheckInCart.js');  

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_CheckInShortList.js');
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_CheckInShortList.js');  

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_CheckInCheckout.js');
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_CheckInCheckout.js');  

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_CheckInCheckout.js');
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_CheckInCheckout.js');  

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_checkins.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_checkins.js') ; 



$script_out.=get_file(ROOT  .$assetsCore.'/Components/C11_ProfileBannerStrip.js'); 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C_Store_Slider.js'); 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C3_profileheader.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C4_hederAlertStore.js') ; 

  


 $script_out.=get_file(ROOT  .$assetsCore.'/Components/C10_store-explore-menu.js') ;
  break;  

    case'ProfilePageBuyer':
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_ProfilePage.js');
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_ProfileTabViewer.js');
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_ProfieTabViewer.js');  
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_ProfilePage.js'); 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C11_ProfileBannerStrip.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C_Store_Slider.js'); 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C3_profileheader.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C4_hederAlertBuyer.js') ; 

     break;
   case 'ProfilePageCompany':
   $script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_ProfilePage.js');
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_ProfileTabViewer.js');
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_ProfieTabViewer.js');  
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_ProfilePage.js'); 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C11_ProfileBannerStrip.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C_Store_Slider.js'); 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C3_profileheader.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C4_hederAlertBuyer.js') ; 
    break;
   
      case'checkins': 
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_ProfilePage.js');
$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_ProfileTabViewer.js');
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_ProfieTabViewer.js');  

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_CheckInCart.js');
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_CheckInCart.js');  

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_CheckInCheckout.js');
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_CheckInCheckout.js');  

$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_CheckInSuggestion.js');
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_CheckInSuggestion.js');  



$script_out.=get_file(ROOT  .$assetsCore.'/Controllers/Utility_CheckInShortList.js');
$script_out.=get_file(ROOT  .$assetsCore.'/Templates/Tem_CheckInShortList.js');  


$script_out.=get_file(ROOT  .$assetsCore.'/Components/C11_ProfileBannerStrip.js'); 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C_Store_Slider.js'); 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C3_profileheader.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C3_storehomeheader.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C3_buyerhomeheader.js') ; 
$script_out.=get_file(ROOT  .$assetsCore.'/Components/C4_hederAlertStore.js') ; 


 

 $script_out.=get_file(ROOT  .$assetsCore.'/Components/C10_store-explore-menu.js') ;

       break;
   case 'advertise':
    $script_out.=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('mob_class_advertise');  
    break;


 }

 //common to all
  $script_out.=$GLOBALS['Var_Minify']->GET_MINFIED_FILE('mob_class_common');
    //inner class switch



	$script_out.= get_file(ROOT  .$assets. '/Controllers/backinit.js');
     
}
   /*----====----*/  

ob_start();
ob_start("ob_gzhandler");
echo $script_out;
ob_end_flush();
header('Content-Length: '.ob_get_length());
ob_end_flush();
 //$minifier = new Minify\JS($script_out);
 //echo $minifier->minify();
?>