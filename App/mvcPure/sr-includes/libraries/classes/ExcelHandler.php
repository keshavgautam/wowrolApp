<?php
    


class ExcelHandler {
    

/*
@call  $GLOBALS['ExcelHandler']->validCheckFile();

*/
public function validCheckFile($file,$inputFileType){
  $valid = false;  
    /** PHPExcel_IOFactory */
require_once( INC. '/libraries/vendor/PHPExcel/PHPExcel/IOFactory.php' );

$objReader = PHPExcel_IOFactory::createReader($inputFileType);
 if ($objReader->canRead($file)) {
        $valid = true;
     
    }

return $valid;
}

/*
@call  $GLOBALS['ExcelHandler']->GetCSVArray();

*/
public function GetPHPArrayFromCSV($Uploaded_FILES,$inputFileType){
    $ret=array();
require_once( INC. '/libraries/vendor/PHPExcel/PHPExcel/Autoloader.php' );

$objReader = PHPExcel_IOFactory::createReader($inputFileType);

 if ($objReader->canRead($Uploaded_FILES['tmp_name'])) {
    $objPHPExcel = $objReader->load($Uploaded_FILES['tmp_name']);
 $Excel = $objPHPExcel->getActiveSheet()->toArray(null, true, true, true);
 $limit= $getHighestRow = $objPHPExcel->setActiveSheetIndex()->getHighestRow();

 if(count($Excel)>=2){
     
     $key_row=$Excel[1];

     for($i=2;$i<=$limit;$i++){
           $row=array();
       foreach($key_row as $x=>$y){
      if(isset($Excel[$i][$x])){
            $row[$y]=$Excel[$i][$x];
      }else{
            $row[$y]=NULL;
      }
           


        }

        $ret[]= $row;
     }



 }


       
    }



return $ret;
}



}




 $GLOBALS['ExcelHandler'] =new ExcelHandler();



?>