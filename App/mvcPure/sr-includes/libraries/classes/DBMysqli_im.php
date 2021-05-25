<?php
    
   /**
* @description=>used for update to instant updater server
@call   $DB= new DBMysqli_im(,,,);
* @param  => 
* @return => 
*/
class DBMysqli_im{
     
       function __construct($DB_HOST,$DB_USER,$DB_PASSWORD,$DB_NAME) {
               $this->DB_HOST=$DB_HOST;
               $this->DB_USER=$DB_USER;
               $this->DB_PASSWORD=$DB_PASSWORD;
               $this->DB_NAME=$DB_NAME;
              
             }  


 /**
* @description=>Create mysqli connection.
* @param  => 
* @return => [object($conn)];
*/  
public function conn() {
set_time_limit(300);
$conn= mysqli_connect($this->DB_HOST, $this->DB_USER, $this->DB_PASSWORD,$this->DB_NAME);
if(!$conn){
    
 header('Location:'.SITEURL.'busy');
exit();
}

 $conn->query("SET NAMES 'utf8mb4'");

         return $conn;
         
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

    /**
* @description=>insert .
* @param  => 
* @return => [bool()]];
*/
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

}












?>