 ;(function (W) {
     "use strict";
/*
* @ event     W.U.fn.event('updaten',this.we.wrap);
*  updaten =>tab change to new
*/
     function Carousel() {


         function Handler(wrap, wrapdata) {
             this.wrap = wrap;
             this.options = W.U.extend(Handler.Default, wrapdata);
             // wait for dom css emplimention
             setTimeout(this.init.bind(this), 100);
             setTimeout(this.Maininit.bind(this), 200);
             // this.init.bind(this);
             $(window).on('resize', this.init.bind(this));



         
 $(this.wrap).on('updateouter',this.outerupdate.bind({ we: this, type: 'update' }));
         }

         Handler.Default = {
             name: 'Carousel',
             itemType: 'list', // list | tab | tabcontent |slide |autoupdate_list
             onListItemclick: function () { /* //console.log(this) */},
             activeIndex:0,
             mouse:true,
             singleItem: false,
             menuLinecolor: '#fff',
             menuLine:true

         };
         Handler.prototype.init = function () {
             this.Tabul = this.wrap.querySelector('[data-tabcontainer="' + this.options.name + '"]');
             this.TabLi = this.Tabul.childNodes;
             this.menuline = this.wrap.querySelector('[data-menulinecon="' + this.options.name + '"]');
             this.menulinecon = this.menuline.parentNode;
             this.TabLiPosArr = [];
             this.calculateWidth();
             this.Tabul.style.width = this.TabulWidth + 'px';
             this.Tabul.style.height = this.TabulHeight + 'px';
 $(this.menulinecon).css({width:this.TabulWidth,height:0});
      this.wrap.style.opacity = 1;      

  //-- Touch constant
        this.TabuldiffXLeft = 0;
        this.TabuldiffXRight = 0;  
        this.TabulLeft = 0;
        this.maxLeft=-(this.TabulWidth - this.wrap.offsetWidth);
        this.minLeft=0;
       this.newPosX=0;
        this.Tabultouchrunning = false,
        this.TabLilength=this.TabLiPosArr.length
        this.IsActiveStart = false,
        this.IsOuterUpdate = false,
        this.moveDirection="left";
               
         }

         Handler.prototype.Maininit = function () {
             this.checkBrowser();
             this.playDirection = "next";

             switch (this.options.itemType) {
                 case 'list':
                     this.listInit();
                break;
               case 'strip':
                 
                break;
             }

            
              //console.log(this);
              this.TouchInit();
         }

         Handler.prototype.listInit = function () {

             for (var q = 0; q < this.TabLi.length; q++) {
                 var roleTab = W.U('[role="tab"]', this.TabLi[q]);
                 if (roleTab.length > 0) {
                     var li_a = roleTab[0];
                  
                     li_a.onclick = this.itemClickHandler.bind(this);
                 }

             }
             this.update();
         }


         Handler.prototype.itemClickHandler = function (event) {
             var element=event.srcElement||event.target||event.toElement;
             var child = $(element).parentsUntil('.ul', '.li').get(0);
            

             var parent = child.parentNode;

             // The equivalent of parent.children.indexOf(child)
             this.options.activeIndex = Array.prototype.indexOf.call(parent.children, child);

             switch (this.options.itemType) {
                 case 'list':
                     this.options.onListItemclick.bind(this)();
                     this.update();
                     break;
            
             }


         }

         Handler.prototype.update = function () {

             switch (this.options.itemType) {
                 case 'list':
                     this.menuLine();


                     break;
             }

             if(this.IsOuterUpdate==false){
             //firing event
               var event = jQuery.Event('updaten');
                event.activeIndex = this.options.activeIndex;
   $(this.wrap).triggerHandler(event);     
             }
            
            
         }

         Handler.prototype.outerupdate = function (e) {
              //console.log(' outer update'); 
             var _this=this.we,
                 type=this.type,
               index= e.activeIndex;
     _this.IsOuterUpdate=true;

   switch (_this.options.itemType) {
                 case 'list':
                  _this.BringInView(index);  
                 break;
                  case 'slide':
                  _this.BringInView(index);  
                 break;
             }


            //console.log(e);   

         }


         Handler.prototype.menuLine = function () {
             var index = this.options.activeIndex,
              width = -this.TabLiPosArr[index+1],
              top = this.TabLi[index].offsetHeight - 3,
             left = 0;
           
            
             if (index >0) {
                 var ulLeft=this.TabLi[index].parentNode.offsetLeft;
             
                 width = (-this.TabLiPosArr[index+1] + this.TabLiPosArr[index]);
                 left = (-this.TabLiPosArr[index ]);
               
      // console.log('-this.TabLiPosArr[index+1] + this.TabLiPosArr[index]= '+this.TabLiPosArr[index+1]+'+'+ this.TabLiPosArr[index]); 
                
                 
             }
            
          
             
             $(this.menuline).css({width:width,top:top,left:left,'background-color':this.options.menuLinecolor});
         }

        Handler.prototype.TouchInit = function () {
       


  var _this = this;
    W.U.Mouse(this.Tabul, {
            mouse: this.options.mouse,
            start: function (event, start) {
                $(_this.Tabul).addClass('grab');
                this.IsActiveStart=true;
                  this.IsOuterUpdate = false;
                //console.log(' IsActiveStart =' +    this.IsActiveStart);
            },
            move: function (event, start, diff, speed) {
    if( this.IsActiveStart){
                _this.Touch(event, start, diff, speed, 'move');
    }
            },
            end: function (event, start, diff, speed) {
               
                     $(_this.Tabul).removeClass('grab');
        if( this.IsActiveStart){
          
                  _this.Touch(event, start, diff, speed, 'end');
          _this.TouchEndRun();
               _this.TabuldiffXLeft = 0;
            _this.TabuldiffXRight = 0;   
             this.IsActiveStart=false; 
   //console.log(' IsActiveStart =' +    this.IsActiveStart);
                }
        
           
            }
        });

         }

    
        Handler.prototype.Touch = function (event, start, diff, speed, type) {
               //console.log('type 0 =' +   type);
  if (this.Tabultouchrunning == false||type=='end') {
      var travalLimit=(diff.x<0)?-(diff.x):diff.x;
    
            if (((diff.y > -8 && diff.y < 8 &&travalLimit>10)||type=='end')) {
       //console.log('type 1 =' +   type);
        //console.log('--------started ----------');
 this.Tabultouchrunning = true;
   //  console.log(' type =' +   type);
          //console.log('minLeft =' +  this.minLeft);
          //console.log('this.maxLeft' +this.maxLeft);  
 //console.log('diff.x =' + diff.x);
          //console.log('this.TabuldiffXLeft =' + this.TabuldiffXLeft);
          //console.log('this.TabuldiffXRight =' + this.TabuldiffXRight);
       //console.log('this.TabulLeft  before =' +this.TabulLeft); 
      this.newPosX=   diff.x;  
           if (diff.x > 0) {//right

                    var diffX = (diff.x - this.TabuldiffXRight);
                     this.TabuldiffXRight = diff.x;
                     this.moveDirection="right"
                } else { //left

                    var diffX = (diff.x - this.TabuldiffXLeft);
                  
                      this.TabuldiffXLeft = diff.x;
                     this.moveDirection="left"
                }

     this.TabulLeft = (this.TabulLeft + diffX);
    //console.log('this.TabulLeft  after =' + this.TabulLeft);
     //console.log('this.moveDirection =' + this.moveDirection);          
        
        this.TabulLeft = (this.TabulLeft > 0) ? 0 : this.TabulLeft;
     this.TabulLeft = (this.TabulLeft < this.maxLeft) ? this.maxLeft :   this.TabulLeft; 
            this.IsOuterUpdate = false;  
         switch (this.options.itemType) {
                 case 'list':
             this.changePos(this.TabulLeft, speed.x);

                  break;
               case 'strip':
             this.changePos(this.TabulLeft, speed.x);

                  break;
                 case 'slide':

                  if(type=="end"){

              this.closestItem();
   
            this.BringInView(this.options.activeIndex );
             }else{
                   this.changePos(this.TabulLeft, speed.x);
             }
                  break;


             }   

    
      this.Tabultouchrunning = false;           
    }}

         }

   Handler.prototype.TouchEndRun = function () {
                switch (this.options.itemType) {
                 case 'list':
                     this.menuLine();
                 break;
                case 'slide':
   
                     this.update();
                 break;
             }

         }
   Handler.prototype.changePos = function (pos, speed) {
        var time = speed?speed+'ms':'';  // //console.log(speed); 
 

    var checkBrowser = this.checkBrowser;
   
      if (checkBrowser.support3d) {
            this.Tabul.style.webkitTransform = 'translate(' + pos + 'px,0) translateZ(0)';
            this.Tabul.style.msTransform =
        this.Tabul.style.MozTransform =
        this.Tabul.style.OTransform =
        this.Tabul.style.transform = 'translateX(' + pos + 'px)';
      
    this.addCssSpeed(speed);

        } else { 
         this.Tabul.style.left=  pos + 'px';
        }
   
this.menulinecon.style.left=  pos + 'px';
    }
   Handler.prototype.addCssSpeed = function (speed) {
      
        this.Tabul.style.msTransform =
        this.Tabul.style.MozTransform =
        this.Tabul.style.OTransform =
        this.Tabul.style.transform = "all " + speed + "ms ease";
        }

     
    Handler.prototype.BringInView = function (index) {
        index=(index>this.TabLi.length)?(this.TabLi.length-1):index;
        index=(index<0)?0:index;
        this.options.activeIndex=index;
         var left = this.TabLiPosArr[index ];
             //console.log('index  '+index );
              //console.log('left '+left);
             this.TabulLeft=left;

 this.TabulLeft = (this.TabulLeft > 0) ? 0 : this.TabulLeft;
     this.TabulLeft = (this.TabulLeft < this.maxLeft) ? this.maxLeft :   this.TabulLeft; 
              this.changePos(this.TabulLeft, 0.25);

              this.TouchEndRun();
         }
 
      //slide function

    Handler.prototype.closestItem = function () {
        var itemArr=  this.TabLiPosArr,
        base=this, 
        itemlength=(itemArr.length-1),
        goal=this.newPosX,
        closest = null
        ;
          //console.log('this.moveDirection =' +  this.moveDirection);
       //console.log('goal =' +    goal);
       //console.log('this.options.activeIndex '+this.options.activeIndex);

      var goalLimit=(.1*base.wrap.offsetWidth);
      
         //console.log('goalLimit '+goalLimit);

        if (  base.moveDirection === "left"&&goal<-goalLimit) {
      
        base.options.activeIndex ++;
         if(  base.options.activeIndex>itemlength){
            base.options.activeIndex= itemlength;
         }
             
      }else if (base.moveDirection === "right"&&goal>goalLimit) {
          
           base.options.activeIndex --;
        if(  base.options.activeIndex<0){
             base.options.activeIndex= 0;
         }
      }
           //console.log('this.options.activeIndex after '+this.options.activeIndex);    

         }



   Handler.prototype.calculateWidth = function () {
           var TabulWidth = 0;
             var TabulHeight = 0;
           

    for (var q = 0; q < this.TabLi.length; q++) {

            
         
      switch (this.options.itemType) {
                 case 'list':
              
       this.TabLiPosArr[q] = -TabulWidth;
          var LiWidth=  parseInt(this.TabLi[q].offsetWidth)+1; 
   TabulWidth +=LiWidth;
   $(this.TabLi[q]).css({width:LiWidth});
        var itemHeight = this.TabLi[q].offsetHeight;
     TabulHeight = (TabulHeight < itemHeight) ? itemHeight : TabulHeight;
                     break;
           case 'strip':
              
       this.TabLiPosArr[q] = -TabulWidth;
          var LiWidth=  parseInt(this.TabLi[q].offsetWidth)+1; 
   TabulWidth +=LiWidth;
   $(this.TabLi[q]).css({width:LiWidth});
        var itemHeight = this.TabLi[q].offsetHeight;
      TabulHeight = (TabulHeight < itemHeight) ? itemHeight : TabulHeight;

                     break;
               case 'slide':
            this.TabLiPosArr[q] = -TabulWidth;
            TabulWidth += this.wrap.offsetWidth;
            var LiWidth = (parseInt(this.wrap.offsetWidth)/1);
              var roleTab = W.U('[role="tab"]', this.TabLi[q]);
                 $(roleTab).css({width:LiWidth});

   
                 TabulHeight = '';
                     break;
             }

            


             }
     
           
             this.TabulWidth = TabulWidth ;
             this.TabulHeight = TabulHeight;

         }

    Handler.prototype.copy = function () {


         }
         Handler.prototype.checkBrowser = function () {
             var base = this,
                translate3D = "translate3d(0px, 0px, 0px)",
                tempElem = document.createElement("div"),
                regex,
                asSupport,
                support3d,
                isTouch;

             tempElem.style.cssText = "  -moz-transform:" + translate3D +
                                  "; -ms-transform:" + translate3D +
                                  "; -o-transform:" + translate3D +
                                  "; -webkit-transform:" + translate3D +
                                  "; transform:" + translate3D;
             regex = /translate3d\(0px, 0px, 0px\)/g;
             asSupport = tempElem.style.cssText.match(regex);
             support3d = (asSupport !== null && asSupport.length === 1);

             isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;

             base.browser = {
                 "support3d": support3d,
                 "isTouch": isTouch
             };
         },


         new Handler(this.Node, this.Value);
     }
     W.U.Carousel = Carousel;

 })(wowrol);
