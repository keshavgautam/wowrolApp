

   /*
* page set up 2
*/
; (function(W){
   "use strict";

 var ch = '<div class="block _bdy">';  var limit =4;
  
 function sampleAddress(){
     var ch='<address>'
  +'<strong>Twitter, Inc.</strong><br>'
  +'1355 Market Street, Suite 900<br>'
  +' San Francisco, CA 94103<br>'
  +'<abbr title="Phone">P:</abbr> (123) 456-7890'
  +'</address>';

  return ch;
 }

 var button_V1=[
 {type:'radio',text:'',name:'radioname',icon:'',value:0,checked:''},
];
 var button_V2=[
 {type:'checkbox',text:'',name:'checkbox',icon:'',value:0,checked:''},
];
var button_V3=[
 {type:'icon',text:'',name:'',icon:'edit',iconsize:16},
 {type:'icon',text:'',name:'',icon:'cross',iconsize:16},
];
   var links=[],text;
 
 links.push({ItemType:'link',ItemData:{text:'new_address_for_delivery',icon:'add',badge:'<div class="block m_t5"><span class="badge-0 right br-10 br-10px bg_10 ">1</span></div>',help:'help text'} });  

 links.push({ItemType:'link',ItemData:{text:'new_address_for_delivery',icon:'add',badge:'<div class="block m_t5"><span class="badge-0 right br-10 br-10px bg_10 ">1</span></div>',help:'help text'},secondaryaction:button_V1,primaryaction:button_V2 });  
  links.push({ItemType:'link',ItemData:{text:'new_address_for_delivery',icon:'add',attrStr:'  '},secondaryaction:button_V1 }); 

 links.push({ItemType:'link',ItemData:{text:'new_address_for_delivery',icon:'add',attrStr:'  ',help:'help text'} });  

 links.push({ItemType:'tile',ItemData:{text:'addessnamedf',avatar:'http://localhost:3325/assets/imgs/pic/shopavatar.png',avatarsize:'x35'},secondaryaction:button_V1 });  

  links.push({ItemType:'tile',ItemData:{text:'addessname',avatar:'http://localhost:3325/assets/imgs/pic/shopavatar.png',avatarsize:'x35',help:'help text'},secondaryaction:button_V3 });  
 links.push({ItemType:'html',ItemData:{bodyhtml:sampleAddress} ,primaryaction:button_V2});  





   ch+= W.U.CreateList(links);
ch+='</div>';

   var newView='<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>';   
   

     W.U.ccbk.Run(W.U.Page,'materialpleaseinsert',newView); 

 W.U.resize();
})(wowrol);