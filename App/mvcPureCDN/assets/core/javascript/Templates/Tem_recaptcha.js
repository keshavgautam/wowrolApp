/*
* 
*/
; (function(W){
   "use strict";



var S={
Layout:function(){
    var ch='<div class="block ul _B-gray"><div class="block li bg_7 _bdy fw-b fs14 b_gbl">SecurityCheck</div>';

ch+='<div class="block li bg_0 _bdy fs14 b_gbl"><div class="block" data-nodeid="recaptchaelement"><div class="block" >'+W.T.blockLoading()+'</div><div class="block" ></div></div></div>';
ch+='</div>';

    return ch;
}

};


W.T.recaptcha=S;

})(wowrol);