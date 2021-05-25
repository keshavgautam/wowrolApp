; (function (W) {
  "use strict";
 function getWidthFromValue (val) {
            var min = 0, max = 5;
            if (val <= min || min === max) {
                return 0;
            }
            if (val >= max) {
                return 100;
            }
            return (val - min) * 100 / (max - min);
        }


 var TemBigStar = function (x) {
            var ch = '<div class="di-ib po-re bstar vl-m"> <div class="di-ib po-re fstar " style="width:' + x.width + '%;"> </div></div><span class="span vl-m">' + x.text + '</span><input type="hidden" name="ratingpoint" data-mini="0" data-max="5" value="' + x.value + '">';


            return ch;
        }

  function input(){
     
    function Handler(Node,data){
       this.Node=Node;
       this.data=data;
       this.init(); 
    }
    
         Handler.prototype.init =function(){
    var settings=this.data;
    var Node=this.Node;
     var Value = settings.value;
      var Width = getWidthFromValue(Value);
        $(Node).html(TemBigStar({ name:settings.name,width: Width, text: settings.caption[Value], value: Value}));
  



    var initTouch =function(evt){
    
     var posx = evt.offsetX;
            var targetwidth = this.offsetWidth;
            //-calculating val
            var Value = W.U.positive(((posx / targetwidth) * 5).toFixed(0));
            
            if(Value==0){Value=1;}
            var Width = getWidthFromValue(Value);
        
            $(Node).html(TemBigStar({ width: Width, text: settings.caption[Value], value: Value}));

}

 $(Node).on('touchstart touchmove touchleave mouseenter mousemove mouseleave', '.bstar', initTouch);
}  




     new Handler(this.Node,this.data); 
  }





    W.U.Ratting={input:input,
    getWidthFromValue:getWidthFromValue};

})(wowrol);