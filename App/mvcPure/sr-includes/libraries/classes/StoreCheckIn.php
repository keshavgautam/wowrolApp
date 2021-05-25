<?php

  abstract  class StoreCheckIn{
 public $Store_id;


   function __construct($Store_id) {
               $this->Store_id=$Store_id;
              $this->Store_EntityRow=$GLOBALS['Var_Utility']->GetEntityRow($Store_id);
                                  }  

 /**
* @description=>Gives checkin Id 
* @param  => 
*  checkinsTable Row array('checkIn_id' => '1','buyer_id' => '0','buyers_id' => '','store_id' => '0','shortlistedProducts_id' => NULL,'cartVarient_id' => NULL,'cartProducts_data' => NULL,'buyersPrivate_data' => NULL,'storestaff_id' => NULL,'checkInTime_gmt' => '0000-00-00 00:00:00','order_id' => NULL)
);
* @return => 
*/   
public function GetCheckInInfo(){
   $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
   $CheckIn=$GLOBALS['Var_BundlePrototype']->DefaultValue('storeCheckInData');;
//$CheckIn=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'checkins', array('buyer_id','store_id'),array($ActorEntityData['EntityData']['entity_id'],$this->Store_id)); 

$result=$GLOBALS['Var_DBMysqli']->query('SELECT * FROM '.DB_NAME.'.checkins  a , '.DB_NAME.'.conversation  b
   WHERE a.store_id = '.$this->Store_id.' 
   AND  a.buyer_id = '.$ActorEntityData['EntityData']['entity_id'].' 
   AND  a.conversation_id = b.conversation_id 
    '); 
 
     
  if((count($result)==0)&&$this->Store_id!=0&&$ActorEntityData['EntityData']['type']!=1){
    

       $AllRecipient_EntityRow =   $GLOBALS['Var_UtilityCheck']->IsValidObject_M(array('type'=>'EntityRowByArray','entity_id_Array'=>array($ActorEntityData['EntityData']['entity_id'],$this->Store_id)));

         if(count( $AllRecipient_EntityRow)>1){
 $conversation = $GLOBALS['Var_Conversation']->Getconversation($AllRecipient_EntityRow,1);

  
      
$CheckIn['checkIn_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'checkins', array('buyer_id','store_id','conversation_id'),array($ActorEntityData['EntityData']['entity_id'],$this->Store_id, $conversation['conversation_id'])); 

//updating checkin id
$update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'conversation', array('checkIn_id'),array($CheckIn['checkIn_id']), array('conversation_id'),array($conversation['conversation_id'])); 



$result=$GLOBALS['Var_DBMysqli']->query('SELECT * FROM '.DB_NAME.'.checkins  a , '.DB_NAME.'.conversation  b
   WHERE a.store_id = '.$this->Store_id.' 
   AND  a.buyer_id = '.$ActorEntityData['EntityData']['entity_id'].' 
   AND  a.conversation_id = b.conversation_id 
    '); 
    }
     $CheckIn=$result[0];
 $NormalToArray =$GLOBALS['Var_Conversation']->ParseConversationRowToNormal($CheckIn);
 $CheckIn['last_check_time']=$NormalToArray['last_check_time']; 
 $CheckIn['history_cleared_till']= $NormalToArray['history_cleared_till'];  
$CheckIn['members']=$NormalToArray['members'];  
  }else{
     $CheckIn =$result[0];
  }

 
  //

  
  return $CheckIn;
}
/*
@des Well formed data of checkin row
@call  $storeOutput->GetCheckinRow();
*/
public function GetCheckinRow(){
       $checkIn_row=  $this->GetCheckInInfo();
  $NormalToArray =$GLOBALS['Var_Conversation']->ParseConversationRowToNormal(  $checkIn_row);

 

 $checkIn_row['last_check_time']=$NormalToArray['last_check_time']; 
 $checkIn_row['history_cleared_till']= $NormalToArray['history_cleared_till'];  
 $checkIn_row['members']=$NormalToArray['members'];  

  return  $checkIn_row;
}

/*------===Ragister===------*/



/**
* @description=> Edit checkin Suggest Product
* @param  =>
* @return => 
*/
public function CartEdit($args){
 
     // update it

  $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'checkins',array('cartVarient_id','cartVarient_data'),array($args['cartVarient_id_Str'],$args['cartVarient_data_Json']),array('checkIn_id'),array($args['checkIn_row']['checkIn_id']));

    

  if($update=="updated"&&$args['CareteChatMsg']){//sending message
     $args['conversation_row']=$args['checkIn_row'];
        $GLOBALS['Var_Conversation']->SendCheckinAttechmentMessage($args);

  //activity
$GLOBALS['Var_Activity']->RagisterRefActivity(array('creater_id' =>$args['creater_id'],'object_id' =>$args['object_id'],'activity_code' => '702')); 
  }

  return $update;
 
   
}
/**
* @description=> Edit checkin Short llisted Product
* @param  =>
* @return => 
*/
public function ShortListEdit($args){
 
     // update it

  $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'checkins',array('shortlistedProducts_id'),array($args['shortlistedProducts_id_Str']),array('checkIn_id'),array($args['checkIn_row']['checkIn_id']));

 if($update=="updated"&&$args['CareteChatMsg']){//sending message
       $args['conversation_row']=$args['checkIn_row'];
   $GLOBALS['Var_Conversation']->SendCheckinAttechmentMessage($args);
  }

  return $update;
 
   
}


/**
* @description=> Edit checkin Suggest Product
* @param  =>
* @return => 
*/
public function SuggestEdit($args){
 
     // update it

  $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'checkins',array('suggestedProducts_id'),array($args['suggestedProducts_id_Str']),array('checkIn_id'),array($args['checkIn_row']['checkIn_id']));

 if($update=="updated"&&$args['CareteChatMsg']){//sending message
       $args['conversation_row']=$args['checkIn_row'];
       $GLOBALS['Var_Conversation']->SendCheckinAttechmentMessage($args);
  }

  return $update;
 
   
}

