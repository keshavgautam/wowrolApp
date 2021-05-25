<?php
    

/**
* @description=>Create the default activity property, access, Meta data, and all other property that will needed in future.
* @param  => [string($GLOBALS['Var_path'])]]
* @return => 
*/
class AppProtoType{
/**
* @description=> Return the All the resource set.
* @param  => 
* @return => [array($AppData)]
* @sturcture of arrayrow => $reslib[string(resId)]=array([string(resId)],[string         (Lastmodifide)],[string(AppId)])
*/
public function reslib($resId){
   $reslib=array();
   $LastModified= (SERVER_MODE=="DEVELOPMENT")?time():TIME_assetedit;
 
  switch($resId){
    
       case 'MaterialIcons':
      $reslib=array('resId'=>'MaterialIcons','res'=>'MaterialIcons','type'=>'style','AppId'=>'*','Last-Modified'=>$LastModified);
     break;
     case 'maincss':
      $reslib=array('resId'=>'maincss','res'=>'maincss','type'=>'style','AppId'=>'*','Last-Modified'=> $LastModified);
     break; 
    case 'loader':
      $reslib=array('resId'=>'loaderjs','res'=>'loader','type'=>'script','AppId'=>'*','Last-Modified'=>$LastModified);
     break;
     case 'vendor':
       $reslib=array('resId'=>'vendorjs','res'=>'vendor','type'=>'script','AppId'=>'*','Last-Modified'=>$LastModified);
     break;
    case 'bootstrap':
      $reslib=array('resId'=>'bootstrapjs','res'=>'bootstrap','type'=>'script','AppId'=>'*','Last-Modified'=>$LastModified);
     break;
      case 'common':
      $reslib=array('resId'=>'commonjs','res'=>'common','type'=>'script','AppId'=>'*','Last-Modified'=>$LastModified);
     break;
     case 'lang':
      $reslib=array('resId'=>'langjs','res'=>'lang','type'=>'script','AppId'=>'*','Last-Modified'=>$LastModified);
     break;
     case 'main':
       $reslib=array('resId'=>'mainjs','res'=>'main','type'=>'script','AppId'=>'*','Last-Modified'=> $LastModified);
     break;
     case 'Material':
       $reslib=array('resId'=>'Materialjs','res'=>'Material','type'=>'script','AppId'=>'Material','Last-Modified'=> $LastModified);
     break;
       case 'getmaterial':
       $reslib=array('resId'=>'appjs','res'=>'getmaterial','type'=>'script','AppId'=>'Material','Last-Modified'=> $LastModified);
     break;
     case 'Error':
       $reslib=array('resId'=>'TestPagejs','res'=>'Error','type'=>'script','AppId'=>'Error','Last-Modified'=> $LastModified);
     break;
       //---<<Error>>
         case 'TestPage':
       $reslib=array('resId'=>'TestPagejs','res'=>'TestPage','type'=>'script','AppId'=>'TestPage','Last-Modified'=>$LastModified);
     break;
       //---<<TestPage>>
      case 'Welcomepage':
       $reslib=array('resId'=>'Welcomepagejs','res'=>'Welcomepage','type'=>'script','AppId'=>'Welcomepage','Last-Modified'=> $LastModified);
     break;
     //---<<Welcomepage>>
       case 'VerifyAccount':
       $reslib=array('resId'=>'VerifyAccountjs','res'=>'VerifyAccount','type'=>'script','AppId'=>'VerifyAccount','Last-Modified'=> $LastModified);
     break;
     //---<<VerifyAccount>>
     //---==Ragister==--
     case 'Ragister':
  $reslib=array('resId'=>'appjs','res'=>'Ragister','type'=>'script','AppId'=>'Ragister','Last-Modified'=>$LastModified);
     break;
  
      case 'ragisterstore':
  $reslib=array('resId'=>'appjs','res'=>'ragisterstore','type'=>'script','AppId'=>'ragisterstore','Last-Modified'=>$LastModified);
     break;
     case 'ragisterbuyer':
  $reslib=array('resId'=>'appjs','res'=>'ragisterbuyer','type'=>'script','AppId'=>'ragisterbuyer','Last-Modified'=>$LastModified);
     break;
     case 'ragisterbrand':
  $reslib=array('resId'=>'appjs','res'=>'ragisterbrand','type'=>'script','AppId'=>'ragisterbrand','Last-Modified'=>$LastModified);
     break;
     case 'registerlocationmanager':
  $reslib=array('resId'=>'appjs','res'=>'registerlocationmanager','type'=>'script','AppId'=>'registerlocationmanager','Last-Modified'=>$LastModified);
     break;
   case 'registercompany':
  $reslib=array('resId'=>'appjs','res'=>'registercompany','type'=>'script','AppId'=>'registercompany','Last-Modified'=>$LastModified);
     break;
     

    //---==Ragister==--
      //---==HomePage==--
   case 'HomePageBuyer':
  $reslib=array('resId'=>'appjs','res'=>'HomePageBuyer','type'=>'script','AppId'=>'HomePageBuyer','Last-Modified'=> $LastModified);
     break;
  case 'HomePageStore':
  $reslib=array('resId'=>'appjs','res'=>'HomePageStore','type'=>'script','AppId'=>'HomePageStore','Last-Modified'=> $LastModified);
     break;
  case 'HomePageLocationManager':
  $reslib=array('resId'=>'appjs','res'=>'HomePageLocationManager','type'=>'script','AppId'=>'HomePageLocationManager','Last-Modified'=> $LastModified);
     break;
     case 'HomePageCompany':
       $reslib=array('resId'=>'appjs','res'=>'HomePageCompany','type'=>'script','AppId'=>'HomePageCompany','Last-Modified'=> $LastModified);

     break;

      //---==ProfilePage==--
     case 'ProfilePageStore':
  $reslib=array('resId'=>'appjs','res'=>'ProfilePageStore','type'=>'script','AppId'=>'ProfilePageStore','Last-Modified'=> $LastModified);
     break;

         case 'ProfilePageBuyer':
  $reslib=array('resId'=>'appjs','res'=>'ProfilePageBuyer','type'=>'script','AppId'=>'ProfilePageBuyer','Last-Modified'=> $LastModified);
     break;
       case 'categoryPageStore':
  $reslib=array('resId'=>'appjs','res'=>'categoryPageStore','type'=>'script','AppId'=>'categoryPageStore','Last-Modified'=> $LastModified);
     break;
   case 'productPageStore':
  $reslib=array('resId'=>'appjs','res'=>'productPageStore','type'=>'script','AppId'=>'productPageStore','Last-Modified'=> $LastModified);
     break;
   case 'brandPageCompany':
  $reslib=array('resId'=>'appjs','res'=>'brandPageCompany','type'=>'script','AppId'=>'brandPageCompany','Last-Modified'=> $LastModified);
     break;
     case 'checkins':
  $reslib=array('resId'=>'appjs','res'=>'checkins','type'=>'script','AppId'=>'checkins','Last-Modified'=> $LastModified);
     break;
         case 'checkin':
  $reslib=array('resId'=>'appjs','res'=>'checkin','type'=>'script','AppId'=>'checkin','Last-Modified'=> $LastModified);
     break;
    case 'requests':
  $reslib=array('resId'=>'appjs','res'=>'requests','type'=>'script','AppId'=>'requests','Last-Modified'=> $LastModified);
     break;
    case 'myorders':
  $reslib=array('resId'=>'appjs','res'=>'myorders','type'=>'script','AppId'=>'myorders','Last-Modified'=> $LastModified);
     break;

    case 'myshops':
  $reslib=array('resId'=>'appjs','res'=>'myshops','type'=>'script','AppId'=>'myshops','Last-Modified'=> $LastModified);
     break;

   case 'spread':
  $reslib=array('resId'=>'appjs','res'=>'spread','type'=>'script','AppId'=>'spread','Last-Modified'=> $LastModified);
    break;




     //---<<ProfilePageStore>>

 

     
       //---==object_type:admin_slug==--
        case 'enter':

           $reslib=array('resId'=>'enterjs','res'=>'enter','type'=>'script','AppId'=>'enter','Last-Modified'=> $LastModified);
        break;
   case 'mobile_enter':

           $reslib=array('resId'=>'mobile_enterjs','res'=>'mobile_enter','type'=>'script','AppId'=>'mobile_enter','Last-Modified'=> $LastModified);
        break;

          case 'forget_password':

           $reslib=array('resId'=>'forget_passwordjs','res'=>'forget_password','type'=>'script','AppId'=>'forget_password','Last-Modified'=> $LastModified);
        break;
          case 'store_settings':

           $reslib=array('resId'=>'store_settingsjs','res'=>'store_settings','type'=>'script','AppId'=>'store_settings','Last-Modified'=> $LastModified);
        break;
          case 'setting_buyer':

       $reslib=array('resId'=>'setting_buyerjs','res'=>'setting_buyer','type'=>'script','AppId'=>'setting_buyer','Last-Modified'=> $LastModified);
        break;


        case 'company_settings':
       $reslib=array('resId'=>'company_settingsjs','res'=>'company_settings','type'=>'script','AppId'=>'company_settings','Last-Modified'=> $LastModified);

         break;      
         case 'dashboard_categories':

       $reslib=array('resId'=>'dashboard_categoriesjs','res'=>'dashboard_categories','type'=>'script','AppId'=>'dashboard_categories','Last-Modified'=> $LastModified);
        break;
    case 'dashboard_collections':

       $reslib=array('resId'=>'dashboard_collectionsjs','res'=>'dashboard_collections','type'=>'script','AppId'=>'dashboard_collections','Last-Modified'=> $LastModified);
        break;
         case 'dashboard_products':

       $reslib=array('resId'=>'dashboard_productsjs','res'=>'dashboard_products','type'=>'script','AppId'=>'dashboard_products','Last-Modified'=> $LastModified);
        break;
        case 'dashboard_menu':

       $reslib=array('resId'=>'dashboard_menujs','res'=>'dashboard_menu','type'=>'script','AppId'=>'dashboard_menu','Last-Modified'=> $LastModified);
        break;
        case 'dashboard_orders':

       $reslib=array('resId'=>'dashboard_ordersjs','res'=>'dashboard_orders','type'=>'script','AppId'=>'dashboard_orders','Last-Modified'=> $LastModified);
        break;
         case 'dashboard_shipping':

       $reslib=array('resId'=>'dashboard_shippingjs','res'=>'dashboard_shipping','type'=>'script','AppId'=>'dashboard_shipping','Last-Modified'=> $LastModified);
        break;
         case 'dashboard_frontpage':

       $reslib=array('resId'=>'appjs','res'=>'dashboard_frontpage','type'=>'script','AppId'=>'dashboard_frontpage','Last-Modified'=> $LastModified);
        break;
        case 'dashboard_reports':

       $reslib=array('resId'=>'appjs','res'=>'dashboard_reports','type'=>'script','AppId'=>'dashboard_reports','Last-Modified'=> $LastModified);
        break;
       case 'dashboard_checkins':

       $reslib=array('resId'=>'appjs','res'=>'dashboard_checkins','type'=>'script','AppId'=>'dashboard_checkins','Last-Modified'=> $LastModified);
        break;
 case 'dashboard_discounts':

       $reslib=array('resId'=>'dashboard_discountsjs','res'=>'dashboard_discounts','type'=>'script','AppId'=>'dashboard_discounts','Last-Modified'=> $LastModified);
        break;

 case 'dashboard_advertise':
  $reslib=array('resId'=>'appjs','res'=>'dashboard_advertise','type'=>'script','AppId'=>'dashboard_advertise','Last-Modified'=>$LastModified);
     break;
        case 'storestaff':

       $reslib=array('resId'=>'appjs','res'=>'storestaff','type'=>'script','AppId'=>'storestaff','Last-Modified'=> $LastModified);
        break;
       case 'viewcarts':

       $reslib=array('resId'=>'appjs','res'=>'viewcarts','type'=>'script','AppId'=>'viewcarts','Last-Modified'=> $LastModified);
        break;
         case 'vieworders':

       $reslib=array('resId'=>'appjs','res'=>'vieworders','type'=>'script','AppId'=>'vieworders','Last-Modified'=> $LastModified);
        break;

      case 'notifications':

       $reslib=array('resId'=>'appjs','res'=>'notifications','type'=>'script','AppId'=>'notifications','Last-Modified'=> $LastModified);
        break;
  case 'messages':

       $reslib=array('resId'=>'appjs','res'=>'messages','type'=>'script','AppId'=>'messages','Last-Modified'=> $LastModified);
        break;
  case 'requests':

       $reslib=array('resId'=>'appjs','res'=>'requests','type'=>'script','AppId'=>'requests','Last-Modified'=> $LastModified);
        break;
  case 'storestafflogin':

       $reslib=array('resId'=>'appjs','res'=>'storestafflogin','type'=>'script','AppId'=>'storestafflogin','Last-Modified'=> $LastModified);
        break;
   case 'mycheckins':

       $reslib=array('resId'=>'appjs','res'=>'mycheckins','type'=>'script','AppId'=>'mycheckins','Last-Modified'=> $LastModified);
        break; 
   case 'market':

       $reslib=array('resId'=>'appjs','res'=>'market','type'=>'script','AppId'=>'market','Last-Modified'=> $LastModified);
        break; 
  case 'ordertracking':

       $reslib=array('resId'=>'appjs','res'=>'ordertracking','type'=>'script','AppId'=>'ordertracking','Last-Modified'=> $LastModified);

        break; 
  case 'orderdetails':

       $reslib=array('resId'=>'appjs','res'=>'orderdetails','type'=>'script','AppId'=>'orderdetails','Last-Modified'=> $LastModified);

        break;

  case 'directory':

       $reslib=array('resId'=>'appjs','res'=>'directory','type'=>'script','AppId'=>'directory','Last-Modified'=> $LastModified);

        break;
  case 'directoryxml':

       $reslib=array('resId'=>'appjs','res'=>'directory','type'=>'script','AppId'=>'directory','Last-Modified'=> $LastModified);

        break;
      case 'securitycheck':

       $reslib=array('resId'=>'appjs','res'=>'securitycheck','type'=>'script','AppId'=>'securitycheck','Last-Modified'=> $LastModified);
        break;    
        
        case 'browsinghistory':
    $reslib=array('resId'=>'appjs','res'=>'browsinghistory','type'=>'script','AppId'=>'browsinghistory','Last-Modified'=> $LastModified);
        break;
  
  
         case 'dashboard_companycategories':
    $reslib=array('resId'=>'appjs','res'=>'dashboard_companycategories','type'=>'script','AppId'=>'dashboard_companycategories','Last-Modified'=> $LastModified);
        break; 
           case 'dashboard_companymenu':
    $reslib=array('resId'=>'appjs','res'=>'dashboard_companymenu','type'=>'script','AppId'=>'dashboard_companymenu','Last-Modified'=> $LastModified);
        break; 
            break; 
           case 'dashboard_brands':
    $reslib=array('resId'=>'appjs','res'=>'dashboard_brands','type'=>'script','AppId'=>'dashboard_brands','Last-Modified'=> $LastModified);
        break;             
       //---==object_type:admin_slug==--

   case 'profilePageBuyer':
  $reslib=array('resId'=>'HomePageStorejs','res'=>'HomePageStore','type'=>'script','AppId'=>'HomePageStore','Last-Modified'=> $LastModified);
     break;
     //---<<HomePageBuyer>>
     default:
      $reslib=array('resId'=>'','res'=>'','type'=>'script','AppId'=>'','Last-Modified'=> $LastModified);
  }
   
   return $reslib;

}


