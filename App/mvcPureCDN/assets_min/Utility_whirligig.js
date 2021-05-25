/*
* Whirlgig
*/
; (function (W) {
    "use strict";
 var bank=[];
 function AddInBank(Name,Node){

        bank[Name]=Node;
 }
 function GetFromBank(Name){
     var Node=null;
    if(typeof bank[Name] != 'undefined'){
      Node= bank[Name] ;
  }
    return Node;
 }



    function Whirlgig() {



 var drag={
diffXLeft: 0,
diffXRight: 0,
Left: 0,
maxLeft:0,
minLeft:10,
newPosX:0


 };


  var state={
    	isTouchStart: false,
        isSwiping: false,
        IsOuterUpdate : false,
        IsAddedItem : false,
        moveDirection:"right",
        activeIndex:0,
        activePage:0,
        Totalpage:0,
        TotalIndex:0
 };
 var Widths={
     item:0,
     wrap:0,
     Node:0
 }
 var TranseData={

                ifo: { },  //info
               bypass: 0,
                result: [],  //all retrived data will stored in this varible
                fr: 0,  //fire
                slcid: '',  //selected id
                sstr: '',  //search str
                ps: 3,  //pagesize
                tp: 1,  //total page
                tr: 1,  //total result
                pgd: 1   //paged
            };
var autoUpdatelistData={
    name:'',
    LoadingIndex:0,
    Template:function(x){return'';},
    Loadingblock:function(x){   var ch = '<div class="block   " ><div class="block" style="min-height:200px;" ></div>';
                ch += '<div class="block m0_auto" style="width:50px;height:50px;" > '+ W.U.loading_svg(30,3,600)+' </div>';
                ch += '</div>';

                return ch;},
    Fallbackblock:function(x){return '<div clas="block al-c "><h1 class="m30_0">Fallback block</h1><div>';},
    Pagingblock:function(){ return '<div class="block _bdy m_b5 m_t10"><div class="block" style="min-height:200px;" ></div><button type="button" class="btn   btn-block" data-paging="paging"  >Load More</button></div>';},
    tile:''
};


 function Handler(Node,Options){
      this.Node=Node;
      this.Options = W.U.extend(Handler.Defaults, Options);
      this.Options.autoUpdatelistData = W.U.extend(autoUpdatelistData, this.Options.autoUpdatelistData);
      this.Options.TranseData = W.U.extend(TranseData, this.Options.TranseData);


      AddInBank(this.Options.name,this);
      this.Node.style.opacity = 0;

      this.state=state;
      this.drag=drag;
      this.ItemPositionArr =this.PagePositionArr= [];
     this.TeplateNode=  this.initTemplate();


     //--

     if(W.U.isFunction(this.Options.ContainerSize[0])){
    this.Options.ContainerSize[0]=this.Options.ContainerSize[0].bind(this)();
     }

   setTimeout(this.init.bind(this),200);


   var _this=this;

         W.U.windowresize.Add(function(){

           setTimeout(_this.init.bind(_this),100);
      });


 }


    /**
     * Default options for the carousel.
	 * @public
	 */
 Handler.Defaults={
   items : [],
   name : W.U.uId(),
   itemOnscreen : [[0, 1], [320, 2], [700,3],  [1000,4], [1200, 6], [1600, 8]],
   itemResponsive : true,
   itemWidth : 250,
   ContainerSize : [$('#page').find('.container ').width(),300],// $('#page').find('.main_pane ').width()
   type:'tablist',// tablist | Carousel |list
    activeIndex:0,
   singleItem : false,
  	menuLinecolor: '#fff',
    menuLine:true,
   slideSpeed : 200,
   rewindSpeed : 1000,

   autoPlay : false,
   stopOnHover : false,
   pagination : false,
   control : false,
   controlTemplatebtn : ['<a class="left slider-control-btn " href="javascript:void(0);" role="button" > <span  class="icon-prev" aria-hidden="true">'+W.T.SVG('backarrow',16,'#fff')+'</span>  </a>', '<a class="right slider-control-btn" href="javascript:void(0);" role="button" > <span class="icon-next"  aria-hidden="true">'+W.T.SVG('nextarrow',16,'#fff')+'</span>  </a>'],

   cssClass:{0:'',1:'',2:''},
   TeplateNode    :                  {wrap:null,
                                        menucon:null,
                                        pagination:null,
                                        control:null
                                        },
TranseData:TranseData,

     TabId:W.U.uId(),
   isItemhover:false,
   isUpdateInit:false,
   onItemclick: function () { /* ////W.U.console(this) */},
   onItemhover: function () { /* ////W.U.console(this) */},
   onRander: function () { /* ////W.U.console(this) */},
   onRanderAdditems: function () { /* ////W.U.console(this) */}

 };

     Handler.prototype.init = function () {

    this.itemReOrder();
    this.calculateWidth();
    this.checkBrowser();
    this.setItemPosition();

       if(this.Options.type=="tabsimple"){
        //   debugger;
       }
    $( this.TeplateNode.wrap).css({width:  this.Widths.wrap   ,opacity:1 });

    if(this.state.IsAddedItem){
         var _this=this;
      setTimeout(function(){
           $( _this.TeplateNode.wrap).children().css({width:_this.Widths.item });

           _this.BringInView(_this.activeIndex) ;
      },1000);
    }else{
      $( this.TeplateNode.wrap).children().css({width:this.Widths.item });
    }




      if(this.Options.type=="list"||this.Options.type=="Carousel"){
     //     var height= (2/3)*(this.Options.ContainerSize[0] );
 //  $( this.TeplateNode.wrap).css({height:height  });
   //  $( this.TeplateNode.wrap).children().css({height:height   });
       }


    this.BuildComponent();
  this.updateComponent(0,0);

      //   //W.U.console(this);

      if(this.Widths.wrap>=this.viewport()||this.Options.type=="Carousel"){
         this.TouchInit ();
      }


        this.Node.style.opacity = 1;

    // $( this.TeplateNode.wrap).children().css({ display:"block"});

       if(this.Options.type=="autoupdate_list"&&this.Options.TranseData.bypass==0){
   this.Options.TranseData.bypass=1;
      this.LoadData();

     }

         }





//--width
 Handler.prototype.calculateWidth = function () {
     var ItemWidth=this.getItemWidth();
     var wrapWidth;

     var itemOnscreen= this.getitemOnscreen();
 itemOnscreen=(itemOnscreen==0)?1:itemOnscreen;
     var pageWidth=this.viewport();


     if(this.Options.type=='list'||this.Options.type=='autoupdate_list'){
          if(!this.Options.itemResponsive){

         ItemWidth=(pageWidth/itemOnscreen);
   wrapWidth=ItemWidth*(this.Options.items.length);
     }

     }
     if(this.Options.type=='Carousel'){

         ItemWidth=pageWidth;
   wrapWidth=ItemWidth*(this.Options.items.length);
     //  ItemWidth=((100/this.Options.items.length))+'%';
  // wrapWidth=100*(this.Options.items.length)+'%';
     }

      if(this.Options.type=="tablist"||this.Options.type=="tabsimple"){
    pageWidth=ItemWidth;
  wrapWidth=ItemWidth*(this.Options.items.length);
     }


    this.Widths={
     item:ItemWidth,
     wrap: wrapWidth,
      page :pageWidth ,
     Node:0
 };

 if(!this.Options.isUpdateInit){

  this.state.activeIndex=0
  this.state.activePage=0;
 }


  this.state.TotalIndex=this.Options.items.length;
  this.state.Totalpage=Math.ceil(( this.state.TotalIndex/itemOnscreen));


         }
   Handler.prototype.getItemWidth = function () {


       var W=(this.Options.singleItem)?this.viewport():this.Options.itemWidth;

       if(this.Options.type=="Carousel"){
         W=  (this.viewport()>this.TeplateNode.wrap.offsetWidth)?this.TeplateNode.wrap.offsetWidth:this.viewport();
       }

         if( W==0){

         W= this.viewport();
       }


   return W;
         }
Handler.prototype.getitemOnscreen =function(){
    var item=0;
    var itemOnscreen=this.Options.itemOnscreen;

    for(var q in itemOnscreen){
       if(this.Options.ContainerSize[0]>=itemOnscreen[q][0]){
           item=itemOnscreen[q][1];
       }
    }

    if(this.Options.singleItem){
        item=1;
    }
      if(this.Options.type=="list"){
  if(!this.Options.itemResponsive){
      //W.U.console('item B'+item);
         item=this.correctOnscreenItem(this.Options.items.length);
             //W.U.console('item A'+item);
       }else{
           item=this.correctOnscreenItem(item);
       }
       }



    return item;

}
/*@des correct the width if onscrren with is grather than viewport
*/
Handler.prototype.correctOnscreenItem=function(item){


   var PageWidth=(this.getItemWidth()*item);
   //W.U.console('(this.getItemWidth()*item) >'+PageWidth +' this.viewport() '+this.viewport());
      if((PageWidth)>this.viewport()){
      if(item>0){
         item--;
          item= this.correctOnscreenItem(item);
      }
  }
  return item;
}


Handler.prototype.correctDragLeft=function(){
          this.drag.Left = (  this.drag.Left > this.drag.minLeft) ? this.drag.minLeft :   this.drag.Left;
    this.drag.Left = (  this.drag.Left < this.drag.maxLeft) ? this.drag.maxLeft :     this.drag.Left;

}

/** var drag={
diffXLeft: 0,
diffXRight: 0,
Left: 0,
maxLeft:0,
minLeft:0,
newPosX:0


 };
	 * Gets viewport width.
	 * @protected
	 * @return {Number} - The width in pixel.
	 */
 Handler.prototype.viewport = function() {

		var width=  this.Options.ContainerSize[0];
        if(width<=0){
        width=   $(this.Node).parents('.container ').width();

        }
          if(width<=0){
        width=   $(this.Node).parents('.main_pane ').width();
     // width=width-20;
        }

	/*	if (this.Node !== window) {
			width =$('#page').find('.main_pane ').width();
         ////W.U.console(width);
		} else if (window.innerWidth) {
			width = window.innerWidth;
		} else if (document.documentElement && document.documentElement.clientWidth) {
			width = document.documentElement.clientWidth;
		} else {
			throw 'Can not detect viewport width.';
		}*/
		return width;
	};
//--width
//-- TouchInit
  Handler.prototype.TouchInit = function () {
   this.drag.maxLeft=-(this.Widths.wrap  - this.Node.offsetWidth);

  this.drag.minLeft=0;



  var _this = this;
  var IsMouseEvent=(W.I.wf=="mob")?true:false;
    W.U.Mouse(this.TeplateNode.wrap, {
            mouse: IsMouseEvent,
            clicksAllowed:false,
            start: function (event, start) {
                $(_this.TeplateNode.wrap).addClass('grab');
              _this.state.isTouchStart=true;
             _this.state.IsOuterUpdate = false;
                ////W.U.console(' IsActiveStart =' +    this.IsActiveStart);
            },
            move: function (event, start, diff, speed) {
    if(  _this.state.isTouchStart){
                _this.Touch(event, start, diff, speed, 'move');
    }
            },
            end: function (event, start, diff, speed) {
               $(_this.TeplateNode.wrap).removeClass('grab');
        if( _this.state.isTouchStart){

                  _this.Touch(event, start, diff, speed, 'end');
          _this.TouchEndRun();
               _this.drag.diffXLeft= 0;
            _this.drag.diffXRight = 0;
              _this.state.isTouchStart=false;


                }


            }
        });

         }

 Handler.prototype.Touch = function (event, start, diff, speed, type) {

  if (this.state.isSwiping == false||type=='end') {
       var travalLimit=(diff.x<0)?-(diff.x):diff.x;

   if (((diff.y > -5 && diff.y < 5 &&travalLimit>5)||(type=='end'&&speed.x!=0))) {
  // //W.U.console('--------started ----------');
  this.state.isSwiping=true;
  this.drag.newPosX=   diff.x;
    ////W.U.console(' this.drag.Left before =' +  this.drag.Left);
      if (diff.x > 0) {//right

                    var diffX = (diff.x -  this.drag.diffXRight);
                     this.drag.diffXRight = diff.x;
                   this.state.moveDirection="right"
                } else { //left

                    var diffX = (diff.x - this.drag.diffXLeft);

                     this.drag.diffXLeft = diff.x;
                       this.state.moveDirection="left"
                }

     this.drag.Left = (this.drag.Left + diffX);



      this.correctDragLeft();

   ////W.U.console(' this.drag.Left after =' +  this.drag.Left);
    ////W.U.console('   this.state.moveDirection =' +    this.state.moveDirection);



     switch(this.Options.type){
    case 'tablist':
         this.changePos( this.drag.Left, speed.x);
    break;
  case 'list':

        if(type=="end"){
         if(this.Options.pagination||this.Options.control){
               this.closestPage();
      this.GoToPage(this.state.activePage );
        this.ccbk(this.state.activePage);//for callback
            }

       }else{
            this.changePos( this.drag.Left, speed.x);
       }
    break;
      case 'autoupdate_list':

        if(type=="end"){
         if(this.Options.pagination||this.Options.control){
               this.closestPage();
      this.GoToPage(this.state.activePage );
          this.ccbk(this.state.activePage);//for callback
            }

       }else{
            this.changePos( this.drag.Left, speed.x);
       }
    break;
  case 'Carousel':
       if(type=="end"){

             this.closestPage();
          this.GoToPage(this.state.activePage );
     this.ccbk(this.state.activePage);//for callback
       }else{

            this.changePos( this.drag.Left, speed.x);
       }

    break;
}





   this.state.isSwiping=false;
            }




  }


         }

Handler.prototype.TouchEndRun = function () {


         }

//-- TouchInit

//--Update position
 Handler.prototype.changePos = function (pos, speed) {
        var time = speed?speed+'ms':'';







      if (this.browser.support3d) {

     $(this.TeplateNode.wrap).css(  Handler.SpeedCss(speed));
      $(this.TeplateNode.wrap).css(  Handler.translate3d(pos));


        } else {
        this.TeplateNode.wrap.style.left=  pos + 'px';
        }

        this.updateComponent(pos, speed);
    }

 Handler.prototype.BringInView = function (index) {
        index=(index> this.state.TotalIndex)?( this.state.TotalIndex-1):index;
        index=(index<0)?0:index;
       this.state.activeIndex=index;
         this.drag.Left =  this.ItemPositionArr[index ];




  //view port fector
         if(this.state.IsOuterUpdate==true){
           this.drag.Left+=((this.viewport()-this.Widths.item)/2);
         }
   this.correctDragLeft();
              this.changePos(this.drag.Left, 500);

              this.TouchEndRun();
         }
 Handler.prototype.GoToPage= function (page) {
        page=(page> this.state.Totalpage)?( this.state.Totalpage):page;
        page=(page<0)?0:page;
      this.state.activePage=page;
         this.drag.Left =  this.PagePositionArr[page ];
         // //W.U.console('page  '+page);
         //   //W.U.console('left '+this.drag.Left);
         //  //W.U.console('maxLeft '+this.drag.maxLeft);

   this.correctDragLeft();
    ////W.U.console('left '+this.drag.Left);
              this.changePos(this.drag.Left, 800);

              this.TouchEndRun();
         }

Handler.prototype.UpdateTabMenuLine=function(){

     var LiITems=  this.TeplateNode.wrap.childNodes;
 var index = this.state.activeIndex;

  // //W.U.console('this.state.activeIndex '+this.state.activeIndex);
           var    width = -this.ItemPositionArr[index],
              top =  - 3,
             left = 0;

         //   //W.U.console('this.state.activeIndex'+this.state.activeIndex);

                 var ulLeft= this.TeplateNode.wrap.offsetLeft;

                 width = (-this.ItemPositionArr[index+1] + this.ItemPositionArr[index]);
                 left = (-this.ItemPositionArr[index]);

  //  //W.U.console('-this.ItemPositionArr[index+1] + this.ItemPositionArr[index]= '+this.ItemPositionArr[index+1]+'+'+ this.ItemPositionArr[index]);


         //   //W.U.console('width menu line'+  width);




             $( this.TeplateNode.menucon).children().css({width:width,top:top,left:left,'background-color':this.Options.menuLinecolor});

}

//--Update position


//-- whirligig data
Handler.prototype.setItemPosition=function(){
    var LiITems=  this.TeplateNode.wrap.childNodes;
    var left=0;
      for (var q = 0; q < LiITems.length; q++) {
        this.ItemPositionArr[q] = -left;

          left+=  this.Widths.item;
       this.clickPass(LiITems[q],q);

      }

      //for pageposition Arr
          var left=0;
      for (var q = 0; q <= this.state.Totalpage; q++) {
       this.PagePositionArr[q] = -left;

          left+=  this.Widths.page;

      }


}



Handler.prototype.closestItem = function () {
        var itemArr=   this.ItemPositionArr,
        base=this,
        itemlength=(itemArr.length-1),
        goal=this.drag.newPosX,
        closest = null
        ;
          //W.U.console('this.state.moveDirection =' +  this.state.moveDirection);
      //W.U.console('goal =' +    goal);
      //W.U.console(' this.state.activeIndex '+ this.state.activeIndex);

      var goalLimit=(.1*this.Widths.item);

         //W.U.console('goalLimit '+goal<-goalLimit);
          //W.U.console( goal+'<-'+goalLimit+' (    this.state.moveDirection === "left"&&goal<-goalLimit)');
        if (    this.state.moveDirection === "left"&&goal<-goalLimit) {

       this.state.activeIndex++;
         if(     this.state.activeIndex>itemlength){
              this.state.activeIndex= itemlength;
         }

      }else if (  this.state.moveDirection === "right"&&goal>goalLimit) {

              this.state.activeIndex --;
        if(     this.state.activeIndex<0){
                this.state.activeIndex= 0;
         }
      }
         //W.U.console('  this.state.activeIndex after '+  this.state.activeIndex);

         }
Handler.prototype.closestPage = function () {

    var goal=this.drag.newPosX;
    var goalLimit=(.1*this.Widths.page);


        if (    this.state.moveDirection === "left"&&goal<-goalLimit) {

       this.state.activePage++;
         if(     this.state.activePage>=this.state.Totalpage){
              this.state.activePage= (this.state.Totalpage-1);
         }

      }else if (  this.state.moveDirection === "right"&&goal>goalLimit) {

              this.state.activePage --;
        if(     this.state.activePage<=0){
                this.state.activePage= 0;
         }
      }


         }




//--whirligig data


Handler.prototype.checkBrowser = function () {
            var base = this,
                translate3D = "translate3d(0px, 0px, 0px)",
                tempElem = document.createElement("div"),
                regex,
                asSupport,
                support3d,
                isTouch;

            tempElem.style.cssText = "  -moz-transform:" + translate3D +
                                  "; -ms-transform:"     + translate3D +
                                  "; -o-transform:"      + translate3D +
                                  "; -webkit-transform:" + translate3D +
                                  "; transform:"         + translate3D;
            regex = /translate3d\(0px, 0px, 0px\)/g;
            asSupport = tempElem.style.cssText.match(regex);
            support3d = (asSupport !== null && asSupport.length === 1);

            isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;

            base.browser = {
                "support3d" : support3d,
                "isTouch" : isTouch
            };
        },









Handler.prototype.initTemplate = function () {
      var ch='';var tablist='';var ret={wrap:null,
                                        menucon:null,
                                        pagination:null,
                                        control:null
                                        };

      for( var q in this.Options.items){

tablist+='<div class="li ov-hi'+ this.Options.cssClass[1]+'">'+this.Options.items[q]+'</div>';


}

switch(this.Options.type){

    case 'tablist':
    ch='<div class="block ov-hi po-re"><div class="block ul ul-menu '+ this.Options.cssClass[0]+' ">'+tablist+'</div><div class="block po-re" ></div></div>';
       var  Node=W.U.Rander(ch);
  var  childNodes=Node[0].childNodes;
                                   ret={wrap:childNodes[0],
                                        menucon:childNodes[1],
                                        pagination:null
                                        };

         W.U.Setview(this.Node,Node,'html');
             //  this.Node.innerHTML='';
              // this.Node.appendChild(Node);
    break;
    case 'tabsimple':
    ch='<div class="block ov-aux"><div class="block ul ul-menu '+ this.Options.cssClass[0]+' ">'+tablist+'</div><div class="block po-re" ></div></div>';
       var  Node=W.U.Rander(ch);
  var  childNodes=Node[0].childNodes;
                                   ret={wrap:childNodes[0],
                                        menucon:childNodes[1],
                                        pagination:null
                                        };

         W.U.Setview(this.Node,Node,'html');
             //  this.Node.innerHTML='';
              // this.Node.appendChild(Node);
    break;
  case 'list':
    ch='<div class="block ov-hi po-re"><div class="block ul ul-menu '+ this.Options.cssClass[0]+'">'+tablist+'</div><div ></div><div ></div></div>';
            var  Node=W.U.Rander(ch);
  var  childNodes=Node[0].childNodes;
                                   ret={wrap:childNodes[0],
                                        menucon:null,
                                      pagination:childNodes[2],
                                          control:childNodes[1]
                                        };
 W.U.Setview(this.Node,Node,'html');
    break;
  case 'autoupdate_list':
    ch='<div class="block ov-hi po-re"><div class="block ul ul-menu '+ this.Options.cssClass[0]+'">'+tablist+'</div><div ></div><div ></div></div>';
            var  Node=W.U.Rander(ch);
  var  childNodes=Node[0].childNodes;
                                   ret={wrap:childNodes[0],
                                        menucon:null,
                                      pagination:childNodes[2],
                                          control:childNodes[1]
                                        };
 W.U.Setview(this.Node,Node,'html');
    break;

  case 'Carousel':
     ch='<div class="block ov-hi po-re"><div class="block ul ul-menu '+ this.Options.cssClass[0]+'">'+tablist+'</div><div class="block po-re"></div><div ></div></div>';
             var  Node=W.U.Rander(ch);
  var  childNodes=Node[0].childNodes;
                                   ret={wrap:childNodes[0],
                                        menucon:null,
                                        pagination:childNodes[1],
                                        control:childNodes[2]
                                        };
 W.U.Setview(this.Node,Node,'html');
    break;
}





return  ret;

         }

Handler.prototype.BuildComponent=function (){
    //buliding important  thing
this.controlbtn  =[W.U.Rander(this.Options.controlTemplatebtn[0]),W.U.Rander(this.Options.controlTemplatebtn[1])];
var indicators=$('<ol class=\"carousel-indicators\" >');
var _this=this;

  function __GoTo(){

               _this.GoToPage((this.q));
          _this.ccbk(this.q);//for callback
          }

 for (var q = 0; q <this.state.Totalpage; q++) {

     var libtn=$('<li ></li>');
     libtn.get(0).onclick=__GoTo.bind({libtn:libtn,q:q});
          if((q+1)==this.state.activePage){
               libtn.addClass("active");
          }

     indicators.append(libtn);

      }

if(this.Options.type=='Carousel'||this.Options.type=="list"||this.Options.type=="autoupdate_list"){

 if(this.Options.pagination){
         this.TeplateNode.pagination.innerHTML='';
        $(this.TeplateNode.pagination).append( indicators);
      }

if(this.Options.control){
          this.TeplateNode.control.innerHTML='';
          this.controlbtn[0][0].onclick=function(){
              _this.state.moveDirection="right";
                _this.drag.newPosX=(.2*  _this.Widths.page);
                _this.closestPage();
                 _this.GoToPage(_this.state.activePage);
                   _this.ccbk(_this.state.activePage);//for callback
          }
          this.controlbtn[1][0].onclick=function(){
               _this.state.moveDirection="left";
                 _this.drag.newPosX=-(.2*  _this.Widths.page);
                  _this.closestPage();
                 _this.GoToPage(_this.state.activePage);
  _this.ccbk(_this.state.activePage);//for callback
          }
        $(this.TeplateNode.control).append(this.controlbtn[0]);
         $(this.TeplateNode.control).append(this.controlbtn[1]);
      }


}

   if(this.Options.type=='tablist'||this.Options.type=='tabsimple'){
       var menuLine=$('<div  style="position: absolute;top: 0px;left: 0px;width: 0px; height: 3px;z-index: 1; background-color: #fff;-webkit-transition: all 0.25s ease-out;-moz-transition: all 0.25s ease-out;-ms-transition: all 0.25s ease-out;-o-transition: all 0.25s ease-out;transition: all 0.25s ease-out;"></div>');
 $(this.TeplateNode.menucon).append(menuLine);

}



}
Handler.prototype.updateComponent=function(pos, speed){

 //   //W.U.console('this.state.activePage '+this.state.activePage)
    if(this.Options.type=="list"||this.Options.type=="Carousel"||this.Options.type=="autoupdate_list"){
    //indication update
 if(this.Options.pagination){
    var pagination= W.U('ol',this.TeplateNode.pagination)[0];
       // //W.U.console(pagination);
    var indicater= pagination.childNodes[ this.state.activePage ];
    ////W.U.console(indicater);
      $(pagination).children().removeClass("active");
     $( indicater).addClass("active");
     }


if(this.Options.control){
 var controlbtn= W.U('a',this.TeplateNode.control);
      $(controlbtn[0]).show();
      $(controlbtn[1]).show();


    if(this.state.activePage==0){
       $(controlbtn[0]).hide();
    }
    if(this.state.activePage>=(this.state.Totalpage-1)){
       $(controlbtn[1]).hide();
     }


}
     }

    if(this.Options.type=='tablist'||this.Options.type=='tabsimple'){

 this.TeplateNode.menucon.style.left=  pos + 'px';

    this.UpdateTabMenuLine();
}

}

Handler.prototype.clickPass=function(li,pageIndex){
    var _this=this;
       //Stoping click event
       if(this.Options.type=="list"||this.Options.type=="Carousel"){
     //  this.TeplateNode.wrap.onclick=function(e){e.preventDefault(); return false;}
       }
         if(this.Options.type=="tablist"||this.Options.type=='tabsimple'){
        li.onclick=this.onTabclick.bind({li:li,pageIndex:pageIndex,_this:this});

        if(this.Options.isItemhover){
        li.onmouseover=this.onTabhover.bind({li:li,pageIndex:pageIndex,_this:this});
        }
       }
}
Handler.prototype.onTabclick=function(){
    var _this=this._this;


 _this.state.activeIndex=this.pageIndex;
       _this.UpdateTabMenuLine();

        _this.Options.onItemclick.bind(_this)();
  _this.ccbk(_this.state.activeIndex);//for callback
}
Handler.prototype.onTabhover=function(){
    var _this=this._this;


 _this.state.activeIndex=this.pageIndex;
       _this.UpdateTabMenuLine();

        _this.Options.onItemhover.bind(_this)();
  _this.ccbk(_this.state.activeIndex);//for callback
}


Handler.translate3d = function (pixels) {
            return {
                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "transform": "translate3d(" + pixels + "px, 0px,0px)"

            };
        }
Handler.SpeedCss = function (speed) {
       return {
                "-webkit-transition": "all " + speed + "ms ease",
                "-moz-transition": "all " + speed + "ms ease",
                "-o-transition": "all " + speed + "ms ease",
                "transition": "all " + speed + "ms ease"
            };
        }




Handler.prototype.outerupdate = function () {
            //W.U.console(' outer update');
             var _this=this.we,
                 type=this.type,
               index= this.id;
     _this.state.IsOuterUpdate=true;

   switch (_this.Options.type) {

           case 'tablist':
                 _this.BringInView(index);
                 break;
                  case 'tabsimple':
                 _this.BringInView(index);
                 break;
                case 'list':
                  _this.GoToPage(index);
                 break;
               case 'autoupdate_list':
                  _this.GoToPage(index);
                 break;
           case 'Carousel':
                  _this.GoToPage(index);
                 break;

             }


         //W.U.console(index);

         }



Handler.prototype.ManipulatItem=function(html,targetPosition,action,callback){
    var position;
    callback=(W.U.isFunction(callback))?callback:W.U.noop;

     position  = this.CorrectInsertingPosition(targetPosition);


/*
@Additem
-position for auto update list it add item in the end
*/
  if(action=='additem'){
  this.state.IsAddedItem=true;
  this.state.activeIndex=position;
   //this.state.activePage=position;

     this.Options.items.splice( position, 0, html);
      //making width pre large
  this.TeplateNode.wrap.style.width=(this.Widths.wrap + (this.Widths.item )) +'px';
     var mainblock=W.U.Rander('<div class="li ov-hi'+ this.Options.cssClass[1]+'" style="width: 0px;" >'+html+'</div>');
      var  newNode=mainblock[0];
      this.Options.onRanderAdditems.bind({mainblock:mainblock,_this:this})();
       this.Options.onRander.bind({mainblock:mainblock,_this:this})();
     callback.bind({mainblock:mainblock,_this:this})();
 //insertafter

  position  = this.CorrectInsertingPosition(position);
 var referenceNode= this.TeplateNode.wrap.childNodes[position];


    this.TeplateNode.wrap.insertBefore(newNode, referenceNode);
     this.Options.isUpdateInit=true;
    this.init();

  }

      if(action=='addpage'){

  this.state.IsAddedItem=true;
  this.state.activeIndex=position;
 //  this.state.activePage=position;


       if(W.U.isArray(html)){

        this.TeplateNode.wrap.style.width=(this.Widths.wrap + (html.length*this.Widths.item )) +'px';

        for(var q in html){
//position=  this.state.TotalIndex+parseInt(q);
this.state.TotalIndex++;
position=  this.state.TotalIndex;
this.state.activeIndex=position;
    this.Options.items.splice( position, 0, html[q]);
   var mainblock=W.U.Rander('<div class="li ov-hi'+ this.Options.cssClass[1]+'" style="width: 0px;" >'+html[q]+'</div>');
       var  newNode=mainblock[0];
      this.Options.onRanderAdditems.bind({mainblock:mainblock,_this:this})();
      this.Options.onRander.bind({mainblock:mainblock,_this:this})();
       callback.bind({mainblock:mainblock,_this:this})();
    //insertafter

  position  = this.CorrectInsertingPosition(position);
 var referenceNode= this.TeplateNode.wrap.childNodes[position];
     this.TeplateNode.wrap.insertBefore(newNode, referenceNode);

        }

 this.Options.isUpdateInit=true;
    this.init();
             //W.U.console(newNode);

          }else{

              console.info('Array is required for adding page in whirlgig'+ this.Options.name);
          }

  }

if(action=='removeitem'){

       delete(this.Options.items[position]);
  var  newNode=W.U.Rander('<div class="li ov-hi'+ this.Options.cssClass[1]+'"  ><div class="block al-c ">Removed</div></div>')[0];

  //W.U.console('this.Options.items= '+this.Options.items.length);
    //W.U.console('position= '+position);
 //insertafter
   position  = this.CorrectInsertingPosition(position);
 var referenceNode= this.TeplateNode.wrap.childNodes[position];
 this.TeplateNode.wrap.removeChild(referenceNode);
  this.Options.isUpdateInit=true;
    this.init();
}


       this.Options.isUpdateInit=false;

}
// this.CorrectInsertingPosition();
Handler.prototype.CorrectInsertingPosition=function( position){
     position=( position<=0)?0:position;
   position=( position>=(this.TeplateNode.wrap.childNodes.length))?this.state.TotalIndex:position;
  position=(  position<=this.state.TotalIndex)?position:this.state.TotalIndex;
  return  position;
}

Handler.prototype.itemReOrder=function(){
    var items=[],olditems=this.Options.items;
 var i=0;
          for(var q in olditems){
        items[i]=olditems[q];
        i++;
                  }
      this.Options.items= items;
}



//--loding data


Handler.prototype.LoadData=function(){

    var _this=this;
    var AUdata=this.Options.autoUpdatelistData;
    var Tdata=this.Options.TranseData;

     if((Tdata.bypass==5||Tdata.bypass == 1)&& (Tdata.fr == 0) && (Tdata.pgd <= Tdata.tp)){
            var form = 'paging',
     f_value = { name: AUdata.name, ps: Tdata.ps, tp: Tdata.tp, pgd:Tdata.pgd,sstr:Tdata.sstr, ifo:JSON.stringify(Tdata.ifo) };

            var formData = {
                form: form,
                f_value: f_value
            };
   W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
                Tdata.fr = 1;
                        // //W.U.console(T)
              _this.ManipulatItem(AUdata.Loadingblock(), AUdata.LoadingIndex,'additem');

                    },
                    success: function (data) {
                _this.ManipulatItem('',AUdata.LoadingIndex,'removeitem');
      Tdata.fr = 0;

                        var ret = JSON.parse(data);
                        if (ret.state == 500) {



                        _this.ManipulatItem(AUdata.Fallbackblock(), AUdata.LoadingIndex,'additem');
                        }
                        if (ret.state == 200) {
                var Hret = ret.response;


                   Tdata.ps = Hret.pagesize;
                  Tdata.tp = Hret.totalpage;
                  Tdata.pgd = Hret.paged;


              _this.AUinsert(Hret.result,Tdata);

                  //Tdata.bypass = 0;


                        }

                    }

                });

     }

}
//--Auto update list function
Handler.prototype.AUinsert=function(result){
      var _this=this;
    var AUdata=this.Options.autoUpdatelistData;
    var Tdata=this.Options.TranseData;
   var  htmlArr=[];
   for(var q in result){
      htmlArr.push(AUdata.Template(result[q]));
   }

   this.ManipulatItem(htmlArr,AUdata.LoadingIndex,'addpage');


    AUdata.LoadingIndex= _this.state.TotalIndex;
     // this.updateComponent(_this.state.Totalpage, 10);
           this.AUsetPaging();
}
Handler.prototype.AUsetPaging=function(){
      var Tdata=this.Options.TranseData;
      var _this=this;
        var AUdata=this.Options.autoUpdatelistData;
     if((Tdata.pgd <=Tdata.tp)&&Tdata.pgd!=0){


     this.ManipulatItem(AUdata.Pagingblock(), AUdata.LoadingIndex,'additem',function(){

         var mainblock=this.mainblock;

             W.U.attrclick('[data-paging]',mainblock[0],function(){
         _this.ManipulatItem('',AUdata.LoadingIndex,'removeitem');
         _this.Options.TranseData.bypass = 5;
         _this.LoadData();
    });

     });



}

 setTimeout (function(){  W.U.lazy_load(); },1000);
}
//--Auto update list function
//this.ccbk();
Handler.prototype.ccbk=function(index){

  W.U.ccbk.Run(W.U.Page,'whirlgiggoingto'+this.Options.name,index);

}

