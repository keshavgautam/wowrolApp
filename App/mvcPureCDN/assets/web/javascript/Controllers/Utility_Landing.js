/*
* 
*/
; (function(W){
   "use strict";
    var URL=W.U.URL;



function BuyerColThree(x){
     var ch='';
         ch+='<div class="block  _bdy no-p-r no-p-l"> <div class="block _bdy bg_0 bs-1   m_b10">'+W.T.C.C2_EntityStrip(x.EntityStripdata,{})+'</div>'; 
          var  DrawerMEnu= W.I.BUYER_MENU.concat(W.I.BUYERAlERT_MENU);
       ch+=W.U.CreateList(DrawerMEnu, W.I.WebLinkOptionForList); 
       ch+='</div>'
 return ch;
}

function BuyerColOne(x){
     var ch='';
   
 return ch;
}


function LMColThree(x){
     var ch='';
         ch+='<div class="block  _bdy no-p-r no-p-l"> <div class="block _bdy bg_0 bs-1   m_b10">'+W.T.C.C2_EntityStrip(x.EntityStripdata,{})+'</div>'; 
          var  DrawerMEnu= W.I.LM_MENU.concat(W.I.LMAlERT_MENU);
       ch+=W.U.CreateList(DrawerMEnu, W.I.WebLinkOptionForList); 
       ch+='</div>'
 return ch;
}

function LMColOne(x){
     var ch='';
   
 return ch;
}






 //--
function Welcome(x){
        
       var DrawerMEnu=  W.I.LOGOUT_MENU
       if(W.A.page.AcessData.LoginStatus){
           if(W.A.page.AppId!='VerifyAccount'){
              DrawerMEnu=  W.I.LOGIN_MENU;   
           }
     
       }
   /*    var headerRow1=W.T.WebHeader({  actiondropdown:DrawerMEnu  });
      var header= [];
      header.push({Isfixed:true,html:headerRow1});
   */
     var header=W.T.WebHeader({  actiondropdown:DrawerMEnu  });
     var header=W.T.WebHeader({  actiondropdown:DrawerMEnu  });
      var footer=W.T.Footer({});;

  
 var   blockFront= W.T.wrap(header,W.M[W.A.page.AppId].Madian(x),footer);
  var BlockList=[];
BlockList.push({name:"blockFront",htmlStr:blockFront});
BlockList.push({name:"search",htmlStr:W.T.Search.page()});
var setting ={
    name:'mainpage',
    BlockList:BlockList,
    target:0,
    page:true,
    minheight:'auto'
};
   
       return W.T.Pager(setting);
 }
 function ErrorPage(x){
     var ch='<div class="block po-re top_fix">'+W.T.Header.wellcome({})+'</div><div id="median" data-appMedian="page" class="block "> <div class="content"> <div class="block bs-2dp bg_0 _bdy m_b10"><div class="block " style="padding-top:100px; "><span class="block al-c" style=""></span> <div class="text ff_0 fs12"> <h2 class="al-c">404 error! page not found.</h2><div class=" al-c"> <div class="block"> <h3 class="m_b5"> Sorry ! The page you want to view, not found.</h3> </div> </div></div></div></div></div>'+/*wowrol.Modules.Main.Footer()+*/' </div>';

     return ch;

 }
 function  HomePageBuyer(x){
    var DrawerMEnu=  W.I.LOGOUT_MENU
       if(W.A.page.AcessData.LoginStatus){
     DrawerMEnu=  W.I.LOGIN_MENU;

       }

  

       var headerRow1=W.T.WebHeader({  actiondropdown:DrawerMEnu ,  Login:W.A.page.AcessData.LoginStatus });
      var header= [];
      header.push({Isfixed:false,html:headerRow1});
   //  header.push({Isfixed:false,html:headerRow1});
   //  header.push({Isfixed:true,html:headerRow1});
      var footer=W.T.Footer({});;
        
     var Madian=W.M[W.A.page.AppId].Madian(x);
     var rightCol='',mid='',classes=['w-x-5','w-x-16'];
     if( W.U.isArray(Madian)){
        if(Madian.length==2){
               info=Madian[0][0];
        rightCol=Madian[0][1];  
            classes=Madian[1]
             
        }
     }else{
        rightCol=Madian;
     }


switch (W.I.AppId){
   case 'messages':
   mid= Madian; 
  footer='';
   break; 
   case 'checkins':
   mid= Madian; 
    footer='';
   break; 
   default:
  mid= W.T.ColumnWrap540left(BuyerColOne(x),Madian,BuyerColThree(x));
}
  
var   blockFront= W.T.wrap(header,mid,footer);
var search= W.T.Search.page();
  var BlockList=[];
BlockList.push({name:"blockFront",htmlStr:blockFront});
BlockList.push({name:"search",htmlStr:search});
var setting ={
    name:'mainpage',
    BlockList:BlockList,
    target:0,
    page:true,
    minheight:'auto'
};
   
       return W.T.Pager(setting);
 }
function HomePageStore(x){
    var DrawerMEnu=  W.I.LOGOUT_MENU,DashboardMenu=W.I.STORE_MENU;
       if(W.A.page.AcessData.LoginStatus){
            DrawerMEnu=  W.I.LOGIN_MENU;

       }
    var info= W.T.ColDashboardInfo(x);
    var header=W.T.WebHeader({  actiondropdown:DrawerMEnu ,  Login:W.A.page.AcessData.LoginStatus });
      var footer=W.T.Footer({});;
   




      //--
     

      var DashboardMenu=W.U.CreateList(DashboardMenu,W.I.WebLinkOptionForList);
    

     var Madian=W.M[W.A.page.AppId].Madian(x);
     var rightCol='',classes=['w-x-5','w-x-16'];
     if( W.U.isArray(Madian)){
        if(Madian.length==2){
               info=Madian[0][0];
        rightCol=Madian[0][1];  
            classes=Madian[1]
             
        }
     }else{
        rightCol=Madian;
     }


switch (W.I.AppId){
   case 'messages':
  var mid= Madian; 
     footer='';
   break; 
   case 'checkins':
  var mid= Madian; 
     footer='';
   break; 
   default:
 var mid= W.T.ColumnWrapXXX([DashboardMenu,info, rightCol],['w-x-3',classes[0],classes[1]]); 
}

  
var blockFront=  W.T.wrapForModal(header,mid,footer,true);
var search= W.T.Search.page();
  var BlockList=[];
 BlockList.push({name:"blockFront",htmlStr:blockFront});
 BlockList.push({name:"search",htmlStr:search});
var setting ={
    name:'mainpage',
    BlockList:BlockList,
    target:0,
    page:true,
    minheight:'auto'
};
   
       return W.T.Pager(setting);
 }

function HomePageLocationManager(x){
    var DrawerMEnu=  W.I.LOGOUT_MENU
       if(W.A.page.AcessData.LoginStatus){
     DrawerMEnu=  W.I.LOGIN_MENU;

       }

  

       var headerRow1=W.T.WebHeader({  actiondropdown:DrawerMEnu ,  Login:W.A.page.AcessData.LoginStatus });
      var header= [];
      header.push({Isfixed:false,html:headerRow1});
   //  header.push({Isfixed:false,html:headerRow1});
   //  header.push({Isfixed:true,html:headerRow1});
      var footer=W.T.Footer({});;
        
     var Madian=W.M[W.A.page.AppId].Madian(x);
     var rightCol='',mid='',classes=['w-x-5','w-x-16'];
     if( W.U.isArray(Madian)){
        if(Madian.length==2){
               info=Madian[0][0];
        rightCol=Madian[0][1];  
            classes=Madian[1]
             
        }
     }else{
        rightCol=Madian;
     }


switch (W.I.AppId){
   case 'messages':
   mid= Madian; 
  footer='';
   break; 
   case 'checkins':
   mid= Madian; 
    footer='';
   break; 
   default:
  mid= W.T.ColumnWrap540left(LMColOne(x),Madian,LMColThree(x));
}
  
var   blockFront= W.T.wrap(header,mid,footer);
var search= W.T.Search.page();
  var BlockList=[];
BlockList.push({name:"blockFront",htmlStr:blockFront});
BlockList.push({name:"search",htmlStr:search});
var setting ={
    name:'mainpage',
    BlockList:BlockList,
    target:0,
    page:true,
    minheight:'auto'
};
   
       return W.T.Pager(setting);
 }


function HomePageCompany(x){
        var DrawerMEnu=  W.I.LOGOUT_MENU
       if(W.A.page.AcessData.LoginStatus){
     DrawerMEnu=  W.I.LOGIN_MENU;

       }

  

       var headerRow1=W.T.WebHeader({  actiondropdown:DrawerMEnu ,  Login:W.A.page.AcessData.LoginStatus });
      var header= [];
      header.push({Isfixed:false,html:headerRow1});
   //  header.push({Isfixed:false,html:headerRow1});
   //  header.push({Isfixed:true,html:headerRow1});
      var footer=W.T.Footer({});;
        
     var Madian=W.M[W.A.page.AppId].Madian(x);
     var rightCol='',mid='',classes=['w-x-5','w-x-16'];
     if( W.U.isArray(Madian)){
        if(Madian.length==2){
               info=Madian[0][0];
        rightCol=Madian[0][1];  
            classes=Madian[1]
             
        }
     }else{
        rightCol=Madian;
     }


switch (W.I.AppId){
   case 'messages':
   mid= Madian; 
  footer='';
   break; 
   case 'checkins':
   mid= Madian; 
    footer='';
   break; 
   default:
  mid= W.T.ColumnWrap540left(LMColOne(x),Madian,LMColThree(x));
}
  
var   blockFront= W.T.wrap(header,mid,footer);
var search= W.T.Search.page();
  var BlockList=[];
BlockList.push({name:"blockFront",htmlStr:blockFront});
BlockList.push({name:"search",htmlStr:search});
var setting ={
    name:'mainpage',
    BlockList:BlockList,
    target:0,
    page:true,
    minheight:'auto'
};
   
       return W.T.Pager(setting);
}


function ProfilePageBuyer(x){
    var DrawerMEnu=  W.I.LOGOUT_MENU
       if(W.A.page.AcessData.LoginStatus){
          DrawerMEnu=  W.I.LOGIN_MENU;

       }

     

       var headerRow1=W.T.WebHeader({  actiondropdown:DrawerMEnu ,  Login:W.A.page.AcessData.LoginStatus });
      var header= [];
      header.push({Isfixed:false,html:headerRow1});
    
      var footer=W.T.Footer({});;
         
  
 var   blockFront= W.T.wrap(header,W.M[W.A.page.AppId].Madian(x),footer);
  var BlockList=[];
BlockList.push({name:"blockFront",htmlStr:blockFront});
BlockList.push({name:"search",htmlStr:W.T.Search.page()});

var setting ={
    name:'mainpage',
    BlockList:BlockList,
    target:0,
    page:true,
    minheight:'auto'
};
   
       return W.T.Pager(setting);
 }


function ProfilePageStore(x){
       var DrawerMEnu=  W.I.LOGOUT_MENU
       if(W.A.page.AcessData.LoginStatus){
      DrawerMEnu=  W.I.LOGIN_MENU;

       }

     

        var headerRow1=W.T.WebHeader({  actiondropdown:DrawerMEnu ,  Login:W.A.page.AcessData.LoginStatus });
      var headerRow2=W.T.WebHeader2(x);
      var header= [];
      header.push({Isfixed:false,html:headerRow1});
      header.push({Isfixed:true,html:headerRow2});
      var footer=W.T.Footer({});;
         
  
 var   blockFront= W.T.wrap(header,W.M[W.A.page.AppId].Madian(x),footer);
  var BlockList=[];
BlockList.push({name:"blockFront",htmlStr:blockFront});
BlockList.push({name:"search",htmlStr:W.T.Search.page()});
BlockList.push({name:"blockingPage",htmlStr:W.T.C.BlockPage,presention:'dialog'});
BlockList.push({name:"reportingPage",htmlStr:W.T.C.ReportPage,presention:'dialog'});
var setting ={
    name:'mainpage',
    BlockList:BlockList,
    target:0,
    page:true,
    minheight:'auto'
};
   
       return W.T.Pager(setting);
  
   }




 //--








 var  Landing={
 
     Welcome:Welcome,
     ErrorPage:ErrorPage,
     HomePageBuyer:HomePageBuyer,
     HomePageStore:HomePageStore,
    HomePageLocationManager:HomePageLocationManager,
ProfilePageBuyer:ProfilePageBuyer,
ProfilePageStore:ProfilePageStore

   };
   W.U.extend(W.U.Landing,Landing);
})(wowrol);