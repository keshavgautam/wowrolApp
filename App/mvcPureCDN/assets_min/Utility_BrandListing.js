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


//--
function Handler(x){
  
    this.Node=x.Node;
    this.data=x.ProductData;
    this.selected=0;
    this.role=0;
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
      var tableMarkup = '<div class="block   " >'+this.pickButton+this.PriceStrip+'</div>';
 var mainBlock=W.U.Rander(tableMarkup);

  W.U.attrclick('[data-varientPickButton]',mainBlock[0],this.onVarientSelect.bind(this));

 W.U.Setview(this.Node,mainBlock,'html');
     W.U.ccbk.Run(W.U.Page,'productSliderchange',{data: this.data,selected:this.selected}); 



   }
   Handler.prototype.createMarkup = function () {
       var _this=this;   
   

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
         if(names[p]!=''&&values[p]!=''){
    ch+='  <div class="li "><span class="dc_0">'+names[p]+'</span> <span class="dc_1">'+values[p]+'</span></div>';         
         }

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
   var hasInCart= false;

prices[2]=off_price(prices[0],prices[1]);







ch+='<ul class="block ul price_list"> <li class="sm"><span class="sm-title">MRP :</span><span class="sm-price"> Rs.' + prices[1] + '</span></li><li class="bg"><span>Selling Price :</span><span class="bg-price"> Rs. ' + prices[0] + '</span><span class="of-tag">' + prices[2] + '% off</span></li></ul>';

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

    return  W.U.intval(Math.ceil10(off));
}

   }
  Handler.prototype.onVarientSelect=function(e){
       var Node=e.srcElement||e.target||e.toElement;
     this.selected=parseInt(Node['data-varientPickButton']);
    var _this=this;
      setTimeout(function(){     _this.init();   },1000);
 W.U.AddDom(this.Node,'<div class="block al-c">'+W.U.loading_svg(30,30,10)+'</div>','html');

   }
new Handler(this);
}



   function init(x,walkway){
       
 var mainBlock=W.U.Rander(W.T.BrandListing.Layout(x));
 W.U.Setview(walkway,mainBlock,'html');
     W.U.ccbk.Run('oncartupdated');
   }


 W.U.BrandListing={
     init:init,
     VarientPickUp:VarientPickUp
 
 };

})(wowrol);