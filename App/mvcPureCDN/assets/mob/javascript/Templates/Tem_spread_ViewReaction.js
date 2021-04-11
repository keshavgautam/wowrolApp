/*
* 
*/
; (function(W){
   "use strict";

    var S={
    Wrap:function(){
        var ch='';
        ch+='<div class="block" data-nodeid="spreadViewReactionWrap" ><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div></div>';


        return ch;
    },
    t0:function(x){
         var ch = ''; console.log(x);
            for(var q in x){
               ch += S.t1(x[q]);   
            }
         
    
            return ch;
    },
    t1: function (x) {
             return W.T.C.C2_EntityCard(x)

        },
    Loading:'<div class="block sr-bgC _bdy m_b5 al-c">'+ W.U.loading_svg(40,40)+'</div>',
    paging:function(SpreadID){
        var ch='';
        ch+='<div class="block _bdy m_b5 m_t10"><button type="button" class="btn   btn-block" data-commentpaging="'+SpreadID+'" >Load More</button></div>';
        return ch;

    } 
    };



 W.T.spread_ViewReaction=S;
})(wowrol);