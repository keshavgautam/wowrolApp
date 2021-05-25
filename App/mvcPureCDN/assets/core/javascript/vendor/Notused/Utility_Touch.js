; (function(W){
   "use strict";
/**
* The Touch library
*/
 
  function getTouches(event) {
                if (event.touches !== undefined) {
                    return {
                        x : event.touches[0].pageX,
                        y : event.touches[0].pageY
                    };
                }

                if (event.touches === undefined) {
                    if (event.pageX !== undefined) {
                        return {
                            x : event.pageX,
                            y : event.pageY
                        };
                    }
                    if (event.pageX === undefined) {
                        return {
                            x : event.clientX,
                            y : event.clientY
                        };
                    }
                }
            }


function Touch(wrap,elem,callback){
  var ev_types = {};
  var base={};
   var types = [
                    "touchstart.owl mousedown.owl",
                    "touchmove.owl mousemove.owl",
                    "touchend.owl touchcancel.owl mouseup.owl"
                ];
base.maximumPixels=0;
base.newPosX = 0;
base.newRelativeX = 0;

       ev_types.start = types[0];
       ev_types.move = types[1];
       ev_types.end = types[2];
 var   locals = {
                    offsetX : 0,
                    offsetY : 0,
                    baseElWidth : 0,
                    relativePos : 0,
                    position: null,
                    minSwipe : null,
                    maxSwipe: null,
                    sliding : null,
                    dargging: null,
                    targetElement : null
                };
    function swapEvents(type) {
                if (type === "on") {
                    $(document).on(ev_types.move, dragMove);
                    $(document).on(ev_types.end, dragEnd);
                } else if (type === "off") {
                    $(document).off(ev_types.move);
                    $(document).off(ev_types.end);
                }
                
            }
function dragStart(event) {
       var ev = event.originalEvent || event || window.event,
                    position;
      base.newPosX = 0;
      base.newRelativeX = 0;
      var  position = $(this).position();
      
        locals.relativePos = position.left;

                locals.offsetX = getTouches(ev).x - position.left;
                locals.offsetY = getTouches(ev).y - position.top;

                swapEvents("on");

                locals.sliding = false;
                locals.targetElement = ev.target || ev.srcElement;
      W.U.console(position);
      W.U.console(locals);
}

function dragMove(event){
        var ev = event.originalEvent || event || window.event,
                    minSwipe,
                    maxSwipe;

                base.newPosX = getTouches(ev).x - locals.offsetX;
                base.newPosY = getTouches(ev).y - locals.offsetY;
                base.newRelativeX = base.newPosX - locals.relativePos;
      if ( locals.dragging !== true && base.newRelativeX !== 0) {
                    locals.dragging = true;
               
                }       
                     
      if ((base.newRelativeX > 8 || base.newRelativeX < -8)) {
                  
                    locals.sliding = true;
                } 
                
               minSwipe = function () {
                    return base.newRelativeX / 5;
                };

                maxSwipe = function () {
                    return base.maximumPixels + base.newRelativeX / 5;
                };   
       base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());          
         W.U.console(' newPosX  '+base.newPosX);                       
      }

function dragEnd(event){
      swapEvents('off');   
      }

$(wrap).on(ev_types.start,elem, dragStart);
 }



  W.U.Touch=Touch;


})(wowrol);