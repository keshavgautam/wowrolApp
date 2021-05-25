<?php
    
/**
* @description=>Provide and control all acess data.
* @param  => [string($GLOBALS['Var_path'])]]
* @return => 
*/
class Enter{
/**
* @description=>gives default entity data.
* @param  => 
* @return => 
*/    
public function DefaultEntityData(){
  
     $entity_data=array();

   $entity_data['visit_data']=array('wa'=>0,//entityId
                                    'wb'=>0,//accountId
                                    'wc'=>0,//AuthPassword
                                    'wd'=>0,//visitId
                                    'we'=>0,//Isremember
                                    'wf'=>(DeviceType==0)?'web':'mob',//Flaver
                                    'wg'=>'en',//lang
                                    'wh'=>5.5,//offset
                                    'wi'=>0,//dst
                                    'wj'=>0//staffid
                                     );
    $entity_data['EntityData']=$GLOBALS['Var_BundlePrototype']->DefaultValue('EntityData');
   $entity_data['staffData']=$GLOBALS['Var_BundlePrototype']->DefaultValue('staffData');
    $entity_data['LoginData']=$GLOBALS['Var_BundlePrototype']->DefaultValue('LoginData');
 
    $entity_data['LoginStatus']=FALSE;
    $entity_data['IsOwner']=FALSE;
    

   return $entity_data;
   
}

/**
* @description=>
* @param  => 
* @return => 
*/

public function GetActorEntityData(){
    $entity_data=$this->DefaultEntityData();
    $visitData=array();

$EntityId = COOKIES_QueryVars($GLOBALS['Var_Cookies_name']['EntityId'],0);
$accountId = COOKIES_QueryVars($GLOBALS['Var_Cookies_name']['accountId'],0);
$AuthPassword= COOKIES_QueryVars($GLOBALS['Var_Cookies_name']['AuthPassword'],0);
$visitId= COOKIES_QueryVars($GLOBALS['Var_Cookies_name']['visitId'],'0');
$Isremember= COOKIES_QueryVars($GLOBALS['Var_Cookies_name']['Isremember'],0);
$Flaver= COOKIES_QueryVars($GLOBALS['Var_Cookies_name']['Flaver'],'mob');
$lang= COOKIES_QueryVars($GLOBALS['Var_Cookies_name']['lang'],'en');
$Time_Offset= COOKIES_QueryVars($GLOBALS['Var_Cookies_name']['Time_Offset'],5.5);
$Time_dst= COOKIES_QueryVars($GLOBALS['Var_Cookies_name']['Time_dst'],0);
$staffId= COOKIES_QueryVars($GLOBALS['Var_Cookies_name']['staffId'],0);

$visitData['wa']=  ($EntityId==0)?0:validate_word('numericID',$EntityId);
$visitData['wb']=  ($accountId==0)?0:validate_word('numericID',$accountId);
$visitData['wc']=  validate_word('',$AuthPassword);
$visitData['wd']= validate_word('alphanumeric',$visitId);
$visitData['we']=  ($Isremember==0)?0:validate_word('numericID',$Isremember);
$visitData['wf']=  ($Flaver=='')?((DeviceType==0)?'web':'mob'):validate_word('alphanumeric',$Flaver);
$visitData['wg']=  ($lang=='')?'en':validate_word('alphanumeric',$lang);
$visitData['wh']=  ($Time_Offset=='')?5.5:validate_word('numeric',$Time_Offset);
$visitData['wi']=  ($Time_dst==0)?0:validate_word('numeric',$Time_dst);
$visitData['wj']=  ($staffId==0)?0:validate_word('numericID',$staffId); 



 $SesstionRow=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'login_session',array('session_id'),array($visitData['wd']));

