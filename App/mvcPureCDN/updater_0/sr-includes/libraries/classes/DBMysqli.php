<?php
   /**
* @description=>Create the default activity property, access, Meta data, and all other property that will needed in future.
* @param  => [string($GLOBALS['Var_path'])]]
* @return => 
*/
class DBMysqli{

  protected $connection=NULL;

/**
* @description=>Create mysqli connection.
* @param  => 
* @return => [object($conn)]];
*/  
public function conn() {
    
    if($this->connection==NULL){
        set_time_limit(300);
$conn= mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
if(!$conn){
    
 //header('Location:'.SITEURL.'busy');
 $this->TellUsError($conn);

 //require(TEMPLATE. '/staticHtml/page/500errorPage.php' );
exit();
}

 $conn->query("SET NAMES 'utf8'");


$this->connection= $conn;
    }





         return  $this->connection;
         
  }
/**
* @description=>check Num row.
* @param  => 
* @return => [bool()]];
*/
 public function numrow($db,$table , $where_col_name,$where_col_value){
      $conn=$this->conn();
        $c = $where_col_name;
$d = $where_col_value;
$wheres = array();
 

for($w=0;$w<count($c);$w++){
    
   $wheres[$w] =$c[$w]."="."'".$d[$w]."'";
  
}

$sql = "SELECT COUNT(*) FROM `$db`.`$table` WHERE " . implode( ' AND ', $wheres );

 $query = mysqli_query($conn,$sql);
  if(! $query ){
      if(SERVER_MODE=="DEVELOPMENT"){
           $sq=   var_dump(mysqli_error ($conn)  );
         

      }else{
         $sq=   0; 

      }
        
            }   else{
              $MYSQLI_NUM=mysqli_fetch_array($query, MYSQLI_NUM);
                $sq = intval($MYSQLI_NUM[0]);
            }   
        

      return $sq;
  }
    /**
* @description=>insert .
* @param  => 
* @return => [bool()]];
*/
 public function insert($db,$table,$col_name , $col_value ){
   $conn=$this->conn();
   
    $type = 'INSERT';
    $fields=$col_name ;
    $formatted_fields=$col_value;
  $conn->set_charset("utf8");
$sql = "{$type} INTO `$db`.`$table` (`" . implode( '`,`', $fields ) . "`) 
VALUES ('" . implode( "','", $formatted_fields ) . "')";


 $query = mysqli_query($conn,$sql);
  if(! $query ){
        if(SERVER_MODE=="DEVELOPMENT"){
           $sq=   var_dump(mysqli_error ($conn)  );
         

      }else{
       $sq=   FALSE;  

      }
               
            }   else{

                $sq= mysqli_insert_id($conn);
              
            }   
        
 return $sq ;
}
/*
*   $accountOptionName=array('option_name','option_value');
     $accountOptionValue=array(array('activation_key',$activation_key));
     $accountOption=$GLOBALS['Var_DBMysqli']->bulk_insert(DB_NAME,'account_options',$accountOptionName,$accountOptionValue);
*/
 public function bulk_insert($db,$table,$col_name , $col_value ){
   $conn=$this->conn();
   
    $type = 'INSERT';
    $fields=$col_name ;
    $formatted_fields=array();
    foreach($col_value   as $value){
       $formatted_fields[]="('" . implode( "','", $value) . "')";

    }
    

  $conn->set_charset("utf8");
$sql = "{$type} INTO `$db`.`$table` (`" . implode( '`,`', $fields ) . "`) 
VALUES " . implode( ",", $formatted_fields ) . "";

    
 $query = mysqli_query($conn,$sql);
  if(! $query ){
               if(SERVER_MODE=="DEVELOPMENT"){
           $sq=   var_dump(mysqli_error ($conn)  );
         check_response($sql)    ; 

      }else{
       $sq=   FALSE;  

      }
          
            }   else{
                $sq= "ok";
            }   
        
 return $sq ;
}
 public function update($db,$table, $set_col_name , $set_col_value, $where_col_name,$where_col_value ){
     $conn=$this->conn();

    $a = $set_col_name ;
$b = $set_col_value;
$c = $where_col_name;
$d = $where_col_value;
$bits = $wheres = array();
for($w=0;$w<count($a);$w++){
    
   $bits[$w] =$a[$w]."="."'".$b[$w]."'";
 
}

for($w=0;$w<count($c);$w++){
    
   $wheres[$w] =$c[$w]."="."'".$d[$w]."'";
   
}
    $conn->set_charset("utf8");
    
     $sql = "UPDATE `$db`.`$table` SET " . implode( ', ', $bits ) . ' 
     WHERE ' . implode( ' AND ', $wheres );
     $query = mysqli_query($conn,$sql);
  if(! $query ){
              if(SERVER_MODE=="DEVELOPMENT"){
           $sq=   var_dump(mysqli_error ($conn)  );
         

      }else{
       $sq=   FALSE;  

      }      
            }   else{
                $sq= "updated";
            }   
        
 return $sq ;

}
  public function delete($db,$table, $where_col_name,$where_col_value){
   $conn=$this->conn();
    $c = $where_col_name;
$d = $where_col_value;
$wheres = array();


for($w=0;$w<count($c);$w++){
    
   $wheres[$w] =$c[$w]."="."'".$d[$w]."'";
   
}

$sql = "DELETE FROM `$db`.`$table` WHERE " . implode( ' AND ', $wheres );

 $query = mysqli_query($conn,$sql);
  if(! $query ){
              if(SERVER_MODE=="DEVELOPMENT"){
           $sq=   var_dump(mysqli_error ($conn)  );
         

      }else{
       $sq=   FALSE;  

      }    
            }   else{
                $sq= 1;
            }   
        
 return $sq ;
}
 public   function getrow($db,$table , $where_col_name,$where_col_value){
      $conn=$this->conn();
        $c = $where_col_name;
$d = $where_col_value;
$wheres = array();


for($w=0;$w<count($c);$w++){
    
   $wheres[$w] =$c[$w]."="."'".$d[$w]."'";
   
}

$sql = "SELECT * FROM `$db`.`$table` WHERE " . implode( ' AND ', $wheres );

 $query = mysqli_query($conn,$sql);
  if(! $query ){
                 if(SERVER_MODE=="DEVELOPMENT"){
           $sq=   var_dump(mysqli_error ($conn)  );
         

      }else{
       $sq=   FALSE;  

      } 
            }   else{
                $sq = mysqli_fetch_array($query, MYSQLI_ASSOC);
                 // Free result set
            mysqli_free_result($query); 
            }   
     
         
      return $sq;
  }


