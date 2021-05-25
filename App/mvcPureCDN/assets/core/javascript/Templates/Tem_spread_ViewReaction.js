/*
* 
*/
; (function(W){
   "use strict";
    var S={
          t0:function(x){
         var ch = ''; 
            for(var q in x){
               ch += S.t1(x[q]);   
            }
         
    
            return ch;
    },
    t1: function (x) {
        var ch= '<div class="block" data-spreadViewReactioncard="'+x.cid+'" >'+W.T.C.C2_EntityCard(x)+'</div>';
             return ch; 

        }, 
mobLayout:function  (block){
 
  var Header=W.T.ActivityHeader({ back: '<a href="javascript:void(0);" class="block header-link-btn" data-pagerbtn="mainpage:blockFront"   >'+W.T.SVG('left',24,'#f1f5fc')+' </a>',
               Title: '<span class=" block header-cell al-l fs14 ff-3"><span class="vl-sp" >View Reaction Actor</span></span>',
                RightLink: '<div class="di-td"></div>'
            });
        //-------------
var x=block.objectdata;


     var mid =  '<div class="block"  data-junction="spreadViewReactionActorwrap:'+x.SpreadData.sid+'" >sadas</div>';

   
  W.U.Junction('spreadViewReactionActorwrap:'+x.SpreadData.sid,function(){
      var  PagingData= W.U.spread_ViewReaction.PagingData;
  PagingData.TranseData={ifo:{sid:x.SpreadData.sid},pgd:1};
  PagingData.Node=  this.Node;

  W.U.paging.init(PagingData);
  W.U.spread_ViewReaction.init();

  },{}); 
        return W.T.wrap(Header,mid);
    }
    };
   



 W.T.spread_ViewReaction=S;
})(wowrol);