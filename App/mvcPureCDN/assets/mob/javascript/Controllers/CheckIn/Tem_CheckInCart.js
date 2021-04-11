/*
* 
*/
; (function(W){
   "use strict";
     

W.T.CheckinCart=(function(){

var t={
     t0:function(){
         var ch='';


  var SBData= W.U.StoreCheckIn.SBData; 
  console.log(SBData);
 var cvD=SBData.cvD;
 var cvPD=SBData.cvPD;
 ch+='<div class=" block _bdy h50  al-c tt-u ff-2 "><h3>Cart</h3></div>';
 if(cvD.length>0){
   for(var q in cvD){
     var info=W.U.StoreBrowsing.GetPbankData('',cvD[q]); 
     var quentity=  cvPD[cvD[q]][0];
var CartCardsetting={quentity:quentity,closebtn:true,varientid:cvD[q],type:'cart',role:SBData.role};
   ch+='<div class="block m_b10" ><div class="block  bg_0 " >'+W.T.C.C2_CartCard(info,CartCardsetting)+'</div></div>'; 

 }  

 ch+=t.t1();
 ch+=t.t2();  
 }else{
     ch+='<div class="block _bdy bg_0 m_b10"> <p class="al-c"> Your shopping cart is empty.</p> </div>'; 
 }
 

        return ch;
     },
     t1:function(){
 var SBData= W.U.StoreCheckIn.SBData,
 d_ch=JSON.parse(SBData.d_sch),
 d_sch=SBData.d_sch,
 d_type=SBData.d_type,
 da=SBData.da,
 cvD=SBData.cvD,
 cvPD=SBData.cvPD;

var  CalculateCart=W.U.StoreBrowsing.CalculateCart();

  var sub_total = CalculateCart.sub_total,
  total_weight = CalculateCart.total_weight,
 total = CalculateCart.total,
 shipping_charge = CalculateCart.shipping_charge,
 sur_charge = CalculateCart.sur_charge,
  currency=CalculateCart.currency;

  


   return '<div class="block _bdy"><div class="block"> <div class="w8 left b_grl al-r" > <span class="fw-b" style="margin-right: 10px;"> Total Weight</span> </div> <div class="w4 left "> <div class="block m_b5 al-r  "> <span class="bg-price m0">'+total_weight+' kg </span> </div></div> </div><div class="block"> <div class="w8 left b_grl al-r" > <span class="fw-b" style="margin-right: 10px;">Sub Total</span> </div> <div class="w4 left "> <div class="block m_b5 al-r  "> <span class="bg-price m0">'+currency+' ' + sub_total + '</span> </div></div> </div> <div class="block"> <div class="w8 left b_grl al-r" > <span class="fw-b" style="margin-right: 10px;"> Shipping &Handling Charges</span> </div> <div class="w4 left "> <div class="block m_b5 al-r  "> <span class="bg-price m0">'+currency+' ' + shipping_charge + '</span> </div></div> </div> <div class="block "> <div class="w8 left b_grl al-r " > <span class="fw-b" style="margin-right: 10px;"> Total</span> </div> <div class="w4 left "> <div class="block m_b5 al-r "> <span class="bg-price m0">'+currency+' ' + total + '</span> </div></div> </div></div>';

     },
     t2:function(){
  var ch='<div class="block _bdy_0-5 "  data-junction="cartlocationset"></div>';

W.U.JunctionAdd(W.A.page.AppId,'cartlocationset',function(){
 W.U.CheckInCart.cartlocationset.bind({Node:this.Node})();
  },{}); 

 
 return ch;
     }

 };  

 function ContentCart(SBData){

 var URL=W.U.URL;
  var mid =  '<div class="block   ">';
   mid +='<div class="block " data-nodeid="checkincartcon" ></div>';
   mid +='<div class="block _bdy" ></div>';
   mid +='</div>';

     var foot = '';
    var header= W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="checkin" >'+W.T.SVG('checkIn',24,'#f1f5fc')+'</a>',
    Title:'<a href="/" class="left"><span class="title" >Checkin Cart</span><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    });
 

  return  W.T.wrap(header,mid,foot);
 }  
  
    
return {
ContentCart:ContentCart,
t:t
};
})();

 


})(wowrol);