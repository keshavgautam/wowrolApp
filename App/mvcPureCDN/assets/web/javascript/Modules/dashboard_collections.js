/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";
 



   
       var Madian=function(x){
   var ch='<div class="block" >';
      
 //-->>   
  
ch+='<div  data-nodeid="deshboardwalkway" class="block _bdy" style="margin-bottom: 100px;"> </div>';
 W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
  
       W.U.dashboardcollections.init(W.U.id('deshboardwalkway'));
    });
    

 ch+= '<a href="javascript:void(0);" data-learnmore="'+ W.A.page.AppId +'" >Learn More</a>';
 ch+='</div>';
 return ch;
   }
     
   
    

   
  W.M[W.A.page.AppId]=  {
       Madian:Madian
     };
   


  

 } )(wowrol);