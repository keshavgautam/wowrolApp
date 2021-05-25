/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

   
   var Madian=function(x){
       var ch='';
          var header= W.T.C.C3_buyerhomeheader(x);
      var footer=W.T.Footer({});;
       //--EntityStrip datab

        ch+='<div class="block _bdy bg_0 _B-gray  m_b10">'+W.T.C.C2_EntityStrip(x.EntityStripdata,{})+'</div>';
 //-->>   
  
ch+='<div  data-nodeid="spreadwalkway" class="block " style="margin-bottom: 100px;"> </div>';
 W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
     W.U.Spread.init(W.U.id('spreadwalkway'));
    });
    

 ch+= '<a href="javascript:void(0);" data-learnmore="'+ W.A.page.AppId +'" >Learn More</a>';

        return W.T.wrap(header,ch,footer);
   }
   
    
     
   
    

   


   W.M[W.A.page.AppId]=  {
       Madian:Madian
     };
   


  

 } )(wowrol);