/*
* 
*/
; (function(W){
   "use strict";



/*
*/
 function VarientPickUp(){
    var Node=this.Node;
    var x=this.ProductData;

var SBData=W.U.StoreBrowsing.hi_SBdata();
//--
function Handler(x){
  
    this.Node=x.Node;
    this.data=x.ProductData;
    this.selected=0;
    this.role=SBData.role;
    this.InventoryErrorCode=0;
  //  this.init(); //  init from the oncart update callback

  if(W.I.initType==1||W.I.initType==2){// for checkin page
     this.init(); 
  }


    W.U.ccbk.Add('oncartupdated' ,this.init.bind(this));
}
   Handler.prototype.init = function () {
     this.createMarkup();
     var _this=this;
     var tableMarkup = '<div class="block   " >'+this.pickButton+this.PriceStrip+this.shippingInfoStrip+'</div>';
 var mainBlock=W.U.Rander(tableMarkup);

 W.U.attrclick('[data-varientPickButton]',mainBlock[0],this.onVarientSelect.bind(this));
 W.U.attrclick('[data-addcart]',mainBlock[0],function(){

   _this.AddInCart(this);
 });
 
 
  W.U.attrclick('[data-varientInquiry]',mainBlock[0],function(){
    
      W.U.Chat.chatPage();

 });

 W.U.Setview(this.Node,mainBlock,'html');
     W.U.ccbk.Run(W.U.Page,'productSliderchange',{data: this.data,selected:this.selected}); 



   }

   Handler.prototype.createMarkup = function () {
       var _this=this;   
//--
if(SBData.mode!=3){
    if(SBData.role==0){
     this.InventoryErrorCode=1;//self store browsering
}
}else{
    this.InventoryErrorCode=3;//log out browsering
}

///---
       this.pickButton= CreatePickButton.bind(this)();  
         this.shippingInfoStrip= '';// first we need to calculate the  InventoryErrorCode
            this.PriceStrip= CreatePriceStrip.bind(this)();  

function CreatePickButton(){
     var ch ='', x= this.data;
   
     if(x.Hvrt!=''){
      ch = '<div class="block "><div class="block _bdy fw-b">Available in</div><div class="ul j-a5">';
       for(var q in  x.pvL){
   var selected = ( this.selected == q) ? 'active' : '';  
  ch += '<div class="li ' + selected + '"><div class="block ul ul-menu dc_divider"> ';
   var names=x.pvN;
   var values=x.pvL[q].pvV; 
 
     for(var p in  values){
ch+='  <div class="li "><span class="dc_0">'+names[p]+'</span> <span class="dc_1">'+values[p]+'</span></div>';
   }

     if  ( this.selected == q) {
            ch += '<div class="li fw-b" ><span >Picked</span></div>';
        } else {
            ch += '<div class="li fw-b"><a href="javascript:void(0);" data-varientPickButton="' + q + '">Pick this</a></div>';
        }

   ch += '</div></div>';
                }
        ch += '</div></div>';
}
        return ch;
}
function CreatePriceStrip(){   
    var ch='';var q= this.selected;
    var prices=[x.pvL[q].sP,x.pvL[q].cP];
    var pid=x.pid, vid=x.pvL[q].vid;
   var hasInCart= W.U.StoreBrowsing.IsVrientInCart(vid);

prices[2]=off_price(prices[0],prices[1]);
if(prices[0]==''){
     this.InventoryErrorCode=2;//Incomplete inventory
}
if(x.pvL[q].stk == 0){
    this.InventoryErrorCode=4;//Product out of the stock
}



var stock = (x.pvL[q].stk > 0) ? '<span class=" block fw-b info_text success">In Stock</span>' : '<span class=" block fw-b info_text error">Out of Stock</span>';

ch+='<ul class="block ul price_list"> <li class="sm"><span class="sm-title">MRP :</span><span class="sm-price"> Rs.' + prices[1] + '</span></li><li class="bg"><span>Selling Price :</span><span class="bg-price"> Rs. ' + prices[0] + '</span><span class="of-tag">' + prices[2] + '% off</span></li>'+stock+'</ul>';
if(this.InventoryErrorCode==0){
    if(x.pvL[q].Issh==1){
 if(hasInCart){
ch+='<div class="block _bdy m_b5"> <button type="button" class="btn _ebtn btn-block " disabled="disabled">ADDED IN CART</button> <a href="javascript:void(0);" class="btn _ebtn btn-block " data-junction="checkoutbtninit"  >PALCE ORDER NOW</a> </div>';    
}else{
   ch+='<div class="block _bdy m_b5"><button type="button" class="btn _ebtn btn-block " data-addcart="'+pid+'-'+vid+'"; >ADD TO CART </button></div>';  

}
    // show shipping info strip only when product is shipplbe
         this.shippingInfoStrip= CreateshippingInfo.bind(this)();  


}else{
      ch+='<div class="block _bdy m_b5"><button type="button" class="btn _ebtn btn-block " data-varientInquiry="'+pid+'-'+vid+'"; >Inquiry </button></div>';  

    this.shippingInfoStrip= '<div class="block _bdy m_b5"><div class="block _bdy">help_34</div></div>';  
}

 


}else{//telling cart button unavailbilty reasone

switch(this.InventoryErrorCode){
 case 1:
  ch+='<div class="block m_b10 m_t10 bg_8 fg_10 ff_3 _B-gray"> <div class="block _bdy">help_35</div></div>'; 
 break;
case 2:
  ch+='<div class="block m_b10 m_t10 bg_8 fg_10 ff_3 _B-gray"> <div class="block _bdy">help_36</div></div>'; 
 break;
 case 3:
  ch+='<div class="block m_b10 m_t10 bg_8 fg_10 ff_3 _B-gray"> <div class="block _bdy">help_37</div></div>'; 
 break;  
  case 4:
  ch+='<div class="block m_b10 m_t10 bg_8 fg_10 ff_3 _B-gray"> <div class="block _bdy">text_380</div></div>'; 
 break;  
}
    
}
    return ch;
}
function CreateshippingInfo(){
var ch='';
 if(this.role==1){
      

 var Jid=W.U.J(function(){
       W.U.DeliveryAddres.ShippingCheck(this.Node);
 },{});

ch+='<div class="block" data-junction="'+Jid+'" ><div>';
 }


 return ch;

}

function off_price(sp,cp){
    var off=0;
    sp=parseFloat(sp);
    cp=parseFloat(cp);
    if(sp!=0&&cp!=0){
    off=-(100*((sp/cp-1))); 
    if( off<0){
        off=0; 
    }
      
    }
    return  Math.ceil10(off);
}

   }
   Handler.prototype.onVarientSelect=function(e){
       var Node=e.srcElement||e.target||e.toElement;
     this.selected=parseInt(Node['data-varientPickButton']);
    var _this=this;
      setTimeout(function(){     _this.init();   },1000);
 W.U.AddDom(this.Node,'<div class="block al-c">'+W.U.loading_svg(30,30,10)+'</div>','html');

   }

   Handler.prototype.AddInCart=function(Node){
var _this=this;
function onDone(SBData){
    W.U.console(SBData);
   W.F.Toast('text_411');
     _this.init();
      W.U.Browsing.cartIconUpdate('update');
   }


 

   var cart=Node['data-addcart'];
   cart=cart.split('-');
   if(cart.length==2){
    W.U.Browsing.AddInCart(cart[0],cart[1],1,Node,onDone);   
   }else{
       W.F.Toast('Unable to add in cart.');
   }

   
           
 
}

 Handler.prototype.VarientInquiry=function(Node){
var _this=this;



 

   var cart=Node['data-varientInquiry'];
   cart=cart.split('-');
   if(cart.length==2){
   // W.U.Browsing.AddInCart(cart[0],cart[1],1,Node,onDone);   
    W.F.Toast('varientInquiry.');
   }else{
       W.F.Toast('Unable to add in cart.');
   }

   
           
 
}
new Handler(this);
}

  /*
  */
  function init(x,walkway){


 var mainBlock=W.U.Rander(W.T.ProductListing.Layout(x));
 W.U.Setview(walkway,mainBlock,'html');


  }

 W.U.ProductListing={
     init:init,
   VarientPickUp:VarientPickUp,
 };

})(wowrol);