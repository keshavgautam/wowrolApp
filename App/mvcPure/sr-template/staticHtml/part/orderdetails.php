<?php
    



 

$Title='<div class="block "><div class="block _bdy "><h2>Order Detail</h2></div>
 <div class="block _bdy "> <div class="ul ul-menu">
 
  <div class="li ma-l-4">Order ID</div> <div class="li ma-l-8 fw-b tt-c">{{oid}}</div> 
  <div class="li fw-b ">&nbsp; |&nbsp; </div>
   <div class="li ma-l-4">Ordered on</div> <div class="li ma-l-8 fw-b tt-c">{{date}}</div> 

  </div></div>
 </div>
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
     <div class="li "><a class="wbk" href="'.SITEURL.'orderdetails?id={{oid}}&action=printshippinglable" title="Print Shipping Lable"> Shipping Lable</a></div>
<div class="li fw-b ">&nbsp; |&nbsp; </div>
     <div class="li "><a class="wbk" href="javascript:void(0);" title="Print " onclick="window.print();">Print </a></div>
<div class="li fw-b ">&nbsp; |&nbsp; </div>
       <div class="li "><a class="wbk" href="'.SITEURL.'ordertracking?id={{oid}}"" title="Download as Pdf">View Tracking</a></div>
      
       </div>
      </div>
 </div>
 
 ';

 $addrName=($order['type']==0)?'Shipping Address':'Pick Up  Address' ;
$Lable_col1='<div class="block w4 col4  ">
<div class="block _bdy fg_5 ff_3">
    <h4>
      '. $addrName.'
    </h4> 
    <div class="block">
        <div class="block ">
<ul class="ul block ct">
<li class="li"><span >{{{LableName}}}</span></li>
<li class="li"><span>{{{addr.address}}}</span></li>
<li class="li"><span >{{addr.postalCode.name}}</span></li>
<li class="li"><span>{{addr.town.name}} {{addr.city.name}},{{addr.state.name}} {{addr.country.name}}  </span></li>
<li class="li"><span >Ph</span><span >{{addr.phone}}</span></li>
</ul>
</div>


    </div> 
    
</div>
</div>';

$Lable_col2='<div class="block w4 col4 ">

    <div class="block  bg_0 m_b5"> <div class=" block _bdy al-l ff-2  "><span class="tt-u "> Payment Method</span><span class="fw-b span"> Cash on Delivery (COD)</span> </div> </div>
<div class="block  bg_0 m_b5"> <div class=" block _bdy al-l ff-2 ">{{{shippingMethode}}}</div> </div>
</div>';

$Lable_col3='<div class="block w4 col4  ">
<div class="block _bdy">
   
   <div class="block">
      <div class="w8 left b_grl al-r"> <span class="" style="margin-right: 10px;">Sub Total</span> </div>
      <div class="w4 left ">
         <div class="block m_b5 al-r  "> <span class=" m0">{{currencySymbole}} {{sub_total}}</span> </div>
      </div>
   </div>
   <div class="block">
      <div class="w8 left b_grl al-r"> <span class="" style="margin-right: 10px;"> Shipping </span> </div>
      <div class="w4 left ">
         <div class="block m_b5 al-r  "> <span class=" m0">{{currencySymbole}} {{totalshipping}}</span> </div>
      </div>
   </div>
   <div class="block">
      <div class="w8 left b_grl al-r"> <span class="" style="margin-right: 10px;">Discount </span> </div>
      <div class="w4 left ">
         <div class="block m_b5 al-r  "> <span class=" m0">{{currencySymbole}} {{discount}}</span> </div>
      </div>
   </div>
   <div class="block ">
      <div class="w8 left b_grl al-r "> <span class="" style="margin-right: 10px;"> Total</span> </div>
      <div class="w4 left ">
         <div class="block m_b5 al-r "> <span class=" m0">{{currencySymbole}} {{ total}}</span> </div>
      </div>
   </div>

<div class="block fw-b">
      <div class="w8 left b_grl al-r "> <span class="" style="margin-right: 10px;"> Grand Total:</span> </div>
      <div class="w4 left ">
         <div class="block m_b5 al-r "> <span class=" m0">{{currencySymbole}} {{ total}}</span> </div>
      </div>
   </div>
</div>

</div>';

$itemBoxrow1=''; $itemBoxrow2='';
foreach($order['items'] as $value){
$images='<div class="w2">
               <div class="img-media "><a href="http://localhost:3325/bossini-blue-printed-round-neck-t-shirt-product"><img class="img-responsive m0_auto" src="{{images}}" data-src="" alt="{{{pN}}}"></a></div>
            </div>';
  $product='<div class="block  bg_0 ">
      <div class="block ul _bdy_5-0 ov-hi bg_0" data-role="cart-card">
         <div class="block li m_b5">
            '.$images.'
            <div class="w9">
               <h3 class="fw-b truncate tt-c al-lc"><a class="wbk" href="{{{slug}}}" title="{{{pN}}}">{{{pN}}}</a></h3>
 <div class="block m_b5 al-l ">{{{pvNVl}}}   </div>
<div class="block m_b5 al-l "><span class="">Purchase Price :</span> <span class=" fw-b m0">Rs. {{{sP}}}</span>   </div><div class="block m_b5 al-l "><span class="">Ordered Quentity :</span> <span class=" fw-b m0">{{{q}}}</span>   </div><div class="block m_b5 al-l "><span class="">SKU :</span> <span class=" fw-b m0">{{{sku}}}</span>   </div>
            </div>
            <div class="w1"></div>
         </div>
         
      </div>
   </div>';  




 $itemBoxrow2.= $m->render($product, $value);
 
}


$Lable='<div class="block _bdy _B-gray bg_0 m_b10">
'.$Lable_col1.$Lable_col2.$Lable_col3.'

</div>';

$Template='<div class="block m0_auto _bdy" style="max-width: 1000px;">'
.$Title.'

'.$Lable.'

<div class="block _bdy _B-gray bg_0 m_b10">
'.$itemBoxrow1.'
'.$itemBoxrow2.'
</div>
  
</div>';



?>