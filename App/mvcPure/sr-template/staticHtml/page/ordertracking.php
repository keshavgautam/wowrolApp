<?php
require (INC . '/libraries/vendor/Mustache/Autoloader.php');
Mustache_Autoloader::register(); 
 $m = new Mustache_Engine;
 $order=$AppData['AppView'][0];    
 $track=$order['track'];  
 









 $TemplateTrack='';

foreach($track as $value){
    
   
    if($value['rowtype']==1){
     $TeckingRow ='<div class="block bg_6 _bdy li">
    <span class="span fw-b">Updated on: {{msg}}</span>
    
    </div>';

 $TemplateTrack.= $m->render($TeckingRow , $value);   
    }else{
        
        $TeckingRow ='<div class="block _bdy b_gtl li">
    <div class="w3 t">
 
     <p>{{date}}</p>
    </div>  <div class="w9 t">
  <p>{{{msg}}}</p>
    
    </div>
    
    </div>';

 $TemplateTrack.= $m->render($TeckingRow , $value);

    }

}











 $Template='<div class="block m0_auto _bdy" style="max-width: 1000px;"><div class="block ">
    <div class="block _bdy ">
      <h4>Order tracking Detail</h4>
   </div>
    <div class="block _bdy "> <div class="ul ul-menu">
 
  <div class="li ma-l-4">Order ID</div> <div class="li ma-l-8 fw-b tt-c">{{oid}}</div> 
  <div class="li fw-b ">&nbsp; |&nbsp; </div>
   <div class="li ma-l-4">Ordered on</div> <div class="li ma-l-8 fw-b tt-c">{{date}}</div> 

  </div></div>
  <div class="block _bdy ">
   <div class="left">
      <div class="ul ul-menu">
           <div class="li "><a class="wbk" href="'.SITEURL.'" title="Go to Wowrol">Wowrol</a></div>
         <div class="li fw-b ">&nbsp; |&nbsp; </div>
      
          <div class="li "><a class="wbk" href="javascript:void(0);" title="Go Back" onclick=" window.history.back();" >Go Back</a></div>

      </div>
   </div>
     <div class="right">
      <div class="ul ul-menu"> 
   
     <div class="li "><a class="wbk" href="javascript:void(0);" title="Print " onclick="window.print();">Print </a></div>
<div class="li fw-b ">&nbsp; |&nbsp; </div>
       <div class="li "><a class="wbk" href="'.SITEURL.'orderdetails?id={{oid}}"" title="View Order Details">View Order Details</a></div>
      
       </div>
      </div>

</div>
   <div class="block ul bg_0 _B-gray">'. $TemplateTrack.'</div></div>';





echo $m->render($Template,  $order); 
?>