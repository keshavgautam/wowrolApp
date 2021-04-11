/*
* page set up 2
*/
; (function(W){
   "use strict";
    var ch='';
var drawerContent={};
   drawerContent.left='<div class="block bg_4"> <div class="block _bdy"><span class="fw-b al-c">Title left</span></div><nav class="block ul hover bg_0"> <div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">question_answer</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "> <a class="block _bdy" href="javascript:void(0);" > <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div></nav></div>';
     drawerContent.top='<div class="block bg_4"> <div class="block _bdy"><span class="fw-b al-c">Title top</span></div><nav class="block ul hover bg_0"> <div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">question_answer</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "> <a class="block _bdy" href="javascript:void(0);" > <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div></nav></div>';

    drawerContent.bottom='<div class="block bg_4"> <div class="block _bdy"><span class="fw-b al-c">Title bottom</span></div><nav class="block ul hover bg_0"> <div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">question_answer</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "> <a class="block _bdy" href="javascript:void(0);" > <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div></nav></div>';

   drawerContent.right='<div class="block bg_4"> <div class="block _bdy"><span class="fw-b al-c">Title bottom</span></div><nav class="block ul hover bg_0"> <div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">question_answer</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "> <a class="block _bdy" href="javascript:void(0);" > <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div></nav></div>';

   var setting={};
  setting.left={minWidth:240,Drawerheight:window.innerHeight};
   setting.right={minWidth:240,Drawerheight:window.innerHeight};
setting.top={minheight:240};
setting.bottom={minheight:240};
      var mainContent='<main class="block"> <div class="block _bdy">Main contain<button class="btn" data-of_2lBtn="demoleft" >data-of_2lBtn</button></div><div class="block _bdy"><button class="btn" data-of_2rbtn="demoleft" >data-of_2rbtn</button></div><div class="block _bdy"><button class="btn" data-of_2tbtn="demoleft" >data-of_2tbtn</button></div><div class="block _bdy"><button class="btn" data-of_2bbtn="demoleft" >data-of_2bbtn</button></div></main>';
   var args={setting:setting,name:'demoleft',Iswindow:true};
      ch+=    W.T.DrawerLayout( drawerContent, mainContent,args);




      
        var newView=W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>');   
   



           W.U('#page').html(newView);


})(wowrol);