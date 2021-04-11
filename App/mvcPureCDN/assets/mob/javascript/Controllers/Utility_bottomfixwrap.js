/*
* 
*/
; (function(W){
   "use strict";


function bottomfixwrap(Node, name){
   
      function Handler(Node, name) {
             this.wrap = Node;
             this.name = name;
             this.top = W.U('[data-block="top"]', this.wrap)[0];
             this.mid = W.U('[data-block="mid"]', this.wrap)[0];
             this.foot = W.U('[data-block="foot"]', this.wrap)[0];
        
            
             // wait for dom css emplimention
        setTimeout(this.init.bind(this), 100);
          $(window).on('resize', this.init.bind(this));
       
      $(this.wrap).on('resizeouter',this.init.bind(this));

         } 
        Handler.prototype.init = function () {
      
        this.topHeight=(typeof this.top!= "undefined")?this.top.offsetHeight:56;
       
      
        this.footHeight=this.foot.offsetHeight;
        this.midHeight=( window.innerHeight-(this.topHeight+this.footHeight));
       if(! W.U.browser.height_free){
         this.mid.setAttribute('style', 'height:' + this.midHeight + 'px ;overflow-x: hidden;overflow-y: auto;');   
       }
        

 this.wrap.style.opacity=1;  
  //console.log(this);    
         }

     new Handler(Node, name); 
}

   
    

   


     W.U.bottomfixwrap=  bottomfixwrap;


})(wowrol);