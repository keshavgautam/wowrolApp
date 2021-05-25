<?php
    
 require($_SERVER['DOCUMENT_ROOT']. '/sr-includes/sr-config.php' );

 //http://localhost:3325/sr-includes/direct_fill/fl_admin.php
 $country=array('code'=>'US','Id'=>234);

 $FLAdmin=array();
 $row = 1;
if (($handle = fopen("FirstLevalAdmin/".$country['code'].".txt", "r")) !== FALSE) {
  while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
    $num = count($data);
 
    $row++;
    for ($c=0; $c < $num; $c++) {
    
         $FLAdmin[]=$data[$c];
    }
  }
  fclose($handle);
}





  foreach($FLAdmin as $value ){
    $a =array( 'fl_admin','country_id');
    $b =array($value,$country['Id']);
     $num=$GLOBALS['Var_DBMysqli']->numrow(DB_NAME,'location_fl_admin', $a,$b);
    if($num==0){
  $accounts_id=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'location_fl_admin',$a , $b );
  echo $accounts_id;
    }
  

    }



?>