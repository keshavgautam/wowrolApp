 (function (W) {
     "use strict";

     function collapse(Node, name) {

         function Handler(Node, name) {
             this.Node = Node;
             this.name = name;
             this.btn = W.U('[data-collapsebtn="' + this.name + '"]', this.Node)[0];
             this.block = W.U('[data-collapseblock="' + this.name + '"]', this.Node)[0];
             this.state = 1;
             this.btn.onclick = this.onclick.bind(this);
             this.block.style.display = "none";
             this.init();
            this.removeAttr();
         }
         Handler.prototype.init = function () {
           
             switch (this.state) {
                 case 0:
                     this.inopen();
                     break;
                 case 1:
                     this.inclose();
                     break;
             }


         }
         Handler.prototype.inopen = function () {
             this.btn.innerHTML = W.T.SVG('uparrow', 18, '');
             $(this.block).slideDown(200)

         }
         Handler.prototype.inclose = function () {
             this.btn.innerHTML = W.T.SVG('downarrow', 18, '');
             $(this.block).slideUp(200);

         }
         Handler.prototype.onclick = function () {
             if (this.state == 0) {
                 this.state = 1;
             } else {
                 this.state = 0;
             }

             this.init();
         }
         Handler.prototype.removeAttr = function () {

          this.btn.removeAttribute('data-collapsebtn');
          this.block.removeAttribute('data-collapseblock');

         }
         new Handler(Node, name);
     }




     W.U.collapse = collapse;


 })(wowrol);