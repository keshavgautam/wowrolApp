/*
* 
*/
; (function(W){
   "use strict";

W.U.CheckInCheckout=(function(){





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
   var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+W.T.CheckinCheckout.t.t0()+'</div></div>')[0];
var _this=this;
  var mainBlock=RanderInDiv.childNodes;// do not disturb it
   W.U.attrclick('[data-onsave="homeaddress"]',mainBlock[0],innerConnecter0);
   W.U.attrclick('[data-onsave="palceorder"]',mainBlock[0],innerConnecter1);

   W.U.Setview(this.walkWay,mainBlock,'html'); 
      function innerConnecter0(){
       _this.homeaddressSave(this);
   }
      function innerConnecter1(){
       _this.palceorder(this);
   }


}

Handler.prototype.homeaddressSave=function(){
    var _this=this;
    var formname='checkoutbuyeraddress';
      var rv = ['address'],
      f_value = W.F.walk_way_all(rv, formname),
      error=1, alert_mes = [];
      var help= $('[data-help="checkoutbuyeraddress"]');
     var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     var loadingblock= $(W.U.id('block.CheckoutLoading')).parent();
       error=glueErrors.error;
   
   alert_mes = alert_mes.concat(glueErrors.message);

 var AlertError = W.T.AlertError({message:alert_mes});
 console.log(error); console.log(f_value);
 if(f_value.address!=''){
  help.html(''); 

    var formData = {
                    form: formname,
                    f_value: f_value
                };

    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
            W.U.madianLoading('show');
            
                    },
                    success: function (data) {
               W.U.madianLoading('hide');
           var ret = JSON.parse(data);
          
                        if (ret.state == 500) {
var AlertError =  W.T.AlertError({message:ret.mistake.message});
     help.html(AlertError);
   W.F.alert(); 
   
                        }
                        if (ret.state == 200) {
   W.U.StoreCheckIn.SBData.addr[1]['Home']['address']=ret.response;
                        _this.init();
    
        
                                }
                    }

                });


 }else{
   help.html(AlertError);
 }


}
 
Handler.prototype.palceorder=function(){
    var formname='RagisterShippingOrder',
       help=W.U('[data-help="RagisterShippingOrder"]')[0];
   var SBData= W.U.StoreCheckIn.SBData;   
        var formData = {
                    form: formname,
                    f_value: {checkin:SBData.checkIn_id}
                };
if(SBData.cvD.length>0){
    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
            W.U.madianLoading('show');
            
                    },
                    success: function (data) {
               W.U.madianLoading('hide');
           var ret = JSON.parse(data);
          
                        if (ret.state == 500) {
var AlertError =  W.T.AlertError({message:ret.mistake.message});
    W.U.AddDom(help,AlertError,'html');
   W.F.alert(); 
   
                        }
                        if (ret.state == 200) {

                  console.log(ret.response);
        
                                }
                    }

                });
}else{
    var AlertError =  W.T.AlertError({message:['Your cart is empty']});
       W.U.AddDom(help,AlertError,'html');
       W.F.alert(); 
}
}

   new Handler(walkWay);
}
//this very important else create a recursion
  // chat First loading
function FirstResponseLoad(){
var  walkWay=W.U.id('checkincheckoutcon');
 init(walkWay); 
 
}  


return {FirstResponseLoad:FirstResponseLoad,
init:init};
})();



})(wowrol);