
/*
* Basic //Controllers loader
*/
; (function(W){
   "use strict";

function defaultSetting(){
   var data={
       is_edit:true,
       is_delete:true,
       is_select:false,
       usetype:'setting',//setting|checkout
       pager:'mainpage',
       backblock:'blockFront'
   };


 return W.U.clone(data);   
}



function buyeraddressdetailPage(block){
         

 var formData=block;
 
 
 
var frombody=W.T.DeliveryAddres.buyeraddressdetailPage;

var formLogic =function() {
     var   f_value = W.F.walk_way_all(['address','phone','country','state','citybystate'], this.formname),
       error=5, alert_mes = [],formData=this.formData;
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
 W.U.extend(f_value,W.F.walk_way_all(['landmark','townbycity','otheraddress','otherlandmark','otherphone'], this.formname));
  
 
 if(f_value.townbycity!=''){
   var li_data= W.U.intentdata.get(f_value.townbycity);
      f_value.townbycity=li_data.id;
 }

 if(f_value.citybystate!=''){
   var li_data= W.U.intentdata.get(f_value.citybystate);
      f_value.citybystate=li_data.id;
 }
 if(f_value.state!=''){
   var li_data= W.U.intentdata.get(f_value.state);
   f_value.state=li_data.id;
 }
 if(f_value.country!=''){
   var li_data= W.U.intentdata.get(f_value.country);
  f_value.country=li_data.id;
 }

 f_value.address_id=formData.objectdata.address_id;

 var AlertError = W.T.AlertError({message:alert_mes});
       
     

var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };
  
   
      return ret;
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){
   var _this=this;
    var block=this.form.formData,y=block.triggerdata;
   
                                W.U.madianLoading("hide");
                                var AlertSuccess = W.T.AlertSuccess({ heading: '', message: 'Saved.' });
                                W.U.AddDom(this.form.formhelp, AlertSuccess, 'html');
                              W.F.alert(); 

          W.F.Toast({msg:'text_287'});                      
                         
       if(W.I.AppId!='setting_buyer'&&W.I.AppId!='store_settings'){// for checkout page we need new address data with checed delivery location
     W.U.Browsing.UpdateSBData(function(){
               W.U.intentdata.add('setting.568',_this.data.setting_568);
      var HandleRef=  W.U.intentdata.get('DeliveryAddress.'+y[6]);
      if(W.U.isOK(HandleRef)){
      
             var SBData = W.U.StoreBrowsing.hi_SBdata();
           HandleRef.data=SBData.addr[1];
           HandleRef.set_list();
      }
 
             //--
 //  W.U.formReset(this.form.formname,this.data.setting_568);                  
       W.U.Pager.togglePage(y[4], y[5]); 

     });
           }else{// for setting page
   W.U.intentdata.add('setting.568',_this.data.setting_568);
      var HandleRef=  W.U.intentdata.get('DeliveryAddress.'+y[6]);
      if(W.U.isOK(HandleRef)){
      
        
           HandleRef.data=_this.data.setting_568;
           HandleRef.set_list();
      }
                 W.U.Pager.togglePage(y[4], y[5]);      
           }                  

     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
   W.F.alert(); 

 }



var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:formData,
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic,
            formbtn:''
         };


var Jid= W.U.J(function(){
     
 W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);  

     var ch ='<form name="buyer_setting_568"  data-junction="'+Jid+'" onsubmit="return false"> </form>';
   
 


             return ch;  



    
}


function Handler(Node,data,options,intentId){
    this.Node=Node;
    this.data=data;
    this.options=W.U.extend({  pager:'mainpage', backblock:'blockFront',presention:'page'},options);
    this.intentId=intentId;
    this.set_list();

 W.U.Pager.addblockdata({ name:'buyeraddressdetailPage', htmlStr:buyeraddressdetailPage,presention:this.options.presention});
}

Handler.prototype.set_list=function(){
    W.U.AttachDom(this.Node,W.T.DeliveryAddres.list(this.data,this.options,this.intentId),'html',function(){
        
    });
  
}

//-----------------------------------------------------------------------------------------------------


function shippingLocationChangePage(block){
   
 var formData=block;
 
 
 
var frombody=W.T.DeliveryAddres.shippingLocationChangePage;

var formLogic =function() {
     var   f_value = {},
       error=1, alert_mes = [],formData=this.formData;
     
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
 f_value.address_id=address_id;
 f_value.checkin=SBData.checkIn_id;
 error=0;
  }else{
   alert_mes.push('select a address');   
  }






 var AlertError = W.T.AlertError({message:alert_mes});
       
     

var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };
  
   
      return ret;
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){
    var block=this.form.formData,y=block.triggerdata;

                                W.U.madianLoading("hide");
                                var AlertSuccess = W.T.AlertSuccess({ heading: '', message: 'Saved.' });
                                W.U.AddDom(this.form.formhelp, AlertSuccess, 'html');
                              W.F.alert(); 
 
          W.F.Toast({msg:'text_287'});                      
           var SBData=W.U.Browsing.hi_SBdata(); 
       SBData.addr_id=this.data.addr_id;
       W.U.Browsing.hi_SBdata(SBData);                    
                   
    W.U.Pager.togglePage('mainpage',block.objectdata.options.backblock);          
       W.U.ccbk.Run('onshippingaddressselected');
                             

     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
   W.F.alert(); 

 }