 if($SesstionRow!=NULL){
      $SesstionRow=$this->ParseSessionData($SesstionRow,$visitData);
    
         $entity_data['LoginData']= $SesstionRow['LoginData'];
   // entity id

   $entity_data['LoginData']['entity_id']=$visitData['wa'];

  $entity_data['EntityData']= $SesstionRow['EntityData'];
   $entity_data['staffData']= $SesstionRow['staffData'];


   if($this->CheckLoginStatus($visitData,$entity_data['LoginData'],$entity_data['EntityData'], $entity_data['staffData'])){

 $entity_data['LoginStatus']=TRUE;

 $entity_data['verified']=intval($entity_data['LoginData']['verified']);



 

  $entity_data['IsOwner']=$this->IsOwner($visitData,$entity_data['EntityData'],$entity_data['staffData'],$entity_data['LoginData']);



   //--
$zone=Timezone::detect_timezone_id($visitData['wh'],$visitData['wi']);
  $LAst_Login=zonedate($zone);
  if($visitData['wj']==0){//update to entity
   // update the entity row
 $entity_update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'entity',array('device_in_use','last_login'),array(DEVISE_IN_USE,$LAst_Login),array('entity_id'),array( $entity_data['LoginData']['entity_id']));

  }else{// update to store staff
             // public_data
    $defaultpublicdata=$GLOBALS['Var_BundlePrototype']->DefaultValue('storeStaff');
      $publicdata=True_array_merge($defaultpublicdata,array(
  'visitId'=>$entity_data['staffData']['visitId'],
       'updatedate'=>$entity_data['staffData']['updatedate'],
       'lastlogin'=>$LAst_Login,
    ));

   //update
$GLOBALS['Var_DBMysqli']->update(DB_NAME,'store_staff', array('public_data'),array(Makejson($publicdata)),array('store_staff_id'),array($visitData['wj']));

      
  }




//--
  
if($entity_data['EntityData']['type']!='1') {
  
    $visitData['wj']=0;
}

//--
   }else{
    $visitData['wa']=0; $visitData['wb']=0; $visitData['wc']=''; $visitData['wd']='';        
    $visitData['wj']=0;
     
   }

 }

 $entity_data['visit_data']=$visitData;
  return $entity_data;
}

/**
* @description=>
* @call  =>  $GLOBALS['Var_Enter']->GetLoginData($account_id);
* @param  => 
* @return => 
*/
public function GetLoginData($account_id){
     $LoginData=$GLOBALS['Var_BundlePrototype']->DefaultValue('LoginData');

    //check post 1
    
$sql='SELECT DISTINCT *
FROM  '.DB_NAME.'.account_login_identity a ,'.DB_NAME.'.accounts b,'.DB_NAME.'.login c
WHERE a.account_id ="'.$account_id.'" 
AND a.account_id=b.account_id
AND b.login_id=c.login_id
LIMIT 1
';
 $accountDATA=  $GLOBALS['Var_DBMysqli']->query($sql );
 if(count($accountDATA)>0){
     $LoginData= $accountDATA[0]; 
 }


   //paring private data
  $LoginData['private_data']= JsonTrueDecode($LoginData['private_data'],$GLOBALS['Var_BundlePrototype']->DefaultValue('AccountPrivate'));

  return $LoginData;
}

