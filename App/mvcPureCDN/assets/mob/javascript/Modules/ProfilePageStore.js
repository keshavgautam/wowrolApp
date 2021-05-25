/*
* 
*/
; (function(W){
   "use strict";





var page=function(x){
  


    //--------------
 
    var ch='<div class="block" data-nodeid="browseingwalkway"></div>';


 
 W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
     W.U.Browsing.init();
    });





 return ch;


}
 var Madian=function(x){
       var ch='';
     console.log(x);
   var header=W.T.C.C3_storeprofileheader(x.EntityStripdata);
   var footer=W.T.Footer({});;


   ch+=page(x);

     

  ch+='<div class="block _bdy"><a href="javascript:void(0);" data-learnmore="understandcheckin" >Learn More checkIn</a></div>';
        return W.T.wrap(header,ch,footer);
   }


   
    

   


    W.M[W.A.page.AppId]=  {
       Madian:Madian
     };


})(wowrol);