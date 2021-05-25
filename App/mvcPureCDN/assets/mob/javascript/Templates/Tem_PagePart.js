/*
* page set up 2
*/


; (function (W) {
    "use strict";

/**
* @description  generate the tab header
* @param  
*/
function wrap(header,madian,Footer,container_class){
       var classcontent=(typeof Footer == "undefined")?'block':'content';
          
   Footer=(!W.U.isOK(Footer)||Footer==null)?'':Footer;
 container_class=(!W.U.isOK(container_class))?'_Bdy':container_class;
    
    var ch='<div class="block">';
    ch+='<div class="block po-re top_fix">'
     ch+=header;
    ch+='</div>';
    ch+='<div class="block  "  data-appMedian="page" >';
  ch+='<div class="block po-ab"  data-loading="median" style="display:none;" ></div><div class="container  main_pane '+ container_class+'">';
     ch+=madian; 
      ch+='</div>';

     ch+=Footer;
     ch+='</div>';


       ch+='</div>';
    return ch;



}







 W.T.wrap = wrap;

})(wowrol);