    /**
  *custom query
  */
  public function query($sql ){
       $conn=$this->conn();
      $query = mysqli_query($conn,$sql);
  if(! $query ){
              if(SERVER_MODE=="DEVELOPMENT"){
           $sq=   var_dump(mysqli_error ($conn)  );
 var_dump($sql  );
       check_response($sql)    
;  exit();
      }else{
       $sq=   FALSE;  
           exit();
      }  
            
            }   else{
                
                $sq1 = array();
while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC)) {
  $sq1[]=$row;

}   

}
        

      
          
   return $sq1 ; 

  }


 /**
  *custom num query
*$sql = "SELECT COUNT(*) FROM `$db`.`$table` WHERE " . implode( ' AND ', $wheres );
  */
  public function numquery($sql){
      $conn=$this->conn();  


 $query = mysqli_query($conn,$sql);
  if(! $query ){
      if(SERVER_MODE=="DEVELOPMENT"){
           $sq=   var_dump(mysqli_error ($conn)  );
         

      }else{
         $sq=   0; 

      }
        
            }   else{
              $MYSQLI_NUM=mysqli_fetch_array($query, MYSQLI_NUM);
                $sq = intval($MYSQLI_NUM[0]);
            }   
        

      return $sq;

  }

    /**
  
  */
  public function TellUsError($conn){
      if(SERVER_MODE=="DEVELOPMENT"){

        if ($conn === false) {
            $conn = null;
        }

             if (null !== $conn) {
            $error_number = mysqli_errno($conn);
            $error_message = mysqli_error($conn);
        } else {
            $error_number = mysqli_connect_errno();
            $error_message = mysqli_connect_error();
        }

        printf("HTTP_HOST: %s\n",  $_SERVER['HTTP_HOST'] );
            printf("user: %s\n",  DB_USER );
            printf("Connect failed: %s\n",  $error_message );
             printf("Errorcode: %d\n", $error_number);
      }
  }


} 

$GLOBALS['Var_DBMysqli'] =new DBMysqli();
$GLOBALS['Var_conn'] =$GLOBALS['Var_DBMysqli']->conn();

?>