 /**
* @description=> Return the Default Set the correct data.
* @param  => 
* @return => [array($AppData)]
*/
public function DefaultAppData(){
$ActorEntityData=$GLOBALS['Var_ActorEntityData'];
    $flaver=$GLOBALS['Var_ActorEntityData']['visit_data']['wf'];
    $AppData=array(
    'AppName'=>'',
    'AcessData'=>array(),
    'AppSlug'=>Responsive_SITEURL.$_SERVER['REQUEST_URI'],
    'AppId'=>'',
    'AppMetaData'=>'',
    'AppSEOData'=>array('head'=>'','body'=>''),
    'refresh'=>40000,
    'Junction'=>array(),//hold node callback function 
    'AppTitle'=>'Wowrol',
    'AppView'=>array('theme'=>$GLOBALS['Var_ActorEntityData']['EntityData']['public_data']['theme']),
    'CDNSTATIC'=>CDNSTATIC,
    'res'=>array(array('resId'=>'maincss','res'=>'maincss','type'=>'style','name'=>GetResName($this->reslib('maincss'),$ActorEntityData),'replace'=>'0','path'=>GetResPath($this->reslib('maincss'), $ActorEntityData)),
     array('resId'=>'vendorjs','res'=>'vendor','name'=>GetResName($this->reslib('vendor'),$ActorEntityData),'type'=>'script','replace'=>'0','path'=>GetResPath($this->reslib('vendor'), $ActorEntityData)),
               array('resId'=>'bootstrapjs','res'=>'bootstrap','name'=>GetResName($this->reslib('bootstrap'),$ActorEntityData),'type'=>'script','replace'=>'0','path'=>GetResPath($this->reslib('bootstrap'), $ActorEntityData)),
              array('resId'=>'langjs','res'=>'lang','name'=>GetResName($this->reslib('lang'),$ActorEntityData),'type'=>'script','replace'=>'0','path'=>GetResPath($this->reslib('lang'), $ActorEntityData)),
             /*    array('resId'=>'mainjs','res'=>'main','name'=>GetResName($this->reslib('main'),$ActorEntityData),'type'=>'script','replace'=>'0','path'=>GetResPath($this->reslib('main'), $ActorEntityData)),*/
     array('resId'=>'commonjs','res'=>'common','name'=>GetResName($this->reslib('common'),$ActorEntityData),'type'=>'script','replace'=>'0','path'=>GetResPath($this->reslib('common'), $ActorEntityData))
                
                ),  
    'IsPage'=>FALSE,
    'IsstaticHtml'=>FALSE,
    'IsstaticXML'=>FALSE
    );
   
    


return $AppData;
}   
/**
* @description=> GEt the Current appid According to slug.
* @param  => 
* @return => [String($AppID)]
*/
public function GetAppId(){
    $AppId="Error";
$ActorEntityData= $GLOBALS['Var_ActorEntityData'];

    if($GLOBALS['Var_path']==''){

if(IsMaterial()){
     $AppId="Material";   
}else{
    if($GLOBALS['Var_LoginStatus']){
    if($ActorEntityData['verified']==0){
        
  $AppId="VerifyAccount"; 

    }else{
     if(intval($ActorEntityData['LoginData']['entity_id'])==0){
       $AppId="Ragister";   
     }else{
         //-- working with entity data
         switch($ActorEntityData['EntityData']['type']){
             
           case 0://
             $AppId="HomePageBuyer"; 
            break;
            case 1://
            $AppId="HomePageStore"; 
            break;
           case 3://
            $AppId="HomePageLocationManager"; 
            break;
           case 4://
            $AppId="HomePageCompany"; 
            break;

         }


          //-- working with entity data

     }  

    }
       
      
    }else{
      $AppId="Welcomepage";    
    }


    
}

    
    }else{
   $GLOBALS['Var_Slug_information'] =$GLOBALS['Var_PageSlug']->Slug_information($GLOBALS['Var_path']);

   if( $GLOBALS['Var_Slug_information']['status']==200){
   //---==object_type==--
   switch( $GLOBALS['Var_Slug_information']['data']['object_type']){
   
     

//---==object_type:store==--
case 'store':
$AppId='ProfilePageStore';

  $AppId = ($GLOBALS['Var_LoginStatus']) ?  $AppId: $AppId ;

break;
case 'category':
$AppId='categoryPageStore';
    $AppId = ($GLOBALS['Var_LoginStatus']) ?  $AppId: $AppId ;

break;
case 'product':
$AppId='productPageStore';
   $AppId = ($GLOBALS['Var_LoginStatus']) ?  $AppId: $AppId ;

break;
case 'brand':
$AppId='brandPageCompany';
   $AppId = ($GLOBALS['Var_LoginStatus']) ?  $AppId: $AppId ;

break;   
case 'orderdetails':
$order_row=$GLOBALS['Var_Slug_information']['objectInfo'];

if(in_array($ActorEntityData['EntityData']['entity_id'], array($order_row['buyer_entity_id'],$order_row['store_entity_id']))){
 switch ($GLOBALS['Var_Slug_information']['data']['object_id']) {
  case 'orderdetails':
	$AppId = ($GLOBALS['Var_LoginStatus']) ? 'orderdetails' : 'Error';
   $AppId = ($GLOBALS['Var_IsEntitySelected']) ?  $AppId:'Ragister' ;
	break;
case 'ordertracking':
 $AppId = ($GLOBALS['Var_LoginStatus']) ? 'ordertracking' : 'Error';
   $AppId = ($GLOBALS['Var_IsEntitySelected']) ?  $AppId:'Ragister' ;
 
	break;   

 }
 }else{
     $AppId =  'Error';
 }
break;
case 'spread':
	switch ($GLOBALS['Var_Slug_information']['data']['object_id']) {
	   case 'spread':
     	$AppId = ($GLOBALS['Var_LoginStatus']) ? 'spread' : 'Error';  
       break; 


	}
break;
//---==object_type:buyer==--
case 'buyer':


$AppId='ProfilePageBuyer';

break;

 //---==object_type:admin_slug==--
      case 'admin_slug':
    switch ($GLOBALS['Var_Slug_information']['data']['object_id']) {
case 'enter':
	$AppId = ($GLOBALS['Var_LoginStatus']) ? 'Error' : 'enter';
	break;
case 'mobile_enter':
	$AppId = ($GLOBALS['Var_LoginStatus']) ? 'Error' : 'mobile_enter';
	break;
case 'forget_password':
	$AppId = ($GLOBALS['Var_LoginStatus']) ? 'Error' : 'forget_password';
 
	break;
case 'ragister':

   $AppId = ($GLOBALS['Var_LoginStatus']) ?  'Ragister':'Error' ;
	break;
case 'ragisterstore':


     $AppId = ($GLOBALS['Var_LoginStatus']) ? ($GLOBALS['Var_IsEntitySelected']) ?  'ragisterstore':'ragisterstore' : 'Error'; 
	break;
case 'ragisterbuyer':



   $AppId = ($GLOBALS['Var_LoginStatus']) ? ($GLOBALS['Var_IsEntitySelected']) ?  'ragisterbuyer':'ragisterbuyer' : 'Error';
	break;
case 'registerlocationmanager':



   $AppId = ($GLOBALS['Var_LoginStatus']) ? ($GLOBALS['Var_IsEntitySelected']) ?  'registerlocationmanager':'registerlocationmanager' : 'Error';


	break;
    case 'registercompany':



   $AppId = ($GLOBALS['Var_LoginStatus']) ? ($GLOBALS['Var_IsEntitySelected']) ?  'registercompany':'registercompany' : 'Error';


	break;

case 'store_settings':




 $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? ($GLOBALS['Var_IsEntitySelected']) ?  'store_settings':'Ragister' : 'Error';
	break;

case 'setting_buyer':


 $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==0) ? ($GLOBALS['Var_IsEntitySelected']) ?  'setting_buyer':'Ragister' : 'Error';

	break;

case 'company_settings':


 $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==4) ? ($GLOBALS['Var_IsEntitySelected']) ?  'company_settings':'Ragister' : 'Error';

	break;
case 'dashboard_categories':
	


 $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? ($GLOBALS['Var_IsEntitySelected']) ?  'dashboard_categories':'Ragister' : 'Error';

	break;
case 'dashboard_collections':

 $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? ($GLOBALS['Var_IsEntitySelected']) ?  'dashboard_collections':'Ragister' : 'Error';


	break;
case 'dashboard_products':


 $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? ($GLOBALS['Var_IsEntitySelected']) ?  'dashboard_products':'Ragister' : 'Error';

	break;


case 'dashboard_frontpage':
	

 $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? ($GLOBALS['Var_IsEntitySelected']) ?  'dashboard_frontpage':'Ragister' : 'Error';


	break;

case 'dashboard_menu':
	
 $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? ($GLOBALS['Var_IsEntitySelected']) ?  'dashboard_menu':'Ragister' : 'Error';

	break;

case 'dashboard_orders':
	

 $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? ($GLOBALS['Var_IsEntitySelected']) ?  'dashboard_orders':'Ragister' : 'Error';

	break;

case 'dashboard_shipping':


 $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? ($GLOBALS['Var_IsEntitySelected']) ?  'dashboard_shipping':'Ragister' : 'Error';

	break;
case 'dashboard_checkins':
	
 $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? ($GLOBALS['Var_IsEntitySelected']) ?  'dashboard_checkins':'Ragister' : 'Error';


	break;
case 'dashboard_discounts':


  
 $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? ($GLOBALS['Var_IsEntitySelected']) ?  'dashboard_discounts':'Ragister' : 'Error';

	break;
case 'dashboard_reports':


  $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? ($GLOBALS['Var_IsEntitySelected']) ?  'dashboard_reports':'Ragister' : 'Error';

	break;
case 'dashboard_advertise':


  $AppId = ($GLOBALS['Var_LoginStatus']) ? ($GLOBALS['Var_IsEntitySelected']) ?  'dashboard_advertise':'Ragister' : 'Error';

	break;

    
case 'storestaff':

     $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? ($GLOBALS['Var_IsEntitySelected']) ?  'storestaff':'Ragister' : 'Error';

	break;
case 'viewcarts':
	
  $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==0) ? ($GLOBALS['Var_IsEntitySelected']) ?  'viewcarts':'Ragister' : 'Error';

	break;

case 'vieworders':

   $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==0) ? ($GLOBALS['Var_IsEntitySelected']) ?  'vieworders':'Ragister' : 'Error';
	break;
case 'notifications':
	
 
  $AppId = ($GLOBALS['Var_LoginStatus']) ? ($GLOBALS['Var_IsEntitySelected']) ?  'notifications':'Ragister' : 'Error';
	break;
case 'messages':
	  $AppId = ($GLOBALS['Var_LoginStatus']) ? ($GLOBALS['Var_IsEntitySelected']) ?  'messages':'Ragister' : 'Error';

	break;
    case 'requests':
	
 
  $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==0) ? ($GLOBALS['Var_IsEntitySelected']) ?  'requests':'Ragister' : 'Error';
	break;
  case 'myorders':
	$AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==0) ? ($GLOBALS['Var_IsEntitySelected']) ?  'myorders':'Ragister' : 'Error';
	break;

    case 'myshops':

   $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==0) ? ($GLOBALS['Var_IsEntitySelected']) ?  'myshops':'Ragister' : 'Error';

    break ;



   case 'checkins':
   $AppId = ($GLOBALS['Var_LoginStatus']) ? ($GLOBALS['Var_IsEntitySelected']) ?  'checkins':'Ragister' : 'Error';

	break;
  case 'market':
	
  

  $AppId = ($GLOBALS['Var_LoginStatus']) ? ($GLOBALS['Var_IsEntitySelected']) ?  'market':'Ragister' : 'market';
	break;
  case 'browsinghistory':
	
  

  $AppId = ($GLOBALS['Var_LoginStatus']) ? ($GLOBALS['Var_IsEntitySelected']) ?  'browsinghistory':'Ragister' : 'browsinghistory';
	break;
   case 'storestafflogin':
	  $AppId = ($GLOBALS['Var_LoginStatus']) ? ($GLOBALS['Var_IsEntitySelected']) ?  'storestafflogin':'Ragister' : 'storestafflogin';

	break;


 case 'dashboard_companycategories':
   $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==4) ? ($GLOBALS['Var_IsEntitySelected']) ?  'dashboard_companycategories':'Ragister' : 'Error';
 break;
 
 case 'dashboard_companymenu':
   $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==4) ? ($GLOBALS['Var_IsEntitySelected']) ?  'dashboard_companymenu':'Ragister' : 'Error';
 break;

 case 'dashboard_brands':
   $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==4) ? ($GLOBALS['Var_IsEntitySelected']) ?  'dashboard_brands':'Ragister' : 'Error';
 break;


