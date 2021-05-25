/*
* 
*/
; (function (W) {
    "use strict";
var activeTab=0;
var tab=['text_22','text_23','text_24','text_25','text_26'];
function checkinfilter(){
    

   var Header  =W.T.DashbordFormHeader({titleText:'text_21',submitbutton:false});
    var BootstrapModal = W.KK.createModule({

onAfterUpdate:function(){ var _this=this;    W.U.ccbk.Run(W.U.Page,'KK_update_checkininfoBlock' ,this.data);      },
   controller:function () {
var _this=this;
 this.tabIndex= activeTab;
 this.tab= W.U.GetText(tab[this.tabIndex]);
 this.filter=function(x){

      var  TranseData =W.U.DashboardTable.TranseData();
      TranseData.ifo.type=x;
   _this.tabIndex= W.U.intval(x);
     activeTab=_this.tabIndex;

        W.U.DashboardTable.LoadData(TranseData);
  }


},
   render:function(){

    var ch=' <div class="block _Bdy" >'
    +'<div class="block _Bdy fs14" >text_21</div>'
    +'<div class="block _Bdy fw-b" >'
    +'<a href="javascript:void(0);" class="block _Bdy no-t-deco hov" kk-click="this.filter(0)" kk-class="{bg_7:(this.tabIndex==0)}" >text_22</a>'
    +'<a href="javascript:void(0);" class="block _Bdy no-t-deco  hov" kk-click="this.filter(1)" kk-class="{bg_7:(this.tabIndex==1)}" >text_23</a>'
    +'<a href="javascript:void(0);" class="block _Bdy no-t-deco  hov" kk-click="this.filter(2)" kk-class="{bg_7:(this.tabIndex==2)}" >text_24</a>'
    +'<a href="javascript:void(0);"  class="block _Bdy no-t-deco  hov"   kk-click="this.filter(3)" kk-class="{bg_7:(this.tabIndex==3)}"  >text_25</a>'
    +'<a href="javascript:void(0);"  class="block _Bdy no-t-deco  hov"   kk-click="this.filter(4)" kk-class="{bg_7:(this.tabIndex==4)}" >text_26</a>'
    +'</div>'
    +'</div>';
    
    return ch;

}
});


      var Jid= W.U.J(function () {
 
     
  W.KK.InsertComponent(this.Node,BootstrapModal,'html');

     }, {});
     var ch='<div class="block  _bdy bg_0 bs-1"  data-junction="'+Jid+'"  ></div>';
     return   W.T.DashbordFormWrap(Header, ch);  



}










/*

*/
 function init(walkway){
    

     W.U.intentdata.add('dashboard_checkins.0',{});


W.U.Pager.addblockdata({ name:'checkinfilter', htmlStr:checkinfilter});

W.U.KKJunction('checkininfoBlock',{
   name:'checkininfoBlock',
   controller:function(){   var _this=this;   this.activefilter= W.U.GetText(tab[activeTab]);      }  
 });
 
 
 var mainBlock=W.U.Rander(W.T.dashbordCheckins.Layout());

  W.U.Setview(walkway,mainBlock,'html');
}




W.U.dashbordCheckins = {init:init};

})(wowrol);