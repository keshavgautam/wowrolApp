/*
* 
*/
; (function(W){
   "use strict";


//---------------------
  var Madian=function(x){
       var ch='';
  
       //--EntityStrip datab

 var page='';

  if(W.I.wf=="mob"){
      
        ch+='<div class="block _bdy bg_0 _B-gray  m_b10">'+W.T.C.C2_EntityStrip(x.EntityStripdata,{})+'</div>';
 //-->>   

ch+='<div data-dynamicspotmanager="profilecomplete:profilecomplete" ></div>';  

    

 ch+= '<a href="javascript:void(0);" data-learnmore="'+ W.A.page.AppId +'" >Learn More</a>';

 var header=W.T.C.C3_buyerhomeheader(x);

    
      var footer=W.T.Footer({});; 
     page+=W.T.wrap(header,ch,footer);  
 }

  if(W.I.wf=="web"){
 //-->>   

ch+='<div data-dynamicspotmanager="profilecomplete:profilecomplete" ></div>';  

    

 ch+= '<a href="javascript:void(0);" data-learnmore="'+ W.A.page.AppId +'" >Learn More</a>';

    var setting ={
    name:'dashboardpage',
    BlockList:[{name:"DashboardTable",htmlStr:'<div class="block _bdy">'+ch+'</div>'}],
    target:0,
    page:true,
    minheight:'auto'
};
 page+=  W.T.Pager(setting);  
  }
   


    return page;
   }




  W.M[W.A.page.AppId]=  {
       Madian:Madian

     };

 })(wowrol);