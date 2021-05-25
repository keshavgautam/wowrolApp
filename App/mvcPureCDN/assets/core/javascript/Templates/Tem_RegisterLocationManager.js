 ; (function(W){
   "use strict";
   
   
   
   
   
function formbody(x){
    var URL =W.U.URL;
    var ch='<div class="block bs-0 bg_0 _bdy m_b10 ">';
     if(W.I.wf=="web"){
       ch+='<div class="block fw-b"> <div class="block _bdy"><h2>text_320</h2></div></div>';

       }else{
      ch+='<div class="block al-c "> <span class="fs12">text_320</span></div>';
      ch+='<div class="block m30_0"><div data-help="registerlocationmanager"></div>';  
       }



   var dataselectbox={
                                                 name:'UserName',
                                                           fireAfter:2,
                                                          TranseData:{ifo:{type:0}},
                                                          initSearchText:'',
                                                            type:2,
                                                            token:'chips',
                                                            placeholder:'search...',
                                                             onselectCallback:function(){},
                                                      onselectRemoveCallback:function(){  }
                                                                   };

      

 ch+='<div class="form-piece"> <label class="control-label">Buyer UserName  <i >*</i></label> '+W.U.selectbox.set(dataselectbox)+'</div>';


  var datalocation={Task:8,
    Data:{
postalCodebycountry:{id:0,name:''},
   country:{id:105,name:'india'}
    }
    };

ch+=W.U.location.set(datalocation);

    


        ch+='<div class="form-piece"> <div data-help="terms"> <div class="fs11">text_172 <a href="'+URL('')+'terms" class="fs11" target="_blank" tabindex="">text_117 </a> . </div></div></div>';
      if(W.I.wf=="web"){
   ch+='<div class="block m30_0"><div data-help="ragisterbuyer"></div>';
ch+='<div class="form-piece clearfix"> <button type="submit" class="block btn _dbtn right">text_181</button> </div>';
}




ch+='</div>';
       return ch;


}
   
   
   
   W.T.RegisterLM ={
    formbody:formbody

   };
   
   })(wowrol);