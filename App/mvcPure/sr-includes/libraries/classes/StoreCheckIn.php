<?php

  abstract  class StoreCheckIn{
 public $Store_id;


   function __construct($Store_id) {
               $this->Store_id=$Store_id;
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
$CheckIn=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'checkins', array('buyer_id','store_id'),array($ActorEntityData['EntityData']['entity_id'],$this->Store_id)); 



  if($CheckIn==NULL&&$this->Store_id!=0&&$ActorEntityData['EntityData']['type']==0){
    $last_check_time=Makejson(array(time(),time()));
      
$CheckIn['checkIn_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'checkins', array('buyer_id','store_id','last_check_time'),array($ActorEntityData['EntityData']['entity_id'],$this->Store_id, $last_check_time)); 

$CheckIn=$GLOBALS['Var_DBMysqli']->getrow(DB_NAME,'checkins', array('checkIn_id'),array($CheckIn['checkIn_id'])); 
  }


  return $CheckIn;
}



/*------===Ragister===------*/

/**
* @description=> Send a checkin message
* @param  =>
* @return => 
*/
public function SendCheckinTextMessage($args){
   $args['checkIn_id']=$args['checkIn_row']['checkIn_id'];
     $args['sender_id']=$args['ActorEntityData']['EntityData']['entity_id'];


    $args['message_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'checkinmessages',array('message','recevers_id','checkIn_id','sender_id','time_gmt','time_node'),array($args['message'],$args['recevers_id'],$args['checkIn_id'],$args['sender_id'],$args['dateGMT'],time()));

  return  $args;
}
/**
* @description=> Send a checkin message
* @param  =>
* @return => 
*/
public function SendCheckinAttechmentMessage($args){
    //$args bulid in ragistration->CheckInShortListEdit
     $args['checkIn_id']=$args['checkIn_row']['checkIn_id'];
     $args['sender_id']=$args['ActorEntityData']['EntityData']['entity_id'];
   //deleteing if any same type
    $GLOBALS['Var_DBMysqli']->delete(DB_NAME,'checkinmessages',array('checkIn_id','attachments_id','attachments_type'),array($args['checkIn_id'],$args['attachments_id'],$args['attachments_type']));
   

      $args['message']='';//by default
    $args['message_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'checkinmessages',array('message','recevers_id','checkIn_id','sender_id','attachments_id','attachments_type','time_gmt','time_node'),array($args['message'],$args['recevers_id'],$args['checkIn_id'],$args['sender_id'],$args['attachments_id'],$args['attachments_type'],$args['dateGMT'],time()));

  return  $args;
}
/**
* @description=> Edit checkin Suggest Product
* @param  =>
* @return => 
*/
public function CartEdit($args){
 
     // update it

  $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'checkins',array('cartVarient_id','cartVarient_data'),array($args['cartVarient_id_Str'],$args['cartVarient_data_Json']),array('checkIn_id'),array($args['checkIn_row']['checkIn_id']));

    

  if($update=="updated"&&$args['CareteChatMsg']){//sending message
      $this->SendCheckinAttechmentMessage($args);


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
      $this->SendCheckinAttechmentMessage($args);
  }

  return $update;
 
   
}
/**
* @description=> 
* @param  =>
* @return => 
*/
public function MembersEdit($args){
    
     // update it

  $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'checkins',array('buyers_id'),array($args['buyers_id_Str']),array('checkIn_id'),array($args['checkIn_row']['checkIn_id']));

 if($update=="updated"&&$args['CareteChatMsg']){//sending message
      $this->SendCheckinAttechmentMessage($args);
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
      $this->SendCheckinAttechmentMessage($args);
  }

  return $update;
 
   
}
/**
* @description=>RagisterShippingOrder
* @param  => 
* @return => 
*/
 public function RagisterShippingOrder($args){
     
      $args['order_id']=$GLOBALS['Var_DBMysqli']->insert(DB_NAME,'orders',array('buyer_entity_id','store_entity_id','order_type','order_data','order_status','order_time','cartVarient_id','cartVarient_data','shipping_address'),array( $args['buyer_entity_id'],$args['store_entity_id'],$args['order_type'],$args['order_data'],$args['order_status'],$args['dateGMT'],$args['cartVarient_id'],$args['cartVarient_data'],$args['shipping_address']));

//--deleteing cart items and suggestions



//
//--ragister order activity
 /*
$GLOBALS['Var_Activity']->RagisterMainActivity(array('creater_id' =>$args['creater_id'],'object_id' =>$args['object_id'],'activity_code' => '702')); 
*/
//--==
//--sending a email to seller


  $GLOBALS['Var_ExternalNotification']->Neworder_to_seller($args['email_data']);


 }
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
   $ActorEntityData=$GLOBALS['Var_ActorEntityData'];
 $entity_id=  $ActorEntityData['EntityData']['entity_id'];
 $Role='unvalid';
   foreach ($Member as $q =>$v){
       if($entity_id==$v){
           $Role =$q;
       }
   }


   return $Role;
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
* @description=> get the LastchatcheckTime
* @param  =>
* @return => 
*/
public function LastchatcheckTime($Fields){
     $members= $this->GetCheckInMember($Fields); 
      $role=$this->GetEntityRole($members); 
    $last_check_time=JsonTrueDecode($Fields['last_check_time'],array());
    $ret=time();
   if($role!=='unvalid'){
   $ret=$last_check_time[$role];

   }

   return $ret;
}
/**
* @description=> update Last chat check time
* @param  =>
* @return => 
*/
public function UpdateLastchatcheckTime($Fields){
        $members= $this->GetCheckInMember($Fields); 
      $role=$this->GetEntityRole($members); 
    $last_check_time=JsonTrueDecode($Fields['last_check_time'],array());
  
   if($role!=='unvalid'){
   $last_check_time[$role]=time();
    $update=$GLOBALS['Var_DBMysqli']->update(DB_NAME,'checkins',array('last_check_time'),array(Makejson($last_check_time)),array('checkIn_id'),array($Fields['checkIn_id']));
   }

}

/**
* @description=> check delivery
* @param  =>
* @return => $shipping table row || Null
*/
public function CheckDelivery($Location_id,$Store_id){
    $ret=NULL;
    if($Location_id!=''){
       $selectsql='SELECT * FROM '.DB_NAME.'.store_shipping a 
 WHERE a.entity_id	='.$Store_id.' 
 AND  a.locations	LIKE "%'.$Location_id.'%"  
 LIMIT 1     ';
     $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;
    
     if(count($result)>0){
          $ret=$result[0];
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
  $total=array(
    'sub_total'=>0.00,
    'tax'=>0.00,
    'sur_charge'=>0.00,
    'discount'=>0.00,
    'currency'=>0.00,
    'total_weight'=>0.00,
    'total'=>0.00
    );
$sub_total=0.00;
$tax=0.00;
$sur_charge=0.00;
$shipping_charge=floatval($checkIn_parse['d_sch']);
$discount=0.00;
$currency=0.00;
$total_weight=0.00;

$shipping_range=json_decode($checkIn_parse['d_ch']);
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

if($checkIn_parse['da']==1){//home delivery
     $limit = 0;
   foreach($shipping_range as  $q => $range){

        if($checkIn_parse['d_type']=="0"){ //weight based

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
        if($checkIn_parse['d_type']=="1"){ //price based
            
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
    


    $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.checkins a 
 WHERE a.store_id	='.$this->Store_id.' 
 AND  (  a.buyer_id	='.$args['entity_id'].'
         OR a.buyers_id	LIKE "%'.$args['entity_id'].'%"  
        )

 ';
   $total_result=$GLOBALS['Var_DBMysqli']->numquery($numsql);
   //--paging data
$paging_data=paging_data($total_result,$args['pagesize'],$args['paged']);


 $selectsql='SELECT * FROM '.DB_NAME.'.checkins a 
 WHERE  a.store_id	='.$this->Store_id.' 
 AND  (   a.buyer_id	='.$args['entity_id'].'
         OR a.buyers_id	LIKE "%'.$args['entity_id'].'%"  
        )
ORDER BY a.checkInTime_gmt DESC

 ';
 /*
 LIMIT '. $paging_data['loop_start'].','.($paging_data['loop_limit']-$paging_data['loop_start']).'
 */
 //check_response( $total_result);
//check_response($paging_data);
//check_response($selectsql);

   $result=$GLOBALS['Var_DBMysqli']->query($selectsql);;

    return array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=>$result,
          'totalpage'=>$paging_data['total_page'],
          'searchstr'=>$args['search_str'],
          'selectedid'=>$args['selected_id']
             );
}
/**
* @description=> get the current member rol
* @param  =>array('pagesize'=>$pagesize,'paged'=>$paged,'point_time'=>'','mode'=>'','checkin_id'=>$args['checkin_id'],'checkin_row'=>$args['checkin_row'],'selected_id'=>'','search_str'=>'')
* @return => 
*/
 public function RetriveCheckInChat($args=array()){
     
  if($args['mode']==1){
  
    $retrive_mode='a.time_node >= '.$args['point_time'];   
   }else{
      $retrive_mode='a.time_node <= '.time();  
   }


 $numsql='SELECT COUNT(*) FROM '.DB_NAME.'.checkinmessages a
 WHERE a.checkIn_id='.$args['checkin_id'].'
 AND  a.messages_id NOT IN (SELECT b.messages_id FROM '.DB_NAME.'.checkinmessages b
                      WHERE b.checkIn_id='.$args['checkin_id'].'
                       AND b.receversDelete_id  LIKE "%'.$args['entity_id'].'%"
                       )
 AND '.$retrive_mode.'
';

     //-- retrive_mode
 
 

$selectsql='SELECT * FROM '.DB_NAME.'.checkinmessages a
  WHERE a.checkIn_id='.$args['checkin_id'].'
 AND  a.messages_id NOT IN (SELECT b.messages_id FROM '.DB_NAME.'.checkinmessages b
                      WHERE b.checkIn_id='.$args['checkin_id'].'
                       AND b.receversDelete_id  LIKE "%'.$args['entity_id'].'%"
                       )
 AND '.$retrive_mode.'
         ORDER BY a.time_gmt DESC            
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
 
       //UpdateLastchatcheckTime($args['checkin_row'])
       $this->UpdateLastchatcheckTime($args['checkin_row']);
  
    return array(
          'paged'=>$paging_data['next_page'],
          'pagesize'=>$args['pagesize'],
          'result'=> array_reverse($result),
          'totalpage'=>$paging_data['total_page'],
          'searchstr'=>$args['search_str'],
          'selectedid'=>$args['selected_id']
             );
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
   $message_date=date("d-M-Y h A",strtotime($Fields[$j]['time_gmt']));
            if( $group_date!=$message_date){
                $row_type=1;
                $group_date=$message_date;
            }
                //--row_type ==1 for date grouped message
    if($row_type==1){
       

      $ret[$i]['type']=3;
      $ret[$i]['message']=date("d-M-Y h:i A",strtotime($Fields[$j]['time_gmt']));;
      $ret[$i]['facet']=1;
      $ret[$i]['date']= $group_date;
        $i++;
    }


   $ret[$i]=$GLOBALS['Var_BundlePrototype']->DefaultValue('CheckInMessage');

$ret[$i]['mid']=$Fields[$j]['messages_id'];
$ret[$i]['msg']=$Fields[$j]['message'];
$ret[$i]['date']=$Fields[$j]['time_gmt'];
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
    $parseData['checkIn_id']= $Fields['checkIn_id'];
    $parseData['checkInTime']= $Fields['checkInTime_gmt'];  
   $members=$this->GetCheckInMember($Fields);
   $AllAddress=array();
   for($i=0;$i<count($members);$i++){
   $EntityInformation= new EntityInformation($members[$i],$ActorEntityData['EntityData']['entity_id']);
    $EntityRow=$EntityInformation->frontuser_EntityRow;
    $parseData['Ed'][]=$EntityInformation->EntityStripdata($EntityRow);;
    $AllAddress[]=   $GLOBALS['Var_ViewParse']->EntityAddress($EntityRow);
   }


    $parseData['role']=$this->GetEntityRole( $members);  

    if($parseData['role']==1){//show addresss only to main buyer
     $parseData['addr']=  array($AllAddress[0],$AllAddress[1]);


     
  
   //check shipping to main user adddress
   $mainUserLocationId=$AllAddress[1]['Home']['location_id'];
   $CheckDelivery=  $this->CheckDelivery($mainUserLocationId,$members[0]);
   if($CheckDelivery!=NULL){
  $LocationSurChargeData=JsonTrueDecode($CheckDelivery['location_data'],array());

      $parseData['da'] =1;
      $parseData['d_type'] =$CheckDelivery['type'];
      $parseData['d_ch'] =$CheckDelivery['range_data'];
     
      $parseData['d_sch'] = $this->GetLocationSurchage($LocationSurChargeData,$mainUserLocationId);      
      
         }   
   }


   //-->>
    //    check_response($mainUserLocationId);  
  //check_response($CheckDelivery); check_response($members[0]);
  //-->>suggestedProducts_id
  $cartVarient_id=array();
$cartVarient_idRaw=$Fields['cartVarient_id'];
if($cartVarient_idRaw!=NULL){
$parseData['cvD']=explode(",", $cartVarient_idRaw);  
$parseData['cvPD']=JsonTrueDecode($Fields['cartVarient_data'],$parseData['cvD']);  
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

$Pbank = array_merge($cartProdcutid,$parseData['slPD'],$parseData['suPD']);
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


 }

?>