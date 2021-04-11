/*
* 
*/
; (function(W){
   "use strict";
     

W.T.CheckinCheckout=(function(){

var t={
     t0:function(){
         var ch='';
console.log('asdasasd asdasdasda asd asdasd asdasd');

  var SBData= W.U.StoreCheckIn.SBData; 
 var cvD=SBData.cvD;
 var cvPD=SBData.cvPD;
 ch+='<div class=" block _bdy h50  al-c tt-u ff-2 "><h3>Checkout</h3></div>';
 if(cvD.length>0){
ch+='<div class="block _B-gray bg_0 m_b5"> <div class=" block _bdy al-c ff-2 fs14 "><span class="tt-u">Payment Method </span><span class="fw-b">Cash On Delivery </span> <p>Pay with cash when ' + SBData.Ed[0].entityName+'  deliver cart items to you</p></div> </div>';
 ch+=t.t1(SBData);
 ch+=t.t2(SBData);  
 ch+=t.t3(SBData); 
 ch+=t.t4(SBData);

 }else{
     ch+='<div class="block _bdy bg_0 m_b10"> <p class="al-c"> Your shopping cart is empty.</p> </div>'; 
 }
 

        return ch;
     },
   t1:function(x){
var ch='';
  if( x.da==1 ){
   ch=t.t10(x);   
  }   
  if( x.da==0 ){
  ch=t.t11(x);     
  }  

  return ch;
   },
   t10:function(x){
     var ch='<div class="block _B-gray bg_0 m_b5"> <div class=" block _bdy al-c ff-2 fs14 "><span class="tt-u ">shipping Method</span><span class="fw-b span">Home Delivery </span> </div> </div>';
     
     return ch;  
   },
   t11:function(x){
     var ch='<div class="block _B-gray bg_0 m_b5"> <div class=" block _bdy al-c ff-2 fs14 "><span class="tt-u span">shipping Method </span><span class="fw-b span">Self collect</span> <p>Self pick up the cart items from the address given below</p></div> </div>';
      return ch;  
   },
   t2:function(x){
var ch='';
  if( x.da==1 ){
   ch=t.t20(x);   
  }   
  if( x.da==0 ){
  ch=t.t21(x);     
  }  

  return ch;
   },
   t20:function(x){
    var ch='<div class="block _B-gray bg_0 m_b5 _bdy ">';
        var addr=x.addr[1]['Home'];
     var homeAddressView='<div class="block m_b5 _bdy fw-b po-re">Store Address <a class="ad-6 po-ab " href="javascript:void(0);" data-openbtn="checkouthomeAddress" data-btnid="CheckouthomeAddressEdit" >Edit Address</a></div><a href="javascript:void(0);" class="hide"  data-openbtn="checkouthomeAddress" data-btnid="CheckoutLoading"></a><div class="block  m_b5 _bdy"><div data-help="buyersetting_1"></div><div class="form-piece t"> <label class="control-label">Address </label> <p>'+addr.address+'<p> <div data-help="address"></div></div><div class="form-piece t"> <label class="control-label">Location </label> <p>'+addr.pincode+' '+addr.location_name+' '+addr.Districtname+' '+addr.Statename+' '+addr.Country+' <p> <div data-help="pincode"></div></div><div class="form-piece t"> <label class="control-label">Phone</label>  <p>'+addr.phone+'<p> <div data-help="phone"></div></div> </div>';

     var homeAddressEdit='<div class="block m_b5 _bdy fw-b po-re">Edit Home Address <a class="ad-6 po-ab " href="javascript:void(0);" data-closebtn="checkouthomeAddress" >Close</a></div><form name="checkoutbuyeraddress" onsubmit="return false;"><div class="block m_b5"><div data-help="checkoutbuyeraddress"></div><div class="form-piece"> <label class="control-label">Address <i>*</i></label> <textarea name="address" class="form-mold  m_b5 textarea" placeholder="Address " autocomplete="off" rows="3">'+addr.address+'</textarea> <div data-help="address"></div></div><div class="form-piece"> <label class="control-label">Pincode </label> <p>'+addr.pincode+' '+addr.location_name+' '+addr.Districtname+' '+addr.Statename+' '+addr.Country+' <p> <div data-help="pincode"></div></div><div class="form-piece"> <label class="control-label">Phone </label>  <p>'+addr.phone+'<p> <div data-help="phone"></div></div> </div><div class="block fg_00 m_b5"> <div class="right"> <a href="javascript:void(0);" class="btn btn-xs " data-onsave="homeaddress" >Save</a></div> </div></form>';

     var Loading='<div class="block sr-bgC _bdy m_b5 al-c">'+W.U.loading_svg(80,80)+'<a href="javascript:void(0);" class="hide"  data-closebtn="checkouthomeAddress" ></a></div>';

var blockList=[homeAddressView,homeAddressEdit,Loading];
var blockName=["CheckouthomeAddressView","CheckouthomeAddressEdit","CheckoutLoading"];


var setting ={
    name:'checkouthomeAddress',
    parent:"",
    target:"CheckouthomeAddressView",
    page:false,
    minheight:'auto'
};

   ch+=W.T.ToggleBlock(blockList, blockName,setting);; 
         ch+='</div>';
     return ch;  
   },
   t21:function(x){
     var ch='<div class="block _B-gray bg_0 m_b5 _bdy">';
      var addr=x.addr[0]['Work'];
    

      ch+='<div class="block m_b5 _bdy fw-b ">Store Address</div><div class="block  m_b5 _bdy"><div data-help="buyersetting_1"></div><div class="form-piece t"> <label class="control-label">Address </label> <p>'+addr.address+'<p> <div data-help="address"></div></div><div class="form-piece t"> <label class="control-label">Location </label> <p>'+addr.pincode+' '+addr.location_name+' '+addr.Districtname+' '+addr.Statename+' '+addr.Country+' <p> <div data-help="pincode"></div></div><div class="form-piece t"> <label class="control-label">Phone</label>  <p>'+addr.phone+'<p> <div data-help="phone"></div></div> </div>';


      ch+='</div>';
      return ch;  
   },
   t3:function(x){
var  CalculateCart=W.U.StoreBrowsing.CalculateCart();

var ch='<div class="block _B-gray bg_0 m_b5"> <div class=" block _bdy al-c ff-2 fs14 "><span class="tt-u ">payable amount</span><span class="span fw-b">'+CalculateCart.currency+' '+CalculateCart.total+'</span> </div> </div>';


  return ch;
   },
   t4:function(x){
      var ch='<div class="block m_b5"> <div class="w8 al-l"><div class="block "></div></div> <div class="w4 al-r"><div class="block"><button type="button" class="btn _ebtn " data-onsave="palceorder"      >PLACE ORDER</button></div></div><div class="block m_b5" data-help="RagisterShippingOrder" > </div></div>';
      
      
      return ch; 
   }
 };  

 function ContentCheckout(SBData){

 var URL=W.U.URL;
  var mid =  '<div class="block   ">';
   mid +='<div class="block " data-nodeid="checkincheckoutcon" ></div>';
   mid +='<div class="block _bdy" ></div>';
   mid +='</div>';

     var foot = '';
    var header= W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="checkin" >'+W.T.SVG('checkIn',24,'#f1f5fc')+'</a>',
    Title:'<a href="/" class="left"><span class="title" > Checkout</span><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    });
 

  return  W.T.wrap(header,mid,foot);
 }  
  
    
return {
ContentCheckout:ContentCheckout,
t:t
};
})();

 


})(wowrol);