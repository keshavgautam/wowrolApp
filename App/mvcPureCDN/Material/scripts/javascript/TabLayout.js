/*
* page set up 2
*/
; (function(W){
   "use strict";
         var ch='';
     var tabList=[];  var tabContent=[];
       var setting={
      TabcssClass:{0:' header-link bg_0 fg_4',1:'',2:''},
      TabContentcssClass:{0:'carousel-inner po-re bg_2 fg_4',1:'',2:''} ,   
      menuLinecolor: '#ff3333',
      itemWidth :100,
      TabPlacement :'top'
    
       };
       var limit=5;
  for (var q = 0; q < limit; q++) {
        tabList[q] = '<a href="javascript:void(0);"  role="tab" >' + W.T.SVG('setting', 24, '#1274c0') + '<span class="vl-sp">Tab ' + q + '</span><i class="badge _gbtn">s</i></a>';

     }


 for (var q = 0; q < limit; q++) {
       tabContent[q] = '<div class="block"  >' + W.T.DummyDiv(q) + '</div>';

     }

   ch+=  W.T.TabLayout(tabList,tabContent,setting);

  
     var newView='<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>';   
   

     W.U.ccbk.Run(W.U.Page,'materialpleaseinsert',newView); 


})(wowrol);