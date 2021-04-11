/**
* The Tab Plugin
*/
function Tab() {
    function TabHandler(wrap,wrapdata) { 
        this.wrap = wrap;
        this.wrapdata = wrapdata;
        
      // wait for dom css emplimention
        setTimeout(this.init.bind(this), 100);
       
    };
    TabHandler.prototype.init = function () {
        this.Tabul = this.wrap.querySelector('[data-tabcontainer]');
        this.Tabultouchrunning = false;
        this.TabuloffsetXLeft = 0;
        this.TabuloffsetXRight = 0;
        this.TabulLeft = 0;
        this.TabLi = this.Tabul.querySelectorAll('.li');
        this.tabpanel = this.wrap.querySelectorAll('[data-tabpanel]');
        var TabulWidth = 0;
        var TabulHeight = 0;

        for (var q = 0; q < this.TabLi.length; q++) {
            var li_a = this.TabLi[q].querySelector('a');

            TabulWidth += this.TabLi[q].offsetWidth;
            TabulHeight = this.TabLi[q].offsetHeight;
          


 $( li_a).on('click', this.TabClickHandler.bind(this));
        }
         this.UpdateTab.bind(this)();
        this.TabulWidth = TabulWidth;
        this.Tabul.style.width = TabulWidth + 'px';
        this.Tabul.style.height = TabulHeight + 'px';


      //   console.log(this);

       
        Mouse(this.Tabul, this.TabulTouch.bind(this));
    };
    TabHandler.prototype.TabulTouch = function (direction, offset) {
        if (this.Tabultouchrunning==false) {
            this.Tabultouchrunning = true;
            if ((offset.y > -10 && offset.y < 10)) {
                console.log('--------started ----------');
                var left = Number(this.Tabul.style.left.replace(/px/i, ''));
                var loLimit = -(this.TabulWidth - this.wrap.offsetWidth);
console.log('offset.x =' + offset.x);
console.log('this.TabuloffsetXLeft =' + this.TabuloffsetXLeft);
console.log('this.TabuloffsetXRight =' + this.TabuloffsetXRight);
// console.log('left before =' + left);

            if (offset.x > 0) {//right

     var offsetX = (offset.x - this.TabuloffsetXRight); 
        if ((offset.x <= this.TabuloffsetXRight) && (offset.x >= 0)) {// for positive

                    this.TabuloffsetXRight = 0;
                 var offsetX = (offset.x - this.TabuloffsetXRight); 
                } else {
                    this.TabuloffsetXRight=offset.x;
                  
                }
                }else{ //left
        
         var offsetX = (offset.x - this.TabuloffsetXLeft);    
    if ((offset.x >= this.TabuloffsetXLeft) && (offset.x <= 0)) {// for negetive

                    this.TabuloffsetXLeft = 0;
                 var offsetX = (offset.x - this.TabuloffsetXLeft);    
                } else {
                     this.TabuloffsetXLeft =offset.x ;
               
                }
     
            
                }

                 left = (left + offsetX);
           
                left = (left > 0) ? 0 : left;
                left = (left < loLimit) ? loLimit : left;
 console.log('offsetX =' + offsetX);
                console.log('left after =' + left);

              
                 $(this.Tabul).css(this.doTranslate(left));
            }

            this.Tabultouchrunning = false;
        }
    }
    TabHandler.prototype.TabClickHandler = function (event) {
        var child = event.originalEvent.srcElement.offsetParent;
        var parent = child.parentNode;
        // The equivalent of parent.children.indexOf(child)
        this.wrapdata.activeIndex = Array.prototype.indexOf.call(parent.children, child);

       //  console.log(this.wrapdata.activeIndex);
        //making active
        this.UpdateTab.bind(this)();
    }
    TabHandler.prototype.UpdateTab = function () { 
    
     for (var q = 0; q < this.TabLi.length; q++) {
            var li_a = this.TabLi[q].querySelector('a');
            if (typeof (this.tabpanel[q]) != 'undefined') {
                if (this.wrapdata.activeIndex == q) {
                    li_a.classList.add('active');
                    this.tabpanel[q].style.display = "block";
                } else {
                    li_a.classList.remove('active');
                    this.tabpanel[q].style.display = "none";
                }
            } else { //only for list
                if (this.wrapdata.activeIndex == q) {
                    li_a.classList.add('active');

                } else { 
                     li_a.classList.remove('active');
                     
                     
                     }
            }

        }
    }
    TabHandler.prototype.doTranslate = function (pixels) {
            return {
                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "transform": "translate3d(" + pixels + "px, 0px,0px)"
            };
        }
    new TabHandler(this.Node,this.Value);
}