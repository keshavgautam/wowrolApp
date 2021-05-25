/*
* 
*/
; (function(W){
   "use strict";
 
   var t={
       t0:function( x,bypass){
 var ch='';
 
  if(x.length>0){
    ch+=t.t00(x);    
  }else{
   ch+='<div class="block _bdy "><div class="block _bdy al-c fw-b bg_0 _B-gray">help_19</div></div>';  
  }
        
    return ch;


       },
       t00: function (x) {
     var ch = ''; 
            for(var q in x){
               ch += W.T.C.C2_EntityCard(x[q]);   
            }
         
    
            return ch;

        },
      s0:function( x,bypass){
 var ch='';
 
  if(x.length>0){
    ch+=t.t00(x);    
  }else{
   ch+='<div class="block _bdy "><div class="block _bdy al-c fw-b bg_0 _B-gray">help_81</div></div>';  
  }
        
    return ch;


       },
      d0:function( x,bypass){
 var ch='';
 
  if(x.length>0){
    ch+=t.t00(x);    
  }else{
  ch+='<div class="block _bdy "><div class="block _bdy al-c fw-b bg_0 _B-gray">help_80</div></div>';  
  }
        
    return ch;


       }
   };

function Layout(){

    var Jid0=W.U.J(function(){
         var PagingData=   W.U.FreindRequest.donefriendPagingData;

   PagingData.Node=  this.Node;     
   W.U.paging.init(PagingData);  

    },{});
    var JId=W.U.J(function(){
           var PagingData=   W.U.FreindRequest.PagingData;

   PagingData.Node=  this.Node;     
   W.U.paging.init(PagingData);
    },{});

    var Jid2=W.U.J(function(){
    var PagingData=   W.U.FreindRequest.suggestfriendPagingData;

   PagingData.Node=  this.Node;     
   W.U.paging.init(PagingData); 

    },{});

    var ch='<div class="block _Bdy">'
    +'<div class="block bs-1 m_b10 bg_0"><div class="block _Bdy bg_6 bs-1-bottom "><h3>text_113</h3></div><div class="block" data-junction="'+Jid0+'"></div></div>'
   +'<div class="block bs-1 bg_0 m_b10"><div class="block _Bdy bg_6 bs-1-bottom "><h3>text_198</h3></div><div class="block" data-junction="'+JId+'"></div></div>'
    +'<div class="block bs-1 bg_0 m_b10"><div class="block _Bdy bg_6 bs-1-bottom "><h3>text_112</h3></div><div class="block" data-junction="'+Jid2+'"></div></div>'
 
    +'</div>';
    return ch;
}

   W.T.FreindRequest={
   Layout:Layout,
   t:t
   };

})(wowrol);