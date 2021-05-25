/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

  


   var Madian=function(x){
    var ch='<div class="block" style="max-width:540px; ">';
      
 //-->>   
 ch+='<div  data-dynamicspotmanager="profilecomplete:profilecomplete" ></div>'; 
ch+='<div  data-nodeid="spreadwalkway" class="block _bdy" style="margin-bottom: 100px;"> </div>';
 W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
     W.U.Spread.init(W.U.id('spreadwalkway'));
    });
    

 ch+= '<a href="javascript:void(0);" data-learnmore="'+ W.A.page.AppId +'" >Learn More</a>';
 ch+='</div>';
 return ch;
   }
   
    
     
   
    



      W.M[W.A.page.AppId]=  {
       Madian:Madian
     };
   


  

 } )(wowrol);