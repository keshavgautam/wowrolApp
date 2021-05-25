; (function(W){
   "use strict";
   function autosize(Node) {

     function Handler(Node) {
            if(!$(Node).hasClass('noautosize')){
      this.Node = Node;;
       
      this.init();  
            }
    
    }

    Handler.prototype.init = function () {
        

      this.style = window.getComputedStyle(this.Node, null);
      
        this.originalHeight = this.Node.style.height;
  
    this.Node.oninput=this.update.bind(this);
    this.Node.onresize=this.update.bind(this);
      this.Node.onreset=this.reset.bind(this);
    
      
    }
      
  Handler.prototype.update = function () {
       var ta = this.Node;
       var startHeight = this.style.height;
       var maxHeight=this.style.maxHeight;
       maxHeight=maxHeight.replace(/px/g, '');
        var style = this.style;
        var startHeight=this.startHeight = this.Node.style.height;
        var htmlTop=this.htmlTop = document.documentElement.scrollTop;
        var bodyTop =this.bodyTop= document.body.scrollTop;
        var originalHeight=this.originalHeight = this.Node.style.height;
        var heightOffset=this.heightOffset = getheightOffset();
        var overflowY = 'hidden';
       this.Node.style.height = 'auto';

     var endHeight =this.endHeight= (this.Node.scrollHeight + heightOffset) - 0;
     endHeight=(endHeight>maxHeight)?maxHeight:endHeight;
     

            if (this.Node.scrollHeight === 0) {
                // If the scrollHeight is 0, then the element probably has display:none or is dethis.Nodeched from the DOM.
                this.Node.style.height = originalHeight;
                return;
            }

            this.Node.style.height = endHeight + 'px';

            // prevents scroll-position jumping
            document.documentElement.scrollTop = htmlTop;
            document.body.scrollTop = bodyTop;

            var style = window.getComputedStyle(this.Node, null);

            if (style.height !== this.Node.style.height) {
                if (overflowY !== 'visible') {
                    changeOverflow('visible');
                    return;
                }
            } else {
                if (overflowY !== 'hidden') {
                    changeOverflow('hidden');
                    return;
                }
            }



            if ( startHeight !== this.Node.style.height)  {
              W.U.ccbk.Run(this.Node,'autosizeresized'); 
  W.U.ccbk.Run(this.Node.parentNode,'autosizeresized'); 
            }






      
        function getheightOffset() {
            var Offset = 0;
            if (style.boxSizing === 'content-box') {
              Offset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
            } else {
              Offset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
            }


            return Offset;

        }
       function changeOverflow(value) {
           
                // Chrome/Safari-specific fix:
                // When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
                // made available by removing the scrollbar. The following forces the necessary text reflow.
                var width = ta.style.width;
                ta.style.width = '0px';
                // Force reflow:
                /* jshint ignore:start */
                ta.offsetWidth;
                /* jshint ignore:end */
                ta.style.width = width;
            }
    }
    Handler.prototype.reset = function () {
      this.Node.style.height = this.originalHeight + 'px'; 
    }

         new Handler(Node);
     }




     W.U.autosize = autosize;


})(wowrol);