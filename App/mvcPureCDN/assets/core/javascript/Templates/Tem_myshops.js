/*
* 
*/
; (function(W){
   "use strict";


   var t={
   t0:function(x){
         var ch = ''; 
 if(x.length==0){
     
      ch+='<div class="block _bdy al-c fw-b bg_0 _B-gray">help_49</div>';  

 }else{
            for(var q in x){
               ch += t.t1(x[q]);   
            }
         }
    
            return ch;
    },
   t1: function (x) {
        
       return W.T.C.C2_EntityCard(x)

        }
   };

   function Layout(){


    var JId=W.U.J(function(){
           var PagingData=   W.U.myshops.PagingData;

   PagingData.Node=  this.Node;     
   W.U.paging.init(PagingData);
    },{});


    var ch='<div class="block">';
  ch+='<div class="block _Bdy bg_6 bs-1-bottom "><h3>myshops</h3></div>';
    ch+='<div class="block" data-junction="'+JId+'"></div>';

    ch+='</div>';
    return ch;
}



     W.T.myshops={
  Layout:Layout,         
  t:t

     };

 })(wowrol);