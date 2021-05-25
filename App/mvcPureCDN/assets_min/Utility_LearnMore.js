/*
* 
*/
; (function(W){
   "use strict";
  function Tempalte(block){
     
      var ch='asds';
      var header=W.T.ActivityHeader({back:'<a href="javascript:void(0);" class="block header-link-btn"  data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="block header-cell fg_6 al-l" ><h2 class="truncate title" >'+block.triggerdata[3]+'</h2> </a>',
    RightLink:'',
    dropdown:Array()
    });
  
      return W.T.wrap(header,'<div class="block ov-au" >'+block.objectdata+'</div>');;
  }




  function LearnMore(){
     var LoadedDoc={};  
       
        function Handler(btn,docId) { 
        this.btn=btn;
        this.docId=docId;
        this.init();
        }
 Handler.prototype.init=function(){
     this.btn.onclick=this.initMain.bind(this);


    
 }
  Handler.prototype.initMain=function(){

    var blockName='learnmore'+this.docId;
   W.U.Pager.addblockdata({ name:blockName, htmlStr:Tempalte});
   W.U.Pager.DirectPagerbtnOnclick('mainpage:'+blockName+':learnmore:'+this.docId);
 }




      new Handler(this.Node,this.docId); 
     };

 
 W.U.LearnMore= LearnMore;




})(wowrol);