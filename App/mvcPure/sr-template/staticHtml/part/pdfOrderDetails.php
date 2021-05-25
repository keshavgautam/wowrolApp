<?php
    

$Title='';


require(TEMPLATE. '/staticHtml/part/shipping_lable.php' );



$itemBoxrow1=''; $itemBoxrow2='';
foreach($order['items'] as $value){
 require(TEMPLATE. '/staticHtml/part/orderItemCard.php' );


  $product=$orderItemCard;  




 $itemBoxrow2.= $m->render($product, $value);
 
}



$Template='<div class="block m0_auto _bdy" style="max-width: 1000px; min-height:600px;">'
.$Title.'
'.$shippingLable.'


<div class="block _bdy _B-gray bg_0 m_b10">
'.$itemBoxrow1.'
'.$itemBoxrow2.'
</div>
  
</div>';



?>