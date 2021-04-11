<?php
    
/**
* @description=>Create view from argument.
* @param  => 
* @return => 
*/
 class ViewParse{
/**
* @description=>EntityStripdata.
* @param  => 
* @return => 
*/
public function EntityStripdata($rawdata){
    $parseData=array();
 //

  switch($rawdata['type']){
    case 0:

    $avatar=($rawdata['private_data']['avatar']=='')?SITEURL.'assets/imgs/pic/avatar.png':SITEURL.'assets/imgs/pic/avatar.png';
     $parseData=array('entityName'=>$rawdata['public_data']['Name'],
                                  'entityUrl'=>SITEURL.$rawdata['content_slug'],
                                  'eid'=>$rawdata['entity_id'],
                                  'slug'=>$rawdata['content_slug'],
                                  'profilepicUrl'=>SITEURL.$rawdata['content_slug'],
                                  'avatar'=> $avatar,
                                  'varified'=>$rawdata['private_data']['varified'],
                                  'Url'=>$rawdata['public_data']['Url']);
    break;
    case 1:
    $avatar=($rawdata['private_data']['avatar']=='')?SITEURL.'assets/imgs/pic/shopavatar.png':SITEURL.'assets/imgs/pic/shopavatar.png';
     $parseData=array('entityName'=>$rawdata['public_data']['Name'],
                                  'entityUrl'=>SITEURL.$rawdata['content_slug'],
                                   'eid'=>$rawdata['entity_id'],
                                  'slug'=>$rawdata['content_slug'],
                                  'profilepicUrl'=>SITEURL.$rawdata['content_slug'],
                                  'avatar'=>$avatar,
                                  'varified'=>$rawdata['private_data']['varified'],
                                  'Url'=>$rawdata['public_data']['Url']);
    break;    

  }

return   $parseData;
}

/**
* @description=>EntityAddress.
* @param  => 
* @return => 
*/
public function EntityAddress($rawdata){
    $parseData=array();
    switch($rawdata['type']){
    case 0:
   $Address= array();

   $Address['Home']=$rawdata['private_data']['AddressHome'];
   $Address['Work']=$rawdata['private_data']['AddressWork'];
$parseData =$Address; 
 
    break;
    case 1:
     $Address['Work']=array(
               'address'=>$rawdata['public_data']['address'],
               'location_id'=>$rawdata['public_data']['location_id'],
               'location_name'=>$rawdata['public_data']['location_name'],
               'Districtname'=>$rawdata['public_data']['Districtname'],
               'Statename'=>$rawdata['public_data']['Statename'],
               'Country'=>$rawdata['public_data']['Country'],
               'pincode'=>$rawdata['public_data']['pincode'],
               'phone'=>$rawdata['public_data']['phone']
                );
 $parseData =$Address; 
    break;    

  }
  return   $parseData;
}

/**
* @description=>EntityStripdata.
* @param  => 
* @return => 
*/
public function setting_data($rawdata){
     $parseData=array();

switch(intval($rawdata['type'])){
    case 0:
   //--
      $parseData['setting_0']=array('name'=>$rawdata['public_data']['Name'],
                                  'sex'=>$rawdata['public_data']['sex'],
                                  'birthday'=>$rawdata['private_data']['birthday'],
                                  'avatar'=>$rawdata['private_data']['avatar']);


       $parseData['setting_1']=array('address'=>$rawdata['private_data']['AddressHome']['address'],
                                  'location_id'=>$rawdata['private_data']['AddressHome']['location_id'],
                                  'loaction_name'=>''.$rawdata['private_data']['AddressHome']['pincode'].'-'.$rawdata['private_data']['AddressHome']['location_name'].' '.$rawdata['private_data']['AddressHome']['Districtname'].' '.$rawdata['private_data']['AddressHome']['Statename'].'',
                                  'phone'=>$rawdata['private_data']['AddressHome']['phone']);

       $parseData['setting_2']=array('address'=>$rawdata['private_data']['AddressWork']['address'],
                                  'location_id'=>$rawdata['private_data']['AddressWork']['location_id'],
                                  'loaction_name'=>''.$rawdata['private_data']['AddressWork']['pincode'].'-'.$rawdata['private_data']['AddressWork']['location_name'].' '.$rawdata['private_data']['AddressWork']['Districtname'].' '.$rawdata['private_data']['AddressWork']['Statename'].'',
                                  'phone'=>$rawdata['private_data']['AddressWork']['phone']);

       $parseData['setting_3']=$rawdata['private_data']['notification_setting'];
       $parseData['setting_4']=$rawdata['private_data']['deactivate'];
      $parseData['setting_5']=$rawdata['private_data']['privacy_setting'];
       $parseData['theme']=array('','');

   //--
   break;
    case 1:
  // check_response($rawdata);
      $parseData['setting_0']=array('store_name'=>$rawdata['public_data']['Name'],
                                  'StoreCategory'=>Walk_Ways_each($rawdata['public_data']['StoreCategory'],'reverse_HTML_entities'),
                                  'address'=>$rawdata['public_data']['address'],
                                  'location_id'=>$rawdata['public_data']['location_id'],
                                  'loaction_name'=>''.$rawdata['public_data']['pincode'].'-'.$rawdata['public_data']['location_name'].' '.$rawdata['public_data']['Districtname'].' '.$rawdata['public_data']['Statename'].'',
                                  'country'=>$rawdata['public_data']['Country'],
                                  'phone'=>$rawdata['public_data']['phone'],
                                  'avatar'=>$rawdata['private_data']['avatar'],
                                  'Url'=>$rawdata['content_slug'],
                                  'slug'=>$rawdata['content_slug']);

       $parseData['setting_1']=$rawdata['private_data']['cwsetting'];

       $parseData['setting_2']=validate_word('reverse_HTML_entities',$rawdata['private_data']['storeterms']);
       $parseData['setting_3']=$rawdata['private_data']['notification_setting'];
       $parseData['setting_4']=$rawdata['private_data']['deactivate'];
       $parseData['setting_5']=$rawdata['private_data']['staffHash'];
         $parseData['setting_6']=$rawdata['private_data']['staffHash'];
       $parseData['theme']=array('','');
    break;    

  }


  return $parseData;
}

/**
* @description=>EntityStripdata.
* @param  => 
* @return => 
*/
public function SpreadData($rawdata){
    
     $parseData=array();

switch(intval($rawdata['type'])){
    case 0:
   //--
   $parseData['formData']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('SpreadFormData'),array('friendTag'=>TRUE,
                                 'privacy'=>TRUE,
                                 'type'=>0
                    ));


   //--
   break;
    case 1:
   // check_response($rawdata['public_data']);
    $parseData['formData']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('SpreadFormData'),array('type'=>1,'promoteproduct'=>TRUE));
    break;    

  }

   
  // spreate retrive data see abbrivation @  Spread-> RetriveSpread
  $parseData['retrive']=array('acm'=>'hp');

  return $parseData;
}

