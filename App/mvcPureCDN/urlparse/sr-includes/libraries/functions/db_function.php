<?php
    

/**
* @description=>uniqueID gives uniquc id.
* @searial => a  [1 - ]
* @param  => 
* @return => 
*/
function uniqueID(){
    global $sr_db;
    $PHP_uniquid=uniqid();
     $auto_id=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'uniqid', array('random'), array($PHP_uniquid));
   $Delete_row=$GLOBALS['Var_DBMysqli']->delete(DB_NAME,'uniqid', array('autoid'), array($auto_id));
   return 'a'.$auto_id.'0'.$PHP_uniquid;



}

/**
*@description=>check input value in database 
* unique or notunique
*/
function is_unique($table,$para_name,$pera_value){
   

    $a=array($para_name);
    $b=array($pera_value);
    
    $num=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,$table , $a,$b);
    if($num<1){
        $retern=TRUE;

    }else{
         $retern=FALSE; 
    }
    return $retern;
}



/**
*@description=> check  value in database 
* exists or notexist
*/
function is_exist($table,$para_name,$pera_value){
    global $sr_db;

    $a=array($para_name);
    $b=array($pera_value);
    
    $num=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,$table , $a,$b);
    if($num>0){
        $retern=TRUE;

    }else{
         $retern=FALSE; 
    }
    return $retern;
}



?>