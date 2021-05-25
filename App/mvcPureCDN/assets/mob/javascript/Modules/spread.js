/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

   
   var Madian=function(x){
       var ch='';
  

      var header=W.T.C.C3_buyerprofileheader(x.EntityStripdata);
      var footer=W.T.Footer({});;
       //--EntityStrip datab
       
   
 //-->>   
  
ch+='<div  data-nodeid="spreadwalkway" class="block " style="margin-bottom: 100px;"> </div>';
 W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
      W.U.Spread.initForSpreadPage(W.U.id('spreadwalkway'));
    });




        return W.T.wrap(header,ch,footer);
   }
   
    
     
   
    

   
  W.M[W.A.page.AppId]=  {
       Madian:Madian
     };
   


  

 } )(wowrol);