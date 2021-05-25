/*
* 
*/
; (function(W){
   "use strict";



 function cartlocationset(){
        var Node=this.Node;
   
//--
function Handler0(x){
    this.Node=x.Node;
  
   this.initcartlocationset();
}

 Handler0.prototype.initcartlocationset = function (){
        this.createMarkup0();
     var tableMarkup = '<div class="block   " >'+this.shippingInfoStrip+'</div>';
 var mainBlock=W.U.Rander(tableMarkup);

W.U.Setview(this.Node,mainBlock,'html');
 }
 Handler0.prototype.createMarkup0 = function (){
      var _this=this;
       //  this.shippingInfoStrip= CreateshippingInfo.bind(this)();  
   this.shippingInfoStrip= CreateshippingInfo0.bind(this)();  

function CreateshippingInfo0(){
var ch='';
 var Jid=W.U.J(function(){
       W.U.DeliveryAddres.ShippingCheck(this.Node,{
       usetype:'setting',
       pager: 'mainpage',// W.I.checkinPager,
       backblock:( W.I.initType==3)?W.I.checkinblockFront: 'checkinPlatformCart'
   });
 },{});

ch+='<div class="block" data-junction="'+Jid+'" ><div>';
return ch;
}

function oncheckpincodeselect(){
 var id=this.data.li_data.id; var SBData= W.U.StoreCheckIn.SBData;
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
                event.id = 'cartpageLoading';
            $(W.U.id('block.cartpagecheckpincode')).parent().triggerHandler(event);
                       
                    },
                    success: function (data) {
                       var ret = JSON.parse(data);
                        if (ret.state == 500) {
      var event = jQuery.Event("show");
                event.id = 'cartpagecheckpincode';
            $(W.U.id('block.cartpagecheckpincode')).parent().triggerHandler(event);

                        }
                        if (ret.state == 200) {
                 
W.U.StoreCheckIn.SBData=ret.response;

 _this.initcartlocationset();
                        }
                        
                    }

                });

}

 }


    new Handler0(this);
 } 



function cartProduct(walkWay){
     function Handler(walkWay){
        this.walkWay=walkWay;  
    
       
   
 var checkPids=W.U.Browsing.CheckPbankCartVids();
  
  if(checkPids.length==0){
      this.init(); 
     }else{
     var _this=this;
 W.U.Browsing.LoadInPbank(checkPids,0,this.walkWay,function(){
            _this.init();
         });
     }    

   }
//--

Handler.prototype.init=function(){
 
 var mainBlock=W.U.Rander('<div>'+W.T.CheckinCart.t.t0()+'</div>');
var _this=this;

 W.U.attrclick('[data-onremove]',mainBlock[0],innerConnecter1);
 W.U.attrclick('[data-onqchange]',mainBlock[0],innerConnecter0);
 W.U.attrclick('[data-checkinPlatform]',mainBlock[0],W.U.checkins.checkinPlatform);
//W.U.attrclick('[role="checkinmenu"]',mainBlock[0],W.U.CheckInStoreBrowser.OnOuterLinkLoad);

   W.U.Setview(this.walkWay,mainBlock,'html'); 

   function innerConnecter0(){
       _this.onQuentityChange(this);
   }
   function innerConnecter1(){
        _this.onRemove(this); 
   }

  
}

Handler.prototype.onQuentityChange=function(Node){
 var SBData=W.U.Browsing.hi_SBdata(),
 cvD=SBData.cvD,
 cvPD=SBData.cvPD,
 data=(Node['data-onqchange']).split('-'),
  id=data[0],type=data[1], 
  parent=Node.parentNode.parentNode,
  display=parent.childNodes[2];

   var quentity=parseInt(cvPD[id][0]) ;
      if(type=='u'){
         quentity++; 
      }
       if(type=='d'){
         quentity--; 
       quentity=(quentity<=0)?1:quentity; 
      }
      cvPD[id][0]=quentity;
      //-->>
   
W.U.Browsing.AddInCart(cvPD[id][1],id,cvPD[id][0],Node, this.init.bind(this));


      //-->>
     ;
}

Handler.prototype.onRemove=function(Node){
    var _this=this;
    var SBData=W.U.Browsing.hi_SBdata(),

 data=(Node['data-onremove']).split('-'),
  id=data[0],type=data[1]; 

 switch(type){
     case 'cart':
var  cvD=SBData.cvD,
     cvPD=SBData.cvPD;
    
 W.U.Browsing.AddInCart(cvPD[id][1],id,0,Node, function(){
     var p =cvPD[id];
     
     _this.init.bind(_this)();
    
      cvD= W.U.removeInArray(cvD,id);
     delete(cvPD[id]);
        W.U.ccbk.Run(W.U.Page,'cartremove',{pid:p[1],vid:id});

 });


 
     break;
   case 'shortlist':

     break;
   case 'suggestion':

     break;
 }

 
}
 

   new Handler(walkWay);
}



//-- cart page

function CartPage(){
 
     
        W.U.CheckInCart.init(); 
}




//------

function init(){
    var SBData=W.U.Browsing.hi_SBdata();
    var pager= 'mainpage',presention='page';  

   //----------------
   switch(W.I.initType){
     case 0:
  

     break;  
     case 1:

     break; 
     case 2:
   pager= 'checkinPlatform';      
     break;
     case 3:
     presention='model';  
     break;       
   }


W.U.Pager.addblockdata({name:'checkinPlatformCart', htmlStr:W.T.CheckinCart.Layout,presention:presention,objectdata:SBData});   

W.U.Pager.replacePage(pager,'checkinPlatformCart');  

//----
setTimeout(function(){
     
      var walkWay=W.U.id('checkinPlatformCartWalkway'+SBData.checkIn_id); 
      
cartProduct(walkWay);
},100)
    
}



W.U.CheckInCart={
  init:init,
  cartlocationset:cartlocationset,
  CartPage:CartPage 

};



})(wowrol);