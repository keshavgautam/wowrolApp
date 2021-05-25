; (function(W){
   "use strict";


//---------------------
  var Madian=function(x){
        var ch ='<form name="registerlocationmanager"  data-junction="registerlocationmanager" onsubmit="return false"> </form>';
   
          W.U.JunctionAdd(W.A.page.AppId,'registerlocationmanager',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },W.U.RegisterLM.Ragisterdata);   
       

     return  ch;
   }


   var Landing=function(x){
        var ch ='';
   var  blockFront=Madian(x);

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