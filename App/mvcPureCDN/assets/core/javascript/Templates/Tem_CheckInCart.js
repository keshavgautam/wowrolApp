/*
* 
*/
; (function(W){
   "use strict";
     





//--header
function storeheader(SBData){
    var ch='';
    var space='<div class="di-td "><span class="hidden">sd</span></div >';
    var buttonClass=(W.I.wf=='mob')?'header-link-btn':'header-cell';

var backbutton='<div class="di-td  vl-t "><a href="javascript:void(0);" class="block '+buttonClass+'" data-closebtn="mainpage" data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a></div >';



var y=W.U.Browsing.ParseEntityData(SBData.Ed);

   var title='<div class="di-td vl-t  _bdy w212 p1"><div class=" _pnl ma-l-5"><span class="pnl0 truncate ">'+y.entityName+'</span><span class="pnl1 "></span><span class="pnl2  right tt-l"></span></div></div >';
   var avatar='<div class="di-td _bdy">  <a href="javascript:void(0);"> <img class=" round x35" alt="64x64" src="'+y.avatar+'"  > </a></div>';
   if(W.I.wf=='mob'){
     ch+='<div class="block bg_1 fg_6">'  ;
    ch+=backbutton;
   ch+=avatar;
    ch+=title;
    
 
     ch+='</div >' ;
   }
   if(W.I.wf=='web'){
     ch+='<div class="block bs-1-bottom bg_0">'  ;
     if(W.I.initType==3){
    ch+=backbutton;
     }
      ch+=avatar;
   ch+=title;

   
     ch+='</div >' ; 
   }

return ch;
}


var t={
     t0:function(){
         var ch='';


  var SBData=W.U.Browsing.hi_SBdata();
 
 var cvD=SBData.cvD;
 var cvPD=SBData.cvPD;
 ch+='<div class=" block _bdy h50  al-c tt-u ff-2 "><h3>Cart</h3></div>';
 
 if(cvD.length>0){
   for(var q in cvD){
     var info=W.U.Browsing.GetPbankData('',cvD[q]); 
     if(W.U.isOK(info)){
     var quentity=  cvPD[cvD[q]][0];
var CartCardsetting={quentity:quentity,closebtn:true,varientid:cvD[q],type:'cart',role:SBData.role,currencysymbol:SBData.currencydata.symbol};
   ch+='<div class="block m_b10" ><div class="block  bg_0 " >'+W.T.C.C2_CartCard(info,CartCardsetting)+'</div></div>'; 
   }
 }  

 ch+=t.t1();
 ch+=t.t2();  
 ch+=t.t3();  
 }else{
     ch+='<div class="block _bdy bg_0 m_b10"> <p class="al-c"> Your shopping cart is empty.</p> </div>'; 
 }
 
 

        return ch;
     },
     t1:function(){
    var address_id,buyerAddess,storeAddess,address;
    var SBData=W.U.StoreBrowsing.hi_SBdata();
 address_id=SBData.addr_id;
 if( W.U.ObjectLength(SBData.addr)>0){
   buyerAddess=SBData.addr[1][ address_id];
 storeAddess=SBData.addr[0];
 address=(W.U.isOK(buyerAddess))?buyerAddess: storeAddess;   
 }else{
     address=W.I.DefaultAddress; 
 }


var d_ch=W.F.JSONparse( address.d_ch,[0,10,0]),
 d_sch=W.U.floatval( address.d_sch),
 d_type=address.d_type,
 da=address.da,
 cvD=SBData.cvD,
 cvPD=SBData.cvPD;

var  CalculateCart=W.U.Browsing.CalculateCart();

  var sub_total = CalculateCart.sub_total,
  total_weight = CalculateCart.total_weight,
 total = CalculateCart.total,
 shipping_charge = CalculateCart.shipping_charge,
 sur_charge = CalculateCart.sur_charge,
  currency=CalculateCart.currency,
  currencysymbol=CalculateCart.currencysymbol;

  


   return '<div class="block _bdy"><div class="block"> <div class="w8 left b_grl al-r" > <span class="fw-b" style="margin-right: 10px;"> Total Weight</span> </div> <div class="w4 left "> <div class="block m_b5 al-r  "> <span class="bg-price m0">'+total_weight+' kg </span> </div></div> </div><div class="block"> <div class="w8 left b_grl al-r" > <span class="fw-b" style="margin-right: 10px;">Sub Total</span> </div> <div class="w4 left "> <div class="block m_b5 al-r  "> <span class="bg-price m0">'+currencysymbol+' ' + sub_total + '</span> </div></div> </div> <div class="block"> <div class="w8 left b_grl al-r" > <span class="fw-b" style="margin-right: 10px;"> Shipping &Handling Charges</span> </div> <div class="w4 left "> <div class="block m_b5 al-r  "> <span class="bg-price m0">'+currencysymbol+' ' + shipping_charge + '</span> </div></div> </div> <div class="block "> <div class="w8 left b_grl al-r " > <span class="fw-b" style="margin-right: 10px;"> Total</span> </div> <div class="w4 left "> <div class="block m_b5 al-r "> <span class="bg-price m0">'+currencysymbol+' ' + total + '</span> </div></div> </div></div>';

     },
     t2:function(){
  var ch='<div class="block _bdy_0-5 "  data-junction="cartlocationset"></div>';

W.U.JunctionAdd(W.A.page.AppId,'cartlocationset',function(){
 W.U.CheckInCart.cartlocationset.bind({Node:this.Node})();
  },{}); 

 
 return ch;
     },
     t3:function(){
         var ch='<div class="block ">'
         
          +'<div class=" block _Bdy bs-1 bg_0 ad-5"><div class=" left"></div><div class=" right"><button type="button" class=" flatbtn fg_7 "  data-checkinPlatform="Checkout"     >Check Out</button></div></div>'
         +'</div>';


         return ch;
     }

 };  












function Layout(block){
 var header='',mid='',foot='',ch='';
 var SBData=block.objectdata,margintop=0;  
   header=storeheader(SBData);

 //mid+='<div class="block"  data-nodeid="checkinPlatformMenu'+SBData.checkIn_id+'"></div>';
 mid+='<div class="block"  data-nodeid="checkinPlatformCartWalkway'+SBData.checkIn_id+'"></div>';

  switch(W.I.initType){
     case 0:
     
ch+='<div class="block  bs-1"   >'+W.T.BottomFixWrap(header,mid,foot,'checkinPlatformCart'+SBData.checkIn_id,margintop)+'</div>'; 
     break;  
     case 1:
  ch+='<div class="block  bs-1"   >'+W.T.BottomFixWrap(header,mid,foot,'checkinPlatformCart'+SBData.checkIn_id,margintop)+'</div>';    
     break; 
     case 2:
  if(W.I.wf=='web'){margintop=58; }
ch+='<div class="block  bs-1"   >'+W.T.BottomFixWrap(header,mid,foot,'checkinPlatformCart'+SBData.checkIn_id,margintop)+'</div>'; 
     break;
     case 3:
  
ch+='<div class="block bg_0 bs-1"   >'+W.T.BottomFixWrap(header,mid,foot,'checkinPlatformCart'+SBData.checkIn_id,margintop)+'</div>'; 
     break;       
   }


    return  ch; 
}

W.T.CheckinCart={
    Layout:Layout,
    t:t
};

 


})(wowrol);