/**
* @description=> emptycart
* @param  =>  MakeEmptyCart(array('checkIn_id'=>));
* @return => 
*/
public function MakeEmptyCart($checkIn_id){
      $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'checkins',array('cartVarient_id','cartVarient_data'),array('',''),array('checkIn_id'),array($checkIn_id));

}

/**
* @description=>RagisterShippingOrder
* @param  => 
* @return => 
*/
 public function RagisterShippingOrder($args){
     
      $args['order_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'orders',array('buyer_entity_id','store_entity_id','order_type','order_data','order_status','order_time','cartVarient_id','cartVarient_data','shipping_address','checkIn_id','timestamp'),array( $args['buyer_entity_id'],$args['store_entity_id'],$args['order_type'],$args['order_data'],$args['order_status'],$args['dateGMT'],$args['cartVarient_id'],$args['cartVarient_data'],$args['shipping_address'],$args['checkIn_row']['checkIn_id'],time()));

//--deleteing cart items and suggestions



//
//--ragister order activity

$GLOBALS['Var_Activity']->RagisterMainActivity(array('creater_id' =>$args['buyer_entity_id'],'object_id' => $args['order_id'],'activity_code' => '800')); 

//--==
//emptying cart
$this->MakeEmptyCart($args['checkIn_row']['checkIn_id']);

//--sending a email to seller


  $GLOBALS['Var_ExternalNotification']->Neworder_to_seller($args['email_data']);


//--save data for statistics
 $args['order_statistics']['order_id']= $args['order_id'];
 $order_statistics= $args['order_statistics'];
         $GLOBALS['Var_DBMysqli']->insert(DB_NAME,'order_statistics',array('order_id','sub_total','tax','sur_charge','discount','total_weight','total','shipping_charge'),array($args['order_id'], $order_statistics['sub_total'], $order_statistics['tax'], $order_statistics['sur_charge'], $order_statistics['discount'], $order_statistics['total_weight'], $order_statistics['total'], $order_statistics['shipping_charge'] ));

///save for item reference
  $OptionName=array('order_id','varient_id','product_id');   $OptionValue=array();
  
     foreach($args['item_ref_data'] as $data){
        $OptionValue[]=array($args['order_id'],$data['varient_id'],$data['product_id']);
     }
    $GLOBALS['Var_DBMysqli']->bulk_insert(DB_NAME,'order_items_ref',$OptionName,$OptionValue);



  return $args['order_id'];
 }

 /**
* @description=>RagisterTraking
* @param  => 
* @return => 
*/


public function AddOrderTacking($args){
  $args['order_tracking_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'order_tracking',array('order_id','tracking_msg','tracking_type','to_status','update_date_gmt'),array( $args['order_id'],$args['tracking_msg'],$args['tracking_type'],$args['to_status'],$args['dateGMT']));
  
  
  return   $args['order_tracking_id'];
}
 /**
* @description=>UpdateShippingOrderStatus
* @param  => 
* @return => 
*/
public function UpdateShippingOrderStatus($args){
  

// upadting order status
 $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'orders',array('order_status'),array($args['nstatus']),array('order_id'),array($args['order_id']));
$update="updated";
 if($update=="updated"){//sending message
      // inserting in traking order
   $args['order_tracking_id'] = $this-> AddOrderTacking(array(
    'order_id'=>$args['order_id'],
    'tracking_msg'=>$args['status_note'],
    'tracking_type'=>1,//for status update
    'to_status'=>$args['nstatus'],
    'dateGMT'=>$args['dateGMT'],
                   ));

//adding in checkin msg
$args['conversation_row']=$args['checkIn_row'];
$args['recevers_id']='"'.implode('","',$args['members']).'"';
$args['attachments_type']=7;
$args['attachments_id']=$args['order_tracking_id'];//for status update
$args['dateGMT']=$args['dateGMT'];

  $GLOBALS['Var_Conversation']->SendCheckinAttechmentMessage($args);


// ragisting main activity

$GLOBALS['Var_Activity']->RagisterMainActivity(array('creater_id' =>$args['ActorEntityData']['EntityData']['entity_id'],'object_id' =>$args['order_id'],'activity_code' => '801','object_type' => $args['nstatus'])); 


// Sendig external notification 
//email to buyer
  $GLOBALS['Var_ExternalNotification']->StatusChange_to_buyer($args['email_data']);



  }



 return  $update;

}
 /**
* @description=>UpdateShippingOrderStatus
* @param  => 
* @return => 
*/


/*------===Check===------*/
/**
* @description=> GetCheckInMember
* @param  => CheckIns Row;
* 0=>Store Id, 1=>BuyserId ,2..=> buyserFriendsId
* @return => 
*/
public function GetCheckInMember($Fields){

  return  $GLOBALS['Var_ViewParse']->GetCheckInMember($Fields);
}
/**
* @description=> get the current member rol
* @param  =>
* @return => 
*/
public function GetEntityRole($Member){


   return  $GLOBALS['Var_ViewParse']->GetEntityRole($Member);
}
/**
* @description=> get the senderrole member rol
* @param  =>
* @return => 
*/
public function GetSenderRole($Member,$sender){
   $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
 $entity_id=  $sender;
 $Role='unvalid';
   foreach ($Member as $q =>$v){
       if($entity_id==$v){
           $Role =$q;
       }
   }


   return $Role;
}


/**
* @description=> check delivery
* @param  =>
* @return => $shipping table row || Null
*/
public function CheckDelivery($Location_id,$Store_id,$storeZoneType){
    $ret=NULL;
//   'shippingZonetype'=>'0',//0=>national leval ,1 => local
 //check_response('$storeZoneType => '.$storeZoneType);
  //check_response('$storeZoneType '.intval($storeZoneType));
    if($Location_id!=''){
        switch(intval($storeZoneType)){
        case 0:

   $Location_row=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'locations',array('location_id'),array($Location_id));
   //check_response($Location_row);
   if($Location_row!=NULL&&isset($Location_row['fl_admin_id'])){
     $selectsql='SELECT * FROM '.DB_NAME.'.store_shipping a 
 WHERE a.entity_id	='.$Store_id.' 
 AND  a.locations	LIKE  \'%"'.$Location_row['fl_admin_id'].'"%\' 
 AND a.shippingZonetype=0
 LIMIT 1     ';
     $result=$GLOBALS['Var_DBMysqli']->query($selectsql);
    
     if(count($result)>0){
          $ret=$result[0];
     }   

}
        break; 
        case 1:
     $selectsql='SELECT * FROM '.DB_NAME.'.store_shipping a 
 WHERE a.entity_id	='.$Store_id.' 
 AND  a.locations	LIKE \'%"'.$Location_id.'"%\'
 AND a.shippingZonetype=1  
 LIMIT 1     ';
     $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;
    
     if(count($result)>0){
          $ret=$result[0];
     }   
        break;    
        }
  
    }


return  $ret;
}
/**
* @description=> Is it has unfulfilled order
* @param  =>
* @return => 
*/
public function CheckUnfullfilledOrder($storeId,$buyerId){
        $numsql='
    SELECT COUNT(*) FROM '.DB_NAME.'.orders 
    WHERE store_entity_id='.$storeId.'
    AND buyer_entity_id ="'.$buyerId.'"
    AND (order_status=0||order_status=1)
     ';
     $ret=FALSE;
      $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
      if($total_result==0){
    $ret=TRUE;
      }
      return $ret;
}
/**
* @description=> get varient data for order
* @param  =>
* @return => 
 array(  0=>0.00,//selling price
         1=>0,// quantity
         2=>0,// product id
                               ),
*/
public function GetVarientDataForOrder($cartVarient_id,$cartVarient_data){
  $sellingPrice=array(); $weight=array();$weightunit=array();
   $VarientData=array();
    //getting setting price
   $selectsql='SELECT * FROM '.DB_NAME.'.product_varients a
    WHERE a.varient_id IN ("'.implode('","',$cartVarient_id).'")
    ';
   $product_varients_rows=$GLOBALS['Var_DBMysqli']->query($selectsql); 
$product_varients_data= $GLOBALS['Var_StoreDashboard']->ParseProductVarients($product_varients_rows,array('varient_name'=>array('','',''),'has_varient'=>''));
    //-->>
    foreach($product_varients_data as $p){
    $VarientData[($p['vid'])]=array('sP'=>$p['sP'],
                              'q'=>$cartVarient_data[$p['vid']][0],
                              'pid'=>$p['pid'],
                              'W'=>$p['W'],
                              'Wu'=>$p['Wu']
                              );
    }
    
  
    return $VarientData;
}

