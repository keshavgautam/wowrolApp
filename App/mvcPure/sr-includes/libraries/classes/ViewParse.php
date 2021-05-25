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
   
    $avatar=($rawdata['public_data']['avatar']=='')?SITEURL.'assets/imgs/pic/avatar.png':$rawdata['public_data']['avatar'];
    $banner=($rawdata['public_data']['banner']=='')?SITEURL.'assets/imgs/pic/avatar.png':$rawdata['public_data']['banner'];

     $parseData=array('entityName'=>SafeTextDecode($rawdata['public_data']['Name']),
                                  'entityUrl'=>SITEURL.GetPropertyInArray('content_slug',$rawdata),
                                  'eid'=>intval($rawdata['entity_id']),
                                  'type'=>0,
                                  'slug'=>GetPropertyInArray('content_slug',$rawdata),
                                  'profilepicUrl'=>SITEURL.GetPropertyInArray('content_slug',$rawdata),
                                  'avatar'=> $avatar,
                                  'banner'=>$banner,
                                  'varified'=>$rawdata['private_data']['varified'],
                                  'Url'=>'',
                                  'location'=>'',
                                  'activeon'=>$rawdata['last_login']
                                  );
    break;
    case 1:
   $avatar=($rawdata['public_data']['avatar']=='')?SITEURL.'assets/imgs/pic/shopavatar.png':$rawdata['public_data']['avatar'];
   $banner=($rawdata['public_data']['banner']=='')?SITEURL.'assets/imgs/pic/shopavatar.png':$rawdata['public_data']['banner'];

    $Address=$this->EntityAddress($rawdata);
 $location= $Address['location']['name'].' '.$Address['city']['name'].' '.$Address['state']['name'].' '.$Address['country']['name'];
 $Collection=$rawdata['public_data']['collection_data'];
 $currency=$rawdata['private_data']['currency'];


     $parseData=array('entityName'=>SafeTextDecode($rawdata['public_data']['Name']),
                                  'entityUrl'=>SITEURL.GetPropertyInArray('content_slug',$rawdata),
                                'eid'=>intval($rawdata['entity_id']),
                                  'type'=>1,
                                  'slug'=>GetPropertyInArray('content_slug',$rawdata),
                                  'profilepicUrl'=>SITEURL.GetPropertyInArray('content_slug',$rawdata),
                                  'avatar'=>$avatar,
                                  'banner'=>$banner,
                                  'varified'=>$rawdata['private_data']['varified'],
                                  'Url'=>'',
                                  'currency'=>$currency,
                                  'location'=>$location,
                                  'activeon'=>$rawdata['last_login'],
                                  'collection'=>$Collection
                                  );
    break;
   case 3:
   
    $avatar=($rawdata['public_data']['avatar']=='')?SITEURL.'assets/imgs/pic/avatar.png':$rawdata['public_data']['avatar'];
    $banner=($rawdata['public_data']['banner']=='')?SITEURL.'assets/imgs/pic/avatar.png':$rawdata['public_data']['banner'];

     $parseData=array('entityName'=>SafeTextDecode($rawdata['public_data']['Name']),
                                  'entityUrl'=>SITEURL.GetPropertyInArray('content_slug',$rawdata),
                                  'eid'=>intval($rawdata['entity_id']),
                                  'type'=>3,
                                  'slug'=>GetPropertyInArray('content_slug',$rawdata),
                                  'profilepicUrl'=>SITEURL.GetPropertyInArray('content_slug',$rawdata),
                                  'avatar'=> $avatar,
                                  'banner'=>$banner,
                                  'varified'=>$rawdata['private_data']['varified'],
                                  'Url'=>'',
                                  'location'=>'',
                                  );
    break; 
       case 4:
   $avatar=($rawdata['public_data']['avatar']=='')?SITEURL.'assets/imgs/pic/shopavatar.png':$rawdata['public_data']['avatar'];
   $banner=($rawdata['public_data']['banner']=='')?SITEURL.'assets/imgs/pic/shopavatar.png':$rawdata['public_data']['banner'];

    $Address=$this->EntityAddress($rawdata);



     $parseData=array('entityName'=>SafeTextDecode($rawdata['public_data']['Name']),
                                  'entityUrl'=>SITEURL.GetPropertyInArray('content_slug',$rawdata),
                                'eid'=>intval($rawdata['entity_id']),
                                  'type'=>1,
                                  'slug'=>GetPropertyInArray('content_slug',$rawdata),
                                  'profilepicUrl'=>SITEURL.GetPropertyInArray('content_slug',$rawdata),
                                  'avatar'=>$avatar,
                                  'banner'=>$banner,
                                  'varified'=>$rawdata['private_data']['varified'],
                                  'Url'=>'',
                                  'location'=>'',
                                  );
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
   $addressdataAll=$rawdata['public_data']['addressdata'];
 
  // check_response($addressdataAll);
   if(is_numeric_index_array( $addressdataAll)){
        
   foreach( $addressdataAll as $addressdata){
 $addressdata=True_array_merge(array( $GLOBALS['Var_BundlePrototype']->DefaultValue('address')),$addressdata);//

 $Address[$addressdata['address_id']]= $GLOBALS['Var_BundlePrototype']->DefaultValue('addressOut');

 $Address[$addressdata['address_id']]['address_id']=$addressdata['address_id'];
 $Address[$addressdata['address_id']]['address']=SafeTextDecode($addressdata['address']);
 $Address[$addressdata['address_id']]['landmark']=SafeTextDecode($addressdata['landmark']);
 $Address[$addressdata['address_id']]['phone']=$addressdata['phone'];
 $Address[$addressdata['address_id']]['location']=array('id'=>$addressdata['location_id'],'name'=> SafeTextDecode($addressdata['location']));
$Address[$addressdata['address_id']]['postalCode']=array('id'=>$addressdata['postalCode_id'],'name'=> $addressdata['postalCode']);
 $Address[$addressdata['address_id']]['town']=array('id'=>$addressdata['town_id'],'name'=> SafeTextDecode($addressdata['town']));
 $Address[$addressdata['address_id']]['city']=array('id'=>$addressdata['city_id'],'name'=>SafeTextDecode($addressdata['city']));
 $Address[$addressdata['address_id']]['state']=array('id'=>$addressdata['fl_admin_id'],'name'=>SafeTextDecode($addressdata['fl_admin']));
 $Address[$addressdata['address_id']]['country']=array('id'=>$addressdata['country_id'],'name'=>SafeTextDecode($addressdata['country']));
   }
   }else{
     $Address=  array($GLOBALS['Var_BundlePrototype']->DefaultValue('addressOut')); 
   }
  
