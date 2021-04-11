/**
 * mycheckins.js
 */
 ;(function (W) {
     "use strict";

    
   var Madian=function(x){
       var ch='';
     var header= W.T.C.C3_subPageheader({Title:'<a href="" class="left"><h2 class="truncate title" >My Checkins</h2><i class="badge _gbtn"></i> </a>'});
      var footer=W.T.Footer({});;
       //--EntityStrip datab

ch+='<div  data-nodeid="mycheckinwalkway" class="block " style="margin-bottom: 100px;"> </div>';
   $('[data-appview="' + W.A.page.AppId + '"]').on('pageloaded',function(){
        // Always call inside from function 
     W.U.mycheckins.init();
    });
 //-->>   
  


        return W.T.wrap(header,ch,footer);
   }
   
    
     
   
    

   
 var Landing=function(x){
       var ch ='';
   var  blockFront=Madian(x);
//--blockFront

var drawer= W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Drawer</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }), W.T.C.drawer_HomePageBuyer(x));
//--drawer

var hederAlert= W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Alert</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }),W.T.C.C4_hederAlertBuyer(x));
//-search
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
    ch+=   W.T.ToggleBlock(blockList, blockName,setting);
       return ch;
  
   }

   

    W.M.mycheckins={
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };


 } (wowrol));