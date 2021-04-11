
   /*
* page set up 2
*/
; (function(W){
   "use strict";
     var ch='<div class="block m30_0"><div class="block _Bdy"><div class="block m0_auto" style="width:500px;"><div class="block"   data-junction="textarea"  >sasdasd</div></div></div></div>';

     W.U.JunctionAdd(W.A.page.AppId, 'textarea',function(){
      W.U.contentEditable.bind(this)();


  },{textarea:true});




  ch+='<div class="block m30_0"><div class="block _Bdy"><div class="block m0_auto" style="width:500px;"><div class="block"   data-junction="contentEditable"  >sasdasd</div></div></div></div>';
     W.U.JunctionAdd(W.A.page.AppId, 'contentEditable',function(){
      W.U.contentEditable.bind(this)();


  },{});


   var newView=W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>');   
   



           W.U('#page').html(newView);
  


})(wowrol);