$parseData =$Address; 
 
    break;
    case 1:

   $addressdata=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('address'),$rawdata['public_data']['addressdata']);
   $Address= $GLOBALS['Var_BundlePrototype']->DefaultValue('addressOut');
    $Address['address_id']=$addressdata['address_id'];
    $Address['address']=SafeTextDecode($addressdata['address']);
  $Address['landmark']=SafeTextDecode($addressdata['landmark']);
  $Address['phone']=$addressdata['phone'];
  $Address['location']=array('id'=>$addressdata['location_id'],'name'=> SafeTextDecode($addressdata['location']));
  $Address['postalCode']=array('id'=>$addressdata['postalCode_id'],'name'=> $addressdata['postalCode']);
  $Address['town']=array('id'=>$addressdata['town_id'],'name'=> SafeTextDecode($addressdata['town']));
  $Address['city']=array('id'=>$addressdata['city_id'],'name'=>SafeTextDecode($addressdata['city']));
  $Address['state']=array('id'=>$addressdata['fl_admin_id'],'name'=>SafeTextDecode($addressdata['fl_admin']));
  $Address['country']=array('id'=>$addressdata['country_id'],'name'=>SafeTextDecode($addressdata['country']));

 

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
   $avatar=($rawdata['public_data']['avatar']=='')?SITEURL.'assets/imgs/pic/avatar.png':$rawdata['public_data']['avatar'];
    $banner=($rawdata['public_data']['banner']=='')?SITEURL.'assets/imgs/pic/avatar.png':$rawdata['public_data']['banner'];
      $parseData['setting_0']=array('first_name'=>SafeTextDecode($rawdata['public_data']['FirstName']),
                                  'last_name'=>SafeTextDecode($rawdata['public_data']['LastName']),
                                  'sex'=>$rawdata['public_data']['sex'],
                                  'birthday'=>$rawdata['public_data']['birthday'],
                                  'countryinfo_id'=>$rawdata['private_data']['countryinfo_id'],
                                  'avatar'=>   $avatar
                                  );




   $addressdata=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('address'),$rawdata['public_data']['addressdata']);
