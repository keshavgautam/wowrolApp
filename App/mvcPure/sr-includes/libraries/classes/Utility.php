<?php
  
  
/**
* @description=>collection of Utility function .
* @param  => 
* @return => 
*/    
class Utility{

/**
* @description=>set a account option or update it.
* @param  => 
* @return => key-value paire Account option
*/ 
public function SetAccountOptions($AccountId,$SavedOptions,$option_name,$option_value){

   $defaultPrivate=$SavedOptions;

    $private_data=True_array_merge($defaultPrivate,array($option_name=>$option_value));
   
 $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'accounts',array('private_data'),array(Makejson($private_data)),array('account_id'),array($AccountId));

}



/**
* @description=>Get the entity list of account
* @param  => 
* @return => 
*/

public function AccountEnetityData(){
  $ActorEntityData=$GLOBALS['Var_ActorEntityData'];   
  $EnetityData=array();

//--retriving from the  data base

$sql='
SELECT  *  FROM '.DB_NAME.'.entity a
WHERE a.account_id = '.$ActorEntityData['LoginData']['account_id'].'

';

  //-- result query
$Entity_List=array();
  $query = mysqli_query($GLOBALS['Var_conn'],$sql); 
  if( $query ){


  while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC)) {
 $Entity_List[]=$row;
   
}   
  }else{
        var_dump(mysqli_error ($GLOBALS['Var_conn'])  );
  } 
  

   //-->>result query
   
   for($i=0;$i<count($Entity_List);$i++){
      $EnetityData[$i]['entity_id']=$Entity_List[$i]['entity_id'];
      $EnetityData[$i]['type']=$Entity_List[$i]['type'];
      if($Entity_List[$i]['type']==0){
         $EnetityData[$i]['publicInfo']=JsonTrueDecode($Entity_List[$i]['public_data'],$GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic'));  
      }
       if($Entity_List[$i]['type']==1){
         $EnetityData[$i]['publicInfo']=JsonTrueDecode($Entity_List[$i]['public_data'],$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPublic'));  
      }


   }


   return $EnetityData;
}


/**$GLOBALS['Var_Utility']->TimezoneDate();
* @description=>Get the entity list of account
* @param  => 
* @return => 
*/
public function TimezoneDate(){
     $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
$zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
  
   return zonedate($zone);
}
/** $GLOBALS['Var_Utility']->AutherInfo()
* @description=>Get the auther from the entity row
* @param  => 
* @return => {auther =>'',
              type=>0|1; 0=>owner,1 =>staff
              time=>''
              action=>0|1; 0=>created,1 =>edited
              }
*/
public function AutherInfo($action,$ActorEntityData,$AutherInfo){
   $info=array('author'=>'',
                'type'=>0,
                'time'=>0,
                'action'=>$action
                );
if(intval($ActorEntityData['visit_data']['wj'])!=0){
    $info['type']=1;
    $info['author']=$ActorEntityData['staffData']['username'];
}

 $zone=Timezone::detect_timezone_id($ActorEntityData['visit_data']['wh'],$ActorEntityData['visit_data']['wi']);
   $date=zonedate($zone);
 $info['time']=$date;

$AutherInfo[]=   $info;
return Makejson($AutherInfo);
}

/**$GLOBALS['Var_Utility']->GetFilterAttributesId($FilterArray);
* @description=>Get the entity list of account
* @param  => 
* @return => 
*/
public function GetFilterAttributesId($FilterArray){
    $Ids=array();
    $Filters=array();
    foreach($FilterArray as $key=>$value ){
        if($value['name']!=''&&$value['value']!=''){
            
 $get_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'filter_attributes',array('name','value'),array($value['name'],$value['value']));

      if($get_row!=NULL){
      $Ids[]= $get_row['filter_attributes_id'];
     $value['filter_attributes_id']= $get_row['filter_attributes_id'];

      }else{
      $filter_attributes_id= $GLOBALS['Var_DBMysqli']->insert(DB_NAME,'filter_attributes',array('name','value'),array($value['name'],$value['value']));     
      $Ids[]= $value['filter_attributes_id']= $filter_attributes_id;
      }

       $Filters[]=$value;
        }
  

    }

    return  array('id'=>$Ids,'Filters'=>$Filters);
}

}


$GLOBALS['Var_Utility'] =new Utility();
?>