/**
* @description=>CheckLoginStatus full proof.
* @param  => [array($args)]]
* @return => 
*/
public function CheckLoginStatus($visitData,$LoginData,$EntityData,$staffData){
    $status=FALSE;
   //check_response($staffData);
  //check_response($EntityData);
    // check_response($LoginData);
    //check_response($visitData);
   $hasher = new PasswordHash(9, FALSE);
$hash = $hasher->HashPassword(sha1($LoginData['password']).'0'.md5($LoginData['password'])); 
$AuthPassword= (isset($visitData['wc']))?$visitData['wc']:'';  
 
//check post 2

if($hasher->CheckPassword($AuthPassword, $hash)){
    
      $status=TRUE;  

}

      if($status==FALSE){

    if($EntityData['type']==1){
    //check for store staff
  $hasher = new PasswordHash(9, FALSE);
$hash = $hasher->HashPassword('0'.sha1($staffData['password']).'0'.md5($EntityData['private_data']['staffHash'])); 

 
//check post 2

if($hasher->CheckPassword($AuthPassword, $hash)){
    
      $status=TRUE;  

}


    //--

    }
   
   
      }





    return $status;
}
/**$GLOBALS['Var_UtilityCheck']->IsValidEntity($EntityId)
* @description=>collection of UtilityCheck function .
* @param  => 
* @return => 
*/ 
public function IsValidEntity($account_id,$EntityId){
    

    $num=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'entity' ,array('entity_id','account_id'),array($EntityId,$account_id));
    if($num>0){
        $retern=TRUE;

    }else{
         $retern=FALSE; 
    }
    return $retern;
} 
/**$GLOBALS['Var_UtilityCheck']->IsValidEntity($EntityId)
* @description=>collection of UtilityCheck function .
* @param  => 
* @return => 
*/ 
public function IsValidStaff($Staff_id,$EntityId){
    

    $num=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'store_staff' ,array('store_staff_id','store_id'),array($Staff_id,$EntityId));
    if($num>0){
        $retern=TRUE;

    }else{
         $retern=FALSE; 
    }
    return $retern;
} 
/**
* @description=>Get the entity list of account
* @param  => 
* @return => 
*/
public function EntityDataById($account_id,$entity_id){

    $EnetityData=$GLOBALS['Var_BundlePrototype']->DefaultValue('EntityData');
    if($entity_id!=0&&$account_id!=0&&$this->IsValidEntity($account_id,$entity_id)){
      //--retriving from the  data base

$sql='
SELECT  *  FROM '.DB_NAME.'.entity a,'.DB_NAME.'.page_slug b
WHERE a.entity_id = '.$entity_id.'
AND a.account_id = '.$account_id.'
AND  CAST(b.object_id As SIGNED) =a.entity_id
 AND (b.object_type="buyer"||b.object_type="store"||b.object_type="LocationManager"||b.object_type="company")
LIMIT 1
';

  //-- result query

 
   $DATA=  $GLOBALS['Var_DBMysqli']->query($sql );
   if(count( $DATA)>0){
   $Entity_List=$DATA[0];
       
   //-->>result query

   $EnetityData['entity_id']=$Entity_List['entity_id'];
   $EnetityData['account_id']=$Entity_List['account_id'];
   $EnetityData['type']=$Entity_List['type'];
      if($Entity_List['type']==0){
     
     $EnetityData['public_data']= JsonTrueDecode($Entity_List['public_data'],array()) ; 
  $EnetityData['public_data']=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPublic'), $EnetityData['public_data']);
  $EnetityData['public_data']['slug']= $Entity_List['content_slug'];

  $EnetityData['private_data']= JsonTrueDecode($Entity_List['private_data'],array()) ; 
 $EnetityData['private_data']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPrivate'),  $EnetityData['private_data']);

      }
     if($Entity_List['type']==1){
      
         

 $EnetityData['public_data']= JsonTrueDecode( $Entity_List['public_data'],array()) ; 

  $EnetityData['public_data']=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic'), $EnetityData['public_data']);
$EnetityData['public_data']['slug']= $Entity_List['content_slug'];
 


  $EnetityData['private_data']= JsonTrueDecode( $Entity_List['private_data'],array()) ; 
   
 $EnetityData['private_data']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate'), $EnetityData['private_data']);         
               
                
      }
     if($Entity_List['type']==3){
      
         

 $EnetityData['public_data']= JsonTrueDecode( $Entity_List['public_data'],array()) ; 

  $EnetityData['public_data']=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('LocationManagerPublic'), $EnetityData['public_data']);
$EnetityData['public_data']['slug']= $Entity_List['content_slug'];
 


  $EnetityData['private_data']= JsonTrueDecode( $Entity_List['private_data'],array()) ; 
   
 $EnetityData['private_data']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('LocationManagerPrivate'), $EnetityData['private_data']);         
               
                
      } 

     if($Entity_List['type']==4){
      
         

 $EnetityData['public_data']= JsonTrueDecode( $Entity_List['public_data'],array()) ; 

  $EnetityData['public_data']=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('CompanyPublic'), $EnetityData['public_data']);
$EnetityData['public_data']['slug']= $Entity_List['content_slug'];
 


  $EnetityData['private_data']= JsonTrueDecode( $Entity_List['private_data'],array()) ; 
   
 $EnetityData['private_data']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('CompanyPrivate'), $EnetityData['private_data']);         
               
                
      } 
      }
    // rest data only considered for frount user  
    }



 
   return $EnetityData;

}
/**
* @description=>Get the entity list of account
* @param  => 
* @return => 
*/
public function StoreStaffDataById($store_staff_id,$entity_id){
     $staffData=$GLOBALS['Var_BundlePrototype']->DefaultValue('staffData');
   $defaultpublicdata=$GLOBALS['Var_BundlePrototype']->DefaultValue('storeStaff');

  if($store_staff_id!=0&&$entity_id!=0&&$this->IsValidStaff($store_staff_id,$entity_id)){
          //--retriving from the  data base

$sql='
SELECT  *  FROM '.DB_NAME.'.store_staff a
WHERE a.store_staff_id = '.$store_staff_id.'
AND a.store_id = '.$entity_id.'
LIMIT 1
';

  //-- result query

 
   $DATA=  $GLOBALS['Var_DBMysqli']->query($sql );
   $retriveData=$DATA[0];
   //-->>result query
   $staffData['store_staff_id']=$retriveData['store_staff_id'];  
   $staffData['username']=$retriveData['username'];
   $staffData['password']=$retriveData['password'];
   $publicdata=JsonTrueDecode($retriveData['public_data'],$defaultpublicdata);
$staffData['visitId']=$publicdata['visitId'];
$staffData['updatedate']=$publicdata['updatedate'];
$staffData['lastlogin']=$publicdata['lastlogin'];
$staffData['loginattemp']=$publicdata['loginattemp'];
$staffData['login_block_time']=$publicdata['login_block_time'];
$staffData['loginblock']=$publicdata['loginblock'];


}

return $staffData;
}

