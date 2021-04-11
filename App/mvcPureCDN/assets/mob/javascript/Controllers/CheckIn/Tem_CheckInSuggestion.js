/*
* 
*/
; (function(W){
   "use strict";
     

W.T.CheckinSuggestion=(function(){

var t={
     t0:function(){
         var ch='';
console.log('asdasasd asdasdasda asd asdasd asdasd');

  var SBData= W.U.StoreCheckIn.SBData; 
 var suPD=SBData.suPD;
 ch+='<div class=" block _bdy h50  al-c tt-u ff-2 "><h3>Suggestion</h3></div>';
   if(suPD.length>0){

 for(var q in suPD){
     var info=W.U.StoreBrowsing.GetPbankData(suPD[q],'');
    var CartCardsetting={quentity:0,closebtn:true,varientid:'',type:'suggestion'};
   ch+='<div class="block m_b10" ><div class="block  bg_0 " >'+W.T.C.C2_CartCard(info,CartCardsetting)+'</div></div>'; 

 }  

  }else{
     ch+='<div class="block _bdy bg_0 m_b10"> <p class="al-c">Nothing shorrtlisted yet.</p> </div>'; 
    }
        return ch;
     }

 };  
 
 function ContentSuggestion(SBData){

 var URL=W.U.URL;
  var mid =  '<div class="block   ov-hi ">';
   mid +='<div class="block " data-nodeid="checkinsuggestioncon" ></div>';
   mid +='<div class="block _bdy" ></div>';
   mid +='</div>';

     var foot = '';
    var header= W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="checkin" >'+W.T.SVG('checkIn',24,'#f1f5fc')+'</a>',
    Title:'<a href="/" class="left"><span class="title" >Checkin Suggestion</span><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    });
 

  return  W.T.wrap(header,mid,foot);
 }  
  
    
return {
ContentSuggestion:ContentSuggestion,
t:t
};
})();

 


})(wowrol);