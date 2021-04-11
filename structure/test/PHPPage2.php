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
   $LastModified= (SERVER_MODE=="DEVELOPMENT")?time():'reslib[string(resId)]';
 
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
     case 'main':
       $reslib=array('resId'=>'mainjs','res'=>'main','type'=>'script','AppId'=>'*','Last-Modified'=> $LastModified);
     break;
     case 'Material':
       $reslib=array('resId'=>'Materialjs','res'=>'Material','type'=>'script','AppId'=>'Material','Last-Modified'=> $LastModified);
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



    //---==Ragister==--
      //---==HomePage==--
   case 'HomePageBuyer':
  $reslib=array('resId'=>'appjs','res'=>'HomePageBuyer','type'=>'script','AppId'=>'HomePageBuyer','Last-Modified'=> $LastModified);
     break;
  case 'HomePageStore':
  $reslib=array('resId'=>'appjs','res'=>'HomePageStore','type'=>'script','AppId'=>'HomePageStore','Last-Modified'=> $LastModified);
     break;
      //---==ProfilePage==--
     case 'ProfilePageStore':
  $reslib=array('resId'=>'appjs','res'=>'ProfilePageStore','type'=>'script','AppId'=>'ProfilePageStore','Last-Modified'=> $LastModified);
     break;

         case 'ProfilePageBuyer':
  $reslib=array('resId'=>'appjs','res'=>'ProfilePageBuyer','type'=>'script','AppId'=>'ProfilePageBuyer','Last-Modified'=> $LastModified);
     break;
     //---<<ProfilePageStore>>



     
       //---==object_type:admin_slug==--
        case 'enter':

           $reslib=array('resId'=>'enterjs','res'=>'enter','type'=>'script','AppId'=>'enter','Last-Modified'=> $LastModified);
        break;
          case 'store_settings':

           $reslib=array('resId'=>'store_settingsjs','res'=>'store_settings','type'=>'script','AppId'=>'store_settings','Last-Modified'=> $LastModified);
        break;
          case 'setting_buyer':

       $reslib=array('resId'=>'setting_buyerjs','res'=>'setting_buyer','type'=>'script','AppId'=>'setting_buyer','Last-Modified'=> $LastModified);
        break;
         case 'dashboard_categories':

       $reslib=array('resId'=>'dashboard_categoriesjs','res'=>'dashboard_categories','type'=>'script','AppId'=>'dashboard_categories','Last-Modified'=> $LastModified);
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
  case 'message':

       $reslib=array('resId'=>'appjs','res'=>'message','type'=>'script','AppId'=>'message','Last-Modified'=> $LastModified);
        break;
  case 'requests':

       $reslib=array('resId'=>'appjs','res'=>'requests','type'=>'script','AppId'=>'requests','Last-Modified'=> $LastModified);
        break;
  case 'storestafflogin':

       $reslib=array('resId'=>'appjs','res'=>'storestafflogin','type'=>'script','AppId'=>'storestafflogin','Last-Modified'=> $LastModified);
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
    $flaver=$GLOBALS['Var_ActorEntityData']['visit_data']['wf'];
    $AppData=array(
    'AppName'=>'',
    'AcessData'=>array(),
    'AppSlug'=>Responsive_SITEURL.$_SERVER['REQUEST_URI'],
    'AppId'=>'',
    'AppMetaData'=>'',
    'refresh'=>FALSE,
    'Junction'=>array(),//hold node callback function 
    'AppTitle'=>'Wowrol',
    'AppView'=>array(),
    'res'=>array(array('resId'=>'maincss','res'=>'maincss','type'=>'style','name'=>Create_res_name($this->reslib('maincss')),'replace'=>'0'),
                 array('resId'=>'vendorjs','res'=>'vendor','name'=>Create_res_name($this->reslib('vendor')),'type'=>'script','replace'=>'0'),
                 array('resId'=>'bootstrapjs','res'=>'bootstrap','name'=>Create_res_name($this->reslib('bootstrap')),'type'=>'script','replace'=>'0'),
                 array('resId'=>'mainjs','res'=>'main','name'=>Create_res_name($this->reslib('main')),'type'=>'script','replace'=>'0')
                
                ),  
    'IsPage'=>FALSE
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
case 'ragister':
	$AppId = 'Ragister';
	break;
case 'ragisterstore':
	$AppId = 'ragisterstore';
	break;
case 'ragisterbuyer':
	$AppId = 'ragisterbuyer';
	break;

case 'store_settings':
	$AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? 'store_settings' : 'Error';
	break;

case 'setting_buyer':
	$AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==0) ? 'setting_buyer' : 'Error';
	break;

case 'dashboard_categories':
	$AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? 'dashboard_categories' : 'Error';
	break;

case 'dashboard_products':
	$AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? 'dashboard_products' : 'Error';
	break;

case 'dashboard_frontpage':
	$AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? 'dashboard_frontpage' : 'Error';
	break;