var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:formData,
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic,
            formbtn:''
         };


var Jid= W.U.J(function(){
     
 W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);  

     var ch ='<form name="buyeraddressSelect"  data-junction="'+Jid+'" onsubmit="return false"> </form>';
   
 


             return ch;  
}

/*
**/
function ShippingCheck(Node,options){
       this.Node=Node;
   this.options=W.U.extend(defaultSetting(),options);
  this.TemplateNode=this.initTemplate();
 
 


  this.init();
    W.U.ccbk.Add('onshippingaddressselected' ,this.init.bind(this));
}

ShippingCheck.prototype={
 initTemplate :function(){
      var  mainBlock=W.U.Rander( W.T.DeliveryAddres.shippingCheckLayout(this));

      var TemplateNode={
        InfoBlock:W.U('[data-block="button"]',mainBlock)[0]
          } ;
  W.U.Setview(  this.Node,mainBlock, 'html');
   return TemplateNode;
},
init:function(){
    this.setcomponent('InfoBlock');
},
setcomponent:function(name){
    var _this=this;
    switch (name){
       case 'InfoBlock':
  var address_id,buyerAddess,storeAddess,address,addr;
this.SBData=W.U.StoreBrowsing.hi_SBdata();

if(this.SBData.role==1){
  
   this.address_id=this.SBData.addr_id;
 buyerAddess=this.SBData.addr[1][ this.address_id];
 storeAddess=this.SBData.addr[0];
 this.address=addr=(W.U.isOK(buyerAddess))?buyerAddess: storeAddess;


   W.U.AttachDom(  this.TemplateNode.InfoBlock,W.T.DeliveryAddres.shippingInfoBlock(this), 'html',function(){
        
     W.U.attrclick('[data-btn="shippingLocationChange"]',this.mainBlock[0],_this.shippingLocationChange.bind(_this));
   });

  
  
    
}

       break; 

    }
    
    
    
    
    },
shippingLocationChange:function(){
var presention=(W.I.wf=='mob')?'page':'model';

    W.U.Pager.addblockdata({ name:'shippingLocationChangePage', htmlStr:shippingLocationChangePage,presention:presention,objectdata:this});
  
      W.U.Pager.DirectTogglePage('mainpage','shippingLocationChangePage');  
}
}
//-----------------------------------------------------------------------------------------------------
/*
**/
function init(Node,data,options){
  var DeliveryAddress, Uid=W.U.uId();
 DeliveryAddress=   new Handler(Node,data,options,Uid);  
  W.U.intentdata.add('DeliveryAddress.'+Uid, DeliveryAddress);  

  return Uid;
}

   W.U.DeliveryAddres={
       init:init,
       ShippingCheck:function(Node,options){
           new ShippingCheck(Node,options);
       }
   };

})(wowrol);