/**
* @description=>EntityStripdata.
* @param  => 
* @return => 
*/
public function  SpreadContent($rawdata,$type){
    $parseData=array();

    switch($type){

    case 'spread_content':
    
     $parseData=JsonTrueDecode($rawdata,array(array('content'=>'','data'=>'')));
     
    
    break;   
      
   case 'attached_object':
    
    
    break;  
    case 'taged_entity':
    
    
    break;    
   case 'comment_info':
    
    
    break; 
    case 'quick_action_info':
    
    
    break;    
   case 'spread_heading':
     switch($rawdata['spread_perpose']){
     case '10':
       $parseData='listed a Category';
     break;
     case '11':
       $parseData='listed a Prodcut';
     break;
     default:
           $parseData='Spreads';  
     }
 
    
    break; 
case 'short_description':

break;

    }

    return $parseData;
} 

/**
* @description=>EntityStripdata.
* @param  => 
* @return => 
*/
public function CreateMetaData($EntityRow,$objectType,$objectData=array(),$extra=array()){
 $MetaData=array('tag'=>'','obj'=>array());

 $settingdata=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);
 
   switch(intval($EntityRow['type'])){
       case 1:


    
 if(count($objectData)>0){
        switch($objectType){
     case 'product':   
    
  $MetaData['obj'][]= $objectData['pN'];

       break;
  case 'category':     
    $MetaData['obj'][]= $objectData['cN'];

       break;
        }     
       }
  $MetaData['obj'][]= ' on ';
  $MetaData['obj'][]= $settingdata['setting_0']['store_name'];
    $MetaData['obj'][]= 'wowrol@'.$settingdata['setting_0']['slug'];
 $MetaData['obj'][]= ' at ';
 $MetaData['obj'][]= $settingdata['setting_0']['address'];
 $MetaData['obj'][]= $settingdata['setting_0']['loaction_name'];
$MetaData['obj'][]= $settingdata['setting_0']['country'];
$MetaData['obj'][]= 'Online shopping in Wide range of ';
$MetaData['obj'][]=implode(",",$settingdata['setting_0']['StoreCategory']) ;
 $MetaData['obj'][]= ' in ';
 $MetaData['obj'][]= $settingdata['setting_0']['loaction_name'];
$MetaData['obj'][]= $settingdata['setting_0']['country'];
 $MetaData['obj'][]= ' on wowrol.com ';
 $metaWord=implode(",",$MetaData['obj']);
  $metades=implode(" ",$MetaData['obj']);

  $metaWord= validate_word('strip_tags', $metaWord);
  $metades= validate_word('strip_tags', $metades);
  $keywords='<meta name="keywords" content="'. $metaWord.'">';
  $description='<meta name="description" content="'.$metades.'">';
  $title='<meta name="title" content="'.$metaWord.'">';

  $MetaData['tag']=$title.$keywords.$description;


       break;


   } 


   
     return $MetaData;
}
//--check in---
/**
* @description=> ParseActiveCheckin.
* @param  => 
* @return => 
*/
public function ParseChecInForList($Fields,$args=array()){
        $ret=array();
$ActorEntityData =   $GLOBALS['Var_ActorEntityData'];
           for($j=0;$j<count($Fields);$j++){
         $parseData=$GLOBALS['Var_BundlePrototype']->DefaultValue('storebrowsingData');      
    $parseData['checkIn_id']= $Fields[$j]['checkIn_id'];
    $parseData['checkInTime']= $Fields[$j]['checkInTime_gmt'];  
   $members=$this->GetCheckInMember($Fields[$j]);
  
   for($i=0;$i<count($members);$i++){
   $EntityInformation= new EntityInformation($members[$i],$ActorEntityData['EntityData']['entity_id']);
    $EntityRow=$EntityInformation->frontuser_EntityRow;
    $parseData['Ed'][]=$EntityInformation->EntityStripdata($EntityRow);;

   }


    



         $ret[$j]=$parseData;
           }
           return $ret;
}

