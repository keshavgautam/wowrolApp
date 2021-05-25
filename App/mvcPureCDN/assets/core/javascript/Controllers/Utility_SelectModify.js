// Data Toggle function applying
 (function (W) {
     "use strict";

     function Handler(Node) {
         this.selected = Node.getAttribute('data-selected');
         this.dupNode = Node.cloneNode(true);
         this.name = Node.name;
         this.Node = Node;
         this.getChild();
         this.init();


     }
     Handler.prototype.init = function () {
      /*   if (!W.U.browser.mobile) {

             var newNode = W.U.createElement('div');
            // this.Node = newNode;
        this.dupNode.parentNode.replaceChild(newNode, this.dupNode);
           
             this.newHTML();
         } else {
            
             this.Node.selectedIndex=  this.index;
         }*/

         this.Node.selectedIndex=  this.index;

     }
     Handler.prototype.getChild = function () {

         var child = this.dupNode.childNodes;
         this.child = []; this.index = 0; var i = 0;
         for (var q = 0; q < child.length; q++) {
             if (child[q].nodeName == "OPTION") {

                 var attributesData = { selected: false, disabled: false, value: '' };
                 if (child[q].selected) {
                     this.index = i;
                     attributesData.selected = true;
                 }
                 if (child[q].value == this.selected) {
                     this.index = i;
                     attributesData.selected = true;
                 }

                 if (child[q].disabled) {
                     attributesData.disabled = true;
                 }

                 attributesData.value = child[q].value;

                 this.child.push({ attributes: attributesData, innerText: child[q].innerText });
                 i++;
             }
         }
     }

     Handler.prototype.newHTML = function () {
         var _this = this;
         var link = [], buttonText = '', value;

         for (var q = 0; q < this.child.length; q++) {
             if (this.child[q].attributes.selected) {
                 buttonText = this.child[q].innerText;
                 value = this.child[q].attributes.value;
             }


             link.push('<div class="li bs-1"><a class="block _Bdy" href="javascript:void(0);" data-btnlink="' + q + '" ><span class=" "></span><span class=" tt-c  ">' + this.child[q].innerText + '</span></a></div>')
         }


         var dropdownbutton = '<div class="block po-re">'
          + ' <button class="btn btn-default dropdown-toggle" type="button"  data-toggle="dropdown">' + buttonText + '<span class="caret"></span></button>'
          + '<div class="hide po-ab" data-block="menu"><div class="block ul hover bg_0 fg_4 ff_3  bs-0">'
          + link.join('')
          + '</div> </div>'
          + '<input type="hidden" name="' + this.name + '" value="' + value + '">'
           + '</div>';






         W.U.AttachDom(this.Node, dropdownbutton, 'html', function () {

             W.U.attrclick('[data-btnlink]', this.mainBlock, function () {

                 var index = W.U.intval(this['data-btnlink']);
                 _this.child[_this.index].attributes.selected = false;
                 _this.child[index].attributes.selected = true;
                 _this.index = index;
                 _this.init();
             });
         });
     }




     W.U.selectmodify = function (Node) { new Handler(Node); };


 })(wowrol);