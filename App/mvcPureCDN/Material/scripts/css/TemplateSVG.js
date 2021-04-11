

   /*
* page set up 2
*/
; (function(W){
   "use strict";
   var ch='';
 var svg=['left','search','menu','edit','cross','box','info','home','cancel','setting','checkmark','ok','buy','category','storemenu','orders','Shippping','frontpage','changeEntity','store','logout','alert','sent','user','storestaff','error','sent','nextarrow','backarrow','menuHori','cart','staff','uparrow','downarrow','wowOn','wowOff','likeOn','likeOff','agreeOn','agreeOff','feelsadOn','feelsadOff','comment','checkIn','shortlist','suggestion','chats','money'];
for(var i=0;i<svg.length;i++){
   
   ch+='<div class="w2"><a href="javascript:void(0);" data-closebtn="mainpage" >'+W.T.SVG(svg[i],24,'#00b1fc')+'</a><br><span>'+svg[i]+'</span></div>';
    
}

 var newView=W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>');   
   
 console.log(ch);


           W.U('#page').html(newView);
})(wowrol);