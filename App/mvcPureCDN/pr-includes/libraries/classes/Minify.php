<?php
    


class    Minify{
   
   
   /*
 *@call   $GLOBALS['Var_Minify']->GET_MINFIED_FILE($res);
* @description=>
* @param  => 
* @return => 
*/
function GET_MINFIED_FILE($res){
  $script_out='';
 $ASSETS_JSON_DATA_FILE=ASSETS_JSON_DATA.'assets_data.json';

  if(is_readable( $ASSETS_JSON_DATA_FILE)){
    $assets_data = json_decode(file_get_contents( $ASSETS_JSON_DATA_FILE), true);     

 if(is_array($assets_data)){
         
       if(isset($assets_data[$res] )){
         $res_data=$assets_data[$res];  
      
          foreach($res_data as $p => $file_data){
    $file_data['path'] =ROOT .$file_data['path'];

    $file_data['minify_path'] =ASSETS_MINIFED .$file_data['U_name'];
    
       if( is_readable($file_data['path'])){
        $Savedfile_time=$GLOBALS['Var_Minify']->GetASSETS_MODIFY_TIME($file_data['U_name']);   
      
     $file_time=filemtime($file_data['path']);  clearstatcache();
     $file_data['time'] = $file_time;

     if(  $file_time>=$Savedfile_time){
          $this->CreateMinifedFile($file_data);
     }
       
  $script_out.= get_file( $file_data['minify_path']);
  $script_out.=' ; ';
  /* $script_out.=  ((  $file_time>$Savedfile_time)?1:0);
      $script_out.=  ' '.$file_time.'>'.$Savedfile_time.'';*/
    
      $res_data[$p] = $file_data;

       }
    
    
    
    }
         
         
        $assets_data[$res]= $res_data;
         }


 }

 $this->SaveASSETS_MODIFY_TIME( $assets_data);
  }   

   
   


   return  $script_out;

  } 


     



/*
* @call   $GLOBALS['Var_Minify']->GetASSETS_MODIFY_TIME($res);
* @description=>
* @param  => 
* @return => 
*/
function GetASSETS_MODIFY_TIME($file_name){
    $ret=100;
      $ASSETS_MODIFY_TIME_FILE=ASSETS_JSON_DATA.'assets_Modify_Time.json';
      $assets_MODIFY_TIME = json_decode(file_get_contents( $ASSETS_MODIFY_TIME_FILE), true);   
      if(is_array(  $assets_MODIFY_TIME)){
          if(isset( $assets_MODIFY_TIME[$file_name])){
              $ret=$assets_MODIFY_TIME[$file_name];    
          }
      }


return $ret;
}

/*
* @call   $GLOBALS['Var_Minify']->CreateMinifedFile($res);
* @description=>
* @param  => 
* @return => 
*/
function SaveASSETS_MODIFY_TIME( $assets_data){
    $ASSETS_MODIFY=array();
      $ASSETS_MODIFY_TIME_FILE=ASSETS_JSON_DATA.'assets_Modify_Time.json'; 
          $assets_MODIFY_TIME = json_decode(file_get_contents( $ASSETS_MODIFY_TIME_FILE), true);  

    foreach( $assets_data as $res){
        if(is_array($res)){
                foreach( $res as $file){
     $ASSETS_MODIFY[$file['U_name']]=$file['time'];
                    }
        }
    }

   $ASSETS=$this->True_array_extend($assets_MODIFY_TIME,$ASSETS_MODIFY);
//  $ASSETS= True_array_merge($ASSETS_MODIFY,$assets_MODIFY_TIME);
    file_put_contents( $ASSETS_MODIFY_TIME_FILE, json_encode($ASSETS));

}



/*
* @call   $GLOBALS['Var_Minify']->CreateMinifedFile($res);
* @description=>
* @param  => 
* @return => 
*/
function CreateMinifedFile($file_data){

    $file_content='';
    if(SERVER_MODE=='DEVELOPMENT'){
      $file_content= get_file($file_data['path']);    
    }else{
      if($file_data["type"]=="css"){
    $minifier =new Minify\CSS(get_file($file_data['path']));   
   $file_content= $minifier->minify();
    }

    if($file_data["type"]=="js"){
    $minifier =new Minify\JS(get_file($file_data['path']));   
   $file_content= $minifier->minify();
    } 
    }
  

  
  

    $handle=fopen($file_data['minify_path'], "w"); 
    fwrite($handle, $file_content); 
    fclose($handle);

}


/**
* @description=>array merge.
* @param  => [array($array2)=>default,array($array1)=>Saved in databse]
* @return => [array()]
*/
function True_array_extend($array1,$array2){
$ret=array();
 

      if(is_array($array1)&&is_array($array2)){
          
          foreach ($array1 as $name=>$value){
              
              if(isset($array2[$name])){
                  if($array2[$name]!=0){
                 $ret[$name] =$array2[$name];
              }else{
                      $ret[$name] =$value;
              }
              }else{
                      $ret[$name] =$value;
              }

          }


                 foreach ($array2 as $name=>$value){
              
              if(!isset($array1[$name])){
                 $ret[$name] =$value;
              }

          }


      }
        

 
    
  

  return $ret;
} 

}

$GLOBALS['Var_Minify']=new Minify();


?>