/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

   
   var Madian=function(x){
       var ch='';  
   var header= W.T.C.C3_storehomeheader(x);
   var footer=W.T.Footer({});;
   //--EntityStrip datab

        ch+='<div class="block _bdy bg_0 _B-gray  m_b10">'+W.T.C.C2_EntityStrip(x.EntityStripdata,{})+'</div>';
 //-->>   
ch+='<div data-dynamicspotmanager="profilecomplete:profilecomplete" ></div>';  
ch+='<div  data-nodeid="spreadwalkway" class="block " style="margin-bottom: 100px;"> </div>';
 W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
     W.U.Spread.init(W.U.id('spreadwalkway'));
    });



        return W.T.wrap(header,ch,footer);
   }
   
    
     
   
    

   
 var Landing=function(x){
       var ch ='';
   var  blockFront=Madian(x);
//--blockFront

var drawer= W.T.wrap(W.T.ActivityHeader({back:'<a href="javascript:void(0);" class="block header-link-btn" data-closebtn="mainpage" data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >text_81</h2> </a>',
    RightLink:'',
    dropdown:Array()
    }), W.T.C.C1_drawer_HomePageStore(x));
//--drawer

var hederAlert= W.T.wrap(W.T.ActivityHeader({back:'<a href="javascript:void(0);" class="block header-link-btn" data-closebtn="mainpage" data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
   
    Title:'<a href="javascript:void(0);" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >Alert</h2> </a>',
    RightLink:'',
    dropdown:Array()
    }),W.T.C.C4_hederAlertStore(x));
//--drawer
var search= W.T.C.C5_SearchDrawer();

     //--learn more
var learnMore=  W.U.LearnMorewrap;










//--search
var blockList=[blockFront,drawer,hederAlert,search,learnMore];
var blockName=["blockFront","drawer","hederAlert","search","learnMore"];
var setting ={
    name:'mainpage',
    target:0,
    page:true,
    minheight:'auto'
};
  //  ch+=   W.T.ToggleBlock(blockList, blockName,setting);

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

      W.M[W.A.page.AppId]=  {
       Madian:Madian
     };
   


  

 } )(wowrol);