$parseData['setting_568']=$this->EntityAddress($rawdata);




       $parseData['setting_3']=$rawdata['private_data']['notification_setting'];
       $parseData['setting_4']=$rawdata['private_data']['deactivate'];
        $parseData['setting_5']=$rawdata['private_data']['privacy_setting'];
       $parseData['setting_banner']=$rawdata['public_data']['bannerData'];
       $parseData['setting_profilepic']=$rawdata['public_data']['profilepicData'];
       $parseData['theme']=array('','');

   //--
   break;
    case 1:
  // check_response($rawdata);
      $parseData['setting_0']=array('store_name'=>SafeTextDecode($rawdata['public_data']['Name']),
                                 'slug'=>$rawdata['content_slug'],
                                 'website'=>SafeTextDecode($rawdata['public_data']['website']),
                                 
                                 );
   $addressdata=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('address'),$rawdata['public_data']['addressdata']);
     //  check_response($rawdata['private_data']);
       $parseData['setting_1']=array(
                     'address_id'=>$addressdata['address_id'],
                     'address'=>SafeTextDecode($addressdata['address']),
                     'landmark'=>SafeTextDecode($addressdata['landmark']),
                     'phone'=>$addressdata['phone'],
                     'postalCode'=>array('id'=>$addressdata['postalCode_id'],'name'=> $addressdata['postalCode']),
                     'town'=>array('id'=>$addressdata['town_id'],'name'=> SafeTextDecode($addressdata['town'])),
                     'city'=>array('id'=>$addressdata['city_id'],'name'=>SafeTextDecode($addressdata['city'])),
                     'state'=>array('id'=>$addressdata['fl_admin_id'],'name'=>SafeTextDecode($addressdata['fl_admin'])),
                     'country'=>array('id'=>$addressdata['country_id'],'name'=>SafeTextDecode($addressdata['country']))
                                 );
 

  
       $parseData['setting_3']=$rawdata['private_data']['notification_setting'];
       $parseData['setting_4']=$rawdata['private_data']['deactivate'];
       $parseData['setting_5']=$rawdata['private_data']['staffHash'];
       $parseData['setting_6']=$rawdata['private_data']['staffHash'];
    
         $CollectionRows=  $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'valid_collection_id','collection_id'=>$rawdata['public_data']['collection']));
       $parseData['store_collection']= $GLOBALS['Var_StoreDashboard']->ParseCollection($CollectionRows);
       $parseData['setting_457']=array('about_store'=>SafeTextDecode($rawdata['public_data']['about_store']));
       $parseData['setting_456']=array('store_policy'=>SafeTextDecode($rawdata['public_data']['store_policy']),
                                                'return_policy'=>$rawdata['private_data']['return_policy']);
       $parseData['setting_banner']=$rawdata['public_data']['bannerData'];
       $parseData['setting_profilepic']=$rawdata['public_data']['profilepicData'];


 // $parseData['setting_14']=$rawdata['private_data']['cwsetting'];
       $parseData['theme']=array('','');
    break;    


