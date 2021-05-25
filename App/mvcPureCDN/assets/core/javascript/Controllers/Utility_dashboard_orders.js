/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

   


function orderfilter(block){
    var ch='<div class="block" data-junction="addfilter"></div>';

     var TranseData= W.U.intentdata.get('do.TranseData');

           
   W.U.JunctionAdd(W.A.page.AppId,'addfilter',function(){
     
 W.U.filter.init(this.Node,this.data);
  },{
    TranseData:TranseData,
    LoadData:W.U.DashboardTable.LoadData,
    name:'dashboard_orders'
    
    
    });    

//W.T.OrdeDashBoard.filterBlock(TranseData)
 


return ch;
};


var orderchangestatus={
onRander:[],
html:function(block){
       var odata=block.objectdata;
  var header= W.T.ActivityHeader({ 
    back:'<a href="javascript:void(0);" class="block header-link-btn" data-pagerbtn="'+W.I.dp+':'+W.I.dpbf+'"   >'+W.T.SVG('left',24,'#f1f5fc')+' </a>',
            Title: '<span class="block header-cell fg_6 al-l" ><span class="fw-b al-c tt-c"><span class="vl-sp"  >text_100</span></<span></span>',
   
         RightLink:'<div class="di-td"><a href="javascript:void(0);"  class="block header-link-btn"  data-UpdateStatusChangebtn="'+odata.oid+'" >update </a></div>'
            });
       var ch='<div class="block" data-junction="orderchangestatus"></div>'; 

   W.U.JunctionAdd(W.A.page.AppId,'orderchangestatus',function(){
     
W.U.OrderStatusUpdate.init(this.Node,this.data);
  },odata);  

  return   W.T.DashbordFormWrap(header, ch);
},   
AddCallback:function(){
  orderchangestatus.onRander.push(orderchangestatus.beforeInert);  
},
beforeInert:function(){
    

    var mainBlock=this.mainblock;
    W.U.attrclick('[data-UpdateStatusChangebtn]',mainBlock[0], orderchangestatus.ApplyStatusChangeAsk);


},
ApplyStatusChangeAsk:function(){
    var oid=this['data-UpdateStatusChangebtn'];
var Modeldata={
 name:'ApplyStatusChangeAsk',
 Tilte:'text_99',
 body:'help_77',  
actionbutton:[{text:'text_63',name:'no',cssClass:'fg_8"',attrStr:' data-pagerbtn="mainpage:orderchangestatus:do:'+oid+'" '},{text:'update ',name:'yes',cssClass:'fg_7'}],
YesCallback:function(){ 

W.U.OrderStatusUpdate.Apply(oid);
}
};

  W.U.Pager.AddModal(Modeldata);
     var f_value = W.F.walk_way_all(['nextorderstatus:0'],'nextorderstatus'+oid+'');

     if(f_value['nextorderstatus:0']!=''){
 W.U.Pager.DirectInitPage('mainpage','ApplyStatusChangeAsk'); 
 }else{
       W.F.Toast({msg:'ajax_44',theme:'error'});
 }


}

};
orderchangestatus.AddCallback();
function Modeldata(){
    return {
name:'testmodal',
 Tilte:'Tilte',
 msg:'Message',
 body:'Message',  
actionbutton:[{text:'No',name:'no',cssClass:'fg_8"',attrStr:' data-pagerbtn="mainpage:blockFront" '},{text:'Yes ',name:'yes',cssClass:'fg_7'}],
YesCallback:function(){ alert('hi')}
};
}





  function init(walkway){
    


         var presention =(W.I.wf=='mob')?'page':'drawerright';

  W.U.Pager.addblockdata({ name:'orderfilter', htmlStr:orderfilter,presention:presention});
  W.U.Pager.addblockdata({ name:'orderchangestatus', htmlStr:orderchangestatus.html,onRander:orderchangestatus.onRander});





 var mainBlock=W.U.Rander(W.T.dashboardorders.Layout());

  W.U.Setview(walkway,mainBlock,'html');
}
W.U.dashboardorders={init:init};

 } )(wowrol);
