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
    switch(tab){
        case'spreads':
    
  W.U.Spread.init(walkwayNode);  
        break;
       default:
    
 W.U.ProfieTabViewer.init.bind({Node:walkwayNode,tab:tab})();  
        break;    
      } 
  
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



    W.U.ProfilePage = {setNode:setNode,
                       setpage:setpage,
                       setactiveTab:setactiveTab};

})(wowrol);