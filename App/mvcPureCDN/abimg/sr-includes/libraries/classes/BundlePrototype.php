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
        case 'LoginData':
       $Properties=array(
	'account_id' => '0',
	'login_identity' => '',
	'identity_type' => '0',
	'password' => '',
	'verified' => '0',
	'login_id' => '0',
	'entity_id' => '0',
	'ip_address' => '1',
	'registration_time' => '',
	'ajax_password' => '',
    'private_data'=>$GLOBALS['Var_BundlePrototype']->DefaultValue('AccountPrivate'),
	'is_remember' => '0',
	'actual_input_length' => '34',
	'attempt' => '5',
	'login_block_time' => ''
);
 break;  
 case 'EntityData':

     $Properties=array(
	'entity_id' => 0,
	'account_id' => 0,
	'type' => 0,
	'device_in_use' => 0,
	'last_login' => '2016-04-20 06:46:59',
	'public_data' => array(),
	'private_data' => array('theme'=>array(0,1))
);

       break;  
       case 'AccountPrivate':
    $Properties=array(
	'activation_key' => '0',
	'visitId' => '',
	'verification_attempt' =>5,
    'recovery_code' => '45$%^&',
    'recovery_access' => '',
    'recovery_time' => '',
);

        break;  

   case 'StorePublic':
    $Properties=array(
	'Name' => '',
    'slug' => '',
    
    'avatar'=>'',//it carry empty or imaage table id reference
    'profilepic'=>array(),
    'addressdata'=>$GLOBALS['Var_BundlePrototype']->DefaultValue('address'),
    'collection'=>array(),
     'collection_data'=>array(),
    'theme'=>array('',''),
    "store_policy"=>'',
    "about_store"=>'',
   'sliderBox'=>array(),

   'website'=>'',
   'categoryBox'=>array()//      
);

        break;  
     case 'StorePrivate':
    $Properties=array(
      'notification_setting' => array('nss0'=>1,
                                    'nss1'=>1,
                                    'nss2'=>1,
                                    'nss3'=>1,
                                    'ns0'=>1,
                                    'ns1'=>1,
                                    'ns2'=>1
                                    ),


    'avatar'=>'',//it carry empty or imaage table id reference
    'profilepic'=>array(),
    'addressdata'=>$GLOBALS['Var_BundlePrototype']->DefaultValue('address'),
    'collection'=>array(),
    'theme'=>array('',''),
    "store_policy"=>'',
    "about_store"=>'',
   'sliderBox'=>array(),

   'website'=>'',
   'categoryBox'=>array(),//    



  

	
	'notification_checktime' => time(),
    'order_checktime' => time(),
    'checkin_msg_checktime' => time(),
    'chat_msg_checktime' => time(),
	'deactivate'=>'0',
    'memberSince'=>time(),
   'staffHash'=>'',//generate_random_string( 20,true ,true ,true, false, false ),
    'staffloginattemp'=>5,//loginattemp
    'stafflogin_block_time'=>0,//loginattemp
    'staffloginblock'=>0,//loginblock
    'nextOrderCount'=>0,
    'varified'=>1,
    'shippingZonecountry'=>105,//country info id
    'shippingZonetype'=>'0',//0=>national leval ,1 => local
     "currency"=>"INR",
     "unitsystem"=>"metric",
     "weightunit"=>"kg",
    "return_policy"=>1,
     "store_menu_table_code"=>0
);

        break; 


  case 'BuyerPublic':
    $Properties=array(
	'Name' => '',
	'UserName' => '',
    'FirstName' => '',
    'LastName' => '',
     'sex'=>''  ,
	'birthday' => '',
    'profilepic'=>'',
    'livingPalce'=>'',
    'about'=>'',
    'website'=>'',
    'avatar'=>SITEURL.'assets/imgs/pic/avatar.png',
    'banner_id'=>'',
    'addressdata'=>array($GLOBALS['Var_BundlePrototype']->DefaultValue('address')), 
    'bio'=>array()   
);

        break;  
     case 'BuyerPrivate':
    $Properties=array(
    'FirstName' => '',
    'LastName' => '',
     'sex'=>''  ,
	'birthday' => '',
    'profilepic'=>'',
    'livingPalce'=>'',
    'about'=>'',
    'website'=>'',
    'avatar'=>SITEURL.'assets/imgs/pic/avatar.png',
    'banner_id'=>'',
    'addressdata'=>$GLOBALS['Var_BundlePrototype']->DefaultValue('address'),
    'AddressHome'=>$GLOBALS['Var_BundlePrototype']->DefaultValue('address'),
    'AddressWork'=>$GLOBALS['Var_BundlePrototype']->DefaultValue('address'),
	'deactivate'=>'0',
    'countryinfo_id' => 105,
    'varified'=>1,
    'theme'=>array('',''),
    'memberSince'=>time(),
  	'notification_checktime' => time(),
    'order_checktime' => time(),
    'checkin_msg_checktime' => time(),
    'chat_msg_checktime' => time(),
    'privacy_setting'=>array(       'ip0'=>0,
                                    'ip1'=>0,
                                    'ip2'=>0,
                                    'ip3'=>0,
                                    'cp0'=>0,
                                    'cp1'=>0
                                    ),
    'notification_setting' => array('nss0'=>1,
                                    'nss1'=>1,
                                    'nss2'=>1,
                                    'nss3'=>1
                                    )
);

        break; 

          case 'SpreadFormData':
    $Properties=array('friendTag'=>FALSE,
                     'promoteproduct'=>FALSE,
                                 'privacy'=>FALSE,
                                 'privacyValue'=>array(0,1,2,5),
                                 'privacyNames'=>array('Public','Friends','Friends Of Friends','Onlyme'),
                                 'type'=>0
                      );

        break;  

    case 'SpreadViewFields':
    $Properties=array('ESd'=>array(),//EntityStripdata
                     'sid'=>'',//spread_id
                     'eid'=>'',//entity_id
                     'ceid'=>'',//creater_entity_id
                     'cESd'=>'',//creater_EntityStripdata
                     'oeid'=>'',//owner_entity_id
                     'veid'=>'',//viewer_entity_id
                     'atyc'=>'',//activity code
                     'ctt'=>array(),//spread_content
                     'prpo'=>'',//spread_perpose
                     'qat'=>'',//quick_action_type
                     'cmts'=>'',//comment_status
                     'sped'=>'',//suspended
                     'pyi'=>'',//privacy_id
                     'date'=>'',//
                     'date_gmt'=>'',//
                     'tey'=>array(),//taged_entity EntityStripdata
                     'aoj'=>array(),//attached_object Info
                     'aojinfo'=>array(),//attached_object extra info
                     'rfinfo'=>array(),//ratting info in product spread
                     'cmti'=>array('total'=>0,'pyi'=>0),//comment info
                     'qati'=>array('total'=>0,'self'=>0,'pyi'=>0,'type'=>0),//quick_action info
                     'vtd'=>'',// is viewer taged
                     'hdg'=>'Spreads',// spread heading
                     'sdes'=>'',// short description
                                  );

        break;  

        case 'SpreadcommentViewFields':
           $Properties=array('ESd'=>array(),//EntityStripdata
                     'sid'=>'',//spread_id
                     'eid'=>'',//entity_id
                     'cid'=>0,//comment_id
                     'veid'=>'',//viewer_entity_id
                     'ctt'=>array(array('content'=>'','date'=>'')),//spread_content
                     'date'=>'',//
                     'date_gmt'=>'',//
                     'qati'=>array('total'=>0,'self'=>0,'pyi'=>0,'type'=>0),//quick_action info
                     'rf'=>array('show'=>0,'value'=>0 ) ,//rating_info
                          );
        break;


   
     case 'ProfilePage':///EntityCardData
     $Properties=array(
    'ESd'=>array(),//EntityStripdata
    'twr'=>array('status'=>'',       
                 'rpdr' =>'',        //responder
                 'rt' =>'',        //relation type
                 'aeid' =>'',        //actor_entity_id
                 'feid' =>'',        //front_entity_id
                         ),             //relation_two_way
    'owr'=>array('status'=>'',       
                 'rpdr' =>'',        //responder
                 'rt' =>'',        //relation type
                 'aeid' =>'',        //actor_entity_id
                 'feid' =>'',        //front_entity_id
                          ),//relation_two_way
    'pbd'=>array()//ProfileBannerData


);
        break; 

