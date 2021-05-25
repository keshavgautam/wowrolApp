/*
* 
*/
; (function(W){
   "use strict";
    var URL=W.U.URL;

   





 
 





 //--
 function Welcome(x){
        
      var header= W.T.Header.wellcome({});;
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
   var  blockFront=ch;
  
var search= W.T.C.C5_SearchDrawer();
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

     return  W.T.Pager(setting);

 }


function HomePageBuyer(x){
       var ch ='';
   var  blockFront=W.M[W.A.page.AppId].Madian(x);
//--blockFront

var DrawerMEnu=  wowrol.I.BUYER_MENU.concat( W.I.MENU_DIVIDER,W.I.LOGIN_MENU);
var drawer= W.T.wrap(W.T.ActivityHeader({back:'<a href="javascript:void(0);" class="block header-link-btn" data-closebtn="mainpage" data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >text_81</h2> </a>',
    RightLink:'',
    dropdown:Array()
    }), W.U.CreateList( DrawerMEnu),null,'');
//--drawer

var hederAlert= W.T.wrap(W.T.ActivityHeader({back:'<a href="javascript:void(0);" class="block header-link-btn" data-closebtn="mainpage" data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
   
    Title:'<a href="javascript:void(0);" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >Alert</h2> </a>',
    RightLink:'',
    dropdown:Array()
    }),W.U.CreateList( W.I.BUYERAlERT_MENU),null,'');
//-search
var search= W.T.C.C5_SearchDrawer();


     //--learn more
var learnMore=  W.U.LearnMorewrap;








//--search

var BlockList=[];
BlockList.push({name:"blockFront",htmlStr:blockFront});
BlockList.push({name:"drawer",htmlStr:drawer,presention:'drawerleft'});
BlockList.push({name:"hederAlert",htmlStr:hederAlert});
BlockList.push({name:"search",htmlStr:search});
BlockList.push({name:"learnMore",htmlStr:learnMore});
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


function HomePageStore(x){
       var ch ='';
   var  blockFront=W.M[W.A.page.AppId].Madian(x);
//--blockFront
     var DrawerMEnu=  W.I.LOGOUT_MENU
       if(W.A.page.AcessData.LoginStatus){
   
          DrawerMEnu=  W.I.STORE_MENU.concat(W.I.MENU_DIVIDER,W.I.LOGIN_MENU);
       }
var drawer= W.T.wrap(W.T.ActivityHeader({back:'<a href="javascript:void(0);" class="block header-link-btn" data-closebtn="mainpage" data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >text_81</h2> </a>',
    RightLink:'',
    dropdown:Array()
    }), W.U.CreateList( DrawerMEnu),null,'');
//--drawer

var hederAlert= W.T.wrap(W.T.ActivityHeader({back:'<a href="javascript:void(0);" class="block header-link-btn" data-closebtn="mainpage" data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
   
    Title:'<a href="javascript:void(0);" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >Alert</h2> </a>',
    RightLink:'',
    dropdown:Array()
    }), W.U.CreateList(W.I.STOREAlERT_MENU),null,'');
//--drawer
var search= W.T.C.C5_SearchDrawer();

     //--learn more
var learnMore=  W.U.LearnMorewrap;













//--search
var BlockList=[];
BlockList.push({name:"blockFront",htmlStr:blockFront});
BlockList.push({name:"drawer",htmlStr:drawer,presention:'drawerleft'});
BlockList.push({name:"hederAlert",htmlStr:hederAlert,presention:'drawerleft'});
BlockList.push({name:"search",htmlStr:search});
BlockList.push({name:"learnMore",htmlStr:learnMore});
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

function HomePageLocationManager(x){
           var ch ='';
   var  blockFront=W.M[W.A.page.AppId].Madian(x);
//--blockFront

var DrawerMEnu=  W.I.LM_MENU.concat( W.I.MENU_DIVIDER,W.I.LOGIN_MENU);
var drawer= W.T.wrap(W.T.ActivityHeader({back:'<a href="javascript:void(0);" class="block header-link-btn" data-closebtn="mainpage" data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >text_81</h2> </a>',
    RightLink:'',
    dropdown:Array()
    }), W.U.CreateList( DrawerMEnu),null,'');
//--drawer

var hederAlert= W.T.wrap(W.T.ActivityHeader({back:'<a href="javascript:void(0);" class="block header-link-btn" data-closebtn="mainpage" data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
   
    Title:'<a href="javascript:void(0);" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >Alert</h2> </a>',
    RightLink:'',
    dropdown:Array()
    }),W.U.CreateList( W.I.LMAlERT_MENU),null,'');
//-search
var search= W.T.C.C5_SearchDrawer();


     //--learn more
var learnMore=  W.U.LearnMorewrap;








//--search

var BlockList=[];
BlockList.push({name:"blockFront",htmlStr:blockFront});
BlockList.push({name:"drawer",htmlStr:drawer,presention:'drawerleft'});
BlockList.push({name:"hederAlert",htmlStr:hederAlert});
BlockList.push({name:"search",htmlStr:search});
BlockList.push({name:"learnMore",htmlStr:learnMore});
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

function HomePageCompany(x){
           var ch ='';
   var  blockFront=W.M[W.A.page.AppId].Madian(x);
//--blockFront

var DrawerMEnu= W.I.COMPANY_MENU.concat( W.I.MENU_DIVIDER,W.I.LOGIN_MENU);
var drawer= W.T.wrap(W.T.ActivityHeader({back:'<a href="javascript:void(0);" class="block header-link-btn" data-closebtn="mainpage" data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >text_81</h2> </a>',
    RightLink:'',
    dropdown:Array()
    }), W.U.CreateList( DrawerMEnu),null,'');
//--drawer

var hederAlert= W.T.wrap(W.T.ActivityHeader({back:'<a href="javascript:void(0);" class="block header-link-btn" data-closebtn="mainpage" data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
   
    Title:'<a href="javascript:void(0);" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >Alert</h2> </a>',
    RightLink:'',
    dropdown:Array()
    }),W.U.CreateList( W.I.LMAlERT_MENU),null,'');
//-search
var search= W.T.C.C5_SearchDrawer();


     //--learn more
var learnMore=  W.U.LearnMorewrap;








//--search

var BlockList=[];
BlockList.push({name:"blockFront",htmlStr:blockFront});
BlockList.push({name:"drawer",htmlStr:drawer,presention:'drawerleft'});
BlockList.push({name:"hederAlert",htmlStr:hederAlert});
BlockList.push({name:"search",htmlStr:search});
BlockList.push({name:"learnMore",htmlStr:learnMore});
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


function ProfilePageBuyer(x){
       var ch ='';
   var  blockFront=W.M[W.A.page.AppId].Madian(x);
//--blockFront

var DrawerMEnu=  wowrol.I.BUYER_MENU.concat(W.I.LOGIN_MENU);
var drawer= W.T.wrap(W.T.ActivityHeader({back:'<a href="javascript:void(0);" class="block header-link-btn" data-closebtn="mainpage" data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >text_81</h2> </a>',
    RightLink:'',
    dropdown:Array()
    }),  W.U.CreateMENU( DrawerMEnu),null,'');
//--drawer

var hederAlert= W.T.wrap(W.T.ActivityHeader({back:'<a href="javascript:void(0);" class="block header-link-btn" data-closebtn="mainpage" data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
   
    Title:'<a href="javascript:void(0);" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >Alert</h2> </a>',
    RightLink:'',
    dropdown:Array()
    }),W.T.C.C4_hederAlertBuyer(x),null,'');
//-search
var search= W.T.C.C5_SearchDrawer();


     //--learn more
var learnMore=  W.U.LearnMorewrap;








//--search

var BlockList=[];
BlockList.push({name:"blockFront",htmlStr:blockFront});
BlockList.push({name:"drawer",htmlStr:drawer,presention:'drawerleft'});
BlockList.push({name:"hederAlert",htmlStr:hederAlert});
BlockList.push({name:"search",htmlStr:search});
BlockList.push({name:"learnMore",htmlStr:learnMore});
BlockList.push({name:"blockingPage",htmlStr:W.T.C.BlockPage,presention:'dialog'});
BlockList.push({name:"reportingPage",htmlStr:W.T.C.ReportPage,presention:'dialog'});
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
function ProfilePageStore(x){
       var ch ='';
   var  blockFront=W.M[W.A.page.AppId].Madian(x);
//--blockFront
  




//--drawer
var search= W.T.C.C5_SearchDrawer();

     //--learn more
var learnMore=  W.U.LearnMorewrap;










//--search


//--search
var BlockList=[];
BlockList.push({name:"blockFront",htmlStr:blockFront});
BlockList.push({name:"search",htmlStr:search});
BlockList.push({name:"learnMore",htmlStr:learnMore});

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

function ProfilePageCompany(x){
       var ch ='';
   var  blockFront=W.M[W.A.page.AppId].Madian(x);
//--blockFront
  




//--drawer
var search= W.T.C.C5_SearchDrawer();

     //--learn more
var learnMore=  W.U.LearnMorewrap;










//--search


//--search
var BlockList=[];
BlockList.push({name:"blockFront",htmlStr:blockFront});
BlockList.push({name:"search",htmlStr:search});
BlockList.push({name:"learnMore",htmlStr:learnMore});

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


 //--









  var  Landing={
 
     Welcome:Welcome,
     ErrorPage:ErrorPage,
     HomePageBuyer:HomePageBuyer,
     HomePageStore:HomePageStore,
     HomePageLocationManager:HomePageLocationManager,
     HomePageCompany:HomePageCompany,
ProfilePageBuyer:ProfilePageBuyer,
ProfilePageStore:ProfilePageStore,
ProfilePageCompany:ProfilePageCompany

   };
   W.U.extend(W.U.Landing,Landing);
     
})(wowrol);