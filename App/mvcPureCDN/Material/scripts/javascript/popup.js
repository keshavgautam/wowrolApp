

   /*
* page set up 2
*/
; (function(W){
   "use strict";
 
   function popup(){
         $(this.Node).popover(this.data);
   };

    W.U.JunctionAdd(W.A.page.AppId, 'popupleft', popup, {
    placement: 'auto',trigger:"hover" 
 
  });
   W.U.JunctionAdd(W.A.page.AppId, 'popuptop', popup, {
    placement: 'auto ',
 html:'keshav gautamasd asd asd',trigger:"focus"
  });
   W.U.JunctionAdd(W.A.page.AppId, 'popupbottom',popup, {placement: 'auto ',trigger:"click"});
   W.U.JunctionAdd(W.A.page.AppId, 'popupright', popup, {placement: 'auto ',trigger:"focus hover click"});  


})(wowrol);