/*
* 
*/
; (function(W){
   "use strict";


function bottomfixwrap(Node, name){
   
      function Handler(Node, name) {
             this.wrap = Node;
             this.name = name;
             this.id = name;
             this.top = W.U('[data-block="top"]', this.wrap)[0];
             this.mid = W.U('[data-block="mid"]', this.wrap)[0];
             this.foot = W.U('[data-block="foot"]', this.wrap)[0];
        
            
             // wait for dom css emplimention
        setTimeout(this.init.bind(this), 100);
        
          W.U.windowresize.Add(this.init.bind(this));
       
     // $(this.wrap).on('resizeouter',this.init.bind(this));

      W.U.ccbk.Add(this.wrap,'resizeouter',this.init.bind(this));
         } 
        Handler.prototype.init = function () {
      var data = W.U.intentdata.get('bottomfixwrap.'+this.id);
  // W.U.console('bootom fix wrap data');
     //W.U.console(data);   W.U.console(this.name);

        this.topHeight=(typeof this.top!= "undefined")?this.top.offsetHeight:56;
       
      
        this.footHeight=this.foot.offsetHeight;
        this.midHeight=( window.innerHeight-(this.topHeight+this.footHeight+data.margintop));
       if(! W.U.browser.height_free){
         this.mid.setAttribute('style', 'height:' + this.midHeight + 'px ;overflow-x: hidden;overflow-y: auto;');   
       }
        

 this.wrap.style.opacity=1;  
 
         };

     new Handler(Node, name); 
};

   
    

   


     W.U.bottomfixwrap=  bottomfixwrap;


})(wowrol);