Handler.prototype.copy=function(){


}
//--


 var Assiner=   new Handler(this.Node, this.Value);

    }

    /**@public update item by event
    */
    function Update(name,index){
        var Whirlgig_this= GetFromBank(name);

              Whirlgig_this.outerupdate.bind({ we: Whirlgig_this,id:index, type: 'update' })();

    }
 /**@public Add item by
    */
    function AddItem(name,htmlString,targetPosition,callback){
          var Whirlgig_this= GetFromBank(name);
           Whirlgig_this.ManipulatItem(htmlString,targetPosition,'additem',callback);
    }

     /**@public Add page by
    */
    function AddPage(name,htmlString,targetPosition,callback){
          var Whirlgig_this= GetFromBank(name);
           Whirlgig_this.ManipulatItem(htmlString,targetPosition,'addpage',callback);
    }
     /**@public RemoveItem by
    */
    function RemoveItem(name,targetPosition){
          var Whirlgig_this= GetFromBank(name);
           Whirlgig_this.ManipulatItem('',targetPosition,'removeitem');
    }
     /**@public RemoveItem by
    */
    function WhirlgigGet(name){
          return GetFromBank(name);
    }





    W.U.Whirlgig = Whirlgig;
    W.U.WhirlgigGet = WhirlgigGet ;
    W.U.WhirlgigUpdate = Update ;
    W.U.WhirlgigAddItem = AddItem ;
    W.U.WhirlgigAddPage = AddPage ;
    W.U.WhirlgigRemoveItem =RemoveItem ;
})(wowrol);

