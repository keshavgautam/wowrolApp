/*
* 
*/
; (function (W) {
    "use strict";
var tab='';
var AppId=W.A.page.AppId;
var walkwayNode=null;
//--View Profile Tab








//--View Profile Tab
function setpage(tab){
    setactiveTab(tab);  

   W.U.ProfieTabViewer.init.bind({Node:walkwayNode,tab:tab})();  
}
function setactiveTab(x) {

     $('[data-tabli]').each(function () {
         var id = $(this).attr('data-tabli');
    
         if (id === x) {
             $(this).addClass('active');
         } else {
             $(this).removeClass('active');
         }

     });
     }
//--
function init(){
   var href = W.U.ParseHref(location.href);
   walkwayNode=this.Node;
   if(typeof href.vars.tab !="undefined"){
     tab=href.vars.tab; 
      }
if(tab==''){
    switch(AppId){
      case 'ProfilePageBuyer':
      tab='spreads';
      break; 
      case 'ProfilePageStore':
        tab='Store'; 
      break; 
      case 'checkins':
        tab='Store'; 
      break;        
    }
}


    setpage(tab) ;
  setTimeout(function(){
      setactiveTab(tab);
  }, 100);
    
      
}
//--
function setNode(){
   var ch='<div class="block" data-junction="ProfilePageinit" ></div>';

  W.U.JunctionAdd(W.A.page.AppId,'ProfilePageinit',function(){
     
init.bind({ Node: this.Node })();
  },{});  
    return ch;
}

//--------------StoreFrontPage-----------------------



function StoreFrontPage(x,walkway){
       var ch='<div></div>';
    
    switch(W.I.initType){
     
        case 0:
       ch= StoreFrontPage_0(x);
        break;
        case 3:
     ch=W.T.C_web_header(x);
    // ch+= W.T.ColumnWrap540left(one,two,three);
    ch+='<div class="block ">'+W.U.ProfilePage.setNode()+'</div>';
        break;
    }

 var mainBlock=W.U.Rander(ch);
 W.U.Setview(walkway,mainBlock,'html');
}


/*
@description   profile banner +hadder used in  mobile
*/
function StoreFrontPage_0(x){
    var URL=W.U.URL;    var ch='';




 W.U.intentdata.add('storemenu.0',x.store_menu);

 W.U.Pager.addblockdata({ name:'StoreMenu', htmlStr:W.T.C.StoreMenuPage});








    //-------------------
   ch+='<div class="block _Bdy  m_b10 bg_0 bs-1"> <div class="left"> '+W.T.StoreCheckInList.button(x.SBData,"profilepageStore")+'</div><div class="right"> <button type="button" class="btn btn-primary btn-xs"  data-pagerbtn="mainpage:StoreMenu:storemenu:0"  ><span>Explore</span><span></span></button></div></div>';
         //slider
    ch+='<div class="block m_b10" >'+W.T.C.StoreSlider(x.slider)+'</div>';
       //--EntityStrip datab

        ch+='<div class="block _bdy bg_0 bs-1  m_b10">';
  ch+='<div class="block m_b10">';  
    ch+=W.T.C.C2_EntityStrip(x.EntityStripdata,{}); 
    ch+='</div>';
  ch+='<div class="block ">'+W.U.relation({twr:x.twr,owr:x.owr,mes:x.mes,shg:x.shg},'truncate ','')+'</div>';
ch+= W.T.C.ProfileBannerStrip(x); 




      ch+='</div>';
 
//-->>  
 ch+='<div class="block ">'+W.U.ProfilePage.setNode()+'</div>';

 return ch;





}
//---------
 W.U.ProfilePage = {
                       setNode:setNode,
                       setpage:setpage,
                       setactiveTab:setactiveTab,
                       StoreFrontPage:StoreFrontPage
                       
                       
                       
                       };

})(wowrol);