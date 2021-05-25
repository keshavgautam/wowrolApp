/*
* 
*/
; (function(W){
   "use strict";

function  palceorder(walkWay){
    var formname='RagisterShippingOrder',
       help=W.U('[data-help="RagisterShippingOrder"]')[0];
var _this=this;
   var  SBData=W.U.Browsing.hi_SBdata();
   var  CalculateCart=W.U.StoreBrowsing.CalculateCart();
        var formData = {
                    form: formname,
                    f_value: {checkin:SBData.checkIn_id,addr_id:SBData.addr_id}
                };

if(SBData.cvD.length>0){
   if(W.U.intval(CalculateCart.total)>W.U.intval(SBData.min_o)){

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
                            var msg='';
switch(ret.mistake.message){
   case 'unfulfilled_order':
   msg=W.U.GetText("text_414");
   break; 
   case 'empty_cart':
   msg=W.U.GetText("text_415");
   break; 
   case 'Not_allowed':
     msg=W.U.GetText("text_416");
   break; 
}
   
   var AlertError =  W.T.AlertError({message:[msg]});
       W.U.AddDom(help,AlertError,'html');
       W.F.alert(); 
                        }
                        if (ret.state == 200) {

                 // W.U.console(ret.response);

                  W.U.Browsing.hi_SBdata(ret.response.SBdata);



         
            W.U.AddDom(walkWay,W.T.CheckInCheckout.t.t6({order_id:ret.response.order_id}),'html');


                                }
                    }

                });


                }else{
                    
  var AlertError =  W.T.AlertError({message:[W.U.strformat(W.U.GetText("text_413"),CalculateCart.currencysymbol,SBData.min_o) ]});
       W.U.AddDom(help,AlertError,'html');
       W.F.alert(); 

                }
}else{
    var AlertError =  W.T.AlertError({message:[W.U.GetText("text_415")]});
       W.U.AddDom(help,AlertError,'html');
       W.F.alert(); 
}
}

/* 
*@des  save the selected address id in SB data 
*/
function onSelectedAddressSubmit(){
      var _this=this;
      var  allRadio=W.U('[name="buyeraddress"]');
  var address_id=0;
  for(var q in  allRadio){
     if( allRadio[q].checked){
         address_id=allRadio[q].value;
     }
  }

  if(address_id!=0){
       var SBData=W.U.Browsing.hi_SBdata(); 
       SBData.addr_id=address_id;
       W.U.Browsing.hi_SBdata(SBData); 

 return true;
  }else{
 W.F.Toast({msg:'ajax_32',theme:'',duration:2000});
      return false;
  }


      }



//--
function SelectAddress(step){
    var ch='';
    var SBData=W.U.Browsing.hi_SBdata();
      var page=(W.I.initType==2)?'mainpage':W.I.checkinPager;  
       var presention=(W.I.initType==3)?'model':'page';  
    var  backblock=(W.I.initType==3)?'blockFront':'checkinPlatformCheckout';  
   //----------------



var Jid=W.U.J(function(){   W.U.DeliveryAddres.init(this.Node,this.data,{ is_select:true, pager: W.I.checkinPager,
       backblock:backblock,presention:presention,usetype:'checkout'});    },SBData.addr[1]);




  var ch='<div class="block" >'  
  +'<div class="block _Bdy" >'
  +W.T.CheckInCheckout.t.t10()
  +'<div class="block" data-junction="'+Jid+'"></div>'
  +'</div>'
  +'<div class="block _Bdy " >'
  +W.T.CheckInCheckout.t.t11()
  +W.T.CheckInCheckout.SelectStoreAddress(SBData.addr[0])
  +'</div>'
  +'</div>';   

    return ch;
}



//--


function Checkout(walkWay){
    var SBData=W.U.Browsing.hi_SBdata();
 var cvD=SBData.cvD;
 var cvPD=SBData.cvPD;
 if(SBData.role==1){
    if(cvD.length>0 &&SBData.role==1){
     //-----------
       var checkPids=W.U.Browsing.CheckPbankCartVids();
 
  if(checkPids.length==0){
   SetSteps(walkWay);
     }else{
   
 W.U.Browsing.LoadInPbank(checkPids,0,walkWay,function(){
        SetSteps(walkWay);
         });
} 
     
     
     
     
        
//-------------------
    }else{
    W.U.AddDom(walkWay,'<div class="block _bdy bg_0 m_b10"> <p class="al-c">text_315</p> </div>','html'); 
 }  
 }else{
    W.U.AddDom(walkWay,'<div class="block _bdy bg_0 m_b10"> <p class="al-c">text_314</p> </div>','html'); 
 }
    
}
function SetSteps(walkWay){
var ch='';
var steps = [];

  //1
     steps.push({ title:'address & delivery', substitle:'choose your address',  
     bodyhtml: SelectAddress,
      isbackbutton:false,
      isSkipbutton:false,
      oncontinue:onSelectedAddressSubmit
  
   });
/// step -2
    steps.push({ title:'payment ', substitle:'',  
     bodyhtml: W.T.CheckInCheckout.t.step_payment,
    isSkipbutton:false,
   Textcontinuebutton:'place order',
   oncontinue:function(){ palceorder(walkWay)}
   });


  var options={

  };
 
 var Jid=  W.U.J( function () {
     W.U.Stepper.init(this.Node,this.data.options,this.data.steps);

   
     }, {options:options,steps:steps});


 ch += '<div class="block" data-junction="'+Jid+'" ></div>';



 W.U.AddDom(walkWay,ch,'html');
}


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

 
W.U.Pager.addblockdata({name:'checkinPlatformCheckout', htmlStr:W.T.CheckInCheckout.Layout,presention:presention,objectdata:SBData,onRander:[function(){
     
  W.U.attrclick('[data-checkinPlatform]',this.mainblock[0],W.U.checkins.checkinPlatform);
}]});   

W.U.Pager.replacePage(pager,'checkinPlatformCheckout');  

//----
setTimeout(function(){
      var walkWay=W.U.id('checkinPlatformCheckoutWalkway'+SBData.checkIn_id); 
    
Checkout(walkWay);
},100);
    
}

//-- cart page

function CheckOutPage(){
 
     
       W.U.CheckInCheckout.init(); 
}


W.U.CheckInCheckout={
   init:init,
   CheckOutPage:CheckOutPage     


};



})(wowrol);