case 4:

     $parseData['setting_0']=array(
                  'name'=>SafeTextDecode($rawdata['public_data']['Name']),
                  'slug'=>$rawdata['content_slug'],
                  'website'=>SafeTextDecode($rawdata['public_data']['website']),
                  'company_industry_category'=>SafeTextDecode($rawdata['public_data']['company_industry_category'])
                  
                  );

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
    
     $parseData=$rawdata;
     
    
    break;   
      
   case 'attached_object':
    
    
    break;  
    case 'taged_entity':
     $taged_entity_str= $rawdata['taged_entity'];
    if(is_string($taged_entity_str)){
        $taged_entity=explode(',',$taged_entity_str);
         $taged_entity= Walk_Ways_each($taged_entity,'numericID');


        if(count( $taged_entity)>0){
        $taged_entity_rows=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'EntityRowByArray','entity_id_Array'=>$taged_entity));
        foreach( $taged_entity_rows as $row){
        $parseData[]=$this->EntityStripdata($row);   
        }

        }
    }
    
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
* @param  => [ $MetaDataType => Category for different meta data = Signup,Profilepage]
* @return => 
*/
public function CreateMetaData($MetaDataType,$EntityRow,$objectType,$objectData=array(),$extra=array()){
 $MetaData=array('tag'=>'','obj'=>array());

 switch($MetaDataType){
 case 'Profilepage':
   switch(intval($EntityRow['type'])){
       case 1: // store
   $settingdata=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);

    
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
$MetaData['obj'][]= 'Online shopping in Wide range of products';
  $MetaData['obj'][]= ' on ';
  $MetaData['obj'][]= $settingdata['setting_0']['store_name'];
    $MetaData['obj'][]= 'wowrol@'.$settingdata['setting_0']['slug'];
 $MetaData['obj'][]= ' at ';
 $MetaData['obj'][]= $settingdata['setting_1']['address'];
 $MetaData['obj'][]= $settingdata['setting_1']['town']['name'];
 $MetaData['obj'][]= $settingdata['setting_1']['city']['name'];
$MetaData['obj'][]= $settingdata['setting_1']['country']['name'];

 $MetaData['obj'][]= ' on wowrol.com/'.$settingdata['setting_0']['slug'];
 $metaWord=implode(",",$MetaData['obj']);
  $metades=implode(" ",$MetaData['obj']);

  $metaWord= validate_word('strip_tags', $metaWord);
  $metades= validate_word('strip_tags', $metades);
  $keywords='<meta name="keywords" content="'. $metaWord.'">';
  $description='<meta name="description" content="'.$metades.'">';
  $title='<meta name="title" content="'.$metaWord.'">';

  $MetaData['tag']=$title.$keywords.$description;


       break;


  case 4: // company
      
 if(count($objectData)>0){
        switch($objectType){
           case 'brand':   
    
  $MetaData['obj'][]= $objectData['pN'];

       break; 
        }
        
        }
  break;

   } 
   break;


case 'Signup':


  $MetaData['tag']='';
break;

}
   
     return $MetaData;
}

/*
* @description=> CreateSEOtext.
* @param  => [ ]
* call =    $GLOBALS['Var_ViewParse']-> CreateSEOtext($SEOType,$EntityRow,$objectType,$objectData=array(),$extra=array());
* @return => 
*/

