/*
* 
*/
; (function(W){
   "use strict";
    var URL=W.U.URL;
 




var OwnLanding=[ 'ragisterstore','ragisterbuyer','market','registerlocationmanager','registercompany'],
WellcomeClass=['Material','getmaterial','Welcomepage','Ragister','enter','securitycheck','VerifyAccount','forget_password','mobile_enter'],
HomePageBuyerClass=['HomePageBuyer','setting_buyer','myshops','browsinghistory'],
HomePageStoreClass=['HomePageStore','dashboard_categories','dashboard_collections','dashboard_menu','dashboard_products','dashboard_orders','dashboard_orders','dashboard_shipping','dashboard_frontpage','dashboard_checkins','dashboard_discounts','dashboard_reports','storestaff','store_settings','store_notifications'],
HomePageLocationManagerClass=['HomePageLocationManager'],
HomePageCompanyClass=['HomePageCompany','dashboard_companycategories','dashboard_companymenu','dashboard_brands','company_settings'],
HomePageClass=['messages','notifications','checkins','requests','myorders','dashboard_advertise'],

ProfilePageBuyerClass=['spread','ProfilePageBuyer'],
ProfilePageStoreClass=['ProfilePageStore','categoryPageStore','productPageStore'],
ProfilePageCompanyClass=['brandPageCompany'];









 //--
 


function Landing(x){
 var  AppId=W.A.page.AppId;
 var ch='';
  if(!W.M.hasOwnProperty(AppId)){
     AppId='Error';
    console.warn('Module Not Found For App '+AppId);
    }
var  AppClass=GetAppClass(AppId);
  W.I.AppClass=AppClass;

//--for common
switch(AppClass){
    case 'OwnLanding':
       ch=  W.M[AppId].Landing(x); 
    break;
    case 'Wellcome':
 ch= W.U.Landing.Welcome(x);
    break;
    case 'HomePageBuyer':
 ch= W.U.Landing.HomePageBuyer(x);
    break;
   case 'HomePageStore':
 ch= W.U.Landing.HomePageStore(x);
    break;
   case 'HomePageLocationManager':
 ch= W.U.Landing.HomePageLocationManager(x);
    break;
   case 'HomePageCompany':
 ch= W.U.Landing.HomePageCompany(x);
    break;

   case 'ProfilePageBuyer':
   ch=  W.U.Landing.ProfilePageBuyer(x);
    break;
   case 'ProfilePageStore':
  ch= W.U.Landing.ProfilePageStore(x);
    break;
  case 'ProfilePageCompany':
  ch= W.U.Landing.ProfilePageCompany(x);
    break;
     case 'Error':
    ch= W.U.Landing.ErrorPage(x);
    break;
  default:
    ch= W.U.Landing.ErrorPage(x);
   
}



    return W.T.Pane(ch);

}

 //--
 /*
 @ Get the app class for spread name
 W.U.Landing.GetAppClass()
 */
 function GetAppClass(AppId){
var AppClass='Error';var Data=W.A.page;
  
  W.I.LoginStatus=Data.AcessData.LoginStatus;
   W.I.wf=Data.AcessData.visit_data.wf
   W.I.AppId=AppId;
   W.I.entity_type= W.U.intval(Data.AcessData.entity_type);
   W.I.entity_slug= (W.U.isOK(Data.AppView.EntityStripdata))?Data.AppView.EntityStripdata.slug:'';
   W.I.entity_id= W.U.intval(W.A.page.AcessData.entity_id);
  W.I.dp =(W.I.wf=="web")?'dashboardpage':'mainpage';//dashboardpage=>dp
  W.I.dpbf =(W.I.wf=="web")?'DashboardTable':'blockFront';//dashboardpage block front

 W.I.activePage = W.I.dp;
  W.I.activeBlock =W.I.dpbf;


    W.I.CDN=W.C.Setting.staticHTML+'/assets/imgs/emoji/svg/';
    //  W.I.CDN='https://twemoji.maxcdn.com/2/svg/';

 W.I.PRODUCT_PLACEHOLDER=W.U.URL('')+ 'assets/imgs/pic/placeholder_loading.png';
 W.I.IMAGE_PLACEHOLDER=W.U.URL('')+ 'assets/imgs/pic/image_placeholder.png';
  W.I.IMAGE_ERROR_PLACEHOLDER=W.U.URL('')+ 'assets/imgs/pic/image_placeholder.png';
 W.I.GLOBLE_CONTEXT=AppId;

  var initType=0;
   if(W.I.wf=='mob'){
     initType=(W.I.AppId=='checkins'||W.I.AppId=='messages')?1:0;  
   }
    if(W.I.wf=='web'){
      initType=(W.I.AppId=='checkins'||W.I.AppId=='messages')?2:3;    
   }

  W.I.initType=initType;
  W.I.checkinPager=( W.I.initType==2)?'checkinPlatform':'mainpage';
  W.I.checkinblockFront=( W.I.initType==2|| W.I.initType==1)?'checkinPlatformStorebrowsing':'blockFront';


//--------------
var ifOwnLanding=OwnLanding.indexOf(AppId),
ifWellcome=WellcomeClass.indexOf(AppId),
ifHomePageBuyer=HomePageBuyerClass.indexOf(AppId),
ifHomePageStore=HomePageStoreClass.indexOf(AppId),
ifHomePageLocationManager=HomePageLocationManagerClass.indexOf(AppId),
ifHomePageCompany=HomePageCompanyClass.indexOf(AppId),
ifProfilePageBuyer=ProfilePageBuyerClass.indexOf(AppId),
ifProfilePageStore=ProfilePageStoreClass.indexOf(AppId),
ifProfilePageCompany=ProfilePageCompanyClass.indexOf(AppId),
ifHomePage=HomePageClass.indexOf(AppId);
//--



 if(ifOwnLanding >= 0 ){
AppClass='OwnLanding';
          }
 if(ifWellcome >= 0 ){
AppClass='Wellcome';
          }
 if(ifHomePageBuyer >= 0 ){
  AppClass='HomePageBuyer';

          }
 if(ifHomePageStore>= 0 ){
  AppClass='HomePageStore';
          }
 if(ifHomePageLocationManager >= 0 ){
  AppClass='HomePageLocationManager';
          }
 if(ifHomePageCompany >= 0 ){
  AppClass='HomePageCompany';
          }

 if(ifProfilePageBuyer >= 0 ){
  AppClass='ProfilePageBuyer';

          }
 if(ifProfilePageStore>= 0 ){
  AppClass='ProfilePageStore';
          }

 if(ifHomePage>= 0 ){
    
     if( W.I.entity_type==0){    
   AppClass='HomePageBuyer';
     }else if(W.I.entity_type==1){   
    AppClass='HomePageStore';
     }
 
          }


if(ifProfilePageCompany>=0){
    AppClass='ProfilePageCompany';  
}
return AppClass;

 }






 
    W.U.extend(W.U.Landing,{
     Landing:Landing,
     GetAppClass:GetAppClass

   });









 W.U.ccbk.Add('pageloaded',function(){
 W.U.OnImageLoad();


 


   });

})(wowrol);