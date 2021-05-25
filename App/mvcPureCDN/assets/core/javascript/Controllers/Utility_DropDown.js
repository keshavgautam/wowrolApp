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
      case 'datepicker':

           this.btnNode=this.Options.button;
 // this.parentNode=Node;
    this.parentNode=this.Options.parentNode;
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
            onbuttonclick:W.U.noop,
            placement: 'auto'//top | bottom | left | right | auto.

       }
      
       Handler.prototype.init = function () {
          
        var _this=this;
  
             $(this.Dropdown).removeClass('show').addClass('hide'); 

             switch(this.Options.trigger){
              case 'click':
            this.btnNode.onclick=  Toggle_00  ;  
       
           
              break;   
             case 'hover':

      this.btnNode.onmouseover=  function (e){
_this.Options.onbuttonclick();
                   _this.show(); 
                    e.preventDefault();

                       };   


              break; 


             }
      W.U.ccbk.Add(W.U.Page,'dropdownclickClear',function(){   _this.hide(); });  


if(this.Options.type!="webExploreMenu"){
    W.U.bodyonclick.Add(function(e){
       
               // W.U.console('clicked');
                
                       var triggerNode=e.srcElement||e.target;   //W.U.console(e); 
                 // W.U.console('isChildNode');   
                   //  W.U.console(W.U.isChildNode(_this.parentNode.childNodes,triggerNode));
              /*      var _isChild=W.U.isChildNode(_this.parentNode.childNodes,triggerNode);
                if(_this.Options.type=='datepicker'){
                      debugger;
                         var _isChild=W.U.isChildNode(_this.parentNode.childNodes,triggerNode);
                  }*/
                       if((!W.U.isChildNode(_this.parentNode.childNodes,triggerNode))&&(triggerNode!==_this.btnNode)){
   if($(_this.Dropdown).hasClass('show')){
           _this.hide();  
   }
                         
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


function Toggle_00(e){
// W.U.console('elementclick clikc');  

_this.Options.onbuttonclick();
                       if( $(_this.Dropdown).hasClass('hide')){
                            _this.show();  
                       }else{
                           _this.hide();   
                       }
             
    W.U.bleep();
     if(!W.U.browser.height_free){
       e.preventDefault();e.stopPropagation();
              }

             };


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

   //W.U.console(V);  //W.U.console(R); //W.U.console(D);

  
var Top=0,Left=0;
var placement=this.Options.placement;

switch(placement){
 case 'top':
 Top=(- actualHeight);

 break;   
  case 'bottom':
 Top=( R.height);

 break; 
 case 'left':
 Top=0;
 Left=- actualWidth ;
 break; 
  case 'right':
 Top=0;
 Left= R.width ;
 break;
 default:
 placement="auto";
}




 //correction 1
if( this.Options.placement=="top"|| this.Options.placement=="bottom"){

    // Left=-(R.left+(R.width/2)-(actualWidth/2));
    Left=-(actualWidth/2);
   //W.U.console('left '+Left);
      if((R.left+Left)<0){
 
  if(R.left<actualWidth){

     Left=0;
  }
   //W.U.console(' N left '+Left);
    }
    

    if((R.left+actualWidth)>V.width){
      
 Left=(V.width-(R.left+(V.width-(R.left+R.width))+actualWidth));

     //W.U.console(' S left '+Left);

    }



    if(     -(R.left)>Left  ){
        Left=-(R.left);
    }

    if(actualWidth==V.width){
     Left=-(R.left);   
    }
       
}





    if (this.org_placement=="auto") {
     
        if(placement=="auto"){
           this.Options.placement="bottom"; 
      var Offset=this.getCalculatedOffset();
      Top=Offset.top;
      Left=Offset.left;
        }

           if(this.Options.placement=="bottom"){
     // W.U.console('R.height+D.height)>V.height =(' +R.height+'+ ' +D.height+')> ' +V.height);

        if((R.top+D.height)>V.height){
           this.Options.placement="top"; 
    
      Top=-(D.height);
      Left=0;
}

        }

        if(this.Options.placement=="top"){
        if(D.height>R.top){
           this.Options.placement="left"; 
      var Offset=this.getCalculatedOffset();
      Top=Offset.top;
      Left=Offset.left;
}

        }
          if(this.Options.placement=="left"){
        if((actualWidth+R.left)<V.width){
           this.Options.placement="right"; 
      var Offset=this.getCalculatedOffset();
      Top=Offset.top;
      Left=Offset.left;
}

        }
        
         

    }


 

   
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

 
return   new Handler(Node,Options);
   }





   W.U.DropDown=DropDown;


})(wowrol);