public function CreateSEOtext($SEOType,$EntityRow,$objectType,$objectData=array(),$extra=array()){
  
$head=array();$body=array();
if(is_array($SEOType)){
foreach($SEOType as $SEO) {

    switch ($SEO){
      case 'localbusiness':
 
   $settingdata=$GLOBALS['Var_ViewParse']->setting_data($EntityRow);; 
     $Address=  $settingdata['setting_1']; 
 $store_collection= $GLOBALS['Var_ViewParse']->ParseCollectionForUtility($settingdata['store_collection'],'seoData','string');
   $head[]=' <script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "LocalBusiness",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "'. $Address['address'].'",
    "addressRegion": "'. $Address['state']['name'] .'",
    "streetAddress": "'. $Address['landmark'].'"
  },
  "description": "A superb collection of  '. $store_collection.'  at  '.  $Address['town']['name'].' '.  $Address['city']['name'].' '. $Address['state']['name'] .' '. $Address['country']['name'] .' ",
  "name": "'.$settingdata['setting_0']['store_name'].'",
  "telephone": "'.$Address['phone'].'"
  "url": "http://www.wowrol.com/'.$settingdata['setting_0']['slug'].'"
}
</script>';

      break;
      case 'wowrolOrganization':

   $head[]=' <script type="application/ld+json">
  {
           "@context": "http://schema.org",
           "@type": "Organization",
           "name":"wowrol",
           "url": "http://www.wowrol.com",
           "logo": "http://www.wowrol.com/assets/imgs/logo/bluelogo_3.png",
          "sameAs" : [
               "https://www.twitter.com/wowrol_tweet",
               "https://www.facebook.com/Wowrolofficial"
              
             ],
          "contactPoint" : [
            { "@type" : "ContactPoint",
              "telephone" : "7240533697",
              "contactType" : "customer service"
            } ] 
         }
</script>';


      break;
      case 'WebSite':
   $head[]='  <script type="application/ld+json">   {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "url": "http://www.wowrol.com",
    "image": "http://www.wowrol.com/assets/imgs/logo/bluelogo_3.png",
    "description": "Wowrol.com is social commerce platform that connect the buyers to local market of any location and brings the collective decision making process of buyer’s social connection on internet by bringing the offline store shopping experience on internet with easy tool of online presence for retailers.",
    "keywords":"Social commerce",
    "about":"online shopping"
} </script>';
      break;


      
        
    }


} 
}






    return array('head'=>implode('',$head),'body'=>implode('',$body)); 
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
 $LastMessage= $GLOBALS['Var_Conversation']->RetriveLastMessageOfConversation($Fields,$ActorEntityData['EntityData']['entity_id']);


           for($j=0;$j<count($Fields);$j++){
         $parseData=$GLOBALS['Var_BundlePrototype']->DefaultValue('storebrowsingData'); 
         
$NormalToArray =$GLOBALS['Var_Conversation']->ParseConversationRowToNormal($Fields[$j]);
$Fields[$j]['LChT']=$NormalToArray['last_check_time']; 
$Fields[$j]['members']=$NormalToArray['members'];   
         
        $parseData['id']= $Fields[$j]['checkIn_id'];          
    $parseData['checkIn_id']= $Fields[$j]['checkIn_id'];
    $parseData['cid']= $Fields[$j]['conversation_id'];
    $parseData['checkInTime']= $Fields[$j]['checkInTime_gmt'];  
    $parseData['Edindex']= $GLOBALS['Var_Conversation']->IndexOfMember($Fields[$j],$ActorEntityData['EntityData']['entity_id']);  
     
   $members=$this->GetCheckInMember($Fields[$j]);
       $AllAddress=array();
   for($i=0;$i<count($members);$i++){
   $EntityInformation= new EntityInformation($members[$i],$ActorEntityData['EntityData']['entity_id']);
    $EntityRow=$EntityInformation->frontuser_EntityRow;
    $parseData['Ed'][]=$EntityInformation->EntityStripdata($EntityRow);;
    $AllAddress[]=   $GLOBALS['Var_ViewParse']->EntityAddress($EntityRow);
   }

     $parseData['role']=$this->GetEntityRole( $members);  

  $parseData['iuc']=$Fields[$j]['Instant_Updater_code'];
  $parseData['iu_hash']=$Fields[$j]['Instant_Updater_hash'];  


/*
only some data we need in  parse
*/

      $parseData['ucount']=0;
   // last message of conversation
      if(isset( $LastMessage[$j])){
     $parseData['lmi']= $GLOBALS['Var_Conversation']->ParseConversationMessage(array($LastMessage[$j]),array('ActorEntityData'=>$ActorEntityData,'entity_id'=>$ActorEntityData['EntityData']['entity_id'],'conversation_row'=>$Fields[$j],'facet'=>FALSE));
      }else{
       $parseData['lmi']=array();   
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


  
    if($Fields['members']!=NULL){
        
 if(!is_array($Fields['members'])){
       $buyers_id=Walk_Ways_each(explode(',',$Fields['members']),'numericID');
 }else{
        $buyers_id=$Fields['members'];  
 }
 
    
      foreach($buyers_id as $value){
          if($Fields['store_id']!=$value&&$Fields['buyer_id']!=$value){
              $Members[]=$value; 
          }
   
      }
    }
  return create_int_array( $Members);
}
/**
* @description=> get the current member rol
* @param  =>
* @return => 
*/
public function GetEntityRole($Member){
   $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
 $entity_id=  $ActorEntityData['EntityData']['entity_id'];

 $Role='unvalid';
   foreach ($Member as $q =>$v){
       if($entity_id==$v){
           $Role =$q;
       }
   }

  
   return $Role;
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
    //   $AllRecipient_EntityRow =   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'EntityRowByArray','entity_id_Array'=>$args['ids']));

for($i=0;$i<count($EntityIds);$i++){
     $EntityInformation= new EntityInformation($EntityIds[$i],$ActorEntityData['EntityData']['entity_id']);
    $EntityRow=$EntityInformation->frontuser_EntityRow;  
 $EntityCardData[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('ProfilePage'); 
   $EntityCardData[$i]['id']= $EntityRow['entity_id'];
   $EntityCardData[$i]['ESd']= $this->EntityStripdata($EntityRow);
   $EntityCardData[$i]['twr']= $EntityInformation->RelationData('twr');
   $EntityCardData[$i]['owr']= $EntityInformation->RelationData('owr');
 $EntityCardData[$i]['mes']= $EntityInformation->RelationData('message');
  $EntityCardData[$i]['shg']= $EntityInformation->RelationData('shopping');


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
 $EntityCardData[$i]['id']= $Fields[$i]['entity_id'];
 $EntityCardData[$i]['ESd']=  $this->EntityStripdata($Fields[$i]);
  $EntityCardData[$i]['twr']=   $subEntityInformation->RelationData('twr');
  $EntityCardData[$i]['owr']=   $subEntityInformation->RelationData('owr');
   $EntityCardData[$i]['mes']=  $subEntityInformation->RelationData('message');
  $EntityCardData[$i]['shg']=  $subEntityInformation->RelationData('shopping');
 }
return   $EntityCardData;
}

/**$GLOBALS['Var_ViewParse']->Parse entity Row($frontuser_EntityRow,$relation)
* @description=>Parse entity Row.
* @param  => 
* @return => 
*/
public function ParseEntityRow($EntityRow){
      //  var_dump($EntityRow);
  
     //buyer
 if($EntityRow['type']==0&&is_string($EntityRow['public_data'])&&is_string($EntityRow['private_data'])){
  $EntityRow['public_data']= JsonTrueDecode($EntityRow['public_data'],array()) ; 
  $EntityRow['public_data']=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPublic'), $EntityRow['public_data']);

  $EntityRow['private_data']= JsonTrueDecode($EntityRow['private_data'],array()) ; 
  $EntityRow['private_data']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPrivate'), $EntityRow['private_data']);
 }
 //store
  if($EntityRow['type']==1&&is_string($EntityRow['public_data'])&&is_string($EntityRow['private_data'])){
  $EntityRow['public_data']= JsonTrueDecode($EntityRow['public_data'],array()) ; 
 
  $EntityRow['public_data']=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic'),$EntityRow['public_data']);

  $EntityRow['private_data']= JsonTrueDecode($EntityRow['private_data'],array()) ; 

  $EntityRow['private_data']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate'), $EntityRow['private_data']);

 }
    //location manager
  if($EntityRow['type']==3&&is_string($EntityRow['public_data'])&&is_string($EntityRow['private_data'])){
  $EntityRow['public_data']= JsonTrueDecode($EntityRow['public_data'],array()) ; 
 
  $EntityRow['public_data']=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('LocationManagerPublic'),$EntityRow['public_data']);

  $EntityRow['private_data']= JsonTrueDecode($EntityRow['private_data'],array()) ; 

  $EntityRow['private_data']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('LocationManagerPrivate'), $EntityRow['private_data']);

 } 
   
   //company
  if($EntityRow['type']==4&&is_string($EntityRow['public_data'])&&is_string($EntityRow['private_data'])){
  $EntityRow['public_data']= JsonTrueDecode($EntityRow['public_data'],array()) ; 
 
  $EntityRow['public_data']=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('CompanyPublic'),$EntityRow['public_data']);

  $EntityRow['private_data']= JsonTrueDecode($EntityRow['private_data'],array()) ; 

  $EntityRow['private_data']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('CompanyPrivate'), $EntityRow['private_data']);

 } 
  
 return $EntityRow;
}

