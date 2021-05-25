

   /*
* page set up 2
*/
; (function(W){
   "use strict";
   var ch='';
 var svg=['left','search','menu','edit','add','cross','box','info','home','cancel','setting','checkmark','ok','buy','category','storemenu','orders','Shippping','frontpage','changeEntity','store','logout','alert','sent','user','error','sent','nextarrow','backarrow','menuHori','cart','staff','uparrow','downarrow','wowOn','wowOff','likeOn','likeOff','agreeOn','agreeOff','feelsadOn','feelsadOff','comment','checkIn','shortlist','suggestion','chats','money','dbltick','tick','watch','emoji','attach','image','place','refresh','star','help','launch','history'];
    ch+='<div class="block">';
for(var i=0;i<svg.length;i++){

   ch+='<div class="w2"><a href="javascript:void(0);" data-closebtn="mainpage" >'+W.T.SVG(svg[i],24,'#00b1fc')+'</a><br><span>'+svg[i]+'</span></div>';
   

}
ch+='</div>'; 

// logo
ch+='<div class="block bg_1">';
ch+='<div class="block _bdy " >'+ W.T.Logo(220,40)+'</div>';
ch+='<div class="block _bdy " >'+ W.T.Logo(150,25)+'</div>';
 ch+='</div>'; 

   var newView='<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>';   
   

     W.U.ccbk.Run(W.U.Page,'materialpleaseinsert',newView); 

 W.U.resize();
})(wowrol);