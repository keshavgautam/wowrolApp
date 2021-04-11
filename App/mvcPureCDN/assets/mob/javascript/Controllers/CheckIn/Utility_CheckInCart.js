/*
* 
*/
; (function(W){
   "use strict";

W.U.CheckInCart=(function(){


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
 var SBData= W.U.StoreCheckIn.SBData;   
 if(SBData.role==1){
   var addr=SBData.addr[1]['Home'];

   var addr=SBData.addr[1]['Home'];
    var suggestion={ name:'pincode',
                     fireAfter:6,
                     type: 4,
                     token:'chips',
                     placeholder:' pincode or location',
                     onselect: oncheckpincodeselect };
    var checkpincode='<div class="block sr-bgC _bdy m_b5"><div class="form-piece"> <label class="control-label">Enter pincode or location for delivery </label> <div class="form-token block " data-junction="checkpincode" ><div class="block bd">  <div class="block ul ul-menu"> <div class="li block"><input type="text" name="suggestion" class="form-mold " placeholder="'+suggestion.placeholder+'"  autocomplete="off"   ></div></div><div class="block d po-ab collapse in "> </div></div></div><div data-help="pincode"></div></div><a href="javascript:void(0);" class="hide"  data-openbtn="cartpagecheckpincode" data-btnid="cartpagechangepincode"></a><a href="javascript:void(0);" class="hide"  data-openbtn="cartpagecheckpincode" data-btnid="cartpageLoading"></a></div>';

var Purchasemethod='<div class="form-piece"> <p >Purchase method</p><p class="fw-b al-l">Self Collect.(you have to self pick up  from store address.)</p></div>';
var Delivery='<p class="span info_text error al-l"> <i ></i> Home Delivery does not available on</p>';
if(SBData.da==1){
 Purchasemethod='<div class="form-piece"> <p >Purchase method</p><p class="fw-b al-l">Home Delivery .</p></div>';
   Delivery='<p >Home Delivery available on</p>'; 
}

 var changepincode='<div class="block sr-bgC _bdy m_b5">'+Purchasemethod+'<div class="form-piece"> '+Delivery+'<p class="fw-b al-l tt-u">'+addr.pincode+'-'+addr.location_name+'-'+addr.Districtname+'-'+addr.Statename+'-'+addr.Country+' <br><a href="javascript:void(0);" data-closebtn="cartpagecheckpincode" >change</a></p><p class="al-l">'+SBData.d_des+'</p></div></div>';

 var Loading='<div class="block sr-bgC _bdy m_b5 al-c">'+W.U.loading_svg(80,80)+'<a href="javascript:void(0);" class="hide"  data-closebtn="cartpagecheckpincode" ></a></div>';

   W.U.JunctionAdd(W.A.page.AppId,'checkpincode',function(){
   W.U.suggestion.bind({Node:this.Node,Value:this.data})();
        },suggestion); 


  






var blockList=[checkpincode,changepincode,Loading];
var blockName=["cartpagecheckpincode","cartpagechangepincode","cartpageLoading"];

var target=(addr['loaction_id']=='')?"cartpagecheckpincode":"cartpagechangepincode";
var setting ={
    name:'cartpagecheckpincode',
    parent:"",
    target:target,
    page:false,
    minheight:'auto'
};
  ch+=W.T.ToggleBlock(blockList, blockName,setting);; 

  }
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


//--

function init(walkWay){
     function Handler(walkWay){
        this.walkWay=walkWay;  

       
        
 var checkPids=W.U.StoreBrowsing.CheckPbankCartVids();
 
  if(checkPids.length==0){
      this.init(); 
     }else{
     var _this=this;
 W.U.StoreBrowsing.LoadInPbank(checkPids,0,this.walkWay,function(){
            _this.init();
         });
     }    

   }
//--

Handler.prototype.init=function(){
    console.log('main init called');
        var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+W.T.CheckinCart.t.t0()+'</div></div>')[0];
var _this=this;
  var mainBlock=RanderInDiv.childNodes;// do not disturb it
 W.U.attrclick('[data-onremove]',mainBlock[0],innerConnecter1);
 W.U.attrclick('[data-onqchange]',mainBlock[0],innerConnecter0);
W.U.attrclick('[role="checkinmenu"]',mainBlock[0],W.U.CheckInStoreBrowser.OnOuterLinkLoad);

   W.U.Setview(this.walkWay,mainBlock,'html'); 

   function innerConnecter0(){
       _this.onQuentityChange(this);
   }
   function innerConnecter1(){
        _this.onRemove(this); 
   }

  
}

Handler.prototype.onQuentityChange=function(Node){
var SBData= W.U.StoreCheckIn.SBData,
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
   
W.U.StoreBrowsing.AddInCart(cvPD[id][1],id,cvPD[id][0],Node, this.init.bind(this));


      //-->>
     ;
}

Handler.prototype.onRemove=function(Node){
   var SBData= W.U.StoreCheckIn.SBData,

 data=(Node['data-onremove']).split('-'),
  id=data[0],type=data[1]; 

 console.log(id);
 switch(type){
     case 'cart':
var  cvD=SBData.cvD,
     cvPD=SBData.cvPD;

 W.U.StoreBrowsing.AddInCart(cvPD[id][1],id,0,Node, this.init.bind(this));
 cvD= W.U.removeInArray(cvD,id);
     delete(cvPD[id]); 
     break;
   case 'shortlist':

     break;
   case 'suggestion':

     break;
 }


}
 

   new Handler(walkWay);
}
var FirstResponseLoaded=0;//this very important else create a recursion
  // chat First loading
function FirstResponseLoad(){
var  walkWay=W.U.id('checkincartcon');
if(FirstResponseLoaded==0){
    init(walkWay); FirstResponseLoaded=1;
}
 
}  


return {FirstResponseLoad:FirstResponseLoad,
init:init,
cartlocationset:cartlocationset};
})();



})(wowrol);