/**
* @description=> CalculateCart
* @param  =>
* @return => 
*/
public function  CalculateCart($OrderVarient_data,$checkIn_parse){
 $storeAddress=$checkIn_parse['addr'][0];
    $buyerAddress=$checkIn_parse['addr'][1];
  $shippingAddress=(isset($buyerAddress[$checkIn_parse['addr_id']]))?$buyerAddress[$checkIn_parse['addr_id']]:$storeAddress;

  $total=array(
    'sub_total'=>0.00,
    'tax'=>0.00,
    'sur_charge'=>0.00,
    'shipping_charge'=>0.00,
    'discount'=>0.00,
    'currency'=>0.00,
    'total_weight'=>0.00,
    'total'=>0.00
    );
$sub_total=0.00;
$tax=0.00;
$sur_charge=0.00;
$shipping_charge=floatval($shippingAddress['d_sch']);
$discount=floatval($checkIn_parse['dData']['total']);
$currency=0.00;
$total_weight=0.00;

$shipping_range=json_decode($shippingAddress['d_ch']);
//first sub total

foreach($OrderVarient_data as $p=>$q){
  $ammount=floatval($q['sP'])*floatval($q['q']);

     if ($q['Wu'] == 'g') {
            $weight = (floatval($q['W']) / 1000) * floatval($q['q']);

            } else {
             $weight = (floatval($q['W'])) * floatval($q['q']);

            }

  $total_weight =   $total_weight +   floatval($weight);
  $sub_total = $sub_total+ floatval($ammount);
}

if($shippingAddress['da']==1){//home delivery
     $limit = 0;
   foreach($shipping_range as  $q => $range){

        if($shippingAddress['d_type']=="0"){ //weight based

              if ($total_weight <floatval($range[0]) && $total_weight > $limit) {

                        if ($q != 0) {
                            $limit = floatval($range[0]);
                           $shipping_charge = floatval($range[1]);
                        } else {
                           $shipping_charge = floatval($range[1]);
                        }
                    }
                   $l = (count($shipping_range ) - 1);

                    if ($total_weight > floatval($shipping_range[$l][0])) {

                       $shipping_charge = floatval($shipping_range[$l][1]);

                    }


              }
        if($shippingAddress['d_type']=="1"){ //price based
            
              if ($sub_total < floatval($range[0]) && $sub_total > $limit) {

                        if ($q != 0) {
                            $limit = floatval($range[0]);
                           $shipping_charge = floatval($range[1]);
                        } else {
                           $shipping_charge = floatval($range[1]);
                        }
                    }
                   $l = (count($shipping_range ) - 1);

                    if ($sub_total  > floatval($shipping_range[$l][0])) {

                       $shipping_charge = floatval($shipping_range[$l][1]);

                    }

              }


    }

 $total['shipping_charge']=$shipping_charge+$sur_charge;
 $total['total']=$sub_total+$shipping_charge;
}else{//self collect
    
 $total['shipping_charge']=$shipping_charge+$sur_charge;
 $total['total']=$sub_total+$shipping_charge;
}

//-- apply discount shipping iffect
if($checkIn_parse['dData']['ifs']){
 $total['shipping_charge']=0.00;
 $total['total']=$sub_total; 
}
//-- apply main discount 
 $total['total']=floatval( $total['total'])-$discount;


 $total['discount']=$discount;
 $total['total_weight']=$total_weight;
 $total['sub_total']=$sub_total;
 $total['currency']=$checkIn_parse['currency'];


return $total;
}




