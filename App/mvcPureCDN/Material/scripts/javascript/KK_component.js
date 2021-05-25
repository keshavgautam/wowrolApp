

   /*
* page set up 2
*/
; (function(W){
   "use strict";





   var BootstrapModal = W.KK.createClass({
       data:{hi:'i m hi data',rt:' rt dfg df dfg dfg',info:{firstName:'keshav',lastName:'gautam'}},
 close: function(x) {

  },
  open: function(x) {
      var _this=this;
  debugger;
  },
render:function(){
    var _this=this;
    var ch='<div class="block" >';

     ch+='<div class="block" >in rnader class{hi} </div>';
       ch+='<div class="block" ><span>in rnader class{rt}</span> <span>{info.firstName}</span> </div>';

   ch+='<div class="block" > <span>{info.firstName}</span> -  <span>{info.lastName}</span> </div>';
   ch+='<button kk-click="open" >open</button>';
   ch+='</div>';
    
    return ch;

}
});


  var Jid= W.U.J(function () {
 
     
  W.KK.InsertComponent(this.Node,BootstrapModal,'html');

     }, {});


 var ch = '<div class="block _bdy" data-junction="'+Jid+'" ></div>';

   var newView='<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>';   
   

     W.U.ccbk.Run(W.U.Page,'materialpleaseinsert',newView); 

 W.U.resize();
})(wowrol);