/**
* @description=>IsOwner IT is assumed that LoginStatus==true when we call to owner
* @param  => 
* @return => 
*/
public function IsOwner($visitData,$EntityData,$StaffData,$LoginData){
    $IsOwner=FALSE;


 if($EntityData['type']==0){
   $IsOwner=TRUE;


    }
 if($EntityData['type']==1){
   /*if($visitData['wd']==$LoginData['private_data']['visitId']){// we  try to match visited id of entity saved and viste data
        $IsOwner=TRUE; 
         
     }   */
         $IsOwner=TRUE; 
     
    }


    return $IsOwner;


}

/**
* @description=>perform account recovery
* @param  => 
* @return => 
*/


public function SetUpAccountRecovery($account_row){
    
    


        //--
    $recovery_varification_code=generate_random_string( 6,TRUE ,FALSE ,FALSE, FALSE ) ;
    $recovery_varification_access_key=generate_random_string( 20,TRUE ,TRUE ,FALSE, FALSE ) ;
    $recovery_varification_time=time() ;

    $NewOptions=array( 
     'recovery_code' =>  $recovery_varification_code,
    'recovery_access' =>  $recovery_varification_access_key,
    'recovery_time' =>$recovery_varification_time);

 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('AccountPrivate');
 $accountPrivate=JsonTrueDecode($account_row['private_data'], $defaultPrivate) ; 



 $GLOBALS['Var_Utility']->SetAccountOptionsbyArray($account_row['login_identity_id'], $accountPrivate,$NewOptions);



 // sending email
 $email_data=array(
 'identity_type'=>$account_row['identity_type'],
 'identity_Name'=>($account_row['identity_type']=='email')?'email':'Mobile No. ',
 'login_identity'=>validate_word('reverse_HTML_entities',$account_row['login_identity']),
 'recovery_code'=>$NewOptions['recovery_code'],
 'More_Information_link'=>'',
 );



  $GLOBALS['Var_ExternalNotification']->SendAccountRecoveryCode($email_data);




 //-- sending email




 return $NewOptions;

}

