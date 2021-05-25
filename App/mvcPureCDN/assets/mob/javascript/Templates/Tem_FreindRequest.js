/*
* 
*/
; (function(W){
   "use strict";
   var t={
       t0:function( x,bypass){
          var ch='';
        
       if(bypass==1){
 if(x.length==0){
     ch+='<div class="block _bdy al-c fw-b bg_0 _B-gray">You have not any FriendRequest. </div>';  
  }  
          }
  if(x.length>0){
         ch+=t.t00(x);      
          }

          return ch;
       },
       t00: function (x) {
     var ch = ''; console.log(x);
            for(var q in x){
               ch += W.T.C.C2_EntityCard(x[q]);   
            }
         
    
            return ch;

        }
   };
    function Layout( ){
        var ch='<div class="block"  ><div class="block" data-nodeid="freindrequestwalkwayMain" ><div class="block"  ></div><div class="block"  ></div><div class="block"  ></div><div class="block"  ></div></div></div>';

        return ch;
    }
    
    function paging(){
        var ch='';
        ch+='<div class="block _bdy m_b5 m_t10"><button type="button" class="btn   btn-block" data-paging="FreindRequest" >Load More</button></div>';
        return ch;

    } 
   W.T.FreindRequest={
   Layout:Layout,
   t:t,
   paging:paging
   };

})(wowrol);