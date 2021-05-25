/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";


var  t={
    t0:function(x){
     var ch='<div class="block">';
     ch+=' <div class="block "><div class="block _bdy "><h2>Order Detail</h2></div><div class="block _bdy "> <div class="ul ul-menu"> <div class="li ma-l-4">Order ID</div> <div class="li ma-l-8 fw-b tt-c">'+x.oid+'</div> </div></div></div>';
     console.log(x);
     ch+= t.t1(x);
      
     ch+='</div>';  
     return ch;
        
    },
    t1:function(x){
     var ch='<div class="block _bdy _B-gray bg_0 m_b10">';

    ch+= t.t10(x)+t.t11(x)+t.t12(x);
      
          ch+='</div>';  
     return ch;
        
    },
    t10:function(x){
     var ch='<div class="block w4 col4  ">';
     var addr=[],addrName='';
     if(x.type==0){
        addr=x.address['Home'];  addrName='Shipping Address';
     }else{
        addr=x.address['Work'];  addrName='Pick Up  Address';
     }
    
     ch+='<div class="block m_b5 _bdy fw-b po-re">'+addrName+' </div><div class="block  m_b5 _bdy "><div class="form-piece t"> <label class="control-label">Address </label> <span>'+addr.address+'<span> <div data-help="address"></div></div><div class="form-piece t"> <label class="control-label">Location </label> <span>'+addr.pincode+' '+addr.location_name+' '+addr.Districtname+' '+addr.Statename+' '+addr.Country+' <span> <div data-help="pincode"></div></div><div class="form-piece t"> <label class="control-label">Phone</label>  <span>'+addr.phone+'<span> <div data-help="phone"></div></div> </div>';
     
      
          ch+='</div>';  
     return ch;
        
    },
    t11:function(x){
     var ch='<div class="block w4 col4  ">';

  ch+='<div class="block  bg_0 m_b5"> <div class=" block _bdy al-c ff-2 fs14 "><span class="tt-u">Payment Method </span><span class="fw-b">Cash On Delivery </span> </div> </div>';
  var sM='<span class="tt-u ">shipping Method</span><span class="fw-b span">Home Delivery </span>';
  if(x.type==1){
    sM='<span class="tt-u ">shipping Method</span><span class="fw-b span">Self collect </span>';
  }
    ch+='<div class="block  bg_0 m_b5"> <div class=" block _bdy al-c ff-2 fs14 ">'+sM+'</div> </div>';   
          ch+='</div>';  
     return ch;
        
    },
    t12:function(x){
     var ch='<div class="block w4 col4  ">';

  var sub_total = x.sub_total.toFixed(2),
  total_weight = x.total_weight.toFixed(2) ,
 total = x.total.toFixed(2) ,
 shipping_charge = x.shipping_charge ,
 sur_charge =x.sur_charge ,
  currency=x.currency;
  var shipping=(parseFloat( shipping_charge )+parseFloat( sur_charge )).toFixed(2);

     ch+='<div class="block _bdy"><div class="block"> <div class="w8 left b_grl al-r" > <span class="" style="margin-right: 10px;">Sub Total</span> </div> <div class="w4 left "> <div class="block m_b5 al-r  "> <span class=" m0">'+currency+' ' + sub_total + '</span> </div></div> </div> <div class="block"> <div class="w8 left b_grl al-r" > <span class="" style="margin-right: 10px;"> Shipping </span> </div> <div class="w4 left "> <div class="block m_b5 al-r  "> <span class=" m0">'+currency+' ' + shipping + '</span> </div></div> </div> <div class="block "> <div class="w8 left b_grl al-r " > <span class="fw-b" style="margin-right: 10px;"> Total</span> </div> <div class="w4 left "> <div class="block m_b5 al-r "> <span class="fw-b m0">'+currency+' ' + total + '</span> </div></div> </div></div>';
 
      
          ch+='</div>';  
     return ch;
        
    }
};



   var Madian=function(x){
  var ch ='';
 

 ch+='<div  class="block " >'+t.t0(x[0])+'</div>';

 return  ch;

   }


   var Landing=function(x){
       var ch ='';
      var header= W.T.Header.wellcome({});;
      var footer=W.T.Footer({});;

  
        ch+= W.T.wrap(header,Madian(x),footer);
     return  ch;
   }
   
    

   


     W.M.orderdetails=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };

 } )(wowrol);