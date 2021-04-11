/**
* The Mouse library
*/
function Mouse(obj,callback){
  
    function MouseHandler(obj,callback) {
        this.obj = obj;
        this.MouseDown = false;
        this.originalPosition = null;
        this.callback = callback;
         this.init();
         var touchDown = false;

  
    }
   MouseHandler.prototype.init = function () {
 
 

 
    $( this.obj).on('mousedown',this.start.bind(this));

   $( this.obj).on(' mouseup mouseleave',this.end.bind(this));
   
    };
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
  MouseHandler.prototype.swipeInfo = function (event) {
           var x = 0,
        y = 0,
        dx, dy;
         x = getTouches(event).x;
            y = getTouches(event).y;
       
        
        dx = (x > this.originalPosition.x) ? "right" : "left";
        dy = (y > this.originalPosition.y) ? "down" : "up";
      
        return {
            direction: {
                x: dx,
                y: dy
            },
            offset: {
                x: x - this.originalPosition.x,
                y: this.originalPosition.y - y
            }
        };
            }

    MouseHandler.prototype.start = function (event) {
     
        this.MouseDown =true;
        this.originalPosition = {
            x: getTouches(event).x,
            y: getTouches(event).y
        };
          $( this.obj).on('mouseover',this.move.bind(this));
 $( this.obj).addClass('grab');
    };
    MouseHandler.prototype.end = function (event) {
         
      this.MouseDown =false;
         console.log('end '+this.MouseDown);
      this.originalPosition = null;

        $( this.obj).off('mousemove',this.move.bind(this));
         $( this.obj).removeClass('grab');
    } ;
    MouseHandler.prototype.move = function (event) {
             console.log('this.MouseDown'+this.MouseDown);
            if (this.MouseDown) { 
            var info = this.swipeInfo(event);
            this.callback(info.direction, info.offset);
            }
        };
   new MouseHandler(obj,callback);

 }