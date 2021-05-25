<?php
    
/**


*/
class LocationManager{
    
/*
@des
*/
public function  RegisterLocationManager($args){

    $arr = $GLOBALS['Var_BundlePrototype']->DefaultValue('ajax_output');



 $slug=$GLOBALS['Var_PageSlug']->Unique_Slug($args['postalCode_id'],'LocationManager',$args['postalCode_id']);
    //default
 $defaultPublic=$GLOBALS['Var_BundlePrototype']->DefaultValue('LocationManagerPublic');
 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('LocationManagerPrivate');

 
//--
 $LocationManagerPublic=array(   'Name'=> $args['entity_row']['public_data']['Name'],
    'FirstName' =>$args['entity_row']['public_data']['FirstName'],
    'LastName' =>$args['entity_row']['public_data']['LastName'],
    'slug' => $slug['content_slug'],
    'sex'=> $args['entity_row']['public_data']['sex']  
);


 $LocationManagerPrivate=array(
    'postal_code_id'=>$args['postalCode_id'],
    'memberSince'=>time(),
    'countryinfo_id'=> $args['country_id']
);



$Result__Public_Data=True_array_merge($defaultPublic, $LocationManagerPublic);
$Result__Private_Data=True_array_merge($defaultPrivate,   $LocationManagerPrivate);

$Result__Public_Data['entity_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'entity',array('account_id','type','public_data','private_data'),array($args['ActorEntityData']['LoginData']['account_id'],3,Makejson($Result__Public_Data),Makejson($Result__Private_Data)));




//--updateing store id page slug table

$GLOBALS['Var_PageSlug']->Update_object_id( $slug['content_slug'],$Result__Public_Data['entity_id']);

// updating  in Postal code
 $GLOBALS['Var_DBMysqli']->update(DB_NAME,'location_postalcode',array('manager_entity_id'),array($Result__Public_Data['entity_id']),array('postalCode_id'),array($args['postalCode_id']));


$new_entity_id=$Result__Public_Data['entity_id'];
 

//$new_entity_id=12;

$arr['state'] =200;
$arr['response']=array('entity_id'=>$new_entity_id);


    return $arr;
}


/*
@des gives the data for location manger home page dashboard
@call $GLOBALS['Var_LocationManager']->LM_Data($EntityRow);
*/
public function LM_Data($EntityRow){
    $ret= $GLOBALS['Var_BundlePrototype']->DefaultValue('LM_data');
    $last_statics_checktime=$EntityRow['private_data']['last_statics_checktime'];
    $should_refill=$last_statics_checktime<(time()-(60*60*12));



   if($should_refill){
       
   }else{
     $ret['num_stores'] =$EntityRow['private_data']['num_stores'];
     $ret['num_buyers'] =$EntityRow['private_data']['num_buyers']; 
     $ret['num_locations'] =$EntityRow['private_data']['num_locations'];    
   }

   return $ret;
}



}









$GLOBALS['Var_LocationManager'] =new LocationManager();





?>