/**
* @description=>perform account recovery
* @param  => 
* @return => 
*/
public function ChangePassword($account_row,$newPassword){
       $login_identity_HTML_entities=$account_row['login_identity'];//already sanaitzed
         $login_identity_reverseHTML_entities=validate_word('reverse_HTML_entities',$account_row['login_identity']);
        $actual_input_length=strlen($login_identity_reverseHTML_entities.$newPassword);
 $hash_password=md5($newPassword); 

 $a =array('account_id','login_identity',"password","actual_input_length");
     $b =array($account_row['account_id'],$login_identity_HTML_entities,$hash_password,$actual_input_length);
     $login_id=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'login',$a,$b);
 // updateing login id in accounts


$update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'accounts',array('login_id','password'),array($login_id,$hash_password),array('account_id'),array($account_row['account_id']));


return ($update=="updated")?TRUE:FALSE;
}

/**
* @description=>perform account recovery
  @call $GLOBALS['Var_Enter']->CreateLoginSession()
* @param  => 
* @return => LoginSession_id
*/
public function CreateLoginSession($LoginData,$StaffData=array()){
 
    $password=sha1($LoginData['password']).'0'.md5($LoginData['password']);
    $staff_id=0;
    if(count($StaffData)>0){
     $password='0'.sha1($StaffData['password']).'0'.md5($StaffData['staffHash']); 

      $staff_id=GetPropertyInArray('store_staff_id',$StaffData,0);
    }

    //---
    $Flaver= COOKIES_QueryVars($GLOBALS['Var_Cookies_name']['Flaver'],'mob');
    $Flaver_id=0;//web
    switch(  $Flaver_id){
       case 'mob':
       $Flaver_id=1;//web
       break; 
    }
    //---


    $DATA=array('session_id'=>uniqueID(),
    'login_id'=>$LoginData['login_id'],
    'account_id'=>$LoginData['account_id'],
    'entity_id'=>$LoginData['entity_id'],
    'staff_id'=> $staff_id,
    'login_identity'=>$LoginData['login_identity'],
    'identity_type'=>$LoginData['identity_type'],
    'password'=> $password,
    'appFlaver_id'=>$Flaver_id,
    'loginTimestamp'=>time(),
    'lastloginTimestamp'=>time(),
    'ip_address'=>$GLOBALS['Var_ip'],
    'browserDetails'=>validate_word('HTML_entities',$_SERVER['HTTP_USER_AGENT']));

   
  $GLOBALS['Var_DBMysqli']->insert(DB_NAME,'login_session',array_keys($DATA) , array_values($DATA));

  return $DATA;
}

/**
* @description=>
  @call $GLOBALS['Var_Enter']->CreateLoginSession()
* @param  => 
* @return => 
*/

