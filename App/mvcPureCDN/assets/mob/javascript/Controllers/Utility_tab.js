/*
* page set up 2
*/
; (function(W){
   "use strict";

   /**
* The Tab Plugin
*/
function Tab() {
    function TabHandler(wrap,wrapdata) { 
        this.wrap = wrap;
        this.wrapdata = wrapdata;
        
      // wait for dom css emplimention
        setTimeout(this.init.bind(this), 100);
       // this.init.bind(this);
      $(window).on('resize', this.init.bind(this));
    };
    TabHandler.prototype.init = function () {
        this.IsList=this.wrapdata.OnlyList;
        this.Tabul = this.wrap.querySelector('[data-tabcontainer]');
        this.Tabultouchrunning = false;  this.Tabcontenttouchrunning = false;
        this.Left = 0;

        this.TabuldiffXLeft = 0;
        this.TabuldiffXRight = 0;  
         this.TabulLeft = 0;
       this.TabcontentdiffXLeft = 0;
        this.TabcontentdiffXRight = 0;
         this.TabcontentLeft = 0;
     
        this.TabLi = W.U('.li',this.Tabul);
        this.Tabcontent = W.U('.tab-content',this.wrap)[0]; 
        this.tabpanel = W.U('[data-tabpanel]',this.wrap); 
        var TabulWidth = 0;
        var TabulHeight = 0;

        for (var q = 0; q < this.TabLi.length; q++) {
         

            TabulWidth += parseFloat(this.TabLi[q].offsetWidth);
            TabulHeight = this.TabLi[q].offsetHeight;
            
       if(W.U('a',this.TabLi[q]).length>0){
   var li_a = W.U('a',this.TabLi[q])[0];
         li_a.onclick=this.TabClickHandler.bind(this);  
       }
        
  
        }
           if(!this.IsList){
        this.UpdateTab.bind(this)();
            }
    
        this.TabulWidth = TabulWidth+5;
        this.Tabul.style.width =  this.TabulWidth + 'px';
        this.Tabul.style.height = TabulHeight + 'px';
     

        //   // console.log(this);
        var _this = this;
       W.U.Mouse(this.Tabul, {
            mouse: true,
            start: function (event, start) {
                $(_this.Tabul).addClass('grab');
            },
            move: function (event, start, diff, speed) {
                _this.TabulTouch(event, start, diff, speed, 'move');

            },
            end: function (event, start, diff, speed) {
                _this.TabuldiffXLeft = 0;
                _this.TabuldiffXRight = 0;
               //   $(_this.Tabul).removeClass('grab');
                // console.log('--------ends ----------');
                // console.log('\n\n\n\n\n\n\n\n');

                //    _this.TabulTouch(event, start, diff, speed, 'end');
            }
        });
    
            
        this.wrap.style.opacity=1;  
    };
    TabHandler.prototype.TabulTouch = function (event, start, diff, speed, type) {

        if (this.Tabultouchrunning == false) {
            if ((diff.y > -30 && diff.y < 30)) {


                this.Tabultouchrunning = true;
                // console.log('--------started ----------');

                var loLimit = -(this.TabulWidth - this.wrap.offsetWidth);
                // console.log('loLimit =' + loLimit);
                // console.log('diff.x =' + diff.x);
                // console.log('this.TabuldiffXLeft =' + this.TabuldiffXLeft);
                // console.log('this.TabuldiffXRight =' + this.TabuldiffXRight);
                // // console.log('left before =' + left);

                if (diff.x > 0) {//right

                    var diffX = (diff.x - this.TabuldiffXRight);
                     this.TabuldiffXRight = diff.x;
                } else { //left

                    var diffX = (diff.x - this.TabuldiffXLeft);
                  
                      this.TabuldiffXLeft = diff.x;

                }

              


                // console.log('left brfore=' + this.Left);
                // console.log('diffX =' + diffX);
                this.Left = (this.Left + diffX);

                this.Left = (this.Left > 0) ? 0 : this.Left;
                this.Left = (this.Left < loLimit) ? loLimit : this.Left;

                if(this.Left>0){
                    this.Left=0;
                }


                this.changePos(this.Left, speed.x);
                // console.log('left after =' + this.Left);

                // console.log('start');
                // console.log(start);
                // console.log('diff');
                // console.log(diff);
                // // console.log('speed');
                //  // console.log(speed);
                //   // console.log('type');
                //   // console.log(type);


                this.Tabultouchrunning = false;
            }



        }

    }


    TabHandler.prototype.TabClickHandler = function (event) {
       

      
        var child = $(event.srcElement).parentsUntil('.ul','.li').get(0);
         
      

        var parent = child.parentNode;

        // The equivalent of parent.children.indexOf(child)
        this.wrapdata.activeIndex = Array.prototype.indexOf.call(parent.children, child);

       //  // console.log(this.wrapdata.activeIndex);
        //making active
        this.UpdateTab.bind(this)();

   if(!this.IsList){
     this.UpdateTab.bind(this)();
            }else{
 
    this.wrapdata.onTabClick.bind(this)(); 
            }  
       
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


  W.U.fn.event("tabshown",document.getElementById('page'),{activeIndex:this.wrapdata.activeIndex});
    }
    TabHandler.prototype.checkBrowser = function () {
            var 
                translate3D = "translate3d(0px, 0px, 0px)",
                tempElem = document.createElement("div"),
                regex,
                asSupport,
                support3d,
                isTouch;

            tempElem.style.cssText = "  -moz-transform:" + translate3D +
                                  "; -ms-transform:"     + translate3D +
                                  "; -o-transform:"      + translate3D +
                                  "; -webkit-transform:" + translate3D +
                                  "; transform:"         + translate3D;
            regex = /translate3d\(0px, 0px, 0px\)/g;
            asSupport = tempElem.style.cssText.match(regex);
            support3d = (asSupport !== null && asSupport.length === 1);

            isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;

           return {
                "support3d" : support3d,
                "isTouch" : isTouch
            };
        }
    TabHandler.prototype.changePos = function (pos, speed) {
        var time = speed?speed+'ms':'';  //console.log(speed); 
     
     

    var checkBrowser = this.checkBrowser();
      if (checkBrowser.support3d) {
            this.Tabul.style.webkitTransform = 'translate(' + pos + 'px,0) translateZ(0)';
            this.Tabul.style.msTransform =
        this.Tabul.style.MozTransform =
        this.Tabul.style.OTransform =
        this.Tabul.style.transform = 'translateX(' + pos + 'px)';
       // this.Tabul.style.transition = '0.25s';
    

        } else { 
         this.Tabul.style.left=  pos + 'px';
        }
     // console.log(+(speed));    console.log((speed<0));  
//$(this.Tabul).animate({left:pos},speed);

    }
   

    new TabHandler(this.Node,this.Value);
}


W.U.Tab=Tab;

})(wowrol);