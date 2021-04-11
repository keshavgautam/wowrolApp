/*
* page set up 2
*/
; (function (W) {
    "use strict";


/**
* @description  generate the drawer layout
* @param  
*/

  function DrawerLayout(drawerContent,mainContent,args){
                 var ch='';
  ch+='<div class="block po-re ov-hi" data-junction="'+args.name+'drawer">';

  W.U.JunctionAdd(W.A.page.AppId,''+args.name+'drawer',function(){
    
     W.U.drawer.bind({Node:this.Node,Value:this.data})();
  },args);  

  if(typeof(args.setting.top)!="undefined"){
    ch+='<div class="block po-ab bg_0" style="display:none;" data-of_2t="'+args.name+'" >'+drawerContent.top+'</div>';   
   }
   if(typeof(args.setting.left)!="undefined"){
    ch+='<div class="block po-ab bg_0" style="display:none;"  data-of_2l="'+args.name+'">'+drawerContent.left+'</div>';   
   }
   ch+='<div class="block po-re "  data-of_2c="'+args.name+'" >'+mainContent+'</div>';
   if(typeof(args.setting.right)!="undefined"){
    ch+='<div class="block po-ab bg_0"  style="display:none;" data-of_2r="'+args.name+'" >'+drawerContent.right+'</div>';   
   }
   if(typeof(args.setting.bottom)!="undefined"){
    ch+='<div class="block po-ab bg_0" style="display:none;" data-of_2b="'+args.name+'" >'+drawerContent.bottom+'</div>';   
   }
 ch+=' <div class="hide" data-of_2bd="'+args.name+'"></div>';
  
       ch+='</div>';
         return ch;


       }

/**
* @description  generate the tab layout
* @param  
*/
function TabLayout(tabList,tabContent,setting){
var ch=''; 
ch+='<div class="block " style="opacity: 0;"  data-junction="'+setting.data.name+'tab"  >'; 


    W.U.JunctionAdd(W.A.page.AppId,''+setting.data.name+'tab',function(){
 
        W.U.Tab.bind({Node:this.Node,Value:this.data})();
  },setting.data);  

ch+='<div class="block  po-re ov-hi '+setting.ulWrapClass+'" ><div class="block ul ul-menu '+setting.ulClass+'" data-tabcontainer="'+setting.data.name+'">'; 
for( var q in tabList){
    
ch+='<div class="li '+setting.tabLiClass+'">'+tabList[q]+'</div>'; 


}

ch+='</div></div>'; 

if(setting.data.OnlyList==false){
ch+=' <div class="tab-content">';
for( var q in tabContent){
    
ch+='<div class="block" data-tabpanel="'+setting.data.name+'">'+tabContent[q]+'</div>'; 


}
ch+='</div>'; 
}
ch+='</div>'; 
return ch;
} 


function CarouselLayout(tabList,setting){
    var ch=''; 
ch+='<div class="block "   style="opacity: 0;"   data-junction="'+setting.data.name+'tab"  data-nodeid="carousel.'+setting.data.name+'" >'; 
W.U.JunctionAdd(W.A.page.AppId,''+setting.data.name+'tab',function(){
 
      W.U.Carousel.bind({Node:this.Node,Value:this.data})();
  },setting.data);  
ch+='<div class="block  po-re ov-hi '+setting.ulWrapClass+'" ><div class="po-re" ><div data-menulinecon="'+setting.data.name+'" style="position: absolute;top: 0px;left: 0px;width: 0px; height: 3px;z-index: 1; background-color: #fff;-webkit-transition: all 0.25s ease-out;-moz-transition: all 0.25s ease-out;-ms-transition: all 0.25s ease-out;-o-transition: all 0.25s ease-out;transition: all 0.25s ease-out;"></div></div><div class="block ul ul-menu '+setting.ulClass+'" data-tabcontainer="'+setting.data.name+'">'; 
for( var q in tabList){
    
ch+='<div class="li '+setting.tabLiClass+'">'+tabList[q]+'</div>'; 


}

ch+='</div></div></div>'; 



return  ch;
          }

function CarouselTabLayout(tabList,tabContent,tabsetting,tabContentsetting){
var ch=''; 
var CarouselTabId= 'CarouselTabId'+W.U.uId();
ch+='<div class="block ">'; 

if(tabList.length==tabContent.length){
ch+=CarouselLayout(tabList,tabsetting); 
ch+=CarouselLayout(tabContent,tabContentsetting);   
var checkInterval=  setInterval(bindTab, 200);
var tries=0;



  

}else{
    console.warn('Tab List are not equal');
}

function bindTab(){

      if(W.U.id('carousel.'+tabsetting.data.name)!=null&&W.U.id('carousel.'+tabContentsetting.data.name)!=null){
            clearInterval(checkInterval ); 


           $(W.U.id('carousel.'+tabsetting.data.name)).on('updaten',function(e){
             
     var value=e.activeIndex;  
          var event = jQuery.Event('updateouter');
                event.activeIndex = value;  
  $(W.U.id('carousel.'+tabContentsetting.data.name)).triggerHandler(event);
 });

  $(W.U.id('carousel.'+tabContentsetting.data.name)).on('updaten',function(e){
     var value=e.activeIndex;
          var event = jQuery.Event('updateouter');
                event.activeIndex = value;
  $(W.U.id('carousel.'+tabsetting.data.name)).triggerHandler(event);
 });     
      }
      tries++;  
      if(tries>100){
             clearInterval(checkInterval ); 
console.warn('Tab enent are bined');
      }else{
          console.warn('Tab List checking');
      }

     }

ch+='</div>'; 



return ch;
} 

/**
* @description  generate the tab layout
* @param  
*/
function ToggleBlock(blockList, blockName,setting){
    
     var ch='';
   

if(typeof(blockList)=='object'){

    ch+='<div class="block " data-junction="'+setting.name+'tb" >';

     W.U.JunctionAdd(W.A.page.AppId,''+setting.name+'tb',function(){
    
       W.U.ToggleBlock.bind({Node:this.Node,Value:this.data})();
  },setting);  
    for(var i=0;i<blockList.length;i++){
        if(i==0){
    ch+='<div class="block  " data-blockname="'+blockName[i]+'" data-nodeid="block.'+blockName[i]+'" >'   ;  
    ch+=blockList[i];   
     ch+='</div>';   
        }else{
       ch+='<div class="block  " data-blockname="'+blockName[i]+'" style="display:none;" data-nodeid="block.'+blockName[i]+'">';  
       ch+=blockList[i];    
       ch+='</div>'; 

        }



    }

    ch+='</div>'; 
    }

     
    return ch;
}

/**
* @description  generate the form header
* @param  
*/
function Table(x){
     var ch='';
       ch+='<div class="block " data-junction="'+x.setting.name+'table"  data-nodeid="'+x.setting.name+'table" >';
  W.U.JunctionAdd(W.A.page.AppId,x.setting.name+'table',function(){
    
    W.U.Table.bind({Node:this.Node,Value:this.data})();
  },x);  
         ch+='</div>'; 

      return ch;
}


/**
* @description  generate the tab header
* @param  
*/
function wrap(header,madian,Footer){
       var classcontent=(typeof Footer == "undefined")?'block':'content';
    Footer=(typeof Footer =="undefined")?'':Footer;
 
    
    var ch='<div class="block">';
    ch+='<div class="block po-re top_fix">'
     ch+=header;
    ch+='</div>';
    ch+='<div class="block  "  data-appMedian="page" >';
  ch+='<div class="block po-ab"  data-loading="median" style="display:none;" ></div><div class="'+classcontent+'">';
     ch+=madian; 
      ch+='</div>';
     ch+=Footer;
     ch+='</div>';


       ch+='</div>';
    return ch;



}
/**
* @description  BottomFixWrap
* @param  
*/

function BottomFixWrap(top,mid,foot,ID){
   var ch='';
    var  TopRow=(top =="")?'':'<div class="block po-re top_fix" data-block="top" >'+top+'</div>';
   ID=(typeof ID == 'undefined' )?'page':ID;
   ch+='<div class="block " style="opacity: 0;" data-bottomfixwrap="'+ID+'" data-nodeid="bottomfixwrap.'+ID+'" >';
   ch+= TopRow;
   ch+='<div class="block" data-block="mid" ><div class="block po-ab"  data-loading="median" style="display:none;" ></div><div class="block">'+mid+'</div></div>';
 
    
   ch+='<div class="block" data-block="foot" >'+foot+'</div>';
   ch+='</div>';
   return ch; 
}

function AlertSuccess(x) {

        var ch = '<div class="alert success" ><strong class="fw-b">' + x.heading + '</strong><ul class="ul">' + x.message + ' </ul></div>';

        return ch;


    }
function AlertError(x) {
var error=x.message.length;
var alert_h = ( (error) == 1) ? 'There is an  error.' : 'There are ' +  error + ' errors.';
var message='';

for(var q in x.message){
    message+=x.message[q];
}
var ch = '<div class="alert error" ><strong class="fw-b">' + alert_h + '</strong><ul class="ul">' +message + ' </ul></div>';

        return ch;


    }
function DummyDiv(){
var bg=['#FFEB3B','#4efaaf',' #FFECB3',' #0094ff',' #ff00dc',' #ff006e'];
var bg_color = bg[Math.floor(Math.random()*bg.length)];
   var ch='<div class="block al-c " style="height:220px; width:'+window.innerWidth+'px; background:'+bg_color +';"><h1 class="m30_0">'+W.U.uId()+'</h1></div>';
   
   return ch; 
}

  W.T.DummyDiv = DummyDiv;
  W.T.DrawerLayout = DrawerLayout;
  W.T.CarouselLayout = CarouselLayout;
  W.T.CarouselTabLayout = CarouselTabLayout;
  W.T.TabLayout = TabLayout;
  W.T.ToggleBlock = ToggleBlock;
  W.T.Table = Table;
  W.T.wrap = wrap;
  W.T.BottomFixWrap = BottomFixWrap;
  W.T.AlertSuccess =  AlertSuccess;
  W.T.AlertError =  AlertError;
})(wowrol);