/**
* @description=> GetCheckInMember
* @param  => CheckIns Row;
* 0=>Store Id, 1=>BuyserId ,2..=> buyserFriendsId
* @return => 
*/
public function GetCheckInMember($Fields){
    $Members=array();
    $Members[0]=$Fields['store_id'];
    $Members[1]=$Fields['buyer_id'];
    if($Fields['buyers_id']!=NULL){
      $buyers_id=explode(",",$Fields['buyers_id']);  
    
      foreach($buyers_id as $value){
    $Members[]=$value;
      }
    }
  return $Members;
}

//--check in---
/**$GLOBALS['Var_ViewParse']->EntityCardData($EntityRow);
* @description=> EntityCardData from  $EntityIds array
* @param  => 
* @return => 
*/
public function EntityCardData($EntityIds){
    $EntityCardData=array();
    $ActorEntityData=$GLOBALS['Var_ActorEntityData'];

for($i=0;$i<count($EntityIds);$i++){
     $EntityInformation= new EntityInformation($EntityIds[$i],$ActorEntityData['EntityData']['entity_id']);
    $EntityRow=$EntityInformation->frontuser_EntityRow;  
 $EntityCardData[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('ProfilePage'); 

   $EntityCardData[$i]['ESd']= $this->EntityStripdata($EntityRow);
   $EntityCardData[$i]['twr']= $EntityInformation->RelationData('twr');
   $EntityCardData[$i]['owr']= $EntityInformation->RelationData('owr');



}

return $EntityCardData;
}



/**$GLOBALS['Var_ViewParse']->EntityCardData($EntityRow);
* @description=> 
* @param  => 
* @return => 
*/
public function EntityCardDataByEntityRow($Fields,$actoruser_EntityRow){
  $EntityCardData=array();
 for($i=0;$i<count($Fields);$i++){
 $EntityCardData[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('ProfilePage'); 
  $subEntityInformation= new DirectEntityRelation($Fields[$i],$actoruser_EntityRow);
 $EntityCardData[$i]['ESd']=  $this->EntityStripdata($Fields[$i]);
  $EntityCardData[$i]['twr']=   $subEntityInformation->RelationData('twr');
  $EntityCardData[$i]['owr']=   $subEntityInformation->RelationData('owr');

 }
return   $EntityCardData;
}



 }


  $GLOBALS['Var_ViewParse'] =new ViewParse();

?>