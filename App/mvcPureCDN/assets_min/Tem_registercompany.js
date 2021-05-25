 ; (function(W){
   "use strict";
   
   
   
   
   
function formbody(x){
    var URL =W.U.URL;
    var ch='<div class="block bs-0 bg_0 _bdy m_b10 ">';
     if(W.I.wf=="web"){
       ch+='<div class="block fw-b"> <div class="block _bdy"><h2>text_364</h2></div></div>';

       }else{
      ch+='<div class="block al-c fw-b"> <span class="fs12">text_364</span></div>';
      ch+='<div class="block m30_0"><div data-help="registercompany"></div>';  
       }



ch+='<div class="form-piece"> <label class="control-label">text_365</label> <input type="text" name="company_name" class="form-mold" autocomplete="off" placeholder="Company Name" value=""> <div data-help="company_name"></div></div>';

ch+='<div class="form-piece"> <label class="control-label">text_366</label> <input type="text" name="company_industry_category" class="form-mold" autocomplete="off" placeholder="Company Industry Category" value=""> <div data-help="company_industry_category"></div></div>';
    


        ch+='<div class="form-piece"> <div data-help="terms"> <div class="fs11">text_172 <a href="'+URL('')+'terms" class="fs11" target="_blank" tabindex="">text_117 </a> . </div></div></div>';
      if(W.I.wf=="web"){
   ch+='<div class="block m30_0"><div data-help="registercompany"></div>';
ch+='<div class="form-piece clearfix"> <button type="submit" class="block btn _dbtn right">text_181</button> </div>';
}




ch+='</div>';
       return ch;


}
   
   
   
    W.T.RegisterCompany ={
    formbody:formbody

   };
   
   })(wowrol);