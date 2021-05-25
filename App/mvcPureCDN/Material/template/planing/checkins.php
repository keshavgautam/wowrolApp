
<div class="block t _bdy bg_0 fg_5 ff_3 _B-gray _Bdy">
    <p>
    * buyer user goto visit storeProfilePage than its checkin is automaticaly started. a unique checkinid will generated. there is two key parameter store entity and creater entity.
    </p>  <p>
  *  When buyer user does not click on check-in button. In this condition buyer user solo purchase the Product.
    </p>  <p>
     * [Privacy Consern]  Wowrol does track Products  brosered by you on Store. 
    </p>  <p>
  * [Checkin Purpose]  Wowrol checkin gives you in store shopping expirience.When you browse a store through check-in you may invite your friends to shopping discussion with store.
    </p>  <p>
  * [The Pratical offline Shopping]  a buyer go on shoping with firends or   family meembers. the Group enter into the store. Either store Owner or store staff comes to attend them. Store repersentive try know there shoiping requerment. and offer the prodcuts to them.  the group checkout  with any perchase or without it. All this process happen 30 to 45 minutes.


    </p>  <p>
 * [Programatical  translation the situation ]
var  buyer_A , Store_A ,Store_A_Friends["",""]

-buyer_A click on Store_A checkin button
- check on server tht user buyer_A is not active on this store.
-  if(true){
- Buyer con start can checkin with new friends 
-  Store_A_Friends["",""] Receve a notification about check in   to shopping discussion 
-  a Normal Group converstion started.
- On Explore tab any member can brower the product and suggest. 
-  any product suggestion will genrate a group text          
       
    }else{
- A Notification shown to About active check in with link   
    }


    </p>  <p>


   *  Creater buyer  has right to add his friend  to check-in. which is call inviting friend to check-in.
     </p>  <p>
   * so  we  have to create a unique group for it .     
    
     </p>  <p>
    
      
          
    </p>


<pre>
Table: checkins
$checkIn=array(
	'checkIn_id' => '1',
	'buyer_id' => '2',
	'buyers_id' => NULL,
	'store_id' => '1',
	'shortlistedProducts_id' => '8,7,5',
	'suggestedProducts_id' => NULL,
	'cartVarient_id' => NULL,
	'cartVarient_data' => NULL,
	'buyersPrivate_data' => NULL,
	'storestaff_id' => NULL,
	'checkInTime_gmt' => '2016-06-05 15:45:48',
	'order_id' => NULL,
	'last_check_time' => '[1465121748,1465121748]'
)


</pre>
<pre>
Table: checkinmessages
$checkinmessages=array(
	'messages_id' => '1',
	'message' => 'sdfsdf',
	'checkIn_id' => '1',
	'recevers_id' => '"1","2"',
	'sender_id' => '1',
	'attachments_id' => NULL,
	'attachments_type' => NULL,
	'time_gmt' => '2016-06-05 15:46:21',
	'receversDelete_id' => '"1"'
) ,


</pre>
    
    
<blockquote>
<pre style="color: black;">*  . attachments_type reference
     code                          des
1     0                           cart Variant id
2     1                           shortlist product Id
3     2                           suggestion product Id
4     3                           inquiry Variant id  
5     4                        adding the buyer friend by buyer  
6     5                        removing the buyer friend by buyer    
7     6                        leaving the buyer friend by self friend
8     7                         order status update
9     8                         opration error message
10    9                         single image
11    10                       secret discount coupan [ Only main buyer of checin can see ]
12    11                       public discount coupan [All member of group can see]
13    12                       Product share in convarstion
14    13                       category share in convarstion
15    14                       store share in convarstion
16    15                       market share in convarstion
17    16                       shortlist remove
18    17                       suggestion remove
19    18                       cart remove
</pre>

<pre style="color: black;"></pre>
</blockquote>
</div>