/** $GLOBALS['Var_ViewParse']->ParseProfileInfoData($frontuser_EntityRow,$relation)
* @description=>Parse ProfileInfoData.
* @param  => frontuser_EntityRow, relation
* @return => 
*/


public function ParseProfileInfoData($infoID,$frontuser_EntityRow,$relation){
      $InfoData=array();

 $editer=($relation==1)?TRUE:FALSE; 
switch($infoID){
    case 'basicbuyer':
  
   $InfoData=array('panalID'=>'basicbuyer','data'=>array(
                        'livingPlace'=>SafeTextDecode($frontuser_EntityRow['public_data']['livingPalce']),
                        'sex'=>$frontuser_EntityRow['public_data']['sex'],
                        'memberSince'=>date("d-M-Y", $frontuser_EntityRow['private_data']['memberSince']),
                        'website'=>SafeTextDecode($frontuser_EntityRow['public_data']['website'])
                       
                         ),'editer'=>$editer);
   break; 
   
   case'aboutbuyer':
  $InfoData=array('panalID'=>'aboutbuyer','data'=>array(
                     'about'=>SafeTextDecode($frontuser_EntityRow['public_data']['about'])
                         ),'editer'=>$editer);
   break; 
   case 'basicstore':
 

    $InfoData=array('panalID'=>'basicstore','data'=>array(
                'memberSince'=>$frontuser_EntityRow['private_data']['memberSince'],
                'website'=>SafeTextDecode($frontuser_EntityRow['public_data']['website'])
                         ),'editer'=>$editer);
   break; 
     case 'storeaddress':

     $addressdata=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('address'),$frontuser_EntityRow['public_data']['addressdata']);
  $InfoData=array('panalID'=>'storeaddress','data'=>array(
  'address_id'=>$addressdata['address_id'],
                  'address'=>SafeTextDecode($addressdata['address']),
                     'landmark'=>SafeTextDecode($addressdata['landmark']),
                     'phone'=>$addressdata['phone'],
                     'postalCode'=>array('id'=>$addressdata['postalCode_id'],'name'=> $addressdata['postalCode']),
                     'town'=>array('id'=>$addressdata['town_id'],'name'=> SafeTextDecode($addressdata['town'])),
                     'city'=>array('id'=>$addressdata['city_id'],'name'=>SafeTextDecode($addressdata['city'])),
                     'state'=>array('id'=>$addressdata['fl_admin_id'],'name'=>SafeTextDecode($addressdata['fl_admin'])),
                     'country'=>array('id'=>$addressdata['country_id'],'name'=>SafeTextDecode($addressdata['country']))
                         ),'editer'=>$editer);
   break; 
 case 'aboutstore':
     $InfoData=array('panalID'=>'aboutstore','data'=>array(
                     'about_store'=>SafeTextDecode($frontuser_EntityRow['public_data']['about_store'])
                         ),'editer'=>$editer);
   break; 
case 'Storepolicy':
   $InfoData=array('panalID'=>'Storepolicy','data'=>array(
                        'store_policy'=>SafeTextDecode($frontuser_EntityRow['public_data']['store_policy']),
                        'return_policy'=>$frontuser_EntityRow['private_data']['return_policy']
                         ),'editer'=>$editer);
                  
 
break;
case 'price_range':
   $InfoData=array('panalID'=>'price_range','data'=>array(
                        'min'=>intval($frontuser_EntityRow['private_data']['price_range']['min']),
                        'max'=>intval($frontuser_EntityRow['private_data']['price_range']['max'])
                         ),'editer'=>$editer);
                  
 
break;

case 'minimum_order':
   $InfoData=array('panalID'=>'minimum_order','data'=>array(
                        'minimum_order'=>intval($frontuser_EntityRow['private_data']['minimum_order'])
                         ),'editer'=>$editer);
                  
 
break;

case 'StoreshippingZone':

  $countryInfo=$GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'validCountryInfo','countryinfo_id'=>$frontuser_EntityRow['private_data']['shippingZonecountry']));
  $country=array('id'=>'','country'=>'');

  if( $countryInfo!=NULL){
       $country=array('id'=>$countryInfo['countryinfo_id'],'country'=>$countryInfo['country']);
  }
   $InfoData=array('panalID'=>'StoreshippingZone','data'=>array(
                       'country'=>$country,
                        'type'=>$frontuser_EntityRow['private_data']['shippingZonetype']
                         ),'editer'=>$editer);
