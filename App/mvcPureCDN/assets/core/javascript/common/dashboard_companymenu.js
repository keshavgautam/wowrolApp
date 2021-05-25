/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";
 





   
var Madian=function(x){
       var ch='',blockFront='';
  var header= W.T.C.C3_subPageheader({Title: '<a href="'+W.U.URL('dashboard_menu')+'" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >Menu</h2><i class="badge _gbtn"></i> </a>'});
   var footer=W.T.Footer({});;


ch+= '<div class="block" data-nodeid="DashboardMenuInputCol"></div>';
ch+= '<div class="block" data-nodeid="DashboardMenuArrangeCol"></div>';





 W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
  W.U.dashboardmenu.init(W.U.id('DashboardMenuInputCol'),W.U.id('DashboardMenuArrangeCol'),x.store_menu);
    });



ch+= '<a href="javascript:void(0);" data-learnmore="'+ W.A.page.AppId +'" >Learn More</a>';
 //--search



      


   
       return  W.T.wrap(header,ch,footer);
   }
   
    
     
   
    

  W.M[W.A.page.AppId]=  {
     Madian: Madian
     };
   


  

 } )(wowrol);