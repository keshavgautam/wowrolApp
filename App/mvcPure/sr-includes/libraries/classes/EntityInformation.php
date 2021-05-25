<?php
    
 /**
* @description=>Compaire two entity and gives information.
* @param  => 
* @return => 
*/   
  class EntityInformation extends EntityRelation {
    
 public $frontuser;//frontuser / profile_owner_entity_id of owner whos profile is viewed.

 public $actoruser;//actoruser /entity_id of visiter who is viewing profile.
  public $frontuser_EntityRow;
  public $actoruser_EntityRow;
 function __construct($frontuser,$actoruser) {
               $this->frontuser=$frontuser;
               $this->actoruser=$actoruser;
              $this->frontuser_EntityRow= self::GetEntityRow($this->frontuser);
              $this->actoruser_EntityRow= self::GetEntityRow($this->actoruser);
         
                parent::__construct($frontuser,$actoruser);
           }



 /**
* @description=>gives public data.
* @param  => 
* @return => 
*/
 public function EntityPublicData(){

 $Default_data=$GLOBALS['Var_BundlePrototype']->DefaultValue('');

 }

/**
* @description=>EntityStripdata.
* @param  => 
* @return => 
*/
public function EntityStripdata($EntityRow){
    $parseData=array();
 //
 $parseData= $GLOBALS['Var_ViewParse']->EntityStripdata($EntityRow);;
 

return   $parseData;
}
/**
* @description=>getentity row.
* @param  => 
* @return => 
*/
public function GetEntityRow($EntityId){


 return $GLOBALS['Var_Utility']->GetEntityRow($EntityId);
}
/**
* @description=>Parse entity Row.
* @param  => 
* @return => 
*/
public function ParseEntityRow($EntityRow){
 



 return $GLOBALS['Var_ViewParse']->ParseEntityRow($EntityRow);
}



/**
* @description=>getentity row.
* @param  => 
* @return => 
*/
public function GetLoginData($EntityId){
    

$sql='SELECT DISTINCT *
FROM  '.DB_NAME.'.account_login_identity a ,'.DB_NAME.'.accounts b,'.DB_NAME.'.login c,'.DB_NAME.'.entity d
WHERE d.entity_id='.$EntityId.'
AND a.account_id=d.account_id
AND a.account_id=b.account_id
AND b.login_id=c.login_id
LIMIT 1
';


 $accountDATA=  $GLOBALS['Var_DBMysqli']->query($sql );
  $LoginData= $accountDATA[0];
    //paring private data
  $LoginData['private_data']= JsonTrueDecode($LoginData['private_data'],$GLOBALS['Var_BundlePrototype']->DefaultValue('AccountPrivate'));
  return $LoginData;

}



}
 /**
* @description=>Compaire two entity and gives information.
* @param  => 
* @return => 
*/ 
  class DirectEntityRelation extends EntityRelation{
 public $frontuser;//frontuser / profile_owner_entity_id of owner whos profile is viewed.

 public $actoruser;//actoruser /entity_id of visiter who is viewing profile.
  public $frontuser_EntityRow;
  public $actoruser_EntityRow;
 function __construct($frontuser_EntityRow,$actoruser_EntityRow) {
               $this->frontuser=$frontuser_EntityRow['entity_id'];
               $this->actoruser=$actoruser_EntityRow['entity_id'];
              $this->frontuser_EntityRow= $frontuser_EntityRow;
              $this->actoruser_EntityRow= $actoruser_EntityRow;
                parent::__construct($this->frontuser,$this->actoruser);
           }
 }
?>