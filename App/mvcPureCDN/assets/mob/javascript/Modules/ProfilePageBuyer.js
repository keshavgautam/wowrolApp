/*
* 
*/
; (function(W){
   "use strict";

 var Madian=function(x){
       var ch='';
     
   var header=W.T.C.C3_buyerprofileheader(x.EntityStripdata);
   var footer=W.T.Footer({});;
   //--EntityStrip datab

        ch+='<div class="block _bdy bg_0 _B-gray  m_b10">';
  ch+='<div class="block m_b10">';  
    ch+=W.T.C.C2_EntityStrip(x.EntityStripdata,{}); 
    ch+='</div>';
  ch+='<div class="block ">';  
 ch+= W.U.relation({twr:x.twr,owr:x.owr,mes:{}},'truncate ',''); 
ch+= W.T.C.ProfileBannerStrip(x.pbd); 
 
    ch+='</div>';
      ch+='</div>';
 //-->>   
 //-->>  
ch+='<div class="block ">'+W.U.ProfilePage.setNode()+'</div>';
 //-->>  
      


        return W.T.wrap(header,ch,footer);
   }

  var Landing=function(x){
       var ch ='';
   var  blockFront=Madian(x);



//--drawer
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
   
    

   


   W.M[W.A.page.AppId]=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };


})(wowrol);