public function ParseSessionData($SesstionRow,$visitData){
   //$LoginData = GetPropertyInArray('LoginData',$SesstionRow,NULL);
 $willUpdateSessionData=FALSE;

   if($SesstionRow['entity_id']==0){
   $SesstionRow['entity_id']=$visitData['wa'];
      $willUpdateSessionData=TRUE;
   }else if( $SesstionRow['entity_id']!=$visitData['wa']){
          $SesstionRow['entity_id']=$visitData['wa'];
          $willUpdateSessionData=TRUE;
   }


   if($SesstionRow['LoginData']==NULL){
    $SesstionRow['LoginData']=$this->GetLoginData($SesstionRow['account_id']);
       $willUpdateSessionData=TRUE;
   }else{
   $SesstionRow['LoginData']= JsonTrueDecode($SesstionRow['LoginData'],array()) ;
  $SesstionRow['LoginData']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('LoginData'),$SesstionRow['LoginData']);
  
 //$SesstionRow['LoginData']['private_data']= JsonTrueDecode( $SesstionRow['LoginData']['private_data'],$GLOBALS['Var_BundlePrototype']->DefaultValue('AccountPrivate'));


   }


   if($SesstionRow['EntityData']==NULL){
    $SesstionRow['EntityData']=$this->EntityDataById($SesstionRow['account_id'],$visitData['wa']);
       $willUpdateSessionData=TRUE;
    }else{
  $SesstionRow['EntityData']= JsonTrueDecode($SesstionRow['EntityData'],array()) ;
  $SesstionRow['EntityData']=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('EntityData'),$SesstionRow['EntityData']);
    }
    //once more check
    if( $SesstionRow['EntityData']['entity_id']!=$visitData['wa']){
       $SesstionRow['EntityData']=$this->EntityDataById($SesstionRow['account_id'],$visitData['wa']);
       $willUpdateSessionData=TRUE;
    }




     if($SesstionRow['staffData']==NULL){
    $SesstionRow['staffData']=$this->StoreStaffDataById($SesstionRow['staff_id'],$SesstionRow['entity_id']);
       $willUpdateSessionData=TRUE;
   
    }else{
      $SesstionRow['staffData']= JsonTrueDecode($SesstionRow['staffData'],array()); 
      $SesstionRow['staffData']=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('storeStaff'),$SesstionRow['staffData']);
     }



     if($willUpdateSessionData){
         $this->UpdateSessionData($SesstionRow['session_id'],$SesstionRow,'all');
     }

      return   $SesstionRow;
}
/**
* @description=>
  @call $GLOBALS['Var_Enter']->UpdateSessionData($Session_id,$DATA,$how);
* @param  => 
* @return => 
*/
public function UpdateSessionData($Session_id,$DATA,$how){
    
    switch($how){
      case 'all':
      $DATA['LoginData']=Makejson($DATA['LoginData']);
     $DATA['EntityData']=Makejson($DATA['EntityData']);
     $DATA['staffData']=Makejson($DATA['staffData']);

  $GLOBALS['Var_DBMysqli']->update(DB_NAME,'login_session',array_keys($DATA),array_values($DATA),array('session_id'),array($Session_id));
      break;  

  case 'EntityData':
  $GLOBALS['Var_DBMysqli']->update(DB_NAME,'login_session',array('EntityData'),array(Makejson($DATA)),array('session_id'),array($Session_id));
     break; 

     case 'LoginPrivateData':
      $LoginData=$this->GetLoginData($DATA['LoginData']['account_id']);

       $GLOBALS['Var_DBMysqli']->update(DB_NAME,'login_session',array('LoginData'),array(Makejson($LoginData)),array('session_id'),array($Session_id));

     break;

    }

}



}









$GLOBALS['Var_Enter'] =new Enter();
//$GLOBALS['Var_ActorEntityData']=$GLOBALS['Var_Enter']->EntityData_Object(array('object_type'=>'actor'));
$GLOBALS['Var_ActorEntityData']=$GLOBALS['Var_Enter']->GetActorEntityData();
$GLOBALS['Var_LoginStatus'] =$GLOBALS['Var_ActorEntityData']['LoginStatus'];
$GLOBALS['Var_IsEntitySelected'] =($GLOBALS['Var_LoginStatus'])?( (intval($GLOBALS['Var_ActorEntityData']['LoginData']['entity_id'])==0)?FALSE:TRUE    ):FALSE;

$GLOBALS['Var_Timezone'] =Timezone::detect_timezone_id($GLOBALS['Var_ActorEntityData']['visit_data']['wh'],$GLOBALS['Var_ActorEntityData']['visit_data']['wi']);






?>