/*------===Retrive===------*/
/**
* @description=> GetActiveCheckin
* @param  =>array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','entity_id'=>$ActorEntityData['EntityData']['entity_id'],'selected_id'=>'','search_str'=>$args['search_str'])
* @return => 
*/
public function GetActiveCheckinAtStore($args=array()){
   



         
 $WHERE='
 b.store_id	='.$this->Store_id.' 
AND  a.members LIKE \'%"'.$args['entity_id'].'"%\' 
 AND  a.conversation_id  NOT IN ( SELECT b.conversation_id FROM  '.DB_NAME.'.conversation b
                                 WHERE   b.is_delete LIKE \'%"'.$args['entity_id'].'"%\' 
                                 )
 AND b.conversation_id = a.conversation_id
 ';


 $FROM=''.DB_NAME.'.conversation a , '.DB_NAME.'.checkins b  ';




 $numsql='SELECT COUNT(*) FROM '.$FROM.'
 WHERE    '. $WHERE.'


';

     //-- retrive_mode
 
 

$selectsql='SELECT * FROM '.$FROM.'
 WHERE  '. $WHERE.'
ORDER BY a.lastactivity_time DESC          
                       ' ;


 $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);
//linit sql
 $limit=' LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'';
 $selectsql.=$limit;
 //check_response( $total_result);