case 'address':
     $Properties=array(
     'address_id'=>0,
     'entity_id'=>'',
     'location_id'=>'',
     'address'=>'',
     'landmark'=>'',
     'phone'=>'',
     'otheraddress'=>'',
     'otherlandmark'=>'',
     'otherphone'=>'',
     'varifed'=>'',
     'phone_varified'=>'',
     'type'=>0,// 0 for user addres home delivery main | 1 for store address  
     'postalCode_id'=>'',
     'postalCode'=>'',
     'location'=>'',
     'country_id'=>'',
     'fl_admin_id'=>'',
     'city_id'=>'',
     'city'=>'',
     'town_id'=>'',
     'town'=>'',
     'fl_admin'=>'',
     'location'=>'',
     'country'=>''
     );



break;


case 'addressOut':
     $Properties=array(
                     'address_id'=>0,
                     'address'=>'',
                     'landmark'=>'',
                     'phone'=>'',
                      'otheraddress'=>'',
                     'otherlandmark'=>'',
                     'otherphone'=>'',
                     'location'=>array('id'=>'','name'=> ''),
                     'postalCode'=>array('id'=>'','name'=> ''),
                     'town'=>array('id'=>'','name'=> ''),
                     'city'=>array('id'=>'','name'=> ''),
                     'state'=>array('id'=>'','name'=> ''),
                     'country'=>array('id'=>'','name'=> ''),
                        'da'=>0,//delivery available,
     'd_type'=>array(),//shipping charge calculation type,
     'd_ch'=>'',//delivery charge Json str,
     'd_sch'=>0,//delivery location surcharge charge,
     'd_des'=>'',//shipping description,
     );



