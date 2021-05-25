<?php
    
class    Comet{
 /*
@call  $GLOBALS['Var_Comet']->Time_shortner()
@des Sleep  

*/
 public function Time_shortner(){
      $one_year=60*60*24*30*12;

      return time ()-$one_year;
 }
    
/*
@call  $GLOBALS['Var_Comet']->GetCurrrentModified($objectId,$objectType)
@des Sleep  

*/
public function GetCurrrentModified($objectId,$objectType){
       $fileame=COMET_DIR.'/data_'.$objectId.'_'.$objectType.'.txt';
       $currentModif=time();
         if(file_exists( $fileame)){
    $currentModif= filemtime($fileame);  clearstatcache();
         }

         return    $currentModif;
}
    
/*
@call  $GLOBALS['Var_Comet']->BulkGetCurrrentModified($objectId,$objectType)
@des Sleep  

*/
public function  BulkGetCurrrentModified ($objectId_arr,$objectType){
 $currentModif_arr= array();$one_year=$this->Time_shortner();
     foreach($objectId_arr as $id){
      $fileame=COMET_DIR.'/data_'.$id.'_'.$objectType.'.txt';
           if(file_exists( $fileame)){
          
               $currentModif_arr[]= filemtime( $fileame);  clearstatcache();
            
           }else{
               $currentModif_arr[]=time();
                  fopen($fileame, 'w'); 
           }
     
     }
     return $currentModif_arr;
}

public function BulkGetCurrrentModified_check ($objectId_arr,$objectType,$lastmodif){

    $isModified=FALSE;  $CurrrentModified=time();
     foreach($objectId_arr as $id){
       $fileame=COMET_DIR.'/data_'.$id.'_'.$objectType.'.txt';    
         if(file_exists( $fileame)){
          
           $CurrrentModified= filemtime( $fileame);  clearstatcache();
            
           }else{
            $CurrrentModified=time();
                  fopen($fileame, 'w'); 
           }
//--
if($CurrrentModified>$lastmodif){
      $isModified=TRUE;
      break;
}


     }

    $ret =array('isModified'=> $isModified,'CurrrentModified'=>$CurrrentModified,'lastmodif'=>$lastmodif);

    return $ret;
}

/*
@call  $GLOBALS['Var_Comet']->Sleep($objectId,$objectType)
@des Sleep  

*/

public function Sleep($objectId,$objectType,$lastmodif){
    $fileame=COMET_DIR.'/data_'.$objectId.'_'.$objectType.'.txt';
    $currentModif=$lastmodif;
    if(file_exists( $fileame)){
     $lastmodif=($lastmodif==0)?$this->GetCurrrentModified($objectId,$objectType):$lastmodif;   

$currentModif= filemtime( $fileame);
$wait=60;
$start=time()+$wait;
while ($currentModif <=$lastmodif){
    usleep(10000);
    clearstatcache();
$currentModif= filemtime($fileame);
  clearstatcache();
$end=time();
if($end>$start){
    $currentModif=$end;
}
}


    }else{
       fopen($fileame, 'w');
        $this->Sleep($objectId,$objectType,$lastmodif);
    }

    return array('timenode'=>$currentModif,'difference'=>($currentModif-$lastmodif));
}

/*
@call  $GLOBALS['Var_Comet']->Update($objectId,$objectType)
@des Sleep  

*/
public function Update($objectId,$objectType){
    
      $fileame=COMET_DIR.'/data_'.$objectId.'_'.$objectType.'.txt';
    if(file_exists( $fileame)){
   file_put_contents( $fileame,time());  

   
    }else{
     
 fopen($fileame, 'w');
        $this->Update($objectId,$objectType);
    }


}


/*
@call  $GLOBALS['Var_Comet']->BulkSleep($objectId,$objectType)
@des Sleep  

*/
public function BulkSleep($objectId_arr,$objectType,$lastmodif_arr,$wait){
 $one_year=$this->Time_shortner();
 $filename_arr= array();
  $wait=(isset($wait))?$wait:65;

  
$Modified_check=$this->BulkGetCurrrentModified_check($objectId_arr,$objectType,$lastmodif_arr[0]);
$lastmodif =$Modified_check['lastmodif'];  
$currentModif=$Modified_check['CurrrentModified'];  


//$wait=60;
$start=time()+$wait;$end=time();

   //  check_response( ' $wait= '.$wait);

while ($currentModif <=$lastmodif){
    usleep(10000);
    clearstatcache();
$Modified_check=$this->BulkGetCurrrentModified_check($objectId_arr,$objectType,$lastmodif);
$lastmodif =$Modified_check['lastmodif'];  
$currentModif=$Modified_check['CurrrentModified']; 
//check_response($Modified_check); 
 // check_response(($currentModif <=$lastmodif));
 // check_response('difference = '.$currentModif .' - '.$lastmodif.'= '.($currentModif - $lastmodif));
$end=time();
if($end>$start){
   
    $currentModif=100;
   $lastmodif=90;
  
}

if(!($currentModif <=$lastmodif)){
  //check_response(($currentModif <=$lastmodif));  check_response($currentModif); check_response( $lastmodif);
  //check_response('difference = '.$currentModif .' - '.$lastmodif.'= '.($currentModif - $lastmodif));
}


 
}




 $currentModif=$lastmodif_arr[0];
 

return  $currentModif;

}




}








$GLOBALS['Var_Comet']=new Comet();








?>