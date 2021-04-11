  ; (function(W){
   "use strict";

    var ColorSwatches=W.U.ColorSwatches;
    console.log(ColorSwatches);
    var ch='<div class="block ul">';
    for(var q in ColorSwatches){
        ch+='<div class="block li"><div class="block ul ul-menu">';
        var shades=ColorSwatches[q].shades;
         for(var p in shades){
        ch+='<div class="li w2"><a href="javascript:void(0);" class="block _bdy  fg_10 tt-c al-c" style="background-color:'+shades[p].hex+' ;height:80px;"><span class="block">'+ColorSwatches[q].name+' '+p+'</span><br><span class="block ">'+shades[p].hex+' </span> </a></div>'; 
    }

        ch+='</div></div>'; 
    }
    ch+='</div>';

    var drawer= W.T.wrap(   W.T.Header.wellcome({}),  ch);

       var newView=W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(drawer)+'</div>');   
   



           W.U('#page').html(newView);
           W.U.resize();
   })(wowrol);