break;

//--===store Dashboard===-----
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
            'webimages'=>array('http://img.wowrol.net/de-photos/dpholder400x400.jpeg'),//imageUrls
            'i'=>'',//main image selected
            'ofer'=>''//offers
            );
        break;
          case 'VarientPrivateData':
  $Properties=array(
  'varient_value'=>array('','',''),
  'mainimages'=>array(),
  'webimages'=>array(),
  'Backorders'=>0,
  'isShippable'=>'',
  'Shipping_method'=>'',
  'weight'=>'',
  'weightunit'=>'',
  'currency'=>'',
  'unitsystem'=>''

     );
            break;
       case 'category':
        $Properties=array(
       'cid'=>'',//category_id
       'slug'=>'',//category_slug
       'cN'=>'',//category_NAme
       'pa'=>array('cN'=>'', 'cid'=>''),//parent_id
       'pa_id'=>'',//parent_id
       'sid'=>'',//spread_id
       'eH'=>''//editHistory
       );

 


       break;

      case 'collection':
        $Properties=array(
       'cid'=>'',//category_id
       'slug'=>'',//category_slug
       'cN'=>'',//category_NAme
       'pa'=>array('cN'=>'', 'cid'=>''),//parent_id
       'pa_id'=>'',//parent_id
       'ut'=>'',//use_type
       'is'=>'',//icon_svg	
       'des'=>'',//description
       'z'=>''//country_id	

       );

 


       break;


  case 'storeStaff':// This bundle work in StoreStaff Table //Publicdata col
        $Properties=array(
       'visitId'=>'',//visited
       'updatedate'=>'',//category_slug
       'lastlogin'=>'',//lastlogin
       'loginattemp'=>5,//loginattemp
       'login_block_time'=>0,//loginattemp
       'loginblock'=>0//loginblock
       );

 


       break;
  case 'staffData'://this bundle work in ActorEntityData
        $Properties=array(
       'username'=>'',//username
       'password'=>'',//password
       'visitId'=>'',//visited
       'updatedate'=>'',//category_slug
       'lastlogin'=>'',//lastlogin
       'loginattemp'=>5,//loginattemp
       'login_block_time'=>0,//loginattemp
       'loginblock'=>0//loginblock
       );

 


       break;


