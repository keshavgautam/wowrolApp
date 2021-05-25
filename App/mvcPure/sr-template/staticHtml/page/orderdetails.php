<?php
require (INC . '/libraries/vendor/Mustache/Autoloader.php');
Mustache_Autoloader::register(); 
 $m = new Mustache_Engine;
 $order=$AppData['AppView'][0];
 $order['currencySymbole']="₹";

 //number_format
 $order['sub_total']=number_format( $order['sub_total'],2,'.','');
$order['totalshipping']=number_format( $order['totalshipping'],2,'.','');
$order['discount']=number_format( $order['discount'],2,'.','');
$order['total']=number_format( $order['total'],2,'.','');



    if($order['type']==0){
     $order['addr']=$order['address']; 
     $order['LableName']=''; 
     $order['shippingMethode']='Home Delivery'; 
     }else{
    $order['addr']=$order['address'];
     $order['LableName']=''; 
      $order['shippingMethode']='Self collect ';    
     }

 //check_response($order);
//--------------


//-------OUTPUT
$tab= GET_QueryVars('action','url_chars');

switch($tab){
 case 'printshippinglable':
  require(TEMPLATE. '/staticHtml/part/shipping_lable.php' );
 echo $m->render($Template, $order); 

 break;   
  case 'pdfOrderDetails':
 require(TEMPLATE. '/staticHtml/part/orderdetails.php' );
 $html= $m->render($Template, $order); 
 require(TEMPLATE. '/staticHtml/part/PrintPDFOrderDetails.php' );

 break;
 default:
  require(TEMPLATE. '/staticHtml/part/orderdetails.php' );
echo $m->render($Template, $order); 
}





 ?>