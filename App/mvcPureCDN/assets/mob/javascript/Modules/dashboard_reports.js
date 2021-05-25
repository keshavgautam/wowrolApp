/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";






        
   var Madian=function(x){
       var ch='';    
   var header= W.T.C.C3_subPageheader({Title: '<a href="'+W.U.URL('dashboard_reports')+'"  class="block header-cell fg_6 al-l"><h2 class=" title" >text_12</h2><i class="badge _gbtn"></i> </a>'});
   var footer=W.T.Footer({});;
   //--EntityStrip datab

        ch+='<div class="block _bdy bg_0 _B-gray  m_b10">'+W.T.C.C2_EntityStrip(x.EntityStripdata,{})+'</div>';
 //-->>   
      ch+='<div class="block m_b10" data-nodeid="deshboardwalkway" ></div>';
   W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
    
       W.U.dashboardreports.init(W.U.id('deshboardwalkway'));
    });


   


        return W.T.wrap(header,ch,footer);
   }
   
    
     
   
    

   
  W.M[W.A.page.AppId]=  {
       Madian:Madian
     };
   







      } )(wowrol);