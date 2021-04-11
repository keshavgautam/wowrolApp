/**
 * requests.js
 */
 ;(function () {
     "use strict";

     wowrol.Modules.requests = (function () {
     var URL= wowrol.Controllers.Utility.GetPageURL;
     var Modules= wowrol.Modules;
     var medianContent=function(x){
      var ch='';
         ch+='<main class="block">';
      
//--EntityStrip datab

        ch+='<div class="block _bdy bg_0 bs-2dp m_b10">'+wowrol.Modules.C.C2_EntityStrip(x.EntityStripdata,{})+'</div>';
 //-->>   


             
  

         ch+='</main>';
          return ch;
 }
var  mainContent=function(x){
        var ch='';
   
 
      
      
           ch+='<div class="content"><!--start-->'+medianContent(x)+'<!--end--></div>'+Modules.Main.Footer();

 return Modules.Main.wrap(Modules.C.C7_subPageheader(x),ch);

    }
 var landing=function(x){
           var ch='';

var  blockFront=mainContent(x);
//--blockFront

var drawer= Modules.Main.wrap(Modules.Main.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" >'+C.fn.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Drawer</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }),Modules.C.C1_drawer_HomePageBuyer(x));
//--drawer

var hederAlert= Modules.Main.wrap(Modules.Main.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" >'+C.fn.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Alert</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }),Modules.C.C4_hederAlertBuyer(x));
//--drawer
var search= Modules.Main.wrap(Modules.Main.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" >'+C.fn.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Search </h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }),Modules.C.C5_SearchDrawer(x));

//--search
var blockList=[blockFront,drawer,hederAlert,search];
var blockName=["blockFront","drawer","hederAlert","search"];
var setting ={
    name:'mainpage',
    target:0,
    page:true,
    minheight:'auto'
};
ch+=  wowrol.Modules.Main.ToggleBlock(blockList, blockName,setting);
          return ch;

       }
         return {
             t0:function(x){
                

                return wowrol.Modules.Main.Page(landing(x));
             }
         };

     })();

   




 } ());