/*


init(){
this.ItemPositionArr =this.PagePositionArr= [];
this.containerWidth = this.GetContainerWidth();
this.containerWidth = 500;
this.itemOnscreen = this.getitemOnscreen();
this.calculateWidth();
this.TotalIndex=this.items.length;
this.Totalpage=Math.ceil(( this.TotalIndex/this.itemOnscreen));
this.setItemPosition();

if(this.Widths.wrap>=this.viewport()||this.data.type=="Carousel"){
   this.TouchInit ();
}


}

GetContainerWidth(){
var w =0;
 for(var q in this.items){
w+= this.data.itemWidth;
 }
return w;
}

calculateWidth(){
     var ItemWidth=this.getItemWidth();
  //   this.itemOnscreen = this.getitemOnscreen();
     var itemOnscreen= this.itemOnscreen;
      itemOnscreen=(itemOnscreen==0)?1:itemOnscreen;
   var pageWidth=this.viewport();

     var wrapWidth;

     if(this.data.type=='list'||this.data.type=='autoupdate_list'){
          if(!this.data.itemResponsive){

         ItemWidth=(pageWidth/itemOnscreen);
         wrapWidth=ItemWidth*(this.items.length);
     }

     }


     if(this.data.type=='Carousel'){

         ItemWidth=pageWidth;
   wrapWidth=ItemWidth*(this.items.length);

     }

     if(this.data.type=="tablist"||this.data.type=="tabsimple"){
   pageWidth=ItemWidth;
 wrapWidth=ItemWidth*(this.items.length);
    }




   this.Widths={
    item:ItemWidth,
    wrap: wrapWidth,
     page :pageWidth ,
    Node:0
};
}




setItemPosition(){

  var LiITems=  this.items.length;
  var left=0;
    for (var q = 0; q < LiITems; q++) {
      this.ItemPositionArr[q] = -left;

        left+=  this.Widths.item;


    }

    //for pageposition Arr
        var left=0;
    for (var q = 0; q <= this.Totalpage; q++) {
     this.PagePositionArr[q] = -left;

        left+=  this.Widths.page;

    }


}




getItemWidth(){
   var W=(this.data.singleItem)?this.viewport():this.data.itemWidth;

    return W;
}



viewport(){
var w =500;

 return w;
}


getitemOnscreen(){
  var item=0;
  var itemOnscreen=this.data.itemOnscreen;
  for(var q in itemOnscreen){
     if(this.containerWidth>=itemOnscreen[q][0]){
         item=itemOnscreen[q][1];
     }
  }



return item;
}


TouchInit(){
   this.drag.maxLeft=-this.Widths.wrap;
  this.drag.minLeft=0;


}





*/