//check_response($paging_data);
//check_response($selectsql);
//check_response($numsql);

   $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;




        return PagingOutPut(array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$result,
          'totalpage'=>$paging_data['total_page'],
          'totalresult'=>$total_result,
          'searchstr'=>$args['search_str'],
          'selectedid'=>$args['selected_id'] 
             ));
}




/*------===Parse===------*/

 /**
* @description=> get the current member rol
* @param  =>
* @return => 
*/
public function ParseCheckInChat($Fields,$args=array()){
     $ret=array();$group_date = '';
     $members=$this->GetCheckInMember($args['checkIn_row']);
   for($i=0,$j=0;$j<count($Fields);$j++){
  $row_type=0; 
   $message_date=DateChatGrouping($Fields[$j]['time_gmt']);
            if( $group_date!=$message_date){
                $row_type=1;
                $group_date=$message_date;
            }
                //--row_type ==1 for date grouped message
    if($row_type==1){
       

      $ret[$i]['type']=3;
      $ret[$i]['message']=DateChatGrouping($Fields[$j]['time_gmt']);
      $ret[$i]['facet']=1;
      $ret[$i]['date']= $group_date;
        $i++;
    }


   $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('CheckInMessage');

$ret[$i]['mid']=$Fields[$j]['messages_id'];
$ret[$i]['msg']=$Fields[$j]['message'];
$ret[$i]['date']=$Fields[$j]['time_gmt'];
$ret[$i]['dateday']=date_dayformat($Fields[$j]['time_gmt']);
$ret[$i]['tn']=$Fields[$j]['time_node'];
$ret[$i]['sid']=$Fields[$j]['sender_id'];
$ret[$i]['sidr']=$this->GetSenderRole($members,$Fields[$j]['sender_id']);
$ret[$i]['type']=($Fields[$j]['sender_id']===$args['entity_id'])?0:1;
$ret[$i]['facet']=1;
// check attackment
if($Fields[$j]['attachments_id']!=NULL){
   $attachments_info=array();
   switch($Fields[$j]['attachments_type']){
case 0:
$attachments_info=$GLOBALS['Var_BundlePrototype']->DefaultValue('Product_basic');  

break;       
case 1:
$attachments_info=$GLOBALS['Var_BundlePrototype']->DefaultValue('Product_basic');  
break; 
case 2:
$attachments_info=$GLOBALS['Var_BundlePrototype']->DefaultValue('Product_basic');  
break; 
case 3:
$attachments_info=$GLOBALS['Var_BundlePrototype']->DefaultValue('Product_basic');  
break; 

   }
   
   
$ret[$i]['attmt']= array('has'=>1,
                        'type'=>$Fields[$j]['attachments_type'],
                        'id'=>$Fields[$j]['attachments_id'],
                        'info'=> $attachments_info
                      );
}  


    $i++;





          }

           

     return $ret;
}

