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

    $EntityRow=$GLOBALS['Var_BundlePrototype']->DefaultValue('EntityData');
    $EntityRow['public_data']= array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic'),$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPublic'));
    $EntityRow['private_data']= array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate'),$GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPrivate'));

    if($EntityId!=0){
           $sql='SELECT DISTINCT *
FROM '.DB_NAME.'.entity a,'.DB_NAME.'.page_slug b
WHERE a.entity_id='.$EntityId.'
AND  CAST(b.object_id As SIGNED) =a.entity_id 
AND (b.object_type="buyer"||b.object_type="store")
LIMIT 1
';
//-- result query
 
  $query = mysqli_query($GLOBALS['Var_conn'],$sql); 
  if( $query ){


  while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC)) {
  $EntityRow=$row;
   
}   
  } 
  
  
 //-->>result query
 
 //buyer
 if($EntityRow['type']==0){
  $EntityRow['public_data']= JsonTrueDecode($EntityRow['public_data'],array()) ; 
  $EntityRow['public_data']=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPublic'), $EntityRow['public_data']);

  $EntityRow['private_data']= JsonTrueDecode($EntityRow['private_data'],array()) ; 
  $EntityRow['private_data']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('BuyerPrivate'), $EntityRow['private_data']);
 }
 //store
  if($EntityRow['type']==1){
  $EntityRow['public_data']= JsonTrueDecode($EntityRow['public_data'],array()) ; 

  $EntityRow['public_data']=True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('StorePublic'),$EntityRow['public_data']);

  $EntityRow['private_data']= JsonTrueDecode($EntityRow['private_data'],array()) ; 

  $EntityRow['private_data']=True_array_merge($GLOBALS['Var_BundlePrototype']->DefaultValue('StorePrivate'), $EntityRow['private_data']);

 }

$EntityRow=$this->ParseEntityRow($EntityRow);



    }//EntityId!=0
      

 



 return $EntityRow;
}
/**
* @description=>Parse entity Row.
* @param  => 
* @return => 
*/
public function ParseEntityRow($EntityRow){
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
    


 return $EntityRow;
}



/**
* @description=>getentity row.
* @param  => 
* @return => 
*/
public function GetLoginData($EntityId){
    
    $sql='SELECT DISTINCT *
FROM '.DB_NAME.'.accounts a,'.DB_NAME.'.entity b
WHERE b.entity_id='.$EntityId.'
AND a.account_id=b.account_id
LIMIT 1
';
 $accountDATA=  $GLOBALS['Var_DBMysqli']->query($sql );
  $LoginData= $accountDATA[0];
    //paring private data
  $LoginData['private_data']= JsonTrueDecode($LoginData['private_data'],$GLOBALS['Var_BundlePrototype']->DefaultValue('AccountPrivate'));
  return $LoginData;

}



}

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