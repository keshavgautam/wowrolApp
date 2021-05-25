/*
* 
*/
; (function(W){
   "use strict";

 


   function DropDown(Node,Options){
   
    function Handler(Node,Options){

        this.Options = W.U.extend(Handler.Defaults,Options); 
  
        switch(this.Options.type){
            case 'suggestion':
  this.parentNode=Node;
           this.btnNode=Node;
           this.Dropdown=this.Options.Dropdown; 
              $(this.parentNode).addClass('po-re'); 
 $(this.Dropdown).removeClass('po-re').addClass('po-ab'); 

            break;
           case 'selectbox':
  this.parentNode=Node;
           this.btnNode=this.Options.button;
           this.Dropdown=this.Options.Dropdown; 
              $(this.parentNode).addClass('po-re'); 
 $(this.Dropdown).removeClass('po-re').addClass('po-ab'); 

            break;
     case 'emojibox':

           this.btnNode=this.Options.button;
 // this.parentNode=Node;
    this.parentNode=this.btnNode.parentNode;
  this.Dropdown=this.Options.Dropdown; 
   $(this.parentNode).addClass('po-re'); 
 $(this.Dropdown).removeClass('po-re').addClass('po-ab'); 

            break;
          case 'webExploreMenu':
  this.parentNode=W.U('.top_fix')[0];
           this.btnNode=Node;
           this.Dropdown=this.Options.Dropdown; 
              $(this.parentNode).addClass('po-re'); 
 $(this.Dropdown).removeClass('po-re').addClass('po-ab'); 

            break;

           case 'title':
 this.parentNode=Node;
           this.btnNode=Node;
           var title= Node.title;
           this.Dropdown=W.U.Rander('<div class="tooltip"><div class="tooltip-inner"> '+ title+' </div></div>')[0]; 
       
        W.U.Setview(this.parentNode,this.Dropdown,'append');
      setTimeout(function(){    Node.removeAttribute('title');;},200);
            break;
            default :
  this.btnNode=Node;
  this.parentNode=Node.parentNode;
  this.Dropdown=W.U('[data-block="menu"]',this.parentNode)[0];
 

        }


       
      
        this.org_placement=this.Options.placement;
   
       
        this.referenceNode=(this.Options.reference=='B')?this.btnNode:this.parentNode;
        this.init();
    }  
      
       Handler.Defaults={
            trigger: 'click',
            perpose:'emoji',
            type:'dropdown',//dropdown|pupover|tooltip|collapse|suggestion,
            htmlStr:'',
            EntrancesAnimation:'fadeIn animated',//fadeIn|sildin
            width:150,//string | function()
            height:function(){
              return  this.Dropdown.offsetHeight;
            },//string | function()
            padding: 0,
            reference: 'C',//Button|Container
            viewport:'',
            Dropdown:'',
            arrow:false,
            placement: 'auto'//top | bottom | left | right | auto.

       }
      
       Handler.prototype.init = function () {
          
        var _this=this;
  
             $(this.Dropdown).removeClass('show').addClass('hide'); 

             switch(this.Options.trigger){
              case 'click':
                this.btnNode.onclick=  function (e){
// W.U.console('elementclick clikc');  

                       if( $(_this.Dropdown).hasClass('hide')){
                            _this.show();  
                       }else{
                           _this.hide();   
                       }
             
    W.U.bleep();
 
 e.preventDefault();
             };
           
              break;   
             case 'hover':
    /*  this.btnNode.onmouseover=  function (e){
                   _this.show(); 
                    e.preventDefault();

                       };   
*/

              break; 


             }
  W.U.ccbk.Add(W.U.Page,'dropdownclickClear',function(){
        _this.hide(); 
  });

if(this.Options.type!="webExploreMenu"){
    W.U.bodyonclick.Add(function(e){
       
               // W.U.console('clicked');
                
                       var triggerNode=e.srcElement||e.target;   //W.U.console(e); 
                 // W.U.console('isChildNode');   
                   //  W.U.console(W.U.isChildNode(_this.parentNode.childNodes,triggerNode));
                  
                       if((!W.U.isChildNode(_this.parentNode.childNodes,triggerNode))&&(triggerNode!==_this.btnNode)){

                             _this.hide();  
                       }
                   
               });
}
if(this.Options.type=="webExploreMenu"){
       this.parentNode.onmouseleave=  function (e){
             var triggerNode=e.srcElement||e.target; 
                   

                  
                       if(!W.U.isChildNode(_this.parentNode.childNodes,triggerNode)){
                              _this.hide();  
                       }

             };
}


         } 
   Handler.prototype.show = function () {

         //  W.U.console(    this);
           if( $(this.Dropdown).hasClass('hide')){
            //   $('.dropdown-toggle').parent().removeClass('open');
                  W.U.ccbk.Run(W.U.Page,'dropdownclickClear');  
               $(this.Dropdown).addClass('show').removeClass('hide'); 
               
                 this.ApplyPlacement();
                 
           //  W.U.console(    this);
           // W.U.console('going to shown');
           }
           

         }
   Handler.prototype.hide = function () {
        if( $(this.Dropdown).hasClass('show')){
               $(this.Dropdown).removeClass('show '+this.Options.EntrancesAnimation).addClass('hide'); 
                  //  W.U.console('going to hide');
        }
          

         }

   Handler.prototype.ApplyPlacement=function(){
       var Placement={classes:this.Options.EntrancesAnimation,offset:{top:0,left:0}};
 
       Placement.offset=this.getCalculatedOffset();
       //W.U.console(Placement.offset);
        $(this.Dropdown).addClass(Placement.classes).css(Placement.offset);
        this.Options.placement=this.org_placement;
   }
    Handler.prototype.getPosition = function (el) {

    return W.U.getPosition(el);
  }


   Handler.prototype.getCalculatedOffset = function () {
        var actualWidth=(W.U.isFunction(this.Options.width))?this.Options.width.bind(this)():this.Options.width;
       var actualHeight=(W.U.isFunction(this.Options.height))?this.Options.height.bind(this)():this.Options.height;
       var Pos=this.getPosition(this.btnNode);
         
// V=Viewport 
    this.viewport=( this.Options.viewport=='')? W.U('body')[0]:this.Options.viewport;
var V=this.getPosition(this.viewport);
 
actualWidth=(V.width>actualWidth)?actualWidth:V.width;
// C=Container 
var C=this.getPosition( this.parentNode);
// B=button 
var B=this.getPosition( this.btnNode);
// D=Dropdown 
var D=this.getPosition( this.Dropdown);
var R=this.getPosition(  this.referenceNode);
R.top=R.top-50; //fix for fixed header
R.left=V.left-R.left;//fix for we use Page as view port
R.left=(R.left<0)?(-R.left):R.left;

   

 

var placement=this.Options.placement;
var Rightplacement=this.getPlacement(B,R);
var RightPositin=this.getTargetPositin(B,Rightplacement,actualWidth,actualHeight);

var Top=RightPositin.position.top,Left=RightPositin.position.left;


//correction 1







 

 // debugger;

if(this.Options.type=='suggestion'||this.Options.type=='selectbox'||this.Options.type=='emojibox'){
    
                  Left=0;//prevent error in web to go outside form wrap
}
if(this.Options.type=='webExploreMenu'){
    
}



var Offset={};

      switch(this.Options.type){
        case 'webExploreMenu':
 Offset={zIndex:1060,width:1200,height:250};
            break;
           case 'title':
 Offset={top:Top,zIndex:1060};
            break;
            default :
Offset={top:Top,left:Left,width:actualWidth,zIndex:1060};
 

        }
return Offset;



    }

    Handler.prototype.getPlacement= function(pos,viewport){
              
					var
						placement,
						de = document.documentElement,
						db = document.body,
						clientWidth = viewport.width,
						clientHeight = viewport.height,
						scrollTop = Math.max(db.scrollTop,de.scrollTop),
						scrollLeft = Math.max(db.scrollLeft,de.scrollLeft),
						pageX = Math.max(0,pos.left - scrollLeft),
						pageY = Math.max(0,pos.top - scrollTop);
						//arrowSize = 20;

					//if placement equals auto，caculate the placement by element information;
				placement = this.Options.placement;


					if (placement==='auto'){
						var constrainsH =  'horizontal',
							constrainsV =  'vertical';
						if (pageX<clientWidth/3){
							if (pageY<clientHeight/3){
								placement = constrainsH?'right-bottom':'bottom-right';
							}else if (pageY<clientHeight*2/3){
								if (constrainsV){
									placement = pageY<=clientHeight/2?'bottom-right':'top-right';
								}else{
									placement = 'right';
								}
							}else{
								placement =constrainsH?'right-top':'top-right';
							}
							//placement= pageY>targetHeight+arrowSize?'top-right':'bottom-right';
						}else if (pageX<clientWidth*2/3){
							if (pageY<clientHeight/3){
								if (constrainsH){
									placement =pageX<=clientWidth/2?'right-bottom':'left-bottom';
								}else{
									placement ='bottom';
								}
							}else if (pageY<clientHeight*2/3){
								if (constrainsH){
									placement = pageX<=clientWidth/2?'right':'left';
								}else{
									placement = pageY<=clientHeight/2?'bottom':'top';
								}
							}else{
								if (constrainsH){
									placement =pageX<=clientWidth/2?'right-top':'left-top';
								}else{
									placement ='top';
								}
							}
						}else{
							//placement = pageY>targetHeight+arrowSize?'top-left':'bottom-left';
							if (pageY<clientHeight/3){
								placement = constrainsH?'left-bottom':'bottom-left';
							}else if (pageY<clientHeight*2/3){
								if (constrainsV){
									placement = pageY<=clientHeight/2?'bottom-left':'top-left';
								}else{
									placement = 'left';
								}
							}else{
								placement = constrainsH?'left-top':'top-left';
							}
						}
					}else if (placement==='auto-top'){
						if (pageX<clientWidth/3){
							placement='top-right';
						}else if (pageX<clientHeight*2/3){
							placement='top';
						}else{
							placement='top-left';
						}
					}else if (placement==='auto-bottom'){
						if (pageX<clientWidth/3){
							placement='bottom-right';
						}else if (pageX<clientHeight*2/3){
							placement='bottom';
						}else{
							placement='bottom-left';
						}
					}else if (placement==='auto-left'){
						if (pageY<clientHeight/3){
							placement='left-top';
						}else if (pageY<clientHeight*2/3){
							placement='left';
						}else{
							placement='left-bottom';
						}
					}else if (placement==='auto-right'){
						if (pageY<clientHeight/3){
							placement='right-top';
						}else if (pageY<clientHeight*2/3){
							placement='right';
						}else{
							placement='right-bottom';
						}
					}
					return placement;
				}
     
 Handler.prototype.getTargetPositin= function(elementPos,placement,targetWidth,targetHeight){
     
					var pos = elementPos,
						elementW = elementPos.width,
						elementH = elementPos.height,
						position={},
						arrowOffset=null,
						arrowSize = this.Options.arrow?20:0,
						fixedW = elementW<arrowSize+10?arrowSize:0,
						fixedH = elementH<arrowSize+10?arrowSize:0;
					switch (placement) {
			          case 'bottom':
			            position = {top:  pos.height, left: pos.left + pos.width / 2 - targetWidth / 2};
			            break;
			          case 'top':
			            position = {top:  -targetHeight, left: pos.left + pos.width / 2 - targetWidth / 2};
			            break;
			          case 'left':
			            position = {top:-(pos.height / 2), left: - targetWidth};
			            break;
			          case 'right':
			            position = {top: -(pos.height / 2) , left: pos.width};
			            break;
			          case 'top-right':
			            position = {top:  - targetHeight, left: pos.left-fixedW};
			            arrowOffset = {left: Math.min(elementW,targetWidth)/2 + fixedW};
			            break;
			          case 'top-left':
			            position = {top:  - targetHeight, left: -(pos.left -targetWidth +pos.width + fixedW)};
			            arrowOffset = {left: targetWidth - Math.min(elementW,targetWidth) /2 -fixedW};
			            break;
			          case 'bottom-right':
			            position = {top:  pos.height, left: 0};
			            arrowOffset = {left: Math.min(elementW,targetWidth) /2+fixedW};
			            break;
					  case 'bottom-left':
			            position = {top:  pos.height, left: (pos.width-targetWidth)};
			            arrowOffset = {left: targetWidth- Math.min(elementW,targetWidth) /2 - fixedW};
			            break;
					  case 'right-top':
			            position = {top:  targetHeight + pos.height + fixedH, left: pos.left + pos.width};
			            arrowOffset = {top: targetHeight - Math.min(elementH,targetHeight)/2 -fixedH};
			            break;
			          case 'right-bottom':
			            position = {top: -(pos.height / 2), left:pos.width};
			            arrowOffset = {top: Math.min(elementH,targetHeight) /2 +fixedH };
			            break;
			          case 'left-top':
			            position = {top:-( targetHeight + pos.height+fixedH), left:-( pos.left - targetWidth)};
			            arrowOffset = {top: targetHeight - Math.min(elementH,targetHeight)/2 - fixedH};
			            break;
					  case 'left-bottom':
			            position = {top: -(pos.height / 2) , left:- targetWidth};
			            arrowOffset = {top: Math.min(elementH,targetHeight) /2 + fixedH };
			            break;

			        }
                  debugger;
			        return {position:position,arrowOffset:arrowOffset};
				}
return   new Handler(Node,Options);
   }





   W.U.DropDown=DropDown;


})(wowrol);