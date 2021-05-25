; (function(W){
   "use strict";


//---------------------
  var Madian=function(x){
        var ch ='<form name="registercompany"  data-junction="registercompany" onsubmit="return false"> </form>';
   
          W.U.JunctionAdd(W.A.page.AppId,'registercompany',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },W.U.RegisterCompany.Ragisterdata);   
  

     return  ch;
   }


   var Landing=function(x){
        var ch ='';
   var  blockFront=Madian(x);

   if(W.I.wf=='web'){
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
   }

   var BlockList=[];
BlockList.push({name:"blockFront",htmlStr:blockFront});
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
       Madian:Madian,
       Landing:Landing

     };

 })(wowrol);