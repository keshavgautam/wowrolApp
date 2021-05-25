<?php
    

$SiteMap=$AppData['AppView'];

$Template='<div class="block">';

foreach($SiteMap as $key=>$value){
  
    if(isset($value['url'])){
   $Template.='<a class="block w3 col3 _Bdy" href="'.$value['url']['loc'].'"  >'.$value['url']['loc'].'</a>';     
    }

    
}

$Template.='</div>';

echo $Template; 
?>