case 'AutherInfo'://
        $Properties=array(
      'author'=>'',
      'type'=>0,
      'time'=>0,
      'action'=>2
       );

 


       break;
       case "StoreShipping":
    $Properties=array(
      'spgid'=>'',
      'Name'=>'',
      'type'=>0,//0 Based on cart total weight|1 Based on cart total price
      'des'=>'',
      'srng'=>array(),//shipping_range
      'lif'=>array(),//location_info
      'stcg'=>array(),//	timed_charge
      'Up'=>'Rs.',//	unit price
      'Uw'=>'kg',//	unit weight
      'pt'=>3, //Processing time 
      'sZt'=>0,//shippingZonetype||  0=>national leval ,1 => local
       'z'=>105//country id/Zone id
       );
       
       break; 
       case "orderview":
    $Properties=array(
    'oid'=>'',
    'bESd'=>array(),//buyer entity data
    'sESd'=>array(),//store entity data
    'type'=>'',//[ 0<home delivery>| 1<self collect> | 2<inquiry> |3<booking> ] 
    'status'=>'',//[ 0<processing>| 1<pending> |2<cancelled>|3<completed>|4<failed>  ] 
    'date'=>'',
    'currency'=>'',//currency
    'total'=>'',//total
    'sub_total'=>'',//sub_total
    'tax'=>'',//tax
    'sur_charge'=>'',//sur_charge
    'discount'=>'',//discount
    'shipping_charge'=>'',//shipping_charge
    'total_weight'=>'',//total_weight
    'address'=>$GLOBALS['Var_BundlePrototype']->DefaultValue('addressOut'),//address
    'retA'=>1,//return allow code   [0=>Not allowed | 1=> Replacement allowed |2=> Return allowed ]
    'items'=>array(),
    'itemsData'=>array(),
    'track'=>array()
       );
     
       break; 
    case "ordertrackingview":
    $Properties=array(
  'tid'=>'',
  'msg'=>'ordertrackingview sad',
  'type'=>'',
  'status'=>'',
  'date'=>'',
  'rowtype'=>0
       );
     
       break;
       case 'productspecification'://
        $Properties=array(
      'heading'=>'',
      'specifications'=>array(),
      'id'=>0
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
     'dData'=>array('applied'=>array(),
                    'ifs'=>0,//isfreeShipping
                    'total'=>5.00// total calculalted
                  ),// discount data 
     'Pbank'=>array()//Product parse data info array
       );

 


       break;
     case 'ShippingDataforAddress':
 $Properties=array(
     'da'=>0,//delivery available,
     'd_type'=>array(),//shipping charge calculation type,
     'd_ch'=>'',//delivery charge Json str,
     'd_sch'=>0,//delivery location surcharge charge,
     'd_des'=>'',//shipping description,

          );

       break;

       case 'Conversation':
 $Properties=array(
   'id'=>0,
   'LChT'=>array(),//Last check time data,
   'Ed'=>array(),//entityData of m index 

          );

       break;


        case 'storeCheckInData'://
     $Properties=array('checkIn_id' => '1',
     'buyer_id' => '0',
     'buyers_id' => '',
     'store_id' => '0',
     'shortlistedProducts_id' => NULL,
     'cartVarient_id' => NULL,
     'cartvarient_data' => NULL,
     'buyersPrivate_data' => NULL,
     'storestaff_id' => NULL,
     'checkInTime_gmt' =>  time(),
     'order_id' => NULL);

 


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

 case 'ordersInnerdata'://

 $Properties=array(
	'order_id' => '1',
	'buyer_entity_id' => '1',
	'store_entity_id' => '1',
	'order_type' => '0',//[ 0<home delivery>| 1<self collect> | 2<inquiry> |3<booking> ] 
	'order_data' => '',
	'order_status' => '0',//[ 0<processing>| 1<pending> |2<cancelled>|3<completed>|4<failed>  ] 
	'order_time' => '2016-06-16 00:00:00',
	'cartVarient_id' => array(),
	'cartVarient_data' =>array(),/* array(
                                sp=>0.00,//selling price
                                q=>0,// quantity
                                pid=>0,// product id
                                W=>0,// product id
                                Wu=>0,// product id
                               ),*/
   'shipping_address'=>$GLOBALS['Var_BundlePrototype']->DefaultValue('addressOut')
);

  break;
  case 'orderitemViewdata':

 $Properties=array(
 'pN'=>0.00,
 'slug'=>'',
 'image'=>'',
 'sku'=>0.00,
 'sp'=>0.00,
 'q'=>0,
 'pid'=>0,
 'vid'=>0,
 'W'=>0,
 'Wu'=>0,
 );


   break;

