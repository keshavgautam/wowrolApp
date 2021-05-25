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

var backbutton='<div class="di-td  vl-t "><a href="javascript:void(0);" class="block '+buttonClass+'"  data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a></div >';

var cartbutton='<div class="di-td  vl-t "><a href="javascript:void(0);" class="block '+buttonClass+'" data-checkinPlatform="Cart" >View Cart</a></div >';

var y=W.U.Browsing.ParseEntityData(SBData.Ed);

   var title='<div class="di-td vl-t  _bdy w212 p1"><div class=" _pnl ma-l-5"><span class="pnl0 truncate ">'+y.entityName+'</span><span class="pnl1 "></span><span class="pnl2  right tt-l"></span></div></div >';
   var avatar='<div class="di-td _bdy">  <a href="javascript:void(0);"> <img class=" round x35" alt="64x64" src="'+y.avatar+'"  > </a></div>';
   if(W.I.wf=='mob'){
     ch+='<div class="block bg_1 fg_6">'  ;
    ch+=backbutton;
   ch+=avatar;
    ch+=title;
  ch+=space;
      ch+=cartbutton;
     ch+='</div >' ;
   }
   if(W.I.wf=='web'){
     ch+='<div class="block bs-1 bg_0">'  ;
     if(W.I.initType==3){
    ch+=backbutton;
     }
      ch+=avatar;
   ch+=title;
  ch+=space;

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
 ch+='<div class=" block _bdy h50  al-c tt-u ff-2 "><h3>Checkout</h3></div>';
 if(SBData.role==1){
 if(cvD.length>0 &&SBData.role==1){
ch+='<div class="block _B-gray bg_0 m_b5"> <div class=" block _bdy al-c ff-2 fs14 "><span class="tt-u">text_317</span><span class="fw-b">text_316 </span> <p>'+W.U.strformat('text_318',SBData.Ed[0].entityName)+'</p></div> </div>';
 ch+=t.t1(SBData);
 ch+=t.t2(SBData);  
 ch+=t.t3(SBData); 
 ch+=t.t4(SBData);

 }else{
     ch+='<div class="block _bdy bg_0 m_b10"> <p class="al-c"> text_315</p> </div>'; 
 }
 }else{
     ch+='<div class="block _bdy bg_0 m_b10"> <p class="al-c">text_314</p> </div>'; 
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
   t12:function(x){
     var ch='<div class="block _B-gray bg_0 m_b5 _Bdy"> '+W.T.Address(x.addr[0])+' </div>';
      return ch;  
   },
   t3:function(x){
var  CalculateCart=W.U.StoreBrowsing.CalculateCart();

var ch='<div class="block _B-gray bg_0 m_b5"> <div class=" block _bdy al-c ff-2 fs14 "><span class="tt-u ">payable amount</span><span class="span fw-b">'+CalculateCart.currencysymbol+' '+CalculateCart.total+'</span> </div> </div>';


  return ch;
   },
   t4:function(x){
      var ch='<div class="block m_b5"> <div class="w8 al-l"><div class="block "></div></div> <div class="w4 al-r"><div class="block"><button type="button" class="btn _ebtn " data-onsave="palceorder"      >PLACE ORDER</button></div></div><div class="block m_b5" data-help="RagisterShippingOrder" > </div></div>';
      
      
      return ch; 
   },
   t5:function(){//Not access to check out
       var ch='';

       return ch;
   },
  t6:function(x){
       var ch='<div class="block _bdy bg_0 "> ';  var SBData=W.U.Browsing.hi_SBdata();  var URL=W.U.URL;



           ch += '<div class="block _bdy _B-gray al-c bg_25 m_b5"> <h2>Thank you. Your order has been received by  ' + SBData.Ed[0].entityName+' .</h2> </div>';
            ch += '<div class="block _B-gray bg_25 m_b5"> <div class=" block _bdy al-c ff-2 fs14 "><span class="tt-u ">ORDER</span><span class="fw-b">#' + x.order_id + '</span> </div> </div>';

            ch += '<div class="block m_b5"> <div class="w8 al-l"></div> <div class="w4 al-r"><div class="span"><a href="'+URL('myorders')+'&order_id=' + x.order_id + '" class="btn ">View my orders</a></div></div> </div>';

ch+='</div>';
       return ch;
   },
  step_payment:function(x){
    var ch='',address_id,buyerAddess,storeAddess,isHomeDelivery;
  var SBData=W.U.Browsing.hi_SBdata();

 address_id=SBData.addr_id;
 buyerAddess=SBData.addr[1][ address_id];
 storeAddess=SBData.addr[0];
 isHomeDelivery=(W.U.isOK(buyerAddess))?true:false;

  ch+= '<div class="block _Bdy">';  



 if( isHomeDelivery){
 ch+='<div class="block _B-gray bg_0 m_b5"> <div class=" block _bdy al-c ff-2 fs14 "><span class="tt-u">Payment Method </span><span class="fw-b">Cash On Delivery </span> <p>'
 +W.U.strformat( W.U.GetText('help_24') ,SBData.Ed[0].entityName)
 +'</p></div> </div>';
 ch+= t.t10(SBData);  

 }else{

 ch+='<div class="block _B-gray bg_0 m_b5"> <div class=" block _bdy al-c ff-2 fs14 "><span class="tt-u">Payment Method </span><span class="fw-b">Cash On Collection </span> <p>'
 +W.U.strformat(W.U.GetText('help_23'),SBData.Ed[0].entityName)
 +'</p></div> </div>';
 ch+= t.t11(SBData);  
 ch+= t.t12(SBData);  
 }


 ch+=t.t3(SBData); 
 ch+='<div class="block" data-help="RagisterShippingOrder" ></div>'

 ch+='</div>';
    return ch;
   }
 };  


/*
*@des 
*/
function SelectStoreAddress(x){
    var links=[],text;  
 
var Options={
    cssClass:{ul:'block ul  bg_0 bs-1'}
}

 var button_V2=[
 {type:'radio',text:'',name:'buyeraddress',icon:'',value:x.address_id,checked:'', attrStr:'  '},
];
links.push({ItemType:'html',ItemData:{bodyhtml:W.T.Address(x)} ,primaryaction:button_V2});    


    return W.U.CreateList(links,Options);
}




function Layout(block){
 var header='',mid='',foot='',ch='';
 var SBData=block.objectdata,margintop=0;  
   header=storeheader(SBData);

 //mid+='<div class="block"  data-nodeid="checkinPlatformMenu'+SBData.checkIn_id+'"></div>';
 mid+='<div class="block bg_0"  data-nodeid="checkinPlatformCheckoutWalkway'+SBData.checkIn_id+'"></div>';

  switch(W.I.initType){
     case 0:
     
ch+='<div class="block  bs-1"   >'+W.T.BottomFixWrap(header,mid,foot,'checkinPlatformCheckout'+SBData.checkIn_id,margintop)+'</div>'; 
     break;  
     case 1:
  ch+='<div class="block  bs-1"   >'+W.T.BottomFixWrap(header,mid,foot,'checkinPlatformCheckout'+SBData.checkIn_id,margintop)+'</div>';    
     break; 
     case 2:
  if(W.I.wf=='web'){margintop=58; }
ch+='<div class="block  bs-1"   >'+W.T.BottomFixWrap(header,mid,foot,'checkinPlatformCheckout'+SBData.checkIn_id,margintop)+'</div>'; 
     break;
     case 3:
      
ch+='<div class="block  bs-1 bg_0"   >'+W.T.BottomFixWrap(header,mid,foot,'checkinPlatformCheckout'+SBData.checkIn_id,margintop)+'</div>'; 
     break;       
   }


    return  ch; 
}



W.T.CheckInCheckout={
SelectStoreAddress:SelectStoreAddress,    
Layout:Layout,  
t:t

};

 


})(wowrol);