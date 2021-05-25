
   /*
* page set up 2
*/
; (function(W){
   "use strict";
     var ch='<div class="block m30_0"><div class="block _Bdy"><div class="block m0_auto" style="width:100%;"><div class="block"   data-junction="textarea"  >sasdasd</div></div></div></div>';

     W.U.JunctionAdd(W.A.page.AppId, 'textarea',function(){
      W.U.contentEditable.bind(this)();


  },{textarea:true});

 ch+='<div class="block m30_0"><div class="block _Bdy"><div class="block m0_auto" style="width:100%;"><textarea name="wer"class="form-mold nochange" ></textarea></div></div></div>';

  


  ch+='<div class="block m30_0"><div class="block _Bdy"><div class="block m0_auto" style="width:100%;"><div class="block "   data-junction="contentEditable"  >sasdasd</div></div></div></div>';
     W.U.JunctionAdd(W.A.page.AppId, 'contentEditable',function(){
      W.U.contentEditable.bind(this)();


  },{ layout:'layout2'});


   var newView='<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>';   
   

     W.U.ccbk.Run(W.U.Page,'materialpleaseinsert',newView); 

    


})(wowrol);