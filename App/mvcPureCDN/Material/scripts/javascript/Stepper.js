

   /*
* page set up 2
*/
; (function(W){
   "use strict";

 var ch = '<div class="block _bdy">';  var limit =4;
  
     //-------
      ch += '<div class="block _bdy ">---========---</div>';


 
   var steps = [];
  for (var q = 0; q < limit; q++) {

        steps[q] = {
     title:'title ' + q + '',
     substitle:'substitle',
     titleicon:'',
     bodyhtml: '<div class="block"  >' + W.T.DummyDiv(q) + '</div>'
  
   };


     }
  
  var options={

  };
 
 var Jid=  W.U.J( function () {
     W.U.Stepper.init(this.Node,this.data.options,this.data.steps);

   
     }, {options:options,steps:steps});


 ch += '<div class="block" data-junction="'+Jid+'" ></div>';
ch+='</div>';

   var newView='<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>';   
   

     W.U.ccbk.Run(W.U.Page,'materialpleaseinsert',newView); 

 W.U.resize();
})(wowrol);