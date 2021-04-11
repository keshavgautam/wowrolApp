<?php
/*----==ROOT DOCUMENT==----*/   
 require($_SERVER['DOCUMENT_ROOT']. '/pr-includes/sr-config.php' );      
 

 $script_out='';
header('Content-Type: application/x-javascript; charset=UTF-8');
header('Expires: ' . gmdate( "D, d M Y H:i:s", time() + 31536000 ) . ' GMT');
header("Cache-Control: public, max-age=31536000");
header("Timing-Allow-Origin: *");
 if($GLOBALS['Var_BrowserName']!='Edge'&&$GLOBALS['Var_BrowserName']!='Internet Explorer'&&$GLOBALS['Var_BrowserName']!='Internet Explorer Mobile'){
   header('Content-Encoding:gzip');
   header('Vary:Accept-Encoding');  
    }
 /*----====----*/  
/**
* @description=>get app  class for component by app id.
* @param  => [string(app id)]
* @return => [array()]
*/
function get_app_class($AppId){
    $AppClass='';
    if($AppId=="HomePageStore"||$AppId=="store_settings"||$AppId=="dashboard_categories"||$AppId=="dashboard_products"||$AppId=="dashboard_frontpage"||$AppId=="dashboard_menu"||$AppId=="dashboard_orders"||$AppId=="dashboard_shipping"||$AppId=="storestaff"||$AppId=="storestafflogin"||$AppId=="notifications"){
    $AppClass='HomePageStore'; 

    }
    if($AppId=="ProfilePageStore"||$AppId=="categoryPageStore"||$AppId=="productPageStore"){
    $AppClass='ProfilePageStore'; 

    }
    if($AppId=="HomePageBuyer"||$AppId==="setting_buyer"||$AppId==="mycheckins"||$AppId=="notifications"){
    $AppClass='HomePageBuyer'; 

    }
    if($AppId=="ProfilePageBuyer"){
    $AppClass='ProfilePageBuyer'; 

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
     $assets='assets/mob/';
    switch($Flaver){
       case 'web':
    $assets='assets/web/';
       break;
    }
      $assets.='javascript';
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
  
   $script_out.=get_file(ROOT  .$assets.'/vendor/bootstrap.js') ;
  
    $script_out.=get_file(ROOT . $assets.'/Controllers/Utility_CheckFeature.js') ;
   $script_out.=get_file(ROOT . $assets.'/Controllers/Utility_Cookie.js') ;
   $script_out.=get_file(ROOT . $assets.'/Controllers/Utility_basicfunction.js') ;
   $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_4_ajax.js') ;
   $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_5_url.js') ;
   $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_Mouse.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_suggestion.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_ListCheckBox.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_drawer.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_Touch.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_tab.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_carousel.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_parseTime.js') ;
   $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_readMore.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_fileUpload.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_masker.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_contentEditable.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_ColorSwatches.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_Theme.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_ToggleView.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_ToggleBlock.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_table.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/TemplateSVG.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_relation.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_Ratting.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_paging.js') ;

  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_collapse.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_autosize.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_bottomfixwrap.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_Updater.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/TemplateWraper.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/TemplatePagePart.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_Form.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_LearnMore.js') ;

  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_recaptcha.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Templates/Tem_recaptcha.js') ;
 

$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_Search.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_Search.js') ;

$script_out.=get_file(ROOT . $assets.'/Controllers/setview.js') ;


       break;
    case 'Material':
    ob_start();
include(ROOT .'/Material/index.php');
 $script_out.= ob_get_clean();

     
     break;
      case 'lang':
   $lang=$resInfo['wg'];
   $script_out.=get_file(ROOT  .$assets.'/localization/'.$lang.'.js') ;



       break;

  case 'main':
  
   $script_out.=get_file(ROOT  .$assets.'/Components/Main.js') ;
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Handler_formSubmit.js') ;


       break;
     case 'polyfill':

 $script_out.=get_file(ROOT . $assets.'/vendor/Polyfill/es5-shim.min.js') ;
  $script_out.=get_file(ROOT . $assets.'/vendor/Polyfill/sizzle.min.js') ;
    $script_out.=get_file(ROOT . $assets.'/vendor/Polyfill/Json.js') ;
  
     break;
   case 'lang':

  $lang=$resInfo['wg'];
     $script_out.=get_file(ROOT  .$assets.'/localization/'.$lang.'.js') ;

     break;
 case 'ragisterbuyer':

  $lang=$resInfo['wg'];
     $script_out.=get_file(ROOT  .$assets.'/Modules/ragisterbuyer.js') ;
     $script_out.=get_file(ROOT  .$assets.'/vendor/date_fill.js') ;
 break;
  case 'setting_buyer':

  $lang=$resInfo['wg'];
     $script_out.=get_file(ROOT  .$assets.'/Modules/setting_buyer.js') ;
     $script_out.=get_file(ROOT  .$assets.'/vendor/date_fill.js') ;
 break;
  
  case 'dashboard_products':

$script_out.=get_file(ROOT  .$assets.'/Modules/dashboard_products.js') ;
$script_out.=get_file(ROOT  .$assets.'/Components/C9_productInventory_froms.js') ;
$script_out.=get_file(ROOT  .$assets.'/Components/C9_productSpecification_froms.js') ;  
$script_out.=get_file(ROOT  .$assets.'/Components/C9_productOptions_froms.js') ;  
 break;

  case 'dashboard_menu':
$script_out.=get_file(ROOT  .$assets.'/Modules/dashboard_menu.js') ;

$script_out.=get_file(ROOT . $assets.'/vendor/jquery/jquery-ui.js') ;
$script_out.=get_file(ROOT . $assets.'/vendor/jquery/jquery.ui.touch-punch.js') ;
$script_out.=get_file(ROOT . $assets.'/vendor/jquery/jquery.mjs.nestedSortable.js') ;


 break;

   case 'categoryPageStore':


$script_out.=get_file(ROOT . $assets.'/vendor/jquery/jquery-ui.js') ;
$script_out.=get_file(ROOT . $assets.'/vendor/jquery/jquery.ui.touch-punch.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_StoreBrowsing.js') ;
$script_out.=get_file(ROOT  .$assets.'/Modules/categoryPageStore.js') ;
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_CategoryListing.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_CategoryListing.js') ;
 break;
    case 'productPageStore':



$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_StoreBrowsing.js') ;
$script_out.=get_file(ROOT  .$assets.'/Modules/productPageStore.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread.js') ;

$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_ProdcutListing.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_ProdcutListing.js') ;

 break;

 case 'checkins':


$script_out.=get_file(ROOT . $assets.'/vendor/jquery/jquery-ui.js') ;
$script_out.=get_file(ROOT . $assets.'/vendor/jquery/jquery.ui.touch-punch.js') ;
$script_out.=get_file(ROOT  .$assets.'/Modules/categoryPageStore.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_StoreBrowsing.js') ;



$script_out.=get_file(ROOT  .$assets.'/Controllers/CheckIn/Utility_CheckInChats.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/CheckIn/Tem_CheckInChats.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/CheckIn/Utility_CheckInStoreBrowser.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/CheckIn/Tem_CheckInStoreBrowser.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/CheckIn/Utility_CheckInShortList.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/CheckIn/Tem_CheckInShortList.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/CheckIn/Utility_CheckInSuggestion.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/CheckIn/Tem_CheckInSuggestion.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/CheckIn/Utility_CheckInCart.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/CheckIn/Tem_CheckInCart.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/CheckIn/Utility_CheckInOrder.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/CheckIn/Tem_CheckInOrder.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/CheckIn/Utility_CheckInMembers.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/CheckIn/Tem_CheckInMembers.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/CheckIn/Utility_CheckInCheckout.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/CheckIn/Tem_CheckInCheckout.js') ;

$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_StoreCheckIn.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/Tem_CheckIns.js') ;

$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread.js') ;

$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_CategoryListing.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_CategoryListing.js') ;
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_ProdcutListing.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_ProdcutListing.js') ;
$script_out.=get_file(ROOT  .$assets.'/Modules/checkins.js') ;

 break;
 case'HomePageBuyer':
 
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_spread.js') ;  
 $script_out.=get_file(ROOT  .$assets.'/Modules/HomePageBuyer.js') ;
 break;
 case'HomePageStore':
  
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_spread.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Modules/HomePageStore.js') ;
 break;
 case'ProfilePageStore':

 
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_spread_ViewReaction.js') ; 
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_spread.js') ;  
 $script_out.=get_file(ROOT  .$assets.'/Modules/ProfilePageStore.js') ;
 break;
  case'ProfilePageBuyer':
 
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_spread_comment.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread_ViewReaction.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_spread_ViewReaction.js') ; 
  $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_spread.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_spread.js') ;  
 $script_out.=get_file(ROOT  .$assets.'/Modules/ProfilePageBuyer.js') ;
 break;
  case'mycheckins':
 $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_mycheckins.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_mycheckins.js') ;   
 $script_out.=get_file(ROOT  .$assets.'/Modules/mycheckins.js') ;
 break;
   case'notifications':
 $script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_Notification.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_Notification.js') ;   
 $script_out.=get_file(ROOT  .$assets.'/Modules/notifications.js') ;
 break;
 case'dashboard_orders':
$script_out.=get_file(ROOT  .$assets.'/vendor/date_fill.js') ;
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_OrdeDashBoard.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_OrdeDashBoard.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Modules/dashboard_orders.js') ;
 break;
 case'dashboard_frontpage':

$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_DashboardFrontPage.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_DashboardFrontPage.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Modules/dashboard_frontpage.js') ;
 break;


   default:
   $script_out.=get_file(ROOT  .$assets.'/Modules/'.$res.'.js') ;
  
 }

 



 if (($res != 'loader') && ($res != 'vendor')&& ($res != 'vendorold') && ($res != 'bootstrap')&& ($res != 'main')&& ($res != 'polyfill')&& ($res != 'ServiceWorker')&& ($res != 'lang')) {

      //inner class switch

     // getting app  class for component

   $script_out.=get_file(ROOT  .$assets.'/Components/C0_start.js') ;
    switch(get_app_class($res)){
   case'HomePageBuyer':


$script_out.=get_file(ROOT  .$assets.'/Components/C3_buyerhomeheader.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Components/C1_drawer_HomePageBuyer.js') ;
$script_out.=get_file(ROOT  .$assets.'/Components/C4_hederAlertBuyer.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Components/C5_SearchDrawer.js') ; 

  break; 
  case'HomePageStore':

$script_out.=get_file(ROOT  .$assets.'/Components/C1_drawer_HomePageStore.js') ;
$script_out.=get_file(ROOT  .$assets.'/Components/C3_storehomeheader.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Components/C4_hederAlertStore.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Components/C5_SearchDrawer.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_dashbord.js') ;        
  break; 
  
    case'ProfilePageStore':
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_ProfileTabViewer.js');
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_ProfieTabViewer.js');  
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_ProfilePage.js'); 
$script_out.=get_file(ROOT  .$assets.'/Components/C11_ProfileBannerStrip.js'); 
$script_out.=get_file(ROOT  .$assets.'/Components/C3_profileheader.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Components/C5_SearchDrawer.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_StoreCheckInList.js') ;
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_StoreCheckInList.js') ;      
  break;  

    case'ProfilePageBuyer':
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_ProfileTabViewer.js');
$script_out.=get_file(ROOT  .$assets.'/Templates/Tem_ProfieTabViewer.js');  
$script_out.=get_file(ROOT  .$assets.'/Controllers/Utility_ProfilePage.js'); 
$script_out.=get_file(ROOT  .$assets.'/Components/C11_ProfileBannerStrip.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Components/C3_profileheader.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Components/C4_hederAlertBuyer.js') ; 
$script_out.=get_file(ROOT  .$assets.'/Components/C5_SearchDrawer.js') ; 
    
  break;  
   
   


     

 }

 //common to all
  $script_out.=get_file(ROOT  .$assets.'/Components/C2_card.js') ; 
 $script_out.=get_file(ROOT  .$assets.'/Components/C8_LearnMore.js') ; 
 $script_out.=get_file(ROOT  .$assets.'/Components/C10_store-explore-menu.js') ;
    //inner class switch



	$script_out.= get_file(ROOT  .$assets. '/Controllers/backinit.js');
     
}
   /*----====----*/  
 header("ETag:".'"'.(md5(time()).'"'));
 header('Last-Modified: ' .md5(time()) . ' ');

 echo $script_out;
 //$minifier = new Minify\JS($script_out);
 //echo $minifier->minify();
?>