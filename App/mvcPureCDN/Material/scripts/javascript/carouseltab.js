;(function (W) {
 "use strict";

      var ch = '';
     var tabList = [];
    var tabContent = [];
     var tabsetting = {
         ulClass: 'header-link bg_0 fg_4',
         tabLiClass: '',
         data: {
             name: 'demotabList2',
             activeIndex: 0
         }
     };
     var limit = 5;
     for (var q = 0; q < limit; q++) {
         tabList[q] = '<a href="javascript:void(0);"  role="tab" >' + W.T.SVG('setting', 24, '#1274c0') + '<span class="vl-sp">Tab ' + q + '</span><i class="badge _gbtn">s</i></a>';
     }



 var tabContentsetting = {
         ulClass: ' bg_0 fg_4',
         tabLiClass: '',
         data: {
             name: 'demotabContent1',
             itemType: 'slide',
             activeIndex: 0,
              mouse:false
         }
     };

     for (var q = 0; q < limit; q++) {
       tabContent[q] = '<div class="block" role="tab" >' + W.T.DummyDiv() + '</div>';
     }



  ch+=  W.T.CarouselTabLayout(tabList,tabContent,tabsetting,tabContentsetting);
    var newView = W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block">' + W.T.Pane(W.T.wrap('', ch)) + '</div>');




     W.U('#page').html(newView);

 })(wowrol);