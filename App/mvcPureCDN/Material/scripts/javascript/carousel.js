 (function (W) {
     "use strict";

     var ch = '';
     var tabList = [];

     var setting = {
         ulClass: 'header-link bg_0 fg_4',
         tabLiClass: '',
         data: {
             name: 'demoListtab',
             activeIndex: 0
         }
     };
     var limit = 50;
     for (var q = 0; q < limit; q++) {
         tabList[q] = '<a href="javascript:void(0);"  role="tab" >' + W.T.SVG('setting', 24, '#1274c0') + '<span class="vl-sp">Tab ' + q + '</span><i class="badge _gbtn">s</i></a>';
     }


     ch += W.T.CarouselLayout(tabList, setting);

     ch += '<div class="block _bdy"><div class="block form-piece"> <div class="input-group"> <input type="text" class="form-mold" id="updatetext" value="0" ><span class="input-group-btn"><button class="btn " type="button" data-junction="updatetexttab">update!</button> </span></div><!-- /input-group --></div></div>';
     W.U.JunctionAdd(W.A.page.AppId, 'updatetexttab', function () {

         this.Node.onclick = function () {
             var value = W.U.intval(document.getElementById('updatetext').value);

   
     var event = jQuery.Event('update');
                event.activeIndex = value;
                $( W.U.id('carousel.demoListtab')).triggerHandler(event);

         }
     }, {});

     ch += '<div class="block _bdy">---showbar---</div>';
     //--------------------
     var tabList = [];

     var setting = {
         ulClass: ' bg_0 fg_4',
         tabLiClass: '',
         data: {
             name: 'demoListtab2',
             itemType: 'showbar',
             activeIndex: 0
         }
     };

     for (var q = 0; q < limit; q++) {
         tabList[q] = '<div class="block" role="tab" >' + W.T.DummyDiv() + '</div>';
     }


     ch+=  W.T.CarouselLayout(tabList,setting);
     ch += '<div class="block _bdy">---slide---</div>';
     //--------------------
     var tabList = [];

     var setting = {
         ulClass: ' bg_0 fg_4',
         tabLiClass: '',
         data: {
             name: 'demoListtab3',
             itemType: 'slide',
             activeIndex: 0
         }
     };

     for (var q = 0; q < limit; q++) {
         tabList[q] = '<div class="block" role="tab" >' + W.T.DummyDiv() + '</div>';
     }


   ch+=  W.T.CarouselLayout(tabList,setting);
     var newView = W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block" >' + W.T.Pane(W.T.wrap('', ch)) + '</div>');




     W.U('#page').html(newView);


 })(wowrol);