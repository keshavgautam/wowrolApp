<?php
    
/**
* @description=>this class has all ragistration mathod.
* @param  => 
* @return => 
*/
class Update{

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
    //-- location info
 $location_info=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'all_location', array('location_id'),array($args['location_id']));

$EntityRow['public_data']=True_array_merge($EntityRow['public_data'],$location_info);//location
 
$EntityRow['public_data']=True_array_merge($EntityRow['public_data'],$args);//rest args

$Makejson_Public_Data =Makejson_0($EntityRow['public_data']);
if($Makejson_Public_Data['state']!=500){
    
    $Result_update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'entity',array('public_data'),array(Makejson($EntityRow['public_data'])),array('entity_id'),array($EntityRow['entity_id']));
    $arr['state']=200;
    $arr['response']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);;
}

   
   break;        

   case 'store_setting_2':
    $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');

 $EntityRow['private_data']=True_array_merge($EntityRow['private_data'],$args);//rest args

 $Makejson_Public_Data =Makejson_0($EntityRow['private_data']);
if($Makejson_Public_Data['state']!=500){
    
    $Result_update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'entity',array('private_data'),array(Makejson($EntityRow['private_data'])),array('entity_id'),array($EntityRow['entity_id']));
    $arr['state']=200;

}
   break;   

      case 'store_setting_3':
 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate');

 $EntityRow['private_data']['notification_setting']=True_array_merge($EntityRow['private_data']['notification_setting'],$args);//rest args

 $Makejson_Public_Data =Makejson_0($EntityRow['private_data']);
if($Makejson_Public_Data['state']!=500){
    
    $Result_update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'entity',array('private_data'),array(Makejson($EntityRow['private_data'])),array('entity_id'),array($EntityRow['entity_id']));
    $arr['state']=200;

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

$EntityRow['private_data']['theme']=$args['theme'];

 $Makejson_Public_Data =Makejson_0($EntityRow['private_data']);
if($Makejson_Public_Data['state']!=500){
    
    $Result_update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'entity',array('private_data'),array(Makejson($EntityRow['private_data'])),array('entity_id'),array($EntityRow['entity_id']));
    $arr['state']=200;
    $arr['response']=$EntityRow['private_data']['theme'];
   $arr['mistake']['message'][]=$args;
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

$EntityRow['public_data']['Name']=$args['Name'];
$EntityRow['public_data']['sex']=$args['sex'];
$EntityRow['private_data']['birthday']=$args['birthday'];
$Makejson_private_data =Makejson_0($EntityRow['private_data']);
$Makejson_public_data =Makejson_0($EntityRow['public_data']);

if($Makejson_private_data['state']!=500&&$Makejson_public_data['state']!=500){
    
    $Result_update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'entity',array('public_data','private_data'),array(Makejson($EntityRow['public_data']),Makejson($EntityRow['private_data'])),array('entity_id'),array($EntityRow['entity_id']));
    $arr['state']=200;
    $arr['response']=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);;
}
  break; 
    case 'buyersetting_1':

$defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPublic');
$defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPrivate');
    //-- location info
 $location_info=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'all_location', array('location_id'),array($args['location_id']));

$EntityRow['private_data']['AddressHome']=True_array_merge($EntityRow['private_data']['AddressHome'],$location_info);//location
 
$EntityRow['private_data']['AddressHome']=True_array_merge($EntityRow['private_data']['AddressHome'],$args);//rest args

$Makejson_Public_Data =Makejson_0($EntityRow['private_data']);

if($Makejson_Public_Data['state']!=500){
    
    $Result_update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'entity',array('private_data'),array(Makejson($EntityRow['private_data'])),array('entity_id'),array($EntityRow['entity_id']));
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

$Makejson_Public_Data =Makejson_0($EntityRow['private_data']);

if($Makejson_Public_Data['state']!=500){
    
    $Result_update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'entity',array('private_data'),array(Makejson($EntityRow['private_data'])),array('entity_id'),array($EntityRow['entity_id']));
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

  $args['JsonMenu']=Makejson($args['menu']);

$get_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'store_menu',array('entity_id'),array($args['entity_id']));

   if($get_row!=NULL){
   //update
        $edit_history=   JsonTrueDecode($get_row['edit_history'],$GLOBALS['Var_BundlePrototype']->DefaultValue('AutherInfo')); 
    $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(1,$args['ActorEntityData'],$edit_history);

 $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_menu', array('menu','edit_history'),array($args['JsonMenu'],$AutherInfo),array('entity_id'),array($args['entity_id']));


    $arr['state']=200;
    }else{
     //insert
     $AutherInfo=$GLOBALS['Var_Utility']->AutherInfo(0,$args['ActorEntityData'],array());

$args['category_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'store_menu', array('menu','entity_id','edit_history'),array($args['JsonMenu'],$args['entity_id'],$AutherInfo));


   $arr['state']=200;
    }

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




 $categoryBox=$EntityRow['private_data']['categoryBox'];

  $NewcategoryBox=array();
  foreach($categoryBox as $q=>$value ){
      if($value['cid']==$args['cid']){
         unset($categoryBox[$q]); 
      }else{
         $NewcategoryBox[] =$value;
      }
      }

   if($args['action']==1){
     
   $NewcategoryBox[]=array('cid'=>$args['cid'],'sort'=>$args['sort']);
   }
 

$ActorEntityData['EntityData']['private_data']['categoryBox']= $NewcategoryBox;
$EntityRow['private_data']=$ActorEntityData['EntityData']['private_data'];
$Makejson_Public_Data =Makejson_0($EntityRow['private_data']);
if($Makejson_Public_Data['state']!=500){
    
    $Result_update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'entity',array('private_data'),array(Makejson($EntityRow['private_data'])),array('entity_id'),array($EntityRow['entity_id']));
    $arr['state']=200;
    $arr['response']=$GLOBALS['Var_StoreDashboard']->GetCategoryBox(array('EntityData'=>$ActorEntityData['EntityData']));


}




  }



return $arr;
}


}



$GLOBALS['Var_Update'] =new Update();






?>