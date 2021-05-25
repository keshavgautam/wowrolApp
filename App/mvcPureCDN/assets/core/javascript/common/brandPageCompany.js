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
 var header=W.T.C.C3_companyprofileheader(x.EntityStripdata);

    
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
        W.U.BrandListing.init(x.BrandInfo,W.U.id('walkway'));
    });

    return page;
   }




  W.M[W.A.page.AppId]=  {
       Madian:Madian

     };

 })(wowrol);