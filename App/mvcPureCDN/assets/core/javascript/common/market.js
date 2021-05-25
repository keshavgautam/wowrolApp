/*
* 
*/
; (function(W){
   "use strict";


//---------------------
   var Madian=function(x){
   var ch='',page='';

 


//-----------------------
    


     ch+='<div class="block bs-1">';
    
    ch+='<div  data-nodeid="walkway" class="block " style="margin-bottom: 100px;"> </div>'; 
       ch+='</div >';

 if(W.I.wf=="mob"){
       if(W.A.page.AcessData.LoginStatus){
 var header= W.T.C.C3_subPageheader({Title: '<a href="'+W.U.URL('market')+'"  class="block header-cell fg_6 al-l"><h2 class=" title" >market</h2><i class="badge _gbtn"></i> </a>'});
 }else{
        var header= W.T.Header.wellcome({});;
 }
    
      var footer=W.T.Footer({});; 
     page+=W.T.wrap(header,ch,footer);  
 }

 if(W.I.wf=="web"){
var setting ={
    name:'dashboardpage',
    BlockList:[{name:"DashboardTable",htmlStr:'<div class="block _bdy">'+ch+'</div>'}],
    target:0,
    page:true,
    minheight:'auto'
};
 page+=  W.T.Pager(setting);
   
 }


 W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
        W.U.market.init(W.U.id('walkway'));
    });

    return page;
   }

    function Welcome(x){
        

      var footer=W.T.Footer({});;
   
   if(W.I.wf=='mob'){
          
       
     var   blockFront= Madian(x);             
   }else{

     var header=W.T.WebHeader();
         var mid= W.T.ColumnWrapXXX(['',Madian(x), ''],['w-x-6','w-x-12','w-x-6']);  
 var   blockFront= W.T.wrap(header,mid,footer);
   }





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


var Landing=function(x){
        var ch ='';
   var initType=0;
   if(W.I.wf=='mob'){
     initType=(W.A.page.AcessData.LoginStatus)?1:0;  
   }
    if(W.I.wf=='web'){
       initType=(W.A.page.AcessData.LoginStatus)?2:3;    
   }
    W.I.Market_initType=initType;

switch( W.I.Market_initType){
case 0:
ch+=Welcome(x);
break;    
case 1:
ch+=W.U.Landing.HomePageBuyer(x);
break; 
case 2:
ch+=W.U.Landing.HomePageBuyer(x);
break; 
case 3:
ch+=Welcome(x);

break; 
}



       return ch;
   }

  W.M[W.A.page.AppId]=  {
       Madian:Madian,
       Landing:Landing

     };

 })(wowrol);