break;


}

//defalut adding id
 $InfoData['id']= $InfoData['panalID'];
    return $InfoData;
}
/**
* @description=>Parse entity Row.
* @call  $GLOBALS['Var_ViewParse']->  UserLocationForMarket($EntityRow);
* @param  => 
* @return => 
*/
public function UserLocationForMarket($EntityRow){
    $parseData=array();
 //

  switch($EntityRow['type']){
    case 0:
$Address= $this->EntityAddress($EntityRow);
    $parseData['address']=$Address;
 $parseData['type']=0;

    break;
    case 1:
$Address= $this->EntityAddress($EntityRow);
    $parseData['address']=$Address;
 $parseData['type']=1;
    break;    

  }

return   $parseData;
}

/**
* @description=>Parse entity Row.
* @call  $GLOBALS['Var_ViewParse']->ParselocationForMarketData($EntityRow);
* @param  => 
* @return => 
*/
public function ParselocationForMarketData($Fields){
      $parseData=array();
    if(!is_index_array($Fields)){
     $parseData= $GLOBALS['Var_BundlePrototype']->DefaultValue('marketOut');

 $parseData['currency']=$Fields['currency'];
   $parseData['location']=array('id'=>$Fields['location_id'],'name'=>$Fields['location']);
   $parseData['postalCode']=array('id'=>$Fields['postalCode_id'],'name'=>$Fields['postalCode']);
   $parseData['town']=array('id'=>$Fields['location_id'],'name'=>$Fields['location']);
   $parseData['city']=array('id'=>$Fields['city_id'],'name'=>$Fields['city']);
   $parseData['state']=array('id'=>$Fields['fl_admin_id'],'name'=>$Fields['fl_admin']);
   $parseData['country']=array('id'=>$Fields['country_id'],'name'=>$Fields['country']);   
    }else{
        
       for($i=0;$i<count($Fields);$i++){
  $parseData[$i]= $GLOBALS['Var_BundlePrototype']->DefaultValue('marketOut');
         $parseData[$i]['id']=$Fields[$i]['location_id'];
          $parseData[$i]['currency']=$Fields[$i]['currency'];
   $parseData[$i]['location']=array('id'=>$Fields[$i]['location_id'],'name'=>$Fields[$i]['location']);
   $parseData[$i]['postalCode']=array('id'=>$Fields[$i]['postalCode_id'],'name'=>$Fields[$i]['postalCode']);
   $parseData[$i]['town']=array('id'=>$Fields[$i]['location_id'],'name'=>$Fields[$i]['location']);
   $parseData[$i]['city']=array('id'=>$Fields[$i]['city_id'],'name'=>$Fields[$i]['city']);
   $parseData[$i]['state']=array('id'=>$Fields[$i]['fl_admin_id'],'name'=>$Fields[$i]['fl_admin']);
   $parseData[$i]['country']=array('id'=>$Fields[$i]['country_id'],'name'=>$Fields[$i]['country']);    
       }
    }
      



      return   $parseData;
}
/**
* @description=>Parse entity Row.
* @call  $GLOBALS['Var_ViewParse']->ParseMadia($EntityRow);
* @param  => 
* @return => 
*/

