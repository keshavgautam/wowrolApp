/*
* 
*/
; (function(W){
   "use strict";

  


var Madian=function(x){
var  ch='<div  class="block "    data-nodeid="walkway" > </div>';
 W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
       
     W.U.ragisterStore.init(W.U.id('walkway'),{});
    });

    return ch;
   }


  var Landing=function(x){
        var ch ='';
   var  blockFront=Madian(x);

   var BlockList=[];
BlockList.push({name:"blockFront",htmlStr:blockFront});
var setting ={
    name:'mainpage',
    BlockList:BlockList,
    target:0,
    page:true,
    minheight:'auto'
};
    ch+=  W.T.Pager(setting);
       return ch;
   }
   
    

   


      W.M[W.A.page.AppId]=  {
       Madian:Madian,
       Landing:Landing
     };


})(wowrol);