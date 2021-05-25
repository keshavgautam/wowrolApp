/*
* 
*/
; (function(W){
   "use strict";





var Madian=function(x){
var  one='<form name="ragisterbuyer"  data-junction="ragisterbuyer" onsubmit="return false"> </form>';
var two='';
        W.U.JunctionAdd(W.A.page.AppId,'ragisterbuyer',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },W.U.ragisterBuyer.Ragisterdata);   

 return W.T.ColumnWrapXXX([one,two],['w-x-10','w-x-14 ma-l-5']); 
   }


 var Landing=function(x){
        var ch ='';
  var DrawerMEnu=  W.I.LOGOUT_MENU
       if(W.A.page.AcessData.LoginStatus){
          DrawerMEnu=  W.I.LOGIN_MENU.concat(W.I.LOGOUT_MENU);

       }
   /*    var headerRow1=W.T.WebHeader({  actiondropdown:DrawerMEnu  });
      var header= [];
      header.push({Isfixed:true,html:headerRow1});
   */
     var header=W.T.WebHeader({  actiondropdown:DrawerMEnu  });
      var footer=W.T.Footer({});;

  
 var   blockFront= W.T.wrap(header,Madian(x),footer);
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
   
    

   


      W.M[W.A.page.AppId]=  {
       Madian:Madian,
       Landing:Landing
     };


})(wowrol);