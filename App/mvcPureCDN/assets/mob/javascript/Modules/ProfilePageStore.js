/*
* 
*/
; (function(W){
   "use strict";

var page=function(x){
    var URL=W.U.URL;    var ch='';
   ch+='<div class="block _bdy  m_b10 bg_0 _B-gray"> <div class="left"> '+W.T.StoreCheckInList.btn(x.SBData,"profilepageStore")+'</div><div class="right"> <button type="button" class="btn btn-primary btn-xs"  data-openbtn="profilepageStore" data-btnid="StoreMenu"  ><span>Explore</span><span></span></button></div></div>';

       //--EntityStrip datab

        ch+='<div class="block _bdy bg_0 _B-gray  m_b10">';
  ch+='<div class="block m_b10">';  
    ch+=W.T.C.C2_EntityStrip(x.EntityStripdata,{}); 
    ch+='</div>';
  ch+='<div class="block ">'+W.U.relation({twr:x.twr,owr:x.owr,mes:{}},'truncate ','')+'</div>';
ch+= W.T.C.ProfileBannerStrip(x.pbd); 




      ch+='</div>';
 
//-->>  
 ch+='<div class="block ">'+W.U.ProfilePage.setNode()+'</div>';
 //-->>  
var StoreMenu= W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="profilepageStore" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Store Menu</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }),W.T.C.StoreMenu(x.store_menu));


var CheckInList= W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="profilepageStore" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Checkins</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }),W.T.StoreCheckInList.t0());

    //--search
var blockList=[ch,StoreMenu,CheckInList];
var blockName=["blockFront","StoreMenu","CheckInList"];

var setting ={
    name:'profilepageStore',
    target:"blockFront",
    page:true,
    minheight:'auto'
};


    return  W.T.ToggleBlock(blockList, blockName,setting);;
}


 var Madian=function(x){
       var ch='';
     console.log(x);
   var header=W.T.C.C3_storeprofileheader(x.EntityStripdata);
   var footer=W.T.Footer({});;


   ch+=page(x);

        ch+= 'asdas asd asdas as';

  ch+='<div class="block _bdy"><a href="javascript:void(0);" data-learnmore="understandcheckin" >Learn More checkIn</a></div>';
        return W.T.wrap(header,ch,footer);
   }

  var Landing=function(x){
       var ch ='';
   var  blockFront=Madian(x);





//-search
var search= W.T.C.C5_SearchDrawer();


     //--learn more
var learnMore=  W.U.LearnMorewrap;










//--search
var blockList=[blockFront,search,learnMore];
var blockName=["blockFront","search","learnMore"];
var setting ={
    name:'mainpage',
    target:0,
    page:true,
    minheight:'auto'
};
    ch+=   W.T.ToggleBlock(blockList, blockName,setting);
       return ch;
  
   }
   
    

   


 W.M.ProfilePageStore=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };


})(wowrol);