case 'material':
	$AppId = 'Material';
	break;

    case 'getmaterial':
	$AppId = 'getmaterial';
	break;
   case 'mycheckins':
	$AppId = 'mycheckins';
	break;
   case 'securitycheck':
	$AppId = 'securitycheck';
	break;
   
     case 'directory':
	$AppId = 'directory';
	break;
    case 'directoryxml':
	$AppId = 'directoryxml';
	break;
   

} //Child switch


      break; 
    //---==object_type:admin_slug==--
   }
   //---==object_type==--
   }
  
     
     }

return $AppId;
}


/**
* @description=> Return the correct data on the basic of supplied path data..
* @param  => 
* @return => [array($AppData)]
*/
public function AppData(){
    $AppData=$this->DefaultAppData();
  
    $AppData=$this->AppDataById($this->GetAppId());



return $AppData;
}

/**
* @description=> get the direct app data by app id.
* @param  => 
* @return => [array($AppData)]
*/
public function AppDataById($AppId){
    $AppData=$this->DefaultAppData();
    $ActorEntityData= $GLOBALS['Var_ActorEntityData'];
    $Flaver=$ActorEntityData['visit_data']['wf'];
    $Entity_Type=intval($ActorEntityData['EntityData']['type']);

    $AppData['AppId']=$AppId;
    $AppData['resurl']=GetResUrl();
    switch( $AppData['AppId']){
       case 'Error':
        $AppData['AppId']='Error';
          $AppData['AppTitle']='Not Found';
           array_push( $AppData['res'], array('resId'=>'appjs','res'=>'Error','name'=>GetResName($this->reslib('Error'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;
        case 'TestPage':
        $AppData['AppId']='TestPage';
           array_push( $AppData['res'], array('resId'=>'appjs','res'=>'TestPage','name'=>GetResName($this->reslib('TestPage'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;
     //--------
         case 'Welcomepage':
    $AppView=$GLOBALS['Var_Views']->ProfilePageView($AppData['AppId']);
        $AppData['AppId']='Welcomepage';
          $AppData['AppView']=$AppView;
             $AppData['AppMetaData']=$GLOBALS['Var_ViewParse']->CreateMetaData('Signup',$ActorEntityData['EntityData'],'signup')['tag'];
         $AppData['AppSEOData']=$AppData['AppView']['SEOData'];  
           array_push( $AppData['res'], array('resId'=>'appjs','res'=>'Welcomepage','name'=>GetResName($this->reslib('Welcomepage'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Welcomepage'), $ActorEntityData)));
        break;
     //--------
     //--------
         case 'VerifyAccount':
        $AppData['AppId']='VerifyAccount';
     
$AppData['AppView']=True_array_merge( $AppData['AppView'],array('identity'=>$ActorEntityData['LoginData']['login_identity'],
                                  'identity_type'=>$ActorEntityData['LoginData']['identity_type']
                                     ));
       array_push( $AppData['res'], array('resId'=>'appjs','res'=>'VerifyAccount','name'=>GetResName($this->reslib('VerifyAccount'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('VerifyAccount'), $ActorEntityData)));
        break;
     //--------
      //--------
         case 'Ragister':
        $AppData['AppId']='Ragister';
      $AppData['AppTitle']='Ragister at wowrol';
   $AppData['AppView']['AccountEnetityData']=$GLOBALS['Var_Views']->EntityInfo('AccountEnetityData',$GLOBALS['Var_Utility']->AccountEnetityData());
array_push( $AppData['res'], array('resId'=>'appjs','res'=>'Ragister','name'=>GetResName($this->reslib('Ragister'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Ragister'), $ActorEntityData)));
        break;
            case 'ragisterbuyer':
        $AppData['AppId']='ragisterbuyer';
     $AppData['AppTitle']='Ragister as Buyer';
  $AppData['AppView']=$GLOBALS['Var_Views']->StaticPageView($AppData['AppId']);
array_push( $AppData['res'], array('resId'=>'appjs','res'=>'ragisterbuyer','name'=>GetResName($this->reslib('ragisterbuyer'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('ragisterbuyer'), $ActorEntityData)));
        break;
        case 'ragisterstore':
        $AppData['AppId']='ragisterstore';
       $AppData['AppTitle']='Ragister as store';
  
array_push( $AppData['res'], array('resId'=>'appjs','res'=>'ragisterstore','name'=>GetResName($this->reslib('ragisterstore'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('ragisterstore'), $ActorEntityData)));
        break;
        case 'registerlocationmanager':
        $AppData['AppId']='registerlocationmanager';
       $AppData['AppTitle']='Ragister as Location Manager';
  
array_push( $AppData['res'], array('resId'=>'appjs','res'=>'registerlocationmanager','name'=>GetResName($this->reslib('registerlocationmanager'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('registerlocationmanager'), $ActorEntityData)));
        break;
    
         case 'registercompany':
        $AppData['AppId']='registercompany';
       $AppData['AppTitle']='Ragister as Company';
  
array_push( $AppData['res'], array('resId'=>'appjs','res'=>'registercompany','name'=>GetResName($this->reslib('registercompany'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('registercompany'), $ActorEntityData)));
        break;    
     //--------
        case 'Profilepage':
         $AppData['AppId']='Profilepage';
        break;
        case 'Material':
        
         $AppData['AppMetaData']='';
         $AppData['AppId']='Material';


         $AppData['AppView']=array('Component'=>GET_QueryVars('material','res_chars'),'theme'=>$ActorEntityData['EntityData']['public_data']['theme']);

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'Material','name'=>GetResName($this->reslib('Material'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Material'), $ActorEntityData)));
      
        break;

            case 'getmaterial':
        
         $AppData['AppMetaData']='';
         $AppData['AppId']='getmaterial';


         $AppData['AppView']=array('Component'=>GET_QueryVars('getmaterial','res_chars'),'theme'=>$ActorEntityData['EntityData']['public_data']['theme']);

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'getmaterial','name'=>GetResName($this->reslib('getmaterial'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('getmaterial'), $ActorEntityData)));
      
        break;










       //---==object_type:admin_slug==--
        case 'enter':
            $AppView=$GLOBALS['Var_Views']->ProfilePageView($AppData['AppId']);
         $AppData['AppId']='enter';
         $AppData['AppTitle']='Login | signup';
        $AppData['AppView']=$AppView;
         $AppData['AppMetaData']=$GLOBALS['Var_ViewParse']->CreateMetaData('Signup',$ActorEntityData['EntityData'],'signup')['tag'];
          unset($AppData['AppView']['MetaData']);  
          $AppData['AppSEOData']=$AppData['AppView']['SEOData']; 

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'enter','name'=>GetResName($this->reslib('enter'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('enter'), $ActorEntityData)));
        break;
            case 'mobile_enter':
            $AppView=$GLOBALS['Var_Views']->ProfilePageView($AppData['AppId']);
         $AppData['AppId']='mobile_enter';
         $AppData['AppTitle']='Login | signup';
        $AppData['AppView']=$AppView;
         $AppData['AppMetaData']=$GLOBALS['Var_ViewParse']->CreateMetaData('Signup',$ActorEntityData['EntityData'],'signup')['tag'];
          unset($AppData['AppView']['MetaData']);  
          $AppData['AppSEOData']=$AppData['AppView']['SEOData']; 

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'mobile_enter','name'=>GetResName($this->reslib('mobile_enter'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('mobile_enter'), $ActorEntityData)));
        break;

           case 'forget_password':

         $AppData['AppId']='forget_password';
         $AppData['AppTitle']='Forget Password';
         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'forget_password','name'=>GetResName($this->reslib('forget_password'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('forget_password'), $ActorEntityData)));
        break;
             case 'securitycheck':

         $AppData['AppId']='securitycheck';
         $AppData['AppTitle']='Security Check';
         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'securitycheck','name'=>GetResName($this->reslib('securitycheck'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('securitycheck'), $ActorEntityData)));
        break;


         case 'store_settings':

         $AppData['AppId']='store_settings';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'store_settings','name'=>GetResName($this->reslib('store_settings'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('store_settings'), $ActorEntityData)));
        break;
          case 'setting_buyer':

         $AppData['AppId']='setting_buyer';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'setting_buyer','name'=>GetResName($this->reslib('setting_buyer'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('setting_buyer'), $ActorEntityData)));
        break;

          case 'company_settings':

         $AppData['AppId']='company_settings';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'company_settings','name'=>GetResName($this->reslib('company_settings'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('company_settings'), $ActorEntityData)));
        break;

       
          case 'viewcarts':

         $AppData['AppId']='viewcarts';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'viewcarts','name'=>GetResName($this->reslib('viewcarts'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('viewcarts'), $ActorEntityData)));
        break;
          case 'myorders':

         $AppData['AppId']='myorders';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='My Orders | wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'myorders','name'=>GetResName($this->reslib('myorders'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('myorders'), $ActorEntityData)));
        break;

       case 'myshops':

         $AppData['AppId']='myshops';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='My Orders | wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'myshops','name'=>GetResName($this->reslib('myshops'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('myshops'), $ActorEntityData)));
        break;



       case 'notifications':

         $AppData['AppId']=( $Entity_Type==0)?'notifications':'store_notifications';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'notifications','name'=>GetResName($this->reslib('notifications'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('notifications'), $ActorEntityData)));
        break;
          case 'messages':

         $AppData['AppId']='messages';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'messages','name'=>GetResName($this->reslib('messages'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('messages'), $ActorEntityData)));
        break;
          case 'requests':

         $AppData['AppId']='requests';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'requests','name'=>GetResName($this->reslib('requests'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('requests'), $ActorEntityData)));
        break;
           case 'storestafflogin':

         $AppData['AppId']='storestafflogin';
         $AppData['AppView']=array();
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'storestafflogin','name'=>GetResName($this->reslib('storestafflogin'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('storestafflogin'), $ActorEntityData)));
        break;
      case 'mycheckins':

         $AppData['AppId']='mycheckins';
         $AppData['AppView']=array();
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'mycheckins','name'=>GetResName($this->reslib('mycheckins'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;
 case 'market':

         $AppData['AppId']='market';
         $AppData['AppView']=$GLOBALS['Var_Views']->StaticPageView($AppData['AppId'],array('ActorEntityData'=>$ActorEntityData));
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'market','name'=>GetResName($this->reslib('market'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;
 case 'browsinghistory':

         $AppData['AppId']='browsinghistory';
         $AppData['AppView']=$GLOBALS['Var_Views']->StaticPageView($AppData['AppId'],array('ActorEntityData'=>$ActorEntityData));
         $AppData['AppTitle']='wowrol';

       array_push( $AppData['res'], array('resId'=>'appjs','res'=>'browsinghistory','name'=>GetResName($this->reslib('browsinghistory'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;
  case 'ordertracking':

         $AppData['AppId']='ordertracking';
         $AppData['AppView']=$GLOBALS['Var_StoreDashboard']->ParseOrders(array($GLOBALS['Var_Slug_information']['objectInfo']),array('ActorEntityData'=>$ActorEntityData,'items'=>TRUE));
         $AppData['AppTitle']='Order Tracking';
               $AppData['IsstaticHtml']=TRUE;  
         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'ordertracking','name'=>GetResName($this->reslib('ordertracking'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;
  case 'orderdetails':

         $AppData['AppId']='orderdetails';
         $AppData['AppView']=$GLOBALS['Var_StoreDashboard']->ParseOrders(array($GLOBALS['Var_Slug_information']['objectInfo']),array('ActorEntityData'=>$ActorEntityData,'items'=>TRUE));
         $AppData['AppTitle']='Order Details';
      $AppData['IsstaticHtml']=TRUE;     
         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'orderdetails','name'=>GetResName($this->reslib('orderdetails'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;
       
  case 'spread':


         $AppData['AppId']='spread';
      
       $AppData['AppView']=$GLOBALS['Var_Views']->ProfilePageView($AppData['AppId']);

         $AppData['AppTitle']='Spread';
      
         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'spread','name'=>GetResName($this->reslib('spread'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));

        break;
    //---==object_type:admin_slug:store ddash board==--
           case 'dashboard_categories':

         $AppData['AppId']='dashboard_categories';
         $AppData['AppView']=$GLOBALS['Var_Views']->StoreDashboard($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_categories','name'=>GetResName($this->reslib('dashboard_categories'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;
        case 'dashboard_collections':

         $AppData['AppId']='dashboard_collections';
         $AppData['AppView']=$GLOBALS['Var_Views']->StoreDashboard($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_collections','name'=>GetResName($this->reslib('dashboard_collections'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;

          case 'dashboard_products':

         $AppData['AppId']='dashboard_products';
         $AppData['AppView']=$GLOBALS['Var_Views']->StoreDashboard($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_products','name'=>GetResName($this->reslib('dashboard_products'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;
          case 'dashboard_frontpage':

         $AppData['AppId']='dashboard_frontpage';
         $AppData['AppView']=$GLOBALS['Var_Views']->StoreDashboard($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_frontpage','name'=>GetResName($this->reslib('dashboard_frontpage'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;

       case 'dashboard_reports':

         $AppData['AppId']='dashboard_reports';
         $AppData['AppView']=$GLOBALS['Var_Views']->StoreDashboard($AppData['AppId']);
         $AppData['AppTitle']='Reports | wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_reports','name'=>GetResName($this->reslib('dashboard_reports'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;

          case 'dashboard_menu':

         $AppData['AppId']='dashboard_menu';
         $AppData['AppView']=$GLOBALS['Var_Views']->StoreDashboard($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

      array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_menu','name'=>GetResName($this->reslib('dashboard_menu'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;
          case 'dashboard_orders':

         $AppData['AppId']='dashboard_orders';
         $AppData['AppView']=$GLOBALS['Var_Views']->StoreDashboard($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_orders','name'=>GetResName($this->reslib('dashboard_orders'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;
          case 'dashboard_shipping':

         $AppData['AppId']='dashboard_shipping';
         $AppData['AppView']=$GLOBALS['Var_Views']->StoreDashboard($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_shipping','name'=>GetResName($this->reslib('dashboard_shipping'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;
             case 'dashboard_checkins':

         $AppData['AppId']='dashboard_checkins';
         $AppData['AppView']=$GLOBALS['Var_Views']->StoreDashboard($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_checkins','name'=>GetResName($this->reslib('dashboard_checkins'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));

        break;
       case 'dashboard_discounts':

         $AppData['AppId']='dashboard_discounts';
         $AppData['AppView']=$GLOBALS['Var_Views']->StoreDashboard($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_discounts','name'=>GetResName($this->reslib('dashboard_discounts'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));

        break;

         case 'dashboard_advertise':

         $AppData['AppId']='dashboard_advertise';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_advertise','name'=>GetResName($this->reslib('dashboard_advertise'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));

        break;
       
           case 'storestaff':

         $AppData['AppId']='storestaff';
         $AppData['AppView']=$GLOBALS['Var_Views']->StoreDashboard($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'storestaff','name'=>GetResName($this->reslib('storestaff'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;




       case 'dashboard_companycategories':

         $AppData['AppId']='dashboard_companycategories';
         $AppData['AppView']=$GLOBALS['Var_Views']->StoreDashboard($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_companycategories','name'=>GetResName($this->reslib('dashboard_companycategories'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;

       case 'dashboard_companymenu':

         $AppData['AppId']='dashboard_companymenu';
         $AppData['AppView']=$GLOBALS['Var_Views']->StoreDashboard($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_companymenu','name'=>GetResName($this->reslib('dashboard_companymenu'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;

       case 'dashboard_brands':

         $AppData['AppId']='dashboard_brands';
         $AppData['AppView']=$GLOBALS['Var_Views']->StoreDashboard($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_brands','name'=>GetResName($this->reslib('dashboard_brands'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;

        case 'directory':

         $AppData['AppId']='directory';
         $AppData['AppView']=  $GLOBALS['Var_Sitemap']->GetSiteMap();
         $AppData['AppTitle']='wowrol';
         $AppData['IsstaticHtml']=TRUE; 
   array_push( $AppData['res'], array('resId'=>'appjs','res'=>'directory','name'=>GetResName($this->reslib('directory'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;
    

         case 'directoryxml':

         $AppData['AppId']='directoryxml';
         $AppData['AppView']=  $GLOBALS['Var_Sitemap']->GetSiteMap(FALSE);
         $AppData['AppTitle']='wowrol';
         $AppData['IsstaticXML']=TRUE; 
   array_push( $AppData['res'], array('resId'=>'appjs','res'=>'directoryxml','name'=>GetResName($this->reslib('directoryxml'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;
       //---==object_type:admin_slug==--
       
   



           //---==HomePage==--
        case 'HomePageBuyer':

         $AppData['AppId']='HomePageBuyer';
          $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';
         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'HomePageBuyer','name'=>GetResName($this->reslib('HomePageBuyer'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;
         case 'HomePageStore':

        $AppData['AppId']='HomePageStore';
        $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);

        $AppData['AppTitle']='wowrol';


         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'HomePageStore','name'=>GetResName($this->reslib('HomePageStore'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;
            case 'HomePageLocationManager':

        $AppData['AppId']='HomePageLocationManager';
        $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);

        $AppData['AppTitle']='wowrol';


         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'HomePageLocationManager','name'=>GetResName($this->reslib('HomePageLocationManager'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;
       case 'HomePageCompany':

        $AppData['AppId']='HomePageCompany';
        $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);

        $AppData['AppTitle']='wowrol';


         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'HomePageCompany','name'=>GetResName($this->reslib('HomePageCompany'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;


       //---==HomePage==--

      //---==ProfilePage==--

       case 'ProfilePageStore':
   $AppView=$GLOBALS['Var_Views']->ProfilePageView($AppData['AppId']);
         if(!$AppView['Blocked']&& !$AppView['is_disabled']){
        $AppData['AppId']='ProfilePageStore';
    $AppData['AppView']=$AppView;

   

   //meta tag work
  $AppData['AppTitle']=$AppData['AppView']['EntityStripdata']['entityName'].'| wowrol';
  $AppData['AppTitle']=  validate_word('strip_tags', $AppData['AppTitle']);
  $AppData['AppMetaData']=$AppData['AppView']['MetaData']['tag'];  unset($AppData['AppView']['MetaData']);  
  $AppData['AppSEOData']=$AppData['AppView']['SEOData'];

  //meta tag work 


         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'ProfilePageStore','name'=>GetResName($this->reslib('ProfilePageStore'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
         //--Blocking check

      }else{
           $AppData=  $this->AppDataById('Error'); 
         }


        break;


       case 'categoryPageStore':
          $AppView=$GLOBALS['Var_Views']->ProfilePageView($AppData['AppId']);
       if(!$AppView['Blocked']&& !$AppView['is_disabled']){
        $AppData['AppId']='categoryPageStore';
    $AppData['AppView']=$AppView;

   
             //meta tag work
$AppData['AppTitle']=$AppData['AppView']['CategoryInfo']['cN'].' | '.$AppData['AppView']['EntityStripdata']['entityName'].' | wowrol';
  $AppData['AppTitle']=  validate_word('strip_tags', $AppData['AppTitle']);
  $AppData['AppMetaData']=$AppData['AppView']['MetaData']['tag'];
  unset($AppData['AppView']['MetaData']);  
  $AppData['AppSEOData']=$AppData['AppView']['SEOData'];
  //meta tag work 

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'categoryPageStore','name'=>GetResName($this->reslib('categoryPageStore'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
            }else{
           $AppData=  $this->AppDataById('Error'); 
         }
        break;
           case 'productPageStore':
   $AppView=$GLOBALS['Var_Views']->ProfilePageView($AppData['AppId']);
           if(!$AppView['Blocked']&& !$AppView['is_disabled']){
        $AppData['AppId']='productPageStore';
          $AppData['AppView']=$AppView;
     //activity
$GLOBALS['Var_Activity']->RagisterRefActivity(array('creater_id' => $ActorEntityData['EntityData']['entity_id'],'object_id' => $AppData['AppView']['ProductInfo']['pid'],'activity_code' => '704')); 
   
      //meta tag work
  $AppData['AppTitle']=$AppData['AppView']['ProductInfo']['pN'].' | '.$AppData['AppView']['EntityStripdata']['entityName'].' | wowrol';
  $AppData['AppTitle']=  validate_word('strip_tags', $AppData['AppTitle']);
  $AppData['AppMetaData']=$AppData['AppView']['MetaData']['tag'];
  unset($AppData['AppView']['MetaData']); 
   $AppData['AppSEOData']=$AppData['AppView']['SEOData'];  
  //meta tag work 
 
         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'productPageStore','name'=>GetResName($this->reslib('productPageStore'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
            }else{
           $AppData=  $this->AppDataById('Error'); 
         }
        break;
         case 'ProfilePageBuyer':
         $AppView=$GLOBALS['Var_Views']->ProfilePageView($AppData['AppId']);
            if(!$AppView['Blocked']&& !$AppView['is_disabled']){
           $AppData['AppId']='ProfilePageBuyer';
        $AppData['AppView']=$AppView;

        $AppData['AppTitle']=$AppData['AppView']['EntityStripdata']['entityName'].' | wowrol';


         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'ProfilePageBuyer','name'=>GetResName($this->reslib('ProfilePageBuyer'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));  
         
          
         }else{
           $AppData=  $this->AppDataById('Error'); 
         }
       

       
        break;

        case 'brandPageCompany':

        $AppData['AppId']='brandPageCompany';
       $AppData['AppView']=$GLOBALS['Var_Views']->ProfilePageView($AppData['AppId']);

        $AppData['AppTitle']='brand | wowrol';


         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'brandPageCompany','name'=>GetResName($this->reslib('brandPageCompany'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));

        break;
          case 'checkins':

        $AppData['AppId']='checkins';
       $AppData['AppView']=$GLOBALS['Var_Views']->ProfilePageView($AppData['AppId']);

        $AppData['AppTitle']='checkins | wowrol';


         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'checkins','name'=>GetResName($this->reslib('checkins'), $ActorEntityData),'type'=>'script','replace'=>'1','path'=>GetResPath($this->reslib('Error'), $ActorEntityData)));
        break;

      //---==ProfilePage==--




    }


 $AppData['AcessData']=$this->GetAcessData();

return $AppData;

}

/**
* @description=> Return the correct data on the basic of supplied path data..
* @param  => 
* @return => [array($AppData)]
*/
private function GetAcessData(){
   $EntityData= $GLOBALS['Var_ActorEntityData'];
   $AcessData=array('LoginStatus'=> $EntityData['LoginStatus'],
                 'visit_data'=> $EntityData['visit_data'],
                 'entity_id'=> $EntityData['LoginData']['entity_id'],
                 'entity_type'=> $EntityData['EntityData']['type']
            );


   return  $AcessData;
}




    }
$GLOBALS['Var_path'] =GET_QueryVars('path','url_chars');
$GLOBALS['Var_AppProtoType'] =new AppProtoType();
?>