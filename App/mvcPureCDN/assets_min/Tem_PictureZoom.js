
/*
* page set up 2
*/
; (function(W){
   "use strict";
var t={
 t0:function(){ 

    var Header  =W.T.DashbordFormHeader({titleText:'view',submitbutton:false,backblock:  W.I.activeBlock ,pager:W.I.activePage});
    var ch='<div class="block bg_0" >'
   +' <div class="block ul _bdy_5-0 ov-hi" >'
   +'<div class="li m_b5"><div class="img-media "><a  href="{{this.href}}" role="" ><img class="img-responsive m0_auto" style="background:#59afe1;" src="{{this.placeholder}}" data-src="{{this.avatar}}"  alt="{{this.alt}}"  ></a></div>'
   +'</div>'
    
        +'</div>'; 
 
 
 var page=W.T.DashbordFormWrap(Header, ch);;
  var ret= page;
  if(W.I.wf=='web'){
  ret=W.T.ColumnWrapXXX(['',page,''],['w-x-6','w-x-12 ','w-x-6']); 
 }
   return   ret }

 };   




 W.T.PictureZoom=t;

})(wowrol);
