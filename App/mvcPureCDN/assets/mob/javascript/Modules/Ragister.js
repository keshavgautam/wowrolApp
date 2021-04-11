/*
* 
*/
; (function(W){
   "use strict";

      var UseAsBlock=function(x){
       var ch='';
       function EntityList(x){
          var URL=W.U.URL;
           for(var q in x){
               if(x[q].type==1){
              ch+='<div class="block m30_0"><a class="btn btn-lg btn-block ws-n" href="javascript:void(0);" role="button" data-junction="'+'ToggleEntity'+q+'" ><div class="block "> <span class="fw-b al-c">'+W.T.SVG('store',24,'#f1f5fc')+'<span class="vl-sp">'+x[q].Name+'</span></span><span class=" block fs12">'+x[q].address+'&nbsp;'+x[q].pincode+'&nbsp;'+x[q].phone+'</span></div></a> </div>';     


               }
                  if(x[q].type==0){
              ch+='<div class="block m30_0"><a class="btn btn-lg btn-block ws-n" href="javascript:void(0);" role="button" data-junction="'+'ToggleEntity'+q+'" ><div class="block "> <span class="fw-b al-c">'+W.T.SVG('user',24,'#f1f5fc')+'<span class="vl-sp">'+x[q].Name+'</span></span><span class="block fs12"></span></div></a> </div>';     
               }

 W.U.JunctionAdd(W.A.page.AppId,'ToggleEntity'+q,function(){

     var _this=this;
   this.Node.onclick=function(){
        var visit_data=W.A.page.AcessData.visit_data;
         var dataElement=_this.data;
   
       visit_data.wa=dataElement.entity_id;
      W.U.Cookie.setPagedata();

    location.assign(URL(''));
   }


        },{entity_id:x[q].entity_id}); 

           }

           

           return ch;
       }

       if(x.AccountEnetityData.length>0){
  ch+='<div class="block bs-0 bg_0 m_b10"><div class="block _bdy"> <div class="block "> <div class="text ff_0 fs12 "> <p class="fw-b al-c fs14">Use wowrol as :</p></div></div><!--^-->'+EntityList(x.AccountEnetityData)+' <!--^--></div></div>';

  }

return ch;
   }
     var RagisterBlock=function(x){
         var ch='';   var URL=W.U.URL;
         ch+='<div class="block bs-0 bg_0 m_b10"><div class="block _bdy"> <div class="block "> <div class="text ff_0 fs12 "> <span class="fw-b al-c fs14">Registeration</span><br><span >Create a Entity of your choice .</span></div></div><div class="block m30_0"><a class="btn btn-lg btn-block ws-n" href="'+URL('ragisterstore')+'"  role="button"><div class="block "> <span class="fw-b al-c">'+W.T.SVG('store',24,'#f1f5fc')+'<span class="vl-sp">Open a Store</span></span><br><span class="fs12">To sell goods online of your local store start wowrol store.</span></div></a> </div><div class="block m30_0"><a class="btn btn-lg btn-block ws-n" href="'+URL('ragisterbuyer')+'"  role="button"><div class="block "> <span class="fw-b al-c">'+W.T.SVG('user',24,'#f1f5fc')+'<span class="vl-sp ">Register as Buyer</span></span><br><span class="fs12">To start shopping register as buyer.</span></div></a> </div></div></div>';

 

         return ch;

     }
       var Madian=function(x){
        
           var ch='';
         
         
           ch+='<div  class="block bg_13"> <!--start-->'+UseAsBlock(x)+RagisterBlock(x)+'<!--end--></div>';
           return ch;

       }


      var Landing=function(x){
       var ch ='';
      var header= W.T.Header.wellcome({});;
      var footer=W.T.Footer({});;

  
        ch+= W.T.wrap(header,Madian(x),footer);
     return  ch;
   }
   
    

   


     W.M.Ragister=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };

})(wowrol);