//--===store Dashboard===-----


//--Notiifcation

case 'NotificationView';
$Properties=array(
'type'=>'',
'ESd'=>array(),
'link'=>'javascript:void(0);',
'msg'=>'Notification msg',
'time'=>'',
'objinfo'=>array()
);

break;

//--Notification



case 'forgetpasswordacccount';
$Properties=array(
'aid'=>'',//account_id
'ESd'=>array(),
'type'=>'',//type
'identity'=>'',//	login_identity
'identitytype'=>''//	identity_type
);

break;





case 'discount'://or discount 
/*
*Discount codes can be generated for a dollar value discount, a percentage discount, or a free shipping discount. You can also specify the dates for which the code is valid, the number of times a code can be used, a minimum order amount before the code can be used, and to which products, collections, or variants the discount can be applied. 
@ see  https://help.shopify.com/manual/products/discount-codes, https://schema.org/Offer,https://schema.org/Organization
*/
   $Properties=array(
   'id'=>'',
   'eid'=>'',
   'dc'=>'',// discount_code alfanumaic 8 -15 digit
   'dt'=>0,//discount_type|0=>free shipping ,1=>10$off,2=>10%off
   'bd'=>'',//begin_date
   'ed'=>'',//expires_date
   'drt'=>0,//date_range_type|0=>end by expire date| 1 -never expire
   'at'=>0,//|apply_type0=>on cart| 1 -on specifice product|2-category product
   'sids'=>'',//specific_ids|ids of product or category in whick cart items belongs
   'v'=>0,//validity| 0 -No limit on use |(0>n) n time limit on use
   'ut'=>0,//uses_type|0=>one type by each coustomer| 1 -No limit on use
   'd'=>0,// discount|numeric discount
   'ms'=>0// minimum_spend|minimum subtotal needed for use this coupan
   
   
   
   );





break;
  case 'storesearchData':
    $Properties=array(
  'currenciesAccepted'=>'',//Text 	The currency accepted (in ISO 4217 currency format).
    'openingHours'=>'',//Text 	The general opening hours for a business.
    'paymentAccepted'=>'',//	Text 	Cash, credit card, etc.
    'aggregateRating'=>'',//The overall rating, based on a collection of reviews or ratings, of the item.
    'priceRange'=>'',//Text 	The price range of the business, for example $$$.
    'brand'=>''//The brand(s) associated with a product or service, or the brand(s) maintained by an organization or business person.



);

        break;  







//--===default enumrated value===-----
       case "NotificationCheckObject":
         $Properties=array(
      'priceUpdate'=>'',
      'spreadActivity'=>''
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

       case "marketOut":
         $Properties=array(
     'name'=>'',
     'location'=>array('id'=>'','name'=> ''),
     'postalCode'=>array('id'=>'','name'=> ''),
     'town'=>array('id'=>'','name'=> ''),
     'city'=>array('id'=>'','name'=> ''),
     'state'=>array('id'=>'','name'=> ''),
     'country'=>array('id'=>'','name'=> ''),
     'u_country'=>'',
     'neighbours'=>array()// neighbours markets

       ); 
       
       break; 

    }



 return  $Properties;
}




    




 }

 $GLOBALS['Var_BundlePrototype'] =new BundlePrototype();
?>