


 ;(function (W) {
     "use strict";
var ch='';
 var tabsetting={
       ulClass:'header-link bg_0 fg_4',
       
       tabLiClass:'',
       data:{name:'demotab',
       OnlyList:true,
             activeIndex:0
            }
       }; 
var tab=[];
tab.push({a:'<a href="javascript:void(0);"  role="tab" >'+W.T.SVG('home',24,'#1274c0')+'<span class="vl-sp">Home</span><i class="badge _gbtn"></i></a>',onclick:''});
tab.push({a:'<a href="javascript:void(0);"  role="tab" >'+W.T.SVG('store',24,'#1274c0')+'<span class="vl-sp">store NAme</span><i class="badge _gbtn"></i></a>',onclick:''});
tab.push({a:'<a href="javascript:void(0);"  role="tab" >'+W.T.SVG('store',24,'#1274c0')+'<span class="vl-sp">store NAme</span><i class="badge _gbtn"></i></a>',onclick:''});
tab.push({a:'<a href="javascript:void(0);"  role="tab" >'+W.T.SVG('store',24,'#1274c0')+'<span class="vl-sp">Chats</span><i class="badge _gbtn"></i></a>',onclick:''});
tab.push({a:'<a href="javascript:void(0);"  role="tab" >'+W.T.SVG('store',24,'#1274c0')+'<span class="vl-sp">ShortList</span><i class="badge _gbtn"></i></a>',onclick:''});
tab.push({a:'<a href="javascript:void(0);"  role="tab" >'+W.T.SVG('store',24,'#1274c0')+'<span class="vl-sp">Suggestion</span><i class="badge _gbtn"></i></a>',onclick:''});
tab.push({a:'<a href="javascript:void(0);"  role="tab" >'+W.T.SVG('store',24,'#1274c0')+'<span class="vl-sp">Info</span><i class="badge _gbtn"></i></a>',onclick:''});
tab.push({a:'<a href="javascript:void(0);"  role="tab" >'+W.T.SVG('store',24,'#1274c0')+'<span class="vl-sp"Members</span><i class="badge _gbtn"></i></a>',onclick:''});
     


     var top = W.T.TabLayout(tab,[],tabsetting);
     var mid =  '<div class="block _Bdy bg_6" >mid</div>';
     var foot = '<div class="block _Bdy bg_7" >foot </div>';


ch+=   W.T.wrap(top,mid,foot);
 
   var newView=W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>');   
   



           W.U('#page').html(newView);


 })(wowrol);
 /*
 
 var limit=6;
       for(var q=0;q< limit;q++){
      tabList[q]='<a   href="javascript:void(0);"  role="tab" >'+W.T.SVG('setting',24,'#1274c0')+'<span class="vl-sp">Tab '+q+'</span><i class="badge _gbtn">s</i></a>';   
       }


        for(var q=0;q< limit;q++){

  var top = '';
     var mid =  '<div class="block _Bdy bg_6" >mid Tab  '+q+'</div>';
     var foot = '<div class="block _Bdy bg_7" >foot </div>';

     var BottomFixWrap = W.T.BottomFixWrap(top,mid,foot);
     tabContent[q]='<div role="tabpanel" class="tab-pane" >'+BottomFixWrap+'</div>';   
       }
 
 */