

   /*
* page set up 2
*/
; (function(W){
   "use strict";

 var ch = '<div class="block _bdy">';  var limit =4;
   ch += '<div class="block _bdy ">---========---</div>';

   ch+='';
         ch += '<div class="block _bdy"><div class="block form-piece"> <label class="" for="sample1">TASK ID</label><select class="form-mold" id="taskid" ><option value="0">update</option> <option value="1"  selected="selected">additem</option><option value="2" >removeitem</option> <option value="3" >addpage</option> </select><!-- /input-group --></div></div>';
        ch += '<div class="block _bdy"><div class="block form-piece"> <label class="" for="sample1">demo ID</label><select class="form-mold" id="demoid" ><option >0</option> <option >1</option> <option selected="selected">2</option> <option>3</option> <option>4</option> <option>5</option> </select><!-- /input-group --></div></div>';

      ch += '<div class="block _bdy"><div class="block form-piece"> <div class="input-group"> <input type="number" class="form-mold" id="updatetext" value="0" ><span class="input-group-btn"><button class="btn " type="button" data-junction="updatetexttab">update!</button> </span></div><!-- /input-group --></div></div>';
     W.U.JunctionAdd(W.A.page.AppId, 'updatetexttab', function () {

         this.Node.onclick = function () {
             var value = W.U.intval(document.getElementById('updatetext').value);
             var demoid=W.U.intval(document.getElementById('demoid').value);
              var taskId = W.U.intval(document.getElementById('taskid').value);
   if(taskId==0){
      W.U.WhirlgigUpdate('Whirlgig_'+demoid,value);
   }
    if(taskId==1){
     W.U.WhirlgigAddItem ('Whirlgig_'+demoid,W.T.DummyDiv('AddedITem'),value);
   }
    if(taskId==2){
      W.U.WhirlgigRemoveItem ('Whirlgig_'+demoid,value);
   }
     if(taskId==3){
         var liItems=[];

         for(var i=0;i<4;i++){
           liItems.push( W.T.DummyDiv('AddedITem in page id='+i));
         }

     W.U.WhirlgigAddPage ('Whirlgig_'+demoid,liItems,value);
   }
         }
     }, {});



     //-------
      ch += '<div class="block _bdy ">---========---</div>';



  ch += '<div class="block" data-junction="Whirlgig_3" ></div>';
 var TranseData={

                ifo: { Afiatr: {}, Cfiatr: {}, Mfiatr: {},Sort:'',cid: 22},
                 name:'categoryListing'
            };

var Template= function(x){
     var ch = '';
      ch+='<div class="block  bg_0 bs-1" style="height: 350px;" >'+W.T.C.C2_Prductcard(x)+'</div>';
 return ch;
}
   var autoUpdatelistData={

               name:'categoryListing',
               Template:Template
            };
   var setting={
      autoUpdatelistData:autoUpdatelistData,
      TranseData:TranseData,
      type:'autoupdate_list',
       name:'Whirlgig_3',
       itemWidth:100,
       itemResponsive : false,
       control : true,
       pagination : true,
       controlTemplatebtn : ['<a class="left slider-control-btn " href="javascript:void(0);" role="button" > <span  class="icon-prev" aria-hidden="true">'+W.T.SVG('backarrow',16,'#fff')+'</span>  </a>', '<a class="right slider-control-btn" href="javascript:void(0);" role="button" > <span class="icon-next"  aria-hidden="true">'+W.T.SVG('nextarrow',16,'#fff')+'</span>  </a>'],
      cssClass:{0:'bg_0 fg_4',1:'',2:''}
  };

   W.U.JunctionAdd(W.A.page.AppId, 'Whirlgig_3', function () {
        W.U.Whirlgig.bind({Node:this.Node,Value:this.data})();

     }, setting);
  ch += '<div class="block _bdy ">---========---</div>';



  ch += '<div class="block" data-junction="Whirlgig_2" ></div>';
   var items = [];
  for (var q = 0; q < limit; q++) {
         items[q] = '<div class="block"  >' + W.T.DummyDiv(q) + '</div>';
     }

  var setting={

     items:items,
      type:'list',
       name:'Whirlgig_2',
       itemWidth:200,
       itemResponsive : false,
       control : true,
       pagination : true,
      cssClass:{0:'bg_0 fg_4',1:'',2:''}
  };

   W.U.JunctionAdd(W.A.page.AppId, 'Whirlgig_2', function () {
        W.U.Whirlgig.bind({Node:this.Node,Value:this.data})();

     }, setting);


        ch += '<div class="block _bdy ">---========---</div>';



  ch += '<div class="block" data-junction="Whirlgig_1" ></div>';
   var items = []; var images = ['http://localhost:64120/jquery%20plgin/OwlCarousel-master/OwlCarousel-master/demos/assets/fullimage1.jpg','http://localhost:7891/acimg/photos/eyJmaWxlIjoiaHR0cDovL2xvY2FsaG9zdDo3ODkxL2FiaW1nLy9waG90b3MvcmNpRTYxMjhvcmlnaW5hbC5qcGVnIiwid2lkdGgiOjYwMCwiaGVpZ2h0Ijo2MDAsInR5cGUiOiJzbGlkZXIifQ==.jpg','http://localhost:7891/acimg/photos/eyJmaWxlIjoiaHR0cDovL2xvY2FsaG9zdDo3ODkxL2FiaW1nLy9waG90b3MvcmNpSHUxMjdvcmlnaW5hbC5qcGVnIiwid2lkdGgiOjYwMCwiaGVpZ2h0Ijo2MDAsInR5cGUiOiJzbGlkZXIifQ==.jpg','http://localhost:7891/acimg/photos/eyJmaWxlIjoiaHR0cDovL2xvY2FsaG9zdDo3ODkxL2FiaW1nLy9waG90b3MvcmNpSW8xMjlvcmlnaW5hbC5qcGVnIiwid2lkdGgiOjM1MCwiaGVpZ2h0IjozNTAsInR5cGUiOiJzbGlkZXIifQ==.jpg'];
  for (var q = 0; q < limit; q++) {
     // items[q] = '<img class="img-responsive m0_auto" src="'+ images[Math.floor(Math.random()*images.length)]+'" alt="The Last of us">';
    items[q] = '<div class="block"  >' + W.T.DummyDiv(q) + '</div>';
     }

  var setting={
     items:items,
     name:'Whirlgig_1',
      type:'Carousel',
      singleItem : true,
      pagination : true,
      control : true,
      cssClass:{0:'carousel-inner po-re bg_2 fg_4',1:'',2:''}

  };

   W.U.JunctionAdd(W.A.page.AppId, 'Whirlgig_1', function () {
        W.U.Whirlgig.bind({Node:this.Node,Value:this.data})();

     }, setting);
     //-------
      ch += '<div class="block _bdy ">---========---</div>';


  ch += '<div class="block" data-junction="Whirlgig_0" ></div>';
   var items = [];
  for (var q = 0; q < limit; q++) {
         items[q] = '<a href="javascript:void(0);"  role="tab" >' + W.T.SVG('setting', 24, '#1274c0') + '<span class="vl-sp">Tab ' + q + '</span><i class="badge _gbtn">s</i></a>';

     }

  var setting={
     items:items,
     name:'Whirlgig_0',
     type:'tablist',
     cssClass:{0:' header-link bg_0 fg_4',1:'',2:''},
     itemWidth :100
  };

   W.U.JunctionAdd(W.A.page.AppId, 'Whirlgig_0', function () {
        W.U.Whirlgig.bind({Node:this.Node,Value:this.data})();

     }, setting);



 var setting={
     items:items,
       name:'Whirlgig_4',
      type:'tabsimple',
      cssClass:{0:' header-link bg_0 fg_4',1:'',2:''},
      itemWidth :100
  };

   var Jid=  W.U.J(function(){

            W.U.Whirlgig.bind({Node:this.Node,Value:this.data})();


        },setting);

  ch += '<div class="block" data-junction="'+Jid+'" ></div>';

ch+='</div>';

   var newView='<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>';


     W.U.ccbk.Run(W.U.Page,'materialpleaseinsert',newView);

 W.U.resize();
})(wowrol);
