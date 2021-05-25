/*
* 
*/
; (function(W){
   "use strict";
var Reason=['Ordered by mistake','Brought by mistake','Order items conditions are not as described in listing'];
   
 /*
  */
var PagingData={
   initent:'myorders' ,
   TranseData:{}, 
   resultFlow:'bottom',
    onsucess:function(_this){
      W.U.console(_this);

var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result;
var mainBlock=W.U.Rander('<div class="block ">'+W.T.myorders.t.t0(result,bypass)+'</div>');
 
      _this.DomInsert(walkWay,mainBlock,bypass,result);

   
     //
     

  }  
};





///------

function onOrderChangeStatus34Ask(){
     var str= (this['data-onorderchangeask']).split(':');  
     var Id=str[0],action=parseInt(str[1]);
     var data= W.U.intentdata.get('myorders.'+Id);
     W.U.console(data);
     if(W.U.isOK(data)){
       
         W.U.Pager.addblockdata({    name:'OrderChangeStatusAsk'+Id, htmlStr:W.T.myorders.OrderChangeStatusLayout,objectdata:{id:Id,data:data,action:action}});
      
  W.U.Pager.DirectTogglePage(W.I.dp,'OrderChangeStatusAsk'+Id);    
     }
      

}

//-----------
//--------------
function ApplyStatusChange(oid){
 var data= W.U.intentdata.get('myorders.'+oid);
    W.U.console(data);
 var f_value = W.F.walk_way_all(['nextorderstatus:0','oid','status_note'],'nextorderstatus'+data.oid+'');
 var nstatus=f_value['nextorderstatus:0'];
 if(nstatus==4||nstatus==8||nstatus==9){
      var f_value1 = W.F.walk_way_all(['reason'],'nextorderstatus'+data.oid+'');
    W.U.console(f_value1);
      f_value.status_note='Reason &nbsp;=&nbsp; '+Reason[parseInt(f_value1.reason)]+' &nbsp;&nbsp;&nbsp;'+f_value.status_note;

 }

 


 
    var formData = {
                    form: 'nextorderstatus',
                    f_value:f_value
                };

    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
                 W.U.madianLoading('show');
            W.U.Pager.togglePage('mainpage','orderchangestatus');
                    },
                    success: function (data) {
                        W.U.madianLoading('hide');
           var ret = JSON.parse(data);
         
                        if (ret.state == 500) {
 W.F.Toast({msg:'unsuccessful_action',theme:'error'});
  
                        }
                        if (ret.state == 200) {
 W.F.Toast({msg:'text_287'});
        //   updateView(ret.response[0]);
 UpdateOrderStatusBlock(ret.response[0]);
        W.U.Pager.togglePage(W.I.dp,W.I.dpbf);   

   


           
                              }
 
                    }

                });

}



//--------
function UpdateOrderStatusBlock(x){
    
  var mainBlock=W.U.Rander(W.T.myorders.t.status(x));

    W.U.Setview(W.U.id('orderstatusblock'+x.oid+''),mainBlock,'html');
}

/*

*/

var orderchangestatus={
onRander:[],
AddCallback:function(){
  orderchangestatus.onRander.push(orderchangestatus.beforeInert);  
},
beforeInert:function(){
    

    var mainBlock=this.mainblock;
    W.U.attrclick('[data-UpdateStatusChangebtn]',mainBlock[0], orderchangestatus.ApplyStatusChangeAsk);


},
ApplyStatusChangeAsk:function(){
         var str= (this['data-UpdateStatusChangebtn']).split(':');  
   var oid=str[0],action=parseInt(str[1]);
 
var Modeldata={
 name:'ApplyStatusChangeAsk',
 Tilte:'Confirm',
 body:'Do you want to Save this change for this order. there is no further Undo.',  
actionbutton:[{text:'Cancel',name:'no',cssClass:'fg_8"',attrStr:' data-pagertogglepage="'+W.I.dp+':orderchangestatus:myorders:'+oid+':'+action+'" '},{text:'Update ',name:'yes',cssClass:'fg_7'}],
YesCallback:function(){ 
 ApplyStatusChange(oid);
}
};

  W.U.Pager.AddModal(Modeldata);
     var f_value = W.F.walk_way_all(['nextorderstatus:0'],'nextorderstatus'+oid+'');

     if(f_value['nextorderstatus:0']!=''){
 W.U.Pager.DirectInitPage('mainpage','ApplyStatusChangeAsk'); 
 }else{
       W.F.Toast({msg:'Choose Next order status',theme:'error'});
 }


}

};
orderchangestatus.AddCallback();



/*

*/
function init(walkway){
    
  W.U.Pager.addblockdata({ name:'orderchangestatus', htmlStr:W.T.myorders.OrderChangeStatusLayout,onRander:orderchangestatus.onRander});



var mainBlock=W.U.Rander(W.T.myorders.Layout());
  W.U.Setview(walkway,mainBlock,'html');


   var TranseData = W.U.paging.GetTranseData('myorders');

   TranseData.bypass = 1; 
   TranseData.pgd = 1;    
 
 W.U.paging.load('myorders',TranseData);

}

W.U.myorders = {init:init,PagingData:PagingData};





   
  
})(wowrol);