/**
* @description=>parse  the retrive checins table row to browsing data
* @param  => 
* @return => 
*/

public function ParseCheckInData($Fields,$args=array()){
     $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
    $parseData=$GLOBALS['Var_BundlePrototype']->DefaultValue('storebrowsingData');

  
    $NormalToArray =$GLOBALS['Var_Conversation']->ParseConversationRowToNormal($Fields);
    $Fields['LChT']=$NormalToArray['last_check_time']; 
    $Fields['members']=$NormalToArray['members'];   
         
    $parseData['id']= $Fields['checkIn_id'];          
    $parseData['checkIn_id']= $Fields['checkIn_id'];
    $parseData['cid']= $Fields['conversation_id'];

    $parseData['LChT']= $Fields['LChT'];  
    $parseData['iuc']=$Fields['Instant_Updater_code'];
    $parseData['iu_hash']=$Fields['Instant_Updater_hash'];  

    $parseData['checkInTime']= $Fields['checkInTime_gmt'];  
    $parseData['min_o']= $this->Store_EntityRow['private_data']['minimum_order']; 
    $members=$this->GetCheckInMember($Fields);
    $Fields['members']=   $members;
   $parseData['Edindex']= $this->GetEntityRole( $members);  

   $AllAddress=array(); $AllEntityRow=array();
   for($i=0;$i<count($members);$i++){
   $EntityInformation= new EntityInformation($members[$i],$ActorEntityData['EntityData']['entity_id']);
    $EntityRow=$EntityInformation->frontuser_EntityRow;
    $AllEntityRow[]=$EntityRow;
    $parseData['Ed'][]=$EntityInformation->EntityStripdata($EntityRow);;
    $AllAddress[]=   $GLOBALS['Var_ViewParse']->EntityAddress($EntityRow);
   }
    
  
    $parseData['role']=$this->GetEntityRole( $members);  
    
  //    $parseData['currency']='INR';


    if($parseData['role']==1){//show addresss only to main buyer
   
     
 
     
  
   //check shipping to main user adddress
   $storeZoneType =$AllEntityRow[0]['private_data']['shippingZonetype'];
 if(is_numeric_index_array($AllAddress[1])){
foreach($AllAddress[1] as $g=>$address ){
 $AllAddress[1][$g] = $this->CalulatedShippingChargeOnAddress($AllAddress[1][$g],$members[0],$storeZoneType); 
}
 
}
 


   $parseData['addr']=  array($AllAddress[0],$AllAddress[1]);       

   //buyer private data
     $buyersPrivate_data= JsonTrueDecode($Fields['buyersPrivate_data'],array()) ; 

   $buyersPrivate_data= True_array_merge( $GLOBALS['Var_BundlePrototype']->DefaultValue('checkinBuyerPrivateData'), $buyersPrivate_data);

     $parseData['addr_id']=  $buyersPrivate_data['address_id']; 
   }


   //-->>
    //    check_response($mainUserLocationId);  
  //check_response($CheckDelivery); check_response($members[0]);
  //-->>suggestedProducts_id
  $cartVarient_id=array();
$cartVarient_idRaw=$Fields['cartVarient_id'];
if($cartVarient_idRaw!=NULL){
$cvD_raw=explode(",", $cartVarient_idRaw);  
$cvPD_raw=JsonTrueDecode($Fields['cartVarient_data'],$parseData['cvD']);  


//check
$parseData['cvPD']=$parseData['cvD']=array();
if(is_array($cvD_raw)){
    foreach($cvD_raw as $cvD){
        if($cvD>0){
          if(isset($cvPD_raw[$cvD])){
         $parseData['cvPD'][$cvD] =$cvPD_raw[$cvD];  
        $parseData['cvD'][] =$cvD;  
        } 
        }
        
    }
}
}
//-->>

  //-->>shortlistedProducts_id
  $shortlistedProducts_id=array();
$shortlistedProducts_idRaw=$Fields['shortlistedProducts_id'];
  if($shortlistedProducts_idRaw!=NULL){
$parseData['slPD']=explode(",", $shortlistedProducts_idRaw);  
}
//-->>
  //-->>suggestedProducts_id
  $suggestedProducts_id=array();
$suggestedProducts_idRaw=$Fields['suggestedProducts_id'];
  if($suggestedProducts_idRaw!=NULL){
$parseData['suPD']=explode(",", $suggestedProducts_idRaw);  
}
//-->>
// filling pbank with product info
$cartProdcutid=array();
foreach($parseData['cvPD'] as $value ){
    $cartProdcutid[]=$value[1];
}

$Pbank =True_array_merge($cartProdcutid,$parseData['slPD'],$parseData['suPD']);
$parseData['Pbank']=[];
if($args['Pbank']==1){
 /*$parseData['Pbank'] = $GLOBALS['Var_StoreDashboard']->ParseProducts($GLOBALS['Var_StoreDashboard']->RetriveById(array('table'=>'store_productsByIdArray','product_id'=>$Pbank,'entity_id'=>$this->Store_id)));*/


}



    return  $parseData;


}
/**
* @description=>parse  the retrive checins table row to browsing data
* @param  => 
* @return => 
*/
public function ParseActiveCheckinAtStore($Fields,$args=array()){
        $ret=array();
$ActorEntityData =   $GLOBALS['Var_ActorEntityData'];
           for($j=0;$j<count($Fields);$j++){
         $parseData=$GLOBALS['Var_BundlePrototype']->DefaultValue('storebrowsingData');      
    $parseData['checkIn_id']= $Fields[$j]['checkIn_id'];
    $parseData['checkInTime']= $Fields[$j]['checkInTime_gmt'];  
   $members=$this->GetCheckInMember($Fields[$j]);
  
   for($i=0;$i<count($members);$i++){
   $EntityInformation= new EntityInformation($members[$i],$ActorEntityData['EntityData']['entity_id']);
    $EntityRow=$EntityInformation->frontuser_EntityRow;
    $parseData['Ed'][]=$EntityInformation->EntityStripdata($EntityRow);;

   }


    



         $ret[$j]=$parseData;
           }
           return $ret;
}

