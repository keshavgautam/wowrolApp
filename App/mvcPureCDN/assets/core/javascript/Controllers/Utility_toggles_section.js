/*
* 
*/
; (function(W){
   "use strict";


   function Checkbox(Node){
    function Handler(Node){
      this.element_=Node
      this.inputElement_=W.U('[type="checkbox"]',this.element_)[0];
  
      this.init();
   }

Handler.prototype.init=function(){
    var _this=this;
      var boxOutline = document.createElement('span');
        boxOutline.classList.add(this.CssClasses_.BOX_OUTLINE);
        var tickContainer = document.createElement('span');
        tickContainer.classList.add(this.CssClasses_.FOCUS_HELPER);
        var tickOutline = document.createElement('span');
        tickOutline.classList.add(this.CssClasses_.TICK_OUTLINE);
      
        boxOutline.appendChild(tickOutline);
        this.element_.appendChild(tickContainer);
        this.element_.appendChild(boxOutline);
this.element_.onclick=function(){
  _this.checkToggleState();
}

 
     this.checkToggleState(); 
   



     
}

 Handler.prototype.CssClasses_ = {
    BOX_OUTLINE: 'checkbox__box-outline',
    FOCUS_HELPER: 'checkbox__focus-helper',
    TICK_OUTLINE: 'checkbox__tick-outline',
    IS_FOCUSED: 'is-focused',
    IS_DISABLED: 'is-disabled',
    IS_CHECKED: 'is-checked',
    IS_UPGRADED: 'is-upgraded'
};

Handler.prototype.checkToggleState = function () {
    if (this.inputElement_.checked) {
        this.element_.classList.add(this.CssClasses_.IS_CHECKED);
    } else {
        this.element_.classList.remove(this.CssClasses_.IS_CHECKED);
    }
};
   new Handler(Node);

   }


    function Radio(Node){
    function Handler(Node){
      this.element_=Node
      
      this.inputElement_=W.U('[type="radio"]',this.element_)[0];
   

      this.init();
   }

Handler.prototype.init=function(){
    var _this=this;
        var outerCircle = document.createElement('span');
        outerCircle.classList.add(this.CssClasses_.RADIO_OUTER_CIRCLE);
        var innerCircle = document.createElement('span');
        innerCircle.classList.add(this.CssClasses_.RADIO_INNER_CIRCLE);
        this.element_.appendChild(outerCircle);
        this.element_.appendChild(innerCircle);
this.element_.onclick=function(){
    _this.checkToggle();
}
   
     this.checkToggleState(); 




     
}

 Handler.prototype.CssClasses_ = {
    RADIO_OUTER_CIRCLE: 'radio__outer-circle',
    RADIO_INNER_CIRCLE: 'radio__inner-circle',
    IS_FOCUSED: 'is-focused',
    IS_DISABLED: 'is-disabled',
    IS_CHECKED: 'is-checked',
    IS_UPGRADED: 'is-upgraded'
};
Handler.prototype.checkToggle = function () {
var name=this.inputElement_.name;

var allRadio=W.U('[type="radio"]');

for(var i =0;i<allRadio.length;i++){

   if(allRadio[i].name== name){
       allRadio[i].checked = false; 

        allRadio[i].parentNode.classList.remove(this.CssClasses_.IS_CHECKED);
   }
}


    this.inputElement_.checked = true;
    this.checkToggleState();
};
Handler.prototype.checkToggleState = function () {
    if (this.inputElement_.checked) {
        this.element_.classList.add(this.CssClasses_.IS_CHECKED);
    } else {
        this.element_.classList.remove(this.CssClasses_.IS_CHECKED);
    }
};
   new Handler(Node);

   }


 W.U.checkbox= Checkbox
  W.U.radio= Radio

})(wowrol);