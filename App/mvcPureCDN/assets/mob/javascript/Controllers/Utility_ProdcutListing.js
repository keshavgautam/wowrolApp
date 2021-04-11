/*
* 
*/
; (function(W){
   "use strict";
 var tem= W.T.ProductListing;
var Listing=(function(W){
    var kit={};
    var View=W.A.page.AppView,
    SBData=View.SBData;

function VarientPickUp(){
    var Node=this.Node;
    var x=this.ProductData;
    console.log(this);
//--
function Handler(x){
    this.Node=x.Node;
    this.data=x.ProductData;
    this.selected=0;
    this.role=SBData.role;
    this.InventoryErrorCode=0;
    this.init();
}
   Handler.prototype.init = function () {
     this.createMarkup();
     var tableMarkup = '<div class="block   " >'+this.pickButton+this.PriceStrip+this.shippingInfoStrip+'</div>';
 var mainBlock=W.U.Rander(tableMarkup);
 W.U.attrclick('[data-varientPickButton]',mainBlock[0],this.onVarientSelect.bind(this));
 W.U.attrclick('[data-addcart]',mainBlock[0],this.AddInCart.bind(this));
 W.U.Setview(this.Node,mainBlock,'html');
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
       this.PriceStrip= CreatePriceStrip.bind(this)();  
       this.shippingInfoStrip= CreateshippingInfo.bind(this)();  


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

var stock = (x.pvL[q].stk > 0) ? '<span class=" block fw-b info_text success">In Stock</span>' : '<span class=" block fw-b info_text error">Out of Stock</span>';

ch+='<ul class="block ul price_list"> <li class="sm"><span class="sm-title">MRP :</span><span class="sm-price"> Rs.' + prices[1] + '</span></li><li class="bg"><span>Selling Price :</span><span class="bg-price"> Rs. ' + prices[0] + '</span><span class="of-tag">' + prices[2] + '% off</span></li>'+stock+'</ul>';
if(this.InventoryErrorCode==0){

if(hasInCart){
ch+='<div class="block _bdy m_b5"> <button type="button" class="btn _ebtn btn-block " disabled="disabled">ADDED IN CART</button> <a href="http://localhost:1234/teststore1-cart-0" class="btn _ebtn btn-block ">PALCE ORDER NOW</a> </div>';    
}else{
   ch+='<div class="block _bdy m_b5"><button type="button" class="btn _ebtn btn-block " data-addcart="'+pid+'-'+vid+'"; >ADD TO CART </button></div>';  

}
}else{//telling cart button unavailbilty reasone
switch(this.InventoryErrorCode){
 case 1:
  ch+='<div class="block m_b10 m_t10 bg_8 fg_10 ff_3 _B-gray"> <div class="block _bdy">Cart button not available to store.</div></div>'; 
 break;
case 2:
  ch+='<div class="block m_b10 m_t10 bg_8 fg_10 ff_3 _B-gray"> <div class="block _bdy">Cart button not available due to incomplete inventory.</div></div>'; 
 break;
 case 3:
  ch+='<div class="block m_b10 m_t10 bg_8 fg_10 ff_3 _B-gray"> <div class="block _bdy">Cart button not available to Unlogin visiters.</div></div>'; 
 break;  
}
    
}
    return ch;
}
function CreateshippingInfo(){
var ch='';
 if(this.role==1){
        var addr=SBData.addr[1]['Home'];
    var suggestion={ name:'pincode',
                     fireAfter:6,
                     type: 4,
                     token:'chips',
                     placeholder:' pincode or location',
                     onselect: oncheckpincodeselect };
    var checkpincode='<div class="block sr-bgC _bdy m_b5"><div class="form-piece"> <label class="control-label">Enter pincode or location for delivery </label> <div class="form-token block " data-junction="checkpincode" ><div class="block bd">  <div class="block ul ul-menu"> <div class="li block"><input type="text" name="suggestion" class="form-mold " placeholder="'+suggestion.placeholder+'"  autocomplete="off"   ></div></div><div class="block d po-ab collapse in "> </div></div></div><div data-help="pincode"></div></div><a href="javascript:void(0);" class="hide"  data-openbtn="productpagecheckpincode" data-btnid="changepincode"></a><a href="javascript:void(0);" class="hide"  data-openbtn="productpagecheckpincode" data-btnid="Loading"></a></div>';

var Purchasemethod='<div class="form-piece"> <p >Purchase method</p><p class="fw-b al-l">Self Collect.(you have to self pick up  from store address.)</p></div>';
var Delivery='<p class="span info_text error al-l"> <i ></i> Home Delivery does not available on</p>';
if(SBData.da==1){
 Purchasemethod='<div class="form-piece"> <p >Purchase method</p><p class="fw-b al-l">Home Delivery .</p></div>';
   Delivery='<p >Home Delivery available on</p>'; 
}

 var changepincode='<div class="block sr-bgC _bdy m_b5">'+Purchasemethod+'<div class="form-piece"> '+Delivery+'<p class="fw-b al-l tt-u">'+addr.pincode+'-'+addr.location_name+'-'+addr.Districtname+'-'+addr.Statename+'-'+addr.Country+' <br><a href="javascript:void(0);" data-closebtn="productpagecheckpincode" >change</a></p><p class="al-l">'+SBData.d_des+'</p></div></div>';

 var Loading='<div class="block sr-bgC _bdy m_b5 al-c">'+W.U.loading_svg(80,80)+'<a href="javascript:void(0);" class="hide"  data-closebtn="productpagecheckpincode" ></a></div>';

   W.U.JunctionAdd(W.A.page.AppId,'checkpincode',function(){
   W.U.suggestion.bind({Node:this.Node,Value:this.data})();
        },suggestion); 




var blockList=[checkpincode,changepincode,Loading];
var blockName=["checkpincode","changepincode","Loading"];
var target=(addr['loaction_id']=='')?"checkpincode":"changepincode";
var setting ={
    name:'productpagecheckpincode',
    parent:"",
    target:target,
    page:false,
    minheight:'auto'
};


    ch+=W.T.ToggleBlock(blockList, blockName,setting);; 
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

function oncheckpincodeselect(){
 var id=this.data.li_data.id;
var name=this.data.name;

  var formData = {
                form: 'buyercheckdelivery',
                f_value: {location_id:id,storeslug:SBData.Ed[0].slug}
            };
   W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
                        var event = jQuery.Event("show");
                event.id = 'Loading';
            $(W.U.id('block.checkpincode')).parent().triggerHandler(event);
                       
                    },
                    success: function (data) {
                       var ret = JSON.parse(data);
                        if (ret.state == 500) {
      var event = jQuery.Event("show");
                event.id = 'checkpincode';
            $(W.U.id('block.checkpincode')).parent().triggerHandler(event);

                        }
                        if (ret.state == 200) {
                 
SBData=ret.response;

 _this.init();
                        }
                        
                    }

                });

}
   }
   Handler.prototype.onVarientSelect=function(e){
       var Node=e.srcElement||e.target||e.toElement;
     this.selected=parseInt(Node['data-varientPickButton']);
    
        this.init();


   }

   Handler.prototype.AddInCart=function(e){
var _this=this;
function onDone(SBData){
    console.log(SBData);

    //  _this.init();
   }


   var Node=e.srcElement;

   var cart=Node['data-addcart'];
   cart=cart.split('-');
   if(cart.length==2){
    W.U.StoreBrowsing.AddInCart(cart[0],cart[1],1,Node,onDone);   
   }else{
       W.F.Toast('Unable to add in cart.');
   }

   
           
 
}
new Handler(this);
}
//
function productListingBinds(args){
    var defaultdata={title:'view spread title',btntext:'Spread',submitshow:false,submitcallback:null};
    args = W.U.extend(defaultdata, args);

    var Title=W.U('[data-jqid="productListingTitle"]',W.U.id('block.productListingback'))[0]; 
  W.U.SetText(Title,args.title,'html');
    var submit=W.U('[data-jqid="productListingsubmit"]',W.U.id('block.productListingback'))[0];
  if(args.submitshow){
  
    submit.onclick=args.submitcallback;
    submit.style.display="block";
      W.U.SetText(submit,args.btntext,'html');   
  }else{
        submit.style.display="none";
  }
}

       //public
function init(x,walkway){
    console.log('W.U.ProductListing=Listing;');
   console.log( SBData);
     console.log( x);
   var mainBlock=W.U.Rander(tem.Layout(x));


 W.U.Setview(walkway,mainBlock,'html');
 initMain(x);
}
function initMain(x){
var walkway=W.U.id("productwalkway");

   var mainBlock=W.U.Rander(tem.setPage(x));


 W.U.Setview(walkway,mainBlock,'html');
}
    return {
      init:init,
      VarientPickUp:VarientPickUp,
      backbinds:productListingBinds  

    };
})(W);

  W.U.ProductListing=Listing;





})(wowrol);