
   /*
* page set up 2
*/
; (function(W){
   "use strict";
 
   function tooltip(){
         $(this.Node).tooltip(this.data);
   };

    W.U.JunctionAdd(W.A.page.AppId, 'Tooltipleft', tooltip, {
    placement: 'auto top'
 
  });
   W.U.JunctionAdd(W.A.page.AppId, 'Tooltiptop', tooltip, {
    placement: 'auto bottom',
 html:'keshav gautamasd asd asd'
  });
   W.U.JunctionAdd(W.A.page.AppId, 'Tooltipbottom',tooltip, {});
   W.U.JunctionAdd(W.A.page.AppId, 'Tooltipright', tooltip, {});  


})(wowrol);