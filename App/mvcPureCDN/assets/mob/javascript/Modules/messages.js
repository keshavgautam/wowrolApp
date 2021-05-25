/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

   
   var Madian=function(x){
       var ch='';
      var header= W.T.C.C3_subPageheader({Title: '<a href="'+W.U.URL('messages')+'"  class="block header-cell fg_6 al-l"><h2 class=" title" >Messages</h2><i class="badge _gbtn"></i> </a>'});
    
      var footer=W.T.Footer({});;
       //--EntityStrip datab

     
 //-->>   
  
ch+='<div  data-nodeid="walkway" class="block " style="margin-bottom: 100px;"> </div>';
 W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
       
   W.U.Chat.init(W.U.id('walkway'));
    });
    

 ch+= '<a href="javascript:void(0);" data-learnmore="'+ W.A.page.AppId +'" >Learn More</a>';

        return W.T.wrap(header,ch,footer);
   }
   
    
     
   
    

   


   W.M[W.A.page.AppId]=  {
       Madian:Madian
     };
   


  

 } )(wowrol);