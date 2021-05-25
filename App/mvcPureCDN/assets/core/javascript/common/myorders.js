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
 var header= W.T.C.C3_subPageheader({Title: '<a href="'+W.U.URL('myorders')+'"  class="block header-cell fg_6 al-l"><h2 class=" title" >text_264</h2><i class="badge _gbtn"></i> </a>'});

    
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
 W.U.myorders.init(W.U.id('walkway'));
    });

    return page;
   }

  W.M[W.A.page.AppId]=  {
       Madian:Madian
     };

 })(wowrol);