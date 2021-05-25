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
* @description=>gives default entity data.
* @param  => [array($args)]]
* @return => 
*/
public function EntityData_Object($args=array()){
    
 $entity_data=$this->DefaultEntityData();

 switch($args['object_type']){
     case 'actor':
     //--collecting cooikes
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
//has accouunt row
  $hasAccountrow=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'accounts',array('account_id'),array($visitData['wb']));
  $LoginData=$GLOBALS['Var_BundlePrototype']->DefaultValue('LoginData');

    //check post 1
       if($hasAccountrow>0){
$sql='SELECT DISTINCT *
FROM '.DB_NAME.'.accounts a,'.DB_NAME.'.login b
WHERE a.account_id='.$visitData['wb'].'
AND b.login_id=a.login_id
LIMIT 1
';
 $accountDATA=  $GLOBALS['Var_DBMysqli']->query($sql );
 $LoginData= $accountDATA[0];
   //paring private data
  $LoginData['private_data']= JsonTrueDecode($LoginData['private_data'],$GLOBALS['Var_BundlePrototype']->DefaultValue('AccountPrivate'));
           
  
   $entity_data['LoginData']= $LoginData;
   // entity id

   $entity_data['LoginData']['entity_id']=$visitData['wa'];

  $entity_data['EntityData']= $this->EntityDataById($visitData['wb'],$visitData['wa']);
   $entity_data['staffData']=$this->StoreStaffDataById($visitData['wj'],$visitData['wa']);


   if($this->CheckLoginStatus($visitData,$LoginData,$entity_data['EntityData'], $entity_data['staffData'])){

 $entity_data['LoginStatus']=TRUE;

 $entity_data['verified']=intval($LoginData['verified']);



 

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





    break;
     
    default:

 }

 $entity_data['visit_data']=$visitData;


// check_response($entity_data);
 return $entity_data;
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
$hash = $hasher->HashPassword(sha1($LoginData['password']).'0'.md5($LoginData['ajax_password'])); 
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
SELECT  *  FROM '.DB_NAME.'.entity a
WHERE a.entity_id = '.$entity_id.'
AND a.account_id = '.$account_id.'
LIMIT 1
';

  //-- result query

 
   $DATA=  $GLOBALS['Var_DBMysqli']->query($sql );
   $Entity_List=$DATA[0];
   //-->>result query

   $EnetityData['entity_id']=$Entity_List['entity_id'];
      $EnetityData['type']=$Entity_List['type'];
      if($Entity_List['type']==0){
     
     $EnetityData['public_data']= JsonTrueDecode($Entity_List['public_data'],array()) ; 
  $EnetityData['public_data']=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPublic'), $EnetityData['public_data']);

  $EnetityData['private_data']= JsonTrueDecode($Entity_List['private_data'],array()) ; 
 $EnetityData['private_data']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPrivate'),  $EnetityData['private_data']);

      }
     if($Entity_List['type']==1){
      
         

 $EnetityData['public_data']= JsonTrueDecode( $Entity_List['public_data'],array()) ; 

  $EnetityData['public_data']=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic'), $EnetityData['public_data']);


  $EnetityData['private_data']= JsonTrueDecode( $Entity_List['private_data'],array()) ; 
   
 $EnetityData['private_data']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate'), $EnetityData['private_data']);         
               
                
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
   if($visitData['wd']==$LoginData['private_data']['visitId']){// we  try to match visited id of entity saved and viste data
        $IsOwner=TRUE; 
         
     }   
     
     
    }


    return $IsOwner;


}

/**
* @description=>perform account recovery
* @param  => 
* @return => 
*/


public function SetUpAccountRecovery($account_row){
    
    
    $account_id=$account_row['account_id'];

        //--
    $recovery_varification_code=generate_random_string( 6,TRUE ,TRUE ,FALSE, FALSE ) ;
    $recovery_varification_access_key=generate_random_string( 20,TRUE ,TRUE ,FALSE, FALSE ) ;
    $recovery_varification_time=time() ;

    $NewOptions=array( 
     'recovery_code' =>  $recovery_varification_code,
    'recovery_access' =>  $recovery_varification_access_key,
    'recovery_time' =>$recovery_varification_time);

 $defaultPrivate=$GLOBALS['Var_BundlePrototype']->DefaultValue('AccountPrivate');
 $accountPrivate=JsonTrueDecode($account_row['private_data'], $defaultPrivate) ; 



 $GLOBALS['Var_Utility']->SetAccountOptionsbyArray($account_id, $accountPrivate,$NewOptions);



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




}
$GLOBALS['Var_Enter'] =new Enter();
$GLOBALS['Var_ActorEntityData']=$GLOBALS['Var_Enter']->EntityData_Object(array('object_type'=>'actor'));
$GLOBALS['Var_LoginStatus'] =$GLOBALS['Var_ActorEntityData']['LoginStatus'];
$GLOBALS['Var_Timezone'] =Timezone::detect_timezone_id($GLOBALS['Var_ActorEntityData']['visit_data']['wh'],$GLOBALS['Var_ActorEntityData']['visit_data']['wi']);

?>