/*------===Internal utilty fucntion===------*/
/**
* @description=>Return the location surcharge form the location surchage list
* @param  => 
* @return => 
*/
function GetLocationSurchage($LocationSurChargeData,$Lcoation_id){
    $surcharge=0;
    foreach( $LocationSurChargeData as $value){
       if($value[0]==$Lcoation_id){
            $surcharge=$value[1];  
       } 

    }
    return $surcharge;
}
/**
* @description=>calculate shipping charge on address
* @param  => 
* @return => 
*/
function CalulatedShippingChargeOnAddress($address,$store_id,$storeZoneType){
  $parseData=$GLOBALS['Var_BundlePrototype']->DefaultValue('ShippingDataforAddress');
 
   $mainUserLocationId= $address['location']['id'];
   $CheckDelivery=  $this->CheckDelivery($mainUserLocationId,$store_id,$storeZoneType);
     // check_response( $CheckDelivery);
   if($CheckDelivery!=NULL){
  $LocationSurChargeData=JsonTrueDecode($CheckDelivery['location_data'],array());

      $parseData['da'] =1;
      $parseData['d_type'] =$CheckDelivery['type'];
      $parseData['d_ch'] =$CheckDelivery['range_data'];
      $parseData['d_des']=$CheckDelivery['description'];   
      $parseData['d_time']=$CheckDelivery['processing_time'];   
      $parseData['d_sch'] = $this->GetLocationSurchage($LocationSurChargeData,$mainUserLocationId);      
      
         }   

 $parseData=True_array_merge($address,$parseData);
 
       
         return  $parseData;

}



 }

?>