<?php
/*
https://ecommerce.shopify.com/forums
*/

 class BundlePrototype{
/**
* @description=> get defalult value
* $GLOBALS['Var_BundlePrototype']->DefaultValue('LoginData');
* @param  => 
* @return => 
*/
public function DefaultValue($BundleType){
    $Properties=array();
    switch($BundleType){
        
   case 'conversationupdate':
    $Properties=array('timeNode'=>time(),
    'typing'=>array(),
    'messages'=>array()
    );
   break;
    case 'conversationEvent':
    $Properties=array(
    'typing'=>array(),
    'typingData'=>array(),
    );
   break;
 case 'Product_basic':

     $Properties=array(
     'id'=>'',
     'pid'=>'',
     'sid'=>'',//spread id
     'pN'=>'',//productName
     'slug'=>'',// product slug
     'eH'=>array(),//editHistory
     'Hvrt'=>FALSE,//has_varient
     'pvN'=>array('','',''),//varient Name
     'pvL'=>array(),//varient List
     'pvDD'=>$GLOBALS['Var_BundlePrototype']->DefaultValue('Product_Varient'),//varient Default data
     'kf'=>array('','','',''),//keyfeature
     'pC'=>array(array('cN'=>'', 'cid'=>'')),//product_categories
     'pt'=>0,//product Type | 0=> normal prodct ,1 => combo prodcut
     'spf'=>array(),//Specifications id array
     'spfl'=>array(),//Specifications list
     'sW'=>'',//search_word
     'des'=>'',//description
     'ct'=>'',//creation_time
     'ctg'=>'',//creation_time_gmt
     'pvs'=>'',//views
     'pic'=>'',//in_cart
     'oded'=>'',//ordered
     'fiatr'=>array(),//Fittering Attribute
     'upS'=>array(),//Upsell product/similar product
     'iL'=>'',//IsLive
     'rf'=>array('Total' => array(
		'5star' => 0,
		'4star' => 0,
		'3star' => 0,
		'2star' => 0,
		'1star' => 0,
	) ,
	'Self' => array(
		'given' => 0,
		'value' => 1
	                )
    ) ,//rating_info
    'rWA' => 1//ReviewWriteAllow
     );



        break;// End 
        case 'Product_Varient':
      

            $Properties=array(
            'id'=>'',
            'vid'=>0,//varient id
            'pid'=>0,
            'Hvrt'=>'',//has_varient
            'pvN'=>array('','',''),//varient Name
            'pvV'=>array('','',''),//varient Value
            'sP'=>'1.00',//selling price
            'cP'=>'2.00',//compairePrice
            'sku'=>'156',//sku
            'stk'=>'2',//Stock
            'oprf'=>'',//off_profit
            'currency'=>'INR',//currency
            'unitsystem'=>'metric',//unitsystem
            'bodrs'=>FALSE,//Backorders
            'Issh'=>'',//isShippable
            'shMe'=>'',//Shipping_method
            'W'=>'1.00',//weight
            'Wu'=>'kg',//weightunit
            'mainimages'=>'',//imageUrls
            'featureimage'=>array(),//  
            'webimages'=>array('http://img.wowrol.net/de-photos/dpholder400x400.jpeg'),//imageUrls
            'i'=>'',//main image selected
            'ofer'=>''//offers
            );
        break;
       case 'Conversation':
 $Properties=array(
   'id'=>0,
   'LChT'=>array(),//Last check time data,
   'Ed'=>array(),//entityData of m index 
   'iuc'=>0, //instant updater server code
   'iu_hash'=>'dummy' // instant updater authetication code
          );

       break;
 case 'CheckInMessage'://
     $Properties=array('mid' => '1',//messages_id
     'msg' => '',
     'sid' => '',//senderid
     'sidr' => '',//senderid role
     'date'=>'',//
     'type'=>'',//
     'attmt' => array('has'=>0,
                      'type'=>0,
                      'id'=>0,
                      'info'=>array()
                      )
     );

 


       break;
    }



 return  $Properties;
}




    




 }

 $GLOBALS['Var_BundlePrototype'] =new BundlePrototype();
?>