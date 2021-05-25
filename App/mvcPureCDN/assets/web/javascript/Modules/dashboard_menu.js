/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";
 




   
    
     
   
    


   
  function   Madian(x){
      var DrawerMEnu=  W.I.LOGOUT_MENU,DashboardMenu=W.I.STORE_MENU;
       if(W.A.page.AcessData.LoginStatus){
          DrawerMEnu=  W.I.LOGIN_MENU.concat(W.I.LOGOUT_MENU);

       }
    var info= W.T.ColDashboardInfo(x);
      var header=W.T.WebHeader({actiondropdown:DrawerMEnu  });
      var footer=W.T.Footer({});;
   

      console.log()


  W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 

  W.U.dashboardmenu.init(W.U.id('DashboardMenuInputCol'),W.U.id('DashboardMenuArrangeCol'),x.store_menu);
    });
     

      var DashboardMenu=W.U.CreateMENU(DashboardMenu);
    var onecol='<div class="block" data-nodeid="DashboardMenuInputCol"></div>';
    var twocol='<div class="block" data-nodeid="DashboardMenuArrangeCol"></div>';
     


   
  

   
       return [[onecol,twocol],['w-x-6','w-x-15']];


   }


  W.M[W.A.page.AppId]=  {
    Madian: Madian
     };

  

 } )(wowrol);