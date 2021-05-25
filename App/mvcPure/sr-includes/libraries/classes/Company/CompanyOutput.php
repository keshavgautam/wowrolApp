<?php
    









 class CompanyOutput {
     

   function __construct($Store_id) {
               $this->Store_id=$Store_id;

             } 

/**
* @description=> return StoreMenu.
* @param  => 
* @return => 
*/
public function GetCompanyMenu($StoreEntityRow){


 $storemenu=array();
    $TableCode=0;
  if(isset($StoreEntityRow['EntityData']['private_data']['store_menu_table_code'])){
        $TableCode=$StoreEntityRow['EntityData']['private_data']['store_menu_table_code'];
  }
  $TableName='store_menu_'.$TableCode;



   $result=$GLOBALS['Var_DBMysqli']->query('SELECT * FROM '.DB_NAME_UTILITY_0.'.'. $TableName.'  a
   WHERE a.store_id = '.$this->Store_id.'
    ');
   if(count($result)>0){
 
        for($i=0;$i<count($result);$i++){
    unset($result[$i]['store_menu_row_id']);
 if( $result[$i]['parent']==''){
     $result[$i]['parent']=NULL;

 }
  $storemenu[]= $result[$i];


        }
 
    }

return  $storemenu;
}


/*
*/
public function  ParseBrandInfo($Fields,$args=array()){
       
          

 return $GLOBALS['Var_Company_Dashboard'] ->ParseBrand($Fields,array('mode'=>'public'));
    
 }


 }




?>