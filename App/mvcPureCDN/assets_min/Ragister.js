/*
* 
*/
; (function(W){
   "use strict";


       var UseAsBlock=function(x){
       var ch='';    
       function EntityList(x){
          var URL=W.U.URL;    var ch='';
          var svg='',name='';
      
                for(var q in x){
               name=x[q].Name;
               if(x[q].type==0){
      svg='user';


               }
                  if(x[q].type==1){
     svg='store';
               }
       if(x[q].type==3){
    svg='place';
               }

   if(x[q].type==4){
         svg='';name+=' Company';
               }
        ch+='<div class="block m30_0"><a class="btn btn-lg btn-block ws-n" href="javascript:void(0);" role="button" data-junction="'+'ToggleEntity'+q+'" ><div class="block t"> <span class="fw-b al-c">'+W.T.SVG(svg,24,'#f1f5fc')+'<span class="vl-sp">'+name+'</span></span><span class="block fs12"></span></div></a> </div>';  

 W.U.JunctionAdd(W.A.page.AppId,'ToggleEntity'+q,function(){

     var _this=this;
   this.Node.onclick=function(){
     

      W.U.SwitchUser({entity_id:_this.data.entity_id});
   }


        },{entity_id:x[q].entity_id}); 

           }  


        

          

           

           return ch;
       }
 
       if(x.AccountEnetityData.length>0){
  ch+='<div class="block bs-1 bg_0 "><div class="block _bdy"> <div class="block al-c"> <h2>text_137</h2></div><!--^-->'+EntityList(x.AccountEnetityData)+' <!--^--></div></div>';

  }else{
       //  ch='<div data-dynamicspotmanager="help:spot_id:how_to_register"></div>';

          }

return ch;
   }
     var RagisterBlock=function(x){
         var ch='';   var URL=W.U.URL;
         ch+='<div class="block bs-1 bg_0 "><div class="block _bdy"> <div class="block "> <div class="text ff_0 fs12 "> <h2>text_278</h2><br><span >text_138</span></div></div><div class="block m30_0"><a class="btn btn-lg btn-block ws-n" href="'+URL('ragisterstore')+'"  role="button"><div class="block "> <span class="fw-b al-c">'+W.T.SVG('store',24,'#f1f5fc')+'<span class="vl-sp">text_139</span></span><br><span class="fs12">text_140</span></div></a> </div><div class="block m30_0"><a class="btn btn-lg btn-block ws-n" href="'+URL('ragisterbuyer')+'"  role="button"><div class="block "> <span class="fw-b al-c">'+W.T.SVG('user',24,'#f1f5fc')+'<span class="vl-sp ">text_141</span></span><br><span class="fs12">text_277</span></div></a> </div></div></div>';

 

         return ch;

     }



//---------------------
   var Madian=function(x){
   var ch='',page='';

 


//-----------------------
    


   

 if(W.I.wf=="mob"){
    
 ch+='<div class="block  m_b10 _bdy"> <div class="block  " >'+UseAsBlock(x)+'</div><div class="block  m_b10"  >'+RagisterBlock(x)+'</div></div>';
     page+=ch;  
 }

 if(W.I.wf=="web"){

    ch+='<div class="block  m_b10 _bdy"> <div class=" w8 bs-1 bg_0 " >'+UseAsBlock(x)+'</div><div class="bs-1 w4 bg_0 "  >'+RagisterBlock(x)+'</div></div>';


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