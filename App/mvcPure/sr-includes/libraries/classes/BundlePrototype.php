<?php


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
	'verification_attempt' =>5
);

        break;  

   case 'StorePublic':
    $Properties=array(
	'Name' => '',
	'Url' => array( ),
    'StoreCategory'=>array('All cloths'),
    'address'=>'',
    'pincode'=>'',
    'location_id'=>'',
    'location_name'=>'',
    'Districtname'=>'',
    'Statename'=>'',
    'Country'=>'',
    'phone'=>''     
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
	'notification_checktime' => time(),
    'order_checktime' => time(),
    'avatar'=>'',//it carry empty or imaage table id reference
    'profilepic'=>array(),
    'slider'=>array(),
	'deactivate'=>'0',
    'theme'=>array('',''),
    'memberSience'=>time(),
    'staffHash'=>generate_random_string( 20,true ,true ,true, false, false ),
    'staffloginattemp'=>5,//loginattemp
    'stafflogin_block_time'=>0,//loginattemp
    'staffloginblock'=>0,//loginblock
    'nextOrderCount'=>0,
    'categoryBox'=>array(),//
    'varified'=>1,
    'storeterms'=>'',
    'cwsetting'=>array("currency"=>"INR",
                     "unitsystem"=>"metric",
                     "weightunit"=>"kg")  
);

        break; 


  case 'BuyerPublic':
    $Properties=array(
	'Name' => '',
	'UserName' => '',
    'Url' => array(),
    'sex'=>''     
);

        break;  
     case 'BuyerPrivate':
    $Properties=array(
	'birthday' => '',
    'profilepic'=>'',
    'avatar'=>SITEURL.'assets/imgs/pic/avatar.png',
    'banner_id'=>'',
    'AddressHome'=>array(
               'address'=>'',
               'location_id'=>'',
               'location_name'=>'',
               'Districtname'=>'',
               'Statename'=>'',
               'Country'=>'',
               'pincode'=>'',
               'phone'=>''
                ),
    'AddressWork'=>array(
                'address'=>'',
               'location_id'=>'',
               'location_name'=>'',
               'Districtname'=>'',
               'Statename'=>'',
               'Country'=>'',
               'pincode'=>'',
               'phone'=>''
                ),
	'deactivate'=>'0',
    'varified'=>1,
    'theme'=>array('',''),
    'memberSience'=>time(),
    'notification_checktime' => time(),
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
                                    ),
    'bio'=>array()   
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
                     'oeid'=>'',//owner_entity_id
                     'veid'=>'',//viewer_entity_id
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
      'Uw'=>'kg'//	unit weight
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
    'address'=>array('Home'=>array(),'Work'=>array()),//address
    'items'=>array(),
    'itemsData'=>array()
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
     'Ed'=>array(),//entityData of m index 
     'addr'=>array(),//address of 0,1 index visible to 1 index 
     'cvD'=>array(),//cartVarient_id List
     'cvPD'=>array(),//cartVarient_data array('vid'=>array(quantity,productid))
     'slPD'=>array(),//shortlistedProducts_id,
     'suPD'=>array(),//suggestedProducts_id,
     'LChT'=>array(),//Last check time data,
     'mbLId'=>array(),//main buyer location id,
     'mbLN'=>array(),//main buyer location Name,
     'da'=>0,//delivery available,
     'd_type'=>array(),//shipping charge calculation type,
     'd_ch'=>'',//delivery charge Json str,
     'd_sch'=>0,//delivery location surcharge charge,
     'd_des'=>'',//shipping description,
     'currency'=>'INR',//currency
     'checkInTime'=>array(),//Time
     'Pbank'=>array()//Product parse data info array
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
   'shipping_address'=>array(
               'address'=>'',
               'location_id'=>'',
               'location_name'=>'',
               'Districtname'=>'',
               'Statename'=>'',
               'Country'=>'',
               'pincode'=>'',
               'phone'=>''
                )
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





//--===default enumrated value===-----
       case "NotificationCheckObject":
         $Properties=array(
      'priceUpdate'=>'',
      'spreadActivity'=>''
       ); 
       
       break; 




    }



 return  $Properties;
}




    




 }

 $GLOBALS['Var_BundlePrototype'] =new BundlePrototype();
?>