case 'dashboard_menu':
	$AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? 'dashboard_menu' : 'Error';
	break;

case 'dashboard_orders':
	$AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? 'dashboard_orders' : 'Error';
	break;

case 'dashboard_shipping':
	$AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? 'dashboard_shipping' : 'Error';
	break;
case 'storestaff':
	$AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==1) ? 'storestaff' : 'Error';
	break;
case 'viewcarts':
	$AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==0) ? 'viewcarts' : 'Error';
	break;

case 'vieworders':
	$AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==0) ? 'vieworders' : 'Error';
	break;
case 'notifications':
	
   $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==0) ? 'notifications' : 'Error';
	break;
case 'message':
	
   $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==0) ? 'message' : 'Error';
	break;
    case 'requests':
	
   $AppId = ($GLOBALS['Var_LoginStatus']&&$ActorEntityData['EntityData']['type']==0) ? 'requests' : 'Error';
	break;
      case 'storestafflogin':
	
   $AppId = 'storestafflogin';
	break;

case 'material':
	$AppId = 'Material';
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
    $Flaver=$GLOBALS['Var_ActorEntityData']['visit_data']['wf'];
    $AppData['AppId']=$AppId;
    $AppData['resurl']=Create_res_path($Flaver);
    switch( $AppData['AppId']){
       case 'Error':
        $AppData['AppId']='Error';
          $AppData['AppTitle']='Not Found';
           array_push( $AppData['res'], array('resId'=>'appjs','res'=>'Error','name'=>Create_res_name($this->reslib('Error')),'type'=>'script','replace'=>'1'));
        break;
        case 'TestPage':
        $AppData['AppId']='TestPage';
           array_push( $AppData['res'], array('resId'=>'appjs','res'=>'TestPage','name'=>Create_res_name($this->reslib('TestPage')),'type'=>'script','replace'=>'1'));
        break;
     //--------
         case 'Welcomepage':
        $AppData['AppId']='Welcomepage';
           array_push( $AppData['res'], array('resId'=>'appjs','res'=>'Welcomepage','name'=>Create_res_name($this->reslib('Welcomepage')),'type'=>'script','replace'=>'1'));
        break;
     //--------
     //--------
         case 'VerifyAccount':
        $AppData['AppId']='VerifyAccount';
        $AppData['AppView']=array('identity'=>$ActorEntityData['LoginData']['login_identity'],
                                  'identity_type'=>$ActorEntityData['LoginData']['identity_type']
                                     );
       array_push( $AppData['res'], array('resId'=>'appjs','res'=>'VerifyAccount','name'=>Create_res_name($this->reslib('VerifyAccount')),'type'=>'script','replace'=>'1'));
        break;
     //--------
      //--------
         case 'Ragister':
        $AppData['AppId']='Ragister';
      $AppData['AppTitle']='Ragister at wowrol';
   $AppData['AppView']=array( 'AccountEnetityData'=>$GLOBALS['Var_Views']->EntityInfo('AccountEnetityData',$GLOBALS['Var_Utility']->AccountEnetityData()));
array_push( $AppData['res'], array('resId'=>'appjs','res'=>'Ragister','name'=>Create_res_name($this->reslib('Ragister')),'type'=>'script','replace'=>'1'));
        break;
            case 'ragisterbuyer':
        $AppData['AppId']='ragisterbuyer';
     $AppData['AppTitle']='Ragister as Buyer';
   $AppData['AppView']=array();
array_push( $AppData['res'], array('resId'=>'appjs','res'=>'ragisterbuyer','name'=>Create_res_name($this->reslib('ragisterbuyer')),'type'=>'script','replace'=>'1'));
        break;
        case 'ragisterstore':
        $AppData['AppId']='ragisterstore';
       $AppData['AppTitle']='Ragister as store';
   $AppData['AppView']=array();
array_push( $AppData['res'], array('resId'=>'appjs','res'=>'ragisterstore','name'=>Create_res_name($this->reslib('ragisterstore')),'type'=>'script','replace'=>'1'));
        break;
     //--------
        case 'Profilepage':
         $AppData['AppId']='Profilepage';
        break;
        case 'Material':
        
         $AppData['AppMetaData']='';
         $AppData['AppId']='Material';


         $AppData['AppView']=array('Component'=>GET_QueryVars('material','res_chars'));

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'Material','name'=>Create_res_name($this->reslib('Material')),'type'=>'script','replace'=>'1'));
      
        break;












       //---==object_type:admin_slug==--
        case 'enter':

         $AppData['AppId']='enter';
         $AppData['AppTitle']='Login | signup';
         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'enter','name'=>Create_res_name($this->reslib('enter')),'type'=>'script','replace'=>'1'));
        break;
         case 'store_settings':

         $AppData['AppId']='store_settings';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'store_settings','name'=>Create_res_name($this->reslib('store_settings')),'type'=>'script','replace'=>'1'));
        break;
          case 'setting_buyer':

         $AppData['AppId']='setting_buyer';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'setting_buyer','name'=>Create_res_name($this->reslib('setting_buyer')),'type'=>'script','replace'=>'1'));
        break;
          case 'dashboard_categories':

         $AppData['AppId']='dashboard_categories';
         $AppData['AppView']=$GLOBALS['Var_Views']->StoreDashboard($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_categories','name'=>Create_res_name($this->reslib('dashboard_categories')),'type'=>'script','replace'=>'1'));
        break;
          case 'dashboard_products':

         $AppData['AppId']='dashboard_products';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_products','name'=>Create_res_name($this->reslib('dashboard_products')),'type'=>'script','replace'=>'1'));
        break;
          case 'dashboard_frontpage':

         $AppData['AppId']='dashboard_frontpage';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_frontpage','name'=>Create_res_name($this->reslib('dashboard_frontpage')),'type'=>'script','replace'=>'1'));
        break;
          case 'dashboard_menu':

         $AppData['AppId']='dashboard_menu';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_menu','name'=>Create_res_name($this->reslib('dashboard_menu')),'type'=>'script','replace'=>'1'));
        break;
          case 'dashboard_orders':

         $AppData['AppId']='dashboard_orders';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_orders','name'=>Create_res_name($this->reslib('dashboard_orders')),'type'=>'script','replace'=>'1'));
        break;
          case 'dashboard_shipping':

         $AppData['AppId']='dashboard_shipping';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'dashboard_shipping','name'=>Create_res_name($this->reslib('dashboard_shipping')),'type'=>'script','replace'=>'1'));
        break;
           case 'storestaff':

         $AppData['AppId']='storestaff';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'storestaff','name'=>Create_res_name($this->reslib('storestaff')),'type'=>'script','replace'=>'1'));
        break;
          case 'viewcarts':

         $AppData['AppId']='viewcarts';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'viewcarts','name'=>Create_res_name($this->reslib('viewcarts')),'type'=>'script','replace'=>'1'));
        break;
          case 'vieworders':

         $AppData['AppId']='vieworders';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'vieworders','name'=>Create_res_name($this->reslib('vieworders')),'type'=>'script','replace'=>'1'));
        break;
       case 'notifications':

         $AppData['AppId']='notifications';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'notifications','name'=>Create_res_name($this->reslib('notifications')),'type'=>'script','replace'=>'1'));
        break;
          case 'message':

         $AppData['AppId']='message';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'message','name'=>Create_res_name($this->reslib('message')),'type'=>'script','replace'=>'1'));
        break;
          case 'requests':

         $AppData['AppId']='requests';
         $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'requests','name'=>Create_res_name($this->reslib('requests')),'type'=>'script','replace'=>'1'));
        break;
           case 'storestafflogin':

         $AppData['AppId']='storestafflogin';
         $AppData['AppView']=array();
         $AppData['AppTitle']='wowrol';

         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'storestafflogin','name'=>Create_res_name($this->reslib('storestafflogin')),'type'=>'script','replace'=>'1'));
        break;
       //---==object_type:admin_slug==--
       
   



           //---==HomePage==--
        case 'HomePageBuyer':

         $AppData['AppId']='HomePageBuyer';
          $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);
         $AppData['AppTitle']='wowrol';
         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'HomePageBuyer','name'=>Create_res_name($this->reslib('HomePageBuyer')),'type'=>'script','replace'=>'1'));
        break;
         case 'HomePageStore':

        $AppData['AppId']='HomePageStore';
        $AppData['AppView']=$GLOBALS['Var_Views']->HomePageView($AppData['AppId']);

        $AppData['AppTitle']='wowrol';


         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'HomePageStore','name'=>Create_res_name($this->reslib('HomePageStore')),'type'=>'script','replace'=>'1'));
        break;
       //---==HomePage==--

      //---==ProfilePage==--

       case 'ProfilePageStore':

        $AppData['AppId']='ProfilePageStore';
        $AppData['AppView']=$GLOBALS['Var_Views']->ProfilePageView($AppData['AppId']);

        $AppData['AppTitle']='wowrol';


         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'ProfilePageStore','name'=>Create_res_name($this->reslib('ProfilePageStore')),'type'=>'script','replace'=>'1'));
        break;
         case 'ProfilePageBuyer':

        $AppData['AppId']='ProfilePageBuyer';
        $AppData['AppView']=$GLOBALS['Var_Views']->ProfilePageView($AppData['AppId']);

        $AppData['AppTitle']='wowrol';


         array_push( $AppData['res'], array('resId'=>'appjs','res'=>'ProfilePageBuyer','name'=>Create_res_name($this->reslib('ProfilePageBuyer')),'type'=>'script','replace'=>'1'));
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
                 'entity_id'=> $EntityData['LoginData']['entity_id']
            );


   return  $AcessData;
}
    }
$GLOBALS['Var_path'] =GET_QueryVars('path','url_chars');
$GLOBALS['Var_AppProtoType'] =new AppProtoType();
?>