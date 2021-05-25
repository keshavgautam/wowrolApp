/*
* 
*/
; (function(W){
   "use strict";


//---------------------
   var Madian=function(x){
   var ch='',page='';

 


//-----------------------
    


     ch+='<div class="block ">';
    
    ch+='<div  data-nodeid="walkway" class="block " style="margin-bottom: 100px;"> </div>'; 
       ch+='</div >';

 if(W.I.wf=="mob"){
 var header=  '';

    
      var footer=W.T.Footer({});; 
     page+=ch;  
 }

 if(W.I.wf=="web"){
var blockFront=  W.T.ColumnWrapXXX(['', ch, ''],['w-x-6','w-x-12','w-x-6']);;

var setting ={
    name:'dashboardpage',
    BlockList:[{name:"DashboardTable",htmlStr:blockFront}],
    target:0,
    page:true,
    minheight:'auto'
};
 page+=  W.T.Pager(setting);
   
 }


 W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
            W.U.forget_password.init(W.U.id('walkway'));
    });

    return page;
   }

  W.M[W.A.page.AppId]=  {
       Madian:Madian
     };

 })(wowrol);