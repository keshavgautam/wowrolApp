/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

   
   var Madian=function(x){
       var ch='';
  var header= W.T.C.C3_subPageheader({Title:'<a href="" class="left"><h2 class="truncate title" >My Orders</h2><i class="badge _gbtn"></i> </a>'});
      var footer=W.T.Footer({});;
       //--EntityStrip datab
ch+='<div  data-nodeid="walkway" class="block " style="margin-bottom: 100px;"> </div>';
   $('[data-appview="' + W.A.page.AppId + '"]').on('pageloaded',function(){
        // Always call inside from function 
  W.U.myorders.init(W.U.id('walkway'));
    });
   
 //-->>   
  



 ch+= '<a href="javascript:void(0);" data-learnmore="'+ W.A.page.AppId +'" >Learn More</a>';

        return W.T.wrap(header,ch,footer);
   }
   
    
     
   
    

   
 var Landing=function(x){
       var ch ='';
   var  blockFront=Madian(x);
//--blockFront

var drawer= W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >text_81</h2><i class="badge _gbtn"></i> </a>',
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

   W.M[W.A.page.AppId]=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };
   


  

 } )(wowrol);