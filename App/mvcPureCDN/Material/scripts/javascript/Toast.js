/*
* page set up 2
*/
; (function(W){
   "use strict";
   var ch='';
  

 
    function showToast(){
       var rv =   ['msg', 'theme'],
      f_value = W.F.walk_way_all(rv, 'checkToast');


      W.F.Toast( f_value);
  }


  wowrol.U.showToast=showToast;

  
   var newView=W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>');   
   



           W.U('#page').html(newView);


})(wowrol);


 