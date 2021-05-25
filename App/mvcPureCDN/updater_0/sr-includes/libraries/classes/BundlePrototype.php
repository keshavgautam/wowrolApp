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
   'Edindex'=>0,
   'LChT'=>array(),//Last check time data,
   'Ed'=>array(),//entityData of m index
   'ucount'=>0,//unread count 
   'lmi'=>array(), //last message info
   'iuc'=>0, //instant updater server code
   'iu_hash'=>'dummy' // instant updater authetication code
          );

       break;
       case 'Conversation_row':
 $Properties=array('conversation_id' => 0,'members' => '','conversation_type' => 0,'last_check_time' => '','is_delete' => NULL,'history_cleared_till' => '','table_code' => 0,'lastactivity_time' => '','checkIn_id' => 0,'admin_members' => '','Instant_Updater_code' => 0,'Instant_Updater_hash' => '');

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
    case "PagingOutPut":
         $Properties=array(
          'ifo'=>array(),//information
          'paged'=>1,
          'pagesize'=>5,
          'result'=>0,
          'totalpage'=>0,
          'totalresult'=>0,
          'searchstr'=>'',
          'selectedid'=>0,
          'sortby'=>'',
          'sorttype'=>0//0 =>asc|1 =>dec
       ); 
       
       break; 
    case 'storebrowsingData'://
     $Properties=array(
     'mode'=>0,// 0=> Normal || 1 => through checkin Page || 2 => self store visiting || 3 => Logout
     'role'=>0,// Index in memeber row
     'checkIn_id'=>0,// checkinId
     'cid'=>0,// conversation id
     'cdata'=>0,// conversation data
     'Ed'=>array(),//entityData of m index 
     'addr'=>array(),//address of 0,1 index visible to 1 index 
     'addr_id'=>0,//selected address id
     'cvD'=>array(),//cartVarient_id List
     'cvPD'=>array(),//cartVarient_data array('vid'=>array(quantity,productid))
     'slPD'=>array(),//shortlistedProducts_id,
     'suPD'=>array(),//suggestedProducts_id,
     'LChT'=>array(),//Last check time data,
     'mbLId'=>array(),//main buyer location id,
     'mbLN'=>array(),//main buyer location Name,
     'currency'=>'INR',//currency
     'currencydata'=>'INR',//currency
     'checkInTime'=>time(),//Time
     'ucount'=>0,//unread count
     'lmi'=>array(), //last message info
     'dData'=>array('applied'=>array(),
                    'ifs'=>0,//isfreeShipping
                    'total'=>0.00// total calculalted
                  ),// discount data 
     'Pbank'=>array(),//Product parse data info array
   'iuc'=>0, //instant updater server code
   'iu_hash'=>'dummy' // instant updater authetication code
       );

 


       break;


    }



 return  $Properties;
}




    




 }

 $GLOBALS['Var_BundlePrototype'] =new BundlePrototype();
?>