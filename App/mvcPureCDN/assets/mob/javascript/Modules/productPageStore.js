/*
* 
*/
; (function(W){
   "use strict";





var page=function(x){
 var URL=W.U.URL;    var ch='';




 W.U.intentdata.add('storemenu.0',x.store_menu);

 W.U.Pager.addblockdata({ name:'StoreMenu', htmlStr:W.T.C.StoreMenuPage});








    //-------------------
   ch+='<div class="block _Bdy  m_b10 bg_0 bs-1"> <div class="left"> '+W.T.StoreCheckInList.button(x.SBData,"profilepageStore")+'</div><div class="right"> <button type="button" class="btn btn-primary btn-xs"  data-pagerbtn="mainpage:StoreMenu:storemenu:0"  ><span>Explore</span><span></span></button></div></div>';
   ch+='<div class="block" data-nodeid="browseingwalkway"></div>';


 
 W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
     W.U.Browsing.init();
    });





 return ch;


}


var Madian=function(x){
       var ch='';
  //   console.log(x);
   var header=W.T.C.C3_storeprofileheader(x.EntityStripdata);
   var footer=W.T.Footer({});;
   //--EntityStrip datab

 //-->>  
   ch+=page(x);
       


        return W.T.wrap(header,ch,footer);
   }

 
   
    

   


   W.M[W.A.page.AppId]=  {
       Madian:Madian
     };


})(wowrol);