public function ParseMadia($Fields,$args=array()){
      $ret=array(); 
           for($i=0;$i<count($Fields);$i++){
             $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('mediaOut'); 
             $ret[$i]['id']=$Fields[$i]['image_id'];       
              $ret[$i]['image_id']=$Fields[$i]['image_id'];
              $ret[$i]['key']=$Fields[$i]['storage_info'].'_'.$Fields[$i]['image_id'];
              $ret[$i]['name']=$Fields[$i]['storage_info'].'_'.$Fields[$i]['image_id'];
              $ret[$i]['url']=$Fields[$i]['ObjectURL'];
              $ret[$i]['hash']=$Fields[$i]['update_hash'];
              $ret[$i]['time']=$Fields[$i]['time_node'];
              $ret[$i]['filesize']=$Fields[$i]['filesize'];
           }

return $ret;
}
/**
* @description=>  PArse Already parsed collection by storedashboard  for different utility
* @call  $GLOBALS['Var_ViewParse']->ParseCollectionForUtility($EntityRow);
* @param  => $resultType =`string`|`array`
* @return => 
*/
     
public function ParseCollectionForUtility($Fields,$Utility,$resultType,$args=array()){
     $ret=array();
 
   
     switch($Utility){
       case 'seoData':
       
         for($i=0;$i<count($Fields);$i++){
           $ret[]= $Fields[$i]['cN'];
         }

     

       break;  
     }

     switch($resultType){
         case 'string':
     $ret=implode(',', $ret);
         break;
         case 'array':

         break;

     }


     return  $ret;
}     
  

  
     
       
 }


  $GLOBALS['Var_ViewParse'] =new ViewParse();

?>